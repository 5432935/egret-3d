var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @class egret3d.MaterialBase
    * @classdesc
    * 材质球共有的基础类型，封装了材质球共有的基础数据设置方法。</p>
    * 提供控制模型渲染的效果
    * 比如：
    * 默认贴图、法线贴图、高光贴图、
    * 裁剪模式、渲染方式等内容
    * 不同的渲染通道pass。</p>
    * @version Egret 3.0
    * @platform Web,Native
    */
    var MaterialBase = (function () {
        /**
        * @language zh_CN
        * @class egret3d.MaterialBase
        * @classdesc
        * TerrainMaterial,TextureMaterial 的基类。</p>
        * 材质球共有的基础类型，封装了材质球共有的基础数据设置方法。</p>
        * 不同的渲染通道pass。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        function MaterialBase(materialData) {
            if (materialData === void 0) { materialData = null; }
            /**
             * @language zh_CN
             * @private
             * @version Egret 3.0
             * @platform Web,Native
             */
            //public diffusePass: MaterialPass; 
            //public shadowPass: MaterialPass; 
            this.passes = {};
            if (materialData == null) {
                this.setData(new egret3d.MaterialData());
            }
            else
                this.setData(materialData);
        }
        /**
         * @language zh_CN
         * @private
         * @version Egret 3.0
         * @platform Web,Native
         */
        MaterialBase.prototype.setData = function (data) {
            this.materialData = data;
            this.initPass();
            this.blendMode = egret3d.BlendMode.NORMAL;
        };
        /**
         * @language zh_CN
         * @private
         * @version Egret 3.0
         * @platform Web,Native
         */
        MaterialBase.prototype.getData = function () {
            return this.materialData;
        };
        MaterialBase.prototype.initPass = function () {
            //this.passes[PassType.diffusePass] = new ColorPass(this.materialData);
            this.creatPass(egret3d.PassType.colorPass);
            //this.addPass(PassType.normalPass);
            //this.addPass(PassType.depthPass_8);
        };
        Object.defineProperty(MaterialBase.prototype, "lightGroup", {
            /**
             * @language zh_CN
             * 获取材质球接受的灯光组。
             * @returns LightGroup 灯光组
             * @version Egret 3.0
             * @platform Web,Native
             */
            get: function () {
                return this._lightGroup;
            },
            /**
             * @language zh_CN
             * 设置材质 lightGroup 。
             * 设置材质球接受的灯光组。
             * @param lightGroup LightGroup
             * @version Egret 3.0
             * @platform Web,Native
             */
            set: function (group) {
                this._lightGroup = group;
                if (this.passes[egret3d.PassType.diffusePass] && this.passes[egret3d.PassType.diffusePass].length > 0) {
                    for (var i = 0; i < this.passes[egret3d.PassType.diffusePass].length; i++) {
                        this.passes[egret3d.PassType.diffusePass][i].lightGroup = group;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "depth", {
            /**
            * @language zh_CN
            * 返回深度测试
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.materialData.depthTest;
            },
            /**
             * @language zh_CN
             * 设置材质 shadowMapTexture 。
             * 设置材质球的阴影贴图。
             * @param texture ITexture
             * @version Egret 3.0
             * @platform Web,Native
             */
            //public set shadowMapTexture(texture: ITexture) {
            //    if (texture) {
            //        this.materialData.shadowMapTexture = texture;
            //        this.materialData.textureChange = true;
            //        //if (this.materialData.shaderPhaseTypes.indexOf(ShaderPhaseType.shadow_fragment) == -1) {
            //        //    this.materialData.shaderPhaseTypes.push(ShaderPhaseType.shadow_fragment);
            //        //    this.diffusePass.passInvalid();
            //        //}
            //    }
            //}
            /**
            * @language zh_CN
            * 返回材质 shadowMapTexture。
            * 返回材质球的阴影贴图。
            * @returns ITexture 阴影贴图
            * @version Egret 3.0
            * @platform Web,Native
            */
            //public get shadowMapTexture(): ITexture {
            //    return this.materialData.shadowMapTexture;
            //}
            /**
             * @language zh_CN
             * 设置是否开启深度测试
             * @param bool 是否开启深度测试
             * @version Egret 3.0
             * @platform Web,Native
             */
            set: function (bool) {
                this.materialData.depthTest = bool;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "depthWrite", {
            /**
            * @language zh_CN
            * 返回深度写入开关
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.materialData.depthWrite;
            },
            /**
            * @language zh_CN
            * 设置深度写入开关
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (v) {
                this.materialData.depthWrite = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "depthMode", {
            /**
            * @language zh_CN
            * 返回深度测试方式
            * @param texture ITexture
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.materialData.depthMode;
            },
            /**
             * @language zh_CN
             * 设置是否开启深度测试方式
             * @param v 模式
             * @version Egret 3.0
             * @platform Web,Native
             */
            set: function (v) {
                this.materialData.depthMode = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "diffuseTexture", {
            /**
            * @language zh_CN
            * 返回材质 diffuseTexture。
            * 返回材质球的漫反射贴图。
            * @returns ITexture 漫反射贴图
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.materialData.diffuseTexture;
            },
            /**
             * @language zh_CN
             * 设置材质 diffuseTexture 。
             * 设置材质球的漫反射贴图。
             * @param texture ITexture
             * @version Egret 3.0
             * @platform Web,Native
             */
            set: function (texture) {
                if (texture) {
                    this.materialData.diffuseTexture = texture;
                    this.materialData.textureChange = true;
                    if (this.materialData.shaderPhaseTypes[egret3d.PassType.diffusePass] && this.materialData.shaderPhaseTypes[egret3d.PassType.diffusePass].indexOf(egret3d.ShaderPhaseType.diffuse_fragment) == -1) {
                        this.materialData.shaderPhaseTypes[egret3d.PassType.diffusePass].push(egret3d.ShaderPhaseType.diffuse_fragment);
                    }
                    if (this.materialData.shaderPhaseTypes[egret3d.PassType.shadowPass] && this.materialData.shaderPhaseTypes[egret3d.PassType.shadowPass].indexOf(egret3d.ShaderPhaseType.diffuse_fragment) == -1) {
                        this.materialData.shaderPhaseTypes[egret3d.PassType.shadowPass].push(egret3d.ShaderPhaseType.diffuse_fragment);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "diffuseTexture3D", {
            /**
            * @language zh_CN
            * 返回材质 diffuseTexture3D
            * @returns CubeTexture 漫反射贴图
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.materialData["diffuseTexture3D"];
            },
            /**
            * @language zh_CN
            * 设置材质 diffuseTexture3D
            * @param texture CubeTexutre
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (texture) {
                if (texture) {
                    this.materialData["diffuseTexture3D"] = texture;
                    this.materialData.textureChange = true;
                    if (this.materialData.shaderPhaseTypes[egret3d.PassType.diffusePass] && this.materialData.shaderPhaseTypes[egret3d.PassType.diffusePass].indexOf(egret3d.ShaderPhaseType.diffuse_fragment) == -1) {
                        this.materialData.shaderPhaseTypes[egret3d.PassType.diffusePass].push(egret3d.ShaderPhaseType.diffuse_fragment);
                    }
                    if (this.materialData.shaderPhaseTypes[egret3d.PassType.shadowPass] && this.materialData.shaderPhaseTypes[egret3d.PassType.shadowPass].indexOf(egret3d.ShaderPhaseType.diffuse_fragment) == -1) {
                        this.materialData.shaderPhaseTypes[egret3d.PassType.shadowPass].push(egret3d.ShaderPhaseType.diffuse_fragment);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "normalTexture", {
            /**
             * @language zh_CN
             * 得到材质球的凹凸法线贴图。
             * @returns ITexture
             * @version Egret 3.0
             * @platform Web,Native
             */
            get: function () {
                return this.materialData.normalTexture;
            },
            /**
             * @language zh_CN
             * 设置材质 normalTexture 。
             * 设置材质球的凹凸法线贴图。
             * @param texture {TextureBase}
             * @version Egret 3.0
             * @platform Web,Native
             */
            set: function (texture) {
                if (texture) {
                    this.materialData.normalTexture = texture;
                    this.materialData.textureChange = true;
                    if (this.materialData.shaderPhaseTypes[egret3d.PassType.diffusePass] && this.materialData.shaderPhaseTypes[egret3d.PassType.diffusePass].indexOf(egret3d.ShaderPhaseType.normal_fragment) == -1) {
                        this.materialData.shaderPhaseTypes[egret3d.PassType.diffusePass].push(egret3d.ShaderPhaseType.normal_fragment);
                        this.passInvalid(egret3d.PassType.diffusePass);
                    }
                    if (this.materialData.shaderPhaseTypes[egret3d.PassType.matCapPass] && this.materialData.shaderPhaseTypes[egret3d.PassType.matCapPass].indexOf(egret3d.ShaderPhaseType.normal_fragment) == -1) {
                        this.materialData.shaderPhaseTypes[egret3d.PassType.matCapPass].push(egret3d.ShaderPhaseType.normal_fragment);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        MaterialBase.prototype.passInvalid = function (passType) {
            if (this.passes[passType] && this.passes[passType].length > 0) {
                for (var i = 0; i < this.passes[passType].length; i++) {
                    this.passes[passType][i].passInvalid();
                }
            }
        };
        Object.defineProperty(MaterialBase.prototype, "matcapTexture", {
            /**
            * @language zh_CN
            * 得到材质球特殊光效贴图。
            * @returns ITexture
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.materialData.normalTexture;
            },
            /**
              * @language zh_CN
              * 设置材质 matcapTexture 。
              * 设置材质球特殊光效算法。
              * @param texture {TextureBase}
              * @version Egret 3.0
              * @platform Web,Native
              */
            set: function (texture) {
                if (texture) {
                    this.materialData.matcapTexture = texture;
                    this.materialData.textureChange = true;
                    if (this.materialData.shaderPhaseTypes[egret3d.PassType.diffusePass] && this.materialData.shaderPhaseTypes[egret3d.PassType.diffusePass].indexOf(egret3d.ShaderPhaseType.matCap_fragment) == -1) {
                        this.materialData.shaderPhaseTypes[egret3d.PassType.diffusePass].push(egret3d.ShaderPhaseType.matCap_fragment);
                        this.passInvalid(egret3d.PassType.diffusePass);
                    }
                    if (this.materialData.shaderPhaseTypes[egret3d.PassType.matCapPass] && this.materialData.shaderPhaseTypes[egret3d.PassType.matCapPass].indexOf(egret3d.ShaderPhaseType.matCap_fragment) == -1) {
                        this.materialData.shaderPhaseTypes[egret3d.PassType.matCapPass].push(egret3d.ShaderPhaseType.matCap_fragment);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "specularTexture", {
            /**
             * @language zh_CN
             * 得到材质球的高光贴图。
             * @returns ITexture
             * @version Egret 3.0
             * @platform Web,Native
             */
            get: function () {
                return this.materialData.specularTexture;
            },
            /**
             * @language zh_CN
             * 设置材质 specularTexture 。
             * 设置材质球的高光贴图。
             * @param texture {TextureBase}
             * @version Egret 3.0
             * @platform Web,Native
             */
            set: function (texture) {
                if (texture) {
                    this.materialData.specularTexture = texture;
                    this.materialData.textureChange = true;
                    if (this.materialData.shaderPhaseTypes[egret3d.PassType.diffusePass] && this.materialData.shaderPhaseTypes[egret3d.PassType.diffusePass].indexOf(egret3d.ShaderPhaseType.specular_fragment) == -1) {
                        this.materialData.shaderPhaseTypes[egret3d.PassType.diffusePass].push(egret3d.ShaderPhaseType.specular_fragment);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "drawMode", {
            /**
            * @language zh_CN
            * 设置模型渲染模式。模型可以以顶点的方式渲染，线框渲染（会需要特定模型），三角形渲染
            * DrawMode.POINTS
            * DrawMode.LINES
            * DrawMode.TRIANGLES
            * @default DrawMode.TRIANGLES
            * @see egret3d.DrawMode
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.materialData.drawMode;
            },
            /**
            * @language zh_CN
            * 设置模型渲染模式。模型可以以顶点的方式渲染，线框渲染（会需要特定模型），三角形渲染
            * DrawMode.POINTS
            * rawMode.LINES
            * DrawMode.TRIANGLES
            * @default DrawMode.TRIANGLES
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (mode) {
                this.materialData.drawMode = mode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "cutAlpha", {
            /**
            * @language zh_CN
            * 获取模型渲染模式。模型渲染中，带透明贴图的 去除不渲染透明透明部分的阀值
            * 取值范围 0 - 1
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.materialData.cutAlpha;
            },
            /**
            * @language zh_CN
            * 设置模型渲染模式。模型渲染中，带透明贴图的 去除不渲染透明透明部分的阀值
            * 取值范围 0 - 1
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (v) {
                this.materialData.cutAlpha = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "diffuseColor", {
            /**
            * @language zh_CN
            * 获取材质 diffuseColor
            * @returns number 材质 diffuseColor
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.materialData.diffuseColor;
            },
            /**
            * @language zh_CN
            * 设置材质 diffuseColor。
            * 设置 16 进制的漫反射颜色
            * @param color {Number}
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (color) {
                this.materialData.materialDataNeedChange = true;
                this.materialData.diffuseColor = color;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "ambientColor", {
            /**
            * @language zh_CN
            * 获取材质 ambientColor
            * @returns number 材质 ambientColor
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.materialData.ambientColor;
            },
            /**
            * @language zh_CN
            * 设置材质 ambientColor。
            * 设置 16 进制的环境光颜色
            * @param color {Number}
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (color) {
                this.materialData.materialDataNeedChange = true;
                this.materialData.ambientColor = color;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "specularColor", {
            /**
            * @language zh_CN
            * 获取材质 specularColor
            * @returns number 材质 specularColor
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.materialData.specularColor;
            },
            /**
            * @language zh_CN
            * 设置材质 specularColor。
            * 设置 16 进制的镜面光反射颜色
            * @param color {Number}
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (color) {
                this.materialData.materialDataNeedChange = true;
                this.materialData.specularColor = color;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "tintColor", {
            /**
            * @language zh_CN
            * 获取材质 tintColor
            * @returns number 材质 tintColor
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.materialData.tintColor;
            },
            /**
            * @language zh_CN
            * 设置材质色相。
            * 设置 16 进制的色相颜色
            * @param color {Number}
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (color) {
                this.materialData.materialDataNeedChange = true;
                this.materialData.tintColor = color;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "alpha", {
            /**
             * @language zh_CN
             * 返回材质 alpha 值。
             * 返回 alpha 颜色
             * @returns {Number}
             * @version Egret 3.0
             * @platform Web,Native
             */
            get: function () {
                return this.materialData.alpha;
            },
            /**
             * @language zh_CN
             * 设置材质 alpha 值。
             * 设置 材质球的透明度，如果透明度小于1会自动启用 alphablending
             * @param value {Number}
             * @version Egret 3.0
             * @platform Web,Native
             */
            set: function (value) {
                if (this.materialData.alpha != value) {
                    this.materialData.alpha = value;
                    this.materialData.materialDataNeedChange = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "alphaBlending", {
            /**
             * @language zh_CN
             * 返回 alphaBlending 颜色
             * @returns {Number}
             * @version Egret 3.0
             * @platform Web,Native
             */
            get: function () {
                return this.materialData.alphaBlending;
            },
            /**
           * @language zh_CN
           * 设置材质 的alphaBlending 值。
           * 设置 材质球的的alpha是否进行深度排序
           * @param value {Number}
           * @version Egret 3.0
           * @platform Web,Native
           */
            set: function (value) {
                if (this.materialData.alphaBlending != value) {
                    this.materialData.alphaBlending = value;
                    this.materialData.materialDataNeedChange = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "specularLevel", {
            /**
             * @language zh_CN
             * 返回材质 specularLevel 值。
             * 返回材质 材质球的高光强度
             * @returns {Number}
             * @version Egret 3.0
             * @platform Web,Native
             */
            get: function () {
                return this.materialData.specularLevel;
            },
            /**
             * @language zh_CN
             * 设置材质 specularLevel 值。
             * 设置材质球的材质球的高光强度
             * @param value {Number}
             * @version Egret 3.0
             * @platform Web,Native
             */
            set: function (value) {
                if (this.materialData.specularLevel != value) {
                    this.materialData.specularLevel = value;
                    this.materialData.materialDataNeedChange = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "gloss", {
            /**
             * @language zh_CN
             * 返回材质球的镜面平滑程度值。
             * @returns {Number}
             * @version Egret 3.0
             * @platform Web,Native
             */
            get: function () {
                return this.materialData.gloss;
            },
            /**
             * @language zh_CN
             * 设置材质 gloss 值。
             * 设置材质 镜面平滑程度值。
             * @param value {Number}
             * @version Egret 3.0
             * @platform Web,Native
             */
            set: function (value) {
                if (this.materialData.gloss != value) {
                    this.materialData.gloss = value;
                    this.materialData.materialDataNeedChange = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "normalDir", {
            /**
    * @language zh_CN
    * 设置材质法线贴图的Y轴朝向
    * 美术的规范各不统一，轴向不一样，需要调整
    * @param value {Number}
    * @version Egret 3.0
    * @platform Web,Native
    */
            get: function () { return this.materialData.normalDir; },
            /**
            * @language zh_CN
            * 设置材质法线贴图的Y轴朝向
            * 美术的规范各不统一，轴向不一样，需要调整
            * @param value {Number}
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this.materialData.normalDir != value) {
                    this.materialData.normalDir = value;
                    this.materialData.materialDataNeedChange = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "gamma", {
            /**
             * @language zh_CN
             * 返回材质的gamma值。
             * @returns {Number}
             * @version Egret 3.0
             * @platform Web,Native
             */
            get: function () {
                return this.materialData.gamma;
            },
            /**
           * @language zh_CN
           * 矫正材质的gamma值。
           * 调整颜色的饱和对比度。
           * @param value {Number}
           * @version Egret 3.0
           * @platform Web,Native
           */
            set: function (value) {
                if (this.materialData.gamma != value) {
                    this.materialData.gamma = value;
                    this.materialData.materialDataNeedChange = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "refraction", {
            get: function () {
                return this.materialData.refraction;
            },
            set: function (value) {
                if (this.materialData.refraction != value) {
                    this.materialData.refraction = value;
                    this.materialData.materialDataNeedChange = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "refractionintensity", {
            get: function () {
                return this.materialData.refractionintensity;
            },
            set: function (value) {
                if (this.materialData.refractionintensity != value) {
                    this.materialData.refractionintensity = value;
                    this.materialData.materialDataNeedChange = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "uvRectangle", {
            /**
            * @language zh_CN
            * 获取映射贴图UV坐标，区域，用uvRectangle 的方式映射
            * @returns rect Rectangle
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.materialData.uvRectangle;
            },
            /**
            * @language zh_CN
            * 映射贴图UV坐标，设置此材质要显示使用贴图的区域，用uvRectangle 的方式映射
            * @param rect Rectangle
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (rect) {
                this.materialData.uvRectangle.x = rect.x;
                this.materialData.uvRectangle.y = rect.y;
                this.materialData.uvRectangle.width = rect.width;
                this.materialData.uvRectangle.height = rect.height;
                this.materialData.materialDataNeedChange = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "diffusePass", {
            /**
             * @private
             * @language zh_CN
             * 设置材质 ambientPower 值。
             * 设置材质 环境光颜色的强度 值。
             * @param value {Number}
             * @version Egret 3.0
             * @platform Web,Native
             */
            get: function () {
                return this.passes[egret3d.PassType.diffusePass][0];
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @language zh_CN
         * 设置材质 ambientPower 值。
         * 设置材质 环境光颜色的强度 值。
         * @param value {Number}
         * @version Egret 3.0
         * @platform Web,Native
         */
        //public set ambientPower(value: number) {
        //    if (this.materialData.ambientPower != value) {
        //        this.materialData.ambientPower = value;
        //        this.materialData.materialDataNeedChange = true;
        //    }
        //}
        /**
         * @language zh_CN
         * 返回材质 ambientPower 值。
         * 返回材质 环境光颜色的强度 值。
         * @returns {Number}
         * @version Egret 3.0
         * @platform Web,Native
         */
        //public get ambientPower(): number {
        //    return this.materialData.ambientPower;
        //}
        /**
         * @language zh_CN
         * 设置材质 diffusePower 值。
         * 设置材质 漫反射颜色的强度 值。
         * @param value {Number}
         * @version Egret 3.0
         * @platform Web,Native
         */
        //public set diffusePower(value: number) {
        //    if (this.materialData.diffusePower != value) {
        //        this.materialData.diffusePower = value;
        //        this.materialData.materialDataNeedChange = true;
        //    }
        //}
        /**
         * @language zh_CN
         * 返回材质 diffusePower 值。
         * 返回材质 漫反射颜色的强度 值。
         * @returns {Number}
         * @version Egret 3.0
         * @platform Web,Native
         */
        //public get diffusePower(): number {
        //    return this.materialData.diffusePower;
        //}
        /**
         * @language zh_CN
         * 设置材质 normalPower 值。
         * 设置材质 法线的强度 值。
         * @param value {Number}
         * @version Egret 3.0
         * @platform Web,Native
         */
        //public set normalPower(value: number) {
        //    if (this.materialData.normalPower != value) {
        //        this.materialData.normalPower = value;
        //        this.materialData.materialDataNeedChange = true;
        //    }
        //}
        /**
         * @language zh_CN
         * 返回材质 normalPower 值。
         * 返回材质 法线的强度 值。
         * @returns {Number}
         * @version Egret 3.0
         * @platform Web,Native
         */
        //public get normalPower(): number {
        //    return this.materialData.normalPower;
        //}
        /** m
        * @language zh_CN
        * 引擎内部生成pass渲染通道
        * 返回材质 法线的强度 值。
        * @returns {Number}
        * @version Egret 3.0
        * @platform Web,Native
        */
        MaterialBase.prototype.creatPass = function (pass) {
            this.passes[pass] = egret3d.PassUtil.CreatPass(pass, this.materialData);
        };
        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        MaterialBase.prototype.addDiffuseChilderPass = function (pass) {
            if (this.passes[egret3d.PassType.diffusePass]) {
                pass.materialData = this.materialData;
                this.passes[egret3d.PassType.diffusePass].push(pass);
            }
        };
        Object.defineProperty(MaterialBase.prototype, "castShadow", {
            /**
            * @language zh_CN
            * 使用阴影详细请看 ShadowCast
            * @see egret3d.ShadowCast
            * 返回材质 是否产生阴影 值。
            * @returns {boolean}
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.materialData.castShadow;
            },
            /**
            * @language zh_CN
            * 使用阴影详细请看 ShadowCast
            * @see egret3d.ShadowCast
            * 设置材质 castShadow 值。
            * 设置材质是否接受阴影，设置了之后必须要给 shadowmaping 的方法。
            * @param value {boolean}
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this.materialData.castShadow = value;
                if (value) {
                    this.creatPass(egret3d.PassType.shadowPass);
                }
                else {
                    if (this.passes[egret3d.PassType.shadowPass]) {
                        this.disposePass(egret3d.PassType.shadowPass);
                        this.passes[egret3d.PassType.shadowPass] = null;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "castPick", {
            /**
            * @language zh_CN
            * @private
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (value) {
                    egret3d.PickSystem.instance.enablePick = true;
                    this.creatPass(egret3d.PassType.PickPass);
                }
                else {
                    if (this.passes[egret3d.PassType.PickPass]) {
                        this.disposePass(egret3d.PassType.PickPass);
                        this.passes[egret3d.PassType.PickPass] = null;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "acceptShadow", {
            /**
            * @language zh_CN
            * 使用阴影详细请看 ShadowCast
            * @see egret3d.ShadowCast
            * 返回材质 acceptShadow 值。
            * 返回材质是否接受阴影，设置了之后必须要给 shadowmaping 的方法。
            * @returns {boolean}
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.materialData.acceptShadow;
            },
            /**
            * @language zh_CN
            * 使用阴影详细请看 ShadowCast
            * @see egret3d.ShadowCast
            * 设置材质是否是否产生阴影，设置了之后必须要给 shadowmaping 的方法。
            * @param value {boolean}
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this.materialData.acceptShadow == value) {
                    return;
                }
                this.materialData.acceptShadow = value;
                if (this.diffusePass)
                    this.diffusePass.addShadowMethod();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "shadowColor", {
            /**
            * @language zh_CN
            * 返回材质 阴影颜色
            * @returns number 阴影颜色
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                var color = 0;
                color |= this.materialData.shadowColor[0] * 255.0 << 16;
                color |= this.materialData.shadowColor[1] * 255.0 << 8;
                color |= this.materialData.shadowColor[2] * 255.0;
                return color;
            },
            /**
            * @language zh_CN
            * 设置 阴影颜色
            * @param color 0xffffff
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (color) {
                this.materialData.shadowColor[0] = color >> 16 & 0xff / 255.0;
                this.materialData.shadowColor[1] = color >> 8 & 0xff / 255.0;
                this.materialData.shadowColor[2] = color & 0xff / 255.0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "shadowOffset", {
            /**
            * @language zh_CN
            * @private
            * 返回材质 阴影offset
            * @returns number 阴影offset
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.materialData.shadowColor[3];
            },
            /**
            * @language zh_CN
            * @private
            * 设置 阴影offset
            * @param offset
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (offset) {
                this.materialData.shadowColor[3] = offset;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "repeat", {
            /**
            * @language zh_CN
            * 返回材质 repeat 值。
            * 返回材质 是否进行纹理重复采样的方式开关。
            * @returns {boolean}
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.materialData.repeat;
            },
            /**
             * @language zh_CN
             * 设置材质 repeat 值。
             * 设置材质 是否进行纹理重复采样的方式开关。
             * @param value {boolean}
             * @version Egret 3.0
             * @platform Web,Native
             */
            set: function (val) {
                this.materialData.repeat = val;
                this.materialData.textureStateChage = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "bothside", {
            /**
            * @language zh_CN
            * 返回材质 bothside 值。
            * 返回是否显示双面的开关。
            * @returns {boolean}
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.materialData.bothside;
            },
            /**
            * @language zh_CN
            * 设置材质 bothside 值。
            * 设置材质是否显示双面的开关。
            * @param value {boolean}
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (val) {
                this.materialData.textureStateChage = true;
                this.materialData.bothside = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "cullMode", {
            /**
             * @language zh_CN
             * 返回 cull 模式。
             * @returns {Number}
             * @version Egret 3.0
             * @platform Web,Native
             */
            get: function () {
                return this.materialData.cullFrontOrBack;
            },
            /**
            * @language zh_CN
            * 设置 cull 模式 正面渲染三角形或者背面渲染三角形。
            * @see egret3d.ContextConfig.BACK 裁剪反面进行正面渲染
            * @see egret3d.ContextConfig.FRONT 裁剪正面进行反面渲染
            * @param value {Number}
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this.materialData.textureStateChage = true;
                this.materialData.cullFrontOrBack = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "blendMode", {
            /**
            * @language zh_CN
            * 设置材质 blendMode 值。
            * 设置材质球的 混合模式可以参照 blendmode 中的值
            * @see egret3d.BlendMode
            * @param value {BlendMode}
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this.materialData.textureStateChage = true;
                this.materialData.blendMode = value;
                switch (value) {
                    //his.materialData.blend_src = ContextConfig.SRC_ALPHA; 透明
                    //this.materialData.blend_dest = ContextConfig.SRC_COLOR;
                    case egret3d.BlendMode.NORMAL:
                        this.materialData.blend_src = egret3d.ContextConfig.ONE;
                        this.materialData.blend_dest = egret3d.ContextConfig.ONE_MINUS_SRC_ALPHA;
                        this.materialData.alphaBlending = false;
                        break;
                    case egret3d.BlendMode.LAYER:
                        this.materialData.blend_src = egret3d.ContextConfig.SRC_ALPHA;
                        this.materialData.blend_dest = egret3d.ContextConfig.ZERO;
                        this.materialData.alphaBlending = true;
                        break;
                    case egret3d.BlendMode.MULTIPLY:
                        this.materialData.blend_src = egret3d.ContextConfig.ZERO;
                        this.materialData.blend_dest = egret3d.ContextConfig.SRC_COLOR;
                        this.materialData.alphaBlending = true;
                        break;
                    case egret3d.BlendMode.ADD:
                        this.materialData.blend_src = egret3d.ContextConfig.SRC_ALPHA;
                        this.materialData.blend_dest = egret3d.ContextConfig.ONE;
                        this.materialData.alphaBlending = true;
                        break;
                    case egret3d.BlendMode.SOFT_ADD:
                        this.materialData.blend_src = egret3d.ContextConfig.SRC_COLOR;
                        this.materialData.blend_dest = egret3d.ContextConfig.ONE;
                        this.materialData.alphaBlending = true;
                        break;
                    case egret3d.BlendMode.ALPHA:
                        this.materialData.blend_src = egret3d.ContextConfig.ONE;
                        this.materialData.blend_dest = egret3d.ContextConfig.ONE_MINUS_SRC_ALPHA;
                        this.materialData.alphaBlending = true;
                        break;
                    case egret3d.BlendMode.SCREEN:
                        this.materialData.blend_src = egret3d.ContextConfig.ONE;
                        this.materialData.blend_dest = egret3d.ContextConfig.ONE_MINUS_SRC_COLOR;
                        break;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialBase.prototype, "pointSize", {
            /**
            * @language zh_CN
            * 获取点的大小
            * @returns number  点的大小
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.materialData.specularLevel;
            },
            /**
            * @language zh_CN
            * 设置点的大小
            * 只有 DrawMode.POINTS 渲染模式才能有作用
            * @param value  点的大小
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (value == this.materialData.specularLevel) {
                    return;
                }
                this.materialData.specularLevel = value;
                this.materialData.textureStateChage = true;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        MaterialBase.prototype.disposePass = function (passType) {
            for (var i = 0; i < this.passes[passType].length; i++) {
                this.passes[passType][i].dispose();
            }
        };
        /**
         * @language zh_CN
         * @private
         * @param value {BlendMode}
         * @version Egret 3.0
         * @platform Web,Native
         */
        //public renderDiffusePass(time: number, delay: number, matID: number , context3DProxy: Context3DProxy, modeltransform: Matrix4, camera3D: Camera3D, subGeometry: SubGeometry, animtion: IAnimation) {
        //    this.diffusePass.draw(time, delay, context3DProxy, modeltransform, camera3D, subGeometry, animtion);
        //}
        /**
         * @language zh_CN
         * @private
         * @param value {BlendMode}
         * @version Egret 3.0
         * @platform Web,Native
         */
        MaterialBase.prototype.renderXRayPass = function () {
        };
        /**
         * @language zh_CN
         * @private
         * @param value {BlendMode}
         * @version Egret 3.0
         * @platform Web,Native
         */
        MaterialBase.prototype.renderOutlinePass = function () {
        };
        /**
         * @language zh_CN
         * @private
         * @param value {BlendMode}
         * @version Egret 3.0
         * @platform Web,Native
         */
        MaterialBase.prototype.renderNormalPass = function () {
        };
        /**
         * @language zh_CN
         * @private
         * @param value {BlendMode}
         * @version Egret 3.0
         * @platform Web,Native
         */
        MaterialBase.prototype.renderDepthPass = function () {
        };
        /**
         * @language zh_CN
         * @private
         * @param value {BlendMode}
         * @version Egret 3.0
         * @platform Web,Native
         */
        MaterialBase.prototype.renderPositionPass = function () {
        };
        /**
         * @language zh_CN
         * @private
         * @param value {BlendMode}
         * @version Egret 3.0
         * @platform Web,Native
         */
        MaterialBase.prototype.renderUVPass = function () {
        };
        /**
         * @language zh_CN
         * @private
         * @param value {BlendMode}
         * @version Egret 3.0
         * @platform Web,Native
         */
        MaterialBase.prototype.renderScendUVPass = function () {
        };
        /**
         * @language zh_CN
         * @private
         * @param value {BlendMode}
         * @version Egret 3.0
         * @platform Web,Native
         */
        MaterialBase.prototype.renderVertexColorPass = function () {
        };
        /**
         * @language zh_CN
         * @private
         * @param value {BlendMode}
         * @version Egret 3.0
         * @platform Web,Native
         */
        MaterialBase.prototype.renderLightingPass = function () {
        };
        /**
        * @private
        * @language zh_CN
        * 释放接口
        * @version Egret 3.0
        * @platform Web,Native
        */
        MaterialBase.prototype.dispose = function () {
            for (var key in this.passes) {
                for (var i = 0; i < this.passes[key].length; ++i) {
                    this.passes[key][i].dispose();
                }
            }
        };
        return MaterialBase;
    }());
    egret3d.MaterialBase = MaterialBase;
    __reflect(MaterialBase.prototype, "egret3d.MaterialBase");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=MaterialBase.js.map