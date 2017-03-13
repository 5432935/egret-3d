var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @language zh_CN
    * @class egret3d.OutLinePass
    * @classdesc
    * 材质球描边特效
    * @version Egret 3.0
    * @platform Web,Native
    */
    var OutLinePass = (function (_super) {
        __extends(OutLinePass, _super);
        function OutLinePass() {
            var _this = _super.call(this, null) || this;
            _this.outline = new Float32Array(5);
            _this._passID = egret3d.PassType.colorPass;
            _this.outline[0] = 0.2;
            _this.outline[1] = 1.0;
            _this.outline[2] = 0.0;
            _this.outline[3] = 0.0;
            _this.outline[4] = 1.0;
            return _this;
        }
        Object.defineProperty(OutLinePass.prototype, "outLineColor", {
            /**
            * @language zh_CN
            * @public
            * @param  val 获取描边线框的现实颜色。
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return egret3d.Color.RGBAToColor(this.outline[1], this.outline[2], this.outline[3], this.outline[4]);
            },
            /**
            * @language zh_CN
            * @public
            * @param  val 设置描边线框的现实颜色。
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (val) {
                var color = egret3d.Color.getColor(val);
                this.outline[1] = color.x;
                this.outline[2] = color.y;
                this.outline[3] = color.z;
                this.outline[4] = color.w;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OutLinePass.prototype, "outLineSize", {
            /**
            * @language zh_CN
            * @public
            * @param  size 获取描边线框的尺寸大小 从0开始的数值，可以无限大，一般在0~1之间会有意义。
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.outline[0];
            },
            /**
            * @language zh_CN
            * @public
            * @param  size 设置描边线框的尺寸大小 从0开始的数值，可以无限大，一般在0~1之间会有意义。
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (size) {
                this.outline[0] = size;
            },
            enumerable: true,
            configurable: true
        });
        /**
       * @language zh_CN
       * @private
       * 初始化 UseMethod。
       * @version Egret 3.0
       * @platform Web,Native
       */
        OutLinePass.prototype.initUseMethod = function (animation, geom) {
            var i = 0;
            this._passChange = false;
            this._passUsage = new egret3d.PassUsage();
            this._passUsage.vertexShader.shaderType = egret3d.Shader.vertex;
            this._passUsage.fragmentShader.shaderType = egret3d.Shader.fragment;
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
            this._vs_shader_methods[egret3d.ShaderPhaseType.global_vertex] = this._vs_shader_methods[egret3d.ShaderPhaseType.global_vertex] || [];
            this._vs_shader_methods[egret3d.ShaderPhaseType.global_vertex].push("outLine_vs");
            this._fs_shader_methods[egret3d.ShaderPhaseType.end_fragment] = this._fs_shader_methods[egret3d.ShaderPhaseType.end_fragment] || [];
            this._fs_shader_methods[egret3d.ShaderPhaseType.end_fragment].push("outLine_fs");
            this.phaseEnd(animation);
        };
        /**
        * @private
        */
        OutLinePass.prototype.upload = function (time, delay, context3DProxy, modeltransform, camera3D, animation, geometry, renderQuen) {
            _super.prototype.upload.call(this, time, delay, context3DProxy, modeltransform, camera3D, animation, geometry, renderQuen);
        };
        /**
        * @private
        */
        //public draw(time: number, delay: number, context3DProxy: Context3DProxy, modeltransform: Matrix4, camera3D: Camera3D, subGeometry: SubGeometry, render: IRender) {
        //    var depthTest: boolean = this._materialData.depthTest;
        //    var bothside: boolean = this._materialData.bothside;
        //    this._materialData.depthTest = false;
        //    this._materialData.bothside = true;
        //    super.draw(time, delay, context3DProxy, modeltransform, camera3D, subGeometry, render);
        //    this._materialData.depthTest = depthTest;
        //    this._materialData.bothside = bothside;
        //}
        /**
      * @private
      */
        OutLinePass.prototype.draw = function (time, delay, context3DProxy, modeltransform, camera3D, subGeometry, render, renderQuen) {
            if (!this.enable)
                return;
            if (this._passChange) {
                this.upload(time, delay, context3DProxy, modeltransform, camera3D, render.animation, subGeometry.geometry, renderQuen);
            }
            context3DProxy.setProgram(this._passUsage.program3D);
            subGeometry.activeState(time, delay, this._passUsage, context3DProxy);
            egret3d.Context3DProxy.gl.depthMask(false);
            if (this._passUsage.uniform_materialSource) {
                context3DProxy.uniform1fv(this._passUsage.uniform_materialSource.uniformIndex, this._materialData.materialSourceData);
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
            if (this._passUsage["uniform_ouline"]) {
                context3DProxy.uniform1fv(this._passUsage["uniform_ouline"].uniformIndex, this.outline);
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
            context3DProxy.drawElement(this._materialData.drawMode, subGeometry.start, subGeometry.count);
            egret3d.Context3DProxy.gl.depthMask(true);
        };
        return OutLinePass;
    }(egret3d.MaterialPass));
    egret3d.OutLinePass = OutLinePass;
    __reflect(OutLinePass.prototype, "egret3d.OutLinePass");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=OutLinePass.js.map