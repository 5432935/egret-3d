var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @language zh_CN
    * @class egret3d.QuadTreeCell
    * @classdesc
    * 四叉树叶子节点
    * @version Egret 3.0
    * @platform Web,Native
    */
    var QuadTreeCell = (function () {
        /**
        * @language zh_CN
        * constructor
        * @param aabox 该叶子的包围盒
        * @version Egret 3.0
        * @platform Web,Native
        */
        function QuadTreeCell(aabox) {
            this.childCellIndices = new Array();
            this.childCellIndices.length = QuadTreeCell.NUM_CHILDREN;
            this.nodeIndices = new Array();
            this.clear();
            if (aabox) {
                this.aabb = aabox.clone();
            }
            else {
                this.aabb = new egret3d.QuadAABB();
            }
        }
        /**
        * @language zh_CN
        * Indicates if we contain triangles (if not then we should/might have children)
        * @version Egret 3.0
        * @platform Web,Native
        */
        QuadTreeCell.prototype.isLeaf = function () {
            return this.childCellIndices[0] == -1;
        };
        /**
        * @language zh_CN
        * 重置该叶子
        * @version Egret 3.0
        * @platform Web,Native
        */
        QuadTreeCell.prototype.clear = function () {
            for (var i = 0; i < QuadTreeCell.NUM_CHILDREN; i++) {
                this.childCellIndices[i] = -1;
            }
            this.nodeIndices.splice(0, this.nodeIndices.length);
        };
        return QuadTreeCell;
    }());
    /**
    * @language zh_CN
    * 一个叶子单元最多包含子叶子树4个
    * @version Egret 3.0
    * @platform Web,Native
    */
    QuadTreeCell.NUM_CHILDREN = 4;
    egret3d.QuadTreeCell = QuadTreeCell;
    __reflect(QuadTreeCell.prototype, "egret3d.QuadTreeCell");
})(egret3d || (egret3d = {}));
