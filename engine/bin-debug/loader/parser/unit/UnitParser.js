var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @private
    * @version Egret 3.0
    * @platform Web,Native
    */
    var UnitParser = (function () {
        function UnitParser(data, mapConfigParser) {
            this._data = data;
            this._mapConfigParser = mapConfigParser;
            this._versionParser = null;
        }
        UnitParser.prototype.parser = function () {
        };
        UnitParser.prototype.parseTexture = function (node) {
        };
        UnitParser.prototype.parseMethod = function (node) {
            return null;
        };
        UnitParser.prototype.parseMat = function (node) {
            return null;
        };
        UnitParser.prototype.parseNode = function (node) {
            return null;
        };
        UnitParser.prototype.parseEnvironment = function (environment) {
        };
        UnitParser.prototype.parseHud = function (node) {
            return null;
        };
        UnitParser.prototype.parseLight = function (node) {
            return null;
        };
        return UnitParser;
    }());
    egret3d.UnitParser = UnitParser;
    __reflect(UnitParser.prototype, "egret3d.UnitParser");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=UnitParser.js.map