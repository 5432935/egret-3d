module egret3d {

    /**
    * @private
    * @language zh_CN
    * @class egret3d.AssetManager
    * @classdesc
    * 资源加载统一管理类
    * @see egret3d.URLLoader
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class AssetManager {

        private _loaderDict: any = {};
        private _queueLoader: string[] = [];
        private _currentLoader: URLLoader;

        private _loaderEvent: LoaderEvent3D = new LoaderEvent3D();
        private _binaryDict: { [url: string]: ByteArray } = {};
        private _binaryUrlDict:{[url:string]: string[] } = {};

        /**
        * @language zh_CN
        * 加载资源接口
        * @param url 资源路径
        * @param callback 加载完成后的回调
        * @param thisObject 回调函数的this对象
        * @param param 附带参数
        * @returns URLLoader 反回当前加载的URLLoader对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public loadAsset(url: string, callback: Function, thisObject: any, param: any = null): URLLoader {
            return this.addEventListener(url, LoaderEvent3D.LOADER_COMPLETE, callback, thisObject, param);
        }

        /**
        * @language zh_CN
        * 加载资源接口 并监听事件接口
        * @param url 资源路径
        * @param type 事件类型
        * @param callback 加载完成后的回调
        * @param thisObject 回调函数的this对象
        * @param param 附带参数
        * @returns URLLoader 反回当前加载的URLLoader对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addEventListener(url: string, type: string, callback: Function, thisObject: any, param: any = null): URLLoader {
            var asset: any = this._loaderDict[url];

            if (!asset) {
                asset = {};
                this._loaderDict[url] = asset;

                if (this.getByteArray(url)) {
                    asset.loader = new BinaryLoader();
                }
                else {
                    asset.loader = new URLLoader();
                }

                asset.objects = [];
                var loader: URLLoader = asset.loader;
                loader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onComplete, this);

                this._queueLoader.push(url);

                if (!this._currentLoader) {
                    this._currentLoader = loader;
                    this._currentLoader.load(url);
                }
            }

            var loader: URLLoader = asset.loader;
            loader.param = param;
            if (param instanceof UnitNodeData) {
                loader.unitNodeData = param as any;//todo
            }
            if (loader.data) {
                setTimeout(() => {

                    this._loaderEvent.eventType = type;
                    this._loaderEvent.target = loader;
                    this._loaderEvent.loader = loader;
                    this._loaderEvent.data = loader.data;
                    this._loaderEvent.param = param;

                    if (callback) {
                        callback.call(thisObject, this._loaderEvent);
                    }

                    this._loaderEvent.target = null;
                    this._loaderEvent.loader = null;
                    this._loaderEvent.data = null;
                    this._loaderEvent.param = null;
                }, 0);
            }
            else {
                if (callback) {
                    loader.addEventListener(type, callback, thisObject, param);
                }
            }

            if (asset.objects.indexOf(thisObject) < 0) {
                asset.objects.push(thisObject);
            }
            return loader;
        }

        /**
        * @language zh_CN
        * 查找资源数据
        * @param url 资源路径
        * @param thisObject 资源引用对象 默认为null
        * @returns URLLoader  加载对象
        * @see egret3d.URLLoader
        * @version Egret 3.0
        * @platform Web,Native
        */
        public findAsset(url: string, thisObject: any = null): URLLoader {
            var asset: any = this._loaderDict[url];
            if (asset) {
                if (thisObject) {
                    if (asset.objects.indexOf(thisObject) < 0) {
                        asset.objects.push(thisObject);
                    }
                }
                return asset.loader;
            }
            return null;
        }

        /**
        * @language zh_CN
        * 释放资源引用 没有引用的资源将会被进行释放
        * @param object 对象使用的资源的引用进行释放 
        * @version Egret 3.0
        * @platform Web,Native
        */
        public dispose(object: any) {

            var keys: any[] = [];
            for (var key in this._loaderDict) {
                var data: any = this._loaderDict[key];
                var index: number = data.objects.indexOf(object);
                if (index >= 0) {
                    data.objects.splice(index, 1);
                }

                if (data.objects.length <= 0) {
                    keys.push(key);
                }
            }

            for (var i: number = 0; i < keys.length; ++i) {
                var data: any = this._loaderDict[keys[i]];
                data.loader.dispose();
                data.loader = null;
                data.objects = null;
                delete this._loaderDict[keys[i]];
            }
            
            keys = null;
        }

        protected onComplete(e: LoaderEvent3D) {
            this._queueLoader.shift();
            if (this._queueLoader.length > 0) {
                var data: any = this._loaderDict[this._queueLoader[0]];
                var loader: URLLoader = data.loader;
                loader.load(this._queueLoader[0]);
                this._currentLoader = loader;
            }
            else {
                this._currentLoader = null;
            }
        }

        public addByteArray(url: string, byte: ByteArray, parentUrl:string) {
            this._binaryDict[url] = byte;

            var urlArray: string[] = this._binaryUrlDict[parentUrl];
            if (!urlArray) {
                urlArray = [];
                this._binaryUrlDict[parentUrl] = urlArray;
            }

            urlArray.push(url);
        }

        public removeByteArray(parentUrl: string) {
            var urlArray: string[] = this._binaryUrlDict[parentUrl];
            if (urlArray) {
                for (var i: number = 0; i < urlArray.length; ++i) {
                    delete this._binaryDict[urlArray[i]];
                }
                delete this._binaryUrlDict[parentUrl];
            }
        }

        public getByteArray(url: string): ByteArray {
            return this._binaryDict[url];
        }
    }

    
    /**
    * @private
    * @language zh_CN
    * 资源管理对象 内部资源管理直接使用此对象
    * @version Egret 3.0
    * @platform Web,Native
    */
    export var assetMgr: AssetManager = new AssetManager();
}