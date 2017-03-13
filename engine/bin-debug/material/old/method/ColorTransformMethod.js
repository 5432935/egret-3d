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
    * @class egret3d.ColorTransformMethod
    * @classdesc
    * 继承自 MethodBase,为材质球附加特效的共有基类.
    * 实现偏色渲染方法。
    * 将最终渲染的argb值按照这个transform进行修正。
    * 也可以用来做颜色的变化特效,实时修改颜色变化,闪烁
    * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/ColorTransformMethod.ts
    * @see egret3d.texture.ColorTransform
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ColorTransformMethod = (function (_super) {
        __extends(ColorTransformMethod, _super);
        /**
        * @language zh_CN
        * 创建一个ColorTransformMethod对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        function ColorTransformMethod() {
            var _this = _super.call(this) || this;
            _this.fsShaderList[egret3d.ShaderPhaseType.multi_end_fragment] = _this.fsShaderList[egret3d.ShaderPhaseType.multi_end_fragment] || [];
            _this.fsShaderList[egret3d.ShaderPhaseType.multi_end_fragment].push("colorTransform_fs");
            return _this;
        }
        Object.defineProperty(ColorTransformMethod.prototype, "colorTransform", {
            /**
            * @language zh_CN
            * 返回ColorTransform数据
            * @param trasform ColorTransform
            * @see egret3d.texture.ColorTransform
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.materialData.colorTransform;
            },
            /**
            * @language zh_CN
            * 设置ColorTransform数据
            * @param trasform ColorTransform
            * @see egret3d.texture.ColorTransform
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (trasform) {
                this.materialData.colorTransform = trasform;
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
        ColorTransformMethod.prototype.upload = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            usage["uniform_colorTransformAlpha"] = context3DProxy.getUniformLocation(usage.program3D, "uniform_colorTransformAlpha");
            usage["uniform_colorTransformM44"] = context3DProxy.getUniformLocation(usage.program3D, "uniform_colorTransformM44");
        };
        /**
        * @private
        * @language zh_CN
        */
        ColorTransformMethod.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            context3DProxy.uniform1f(usage["uniform_colorTransformAlpha"], this.colorTransform.alpha);
            context3DProxy.uniformMatrix4fv(usage["uniform_colorTransformM44"], false, this.colorTransform.m44.rawData);
        };
        return ColorTransformMethod;
    }(egret3d.MethodBase));
    egret3d.ColorTransformMethod = ColorTransformMethod;
    __reflect(ColorTransformMethod.prototype, "egret3d.ColorTransformMethod");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ColorTransformMethod.js.map