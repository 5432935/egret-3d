var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    */
    var GUIEventFire = (function () {
        function GUIEventFire(quadStage) {
            this._mouseList = [];
            this._lastMouseList = [];
            this._quadStage = quadStage;
            egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_DOWN, this.mouseDown, this, null, Number.MAX_VALUE);
            egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_UP, this.mouseUp, this, null, Number.MAX_VALUE);
            egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_OVER, this.mouseOver, this, null, Number.MAX_VALUE);
            egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_CLICK, this.mouseClick, this, null, Number.MAX_VALUE);
            egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_MOVE, this.mouseMove, this, null, Number.MAX_VALUE);
            egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_OUT, this.mouseOut, this, null, Number.MAX_VALUE);
            egret3d.Input.addEventListener(egret3d.TouchEvent3D.TOUCH_START, this.mouseDown, this, null, Number.MAX_VALUE);
            egret3d.Input.addEventListener(egret3d.TouchEvent3D.TOUCH_END, this.mouseUp, this, null, Number.MAX_VALUE);
            egret3d.Input.addEventListener(egret3d.TouchEvent3D.TOUCH_MOVE, this.mouseMove, this, null, Number.MAX_VALUE);
        }
        GUIEventFire.prototype.dispatchMouseEvent = function (e) {
            //todo 事件冒泡加入捕获阶段
            //todo 事件阻断机制
            var eventType = e.eventType;
            if (eventType === egret3d.TouchEvent3D.TOUCH_START) {
                eventType = egret3d.MouseEvent3D.MOUSE_DOWN;
            }
            else if (eventType === egret3d.TouchEvent3D.TOUCH_END) {
                eventType = egret3d.MouseEvent3D.MOUSE_UP;
            }
            else if (eventType === egret3d.TouchEvent3D.TOUCH_MOVE) {
                eventType = egret3d.MouseEvent3D.MOUSE_MOVE;
            }
            if (eventType === egret3d.MouseEvent3D.MOUSE_MOVE) {
                this._lastMouseList = this._mouseList;
            }
            var list = this.getMousePickList();
            var target;
            var currentTraget;
            if (list.length === 0) {
                //当没有任何对象被点击时. 抛出舞台事件
                var evt = new egret3d.MouseEvent3D(eventType);
                this._quadStage.dispatchEvent(evt);
                return;
            }
            e.stopImmediatePropagation();
            target = list[0]; //最上层显示对象
            currentTraget = target;
            while (currentTraget) {
                var event = new egret3d.MouseEvent3D(eventType);
                currentTraget.dispatchEvent(event);
                if (!currentTraget.parentIsStage) {
                    currentTraget = currentTraget.parent;
                }
                else {
                    currentTraget = null;
                }
            }
            var stageEvent = new egret3d.MouseEvent3D(eventType);
            this._quadStage.dispatchEvent(stageEvent);
        };
        GUIEventFire.prototype.onTouchStart = function (e) {
        };
        GUIEventFire.prototype.onTouchEnd = function (e) {
        };
        GUIEventFire.prototype.onTouchMove = function (e) {
        };
        GUIEventFire.prototype.mouseOut = function (e) {
            this.dispatchMouseEvent(e);
        };
        GUIEventFire.prototype.mouseDown = function (e) {
            this.dispatchMouseEvent(e);
        };
        GUIEventFire.prototype.mouseUp = function (e) {
            this.dispatchMouseEvent(e);
        };
        GUIEventFire.prototype.mouseOver = function (e) {
            this.dispatchMouseEvent(e);
        };
        GUIEventFire.prototype.mouseMove = function (e) {
            this.dispatchMouseEvent(e);
        };
        GUIEventFire.prototype.mouseClick = function (e) {
            this.dispatchMouseEvent(e);
        };
        GUIEventFire.prototype.fire = function () {
            this._finalist = this._quadStage.quadList;
        };
        GUIEventFire.prototype.getGlobalRect = function (dis) {
            var rect = new egret3d.Rectangle();
            rect.copyFrom(dis.aabb);
            dis = dis.parent;
            while (dis) {
                rect.x += dis.x;
                rect.y += dis.y;
                dis = dis.parent;
            }
            return rect;
        };
        GUIEventFire.prototype.getMousePickList = function () {
            var i;
            this._mouseList.length = 0;
            var quad;
            if (this._finalist) {
                for (i = 0; i < this._finalist.length; i++) {
                    quad = this._finalist[i];
                    //                    console.log("quad.aabb: ", quad.aabb);
                    //                    console.log("mouseX: ", Input.mouseX, "mouseY: ", Input.mouseY);
                    if (quad.globalVisible && quad.mouseEnable && quad.aabb.inner(egret3d.Input.mouseX, egret3d.Input.mouseY)) {
                        this._mouseList.push(quad);
                    }
                }
            }
            this._mouseList.reverse();
            return this._mouseList;
        };
        return GUIEventFire;
    }());
    egret3d.GUIEventFire = GUIEventFire;
    __reflect(GUIEventFire.prototype, "egret3d.GUIEventFire");
})(egret3d || (egret3d = {}));
