module egret3d {

    /**
     * @private
     * @class egret3D.Egret3DPolicy
     * @classdesc
     */
    export class Egret3DPolicy {

        public static engineVersion: string = "3.2.6";

        public static useParticle: boolean = true;
        public static useAnimEffect: boolean = true;
        public static useEffect: boolean = true;
        public static useRibbon: boolean = true;

        public static useAnimPoseInterpolation: boolean = true;
        public static useAnimMixInterpolation: boolean = true;
        public static useAnimCache: boolean = false;

        public static useLight: boolean = true;

        public static usePost: boolean = true;

        public static useCompress: boolean = false;

        public static useLowLOD: boolean = false;
    }

    /**
     * @private
     * @class egret3D.Egret3DEngine
     * @classdesc
     * 引擎库文件加载
     * 引擎库前期加载设置，开发中加载未压缩的编译引擎
     */
    export class Egret3DEngine {
        public static instance: Egret3DEngine = new Egret3DEngine();

        public version: string = "3.2.6";
        public jsPath: string = "js/";
        public onTsconfig: Function;
        public debug: boolean = false;

        private _tsconfigs: string[] = [];
        private _currentConfig: string;
        private _xhr: XMLHttpRequest;
        private importList: string[] = [];

        private _complete: Function;
        private _thisObject: Function;

        //public static get instance(): Egret3DEngine {
        //    return Egret3DEngine._instance;
        //}

        private static getXHR(): any {
            var xhr: any = null;
            if (window["XMLHttpRequest"]) {
                xhr = new window["XMLHttpRequest"]();
            } else {
                xhr = new ActiveXObject("MSXML2.XMLHTTP");
            }
            return xhr;
        }

        constructor() {
            this._tsconfigs.push("Egret3D/tsconfig.json");
        }


        public useDevicePOLICY(lv: number = 0) {
            switch (lv){
                case 0:
                    if (this.isWeiXin()) {
                      Egret3DPolicy.useAnimPoseInterpolation = false;
                      Egret3DPolicy.useAnimMixInterpolation = false;
                    }
                    if (this.isAndroid()) {
                        Egret3DPolicy.useAnimPoseInterpolation = false;
                        Egret3DPolicy.useAnimMixInterpolation = false;
                        Egret3DPolicy.useParticle = false;
                    }
                    break;
                default:
                    break;
            }
        }

        private isWeiXin(): boolean{ 
            let ua = self.navigator.userAgent.toLowerCase();
            let index = ua.indexOf("micromessenger");
            if (index != -1) {
                return true;
            } else {
                return false;
            }
        } 

        private isAndroid(): boolean {
            let ua = self.navigator.userAgent.toLowerCase();
            let index = ua.indexOf("android");
            if (index != -1) {
                return true;
            } else {
                return false;
            }
        }

        public addTsconfig(path: string) {
            this._tsconfigs.push(path);
        }

        public setTsconfig(index: number, path: string) {
            this._tsconfigs[index] = path;
        }

        public clearTsconfig() {
            this._tsconfigs.length = 0;
        }

        public preload(complete: Function, thisObject: any = null) {
            this._complete = complete;
            this._thisObject = thisObject;
            if (this._tsconfigs.length > 0) {
                this.doLoader(this._tsconfigs[0]);
            }
            else {
                this.onAllLoadComplete();
            }
        }

        public addImportScript(path: string) {
            this.importList.push(path);
        }

        private doLoader(path: string) {
            this._currentConfig = path;
            if (this._xhr == null) {
                this._xhr = Egret3DEngine.getXHR();
            }
            if (this._xhr == null) {
                alert("Your browser does not support XMLHTTP.");
                return;
            }

            if (this._xhr.readyState > 0) {
                this._xhr.abort();
            }

            this._xhr.open("GET", path + "?" + Math.random() * 100000, true);
            this._xhr.addEventListener("progress", (e) => this.onProgress(e), false);
            this._xhr.addEventListener("readystatechange", (e) => this.onReadyStateChange(e), false);
            this._xhr.addEventListener("error", (e) => this.onError(e), false);
            this._xhr.responseType = "text";
            this._xhr.send();
        } 

        private onProgress(event: ProgressEvent) {
            var e: string = event.loaded.toString() + event.total;
            //console.log("progress event```" + e);
        }

        private onReadyStateChange(event: Event) {
            if (this._xhr.readyState == 4) {
                if (this._xhr.status >= 400 || this._xhr.status == 0) {
                    console.log(this._currentConfig, "load fail");
                } else {
                    this.onLoadComplete(this._xhr.responseText);
                }
            }
        }

        private onLoadComplete(source: string) {

            var s_pos: number = this._currentConfig.lastIndexOf('/');

            var dir: string = this._currentConfig.substr(0, s_pos+1);
            var obj = eval("(" + source + ")");

            var importName: string;
            for (var i: number = 0; i < obj.files.length; ++i) {
                importName = this.jsPath + dir;
                importName += obj.files[i];
                importName = importName.replace(".ts", ".js");
                this.importList.push(importName);
            }

            var index: number = this._tsconfigs.indexOf(this._currentConfig);

            if (index == this._tsconfigs.length - 1) {
                this.onAllLoadTsconfigComplete();
            }
            else {
                this._xhr = null;
                this.doLoader(this._tsconfigs[++index]);
            }
        }

        private onError(event: ErrorEvent) {
        }

        private onAllLoadTsconfigComplete() {

            if (this.onTsconfig) {
                this.onTsconfig();
            }
            this.startLoadScript(null);
        }

        private onAllLoadComplete() {
            if (this._complete) {
                if (this._thisObject) {
                    this._complete.call(this._thisObject);
                }
                else {
                    this._complete();
                }
            }
        }

        private startLoadScript(e) {
            if (this.importList.length > 0) {
                var egret3DScript: HTMLScriptElement = document.createElement("script");
                egret3DScript.src = this.importList.shift();
                egret3DScript.onload = (e) => this.startLoadScript(e);
                egret3DScript.onerror = (e) => this.loadScriptError(e);
                document.head.appendChild(egret3DScript);
            }
            else {
                console.log("all complete");
                this.onAllLoadComplete();
            }
        }

        private loadScriptError(e) {
            var error: string = "load Script Error \r\n no file:" + e.srcElement.src;
            alert(error);
            this.startLoadScript(null);
        }
    }
}