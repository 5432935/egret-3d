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
    var UnitParserUtils = (function () {
        function UnitParserUtils() {
        }
        UnitParserUtils.parserType = function (data, type) {
            switch (type) {
                case "xml":
                    break;
                case "json":
                    if (data.type) {
                        return data.type;
                    }
                    if (data.meta) {
                        if (data.meta.smartupdate) {
                            data.meta.smartupdate.indexOf(egret3d.IConfigParser.TYPE_TEXTUREPACKER);
                            return egret3d.IConfigParser.TYPE_TEXTUREPACKER;
                        }
                    }
                    if (data.property && data.emission && data.life) {
                        return egret3d.IConfigParser.TYPE_PARTICLE;
                    }
                    return "";
            }
            return "";
        };
        UnitParserUtils.parserConfig = function (dataConfig, type) {
            var fileType = UnitParserUtils.parserType(dataConfig, type);
            switch (fileType) {
                case egret3d.IConfigParser.TYPE_SCENE:
                case egret3d.IConfigParser.TYPE_SKIN_MESH:
                case egret3d.IConfigParser.TYPE_EFFECT_GROUP:
                    return new egret3d.UnitConfigParser(dataConfig, type, fileType);
                case egret3d.IConfigParser.TYPE_PARTICLE:
                    return new egret3d.ParticleParser(dataConfig, type, fileType);
                case egret3d.IConfigParser.TYPE_TEXTUREPACKER:
                    return new egret3d.TexturePackerParser(dataConfig, type, fileType);
            }
            return null;
        };
        UnitParserUtils.mapParser = function (type, data, mapConfigParser) {
            var mapParser;
            switch (type) {
                case "xml":
                    mapParser = new egret3d.UnitXmlParser(data, mapConfigParser);
                    break;
                case "json":
                    mapParser = new egret3d.UnitJsonParser(data, mapConfigParser);
                    break;
            }
            if (mapParser) {
                mapParser.parser();
            }
        };
        UnitParserUtils.particleParser = function (type, text) {
            return new egret3d.ParticleParser(text, type).data;
        };
        UnitParserUtils.jsonVersion = function (version, data, mapConfigParser) {
            var parser;
            switch (version) {
                case 1:
                    parser = new egret3d.UnitJsonParser_1(data, mapConfigParser);
                    break;
                default:
                    parser = new egret3d.UnitJsonParser_1(data, mapConfigParser);
                    break;
            }
            return parser;
        };
        UnitParserUtils.xmlVersion = function (version, data, mapConfigParser) {
            var parser;
            switch (version) {
                case 1:
                    parser = new egret3d.UnitXmlParser_1(data, mapConfigParser);
                    break;
            }
            return parser;
        };
        UnitParserUtils.binVersion = function (version, data, mapConfigParser) {
            return null;
        };
        return UnitParserUtils;
    }());
    egret3d.UnitParserUtils = UnitParserUtils;
    __reflect(UnitParserUtils.prototype, "egret3d.UnitParserUtils");
})(egret3d || (egret3d = {}));
