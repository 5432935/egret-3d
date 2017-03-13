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
    * @class egret3d.WaterWaveMethod
    * @classdesc
    * 水面模拟特效，用来实现水面顶点波动效果
    * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/WaterWaveMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var WaterWaveMethod = (function (_super) {
        __extends(WaterWaveMethod, _super);
        /**
        * @private
        * @language zh_CN
        */
        function WaterWaveMethod() {
            var _this = _super.call(this) || this;
            _this._waveVSData = new Float32Array(12);
            _this._waveFSData = new Float32Array(8);
            _this._time = 0.0;
            _this._start = false;
            _this._wave_xyz_intensity_0 = new egret3d.Vector3(120.0, 50.0, 70.0);
            _this._wave_xyz_intensity_1 = new egret3d.Vector3(80.0, 40.0, 80.0);
            _this._wave_xyz_speed_0 = new egret3d.Vector3(0.001, 0.001, -0.001);
            _this._wave_xyz_speed_1 = new egret3d.Vector3(0.001, 0.001, 0.001);
            //##FilterBegin## ##Water##
            _this.vsShaderList[egret3d.ShaderPhaseType.start_vertex] = _this.vsShaderList[egret3d.ShaderPhaseType.start_vertex] || [];
            _this.vsShaderList[egret3d.ShaderPhaseType.start_vertex].push("wave_vs");
            _this.fsShaderList[egret3d.ShaderPhaseType.multi_end_fragment] = _this.fsShaderList[egret3d.ShaderPhaseType.multi_end_fragment] || [];
            _this.fsShaderList[egret3d.ShaderPhaseType.multi_end_fragment].push("wave_fs");
            _this.start();
            //---------------
            _this._waveVSData[0] = _this._wave_xyz_intensity_0.x;
            _this._waveVSData[1] = _this._wave_xyz_intensity_0.y;
            _this._waveVSData[2] = _this._wave_xyz_intensity_0.z;
            _this._waveVSData[3] = _this._wave_xyz_intensity_1.x;
            _this._waveVSData[4] = _this._wave_xyz_intensity_1.y;
            _this._waveVSData[5] = _this._wave_xyz_intensity_1.z;
            _this._waveVSData[6] = _this._wave_xyz_speed_0.x;
            _this._waveVSData[7] = _this._wave_xyz_speed_0.y;
            _this._waveVSData[8] = _this._wave_xyz_speed_0.z;
            _this._waveVSData[9] = _this._wave_xyz_speed_1.x;
            _this._waveVSData[10] = _this._wave_xyz_speed_1.y;
            _this._waveVSData[11] = _this._wave_xyz_speed_1.z;
            //0.0/255.0,63.0/255.0,77.0/255.0
            //71.0/255.0,118.0/255.0,138.0/255.0
            _this._waveFSData[0] = 0.0 / 255.0;
            _this._waveFSData[1] = 63.0 / 255.0;
            _this._waveFSData[2] = 77.0 / 255.0;
            _this._waveFSData[3] = 1.0;
            _this._waveFSData[4] = 71.0 / 255.0;
            _this._waveFSData[5] = 118.0 / 255.0;
            _this._waveFSData[6] = 138.0 / 255.0;
            _this._waveFSData[7] = 1.0;
            return _this;
            //##FilterEnd##
        }
        Object.defineProperty(WaterWaveMethod.prototype, "deepWaterColor", {
            /**
            * @language zh_CN
            * 获取深水颜色
            * @param color 颜色 a r b g
            */
            get: function () {
                var r = this._waveFSData[0] * 255.0;
                var g = this._waveFSData[1] * 255.0;
                var b = this._waveFSData[2] * 255.0;
                var a = this._waveFSData[3] * 255.0;
                return (a << 24) | (r << 16) | (g << 8) | b;
            },
            /**
            * @language zh_CN
            * 设置深水颜色
            * @param color 颜色 a r b g
            */
            set: function (color) {
                //##FilterBegin## ##Water##
                var a = color >> 24 & 0xff;
                var r = color >> 16 & 0xff;
                var g = color >> 8 & 0xff;
                var b = color & 0xff;
                this._waveFSData[0] = r / 255.0;
                this._waveFSData[1] = g / 255.0;
                this._waveFSData[2] = b / 255.0;
                this._waveFSData[3] = a / 255.0;
                //##FilterEnd##
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WaterWaveMethod.prototype, "shallowWaterColor", {
            /**
            * @language zh_CN
            * 获取浅水颜色
            * @param color 颜色 a r b g
            */
            get: function () {
                var r = this._waveFSData[4] * 255.0;
                var g = this._waveFSData[5] * 255.0;
                var b = this._waveFSData[6] * 255.0;
                var a = this._waveFSData[7] * 255.0;
                return (a << 24) | (r << 16) | (g << 8) | b;
            },
            /**
            * @language zh_CN
            * 设置浅水颜色
            * @param color 颜色
            */
            set: function (color) {
                //##FilterBegin## ##Water##
                var a = color >> 24 & 0xff;
                var r = color >> 16 & 0xff;
                var g = color >> 8 & 0xff;
                var b = color & 0xff;
                this._waveFSData[4] = r / 255.0;
                this._waveFSData[5] = g / 255.0;
                this._waveFSData[6] = b / 255.0;
                this._waveFSData[7] = a / 255.0;
                //##FilterEnd##
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WaterWaveMethod.prototype, "waveTexture", {
            /**
            * @language zh_CN
            * 水贴图
            * @param texture  水贴图
            */
            set: function (texture) {
                //##FilterBegin## ##Water##
                this._waveTexture = texture;
                if (texture) {
                    if (this.materialData["waveTexture"] != this._waveTexture) {
                        this.materialData["waveTexture"] = texture;
                        this.materialData.textureChange = true;
                    }
                }
                //##FilterEnd##
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 开始播放uv动画
        * @param rest 如果为ture就是重置播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        WaterWaveMethod.prototype.start = function (rest) {
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
        WaterWaveMethod.prototype.stop = function () {
            //##FilterBegin## ##Water##
            this._start = false;
            //##FilterEnd##
        };
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
        WaterWaveMethod.prototype.upload = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            //##FilterBegin## ##Water##
            usage["waveVSData"] = context3DProxy.getUniformLocation(usage.program3D, "waveVSData");
            usage["waveFSData"] = context3DProxy.getUniformLocation(usage.program3D, "waveFSData");
            usage["time"] = context3DProxy.getUniformLocation(usage.program3D, "time");
            //##FilterEnd##
        };
        /**
        * @private
        * @language zh_CN
        */
        WaterWaveMethod.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            //##FilterBegin## ##Water##
            if (this._start) {
                this._time += delay;
            }
            context3DProxy.uniform3fv(usage["waveVSData"], this._waveVSData);
            context3DProxy.uniform4fv(usage["waveFSData"], this._waveFSData);
            context3DProxy.uniform1f(usage["time"], this._time);
            //##FilterEnd##
        };
        return WaterWaveMethod;
    }(egret3d.MethodBase));
    egret3d.WaterWaveMethod = WaterWaveMethod;
    __reflect(WaterWaveMethod.prototype, "egret3d.WaterWaveMethod");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=WaterWaveMethod.js.map