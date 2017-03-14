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
    * @class egret3d.GrassMethod
    * @classdesc
    * 草的飘动动画实现部分,不建议单独使用，而是封装在GrassMesh中被动生成。
    * @see egret3d.GrassMesh
    * @includeExample plant/GrassMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var GrassMethod = (function (_super) {
        __extends(GrassMethod, _super);
        /**
        * @language zh_CN
        * @构造函数
        * 创建一个GrassMethod对象
        * @param data GrassData 创建该method需要用到的数据源
        * @version Egret 3.0
        * @platform Web,Native
        */
        function GrassMethod(data) {
            var _this = _super.call(this) || this;
            _this._time = 0.0;
            _this._windSpeed = 200;
            _this._windStrength = 0.2;
            _this._shakeScale = 0.1;
            _this._windDirection = new egret3d.Vector3(1, 0, 0);
            _this._windSpace = new egret3d.Vector3(400, 0, 300);
            _this._windData = new Float32Array(9);
            _this._squeezeData = new Float32Array(6);
            _this._lightMapData = new Float32Array(5);
            _this._lightMapTexture = egret3d.CheckerboardTexture.texture;
            _this._data = data;
            _this.vsShaderList[egret3d.ShaderPhaseType.start_vertex] = _this.vsShaderList[egret3d.ShaderPhaseType.start_vertex] || [];
            _this.vsShaderList[egret3d.ShaderPhaseType.start_vertex].push("grass_vs");
            _this.fsShaderList[egret3d.ShaderPhaseType.diffuse_fragment] = _this.fsShaderList[egret3d.ShaderPhaseType.diffuse_fragment] || [];
            _this.fsShaderList[egret3d.ShaderPhaseType.diffuse_fragment].push("grass_fs");
            _this.fillGrassData();
            _this.start();
            return _this;
        }
        /**
        * @language zh_CN
        * 设置草用到的灯光图和数据
        * @param lightMap 灯光贴图
        * @param lightMapRect 用于计算UV的数据xy代表偏移，width/height为用于和场景xz的缩放系数
        * @version Egret 3.0
        * @platform Web,Native
        */
        GrassMethod.prototype.setLightMapData = function (lightMap, lightMapRect) {
            this._lightMapRect = lightMapRect;
            this._lightMapTexture = lightMap || egret3d.CheckerboardTexture.texture;
            this.updateLightMapData();
        };
        GrassMethod.prototype.updateLightMapData = function () {
            if (!this._lightMapTexture || this._lightMapTexture == egret3d.CheckerboardTexture.texture || !this._lightMapRect) {
                this._lightMapData[0] = 0;
            }
            else {
                this._lightMapData[0] = 1;
                this._lightMapData[1] = this._lightMapRect.x;
                this._lightMapData[2] = this._lightMapRect.y;
                this._lightMapData[3] = this._lightMapRect.width;
                this._lightMapData[4] = this._lightMapRect.height;
            }
            this.materialData["lightMapTexture"] = this._lightMapTexture;
            this.materialData.textureChange = true;
        };
        /**
        * @language zh_CN
        * 更新风的参数
        * @param direction 单位向量，xz为有效值，表示风的方向
        * @param space 一团风的体积，xz为有效值，每个朝向在单位体积内实现了一个正弦抖动循环
        * @param speed 风的移动速度，代表1秒内，风移动的单位
        * @param windStrength 风的强度，这个值用于加成到草的倾斜上面
        * @param shakeScale 草自身来回摇摆缩放系数，这个值用于加成到草的倾斜上面
        * @version Egret 3.0
        * @platform Web,Native
        */
        GrassMethod.prototype.setWind = function (direction, space, speed, windStrength, shakeScale) {
            if (speed === void 0) { speed = 100.0; }
            if (windStrength === void 0) { windStrength = 0.1; }
            if (shakeScale === void 0) { shakeScale = 1.0; }
            direction.y = 0;
            this._windDirection.copyFrom(direction);
            this._windDirection.normalize();
            this._windSpace.copyFrom(space);
            this._windStrength = windStrength;
            this._windSpeed = speed;
            this._shakeScale = shakeScale;
            this.fillGrassData();
        };
        /**
        * @language zh_CN
        * 更新草受到挤压的数据
        * @param position 挤压开始的位置
        * @param enable 是否开启挤压
        * @param radius 挤压的半价
        * @param strength 挤压的强度，会修改草倾斜的力度
        * @version Egret 3.0
        * @platform Web,Native
        */
        GrassMethod.prototype.updateSqueezeData = function (position, enable, radius, strength) {
            if (radius === void 0) { radius = 20; }
            if (strength === void 0) { strength = 1.0; }
            this._squeezeData[0] = enable ? 1 : 0;
            this._squeezeData[1] = position.x;
            this._squeezeData[2] = position.y;
            this._squeezeData[3] = position.z;
            this._squeezeData[4] = radius;
            this._squeezeData[5] = strength;
        };
        GrassMethod.prototype.fillGrassData = function () {
            this._windData[0] = this._windDirection.x;
            this._windData[1] = this._windDirection.z;
            this._windData[2] = this._windSpace.x;
            this._windData[3] = this._windSpace.z;
            this._windData[4] = this._windStrength;
            this._windData[5] = this._windSpeed;
            this._windData[6] = this._shakeScale;
        };
        /**
        * @language zh_CN
        * 开始播放动画
        * @param rest 如果为ture就是重置播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        GrassMethod.prototype.start = function (rest) {
            if (rest === void 0) { rest = false; }
            if (rest)
                this._time = 0;
            this._start = true;
        };
        /**
        * @language zh_CN
        * 停止播放uv动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        GrassMethod.prototype.stop = function () {
            this._start = false;
        };
        /**
        * @private
        * @language zh_CN
        * @param time
        * @param delay
        * @param usage
        * @param geometry
        * @param context3DProxy
        * @param modeltransform
        * @param camera3D
        */
        GrassMethod.prototype.upload = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            usage["uniform_grass_data"].uniformIndex = context3DProxy.getUniformLocation(usage.program3D, "uniform_grass_data");
            usage["uniform_squeeze_data"].uniformIndex = context3DProxy.getUniformLocation(usage.program3D, "uniform_squeeze_data");
            usage["uniform_lightMap_data"].uniformIndex = context3DProxy.getUniformLocation(usage.program3D, "uniform_lightMap_data");
        };
        /**
        * @private
        * @language zh_CN
        */
        GrassMethod.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            if (this._start) {
                this._time += delay;
            }
            this._windData[7] = this._time / 1000.0;
            this._windData[8] = this._data.billboard ? 1 : 0;
            context3DProxy.uniform1fv(usage["uniform_grass_data"].uniformIndex, this._windData);
            context3DProxy.uniform1fv(usage["uniform_squeeze_data"].uniformIndex, this._squeezeData);
            context3DProxy.uniform1fv(usage["uniform_lightMap_data"].uniformIndex, this._lightMapData);
        };
        return GrassMethod;
    }(egret3d.MethodBase));
    egret3d.GrassMethod = GrassMethod;
    __reflect(GrassMethod.prototype, "egret3d.GrassMethod");
})(egret3d || (egret3d = {}));
