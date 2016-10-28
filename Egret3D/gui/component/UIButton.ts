module egret3d.gui {
         /**
    * @class egret3d.gui.UIButton
    * @classdesc
    * 常用的矩形按钮组件.</p>
    * 仅包含图片皮肤.如果要使用文本.请使用UILabelButton组件
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UIButton extends UIElement {

        protected _skin: Quad;
        private _enable: boolean;

        protected _state: string;
        protected _isDowning:boolean;

        protected static STATE_DOWN: string = "down";
        protected static STATE_UP: string = "up";
        protected static STATE_OVER:string = "over";
        protected static STATE_DISABLE: string = "disable";

        constructor() {
            super();
            this._skin = new Quad();
            this.addChild(this._skin);
            this._state = UIButton.STATE_UP;
            this._enable = true;
            this._isDowning = false;
            this.addEventListener(MouseEvent3D.MOUSE_DOWN, this.mouseEventHandler, this);
            this.addEventListener(MouseEvent3D.MOUSE_OUT, this.mouseEventHandler, this);
            this.addEventListener(MouseEvent3D.MOUSE_OVER, this.mouseEventHandler, this);
            this.drawBackground();
        }

        protected getDefaultStyleNameByStyleName(styleName: string): string {
            var obj = {
                "down": DefaultSkinName.DEFAULT_BUTTON_DOWN,
                "up": DefaultSkinName.DEFAULT_BUTTON_UP,
                "over": DefaultSkinName.DEFAULT_BUTTON_OVER,
                "disable": DefaultSkinName.DEFAULT_BUTTON_DISABLE
            };

            var result: string = obj[styleName];
            if (!result) {
                console.log(" ERROR!!! UIButton can't find default style : ", styleName);
            }
            return result;
        }

        public set width(value: number) {
            this._skin.width = value;
            this.onRender();
        }

        public set height(value: number) {
            this._skin.height = value;
            this.onRender();
        }

        public get width(): number {
            return this._skin.width;
        }

        public get height(): number {
            return this._skin.height;
        }

         /**
        * @language zh_CN
        * 设置皮肤
        * @param style 皮肤名称, down up over disable
        * @param value 皮肤贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setStyle(style: string, value: Texture): void {
            super.setStyle(style, value);
            this.onRender();
        }

        protected  mouseEventHandler(event: MouseEvent3D) {
            if (!this._enable) return;

            if (event.eventType === MouseEvent3D.MOUSE_DOWN) {
                this.startPress();
            } else if (event.eventType === MouseEvent3D.MOUSE_UP) {
                this.endPress();
            }else if (event.eventType === MouseEvent3D.MOUSE_OUT) {
                this.mouseOut();
            }else if (event.eventType === MouseEvent3D.MOUSE_OVER) {
                this.mouseOver();
            }
        }

        protected mouseOut() {
            this.setMouseState(UIButton.STATE_UP);
        }

        protected mouseOver() {
            if (this._isDowning) {
                this.setMouseState(UIButton.STATE_DOWN);
            } else {
                this.setMouseState(UIButton.STATE_OVER);
            }
        }

        protected startPress(): void {
            this.addEventListener(MouseEvent3D.MOUSE_UP, this.mouseEventHandler, this);
            this.stage.addEventListener(MouseEvent3D.MOUSE_UP, this.onStageEnd, this);
            this._isDowning = true;

            this.setMouseState(UIButton.STATE_DOWN);
        }

        protected onStageEnd(event: MouseEvent3D): void {
//            console.log("stage up");
            this.stage.removeEventListener(MouseEvent3D.MOUSE_UP, this.onStageEnd, this);
            this.removeEventListener(MouseEvent3D.MOUSE_UP, this.mouseEventHandler,this);
            this.setMouseState(UIButton.STATE_UP);
            this._isDowning = false;
        }

        protected endPress(): void {
            this.setMouseState(UIButton.STATE_UP);
            this._isDowning = false;
            this.stage.removeEventListener(MouseEvent3D.MOUSE_UP, this.onStageEnd, this);
            this.removeEventListener(MouseEvent3D.MOUSE_UP, this.mouseEventHandler, this);
        }
         /**
        * @language zh_CN
        * 是否可用.默认为true. 当设置为false时.将不相应鼠标输入事件
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get enable(): boolean {
            return this._enable;
        }

        public set enable(value: boolean) {
            this._enable = value;
            this.mouseEnable = value;
        }

        public setMouseState(state: string): void {
            if (this._state === state) { return; }
            this._state = state;
            this.onRender();
        }

        public onRender() {
            this.drawBackground();
        }

        protected drawBackground() {
            var skin: Texture = this.enable ? this.getStyle(this._state) : this.getStyle(UIButton.STATE_DISABLE);
            this._skin.texture = skin;
        }
    }

    export class ButtonLabelPlacement {
        public static BOTTOM: string = "bottom";
        public static TOP: string = "top";
        public static LEFT: string = "left";
        public static RIGHT: string = "right";
    }
}