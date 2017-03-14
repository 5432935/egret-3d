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
    * @class egret3d.ColorMethod
    * @classdesc
    * 继承自 MethodBase,为材质球附加特效的共有基类.
    * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/ColorMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ColorMethod = (function (_super) {
        __extends(ColorMethod, _super);
        /**
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        function ColorMethod() {
            var _this = _super.call(this) || this;
            _this.fsShaderList[egret3d.ShaderPhaseType.diffuse_fragment] = _this.fsShaderList[egret3d.ShaderPhaseType.diffuse_fragment] || [];
            _this.fsShaderList[egret3d.ShaderPhaseType.diffuse_fragment].push("color_fragment");
            return _this;
        }
        /**
        * @private
        */
        ColorMethod.prototype.upload = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
        };
        /**
        * @private
        * @language zh_CN
        */
        ColorMethod.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
        };
        return ColorMethod;
    }(egret3d.MethodBase));
    egret3d.ColorMethod = ColorMethod;
    __reflect(ColorMethod.prototype, "egret3d.ColorMethod");
})(egret3d || (egret3d = {}));
