module egret3d.gui {
    /**
    * @class egret3d.gui.UIButton
    * @classdesc
    * 常用的矩形按钮组件.</p>
    * 仅包含图片皮肤.如果要使用文本.请使用UILabelButton组件.</p>
    * 可响应鼠标事件;
    * @see egret3d.MouseEvent3D
    * @see egret3d.gui.UILabelButton
    * 示例:
    * @includeExample gui/component/UIButton.ts
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
        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
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
         /**
        * @private
        */
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


        /**
        * @language zh_CN
        * 获取或设置组件的宽度（以像素为单位）。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set width(value: number) {
            this._skin.width = value;
            this.onRender();
        }
        /**
        * @language zh_CN
        * 获取或设置组件的宽度（以像素为单位）。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get width(): number {
            return this._skin.width;
        }
        /**
        * @language zh_CN
        * 获取或设置组件的高度（以像素为单位）。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set height(value: number) {
            this._skin.height = value;
            this.onRender();
        }
        /**
        * @language zh_CN
        * 获取或设置组件的高度（以像素为单位）。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get height(): number {
            return this._skin.height;
        }

         /**
        * @language zh_CN
        * 设置皮肤
        * @param style 皮肤名称, 可选值:down, up, over, disable.
        * @param value 皮肤贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setStyle(style: string, value: any): void {
            super.setStyle(style, value);
            this.onRender();
        }
         /**
        * @private
        */
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
         /**
        * @private
        */
        protected mouseOut() {
            this.setMouseState(UIButton.STATE_UP);
        }
         /**
        * @private
        */
        protected mouseOver() {
            if (this._isDowning) {
                this.setMouseState(UIButton.STATE_DOWN);
            } else {
                this.setMouseState(UIButton.STATE_OVER);
            }
        }
         /**
        * @private
        */
        protected startPress(): void {
            this.addEventListener(MouseEvent3D.MOUSE_UP, this.mouseEventHandler, this);
            this.stage.addEventListener(MouseEvent3D.MOUSE_UP, this.onStageEnd, this);
            this._isDowning = true;

            this.setMouseState(UIButton.STATE_DOWN);
        }
         /**
        * @private
        */
        protected onStageEnd(event: MouseEvent3D): void {
            this.stage.removeEventListener(MouseEvent3D.MOUSE_UP, this.onStageEnd, this);
            this.removeEventListener(MouseEvent3D.MOUSE_UP, this.mouseEventHandler,this);
            this.setMouseState(UIButton.STATE_UP);
            this._isDowning = false;
        }
         /**
        * @private
        */
        protected endPress(): void {
            this.setMouseState(UIButton.STATE_UP);
            this._isDowning = false;
            this.stage.removeEventListener(MouseEvent3D.MOUSE_UP, this.onStageEnd, this);
            this.removeEventListener(MouseEvent3D.MOUSE_UP, this.mouseEventHandler, this);
        }
         /**
        * @language zh_CN
        * 是否可用.默认为true. 当设置为false时.将不响应鼠标输入事件
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
         /**
        * @private
        */
        public setMouseState(state: string): void {
            if (this._state === state) { return; }
            this._state = state;
            this.onRender();
        }
         /**
        * @private
        */
        protected onRender() {
            this.drawBackground();
        }

         /**
        * @private
        */
        protected drawBackground() {
            var skin: Texture = this.enable ? this.getStyle(this._state) : this.getStyle(UIButton.STATE_DISABLE);
            this._skin.texture = skin;
        }
    }
}