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
    * @class egret3d.LookAtController
    * @classdesc
    * look at 摄像机控制器 。</p>
    * 指定摄像机看向的目标对象。</p>
    * 1.按下鼠标左键并移动鼠标可以使摄像机绕着目标进行旋转。</p>
    * 2.按下键盘的(w s a d) 可以摄像机(上 下 左 右)移动。</p>
    * 3.滑动鼠标滚轮可以控制摄像机的视距。</p>
    *
    * @includeExample controller/ctl/LookAtController.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var LookAtController = (function (_super) {
        __extends(LookAtController, _super);
        /**
        * @language zh_CN
        * 控制的目标相机，目标对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        function LookAtController(targetObject, lookAtObject, needCtl, needAlt) {
            if (targetObject === void 0) { targetObject = null; }
            if (lookAtObject === void 0) { lookAtObject = null; }
            if (needCtl === void 0) { needCtl = false; }
            if (needAlt === void 0) { needAlt = false; }
            var _this = _super.call(this, targetObject) || this;
            _this._origin = new egret3d.Vector3(0.0, 0.0, 0.0);
            _this._lookAtPosition = new egret3d.Vector3();
            _this._eyesPos = new egret3d.Vector3();
            _this._up = egret3d.Vector3.Y_AXIS;
            _this._eyesLength = 100;
            _this._rotaEyesLine = new egret3d.Vector3(0, 0, 1);
            _this._rotaAngle = new egret3d.Vector3();
            _this._matRot = new egret3d.Matrix4();
            _this._quaRot = new egret3d.Quaternion();
            _this._tempVec = new egret3d.Vector3();
            _this._matTemp = new egret3d.Matrix4();
            _this._mouseDown = false;
            _this._mouseRightDown = false;
            _this._screenMoveStartDetail = new egret3d.Point();
            _this._screenMoveDelay = new egret3d.Point();
            _this._isUpdate = false;
            _this._elapsed = 0;
            _this._xAngle = 0;
            _this._ctl = false;
            _this._alt = false;
            _this._shift = false;
            _this._needctl = false;
            _this._needalt = false;
            _this._needshift = false;
            _this._keyArray = new Array();
            /**
            * @language zh_CN
            * 目标点偏移
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.lookAtOffset = new egret3d.Vector3(0, 0, 0);
            /**
            * @language zh_CN
            * 是否第一人称相机
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.firstCamera = false;
            _this._needctl = needCtl;
            _this._needalt = needAlt;
            if (lookAtObject)
                _this.lookAtObject = lookAtObject;
            else
                _this.lookAtPosition = new egret3d.Vector3();
            _this._eyesPos.copyFrom(targetObject.position);
            _this._lookAtPosition.copyFrom(lookAtObject.position.add(_this.lookAtOffset, egret3d.MathUtil.CALCULATION_VECTOR3D));
            _this._target.lookAt(_this._eyesPos, _this._lookAtPosition);
            egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_MOVE, _this.mouseMove, _this);
            egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_WHEEL, _this.mouseWheel, _this);
            egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_UP, _this.mouseUp, _this);
            egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_DOWN, _this.mouseDown, _this);
            egret3d.Input.addEventListener(egret3d.KeyEvent3D.KEY_UP, _this.keyUp, _this);
            egret3d.Input.addEventListener(egret3d.KeyEvent3D.KEY_DOWN, _this.keyDown, _this);
            egret3d.Input.addEventListener(egret3d.TouchEvent3D.TOUCH_END, _this.touchUp, _this);
            egret3d.Input.addEventListener(egret3d.TouchEvent3D.TOUCH_START, _this.touchDown, _this);
            egret3d.Input.addEventListener(egret3d.TouchEvent3D.TOUCH_MOVE, _this.touchMove, _this);
            return _this;
        }
        LookAtController.prototype.mouseMove = function (m) {
            if (this._mouseDown && (this._needctl ? this._ctl : true)) {
                this._rotaAngle.y += egret3d.Input.mouseOffsetX;
                this._rotaAngle.x += egret3d.Input.mouseOffsetY;
                this._rotaAngle.y %= 360;
                this._rotaAngle.x %= 360;
            }
        };
        LookAtController.prototype.mouseWheel = function (m) {
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
                    this.distance = this._eyesLength - value;
                    break;
            }
        };
        LookAtController.prototype.mouseUp = function (m) {
            switch (m.mouseCode) {
                case egret3d.MouseCode.Mouse_Left:
                    this._mouseDown = false;
                    break;
                case egret3d.MouseCode.Mouse_Right:
                    this._mouseRightDown = false;
                    break;
            }
        };
        LookAtController.prototype.mouseDown = function (m) {
            switch (m.mouseCode) {
                case egret3d.MouseCode.Mouse_Left:
                    this._mouseDown = true;
                    break;
                case egret3d.MouseCode.Mouse_Right:
                    this._mouseRightDown = true;
                    break;
            }
        };
        LookAtController.prototype.touchMove = function (t) {
            if (t.targetTouches.length == 1) {
                this.mouseMove(null);
            }
            else {
                this.mouseWheel(null);
            }
        };
        LookAtController.prototype.touchUp = function (m) {
            this._mouseDown = false;
        };
        LookAtController.prototype.touchDown = function (m) {
            this._mouseDown = true;
        };
        LookAtController.prototype.keyDown = function (key) {
            switch (key.keyCode) {
                case egret3d.KeyCode.Key_W:
                    this._keyArray[0] = true;
                    break;
                case egret3d.KeyCode.Key_A:
                    this._keyArray[1] = true;
                    break;
                case egret3d.KeyCode.Key_S:
                    this._keyArray[2] = true;
                    break;
                case egret3d.KeyCode.Key_D:
                    this._keyArray[3] = true;
                    break;
                case egret3d.KeyCode.Key_Q:
                    this._keyArray[4] = true;
                    break;
                case egret3d.KeyCode.Key_E:
                    this._keyArray[5] = true;
                    break;
                case egret3d.KeyCode.Key_Control_L:
                    this._ctl = true;
                    break;
                case egret3d.KeyCode.Key_Alt_L:
                    this._alt = true;
                    break;
            }
        };
        LookAtController.prototype.keyUp = function (key) {
            switch (key.keyCode) {
                case egret3d.KeyCode.Key_W:
                    this._keyArray[0] = false;
                    break;
                case egret3d.KeyCode.Key_A:
                    this._keyArray[1] = false;
                    break;
                case egret3d.KeyCode.Key_S:
                    this._keyArray[2] = false;
                    break;
                case egret3d.KeyCode.Key_D:
                    this._keyArray[3] = false;
                    break;
                case egret3d.KeyCode.Key_Q:
                    this._keyArray[4] = false;
                    break;
                case egret3d.KeyCode.Key_E:
                    this._keyArray[5] = false;
                    break;
                case egret3d.KeyCode.Key_Control_L:
                    this._ctl = false;
                    break;
                case egret3d.KeyCode.Key_Alt_L:
                    this._alt = false;
                    break;
            }
        };
        Object.defineProperty(LookAtController.prototype, "lookAtPosition", {
            /**
            * @language zh_CN
            * 返回目标的位置
            *
            * @returns 目标的位置
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._lookAtPosition;
            },
            /**
            * @language zh_CN
            * 设置目标坐标
            *
            * @param val 摄像机看向的目标点
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (val) {
                if (this._lookAtObject)
                    this._lookAtObject = null;
                this._lookAtPosition.copyFrom(val.add(this.lookAtOffset, egret3d.MathUtil.CALCULATION_VECTOR3D));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LookAtController.prototype, "distance", {
            /**
            * @language zh_CN
            * 得到目标和相机的距离
            * @returns number 距离
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._eyesLength;
            },
            /**
            * @language zh_CN
            * 设置目标和相机的距离
            * @param length 距离
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (length) {
                this._eyesLength = length;
                if (this._eyesLength < 1) {
                    this._eyesLength = 1;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LookAtController.prototype, "rotationX", {
            /**
            * @language zh_CN
            * 得到相机x轴旋转
            * @returns x 旋转角度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._rotaAngle.x;
            },
            /**
            * @language zh_CN
            * 设置相机x轴旋转
            * @param x 旋转角度
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (x) {
                this._rotaAngle.x = x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LookAtController.prototype, "rotationY", {
            /**
            * @language zh_CN
            * 得到相机x轴旋转
            * @returns y 旋转角度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._rotaAngle.y;
            },
            /**
            * @language zh_CN
            * 设置相机y轴旋转
            * @param y 旋转角度
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (y) {
                this._rotaAngle.y = y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LookAtController.prototype, "rotationZ", {
            /**
            * @language zh_CN
            * 得到相机x轴旋转
            * @returns z 旋转角度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._rotaAngle.z;
            },
            /**
            * @language zh_CN
            * 设置相机z轴旋转
            * @param z 旋转角度
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (z) {
                this._rotaAngle.z = z;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 控制器数据更新
        * @param delay 帧间隔
        * @param time 当前时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        LookAtController.prototype.update = function (delay, time) {
            if (delay === void 0) { delay = 16.6; }
            if (time === void 0) { time = 0; }
            if (this._target) {
                if (this._target.isController == false) {
                    return;
                }
                var speed = this._speed * (delay / 1000);
                this._quaRot.fromEulerAngles(this._rotaAngle.x, this._rotaAngle.y, 0);
                this._rotaEyesLine.copyFrom(this._quaRot.transformVector(egret3d.Vector3.Z_AXIS, egret3d.MathUtil.CALCULATION_VECTOR3D));
                this._rotaEyesLine.normalize();
                if (this._keyArray[0]) {
                    this._tempVec.copyFrom(this._rotaEyesLine);
                    this._tempVec.y = 0;
                    this._tempVec.normalize();
                    this._tempVec.scaleBy(speed);
                    this._tempVec.copyFrom(this._lookAtObject.position.add(this._tempVec, egret3d.MathUtil.CALCULATION_VECTOR3D));
                    this._lookAtObject.position = this._tempVec;
                }
                if (this._keyArray[1]) {
                    this._tempVec.copyFrom(this._rotaEyesLine);
                    this._matTemp.identity();
                    this._matTemp.createByRotation(90, egret3d.Vector3.Y_AXIS);
                    this._tempVec.copyFrom(this._matTemp.transformVector(this._tempVec, egret3d.MathUtil.CALCULATION_VECTOR3D));
                    this._tempVec.y = 0;
                    this._tempVec.normalize();
                    this._tempVec.scaleBy(speed);
                    this._tempVec.copyFrom(this._lookAtObject.position.subtract(this._tempVec, egret3d.MathUtil.CALCULATION_VECTOR3D));
                    this._lookAtObject.position = this._tempVec;
                }
                if (this._keyArray[2]) {
                    this._tempVec.copyFrom(this._rotaEyesLine);
                    this._tempVec.y = 0;
                    this._tempVec.normalize();
                    this._tempVec.scaleBy(speed);
                    this._tempVec.copyFrom(this._lookAtObject.position.subtract(this._tempVec, egret3d.MathUtil.CALCULATION_VECTOR3D));
                    this._lookAtObject.position = this._tempVec;
                }
                if (this._keyArray[3]) {
                    this._tempVec.copyFrom(this._rotaEyesLine);
                    this._matTemp.identity();
                    this._matTemp.createByRotation(90, egret3d.Vector3.Y_AXIS);
                    this._tempVec.copyFrom(this._matTemp.transformVector(this._tempVec, egret3d.MathUtil.CALCULATION_VECTOR3D));
                    this._tempVec.y = 0;
                    this._tempVec.normalize();
                    this._tempVec.scaleBy(speed);
                    this._tempVec.copyFrom(this._lookAtObject.position.add(this._tempVec, egret3d.MathUtil.CALCULATION_VECTOR3D));
                    this._lookAtObject.position = this._tempVec;
                }
                if (this._keyArray[4]) {
                    this._quaRot.fromEulerAngles(this._rotaAngle.x, this._rotaAngle.y, 0);
                    this._tempVec.copyFrom(this._quaRot.transformVector(egret3d.Vector3.Y_AXIS, egret3d.MathUtil.CALCULATION_VECTOR3D));
                    this._tempVec.normalize();
                    this._tempVec.scaleBy(speed);
                    this._tempVec.copyFrom(this._lookAtObject.position.add(this._tempVec, egret3d.MathUtil.CALCULATION_VECTOR3D));
                    this._lookAtObject.position = this._tempVec;
                }
                if (this._keyArray[5]) {
                    this._quaRot.fromEulerAngles(this._rotaAngle.x, this._rotaAngle.y, 0);
                    this._tempVec.copyFrom(this._quaRot.transformVector(egret3d.Vector3.Y_AXIS, egret3d.MathUtil.CALCULATION_VECTOR3D));
                    this._tempVec.normalize();
                    this._tempVec.scaleBy(speed);
                    this._tempVec.copyFrom(this._lookAtObject.position.subtract(this._tempVec, egret3d.MathUtil.CALCULATION_VECTOR3D));
                    this._lookAtObject.position = this._tempVec;
                }
                this._lookAtPosition.copyFrom(this._lookAtObject.position);
                this._tempVec.copyFrom(this._rotaEyesLine);
                this._tempVec.scaleBy(this._eyesLength);
                this._eyesPos.copyFrom(this._lookAtPosition.subtract(this._tempVec, egret3d.MathUtil.CALCULATION_VECTOR3D));
                if (this._lookAtObject) {
                    this._lookAtPosition.copyFrom(this._lookAtObject.position.add(this.lookAtOffset, egret3d.MathUtil.CALCULATION_VECTOR3D));
                }
                this._quaRot.fromEulerAngles(this._rotaAngle.x, this._rotaAngle.y, this._rotaAngle.z);
                this._tempVec.copyFrom(this._up);
                this._tempVec.copyFrom(this._quaRot.transformVector(this._tempVec, egret3d.MathUtil.CALCULATION_VECTOR3D));
                this._tempVec.normalize();
                if (this.firstCamera) {
                    this._lookAtObject.rotationY = this._rotaAngle.y;
                    this._lookAtObject.rotationX = this._rotaAngle.x;
                }
                this._target.lookAt(this._eyesPos, this._lookAtPosition, this._tempVec);
            }
        };
        return LookAtController;
    }(egret3d.ControllerBase));
    egret3d.LookAtController = LookAtController;
    __reflect(LookAtController.prototype, "egret3d.LookAtController");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=LookAtController.js.map