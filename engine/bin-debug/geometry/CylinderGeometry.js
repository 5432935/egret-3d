var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var egret3d;
(function (egret3d) {
    /**
     * @language zh_CN
     * @class egret3d.CylinderGeometry
     * @classdesc
     * CylinderGeometry类 表示圆柱体</p>
     *
     * 示例：</p>
     * 用 CylinderGeometry 对象创建一个mesh，并给予默认纹理材质TextureMaterial（默认为棋盘格纹理)</p>
     <pre>
     var box: egret3d.Mesh = new egret3d.Mesh( new egret3d.CylinderGeometry(), new egret3d.TextureMaterial() );
     </pre>
     * @includeExample geometry/CubeGeometry.ts
     * @see egret3d.Geometry
     * @version Egret 3.0
     * @platform Web,Native
     */
    var CylinderGeometry = (function (_super) {
        __extends(CylinderGeometry, _super);
        /**
        * @language zh_CN
        * 构造函数
        * @param height {number} 宽度 默认为100
        * @param radius {number} 半径 默认为200
        * @version Egret 3.0
        * @platform Web,Native
        */
        function CylinderGeometry(height, radius) {
            if (height === void 0) { height = 100; }
            if (radius === void 0) { radius = 200; }
            var _this = _super.call(this) || this;
            _this._height = height;
            _this._radius = radius;
            _this.buildGeomtry();
            return _this;
        }
        Object.defineProperty(CylinderGeometry.prototype, "height", {
            /**
            * @language zh_CN
            * 圆柱体高度
            * @returns {number} 高度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CylinderGeometry.prototype, "radius", {
            /**
            * @language zh_CN
            * 圆柱体半径
            * @returns {number} 半径
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._radius;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @private
        * @language zh_CN
        * 生成网格
        */
        CylinderGeometry.prototype.buildGeomtry = function () {
            this.vertexFormat = egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_NORMAL | egret3d.VertexFormat.VF_TANGENT | egret3d.VertexFormat.VF_COLOR | egret3d.VertexFormat.VF_UV0 | egret3d.VertexFormat.VF_UV1;
            var vertexBuffer = [];
            var indexBuffer = [];
            //this.vertexCount = m_nSegments * 2 + 2;
            //this.indexCount = 
            var m_nSegments = 20;
            var nCurrentSegment = 20;
            var rDeltaSegAngle = (2.0 * Math.PI / m_nSegments);
            var rSegmentLength = 1.0 / m_nSegments;
            for (nCurrentSegment = 0; nCurrentSegment < m_nSegments; nCurrentSegment++) {
                var x0 = this._radius * Math.sin(nCurrentSegment * rDeltaSegAngle);
                var z0 = this._radius * Math.cos(nCurrentSegment * rDeltaSegAngle);
                vertexBuffer.push(x0, 0.0 + (this._height / 2.0), z0, x0, 0.0, z0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0, x0, 0.0 - (this._height / 2.0), z0, x0, 0.0, z0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0);
            }
            var len_base = vertexBuffer.length / this.vertexAttLength;
            var topCenter = len_base;
            vertexBuffer.push(0.0, 0.0 - (this._height / 2.0), 0.0, 0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0);
            var buttomCenter = len_base + 1;
            vertexBuffer.push(0.0, 0.0 + (this._height / 2.0), 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0);
            for (var i = 0; i < len_base; i++) {
                if ((i & 1) != 0) {
                    indexBuffer.push(i, i + 1 >= len_base ? i + 1 - len_base : i + 1, i + 2 >= len_base ? i + 2 - len_base : i + 2, topCenter, i, i + 2 >= len_base ? i + 2 - len_base : i + 2);
                }
                else {
                    indexBuffer.push(i + 1 >= len_base ? i + 1 - len_base : i + 1, i, i + 2 >= len_base ? i + 2 - len_base : i + 2, i, buttomCenter, i + 2 >= len_base ? i + 2 - len_base : i + 2);
                }
            }
            this.setVerticesForIndex(0, this.vertexFormat, vertexBuffer, vertexBuffer.length / this.vertexAttLength);
            this.setVertexIndices(0, indexBuffer);
            var subGeometry = new egret3d.SubGeometry();
            subGeometry.geometry = this;
            subGeometry.start = 0;
            subGeometry.count = this.indexCount;
            this.subGeometrys.push(subGeometry);
        };
        return CylinderGeometry;
    }(egret3d.Geometry));
    egret3d.CylinderGeometry = CylinderGeometry;
    __reflect(CylinderGeometry.prototype, "egret3d.CylinderGeometry");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=CylinderGeometry.js.map