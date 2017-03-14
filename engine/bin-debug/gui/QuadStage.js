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
    * @private
    * @class egret3d.QuadStage
    * @classdesc
    * GUI的舞台对象，引擎会自动创建该对象
    * @see egret3d.QuadStage
    * @version Egret 3.0
    * @platform Web,Native
    */
    var QuadStage = (function (_super) {
        __extends(QuadStage, _super);
        /**
        * @private
        * @constructor
        * @classdesc
        * gui中基础的2d显示单元</p>
        * 在这个class中，主要完成更新顶点数据。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        function QuadStage(view3D) {
            var _this = _super.call(this) || this;
            _this._childList = [];
            _this._quadMeshs = [];
            _this._quadCurHistory = [];
            _this._quadLastHistory = [];
            _this._renderListInvalid = false;
            _this.x = 0;
            _this.y = 0;
            _this.width = 0;
            _this.height = 0;
            /*
            * @private
            */
            _this.quadList = [];
            _this._view3D = view3D;
            _this._guiEventFire = new egret3d.GUIEventFire(_this);
            _this._textureGroup = new egret3d.GUITextureGroup();
            _this._guiContainer = new egret3d.GUIRootContainer();
            _this.changeCamera();
            return _this;
        }
        /**
        * @private
        * @language zh_CN
        * 注册ui用到的贴图素材源，最多7张。
        * @param texture gui所用到的贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        QuadStage.prototype.registerTexture = function (texture) {
            return this._textureGroup.register(texture);
        };
        /*
        *@private
        */
        QuadStage.prototype.changeCamera = function () {
            if (this._guiContainer.parent)
                this._guiContainer.parent.removeChild(this._guiContainer);
            this._view3D.camera3D.addChild(this._guiContainer);
        };
        QuadStage.prototype.creatQuadMesh = function () {
            var quadMesh = new egret3d.QuadMesh(this._quadMeshs.length * QuadStage.moreQuad);
            this._quadMeshs.push(quadMesh);
            this._guiContainer.addChild(quadMesh);
        };
        QuadStage.prototype.getChildQuads = function (displayObject, quadChilds) {
            var i = 0;
            var tempDisplayObject;
            /*判断当前 displayObject 类型,优先放入*/
            var quad;
            if (displayObject instanceof egret3d.Quad) {
                // add to quad list
                quad = displayObject;
                quadChilds.push(quad);
            }
            /*获取最深的显示对象*/
            while (i < displayObject.childs.length) {
                tempDisplayObject = displayObject.childs[i++];
                this.getChildQuads(tempDisplayObject, quadChilds);
            }
        };
        /**
        * @private
        * @language zh_CN
        * 添加孩子到舞台上
        * @param object 添加的2d显示对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        QuadStage.prototype.addChild = function (object) {
            if (!object) {
                throw Error("This object is null");
            }
            if (object.parent) {
                throw Error("parent isn't null");
            }
            this._childList.push(object);
            object.activeStage(this);
            object.parentIsStage = true;
            this.setRenderListInvalid();
        };
        /**
        * @private
        * @language zh_CN
        * 标记当前渲染队列需要重新计算
        * @version Egret 3.0
        * @platform Web,Native
        */
        QuadStage.prototype.setRenderListInvalid = function () {
            this._renderListInvalid = true;
        };
        QuadStage.prototype.updateRenderList = function () {
            this.quadList.length = 0;
            for (var i = 0; i < this._childList.length; i++) {
                this.getChildQuads(this._childList[i], this.quadList);
            }
            // if quadMesh not enough then creat new 
            if (this.quadList.length > this._quadMeshs.length * QuadStage.moreQuad) {
                var less = Math.ceil((this.quadList.length / QuadStage.moreQuad)) - this._quadMeshs.length;
                for (var i = 0; i < less; i++) {
                    this.creatQuadMesh();
                }
            }
        };
        /**
        * @private
        * @language zh_CN
        * 从舞台上移除某个孩子节点
        * @param object 添加的2d显示对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        QuadStage.prototype.removeChild = function (object) {
            var index = this._childList.indexOf(object);
            if (index != -1) {
                this._childList.splice(index, 1);
            }
            //if (quad instanceof Quad) {
            //    if (this.quadList.length < this.quadMeshs.length * QuadStage.moreQuad) {
            //        var tempQuadMesh: QuadMesh = (this.quadMeshs.splice(this.quadMeshs.length - 1, 1))[0];
            //        this._view3D.camera3D.removeChild(tempQuadMesh);
            //        tempQuadMesh.dispose();
            //    }
            //}
            object.activeStage(null);
            object.parentIsStage = false;
            this.setRenderListInvalid();
        };
        /**
        * @private
        * @language zh_CN
        * 在渲染之前逻辑更新，每帧执行一次
        * @param time 当前运行的总时间
        * @param delay 振间隔时间
        * @param context3DProxy 上下文引用
        * @param view3D 视图引用
        * @version Egret 3.0
        * @platform Web,Native
        */
        QuadStage.prototype.update = function (time, delay, context3DProxy, view3D) {
            var self = this;
            self.x = view3D.x;
            self.y = view3D.y;
            self.width = view3D.width;
            self.height = view3D.height;
            //collect render list
            if (this._renderListInvalid) {
                this._renderListInvalid = false;
                this.updateRenderList();
            }
            egret3d.Context3DProxy.gl.disable(egret3d.Context3DProxy.gl.DEPTH_TEST);
            egret3d.Stage3D.context3DProxy.disAttribPointer();
            //update data
            var i;
            var len = self.quadList.length;
            for (i = 0; i < len; i++) {
                this.quadList[i].update(time, delay);
            }
            //fire mouse event
            this._guiEventFire.fire();
            //update by zoon
            var geometryIndex;
            for (i = 0; i < len; i++) {
                geometryIndex = Math.floor(i / QuadStage.moreQuad);
                this.quadList[i].updateVertices(i % QuadStage.moreQuad, self._quadMeshs[geometryIndex].geometry, i);
            }
            //clear data
            this.clearInvalidVertices(len);
            //upload vertex data
            var quad;
            for (i = 0; i < self._quadMeshs.length; i++) {
                quad = self._quadMeshs[i];
                quad.geometry.upload(context3DProxy, egret3d.Context3DProxy.gl.DYNAMIC_DRAW);
                self._textureGroup.activeTexture(quad);
            }
            egret3d.Context3DProxy.gl.enable(egret3d.Context3DProxy.gl.DEPTH_TEST);
        };
        QuadStage.prototype.clearInvalidVertices = function (count) {
            var self = this;
            this._quadCurHistory.length = 0;
            var index = 0;
            while (count >= QuadStage.moreQuad) {
                this._quadCurHistory[index] = QuadStage.moreQuad;
                count -= QuadStage.moreQuad;
                index++;
            }
            if (count > 0) {
                self._quadCurHistory[index] = count;
            }
            count = self._quadMeshs.length;
            var lastCount = 0;
            var currentCount = 0;
            for (index = 0; index < count; index++) {
                lastCount = self._quadLastHistory[index] || 0;
                currentCount = self._quadCurHistory[index] || 0;
                if (currentCount < lastCount) {
                    //clear at index
                    for (var i = currentCount; i < lastCount; i++) {
                        egret3d.Quad.clear(i, self._quadMeshs[index].geometry);
                    }
                }
            }
            //交换保存的数据
            var temp = self._quadCurHistory;
            self._quadCurHistory = self._quadLastHistory;
            self._quadLastHistory = temp;
        };
        return QuadStage;
    }(egret3d.EventDispatcher));
    /*
    * @private
    */
    QuadStage.moreQuad = 400;
    egret3d.QuadStage = QuadStage;
    __reflect(QuadStage.prototype, "egret3d.QuadStage");
})(egret3d || (egret3d = {}));
