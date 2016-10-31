module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.UnitLoader
    * @classdesc
    * 单个资源 加载器
    * 主要封装了esm/jpg/png/eam/epa/uinty3d导出的配置文件/的加载和组装，以及mesh的render method相关信息，和灯光数据的生效.
    * 加载完毕后，会派发事件LoaderEvent3D.LOADER_COMPLETE
    * @see egret3d.ILoader
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
        /**
        * @language zh_CN
        * 加载配置文件 .json 或 .xml
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

            var s_pos: number = url.lastIndexOf("/");
            s_pos++;
            this._pathRoot = url.substr(0, s_pos);
            this.url = url;

            s_pos = url.lastIndexOf(".");
            s_pos++;
            this._type = url.substr(s_pos, url.length - s_pos);

            this.taskTotal++;
            this._taskDict[this.url] = {};
            this._taskDict[this.url].status = 1;
            this._taskDict[this.url].currentProgress = 0;

            this.addTask();
            this.loader = assetMgr.loadAsset(this.url, this.onConfigLoad, this);
            assetMgr.addEventListener(this.url, LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);
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
            if (this.container) {
                this.container.dispose();
                this.container = null;
            }
        }

        protected onProgress(e: LoaderEvent3D) {
            var load: ILoader = e.loader;
            if (this._taskDict[load.url]) {
                this._taskDict[load.url].currentProgress = load.currentProgress;
                this.currentProgress = 0;
                for (var key in this._taskDict) {
                    this.currentProgress += 1 / this.taskTotal * this._taskDict[key].currentProgress;
                }

                this._event.eventType = LoaderEvent3D.LOADER_PROGRESS;
                this._event.target = this;

                this._event.loader = load;
                this._event.data = load.data;
                this._event.currentProgress = this.currentProgress;
                this.dispatchEvent(this._event);
            }
        }

        private reset() {
            assetMgr.dispose(this);

            if (this.url) {
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
        }

        private parseParticle() {
            if (!this._particleParser.data.shape.meshFile && !this._particleParser.data.property.meshFile) {
                this.data = this._particleParser.data;
                return;
            }

            if (this._particleParser.data.shape.meshFile) {
                var path: string = this._pathRoot + this._particleParser.data.shape.meshFile;

                this.addTask();
                var parData: any = {};
                parData.particle = this._particleParser.data;
                parData.type = "shape";

                var loader: URLLoader = assetMgr.loadAsset(path, this.onParticleEsmLoad1, this, parData);
                assetMgr.addEventListener(path, LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);
            }

            if (this._particleParser.data.property.meshFile) {
                var path: string = this._pathRoot + this._particleParser.data.property.meshFile;
                this.addTask();
                var parData: any = {};
                parData.particle = this._particleParser.data;
                parData.type = "property";
                var loader: URLLoader = assetMgr.loadAsset(path, this.onParticleEsmLoad1, this, parData);
                assetMgr.addEventListener(path, LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);
            }
        }

        private parseUnit() {
            this.processSkinClip();
            this.processProAnim();
            this.createLight();

            for (var i: number = 0; i < this._mapParser.nodeList.length; i++) {
                var mapNodeData: UnitNodeData = this._mapParser.nodeList[i];
                if (!mapNodeData.object3d.parent) {
                    this.container.addChild(mapNodeData.object3d);
                }

                switch (mapNodeData.type) {
                    case "Object3D":
                    case "Camera3D":
                        this.doLoadEpa(mapNodeData);
                        break;
                    case "CubeSky":
                    case "SphereSky":
                    case "Mesh":
                        if (mapNodeData.path) {
                            var path: string = this._pathRoot + mapNodeData.path;

                            this.addTask();
                            var loader: URLLoader = assetMgr.loadAsset(path, this.onEsmLoad, this, mapNodeData);
                            assetMgr.addEventListener(path, LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);
                        }
                        else if (mapNodeData.geometry) {
                            this.processMesh(mapNodeData, GeometryUtil.createGemetryForType(mapNodeData.geometry.type, mapNodeData.geometry));
                        }
                        break;
                    case "Terrain":
                        if (mapNodeData.path) {
                            var path: string = this._pathRoot + mapNodeData.path;

                            this.addTask();
                            var loader: URLLoader = assetMgr.loadAsset(path, this.onHeightImg, this, mapNodeData);
                            assetMgr.addEventListener(path, LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);
                        }
                        break;
                    case "ParticleEmitter":
                        if (mapNodeData.path) {
                            var path: string = this._pathRoot + mapNodeData.path;

                            //this.addTask();
                            //var loader: URLLoader = assetMgr.loadAsset(path, this.onParticleXML, this, mapNodeData);

                            this.addTask();
                            var unitLoader: UnitLoader = new UnitLoader(path);
                            if (this._configParser.version == 1) {
                                unitLoader.pathRoot = this._pathRoot;
                            }

                            this.unitLoaderList.push(unitLoader);
                            unitLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onUnitLoader, this, mapNodeData);
                            unitLoader.addEventListener(LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);
                        }
                        break;
                    case "EffectGroup":
                        if (mapNodeData.path) {
                            var path: string = this._pathRoot + mapNodeData.path;

                            //this.addTask();
                            //var loader: URLLoader = assetMgr.loadAsset(path, this.onParticleXML, this, mapNodeData);

                            this.addTask();
                            var unitLoader: UnitLoader = new UnitLoader(path);
                            //unitLoader.pathRoot = this._pathRoot;

                            this.unitLoaderList.push(unitLoader);
                            unitLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onUnitLoader, this, mapNodeData);
                            unitLoader.addEventListener(LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);
                        }
                        break;
                }
            }

            for (var i: number = 0; i < this._mapParser.textures.length; ++i) {
                var data: any = this._mapParser.textures[i];
                var path: string = this._pathRoot + data.path;

                this.addTask();
                var loader: URLLoader = assetMgr.loadAsset(path, this.onTexture, this, data.name);
                assetMgr.addEventListener(path, LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);
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
                this.addTask();
                assetMgr.loadAsset(path, this.onHudTexture, this, hudData);
                assetMgr.addEventListener(path, LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);
            }
        }

        private parseTexturePacker() {
            if (this._texturePackerParser.data.meta && this._texturePackerParser.data.meta.image) {
                var path: string = this._pathRoot + this._texturePackerParser.data.meta.image;
                this.addTask();
                assetMgr.loadAsset(path, this.onTexturePackerLoad, this);
                assetMgr.addEventListener(path, LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);
            }
        }

        private onTexturePackerLoad(e: LoaderEvent3D) {
            var load: ILoader = e.loader;
            this.data = load.data;
            textureResMgr.addTexture(this.url, this._texturePackerParser.data, load.data);
            this.processTask(load);
        }

        private parseConfig(dataConfig: string, type: string):boolean {
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
            return true;
        }

        private onParticleXML(e:LoaderEvent3D) {
            var load: ILoader = e.loader;
            var mapNodeData: UnitNodeData = e.param;

            var particleData: ParticleData = load["ParticleData"];
            if (!particleData) {
                particleData = UnitParserUtils.particleParser(this._type, load.data);
                load["ParticleData"] = particleData;
                particleData.fileUrl = load.url;
                //particleData.fileName = load.fileName;
            }

            this.processParticle(particleData, mapNodeData);

            this.processTask(load);
        }

        private processParticle(particleData: ParticleData, nodeData: UnitNodeData): ParticleEmitter {
            if (!particleData.shape.meshFile && !particleData.property.meshFile) {
                this.processParticleGeometry(particleData, nodeData);
            }
            else {

                if (particleData.shape.meshFile) {
                    var path: string = this._pathRoot + particleData.shape.meshFile;

                    this.addTask();

                    var parData: any = {};
                    parData.particle = particleData;
                    parData.nodeData = nodeData;
                    parData.type = "shape";

                    var loader: URLLoader = assetMgr.loadAsset(path, this.onParticleEsmLoad, this, parData);
                    assetMgr.addEventListener(path, LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);
                }

                if (particleData.property.meshFile) {

                    var path: string = this._pathRoot + particleData.property.meshFile;

                    this.addTask();

                    var parData: any = {};
                    parData.particle = particleData;
                    parData.nodeData = nodeData;
                    parData.type = "property";

                    var loader: URLLoader = assetMgr.loadAsset(path, this.onParticleEsmLoad, this, parData);
                    assetMgr.addEventListener(path, LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);
                }
            }

            return null;
        }

        private processParticleGeometry(particleData: ParticleData, nodeData: UnitNodeData) {
            particleData.materialData = this._mapParser.matDict[nodeData.materialIDs[0]];
            var particleNode: ParticleEmitter = new ParticleEmitter(particleData, new TextureMaterial());

            this.processObject3d(nodeData, particleNode);

            if (this.autoPlayAnimation || particleData.property.playOnAwake) {
                
                var autoPlayData: any = {};
                autoPlayData.type = "particleAnimation";
                autoPlayData.animation = particleNode;
                autoPlayData.speed = 1;
                autoPlayData.reset = false;
                autoPlayData.prewarm = particleData.property.prewarm;

                this.autoAnimationList.push(autoPlayData);
            }
           
            this.processMat(nodeData);
        }

        private processObject3d(nodeData: UnitNodeData, object3d: Object3D) {
            object3d.name = nodeData.object3d.name;
            object3d.visible = nodeData.object3d.visible;
            object3d.position = nodeData.object3d.position;
            object3d.orientation = nodeData.object3d.orientation;
            object3d.scale = nodeData.object3d.scale;
            object3d.tag = nodeData.object3d.tag;
            nodeData.object3d.swapObject(object3d);
            nodeData.object3d = object3d;
        }

        private onConfigLoad(e: LoaderEvent3D) {
            var loader: ILoader = e.loader;

            switch (this._type) {
                case "xml":
                case "json":
                    if (!this.parseConfig(loader.data, this._type)) {
                        this.data = loader.data;
                    }
                    break;
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
                    this.addTask();
                    var paramData: any = {};
                    paramData.grassData = grassData;
                    paramData.mapNodeData = mapNodeData;
                    var loader: URLLoader = assetMgr.loadAsset(path, this.onGrassDetailTexture, this, paramData);
                    assetMgr.addEventListener(path, LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);
                }
            }

            this.processTask(load);
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
            var list: Vector3D[] = this.getGrassPositions(terrain, load.data);
            if (list.length > 0) {
                var mat: TextureMaterial = new TextureMaterial();
                mat.ambientColor = 0xffffff;
                mat.blendMode = BlendMode.NORMAL;
                mat.cutAlpha = 0.4;

                var grassMesh: GrassMesh = new GrassMesh(list, mat, grassData);
                terrain.addChild(grassMesh);
                var data: any = paramData.grassData;
                if (data.grassTexture) {
                    var path: string = this._pathRoot + data.grassTexture;
                    this.addTask();
                    var loader: URLLoader = assetMgr.loadAsset(path, this.onGrassDiffuseTexture, this, grassMesh.material);
                    assetMgr.addEventListener(path, LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);
                }
            }

            this.processTask(load);
        }


        private getGrassPositions(terrain:Terrain, texture:ImageTexture): Vector3D[] {
            var elevationGeometry: ElevationGeometry = <ElevationGeometry>terrain.geometry;

            var image: ImageData = texture.readPixels(0, 0, texture.width, texture.height);
            var width: number = image.width;
            var height: number = image.height;

            var color: number;
            var offset: number;
            var ratio: number = 1 / 16;
            var positions: Vector3D[] = [];
            var pos: Vector3D;

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

                    this.addTask();
                    var loader: URLLoader = assetMgr.loadAsset(path, this.onEpaLoad, this, mapNodeData);
                    assetMgr.addEventListener(path, LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);
                }
            }

            var propertyAnimController: PropertyAnimController = this.proAnimDict[mapNodeData.propertyAnimsId];
            if (propertyAnimController) {
                mapNodeData.object3d.proAnimation = propertyAnimController;
            }
        }

        private processEpa(mapNodeData: UnitNodeData, pro: PropertyAnim) {
            pro.name = "proAnim";
            mapNodeData.object3d.proAnimation.propertyAnimController.addPropertyAnim(pro);
            if (this.autoPlayAnimation) {
                if (mapNodeData.object3d.proAnimation) {
                    var autoPlayData: any = {};
                    autoPlayData.type = "proAnimation";
                    autoPlayData.animation = mapNodeData.object3d.proAnimation;
                    autoPlayData.name = pro.name;
                    this.autoAnimationList.push(autoPlayData);
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
                mesh = new Mesh(geometry, new TextureMaterial(), animation);
            }
            else if (mapNodeData.type == "CubeSky") {
                mesh = new Sky(geometry, new CubeTextureMaterial());
            }
            else if (mapNodeData.type == "SphereSky") {
                mesh = new Sky(geometry, new TextureMaterial());
            }

            this.processObject3d(mapNodeData, mesh);

            this.processMat(mapNodeData);

            for (var j: number = 0; j < mapNodeData.skinClips.length; j++) {

                var eamData: any = mapNodeData.skinClips[j];

                var path: string = this._pathRoot + eamData["path"];

                var loadData: any = {};
                loadData.eamData = eamData;
                loadData.mapNodeData = mapNodeData;

                this.addTask();
                var loader: URLLoader = assetMgr.loadAsset(path, this.onEamLoad, this, loadData);
                assetMgr.addEventListener(path, LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);
            }

            this.doLoadEpa(mapNodeData);
        }

        private onEsmLoad(e:LoaderEvent3D) {
            var load: ILoader = e.loader;
            var mapNodeData: UnitNodeData = e.param;
            if (mapNodeData) {
                this.processMesh(mapNodeData, load.data);
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
            mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip.clone());
            if (this.autoPlayAnimation) {
                //mesh.animation.play(clip.animationName, 1.0, false, false);

                var autoPlayData: any = {};
                autoPlayData.type = "skeletonAnimation";
                autoPlayData.animation = mesh.animation;
                autoPlayData.name = clip.animationName;
                autoPlayData.speed = 1.0;
                autoPlayData.reset = false;
                autoPlayData.prewarm = false;
                this.autoAnimationList.push(autoPlayData);
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
            clip.animationName = loadData.name;
            clip = clip.clone();
            if (clipData.loop) {
                clip.isLoop = (clipData.loop == "true" ? true : false);
            }
            skeletonAnimation.addSkeletonAnimationClip(clip);

            if (this.autoPlayAnimation) {
                //skeletonAnimation.play(clip.animationName, 1.0, false, false);

                var autoPlayData: any = {};
                autoPlayData.type = "skeletonAnimation";
                autoPlayData.animation = skeletonAnimation;
                autoPlayData.name = clip.animationName;
                autoPlayData.speed = 1.0;
                autoPlayData.reset = false;
                autoPlayData.prewarm = false;
                this.autoAnimationList.push(autoPlayData);
            }
            else {
                if (skinData.auto && skinData.auto != "") {
                    //skeletonAnimation.play(skinData.auto, 1.0, false, false);

                    var autoPlayData: any = {};
                    autoPlayData.type = "skeletonAnimation";
                    autoPlayData.animation = skeletonAnimation;
                    autoPlayData.name = clip.animationName;
                    autoPlayData.speed = 1.0;
                    autoPlayData.reset = false;
                    autoPlayData.prewarm = false;
                    this.autoAnimationList.push(autoPlayData);
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

                var autoPlayData: any = {};
                autoPlayData.type = "proAnimation";
                autoPlayData.animation = proAnimation;
                autoPlayData.name = clipData.name;
                this.autoAnimationList.push(autoPlayData);
            }
            else {

                if (proData.auto && proData.auto != "") {

                    var autoPlayData: any = {};
                    autoPlayData.type = "proAnimation";
                    autoPlayData.animation = proAnimation;
                    autoPlayData.name = proData.auto;
                    this.autoAnimationList.push(autoPlayData);
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

        private processTaskCurrent(load: ILoader) {
            if (this._taskDict[load.url]) {
                if (this._taskDict[load.url].status == 1) {
                    this.taskCurrent++;
                    this._taskDict[load.url].status = 2;
                    this._taskDict[load.url].currentProgress = 1;
                }
                
                //delete this._taskDict[load.url];
            }

            //this.currentProgress = this.taskCurrent / this.taskTotal;

            //this._event.eventType = LoaderEvent3D.LOADER_PROGRESS;
            //this._event.target = this;

            //this._event.loader = load;
            //this._event.data = load.data;
            //this.dispatchEvent(this._event);
        }

        private processTask(load: ILoader) {
            this.processTaskCurrent(load);
            this._taskCount--;

            if (this._taskCount <= 0) {

                this.onLoaderComplete();

                this._event.eventType = LoaderEvent3D.LOADER_COMPLETE;
                this._event.target = this;
                this._event.loader = this;
                this._event.data = this.data;
                this._event.currentProgress = this.currentProgress;
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
            }


            if (this.view3d) {
                for (var i: number = 0; i < this.huds.length; ++i) {
                    this.view3d.addHUD(this.huds[i]);
                }
            }


            for (var i: number = 0; i < this.autoAnimationList.length; ++i) {
                var autoPlayData: any = this.autoAnimationList[i];
                switch (autoPlayData.type) {
                    case "skeletonAnimation":
                        autoPlayData.animation.play(autoPlayData.name, autoPlayData.speed, autoPlayData.reset, autoPlayData.prewarm);
                        break;
                    case "proAnimation":
                        autoPlayData.animation.play(autoPlayData.name);
                        break;
                    case "methodAnimation":
                        autoPlayData.animation.start(true);
                        break;
                    case "particleAnimation":
                        autoPlayData.animation.play(autoPlayData.speed, autoPlayData.reset, autoPlayData.prewarm);
                        break;
                    case "effectGroup":
                        autoPlayData.animation.play();
                        break;
                }
            }

            if (this._configParser.type == IConfigParser.TYPE_EFFECT_GROUP) {
                var effect: EffectGroup = <EffectGroup>this.data;
                if (effect) {
                    effect.init();
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

            this.addTask();
            var loader: URLLoader = assetMgr.loadAsset(path, this.onMaterialTexture, this, textureData);
            assetMgr.addEventListener(path, LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);

            return load;
        }

        private addMethodImgTask(name:string, method:MethodBase, textureName:string): URLLoader {
            var path: string = this._pathRoot + name;

            var methodData: any = {};
            methodData.method = method;
            methodData.textureName = textureName;

            this.addTask();
            var loader: URLLoader = assetMgr.loadAsset(path, this.onMethodTexture, this, methodData);
            assetMgr.addEventListener(path, LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);

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
                var defaultTexture: ITexture = CheckerboardTexture.texture;

                if (method.type == UnitMatMethodData.methodType.lightmapMethod) {
                    var lightmapMethod: LightmapMethod = new LightmapMethod(method.usePower);
                    material.diffusePass.addMethod(lightmapMethod);
                    lightmapMethod.lightTexture = defaultTexture;
                    

                    var textureData: any = method.texturesData[0];
                    load = this.addMethodImgTask(textureData.path, lightmapMethod, textureData.attributeName);
                }
                else if (method.type == UnitMatMethodData.methodType.uvRollMethod) {
                    var uvScrollMethod: UVRollMethod = new UVRollMethod();
                    material.diffusePass.addMethod(uvScrollMethod);

                    uvScrollMethod.speedU = method.uSpeed;
                    uvScrollMethod.speedV = method.vSpeed;
                    material.repeat = true;
                    if (method.play) {

                        var autoPlayData: any = {};
                        autoPlayData.type = "methodAnimation";
                        autoPlayData.animation = uvScrollMethod;
                        this.autoAnimationList.push(autoPlayData);

                        //uvScrollMethod.start(true);
                    }
                }
                else if (method.type == UnitMatMethodData.methodType.uvSpriteSheetMethod) {
                    var uvSpriteSheetMethod: UVSpriteSheetMethod = new UVSpriteSheetMethod(method.frameNum, method.row, method.col, method.totalTime);
                    material.diffusePass.addMethod(uvSpriteSheetMethod);
                    uvSpriteSheetMethod.isLoop = method.loop;
                    uvSpriteSheetMethod.delayTime = method.delayTime;
                    if (method.play) {
                        //uvSpriteSheetMethod.start(true);
                        var autoPlayData: any = {};
                        autoPlayData.type = "methodAnimation";
                        autoPlayData.animation = uvSpriteSheetMethod;
                        this.autoAnimationList.push(autoPlayData);
                    }
                }
                else if (method.type == UnitMatMethodData.methodType.mulUvRollMethod) {

                    var uvMethod: MulUVRollMethod = new MulUVRollMethod();
                    material.diffusePass.addMethod(uvMethod);

                    uvMethod.diffuseTexture1 = defaultTexture;

                    uvMethod.setSpeedU(0, method.uSpeed);
                    uvMethod.setSpeedV(0, method.vSpeed);

                    var textureData: any = method.texturesData[0];

                    uvMethod.setSpeedU(1, textureData.uSpeed);
                    uvMethod.setSpeedV(1, textureData.vSpeed);

                    load = this.addMethodImgTask(textureData.path, uvMethod, textureData.attributeName);

                    material.repeat = true;
                    if (method.play) {
                        //uvMethod.start(true);
                        var autoPlayData: any = {};
                        autoPlayData.type = "methodAnimation";
                        autoPlayData.animation = uvMethod;
                        this.autoAnimationList.push(autoPlayData);
                    }
                }
                else if (method.type == UnitMatMethodData.methodType.alphaMaskMethod) {
                    var maskmapMethod: AlphaMaskMethod = new AlphaMaskMethod();
                    material.diffusePass.addMethod(maskmapMethod);

                    maskmapMethod.maskTexture = defaultTexture;

                    var textureData: any = method.texturesData[0];

                    load = this.addMethodImgTask(textureData.path, maskmapMethod, textureData.attributeName);
                }
                else if (method.type == UnitMatMethodData.methodType.streamerMethod) {
                    var streamerMethod: StreamerMethod = new StreamerMethod();
                    material.diffusePass.addMethod(streamerMethod);
                    streamerMethod.steamerTexture = defaultTexture;
                    var textureData: any = method.texturesData[0];

                    load = this.addMethodImgTask(textureData.path, streamerMethod, textureData.attributeName);

                    streamerMethod.speedU = method.uSpeed;
                    streamerMethod.speedV = method.vSpeed;
                    if (method.play) {
                        //streamerMethod.start(true);

                        var autoPlayData: any = {};
                        autoPlayData.type = "methodAnimation";
                        autoPlayData.animation = streamerMethod;
                        this.autoAnimationList.push(autoPlayData);
                    }
                }
                else if (method.type == UnitMatMethodData.methodType.terrainARGBMethod) {
                    var terrainARGBMethod: TerrainARGBMethod = new TerrainARGBMethod(defaultTexture, defaultTexture, defaultTexture, defaultTexture, defaultTexture);
                    material.diffusePass.addMethod(terrainARGBMethod);
                    var textureData: any = null;
                    for (var i: number = 0; i < method.texturesData.length; ++i) {
                        textureData = method.texturesData[i];

                        load = this.addMethodImgTask(textureData.path, terrainARGBMethod, textureData.attributeName);

                        if (i != 0) {
                            
                            terrainARGBMethod.setUVTitling(i - 1, Number(textureData.uvTitlingX), Number(textureData.uvTitlingY));
                        }
                    }

                }
                else if (method.type == UnitMatMethodData.methodType.waterWaveMethod) {
                    var waterWaveMethod: WaterWaveMethod = new WaterWaveMethod();
                    material.diffusePass.addMethod(waterWaveMethod);
                    if (method["deepWaterColor"]) {
                        waterWaveMethod.deepWaterColor = Number( method["deepWaterColor"]);
                    }

                    if (method["shallowWaterColor"]) {
                        waterWaveMethod.shallowWaterColor = Number( method["shallowWaterColor"]);
                    }

                    material.repeat = true;
                }
                else if (method.type == UnitMatMethodData.methodType.waterNormalMethod) {

                    var waterNormalMethod: WaterNormalMethod = new WaterNormalMethod();
                    material.diffusePass.addMethod(waterNormalMethod);
                    waterNormalMethod.normalTextureA = defaultTexture;
                    waterNormalMethod.normalTextureB = defaultTexture;

                    if (method["uScale"] && method["vScale"]) {
                        waterNormalMethod.setUvScale(Number(method["uScale"]), Number( method["vScale"]));
                    }


                    var textureData: any = null;
                    for (var i: number = 0; i < method.texturesData.length; ++i) {
                        textureData = method.texturesData[i];

                        waterNormalMethod.setUvSpeed(i, Number(textureData.uSpeed), Number(textureData.vSpeed));
                        load = this.addMethodImgTask(textureData.path, waterNormalMethod, textureData.attributeName);
                    }

                }
            }
        }

        private processSkinClip() {
            for (var key in this._mapParser.skeletonAnimationDict) {
                var skinClip: any = this._mapParser.skeletonAnimationDict[key];
                var id: number = Number(key);

                var skeletonAnimation: SkeletonAnimation = new SkeletonAnimation();
                this.skinClipDict[id] = skeletonAnimation;

                for (var i: number = 0; i < skinClip.clips.length; ++i) {
                    var clip: any = skinClip.clips[i];

                    var path: string = this._pathRoot + clip.path;
                    clip.skinClip = skeletonAnimation;
                    clip.skinData = skinClip;
                    clip.clip = clip;
                    this.addTask();
                    var loader: URLLoader = assetMgr.loadAsset(path, this.onSkinClip, this, clip);
                    assetMgr.addEventListener(path, LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);
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
                    this.addTask();
                    var loader: URLLoader = assetMgr.loadAsset(path, this.onProAnim, this, clipData);
                    assetMgr.addEventListener(path, LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);
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

                } else if (mapLightData.type == LightType.pointlight && this._mapParser.pointLight) {
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

            var unitLoader: UnitLoader = e.target;
            unitLoader.removeEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onUnitLoader, this);

            switch (mapNodeData.type) {
                case UnitLoader.NODE_TYPE_EffectGroup:
                    this.processObject3d(mapNodeData, unitLoader.container);

                    var effectGroup: EffectGroup = <EffectGroup>unitLoader.container;
                    if (effectGroup) {
                        if (mapNodeData.auto) {
                            var autoPlayData: any = {};
                            autoPlayData.type = "effectGroup";
                            autoPlayData.animation = effectGroup;
                            this.autoAnimationList.push(autoPlayData);
                        }
                    }

                    break;
                case UnitLoader.NODE_TYPE_ParticleEmitter:
                    var particleData: ParticleData = unitLoader.data;
                    particleData.materialData = this._mapParser.matDict[mapNodeData.materialIDs[0]];

                    var particleNode: ParticleEmitter = new ParticleEmitter(particleData, new TextureMaterial());

                    this.processObject3d(mapNodeData, particleNode);

                    if (this.autoPlayAnimation || particleData.property.playOnAwake) {

                        var autoPlayData: any = {};
                        autoPlayData.type = "particleAnimation";
                        autoPlayData.animation = particleNode;
                        autoPlayData.speed = 1;
                        autoPlayData.reset = false;
                        autoPlayData.prewarm = particleData.property.prewarm;

                        this.autoAnimationList.push(autoPlayData);
                    }

                    this.processMat(mapNodeData);
                    break;
            }

            this.doLoadEpa(mapNodeData);
            this.processTask(unitLoader);
        }
    }
}