module egret3d.gui {
         /**
    * @class egret3d.gui.UIRadioButton
    * @classdesc
    * 圆形的单选框按钮组件.</p>
    * 配合UIRadioButtonGroup可实现在任何给定的时刻，都只有一个组成员被选中.</p>
    * 当状态发生变化时调度Event3D.CHANGE.</p>
    * @see egret3d.gui.UIToggleButtonBase
    * @see egret3d.Event3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UIRadioButton extends gui.UIToggleButtonBase {
        private _group: UIRadioButtonGroup;
        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
        }


        /**
        * @language zh_CN
        * @param group 此 UIRadioButton 所属的 UIRadioButtonGroup 对象。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set group(group: UIRadioButtonGroup) {
            this._group = group;
        }
        /**
        * @private
        */
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