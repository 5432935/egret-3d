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
     * @private
     * @language zh_CN
     * @class egret3d.ParticleParser
     * @classdesc
     * 用 ParticleParser 解析粒子文件
     */
    var ParticleParser = (function (_super) {
        __extends(ParticleParser, _super);
        function ParticleParser(data, type, fileType) {
            if (fileType === void 0) { fileType = egret3d.IConfigParser.TYPE_PARTICLE; }
            var _this = _super.call(this, fileType) || this;
            switch (type) {
                case "xml":
                    _this.data = _this.parseXml(data);
                    break;
                case "json":
                    _this.data = _this.parseJson(data);
                    break;
            }
            if (_this.data.shape.meshFile) {
                _this.taskDict[_this.data.shape.meshFile] = 0;
            }
            if (_this.data.property.meshFile) {
                _this.taskDict[_this.data.property.meshFile] = 0;
            }
            return _this;
        }
        /**
         * @language zh_CN
         * @param xml 粒子特效的数据解析
         * @returns ParticleData
         */
        ParticleParser.prototype.parseJson = function (text) {
            this.data = new egret3d.ParticleData();
            var parser = new egret3d.ParticleJsonParser();
            parser.parse(text, this.data);
            this.version = Number(parser.version);
            this.engineVersion = String(parser.engineVersion);
            this.data.validate();
            return this.data;
        };
        ParticleParser.prototype.parseXml = function (text) {
            this.data = new egret3d.ParticleData();
            var parser = new egret3d.ParticleXmlParser();
            parser.parse(text, this.data);
            this.version = Number(parser.version);
            this.data.validate();
            return this.data;
        };
        return ParticleParser;
    }(egret3d.IConfigParser));
    egret3d.ParticleParser = ParticleParser;
    __reflect(ParticleParser.prototype, "egret3d.ParticleParser");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ParticleParser.js.map