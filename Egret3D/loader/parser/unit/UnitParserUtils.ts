module egret3d {

    /**
    * @language zh_CN
    * @private
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UnitParserUtils {

        public static parserType(data: any, type: string): string {
            switch (type) {
                case "xml":
                    break;
                case "json":
                    if (data.type) {
                        return data.type;
                    }
                    if (data.meta) {
                        if (data.meta.smartupdate) {
                            data.meta.smartupdate.indexOf(IConfigParser.TYPE_TEXTUREPACKER);
                            return IConfigParser.TYPE_TEXTUREPACKER;
                        }
                    }

                    return IConfigParser.TYPE_PARTICLE;
            }
            return "";
        }

        public static parserConfig(dataConfig: string, type: string): IConfigParser {
            var config = null;
            switch (type) {
                case "xml":
                    config = XMLParser.parse(dataConfig);
                    break;
                case "json":
                    config = eval("(" + dataConfig + ")");
                    break;
            }
            var fileType: string = UnitParserUtils.parserType(config, type);
            switch (fileType) {
                case IConfigParser.TYPE_SCENE:
                case IConfigParser.TYPE_SKIN_MESH:
                case IConfigParser.TYPE_EFFECT_GROUP:
                    return new UnitConfigParser(config, type, fileType);
                case IConfigParser.TYPE_PARTICLE:
                    return new ParticleParser(dataConfig, type, fileType);
                case IConfigParser.TYPE_TEXTUREPACKER:
                    return new TexturePackerParser(dataConfig, type, fileType);
            }

            return null;
        }

        public static mapParser(type: string, data: any, mapConfigParser: UnitConfigParser) {

            var mapParser: UnitParser;
            switch (type) {
                case "xml":
                    mapParser = new UnitXmlParser(data, mapConfigParser);
                    break;
                case "json":
                    mapParser = new UnitJsonParser(data, mapConfigParser);
                    break;
            }
            if (mapParser) {
                mapParser.parser();
            }
        }

        public static particleParser(type: string, text: string): ParticleData {
            return new ParticleParser(text, type).data;
        }

        public static jsonVersion(version: number, data: any, mapConfigParser: UnitConfigParser): UnitJsonParser {
            var parser: UnitJsonParser;
            switch (version) {
                case 1:
                    parser = new UnitJsonParser_1(data, mapConfigParser);
                    break;
                default:
                    parser = new UnitJsonParser_1(data, mapConfigParser);
                    break;
            }

            return parser;
        }

        public static xmlVersion(version: number, data: any, mapConfigParser: UnitConfigParser): UnitXmlParser {
            var parser: UnitXmlParser;
            switch (version) {
                case 1:
                    parser = new UnitXmlParser_1(data, mapConfigParser);
                    break;
            }

            return parser;
        }

        public static binVersion(version: number, data: any, mapConfigParser: UnitConfigParser): UnitBinParser {

            return null;
        }
    }
}