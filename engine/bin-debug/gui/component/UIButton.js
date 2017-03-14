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
        * @class egret3d.gui.UIButton
        * @classdesc
        * 常用的矩形按钮组件.</p>
        * 仅包含图片皮肤.如果要使用文本.请使用UILabelButton组件.</p>
        * 可响应鼠标事件;
        * @see egret3d.MouseEvent3D
        * @see egret3d.gui.UILabelButton
        * 示例:
        * @includeExample gui/component/UIButton.ts
        * @version Egret 3.0
        * @platform Web,Native
        */
        var UIButton = (function (_super) {
            __extends(UIButton, _super);
            /**
            * @language zh_CN
            * 构造函数
            * @version Egret 3.0
            * @platform Web,Native
            */
            function UIButton() {
                var _this = _super.call(this) || this;
                _this._skin = new egret3d.Quad();
                _this.addChild(_this._skin);
                _this._state = UIButton.STATE_UP;
                _this._enable = true;
                _this._isDowning = false;
                _this.addEventListener(egret3d.MouseEvent3D.MOUSE_DOWN, _this.mouseEventHandler, _this);
                _this.addEventListener(egret3d.MouseEvent3D.MOUSE_OUT, _this.mouseEventHandler, _this);
                _this.addEventListener(egret3d.MouseEvent3D.MOUSE_OVER, _this.mouseEventHandler, _this);
                _this.drawBackground();
                return _this;
            }
            /**
           * @private
           */
            UIButton.prototype.getDefaultStyleNameByStyleName = function (styleName) {
                var obj = {
                    "down": gui.DefaultSkinName.DEFAULT_BUTTON_DOWN,
                    "up": gui.DefaultSkinName.DEFAULT_BUTTON_UP,
                    "over": gui.DefaultSkinName.DEFAULT_BUTTON_OVER,
                    "disable": gui.DefaultSkinName.DEFAULT_BUTTON_DISABLE
                };
                var result = obj[styleName];
                if (!result) {
                    console.log(" ERROR!!! UIButton can't find default style : ", styleName);
                }
                return result;
            };
            Object.defineProperty(UIButton.prototype, "width", {
                /**
                * @language zh_CN
                * 获取或设置组件的宽度（以像素为单位）。
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._skin.width;
                },
                /**
                * @language zh_CN
                * 获取或设置组件的宽度（以像素为单位）。
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (value) {
                    this._skin.width = value;
                    this.onRender();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UIButton.prototype, "height", {
                /**
                * @language zh_CN
                * 获取或设置组件的高度（以像素为单位）。
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._skin.height;
                },
                /**
                * @language zh_CN
                * 获取或设置组件的高度（以像素为单位）。
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (value) {
                    this._skin.height = value;
                    this.onRender();
                },
                enumerable: true,
                configurable: true
            });
            /**
           * @language zh_CN
           * 设置皮肤
           * @param style 皮肤名称, 可选值:down, up, over, disable.
           * @param value 皮肤贴图
           * @version Egret 3.0
           * @platform Web,Native
           */
            UIButton.prototype.setStyle = function (style, value) {
                _super.prototype.setStyle.call(this, style, value);
                this.onRender();
            };
            /**
           * @private
           */
            UIButton.prototype.mouseEventHandler = function (event) {
                if (!this._enable)
                    return;
                if (event.eventType === egret3d.MouseEvent3D.MOUSE_DOWN) {
                    this.startPress();
                }
                else if (event.eventType === egret3d.MouseEvent3D.MOUSE_UP) {
                    this.endPress();
                }
                else if (event.eventType === egret3d.MouseEvent3D.MOUSE_OUT) {
                    this.mouseOut();
                }
                else if (event.eventType === egret3d.MouseEvent3D.MOUSE_OVER) {
                }
            };
            /**
           * @private
           */
            UIButton.prototype.mouseOut = function () {
                this.setMouseState(UIButton.STATE_UP);
            };
            /**
           * @private
           */
            UIButton.prototype.mouseOver = function () {
                if (this._isDowning) {
                    this.setMouseState(UIButton.STATE_DOWN);
                }
                else {
                    this.setMouseState(UIButton.STATE_OVER);
                }
            };
            /**
           * @private
           */
            UIButton.prototype.startPress = function () {
                this.addEventListener(egret3d.MouseEvent3D.MOUSE_UP, this.mouseEventHandler, this);
                if (this.stage) {
                    this.stage.addEventListener(egret3d.MouseEvent3D.MOUSE_UP, this.onStageEnd, this);
                }
                this._isDowning = true;
                this.setMouseState(UIButton.STATE_DOWN);
            };
            /**
           * @private
           */
            UIButton.prototype.onStageEnd = function (event) {
                if (this.stage) {
                    this.stage.removeEventListener(egret3d.MouseEvent3D.MOUSE_UP, this.onStageEnd, this);
                }
                this.removeEventListener(egret3d.MouseEvent3D.MOUSE_UP, this.mouseEventHandler, this);
                this.setMouseState(UIButton.STATE_UP);
                this._isDowning = false;
            };
            /**
           * @private
           */
            UIButton.prototype.endPress = function () {
                this.setMouseState(UIButton.STATE_UP);
                this._isDowning = false;
                if (this.stage) {
                    this.stage.removeEventListener(egret3d.MouseEvent3D.MOUSE_UP, this.onStageEnd, this);
                }
                this.removeEventListener(egret3d.MouseEvent3D.MOUSE_UP, this.mouseEventHandler, this);
            };
            Object.defineProperty(UIButton.prototype, "enable", {
                /**
               * @language zh_CN
               * 是否可用.默认为true. 当设置为false时.将不响应鼠标输入事件
               * @version Egret 3.0
               * @platform Web,Native
               */
                get: function () {
                    return this._enable;
                },
                set: function (value) {
                    this._enable = value;
                    this.mouseEnable = value;
                },
                enumerable: true,
                configurable: true
            });
            /**
           * @private
           */
            UIButton.prototype.setMouseState = function (state) {
                if (this._state === state) {
                    return;
                }
                this._state = state;
                this.onRender();
            };
            /**
           * @private
           */
            UIButton.prototype.onRender = function () {
                this.drawBackground();
            };
            /**
           * @private
           */
            UIButton.prototype.drawBackground = function () {
                var skin = this.enable ? this.getStyle(this._state) : this.getStyle(UIButton.STATE_DISABLE);
                this._skin.texture = skin;
            };
            return UIButton;
        }(gui.UIElement));
        UIButton.STATE_DOWN = "down";
        UIButton.STATE_UP = "up";
        UIButton.STATE_OVER = "over";
        UIButton.STATE_DISABLE = "disable";
        gui.UIButton = UIButton;
        __reflect(UIButton.prototype, "egret3d.gui.UIButton");
    })(gui = egret3d.gui || (egret3d.gui = {}));
})(egret3d || (egret3d = {}));
