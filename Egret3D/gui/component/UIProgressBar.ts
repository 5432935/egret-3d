module egret3d.gui {
         /**
    * @class egret3d.gui.UIProgressBar
    * @classdesc
    * 基础的进度条组件.</p>
    * 由底部背景条以及顶部的进度条组成.</p>
    * 组件样式名为background以及 bar 分别用来设置底部背景条以及顶部进度条的样式
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UIProgressBar extends UIElement {

        private _background: Quad;
        private _bar:Quad;
        private _ratio: number;
        private _mask: Rectangle = new Rectangle();
        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
            this._background = new Quad();
            this.addChild(this._background);
            this._bar = new Quad();
            this.addChild(this._bar);
            this._ratio = 0.5;
            this.updateStyle();
        }

         /**
        * @language zh_CN
        * 进度条的比例.</p>
        * 取值范围为0-1,即进度条由空到填满</p>
        * 小于0 取0, 大于1 取1
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set ratio(value: number) {
            if (value > 1) {
                value = 1;
            }else if (value < 0) {
                value = 0;
            }
            this._ratio = value;
            this.updateBar();
        }
         /**
        * @language zh_CN
        * 进度条的比例.</p>
        * 取值范围为0-1,即进度条由空到填满</p>
        * 小于0 取0, 大于1 取1
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get ratio(): number {
            return this._ratio;
        }
        /**
        * @language zh_CN
        * 获取或设置组件的宽度（以像素为单位）。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set width(value: number) {
            this._background.width = this._bar.width = value;
        }
        /**
        * @language zh_CN
        * 获取或设置组件的高度（以像素为单位）。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set height(value: number) {
            this._background.height = this._bar.height = value;
        }

        /**
        * @language zh_CN
        * 获取或设置组件的宽度（以像素为单位）。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get width(): number {
            return this._background.width;
        }
        /**
        * @language zh_CN
        * 获取或设置组件的高度（以像素为单位）。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get height(): number {
            return this._background.height;
        }
        /**
        * @private
        */
        private setBarRect(x: number, y: number, w: number, h: number) {
            this._bar.x = x;
            this._bar.y = y;
            this._bar.width = w;
            this._bar.height = h;
        }

        /**
        * @language zh_CN
        * 获取进度条的显示对象.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get bar(): DisplayObject {
            return this._bar;
        }
        /**
        * @language zh_CN
        * 获取背景的显示对象.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get background(): DisplayObject {
            return this._background;
        }
        /**
        * @private
        */
        private updateBar() {
            this._mask.width = this._ratio * this._bar.width;
            this._mask.height = this._bar.height;
            this._bar.mask = this._mask;
        }

         /**
        * @language zh_CN
        * 检索组件的样式查找链中设置的样式属性。
        * @param style 样式属性的名称。 可选值:bar, background.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setStyle(style: string, value: any) {
            super.setStyle(style, value);
            this.updateStyle();
            this.updateBar();
        }

        /**
        * @private
        */
        protected getDefaultStyleNameByStyleName(styleName: string): string {
            var obj = {
                "bar": DefaultSkinName.DEFAULT_PROGRESS_BAR,
                "background": DefaultSkinName.DEFAULT_PROGRESS_BAR_BACKGROUND
            };

            var result: string = obj[styleName];
            if (!result) {
                console.log(" ERROR!!! UISlider can't find default style : ", styleName);
            }
            return result;
        }

        /**
        * @private
        */
        private updateStyle() {
            this._background.texture = this.getStyle("background");
            this._bar.texture = this.getStyle("bar");
        }
        
    }
}