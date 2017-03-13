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
    * @class egret3d.LookAtController
    * @classdesc
    * 自由 摄像机控制器 。</p>
    * 指定摄像机看向的目标对象。</p>
    * 1.按下鼠标左键并移动鼠标可以使摄像机绕着目标进行旋转。</p>
    * 2.按下键盘的(w s a d) 可以摄像机(上 下 左 右)移动。</p>
    * 3.滑动鼠标滚轮可以控制摄像机的视距。</p>
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    var FreeController = (function (_super) {
        __extends(FreeController, _super);
        function FreeController(target) {
            if (target === void 0) { target = null; }
            var _this = _super.call(this, target, null) || this;
            _this.dir = new egret3d.Vector3();
            egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_MOVE, _this.mouseMove, _this);
            egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_WHEEL, _this.mouseWheel, _this);
            egret3d.Input.addEventListener(egret3d.TouchEvent3D.TOUCH_MOVE, _this.touchMove, _this);
            return _this;
        }
        FreeController.prototype.touchMove = function (t) {
            if (t.targetTouches.length == 1) {
                this.mouseMove(null);
            }
            else {
                this.mouseWheel(null);
            }
        };
        FreeController.prototype.mouseWheel = function (m) {
            if (!this._target) {
                return;
            }
            var camera = this._target;
            if (!camera) {
                return;
            }
            var value = egret3d.Input.wheelDelta * 0.1;
            var viewPort = camera.viewPort;
            switch (camera.cameraType) {
                case egret3d.CameraType.orthogonal:
                    var w = viewPort.width - value;
                    var h = viewPort.height - value;
                    camera.updateViewport(0, 0, w, h);
                    break;
                case egret3d.CameraType.orthogonalToCenter:
                    var x = viewPort.x - value;
                    var y = viewPort.y - value;
                    var w = viewPort.width - value;
                    var h = viewPort.height - value;
                    camera.updateViewport(x, y, w, h);
                    break;
                case egret3d.CameraType.perspective:
                    this.target.globalOrientation.transformVector(egret3d.Vector3.Z_AXIS, this.dir);
                    this.dir.normalize();
                    FreeController.v0.copyFrom(this.dir);
                    FreeController.v0.scaleBy(value);
                    this.target.globalPosition.add(FreeController.v0, FreeController.v0);
                    this.target.globalPosition = FreeController.v0;
                    break;
            }
        };
        FreeController.prototype.mouseMove = function (m) {
            if (egret3d.Input.getMousePress(egret3d.MouseCode.Mouse_Left)) {
                this.target.rotationY += egret3d.Input.mouseOffsetX;
                this.target.rotationX += egret3d.Input.mouseOffsetY;
            }
        };
        /**
        * @language zh_CN
        * 控制器数据更新
        * @param delay 帧间隔
        * @param time 当前时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        FreeController.prototype.update = function (delay, time) {
            if (delay === void 0) { delay = 16.6; }
            if (time === void 0) { time = 0; }
            if (!this.target) {
                return;
            }
            var speed = this.speed * delay / 1000;
            if (egret3d.Input.getKeyPress(egret3d.KeyCode.Key_W)) {
                this.target.globalOrientation.transformVector(egret3d.Vector3.Z_AXIS, this.dir);
                this.dir.normalize();
                FreeController.v0.copyFrom(this.dir);
                FreeController.v0.scaleBy(speed);
                this.target.globalPosition.add(FreeController.v0, FreeController.v0);
                this.target.globalPosition = FreeController.v0;
            }
            if (egret3d.Input.getKeyPress(egret3d.KeyCode.Key_S)) {
                this.target.globalOrientation.transformVector(egret3d.Vector3.Z_AXIS, this.dir);
                this.dir.normalize();
                FreeController.v0.copyFrom(this.dir);
                FreeController.v0.scaleBy(speed);
                this.target.globalPosition.subtract(FreeController.v0, FreeController.v0);
                this.target.globalPosition = FreeController.v0;
            }
            if (egret3d.Input.getKeyPress(egret3d.KeyCode.Key_A)) {
                this.target.globalOrientation.transformVector(egret3d.Vector3.X_AXIS, this.dir);
                this.dir.normalize();
                FreeController.v0.copyFrom(this.dir);
                FreeController.v0.scaleBy(speed);
                this.target.globalPosition.subtract(FreeController.v0, FreeController.v0);
                this.target.globalPosition = FreeController.v0;
            }
            if (egret3d.Input.getKeyPress(egret3d.KeyCode.Key_D)) {
                this.target.globalOrientation.transformVector(egret3d.Vector3.X_AXIS, this.dir);
                this.dir.normalize();
                FreeController.v0.copyFrom(this.dir);
                FreeController.v0.scaleBy(speed);
                this.target.globalPosition.add(FreeController.v0, FreeController.v0);
                this.target.globalPosition = FreeController.v0;
            }
        };
        return FreeController;
    }(egret3d.ControllerBase));
    FreeController.v0 = new egret3d.Vector3();
    egret3d.FreeController = FreeController;
    __reflect(FreeController.prototype, "egret3d.FreeController");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=FreeController.js.map