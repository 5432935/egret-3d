module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.QueueLoader
    * @classdesc
    * 队列加载器
    * 每个加载对象都是一个 UnitLoader
    * 可以进行多个资源形成队列加载
    * @see egret3d.EventDispatcher
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class QueueLoader extends EventDispatcher{

        protected dictLoader: any = {};
        protected currentLoader: UnitLoader = null;

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
        * @version Egret 3.0
        * @platform Web,Native
        */
        public load(url: string) {
            this.taskTotal++;
            this.dictLoader[url] = new UnitLoader();
            this.queueLoader.push(url);
            if (!this.currentLoader) {
                this.currentLoader = this.dictLoader[url];
                this.currentLoader.load(url);
                this.currentLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoader, this);
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

            return null;
        }

        protected onLoader(e: LoaderEvent3D) {
            console.log("queueloader onloaded");
            var loader: ILoader = e.loader;

            loader.removeEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoader, this);

            this.taskTotal++;
            this.queueLoader.shift();

            this._event.eventType = LoaderEvent3D.LOADER_PROGRESS;
            this._event.target = this;
            this._event.loader = loader;
            this._event.data = loader.data;
            this.dispatchEvent(this._event);

            if (this.queueLoader.length > 0) {
                var url: string = this.queueLoader[0];
                this.currentLoader = this.dictLoader[url];
                this.currentLoader.load(url);
                this.currentLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoader, this);
            }
            else {

                this._event.eventType = LoaderEvent3D.LOADER_COMPLETE;
                this._event.target = this;

                this._event.loader = loader;
                this._event.data = loader.data;

                this.dispatchEvent(this._event);

                this.currentLoader = null;
                this.taskTotal = 0;
                this.taskCurrent = 0;
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
            this.dictLoader = {};
        }
    }
}