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
        * @private
        * @class egret3d.Sampler3D
        * @classdesc
        *
        * shader中samplerCube类型变量的所有数据
        * 包含变量类型，变量名，变量的值
        *
        * @see egret3d.AttributeType
        *
        * @version Egret 3.0
        * @platform Web,Native
        */
        var Sampler3D = (function (_super) {
            __extends(Sampler3D, _super);
            /**
            * @language zh_CN
            * 构造
            * @param name 变量名
            */
            function Sampler3D(name) {
                var _this = _super.call(this) || this;
                _this.name = name;
                _this.computeVarName();
                _this.key = "samplerCube";
                return _this;
            }
            return Sampler3D;
        }(GLSL.VarRegister));
        GLSL.Sampler3D = Sampler3D;
        __reflect(Sampler3D.prototype, "egret3d.GLSL.Sampler3D");
    })(GLSL = egret3d.GLSL || (egret3d.GLSL = {}));
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Sampler3D.js.map