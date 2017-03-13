var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @private
     * @language zh_CN
     * @class egret3d.ECAParser
     * @classdesc
     * 用 EAMParser 类 解析.eca 文件
     */
    var ECAParser = (function () {
        function ECAParser() {
        }
        /**
         * @language zh_CN
         * @param datas 加载的二进制流
         * @returns CameraAnimationController
         */
        ECAParser.parse = function (datas) {
            var bytes = new egret3d.ByteArray(datas);
            var fileFormatBytes = new egret3d.ByteArray();
            bytes.readBytes(fileFormatBytes, 0, 3);
            var version = bytes.readUnsignedInt();
            if (!egret3d.ECAVersion.versionDictionary[version]) {
                console.log("egret3d engine not found " + version + " version");
                return null;
            }
            return egret3d.ECAVersion.versionDictionary[version](bytes);
        };
        return ECAParser;
    }());
    egret3d.ECAParser = ECAParser;
    __reflect(ECAParser.prototype, "egret3d.ECAParser");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ECAParser.js.map