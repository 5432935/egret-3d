var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    */
    var UnitHUDData = (function () {
        function UnitHUDData() {
            this.bothside = false;
        }
        return UnitHUDData;
    }());
    egret3d.UnitHUDData = UnitHUDData;
    __reflect(UnitHUDData.prototype, "egret3d.UnitHUDData");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=UnitHUDData.js.map