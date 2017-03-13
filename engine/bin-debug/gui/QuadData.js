var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    */
    var QuadData = (function () {
        function QuadData() {
        }
        QuadData.buildGeometry = function (geometry, start, numberQuad) {
            var geometry = geometry;
            geometry.vertexFormat = egret3d.VertexFormat.VF_QUAD_POS | egret3d.VertexFormat.VF_QUAD_ORIGN | egret3d.VertexFormat.VF_QUAD_UVREC | egret3d.VertexFormat.VF_QUAD_ROTATION | egret3d.VertexFormat.VF_QUAD_MASK | egret3d.VertexFormat.VF_QUAD_COLOR;
            var subGeometry = new egret3d.SubGeometry();
            geometry.vertexCount = numberQuad * 4;
            geometry.indexCount = QuadData.singleQuadIndex.length * numberQuad;
            var zIndex = 0;
            var offset = 0;
            for (var i = 0; i < numberQuad; i++) {
                zIndex = (i + start);
                QuadData.singleQuadData[0 * QuadData.vertexLen + 2] = zIndex;
                QuadData.singleQuadData[1 * QuadData.vertexLen + 2] = zIndex;
                QuadData.singleQuadData[2 * QuadData.vertexLen + 2] = zIndex;
                QuadData.singleQuadData[3 * QuadData.vertexLen + 2] = zIndex;
                offset = i * 4 * geometry.vertexAttLength;
                for (var j1 = 0; j1 < QuadData.singleQuadData.length; j1++) {
                    geometry.vertexArray[offset + j1] = QuadData.singleQuadData[j1];
                }
                for (var j2 = 0; j2 < QuadData.singleQuadIndex.length; j2++) {
                    geometry.indexArray[i * QuadData.singleQuadIndex.length + j2] = QuadData.singleQuadIndex[j2] + 4 * i;
                }
            }
            subGeometry.geometry = geometry;
            subGeometry.start = 0;
            subGeometry.count = geometry.indexCount;
            geometry.subGeometrys.push(subGeometry);
            geometry.vertexAttLength = QuadData.vertexLen;
        };
        return QuadData;
    }());
    QuadData.singleQuadData = [
        /*pos*/ 0.0, 0.0, 100000.0, 0.0, /*original*/ 0.0, 0.0, 0.0, 0.0, /*uv*/ 0.0, 0.0, 1.0, 1.0, /*rotation*/ 0.0, 0.0, 0.0, 1.0, /*mask*/ -1.0, 0.0, 1.0, 1.0, /*color*/ 0.0, 0.0, 1.0, 1.0,
        /*pos*/ 0.0, 0.0, 100000.0, 0.0, /*original*/ 0.0, 0.0, 0.0, 0.0, /*uv*/ 1.0, 0.0, 1.0, 1.0, /*rotation*/ 0.0, 0.0, 0.0, 1.0, /*mask*/ -1.0, 0.0, 1.0, 1.0, /*color*/ 0.0, 0.0, 1.0, 1.0,
        /*pos*/ 0.0, 0.0, 100000.0, 0.0, /*original*/ 0.0, 0.0, 0.0, 0.0, /*uv*/ 1.0, 1.0, 1.0, 1.0, /*rotation*/ 0.0, 0.0, 0.0, 1.0, /*mask*/ -1.0, 0.0, 1.0, 1.0, /*color*/ 0.0, 0.0, 1.0, 1.0,
        /*pos*/ 0.0, 0.0, 100000.0, 0.0, /*original*/ 0.0, 0.0, 0.0, 0.0, /*uv*/ 0.0, 1.0, 1.0, 1.0, /*rotation*/ 0.0, 0.0, 0.0, 1.0, /*mask*/ -1.0, 0.0, 1.0, 1.0, /*color*/ 0.0, 0.0, 1.0, 1.0
    ];
    QuadData.vertexLen = 24;
    QuadData.posOffest = 0;
    QuadData.posSize = 4; //(width, height, zIndex, ?)
    QuadData.originalOffset = 4;
    QuadData.originalSize = 4; //(x, y, texId, boolList)
    QuadData.uvRectangleOffest = 8;
    QuadData.uvRectangleSize = 4; //(U, V, scaleX, scaleY)
    QuadData.rotationOffest = 12;
    QuadData.rotationSize = 4; //(x, y, z, w)
    QuadData.maskOffset = 16;
    QuadData.maskSize = 4; //(maskX, maskY, maskWidth, maskHeight)
    QuadData.colorOffest = 20;
    QuadData.colorSize = 4; //(r, g, b, a)
    QuadData.singleQuadIndex = [0, 2, 1, 0, 3, 2];
    QuadData.vertexBytes = QuadData.vertexLen * 4;
    QuadData.quadVertexLen = QuadData.vertexLen * 4;
    egret3d.QuadData = QuadData;
    __reflect(QuadData.prototype, "egret3d.QuadData");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=QuadData.js.map