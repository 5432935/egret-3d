var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @private
     * @language zh_CN
     * @class egret3d.ESMParser
     * @classdesc
     * 用 ESMParser 类 解析.esm 文件
     */
    var ESMParser = (function () {
        function ESMParser() {
        }
        /**
          * @language zh_CN
          * 从二进制流中解析出模型Geometry信息
          * @param datas 加载的二进制流
          * @returns Geometry
          */
        ESMParser.parse = function (datas, param) {
            if (param === void 0) { param = null; }
            var bytes = new egret3d.ByteArray(datas);
            var fileFormatBytes = new egret3d.ByteArray();
            bytes.readBytes(fileFormatBytes, 0, 3);
            var version = bytes.readUnsignedInt();
            if (!egret3d.ESMVersion.versionDictionary[version]) {
                console.log("egret3d engine not found " + version + " version");
                return null;
            }
            var geomtryData = new egret3d.GeometryData();
            egret3d.ESMVersion.versionDictionary[version](bytes, geomtryData, param);
            var geomtry;
            var vertexFormat = 0;
            if (geomtryData.source_skinData.length > 0) {
                vertexFormat = egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_NORMAL | egret3d.VertexFormat.VF_TANGENT | egret3d.VertexFormat.VF_COLOR | egret3d.VertexFormat.VF_UV0 | egret3d.VertexFormat.VF_SKIN;
                geomtry = egret3d.GeometryData.buildGeomtry(geomtryData, vertexFormat);
            }
            else {
                vertexFormat = egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_NORMAL | egret3d.VertexFormat.VF_TANGENT | egret3d.VertexFormat.VF_COLOR | egret3d.VertexFormat.VF_UV0 | egret3d.VertexFormat.VF_UV1;
                geomtry = egret3d.GeometryData.buildGeomtry(geomtryData, vertexFormat);
            }
            geomtryData = null;
            return geomtry;
        };
        return ESMParser;
    }());
    egret3d.ESMParser = ESMParser;
    __reflect(ESMParser.prototype, "egret3d.ESMParser");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ESMParser.js.map