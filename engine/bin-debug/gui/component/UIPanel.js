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
   * @class egret3d.gui.UIPanel
   * @classdesc
   * 基础的面板组件. 内含背景图片,以及矩形显示区域限制
   * @version Egret 3.0
   * @platform Web,Native
   */
        var UIPanel = (function (_super) {
            __extends(UIPanel, _super);
            /**
            * @language zh_CN
            * 构造函数
            * @version Egret 3.0
            * @platform Web,Native
            */
            function UIPanel() {
                var _this = _super.call(this) || this;
                _this._background = new egret3d.Quad();
                _this._container = new gui.UIElement();
                _super.prototype.addChild.call(_this, _this._background);
                _super.prototype.addChild.call(_this, _this._container);
                _this._w = 100;
                _this._h = 100;
                _this.drawBackground();
                _this.updateMask();
                return _this;
            }
            /**
            * @private
            */
            UIPanel.prototype.updateMask = function () {
                this.mask = new egret3d.Rectangle(0, 0, this._w, this._h);
            };
            Object.defineProperty(UIPanel.prototype, "background", {
                /**
                * @private
                */
                get: function () {
                    return this._background;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UIPanel.prototype, "width", {
                /**
                * @language zh_CN
                * 获取或设置组件的高度（以像素为单位）。
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._w;
                },
                /**
                * @language zh_CN
                * 获取或设置组件的高度（以像素为单位）。
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (value) {
                    this._w = value;
                    this._background.width = value;
                    this.updateMask();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UIPanel.prototype, "height", {
                /**
                * @language zh_CN
                * 获取或设置组件的高度（以像素为单位）。
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._h;
                },
                /**
                * @language zh_CN
                * 获取或设置组件的高度（以像素为单位）。
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (value) {
                    this._h = value;
                    this._background.height = value;
                    this.updateMask();
                },
                enumerable: true,
                configurable: true
            });
            /**
            * @private
            */
            UIPanel.prototype.onRender = function () {
                _super.prototype.onRender.call(this);
                this.drawBackground();
                this.updateMask();
            };
            /**
            * @private
            */
            UIPanel.prototype.getDefaultStyleNameByStyleName = function (styleName) {
                var obj = {
                    "background": gui.DefaultSkinName.DEFAULT_PANEL_BACKGROUND
                };
                var result = obj[styleName];
                if (!result) {
                    console.log(" ERROR!!! UIPanel can't find default style : ", styleName);
                }
                return result;
            };
            /**
            * @private
            */
            UIPanel.prototype.drawBackground = function () {
                var texture = this.getStyle("background");
                this._background.texture = texture;
            };
            /**
           * @language zh_CN
           * 检索组件的样式查找链中设置的样式属性。
           * @param style 样式属性的名称。 可选值:background.
           * @version Egret 3.0
           * @platform Web,Native
           */
            UIPanel.prototype.setStyle = function (style, value) {
                _super.prototype.setStyle.call(this, style, value);
                this.onRender();
            };
            /**
            * @private
            */
            UIPanel.prototype.addChild = function (display) {
                return this._container.addChild(display);
            };
            /**
            * @private
            */
            UIPanel.prototype.addChildAt = function (display, index) {
                return this._container.addChildAt(display, index);
            };
            /**
            * @private
            */
            UIPanel.prototype.removeChild = function (display) {
                return this._container.removeChild(display);
            };
            /**
            * @private
            */
            UIPanel.prototype.removeChildAt = function (index) {
                return this._container.removeChildAt(index);
            };
            /**
            * @private
            */
            UIPanel.prototype.swapChildIndex = function (display, index) {
                this._container.swapChildIndex(display, index);
            };
            /**
            * @private
            */
            UIPanel.prototype.hasChild = function (display) {
                return this._container.hasChild(display);
            };
            /**
            * @private
            */
            UIPanel.prototype.getChildByIndex = function (index) {
                return this._container.getChildByIndex(index);
            };
            /**
            * @private
            */
            UIPanel.prototype.getChildByName = function (name) {
                return this._container.getChildByName(name);
            };
            return UIPanel;
        }(gui.UIElement));
        gui.UIPanel = UIPanel;
        __reflect(UIPanel.prototype, "egret3d.gui.UIPanel");
    })(gui = egret3d.gui || (egret3d.gui = {}));
})(egret3d || (egret3d = {}));
//# sourceMappingURL=UIPanel.js.map