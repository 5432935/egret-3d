module egret3d.gui {
         /**
    * @class egret3d.gui.UILabelButton
    * @classdesc
    * 含文本组件的按钮, 用于在按钮上显示文字
    * @see egret3d.MouseEvent3D
    * @see egret3d.gui.UIButton
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UILabelButton extends UIButton{
      
        protected _label: string = "";		

        private _textField:gui.UITextField;
        private _textWidth: number;
        private _textHeight:number;
        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
            this._textField = new gui.UITextField();
            this._textField.autoSize = UITextFieldAutoSize.CENTER;
            this._textField.textColor = 0xff000000;
            this.addChild(this._textField);
            this.onRender();
            this._textHeight = -1;
            this._textWidth = -1;
        }
         /**
        * @private
        */
        protected getDefaultStyleNameByStyleName(styleName: string): string {
            var obj = {
                "down": DefaultSkinName.DEFAULT_LABE_BUTTON_DOWN,
                "up": DefaultSkinName.DEFAULT_LABEL_BUTTON_UP,
                "disable": DefaultSkinName.DEFAULT_LABE_BUTTON_DISABLE
            };

            var result: string = obj[styleName];
            if (!result) {
                console.log(" ERROR!!! UILabelButton can't find default style : ", styleName);
            }
            return result;
        }
         /**
        * @private
        */
        public get textHeight(): number {
            return this._textHeight;
        }
         /**
        * @private
        */
        public set textHeight(value: number) {
            this._textHeight = value;
            this.onRender();
        }
         /**
        * @private
        */
        public get textWidth(): number {
            return this._textWidth; 
        }
         /**
        * @private
        */
        public set textWidth(value: number) {
            this._textWidth = value;
            this.onRender();
        }
         /**
        * @language zh_CN
        * 获取按钮内的文本组件。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get textField(): UITextField {
            return this._textField;
        }
         /**
        * @language zh_CN
        * 获取或设置组件的文本标签。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get label(): string {
            return this._label;
        }	

        /**
        * @language zh_CN
        * 获取或设置组件的文本标签。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set label(value: string) {
            this._label = value;
            this._textField.text = this._label;
        }	
        /**
        * @private
        */
        protected onRender() {
            super.onRender();

            if (this._textHeight > 0) {
                this.textField.textHeight = this._textHeight;
            } else {
                this._textField.height = this._skin.height;
            }

            if (this._textWidth > 0) {
                this.textField.textWidth = this._textWidth;
            } else {
                this._textField.width = this._skin.width;
            }
        }
    }
}