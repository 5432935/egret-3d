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
    var GLSL;
    (function (GLSL) {
        /**
        * @private
        * @class egret3d.Uniform
        * @classdesc
        *
        * shader中uniform类型的所有数据
        * 包含变量类型，变量名，变量的值
        *
        * @see egret3d.AttributeType
        *
        * @version Egret 3.0
        * @platform Web,Native
        */
        var Uniform = (function (_super) {
            __extends(Uniform, _super);
            /**
            * @language zh_CN
            * 创建一个Uniform对象
            * @param name 变量名
            * @param valueType 变量类型
            */
            function Uniform(name, valueType) {
                var _this = _super.call(this) || this;
                _this.name = name;
                _this.computeVarName();
                _this.key = "uniform";
                _this.valueType = valueType;
                return _this;
            }
            return Uniform;
        }(GLSL.VarRegister));
        GLSL.Uniform = Uniform;
        __reflect(Uniform.prototype, "egret3d.GLSL.Uniform");
    })(GLSL = egret3d.GLSL || (egret3d.GLSL = {}));
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Uniform.js.map