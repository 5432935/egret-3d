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
    * @class egret3d.BinaryLoader
    * @classdesc
    * @see egret3d.ILoader
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    var BinaryLoader = (function (_super) {
        __extends(BinaryLoader, _super);
        function BinaryLoader(url) {
            if (url === void 0) { url = null; }
            var _this = _super.call(this) || this;
            _this._event = new egret3d.LoaderEvent3D();
            if (url) {
                _this.load(url);
            }
            return _this;
        }
        BinaryLoader.prototype.load = function (url) {
            this.data = null;
            this.url = url;
            this.resourceName = egret3d.StringUtil.getURLName(this.url);
            this.processFileFormat();
            this.loadComplete();
        };
        BinaryLoader.prototype.loadComplete = function () {
            var _this = this;
            var byte = egret3d.assetMgr.getByteArray(this.url);
            switch (this.dataformat) {
                case egret3d.ILoader.DATAFORMAT_BINARY:
                    this.data = byte;
                    break;
                case egret3d.ILoader.DATAFORMAT_BITMAP:
                    var blob = new Blob([byte.buffer]);
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
                    return;
                case egret3d.ILoader.DATAFORMAT_DDS:
                    this.data = egret3d.DDSParser.parse(byte.buffer);
                    this.checkTexture(this.data);
                    break;
                case egret3d.ILoader.DATAFORMAT_TGA:
                    this.data = egret3d.TGAParser.parse(byte.buffer);
                    this.checkTexture(this.data);
                    break;
                case egret3d.ILoader.DATAFORMAT_HDR:
                    this.data = egret3d.HDRParser.parse(byte.buffer);
                    this.checkTexture(this.data);
                    break;
                case egret3d.ILoader.DATAFORMAT_ESM:
                    this.data = egret3d.ESMParser.parse(byte.buffer);
                    break;
                case egret3d.ILoader.DATAFORMAT_EAM:
                    this.data = egret3d.EAMParser.parse(byte.buffer);
                    break;
                case egret3d.ILoader.DATAFORMAT_ECA:
                    this.data = egret3d.ECAParser.parse(byte.buffer);
                    break;
                case egret3d.ILoader.DATAFORMAT_EPA:
                    this.data = egret3d.EPAParser.parse(byte.buffer);
                    break;
                case egret3d.ILoader.DATAFORMAT_E3DPACK:
                    this.data = egret3d.E3dPackParser.parse(byte.buffer, this.url);
                    break;
                case egret3d.URLLoader.DATAFORMAT_EUM:
                    this.data = egret3d.EUMParser.parse(byte.buffer);
                    break;
                case egret3d.ILoader.DATAFORMAT_XML:
                    this.data = egret3d.XMLParser.parse(egret3d.StringUtil.ab2str(byte));
                    break;
                case egret3d.ILoader.DATAFORMAT_JSON:
                    this.data = eval("(" + egret3d.StringUtil.ab2str(byte) + ")");
                    break;
                default:
                    this.data = byte.buffer;
                    break;
            }
            setTimeout(function () {
                _this.doLoadComplete();
            }, 0);
        };
        BinaryLoader.prototype.onLoad = function (img) {
            this.data = new egret3d.ImageTexture(img);
            this.checkTexture(this.data);
            this.doLoadComplete();
            if (window['createObjectURL'] != undefined) {
                window['revokeObjectURL'](img.src);
            }
            else if (window['URL'] != undefined) {
                window['URL'].revokeObjectURL(img.src);
            }
            else if (window['webkitURL'] != undefined) {
                window['webkitURL'].revokeObjectURL(img.src);
            }
            //window.URL.revokeObjectURL(img.src);
            img.onload = null;
        };
        BinaryLoader.prototype.checkTexture = function (texture) {
            if ((texture.width & (texture.width - 1)) != 0 ||
                (texture.height & (texture.height - 1)) != 0) {
                egret3d.Egret3DLog.outError("<" + this.url + ">" + "<贴图宽高不是2的N次方>");
            }
        };
        BinaryLoader.prototype.doLoadComplete = function () {
            this.currentProgress = 1;
            this._event.loader = this;
            this._event.data = this.data;
            this._event.currentProgress = this.currentProgress;
            this._event.eventType = egret3d.LoaderEvent3D.LOADER_PROGRESS;
            this.dispatchEvent(this._event);
            this._event.eventType = egret3d.LoaderEvent3D.LOADER_ONCE_COMPLETE;
            this.dispatchEvent(this._event);
            this._event.eventType = egret3d.LoaderEvent3D.LOADER_COMPLETE;
            this.dispatchEvent(this._event);
        };
        return BinaryLoader;
    }(egret3d.ILoader));
    egret3d.BinaryLoader = BinaryLoader;
    __reflect(BinaryLoader.prototype, "egret3d.BinaryLoader");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=BinaryLoader.js.map