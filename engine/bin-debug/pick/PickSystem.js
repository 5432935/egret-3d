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
    * @language zh_CN
    * @version Egret 3.0
    * @platform Web,Native
    */
    var PickSystem = (function () {
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        function PickSystem() {
            this.enablePick = false;
            //this.pickRender = new MultiRender(PassType.PickPass);
            //this.pickRender.setRenderToTexture(512, 512, FrameBufferFormat.UNSIGNED_BYTE_RGBA);
            //this.pickRender.drawOver = (entityCollect: EntityCollect, camera: Camera3D, time: number, delay: number, viewPort: Rectangle) => this.drawOver(entityCollect, camera, time, delay, viewPort);
            //this.piexs = new Uint8Array(this.pickRender.renderTexture.width * this.pickRender.renderTexture.height * 4);
        }
        Object.defineProperty(PickSystem, "instance", {
            /**
            * @language zh_CN
            * 单例
            * @returns PickSystem 实例返回
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                if (!PickSystem._instance) {
                    PickSystem._instance = new PickSystem();
                }
                return PickSystem._instance;
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
        PickSystem.prototype.update = function (entityCollect, camera, time, delay, viewPort) {
            egret3d.Stage3D.context3DProxy.clearColor(1.0, 1.0, 1.0, 1.0);
            egret3d.Stage3D.context3DProxy.clear(egret3d.Context3DProxy.gl.COLOR_BUFFER_BIT | egret3d.Context3DProxy.gl.DEPTH_BUFFER_BIT);
            //this.pickRender.draw(time, delay, Stage3D.context3DProxy, entityCollect, camera, viewPort);
        };
        PickSystem.prototype.drawOver = function (entityCollect, camera, time, delay, viewPort) {
            egret3d.Context3DProxy.gl.readPixels(0, 0, this.pickRender.renderTexture.width, this.pickRender.renderTexture.height, egret3d.Context3DProxy.gl.RGBA, egret3d.Context3DProxy.gl.UNSIGNED_BYTE, this.piexs);
            var i = 0;
        };
        PickSystem.prototype.getObjectId = function (x, y, cavans, view) {
            var vx = x - view.x;
            var vy = y - view.y;
            vy = view.height - vy;
            var xx = Math.floor(vx / view.width * this.pickRender.renderTexture.width);
            var yy = Math.floor(vy / view.height * this.pickRender.renderTexture.height);
            var index = yy * this.pickRender.renderTexture.width + xx;
            return (this.piexs[index * 4 + 0] << 16) | (this.piexs[index * 4 + 1] << 8) | this.piexs[index * 4 + 2];
        };
        return PickSystem;
    }());
    egret3d.PickSystem = PickSystem;
    __reflect(PickSystem.prototype, "egret3d.PickSystem");
    /**
    * @private
    * @language zh_CN
    * @version Egret 3.0
    * @platform Web,Native
    */
    var EyePick = (function (_super) {
        __extends(EyePick, _super);
        function EyePick() {
            var _this = _super.call(this) || this;
            _this.useDelay = 1000;
            _this._select = false;
            _this._selectSure = false;
            _this._count = 0;
            _this._pickProgressEvent = new egret3d.PickEvent3D("pick_Progress");
            _this._pickSureEvent = new egret3d.PickEvent3D("pick_Sure");
            _this._pickCancleEvent = new egret3d.PickEvent3D("pick_cancle");
            _this._sceneRay = new egret3d.Ray();
            return _this;
        }
        EyePick.prototype.update = function (view, time, delay) {
            this._sceneRay.CalculateAndTransformRay(view.width, view.height, view.camera3D.modelMatrix, view.camera3D.projectMatrix, view.width * 0.5, view.height * 0.5);
            var pickList = view.entityCollect.specialCastItem[egret3d.SpecialCast.Pick];
            var bound;
            var minDis = egret3d.MathUtil.MAX_VALUE;
            if (this._selection)
                minDis = egret3d.Vector3.distance(view.camera3D.position, this._selection.position);
            ;
            var dis = 0;
            this._select = false;
            for (var i = 0; i < pickList.length; i++) {
                bound = pickList[i].bound;
                //bound.visible = false;
                if (this._sceneRay.IntersectMesh(bound.vexData, bound.indexData, bound.vexLength, bound.indexData.length / 3, 0, pickList[i].modelMatrix, pickList[i].pickResult)) {
                    //bound.visible = true;
                    this._select = true;
                    dis = egret3d.Vector3.distance(view.camera3D.position, pickList[i].position);
                    if (dis < minDis) {
                        this._count = 0;
                        minDis = dis;
                        if (this._selection) {
                            this._pickCancleEvent.pickTarget = this._selection;
                            this.dispatchEvent(this._pickCancleEvent);
                        }
                        this._selection = pickList[i];
                    }
                }
            }
            if (this._select && this._selection) {
                this._count++;
                this._pickProgressEvent.pickTarget = this._selection;
                this._pickProgressEvent.delay = this._count;
                this.dispatchEvent(this._pickProgressEvent);
                if (this._count > this.useDelay && !this._selectSure) {
                    this._selectSure = true;
                    this._pickSureEvent.pickTarget = this._selection;
                    this.dispatchEvent(this._pickSureEvent);
                }
            }
            else if (this._selection) {
                this._pickCancleEvent.pickTarget = this._selection;
                this.dispatchEvent(this._pickCancleEvent);
                this._selectSure = false;
                this._selection = null;
                this._select = false;
                this._count = 0;
            }
        };
        return EyePick;
    }(egret3d.EventDispatcher));
    EyePick.PICK_PROGRESS = "pick_Progress";
    EyePick.PICK_SURE = "pick_Sure";
    EyePick.PICK_CANCLE = "pick_cancle";
    egret3d.EyePick = EyePick;
    __reflect(EyePick.prototype, "egret3d.EyePick");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=PickSystem.js.map