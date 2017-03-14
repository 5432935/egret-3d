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
    * @class egret3d.DirectLight
    * @classdesc
    * 平行灯光</p>
    * 平行光是一种只有方向，强弱度，没有大小范围的灯光，一般情况下，directlight 可以产生阴影;</p>
    * 如果要产生阴影 需要设置 egret3d.ShadowRender.castShadowLight = directLight; 及其他相关模型的设置.</p>
    *
    * @see egret3d.LightGroup
    * @see egret3d.LightBase
    * @see egret3d.ShadowRender
    * @includeExample lights/DirectLight.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var DirectLight = (function (_super) {
        __extends(DirectLight, _super);
        /**
        * @language zh_CN
        * 创建一个平行光对象
        * @param dir 光线的方向
        * @default Vector3(0, 0, 1)
        * @version Egret 3.0
        * @platform Web,Native
        */
        function DirectLight(dir) {
            if (dir === void 0) { dir = new egret3d.Vector3(0, 0, 1); }
            var _this = _super.call(this) || this;
            _this._dir = new egret3d.Vector3(0, 0, 1);
            _this._dir.copyFrom(dir);
            _this._dir.normalize();
            egret3d.Quaternion.fromToRotation(egret3d.Vector3.Z_AXIS, _this._dir, DirectLight.q0);
            _this.globalOrientation = DirectLight.q0;
            _this.lightType = egret3d.LightType.directlight;
            return _this;
        }
        Object.defineProperty(DirectLight.prototype, "ambient", {
            /**
            * @language zh_CN
            *
            * 背光颜色
            * 模拟间接光照而开发的背光，而不用去同时打两盏不同方向的组合灯光，可以优化显示效果
            * @param color 背光颜色色值，格式0xffffffff
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (color) {
                this._ambient.w = (color >> 24 & 0xff) / 255;
                this._ambient.x = (color >> 16 & 0xff) / 255;
                this._ambient.y = (color >> 8 & 0xff) / 255;
                this._ambient.z = (color & 0xff) / 255;
                this._change = false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DirectLight.prototype, "dir", {
            /**
            * @language zh_CN
            * 光线的方向
            * @returns dir 光线的方向
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                if (this._transformChange) {
                    this.modelMatrix;
                }
                return this._dir;
            },
            /**
            * @language zh_CN
            * 光线的方向
            * @param dir 光线的方向
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (dir) {
                this._dir.copyFrom(dir);
                this._dir.normalize();
                egret3d.Quaternion.fromToRotation(egret3d.Vector3.Z_AXIS, this._dir, DirectLight.q0);
                this.globalOrientation = DirectLight.q0;
            },
            enumerable: true,
            configurable: true
        });
        DirectLight.prototype.onUpdateTransform = function () {
            _super.prototype.onUpdateTransform.call(this);
            this.globalOrientation.transformVector(egret3d.Vector3.Z_AXIS, this._dir);
            this._dir.normalize();
        };
        /**
         * @language zh_CN
         *
         * 是否产生阴影
         * 模拟间接光照而开发的背光，而不用去同时打两盏不同方向的组合灯光，可以优化显示效果
         * @param color 背光颜色色值
         */
        //public set castShadow(value: boolean) {
        //if (value )
        //    RttManager.getInstance().shadowMapRender.castShadowLight = this; 
        //}
        /**
        * @language zh_CN
        * @private
        * 更新灯光数据
        * @param camera 灯光ID
        * @param index 灯光数据
        * @param lightData 灯光数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        DirectLight.prototype.updateLightData = function (camera, index, lightData) {
            //camera.viewMatrix.mat3TransformVector(this._rot, this.lightViewPos);
            var dir = this.dir;
            lightData[index * DirectLight.stride + 0] = dir.x;
            lightData[index * DirectLight.stride + 1] = dir.y;
            lightData[index * DirectLight.stride + 2] = dir.z;
            lightData[index * DirectLight.stride + 3] = this._diffuse.x;
            lightData[index * DirectLight.stride + 4] = this._diffuse.y;
            lightData[index * DirectLight.stride + 5] = this._diffuse.z;
            lightData[index * DirectLight.stride + 6] = this._ambient.x;
            lightData[index * DirectLight.stride + 7] = this._ambient.y;
            lightData[index * DirectLight.stride + 8] = this._ambient.z;
            lightData[index * DirectLight.stride + 9] = this._intensity;
            //lightData[index * DirectLight.stride + 10] = this._halfIntensity;
        };
        return DirectLight;
    }(egret3d.LightBase));
    DirectLight.q0 = new egret3d.Quaternion();
    /**
    * @language zh_CN
    * @private
    * 光源数据结构长度
    */
    DirectLight.stride = 10;
    egret3d.DirectLight = DirectLight;
    __reflect(DirectLight.prototype, "egret3d.DirectLight");
})(egret3d || (egret3d = {}));
