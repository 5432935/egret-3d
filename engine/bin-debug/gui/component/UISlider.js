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
        * @class egret3d.gui.UISlider
        * @classdesc
        * 通过使用 Slider 组件，用户可以在滑块轨道的端点之间移动滑块来选择值。 </p>
        * Slider 组件的当前值由滑块端点之间滑块的相对位置确定，端点对应于 Slider 组件的 minimum 和 maximum 值。
        * 组件样式名为background以及 bar 分别用来设置底部背景条以及顶部的样式
        * @version Egret 3.0
        * @platform Web,Native
        */
        var UISlider = (function (_super) {
            __extends(UISlider, _super);
            /**
            * @language zh_CN
            * 构造函数
            * @version Egret 3.0
            * @platform Web,Native
            */
            function UISlider() {
                var _this = _super.call(this) || this;
                _this._background = new egret3d.Quad();
                _this._bar = new egret3d.Quad();
                _this._text = new gui.UITextField(gui.UITextFieldType.DYNAMIC);
                _this._text.autoSize = gui.UITextFieldAutoSize.CENTER;
                _this._text.textColor = 0xff000000;
                _this.addChild(_this._background);
                _this.addChild(_this._bar);
                _this.addChild(_this._text);
                //            this._background.color = 0xff00ffff;
                //            this._bar.color = 0xffff00ff;
                _this._minimum = 0;
                _this._maximum = 100;
                _this._snapInterval = 10;
                _this.value = 50;
                _this.addEventListener(egret3d.MouseEvent3D.MOUSE_DOWN, _this.onMouseDown, _this);
                _this.drawTexture();
                return _this;
            }
            /**
            * @language zh_CN
            * 设置皮肤
            * @param style 皮肤名称, 可选值: background, bar.
            * @param value 皮肤贴图
            * @version Egret 3.0
            * @platform Web,Native
            */
            UISlider.prototype.setStyle = function (style, value) {
                _super.prototype.setStyle.call(this, style, value);
                this.drawTexture();
                //            if (style === "bar") {
                //                this._bar.texture = value;
                //            } else if (style === "background") {
                //                this._background.texture = value;
                //            }
                this.onRender();
            };
            /**
            * @private
            */
            UISlider.prototype.drawTexture = function () {
                this._bar.texture = this.getStyle("bar");
                this._background.texture = this.getStyle("background");
            };
            /**
            * @private
            */
            UISlider.prototype.getDefaultStyleNameByStyleName = function (styleName) {
                var obj = {
                    "bar": gui.DefaultSkinName.DEFAULT_SLIDER_BAR,
                    "background": gui.DefaultSkinName.DEFAULT_SLIDER_BACKGROUND
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
            UISlider.prototype.onMouseUp = function (event) {
                this.removeEventListener(egret3d.MouseEvent3D.MOUSE_MOVE, this.onMouseMove, this);
                this.removeEventListener(egret3d.MouseEvent3D.MOUSE_UP, this.onMouseUp, this);
            };
            /**
            * @private
            */
            UISlider.prototype.onMouseDown = function (event) {
                this.addEventListener(egret3d.MouseEvent3D.MOUSE_MOVE, this.onMouseMove, this);
                //            this.addEventListener(MouseEvent3D.MOUSE_UP, this.onMouseUp, this);
                if (this.stage) {
                    this.stage.addEventListener(egret3d.MouseEvent3D.MOUSE_UP, this.onMouseUp, this);
                }
                var cx = this.mouseX;
                this.value = cx / this._background.width * (this._maximum - this._minimum) + this._minimum;
            };
            /**
            * @private
            */
            UISlider.prototype.updateBar = function () {
                var ratio = Math.abs((this._value - this._minimum) / (this._maximum - this._minimum));
                this._bar.width = this._background.width * ratio;
                this._text.text = this.value.toString();
            };
            Object.defineProperty(UISlider.prototype, "snapInterval", {
                /**
                * @language zh_CN
                * 获取或设置用户移动滑块时值增加或减小的量。
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._snapInterval;
                },
                /**
              * @language zh_CN
              * 获取或设置用户移动滑块时值增加或减小的量。
              * @version Egret 3.0
              * @platform Web,Native
              */
                set: function (value) {
                    this._snapInterval = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UISlider.prototype, "value", {
                /**
                * @language zh_CN
                * 获取或设置 Slider 组件的当前值。
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._value;
                },
                /**
                * @language zh_CN
                * 获取或设置 Slider 组件的当前值。
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (value) {
                    if (value % this._snapInterval !== 0) {
                        value = Math.round(value / this._snapInterval) * this._snapInterval;
                    }
                    if (this._value === value)
                        return;
                    this._value = value;
                    var event = new egret3d.Event3D(egret3d.Event3D.CHANGE);
                    this.dispatchEvent(event);
                    this.updateBar();
                },
                enumerable: true,
                configurable: true
            });
            /**
            * @private
            */
            UISlider.prototype.onMouseMove = function (event) {
                var cx = this.mouseX;
                this.value = cx / this._background.width * (this._maximum - this._minimum) + this._minimum;
            };
            Object.defineProperty(UISlider.prototype, "maximum", {
                /**
               * @language zh_CN
               * Slider 组件实例所允许的最大值。
               * @version Egret 3.0
               * @platform Web,Native
               */
                get: function () {
                    return this._maximum;
                },
                /**
                * @language zh_CN
                * Slider 组件实例所允许的最大值。
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (value) {
                    this._maximum = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UISlider.prototype, "minimum", {
                /**
                * @language zh_CN
                * Slider 组件实例所允许的最小值。
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._minimum;
                },
                /**
                * @language zh_CN
                * Slider 组件实例所允许的最小值。
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (value) {
                    this._minimum = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UISlider.prototype, "width", {
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
                    this._background.width = this._text.width = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UISlider.prototype, "height", {
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
                    this._background.height = this._text.height = this._bar.height = value;
                },
                enumerable: true,
                configurable: true
            });
            return UISlider;
        }(gui.UIElement));
        gui.UISlider = UISlider;
        __reflect(UISlider.prototype, "egret3d.gui.UISlider");
    })(gui = egret3d.gui || (egret3d.gui = {}));
})(egret3d || (egret3d = {}));
