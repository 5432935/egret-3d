module egret3d.gui {

         /**
    * @class egret3d.gui.UIPanel
    * @classdesc
    * 基础的面板组件. 内含背景图片,以及矩形显示区域限制
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UIPanel extends UIElement {
        protected _background: Quad;
        protected _container: UIElement;
        private _w: number;
        private _h:number;
        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
            this._background = new Quad();
            this._container = new UIElement();

            super.addChild(this._background);
            super.addChild(this._container);
            
            this._w = 100;
            this._h = 100;
            this.drawBackground();
            this.updateMask();
        }
        /**
        * @private
        */
        private updateMask() {
            this.mask = new Rectangle(0, 0, this._w, this._h);
        }
        /**
        * @private
        */
        public get background(): Quad {
            return this._background;
        }
        /**
        * @language zh_CN
        * 获取或设置组件的高度（以像素为单位）。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set width(value: number) {
            this._w = value;
            this._background.width = value;
            this.updateMask();
        }
        /**
        * @language zh_CN
        * 获取或设置组件的高度（以像素为单位）。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get width(): number {
            return this._w;
        }
        /**
        * @language zh_CN
        * 获取或设置组件的高度（以像素为单位）。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set height(value: number) {
            this._h = value;
            this._background.height = value;
            this.updateMask();
        }
        /**
        * @language zh_CN
        * 获取或设置组件的高度（以像素为单位）。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get height(): number {
            return this._h;
        }
        /**
        * @private
        */
        public onRender() {
            super.onRender();
            this.drawBackground();
            this.updateMask();
        }
        /**
        * @private
        */
        protected getDefaultStyleNameByStyleName(styleName: string): string {
            var obj = {
                "background": DefaultSkinName.DEFAULT_PANEL_BACKGROUND
            };

            var result: string = obj[styleName];
            if (!result) {
                console.log(" ERROR!!! UIPanel can't find default style : ", styleName);
            }
            return result;
        }
        /**
        * @private
        */
        private drawBackground() {
            var texture :Texture = this.getStyle("background");
            this._background.texture = texture;
        }
         /**
        * @language zh_CN
        * 检索组件的样式查找链中设置的样式属性。
        * @param style 样式属性的名称。 可选值:background.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setStyle(style: string, value: any) {
            super.setStyle(style, value);
            this.onRender();
        }
        /**
        * @private
        */
        public addChild(display: DisplayObject): DisplayObject {
            return this._container.addChild(display);
        }
        /**
        * @private
        */
        public addChildAt(display: DisplayObject, index: number): DisplayObject {
            return this._container.addChildAt(display, index);
        }
        /**
        * @private
        */
        public removeChild(display: DisplayObject): DisplayObject {
            return this._container.removeChild(display);
        }
        /**
        * @private
        */
        public removeChildAt(index: number): DisplayObject {
            return this._container.removeChildAt(index);
        }
        /**
        * @private
        */
        public swapChildIndex(display: DisplayObject, index: number) {
            this._container.swapChildIndex(display, index);
        }
        /**
        * @private
        */
        public hasChild(display: DisplayObject): number {
            return this._container.hasChild(display);
        }
        /**
        * @private
        */
        public getChildByIndex(index: number): DisplayObject {
            return this._container.getChildByIndex(index);
        }
        /**
        * @private
        */
        public getChildByName(name: string): DisplayObject {
            return this._container.getChildByName(name);
        }
    }
}