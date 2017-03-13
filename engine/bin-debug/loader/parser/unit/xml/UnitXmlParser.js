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
    var UnitXmlParser = (function (_super) {
        __extends(UnitXmlParser, _super);
        function UnitXmlParser(data, mapConfigParser) {
            var _this = _super.call(this, data, mapConfigParser) || this;
            var versionList = data.getElementsByTagName("version");
            _this._mapConfigParser.version = Number(versionList[0].textContent);
            return _this;
        }
        UnitXmlParser.prototype.parser = function () {
            this._versionParser = egret3d.UnitParserUtils.xmlVersion(this._mapConfigParser.version, this._data, this._mapConfigParser);
            var matList = this._data.getElementsByTagName("mat");
            var nodeList = this._data.getElementsByTagName("node");
            var environment = this._data.getElementsByTagName("env");
            var cameraAnimList = this._data.getElementsByTagName("cameraAnims");
            var hudList = this._data.getElementsByTagName("hud");
            var textureList = this._data.getElementsByTagName("texture");
            this.parseEnvironment(environment);
            for (var i = 0; i < matList.length; i++) {
                var matNodeData = this._versionParser.parseMat(matList[i]);
                if (matNodeData) {
                    this._mapConfigParser.matDict[matNodeData.id] = matNodeData;
                    this._mapConfigParser.calculateMatTask(matNodeData);
                }
            }
            for (var i = 0; i < nodeList.length; i++) {
                var mapNodeData = this._versionParser.parseNode(nodeList[i]);
                if (mapNodeData) {
                    this._mapConfigParser.nodeList.push(mapNodeData);
                    this._mapConfigParser.calculateNodeTask(mapNodeData);
                }
            }
            for (var i = 0; i < textureList.length; i++) {
                this.parseTexture(textureList[i]);
            }
            for (var i = 0; i < hudList.length; i++) {
                var hudNodeData = this._versionParser.parseHud(hudList[i]);
                if (hudNodeData) {
                    this._mapConfigParser.hudList.push(hudNodeData);
                    this._mapConfigParser.calculateHudTask(hudNodeData);
                }
            }
        };
        UnitXmlParser.prototype.nodeFilter = function (node) {
            return node.nodeName == "#text" || node.nodeName == "#comment";
        };
        return UnitXmlParser;
    }(egret3d.UnitParser));
    egret3d.UnitXmlParser = UnitXmlParser;
    __reflect(UnitXmlParser.prototype, "egret3d.UnitXmlParser");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=UnitXmlParser.js.map