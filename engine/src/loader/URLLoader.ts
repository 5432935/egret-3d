module egret3d {

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
    export class URLLoader extends ILoader {

        private _xhr: XMLHttpRequest;
        private _event: LoaderEvent3D = new LoaderEvent3D();
        private _progressEvent: ProgressEvent;
   
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
                this.load(url, dataformat);
            }
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
        public load(url: string, dataformat: string = null) {
            this.data = null;
            this.url = url;
            this.resourceName = StringUtil.getURLName(this.url);
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

            this.progress = (e) => this.onProgress(e);
            this.readystatechange = (e) => this.onReadyStateChange(e);
            this.error = (e) => this.onError(e);

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
        * 加载load 的临时资源，用户可自行配置的容器，大方便好用
        * @version Egret 3.0
        * @platform Web,Native
        */
        public tempData: any;

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public unitNodeData: UnitNodeData; 
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
                case ILoader.DATAFORMAT_BINARY:
                    this.data = new ByteArray(this._xhr.response);
                    break;
                case ILoader.DATAFORMAT_SOUND:
                    this.data = this._xhr.responseText;
                    break;
                case ILoader.DATAFORMAT_TEXT:
                    this.data = this._xhr.responseText;
                    break;
                case ILoader.DATAFORMAT_BITMAP:
                    var img = document.createElement("img");
                    if (window['createObjectURL'] != undefined) { // basic
                        img.src = window['createObjectURL'](this._xhr.response);
                    }
                    else if (window['URL'] != undefined) { // mozilla(firefox)
                        img.src = window['URL'].createObjectURL(this._xhr.response);
                    }
                    else if (window['webkitURL'] != undefined) { // webkit or chrome
                        img.src = window['webkitURL'].createObjectURL(this._xhr.response);
                    }
                    img.onload = () => this.onLoad(img);
                    return;
                case ILoader.DATAFORMAT_DDS:
                    this.data = DDSParser.parse(this._xhr.response);
                    this.checkTexture(this.data);
                    break;
                case ILoader.DATAFORMAT_TGA:
                    this.data = TGAParser.parse(this._xhr.response);
                    this.checkTexture(this.data);
                    break;
                case ILoader.DATAFORMAT_HDR:
                    this.data = HDRParser.parse(this._xhr.response);
                    this.checkTexture(this.data);
                    break;
                case ILoader.DATAFORMAT_ESM:
                    this.data = ESMParser.parse(this._xhr.response, this.unitNodeData);
                    break;
                case ILoader.DATAFORMAT_EAM:
                    this.data = EAMParser.parse(this._xhr.response);
                    break;
                case ILoader.DATAFORMAT_ECA:
                    this.data = ECAParser.parse(this._xhr.response);
                    break;
                case ILoader.DATAFORMAT_EPA:
                    this.data = EPAParser.parse(this._xhr.response);
                    break;
                case ILoader.DATAFORMAT_E3DPACK:
                    this.data = E3dPackParser.parse(this._xhr.response, this.url);
                    break;
                case URLLoader.DATAFORMAT_EUM:
                    this.data = EUMParser.parse(this._xhr.response);
                    break;
                case ILoader.DATAFORMAT_XML:
                    this.data = XMLParser.parse(this._xhr.responseText);
                    break;
                case ILoader.DATAFORMAT_JSON:
                    this.data = eval("(" + this._xhr.responseText + ")");
                    break;
                default:
                    this.data = this._xhr.response;
                    break;
            }            
            this.doLoadComplete();
        }


        private onProgress(event: ProgressEvent): void {
            this._event.eventType = LoaderEvent3D.LOADER_PROGRESS;
            this._event.loader = this;
            this._event.total = event.total;
            this._event.loaded = event.loaded;

            this._progressEvent = event;
            this.currentProgress = event.loaded / event.total;

            if (this.currentProgress < 1.0) {
                this._event.currentProgress = this.currentProgress;
                this.dispatchEvent(this._event);
            }
        }

        private onError(event: ErrorEvent): void {
            this._event.eventType = LoaderEvent3D.LOADER_ERROR;
            this._event.target = this;
            this._event.loader = this;
            this.dispatchEvent(this._event);
            console.log("load error", event);
            this.disposeXhrEventListener();
        }


        private getXHR(): any {
            var xhr: any = null;
            if (window["XMLHttpRequest"]) {
                xhr = new window["XMLHttpRequest"]();
            } else {
                //xhr = new ActiveXObject("MSXML2.XMLHTTP");
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
            this.currentProgress = 1.0;
            this.disposeXhrEventListener();

            this._event.loader = this;
            this._event.data = this.data;
            this._event.total = this._progressEvent.total;
            this._event.loaded = this._progressEvent.loaded;
            this._event.currentProgress = this.currentProgress;

            this._event.eventType = LoaderEvent3D.LOADER_ONCE_COMPLETE;
            this.dispatchEvent(this._event);

            this._event.eventType = LoaderEvent3D.LOADER_PROGRESS;
            this.dispatchEvent(this._event);

            this._event.eventType = LoaderEvent3D.LOADER_COMPLETE;
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