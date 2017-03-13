module egret3d.gui {
    /**
    * @class egret3d.gui.UIToggleButtonBase
    * @classdesc
    * UIToggleButtonBase 组件是支持 selected 属性的按钮组件的基类.</p>
    * UICheckBox 和 UIRadioButton 是 UIToggleButtonBase 的子类.</p>
    * @see egret3d.gui.UIRadioButton.
    * @see egret3d.gui.UICheckBox.
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UIToggleButtonBase extends UILabelButton {
        private _selected:boolean;

        protected static STATE_DOWN_AND_SELECTED:string  = "downAndSelected";
        protected static STATE_UP_AND_SELECTED: string = "upAndSelected";
        private _textPadding: number;
        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
            this._selected = false;
            this._textPadding = 5;
            this.textField.autoSize = UITextFieldAutoSize.LEFT;
            this.textWidth = 45;
            this.onRender();
        }

         /**
        * @language zh_CN
        * (只读)获取按钮和文本宽度之和
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get buttonAndLabelWidth(): number {
            return this._skin.width + this.textPadding + this.textWidth;
        }
      
         /**
        * @language zh_CN
        * 获取或设置按钮和文本的间隔（以像素为单位）。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get textPadding(): number {
            return this._textPadding;
        }
        /**
        * @language zh_CN
        * 获取或设置按钮和文本的间隔（以像素为单位）。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set textPadding(value: number) {
            this._textPadding = value;
            this.onRender();
        }
        /**
        * @private
        */
        protected onRender() {
            super.onRender();
            this.textField.x = this._skin.width + this._textPadding;
        }
        /**
        * @language zh_CN
        * 获取或设置一个布尔值，指示切换按钮是否已切换至打开或关闭位置。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get selected(): boolean {
            return this._selected;
        }

        /**
        * @language zh_CN
        * 获取或设置一个布尔值，指示切换按钮是否已切换至打开或关闭位置。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set selected(value: boolean) {
            if (this._selected === value) return;
            this._selected = value;
            this._selected ? this.setMouseState(UIToggleButtonBase.STATE_UP_AND_SELECTED) : this.setMouseState(UIButton.STATE_UP);
            var evt: Event3D = new Event3D(Event3D.CHANGE);
            evt.target = this;
            this.dispatchEvent(evt);
        }
        /**
        * @private
        */
        public setMouseState(state: string): void {
            if (state === UIButton.STATE_DOWN) {
                this._selected ? super.setMouseState(UIToggleButtonBase.STATE_DOWN_AND_SELECTED) : super.setMouseState(UIButton.STATE_DOWN);
            }else if (state === UIButton.STATE_UP) {
                this._selected ? super.setMouseState(UIToggleButtonBase.STATE_UP_AND_SELECTED) : super.setMouseState(UIButton.STATE_UP);
            } else {
                super.setMouseState(state);
            }
        }
        /**
        * @private
        */
        protected startPress(): void {
            super.startPress();
            this._selected ? this.setMouseState(UIToggleButtonBase.STATE_DOWN_AND_SELECTED) : this.setMouseState(UIButton.STATE_DOWN);
        }
        /**
        * @private
        */
        protected endPress() {
            super.endPress();
            this.selected = !this.selected;
            this._selected ? this.setMouseState(UIToggleButtonBase.STATE_UP_AND_SELECTED) : this.setMouseState(UIButton.STATE_UP);
        }
       
    }
} 