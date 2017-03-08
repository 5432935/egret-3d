module egret3d {

    function sortByOrder(a: IRender, b: IRender): number {
        return b.drawOrder - a.drawOrder;
    }

    function alphaZSort(a: IRender, b: IRender): number {
        return b.zIndex - a.zIndex;
    }

    /**
    * @private
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum SpecialCast {
        Shadow, Pick,
    }

    /**
    * @private
    * @class egret3d.EntityCollect
    * @classdesc
    * Object3D 渲染对象收集器,把渲染对象进行可视筛选，
    * 并且划分渲染层级，依次排序到加入列表.
    *
    * @see egret3d.Scene3D
    * @see egret3d.View3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class EntityCollect {

        public numberVertex: number = 0;
        public numberFace: number = 0;
        public numberDraw: number = 0;
        public numberSkin: number = 0;
        public numberAnimation: number = 0;
        public numberParticle: number = 0;
        public numberCastShadow: number = 0;
        public numberAcceptShadow: number = 0;
        public numberPick: number = 0;

        public softLayerRenderItems: { [key: string]: IRender[] } = {};
        public specialCastItem: { [key: string]: IRender[] } = {};

        public rootScene: Scene3D;

        /**
        * @private
        * @language zh_CN
        * 可渲染对象列表
        */
        public renderList: Array<IRender>;

        /**
        * @language zh_CN
        * constructor
        * @param root 渲染根节点
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {

            for (var i: number = 0; i < Layer.layerType.length; i++) {
                this.softLayerRenderItems[Layer.layerType[i]] = [];
            }

            this.specialCastItem[SpecialCast.Shadow] = [];
            this.specialCastItem[SpecialCast.Pick] = [];

            this.renderList = new Array<IRender>();
        }

        public set root(rootScene: Scene3D) {
            this.rootScene = rootScene;
        }

        public get root(): Scene3D {
            return this.rootScene;
        }

        /**
        * @language zh_CN
        * 尝试添加节点
        * @version Egret 3.0
        * @param child   尝试添加的节点
        * @param camera     相机
        * @platform Web,Native
        */
        private applyRender(child: any, camera: Camera3D) {
            if (!child.visible) {
                return;
            }

            this.addRenderItem(child, camera);

            for (var i: number = 0; i < child.childs.length; i++) {
                this.applyRender(child.childs[i], camera);
            }
        }

        /**
        * @language zh_CN
        * 尝试添加四叉树列表
        * @version Egret 3.0
        * @param quadList   需要被判定是否在视锥体里的节点列表
        * @param camera     相机
        * @platform Web,Native
        */
        private appendQuadList(quadList: Array<IQuadNode>, camera: Camera3D) {
            var mesh: Mesh;
            var node: IQuadNode;
            for (node of quadList) {
                if (!(node instanceof Mesh))
                    continue;
                mesh = <Mesh>node;
                if (mesh && mesh.visible && mesh["material"])
                    this.addRenderItem(mesh, camera, false);
            }
        }

        /**
        * @language zh_CN
        * 尝试将一个渲染对象，进行视锥体裁剪，放入到渲染队列中
        * @param root 渲染根节点
        * @param cameraCulling 是否使用相机裁剪
        * @version Egret 3.0
        * @platform Web,Native
        */
        private addRenderItem(renderItem: IRender, camera: Camera3D, cameraCulling: boolean = true): void {
            if (cameraCulling) {
                if (!camera.isVisibleToCamera(renderItem)) {
                    return;
                }
            }

            //检查鼠标能pick
            if (renderItem.enablePick) {
                this.specialCastItem[SpecialCast.Pick].push(renderItem);
                this.numberPick++;
            }

            if (!renderItem.material) {
                return;
            }

            //检查阴影产生者
            if (renderItem.material.castShadow) {
                this.specialCastItem[SpecialCast.Shadow].push(renderItem);
                this.numberCastShadow++;
            }

            //检查阴影接受者
            if (renderItem.material.acceptShadow) {
                this.numberAcceptShadow++;
            }

            //按 layer 进行渲染排序分类
            if (renderItem.material.materialData.alphaBlending && renderItem.tag.name == Layer.TAG_NAME_NORMAL_OBJECT) {
                var scenePos: Vector3D = camera.object3DToScreenRay(renderItem.position, Vector3D.HELP_0);
                renderItem.zIndex = Vector3D.HELP_0.z;
                this.softLayerRenderItems[Layer.TAG_NAME_ALPHA_OBJECT].push(renderItem);
            } else {
                for (var i: number = 0; i < Layer.layerType.length; i++) {
                    if (renderItem.tag.name == Layer.layerType[i]) {
                        this.softLayerRenderItems[Layer.layerType[i]].push(renderItem);
                    }
                }
            }

            if (Egret3DEngine.instance.debug) {
                this.numberFace += renderItem.geometry.faceCount;
                this.numberVertex += renderItem.geometry.vertexCount;
                this.numberDraw += 1;

                if (renderItem.animation)
                    this.numberSkin += 1;
                if (renderItem.proAnimation)
                    this.numberAnimation += 1;
                if (renderItem.type == IRender.TYPE_PARTICLE_EMIT)
                    this.numberParticle += 1;
            }
        }

        /**
        * @language zh_CN
        * 数据更新 处理需要渲染的对象
        * @param camera 当前摄像机
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(camera: Camera3D) {
            camera.modelMatrix;

            this.clear();

            if (Egret3DEngine.instance.debug) {
                Egret3DEngine.instance.performance.startCounter("entityCollect applyRender", 60);
            }

            if (this.rootScene.quad) {
                var box: BoundBox = camera.frustum.box;
                var quadList: Array<IQuadNode> = this.rootScene.quad.getNodesByAABB(box.min.x, box.min.y, box.max.x, box.max.y);
                this.appendQuadList(quadList, camera);
            } else {
                this.applyRender(this.rootScene, camera);
            }

            if (Egret3DEngine.instance.debug) {
                Egret3DEngine.instance.performance.endCounter("entityCollect applyRender");
            }

            // 排序
            var renders: IRender[], layerName: string, listLen: number;
            // 进行alpha排序
            layerName = Layer.TAG_NAME_ALPHA_OBJECT;
            renders = this.softLayerRenderItems[layerName];
            if (renders && renders.length) {
                listLen = renders.length;
                renders.sort(alphaZSort);
            }
            // 进行重要度排序
            for (var j: number = 0; j < Layer.layerType.length; j++) {
                layerName = Layer.layerType[j];
                renders = this.softLayerRenderItems[layerName];
                if (renders) {
                    listLen = renders.length;
                    renders.sort(sortByOrder);
                    for (var i: number = 0; i < listLen; i++) {
                        this.renderList.push(renders[i]);
                    }
                }
            }
        }

        protected clear() {
            this.numberFace = 0;
            this.numberVertex = 0;
            this.numberDraw = 0;
            this.numberSkin = 0;
            this.numberAnimation = 0;
            this.numberParticle = 0;
            this.numberCastShadow = 0;
            this.numberPick = 0;
            this.numberAcceptShadow = 0;

            for (var i: number = 0; i < Layer.layerType.length; i++) {
                this.softLayerRenderItems[Layer.layerType[i]].length = 0;
            }

            for (var j in this.specialCastItem) {
                this.specialCastItem[j].length = 0;
            }

            this.renderList.length = 0;
        }

        /**
        * @language zh_CN
        * 查找一个对象在渲染列表的下标
        * @param obj 要查找的对象
        * @returns 返回对象在渲染列表的下标
        */
        public findRenderObject(obj: IRender): number {
            for (var i: number = 0; i < this.renderList.length; ++i) {
                if (this.renderList[i] === obj) {
                    return i;
                }
            }
            return -1;
        }

    }
}