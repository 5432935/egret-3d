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
    * @class egret3d.HoverController
    * @classdesc
    * 摄像机控制器 ,实现摄像机平滑移动
    * 指定摄像机看向的目标对象
    * 1.按下鼠标左键并移动鼠标(或手机手指滑动)可以使摄像机绕着目标进行旋转.
    * 2.滑动鼠标滚轮(或双指滑动)可以控制摄像机的视距.
    *
    * 示例:
    * @includeExample controller/ctl/HoverController.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var PanController = (function (_super) {
        __extends(PanController, _super);
        /**
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        function PanController(view, targe) {
            var _this = _super.call(this, null, null) || this;
            _this._step = 5.0;
            _this._panAngle = 0;
            _this._down = false;
            _this._startVec3D = new egret3d.Vector3();
            _this._endVec3D = new egret3d.Vector3();
            _this._currentVec3D = new egret3d.Vector3();
            _this._fixinterpolate = new egret3d.Vector3();
            _this._fix = new egret3d.Vector3();
            _this._final = new egret3d.Vector3();
            _this._rotaAngle = new egret3d.Vector3();
            _this._looat = new egret3d.Vector3();
            _this._dir = new egret3d.Vector3();
            _this._up = new egret3d.Vector3();
            _this._pos = new egret3d.Vector3();
            _this._maxFov = 90;
            _this._minFov = 30;
            _this._calQua = new egret3d.Quaternion();
            _this._useCompass = false;
            _this._gyroCtrlloer = new egret3d.OrientationController();
            _this._gyroCtrlloer.start();
            _this._target = targe;
            _this._view = view;
            _this._currentVec3D.z = _this._final.z = view.camera3D.fieldOfView;
            egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_MOVE, _this.mouseMove, _this);
            egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_WHEEL, _this.mouseWheel, _this);
            egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_UP, _this.mouseUp, _this);
            egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_DOWN, _this.mouseDown, _this);
            egret3d.Input.addEventListener(egret3d.TouchEvent3D.TOUCH_END, _this.touchUp, _this);
            egret3d.Input.addEventListener(egret3d.TouchEvent3D.TOUCH_START, _this.touchDown, _this);
            egret3d.Input.addEventListener(egret3d.TouchEvent3D.TOUCH_MOVE, _this.touchMove, _this);
            _this.useCompass(true);
            return _this;
        }
        PanController.prototype.mouseDown = function (e) {
            this._down = true;
        };
        PanController.prototype.mouseUp = function (e) {
            this._down = false;
        };
        PanController.prototype.mouseMove = function (e) {
            if (this._down) {
                //angle
                this._final.x -= egret3d.Input.mouseOffsetX / (this._step * this._step);
                this._final.y -= egret3d.Input.mouseOffsetY / (this._step * this._step);
            }
            this.useCompass(false);
        };
        PanController.prototype.touchDown = function (e) {
            this._down = true;
        };
        PanController.prototype.touchUp = function (e) {
            this._down = false;
        };
        PanController.prototype.touchMove = function (e) {
            if (e.targetTouches.length == 1) {
                if (this._down) {
                    //angle
                    this._final.x -= egret3d.Input.mouseOffsetX / (this._step * this._step);
                    this._final.y -= egret3d.Input.mouseOffsetY / (this._step * this._step);
                }
            }
            else {
                this.mouseWheel(null);
            }
            this.useCompass(false);
        };
        PanController.prototype.mouseWheel = function (e) {
            this._final.z -= egret3d.Input.wheelDelta / (this._step * this._step);
        };
        PanController.prototype.useCompass = function (flag) {
            if (flag && flag != this._useCompass) {
                this._useCompass = true;
                this._target.rotationX = 270;
            }
            else if (!flag && flag != this._useCompass) {
                this._useCompass = false;
                this._target.rotationX = 0;
            }
        };
        /**
        * @language zh_CN
        * 控制器数据更新
        * @param interpolate
        * @version Egret 3.0
        * @platform Web,Native
        */
        PanController.prototype.update = function (interpolate) {
            if (interpolate === void 0) { interpolate = true; }
            if (this._useCompass) {
                this._gyroCtrlloer.update(this._view);
            }
            else {
                this._fix.x = this._final.x - this._currentVec3D.y;
                this._fix.y = this._final.y - this._currentVec3D.x;
                this._fix.z = this._final.z - this._currentVec3D.z;
                this._currentVec3D.y += this._fix.x / this._step;
                this._currentVec3D.x += this._fix.y / this._step;
                //this._target.rotationX = this._currentVec3D.x;
                //this._target.childs[0].rotationY = this._currentVec3D.y;
                this._rotaAngle.x = this._currentVec3D.x;
                this._rotaAngle.y = this._currentVec3D.y;
                this._calQua.fromEulerAngles(this._rotaAngle.x, this._rotaAngle.y, 0);
                this._calQua.transformVector(egret3d.Vector3.Z_AXIS, this._dir);
                this._calQua.fromEulerAngles(this._rotaAngle.x, this._rotaAngle.y, this._rotaAngle.z);
                this._calQua.transformVector(egret3d.Vector3.Y_AXIS, this._up);
                this._view.camera3D.lookAt(this._pos, this._dir, this._up);
                //this._view.camera3D.lookAt(new Vector3(), new Vector3(0, 0, 10), Vector3.Y_AXIS);
                var tmp = this._currentVec3D.z + this._fix.z / this._step;
                ;
                if (this._maxFov > tmp && tmp > this._minFov)
                    this._currentVec3D.z = tmp;
                else
                    this._final.z = this._currentVec3D.z;
                this._view.camera3D.fieldOfView = this._currentVec3D.z;
            }
        };
        return PanController;
    }(egret3d.ControllerBase));
    egret3d.PanController = PanController;
    __reflect(PanController.prototype, "egret3d.PanController");
})(egret3d || (egret3d = {}));
//this._fix.x = this._final.x - this._view.camera3D.globalRotationY;
//this._fix.y = this._final.y - this._view.camera3D.globalRotationX;
//this._view.camera3D.globalRotationY += this._fix.x / this._step;
//this._view.camera3D.globalRotationX += this._fix.y / this._step; 
//# sourceMappingURL=PanController.js.map