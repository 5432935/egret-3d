module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.QueueLoader
    * @classdesc
    * 队列加载器。</p>
    * 每个加载对象都是一个 UnitLoader。</p>
    * 可以进行多个资源形成队列加载。</p>
    * 可加载文件。</p>
    * *.text|*.txt|*.xml|*.json 文本类型          ----- <string>转换 </p>
    * * MapConfig.json 加载的 由unity3d插件导出文件 ----- <Object3D></p>
    * *.png|*.jpg                                 ----- <ImageTexture>转换 </p>
    * *.dds|*.hdr|*.tga                           ----- <Texture>转换 </p>
    * *.esm                                       ----- <Geometry>转换 </p>
    * *.eam                                       ----- <SkeletonAnimationClip>转换 </p>
    * *.epa                                       ----- <PropertyAnim>转换 </p>
    * 加载后会触发事件。</p>
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
        public load(url: string): UnitLoader {
            if (this.dictLoader[url]) {
                Egret3DLog.outWarn("已经加载过[" + url + "]");
                return this.dictLoader[url];
            }

            this.taskTotal++;
            var loader: UnitLoader = new UnitLoader();
            this.dictLoader[url] = loader;
            loader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onComplete, this);
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
        * 获取资源数据</p>
        * *.text|*.txt|*.xml|*.json 文本类型          ----- <string>转换 </p>
        * *MapConfig.json 加载的 由unity3d插件导出文件 ----- <Object3D>   根据导出类型 Scene3D Role EffectGroup </p>
        * *.png|*.jpg                                 ----- <ImageTexture>转换 </p>
        * *.dds|*.hdr|*.tga                           ----- <Texture>转换 </p>
        * *.esm                                       ----- <Geometry>转换 </p>
        * *.eam                                       ----- <SkeletonAnimationClip>转换 </p>
        * *.epa                                       ----- <PropertyAnim>转换 </p>
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
         * 获取安装配置好的动画，通过插件导出的数据 </p>
         * @param url 文件路径
         * @returns Mesh 配置好的动画
         * @see egret3d.ILoader.data
         * @version Egret 3.0
         * @platform Web,Native
         */
        public getAnim(url: string): Mesh {
            var obj = this.getAsset(url);
            if (obj instanceof Mesh)
                return <Mesh>this.getAsset(url);
            return null;
        }

        /**
         * @language zh_CN
         * 获取加载的贴图纹理 *.png|*.jpg|*.dds|*.hdr|*.tga  </p>
         * @param url 文件路径
         * @returns ITexture *.png|*.jpg|*.dds|*.hdr|*.tga 贴图纹理
         * @see egret3d.ILoader.data
         * @version Egret 3.0
         * @platform Web,Native
         */
        public getTexture(url: string): ITexture {
            var obj = this.getAsset(url);
            if (obj instanceof ITexture)
                return <Texture>this.getAsset(url);
            return null;
        }

        /**
       * @language zh_CN
       * 获取加载的场景 对应 MapConfig.json 场景容器</p>
       * @param url 文件路径
       * @returns Object3D 场景容器
       * @see egret3d.ILoader.data
       * @version Egret 3.0
       * @platform Web,Native
       */
        public getScene(url: string): Object3D {
            var obj = this.getAsset(url);
            if (obj instanceof Object3D )
                return <Object3D>this.getAsset(url);
            return null;
        }

        /**
        * @language zh_CN
        * 获取加载的动画 对应 *.text|*.txt|*.xml|*.json 文本类型</p>
        * @param url 文件路径
        * @returns string *.text|*.txt|*.xml|*.json 文本类型
        * @see egret3d.ILoader.data
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getText(url: string): string {
            var obj = this.getAsset(url);
            return this.getAsset(url);
        }

       /**
        * @language zh_CN
        * 获取加载的模型，对应 *.esm 文件</p>
        * @param url 文件路径
        * @returns Geometry 获取加载的模型
        * @see egret3d.ILoader.data
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getGeometry(url: string): Geometry {
            var obj = this.getAsset(url);
            if (obj instanceof Geometry)
                return <Geometry>this.getAsset(url);
            return null;
        }

        /**
       * @language zh_CN
       * 获取加载的动画 对应 *.eam </p>
       * @param url 文件路径
       * @returns SkeletonAnimationClip 获取加载的模型
       * @see egret3d.ILoader.data
       * @version Egret 3.0
       * @platform Web,Native
       */   
        public getSkeletonAnimationClip(url: string): SkeletonAnimationClip {
            var obj = this.getAsset(url);
            if (obj instanceof SkeletonAnimationClip)
                return <SkeletonAnimationClip>this.getAsset(url);
            return null;
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

        protected onComplete(e: LoaderEvent3D) {
            var loader: ILoader = e.loader;

            loader.removeEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onComplete, this);
            loader.removeEventListener(LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);

            this.taskCurrent++;
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
                this.guiComplete();

                this.currentLoader = null;
                this.currentProgress = 1.0;

                this._event.eventType = LoaderEvent3D.LOADER_PROGRESS;
                this._event.currentProgress = this.currentProgress;
                this.dispatchEvent(this._event);

                var currentLoader: UnitLoader = this.currentLoader;
                var taskTotal: number = this.taskTotal;
                var taskCurrent: number = this.taskCurrent;

                var removeList: string[] = [];
                for (var key in this.dictProgress) {
                    removeList.push(key);
                }

                var currentProgress: number = this.currentProgress;
                var lastProgress: number = this.lastProgress;

                this._event.eventType = LoaderEvent3D.LOADER_COMPLETE;
                this._event.currentProgress = this.currentProgress;
                this.dispatchEvent(this._event);

                this.taskTotal = this.taskTotal - taskTotal;
                this.taskCurrent = this.taskCurrent - taskCurrent;

                for (var i: number = 0; i < removeList.length; ++i) {
                    if (this.dictProgress[removeList[i]] > 0) {
                        delete this.dictProgress[removeList[i]];
                    }
                }

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
                    this.currentProgress += 1 / (this.taskTotal) * this.dictProgress[key];
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
        * 加载默认的GUI皮肤
        * @version Egret 3.0
        * @platform Web,Native
        */
        public loadDefaultGUISkin() {
            var fontsLoader = this.load("resource/ui/fonts.json");
            var guiLoader = this.load("resource/ui/GUI.json");
        }

        private guiComplete() {
            gui.BitmapFont.load(textureResMgr.getTextureDic());
            gui.GUISkinManager.instance.initDefaultSkin();
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


        /**
        * @language zh_CN
        * 释放UnitLoader
        * @prame url 资源路径
        * @version Egret 3.0
        * @platform Web,Native
        */
        public disposeUnitLoader(url: string) {
            if (this.dictLoader[url]) {
                this.dictLoader[url].dispose();
                delete this.dictLoader[url];
            }
        }
    }
}