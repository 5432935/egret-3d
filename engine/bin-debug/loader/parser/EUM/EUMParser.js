var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @private
     * @language zh_CN
     * @class egret3d.EUMParser
     * @classdesc
     * 用 EUMParser 类 解析.eum 文件
     */
    var EUMParser = (function () {
        function EUMParser() {
        }
        /**
         * @language zh_CN
         * @param datas 加载的二进制流
         * @returns { [key: number]: ByteArray }
         */
        EUMParser.parse = function (datas) {
            var bytes = new egret3d.ByteArray(datas);
            var fileFormatBytes = new egret3d.ByteArray();
            bytes.readBytes(fileFormatBytes, 0, 3);
            //版本号;
            var version = bytes.readUnsignedShort();
            if (!egret3d.EUMVersion.versionDictionary[version]) {
                console.log("egret3d engine not found " + version + " version");
                return null;
            }
            egret3d.EUMVersion.versionValue = version;
            return egret3d.EUMVersion.versionDictionary[version](bytes);
        };
        return EUMParser;
    }());
    egret3d.EUMParser = EUMParser;
    __reflect(EUMParser.prototype, "egret3d.EUMParser");
})(egret3d || (egret3d = {}));
