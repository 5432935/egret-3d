module egret3d {
    /**
    * @private
    */
    export class GUIEventFire {

        private _finalist: DisplayObject[];
        private _mouseList: DisplayObject[];
        private _lastMouseList:DisplayObject[];
        private _quadStage: QuadStage;
        constructor( quadStage:QuadStage ) {
            this._mouseList = [];
            this._lastMouseList = [];
            this._quadStage = quadStage;

            Input.addEventListener(MouseEvent3D.MOUSE_DOWN, this.mouseDown, this, null, Number.MAX_VALUE);
            Input.addEventListener(MouseEvent3D.MOUSE_UP, this.mouseUp, this, null, Number.MAX_VALUE);
            Input.addEventListener(MouseEvent3D.MOUSE_OVER, this.mouseOver, this, null, Number.MAX_VALUE);
            Input.addEventListener(MouseEvent3D.MOUSE_CLICK, this.mouseClick, this, null, Number.MAX_VALUE);
            Input.addEventListener(MouseEvent3D.MOUSE_MOVE, this.mouseMove, this, null, Number.MAX_VALUE);
            Input.addEventListener(MouseEvent3D.MOUSE_OUT, this.mouseOut, this, null, Number.MAX_VALUE);

            Input.addEventListener(TouchEvent3D.TOUCH_START, this.mouseDown, this, null, Number.MAX_VALUE);
            Input.addEventListener(TouchEvent3D.TOUCH_END, this.mouseUp, this, null, Number.MAX_VALUE);
            Input.addEventListener(TouchEvent3D.TOUCH_MOVE, this.mouseMove, this, null, Number.MAX_VALUE);
        }

        private dispatchMouseEvent(e:MouseEvent3D) {
            //todo 事件冒泡加入捕获阶段
            //todo 事件阻断机制
            var eventType: string = e.eventType;
            if (eventType === TouchEvent3D.TOUCH_START) {
                eventType = MouseEvent3D.MOUSE_DOWN;
            }else if (eventType === TouchEvent3D.TOUCH_END) {
                eventType = MouseEvent3D.MOUSE_UP;
            }else if (eventType === TouchEvent3D.TOUCH_MOVE) {
                eventType = MouseEvent3D.MOUSE_MOVE;
            }
            if (eventType === MouseEvent3D.MOUSE_MOVE) {
                this._lastMouseList = this._mouseList;
            }
            var list = this.getMousePickList();
            var target: DisplayObject;
            var currentTraget: DisplayObject;
            if (list.length === 0) {
                //当没有任何对象被点击时. 抛出舞台事件
                var evt: MouseEvent3D = new MouseEvent3D(eventType);
                this._quadStage.dispatchEvent(evt);
                return;
            }
            e.stopImmediatePropagation();
            target = list[0];//最上层显示对象
            currentTraget = target;

            while (currentTraget) {
                var event: MouseEvent3D = new MouseEvent3D(eventType);
                currentTraget.dispatchEvent(event);
                if (!currentTraget.parentIsStage) {
                    currentTraget = currentTraget.parent;
                } else {
                    currentTraget = null;
                }
            }

            var stageEvent: MouseEvent3D = new MouseEvent3D(eventType);
            this._quadStage.dispatchEvent(stageEvent);
        }

        private onTouchStart(e: TouchEvent3D) {

        }

        private onTouchEnd(e: TouchEvent3D) {

        }

        private onTouchMove(e: TouchEvent3D) {

        }

        private mouseOut(e: MouseEvent3D) {
            this.dispatchMouseEvent(e);
        }

        private mouseDown(e: MouseEvent3D) {
            this.dispatchMouseEvent(e);
        }

        private mouseUp(e: MouseEvent3D) {
            this.dispatchMouseEvent(e);
        }

        private mouseOver(e: MouseEvent3D) {
            this.dispatchMouseEvent(e);
        }

        private mouseMove(e: MouseEvent3D) {
            this.dispatchMouseEvent(e);
        }

        private mouseClick(e: MouseEvent3D) {
            this.dispatchMouseEvent(e);
        }

    
       public fire() {
           this._finalist = this._quadStage.quadList;
       }


        private getGlobalRect(dis: DisplayObject): Rectangle {
            var rect: Rectangle = new Rectangle();
            rect.copyFrom(dis.aabb);
            dis = dis.parent;
            while (dis) {
                rect.x += dis.x;
                rect.y += dis.y;
                dis = dis.parent;
            }
            return rect;
        }


        private getMousePickList(): DisplayObject[] {
            var i: number;
            this._mouseList.length = 0;
            var quad: DisplayObject;
            if (this._finalist) {
                for (i = 0; i < this._finalist.length; i++) {
                    quad = this._finalist[i];
//                    console.log("quad.aabb: ", quad.aabb);
//                    console.log("mouseX: ", Input.mouseX, "mouseY: ", Input.mouseY);
                    if (quad.globalVisible && quad.mouseEnable && quad.aabb.inner(Input.mouseX, Input.mouseY)) {
                        this._mouseList.push(quad);
                    }
                }
            }

            this._mouseList.reverse();
            return this._mouseList;
        }
    }
}