module egret3d.gui {

    /**
    * @class egret3d.gui.UISlider
    * @classdesc
    * 通过使用 Slider 组件，用户可以在滑块轨道的端点之间移动滑块来选择值。 </p>
    * Slider 组件的当前值由滑块端点之间滑块的相对位置确定，端点对应于 Slider 组件的 minimum 和 maximum 值。
    * 组件样式名为background以及 bar 分别用来设置底部背景条以及顶部的样式
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UISlider extends gui.UIElement {
        private _background: Quad;
        private _bar:Quad;
        private _maximum: number;
        private _minimum:number;
        private _value:number;
        private _snapInterval:number;
        private _text: UITextField;
        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
            this._background = new Quad();
            this._bar =new  Quad();
            this._text = new UITextField(UITextFieldType.DYNAMIC);
            this._text.autoSize = UITextFieldAutoSize.CENTER;
            this._text.textColor = 0xff000000;

            this.addChild(this._background);
            this.addChild(this._bar);
            this.addChild(this._text);
//            this._background.color = 0xff00ffff;
//            this._bar.color = 0xffff00ff;
            this._minimum = 0;
            this._maximum = 100;
            this._snapInterval = 10;
            this.value = 50;
            this.addEventListener(MouseEvent3D.MOUSE_DOWN, this.onMouseDown, this);
            this.drawTexture();
        }

        /**
        * @language zh_CN
        * 设置皮肤
        * @param style 皮肤名称, 可选值: background, bar.
        * @param value 皮肤贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setStyle(style: string, value: any): void {
            super.setStyle(style, value);
            this.drawTexture();
//            if (style === "bar") {
//                this._bar.texture = value;
//            } else if (style === "background") {
//                this._background.texture = value;
//            }
            this.onRender();
        }
        /**
        * @private
        */
        private drawTexture() {
                this._bar.texture = this.getStyle("bar");
                this._background.texture = this.getStyle("background");
        }

        /**
        * @private
        */
        protected getDefaultStyleNameByStyleName(styleName: string): string {
            var obj = {
                "bar": DefaultSkinName.DEFAULT_SLIDER_BAR,
                "background": DefaultSkinName.DEFAULT_SLIDER_BACKGROUND
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
        private onMouseUp(event: MouseEvent3D) {
            this.removeEventListener(MouseEvent3D.MOUSE_MOVE, this.onMouseMove, this);
            this.removeEventListener(MouseEvent3D.MOUSE_UP, this.onMouseUp, this);
        }

        /**
        * @private
        */
        private onMouseDown(event: MouseEvent3D) {
            this.addEventListener(MouseEvent3D.MOUSE_MOVE, this.onMouseMove, this);
//            this.addEventListener(MouseEvent3D.MOUSE_UP, this.onMouseUp, this);
            this.stage.addEventListener(MouseEvent3D.MOUSE_UP, this.onMouseUp, this);
            var cx: number = this.mouseX;
            this.value = cx / this._background.width * (this._maximum - this._minimum) + this._minimum;
        }
        /**
        * @private
        */
        private updateBar() {
            var ratio: number = Math.abs(this._value / (this._maximum + this._minimum));
            this._bar.width = this._background.width * ratio;
            this._text.text = this.value.toString();
        }

          /**
        * @language zh_CN
        * 获取或设置用户移动滑块时值增加或减小的量。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set snapInterval(value: number) {
            this._snapInterval = value;
        }

        /**
        * @language zh_CN
        * 获取或设置用户移动滑块时值增加或减小的量。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get snapInterval(): number {
            return this._snapInterval;
        }

        /**
        * @language zh_CN
        * 获取或设置 Slider 组件的当前值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set value(value: number) {
            if (value % this._snapInterval !== 0) {
                value = Math.round(value / this._snapInterval) * this._snapInterval;
            }
            if (this._value === value) return;
            this._value = value;

            var event: Event3D = new Event3D(Event3D.CHANGE);
            this.dispatchEvent(event);
            this.updateBar();
        }
        /**
        * @language zh_CN
        * 获取或设置 Slider 组件的当前值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get value(): number {
            return this._value;
        }
        /**
        * @private
        */
        private onMouseMove(event: MouseEvent3D) {
            var cx: number = this.mouseX;
            this.value = cx / this._background.width * (this._maximum - this._minimum) + this._minimum;
        }

         /**
        * @language zh_CN
        * Slider 组件实例所允许的最大值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get maximum(): number {
            return this._maximum;
        }
  

        /**
        * @language zh_CN
        * Slider 组件实例所允许的最大值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set maximum(value: number) {
            this._maximum = value;
        }
        /**
        * @language zh_CN
        * Slider 组件实例所允许的最小值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set minimum(value: number) {
            this._minimum = value;
        }

        /**
        * @language zh_CN
        * Slider 组件实例所允许的最小值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get minimum(): number {
            return this._minimum;
        }

        /**
        * @language zh_CN
        * 获取或设置组件的宽度（以像素为单位）。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set width(value: number) {
            this._background.width = this._text.width = value;

        }
        /**
        * @language zh_CN
        * 获取或设置组件的高度（以像素为单位）。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set height(value: number) {
            this._background.height = this._text.height =  this._bar.height = value;
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

    }
}