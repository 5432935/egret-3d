var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var egret3d;
(function (egret3d) {
    var gui;
    (function (gui) {
        /**
   * @class egret3d.gui.UICheckBox
   * @classdesc
   * 组件显示一个小方框，该方框内可以有选中标记。 </p>
   * UICheckBox 组件还可以显示可选的文本标签。
   * @see egret3d.gui.UIToggleButtonBase
   * @see egret3d.MouseEvent3D
   * @version Egret 3.0
   * @platform Web,Native
   */
        var UICheckBox = (function (_super) {
            __extends(UICheckBox, _super);
            /**
            * @language zh_CN
            * 构造函数
            * @version Egret 3.0
            * @platform Web,Native
            */
            function UICheckBox() {
                return _super.call(this) || this;
            }
            /**
            * @private
            */
            UICheckBox.prototype.getDefaultStyleNameByStyleName = function (styleName) {
                var obj = {
                    "down": gui.DefaultSkinName.DEFAULT_CHECK_BOX_DOWN,
                    "up": gui.DefaultSkinName.DEFAULT_CHECK_BOX_UP,
                    "downAndSelected": gui.DefaultSkinName.DEFAULT_CHECK_BOX_SELECTED_DOWN,
                    "upAndSelected": gui.DefaultSkinName.DEFAULT_CHECK_BOX_SELECTED_UP,
                    "disable": gui.DefaultSkinName.DEFAULT_CHECK_BOX_DISABLE
                };
                var result = obj[styleName];
                if (!result) {
                    console.log(" ERROR!!! UICheckBox can't find default style : ", styleName);
                }
                return result;
            };
            return UICheckBox;
        }(gui.UIToggleButtonBase));
        gui.UICheckBox = UICheckBox;
        __reflect(UICheckBox.prototype, "egret3d.gui.UICheckBox");
    })(gui = egret3d.gui || (egret3d.gui = {}));
})(egret3d || (egret3d = {}));
//# sourceMappingURL=UICheckBox.js.map