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
    /**
    * @private
    * @language zh_CN
    * @class egret3d.ParserUtils
    * @classdesc
    * 用 ParserUtils 类 解析所有egret自定义 文件
    * @see egret3d.EventDispatcher
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParserUtils = (function (_super) {
        __extends(ParserUtils, _super);
        function ParserUtils() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._event = new egret3d.ParserEvent3D();
            return _this;
        }
        /**
        * @language zh_CN
        * 传入数据流对象，解析出相应的数据对象.
        * 解析dds tga jpg png esm eam eca
        * @param buffer 需要解析的数据流
        * @returns 是否解析成功
        */
        ParserUtils.prototype.parser = function (buffer) {
            var _this = this;
            var bytes = new egret3d.ByteArray(buffer);
            var fileFormatBytes = new egret3d.ByteArray();
            bytes.readBytes(fileFormatBytes, 0, 3);
            bytes.position = 0;
            var fileFormat = 0;
            fileFormat |= fileFormatBytes.readUnsignedByte() << 16;
            fileFormat |= fileFormatBytes.readUnsignedByte() << 8;
            fileFormat |= fileFormatBytes.readUnsignedByte();
            switch (fileFormat) {
                case 0x00444453:
                    this.datas = egret3d.DDSParser.parse(buffer);
                    this.dataFormat = ".dds";
                    this.doLoadComplete();
                    break;
                case 0x00000002:
                case 0x00000010:
                    this.datas = egret3d.TGAParser.parse(buffer);
                    this.dataFormat = ".tga";
                    this.doLoadComplete();
                    break;
                case 0x00FFD8FF:
                    var blob = new Blob([buffer]);
                    this.dataFormat = ".jpg";
                    var img = document.createElement("img");
                    if (window['createObjectURL'] != undefined) {
                        img.src = window['createObjectURL'](blob);
                    }
                    else if (window['URL'] != undefined) {
                        img.src = window['URL'].createObjectURL(blob);
                    }
                    else if (window['webkitURL'] != undefined) {
                        img.src = window['webkitURL'].createObjectURL(blob);
                    }
                    img.onload = function () { return _this.onLoad(img); };
                    break;
                case 0x0089504E:
                    var blob = new Blob([buffer]);
                    this.dataFormat = ".png";
                    var img = document.createElement("img");
                    if (window['createObjectURL'] != undefined) {
                        img.src = window['createObjectURL'](blob);
                    }
                    else if (window['URL'] != undefined) {
                        img.src = window['URL'].createObjectURL(blob);
                    }
                    else if (window['webkitURL'] != undefined) {
                        img.src = window['webkitURL'].createObjectURL(blob);
                    }
                    img.onload = function () { return _this.onLoad(img); };
                    break;
                case 0x0065736D:
                    this.dataFormat = ".esm";
                    this.datas = egret3d.ESMParser.parse(buffer);
                    this.doLoadComplete();
                    break;
                case 0x0065616D:
                    this.dataFormat = ".eam";
                    this.datas = egret3d.EAMParser.parse(buffer);
                    this.doLoadComplete();
                    break;
                case 0x00656361:
                    this.dataFormat = ".eca";
                    this.datas = egret3d.ECAParser.parse(buffer);
                    this.doLoadComplete();
                    break;
                default:
                    return false;
            }
            return true;
        };
        ParserUtils.prototype.onLoad = function (img) {
            this.datas = new egret3d.ImageTexture(img);
            this.doLoadComplete();
            window.URL.revokeObjectURL(img.src);
            img.onload = null;
        };
        ParserUtils.prototype.doLoadComplete = function () {
            this._event.eventType = egret3d.ParserEvent3D.PARSER_COMPLETE;
            this._event.data = this;
            this._event.parser = this;
            this.dispatchEvent(this._event);
        };
        return ParserUtils;
    }(egret3d.EventDispatcher));
    egret3d.ParserUtils = ParserUtils;
    __reflect(ParserUtils.prototype, "egret3d.ParserUtils");
})(egret3d || (egret3d = {}));
