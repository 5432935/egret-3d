var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @class egret3d.MaterialPass
    * @classdesc
    * 材质渲染pass 根据Mesh数据、模型的材质还有灯光数据的不同。
    * 以不同的渲染方法，会组成相应的shader内容，然后渲染出不同的效果。
    * 阶段 shader 灵活动态的 特效组合
    * @see egret3d.Mesh
    * @version Egret 3.0
    * @platform Web,Native
    */
    var MaterialPass = (function () {
        ///**
        //* @private
        //*/
        //private _helpMatrix: Matrix4 = new Matrix4(); 
        //private _helpVector: Vector3 = new Vector3();
        /**
        * @private
        */
        function MaterialPass(data) {
            if (data === void 0) { data = null; }
            /**
           * @private
           */
            this._passChange = true;
            /**
           * @private
           */
            this._vs_shader_methods = {};
            /**
           * @private
           */
            this._fs_shader_methods = {};
            /**
            * @private
            */
            this.methodList = new Array();
            /**
            * @private
            */
            this.methodDatas = new Array();
            /**
            * @private
            */
            this.vsShaderNames = new Array();
            /**
            * @private
            */
            this.fsShaderNames = new Array();
            /**
              * @public
              * @language zh_CN
              * pass渲染是否开启使用
              * @param method 渲染方法
              * @version Egret 3.0
              * @platform Web,Native
              */
            this.enable = true;
            if (data) {
                this.materialData = data;
            }
        }
        Object.defineProperty(MaterialPass.prototype, "lightGroup", {
            /**
            * @private
            */
            get: function () {
                return this._lightGroup;
            },
            /**
            * @private
            */
            set: function (lightGroup) {
                if (this._lightGroup) {
                    this._lightGroup.removeEventListener(egret3d.LightGroup.EVENT_LIGHT_RESET, this.onLightReset, this);
                }
                this._lightGroup = lightGroup;
                if (this._lightGroup) {
                    this._lightGroup.addEventListener(egret3d.LightGroup.EVENT_LIGHT_RESET, this.onLightReset, this);
                }
            },
            enumerable: true,
            configurable: true
        });
        MaterialPass.prototype.onLightReset = function (e) {
            this._passChange = true;
        };
        Object.defineProperty(MaterialPass.prototype, "materialData", {
            /**
            * @private
            */
            set: function (materialData) {
                this._materialData = materialData;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 增加渲染方法
        * @param method 渲染方法
        * @version Egret 3.0
        * @platform Web,Native
        */
        MaterialPass.prototype.addMethod = function (method) {
            var index = this.methodList.indexOf(method);
            if (index == -1) {
                this.methodList.push(method);
                method.materialData = this._materialData;
                this._passChange = true;
            }
        };
        /**
        * @language zh_CN
        * 移除渲染方法
        * @param method 渲染方法
        * @version Egret 3.0
        * @platform Web,Native
        */
        MaterialPass.prototype.removeMethod = function (method) {
            var index = this.methodList.indexOf(method);
            if (index != -1) {
                this.methodList.splice(index, 1);
                this._passChange = true;
            }
        };
        /**
        * @language zh_CN
        * 使用类型拿到 MethodBase  getMethod(UVSpriteSheetMethod)
        * @param type 类型  比如:UVSpriteSheetMethod
        * @version Egret 3.0
        * @platform Web,Native
        */
        MaterialPass.prototype.getMethod = function (type) {
            for (var i = 0; i < this.methodList.length; ++i) {
                if (this.methodList[i] instanceof type) {
                    return this.methodList[i];
                }
            }
            return null;
        };
        MaterialPass.prototype.addShadowMethod = function () {
            if (this._materialData.acceptShadow) {
                this._shadowMethod = new egret3d.ShadowMethod(this._materialData);
                this.addMethod(this._shadowMethod);
            }
        };
        MaterialPass.prototype.removShadowMethod = function () {
            if (this._shadowMethod) {
                this.removeMethod(this._shadowMethod);
                this._shadowMethod.dispose();
                this._shadowMethod = null;
            }
        };
        MaterialPass.prototype.materialDataChange = function () {
            this._materialData.materialDataNeedChange = true;
        };
        /**
        * @private
        */
        MaterialPass.prototype.passInvalid = function () {
            this._passChange = true;
        };
        /**
       * @language zh_CN
       * 重置纹理。
       * @version Egret 3.0
       * @platform Web,Native
       */
        MaterialPass.prototype.resetTexture = function (context3DProxy) {
            //--------texture----------------
            var sampler2D;
            for (var index in this._passUsage.sampler2DList) {
                sampler2D = this._passUsage.sampler2DList[index];
                if (this._materialData[sampler2D.varName]) {
                    sampler2D.texture = this._materialData[sampler2D.varName];
                }
            }
            var sampler3D;
            for (var index in this._passUsage.sampler3DList) {
                sampler3D = this._passUsage.sampler3DList[index];
                if (this._materialData[sampler3D.varName]) {
                    sampler3D.texture = this._materialData[sampler3D.varName];
                }
            }
            this._materialData.textureChange = false;
        };
        /**
        * @language zh_CN
        * @private
        * 指定shader 添加shader 片段。
        * @version Egret 3.0
        * @platform Web,Native
        */
        MaterialPass.prototype.addMethodShaders = function (shaderBase, shaders) {
            for (var i = 0; i < shaders.length; i++) {
                shaderBase.addUseShaderName(shaders[i]);
            }
        };
        MaterialPass.prototype.addShaderPhase = function (passType, sourcePhase, targetPhase) {
            var names;
            var phase;
            var tn;
            for (phase in sourcePhase) {
                names = sourcePhase[phase];
                for (var i = 0; i < names.length; i++) {
                    targetPhase[phase] = targetPhase[phase] || [];
                    targetPhase[phase].push(names[i]);
                    tn = egret3d.ShaderPhaseType[phase];
                    var index = this._materialData.shaderPhaseTypes[passType].indexOf(egret3d.ShaderPhaseType[tn]);
                    if (index != -1) {
                        this._materialData.shaderPhaseTypes[passType].splice(index, 1);
                    }
                }
            }
        };
        MaterialPass.prototype.initOthreMethods = function () {
            var shaderPhase;
            var shaderList;
            for (var d = 0; d < this.methodList.length; d++) {
                var method = this.methodList[d];
                for (shaderPhase in method.vsShaderList) {
                    shaderList = method.vsShaderList[shaderPhase];
                    for (var i = 0; i < shaderList.length; i++) {
                        this._vs_shader_methods[shaderPhase] = this._vs_shader_methods[shaderPhase] || [];
                        this._vs_shader_methods[shaderPhase].push(shaderList[i]);
                    }
                }
                for (shaderPhase in method.fsShaderList) {
                    shaderList = method.fsShaderList[shaderPhase];
                    for (var i = 0; i < shaderList.length; i++) {
                        this._fs_shader_methods[shaderPhase] = this._fs_shader_methods[shaderPhase] || [];
                        this._fs_shader_methods[shaderPhase].push(shaderList[i]);
                    }
                }
            }
        };
        /**
        * @language zh_CN
        * @private
        * 初始化 UseMethod。
        * @version Egret 3.0
        * @platform Web,Native
        */
        MaterialPass.prototype.initUseMethod = function (animation, geom) {
            this._passChange = false;
            var i = 0;
            this._passUsage = new egret3d.PassUsage();
            this._vs_shader_methods = {};
            this._fs_shader_methods = {};
            //pre Phase ---------------------------------------------------
            if (animation) {
                // to add accept animation shader
                if (animation.skeletonAnimationController) {
                    this._passUsage.maxBone = animation.skeletonAnimationController.jointNum * 2;
                    this._vs_shader_methods[egret3d.ShaderPhaseType.start_vertex] = [];
                    this._vs_shader_methods[egret3d.ShaderPhaseType.start_vertex].push("skeleton_vs");
                }
                else if (animation.particleAnimationController) {
                    this._vs_shader_methods[egret3d.ShaderPhaseType.start_vertex] = [];
                    this._vs_shader_methods[egret3d.ShaderPhaseType.start_vertex].push("particle_vs");
                    //to change importent
                    this.addShaderPhase(this._passID, animation.particleAnimationController.particleAnimationState.vertex_shaders, this._vs_shader_methods);
                    this.addShaderPhase(this._passID, animation.particleAnimationController.particleAnimationState.fragment_shaders, this._fs_shader_methods);
                }
            }
            if (this._materialData.acceptShadow) {
                // to add accept shadow maping shader+
                this._vs_shader_methods[egret3d.ShaderPhaseType.global_vertex] = this._vs_shader_methods[egret3d.ShaderPhaseType.global_vertex] || [];
                //this._vs_shader_methods[ShaderPhaseType.global_vertex].push("particle_vs");
                this._fs_shader_methods[egret3d.ShaderPhaseType.shadow_fragment] = this._fs_shader_methods[egret3d.ShaderPhaseType.shadow_fragment] || [];
            }
            if (this._materialData.shaderPhaseTypes[egret3d.PassType.diffusePass].indexOf(egret3d.ShaderPhaseType.diffuse_fragment) != -1) {
                this._fs_shader_methods[egret3d.ShaderPhaseType.diffuse_fragment] = [];
                this._fs_shader_methods[egret3d.ShaderPhaseType.diffuse_fragment].push("diffuse_fragment");
            }
            if (this._materialData.shaderPhaseTypes[egret3d.PassType.diffusePass].indexOf(egret3d.ShaderPhaseType.normal_fragment) != -1) {
                this._fs_shader_methods[egret3d.ShaderPhaseType.normal_fragment] = [];
                this._fs_shader_methods[egret3d.ShaderPhaseType.normal_fragment].push("normalMap_fragment");
            }
            if (this._materialData.shaderPhaseTypes[egret3d.PassType.diffusePass].indexOf(egret3d.ShaderPhaseType.specular_fragment) != -1) {
                this._fs_shader_methods[egret3d.ShaderPhaseType.specular_fragment] = [];
                this._fs_shader_methods[egret3d.ShaderPhaseType.specular_fragment].push("specularMap_fragment");
            }
            if (this._materialData.shaderPhaseTypes[egret3d.PassType.diffusePass].indexOf(egret3d.ShaderPhaseType.matCap_fragment) != -1) {
                this._fs_shader_methods[egret3d.ShaderPhaseType.matCap_fragment] = [];
                this._fs_shader_methods[egret3d.ShaderPhaseType.matCap_fragment].push("matCap_TextureMult_fs");
            }
            if (this.lightGroup) {
                this._passUsage.maxDirectLight = this.lightGroup.directLightList.length;
                this._passUsage.maxSpotLight = this.lightGroup.spotLightList.length;
                this._passUsage.maxPointLight = this.lightGroup.pointLightList.length;
                this._vs_shader_methods[egret3d.ShaderPhaseType.local_vertex] = this._vs_shader_methods[egret3d.ShaderPhaseType.local_vertex] || [];
                this._fs_shader_methods[egret3d.ShaderPhaseType.lighting_fragment] = [];
                this._fs_shader_methods[egret3d.ShaderPhaseType.lighting_fragment].push("lightingBase_fs");
                if (this.lightGroup.directLightList.length) {
                    this._passUsage.directLightData = new Float32Array(egret3d.DirectLight.stride * this.lightGroup.directLightList.length);
                    this._vs_shader_methods[egret3d.ShaderPhaseType.local_vertex].push("varyingViewDir_vs");
                    this._fs_shader_methods[egret3d.ShaderPhaseType.lighting_fragment].push("directLight_fragment");
                }
                if (this.lightGroup.spotLightList.length) {
                    this._passUsage.spotLightData = new Float32Array(egret3d.SpotLight.stride * this.lightGroup.spotLightList.length);
                    this._fs_shader_methods[egret3d.ShaderPhaseType.lighting_fragment].push("spotLight_fragment");
                }
                if (this.lightGroup.pointLightList.length) {
                    this._passUsage.pointLightData = new Float32Array(egret3d.PointLight.stride * this.lightGroup.pointLightList.length);
                    this._fs_shader_methods[egret3d.ShaderPhaseType.lighting_fragment].push("pointLight_fragment");
                }
            }
            this.initOthreMethods();
            //pre Phase end ---------------------------------------------------
            this.phaseEnd(animation);
        };
        MaterialPass.prototype.phaseEnd = function (animation) {
            var shaderList;
            //---vs---shadering
            //utils Phase
            shaderList = this._vs_shader_methods[egret3d.ShaderPhaseType.utils_vertex];
            if (shaderList && shaderList.length > 0)
                this.addMethodShaders(this._passUsage.vertexShader, shaderList);
            //base Phase
            shaderList = this._vs_shader_methods[egret3d.ShaderPhaseType.base_vertex];
            if (shaderList && shaderList.length > 0) {
                this.addMethodShaders(this._passUsage.vertexShader, shaderList);
            }
            else {
                this.addMethodShaders(this._passUsage.vertexShader, ["base_vs"]);
                //start Phase
                shaderList = this._vs_shader_methods[egret3d.ShaderPhaseType.start_vertex];
                if (shaderList && shaderList.length > 0)
                    this.addMethodShaders(this._passUsage.vertexShader, shaderList);
                else
                    this.addMethodShaders(this._passUsage.vertexShader, ["diffuse_vertex"]);
                //local
                shaderList = this._vs_shader_methods[egret3d.ShaderPhaseType.local_vertex];
                if (shaderList && shaderList.length > 0)
                    this.addMethodShaders(this._passUsage.vertexShader, shaderList);
                //global
                shaderList = this._vs_shader_methods[egret3d.ShaderPhaseType.global_vertex];
                if (shaderList && shaderList.length > 0)
                    this.addMethodShaders(this._passUsage.vertexShader, shaderList);
                //end
                shaderList = this._vs_shader_methods[egret3d.ShaderPhaseType.end_vertex];
                if (shaderList && shaderList.length > 0)
                    this.addMethodShaders(this._passUsage.vertexShader, shaderList);
                else
                    this.addMethodShaders(this._passUsage.vertexShader, ["end_vs"]);
                this.addMethodShaders(this._passUsage.vertexShader, ["out_vs"]);
            }
            //---vs---shadering-------------------------------------------------
            //---fs---shadering-------------------------------------------------
            //utils Phase
            shaderList = this._fs_shader_methods[egret3d.ShaderPhaseType.utils_fragment];
            if (shaderList && shaderList.length > 0)
                this.addMethodShaders(this._passUsage.fragmentShader, shaderList);
            shaderList = this._fs_shader_methods[egret3d.ShaderPhaseType.base_fragment];
            if (shaderList && shaderList.length > 0) {
                this.addMethodShaders(this._passUsage.fragmentShader, shaderList);
            }
            else {
                this.addMethodShaders(this._passUsage.fragmentShader, ["base_fs"]);
                //start
                shaderList = this._fs_shader_methods[egret3d.ShaderPhaseType.start_fragment];
                if (shaderList && shaderList.length > 0)
                    this.addMethodShaders(this._passUsage.fragmentShader, shaderList);
                //materialsource
                shaderList = this._fs_shader_methods[egret3d.ShaderPhaseType.materialsource_fragment];
                if (shaderList && shaderList.length > 0)
                    this.addMethodShaders(this._passUsage.fragmentShader, shaderList);
                else
                    this.addMethodShaders(this._passUsage.fragmentShader, ["materialSource_fs"]);
                //diffuse
                shaderList = this._fs_shader_methods[egret3d.ShaderPhaseType.diffuse_fragment];
                if (shaderList && shaderList.length > 0)
                    this.addMethodShaders(this._passUsage.fragmentShader, shaderList);
                else
                    this.addMethodShaders(this._passUsage.fragmentShader, ["diffuse_fragment"]);
                //normal
                shaderList = this._fs_shader_methods[egret3d.ShaderPhaseType.normal_fragment];
                if (shaderList && shaderList.length > 0)
                    this.addMethodShaders(this._passUsage.fragmentShader, shaderList);
                //else
                //    this.addMethodShaders(this._passUsage.fragmentShader, ["normalMap_fragment"]);
                //else
                //    this.addMethodShaders(this._passUsage.fragmentShader, ["specularMap_fragment"]);
                //shadow
                shaderList = this._fs_shader_methods[egret3d.ShaderPhaseType.shadow_fragment];
                if (shaderList && shaderList.length > 0)
                    this.addMethodShaders(this._passUsage.fragmentShader, shaderList);
                //specular
                shaderList = this._fs_shader_methods[egret3d.ShaderPhaseType.specular_fragment];
                if (shaderList && shaderList.length > 0)
                    this.addMethodShaders(this._passUsage.fragmentShader, shaderList);
                //lighting
                shaderList = this._fs_shader_methods[egret3d.ShaderPhaseType.lighting_fragment];
                if (shaderList && shaderList.length > 0)
                    this.addMethodShaders(this._passUsage.fragmentShader, shaderList);
                //matCap
                shaderList = this._fs_shader_methods[egret3d.ShaderPhaseType.matCap_fragment];
                if (shaderList && shaderList.length > 0)
                    this.addMethodShaders(this._passUsage.fragmentShader, shaderList);
                //else 
                //    this.addMethodShaders(this._passUsage.fragmentShader, ["matCap_TextureAdd_fs"]);
                //end
                shaderList = this._fs_shader_methods[egret3d.ShaderPhaseType.end_fragment];
                if (shaderList && shaderList.length > 0)
                    this.addMethodShaders(this._passUsage.fragmentShader, shaderList);
                else {
                    this.addMethodShaders(this._passUsage.fragmentShader, ["end_fs"]);
                }
                //multi_end_fragment
                shaderList = this._fs_shader_methods[egret3d.ShaderPhaseType.multi_end_fragment];
                if (shaderList && shaderList.length > 0)
                    this.addMethodShaders(this._passUsage.fragmentShader, shaderList);
                this.addMethodShaders(this._passUsage.fragmentShader, ["out_fs"]);
            }
            //---fs---shadering-------------------------------------------------
        };
        /**
        * @private
        */
        MaterialPass.prototype.upload = function (time, delay, context3DProxy, modeltransform, camera3D, animation, geometry, renderQuen) {
            //if (this._passChange && this._passUsage) {
            //    //delete this._passUsage; 
            //    //Context3DProxy.gl.deleteProgram(this._passUsage.program3D.program);
            //    this._passChange = false;
            //}
            this._passChange = false;
            this.initUseMethod(animation, geometry);
            this._passUsage.vertexShader.shader = this._passUsage.vertexShader.getShader(this._passUsage);
            this._passUsage.fragmentShader.shader = this._passUsage.fragmentShader.getShader(this._passUsage);
            //this._passUsage.program3D = context3DProxy.creatProgram(this._passUsage.vertexShader.shader, this._passUsage.fragmentShader.shader);
            this._passUsage.program3D = egret3d.ShaderPool.getProgram(this._passUsage.vertexShader.shader.id, this._passUsage.fragmentShader.shader.id);
            for (var property in this._passUsage) {
                if (property.indexOf("uniform") != -1) {
                    if (this._passUsage[property]) {
                        this._passUsage[property].uniformIndex = context3DProxy.getUniformLocation(this._passUsage.program3D, property);
                    }
                }
            }
            var sampler2D;
            for (var index in this._passUsage.sampler2DList) {
                sampler2D = this._passUsage.sampler2DList[index];
                sampler2D.uniformIndex = context3DProxy.getUniformLocation(this._passUsage.program3D, sampler2D.varName);
                sampler2D.texture = this._materialData[sampler2D.varName];
            }
            var sampler3D;
            for (var index in this._passUsage.sampler3DList) {
                sampler3D = this._passUsage.sampler3DList[index];
                sampler3D.uniformIndex = context3DProxy.getUniformLocation(this._passUsage.program3D, sampler3D.varName);
            }
            if (this.methodList) {
                for (var i = 0; i < this.methodList.length; i++) {
                    this.methodList[i].upload(time, delay, this._passUsage, null, context3DProxy, modeltransform, camera3D, renderQuen);
                }
            }
        };
        /**
        * @private
        */
        MaterialPass.prototype.draw = function (time, delay, context3DProxy, modeltransform, camera3D, subGeometry, render, renderQuen) {
            if (!this.enable)
                return;
            if (this._materialData.materialDataNeedChange) {
                //this._materialData.materialDataNeedChange = false;
                var tintValue = this._materialData.tintColor;
                var tintAlpha = tintValue >> 24 & 0xff;
                var tintRed = tintValue >> 16 & 0xff;
                var tintGreen = tintValue >> 8 & 0xff;
                var tintBlue = tintValue & 0xff;
                tintAlpha /= 0x80;
                tintRed /= 0x80;
                tintGreen /= 0x80;
                tintBlue /= 0x80;
                this._materialData.materialSourceData[0] = tintRed * (this._materialData.diffuseColor >> 16 & 0xff) / 255.0;
                this._materialData.materialSourceData[1] = tintGreen * (this._materialData.diffuseColor >> 8 & 0xff) / 255.0;
                this._materialData.materialSourceData[2] = tintBlue * (this._materialData.diffuseColor & 0xff) / 255.0;
                this._materialData.materialSourceData[3] = (this._materialData.ambientColor >> 16 & 0xff) / 255.0;
                this._materialData.materialSourceData[4] = (this._materialData.ambientColor >> 8 & 0xff) / 255.0;
                this._materialData.materialSourceData[5] = (this._materialData.ambientColor & 0xff) / 255.0;
                this._materialData.materialSourceData[6] = (this._materialData.specularColor >> 16 & 0xff) / 255.0;
                this._materialData.materialSourceData[7] = (this._materialData.specularColor >> 8 & 0xff) / 255.0;
                this._materialData.materialSourceData[8] = (this._materialData.specularColor & 0xff) / 255.0;
                this._materialData.materialSourceData[9] = tintAlpha * this._materialData.alpha;
                this._materialData.materialSourceData[10] = this._materialData.cutAlpha;
                this._materialData.materialSourceData[11] = this._materialData.gloss;
                this._materialData.materialSourceData[12] = this._materialData.specularLevel;
                //this._materialData.materialSourceData[13] = this._materialData.normalDir;
                this._materialData.materialSourceData[13] = this._materialData.uvRectangle.x;
                this._materialData.materialSourceData[14] = this._materialData.uvRectangle.y; //保留
                this._materialData.materialSourceData[15] = this._materialData.uvRectangle.width; //保留
                this._materialData.materialSourceData[16] = this._materialData.uvRectangle.height; //保留
                this._materialData.materialSourceData[17] = this._materialData.gamma; //保留refraction
                this._materialData.materialSourceData[18] = this._materialData.refraction; //保留
                this._materialData.materialSourceData[19] = this._materialData.refractionintensity; //保留
            }
            if (this._passChange) {
                this.upload(time, delay, context3DProxy, modeltransform, camera3D, render.animation, subGeometry.geometry, renderQuen);
            }
            context3DProxy.setProgram(this._passUsage.program3D);
            subGeometry.activeState(time, delay, this._passUsage, context3DProxy);
            if (this._materialData.depthTest) {
                context3DProxy.enableDepth();
                context3DProxy.depthFunc(egret3d.ContextConfig.LEQUAL);
            }
            else {
                context3DProxy.disableDepth();
                context3DProxy.depthFunc(egret3d.ContextConfig.LEQUAL);
            }
            if (this._materialData.acceptShadow) {
                if (renderQuen.renderDictionary[egret3d.PassType.shadowPass] && this._shadowMethod)
                    this._shadowMethod.shadowMapTexture = renderQuen.renderDictionary[egret3d.PassType.shadowPass].renderTexture;
            }
            //Context3DProxy.gl.clearColor(0.0,0.0,0.0,1.0);
            //Context3DProxy.gl.stencilOp(Context3DProxy.gl.BACK, Context3DProxy.gl.KEEP, Context3DProxy.gl.KEEP);
            context3DProxy.setCulling(this._materialData.cullFrontOrBack);
            if (this._materialData.bothside) {
                context3DProxy.disableCullFace();
            }
            else
                context3DProxy.enableCullFace();
            if (this._passID == egret3d.PassType.shadowPass) {
                //if (this._materialData.alphaBlending)
                //    Context3DProxy.gl.depthMask(false);
                context3DProxy.disableBlend();
                context3DProxy.setBlendFactors(egret3d.ContextConfig.ONE, egret3d.ContextConfig.ZERO);
            }
            else {
                if (!this._materialData.depthWrite) {
                    egret3d.Context3DProxy.gl.depthMask(false);
                }
                context3DProxy.enableBlend();
                context3DProxy.setBlendFactors(this._materialData.blend_src, this._materialData.blend_dest);
            }
            if (this._passUsage.uniform_materialSource) {
                context3DProxy.uniform1fv(this._passUsage.uniform_materialSource.uniformIndex, this._materialData.materialSourceData);
            }
            if (this._materialData.textureChange) {
                this.resetTexture(context3DProxy);
            }
            //texture 2D
            var sampler2D;
            var texture;
            for (var index in this._passUsage.sampler2DList) {
                sampler2D = this._passUsage.sampler2DList[index];
                sampler2D.texture = this._materialData[sampler2D.varName];
                if (!sampler2D.texture) {
                    continue;
                }
                texture = sampler2D.texture.parentTexture ? sampler2D.texture.parentTexture : sampler2D.texture;
                texture.upload(context3DProxy);
                context3DProxy.setTexture2DAt(sampler2D.activeTextureIndex, sampler2D.uniformIndex, sampler2D.index, texture.texture2D);
                if (texture.useMipmap)
                    texture.useMipmap = this._materialData.useMipmap;
                texture.repeat = this._materialData.repeat;
                texture.activeState(context3DProxy);
                this._materialData.textureStateChage = false;
            }
            var sampler3D;
            for (var index in this._passUsage.sampler3DList) {
                sampler3D = this._passUsage.sampler3DList[index];
                sampler3D.texture = this._materialData[sampler3D.varName];
                if (!sampler3D.texture) {
                    continue;
                }
                sampler3D.texture.upload(context3DProxy);
                context3DProxy.setCubeTextureAt(sampler3D.activeTextureIndex, sampler3D.uniformIndex, sampler3D.index, sampler3D.texture.texture3D);
            }
            var i = 0;
            if (this.lightGroup) {
                for (i = 0; i < this._passUsage.maxDirectLight; i++) {
                    this.lightGroup.directLightList[i].updateLightData(camera3D, i, this._passUsage.directLightData);
                }
                for (i = 0; i < this._passUsage.maxSpotLight; i++) {
                    this.lightGroup.spotLightList[i].updateLightData(camera3D, i, this._passUsage.spotLightData);
                }
                for (i = 0; i < this._passUsage.maxPointLight; i++) {
                    this.lightGroup.pointLightList[i].updateLightData(camera3D, i, this._passUsage.pointLightData);
                }
                if (this._passUsage.uniform_directLightSource)
                    context3DProxy.uniform1fv(this._passUsage.uniform_directLightSource.uniformIndex, this._passUsage.directLightData);
                if (this._passUsage.uniform_sportLightSource)
                    context3DProxy.uniform1fv(this._passUsage.uniform_sportLightSource.uniformIndex, this._passUsage.spotLightData);
                if (this._passUsage.uniform_pointLightSource)
                    context3DProxy.uniform1fv(this._passUsage.uniform_pointLightSource.uniformIndex, this._passUsage.pointLightData);
            }
            if (this._passUsage.uniform_ModelMatrix) {
                context3DProxy.uniformMatrix4fv(this._passUsage.uniform_ModelMatrix.uniformIndex, false, modeltransform.rawData);
            }
            if (this._passUsage.uniform_ViewMatrix) {
                context3DProxy.uniformMatrix4fv(this._passUsage.uniform_ViewMatrix.uniformIndex, false, camera3D.viewMatrix.rawData);
            }
            if (this._passUsage.uniform_ProjectionMatrix) {
                context3DProxy.uniformMatrix4fv(this._passUsage.uniform_ProjectionMatrix.uniformIndex, false, camera3D.projectMatrix.rawData);
            }
            if (this._passUsage.uniform_ViewProjectionMatrix) {
                context3DProxy.uniformMatrix4fv(this._passUsage.uniform_ViewProjectionMatrix.uniformIndex, false, camera3D.viewProjectionMatrix.rawData);
            }
            if (this._passUsage.uniform_orthProjectMatrix) {
                context3DProxy.uniformMatrix4fv(this._passUsage.uniform_orthProjectMatrix.uniformIndex, false, camera3D.orthProjectionMatrix.rawData);
            }
            if (render.animation) {
                render.animation.activeState(time, delay, this._passUsage, subGeometry, context3DProxy, modeltransform, camera3D);
            }
            if (this.methodList) {
                for (var i = 0; i < this.methodList.length; i++) {
                    this.methodList[i].activeState(time, delay, this._passUsage, null, context3DProxy, modeltransform, camera3D, renderQuen);
                }
            }
            if (this._passUsage.uniform_eyepos) {
                context3DProxy.uniform3f(this._passUsage.uniform_eyepos.uniformIndex, camera3D.x, camera3D.y, camera3D.z);
            }
            if (this._passUsage.uniform_cameraMatrix) {
                context3DProxy.uniformMatrix4fv(this._passUsage.uniform_cameraMatrix.uniformIndex, false, camera3D.modelMatrix.rawData);
            }
            if (this._passUsage["uniform_billboardMatrix"]) {
                var matrix;
                switch (render.billboard) {
                    case egret3d.BillboardType.STANDARD:
                        matrix = camera3D.billboardXYZ;
                        break;
                    case egret3d.BillboardType.X_AXIS:
                        matrix = camera3D.billboardX;
                        break;
                    case egret3d.BillboardType.Y_AXIS:
                        matrix = camera3D.billboardY;
                        break;
                    case egret3d.BillboardType.Z_AXIS:
                        matrix = camera3D.billboardZ;
                        break;
                    case egret3d.BillboardType.DISABLE:
                        matrix = egret3d.Matrix4.helpMatrix;
                        matrix.identity();
                        break;
                }
                context3DProxy.uniformMatrix4fv(this._passUsage["uniform_billboardMatrix"].uniformIndex, false, matrix.rawData);
            }
            if (this._passUsage["uniform_ObjectId"]) {
                var objectId = egret3d.Color.getColor(render.id, egret3d.ContextConfig.ColorFormat_RGBA8888, egret3d.Vector3.HELP_0);
                context3DProxy.uniform3fv(this._passUsage["uniform_ObjectId"].uniformIndex, [objectId.x, objectId.y, objectId.z]);
            }
            context3DProxy.drawElement(this._materialData.drawMode, subGeometry.start * Uint16Array.BYTES_PER_ELEMENT, subGeometry.count);
            // gl.drawElements(gl.POINTS, 8, gl.UNSIGNED_INT, 0);
            if (!this._materialData.depthWrite) {
                egret3d.Context3DProxy.gl.depthMask(true);
            }
        };
        MaterialPass.prototype.deactiveState = function (passUsage, context3DProxy) {
            var sampler2D;
            for (var index in passUsage.sampler2DList) {
                sampler2D = this._passUsage.sampler2DList[index];
                if (!sampler2D.texture) {
                    continue;
                }
                context3DProxy.disableTexture2DAt(sampler2D.activeTextureIndex, sampler2D.uniformIndex, sampler2D.index);
            }
        };
        /**
        * @language zh_CN
        * 释放接口
        * @version Egret 3.0
        * @platform Web,Native
        */
        MaterialPass.prototype.dispose = function () {
            if (this._passUsage) {
                this._passUsage.dispose();
            }
            this._passUsage = null;
        };
        return MaterialPass;
    }());
    egret3d.MaterialPass = MaterialPass;
    __reflect(MaterialPass.prototype, "egret3d.MaterialPass");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=MaterialPass.js.map