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
    * @class egret3d.UVRollMethod
    * @classdesc
    * 边缘光特效方法
    * 利用屏幕空间法线与摄像机方向射线的夹角 进行pow ，越是物体的边缘，效果越强。
    * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/RimlightMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var RimlightMethod = (function (_super) {
        __extends(RimlightMethod, _super);
        function RimlightMethod() {
            var _this = _super.call(this) || this;
            _this.uniform_rimData = new Float32Array(6);
            _this.fsShaderList[egret3d.ShaderPhaseType.multi_end_fragment] = _this.fsShaderList[egret3d.ShaderPhaseType.multi_end_fragment] || [];
            _this.fsShaderList[egret3d.ShaderPhaseType.multi_end_fragment].push("rimlight_fs");
            //0.5, 0.6, 0.7
            _this.uniform_rimData[0] = 0.99;
            _this.uniform_rimData[1] = 0.0;
            _this.uniform_rimData[2] = 0.0;
            _this.uniform_rimData[3] = 1.0;
            _this.uniform_rimData[4] = 5.0;
            _this.uniform_rimData[5] = 1.0;
            return _this;
        }
        Object.defineProperty(RimlightMethod.prototype, "rimColor", {
            /**
            * @language zh_CN
            * 获取边缘光特效的颜色。
            * @param  val 获取边缘光特效的颜色。
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return egret3d.Color.RGBAToColor(this.uniform_rimData[0], this.uniform_rimData[1], this.uniform_rimData[2], this.uniform_rimData[3]);
            },
            /**
            * @language zh_CN
            * 设置边缘光特效的颜色 alpha值为特效的亮度,其他为颜色。
            * @param  val 设置边缘光特效的颜色 alpha值为特效的亮度,其他为颜色。
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (val) {
                var color = egret3d.Color.getColor(val);
                this.uniform_rimData[0] = color.x;
                this.uniform_rimData[1] = color.y;
                this.uniform_rimData[2] = color.z;
                this.uniform_rimData[3] = color.w;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RimlightMethod.prototype, "rimPow", {
            /**
            * @language zh_CN
            * 设置边缘光特效的pow值,值越大,边缘越窄,值越小,边缘越宽.
            * @param  size 设置边缘光特效的pow值,值越大,边缘越窄,值越小,边缘越宽.
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.uniform_rimData[4];
            },
            /**
            * @language zh_CN
            * 设置边缘光特效的pow值,值越大,边缘越窄,值越小,边缘越宽.
            * @param  size 设置边缘光特效的pow值,值越大,边缘越窄,值越小,边缘越宽.
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (size) {
                this.uniform_rimData[4] = size;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RimlightMethod.prototype, "strength", {
            /**
            * @language zh_CN
            * 设置边缘光特效的强度值
            * @param  size 设置边缘光特效的强度值
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.uniform_rimData[5];
            },
            /**
            * @language zh_CN
            * 设置边缘光特效的强度值
            * @param  size 设置边缘光特效的强度值
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (val) {
                this.uniform_rimData[5] = val;
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
        RimlightMethod.prototype.upload = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            usage["uniform_rimData"] = context3DProxy.getUniformLocation(usage.program3D, "uniform_rimData");
        };
        /**
         * @language zh_CN
         * @private
         */
        RimlightMethod.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            context3DProxy.uniform1fv(usage["uniform_rimData"], this.uniform_rimData);
        };
        /**
         * @language zh_CN
         * @private
         */
        RimlightMethod.prototype.dispose = function () {
        };
        return RimlightMethod;
    }(egret3d.MethodBase));
    egret3d.RimlightMethod = RimlightMethod;
    __reflect(RimlightMethod.prototype, "egret3d.RimlightMethod");
})(egret3d || (egret3d = {}));
