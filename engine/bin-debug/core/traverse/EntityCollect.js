var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    function sortByOrder(a, b) {
        return b.drawOrder - a.drawOrder;
    }
    function alphaZSort(a, b) {
        return b.zIndex - a.zIndex;
    }
    /**
    * @private
    * @version Egret 3.0
    * @platform Web,Native
    */
    var SpecialCast;
    (function (SpecialCast) {
        SpecialCast[SpecialCast["Shadow"] = 0] = "Shadow";
        SpecialCast[SpecialCast["Pick"] = 1] = "Pick";
    })(SpecialCast = egret3d.SpecialCast || (egret3d.SpecialCast = {}));
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
    var EntityCollect = (function () {
        /**
        * @language zh_CN
        * constructor
        * @param root 渲染根节点
        * @version Egret 3.0
        * @platform Web,Native
        */
        function EntityCollect() {
            this.numberVertex = 0;
            this.numberFace = 0;
            this.numberDraw = 0;
            this.numberSkin = 0;
            this.numberAnimation = 0;
            this.numberParticle = 0;
            this.numberCastShadow = 0;
            this.numberAcceptShadow = 0;
            this.numberPick = 0;
            this.softLayerRenderItems = {};
            this.specialCastItem = {};
            for (var i = 0; i < egret3d.Layer.layerType.length; i++) {
                this.softLayerRenderItems[egret3d.Layer.layerType[i]] = [];
            }
            this.specialCastItem[SpecialCast.Shadow] = [];
            this.specialCastItem[SpecialCast.Pick] = [];
            this.renderList = new Array();
        }
        Object.defineProperty(EntityCollect.prototype, "root", {
            get: function () {
                return this.rootScene;
            },
            set: function (rootScene) {
                this.rootScene = rootScene;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 尝试添加节点
        * @version Egret 3.0
        * @param child   尝试添加的节点
        * @param camera     相机
        * @platform Web,Native
        */
        EntityCollect.prototype.applyRender = function (child, camera) {
            //检查鼠标能pick
            if (child.enablePick) {
                this.specialCastItem[SpecialCast.Pick].push(child);
                this.numberPick++;
            }
            if (!child.visible) {
                return;
            }
            this.addRenderItem(child, camera);
            for (var i = 0; i < child.childs.length; i++) {
                this.applyRender(child.childs[i], camera);
            }
        };
        /**
        * @language zh_CN
        * 尝试添加四叉树列表
        * @version Egret 3.0
        * @param quadList   需要被判定是否在视锥体里的节点列表
        * @param camera     相机
        * @platform Web,Native
        */
        EntityCollect.prototype.appendQuadList = function (quadList, camera) {
            var mesh;
            var node;
            for (var _i = 0, quadList_1 = quadList; _i < quadList_1.length; _i++) {
                node = quadList_1[_i];
                if (!(node instanceof egret3d.Mesh))
                    continue;
                mesh = node;
                if (mesh && mesh.visible && mesh["material"])
                    this.addRenderItem(mesh, camera, false);
            }
        };
        /**
        * @language zh_CN
        * 尝试将一个渲染对象，进行视锥体裁剪，放入到渲染队列中
        * @param root 渲染根节点
        * @param cameraCulling 是否使用相机裁剪
        * @version Egret 3.0
        * @platform Web,Native
        */
        EntityCollect.prototype.addRenderItem = function (renderItem, camera, cameraCulling) {
            if (cameraCulling === void 0) { cameraCulling = true; }
            if (cameraCulling) {
                if (!camera.isVisibleToCamera(renderItem)) {
                    return;
                }
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
            if (renderItem.material.materialData.alphaBlending && renderItem.tag.name == egret3d.Layer.TAG_NAME_NORMAL_OBJECT) {
                var scenePos = camera.object3DToScreenRay(renderItem.position, egret3d.Vector3.HELP_0);
                renderItem.zIndex = egret3d.Vector3.HELP_0.z;
                this.softLayerRenderItems[egret3d.Layer.TAG_NAME_ALPHA_OBJECT].push(renderItem);
            }
            else {
                for (var i = 0; i < egret3d.Layer.layerType.length; i++) {
                    if (renderItem.tag.name == egret3d.Layer.layerType[i]) {
                        this.softLayerRenderItems[egret3d.Layer.layerType[i]].push(renderItem);
                    }
                }
            }
            if (egret3d.Egret3DEngine.instance.debug) {
                this.numberFace += renderItem.geometry.faceCount;
                this.numberVertex += renderItem.geometry.vertexCount;
                this.numberDraw += 1;
                if (renderItem.animation)
                    this.numberSkin += 1;
                if (renderItem.proAnimation)
                    this.numberAnimation += 1;
                if (renderItem.type == egret3d.IRender.TYPE_PARTICLE_EMIT)
                    this.numberParticle += 1;
            }
        };
        /**
        * @language zh_CN
        * 数据更新 处理需要渲染的对象
        * @param camera 当前摄像机
        * @version Egret 3.0
        * @platform Web,Native
        */
        EntityCollect.prototype.update = function (camera) {
            camera.modelMatrix;
            this.clear();
            if (egret3d.Egret3DEngine.instance.debug) {
                egret3d.Egret3DEngine.instance.performance.startCounter("entityCollect applyRender", 60);
            }
            if (this.rootScene.quad) {
                var box = camera.frustum.box;
                var quadList = this.rootScene.quad.getNodesByAABB(box.min.x, box.min.y, box.max.x, box.max.y);
                this.appendQuadList(quadList, camera);
            }
            else {
                this.applyRender(this.rootScene, camera);
            }
            if (egret3d.Egret3DEngine.instance.debug) {
                egret3d.Egret3DEngine.instance.performance.endCounter("entityCollect applyRender");
            }
            // 排序
            var renders, layerName, listLen;
            // 进行alpha排序
            layerName = egret3d.Layer.TAG_NAME_ALPHA_OBJECT;
            renders = this.softLayerRenderItems[layerName];
            if (renders && renders.length) {
                listLen = renders.length;
                renders.sort(alphaZSort);
            }
            // 进行重要度排序
            for (var j = 0; j < egret3d.Layer.layerType.length; j++) {
                layerName = egret3d.Layer.layerType[j];
                renders = this.softLayerRenderItems[layerName];
                if (renders) {
                    listLen = renders.length;
                    renders.sort(sortByOrder);
                    for (var i = 0; i < listLen; i++) {
                        this.renderList.push(renders[i]);
                    }
                }
            }
        };
        EntityCollect.prototype.clear = function () {
            this.numberFace = 0;
            this.numberVertex = 0;
            this.numberDraw = 0;
            this.numberSkin = 0;
            this.numberAnimation = 0;
            this.numberParticle = 0;
            this.numberCastShadow = 0;
            this.numberPick = 0;
            this.numberAcceptShadow = 0;
            for (var i = 0; i < egret3d.Layer.layerType.length; i++) {
                this.softLayerRenderItems[egret3d.Layer.layerType[i]].length = 0;
            }
            for (var j in this.specialCastItem) {
                this.specialCastItem[j].length = 0;
            }
            this.renderList.length = 0;
        };
        /**
        * @language zh_CN
        * 查找一个对象在渲染列表的下标
        * @param obj 要查找的对象
        * @returns 返回对象在渲染列表的下标
        */
        EntityCollect.prototype.findRenderObject = function (obj) {
            for (var i = 0; i < this.renderList.length; ++i) {
                if (this.renderList[i] === obj) {
                    return i;
                }
            }
            return -1;
        };
        return EntityCollect;
    }());
    egret3d.EntityCollect = EntityCollect;
    __reflect(EntityCollect.prototype, "egret3d.EntityCollect");
})(egret3d || (egret3d = {}));
