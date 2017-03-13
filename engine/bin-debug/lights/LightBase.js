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
    *@language zh_CN
    * @class egret3d.LightType
    * 灯光类型
    * @version Egret 3.0
    * @platform Web,Native
    */
    var LightType;
    (function (LightType) {
        /**
        *@language zh_CN
        * 点光源
        * @version Egret 3.0
        * @platform Web,Native
        */
        LightType[LightType["pointlight"] = 0] = "pointlight";
        /**
        *@language zh_CN
        * 平行光
        * @version Egret 3.0
        * @platform Web,Native
        */
        LightType[LightType["directlight"] = 1] = "directlight";
        /**
        *@language zh_CN
        * 聚光灯
        * @version Egret 3.0
        * @platform Web,Native
        */
        LightType[LightType["spotLightlight"] = 2] = "spotLightlight";
    })(LightType = egret3d.LightType || (egret3d.LightType = {}));
    /**
    * @class egret3d.DirectLight
    * @classdesc
    * 灯光的基础类型。</p>
    * 所有的灯光基本要素 灯光的颜色，强度，位置，方向。</p>
    * 颜色的色值均是16进制 red:0xffff0000 argb的定义模式。</p>
    * 每个材质球所能最大使用的灯光建议别太多，能省则省，尤其是移动端，能用灯光缓存图 lightmap 最好。</p>
    * @see egret3d.Object3D
    * @see egret3d.LightGroup
    * @see egret3d.LightBase
    * @see egret3d.PointLight
    * @see egret3d.SpotLight
    * @version Egret 3.0
    * @platform Web,Native
    */
    var LightBase = (function (_super) {
        __extends(LightBase, _super);
        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        function LightBase() {
            var _this = _super.call(this) || this;
            /**
            *@language zh_CN
            * 灯光在配置表中的id，用于和贴图建立绑定关系
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.lightId = -1;
            /**
            *@language zh_CN
            * 灯光类型
            * @see egret3d.LightType
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.lightType = -1;
            /**
            * @language zh_CN
            * @private
            * 环境颜色
            */
            _this._ambient = new egret3d.Vector3(0.0, 0.0, 0.0);
            /**
            * @language zh_CN
            * @private
            * 漫反射
            */
            _this._diffuse = new egret3d.Vector3(1.0, 1.0, 1.0);
            // /**
            // * @language zh_CN  
            // *@private
            // * 背光颜色
            // */
            //protected _halfColor: Vector3 = new Vector3(1.0, 1.0, 1.0);
            /**
             * @language zh_CN
             *@private
             * 镜面反射
             */
            _this._specular = new egret3d.Vector3(1.0, 1.0, 1.0);
            /**
             * @language zh_CN
             *@private
             */
            _this._halfVector = new egret3d.Vector3(1.0, 1.0, 1.0);
            /**
             * @language zh_CN
             *@private
             * @param value 强度
             */
            _this._intensity = 1;
            _this._radius = 100;
            _this._cutoff = 0.01;
            /**
            *@language zh_CN
            *@private
            * @param value 背光强度
            */
            _this._halfIntensity = 0.0;
            /**
             * @language zh_CN
             *@private
             */
            _this._spotExponent = 1.1;
            /**
             * @language zh_CN
             *@private
             */
            _this._spotCutoff = 0.7;
            /**
             * @language zh_CN
             *@private
             */
            _this._spotCosCutoff = 0.1;
            /**
             * @language zh_CN
             *@private
             */
            _this._constantAttenuation = 0.1;
            /**
             * @language zh_CN
             *@private
             */
            _this._linearAttenuation = 0.1;
            /**
             * @language zh_CN
             *@private
             */
            _this._quadraticAttenuation = 0.1;
            /**
             * @language zh_CN
             *@private
             */
            _this._lightIndex = -1;
            /**
             * @language zh_CN
             *@private
             */
            _this.len = 25;
            /**
             * @language zh_CN
             *@private
             */
            _this._change = true;
            /**
             * @language zh_CN
             *@private
             */
            _this.lightViewPos = new egret3d.Vector3();
            return _this;
        }
        Object.defineProperty(LightBase.prototype, "intensity", {
            /**
            * @language zh_CN
            * 得到灯光强度。</p>
            * 影响灯光的强弱显示，值的范围0~没有上限，但是值过大会导致画面过度曝光。</p>
            * @returns number 灯光强度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._intensity;
            },
            /**
            * @language zh_CN
            * 设置灯光强度。</p>
            * 影响灯光的强弱显示，值的范围0~没有上限，但是值过大会导致画面过度曝光。</p>
            * @param value 强度数值
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._intensity != value) {
                    this._intensity = value;
                    this._change = false;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LightBase.prototype, "halfIntensity", {
            /**
            * @language zh_CN
            * 得到背光灯光强度。</p>
            * 影响背光灯光的强弱显示，值的范围0~没有上限，但是值过大会导致画面过度曝光。</p>
            * @returns number 背光灯光的强弱
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._halfIntensity;
            },
            /**
            * @language zh_CN
            * 设置背光灯光强度。</p>
            * 影响背光灯光的强弱显示，值的范围0~没有上限，但是值过大会导致画面过度曝光。</p>
            * @param value 背光灯光强度
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._halfIntensity != value) {
                    this._halfIntensity = value;
                    this._change = false;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LightBase.prototype, "ambient", {
            /**
            * @language zh_CN
            * 获取 灯光环境颜色。</p>
            * 物体在未受到光的直接照射的地方 模拟间接环境光颜色，会影响背光面的颜色。</p>
            * @returns number ambient  灯光环境颜色
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return 0;
            },
            /**
            * @language zh_CN
            * 设置灯光环境颜色。</p>
            * 物体在未受到光的直接照射的地方 模拟间接环境光颜色，会影响背光面的颜色。</p>
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
        Object.defineProperty(LightBase.prototype, "diffuse", {
            /**
            * @language zh_CN
            * 设置灯光漫反射颜色。</p>
            * 直接影响最终灯光的颜色色值 16进制的颜色 例如 red：0xffff0000。</p>
            * 也可以通过 diffusePower 来改变这个值的总体强弱。</p>
            * @returns number diffuse
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return 0;
            },
            /**
            * @language zh_CN
            * 设置灯光漫反射颜色。</p>
            * 直接影响最终灯光的颜色色值 16进制的颜色, 例如 red：0xffff0000。</p>
            * 也可以通过 diffusePower 来改变这个值的总体强弱
            * @param color 颜色值，0xffffffff格式
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (color) {
                this._diffuse.w = (color >> 24 & 0xff) / 255;
                this._diffuse.x = (color >> 16 & 0xff) / 255;
                this._diffuse.y = (color >> 8 & 0xff) / 255;
                this._diffuse.z = (color & 0xff) / 255;
                this._change = false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LightBase.prototype, "specular", {
            /**
            * @language zh_CN
            * 在灯光方向与物体和相机成一个反光角度的时候，就会产生反光，高光，而不同的物体会有不同的颜色色值，尤其是金属。</p>
            * 16进制的颜色 例如 red：0xffff0000。</p>
            * 也可以通过 specularPower 来改变这个值的总体强弱。</p>
            * @returns number  灯光镜面高光反射颜色
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return 0;
            },
            /**
            * @language zh_CN
            * 设置灯光镜面高光反射颜色。</p>
            * 在灯光方向与物体和相机成一个反光角度的时候，就会产生反光，高光，而不同的物体会有不同的颜色色值，尤其是金属。</p>
            * 16进制的颜色 例如 red：0xffff0000。</p>
            * 也可以通过 specularPower 来改变这个值的总体强弱。</p>
            * @param color 颜色值，0xffffffff格式
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (color) {
                this._specular.w = (color >> 24 & 0xff) / 255;
                this._specular.x = (color >> 16 & 0xff) / 255;
                this._specular.y = (color >> 8 & 0xff) / 255;
                this._specular.z = (color & 0xff) / 255;
                this._change = false;
            },
            enumerable: true,
            configurable: true
        });
        LightBase.prototype.init = function () {
        };
        /**
        * @language zh_CN
        * @private
        * 更新灯光数据
        * @param index 灯光ID
        * @param lightData 灯光数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        LightBase.prototype.updateLightData = function (camera, index, lightData) {
        };
        return LightBase;
    }(egret3d.Object3D));
    egret3d.LightBase = LightBase;
    __reflect(LightBase.prototype, "egret3d.LightBase");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=LightBase.js.map