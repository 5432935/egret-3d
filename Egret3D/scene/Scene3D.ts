module egret3d {

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
    export class Scene3D extends Object3D{
        private _tree: TreeBase;
        
        /**
        * @language zh_CN
        * 四叉树根对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _quad: QuadRoot;
        constructor() {
            super();
            this._tree = new TreeBase(this);
        }

        /**
        * @language zh_CN
        * 返回剖分场景四叉树根信息
        * @returns QuadRoot
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get quad(): QuadRoot {
            return this._quad;
        }

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public infrustumList(camera: Camera3D): Object3D[] {
            return this._tree.infrustumList(camera);
        }

        /**
        * @private
        * @language zh_CN
        * 根据当前场景的节点分布情况，生成四叉树
        * @version Egret 3.0
        * @platform Web,Native
        */
        public createQuadTree(): void {
            this._quad = new QuadRoot(16, 2500);
            var nodes: Array<IQuadNode> = new Array<IQuadNode>();
            this.collectQuadList(nodes, this);
            this._quad.createQuadTree(nodes);
        }

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
        private collectQuadList(nodes: Array<IQuadNode>, obj: Object3D): Array<IQuadNode> {
            nodes = nodes || new Array<IQuadNode>();
            var mesh: Mesh;
            if(obj instanceof Mesh) {
                mesh = <Mesh>obj;
                if (mesh.aabb) {
                    nodes.push(mesh);
                }
            }
            
            var child: Object3D;
            if(obj.childs && obj.childs.length > 0) {
                for (child of obj.childs) {
                    this.collectQuadList(nodes, child);
                }
            }

            return nodes;
        }

        /**
        * @language zh_CN
        * 克隆当前Role
        * @returns Role 克隆后的对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): Scene3D {
            var cloneObject: Scene3D = new Scene3D();
            cloneObject.copy(this);
            return cloneObject;
        }
    }
} 