var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @class egret3d.GeometryUtil
    * @classdesc
    * 创建Geometry的功能类,
    * 可以创建引擎内部默认顶点数据类型的 Geometry
    * @see egret3d.Geometry
    * @version Egret 3.0
    * @platform Web,Native
    */
    var GeometryUtil = (function () {
        function GeometryUtil() {
        }
        /**
        * @language zh_CN
        * 创建一个Geometry对象，指定了顶点的数据结构，但是顶点数据需要额外填充
        * @param vertexFromat {VertexFormat} 顶点数据格式，默认参数为 VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_TANGENT | VertexFormat.VF_COLOR | VertexFormat.VF_UV0 | VertexFormat.VF_UV1
        * @default VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_TANGENT | VertexFormat.VF_COLOR | VertexFormat.VF_UV0 | VertexFormat.VF_UV1
        * @returns {Geometry} Geometry对象
        * @see egret3d.VertexFormat
        * @version Egret 3.0
        * @platform Web,Native
        */
        GeometryUtil.createGeometry = function (vertexFromat) {
            if (vertexFromat === void 0) { vertexFromat = egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_NORMAL | egret3d.VertexFormat.VF_TANGENT | egret3d.VertexFormat.VF_COLOR | egret3d.VertexFormat.VF_UV0 | egret3d.VertexFormat.VF_UV1; }
            var geo = new egret3d.Geometry();
            geo.vertexFormat = vertexFromat;
            return geo;
        };
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        GeometryUtil.createGemetryForType = function (type, gemetry) {
            switch (type) {
                case "CubeGeometry":
                    return new egret3d.CubeGeometry(gemetry.width, gemetry.height, gemetry.depth);
                case "CylinderGeometry":
                    return new egret3d.CylinderGeometry(gemetry.height, gemetry.radius);
                case "ElevationGeometry":
                    return new egret3d.ElevationGeometry(gemetry.heightmap, gemetry.width, gemetry.height, gemetry.depth, gemetry.segmentsW, gemetry.segmentsH);
                case "PlaneGeometry":
                    return new egret3d.PlaneGeometry(gemetry.width, gemetry.height, gemetry.segmentsW, gemetry.segmentsH, gemetry.uScale, gemetry.vScale);
                case "SphereGeometry":
                    return new egret3d.SphereGeometry(gemetry.r, gemetry.segmentsW, gemetry.segmentsH);
            }
            return null;
        };
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        GeometryUtil.fromVertexFormatToLength = function (vf) {
            var length = 0;
            if (vf & egret3d.VertexFormat.VF_POSITION) {
                length += egret3d.Geometry.positionSize;
            }
            if (vf & egret3d.VertexFormat.VF_NORMAL) {
                length += egret3d.Geometry.normalSize;
            }
            if (vf & egret3d.VertexFormat.VF_TANGENT) {
                length += egret3d.Geometry.tangentSize;
            }
            if (vf & egret3d.VertexFormat.VF_COLOR) {
                length += egret3d.Geometry.colorSize;
            }
            if (vf & egret3d.VertexFormat.VF_UV0) {
                length += egret3d.Geometry.uvSize;
            }
            if (vf & egret3d.VertexFormat.VF_UV1) {
                length += egret3d.Geometry.uv2Size;
            }
            if (vf & egret3d.VertexFormat.VF_SKIN) {
                length += egret3d.Geometry.skinSize;
            }
            if (vf & egret3d.VertexFormat.VF_QUAD_ORIGN) {
                length += egret3d.QuadData.originalSize;
            }
            if (vf & egret3d.VertexFormat.VF_QUAD_POS) {
                length += egret3d.QuadData.posOffest;
            }
            if (vf & egret3d.VertexFormat.VF_QUAD_UVREC) {
                length += egret3d.QuadData.uvRectangleSize;
            }
            if (vf & egret3d.VertexFormat.VF_QUAD_ROTATION) {
                length += egret3d.QuadData.rotationSize;
            }
            if (vf & egret3d.VertexFormat.VF_QUAD_MASK) {
                length += egret3d.QuadData.maskSize;
            }
            if (vf & egret3d.VertexFormat.VF_QUAD_COLOR) {
                length += egret3d.QuadData.colorSize;
            }
            return length;
        };
        return GeometryUtil;
    }());
    egret3d.GeometryUtil = GeometryUtil;
    __reflect(GeometryUtil.prototype, "egret3d.GeometryUtil");
})(egret3d || (egret3d = {}));
