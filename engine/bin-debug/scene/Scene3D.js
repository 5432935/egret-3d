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
    * @class egret3d.Scene3D
    * @classdesc
    * 场景的根节点对象
    * 创建场景后会将场景树中的静态物体进行四叉树空间划分
    * 然后会根据 划分好的的空间进行裁剪
    * 在View3D 中的场景节点为 Scene3D
    * @see egret3d.Object3D
    * @see egret3d.Scene3D
    * @includeExample scene/Scene3D.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Scene3D = (function (_super) {
        __extends(Scene3D, _super);
        function Scene3D() {
            var _this = _super.call(this) || this;
            _this._tree = new egret3d.TreeBase(_this);
            return _this;
        }
        Object.defineProperty(Scene3D.prototype, "quad", {
            /**
            * @language zh_CN
            * 返回剖分场景四叉树根信息
            * @returns QuadRoot
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._quad;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        Scene3D.prototype.infrustumList = function (camera) {
            return this._tree.infrustumList(camera);
        };
        /**
        * @private
        * @language zh_CN
        * 根据当前场景的节点分布情况，生成四叉树
        * @version Egret 3.0
        * @platform Web,Native
        */
        Scene3D.prototype.createQuadTree = function () {
            this._quad = new egret3d.QuadRoot(16, 2500);
            var nodes = new Array();
            this.collectQuadList(nodes, this);
            this._quad.createQuadTree(nodes);
        };
        /**
        * @private
        * @language zh_CN
        * 遍历一个Object3D及其child节点，如果能够进入视锥体，则放入返回的列表中
        * @param  nodes 用于返回Quad元素结果
        * @param  obj   待遍历的对象
        * @returns Array<IQuadNode>
        * @version Egret 3.0
        * @platform Web,Native
        */
        Scene3D.prototype.collectQuadList = function (nodes, obj) {
            nodes = nodes || new Array();
            var mesh;
            if (obj instanceof egret3d.Mesh) {
                mesh = obj;
                if (mesh.aabb) {
                    nodes.push(mesh);
                }
            }
            var child;
            if (obj.childs && obj.childs.length > 0) {
                for (var _i = 0, _a = obj.childs; _i < _a.length; _i++) {
                    child = _a[_i];
                    this.collectQuadList(nodes, child);
                }
            }
            return nodes;
        };
        /**
        * @language zh_CN
        * 克隆当前Role
        * @returns Role 克隆后的对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Scene3D.prototype.clone = function () {
            var cloneObject = new Scene3D();
            cloneObject.copy(this);
            return cloneObject;
        };
        return Scene3D;
    }(egret3d.Object3D));
    egret3d.Scene3D = Scene3D;
    __reflect(Scene3D.prototype, "egret3d.Scene3D");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Scene3D.js.map