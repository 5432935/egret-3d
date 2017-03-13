module egret3d {

    /**
	* @private
    * @language zh_CN
    * @class egret3d.EventManager
    * @classdesc
    * 事件管理。
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class EventManager {

        private _canvas: Stage3D;

        private _pickEvent3d: PickEvent3D;
        private _retRenderList: Array<IRender> = new Array<IRender>();
        protected _ray: Ray = new Ray();
        private get _view3ds(): Array<View3D> {
            return this._canvas.view3Ds;
        }


        /**
        * @language zh_CN
        * 构造函数
        * @param canvas 画布
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(canvas: Stage3D) {
            this._canvas = canvas;
            this._pickEvent3d = new PickEvent3D();

            Input.addEventListener(MouseEvent3D.MOUSE_CLICK, this.onMouseClick, this);
            Input.addEventListener(MouseEvent3D.MOUSE_DOWN, this.onMouseDown, this);
            Input.addEventListener(MouseEvent3D.MOUSE_UP, this.onMouseUp, this);
            Input.addEventListener(MouseEvent3D.MOUSE_MOVE, this.onMouseMove, this);

            Input.addEventListener(MouseEvent3D.MOUSE_WHEEL, this.onMouseWheel, this);

            Input.addEventListener(TouchEvent3D.TOUCH_START, this.onTouchDown, this);
            Input.addEventListener(TouchEvent3D.TOUCH_END, this.onTouchUp, this);
            Input.addEventListener(TouchEvent3D.TOUCH_MOVE, this.onTouchMove, this);
        }
      
        /**
        * @language zh_CN
        * 清理EventManager
        * @version Egret 3.0
        * @platform Web,Native
        */
        public onClear(): void {
            this._canvas = null;
        }
        /**
        * @language zh_CN
        * 清除绑定关系。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public onClearListeners() {

        }
        /**
         * @language zh_CN
         * 分发事件。
         * @param e {any} 事件参数
         * @param typeStr {string} 事件类型
         * @version Egret 3.0
         * @platform Web,Native
         */
        private sendEvent(e: Event3D, typeStr: string, func: Function) {
            var canvas = this._canvas;
            if (!canvas) {
                return ;
            }
            for (var i = 0; i < this._view3ds.length; i++) {
                var view = this._view3ds[i];
                var collect = view.entityCollect.specialCastItem[SpecialCast.Pick] ;
                if (!view.entityCollect || !collect ) {
                    continue;
                }

                var object3d: Object3D = null;
                var ray: Ray = null;
                this._retRenderList.length = 0;
                var ret: Array<Object3D> = this._retRenderList;
                for (var j: number = 0; j < collect.length; ++j) {
                    object3d = collect[j];
                    if (!object3d.containEventListener(e.eventType) && !object3d.containEventListener(typeStr)) {
                        continue;
                    }
                    if (!ray) {
                        ray = Picker.createRayToView(view, this._ray);
                    }
                    if (Picker.doPickerObject(this._ray, object3d)) {
                        ret.push(object3d);
                    }
                }

                var len = ret.length;
                if (len <= 0) {
                    continue;
                }
                var render: Object3D = null;
                var dis: number = MathUtil.MAX_VALUE;
                var temp_dis: number = 0;
                for (var j: number = 0; j < len; j++) {
                    object3d = ret[j];

                    temp_dis = Vector3.distance(object3d.globalPosition, view.camera3D.globalPosition);
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
        }

        private initPickEvent3D(typeStr: string, e: any, render: IRender): PickEvent3D {
            this._pickEvent3d.eventType = typeStr;
            this._pickEvent3d.data = e;
            this._pickEvent3d.pickResult = render.pickResult;
            return this._pickEvent3d;
        }

        private clearEvent() {
            this._pickEvent3d.target = null;
            this._pickEvent3d.data = null;
            this._pickEvent3d.pickResult = null;
            this._pickEvent3d.targetEvent = null;
        }
        private onTouchMove(e: TouchEvent3D) {
            this._pickEvent3d.targetEvent = e;
            this.sendEvent(e, PickEvent3D.PICK_MOVE, this.initPickEvent3D);
            this.clearEvent();
        }

        private onTouchUp(e: TouchEvent3D) {
            this._pickEvent3d.targetEvent = e;
            this.sendEvent(e, PickEvent3D.PICK_UP, this.initPickEvent3D);
            this.clearEvent();
        }

        private onTouchDown(e: TouchEvent3D) {
            this._pickEvent3d.targetEvent = e;
            this.sendEvent(e, PickEvent3D.PICK_DOWN, this.initPickEvent3D);
            this.clearEvent();
        }

        private onMouseClick(e: MouseEvent3D) {
            this._pickEvent3d.targetEvent = e;
            this.sendEvent(e, PickEvent3D.PICK_CLICK, this.initPickEvent3D);
            this.clearEvent();
        }

        private onMouseDown(e: MouseEvent3D) {
            this._pickEvent3d.targetEvent = e;
            this.sendEvent(e, PickEvent3D.PICK_DOWN, this.initPickEvent3D);
            this.clearEvent();
        }

        private onMouseUp(e: MouseEvent3D) {
            this._pickEvent3d.targetEvent = e;
            this.sendEvent(e, PickEvent3D.PICK_UP, this.initPickEvent3D);
            this.clearEvent();
        }

        private onMouseMove(e: MouseEvent3D) {
            this._pickEvent3d.targetEvent = e;
            this.sendEvent(e, PickEvent3D.PICK_MOVE, this.initPickEvent3D);
            this.clearEvent();
        }


        private onMouseWheel(e: MouseEvent3D) {
            this._pickEvent3d.targetEvent = e;
            this.sendEvent(e, PickEvent3D.PICK_WHEEL, this.initPickEvent3D);
            this.clearEvent();
        }
    }
}   