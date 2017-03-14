var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @private
     * @language zh_CN
     * @class egret3d.EUMVersion
     * @classdesc
     */
    var EUMVersion = (function () {
        function EUMVersion() {
        }
        EUMVersion.parserVersion_1 = function (bytes) {
            var source = {};
            var len = bytes.readUnsignedInt();
            for (var i = 0; i < len; i++) {
                var id = bytes.readUnsignedInt();
                var arrayLen = bytes.readUnsignedInt();
                var array = new egret3d.ByteArray();
                bytes.readBytes(array, 0, arrayLen);
                source[id] = array;
            }
            return source;
        };
        EUMVersion.parserVersion_2 = function (bytes) {
            var source = {};
            var len = bytes.readUnsignedInt();
            for (var i = 0; i < len; i++) {
                var id = bytes.readUnsignedInt();
                var arrayLen = bytes.readUnsignedInt();
                var array = new egret3d.ByteArray();
                bytes.readBytes(array, 0, arrayLen);
                source[id] = array;
            }
            return source;
        };
        EUMVersion.fillGeometryUv2 = function (id, uv2Dict, geo) {
            switch (EUMVersion.versionValue) {
                case 1:
                    return EUMVersion.fillGeometryUv2_1(id, uv2Dict, geo);
                case 2:
                    return EUMVersion.fillGeometryUv2_2(id, uv2Dict, geo);
                default:
                    return null;
            }
        };
        EUMVersion.fillGeometryUv2_1 = function (id, uv2Dict, geo) {
            if (!uv2Dict || !uv2Dict[id]) {
                return;
            }
            var array = uv2Dict[id];
            array.position = 0;
            var uv2Array = [];
            var uvCount = array.readUnsignedInt();
            for (var i = 0; i < uvCount; i++) {
                uv2Array.push(array.readFloat());
                uv2Array.push(array.readFloat());
            }
            var uertexIndex = 0;
            var faceCount = array.readUnsignedInt();
            for (var i = 0; i < faceCount; i++) {
                for (var j = 0; j < 3; ++j) {
                    uertexIndex = i * 3 + j;
                    var uv2Index = array.readUnsignedShort();
                    var u = uv2Array[uv2Index * egret3d.Geometry.uv2Size + 0];
                    var v = uv2Array[uv2Index * egret3d.Geometry.uv2Size + 1];
                    geo.setVerticesForIndex(uertexIndex, egret3d.VertexFormat.VF_UV1, [u, v]);
                }
            }
        };
        EUMVersion.fillGeometryUv2_2 = function (id, uv2Dict, geo) {
            if (!uv2Dict || !uv2Dict[id]) {
                return;
            }
            var array = uv2Dict[id];
            array.position = 0;
            var x = array.readFloat();
            var y = array.readFloat();
            var z = array.readFloat();
            var w = array.readFloat();
            var uertexIndex = 0;
            var faceCount = geo.faceCount;
            for (var i = 0; i < faceCount; i++) {
                for (var j = 0; j < 3; ++j) {
                    uertexIndex = i * 3 + j;
                    var uv1 = geo.getVertexForIndex(uertexIndex, egret3d.VertexFormat.VF_UV1);
                    var u = uv1[0] * x + z;
                    var v = 1 - (uv1[1] * y + w);
                    geo.setVerticesForIndex(uertexIndex, egret3d.VertexFormat.VF_UV1, [u, v]);
                }
            }
        };
        return EUMVersion;
    }());
    EUMVersion.versionDictionary = {
        1: function (bytes) { return EUMVersion.parserVersion_1(bytes); },
        2: function (bytes) { return EUMVersion.parserVersion_2(bytes); },
    };
    egret3d.EUMVersion = EUMVersion;
    __reflect(EUMVersion.prototype, "egret3d.EUMVersion");
})(egret3d || (egret3d = {}));
