var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @private
     * @language zh_CN
     * @class egret3d.EAMParser
     * @classdesc
     * 用 EAMParser 类 解析.eam 文件
     */
    var EAMParser = (function () {
        function EAMParser() {
        }
        /**
         * @language zh_CN
         * @param datas 加载的二进制流
         * @returns SkeletonAnimationClip
         */
        EAMParser.parse = function (datas) {
            var bytes = new egret3d.ByteArray(datas);
            var fileFormatBytes = new egret3d.ByteArray();
            bytes.readBytes(fileFormatBytes, 0, 3);
            var version = bytes.readUnsignedInt();
            if (!egret3d.EAMVersion.versionDictionary[version]) {
                console.log("egret3d engine not found " + version + " version");
                return null;
            }
            return egret3d.EAMVersion.versionDictionary[version](bytes);
        };
        return EAMParser;
    }());
    egret3d.EAMParser = EAMParser;
    __reflect(EAMParser.prototype, "egret3d.EAMParser");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=EAMParser.js.map