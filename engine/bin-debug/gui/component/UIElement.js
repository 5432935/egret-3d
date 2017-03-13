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
        * @class egret3d.gui.UIElement
        * @classdesc
        * 所有可视组件的基类</p>.
        * @version Egret 3.0
        * @platform Web,Native
        */
        var UIElement = (function (_super) {
            __extends(UIElement, _super);
            /**
            * @language zh_CN
            * 构造函数
            * @version Egret 3.0
            * @platform Web,Native
            */
            function UIElement() {
                return _super.call(this) || this;
            }
            /**
            * @private
            */
            UIElement.prototype.onRender = function () {
            };
            /**
            * @private
            */
            UIElement.prototype.onUpdate = function () {
            };
            /**
            * @private
            */
            UIElement.prototype.onEvent = function () {
            };
            /**
            * @language zh_CN
            * 对此组件实例设置样式属性。
            * @param style 样式属性的名称。
            * @param value  样式的值。可由Texture或string, string的值由texturepacker出的配置文件内的文件名得来.
            * @version Egret 3.0
            * @platform Web,Native
            */
            UIElement.prototype.setStyle = function (style, value) {
                if (!this.instanceStyles) {
                    this.instanceStyles = {};
                }
                if (typeof value === "string") {
                    var tex = egret3d.textureResMgr.getTexture(value);
                    if (!tex) {
                        console.log("未找到名为: " + value + " 的资源贴图");
                        return;
                    }
                    else {
                        value = tex;
                    }
                }
                if (this.instanceStyles[style] === value) {
                    return;
                }
                this.instanceStyles[style] = value;
            };
            /**
          * @language zh_CN
          * 检索组件的样式查找链中设置的样式属性。
          * @param style 样式属性的名称。
          * @version Egret 3.0
          * @platform Web,Native
          */
            UIElement.prototype.getStyle = function (style) {
                return this.instanceStyles ? this.instanceStyles[style] : this.getDefaultStyle(style);
            };
            /**
            * @private
            */
            UIElement.prototype.getDefaultStyle = function (style) {
                return gui.GUISkinManager.instance.getDefaultSkin(this.getDefaultStyleNameByStyleName(style));
            };
            /**
             * @private
             * 用于子类重写
            * @version Egret 3.0
            * @platform Web,Native
            */
            UIElement.prototype.getDefaultStyleNameByStyleName = function (styleName) {
                return "";
            };
            /**
            * @private
           * @version Egret 3.0
           * @platform Web,Native
           */
            UIElement.mergeStyles = function () {
                var list = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    list[_i] = arguments[_i];
                }
                var styles = {};
                var l = list.length;
                for (var i = 0; i < l; i++) {
                    var styleList = list[i];
                    for (var n in styleList) {
                        if (styles[n] != null) {
                            continue;
                        }
                        styles[n] = list[i][n];
                    }
                }
                return styles;
            };
            return UIElement;
        }(egret3d.DisplayObject));
        UIElement.defaultStyles = {};
        gui.UIElement = UIElement;
        __reflect(UIElement.prototype, "egret3d.gui.UIElement");
    })(gui = egret3d.gui || (egret3d.gui = {}));
})(egret3d || (egret3d = {}));
//# sourceMappingURL=UIElement.js.map