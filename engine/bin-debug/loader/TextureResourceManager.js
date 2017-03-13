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
    * @private
    * @class egret3d.gui.TextureResourceManager
    * @classdesc
    * gui贴图资源加载管理器,</p>
    * 用于加载由TexturePacker生成的贴图资源</p>
    * @version Egret 3.0
    * @platform Web,Native
    */
    var TextureResourceManager = (function (_super) {
        __extends(TextureResourceManager, _super);
        function TextureResourceManager() {
            var _this = _super.call(this) || this;
            _this._textureDic = {};
            _this._urlTextureDic = {};
            _this._bigTextureDic = {};
            _this._count = 0;
            _this.resetCount();
            return _this;
        }
        Object.defineProperty(TextureResourceManager.prototype, "guiStage", {
            get: function () {
                return this._guiStage;
            },
            /**
            * @private
            * @language zh_CN
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (guiStage) {
                this._guiStage = guiStage;
            },
            enumerable: true,
            configurable: true
        });
        //重置加载计数
        TextureResourceManager.prototype.resetCount = function () {
            this._totalCount = 0;
            this._loadedCount = 0;
        };
        Object.defineProperty(TextureResourceManager.prototype, "totalCount", {
            /**
           * @language zh_CN
           * 获取当前总的加载数量
           * @version Egret 3.0
           * @platform Web,Native
           */
            get: function () {
                return this._totalCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextureResourceManager.prototype, "loadedCount", {
            /**
         * @language zh_CN
         * 获取当前已加载完成的数量
         * @version Egret 3.0
         * @platform Web,Native
         */
            get: function () {
                return this._loadedCount;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
        * @language zh_CN
        * 加载由texturePack生成的资源文件.</p>
        * 连续调用时. 将会队列加载文件.
        * 全部加载完成时会抛出LoaderEvent3D.LOADER_COMPLETE事件.
        * 单个加载完成会抛出LoaderEvent3D.LOADER_PROGRESS事件
        * @param jsonUrl 由TexturePack生成的json配置文件
        * @param bitmapUrl 由TexturePack生成的png图片文件
        * @param gui view3d中的quadStage对象.一般不用传, 在调用View3d.openGUI时就已经初始化了.
        * @version Egret 3.0
        * @platform Web,Native
        */
        TextureResourceManager.prototype.loadTexture = function (jsonUrl, bitmapUrl) {
            var _this = this;
            var jsonArrayParser = function (sourceTexture, jsonData) {
                var frames = jsonData["frames"];
                for (var i = 0; i < frames.length; i++) {
                    var frame = frames[i];
                    var name = frame["filename"];
                    var frameRect = frame["frame"];
                    var tex = new egret3d.Texture();
                    tex.copyFromTexture(sourceTexture, frameRect["x"] / sourceTexture.width, frameRect["y"] / sourceTexture.height, frameRect["w"] / sourceTexture.width, frameRect["h"] / sourceTexture.height);
                    tex.width = frameRect['w'];
                    tex.height = frameRect["h"];
                    if (_this._textureDic[name]) {
                        console.log("TextureResourceManager::loadTexture, 贴图缓存池里已经有相同名字的贴图. 请检查, name: " + name + " url:" + jsonUrl);
                    }
                    _this._textureDic[name] = tex;
                }
            };
            this._count++;
            this._totalCount++;
            var loadJsonFun = function (sourceTex) {
                var jsonLoader = new egret3d.URLLoader(jsonUrl);
                jsonLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, function (e) {
                    sourceTex.useMipmap = false;
                    egret3d.registGUITexture(sourceTex);
                    jsonArrayParser(sourceTex, JSON.parse(jsonLoader.data));
                    _this._count--;
                    _this._loadedCount++;
                    _this.dispatchEvent(new egret3d.LoaderEvent3D(egret3d.LoaderEvent3D.LOADER_PROGRESS));
                    if (_this._count === 0) {
                        _this.resetCount();
                        setTimeout(function () {
                            _this.dispatchEvent(new egret3d.LoaderEvent3D(egret3d.LoaderEvent3D.LOADER_COMPLETE));
                        }, 0);
                    }
                }, _this);
            };
            var texLoader = new egret3d.URLLoader(bitmapUrl);
            texLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, function (e) {
                loadJsonFun(texLoader.data);
            }, this);
        };
        /**
         *
         * @private
         * @returns {}
         */
        TextureResourceManager.prototype.getTextureDic = function () {
            return this._textureDic;
        };
        /**
               * @language zh_CN
               * 获取贴图
               * @param name 贴图名,由json中的名字获得
               *
               * @version Egret 3.0
               * @platform Web,Native
               */
        TextureResourceManager.prototype.getTexture = function (name) {
            return this._textureDic[name];
        };
        //       
        //        public static getInstance(): TextureResourceManager {
        //            if (!this._instance) {
        //                this._instance = new TextureResourceManager();
        //            }
        //            return this._instance;
        //        }
        TextureResourceManager.prototype.addTexture = function (url, json, texture) {
            egret3d.registGUITexture(texture);
            this._bigTextureDic[url] = texture;
            var tempNameAry = [];
            this._urlTextureDic[url] = tempNameAry;
            var frames = json["frames"];
            var name;
            for (var i = 0; i < frames.length; i++) {
                var frame = frames[i];
                name = frame["filename"];
                var frameRect = frame["frame"];
                var tex = new egret3d.Texture();
                tex.copyFromTexture(texture, frameRect["x"] / texture.width, frameRect["y"] / texture.height, frameRect["w"] / texture.width, frameRect["h"] / texture.height);
                tex.width = frameRect['w'];
                tex.height = frameRect["h"];
                if (this._textureDic[name]) {
                    console.log("TextureResourceManager::loadTexture, 贴图缓存池里已经有相同名字的贴图. 请检查, url: " + url);
                }
                this._textureDic[name] = tex;
                tempNameAry.push(name);
            }
        };
        TextureResourceManager.prototype.removeTexture = function (url) {
            var ary = this._urlTextureDic[url];
            if (ary) {
                for (var i = 0; i < ary.length; i++) {
                    delete this._textureDic[ary[i]];
                }
            }
        };
        return TextureResourceManager;
    }(egret3d.EventDispatcher));
    egret3d.TextureResourceManager = TextureResourceManager;
    __reflect(TextureResourceManager.prototype, "egret3d.TextureResourceManager");
    /*
    * @private
    */
    egret3d.textureResMgr = new TextureResourceManager();
})(egret3d || (egret3d = {}));
//# sourceMappingURL=TextureResourceManager.js.map