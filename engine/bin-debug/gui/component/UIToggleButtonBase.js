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
        * @class egret3d.gui.UIToggleButtonBase
        * @classdesc
        * UIToggleButtonBase 组件是支持 selected 属性的按钮组件的基类.</p>
        * UICheckBox 和 UIRadioButton 是 UIToggleButtonBase 的子类.</p>
        * @see egret3d.gui.UIRadioButton.
        * @see egret3d.gui.UICheckBox.
        * @version Egret 3.0
        * @platform Web,Native
        */
        var UIToggleButtonBase = (function (_super) {
            __extends(UIToggleButtonBase, _super);
            /**
            * @language zh_CN
            * 构造函数
            * @version Egret 3.0
            * @platform Web,Native
            */
            function UIToggleButtonBase() {
                var _this = _super.call(this) || this;
                _this._selected = false;
                _this._textPadding = 5;
                _this.textField.autoSize = gui.UITextFieldAutoSize.LEFT;
                _this.textWidth = 45;
                _this.onRender();
                return _this;
            }
            Object.defineProperty(UIToggleButtonBase.prototype, "buttonAndLabelWidth", {
                /**
               * @language zh_CN
               * (只读)获取按钮和文本宽度之和
               * @version Egret 3.0
               * @platform Web,Native
               */
                get: function () {
                    return this._skin.width + this.textPadding + this.textWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UIToggleButtonBase.prototype, "textPadding", {
                /**
               * @language zh_CN
               * 获取或设置按钮和文本的间隔（以像素为单位）。
               * @version Egret 3.0
               * @platform Web,Native
               */
                get: function () {
                    return this._textPadding;
                },
                /**
                * @language zh_CN
                * 获取或设置按钮和文本的间隔（以像素为单位）。
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (value) {
                    this._textPadding = value;
                    this.onRender();
                },
                enumerable: true,
                configurable: true
            });
            /**
            * @private
            */
            UIToggleButtonBase.prototype.onRender = function () {
                _super.prototype.onRender.call(this);
                this.textField.x = this._skin.width + this._textPadding;
            };
            Object.defineProperty(UIToggleButtonBase.prototype, "selected", {
                /**
                * @language zh_CN
                * 获取或设置一个布尔值，指示切换按钮是否已切换至打开或关闭位置。
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._selected;
                },
                /**
                * @language zh_CN
                * 获取或设置一个布尔值，指示切换按钮是否已切换至打开或关闭位置。
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (value) {
                    if (this._selected === value)
                        return;
                    this._selected = value;
                    this._selected ? this.setMouseState(UIToggleButtonBase.STATE_UP_AND_SELECTED) : this.setMouseState(gui.UIButton.STATE_UP);
                    var evt = new egret3d.Event3D(egret3d.Event3D.CHANGE);
                    evt.target = this;
                    this.dispatchEvent(evt);
                },
                enumerable: true,
                configurable: true
            });
            /**
            * @private
            */
            UIToggleButtonBase.prototype.setMouseState = function (state) {
                if (state === gui.UIButton.STATE_DOWN) {
                    this._selected ? _super.prototype.setMouseState.call(this, UIToggleButtonBase.STATE_DOWN_AND_SELECTED) : _super.prototype.setMouseState.call(this, gui.UIButton.STATE_DOWN);
                }
                else if (state === gui.UIButton.STATE_UP) {
                    this._selected ? _super.prototype.setMouseState.call(this, UIToggleButtonBase.STATE_UP_AND_SELECTED) : _super.prototype.setMouseState.call(this, gui.UIButton.STATE_UP);
                }
                else {
                    _super.prototype.setMouseState.call(this, state);
                }
            };
            /**
            * @private
            */
            UIToggleButtonBase.prototype.startPress = function () {
                _super.prototype.startPress.call(this);
                this._selected ? this.setMouseState(UIToggleButtonBase.STATE_DOWN_AND_SELECTED) : this.setMouseState(gui.UIButton.STATE_DOWN);
            };
            /**
            * @private
            */
            UIToggleButtonBase.prototype.endPress = function () {
                _super.prototype.endPress.call(this);
                this.selected = !this.selected;
                this._selected ? this.setMouseState(UIToggleButtonBase.STATE_UP_AND_SELECTED) : this.setMouseState(gui.UIButton.STATE_UP);
            };
            return UIToggleButtonBase;
        }(gui.UILabelButton));
        UIToggleButtonBase.STATE_DOWN_AND_SELECTED = "downAndSelected";
        UIToggleButtonBase.STATE_UP_AND_SELECTED = "upAndSelected";
        gui.UIToggleButtonBase = UIToggleButtonBase;
        __reflect(UIToggleButtonBase.prototype, "egret3d.gui.UIToggleButtonBase");
    })(gui = egret3d.gui || (egret3d.gui = {}));
})(egret3d || (egret3d = {}));
