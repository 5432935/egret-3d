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
        * @class egret3d.Attribute
        * @classdesc
        * 变量属性
        * @version Egret 3.0
        * @platform Web,Native
        */
        var Attribute = (function (_super) {
            __extends(Attribute, _super);
            /**
            * @language zh_CN
            * constructor
            * @param name
            * @param valueType
            */
            function Attribute(name, valueType) {
                var _this = _super.call(this) || this;
                _this.name = name;
                _this.computeVarName();
                _this.key = "attribute";
                _this.valueType = valueType;
                return _this;
            }
            return Attribute;
        }(GLSL.VarRegister));
        GLSL.Attribute = Attribute;
        __reflect(Attribute.prototype, "egret3d.GLSL.Attribute");
    })(GLSL = egret3d.GLSL || (egret3d.GLSL = {}));
})(egret3d || (egret3d = {}));
