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
   * @class egret3d.gui.UIProgressBar
   * @classdesc
   * 基础的进度条组件.</p>
   * 由底部背景条以及顶部的进度条组成.</p>
   * 组件样式名为background以及 bar 分别用来设置底部背景条以及顶部进度条的样式
   * @version Egret 3.0
   * @platform Web,Native
   */
        var UIProgressBar = (function (_super) {
            __extends(UIProgressBar, _super);
            /**
            * @language zh_CN
            * 构造函数
            * @version Egret 3.0
            * @platform Web,Native
            */
            function UIProgressBar() {
                var _this = _super.call(this) || this;
                _this._mask = new egret3d.Rectangle();
                _this._background = new egret3d.Quad();
                _this.addChild(_this._background);
                _this._bar = new egret3d.Quad();
                _this.addChild(_this._bar);
                _this._ratio = 0.5;
                _this.updateStyle();
                return _this;
            }
            Object.defineProperty(UIProgressBar.prototype, "ratio", {
                /**
               * @language zh_CN
               * 进度条的比例.</p>
               * 取值范围为0-1,即进度条由空到填满</p>
               * 小于0 取0, 大于1 取1
               * @version Egret 3.0
               * @platform Web,Native
               */
                get: function () {
                    return this._ratio;
                },
                /**
               * @language zh_CN
               * 进度条的比例.</p>
               * 取值范围为0-1,即进度条由空到填满</p>
               * 小于0 取0, 大于1 取1
               * @version Egret 3.0
               * @platform Web,Native
               */
                set: function (value) {
                    if (value > 1) {
                        value = 1;
                    }
                    else if (value < 0) {
                        value = 0;
                    }
                    this._ratio = value;
                    this.updateBar();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UIProgressBar.prototype, "width", {
                /**
                * @language zh_CN
                * 获取或设置组件的宽度（以像素为单位）。
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._background.width;
                },
                /**
                * @language zh_CN
                * 获取或设置组件的宽度（以像素为单位）。
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (value) {
                    this._background.width = this._bar.width = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UIProgressBar.prototype, "height", {
                /**
                * @language zh_CN
                * 获取或设置组件的高度（以像素为单位）。
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._background.height;
                },
                /**
                * @language zh_CN
                * 获取或设置组件的高度（以像素为单位）。
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (value) {
                    this._background.height = this._bar.height = value;
                },
                enumerable: true,
                configurable: true
            });
            /**
            * @private
            */
            UIProgressBar.prototype.setBarRect = function (x, y, w, h) {
                this._bar.x = x;
                this._bar.y = y;
                this._bar.width = w;
                this._bar.height = h;
            };
            Object.defineProperty(UIProgressBar.prototype, "bar", {
                /**
                * @language zh_CN
                * 获取进度条的显示对象.
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._bar;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UIProgressBar.prototype, "background", {
                /**
                * @language zh_CN
                * 获取背景的显示对象.
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._background;
                },
                enumerable: true,
                configurable: true
            });
            /**
            * @private
            */
            UIProgressBar.prototype.updateBar = function () {
                this._mask.width = this._ratio * this._bar.width;
                this._mask.height = this._bar.height;
                this._bar.mask = this._mask;
            };
            /**
           * @language zh_CN
           * 检索组件的样式查找链中设置的样式属性。
           * @param style 样式属性的名称。 可选值:bar, background.
           * @version Egret 3.0
           * @platform Web,Native
           */
            UIProgressBar.prototype.setStyle = function (style, value) {
                _super.prototype.setStyle.call(this, style, value);
                this.updateStyle();
                this.updateBar();
            };
            /**
            * @private
            */
            UIProgressBar.prototype.getDefaultStyleNameByStyleName = function (styleName) {
                var obj = {
                    "bar": gui.DefaultSkinName.DEFAULT_PROGRESS_BAR,
                    "background": gui.DefaultSkinName.DEFAULT_PROGRESS_BAR_BACKGROUND
                };
                var result = obj[styleName];
                if (!result) {
                    console.log(" ERROR!!! UISlider can't find default style : ", styleName);
                }
                return result;
            };
            /**
            * @private
            */
            UIProgressBar.prototype.updateStyle = function () {
                this._background.texture = this.getStyle("background");
                this._bar.texture = this.getStyle("bar");
            };
            return UIProgressBar;
        }(gui.UIElement));
        gui.UIProgressBar = UIProgressBar;
        __reflect(UIProgressBar.prototype, "egret3d.gui.UIProgressBar");
    })(gui = egret3d.gui || (egret3d.gui = {}));
})(egret3d || (egret3d = {}));
