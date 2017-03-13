var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
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
    var AssetManager = (function () {
        function AssetManager() {
            this._loaderDict = {};
            this._queueLoader = [];
            this._loaderEvent = new egret3d.LoaderEvent3D();
            this._binaryDict = {};
            this._binaryUrlDict = {};
        }
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
        AssetManager.prototype.loadAsset = function (url, callback, thisObject, param) {
            if (param === void 0) { param = null; }
            return this.addEventListener(url, egret3d.LoaderEvent3D.LOADER_COMPLETE, callback, thisObject, param);
        };
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
        AssetManager.prototype.addEventListener = function (url, type, callback, thisObject, param) {
            var _this = this;
            if (param === void 0) { param = null; }
            var asset = this._loaderDict[url];
            if (!asset) {
                asset = {};
                this._loaderDict[url] = asset;
                if (this.getByteArray(url)) {
                    asset.loader = new egret3d.BinaryLoader();
                }
                else {
                    asset.loader = new egret3d.URLLoader();
                }
                asset.objects = [];
                var loader = asset.loader;
                loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onComplete, this);
                this._queueLoader.push(url);
                if (!this._currentLoader) {
                    this._currentLoader = loader;
                    this._currentLoader.load(url);
                }
            }
            var loader = asset.loader;
            loader.param = param;
            if (param instanceof egret3d.UnitNodeData) {
                loader.unitNodeData = param;
            }
            if (loader.data) {
                setTimeout(function () {
                    _this._loaderEvent.eventType = type;
                    _this._loaderEvent.target = loader;
                    _this._loaderEvent.loader = loader;
                    _this._loaderEvent.data = loader.data;
                    _this._loaderEvent.param = param;
                    if (callback) {
                        callback.call(thisObject, _this._loaderEvent);
                    }
                    _this._loaderEvent.target = null;
                    _this._loaderEvent.loader = null;
                    _this._loaderEvent.data = null;
                    _this._loaderEvent.param = null;
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
        };
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
        AssetManager.prototype.findAsset = function (url, thisObject) {
            if (thisObject === void 0) { thisObject = null; }
            var asset = this._loaderDict[url];
            if (asset) {
                if (thisObject) {
                    if (asset.objects.indexOf(thisObject) < 0) {
                        asset.objects.push(thisObject);
                    }
                }
                return asset.loader;
            }
            return null;
        };
        /**
        * @language zh_CN
        * 释放资源引用 没有引用的资源将会被进行释放
        * @param object 对象使用的资源的引用进行释放
        * @version Egret 3.0
        * @platform Web,Native
        */
        AssetManager.prototype.dispose = function (object) {
            var keys = [];
            for (var key in this._loaderDict) {
                var data = this._loaderDict[key];
                var index = data.objects.indexOf(object);
                if (index >= 0) {
                    data.objects.splice(index, 1);
                }
                if (data.objects.length <= 0) {
                    keys.push(key);
                }
            }
            for (var i = 0; i < keys.length; ++i) {
                var data = this._loaderDict[keys[i]];
                data.loader.dispose();
                data.loader = null;
                data.objects = null;
                delete this._loaderDict[keys[i]];
            }
            keys = null;
        };
        AssetManager.prototype.onComplete = function (e) {
            this._queueLoader.shift();
            if (this._queueLoader.length > 0) {
                var data = this._loaderDict[this._queueLoader[0]];
                var loader = data.loader;
                loader.load(this._queueLoader[0]);
                this._currentLoader = loader;
            }
            else {
                this._currentLoader = null;
            }
        };
        AssetManager.prototype.addByteArray = function (url, byte, parentUrl) {
            this._binaryDict[url] = byte;
            var urlArray = this._binaryUrlDict[parentUrl];
            if (!urlArray) {
                urlArray = [];
                this._binaryUrlDict[parentUrl] = urlArray;
            }
            urlArray.push(url);
        };
        AssetManager.prototype.removeByteArray = function (parentUrl) {
            var urlArray = this._binaryUrlDict[parentUrl];
            if (urlArray) {
                for (var i = 0; i < urlArray.length; ++i) {
                    delete this._binaryDict[urlArray[i]];
                }
                delete this._binaryUrlDict[parentUrl];
            }
        };
        AssetManager.prototype.getByteArray = function (url) {
            return this._binaryDict[url];
        };
        return AssetManager;
    }());
    egret3d.AssetManager = AssetManager;
    __reflect(AssetManager.prototype, "egret3d.AssetManager");
    /**
    * @private
    * @language zh_CN
    * 资源管理对象 内部资源管理直接使用此对象
    * @version Egret 3.0
    * @platform Web,Native
    */
    egret3d.assetMgr = new AssetManager();
})(egret3d || (egret3d = {}));
//# sourceMappingURL=AssetManager.js.map