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
    * @language zh_CN
    * @class egret3d.Input
    * @classdesc
    * 触摸事件信息参数。
    * 作为触摸事件基本参数保存于TouchEvent3D，
    * @see egret3d.TouchEvent3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    var TouchData = (function () {
        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        function TouchData(touch) {
            this.canvasX = Input.getX(touch.clientX); // - Input.canvas.x + Input.canvas.offsetX;
            this.canvasY = Input.getY(touch.clientY); // - Input.canvas.y + Input.canvas.offsetY;
            this.identifier = touch.identifier;
            this.clientX = touch.clientX;
            this.clientY = touch.clientY;
            this.pageX = touch.pageX;
            this.pageY = touch.pageY;
            this.screenX = touch.screenX;
            this.screenY = touch.screenY;
        }
        return TouchData;
    }());
    egret3d.TouchData = TouchData;
    __reflect(TouchData.prototype, "egret3d.TouchData");
    /**
     * @language zh_CN
     * @class egret3d.Input
     * @classdesc
     * 处理输入设备,鼠标.键盘.触摸。
     * 当点事件产生时如果没有点击到任何的View3D内，
     * 当前事件将不用派发.
     * @includeExample input/Input.ts
     * @see egret3d.EventDispatcher
     *
     * @version Egret 3.0
     * @platform Web,Native
     */
    var Input = (function (_super) {
        __extends(Input, _super);
        /**
        * @language zh_CN
        * 创建一个新的 Input 对象。
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Input() {
            var _this = _super.call(this) || this;
            _this._time = 0;
            _this._keyStatus = {};
            _this._mouseStatus = {};
            _this._isTouchStart = false;
            _this._mouseEvent3d = new egret3d.MouseEvent3D();
            _this._keyEvent3d = new egret3d.KeyEvent3D();
            _this._touchEvent3d = new egret3d.TouchEvent3D();
            _this._windowsEvent3d = new egret3d.Event3D();
            _this._orientationEvent3d = new egret3d.OrientationEvent3D();
            /**
            * @language zh_CN
            * 游戏手柄Stick1事件侦听函数。
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.onGamepadStick1 = null;
            /**
            * @language zh_CN
            * 游戏手柄Stick2事件侦听函数。
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.onGamepadStick2 = null;
            _this.disableWindowTouch = false;
            _this._gp = false;
            _this._oldPosition1 = null;
            _this._oldPosition2 = null;
            window.addEventListener("click", function (e) { !_this.disableWindowTouch && _this.mouseClick(e); }, true);
            window.addEventListener("mousedown", function (e) { !_this.disableWindowTouch && _this.mouseStart(e); }, true);
            window.addEventListener("mouseup", function (e) { !_this.disableWindowTouch && _this.mouseEnd(e); }, true);
            window.addEventListener("mousewheel", function (e) { !_this.disableWindowTouch && _this.mouseWheel(e); }, true);
            window.addEventListener("mousemove", function (e) { !_this.disableWindowTouch && _this.mouseMove(e); }, true);
            window.addEventListener("mouseover", function (e) { !_this.disableWindowTouch && _this.mouseOver(e); }, true);
            window.addEventListener("keydown", function (e) { return _this.keyDown(e); }, true);
            window.addEventListener("keyup", function (e) { return _this.keyUp(e); }, true);
            if (_this.canGame()) {
                window.addEventListener("gamepadconnected", function (e) { return _this.ongamepadconnected(e); }, true);
                window.addEventListener("gamepaddisconnected", function (e) { return _this.ongamepaddisconnected(e); }, true);
            }
            window.addEventListener("touchstart", function (e) { !_this.disableWindowTouch && _this.touchStart(e); }, true);
            window.addEventListener("touchend", function (e) { !_this.disableWindowTouch && _this.touchEnd(e); }, true);
            window.addEventListener("touchmove", function (e) { !_this.disableWindowTouch && _this.touchMove(e); }, true);
            window.addEventListener("touchcancel", function (e) { !_this.disableWindowTouch && _this.touchEnd(e); }, true);
            //window.addEventListener("deviceorientation", (e: DeviceOrientationEvent) => this.ondeviceorientation(e), true);
            //window.addEventListener("deviceorientation", (e: DeviceOrientationEvent) => this.ondeviceorientation(e), true);
            //window.addEventListener("devicemotion", (e: DeviceMotionEvent) => this.detectShake(e), true);
            //window.addEventListener("devicemotion", (e: DeviceMotionEvent) => this.detectShake(e), true);
            //window.addEventListener("resize", (e: UIEvent) => this.onWindowsResize(e));
            window.addEventListener("resize", function (e) { return _this.onWindowsResize(e); }, true);
            return _this;
            //window.addEventListener("orientationchange", (e: Event) => this.onOrientationChange(e), true);
            //window.addEventListener("devicemotion", (e: DeviceMotionEvent) => this.onDeviceMotion(e), true);
            //window.addEventListener("deviceorientation", (e: DeviceOrientationEvent) => this.onDeviceOrientation(e), true);
        }
        Input.getX = function (value) {
            return (value - Input.canvas.x + Input.canvas.offsetX) / Input.scaleX;
        };
        Input.getY = function (value) {
            return (value - Input.canvas.y + Input.canvas.offsetY) / Input.scaleY;
        };
        Object.defineProperty(Input, "instance", {
            /**
            * @language zh_CN
            * 获取Input类对象的单例。
            * @returns Input
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                if (this._instance == null) {
                    this._instance = new Input();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        Input.prototype.init = function (canvas) {
            var _this = this;
            this.disableWindowTouch = true;
            // window.removeEventListener("click", (e: MouseEvent) => this.mouseClick(e), true);
            // window.removeEventListener("mousedown", (e: MouseEvent) => this.mouseStart(e), true);
            // window.removeEventListener("mouseup", (e: MouseEvent) => this.mouseEnd(e), true);
            // window.removeEventListener("mousewheel", (e: MouseWheelEvent) => this.mouseWheel(e), true);
            // window.removeEventListener("mousemove", (e: MouseEvent) => this.mouseMove(e), true);
            // window.removeEventListener("mouseover", (e: MouseEvent) => this.mouseOver(e), true);
            // window.removeEventListener("keydown", (e: KeyboardEvent) => this.keyDown(e), true);
            // window.removeEventListener("keyup", (e: KeyboardEvent) => this.keyUp(e), true);
            // window.removeEventListener("touchstart", (e: TouchEvent) => this.touchStart(e), true);
            // window.removeEventListener("touchend", (e: TouchEvent) => this.touchEnd(e), true);
            // window.removeEventListener("touchmove", (e: TouchEvent) => this.touchMove(e), true);
            // window.removeEventListener("touchcancel", (e: TouchEvent) => this.touchEnd(e), true);
            canvas.addEventListener("click", function (e) { return _this.mouseClick(e); }, false);
            canvas.addEventListener("mousedown", function (e) { return _this.mouseStart(e); }, false);
            canvas.addEventListener("mouseup", function (e) { return _this.mouseEnd(e); }, false);
            canvas.addEventListener("mousewheel", function (e) { return _this.mouseWheel(e); }, false);
            canvas.addEventListener("mousemove", function (e) { return _this.mouseMove(e); }, false);
            canvas.addEventListener("mouseover", function (e) { return _this.mouseOver(e); }, false);
            // canvas.addEventListener("keydown", (e: KeyboardEvent) => this.keyDown(e), false);
            // canvas.addEventListener("keyup", (e: KeyboardEvent) => this.keyUp(e), false);
            canvas.addEventListener("touchstart", function (e) { return _this.touchStart(e); }, false);
            canvas.addEventListener("touchend", function (e) { return _this.touchEnd(e); }, false);
            canvas.addEventListener("touchmove", function (e) { return _this.touchMove(e); }, false);
            canvas.addEventListener("touchcancel", function (e) { return _this.touchEnd(e); }, false);
        };
        /**
        * @language zh_CN
        * 对象注册事件侦听器对象，以使侦听器能够接收事件通知。可以为特定类型的事件和优先级注册事件侦听器。
        * 成功注册一个事件侦听器后，不使用后 需要removeEventListenerAt().
        * @param type {string} 事件的类型。
        * @param callback {Function} 处理事件的侦听器函数。此函数必须接受 Event3D 对象作为其唯一的参数，并且不能返回任何结果，
        * 如下面的示例所示： function(evt:Event3D):void 函数可以有任何名称。
        * @param param 事件携带参数
        * @param  priority {number} 事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在
        * 优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
        * @returns 事件ID 返回值 removeEventListenerAt 时会用到
         * @version Egret 3.0
         * @platform Web,Native
        */
        Input.addEventListener = function (type, callback, thisObject, param, priolity) {
            if (param === void 0) { param = null; }
            if (priolity === void 0) { priolity = 0; }
            return Input.instance.addEventListener(type, callback, thisObject, param, priolity);
        };
        Input.prototype.addEventListener = function (type, callback, thisObject, param, priority) {
            var _this = this;
            if (param === void 0) { param = null; }
            if (priority === void 0) { priority = 0; }
            if (type == egret3d.OrientationEvent3D.ORIENTATION_CHANGE && !this.containEventListener(egret3d.OrientationEvent3D.ORIENTATION_CHANGE)) {
                window.addEventListener("orientationchange", function (e) { return _this.onOrientationChange(e); }, true);
            }
            else if (type == egret3d.OrientationEvent3D.DEVICE_MOTION && !this.containEventListener(egret3d.OrientationEvent3D.DEVICE_MOTION)) {
                window.addEventListener("devicemotion", function (e) { return _this.onDeviceMotion(e); }, true);
            }
            else if (type == egret3d.OrientationEvent3D.DEVICE_ORIENTATION && !this.containEventListener(egret3d.OrientationEvent3D.DEVICE_ORIENTATION)) {
                window.addEventListener("deviceorientation", function (e) { return _this.onDeviceOrientation(e); }, true);
            }
            var id = _super.prototype.addEventListener.call(this, type, callback, thisObject, param, priority);
            return id;
        };
        /**
         * @language zh_CN
         * 根据addEventListener传入的事件数据信息,移除事件侦听器。
         * @param type {string} 事件名。
         * @param callback {Function} 侦听函数。
         * @version Egret 3.0
         * @platform Web,Native
         */
        Input.removeEventListener = function (type, callback, thisObject) {
            Input.instance.removeEventListener(type, callback, thisObject);
        };
        /**
         * @language zh_CN
         * 根据addEventListener 的返回值,移除事件侦听器。
         * @param id  事件id, addEventListener 的返回值.
         * @version Egret 3.0
         * @platform Web,Native
         */
        Input.removeEventListenerAt = function (id) {
            Input.instance.removeEventListenerAt(id);
        };
        /**
        * @private
        * @language zh_CN
        * 获取按键是否压下
        * @param code
        * @version Egret 3.0
        * @platform Web,Native
        */
        Input.getKeyPress = function (code) {
            return Input.instance._keyStatus[code];
        };
        /**
        * @private
        * @language zh_CN
        * 获取鼠标是否压下
        * @param code
        * @version Egret 3.0
        * @platform Web,Native
        */
        Input.getMousePress = function (code) {
            return Input.instance._mouseStatus[code];
        };
        Input.prototype.ongamepaddisconnected = function (e) {
            //Debug.instance.trace("Gamepad disconnected!");
            this._gp = false;
        };
        Input.prototype.ongamepadconnected = function (e) {
            //Debug.instance.trace("Gamepad connected!");
            this._gp = true;
        };
        /**
        * @language zh_CN
        * 游戏手柄按钮是否按下。
        * @version Egret 3.0
        * @platform Web,Native
        * @param index {number}
        * @returns {boolean}
        */
        Input.prototype.getGamepadButtonState = function (index) {
            return navigator.getGamepads()[0].buttons[index].pressed;
        };
        /**
        * @language zh_CN
        * 游戏手柄摇杆方向 Stick1 。
        * @version Egret 3.0
        * @platform Web,Native
        * @returns {Vector3}
        */
        Input.prototype.getGamepadStick1 = function () {
            return new egret3d.Vector3(navigator.getGamepads()[0].axes[0], navigator.getGamepads()[0].axes[1], 0);
        };
        /**
        * @language zh_CN
        * 游戏手柄摇杆方向 Stick2 。
        * @version Egret 3.0
        * @platform Web,Native
        * @returns {Vector3}
        */
        Input.prototype.getGamepadStick2 = function () {
            return new egret3d.Vector3(navigator.getGamepads()[0].axes[2], navigator.getGamepads()[0].axes[3], 0);
        };
        Input.prototype.canGame = function () {
            return "getGamepads" in navigator;
        };
        /**
        * @private
        * @language zh_CN
        * 更新游戏手柄信息。
        * @version Egret 3.0
        * @platform Web,Native
        */
        Input.reportOnGamepad = function () {
            if (Input.instance.canGame() && Input.instance._gp) {
                if (Input.instance.onGamepadStick1 != null) {
                    Input.instance.onGamepadStick1(Input.instance.getGamepadStick1());
                }
                if (Input.instance.onGamepadStick2 != null) {
                    Input.instance.onGamepadStick2(Input.instance.getGamepadStick2());
                }
            }
        };
        Input.prototype.printout = function () {
            var html = "";
            html += "id: " + navigator.getGamepads()[0].id + "<br/>";
            var len = navigator.getGamepads()[0].buttons.length;
            for (var i = 0; i < len; i++) {
                html += "Button " + (i + 1) + ": ";
                if (this.getGamepadButtonState(i))
                    html += " pressed";
                html += "<br/>";
            }
            var v = this.getGamepadStick1();
            html += "Stick 1" + ": " + v.x + "," + v.y + "<br/>";
            v = this.getGamepadStick2();
            html += "Stick 2" + ": " + v.x + "," + v.y + "<br/>";
            //Debug.instance.trace(html);
        };
        //private detectShake(evt: DeviceMotionEvent) {
        //    var accl = evt.acceleration; //acceleration 排除重力影响的加速度  accelerationIncludingGravity(含重力的加速度)
        //    //x、y 和 z 轴方向加速
        //    if (accl.x > 1.5 || accl.y > 1.5 || accl.z > 1.5) {
        //    } else {
        //    }
        //    //if (this._ondevicemotion && this._ondevicemotion.length > 0) {
        //    //    var x: number = Math.ceil(accl.x * 1000) / 1000;
        //    //    var y: number = Math.ceil(accl.y * 1000) / 1000;
        //    //    var z: number = Math.ceil(accl.z * 1000) / 1000;
        //    //    this._ondevicemotion[0](x, y, z);
        //    //}
        //}
        //private _caheX: number;
        //private _caheY: number;
        //private _caheZ: number;
        //private _delayX: number;
        //private _delayY: number;
        //private _delayZ: number;
        //private _first: boolean = true;
        //private _initAngle: Vector3 = new Vector3();
        //private ondeviceorientation(e: DeviceOrientationEvent) {
        //    //alpha rotation around the z-axis  between 0 and 360 degrees 
        //    //在围绕 z 轴旋转时（即左右旋转时），y 轴的度数差 0 到 360度 。
        //    //beta Rotation around the x-axis cause the beta angle to change. The range of beta is between -180 and 180 degrees 
        //    //在围绕 x 轴旋转时（即前后旋转时），z 轴的度数差 -180到180度。  
        //    //gamma The gamma angle is associated with the y-axis between -90 and 90 degrees 
        //    //在围绕 y 轴旋转时（即扭转设备时），z 轴的度数差 -90到90度。  
        //    //if (this._ondeviceorientation && this._ondeviceorientation.length > 0) {
        //    //    var alpha: number = Math.round(e.alpha * 100) * 0.01;
        //    //    var beta: number = Math.round(e.beta * 100) * 0.01;
        //    //    var gamma: number = Math.round(e.gamma * 100) * 0.01;
        //    //    if (this._first) {
        //    //        this._initAngle["x"] = alpha;
        //    //        this._initAngle["y"] = beta;
        //    //        this._initAngle["z"] = gamma;
        //    //    }
        //    //    this._delayX = alpha - this._caheX;
        //    //    this._delayY = beta - this._caheY;
        //    //    this._delayZ = gamma - this._caheZ;
        //    //    this._caheX = alpha;
        //    //    this._caheY = beta;
        //    //    this._caheZ = gamma;
        //    //    this._initAngle.x += this._delayX;
        //    //    this._initAngle.y += this._delayY;
        //    //    this._initAngle.z += this._delayZ;
        //    //    for (var i: number = 0; i < this._ondeviceorientation.length; i++) {
        //    //        this._ondeviceorientation[i].callback.call(this._ondeviceorientation[i].thisObject, this._initAngle);
        //    //    }
        //    //}
        //}
        Input.prototype.onPinch = function (x, y, x1, y1) {
            this._oldPosition1 = new egret3d.Point(x, y);
            this._oldPosition2 = new egret3d.Point(x1, y1);
        };
        Input.prototype.onSwipe = function (x, y) {
            Input.mouseX = x;
            Input.mouseY = y;
            this._oldPosition1 = null;
            this._oldPosition2 = null;
            this._time = new Date().getTime();
        };
        Input.prototype.touchStart = function (e) {
            if (!this.deliverMessage()) {
                return;
            }
            //e.preventDefault();
            var x1 = Input.getX(e.targetTouches[0].clientX); // - Input.canvas.x + Input.canvas.offsetX;
            var y1 = Input.getY(e.targetTouches[0].clientY); // - Input.canvas.y + Input.canvas.offsetY;
            if (e.targetTouches.length == 2) {
                var x2 = Input.getX(e.targetTouches[1].clientX); // - Input.canvas.x + Input.canvas.offsetX;
                var y2 = Input.getY(e.targetTouches[1].clientY); // - Input.canvas.y + Input.canvas.offsetY;
                this.onPinch(x1, y1, x2, y2);
            }
            else if (e.targetTouches.length == 1) {
                this.onSwipe(x1, y1);
                this._mouseStatus[egret3d.MouseCode.Mouse_Left] = true;
            }
            this._touchEvent3d.reset();
            this._touchEvent3d.targetTouches = this.GetTargetTouches(e.targetTouches);
            this._touchEvent3d.target = this;
            if (!this._isTouchStart) {
                this._isTouchStart = true;
                this._touchEvent3d.eventType = egret3d.TouchEvent3D.TOUCH_START;
                this.dispatchEvent(this._touchEvent3d);
            }
        };
        Input.prototype.touchEnd = function (e) {
            if (e.targetTouches.length > 1) {
                var x = Input.getX(e.targetTouches[0].clientX); // - Input.canvas.x + Input.canvas.offsetX;
                var y = Input.getY(e.targetTouches[0].clientY); // - Input.canvas.y + Input.canvas.offsetY;
                var x1 = Input.getX(e.targetTouches[1].clientX); // - Input.canvas.x + Input.canvas.offsetX;
                var y1 = Input.getY(e.targetTouches[1].clientY); // - Input.canvas.y + Input.canvas.offsetY;
                this.onPinch(x, y, x1, y1);
            }
            else if (e.targetTouches.length == 1) {
                this.onSwipe(Input.getX(e.targetTouches[0].clientX), Input.getY(e.targetTouches[0].clientY));
                this._mouseStatus[egret3d.MouseCode.Mouse_Left] = false;
            }
            else {
                this._oldPosition1 = null;
                this._oldPosition2 = null;
                this._time = 0;
            }
            this._touchEvent3d.reset();
            this._isTouchStart = false;
            this._touchEvent3d.targetTouches = this.GetTargetTouches(e.targetTouches);
            this._touchEvent3d.target = this;
            this._touchEvent3d.eventType = egret3d.TouchEvent3D.TOUCH_END;
            this.dispatchEvent(this._touchEvent3d);
        };
        Input.prototype.touchMove = function (e) {
            Input.mouseLastX = Input.mouseX;
            Input.mouseLastY = Input.mouseY;
            Input.mouseX = Input.getX(e.targetTouches[0].clientX); // - Input.canvas.x + Input.canvas.offsetX;
            Input.mouseY = Input.getY(e.targetTouches[0].clientY); // - Input.canvas.y + Input.canvas.offsetY;
            Input.mouseOffsetX = Input.mouseX - Input.mouseLastX;
            Input.mouseOffsetY = Input.mouseY - Input.mouseLastY;
            e.preventDefault();
            if (e.targetTouches.length > 1) {
                var newPosition1 = new egret3d.Point(Input.mouseX, Input.mouseY);
                var newPosition2 = new egret3d.Point(Input.getX(e.targetTouches[1].clientX), Input.getY(e.targetTouches[1].clientY));
                if (this._oldPosition1 == null)
                    this._oldPosition1 = newPosition1;
                if (this._oldPosition2 == null)
                    this._oldPosition2 = newPosition2;
                if (this.isEnlarge(this._oldPosition1, this._oldPosition2, newPosition1, newPosition2))
                    Input.wheelDelta = 120;
                else
                    Input.wheelDelta = -120;
                this._oldPosition1 = newPosition1;
                this._oldPosition2 = newPosition2;
            }
            else {
            }
            this._touchEvent3d.reset();
            this._touchEvent3d.targetTouches = this.GetTargetTouches(e.targetTouches);
            this._touchEvent3d.target = this;
            this._touchEvent3d.eventType = egret3d.TouchEvent3D.TOUCH_MOVE;
            this.dispatchEvent(this._touchEvent3d);
        };
        Input.prototype.GetTargetTouches = function (targetTouches) {
            var array = new Array();
            for (var i = 0; i < targetTouches.length; i++) {
                var touchData = new TouchData(targetTouches[i]);
                array.push(touchData);
            }
            return array;
        };
        Input.prototype.mouseClick = function (e) {
            if (!this.deliverMessage()) {
                return;
            }
            this._mouseEvent3d.reset();
            this._mouseEvent3d.mouseCode = e.button;
            this._mouseEvent3d.target = this;
            this._mouseEvent3d.eventType = egret3d.MouseEvent3D.MOUSE_CLICK;
            this.dispatchEvent(this._mouseEvent3d);
        };
        Input.prototype.mouseEnd = function (e) {
            this._mouseEvent3d.reset();
            this._mouseEvent3d.mouseCode = e.button;
            this._mouseEvent3d.target = this;
            this._mouseStatus[this._mouseEvent3d.mouseCode] = false;
            this._mouseEvent3d.eventType = egret3d.MouseEvent3D.MOUSE_UP;
            this.dispatchEvent(this._mouseEvent3d);
        };
        Input.prototype.deliverMessage = function () {
            var view3ds = Input.canvas.view3Ds;
            for (var i = 0; i < view3ds.length; ++i) {
                if (view3ds[i].inView3D(Input.mouseX, Input.mouseY)) {
                    return true;
                }
            }
            return false;
        };
        Input.prototype.mouseStart = function (e) {
            if (!this.deliverMessage()) {
                return;
            }
            this._mouseEvent3d.reset();
            this._mouseEvent3d.mouseCode = e.button;
            this._mouseEvent3d.target = this;
            if (!this._mouseStatus[this._mouseEvent3d.mouseCode]) {
                this._mouseStatus[this._mouseEvent3d.mouseCode] = true;
                this._mouseEvent3d.eventType = egret3d.MouseEvent3D.MOUSE_DOWN;
                this.dispatchEvent(this._mouseEvent3d);
            }
        };
        Input.prototype.mouseMove = function (e) {
            Input.mouseLastX = Input.mouseX;
            Input.mouseLastY = Input.mouseY;
            Input.mouseX = Input.getX(e.clientX); // - Input.canvas.x + Input.canvas.offsetX;
            Input.mouseY = Input.getY(e.clientY); // - Input.canvas.y + Input.canvas.offsetY;
            Input.mouseOffsetX = Input.mouseX - Input.mouseLastX;
            Input.mouseOffsetY = Input.mouseY - Input.mouseLastY;
            this._mouseEvent3d.reset();
            this._mouseEvent3d.target = this;
            this._mouseEvent3d.eventType = egret3d.MouseEvent3D.MOUSE_MOVE;
            this.dispatchEvent(this._mouseEvent3d);
        };
        Input.prototype.mouseOver = function (e) {
            this._mouseEvent3d.reset();
            this._mouseEvent3d.target = this;
            this._mouseEvent3d.eventType = egret3d.MouseEvent3D.MOUSE_OVER;
            this.dispatchEvent(this._mouseEvent3d);
        };
        Input.prototype.mouseWheel = function (e) {
            Input.wheelDelta = e.wheelDelta;
            this._mouseEvent3d.reset();
            this._mouseEvent3d.target = this;
            this._mouseEvent3d.eventType = egret3d.MouseEvent3D.MOUSE_WHEEL;
            this.dispatchEvent(this._mouseEvent3d);
        };
        Input.prototype.keyDown = function (e) {
            this._keyEvent3d.reset();
            this._keyEvent3d.keyCode = e.keyCode;
            this._keyEvent3d.target = this;
            if (!this._keyStatus[e.keyCode]) {
                this._keyStatus[e.keyCode] = true;
                //this._keyEvent3d.eventType = KeyEvent3D.KEY_CLICK;
                //this.dispatchEvent(this._keyEvent3d);
                this._keyEvent3d.eventType = egret3d.KeyEvent3D.KEY_DOWN;
                this.dispatchEvent(this._keyEvent3d);
            }
        };
        Input.prototype.keyUp = function (e) {
            this._keyEvent3d.reset();
            this._keyEvent3d.keyCode = e.keyCode;
            this._keyEvent3d.target = this;
            //if (this._keyStatus[e.keyCode]) {
            //    this._keyEvent3d.eventType = KeyEvent3D.KEY_CLICK;
            //    this.dispatchEvent(this._keyEvent3d);
            //}
            this._keyStatus[e.keyCode] = false;
            this._keyEvent3d.eventType = egret3d.KeyEvent3D.KEY_UP;
            this.dispatchEvent(this._keyEvent3d);
        };
        Input.prototype.onWindowsResize = function (e) {
            this._windowsEvent3d.target = this;
            this._windowsEvent3d.eventType = egret3d.Event3D.RESIZE;
            this.dispatchEvent(this._windowsEvent3d);
        };
        Input.prototype.onOrientationChange = function (e) {
            this._orientationEvent3d.target = this;
            this._orientationEvent3d.eventType = egret3d.OrientationEvent3D.ORIENTATION_CHANGE;
            this.dispatchEvent(this._orientationEvent3d);
        };
        Input.prototype.onDeviceMotion = function (e) {
            this._orientationEvent3d.target = this;
            this._orientationEvent3d.eventType = egret3d.OrientationEvent3D.DEVICE_MOTION;
            this._orientationEvent3d.acceleration = e.acceleration;
            this._orientationEvent3d.accelerationIncludingGravity = e.accelerationIncludingGravity;
            this._orientationEvent3d.rotationRate = e.rotationRate;
            this.dispatchEvent(this._orientationEvent3d);
        };
        Input.prototype.onDeviceOrientation = function (e) {
            this._orientationEvent3d.target = this;
            this._orientationEvent3d.eventType = egret3d.OrientationEvent3D.DEVICE_ORIENTATION;
            this._orientationEvent3d.absolute = e.absolute;
            this._orientationEvent3d.alpha = e.alpha;
            this._orientationEvent3d.beta = e.beta;
            this._orientationEvent3d.gamma = e.gamma;
            this.dispatchEvent(this._orientationEvent3d);
        };
        //返回角度
        Input.prototype.GetSlideAngle = function (dx, dy) {
            return Math.atan2(dy, dx) * 180 / Math.PI;
        };
        /**
        * @language zh_CN
        * 根据起点和终点返回方向
        * @param  startX {Number} 起点X坐标
        * @param  startY {Number} 起点Y坐标
        * @param  endX   {Number} 终点X坐标
        * @param  endY   {Number} 终点Y坐标
        * @returns result {number} 1：向上，2：向下，3：向左，4：向右,0：未滑动
        */
        Input.prototype.GetSlideDirection = function (startX, startY, endX, endY) {
            var dy = startY - endY;
            var dx = endX - startX;
            var result = 0;
            //如果滑动距离太短
            if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                return result;
            }
            var angle = this.GetSlideAngle(dx, dy);
            if (angle >= -45 && angle < 45) {
                result = 4;
            }
            else if (angle >= 45 && angle < 135) {
                result = 1;
            }
            else if (angle >= -135 && angle < -45) {
                result = 2;
            }
            else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                result = 3;
            }
            return result;
        };
        Input.prototype.isEnlarge = function (op1, op2, np1, np2) {
            //函数传入上一次触摸两点的位置与本次触摸两点的位置计算出用户的手势
            var leng1 = Math.sqrt((op1.x - op2.x) * (op1.x - op2.x) + (op1.y - op2.y) * (op1.y - op2.y));
            var leng2 = Math.sqrt((np1.x - np2.x) * (np1.x - np2.x) + (np1.y - np2.y) * (np1.y - np2.y));
            if (leng1 < leng2) {
                //放大手势
                return true;
            }
            else {
                //缩小手势
                return false;
            }
        };
        return Input;
    }(egret3d.EventDispatcher));
    Input.scaleX = 1;
    Input.scaleY = 1;
    /**
    * @language zh_CN
    * 当前鼠标X坐标。
    * 基于 Stage3D 的x坐标
    * @see egret3d.Stage3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    Input.mouseX = 0;
    /**
    * @language zh_CN
    * 当前鼠标Y坐标。
    * 基于 Stage3D 的y坐标
    * @see egret3d.Stage3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    Input.mouseY = 0;
    /**
    * @language zh_CN
    * 鼠标滚轮增量值。
    * @version Egret 3.0
    * @platform Web,Native
    */
    Input.wheelDelta = 0;
    /**
    * @language zh_CN
    * 鼠标X坐标的偏移值。
    * @version Egret 3.0
    * @platform Web,Native
    */
    Input.mouseOffsetX = 0;
    /**
    * @language zh_CN
    * 鼠标Y坐标的偏移值。
    * @version Egret 3.0
    * @platform Web,Native
    */
    Input.mouseOffsetY = 0;
    /**
    * @language zh_CN
    * 上一次鼠标X坐标。
    * @version Egret 3.0
    * @platform Web,Native
    */
    Input.mouseLastX = 0;
    /**
    * @language zh_CN
    * 上一次鼠标Y坐标。
    * @version Egret 3.0
    * @platform Web,Native
    */
    Input.mouseLastY = 0;
    Input._instance = null;
    egret3d.Input = Input;
    __reflect(Input.prototype, "egret3d.Input");
})(egret3d || (egret3d = {}));
