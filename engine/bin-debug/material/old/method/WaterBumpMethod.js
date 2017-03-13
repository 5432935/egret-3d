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
    * @class egret3d.WaterBumpMethod
    * @classdesc
    * 材质中赋予灯光后，可以添加此方法，灯光和法线的变化而产生水面波光粼粼的效果
    * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/WaterBumpMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var WaterBumpMethod = (function (_super) {
        __extends(WaterBumpMethod, _super);
        /**
        * @private
        * @language zh_CN
        */
        function WaterBumpMethod() {
            var _this = _super.call(this) || this;
            _this._uvData = new Float32Array(8);
            _this._horizonColor = new Float32Array(4);
            _this._time = 0.0;
            _this._start = false;
            _this._distion_intensity = new egret3d.Point(0.02, 0.02);
            //##FilterBegin## ##Water##
            _this.fsShaderList[egret3d.ShaderPhaseType.normal_fragment] = _this.fsShaderList[egret3d.ShaderPhaseType.normal_fragment] || [];
            _this.fsShaderList[egret3d.ShaderPhaseType.normal_fragment].push("waterBump_fs");
            _this.start();
            _this._horizonColor[0] = 217 / 255;
            _this._horizonColor[1] = 235 / 255;
            _this._horizonColor[2] = 255 / 255;
            _this._horizonColor[3] = 255 / 255;
            //---------------
            _this._uvData[0] = -0.000005 * 2.5;
            _this._uvData[1] = 0.0 * 2.5;
            _this._uvData[2] = 0.00001 * 2.5;
            _this._uvData[3] = 0.0 * 2.5;
            _this._uvData[4] = _this._distion_intensity.x;
            _this._uvData[5] = _this._distion_intensity.y;
            _this._uvData[6] = 1.0;
            _this._uvData[7] = 1.0;
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
        WaterBumpMethod.prototype.start = function (rest) {
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
        WaterBumpMethod.prototype.stop = function () {
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
        WaterBumpMethod.prototype.setUvSpeed = function (index, u, v) {
            //##FilterBegin## ##Water##
            switch (index) {
                case 0:
                    this._uvData[0] = u;
                    this._uvData[1] = v;
                    break;
                case 1:
                    this._uvData[2] = u;
                    this._uvData[3] = v;
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
        WaterBumpMethod.prototype.setUvScale = function (first, second) {
            //##FilterBegin## ##Water##
            //##FilterEnd##
        };
        Object.defineProperty(WaterBumpMethod.prototype, "bumpTexture", {
            /**
             * @language zh_CN
             * 设置lightmap贴图
             * @param texture lightmap贴图
             * @version Egret 3.0
             * @platform Web,Native
             */
            set: function (texture) {
                //##FilterBegin## ##Water##
                this._bumpTexture = texture;
                if (this.materialData["bumpTexture"] != this._bumpTexture) {
                    this.materialData["bumpTexture"] = this._bumpTexture;
                    this.materialData.textureChange = true;
                }
                //##FilterEnd##
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WaterBumpMethod.prototype, "colorTexture", {
            /**
             * @language zh_CN
             * 设置lightmap贴图
             * @param texture lightmap贴图
             * @version Egret 3.0
             * @platform Web,Native
             */
            set: function (texture) {
                //##FilterBegin## ##Water##
                this._colorControlTexture = texture;
                if (this.materialData["colorControlTexture"] != this._colorControlTexture) {
                    this.materialData["colorControlTexture"] = this._colorControlTexture;
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
        WaterBumpMethod.prototype.upload = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            //##FilterBegin## ##Water##
            usage["waterNormalData"] = context3DProxy.getUniformLocation(usage.program3D, "waterNormalData");
            usage["horizonColor"] = context3DProxy.getUniformLocation(usage.program3D, "horizonColor");
            usage["time"] = context3DProxy.getUniformLocation(usage.program3D, "time");
            //##FilterEnd##
        };
        /**
        * @private
        * @language zh_CN
        */
        WaterBumpMethod.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            //##FilterBegin## ##Water##
            if (this._start) {
                this._time += delay;
            }
            context3DProxy.uniform4fv(usage["horizonColor"], this._horizonColor);
            context3DProxy.uniform2fv(usage["waterNormalData"], this._uvData);
            context3DProxy.uniform1f(usage["time"], this._time);
            //##FilterEnd##
        };
        return WaterBumpMethod;
    }(egret3d.MethodBase));
    egret3d.WaterBumpMethod = WaterBumpMethod;
    __reflect(WaterBumpMethod.prototype, "egret3d.WaterBumpMethod");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=WaterBumpMethod.js.map