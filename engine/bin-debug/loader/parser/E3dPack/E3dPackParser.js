var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @private
     * @language zh_CN
     * @class egret3d.ERMParser
     * @classdesc
     * 用 EPMParser 类 解析.erm 文件
     */
    var E3dPackParser = (function () {
        function E3dPackParser() {
        }
        /**
         * @language zh_CN
         * @param datas 加载的二进制流
         * @returns PropertyAnim
         */
        E3dPackParser.parse = function (datas, url) {
            var bytes = new egret3d.ByteArray(datas);
            var iscompress = bytes.readByte();
            if (iscompress == 1) {
                var len = bytes.readInt();
                var context = new egret3d.ByteArray();
                bytes.readBytes(context, 0, len);
                context.uncompress();
                bytes = context;
            }
            var fileFormatBytes = new egret3d.ByteArray();
            bytes.readBytes(fileFormatBytes, 0, 7);
            //版本号;
            var version = bytes.readUnsignedShort();
            if (!egret3d.E3dPackVersion.versionDictionary[version]) {
                console.log("egret3d engine not found " + version + " version");
                return null;
            }
            var path = url.replace(".e3dPack", "/");
            return egret3d.E3dPackVersion.versionDictionary[version](bytes, path);
        };
        return E3dPackParser;
    }());
    egret3d.E3dPackParser = E3dPackParser;
    __reflect(E3dPackParser.prototype, "egret3d.E3dPackParser");
})(egret3d || (egret3d = {}));
