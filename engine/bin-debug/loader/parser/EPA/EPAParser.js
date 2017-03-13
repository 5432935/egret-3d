var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @private
     * @language zh_CN
     * @class egret3d.EPAParser
     * @classdesc
     * 用 EPMParser 类 解析.epa 文件
     */
    var EPAParser = (function () {
        function EPAParser() {
        }
        /**
         * @language zh_CN
         * @param datas 加载的二进制流
         * @returns PropertyAnim
         */
        EPAParser.parse = function (datas) {
            var bytes = new egret3d.ByteArray(datas);
            //验证标识头：'E' 'P' 'A' '\0'
            if (bytes.readUnsignedInt() != 0x65706100) {
                return null;
            }
            //版本号;
            var version = bytes.readUnsignedInt();
            if (!egret3d.EPAVersion.versionDictionary[version]) {
                console.log("egret3d engine not found " + version + " version");
                return null;
            }
            return egret3d.EPAVersion.versionDictionary[version](bytes);
        };
        return EPAParser;
    }());
    egret3d.EPAParser = EPAParser;
    __reflect(EPAParser.prototype, "egret3d.EPAParser");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=EPAParser.js.map