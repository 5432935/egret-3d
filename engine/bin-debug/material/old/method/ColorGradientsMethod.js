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
    * @class egret3d.ColorGradientsMethod
    * @classdesc
    * 实现颜色渐变叠加
    * @see egret3d.MethodBase
    * @includeExample material/method/ColorGradientsMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ColorGradientsMethod = (function (_super) {
        __extends(ColorGradientsMethod, _super);
        /**
        * @language zh_CN
        * 创建一个ColorGradientsMethod对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        function ColorGradientsMethod() {
            var _this = _super.call(this) || this;
            _this._posStart = 0;
            _this._posEnd = 0;
            _this._color = new egret3d.Color();
            _this.fsShaderList[egret3d.ShaderPhaseType.multi_end_fragment] = _this.fsShaderList[egret3d.ShaderPhaseType.multi_end_fragment] || [];
            _this.fsShaderList[egret3d.ShaderPhaseType.multi_end_fragment].push("colorGradients_fs");
            return _this;
        }
        /**
        * @language zh_CN
        * 设置颜色渐变数据
        * @param posStart number 起始位置，相对小的y值
        * @param posEnd number 结束为止，相对大的y值
        * @param color Color
        * @version Egret 3.0
        * @platform Web,Native
        */
        ColorGradientsMethod.prototype.setStartData = function (posStart, posEnd, color) {
            this._color.copyFrom(color);
            this._posStart = posStart;
            this._posEnd = posEnd;
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
        ColorGradientsMethod.prototype.upload = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            usage["uniform_colorGradientsSource"] = context3DProxy.getUniformLocation(usage.program3D, "uniform_colorGradientsSource");
        };
        /**
        * @private
        * @language zh_CN
        */
        ColorGradientsMethod.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            this.materialData.colorGradientsSource[0] = this._posStart;
            this.materialData.colorGradientsSource[1] = this._posEnd;
            //color
            this.materialData.colorGradientsSource[2] = this._color.r;
            this.materialData.colorGradientsSource[3] = this._color.g;
            this.materialData.colorGradientsSource[4] = this._color.b;
            this.materialData.colorGradientsSource[5] = this._color.a;
            context3DProxy.uniform1fv(usage["uniform_colorGradientsSource"], this.materialData.colorGradientsSource);
        };
        return ColorGradientsMethod;
    }(egret3d.MethodBase));
    egret3d.ColorGradientsMethod = ColorGradientsMethod;
    __reflect(ColorGradientsMethod.prototype, "egret3d.ColorGradientsMethod");
})(egret3d || (egret3d = {}));
