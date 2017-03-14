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
        * @class egret3d.Extension
        * @classdesc
        * 变量属性
        * @version Egret 3.0
        * @platform Web,Native
        */
        var Extension = (function (_super) {
            __extends(Extension, _super);
            /**
            * @language zh_CN
            * constructor
            * @param name
            * @param valueType
            */
            function Extension(name) {
                var _this = _super.call(this) || this;
                _this.name = name;
                _this.computeVarName();
                _this.key = "#extension";
                return _this;
            }
            return Extension;
        }(GLSL.VarRegister));
        GLSL.Extension = Extension;
        __reflect(Extension.prototype, "egret3d.GLSL.Extension");
    })(GLSL = egret3d.GLSL || (egret3d.GLSL = {}));
})(egret3d || (egret3d = {}));
