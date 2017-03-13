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
    var QueueLoader = (function (_super) {
        __extends(QueueLoader, _super);
        /**
        * @language zh_CN
        * 加载文件  可以为任意文件
        * @param url 默认参数为null  文件路径
        * @version Egret 3.0
        * @platform Web,Native
        */
        function QueueLoader(url) {
            if (url === void 0) { url = null; }
            var _this = _super.call(this) || this;
            _this.dictLoader = {};
            _this.currentLoader = null;
            _this.dictProgress = {};
            _this.queueLoader = [];
            _this._event = new egret3d.LoaderEvent3D();
            /**
            * @language zh_CN
            * 任务总数
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.taskTotal = 0;
            /**
            * @language zh_CN
            * 当前完成的任务个数
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.taskCurrent = 0;
            /**
            * @language zh_CN
            * 当前进度
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.currentProgress = 0;
            _this.lastProgress = 0;
            if (url) {
                _this.load(url);
            }
            return _this;
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
        QueueLoader.prototype.load = function (url) {
            if (this.dictLoader[url]) {
                egret3d.Egret3DLog.outWarn("已经加载过[" + url + "]");
                return this.dictLoader[url];
            }
            this.taskTotal++;
            var loader = new egret3d.UnitLoader();
            this.dictLoader[url] = loader;
            loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onComplete, this);
            loader.addEventListener(egret3d.LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);
            this.dictProgress[url] = 0;
            this.queueLoader.push(url);
            if (!this.currentLoader) {
                this.currentLoader = this.dictLoader[url];
                this.currentLoader.load(url);
            }
            return loader;
        };
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
        QueueLoader.prototype.addAssetEventListener = function (url, type, callback, thisObject, param, priority) {
            if (param === void 0) { param = null; }
            if (priority === void 0) { priority = 0; }
            var loader = this.dictLoader[url];
            if (loader) {
                return loader.addEventListener(type, callback, thisObject, param, priority);
            }
            return 0;
        };
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
        QueueLoader.prototype.removeAssetEventListener = function (url, type, callback, thisObject, param, priority) {
            if (param === void 0) { param = null; }
            if (priority === void 0) { priority = 0; }
            var loader = this.dictLoader[url];
            if (loader) {
                loader.removeEventListener(type, callback, thisObject);
            }
        };
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
        QueueLoader.prototype.getAsset = function (url) {
            if (this.dictLoader[url]) {
                return this.dictLoader[url].data;
            }
            return egret3d.textureResMgr.getTexture(url);
        };
        /**
         * @language zh_CN
         * 获取安装配置好的动画，通过插件导出的数据 </p>
         * @param url 文件路径
         * @returns Mesh 配置好的动画
         * @see egret3d.ILoader.data
         * @version Egret 3.0
         * @platform Web,Native
         */
        QueueLoader.prototype.getAnim = function (url) {
            var obj = this.getAsset(url);
            if (obj instanceof egret3d.Mesh)
                return this.getAsset(url);
            return null;
        };
        /**
         * @language zh_CN
         * 获取加载的贴图纹理 *.png|*.jpg|*.dds|*.hdr|*.tga  </p>
         * @param url 文件路径
         * @returns ITexture *.png|*.jpg|*.dds|*.hdr|*.tga 贴图纹理
         * @see egret3d.ILoader.data
         * @version Egret 3.0
         * @platform Web,Native
         */
        QueueLoader.prototype.getTexture = function (url) {
            var obj = this.getAsset(url);
            if (obj instanceof egret3d.ITexture)
                return this.getAsset(url);
            return null;
        };
        /**
       * @language zh_CN
       * 获取加载的场景 对应 MapConfig.json 场景容器</p>
       * @param url 文件路径
       * @returns Object3D 场景容器
       * @see egret3d.ILoader.data
       * @version Egret 3.0
       * @platform Web,Native
       */
        QueueLoader.prototype.getScene = function (url) {
            var obj = this.getAsset(url);
            if (obj instanceof egret3d.Object3D)
                return this.getAsset(url);
            return null;
        };
        /**
        * @language zh_CN
        * 获取加载的动画 对应 *.text|*.txt|*.xml|*.json 文本类型</p>
        * @param url 文件路径
        * @returns string *.text|*.txt|*.xml|*.json 文本类型
        * @see egret3d.ILoader.data
        * @version Egret 3.0
        * @platform Web,Native
        */
        QueueLoader.prototype.getText = function (url) {
            var obj = this.getAsset(url);
            return this.getAsset(url);
        };
        /**
         * @language zh_CN
         * 获取加载的模型，对应 *.esm 文件</p>
         * @param url 文件路径
         * @returns Geometry 获取加载的模型
         * @see egret3d.ILoader.data
         * @version Egret 3.0
         * @platform Web,Native
         */
        QueueLoader.prototype.getGeometry = function (url) {
            var obj = this.getAsset(url);
            if (obj instanceof egret3d.Geometry)
                return this.getAsset(url);
            return null;
        };
        /**
       * @language zh_CN
       * 获取加载的动画 对应 *.eam </p>
       * @param url 文件路径
       * @returns SkeletonAnimationClip 获取加载的模型
       * @see egret3d.ILoader.data
       * @version Egret 3.0
       * @platform Web,Native
       */
        QueueLoader.prototype.getAnimClip = function (url) {
            var obj = this.getAsset(url);
            if (obj instanceof egret3d.SkeletonAnimationClip)
                return this.getAsset(url);
            return null;
        };
        /**
        * @language zh_CN
        * 获取每个资源的URLLoader对象
        * 如果获取的是配置文件会返回配置文件的源数据，而不是解释后的数据
        * @param url 文件路径
        * @returns URLLoader  URLLoader对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        QueueLoader.prototype.getAssetURLLoader = function (url) {
            return egret3d.assetMgr.findAsset(url, this);
        };
        /**
        * @language zh_CN
        * 获取每个资源的UnitLoader对象
        * @param url 文件路径
        * @returns UnitLoader  UnitLoader对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        QueueLoader.prototype.getUnitLoader = function (url) {
            return this.dictLoader[url];
        };
        QueueLoader.prototype.onComplete = function (e) {
            var loader = e.loader;
            loader.removeEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onComplete, this);
            loader.removeEventListener(egret3d.LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);
            this.taskCurrent++;
            this.queueLoader.shift();
            this._event.eventType = egret3d.LoaderEvent3D.LOADER_ONCE_COMPLETE;
            this._event.loader = loader;
            this._event.data = loader.data;
            this._event.currentProgress = this.currentProgress;
            this.dispatchEvent(this._event);
            if (this.queueLoader.length > 0) {
                var url = this.queueLoader[0];
                this.currentLoader = this.dictLoader[url];
                this.currentLoader.load(url);
            }
            else {
                this.guiComplete();
                this.currentLoader = null;
                this.currentProgress = 1.0;
                this._event.eventType = egret3d.LoaderEvent3D.LOADER_PROGRESS;
                this._event.currentProgress = this.currentProgress;
                this.dispatchEvent(this._event);
                var currentLoader = this.currentLoader;
                var taskTotal = this.taskTotal;
                var taskCurrent = this.taskCurrent;
                var removeList = [];
                for (var key in this.dictProgress) {
                    removeList.push(key);
                }
                var currentProgress = this.currentProgress;
                var lastProgress = this.lastProgress;
                this._event.eventType = egret3d.LoaderEvent3D.LOADER_COMPLETE;
                this._event.currentProgress = this.currentProgress;
                this.dispatchEvent(this._event);
                this.taskTotal = this.taskTotal - taskTotal;
                this.taskCurrent = this.taskCurrent - taskCurrent;
                for (var i = 0; i < removeList.length; ++i) {
                    if (this.dictProgress[removeList[i]] > 0) {
                        delete this.dictProgress[removeList[i]];
                    }
                }
                this.currentProgress = 0;
                this.lastProgress = 0;
            }
        };
        QueueLoader.prototype.onProgress = function (e) {
            var load = e.target;
            if (this.dictProgress[load.url] != undefined) {
                this.dictProgress[load.url] = load.currentProgress;
                this.currentProgress = 0;
                for (var key in this.dictProgress) {
                    this.currentProgress += 1 / (this.taskTotal) * this.dictProgress[key];
                }
                if (this.lastProgress < this.currentProgress) {
                    this.lastProgress = this.currentProgress;
                    this._event.eventType = egret3d.LoaderEvent3D.LOADER_PROGRESS;
                    this._event.loader = load;
                    this._event.data = load.data;
                    this._event.currentProgress = this.currentProgress;
                    this.dispatchEvent(this._event);
                }
            }
        };
        /**
        * @language zh_CN
        * 加载默认的GUI皮肤
        * @version Egret 3.0
        * @platform Web,Native
        */
        QueueLoader.prototype.loadDefaultGUISkin = function () {
            var fontsLoader = this.load("resource/ui/fonts.json");
            var guiLoader = this.load("resource/ui/GUI.json");
        };
        QueueLoader.prototype.guiComplete = function () {
            egret3d.gui.BitmapFont.load(egret3d.textureResMgr.getTextureDic());
            egret3d.gui.GUISkinManager.instance.initDefaultSkin();
        };
        /**
        * @language zh_CN
        * 释放所有数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        QueueLoader.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            for (var key in this.dictLoader) {
                this.dictLoader[key].dispose();
            }
            egret3d.assetMgr.dispose(this);
            this.dictLoader = {};
        };
        /**
        * @language zh_CN
        * 释放UnitLoader
        * @prame url 资源路径
        * @version Egret 3.0
        * @platform Web,Native
        */
        QueueLoader.prototype.disposeUnitLoader = function (url) {
            if (this.dictLoader[url]) {
                this.dictLoader[url].dispose();
                delete this.dictLoader[url];
            }
        };
        return QueueLoader;
    }(egret3d.EventDispatcher));
    egret3d.QueueLoader = QueueLoader;
    __reflect(QueueLoader.prototype, "egret3d.QueueLoader");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=QueueLoader.js.map