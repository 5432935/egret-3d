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
    var HoverController = (function (_super) {
        __extends(HoverController, _super);
        /**
        * @language zh_CN
        * @param targetObject 控制的目标相机，目标对象
        * @param lookAtObject 相机看向的对象
        * @param panAngle y轴旋转
        * @param tiltAngle x轴旋转
        * @param distance 相机距离
        * @param minTiltAngle 最小x轴旋转
        * @param maxTiltAngle 最大x轴旋转
        * @param minPanAngle 最小y轴旋转
        * @param maxPanAngle 最大y轴旋转
        * @param steps 平滑时分为几步
        * @param yFactor 旋转时Y轴的一个相对变化值
        * @param wrapPanAngle 是否开启 PanAngle 角度限制
        * @version Egret 3.0
        * @platform Web,Native
        */
        function HoverController(targetObject, lookAtObject, panAngle, tiltAngle, distance, minTiltAngle, maxTiltAngle, minPanAngle, maxPanAngle, steps, yFactor, wrapPanAngle) {
            if (targetObject === void 0) { targetObject = null; }
            if (lookAtObject === void 0) { lookAtObject = null; }
            if (panAngle === void 0) { panAngle = 0; }
            if (tiltAngle === void 0) { tiltAngle = 90; }
            if (distance === void 0) { distance = 100; }
            if (minTiltAngle === void 0) { minTiltAngle = -90; }
            if (maxTiltAngle === void 0) { maxTiltAngle = 90; }
            if (minPanAngle === void 0) { minPanAngle = NaN; }
            if (maxPanAngle === void 0) { maxPanAngle = NaN; }
            if (steps === void 0) { steps = 8; }
            if (yFactor === void 0) { yFactor = 2; }
            if (wrapPanAngle === void 0) { wrapPanAngle = false; }
            var _this = _super.call(this, targetObject, lookAtObject) || this;
            _this._currentPanAngle = 0;
            _this._currentTiltAngle = 90;
            _this._panAngle = 0;
            _this._tiltAngle = 90;
            _this._distance = 1000;
            _this._minPanAngle = -Infinity;
            _this._maxPanAngle = Infinity;
            _this._minTiltAngle = -90;
            _this._maxTiltAngle = 90;
            _this._maxDistance = 5000;
            _this._minDistance = -5000;
            _this._steps = 8;
            _this._yFactor = 2;
            _this._wrapPanAngle = false;
            _this._lookAtPosition = new egret3d.Vector3(0.0, 0.0, 0.0);
            _this._mouseDown = false;
            _this._mouseRightDown = false;
            _this._keyArray = new Array();
            _this.distance = distance;
            _this.panAngle = panAngle;
            _this.tiltAngle = tiltAngle;
            _this.minPanAngle = minPanAngle || -Infinity;
            _this.maxPanAngle = maxPanAngle || Infinity;
            _this.minTiltAngle = minTiltAngle;
            _this.maxTiltAngle = maxTiltAngle;
            _this.steps = steps;
            _this.yFactor = yFactor;
            _this.wrapPanAngle = wrapPanAngle;
            //values passed in contrustor are applied immediately
            _this._currentPanAngle = _this._panAngle;
            _this._currentTiltAngle = _this._tiltAngle;
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
        HoverController.prototype.mouseMove = function (m) {
            if (this._mouseDown) {
                this._tiltAngle += egret3d.Input.mouseOffsetY * 0.1;
                this._tiltAngle = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, this._tiltAngle));
                this._panAngle += egret3d.Input.mouseOffsetX * 0.1;
                this._panAngle = Math.max(this._minPanAngle, Math.min(this._maxPanAngle, this._panAngle));
            }
        };
        HoverController.prototype.mouseWheel = function (m) {
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
                    this._distance -= value;
                    this._distance = Math.max(this._minDistance, Math.min(this._maxDistance, this._distance));
                    break;
            }
        };
        HoverController.prototype.mouseUp = function (m) {
            switch (m.mouseCode) {
                case egret3d.MouseCode.Mouse_Left:
                    this._mouseDown = false;
                    break;
                case egret3d.MouseCode.Mouse_Right:
                    this._mouseRightDown = false;
                    break;
            }
        };
        HoverController.prototype.mouseDown = function (m) {
            switch (m.mouseCode) {
                case egret3d.MouseCode.Mouse_Left:
                    this._mouseDown = true;
                    break;
                case egret3d.MouseCode.Mouse_Right:
                    this._mouseRightDown = true;
                    break;
            }
        };
        HoverController.prototype.touchMove = function (t) {
            if (t.targetTouches.length == 1) {
                this.mouseMove(null);
            }
            else {
                this.mouseWheel(null);
            }
        };
        HoverController.prototype.touchUp = function (m) {
            this._mouseDown = false;
        };
        HoverController.prototype.touchDown = function (m) {
            this._mouseDown = true;
        };
        HoverController.prototype.keyDown = function (key) {
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
            }
        };
        HoverController.prototype.keyUp = function (key) {
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
            }
        };
        Object.defineProperty(HoverController.prototype, "lookAtPosition", {
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
                this._lookAtPosition = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HoverController.prototype, "steps", {
            /**
            * @private
            */
            get: function () {
                return this._steps;
            },
            /**
            * @private
            */
            set: function (val) {
                val = (val < 1) ? 1 : val;
                if (this._steps == val)
                    return;
                this._steps = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HoverController.prototype, "panAngle", {
            /**
            * @language zh_CN
            * 得到相机y轴旋转角度
            * @returns 相机y轴旋转角度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._panAngle;
            },
            /**
            * @language zh_CN
            * 设置相机y轴旋转
            * @param val 旋转角度
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (val) {
                val = Math.max(this._minPanAngle, Math.min(this._maxPanAngle, val));
                if (this._panAngle == val)
                    return;
                this._panAngle = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HoverController.prototype, "tiltAngle", {
            /**
            * @language zh_CN
            * 得到相机x轴旋转角度
            * @returns 相机x轴旋转角度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._tiltAngle;
            },
            /**
            * @language zh_CN
            * 设置相机x轴旋转
            * @param val 旋转角度
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (val) {
                val = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, val));
                if (this._tiltAngle == val)
                    return;
                this._tiltAngle = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HoverController.prototype, "distance", {
            /**
            * @language zh_CN
            * 得到目标和相机的距离
            * @returns 目标和相机的距离
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._distance;
            },
            /**
            * @language zh_CN
            * 设置目标和相机的距离
            * @param val 距离
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (val) {
                if (this._distance == val)
                    return;
                this._distance = this._distance = Math.max(this._minDistance, Math.min(this._maxDistance, val));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HoverController.prototype, "minPanAngle", {
            /**
            * @language zh_CN
            * 得到相机最小y轴旋转角度
            * @returns 相机最小x轴旋转角度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._minPanAngle;
            },
            /**
            * @language zh_CN
            * 设置相机最小y轴旋转角度
            * @param val 相机最小x轴旋转角度
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (val) {
                if (this._minPanAngle == val)
                    return;
                this._minPanAngle = val;
                this.panAngle = Math.max(this._minPanAngle, Math.min(this._maxPanAngle, this._panAngle));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HoverController.prototype, "maxPanAngle", {
            /**
            * @language zh_CN
            * 得到相机最大y轴旋转角度
            * @returns 相机最大y轴旋转角度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._maxPanAngle;
            },
            /**
            * @language zh_CN
            * 设置相机最大y轴旋转角度
            * @param val 相机最大y轴旋转角度
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (val) {
                if (this._maxPanAngle == val)
                    return;
                this._maxPanAngle = val;
                this.panAngle = Math.max(this._minPanAngle, Math.min(this._maxPanAngle, this._panAngle));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HoverController.prototype, "minTiltAngle", {
            /**
            * @language zh_CN
            * 得到相机最小x轴旋转角度
            * @returns 相机最小x轴旋转角度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._minTiltAngle;
            },
            /**
            * @language zh_CN
            * 设置相机最小x轴旋转角度
            * @param val 相机最小x轴旋转角度
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (val) {
                if (this._minTiltAngle == val)
                    return;
                this._minTiltAngle = val;
                this.tiltAngle = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, this._tiltAngle));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HoverController.prototype, "maxTiltAngle", {
            /**
            * @language zh_CN
            * 得到相机最大x轴旋转角度
            * @returns 相机最大x轴旋转角度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._maxTiltAngle;
            },
            /**
            * @language zh_CN
            * 设置相机最大x轴旋转角度
            * @param val 相机最大x轴旋转角度
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (val) {
                if (this._maxTiltAngle == val)
                    return;
                this._maxTiltAngle = val;
                this.tiltAngle = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, this._tiltAngle));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HoverController.prototype, "maxDistance", {
            /**
            * @language zh_CN
            * 得到相机和目标最大的距离
            * @returns 相机和目标最大的距离
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._maxDistance;
            },
            /**
            * @language zh_CN
            * 设置相机和目标最大的距离
            * @param val 相机和目标最大的距离
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (val) {
                if (this._maxDistance == val)
                    return;
                this._maxDistance = val;
                this._distance = Math.max(this._minDistance, Math.min(this._maxDistance, this._distance));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HoverController.prototype, "minDistance", {
            /**
            * @language zh_CN
            * 得到相机和目标最小的距离
            * @returns 相机和目标最小的距离
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._maxDistance;
            },
            /**
            * @language zh_CN
            * 设置相机和目标最小的距离
            * @param val 相机和目标最小的距离
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (val) {
                if (this._minDistance == val)
                    return;
                this._minDistance = val;
                this._distance = Math.max(this._minDistance, Math.min(this._maxDistance, this._distance));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HoverController.prototype, "yFactor", {
            /**
            * @private
            */
            get: function () {
                return this._yFactor;
            },
            /**
            * @private
            */
            set: function (val) {
                if (this._yFactor == val)
                    return;
                this._yFactor = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HoverController.prototype, "wrapPanAngle", {
            /**
            * @private
            */
            get: function () {
                return this._wrapPanAngle;
            },
            /**
            * @private
            */
            set: function (val) {
                if (this._wrapPanAngle == val)
                    return;
                this._wrapPanAngle = val;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 控制器数据更新
        * @param interpolate
        * @version Egret 3.0
        * @platform Web,Native
        */
        HoverController.prototype.update = function (interpolate) {
            if (interpolate === void 0) { interpolate = true; }
            if (this._tiltAngle != this._currentTiltAngle || this._panAngle != this._currentPanAngle) {
                if (this._wrapPanAngle) {
                    if (this._panAngle < 0)
                        this._panAngle = (this._panAngle % 360) + 360;
                    else
                        this._panAngle = this._panAngle % 360;
                    if (this._panAngle - this._currentPanAngle < -180)
                        this._currentPanAngle -= 360;
                    else if (this._panAngle - this._currentPanAngle > 180)
                        this._currentPanAngle += 360;
                }
                if (interpolate) {
                    this._currentTiltAngle += (this._tiltAngle - this._currentTiltAngle) / (this.steps + 1);
                    this._currentPanAngle += (this._panAngle - this._currentPanAngle) / (this.steps + 1);
                }
                else {
                    this._currentPanAngle = this._panAngle;
                    this._currentTiltAngle = this._tiltAngle;
                }
                //snap coords if angle differences are close
                if ((Math.abs(this._tiltAngle - this._currentTiltAngle) < 0.01) && (Math.abs(this._panAngle - this._currentPanAngle) < 0.01)) {
                    this._currentTiltAngle = this._tiltAngle;
                    this._currentPanAngle = this._panAngle;
                }
            }
            var pos = (this._lookAtObject) ? this._lookAtObject.position : (this._lookAtPosition) ? this._lookAtPosition : this._origin;
            var p = new egret3d.Vector3();
            p.x = pos.x + this.distance * Math.sin(this._currentPanAngle * egret3d.MathUtil.DEGREES_TO_RADIANS) * Math.cos(this._currentTiltAngle * egret3d.MathUtil.DEGREES_TO_RADIANS);
            p.z = pos.z + this.distance * Math.cos(this._currentPanAngle * egret3d.MathUtil.DEGREES_TO_RADIANS) * Math.cos(this._currentTiltAngle * egret3d.MathUtil.DEGREES_TO_RADIANS);
            p.y = pos.y + this.distance * Math.sin(this._currentTiltAngle * egret3d.MathUtil.DEGREES_TO_RADIANS) * this.yFactor;
            if (this._target) {
                if (this._lookAtPosition)
                    this._target.lookAt(p, this._lookAtPosition);
            }
        };
        return HoverController;
    }(egret3d.ControllerBase));
    egret3d.HoverController = HoverController;
    __reflect(HoverController.prototype, "egret3d.HoverController");
})(egret3d || (egret3d = {}));
