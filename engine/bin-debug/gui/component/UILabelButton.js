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
   * @class egret3d.gui.UILabelButton
   * @classdesc
   * 含文本组件的按钮, 用于在按钮上显示文字
   * @see egret3d.MouseEvent3D
   * @see egret3d.gui.UIButton
   * @version Egret 3.0
   * @platform Web,Native
   */
        var UILabelButton = (function (_super) {
            __extends(UILabelButton, _super);
            /**
            * @language zh_CN
            * 构造函数
            * @version Egret 3.0
            * @platform Web,Native
            */
            function UILabelButton() {
                var _this = _super.call(this) || this;
                _this._label = "";
                _this._textField = new gui.UITextField();
                _this._textField.autoSize = gui.UITextFieldAutoSize.CENTER;
                _this._textField.textColor = 0xff000000;
                _this.addChild(_this._textField);
                _this.onRender();
                _this._textHeight = -1;
                _this._textWidth = -1;
                return _this;
            }
            /**
           * @private
           */
            UILabelButton.prototype.getDefaultStyleNameByStyleName = function (styleName) {
                var obj = {
                    "down": gui.DefaultSkinName.DEFAULT_LABE_BUTTON_DOWN,
                    "up": gui.DefaultSkinName.DEFAULT_LABEL_BUTTON_UP,
                    "disable": gui.DefaultSkinName.DEFAULT_LABE_BUTTON_DISABLE
                };
                var result = obj[styleName];
                if (!result) {
                    console.log(" ERROR!!! UILabelButton can't find default style : ", styleName);
                }
                return result;
            };
            Object.defineProperty(UILabelButton.prototype, "textHeight", {
                /**
               * @private
               */
                get: function () {
                    return this._textHeight;
                },
                /**
               * @private
               */
                set: function (value) {
                    this._textHeight = value;
                    this.onRender();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UILabelButton.prototype, "textWidth", {
                /**
               * @private
               */
                get: function () {
                    return this._textWidth;
                },
                /**
               * @private
               */
                set: function (value) {
                    this._textWidth = value;
                    this.onRender();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UILabelButton.prototype, "textField", {
                /**
               * @language zh_CN
               * 获取按钮内的文本组件。
               * @version Egret 3.0
               * @platform Web,Native
               */
                get: function () {
                    return this._textField;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UILabelButton.prototype, "label", {
                /**
               * @language zh_CN
               * 获取或设置组件的文本标签。
               * @version Egret 3.0
               * @platform Web,Native
               */
                get: function () {
                    return this._label;
                },
                /**
                * @language zh_CN
                * 获取或设置组件的文本标签。
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (value) {
                    this._label = value;
                    this._textField.text = this._label;
                },
                enumerable: true,
                configurable: true
            });
            /**
            * @private
            */
            UILabelButton.prototype.onRender = function () {
                _super.prototype.onRender.call(this);
                if (this._textHeight > 0) {
                    this.textField.textHeight = this._textHeight;
                }
                else {
                    this._textField.height = this._skin.height;
                }
                if (this._textWidth > 0) {
                    this.textField.textWidth = this._textWidth;
                }
                else {
                    this._textField.width = this._skin.width;
                }
            };
            return UILabelButton;
        }(gui.UIButton));
        gui.UILabelButton = UILabelButton;
        __reflect(UILabelButton.prototype, "egret3d.gui.UILabelButton");
    })(gui = egret3d.gui || (egret3d.gui = {}));
})(egret3d || (egret3d = {}));
