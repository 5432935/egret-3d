var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @language zh_CN
    * @class egret3d.QuadRoot
    * @classdesc
    * 创建四叉树的根对象。当前只能用于管理场景中静态的Object，
    * @version Egret 3.0
    * @platform Web,Native
    */
    var QuadRoot = (function () {
        /**
        * @language zh_CN
        * constructor
        * @param maxNodesPerCell 一个Cell中最多几个节点
        * @param minCellSize 一个cell单元最小划分到多小
        */
        function QuadRoot(maxNodesPerCell, minCellSize) {
            if (maxNodesPerCell === void 0) { maxNodesPerCell = 10; }
            if (minCellSize === void 0) { minCellSize = 500; }
            this._maxNodesPerCell = maxNodesPerCell;
            this._minCellSize = minCellSize;
            this._segBox = new egret3d.QuadAABB;
            this._collisionNodesIdx = new Array();
            this._collisionNodes = new Array();
        }
        /**
        * @language zh_CN
        * 创建并构造四叉树
        * @param nodes 需要插入到四叉树中的节点列表
        */
        QuadRoot.prototype.createQuadTree = function (nodes) {
            this._quadTree = new egret3d.QuadTree();
            this._quadTree.initNodes(nodes);
            this._quadTree.buildQuadTree(this._maxNodesPerCell, this._minCellSize);
        };
        /**
        * @language zh_CN
        * 在设定范围内，框选出一批节点
        * @param minX 框选范围最小x值
        * @param minY 框选范围最小y值
        * @param maxX 框选范围最大x值
        * @param maxY 框选范围最大y值
        * @returns Array<IQuadNode>
        */
        QuadRoot.prototype.getNodesByAABB = function (minX, minY, maxX, maxY) {
            // 创建一个射线的boundingbox
            this._segBox.clear();
            this._segBox.maxPosX = maxX;
            this._segBox.maxPosY = maxY;
            this._segBox.minPosX = minX;
            this._segBox.minPosY = minY;
            // 获取Boundingbox中的nodes
            this._collisionNodesIdx.length = 0;
            this._collisionNodes.length = 0;
            var numNodes = this._quadTree.getNodesIntersectingtAABox(this._collisionNodesIdx, this._segBox);
            var quadNode;
            for (var i = 0; i < this._collisionNodesIdx.length; i++) {
                quadNode = this._quadTree.getQuadNode(this._collisionNodesIdx[i]);
                this._collisionNodes.push(quadNode);
            }
            return this._collisionNodes;
        };
        /**
        * @language zh_CN
        * 给定一个三维坐标点，获取节点中最为接近的一个三角形
        * @param point 给定的点
        * @param threshold 设定的阈值，超出这个距离则视为放弃
        * @returns IQuadNode
        */
        QuadRoot.prototype.getTriangleAtPoint = function (point, threshold) {
            if (threshold === void 0) { threshold = 5; }
            // 创建一个射线的boundingbox
            this._segBox.clear();
            this._segBox.setAABox(point.x, point.z, 1, 1);
            this._collisionNodesIdx.length = 0;
            this._collisionNodes.length = 0;
            // 获取Boundingbox中的node的ID
            var numTriangles = this._quadTree.getNodesIntersectingtAABox(this._collisionNodesIdx, this._segBox);
            // 检查那个三角与点(x,y)相交
            var minDistance = 0xffffffff;
            var curDistance = 0;
            var minTriangle;
            var quadNode;
            var triangle;
            var box;
            for (var i = 0; i < this._collisionNodesIdx.length; i++) {
                quadNode = this._quadTree.getQuadNode(this._collisionNodesIdx[i]);
                box = quadNode.aabb;
                if (!egret3d.PointUtils.pointInsideTriangle(point, box.points[0], box.points[1], box.points[2])) {
                    continue;
                }
                triangle = quadNode;
                curDistance = Math.abs(triangle.plane.distance(point));
                if (curDistance > threshold)
                    continue;
                if (quadNode == null || curDistance <= minDistance) {
                    minTriangle = triangle;
                    minDistance = curDistance;
                }
            }
            return minTriangle;
        };
        return QuadRoot;
    }());
    egret3d.QuadRoot = QuadRoot;
    __reflect(QuadRoot.prototype, "egret3d.QuadRoot");
})(egret3d || (egret3d = {}));
