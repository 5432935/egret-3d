var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @private
     * @language zh_CN
     * @class egret3d.AnimaNodeCollection
     * @classdesc
     * 动画功能节点收集器
     * 动画功能的收集，整理，初始化容器，一般在粒子系统里使用
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample animation/AnimaNodeCollection.ts
     */
    var AnimaNodeCollection = (function () {
        /**
        * @language zh_CN
        * 构造函数
        * @priavte
        */
        function AnimaNodeCollection() {
            /**
            * @language zh_CN
            * 动画节点容器
            * @priavte
            */
            this.nodes = new Array();
            /**
            * @language zh_CN
            * @priavte
            */
            this._vertexAttributes = {};
            this.nodes = new Array();
        }
        /**
        * @language zh_CN
        * 添加动画功能节点
        * 添加继承 animNodeBase 功能节点 例如粒子的 加速度功能节点，匀速功能节点
        * @param node 节点对象
        */
        AnimaNodeCollection.prototype.addNode = function (node) {
            this.nodes.push(node);
        };
        /**
        * @language zh_CN
        * 移除动画功能节点
        * 删除指定的动画功能节点，但是不能动态删除，需要进行 功能重置
        * @param node 节点对象
        */
        AnimaNodeCollection.prototype.removeNode = function (node) {
            var index = this.nodes.indexOf(node);
            if (index != -1)
                this.nodes.splice(index, 1);
        };
        /**
        * @language zh_CN
        * 获取节点容器
        * 获取整体的功能节点列表
        * @returns 节点容器
        */
        AnimaNodeCollection.prototype.getNodes = function () {
            return this.nodes;
        };
        /**
        * @language zh_CN
        * 计算节点
        * @private
        */
        AnimaNodeCollection.prototype.calculate = function (start) {
            var offset = start;
            for (var i = 0; i < this.nodes.length; i++) {
                for (var j = 0; j < this.nodes[i].attributes.length; ++j) {
                    if (this.nodes[i].attributes[j].size > 0) {
                        this.nodes[i].attributes[j].offset = offset;
                        this.nodes[i].attributes[j].stride = offset * Float32Array.BYTES_PER_ELEMENT;
                        offset += this.nodes[i].attributes[j].size;
                    }
                }
            }
            this.numberOfVertices = offset;
            this.vertexSizeInBytes = offset * Float32Array.BYTES_PER_ELEMENT;
        };
        return AnimaNodeCollection;
    }());
    egret3d.AnimaNodeCollection = AnimaNodeCollection;
    __reflect(AnimaNodeCollection.prototype, "egret3d.AnimaNodeCollection");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=AnimaNodeCollection.js.map