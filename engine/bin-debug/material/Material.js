var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var Material = (function () {
        function Material() {
        }
        return Material;
    }());
    egret3d.Material = Material;
    __reflect(Material.prototype, "egret3d.Material", ["egret3d.IMaterial"]);
})(egret3d || (egret3d = {}));
