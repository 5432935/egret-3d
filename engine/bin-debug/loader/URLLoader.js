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
    * @language zh_CN
    * @class egret3d.URLLoader
    * @classdesc
    * URLLoader类
    * 用于加载和解析各类3d资源.  加载完成后数据存在 data 中
    * DDS, TGA, jpg, png, hdr等格式的贴图文件. 加载完成后返回 ITexture对象
    * ESM, EAM, ECA, EPA 等egret3d独有的模型文件,动作文件,相机动画文件, 属性动画文件
    * ESM: Geometry
    * EAM: SkeletonAnimationClip
    * EPA: PropertyAnim
    * @see egret3d.ILoader
    * @see egret3d.LoaderEvent3D
    *
    * @includeExample loader/URLLoader.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var URLLoader = (function (_super) {
        __extends(URLLoader, _super);
        /**
         * @language zh_CN
         * 构造函数
         * @param url 加载数据的地址.如果参数不为空的话.将直接开始加载
         * @param dataformat 以什么方式进行加载.如果为空的话.将通过目标文件的后缀名判断,
         * 如果为空且文件后缀不为内置支持的集中文件类型的话.将以文本格式进行加载解析
         * @version Egret 3.0
         * @platform Web,Native
         */
        function URLLoader(url, dataformat) {
            if (url === void 0) { url = null; }
            if (dataformat === void 0) { dataformat = null; }
            var _this = _super.call(this) || this;
            _this._event = new egret3d.LoaderEvent3D();
            /**
            * @language zh_CN
            * 加载的地址的上级目录，为了方便获取资源
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.parentUrl = "";
            if (url) {
                _this.load(url, dataformat);
            }
            return _this;
        }
        /**
         * @language en_US
         */
        /**
         * @language zh_CN
         * 加载目标地址的数据
         * @param url 数据地址
         * @param dataformat 以什么方式进行加载.如果为空的话.将通过目标文件的后缀名判断,
         * 如果为空且文件后缀不为内置支持的集中文件类型的话.将以文本格式进行加载解析
         * @version Egret 3.0
         * @platform Web,Native
         */
        URLLoader.prototype.load = function (url, dataformat) {
            var _this = this;
            if (dataformat === void 0) { dataformat = null; }
            this.data = null;
            this.url = url;
            this.resourceName = egret3d.StringUtil.getURLName(this.url);
            this.dataformat = dataformat;
            if (null == this._dataformat) {
                this.processFileFormat();
            }
            if (this._xhr == null) {
                this._xhr = this.getXHR();
            }
            if (this._xhr == null) {
                alert("Your browser does not support XMLHTTP.");
                return;
            }
            if (this._xhr.readyState > 0) {
                this._xhr.abort();
                this.disposeXhrEventListener();
            }
            this._xhr.open("GET", this.url, true);
            this.progress = function (e) { return _this.onProgress(e); };
            this.readystatechange = function (e) { return _this.onReadyStateChange(e); };
            this.error = function (e) { return _this.onError(e); };
            this._xhr.addEventListener("progress", this.progress, false);
            this._xhr.addEventListener("readystatechange", this.readystatechange, false);
            this._xhr.addEventListener("error", this.error, false);
            if (this.dataformat == URLLoader.DATAFORMAT_BITMAP) {
                this._xhr.responseType = "blob";
            }
            else if (this.dataformat != URLLoader.DATAFORMAT_TEXT &&
                this.dataformat != URLLoader.DATAFORMAT_JSON &&
                this.dataformat != URLLoader.DATAFORMAT_XML) {
                this._xhr.responseType = "arraybuffer";
            }
            this._xhr.send();
        };
        Object.defineProperty(URLLoader.prototype, "bytesLoaded", {
            /**
            * @language zh_CN
            * 已经获取到的字节数
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._progressEvent ? this._progressEvent.loaded : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(URLLoader.prototype, "bytesTotal", {
            /**
            * @language zh_CN
            * 需要获取的总字节数
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._progressEvent ? this._progressEvent.total : 0;
            },
            enumerable: true,
            configurable: true
        });
        URLLoader.prototype.onReadyStateChange = function (event) {
            if (this._xhr.readyState == 4) {
                if (this._xhr.status >= 400 /*|| this._xhr.status == 0*/) {
                    console.log(this.url, "load fail");
                }
                else {
                    this.loadComplete();
                }
            }
        };
        URLLoader.prototype.loadComplete = function () {
            var _this = this;
            switch (this.dataformat) {
                case egret3d.ILoader.DATAFORMAT_BINARY:
                    this.data = new egret3d.ByteArray(this._xhr.response);
                    break;
                case egret3d.ILoader.DATAFORMAT_SOUND:
                    this.data = this._xhr.responseText;
                    break;
                case egret3d.ILoader.DATAFORMAT_TEXT:
                    this.data = this._xhr.responseText;
                    break;
                case egret3d.ILoader.DATAFORMAT_BITMAP:
                    var img = document.createElement("img");
                    if (window['createObjectURL'] != undefined) {
                        img.src = window['createObjectURL'](this._xhr.response);
                    }
                    else if (window['URL'] != undefined) {
                        img.src = window['URL'].createObjectURL(this._xhr.response);
                    }
                    else if (window['webkitURL'] != undefined) {
                        img.src = window['webkitURL'].createObjectURL(this._xhr.response);
                    }
                    img.onload = function () { return _this.onLoad(img); };
                    return;
                case egret3d.ILoader.DATAFORMAT_DDS:
                    this.data = egret3d.DDSParser.parse(this._xhr.response);
                    this.checkTexture(this.data);
                    break;
                case egret3d.ILoader.DATAFORMAT_TGA:
                    this.data = egret3d.TGAParser.parse(this._xhr.response);
                    this.checkTexture(this.data);
                    break;
                case egret3d.ILoader.DATAFORMAT_HDR:
                    this.data = egret3d.HDRParser.parse(this._xhr.response);
                    this.checkTexture(this.data);
                    break;
                case egret3d.ILoader.DATAFORMAT_ESM:
                    this.data = egret3d.ESMParser.parse(this._xhr.response, this.unitNodeData);
                    break;
                case egret3d.ILoader.DATAFORMAT_EAM:
                    this.data = egret3d.EAMParser.parse(this._xhr.response);
                    break;
                case egret3d.ILoader.DATAFORMAT_ECA:
                    this.data = egret3d.ECAParser.parse(this._xhr.response);
                    break;
                case egret3d.ILoader.DATAFORMAT_EPA:
                    this.data = egret3d.EPAParser.parse(this._xhr.response);
                    break;
                case egret3d.ILoader.DATAFORMAT_E3DPACK:
                    this.data = egret3d.E3dPackParser.parse(this._xhr.response, this.url);
                    break;
                case URLLoader.DATAFORMAT_EUM:
                    this.data = egret3d.EUMParser.parse(this._xhr.response);
                    break;
                case egret3d.ILoader.DATAFORMAT_XML:
                    this.data = egret3d.XMLParser.parse(this._xhr.responseText);
                    break;
                case egret3d.ILoader.DATAFORMAT_JSON:
                    this.data = eval("(" + this._xhr.responseText + ")");
                    break;
                default:
                    this.data = this._xhr.response;
                    break;
            }
            this.doLoadComplete();
        };
        URLLoader.prototype.onProgress = function (event) {
            this._event.eventType = egret3d.LoaderEvent3D.LOADER_PROGRESS;
            this._event.loader = this;
            this._event.total = event.total;
            this._event.loaded = event.loaded;
            this._progressEvent = event;
            this.currentProgress = event.loaded / event.total;
            if (this.currentProgress < 1.0) {
                this._event.currentProgress = this.currentProgress;
                this.dispatchEvent(this._event);
            }
        };
        URLLoader.prototype.onError = function (event) {
            this._event.eventType = egret3d.LoaderEvent3D.LOADER_ERROR;
            this._event.target = this;
            this._event.loader = this;
            this.dispatchEvent(this._event);
            console.log("load error", event);
            this.disposeXhrEventListener();
        };
        URLLoader.prototype.getXHR = function () {
            var xhr = null;
            if (window["XMLHttpRequest"]) {
                xhr = new window["XMLHttpRequest"]();
            }
            else {
            }
            return xhr;
        };
        URLLoader.prototype.onLoad = function (img) {
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
        URLLoader.prototype.checkTexture = function (texture) {
            if ((texture.width & (texture.width - 1)) != 0 ||
                (texture.height & (texture.height - 1)) != 0) {
                egret3d.Egret3DLog.outError("<" + this.url + ">" + "<贴图宽高不是2的N次方>");
            }
        };
        URLLoader.prototype.doLoadComplete = function () {
            this.currentProgress = 1.0;
            this.disposeXhrEventListener();
            this._event.loader = this;
            this._event.data = this.data;
            this._event.total = this._progressEvent.total;
            this._event.loaded = this._progressEvent.loaded;
            this._event.currentProgress = this.currentProgress;
            this._event.eventType = egret3d.LoaderEvent3D.LOADER_ONCE_COMPLETE;
            this.dispatchEvent(this._event);
            this._event.eventType = egret3d.LoaderEvent3D.LOADER_PROGRESS;
            this.dispatchEvent(this._event);
            this._event.eventType = egret3d.LoaderEvent3D.LOADER_COMPLETE;
            this.dispatchEvent(this._event);
        };
        URLLoader.prototype.disposeXhrEventListener = function () {
            if (this.progress) {
                this._xhr.removeEventListener("progress", this.progress, false);
                this.progress = null;
            }
            if (this.readystatechange) {
                this._xhr.removeEventListener("readystatechange", this.readystatechange, false);
                this.readystatechange = null;
            }
            if (this.error) {
                this._xhr.removeEventListener("error", this.error, false);
                this.error = null;
            }
        };
        /**
        * @language zh_CN
        * 释放所有数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        URLLoader.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this.data && this.data.dispose) {
                this.data.dispose();
            }
            this.data = null;
            this._event = null;
            this.disposeXhrEventListener();
            this._xhr = null;
        };
        return URLLoader;
    }(egret3d.ILoader));
    egret3d.URLLoader = URLLoader;
    __reflect(URLLoader.prototype, "egret3d.URLLoader");
})(egret3d || (egret3d = {}));
