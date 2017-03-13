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
    * @class egret3d.Terrain
    * @classdesc
    * 地形网格创建
    * 使用地形高度图,生成地形。
    * 通过读取草数据，主要有草密度/宽度/高度/颜色/使用贴图等属性，结合高度图组装成一片草。
    * @see egret3d.ElevationGeometry
    * @see egret3d.ImageTexture
    * @see egret3d.Mesh
    * @includeExample core/node/terrain/Terrain.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Terrain = (function (_super) {
        __extends(Terrain, _super);
        /**
        * @language zh_CN
        * 构造函数
        * @param heightmap 高度图
        * @param width 地形宽度 默认1000
        * @param height 地形主度 默认100
        * @param depth 地形长度 默认1000
        * @param segmentsW 格子列 默认128
        * @param segmentsH 格子行 默认128
        * @param useLod 是否使用lod  如果使用lod segmentsW和segmentsH必须相等并且是2的n次方
        * @param mat 材质 默认为null
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Terrain(heightmap, width, height, depth, segmentsW, segmentsH, useLod, mat) {
            if (width === void 0) { width = 1000; }
            if (height === void 0) { height = 100; }
            if (depth === void 0) { depth = 1000; }
            if (segmentsW === void 0) { segmentsW = 128; }
            if (segmentsH === void 0) { segmentsH = 128; }
            if (useLod === void 0) { useLod = false; }
            if (mat === void 0) { mat = null; }
            var _this = _super.call(this, new egret3d.ElevationGeometry(heightmap, width, height, depth, segmentsW, segmentsH), mat) || this;
            _this.useLod = useLod;
            if (useLod) {
                if (segmentsW == segmentsH && (segmentsW & (segmentsW - 1)) == 0) {
                    _this.vertex = _this.geometry.getVertexForIndex(0, egret3d.VertexFormat.VF_POSITION, null, _this.geometry.vertexCount);
                    _this.lodQuadTree = new egret3d.LODQuadTree(_this.vertex, segmentsW);
                    _this.lodQuadTree.onUpdate(_this.modelMatrix);
                }
                else {
                    egret3d.Egret3DLog.outError("地形宽高不相等或者不是2的N次方!");
                }
            }
            return _this;
        }
        /**
        * @language zh_CN
        * @private
        * @param other copy对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Terrain.prototype.copy = function (other) {
            _super.prototype.copy.call(this, other);
        };
        /**
        * @private
        * @language zh_CN
        * 克隆当前地形
        * @returns Terrain 克隆后的对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Terrain.prototype.clone = function () {
            var cloneMesh = new Terrain(this.terrainGeometry.heightmap, this.terrainGeometry.width, this.terrainGeometry.height, this.terrainGeometry.depth, this.terrainGeometry.segmentsW, this.terrainGeometry.segmentsH, this.useLod, this.material);
            cloneMesh.copy(this);
            return cloneMesh;
        };
        Object.defineProperty(Terrain.prototype, "terrainGeometry", {
            /**
            * @language zh_CN
            * 返回地形的ElevationGeometry
            * @see egret3d.ElevationGeometry
            * @returns ElevationGeometry 地形网格
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.geometry;
            },
            enumerable: true,
            configurable: true
        });
        Terrain.prototype.onUpdateTransform = function () {
            _super.prototype.onUpdateTransform.call(this);
            if (this.lodQuadTree) {
                this.lodQuadTree.onUpdate(this.modelMatrix);
            }
        };
        /**
        * @language zh_CN
        * 开启或关闭LOD
        * @param useLod 开启或关闭
        * @version Egret 3.0
        * @platform Web,Native
        */
        Terrain.prototype.startLOD = function (useLod) {
            if (useLod && !this.lodQuadTree) {
                var eleGeo = this.geometry;
                if (eleGeo.segmentsW == eleGeo.segmentsH && (eleGeo.segmentsW & (eleGeo.segmentsW - 1)) == 0) {
                    this.vertex = this.geometry.getVertexForIndex(0, egret3d.VertexFormat.VF_POSITION, null, this.geometry.vertexCount);
                    this.lodQuadTree = new egret3d.LODQuadTree(this.vertex, eleGeo.segmentsW);
                    this.lodQuadTree.onUpdate(this.modelMatrix);
                }
                else {
                    egret3d.Egret3DLog.outError("地形宽高不相等或者不是2的N次方!");
                }
            }
            else {
                if (this.lodQuadTree) {
                    this.lodQuadTree.enable = false;
                }
            }
        };
        /**
        * @language zh_CN
        * @private
        */
        Terrain.prototype.update = function (time, delay, camera) {
            _super.prototype.update.call(this, time, delay, camera);
            if (this.lodQuadTree) {
                var index = 0;
                index = this.lodQuadTree.build(index, this.geometry.indexArray, this.cullCamrea ? this.cullCamrea : camera);
                this.geometry.indexCount = index;
                this.geometry.bufferDiry = true;
                this.geometry.subGeometrys[0].count = this.geometry.indexCount;
                if (!this.lodQuadTree.enable) {
                    this.lodQuadTree = null;
                }
            }
        };
        return Terrain;
    }(egret3d.Mesh));
    egret3d.Terrain = Terrain;
    __reflect(Terrain.prototype, "egret3d.Terrain");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Terrain.js.map