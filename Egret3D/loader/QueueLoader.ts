module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.QueueLoader
    * @classdesc
    * 队列加载器
    * 每个加载对象都是一个 UnitLoader
    * 可以进行多个资源形成队列加载
    * 加载后会触发事件
    * @see egret3d.EventDispatcher
    * @see egret3d.UnitLoader
    * @see egret3d.ILoader
    * @see egret3d.LoaderEvent3D
    *
    * @includeExample loader/QueueLoader.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class QueueLoader extends EventDispatcher{

        protected dictLoader: any = {};
        protected currentLoader: UnitLoader = null;

        protected dictProgress: any = {};

        protected queueLoader: string[] = [];

        protected _event: LoaderEvent3D = new LoaderEvent3D();

        /**
        * @language zh_CN
        * 任务总数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public taskTotal: number = 0;

        /**
        * @language zh_CN
        * 当前完成的任务个数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public taskCurrent: number = 0;

        /**
        * @language zh_CN
        * 当前进度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public currentProgress: number = 0;

        protected lastProgress: number = 0;
        /**
        * @language zh_CN
        * 加载文件  可以为任意文件
        * @param url 默认参数为null  文件路径
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(url: string = null) {
            super();
            if (url) {
                this.load(url);
            }
        }

        /**
        * @language zh_CN
        * 加载文件
        * 多次调用 代表加载多个资源文件
        * @param url 文件路径
        * @returns UnitLoader 
        * @version Egret 3.0
        * @platform Web,Native
        */
        public load(url: string):UnitLoader {
            this.taskTotal++;
            var loader: UnitLoader = new UnitLoader();
            this.dictLoader[url] = loader;
            loader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onConplete, this);
            loader.addEventListener(LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);


            this.dictProgress[url] = 0;

            this.queueLoader.push(url);
            if (!this.currentLoader) {
                this.currentLoader = this.dictLoader[url];
                this.currentLoader.load(url);

            }

            return loader;
        }

        /**
        * @language zh_CN
        * @private
        * 对某个文件进行事件侦听
        * @param url {string} 文件路径。
        * @param type {string} 事件的类型标识符。
        * @param callback {Function} 处理事件的侦听器函数。此函数必须接受 Event3D 对象作为其唯一的参数，并且不能返回任何结果，
        * @param thisObject {any} 当前注册对象。
        * @param param {any} 事件携带参数，默认为空。
        * @param priority {number} 事件侦听器的优先级。
        * @returns {number} 注册事件位置标识id
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addAssetEventListener(url: string, type: string, callback: Function, thisObject: any, param: any = null, priority: number = 0) {
            var loader: UnitLoader = this.dictLoader[url];
            if (loader) {
                return loader.addEventListener(type, callback, thisObject, param, priority);
            }

            return 0;
        }

        /**
        * @language zh_CN
        * @private
        * 对文件进行移除事件侦听器。
        * @param url {string} 文件路径。
        * @param type {string} 事件名。
        * @param callback {Function} 侦听函数。
        * @param thisObject {any} 当前注册对象。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeAssetEventListener(url: string, type: string, callback: Function, thisObject: any, param: any = null, priority: number = 0) {
            var loader: UnitLoader = this.dictLoader[url];
            if (loader) {
                loader.removeEventListener(type, callback, thisObject);
            }
        }

        /**
        * @language zh_CN
        * 获取资源数据
        * @param url 文件路径
        * @returns any 加载完成后对应的数据
        * @see egret3d.ILoader.data
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getAsset(url: string): any {
            if (this.dictLoader[url]) {
                return this.dictLoader[url].data;
            }
            return textureResMgr.getTexture(url);
        }

        /**
        * @language zh_CN
        * 获取每个资源的URLLoader对象
        * 如果获取的是配置文件会返回配置文件的源数据，而不是解释后的数据
        * @param url 文件路径
        * @returns URLLoader  URLLoader对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getAssetURLLoader(url: string): URLLoader {
            return assetMgr.findAsset(url, this);
        }

        /**
        * @language zh_CN
        * 获取每个资源的UnitLoader对象
        * @param url 文件路径
        * @returns UnitLoader  UnitLoader对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getUnitLoader(url: string): UnitLoader {
            return this.dictLoader[url];
        }

        protected onConplete(e: LoaderEvent3D) {
            var loader: ILoader = e.loader;

            loader.removeEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onConplete, this);
            loader.removeEventListener(LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);

            this.taskTotal++;
            this.queueLoader.shift();

            this._event.eventType = LoaderEvent3D.LOADER_ONCE_COMPLETE;
            this._event.loader = loader;
            this._event.data = loader.data;
            this._event.currentProgress = this.currentProgress;
            this.dispatchEvent(this._event);

            if (this.queueLoader.length > 0) {
                var url: string = this.queueLoader[0];
                this.currentLoader = this.dictLoader[url];
                this.currentLoader.load(url);
            }
            else {

                this.currentProgress = 1.0;

                this._event.eventType = LoaderEvent3D.LOADER_COMPLETE;
                this._event.currentProgress = this.currentProgress;
                this.dispatchEvent(this._event);

                this.currentLoader = null;
                this.taskTotal = 0;
                this.taskCurrent = 0;
                this.dictProgress = {};

                this.currentProgress = 0;
                this.lastProgress = 0;
            }
        }

        protected onProgress(e: LoaderEvent3D) {
            var load: ILoader = e.target;

            if (this.dictProgress[load.url] != undefined) {
                this.dictProgress[load.url] = load.currentProgress;

                this.currentProgress = 0;
                for (var key in this.dictProgress) {
                    this.currentProgress += 1 / this.taskTotal * this.dictProgress[key];
                }

                if (this.lastProgress < this.currentProgress) {
                    this.lastProgress = this.currentProgress;

                    this._event.eventType = LoaderEvent3D.LOADER_PROGRESS;
                    this._event.loader = load;
                    this._event.data = load.data;
                    this._event.currentProgress = this.currentProgress;
                    this.dispatchEvent(this._event);
                }
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
            for (var key in this.dictLoader) {
                this.dictLoader[key].dispose();
            }
            assetMgr.dispose(this);
            this.dictLoader = {};
        }
    }
}