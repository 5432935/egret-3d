var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @private
     * @language zh_CN
     * @class egret3d.ERMVersion
     * @classdesc
     */
    var E3dPackVersion = (function () {
        function E3dPackVersion() {
        }
        E3dPackVersion.parserVersion_1 = function (bytes, url) {
            var data = {};
            var name = bytes.readUTF();
            var len = bytes.readUnsignedShort();
            for (var i = 0; i < len; i++) {
                var path = bytes.readUTF();
                var count = bytes.readUnsignedInt();
                var array = new egret3d.ByteArray();
                bytes.readBytes(array, 0, count);
                data[path] = array;
                var assetPath = url + path;
                egret3d.assetMgr.addByteArray(assetPath, array, url);
            }
            return data;
        };
        return E3dPackVersion;
    }());
    E3dPackVersion.versionDictionary = {
        1: function (bytes, url) { return E3dPackVersion.parserVersion_1(bytes, url); },
    };
    egret3d.E3dPackVersion = E3dPackVersion;
    __reflect(E3dPackVersion.prototype, "egret3d.E3dPackVersion");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=E3dPackVersion.js.map