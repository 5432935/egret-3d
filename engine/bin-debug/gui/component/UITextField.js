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
        * @class egret3d.gui.UITextFieldAutoSize
        * @classdesc
        * 设置 UITextField 类的 autoSize 属性时使用的常量值的枚举
        * @see egret3d.gui.UITextField
        * @version Egret 3.0
        * @platform Web,Native
        */
        var UITextFieldAutoSize;
        (function (UITextFieldAutoSize) {
            /**
            * @language zh_CN
            * 指定不调整大小。
            * @version Egret 3.0
            * @platform Web,Native
            */
            UITextFieldAutoSize[UITextFieldAutoSize["NONE"] = 0] = "NONE";
            /**
            * @language zh_CN
            * 指定将文本视为左对齐文本，即文本字段的左侧固定不变，只在右侧调整单行的大小。
            * @version Egret 3.0
            * @platform Web,Native
            */
            UITextFieldAutoSize[UITextFieldAutoSize["LEFT"] = 1] = "LEFT";
            /**
            * @language zh_CN
            * 指定将文本视为右对齐文本，即文本字段的右侧固定不变，只在左侧调整单行的大小
            * @version Egret 3.0
            * @platform Web,Native
            */
            UITextFieldAutoSize[UITextFieldAutoSize["RIGHT"] = 2] = "RIGHT";
            /**
            * @language zh_CN
            * 指定将文本视为居中对齐文本。
            * @version Egret 3.0
            * @platform Web,Native
            */
            UITextFieldAutoSize[UITextFieldAutoSize["CENTER"] = 3] = "CENTER";
        })(UITextFieldAutoSize = gui.UITextFieldAutoSize || (gui.UITextFieldAutoSize = {}));
        /**
       * @class egret3d.gui.UITextFieldType
       * @classdesc
       * 设置 UITextField 类的 type 属性时使用的常量值的枚举
       * @see egret3d.gui.UITextField
       * @version Egret 3.0
       * @platform Web,Native
       */
        var UITextFieldType;
        (function (UITextFieldType) {
            /**
            * @language zh_CN
            * 用户无法编辑的动态文本字段
            * @version Egret 3.0
            * @platform Web,Native
            */
            UITextFieldType[UITextFieldType["DYNAMIC"] = 0] = "DYNAMIC";
            /**
            * @language zh_CN
            * 用户可以编辑的输入文本字段。
            * @version Egret 3.0
            * @platform Web,Native
            */
            UITextFieldType[UITextFieldType["INPUT"] = 1] = "INPUT";
        })(UITextFieldType = gui.UITextFieldType || (gui.UITextFieldType = {}));
        /**
        * @private
        */
        var TextLineInfo = (function () {
            function TextLineInfo() {
            }
            return TextLineInfo;
        }());
        __reflect(TextLineInfo.prototype, "TextLineInfo");
        /**
        * @private
        * @class egret3d.gui.UITextFormatAlign
        * @classdesc
        * UITextFormatAlign 类为 UITextFormat 类中的文本对齐方式提供值。
        * @see egret3d.gui.UITextFormat
        * @version Egret 3.0
        * @platform Web,Native
        */
        var UITextFormatAlign;
        (function (UITextFormatAlign) {
            /**
            * @language zh_CN
            * 在文本字段内将文本居中对齐。
            * @version Egret 3.0
            * @platform Web,Native
            */
            UITextFormatAlign[UITextFormatAlign["CENTER"] = 0] = "CENTER";
            /**
            * @language zh_CN
            * 在文本字段内将文本两端对齐。
            * @version Egret 3.0
            * @platform Web,Native
            */
            UITextFormatAlign[UITextFormatAlign["JUSTIFY"] = 1] = "JUSTIFY";
            /**
            * @language zh_CN
            * 在文本字段内将文本左对齐。
            * @version Egret 3.0
            * @platform Web,Native
            */
            UITextFormatAlign[UITextFormatAlign["LEFT"] = 2] = "LEFT";
            /**
            * @language zh_CN
            * 在文本字段内将文本右对齐。
            * @version Egret 3.0
            * @platform Web,Native
            */
            UITextFormatAlign[UITextFormatAlign["RIGHT"] = 3] = "RIGHT";
        })(UITextFormatAlign = gui.UITextFormatAlign || (gui.UITextFormatAlign = {}));
        /**
    * @private
    * @class egret3d.gui.UITextFormat
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    */
        var UITextFormat = (function () {
            function UITextFormat() {
            }
            return UITextFormat;
        }());
        gui.UITextFormat = UITextFormat;
        __reflect(UITextFormat.prototype, "egret3d.gui.UITextFormat");
        /**
    * @private
    * @class egret3d.gui.UITextField
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    */
        var UITextField = (function (_super) {
            __extends(UITextField, _super);
            /**
            * @language zh_CN
            * 构造函数
            * @param textFieldType 文本类型，参照egret3d.UITextFieldType
            * @version Egret 3.0
            * @platform Web,Native
            */
            function UITextField(textFieldType) {
                if (textFieldType === void 0) { textFieldType = UITextFieldType.DYNAMIC; }
                var _this = _super.call(this) || this;
                _this._textLineInfo = [];
                _this._text = "";
                _this._maxChars = 0;
                _this._restrict = "";
                _this._textWidth = 0;
                _this._textLine = [];
                _this._quadPool = [];
                _this._textHeight = 0;
                _this._fontQuadLine = [];
                _this._multiline = false;
                _this._selectable = false;
                _this._type = textFieldType;
                _this._textColor = 0x00cc00;
                _this._selectionEndIndex = -1;
                _this._selectionBeginIndex = -1;
                _this._displayAsPassword = false;
                _this._autoSize = UITextFieldAutoSize.LEFT;
                _this._fontQuadPanel = new egret3d.DisplayObject();
                _this._blankQuad = _this.createFontQuad("b".charCodeAt(0), false);
                if (!UITextField.sharedHTMLInputElement) {
                    UITextField.sharedHTMLInputElement = document.createElement("input");
                    UITextField.sharedHTMLInputElement.style.width = _this.width + "px";
                    UITextField.sharedHTMLInputElement.style.height = _this.height + "px";
                    UITextField.sharedHTMLInputElement.hidden = true;
                    UITextField.sharedHTMLInputElement.style.color = "#00ff00";
                    UITextField.sharedHTMLInputElement.style.border = "0px";
                    UITextField.sharedHTMLInputElement.style.backgroundColor = "transparent";
                    document.getElementById("egret3D").parentElement.appendChild(UITextField.sharedHTMLInputElement);
                }
                if (!UITextField.sharedHTMLTextAreaElement) {
                    UITextField.sharedHTMLTextAreaElement = document.createElement("textarea");
                    UITextField.sharedHTMLTextAreaElement.style.width = _this.width + "px";
                    UITextField.sharedHTMLTextAreaElement.style.height = _this.height + "px";
                    UITextField.sharedHTMLTextAreaElement.hidden = true;
                    UITextField.sharedHTMLTextAreaElement.style.color = "#00ff00";
                    UITextField.sharedHTMLTextAreaElement.style.paddingLeft = "0px";
                    UITextField.sharedHTMLTextAreaElement.style.paddingTop = "0px";
                    UITextField.sharedHTMLTextAreaElement.style.margin = "0px";
                    UITextField.sharedHTMLTextAreaElement.style.backgroundColor = "transparent";
                    document.getElementById("egret3D").parentElement.appendChild(UITextField.sharedHTMLTextAreaElement);
                }
                _this._bgQuad = new egret3d.Quad();
                if (UITextFieldType.INPUT == _this._type) {
                    _this._bgQuad.mouseEnable = true;
                    _this._bgQuad.width = _this.width;
                    _this._bgQuad.height = _this.height;
                    _this.addChild(_this._bgQuad);
                    _this._bgQuad.addEventListener(egret3d.TouchEvent3D.TOUCH_START, _this.onShowInputAgent, _this);
                    _this._bgQuad.addEventListener(egret3d.MouseEvent3D.MOUSE_CLICK, _this.onShowInputAgent, _this);
                }
                _this.width = 100;
                _this.height = 20;
                _this.addChild(_this._fontQuadPanel);
                return _this;
            }
            /**
            * @private
            */
            UITextField.prototype.onShowInputAgent = function (e) {
                var _this = this;
                if (this._multiline) {
                    UITextField.sharedHTMLTextAreaElement.hidden = false;
                    UITextField.sharedHTMLTextAreaElement.style.position = "absolute";
                    UITextField.sharedHTMLTextAreaElement.style.left = this.x + "px";
                    UITextField.sharedHTMLTextAreaElement.style.top = this.y + "px";
                    UITextField.sharedHTMLTextAreaElement.style.width = this.width + "px";
                    UITextField.sharedHTMLTextAreaElement.style.height = this.height + "px";
                    UITextField.sharedHTMLTextAreaElement.value = this._text;
                    UITextField.sharedHTMLTextAreaElement.focus();
                    UITextField.sharedHTMLTextAreaElement.onblur = function (e) { return _this.onSharedHTMLTextLoseFocus(e); };
                }
                else {
                    UITextField.sharedHTMLInputElement.hidden = false;
                    UITextField.sharedHTMLInputElement.style.position = "absolute";
                    UITextField.sharedHTMLInputElement.style.left = this.x + "px";
                    UITextField.sharedHTMLInputElement.style.top = this.y + "px";
                    UITextField.sharedHTMLInputElement.style.width = this.width + "px";
                    UITextField.sharedHTMLInputElement.style.height = this.height + "px";
                    UITextField.sharedHTMLInputElement.value = this._text;
                    UITextField.sharedHTMLInputElement.focus();
                    UITextField.sharedHTMLInputElement.onblur = function (e) { return _this.onSharedHTMLTextLoseFocus(e); };
                }
                this._fontQuadPanel.visible = false;
            };
            /**
            * @private
            */
            UITextField.prototype.onSharedHTMLTextLoseFocus = function (ev) {
                this.text = this._multiline ? UITextField.sharedHTMLTextAreaElement.value : UITextField.sharedHTMLInputElement.value;
                UITextField.sharedHTMLInputElement.onblur = UITextField.sharedHTMLTextAreaElement.onblur = null;
                UITextField.sharedHTMLInputElement.hidden = UITextField.sharedHTMLTextAreaElement.hidden = true;
                //this.showAllFontQuad(true);
                this._fontQuadPanel.visible = true;
            };
            Object.defineProperty(UITextField.prototype, "width", {
                /**
                * @language zh_CN
                * 获取或设置组件的宽度（以像素为单位）。
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._sca.z;
                },
                /**
                * @language zh_CN
                * 获取或设置组件的宽度（以像素为单位）。
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (value) {
                    if (value != this._sca.z) {
                        this._fontQuadPanel.width = value;
                        this._sca.z = value;
                        this._transformChange = true;
                        this._bgQuad.width = value;
                        this.refreshAlign();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UITextField.prototype, "height", {
                /**
                * @language zh_CN
                * 获取或设置组件的高度（以像素为单位）。
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._sca.w;
                },
                /**
                * @language zh_CN
                * 获取或设置组件的高度（以像素为单位）。
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (value) {
                    if (value != this._sca.w) {
                        this._fontQuadPanel.height = value;
                        this._sca.w = value;
                        this._transformChange = true;
                        this._bgQuad.height = value;
                        this.refreshAlign();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UITextField.prototype, "displayAsPassword", {
                /**
               * @language zh_CN
               * 指定文本字段是否是密码文本字段。
               * @param displayAsPassword  是否为密码文本字段
               * @version Egret 3.0
               * @platform Web,Native
               */
                get: function () {
                    return this._displayAsPassword;
                },
                /**
                * @language zh_CN
                * 指定文本字段是否是密码文本字段。
                * @param displayAsPassword  是否为密码文本字段
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (displayAsPassword) {
                    this._displayAsPassword = displayAsPassword;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UITextField.prototype, "length", {
                /**
                * @language zh_CN
                * (只读)文本字段中的字符数。
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._text.length;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UITextField.prototype, "maxChars", {
                /**
                * @language zh_CN
                * 文本字段中最多可包含的字符数（即用户输入的字符数）。
                * @param maxChars  最大字符数
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._maxChars;
                },
                /**
                * @language zh_CN
                * 文本字段中最多可包含的字符数（即用户输入的字符数）。
                * @param maxChars  最大字符数
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (maxChars) {
                    this._maxChars = maxChars;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UITextField.prototype, "multiline", {
                /**
                * @language zh_CN
                * 指示字段是否为多行文本字段。
                * @param multiline  是否多行
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._multiline;
                },
                /**
                * @language zh_CN
                * 指示字段是否为多行文本字段。
                * @param multiline  是否多行
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (multiline) {
                    this._multiline = multiline;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UITextField.prototype, "restrict", {
                /**
                * @language zh_CN
                * 指示用户可输入到文本字段中的字符集。
                * @param restrict  字符集
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._restrict;
                },
                /**
                * @language zh_CN
                * 指示用户可输入到文本字段中的字符集。
                * @param restrict  字符集
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (restrict) {
                    this._restrict = restrict;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UITextField.prototype, "selectable", {
                /**
                * @language zh_CN
                * 一个布尔值，指示文本字段是否可选。
                * @param selectable  是否可选
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._selectable;
                },
                /**
                * @language zh_CN
                * 一个布尔值，指示文本字段是否可选。
                * @param selectable  是否可选
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (selectable) {
                    this._selectable = selectable;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UITextField.prototype, "selectionBeginIndex", {
                /**
                * @language zh_CN
                * (只读)当前所选内容中第一个字符从零开始的字符索引值。
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._selectionBeginIndex;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UITextField.prototype, "selectionEndIndex", {
                /**
                * @language zh_CN
                * (只读)当前所选内容中最后一个字符从零开始的字符索引值。
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._selectionEndIndex;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UITextField.prototype, "type", {
                /**
                * @language zh_CN
                * 该文本字段的类型。
                * @param type  文本字段的类型
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._type;
                },
                /**
                * @language zh_CN
                * 该文本字段的类型。
                * @param type  文本字段的类型
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (type) {
                    this._type = type;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UITextField.prototype, "textColor", {
                /**
                * @language zh_CN
                * 文本字段中文本的颜色（采用十六进制格式）。
                * @param textColor  文本颜色
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._textColor;
                },
                /**
                * @language zh_CN
                * 文本字段中文本的颜色（采用十六进制格式）。
                * @param textColor  文本颜色
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (textColor) {
                    this._textColor = textColor;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UITextField.prototype, "textWidth", {
                /**
                * @language zh_CN
                * （只读）文本的宽度，以像素为单位。
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._textWidth;
                },
                set: function (value) {
                    this._textWidth = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UITextField.prototype, "textHeight", {
                /**
                * @language zh_CN
                * （只读）文本的高度，以像素为单位。
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._textHeight;
                },
                /**
                 * @private
                 */
                set: function (value) {
                    this._textHeight = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UITextField.prototype, "text", {
                /**
                * @language zh_CN
                * 当前文本字段中当前文本的字符串。
                * @param text  文本字符串
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._text;
                },
                /**
                * @language zh_CN
                * 当前文本字段中当前文本的字符串。
                * @param text  文本字符串
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (text) {
                    this.clearText();
                    this._text = text;
                    this._textLine = text.split("\n");
                    if (!this._multiline) {
                        this._textLine[0] = this._textLine.join("");
                        this._textLine.length = 1;
                    }
                    var textLineInfo = null;
                    for (var i = 0; i < this._textLine.length; ++i) {
                        var lineStr = this._textLine[i];
                        textLineInfo = this.buildTextLineInfo(lineStr);
                        this._textLineInfo.push(textLineInfo);
                    }
                    this.refreshAlign();
                },
                enumerable: true,
                configurable: true
            });
            /**
            * @private
            */
            UITextField.prototype.clearText = function () {
                var textLineInfo = null;
                for (var i = 0; i < this._textLineInfo.length; ++i) {
                    textLineInfo = this._textLineInfo[i];
                    for (var j = 0; j < textLineInfo.lineQuads.length; ++j) {
                        this.deleteFontQuad(textLineInfo.lineQuads[j]);
                    }
                    textLineInfo.lineQuads = null;
                }
                this._textLineInfo = [];
            };
            Object.defineProperty(UITextField.prototype, "autoSize", {
                /**
                * @language zh_CN
                * @param text  文本字符串
                * 控制文本字段的自动大小调整和对齐。
                * 如果 autoSize 设置为 UITextFieldAutoSize.NONE（默认值），则不会进行调整。</p>
                * 如果 autoSize 设置为 UITextFieldAutoSize.LEFT，会将文本视为左对齐文本，这意味着该文本字段的左边距保持固定，在右边可调整单个文本字段行。 如果文本中包括换行符（例如 "\n" 或 "\r"），则会另外调整底边来适合文本的下一行。
                * 如果 autoSize 设置为 UITextFieldAutoSize.RIGHT，会将文本视为右对齐文本，这意味着该文本字段的右边距保持固定，可在左边调整单个文本字段行。 如果文本中包括换行符（例如 "\n" or "\r")），则会另外调整底边来适合文本的下一行。
                * 如果 autoSize 设置为 UITextFieldAutoSize.CENTER，会将文本视为居中对齐文本，这意味着对单个文本字段行的调整将使其在左右边距间均衡分布。 如果文本中包括换行符（例如 "\n" 或 "\r"），则会另外调整底边来适合文本的下一行。
                * @see egret3d.gui.UITextFieldAutoSize
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._autoSize;
                },
                /**
                * @language zh_CN
                * @param text  文本字符串
                * 控制文本字段的自动大小调整和对齐。
                * 如果 autoSize 设置为 UITextFieldAutoSize.NONE（默认值），则不会进行调整。</p>
                * 如果 autoSize 设置为 UITextFieldAutoSize.LEFT，会将文本视为左对齐文本，这意味着该文本字段的左边距保持固定，在右边可调整单个文本字段行。 如果文本中包括换行符（例如 "\n" 或 "\r"），则会另外调整底边来适合文本的下一行。
                * 如果 autoSize 设置为 UITextFieldAutoSize.RIGHT，会将文本视为右对齐文本，这意味着该文本字段的右边距保持固定，可在左边调整单个文本字段行。 如果文本中包括换行符（例如 "\n" or "\r")），则会另外调整底边来适合文本的下一行。
                * 如果 autoSize 设置为 UITextFieldAutoSize.CENTER，会将文本视为居中对齐文本，这意味着对单个文本字段行的调整将使其在左右边距间均衡分布。 如果文本中包括换行符（例如 "\n" 或 "\r"），则会另外调整底边来适合文本的下一行。
                * @see egret3d.gui.UITextFieldAutoSize
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (autoSize) {
                    this._autoSize = autoSize;
                },
                enumerable: true,
                configurable: true
            });
            /**
            * @private
            */
            UITextField.prototype.refreshAlign = function () {
                var fontQuad = null;
                var textLineInfo = null;
                var offsetX, offsetY;
                if (this._autoSize == UITextFieldAutoSize.LEFT) {
                    offsetY = 0;
                    if (!this.multiline && this._textLineInfo.length >= 1) {
                        offsetY = this.height / 2 - this._textLineInfo[0].lineHeight / 2;
                    }
                    for (var i = 0; i < this._textLineInfo.length; ++i) {
                        textLineInfo = this._textLineInfo[i];
                        offsetX = 0;
                        for (var j = 0; j < textLineInfo.lineQuads.length; ++j) {
                            fontQuad = textLineInfo.lineQuads[j];
                            fontQuad.x = offsetX;
                            fontQuad.y = offsetY;
                            offsetX += fontQuad.width;
                            fontQuad.visible = (fontQuad.x + fontQuad.width) <= this.width;
                        }
                        offsetY += textLineInfo.lineHeight;
                    }
                }
                else if (this._autoSize == UITextFieldAutoSize.RIGHT) {
                    offsetY = 0;
                    if (!this.multiline && this._textLineInfo.length >= 1) {
                        offsetY = this.height / 2 - this._textLineInfo[0].lineHeight / 2;
                    }
                    for (var i = 0; i < this._textLineInfo.length; ++i) {
                        textLineInfo = this._textLineInfo[i];
                        offsetX = this.width;
                        for (var j = textLineInfo.lineQuads.length - 1; j >= 0; --j) {
                            fontQuad = textLineInfo.lineQuads[j];
                            fontQuad.x = offsetX -= fontQuad.width;
                            fontQuad.y = offsetY;
                            fontQuad.visible = (fontQuad.x + fontQuad.width) > 0;
                        }
                        offsetY += textLineInfo.lineHeight;
                    }
                }
                else if (this._autoSize == UITextFieldAutoSize.CENTER) {
                    offsetY = 0;
                    if (!this.multiline && this._textLineInfo.length >= 1) {
                        offsetY = this.height / 2 - this._textLineInfo[0].lineHeight / 2;
                    }
                    for (var i = 0; i < this._textLineInfo.length; ++i) {
                        textLineInfo = this._textLineInfo[i];
                        offsetX = this.width * 0.5 - textLineInfo.lineWidth * 0.5;
                        for (var j = 0; j < textLineInfo.lineQuads.length; ++j) {
                            fontQuad = textLineInfo.lineQuads[j];
                            fontQuad.x = offsetX;
                            fontQuad.y = offsetY;
                            offsetX += fontQuad.width;
                            fontQuad.visible = (fontQuad.x + fontQuad.width) <= this.width && (fontQuad.x + fontQuad.width) > 0;
                        }
                        offsetY += textLineInfo.lineHeight;
                    }
                }
            };
            /**
            * @private
            */
            UITextField.prototype.buildTextLineInfo = function (text) {
                var textLineInfo = new TextLineInfo();
                textLineInfo.lineText = text;
                textLineInfo.lineWidth = 0;
                textLineInfo.lineHeight = 0;
                textLineInfo.lineQuads = [];
                for (var i = 0; i < text.length; ++i) {
                    var fontQuad = null;
                    var charCode = text.charCodeAt(i);
                    fontQuad = (charCode != 32) ? this.createFontQuad(charCode) : this._blankQuad;
                    textLineInfo.lineQuads.push(fontQuad);
                    textLineInfo.lineWidth += fontQuad.width;
                    if (textLineInfo.lineHeight < fontQuad.height) {
                        textLineInfo.lineHeight = fontQuad.height;
                    }
                }
                return textLineInfo;
            };
            /**
            * @language zh_CN
            * 将 newText 参数指定的字符串追加到文本字段的文本的末尾。
            * @param newText 新字符串
            * @version Egret 3.0
            * @platform Web,Native
            */
            UITextField.prototype.appendText = function (newText) {
            };
            /**
            * @language zh_CN
            * 返回一个矩形，该矩形是字符的边框。
            * @param charIndex 字符索引值
            * @version Egret 3.0
            * @platform Web,Native
            */
            UITextField.prototype.getCharBoundaries = function (charIndex) {
                return null;
            };
            /**
            * @language zh_CN
            * 在 x 和 y 参数指定的位置返回从零开始的字符索引值。
            * @param x x坐标位置
            * @param y y坐标位置
            * @version Egret 3.0
            * @platform Web,Native
            */
            UITextField.prototype.getCharIndexAtPoint = function (x, y) {
                return 0;
            };
            /**
            * @language zh_CN
            * 使用 value 参数的内容替换当前所选内容。
            * @param value 新字符串
            * @version Egret 3.0
            * @platform Web,Native
            */
            UITextField.prototype.replaceSelectedText = function (value) {
            };
            /**
            * @language zh_CN
            * 使用 newText 参数的内容替换 beginIndex 和 endIndex 参数指定的字符范围。
            * @param beginIndex 起始位置索引
            * @param endIndex 结束位置索引
            * @param newText 新字符串
            * @version Egret 3.0
            * @platform Web,Native
            */
            UITextField.prototype.replaceText = function (beginIndex, endIndex, newText) {
            };
            /**
            * @language zh_CN
            * 将第一个字符和最后一个字符的索引值（使用 beginIndex 和 endIndex 参数指定）指定的文本设置为所选内容。
            * @param beginIndex 起始位置索引
            * @param endIndex 结束位置索引
            * @version Egret 3.0
            * @platform Web,Native
            */
            UITextField.prototype.setSelection = function (beginIndex, endIndex) {
            };
            /**
            * @private
            */
            UITextField.prototype.createFontQuad = function (unicode, isAddChild) {
                if (isAddChild === void 0) { isAddChild = true; }
                var fontQuad;
                if (this._quadPool.length > 0) {
                    fontQuad = this._quadPool[this._quadPool.length - 1];
                    this._quadPool.splice(this._quadPool.length - 1, 1);
                }
                else {
                    fontQuad = new egret3d.Quad();
                    fontQuad.renderText = true;
                }
                var fontTexture = gui.BitmapFont.getTexture(unicode);
                if (!fontTexture) {
                    fontTexture = gui.BitmapFont.getTexture(("?").charCodeAt(0));
                }
                fontQuad.width = fontTexture.width;
                fontQuad.height = fontTexture.height;
                fontQuad.texture = fontTexture;
                fontQuad.color = this._textColor;
                if (isAddChild) {
                    this._fontQuadPanel.addChild(fontQuad);
                }
                return fontQuad;
            };
            /**
            * @private
            */
            UITextField.prototype.deleteFontQuad = function (fontQuad) {
                if (this._blankQuad == fontQuad)
                    return;
                this._fontQuadPanel.removeChild(fontQuad);
                this._quadPool.push(fontQuad);
            };
            return UITextField;
        }(egret3d.DisplayObject));
        gui.UITextField = UITextField;
        __reflect(UITextField.prototype, "egret3d.gui.UITextField");
    })(gui = egret3d.gui || (egret3d.gui = {}));
})(egret3d || (egret3d = {}));
