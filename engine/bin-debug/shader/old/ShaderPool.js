var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    */
    var ShaderPool2 = (function () {
        function ShaderPool2() {
        }
        return ShaderPool2;
    }());
    //总shader的map容器
    ShaderPool2.programlib = new egret3d.HashMap();
    ShaderPool2.vsShaderHashMap = new egret3d.HashMap();
    ShaderPool2.fsShaderHashMap = new egret3d.HashMap();
    egret3d.ShaderPool2 = ShaderPool2;
    __reflect(ShaderPool2.prototype, "egret3d.ShaderPool2");
})(egret3d || (egret3d = {}));
