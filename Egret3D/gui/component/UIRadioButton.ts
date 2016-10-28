module egret3d.gui {
         /**
    * @class egret3d.gui.UIRadioButton
    * @classdesc
    * 圆形的单选框按钮组件.</p>
    * 配合UIRadioButtonGroup可实现在任何给定的时刻，都只有一个组成员被选中
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UIRadioButton extends gui.UIToggleButtonBase {
        private _group:UIRadioButtonGroup;
        constructor() {
            super();
        }



        public set group(group: UIRadioButtonGroup) {
            this._group = group;
        }

        protected getDefaultStyleNameByStyleName(styleName: string): string {
            var obj = {
                "down": DefaultSkinName.DEFAULT_RADIO_BUTTON_DOWN,
                "up": DefaultSkinName.DEFAULT_RADIO_BUTTON_UP,
                "downAndSelected" : DefaultSkinName.DEFAULT_RADIO_BUTTON_SELECTED_DOWN,
                "upAndSelected" : DefaultSkinName.DEFAULT_RADIO_BUTTON_SELECTED_UP,
                "disable": DefaultSkinName.DEFAULT_RADIO_BUTTON_DISABLE
            };

            var result: string = obj[styleName];
            if (!result) {
                console.log(" ERROR!!! UIRadioButton can't find default style : ", styleName);
            }
            return result;
        }


    }
} 