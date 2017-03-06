module egret3d {

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

    export class BinaryLoader extends ILoader {
        private _event: LoaderEvent3D = new LoaderEvent3D();

        constructor(url: string = null) {
            super();
            if (url) {
                this.load(url);
            }
        }

        public load(url: string) {
            this.data = null;
            this.url = url;
            this.resourceName = StringUtil.getURLName(this.url);

            this.processFileFormat();

            this.loadComplete();
        }

        protected loadComplete() {

            var byte: ByteArray = assetMgr.getByteArray(this.url);
            switch (this.dataformat) {
                case ILoader.DATAFORMAT_BINARY:
                    this.data = byte;
                    break;
                case ILoader.DATAFORMAT_BITMAP:
                    var blob: Blob = new Blob([byte.buffer]);
                    var img = document.createElement("img");
                    if (window['createObjectURL'] != undefined) { // basic
                        img.src = window['createObjectURL'](blob);
                    }
                    else if (window['URL'] != undefined) { // mozilla(firefox)
                        img.src = window['URL'].createObjectURL(blob);
                    }
                    else if (window['webkitURL'] != undefined) { // webkit or chrome
                        img.src = window['webkitURL'].createObjectURL(blob);
                    }
                    img.onload = () => this.onLoad(img);
                    return;
                case ILoader.DATAFORMAT_DDS:
                    this.data = DDSParser.parse(byte.buffer);
                    this.checkTexture(this.data);
                    break;
                case ILoader.DATAFORMAT_TGA:
                    this.data = TGAParser.parse(byte.buffer);
                    this.checkTexture(this.data);
                    break;
                case ILoader.DATAFORMAT_HDR:
                    this.data = HDRParser.parse(byte.buffer);
                    this.checkTexture(this.data);
                    break;
                case ILoader.DATAFORMAT_ESM:
                    this.data = ESMParser.parse(byte.buffer);
                    break;
                case ILoader.DATAFORMAT_EAM:
                    this.data = EAMParser.parse(byte.buffer);
                    break;
                case ILoader.DATAFORMAT_ECA:
                    this.data = ECAParser.parse(byte.buffer);
                    break;
                case ILoader.DATAFORMAT_EPA:
                    this.data = EPAParser.parse(byte.buffer);
                    break;
                case ILoader.DATAFORMAT_E3DPACK:
                    this.data = E3dPackParser.parse(byte.buffer, this.url);
                    break;
                case URLLoader.DATAFORMAT_EUM:
                    this.data = EUMParser.parse(byte.buffer);
                    break;
                case ILoader.DATAFORMAT_XML:
                    this.data = XMLParser.parse(StringUtil.ab2str(byte));
                    break;
                case ILoader.DATAFORMAT_JSON:
                    this.data = eval("(" + StringUtil.ab2str(byte) + ")");
                    break;
                default:
                    this.data = byte.buffer;
                    break;
            }

            setTimeout(() => {
                this.doLoadComplete();
            }, 0);
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
            this.currentProgress = 1;
            this._event.loader = this;
            this._event.data = this.data;
            this._event.currentProgress = this.currentProgress;

            this._event.eventType = LoaderEvent3D.LOADER_PROGRESS;
            this.dispatchEvent(this._event);

            this._event.eventType = LoaderEvent3D.LOADER_ONCE_COMPLETE;
            this.dispatchEvent(this._event);

            this._event.eventType = LoaderEvent3D.LOADER_COMPLETE;
            this.dispatchEvent(this._event);

        }
    }
}