module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.UnitLoader
    * @classdesc
    * 单个资源 加载器</p>
    * 主要封装了esm/jpg/png/eam/epa/uinty3d导出的配置文件/的加载和组装</p>
    * 以及mesh的render method相关信息，和灯光数据的生效.</p>
    * 加载完毕后，会派发事件</p>
    * 1.LoaderEvent3D.LOADER_COMPLETE 加载完成后事件响应</p>
    * 1.LoaderEvent3D.LOADER_PROGRESS 加载过程中事件响应</p>
    *
    * @see egret3d.ILoader
    * @see egret3d.LoaderEvent3D
    *
    * @includeExample loader/UnitLoader.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UnitLoader extends ILoader {

        /**
        * @language zh_CN
        * Object3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static NODE_TYPE_Object3D: string = "Object3D";

        /**
        * @language zh_CN
        * Camera3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static NODE_TYPE_Camera3D: string = "Camera3D";

        /**
        * @language zh_CN
        * @private
        * CubeSky
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static NODE_TYPE_CubeSky: string = "CubeSky";

        /**
        * @language zh_CN
        * @private
        * SphereSky
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static NODE_TYPE_SphereSky: string = "SphereSky";

        /**
        * @language zh_CN
        * Mesh
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static NODE_TYPE_MESH: string = "Mesh";

        /**
        * @language zh_CN
        * Terrain
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static NODE_TYPE_Terrain: string = "Terrain";

        /**
        * @language zh_CN
        * ParticleEmitter
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static NODE_TYPE_ParticleEmitter: string = "ParticleEmitter";

        /**
        * @language zh_CN
        * EffectGroup
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static NODE_TYPE_EffectGroup: string = "EffectGroup";
        
        /**
        * @language zh_CN
        * 场景对象的所有根节点.
        * 如果是配置文件，加载完后将后有值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public container: Object3D = null;

        /**
        * @private
        * @language zh_CN
        * 加载资源的URLLoader对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public loader: URLLoader = null;

        /**
        * @language zh_CN
        * 是否自动播放动画  默认不自动播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public autoPlayAnimation: boolean = false;

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get configParser(): IConfigParser {
            return this._configParser;
        }

        /**
        * @language zh_CN
        * 获取根目录
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get pathRoot(): string {
            return this._pathRoot;
        }

        /**
        * @language zh_CN
        * 设置根目录
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set pathRoot(path: string) {
            this._pathRoot = path;
        }

        private _pathRoot: string = "";
        private _configParser: IConfigParser = null;
        private _mapParser: UnitConfigParser = null;
        private _particleParser: ParticleParser = null;
        private _texturePackerParser: TexturePackerParser = null;
        private _taskCount: number = 0;
        private _event: LoaderEvent3D = new LoaderEvent3D();

        private _type: string = "";


        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public view3d: View3D;

        private _taskDict: any = {};
        private _textures: any = {};

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public skinClipDict: any = {};

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public proAnimDict: any = {};

        protected unitLoaderList: UnitLoader[] = [];
        protected _dictUnitLoader: { [url: string]: { pathRoot:string, loader:UnitLoader} } = {};
        protected _unitQueue: string[] = [];
        protected _currentUnitLoader: UnitLoader;

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public huds: HUD[] = [];

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public lightDict: any = {};

        protected texturePackerUrl: string;

        protected autoAnimationList: any[] = [];
        protected continueProgressEvent: string[] = [];

        /*
        * @private
        */
        public addAutoAnimation(animation: any, speed: number = 1.0, reset: boolean = false, prewarm: boolean = false, name: string = "") {
            var auto: any = {};
            auto.animation = animation;
            auto.speed = speed;
            auto.reset = reset;
            auto.prewarm = prewarm;
            auto.name = name;
            this.autoAnimationList.push(auto);
        }

        /**
        * @language zh_CN
        * uv2 数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        protected uv2Dict: { [key: number]: ByteArray };
        /**
        * @language zh_CN
        * 加载配置文件 .json 或 .xml,
        * 如果是配置文件 暂时只能支持.json (Unity3d 中的egret3d插件可以直接导出)
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

        protected createObject(): Object3D {
            return new Object3D();
        }
        /**
        * @language zh_CN
        * 查找贴图
        * @param name 贴图名字
        * @version Egret 3.0
        * @platform Web,Native
        */
        public findTexture(name: string): ITexture {
            return this._textures[name];
        }

        /**
        * @language zh_CN
        * 加载文件
        * @param url 文件路径
        * @version Egret 3.0
        * @platform Web,Native
        */
        public load(url: string) {
            this.reset();

            this.resourceName = StringUtil.getURLName(url);
            this.url = url;
            this.pathRoot = StringUtil.getPath(url);
            this._type = StringUtil.getFileFormat(url);

            this.taskTotal++;
            this._taskDict[this.url] = {};
            this._taskDict[this.url].status = 1;
            this._taskDict[this.url].currentProgress = 0;

            if (this._type == ILoader.DATAFORMAT_E3DPACK) {
                this.loader = this.doAssetLoader(this.url, this.onE3dPack);
                var path: string = this.pathRoot + "MapConfig.json";
                this.processUrlContinue(path);
            }
            else {
                this.loader = this.doAssetLoader(this.url, this.onConfigLoad);
            }

            this.processUrlContinue(url);
        }

        protected onE3dPack(e: LoaderEvent3D) {
            var loader: ILoader = e.loader;

            this._type = ILoader.DATAFORMAT_JSON;
            this.pathRoot += this.resourceName + "/";

            var path: string = this.pathRoot + "MapConfig.json";

            if (assetMgr.getByteArray(path)) {
                this.taskTotal++;
                this._taskDict[path] = {};
                this._taskDict[path].status = 1;
                this._taskDict[path].currentProgress = 0;

                this.doAssetLoader(path, this.onConfigLoad, this);
            }

            this.processTask(loader);
        }

        // 是否跳过
        protected processUrlContinue(url: string) {
            var format: string = StringUtil.getFileFormat(url);
            if (format == ILoader.DATAFORMAT_E3DPACK) {
                this.continueProgressEvent.push(url);
            }

            if (format == ILoader.DATAFORMAT_JSON) {
                this.continueProgressEvent.push(url);
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
            this.reset();
            this.container = null;
        }

        protected onProgress(e: LoaderEvent3D) {

            var targetLoader: ILoader = <ILoader>e.target;

            if (this._taskDict[targetLoader.url]) {
                //for (var i: number = 0; i < this.continueProgressEvent.length; ++i) {
                //    if (targetLoader.url == this.continueProgressEvent[i]) {
                //        return;
                //    }
                //}

                this._taskDict[targetLoader.url].currentProgress = targetLoader.currentProgress;

                this.currentProgress = this.calculateProgress();

                if (this.currentProgress < 1.0) {
                    var loader: ILoader = e.loader;
                    this._event.eventType = LoaderEvent3D.LOADER_PROGRESS;
                    this._event.loader = loader;
                    this._event.data = loader.data;
                    this._event.currentProgress = this.currentProgress;
                    this.dispatchEvent(this._event);
                }
            }
        }

        private reset() {
            assetMgr.dispose(this);

            if (this.url) {
                assetMgr.removeByteArray(this.url);
                textureResMgr.removeTexture(this.url);
                this.url = null;
            }

            this.taskTotal = 0;
            this.taskCurrent = 0;
            this._taskCount = 0;
            this._taskDict = {};
            this._textures = {};
            this.skinClipDict = {};
            this.huds = [];
            this.lightDict = {};
            this._mapParser = null;
            this._configParser = null;

            this._event.target = null;
            this._event.loader = null;
            this._event.data = null;

            for (var i: number = 0; i < this.unitLoaderList.length; ++i) {
                this.unitLoaderList[i].dispose();
            }
            this.unitLoaderList.length = 0;

            this._dictUnitLoader = {};
            this._unitQueue.length = 0;
            this._currentUnitLoader = null;
            this.continueProgressEvent.length = 0;
        }

        private parseParticle() {
            this.data = this._particleParser.data;
            if (!this._particleParser.data.shape.meshFile && !this._particleParser.data.property.meshFile) {
                return;
            }

            if (this._particleParser.data.shape.meshFile) {
                var path: string = this._pathRoot + this._particleParser.data.shape.meshFile;

                var parData: any = {};
                parData.particle = this._particleParser.data;
                parData.type = "shape";

                this.doAssetLoader(path, this.onParticleEsmLoad1, parData);
            }

            if (this._particleParser.data.property.meshFile) {
                var path: string = this._pathRoot + this._particleParser.data.property.meshFile;

                var parData: any = {};
                parData.particle = this._particleParser.data;
                parData.type = "property";

                this.doAssetLoader(path, this.onParticleEsmLoad1, parData);
            }
        }

        private parseUnit() {
            this.processNode();
            this.processSkinClip();
            this.processProAnim();
            this.createLight();

            if (this._mapParser.uv2) {
                var path: string = this.pathRoot + this._mapParser.uv2;
                this.doAssetLoader(path, this.onCompleteUv2);
            }
            else {
                this.onProcessNodeLoad();
            }
        }

        protected onCompleteUv2(e: LoaderEvent3D) {
            var load: ILoader = e.loader;
            this.uv2Dict = e.data;

            this.onProcessNodeLoad();

            this.processTask(load);
        }

        protected onProcessNodeLoad() {
            for (var i: number = 0; i < this._mapParser.nodeList.length; i++) {
                var mapNodeData: UnitNodeData = this._mapParser.nodeList[i];
                if (!mapNodeData.object3d.parent) {
                    this.container.addChild(mapNodeData.object3d);
                }
                switch (mapNodeData.type) {
                    case "Object3D":
                    case "Camera3D":
                    case "DirectLight":
                    case "PointLight":
                        this.doLoadEpa(mapNodeData);
                        break;
                    case "CubeSky":
                    case "SphereSky":
                    case "Mesh":
                        if (mapNodeData.path) {
                            var path: string = this._pathRoot + mapNodeData.path;

                            this.doAssetLoader(path, this.onEsmLoad, mapNodeData);
                        }
                        else if (mapNodeData.geometry) {
                            this.processMesh(mapNodeData, GeometryUtil.createGemetryForType(mapNodeData.geometry.type, mapNodeData.geometry));
                        }
                        break;
                    case "Terrain":
                        if (mapNodeData.path) {
                            var path: string = this._pathRoot + mapNodeData.path;

                            this.doAssetLoader(path, this.onHeightImg, mapNodeData);
                        }
                        break;
                    case "ParticleEmitter":
                        if (mapNodeData.path) {
                            var path: string = this._pathRoot + mapNodeData.path;

                            var loader: { pathRoot: string, loader: UnitLoader } = this.doUnitLoader(path, this.onUnitLoader, mapNodeData);
                            if (this._configParser.version == 1) {
                                loader.pathRoot = this._pathRoot;
                            }
                        }
                        break;
                    case "EffectGroup":
                        if (mapNodeData.path) {
                            var path: string = this._pathRoot + mapNodeData.path;

                            this.doUnitLoader(path, this.onUnitLoader, mapNodeData);
                        }
                        break;
                }
            }

            for (var i: number = 0; i < this._mapParser.textures.length; ++i) {
                var data: any = this._mapParser.textures[i];
                var path: string = this._pathRoot + data.path;

                this.doAssetLoader(path, this.onTexture, data.name);
            }

            for (var i: number = 0; i < this._mapParser.hudList.length; ++i) {
                var hudData: UnitHUDData = this._mapParser.hudList[i];
                var hud: HUD = new HUD();

                hud.name = hudData.name;
                hud.bothside = hudData.bothside;
                hud.x = hudData.x;
                hud.y = hudData.y;
                hud.rotationX = hudData.rx;
                hud.rotationY = hudData.ry;
                hud.rotationZ = hudData.rz;
                hud.width = hudData.width;
                hud.height = hudData.height;

                if (hudData.vs) {
                    hud.vsShader = hudData.vs;
                }

                if (hudData.fs) {
                    hud.fsShader = hudData.fs;
                }

                this.huds.push(hud);
                hudData.hud = hud;

                if (!hudData.texture) {
                    continue;
                }
                var path: string = this._pathRoot + hudData.texture;

                this.doAssetLoader(path, this.onHudTexture, hudData);
            }
        }

        private parseTexturePacker() {
            if (this._texturePackerParser.data.meta && this._texturePackerParser.data.meta.image) {
                var path: string = this._pathRoot + this._texturePackerParser.data.meta.image;

                this.doAssetLoader(path, this.onTexturePackerLoad);
            }
        }

        private onTexturePackerLoad(e: LoaderEvent3D) {
            var load: ILoader = e.loader;
            this.data = load.data;
            textureResMgr.addTexture(this.url, this._texturePackerParser.data, load.data);
            this.processTask(load);
        }

        private parseConfig(dataConfig: any, type: string):boolean {
            this._configParser = UnitParserUtils.parserConfig(dataConfig, type);
            if (!this._configParser) {
                return false;
            }

            var path: string = "";

            for (var v in this._configParser.taskDict) {
                this.taskTotal++;
                path = this._pathRoot + v;
                this._taskDict[path] = {};
                this._taskDict[path].status = 1;
                this._taskDict[path].currentProgress = 0;
            }

            switch (this._configParser.type) {
                case IConfigParser.TYPE_SCENE:
                    this._mapParser = <UnitConfigParser>this._configParser;
                    this.container = this.container || new Scene3D();
                    this.parseUnit();
                    break;
                case IConfigParser.TYPE_SKIN_MESH:
                    this.container = this.container || new Role();
                    this._mapParser = <UnitConfigParser>this._configParser;
                    this.parseUnit();
                    break;
                case IConfigParser.TYPE_EFFECT_GROUP:
                    this.container = this.container || new EffectGroup();
                    this._mapParser = <UnitConfigParser>this._configParser;
                    this.parseUnit();
                    break;
                case IConfigParser.TYPE_PARTICLE:
                    this._particleParser = <ParticleParser>this._configParser;
                    this.parseParticle();
                    break;
                case IConfigParser.TYPE_TEXTUREPACKER:
                    this._texturePackerParser = <TexturePackerParser>this._configParser;
                    this.parseTexturePacker();
                    break;
                default:
                    return false;
            }

            if (this.container) {
                this.data = this.container;
            }
            return true;
        }

        private processParticle(particleData: ParticleData, nodeData: UnitNodeData): ParticleEmitter {
            if (!particleData.shape.meshFile && !particleData.property.meshFile) {
                this.processParticleGeometry(particleData, nodeData);
            }
            else {

                if (particleData.shape.meshFile) {
                    var path: string = this._pathRoot + particleData.shape.meshFile;


                    var parData: any = {};
                    parData.particle = particleData;
                    parData.nodeData = nodeData;
                    parData.type = "shape";

                    this.doAssetLoader(path, this.onParticleEsmLoad, parData);
                }

                if (particleData.property.meshFile) {

                    var path: string = this._pathRoot + particleData.property.meshFile;

                    var parData: any = {};
                    parData.particle = particleData;
                    parData.nodeData = nodeData;
                    parData.type = "property";

                    this.doAssetLoader(path, this.onParticleEsmLoad, parData);
                }
            }

            return null;
        }

        private processParticleGeometry(particleData: ParticleData, nodeData: UnitNodeData) {
            particleData.materialData = this._mapParser.matDict[nodeData.materialIDs[0]];
            var particleNode: ParticleEmitter = new ParticleEmitter(particleData, new TextureMaterial());

            nodeData.visible = Egret3DPolicy.useParticle;

            this.processObject3d(nodeData, particleNode);

            if (this.autoPlayAnimation || particleData.property.playOnAwake) {
                this.addAutoAnimation(particleNode, 1, false, particleData.property.prewarm);
            }
           
            this.processMat(nodeData);
        }

        private processObject3d(nodeData: UnitNodeData, object3d: Object3D) {
            object3d.name = nodeData.object3d.name;
            object3d.visible = nodeData.visible;
            object3d.position = nodeData.object3d.position;
            object3d.orientation = nodeData.object3d.orientation;
            object3d.scale = nodeData.object3d.scale;

            if (nodeData.tagName != "") {
                object3d.tag.name = nodeData.object3d.tag.name;
            }
            nodeData.object3d.swapObject(object3d);
            nodeData.object3d = object3d;
        }

        private onConfigLoad(e: LoaderEvent3D) {
            var loader: ILoader = e.loader;

            switch (this._type) {
                case ILoader.DATAFORMAT_XML:
                case ILoader.DATAFORMAT_JSON:
                    if (!this.parseConfig(loader.data, this._type)) {
                        this.data = loader.data;
                    }
                    break;
                //case ILoader.DATAFORMAT_E3DPACK:
                //    this._type = ILoader.DATAFORMAT_JSON;
                //    this.pathRoot += this.resourceName + "/";

                //    var path: string = this.pathRoot + "MapConfig.json";

                //    if (assetMgr.getByteArray(path)) {
                //        this.taskTotal++;
                //        this._taskDict[path] = {};
                //        this._taskDict[path].status = 1;
                //        this._taskDict[path].currentProgress = 0;

                //        this.doAssetLoader(path, this.onConfigLoad, this);
                //        this.processUrlContinue(path);
                //    }
                //    break;
                default:
                    this.data = loader.data;
                    break;
            }
            this.processTask(loader);

            //loader.removeEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onConfigLoad, this);
        }

        private onHeightImg(e: LoaderEvent3D) {
            var load: ILoader = e.loader;
            var mapNodeData: UnitNodeData = e.param;
            var geometry: any = mapNodeData.geometry;

            var mesh: Terrain = new Terrain(load.data, geometry.width, geometry.height, geometry.depth, geometry.segmentsW, geometry.segmentsH, false, new TextureMaterial(load.data));

            this.processHeightMesh(mapNodeData, mesh);

            var grass: any = mapNodeData.grass;
            if (grass) {
                for (var i: number = 0; i < grass.length; ++i) {
                    var grassData: any = grass[i];
                    var path: string = this._pathRoot + grassData.detailTexture;
                    var paramData: any = {};
                    paramData.grassData = grassData;
                    paramData.mapNodeData = mapNodeData;

                    this.doAssetLoader(path, this.onGrassDetailTexture, paramData);
                }
            }

            this.processTask(load);
        }

        private doAssetLoader(url: string, callback: Function, param: any = null): URLLoader {
            this.addTask();

            var loader: URLLoader = assetMgr.loadAsset(url, callback, this, param);
            assetMgr.addEventListener(url, LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);
            return loader;
        }

        private doUnitLoader(url: string, callback: Function, param: any = null): { pathRoot: string, loader: UnitLoader } {
            this.addTask();
            var loader: { pathRoot:string, loader: UnitLoader} = this._dictUnitLoader[url];
            if (!loader) {
                loader = { pathRoot: null, loader: new UnitLoader() };

                this._dictUnitLoader[url] = loader;

                loader.loader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onUnitComplete, this, param);

                this.unitLoaderList.push(loader.loader);

                this._unitQueue.push(url);

                if (!this._currentUnitLoader) {
                    this._currentUnitLoader = loader.loader;
                    this._currentUnitLoader.load(url);
                }
            }

            if (loader.loader.data) {

                setTimeout(() => {

                    if (callback) {
                        var loaderEvent: LoaderEvent3D = new LoaderEvent3D();
                        loaderEvent.eventType = LoaderEvent3D.LOADER_COMPLETE;
                        loaderEvent.target = loader.loader;
                        loaderEvent.loader = loader.loader;
                        loaderEvent.data = loader.loader.data;
                        loaderEvent.param = param;

                        callback.call(this, loaderEvent);
                    }

                }, 0);

            }
            else {
                loader.loader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, callback, this, param);
                loader.loader.addEventListener(LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);
            }

            return loader;
        }

        private onUnitComplete(e: LoaderEvent3D) {
            this._unitQueue.shift();

            if (this._unitQueue.length > 0) {
                var url: string = this._unitQueue[0];
                var loader: { pathRoot: string, loader: UnitLoader } = this._dictUnitLoader[url];
                this._currentUnitLoader = loader.loader;
                this._currentUnitLoader.load(url);
                if (loader.pathRoot) {
                    this._currentUnitLoader.pathRoot = loader.pathRoot; 
                }
            }
            else {
                this._currentUnitLoader = null;
            }
        }

        private onTexture(e: LoaderEvent3D) {
            var load: ILoader = e.loader;
            var name: string = e.param;
            this._textures[name] = load.data;
            this.processTask(load);
        }

        private onHudTexture(e: LoaderEvent3D) {
            var load: ILoader = e.loader;
            var hudData: UnitHUDData = e.param;
            hudData.hud.diffuseTexture = load.data;
            this.processTask(load);
        }

        private onMaterialTexture(e: LoaderEvent3D) {
            var load: ILoader = e.loader;
            var textureData: any = e.param;
            var mesh: Mesh = null;
            var mat: MaterialBase = null;
            var mapNodeData: UnitNodeData = textureData.mapNodeData;
            mesh = <Mesh>mapNodeData.object3d;
            mat = mesh.getMaterial(textureData.matID);
            mat[textureData.type] = load.data;

            this.processTask(load);
        }

        private onMethodTexture(e:LoaderEvent3D) {
            var load: ILoader = e.loader;
            var methodData: any = e.param;
            methodData.method[methodData.textureName] = load.data;

            this.processTask(load);
        }

        protected onGrassDetailTexture(e: LoaderEvent3D) {
            var load: ILoader = e.loader;

            var paramData: any = e.param;
            var grassData: any = paramData.grassData;
            var mapNodeData:UnitNodeData = paramData.mapNodeData;

            var terrain: Terrain = <Terrain>mapNodeData.object3d;
            var list: Vector3[] = this.getGrassPositions(terrain, load.data);
            if (list.length > 0) {
                var mat: TextureMaterial = new TextureMaterial();
                mat.ambientColor = 0xffffff;
                mat.blendMode = BlendMode.NORMAL;
                mat.cutAlpha = 0.4;
                //todo草的lightmap需要后期加入
                var rect: Rectangle = new Rectangle(terrain.x, terrain.z, terrain.x * 2, terrain.z * 2);
                var grassMesh: GrassMesh = new GrassMesh(list, mat, grassData);
                grassMesh.method.setLightMapData(CheckerboardTexture.texture, rect);
                //end
                terrain.addChild(grassMesh); terrain.x;terrain.y;
                var data: any = paramData.grassData;
                if (data.grassTexture) {
                    var path: string = this._pathRoot + data.grassTexture;

                    this.doAssetLoader(path, this.onGrassDiffuseTexture, grassMesh.material);
                }
            }

            this.processTask(load);
        }


        private getGrassPositions(terrain:Terrain, texture:ImageTexture): Vector3[] {
            var elevationGeometry: ElevationGeometry = <ElevationGeometry>terrain.geometry;

            var image: ImageData = texture.readPixels(0, 0, texture.width, texture.height);
            var width: number = image.width;
            var height: number = image.height;

            var color: number;
            var offset: number;
            var ratio: number = 1 / 16;
            var positions: Vector3[] = [];
            var pos: Vector3;

            var xFloat: number;
            var yFloat: number;

            for (var i: number = 0; i < height; i++) {
                for (var j: number = 0; j < width; j++) {
                    offset = i * width + j;
                    offset *= 4;
                    color = image.data[offset] * ratio;
                    color = Math.round(color);
                    if (color > 0) {
                        for (var k: number = 0; k < color; k++) {
                            xFloat = j + Math.random() - 0.5;
                            yFloat = i + Math.random() - 0.5;
                            if (xFloat < 0) {
                                xFloat = 0;
                            } else if (xFloat >= width) {
                                xFloat = width - 0.01;
                            }
                            if (yFloat < 0) {
                                yFloat = 0;
                            } else if (yFloat >= height) {
                                yFloat -= 0.01;
                            }
                            pos = elevationGeometry.get3DCoordAtPixel(xFloat, yFloat, width, height);
                            positions.push(pos);
                        }
                    }
                }
            }

            return positions;
        }

        protected onGrassDiffuseTexture(e: LoaderEvent3D) {
            var load: ILoader = e.loader;
            e.param.diffuseTexture = load.data;
            this.processTask(load);
        }

        private doLoadEpa(mapNodeData: UnitNodeData) {

            if (mapNodeData.propertyAnims) {
                for (var j: number = 0; j < mapNodeData.propertyAnims.length; ++j) {

                    if (!mapNodeData.object3d.proAnimation) {
                        mapNodeData.object3d.proAnimation = new PropertyAnimController(mapNodeData.object3d);
                    }

                    var propertyAnimsData: any = mapNodeData.propertyAnims[j];

                    var path: string = this._pathRoot + propertyAnimsData["path"];

                    this.doAssetLoader(path, this.onEpaLoad, mapNodeData);
                }
            }

            var propertyAnimController: PropertyAnimController = this.proAnimDict[mapNodeData.propertyAnimsId];
            if (propertyAnimController) {
                mapNodeData.object3d.proAnimation = propertyAnimController;
            }
        }

        private processEpa(mapNodeData: UnitNodeData, pro: PropertyAnim) {
            mapNodeData.object3d.proAnimation.propertyAnimController.addPropertyAnim(pro);
            if (this.autoPlayAnimation) {
                if (mapNodeData.object3d.proAnimation) {
                    this.addAutoAnimation(mapNodeData.object3d.proAnimation);
                }
            }
        }

        private processHeightMesh(mapNodeData: UnitNodeData, mesh: Mesh) {

            this.processObject3d(mapNodeData, mesh);

            this.processMat(mapNodeData);

            this.doLoadEpa(mapNodeData);
        }

        private processMesh(mapNodeData: UnitNodeData, geometry: Geometry) {

            var animation: SkeletonAnimation = this.skinClipDict[mapNodeData.skeletonAnimation];
            var mesh: Mesh = null;
            if (mapNodeData.type == "Mesh") {
                   //var hasMirrorX: boolean = false;
                   //var hasMirrorY: boolean = false;
                   //var hasMirrorZ: boolean = false;
                   //if (mapNodeData.sx < 0) {
                   //    hasMirrorX = true;
                   //    mapNodeData.sx = Math.abs(mapNodeData.sx);
                   //    mapNodeData.object3d.scaleX = mapNodeData.sx;
                   //}
                   //if (mapNodeData.sy < 0) {
                   //    hasMirrorY = true;
                   //    mapNodeData.sy = Math.abs(mapNodeData.sy);
                   //    mapNodeData.object3d.scaleY = mapNodeData.sy;
                   //}
                   //if (mapNodeData.sz < 0) {
                   //    hasMirrorZ = true;
                   //    mapNodeData.sz = Math.abs(mapNodeData.sz);
                   //    mapNodeData.object3d.scaleZ = mapNodeData.sz;
                   //}
                   //if (hasMirrorX || hasMirrorY || hasMirrorZ) {
                   //    geometry = geometry.cloneMirror(hasMirrorX, hasMirrorY, hasMirrorZ);
                   //}
                mesh = new Mesh(geometry, new TextureMaterial(), animation);
            }
            else if (mapNodeData.type == "CubeSky") {
                mesh = new Sky(geometry, new CubeTextureMaterial());
            }
            else if (mapNodeData.type == "SphereSky") {
                mesh = new Sky(geometry, new TextureMaterial());
            }

            EUMVersion.fillGeometryUv2(mapNodeData.uv2Id, this.uv2Dict, mesh.geometry);

            this.processObject3d(mapNodeData, mesh);

            this.processMat(mapNodeData);

            for (var j: number = 0; j < mapNodeData.skinClips.length; j++) {

                var eamData: any = mapNodeData.skinClips[j];

                var path: string = this._pathRoot + eamData["path"];

                var loadData: any = {};
                loadData.eamData = eamData;
                loadData.mapNodeData = mapNodeData;

                this.doAssetLoader(path, this.onEamLoad, loadData);
            }

            this.doLoadEpa(mapNodeData);
        }

        private onEsmLoad(e:LoaderEvent3D) {
            var load: ILoader = e.loader;
            var mapNodeData: UnitNodeData = e.param;
            if (mapNodeData) {
                var geo: Geometry = load.data;
                if (this.uv2Dict && this.uv2Dict[mapNodeData.uv2Id]) {
                    geo = new Geometry();
                    geo.copy(load.data);
                }
                this.processMesh(mapNodeData, geo);
            }

            this.processTask(load);
        }

        private onParticleEsmLoad(e:LoaderEvent3D) {
            var load: ILoader = e.loader;
            var parData: any = e.param;

            var particle: ParticleData = parData.particle;
            var nodeData: UnitNodeData = parData.nodeData;
            switch (parData.type) {
                case "shape":
                    particle.shape.geometry = load.data;
                    break;
                case "property":
                    particle.property.geometry = load.data;
                    break;
            }
            var needLoad: number = 0;
            var loaded: number = 0;
            if (particle.shape.meshFile) {
                needLoad ++;
            }
            if (particle.property.meshFile) {
                needLoad ++;
            }
            if (particle.shape.geometry) {
                loaded ++;
            }
            if (particle.property.geometry) {
                loaded ++;
            }

            if (loaded == needLoad) {
                this.processParticleGeometry(particle, nodeData);
            }

            this.processTask(load);
        }

        private onParticleEsmLoad1(e: LoaderEvent3D) {
            var load: ILoader = e.loader;
            var parData: any = e.param;

            var particle: ParticleData = parData.particle;
            switch (parData.type) {
                case "shape":
                    particle.shape.geometry = load.data;
                    break;
                case "property":
                    particle.property.geometry = load.data;
                    break;
            }
            var needLoad: number = 0;
            var loaded: number = 0;
            if (particle.shape.meshFile) {
                needLoad++;
            }
            if (particle.property.meshFile) {
                needLoad++;
            }
            if (particle.shape.geometry) {
                loaded++;
            }
            if (particle.property.geometry) {
                loaded++;
            }

            if (loaded == needLoad) {
                this.data = particle;
            }

            this.processTask(load);
        }

        private onEamLoad(e: LoaderEvent3D) {
            var load: ILoader = e.loader;
            var loadData: any = e.param;

            var clip: SkeletonAnimationClip = load.data;
            clip.animationName = loadData.eamData.name;

            var mesh: Mesh = <Mesh>loadData.mapNodeData.object3d;
            mesh.animation.skeletonAnimationController.state.addAnimClip(clip);
            if (this.autoPlayAnimation) {
                this.addAutoAnimation(mesh.animation, 1, false, false, clip.animationName);
            }
            this.processTask(load);
        }


        private onSkinClip(e: LoaderEvent3D) {
            var load: ILoader = e.loader;
            var loadData: any = e.param;


            var skeletonAnimation: SkeletonAnimation = loadData.skinClip;
            var skinData: any = loadData.skinData;
            var clipData: any = loadData.clip;

            var clip: SkeletonAnimationClip = load.data;
            clip.animationName = clipData.name;
            //clip = clip.clone();
            if (clipData.loop) {
                clip.isLoop = (clipData.loop == "true" ? true : false);
            }
            skeletonAnimation.state.addAnimClip(clip);

            if (this.autoPlayAnimation) {
                this.addAutoAnimation(skeletonAnimation, 1, false, false, clip.animationName);
            }
            else {
                if (skinData.auto && skinData.auto != "") {
                    //skeletonAnimation.play(skinData.auto, 1.0, false, false);
                    this.addAutoAnimation(skeletonAnimation, 1, false, false, clip.animationName);
                }
            }

            this.processTask(load);
        }

        private onProAnim(e: LoaderEvent3D) {
            var load: ILoader = e.loader;
            var loadData: any = e.param;

            var proAnimation: PropertyAnimController = loadData.proAnimation;
            var proData: any = loadData.proData;
            var clipData: any = loadData.clip;

            var clip: PropertyAnim = load.data;
            clip = clip.clone();
            if (clipData.loop) {
                clip.isLoop = (clipData.loop == "true" ? true : false);
            }
            if (clipData.name) {
                clip.name = clipData.name;
            }

            proAnimation.addPropertyAnim(clip);

            if (this.autoPlayAnimation) {
                //proAnimation.play(clipData.name);
                this.addAutoAnimation(proAnimation, 1, false, false, clipData.name);
            }
            else {
                if (proData.auto && proData.auto != "") {
                    this.addAutoAnimation(proAnimation, 1, false, false, proData.auto);
                }
            }

            this.processTask(load);
        }        

        private onEpaLoad(e: LoaderEvent3D) {
            var load: ILoader = e.loader;
            var mapNodeData: UnitNodeData = e.param;
            var pa: PropertyAnim = load.data;
            var clonePa: PropertyAnim = pa.clone();
            this.processEpa(mapNodeData, clonePa);
       
            this.processTask(load);
        }
        
        private addTask() {
            this._taskCount++;
        }

        protected calculateProgress(): number {
            var progress: number = 0;

            
            for (var key in this._taskDict) {

                var has: boolean = false;
                for (var i: number = 0; i < this.continueProgressEvent.length; ++i) {
                    if (key == this.continueProgressEvent[i]) {
                        has = true;
                        break;
                    }
                }
                if (has) {
                    progress += 0.1 / this.continueProgressEvent.length * this._taskDict[key].currentProgress;
                }
                else {
                    progress += 0.9 / (this.taskTotal - this.continueProgressEvent.length) * this._taskDict[key].currentProgress;
                }
            }

            return progress;
        }

        private processTaskCurrent(load: ILoader) {
            if (this._taskDict[load.url]) {
                if (this._taskDict[load.url].status == 1) {
                    this.taskCurrent++;
                    this._taskDict[load.url].status = 2;
                    this._taskDict[load.url].currentProgress = 1;

                    this._event.loader = load;
                    this._event.data = load.data;

                    var isDisEventProgress: boolean = true;
                    //for (var i: number = 0; i < this.continueProgressEvent.length; ++i) {
                    //    if (load.url == this.continueProgressEvent[i]) {
                    //        isDisEventProgress = false;
                    //        break;
                    //    }
                    //}
                    // 触发 LOADER_PROGRESS
                    this.currentProgress = this.calculateProgress();

                    if (this.currentProgress < 1.0) {

                        this._event.eventType = LoaderEvent3D.LOADER_PROGRESS;
                        this._event.currentProgress = this.currentProgress;

                        this.dispatchEvent(this._event);
                    }

                    this._event.currentProgress = this.currentProgress;

                    // 某一个文件加载完成  
                    this._event.eventType = LoaderEvent3D.LOADER_ONCE_COMPLETE;
                    this.dispatchEvent(this._event);
                }
            }
        }

        private processTask(load: ILoader) {
            this.processTaskCurrent(load);
            this._taskCount--;

            if (this._taskCount <= 0) {

                this.currentProgress = 1.0;

                this.onLoaderComplete();

                this._event.loader = this;
                this._event.data = this.data;
                this._event.currentProgress = this.currentProgress;

                // 触发 LOADER_PROGRESS
      
                this._event.eventType = LoaderEvent3D.LOADER_PROGRESS;
                this.dispatchEvent(this._event);

                // 全部文件加载完成
                this._event.eventType = LoaderEvent3D.LOADER_COMPLETE;
                this.dispatchEvent(this._event);
            }
        }

        protected onLoaderComplete() {

            if (!this._configParser) {
                return;
            }

            if (this._mapParser) {
                this.data = this.container;

                var subEmitters: ParticleEmitter[] = [];
                for (var i: number = 0; i < this._mapParser.nodeList.length; i++) {
                    var mapNodeData: UnitNodeData = this._mapParser.nodeList[i];

                    if (mapNodeData.object3d instanceof ParticleEmitter) {
                        var patEmitter: ParticleEmitter = <ParticleEmitter>mapNodeData.object3d;
                        for (var j: number = 0; j < mapNodeData.childs.length; ++j) {
                            var childData: any = mapNodeData.childs[j];
                            var childPatEmitter: Object3D = this.container.findObject3D(childData.name);
                            subEmitters.push(<ParticleEmitter>childPatEmitter);
                            if (childPatEmitter instanceof ParticleEmitter) {
                                patEmitter.addSubEmitter(Number(ParticleDataSubEmitterPhase[childData.phase]), <ParticleEmitter>childPatEmitter);
                            }
                        }
                    }

                    if (mapNodeData.boneBind.skeletonAnimation) {
                        var id: number = Number(mapNodeData.boneBind.skeletonAnimation);
                        var skeletonAnimation: SkeletonAnimation = this.skinClipDict[id];
                        skeletonAnimation.bindToJointPose(mapNodeData.boneBind.boneName, mapNodeData.object3d);
                    }
                }

                var tempEmitter: ParticleEmitter;
                for (var i: number = 0; i < subEmitters.length; i++) {
                    tempEmitter = subEmitters[i];
                    if (tempEmitter && tempEmitter.parent) {
                        tempEmitter.parent.removeChild(tempEmitter);
                    }
                }

                //**********场景加载完毕 自动 merge ****************
                var auto: boolean = true;
                if (auto) {
                    var meshs: Mesh[] = StaticMergeUtil.bacthingMesh(this._mapParser);
                    for (var m in meshs) {
                        this.container.addChild(meshs[m]);
                    }
                }
                //******************************
            }


            if (this.view3d) {
                for (var i: number = 0; i < this.huds.length; ++i) {
                    this.view3d.addHUD(this.huds[i]);
                }
            }

            for (var i: number = 0; i < this.autoAnimationList.length; ++i) {
                var autoPlayData: any = this.autoAnimationList[i];
                if (autoPlayData.animation instanceof SkeletonAnimation) {
                    autoPlayData.animation.play(autoPlayData.name, autoPlayData.speed, autoPlayData.reset, autoPlayData.prewarm);
                } 
                else if (autoPlayData.animation instanceof PropertyAnimController) {
                    autoPlayData.animation.play(autoPlayData.name);
                }
                else if (autoPlayData.animation instanceof MethodBase) {
                    autoPlayData.animation.start(true);
                }
                else if (autoPlayData.animation instanceof ParticleEmitter) {
                    autoPlayData.animation.play(autoPlayData.speed, autoPlayData.reset, autoPlayData.prewarm);
                }
                else if (autoPlayData.animation instanceof EffectGroup) {
                    autoPlayData.animation.play();
                }
            }

            if (this._configParser.type == IConfigParser.TYPE_EFFECT_GROUP) {
                var effect: EffectGroup = <EffectGroup>this.data;
                if (effect) {
                    effect.init(this._mapParser.loop);
                    if (this._mapParser.auto) {
                        effect.play();
                    }
                }
            }

            if (this._configParser.type == IConfigParser.TYPE_SKIN_MESH) {
                var role: Role = <Role>this.data;
                for (var key in this.skinClipDict) {
                    role.skeletonAnimation = this.skinClipDict[key];
                    break;
                }
            }
        }

        private addImaTask(name: string, type: string, matID: number, mapNodeData: UnitNodeData, material:MaterialBase):URLLoader {
            var load: URLLoader = null;

            var path: string = this._pathRoot + name;

            var textureData: any = {};
            textureData.type = type;
            textureData.matID = matID;
            textureData.mapNodeData = mapNodeData;

            this.doAssetLoader(path, this.onMaterialTexture, textureData);

            return load;
        }

        /*
        * @private
        */
        public addMethodImgTask(name:string, method:MethodBase, textureName:string): URLLoader {
            var path: string = this._pathRoot + name;

            var methodData: any = {};
            methodData.method = method;
            methodData.textureName = textureName;

            var loader:URLLoader = this.doAssetLoader(path, this.onMethodTexture, methodData);

            return loader;
        }


        private processMat(mapNodeData: UnitNodeData) {
            var mesh: Mesh = <Mesh>mapNodeData.object3d;
            for (var i: number = 0; i < mapNodeData.materialIDs.length; ++i) {
                var matData: UnitMatSphereData = this._mapParser.matDict[mapNodeData.materialIDs[i]];
                if (!matData) {
                    continue;
                }

                var material: TextureMaterial = <TextureMaterial>mesh.getMaterial(i);
                if (!material) {
                    material = new TextureMaterial();
                    mesh.addSubMaterial(i, material);
                }

                var load: URLLoader = null;

                if (matData.diffuseTextureName != "") {
                    load = this.addImaTask(matData.diffuseTextureName, "diffuseTexture", i, mapNodeData, material);
                }

                if (matData.normalTextureName != "") {
                    load = this.addImaTask(matData.normalTextureName, "normalTexture", i, mapNodeData, material);
                }

                if (matData.specularTextureName != "") {
                    load = this.addImaTask(matData.specularTextureName, "specularTexture", i, mapNodeData, material);
                }

                if (matData.matcapTextureName != "") {
                    load = this.addImaTask(matData.matcapTextureName, "matcapTexture", i, mapNodeData, material);
                }

                material.diffuseColor = matData.diffuseColor;
                material.ambientColor = matData.ambientColor;
                material.specularColor = matData.specularColor;
                material.tintColor = matData.tintColor;
                material.alpha = matData.alpha;
                material.specularLevel = matData.specularLevel;
                material.gloss = matData.gloss;
                material.gamma = matData.gamma;
                material.refraction = matData.refraction;
                material.refractionintensity = matData.refractionintensity;


                material.castShadow = matData.castShadow;
                material.acceptShadow = matData.acceptShadow;
                material.repeat = matData.repeat;
                material.bothside = matData.bothside;

                material.drawMode = matData.drawMode;
                material.cullMode = matData.cullMode;
                material.blendMode = matData.blendMode;

                material.cutAlpha = matData.cutAlpha;

                material.uvRectangle.copyFrom(matData.uvRectangle);

                var lightGroup: LightGroup = new LightGroup();

                for (var j: number = 0; j < matData.lightIds.length; ++j) {
                    var light: LightBase = this.lightDict[matData.lightIds[j]];
                    if (light) {
                        lightGroup.addLight(light);
                    }
                }

                if (lightGroup.lightNum > 0) {
                    material.lightGroup = lightGroup;
                }

                this.processMethod(material, matData);
            }

            var lg: LightGroup = mesh.lightGroup || new LightGroup();

            for (var i: number = 0; i < mapNodeData.lightIds.length; ++i) {
                var light: LightBase = this.lightDict[mapNodeData.lightIds[i]];
                if (light) {
                    lg.addLight(light);
                }
            }

            if (lg.lightNum > 0) {
                mesh.lightGroup = lg;
            }

            //if (typeof mesh != "ParticleEmitter") {
            //    if (this.lightGroup.lightNum > 0) {
            //        mesh.lightGroup = this.lightGroup;
            //    }
            //}
        }

        private processMethod(material: MaterialBase, matData: UnitMatSphereData) {
            var load: URLLoader = null;
            var method: UnitMatMethodData = null;

            for (method of matData.methods) {
                MethodUtils.doMethod(material, method, this);
            }
        }

        protected processNode() {
            for (var i: number = 0; i < this._mapParser.nodeList.length; i++) {
                var mapNodeData: UnitNodeData = this._mapParser.nodeList[i];

                if (mapNodeData.type == "Camera3D") {
                    var camera: Camera3D = new Camera3D();
                    camera.fieldOfView = mapNodeData.fov;
                    camera.near = mapNodeData.clipNear;
                    camera.far = mapNodeData.clipFar;

                    mapNodeData.object3d = camera;
                }
                else if (mapNodeData.type == "Billboard") {
                    mapNodeData.object3d = new Billboard(new TextureMaterial(CheckerboardTexture.texture));
                }
                else if (mapNodeData.type == "Terrain") {
                    mapNodeData.object3d = new Object3D();
                }
                else if (mapNodeData.type == "DirectLight") {
                    var dirLight: DirectLight = new DirectLight();
                    mapNodeData.object3d = dirLight;

                    dirLight.lightId = mapNodeData.lightData.id;
                    dirLight.diffuse = mapNodeData.lightData.diffuseColor;
                    dirLight.ambient = mapNodeData.lightData.ambientColor;
                    dirLight.halfIntensity = mapNodeData.lightData.halfIntensity;
                    dirLight.intensity = mapNodeData.lightData.intensity;

                    this.lightDict[mapNodeData.lightData.id] = dirLight;
                }
                else if (mapNodeData.type == "PointLight") {
                    var pLight: PointLight = new PointLight();
                    mapNodeData.object3d = pLight;

                    pLight.lightId = mapNodeData.lightData.id;
                    pLight.ambient = mapNodeData.lightData.ambientColor;
                    pLight.diffuse = mapNodeData.lightData.diffuseColor;
                    pLight.radius = mapNodeData.lightData.radius;

                    pLight.cutoff = mapNodeData.lightData.falloff;
                    pLight.intensity = mapNodeData.lightData.intensity;

                    this.lightDict[mapNodeData.lightData.id] = pLight;
                }
                else {
                    mapNodeData.object3d = new Object3D();
                }

                mapNodeData.object3d.name = mapNodeData.name;
                mapNodeData.object3d.visible = mapNodeData.visible;
                mapNodeData.object3d.position = new Vector3(mapNodeData.x, mapNodeData.y, mapNodeData.z);
                mapNodeData.object3d.orientation = new Quaternion(mapNodeData.rx, mapNodeData.ry, mapNodeData.rz, mapNodeData.rw);
                mapNodeData.object3d.scale = new Vector3(mapNodeData.sx, mapNodeData.sy, mapNodeData.sz);
                if (mapNodeData.tagName != "") {
                    mapNodeData.object3d.tag.name = mapNodeData.tagName;
                }
            }

            for (var i: number = 0; i < this._mapParser.nodeList.length; i++) {
                var mapNodeData0: UnitNodeData = this._mapParser.nodeList[i];
                for (var j: number = 0; j < this._mapParser.nodeList.length; j++) {
                    var mapNodeData1: UnitNodeData = this._mapParser.nodeList[j];
                    if (mapNodeData0.parent == mapNodeData1.insID) {
                        mapNodeData1.object3d.addChild(mapNodeData0.object3d);
                        break;
                    }
                }
            }
        }

        private processSkinClip() {
            for (var key in this._mapParser.skeletonAnimationDict) {
                var skinClip: any = this._mapParser.skeletonAnimationDict[key];
                var id: number = Number(key);

                var skeletonAnimation: SkeletonAnimation = new SkeletonAnimation(new SkeletonAnimationState());
                this.skinClipDict[id] = skeletonAnimation;

                for (var i: number = 0; i < skinClip.clips.length; ++i) {
                    var clip: any = skinClip.clips[i];

                    var path: string = this._pathRoot + clip.path;

                    var clipData: any = {};
                    clipData.skinClip = skeletonAnimation;
                    clipData.skinData = skinClip;
                    clipData.clip = clip;

                    this.doAssetLoader(path, this.onSkinClip, clipData);
                }
            }
        }

        private processProAnim() {
            for (var key in this._mapParser.proAnimationDict) {
                var proData: any = this._mapParser.proAnimationDict[key];
                var id: number = Number(key);

                var proAnimation: PropertyAnimController = new PropertyAnimController();
                this.proAnimDict[id] = proAnimation;

                for (var i: number = 0; i < proData.clips.length; ++i) {
                    var clip: any = proData.clips[i];

                    var path: string = this._pathRoot + clip.path;

                    var clipData: any = {};
                    clipData.proAnimation = proAnimation;
                    clipData.proData = proData;
                    clipData.clip = clip;
                    this.doAssetLoader(path, this.onProAnim, clipData);
                }
            }
        }

        //灯光
        private createLight(): void {
            var mapLightData: UnitLightData = null;
            for (var key in this._mapParser.lightDict) {

                mapLightData = this._mapParser.lightDict[key];
                if (mapLightData.type == LightType.directlight && this._mapParser.directLight) {
                    var dirLight: DirectLight = new DirectLight(mapLightData.direction);
                    dirLight.lightId = mapLightData.id;
                    dirLight.diffuse = mapLightData.diffuseColor;

                    dirLight.ambient = mapLightData.ambientColor;
                    dirLight.halfIntensity = mapLightData.halfIntensity;
                    dirLight.intensity = mapLightData.intensity;

                    this.lightDict[mapLightData.id] = dirLight;

                }
                else if (mapLightData.type == LightType.pointlight && this._mapParser.pointLight) {
                    var pLight: PointLight = new PointLight(0);
                    pLight.lightId = mapLightData.id;
                    pLight.position = mapLightData.position;

                    pLight.ambient = mapLightData.ambientColor;
                    pLight.diffuse = mapLightData.diffuseColor;
                    pLight.radius = mapLightData.radius;

                    pLight.cutoff = mapLightData.falloff;
                    pLight.intensity = mapLightData.intensity;

                    this.lightDict[mapLightData.id] = pLight;
                }
            }
        }

        protected onUnitLoader(e: LoaderEvent3D) {
            var mapNodeData: UnitNodeData = e.param;

            var unitLoader: UnitLoader = <UnitLoader>e.target;
            unitLoader.removeEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onUnitLoader, this);

            switch (mapNodeData.type) {
                case UnitLoader.NODE_TYPE_EffectGroup:
                    this.processObject3d(mapNodeData, unitLoader.container);

                    var effectGroup: EffectGroup = <EffectGroup>unitLoader.container;
                    if (effectGroup) {
                        if (mapNodeData.auto) {
                            this.addAutoAnimation(effectGroup);
                        }
                    }

                    break;
                case UnitLoader.NODE_TYPE_ParticleEmitter:
                    var particleData: ParticleData = unitLoader.data;
                    particleData.materialData = this._mapParser.matDict[mapNodeData.materialIDs[0]];

                    var particleNode: ParticleEmitter = new ParticleEmitter(particleData, new TextureMaterial());

                    mapNodeData.visible = Egret3DPolicy.useParticle;

                    this.processObject3d(mapNodeData, particleNode);

                    if (this.autoPlayAnimation || particleData.property.playOnAwake) {
                        this.addAutoAnimation(particleNode, 1, false, particleData.property.prewarm);
                    }

                    this.processMat(mapNodeData);
                    break;
            }

            this.doLoadEpa(mapNodeData);
            this.processTask(unitLoader);
        }
    }
}