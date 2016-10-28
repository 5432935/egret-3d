module egret3d {

    /**
    * @private
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


        public infrustumList(camera: Camera3D): Object3D[] {
            return this._tree.infrustumList(camera);
        }

        /**
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



    }
} 