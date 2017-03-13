var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @language zh_CN
    * @class egret3d.EventManager
    * @classdesc
    * 事件管理。
    * @version Egret 3.0
    * @platform Web,Native
    */
    var EventManager = (function () {
        /**
        * @language zh_CN
        * 构造函数
        * @param canvas 画布
        * @version Egret 3.0
        * @platform Web,Native
        */
        function EventManager(canvas) {
            this._retRenderList = new Array();
            this._ray = new egret3d.Ray();
            this._canvas = canvas;
            this._pickEvent3d = new egret3d.PickEvent3D();
            egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_CLICK, this.onMouseClick, this);
            egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_DOWN, this.onMouseDown, this);
            egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_UP, this.onMouseUp, this);
            egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_MOVE, this.onMouseMove, this);
            egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_WHEEL, this.onMouseWheel, this);
            egret3d.Input.addEventListener(egret3d.TouchEvent3D.TOUCH_START, this.onTouchDown, this);
            egret3d.Input.addEventListener(egret3d.TouchEvent3D.TOUCH_END, this.onTouchUp, this);
            egret3d.Input.addEventListener(egret3d.TouchEvent3D.TOUCH_MOVE, this.onTouchMove, this);
        }
        Object.defineProperty(EventManager.prototype, "_view3ds", {
            get: function () {
                return this._canvas.view3Ds;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 清理EventManager
        * @version Egret 3.0
        * @platform Web,Native
        */
        EventManager.prototype.onClear = function () {
            this._canvas = null;
        };
        /**
        * @language zh_CN
        * 清除绑定关系。
        * @version Egret 3.0
        * @platform Web,Native
        */
        EventManager.prototype.onClearListeners = function () {
        };
        /**
         * @language zh_CN
         * 分发事件。
         * @param e {any} 事件参数
         * @param typeStr {string} 事件类型
         * @version Egret 3.0
         * @platform Web,Native
         */
        EventManager.prototype.sendEvent = function (e, typeStr, func) {
            var canvas = this._canvas;
            if (!canvas) {
                return;
            }
            for (var i = 0; i < this._view3ds.length; i++) {
                var view = this._view3ds[i];
                var collect = view.entityCollect.specialCastItem[egret3d.SpecialCast.Pick];
                if (!view.entityCollect || !collect) {
                    continue;
                }
                var object3d = null;
                var ray = null;
                this._retRenderList.length = 0;
                var ret = this._retRenderList;
                for (var j = 0; j < collect.length; ++j) {
                    object3d = collect[j];
                    if (!object3d.containEventListener(e.eventType) && !object3d.containEventListener(typeStr)) {
                        continue;
                    }
                    if (!ray) {
                        ray = egret3d.Picker.createRayToView(view, this._ray);
                    }
                    if (egret3d.Picker.doPickerObject(this._ray, object3d)) {
                        ret.push(object3d);
                    }
                }
                var len = ret.length;
                if (len <= 0) {
                    continue;
                }
                var render = null;
                var dis = egret3d.MathUtil.MAX_VALUE;
                var temp_dis = 0;
                for (var j = 0; j < len; j++) {
                    object3d = ret[j];
                    temp_dis = egret3d.Vector3.distance(object3d.globalPosition, view.camera3D.globalPosition);
                    if (temp_dis < dis) {
                        dis = temp_dis;
                        render = object3d;
                    }
                }
                if (render) {
                    render.dispatchEvent(e);
                    render.dispatchEvent(func.call(this, typeStr, e, render));
                }
            }
        };
        EventManager.prototype.initPickEvent3D = function (typeStr, e, render) {
            this._pickEvent3d.eventType = typeStr;
            this._pickEvent3d.data = e;
            this._pickEvent3d.pickResult = render.pickResult;
            return this._pickEvent3d;
        };
        EventManager.prototype.clearEvent = function () {
            this._pickEvent3d.target = null;
            this._pickEvent3d.data = null;
            this._pickEvent3d.pickResult = null;
            this._pickEvent3d.targetEvent = null;
        };
        EventManager.prototype.onTouchMove = function (e) {
            this._pickEvent3d.targetEvent = e;
            this.sendEvent(e, egret3d.PickEvent3D.PICK_MOVE, this.initPickEvent3D);
            this.clearEvent();
        };
        EventManager.prototype.onTouchUp = function (e) {
            this._pickEvent3d.targetEvent = e;
            this.sendEvent(e, egret3d.PickEvent3D.PICK_UP, this.initPickEvent3D);
            this.clearEvent();
        };
        EventManager.prototype.onTouchDown = function (e) {
            this._pickEvent3d.targetEvent = e;
            this.sendEvent(e, egret3d.PickEvent3D.PICK_DOWN, this.initPickEvent3D);
            this.clearEvent();
        };
        EventManager.prototype.onMouseClick = function (e) {
            this._pickEvent3d.targetEvent = e;
            this.sendEvent(e, egret3d.PickEvent3D.PICK_CLICK, this.initPickEvent3D);
            this.clearEvent();
        };
        EventManager.prototype.onMouseDown = function (e) {
            this._pickEvent3d.targetEvent = e;
            this.sendEvent(e, egret3d.PickEvent3D.PICK_DOWN, this.initPickEvent3D);
            this.clearEvent();
        };
        EventManager.prototype.onMouseUp = function (e) {
            this._pickEvent3d.targetEvent = e;
            this.sendEvent(e, egret3d.PickEvent3D.PICK_UP, this.initPickEvent3D);
            this.clearEvent();
        };
        EventManager.prototype.onMouseMove = function (e) {
            this._pickEvent3d.targetEvent = e;
            this.sendEvent(e, egret3d.PickEvent3D.PICK_MOVE, this.initPickEvent3D);
            this.clearEvent();
        };
        EventManager.prototype.onMouseWheel = function (e) {
            this._pickEvent3d.targetEvent = e;
            this.sendEvent(e, egret3d.PickEvent3D.PICK_WHEEL, this.initPickEvent3D);
            this.clearEvent();
        };
        return EventManager;
    }());
    egret3d.EventManager = EventManager;
    __reflect(EventManager.prototype, "egret3d.EventManager");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=EventManager.js.map