module egret3d.gui {
         /**
    * @class egret3d.gui.UICheckBox
    * @classdesc
    * 组件显示一个小方框，该方框内可以有选中标记。 </p>
    * UICheckBox 组件还可以显示可选的文本标签。
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UICheckBox extends UIToggleButtonBase {
        constructor() {
            super();

        }


        protected getDefaultStyleNameByStyleName(styleName: string): string {
            var obj = {
                "down": DefaultSkinName.DEFAULT_CHECK_BOX_DOWN,
                "up": DefaultSkinName.DEFAULT_CHECK_BOX_UP,
                "downAndSelected": DefaultSkinName.DEFAULT_CHECK_BOX_SELECTED_DOWN,
                "upAndSelected": DefaultSkinName.DEFAULT_CHECK_BOX_SELECTED_UP,
                "disable": DefaultSkinName.DEFAULT_CHECK_BOX_DISABLE
            };

            var result: string = obj[styleName];
            if (!result) {
                console.log(" ERROR!!! UICheckBox can't find default style : ", styleName);
            }
            return result;
        }



    }
}