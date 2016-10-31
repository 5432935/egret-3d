﻿module egret3d {

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
    * ECA: CameraAnimationController
    * EPA: PropertyAnim
    * @includeExample loader/URLLoader.ts
    * @see egret3d.ILoader
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class URLLoader extends ILoader {

        private _xhr: XMLHttpRequest;
        private _event: LoaderEvent3D = new LoaderEvent3D();
        private _progressEvent: ProgressEvent;
        /**
         * @language zh_CN
         * 控制以哪种方式接收加载的数据.
         * 如果未赋值则通过加载文件的后缀名来判断加载的类型以解析.
         * 如果未赋值且加载的类型并非为内置支持的文件类型.将以文本格式进行加载
         * @version Egret 3.0
         * @platform Web,Native
         */
        private _dataformat: string = null;

        /**
         * @language zh_CN
         * 以二进制方式接收加载的数据
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DATAFORMAT_BINARY: string = "binary";

        /**
         * @language zh_CN
         * 以文本的方式接收加载的数据
         * 默认方式
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DATAFORMAT_TEXT: string = "text";

        /**
         * @language zh_CN
         * 以音频的方式接收加载的数据
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DATAFORMAT_SOUND: string = "sound";

        /**
         * @language zh_CN
         * 以图像的方式接收加载的数据
         * 支持jpg.png.等格式
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DATAFORMAT_BITMAP: string = "bitmap";

        /**
         * @language zh_CN
         * 以DDS的方式接收加载的数据
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DATAFORMAT_DDS: string = "dds";

        /**
         * @language zh_CN
         * 以TGA的方式接收加载的数据
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DATAFORMAT_TGA: string = "tga";

        /**
         * @language zh_CN
         * 以ESM格式接收加载的数据
         * Egret3D独有的格式 模型+蒙皮
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DATAFORMAT_ESM: string = "esm";

        /**
         * @language zh_CN
         * 以EAM格式接收加载的数据
         * Egret3D独有的格式 动作文件
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DATAFORMAT_EAM: string = "eam";

        /**
         * @language zh_CN
         * 以ECA格式接收加载的数据
         * Egret3D独有的格式 相机动画文件
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DATAFORMAT_ECA: string = "eca";

        /**
         * @language zh_CN
         * 以EPA格式接收加载的数据
         * Egret3D独有的格式 属性动画文件
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DATAFORMAT_EPA: string = "epa";

        /**
         * @private
         * @language zh_CN
         * 以pvr格式接收加载的数据
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DATAFORMAT_PVR: string = "pvr";

        /**
        * @private
        * @language zh_CN
        * 以pvr格式接收加载的数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static DATAFORMAT_HDR: string = "hdr";

        private progress: any;
        private readystatechange: any;
        private error: any;

        /**
         * @language zh_CN
         * 构造函数
         * @param url 加载数据的地址.如果参数不为空的话.将直接开始加载
         * @param dataformat 以什么方式进行加载.如果为空的话.将通过目标文件的后缀名判断,
         * 如果为空且文件后缀不为内置支持的集中文件类型的话.将以文本格式进行加载解析
         * @version Egret 3.0
         * @platform Web,Native
         */
        constructor(url: string = null, dataformat: string = null) {
            super();
            if (url) {
                if (dataformat) {
                    this.dataformat = dataformat;
                }
                this.load(url);
            }
        }

        /**
         * @language en_US
         */
        /**
         * @language zh_CN
         * 加载目标地址的数据
         * @param url 数据地址
         * @version Egret 3.0
         * @platform Web,Native
         */
        public load(url: string) {
            this.data = null;
            this.url = url;

            if (null == this._dataformat) {

                this._dataformat = URLLoader.DATAFORMAT_TEXT;

                var endPos: number = this.url.lastIndexOf(".");
                var startPos: number = this.url.lastIndexOf("/");


                if (this.url.length >= 4) switch (this.url.substr(this.url.length - 4, 4).toLowerCase()) {
                    case ".dds":
                        this._dataformat = URLLoader.DATAFORMAT_DDS;
                        break;
                    case ".tga":
                        this._dataformat = URLLoader.DATAFORMAT_TGA;
                        break;
                    case ".bmp":
                        this._dataformat = URLLoader.DATAFORMAT_BITMAP;
                        break;
                    case ".png":
                        this._dataformat = URLLoader.DATAFORMAT_BITMAP;
                        break;
                    case ".jpg":
                        this._dataformat = URLLoader.DATAFORMAT_BITMAP;
                        break;
                    case ".hdr":
                        this._dataformat = URLLoader.DATAFORMAT_HDR;
                        break;
                    case "glsl":
                        this._dataformat = URLLoader.DATAFORMAT_TEXT;
                        break;
                    case ".pvr":
                        this._dataformat = URLLoader.DATAFORMAT_PVR;
                        break;
                    case ".esm":
                        this._dataformat = URLLoader.DATAFORMAT_ESM;
                        break;
                    case ".eam":
                        this._dataformat = URLLoader.DATAFORMAT_EAM;
                        break;
                    case ".eca":
                        this._dataformat = URLLoader.DATAFORMAT_ECA;
                        break;
                    case ".epa":
                        this._dataformat = URLLoader.DATAFORMAT_EPA;
                        break;
                }
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

            this.progress = (e) => this.onProgress(e);
            this.readystatechange = (e) => this.onReadyStateChange(e);
            this.error = (e) => this.onError(e);

            this._xhr.addEventListener("progress", this.progress, false);
            this._xhr.addEventListener("readystatechange", this.readystatechange, false);
            this._xhr.addEventListener("error", this.error, false);
            //this._xhr.addEventListener("loadstart", this.loadstart, false);

            if (this.dataformat == URLLoader.DATAFORMAT_BITMAP) {
                this._xhr.responseType = "blob";
            } else if (this.dataformat != URLLoader.DATAFORMAT_TEXT) {
                this._xhr.responseType = "arraybuffer";
            }
            this._xhr.send();
        }

        /**
         * @language zh_CN
         * 控制以哪种方式接收加载的数据.
         * 如果未赋值则通过加载文件的后缀名来判断加载的类型以解析.
         * 如果未赋值且加载的类型并非为内置支持的文件类型.将以文本格式进行加载
         * @returns string
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get dataformat(): string {
            return this._dataformat;
        }

        /**
         * @language zh_CN
         * 控制以哪种方式接收加载的数据.
         * 如果未赋值则通过加载文件的后缀名来判断加载的类型以解析.
         * 如果未赋值且加载的类型并非为内置支持的文件类型.将以文本格式进行加载
         * @param value
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set dataformat(value: string) {
            this._dataformat = value;

        }

        /**
        * @language zh_CN
        * 加载的地址的上级目录，为了方便获取资源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public parentUrl: string = "";

        /**
        * @language zh_CN
        * 当前加载资源的名字
        * @version Egret 3.0
        * @platform Web,Native
        */
        public resourceName: string = "";

        /**
        * @language zh_CN
        * 加载load 的临时资源，用户可自行配置的容器，大方便好用
        * @version Egret 3.0
        * @platform Web,Native
        */
        public tempData: any;


        /**
        * @language zh_CN
        * 已经获取到的字节数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get bytesLoaded(): number {
            return this._progressEvent ? this._progressEvent.loaded : 0;
        }

        /**
        * @language zh_CN
        * 需要获取的总字节数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get bytesTotal(): number {
            return this._progressEvent ? this._progressEvent.total : 0;
        }

        private onReadyStateChange(event: Event): void {
            if (this._xhr.readyState == 4) {
                if (this._xhr.status >= 400 /*|| this._xhr.status == 0*/) {
                    console.log(this.url, "load fail");
                } else {
                    this.loadComplete();
                }
            }

           
        }

        private loadComplete(): void {
            switch (this.dataformat) {
                case URLLoader.DATAFORMAT_BINARY:
                    this.data = new ByteArray(this._xhr.response);
                    break;
                case URLLoader.DATAFORMAT_SOUND:
                    this.data = this._xhr.responseBody;
                    break;
                case URLLoader.DATAFORMAT_TEXT:
                    this.data = this._xhr.responseText;
                    break;
                case URLLoader.DATAFORMAT_BITMAP:
                    var img = document.createElement("img");
                    if (window['createObjectURL'] != undefined) { // basic
                        img.src = window['createObjectURL'](this._xhr.response);
                    } else if (window['URL'] != undefined) { // mozilla(firefox)
                        img.src = window['URL'].createObjectURL(this._xhr.response);
                    } else if (window['webkitURL'] != undefined) { // webkit or chrome
                        img.src = window['webkitURL'].createObjectURL(this._xhr.response);
                    }
                    img.onload = () => this.onLoad(img);
                    return;
                case URLLoader.DATAFORMAT_DDS:
                    this.data = DDSParser.parse(this._xhr.response);
                    this.checkTexture(this.data);
                    break;
                case URLLoader.DATAFORMAT_TGA:
                    this.data = TGAParser.parse(this._xhr.response);
                    this.checkTexture(this.data);
                    break;
                case URLLoader.DATAFORMAT_HDR:
                    this.data = HDRParser.parse(this._xhr.response);
                    this.checkTexture(this.data);
                    break;
                case URLLoader.DATAFORMAT_ESM:
                    this.data = ESMParser.parse(this._xhr.response);
                    break;
                case URLLoader.DATAFORMAT_EAM:
                    this.data = EAMParser.parse(this._xhr.response);
                    break;
                case URLLoader.DATAFORMAT_ECA:
                    this.data = ECAParser.parse(this._xhr.response);
                    break;
                case URLLoader.DATAFORMAT_EPA:
                    this.data = EPAParser.parse(this._xhr.response);
                    break;
                default:
                    this.data = this._xhr.responseText;
            }
                this.doLoadComplete();
        }

        private onProgress(event: ProgressEvent): void {
            this._event.eventType = LoaderEvent3D.LOADER_PROGRESS;
            this._event.target = this;
            this._event.loader = this;
            this._event.total = event.total; 
            this._event.loaded = event.loaded; 
            this._progressEvent = event;
            this.currentProgress = event.loaded / event.total;
            this._event.currentProgress = this.currentProgress;
            this.dispatchEvent(this._event);
        }

        private onError(event: ErrorEvent): void {
            this._event.eventType = LoaderEvent3D.LOADER_ERROR;
            this._event.target = this;
            this._event.loader = this;
            this.dispatchEvent(this._event);
            console.log("load error", event);
            this.disposeXhrEventListener();
        }

        private onloadstart(event: any) {
            this._event.eventType = LoaderEvent3D.LOADER_PROGRESS;
            this._event.target = this;
            this._event.loader = this;
            this._progressEvent = event;
            this.dispatchEvent(this._event);
        }

        private getXHR(): any {
            var xhr: any = null;
            if (window["XMLHttpRequest"]) {
                xhr = new window["XMLHttpRequest"]();
            } else {
                xhr = new ActiveXObject("MSXML2.XMLHTTP");
            }
            return xhr;
        }

        protected onLoad(img: HTMLImageElement) {
            this.data = new ImageTexture(img);
            this.checkTexture(this.data);
            this.doLoadComplete();

            if (window['createObjectURL'] != undefined) { // basic
                window['revokeObjectURL'](img.src);
            }
            else if (window['URL'] != undefined) { // mozilla(firefox)
                window['URL'].revokeObjectURL(img.src);
            }
            else if (window['webkitURL'] != undefined) { // webkit or chrome
                window['webkitURL'].revokeObjectURL(img.src);
            }

            //window.URL.revokeObjectURL(img.src);
            img.onload = null;
        }

        protected checkTexture(texture: ITexture) {
            if ((texture.width & (texture.width - 1)) != 0 ||
                (texture.height & (texture.height - 1)) != 0) {
                Egret3DLog.outError("<" + this.url + ">" + "<贴图宽高不是2的N次方>");
            }
        }

        protected doLoadComplete() {
            this.disposeXhrEventListener();
            this.resourceName = StringUtil.getURLName(this.url);
            this._event.eventType = LoaderEvent3D.LOADER_COMPLETE;
            this._event.target = this;
            this._event.loader = this;
            this._event.data = this.data;
            this._event.currentProgress = this.currentProgress;
            this.dispatchEvent(this._event);

        }

        private disposeXhrEventListener() {
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
        }

        /**
        * @language zh_CN
        * 释放所有数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public dispose() {
            super.dispose();
            if (this.data && this.data.dispose) {
                this.data.dispose();
            }

            this.data = null;
            this._event = null;
            this.disposeXhrEventListener();
            this._xhr = null;
        }
    }
}