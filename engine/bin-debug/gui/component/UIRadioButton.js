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
        var UIRadioButton = (function (_super) {
            __extends(UIRadioButton, _super);
            /**
            * @language zh_CN
            * 构造函数
            * @version Egret 3.0
            * @platform Web,Native
            */
            function UIRadioButton() {
                return _super.call(this) || this;
            }
            Object.defineProperty(UIRadioButton.prototype, "group", {
                /**
                * @language zh_CN
                * @param group 此 UIRadioButton 所属的 UIRadioButtonGroup 对象。
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (group) {
                    this._group = group;
                },
                enumerable: true,
                configurable: true
            });
            /**
            * @private
            */
            UIRadioButton.prototype.getDefaultStyleNameByStyleName = function (styleName) {
                var obj = {
                    "down": gui.DefaultSkinName.DEFAULT_RADIO_BUTTON_DOWN,
                    "up": gui.DefaultSkinName.DEFAULT_RADIO_BUTTON_UP,
                    "downAndSelected": gui.DefaultSkinName.DEFAULT_RADIO_BUTTON_SELECTED_DOWN,
                    "upAndSelected": gui.DefaultSkinName.DEFAULT_RADIO_BUTTON_SELECTED_UP,
                    "disable": gui.DefaultSkinName.DEFAULT_RADIO_BUTTON_DISABLE
                };
                var result = obj[styleName];
                if (!result) {
                    console.log(" ERROR!!! UIRadioButton can't find default style : ", styleName);
                }
                return result;
            };
            return UIRadioButton;
        }(gui.UIToggleButtonBase));
        gui.UIRadioButton = UIRadioButton;
        __reflect(UIRadioButton.prototype, "egret3d.gui.UIRadioButton");
    })(gui = egret3d.gui || (egret3d.gui = {}));
})(egret3d || (egret3d = {}));
