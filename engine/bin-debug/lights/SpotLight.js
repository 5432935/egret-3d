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
    * @class egret3d.SpotLight
    * @classdesc
    * spot 的灯光 也就是筒灯
    * 所有的灯光基本要素 灯光的颜色，强度，位置，方向
    * 颜色的色值均是16进制 red:0xffff0000 argb的定义模式
    * 每个材质球所能最大使用的灯光建议别太多，能省则省，尤其是移动端，能用灯光缓存图 lightmap 最好
    * spot light 可以直接想象为点光源照了个罩子，有方向且有范围的灯光
    * @see egret3d.Object3D
    * @see egret3d.LightGroup
    * @see egret3d.LightBase
    * @see egret3d.PointLight
    * @see egret3d.SpotLight
    * @version Egret 3.0
    * @platform Web,Native
    */
    var SpotLight = (function (_super) {
        __extends(SpotLight, _super);
        /**
        * @language zh_CN
        * 创建一个聚光源
        * @param color 灯光颜色值
        * @version Egret 3.0
        * @platform Web,Native
        */
        function SpotLight(color) {
            var _this = _super.call(this) || this;
            _this.diffuse = color;
            _this.lightType = egret3d.LightType.spotLightlight;
            return _this;
        }
        Object.defineProperty(SpotLight.prototype, "spotCosCutoff", {
            /**
            * @language zh_CN
            *
            * spot 的 裁切范围
            * spot light 照射范围的大小指数
            * @returns number Cutoff -spot 的 裁切范围
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._spotCosCutoff;
            },
            /**
            * @language zh_CN
            *
            * spot 的 裁切范围
            * spot light 照射范围的大小指数
            * @param value Cutoff
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._spotCosCutoff = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpotLight.prototype, "spotExponent", {
            /**
            * @language zh_CN
            *
            * spot 的 灯光强弱
            * spot light 灯光圆形范围内随半径大小改变发生的灯光强弱指数
            * @returns number 灯光强弱指数
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._spotExponent;
            },
            /**
            * @language zh_CN
            * spot 的 灯光强弱
            * spot light 灯光圆形范围内随半径大小改变发生的灯光强弱指数
            *
            * @param value 灯光强弱指数
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._spotExponent = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpotLight.prototype, "constantAttenuation", {
            /**
            * @language zh_CN
            * spot 的 灯光衰减
            * spot light 灯光圆形范围内随半径大小改变发生的灯光衰减常数指数
            * @returns number 持续衰减
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._constantAttenuation;
            },
            /**
            * @language zh_CN
            *
            * spot 的 灯光衰减
            * spot light 灯光圆形范围内随半径大小改变发生的灯光衰减常数指数
            * @param value 持续衰减
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._constantAttenuation = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpotLight.prototype, "linearAttenuation", {
            /**
            * @language zh_CN
            *
            * spot 的 灯光线性衰减
            * spot light 灯光圆形范围内随半径大小改变发生的灯光线性衰减
            * @returns number 线性衰减
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._linearAttenuation;
            },
            /**
            * @language zh_CN
            *
            * spot 的 灯光线性衰减
            * spot light 灯光圆形范围内随半径大小改变发生的灯光线性衰减
            * @param value 线性衰减
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._linearAttenuation = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpotLight.prototype, "quadraticAttenuation", {
            /**
            * @language zh_CN
            *
            * spot 的 灯光线性2次衰减
            * spot light 灯光圆形范围内随半径大小改变发生的灯光线性2次衰减
            * @returns number 返回2次衰减
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._quadraticAttenuation;
            },
            /**
            * @language zh_CN
            *
            * spot 的 灯光线性2次衰减
            * spot light 灯光圆形范围内随半径大小改变发生的灯光线性2次衰减
            * @param value 2次衰减
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._quadraticAttenuation = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @language zh_CN
         * @private
         * 更新灯光数据
         * @param index 灯光ID
         * @param lightData 灯光数据
         */
        SpotLight.prototype.updateLightData = function (camera, index, lightData) {
            lightData[index * SpotLight.stride] = this.globalPosition.x;
            lightData[index * SpotLight.stride + 1] = this.globalPosition.y;
            lightData[index * SpotLight.stride + 2] = this.globalPosition.z;
            lightData[index * SpotLight.stride + 3] = this.globalRotation.x * egret3d.MathUtil.DEGREES_TO_RADIANS;
            lightData[index * SpotLight.stride + 4] = this.globalRotation.y * egret3d.MathUtil.DEGREES_TO_RADIANS;
            lightData[index * SpotLight.stride + 5] = this.globalRotation.z * egret3d.MathUtil.DEGREES_TO_RADIANS;
            lightData[index * SpotLight.stride + 6] = this._diffuse.x;
            lightData[index * SpotLight.stride + 7] = this._diffuse.y;
            lightData[index * SpotLight.stride + 8] = this._diffuse.z;
            lightData[index * SpotLight.stride + 9] = this._spotExponent;
            lightData[index * SpotLight.stride + 10] = this._spotCosCutoff;
            lightData[index * SpotLight.stride + 11] = this._constantAttenuation;
            lightData[index * SpotLight.stride + 12] = this._linearAttenuation;
            lightData[index * SpotLight.stride + 13] = this._quadraticAttenuation;
        };
        return SpotLight;
    }(egret3d.LightBase));
    /**
     * @language zh_CN
     * @priavete
     */
    SpotLight.stride = 14;
    egret3d.SpotLight = SpotLight;
    __reflect(SpotLight.prototype, "egret3d.SpotLight");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=SpotLight.js.map