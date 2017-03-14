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
    * @language zh_CN
    * @class egret3d.WaterNormalMethod
    * @classdesc
    * 材质中赋予灯光后，可以添加此方法，灯光和法线的变化而产生水面波光粼粼的效果
    * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/WaterNormalMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var WaterNormalMethod = (function (_super) {
        __extends(WaterNormalMethod, _super);
        /**
        * @private
        * @language zh_CN
        */
        function WaterNormalMethod() {
            var _this = _super.call(this) || this;
            _this._uvData = new Float32Array(8);
            _this._time = 0.0;
            _this._start = false;
            _this._speedU_0 = new egret3d.Point(-0.000005, 0.0);
            _this._speedU_1 = new egret3d.Point(0.00001, 0.0);
            _this._distion_intensity = new egret3d.Point(0.02, 0.02);
            _this._normal_0_UVScale = 2.0;
            _this._normal_1_UVScale = 2.0;
            //##FilterBegin## ##Water##
            _this.fsShaderList[egret3d.ShaderPhaseType.normal_fragment] = _this.fsShaderList[egret3d.ShaderPhaseType.normal_fragment] || [];
            _this.fsShaderList[egret3d.ShaderPhaseType.normal_fragment].push("waterNormal_fs");
            _this.start();
            //---------------
            _this._uvData[0] = _this._speedU_0.x * 2.5;
            _this._uvData[1] = _this._speedU_0.y * 2.5;
            _this._uvData[2] = _this._speedU_1.x * 2.5;
            _this._uvData[3] = _this._speedU_1.y * 2.5;
            _this._uvData[4] = _this._distion_intensity.x;
            _this._uvData[5] = _this._distion_intensity.y;
            _this._uvData[6] = _this._normal_0_UVScale;
            _this._uvData[7] = _this._normal_1_UVScale;
            return _this;
            //##FilterEnd##
        }
        /**
        * @language zh_CN
        * 开始播放uv动画
        * @param rest 如果为ture就是重置播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        WaterNormalMethod.prototype.start = function (rest) {
            //##FilterBegin## ##Water##
            if (rest === void 0) { rest = false; }
            if (rest)
                this._time = 0;
            this._start = true;
            //##FilterEnd##
        };
        /**
        * @language zh_CN
        * 停止播放uv动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        WaterNormalMethod.prototype.stop = function () {
            //##FilterBegin## ##Water##
            this._start = false;
            //##FilterEnd##
        };
        /**
        * @language zh_CN
        * 设置UV 速度
        * @param index 0 或 1
        * @param u
        * @param v
        * @version Egret 3.0
        * @platform Web,Native
        */
        WaterNormalMethod.prototype.setUvSpeed = function (index, u, v) {
            //##FilterBegin## ##Water##
            switch (index) {
                case 0:
                    this._speedU_0.x = u;
                    this._speedU_0.y = v;
                    this._uvData[0] = this._speedU_0.x * 2.5;
                    this._uvData[1] = this._speedU_0.y * 2.5;
                    break;
                case 1:
                    this._speedU_1.x = u;
                    this._speedU_1.y = v;
                    this._uvData[2] = this._speedU_1.x * 2.5;
                    this._uvData[3] = this._speedU_1.y * 2.5;
                    break;
            }
            //##FilterEnd##
        };
        /**
        * @language zh_CN
        * 设置UV repat次数
        * @param u
        * @param v
        * @version Egret 3.0
        * @platform Web,Native
        */
        WaterNormalMethod.prototype.setUvScale = function (first, second) {
            //##FilterBegin## ##Water##
            this._normal_0_UVScale = first;
            this._normal_1_UVScale = second;
            this._uvData[6] = this._normal_0_UVScale;
            this._uvData[7] = this._normal_1_UVScale;
            //##FilterEnd##
        };
        Object.defineProperty(WaterNormalMethod.prototype, "normalTextureA", {
            /**
             * @language zh_CN
             * 设置lightmap贴图
             * @param texture lightmap贴图
             * @version Egret 3.0
             * @platform Web,Native
             */
            set: function (texture) {
                //##FilterBegin## ##Water##
                this._normalTexture_0 = texture;
                if (this.materialData["normalTextureA"] != this._normalTexture_0) {
                    this.materialData["normalTextureA"] = this._normalTexture_0;
                    this.materialData.textureChange = true;
                }
                //##FilterEnd##
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WaterNormalMethod.prototype, "normalTextureB", {
            /**
             * @language zh_CN
             * 设置lightmap贴图
             * @param texture lightmap贴图
             * @version Egret 3.0
             * @platform Web,Native
             */
            set: function (texture) {
                //##FilterBegin## ##Water##
                this._normalTexture_1 = texture;
                if (this.materialData["normalTextureB"] != this._normalTexture_1) {
                    this.materialData["normalTextureB"] = this._normalTexture_1;
                    this.materialData.textureChange = true;
                }
                //##FilterEnd##
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @private
        * @language zh_CN
        * @param time
        * @param delay
        * @param usage
        * @param materialData
        * @param geometry
        * @param context3DProxy
        * @param modeltransform
        * @param modeltransform
        * @param camera3D
        */
        WaterNormalMethod.prototype.upload = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            //##FilterBegin## ##Water##
            usage["waterNormalData"] = context3DProxy.getUniformLocation(usage.program3D, "waterNormalData");
            usage["time"] = context3DProxy.getUniformLocation(usage.program3D, "time");
            //##FilterEnd##
        };
        /**
        * @private
        * @language zh_CN
        */
        WaterNormalMethod.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            //##FilterBegin## ##Water##
            if (this._start) {
                this._time += delay;
            }
            context3DProxy.uniform2fv(usage["waterNormalData"], this._uvData);
            context3DProxy.uniform1f(usage["time"], this._time);
            //##FilterEnd##
        };
        return WaterNormalMethod;
    }(egret3d.MethodBase));
    egret3d.WaterNormalMethod = WaterNormalMethod;
    __reflect(WaterNormalMethod.prototype, "egret3d.WaterNormalMethod");
})(egret3d || (egret3d = {}));
