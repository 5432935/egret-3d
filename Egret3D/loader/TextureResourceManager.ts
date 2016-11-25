module egret3d {

    /**
    * @private
    * @class egret3d.gui.TextureResourceManager
    * @classdesc
    * gui贴图资源加载管理器,</p>
    * 用于加载由TexturePacker生成的贴图资源</p>
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class TextureResourceManager extends egret3d.EventDispatcher {
//        private static _instance: TextureResourceManager;
        private _textureDic: Object;//小贴图缓存
        private _count: number;
        private _totalCount: number;
        private _loadedCount:number;
        private _guiStage:QuadStage;
        private _urlTextureDic:Object;//{key, [texturename, texturename]}键为url字符串, 值为数组.里面包含这个大图里的texture名称.用于清理内存用
        private _bigTextureDic:Object;//大包的贴图缓存.用于后注册gui时使用
        constructor() {
            super();
            this._textureDic = {};
            this._urlTextureDic = {};
            this._bigTextureDic = {};
            this._count = 0;
            this.resetCount();
        }
        /**
        * @private 
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set guiStage(guiStage: QuadStage) {
            this._guiStage = guiStage;
        }

        public get guiStage(): QuadStage {
            return this._guiStage;
        }

        //重置加载计数
        private resetCount() {
            this._totalCount = 0;
            this._loadedCount = 0;
        }

         /**
        * @language zh_CN
        * 获取当前总的加载数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get totalCount(): number {
            return this._totalCount;
        }

           /**
        * @language zh_CN
        * 获取当前已加载完成的数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get loadedCount(): number {
            return this._loadedCount;
        }
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
        private loadTexture(jsonUrl: string, bitmapUrl: string) {
            var jsonArrayParser:Function = (sourceTexture:Texture, jsonData) => {
                var frames = jsonData["frames"];
                for (var i: number = 0; i < frames.length; i++) {
                    var frame = frames[i];
                    var name = frame["filename"];
                    var frameRect = frame["frame"];
                    var tex: Texture = new Texture();
                    tex.copyFromTexture(sourceTexture, frameRect["x"] / sourceTexture.width,
                        frameRect["y"]/sourceTexture.height, frameRect["w"]/sourceTexture.width, frameRect["h"]/sourceTexture.height);
                    tex.width = frameRect['w'];
                    tex.height = frameRect["h"];
                    if (this._textureDic[name]) {
                        console.log("TextureResourceManager::loadTexture, 贴图缓存池里已经有相同名字的贴图. 请检查, name: " + name + " url:"  + jsonUrl);
                    }
                    this._textureDic[name] = tex;
                }
            }

            this._count++;
            this._totalCount++;
            var loadJsonFun: Function = (sourceTex: ITexture) => {

                var jsonLoader: URLLoader = new URLLoader(jsonUrl);
                jsonLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE,
                    e => {
                        sourceTex.useMipmap = false;
                        registGUITexture(sourceTex);
                        jsonArrayParser(sourceTex, JSON.parse(jsonLoader.data));
                        this._count--;
                        this._loadedCount++;
                        this.dispatchEvent(new LoaderEvent3D(LoaderEvent3D.LOADER_PROGRESS));
                        if (this._count === 0) {
                            this.resetCount();
                            setTimeout(() => {
                                    this.dispatchEvent(new LoaderEvent3D(LoaderEvent3D.LOADER_COMPLETE));
                                },
                                0);
                        }
                    },
                    this);
            };

            var texLoader: URLLoader = new URLLoader(bitmapUrl);
            texLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE,
                e => {
                    loadJsonFun(<ITexture>texLoader.data);
                },
                this);
        }

        /**
         *
         * @private 
         * @returns {} 
         */
        public getTextureDic(): Object {
            return this._textureDic;
        }
 /**
        * @language zh_CN
        * 获取贴图
        * @param name 贴图名,由json中的名字获得
        * 
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getTexture(name: string): Texture {
            return <Texture>this._textureDic[name];
        }

//       
//        public static getInstance(): TextureResourceManager {
//            if (!this._instance) {
//                this._instance = new TextureResourceManager();
//            }
//            return this._instance;
//        }

        public addTexture(url: string, json: any, texture: ITexture) {
                   egret3d.registGUITexture(texture);


            this._bigTextureDic[url] = texture;

            let tempNameAry = [];
            this._urlTextureDic[url] = tempNameAry;
            const frames = json["frames"];
            let name: string
            for (let i: number = 0; i < frames.length; i++) {
                let frame = frames[i];
                name = frame["filename"];
                let frameRect = frame["frame"];
                let tex: Texture = new Texture();
                tex.copyFromTexture(texture, frameRect["x"] / texture.width,
                    frameRect["y"] / texture.height, frameRect["w"] / texture.width, frameRect["h"] / texture.height);
                tex.width = frameRect['w'];
                tex.height = frameRect["h"];
                if (this._textureDic[name]) {
                    console.log("TextureResourceManager::loadTexture, 贴图缓存池里已经有相同名字的贴图. 请检查, url: " + url);
                }
                this._textureDic[name] = tex;
                tempNameAry.push(name);
            }
        }

        public removeTexture(url: string) {
            let ary: string[] = this._urlTextureDic[url];
            if (ary) {
                for (let i: number = 0; i < ary.length; i++) {
                    delete this._textureDic[ary[i]];
                }
            }
        }
    }

    /*
    * @private
    */
    export var textureResMgr: TextureResourceManager = new TextureResourceManager();
}
