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
    * @language zh_CN
    * @private
    * @version Egret 3.0
    * @platform Web,Native
    */
    var UnitBinParser = (function (_super) {
        __extends(UnitBinParser, _super);
        function UnitBinParser(data, mapConfigParser) {
            return _super.call(this, data, mapConfigParser) || this;
        }
        return UnitBinParser;
    }(egret3d.UnitParser));
    egret3d.UnitBinParser = UnitBinParser;
    __reflect(UnitBinParser.prototype, "egret3d.UnitBinParser");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=UnitBinParser.js.map