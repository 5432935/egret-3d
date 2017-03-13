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
    var UnitLoader = (function (_super) {
        __extends(UnitLoader, _super);
        /**
        * @language zh_CN
        * 加载配置文件 .json 或 .xml,
        * 如果是配置文件 暂时只能支持.json (Unity3d 中的egret3d插件可以直接导出)
        * @param url 默认参数为null  文件路径
        * @version Egret 3.0
        * @platform Web,Native
        */
        function UnitLoader(url) {
            if (url === void 0) { url = null; }
            var _this = _super.call(this) || this;
            /**
            * @language zh_CN
            * 场景对象的所有根节点.
            * 如果是配置文件，加载完后将后有值
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.container = null;
            /**
            * @private
            * @language zh_CN
            * 加载资源的URLLoader对象
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.loader = null;
            /**
            * @language zh_CN
            * 是否自动播放动画  默认不自动播放
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.autoPlayAnimation = false;
            _this._pathRoot = "";
            _this._configParser = null;
            _this._mapParser = null;
            _this._particleParser = null;
            _this._texturePackerParser = null;
            _this._taskCount = 0;
            _this._event = new egret3d.LoaderEvent3D();
            _this._type = "";
            _this._taskDict = {};
            _this._textures = {};
            /**
            * @private
            * @language zh_CN
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.skinClipDict = {};
            /**
            * @private
            * @language zh_CN
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.proAnimDict = {};
            _this.unitLoaderList = [];
            _this._dictUnitLoader = {};
            _this._unitQueue = [];
            /**
            * @private
            * @language zh_CN
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.huds = [];
            /**
            * @private
            * @language zh_CN
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.lightDict = {};
            _this.autoAnimationList = [];
            _this.continueProgressEvent = [];
            if (url) {
                _this.load(url);
            }
            return _this;
        }
        Object.defineProperty(UnitLoader.prototype, "configParser", {
            /**
            * @private
            * @language zh_CN
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._configParser;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UnitLoader.prototype, "pathRoot", {
            /**
            * @language zh_CN
            * 获取根目录
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._pathRoot;
            },
            /**
            * @language zh_CN
            * 设置根目录
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (path) {
                this._pathRoot = path;
            },
            enumerable: true,
            configurable: true
        });
        /*
        * @private
        */
        UnitLoader.prototype.addAutoAnimation = function (animation, speed, reset, prewarm, name) {
            if (speed === void 0) { speed = 1.0; }
            if (reset === void 0) { reset = false; }
            if (prewarm === void 0) { prewarm = false; }
            if (name === void 0) { name = ""; }
            var auto = {};
            auto.animation = animation;
            auto.speed = speed;
            auto.reset = reset;
            auto.prewarm = prewarm;
            auto.name = name;
            this.autoAnimationList.push(auto);
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
        UnitLoader.prototype.getAssetURLLoader = function (url) {
            return egret3d.assetMgr.findAsset(url, this);
        };
        UnitLoader.prototype.createObject = function () {
            return new egret3d.Object3D();
        };
        /**
        * @language zh_CN
        * 查找贴图
        * @param name 贴图名字
        * @version Egret 3.0
        * @platform Web,Native
        */
        UnitLoader.prototype.findTexture = function (name) {
            return this._textures[name];
        };
        /**
        * @language zh_CN
        * 加载文件
        * @param url 文件路径
        * @version Egret 3.0
        * @platform Web,Native
        */
        UnitLoader.prototype.load = function (url) {
            this.reset();
            this.resourceName = egret3d.StringUtil.getURLName(url);
            this.url = url;
            this.pathRoot = egret3d.StringUtil.getPath(url);
            this._type = egret3d.StringUtil.getFileFormat(url);
            this.taskTotal++;
            this._taskDict[this.url] = {};
            this._taskDict[this.url].status = 1;
            this._taskDict[this.url].currentProgress = 0;
            if (this._type == egret3d.ILoader.DATAFORMAT_E3DPACK) {
                this.loader = this.doAssetLoader(this.url, this.onE3dPack);
                var path = this.pathRoot + "MapConfig.json";
                this.processUrlContinue(path);
            }
            else {
                this.loader = this.doAssetLoader(this.url, this.onConfigLoad);
            }
            this.processUrlContinue(url);
        };
        UnitLoader.prototype.onE3dPack = function (e) {
            var loader = e.loader;
            this._type = egret3d.ILoader.DATAFORMAT_JSON;
            this.pathRoot += this.resourceName + "/";
            var path = this.pathRoot + "MapConfig.json";
            if (egret3d.assetMgr.getByteArray(path)) {
                this.taskTotal++;
                this._taskDict[path] = {};
                this._taskDict[path].status = 1;
                this._taskDict[path].currentProgress = 0;
                this.doAssetLoader(path, this.onConfigLoad, this);
            }
            this.processTask(loader);
        };
        // 是否跳过
        UnitLoader.prototype.processUrlContinue = function (url) {
            var format = egret3d.StringUtil.getFileFormat(url);
            if (format == egret3d.ILoader.DATAFORMAT_E3DPACK) {
                this.continueProgressEvent.push(url);
            }
            if (format == egret3d.ILoader.DATAFORMAT_JSON) {
                this.continueProgressEvent.push(url);
            }
        };
        /**
        * @language zh_CN
        * 释放所有数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        UnitLoader.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.reset();
            this.container = null;
        };
        UnitLoader.prototype.onProgress = function (e) {
            var targetLoader = e.target;
            if (this._taskDict[targetLoader.url]) {
                //for (var i: number = 0; i < this.continueProgressEvent.length; ++i) {
                //    if (targetLoader.url == this.continueProgressEvent[i]) {
                //        return;
                //    }
                //}
                this._taskDict[targetLoader.url].currentProgress = targetLoader.currentProgress;
                this.currentProgress = this.calculateProgress();
                if (this.currentProgress < 1.0) {
                    var loader = e.loader;
                    this._event.eventType = egret3d.LoaderEvent3D.LOADER_PROGRESS;
                    this._event.loader = loader;
                    this._event.data = loader.data;
                    this._event.currentProgress = this.currentProgress;
                    this.dispatchEvent(this._event);
                }
            }
        };
        UnitLoader.prototype.reset = function () {
            egret3d.assetMgr.dispose(this);
            if (this.url) {
                egret3d.assetMgr.removeByteArray(this.url);
                egret3d.textureResMgr.removeTexture(this.url);
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
            for (var i = 0; i < this.unitLoaderList.length; ++i) {
                this.unitLoaderList[i].dispose();
            }
            this.unitLoaderList.length = 0;
            this._dictUnitLoader = {};
            this._unitQueue.length = 0;
            this._currentUnitLoader = null;
            this.continueProgressEvent.length = 0;
        };
        UnitLoader.prototype.parseParticle = function () {
            this.data = this._particleParser.data;
            if (!this._particleParser.data.shape.meshFile && !this._particleParser.data.property.meshFile) {
                return;
            }
            if (this._particleParser.data.shape.meshFile) {
                var path = this._pathRoot + this._particleParser.data.shape.meshFile;
                var parData = {};
                parData.particle = this._particleParser.data;
                parData.type = "shape";
                this.doAssetLoader(path, this.onParticleEsmLoad1, parData);
            }
            if (this._particleParser.data.property.meshFile) {
                var path = this._pathRoot + this._particleParser.data.property.meshFile;
                var parData = {};
                parData.particle = this._particleParser.data;
                parData.type = "property";
                this.doAssetLoader(path, this.onParticleEsmLoad1, parData);
            }
        };
        UnitLoader.prototype.parseUnit = function () {
            this.processNode();
            this.processSkinClip();
            this.processProAnim();
            this.createLight();
            if (this._mapParser.uv2) {
                var path = this.pathRoot + this._mapParser.uv2;
                this.doAssetLoader(path, this.onCompleteUv2);
            }
            else {
                this.onProcessNodeLoad();
            }
        };
        UnitLoader.prototype.onCompleteUv2 = function (e) {
            var load = e.loader;
            this.uv2Dict = e.data;
            this.onProcessNodeLoad();
            this.processTask(load);
        };
        UnitLoader.prototype.onProcessNodeLoad = function () {
            for (var i = 0; i < this._mapParser.nodeList.length; i++) {
                var mapNodeData = this._mapParser.nodeList[i];
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
                            var path = this._pathRoot + mapNodeData.path;
                            this.doAssetLoader(path, this.onEsmLoad, mapNodeData);
                        }
                        else if (mapNodeData.geometry) {
                            this.processMesh(mapNodeData, egret3d.GeometryUtil.createGemetryForType(mapNodeData.geometry.type, mapNodeData.geometry));
                        }
                        break;
                    case "Terrain":
                        if (mapNodeData.path) {
                            var path = this._pathRoot + mapNodeData.path;
                            this.doAssetLoader(path, this.onHeightImg, mapNodeData);
                        }
                        break;
                    case "ParticleEmitter":
                        if (mapNodeData.path) {
                            var path = this._pathRoot + mapNodeData.path;
                            var loader = this.doUnitLoader(path, this.onUnitLoader, mapNodeData);
                            if (this._configParser.version == 1) {
                                loader.pathRoot = this._pathRoot;
                            }
                        }
                        break;
                    case "EffectGroup":
                        if (mapNodeData.path) {
                            var path = this._pathRoot + mapNodeData.path;
                            this.doUnitLoader(path, this.onUnitLoader, mapNodeData);
                        }
                        break;
                }
            }
            for (var i = 0; i < this._mapParser.textures.length; ++i) {
                var data = this._mapParser.textures[i];
                var path = this._pathRoot + data.path;
                this.doAssetLoader(path, this.onTexture, data.name);
            }
            for (var i = 0; i < this._mapParser.hudList.length; ++i) {
                var hudData = this._mapParser.hudList[i];
                var hud = new egret3d.HUD();
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
                var path = this._pathRoot + hudData.texture;
                this.doAssetLoader(path, this.onHudTexture, hudData);
            }
        };
        UnitLoader.prototype.parseTexturePacker = function () {
            if (this._texturePackerParser.data.meta && this._texturePackerParser.data.meta.image) {
                var path = this._pathRoot + this._texturePackerParser.data.meta.image;
                this.doAssetLoader(path, this.onTexturePackerLoad);
            }
        };
        UnitLoader.prototype.onTexturePackerLoad = function (e) {
            var load = e.loader;
            this.data = load.data;
            egret3d.textureResMgr.addTexture(this.url, this._texturePackerParser.data, load.data);
            this.processTask(load);
        };
        UnitLoader.prototype.parseConfig = function (dataConfig, type) {
            this._configParser = egret3d.UnitParserUtils.parserConfig(dataConfig, type);
            if (!this._configParser) {
                return false;
            }
            var path = "";
            for (var v in this._configParser.taskDict) {
                this.taskTotal++;
                path = this._pathRoot + v;
                this._taskDict[path] = {};
                this._taskDict[path].status = 1;
                this._taskDict[path].currentProgress = 0;
            }
            switch (this._configParser.type) {
                case egret3d.IConfigParser.TYPE_SCENE:
                    this._mapParser = this._configParser;
                    this.container = this.container || new egret3d.Scene3D();
                    this.parseUnit();
                    break;
                case egret3d.IConfigParser.TYPE_SKIN_MESH:
                    this.container = this.container || new egret3d.Role();
                    this._mapParser = this._configParser;
                    this.parseUnit();
                    break;
                case egret3d.IConfigParser.TYPE_EFFECT_GROUP:
                    this.container = this.container || new egret3d.EffectGroup();
                    this._mapParser = this._configParser;
                    this.parseUnit();
                    break;
                case egret3d.IConfigParser.TYPE_PARTICLE:
                    this._particleParser = this._configParser;
                    this.parseParticle();
                    break;
                case egret3d.IConfigParser.TYPE_TEXTUREPACKER:
                    this._texturePackerParser = this._configParser;
                    this.parseTexturePacker();
                    break;
                default:
                    return false;
            }
            if (this.container) {
                this.data = this.container;
            }
            return true;
        };
        UnitLoader.prototype.processParticle = function (particleData, nodeData) {
            if (!particleData.shape.meshFile && !particleData.property.meshFile) {
                this.processParticleGeometry(particleData, nodeData);
            }
            else {
                if (particleData.shape.meshFile) {
                    var path = this._pathRoot + particleData.shape.meshFile;
                    var parData = {};
                    parData.particle = particleData;
                    parData.nodeData = nodeData;
                    parData.type = "shape";
                    this.doAssetLoader(path, this.onParticleEsmLoad, parData);
                }
                if (particleData.property.meshFile) {
                    var path = this._pathRoot + particleData.property.meshFile;
                    var parData = {};
                    parData.particle = particleData;
                    parData.nodeData = nodeData;
                    parData.type = "property";
                    this.doAssetLoader(path, this.onParticleEsmLoad, parData);
                }
            }
            return null;
        };
        UnitLoader.prototype.processParticleGeometry = function (particleData, nodeData) {
            particleData.materialData = this._mapParser.matDict[nodeData.materialIDs[0]];
            var particleNode = new egret3d.ParticleEmitter(particleData, new egret3d.TextureMaterial());
            nodeData.visible = egret3d.Egret3DPolicy.useParticle;
            this.processObject3d(nodeData, particleNode);
            if (this.autoPlayAnimation || particleData.property.playOnAwake) {
                this.addAutoAnimation(particleNode, 1, false, particleData.property.prewarm);
            }
            this.processMat(nodeData);
        };
        UnitLoader.prototype.processObject3d = function (nodeData, object3d) {
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
        };
        UnitLoader.prototype.onConfigLoad = function (e) {
            var loader = e.loader;
            switch (this._type) {
                case egret3d.ILoader.DATAFORMAT_XML:
                case egret3d.ILoader.DATAFORMAT_JSON:
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
        };
        UnitLoader.prototype.onHeightImg = function (e) {
            var load = e.loader;
            var mapNodeData = e.param;
            var geometry = mapNodeData.geometry;
            var mesh = new egret3d.Terrain(load.data, geometry.width, geometry.height, geometry.depth, geometry.segmentsW, geometry.segmentsH, false, new egret3d.TextureMaterial(load.data));
            this.processHeightMesh(mapNodeData, mesh);
            var grass = mapNodeData.grass;
            if (grass) {
                for (var i = 0; i < grass.length; ++i) {
                    var grassData = grass[i];
                    var path = this._pathRoot + grassData.detailTexture;
                    var paramData = {};
                    paramData.grassData = grassData;
                    paramData.mapNodeData = mapNodeData;
                    this.doAssetLoader(path, this.onGrassDetailTexture, paramData);
                }
            }
            this.processTask(load);
        };
        UnitLoader.prototype.doAssetLoader = function (url, callback, param) {
            if (param === void 0) { param = null; }
            this.addTask();
            var loader = egret3d.assetMgr.loadAsset(url, callback, this, param);
            egret3d.assetMgr.addEventListener(url, egret3d.LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);
            return loader;
        };
        UnitLoader.prototype.doUnitLoader = function (url, callback, param) {
            var _this = this;
            if (param === void 0) { param = null; }
            this.addTask();
            var loader = this._dictUnitLoader[url];
            if (!loader) {
                loader = { pathRoot: null, loader: new UnitLoader() };
                this._dictUnitLoader[url] = loader;
                loader.loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onUnitComplete, this, param);
                this.unitLoaderList.push(loader.loader);
                this._unitQueue.push(url);
                if (!this._currentUnitLoader) {
                    this._currentUnitLoader = loader.loader;
                    this._currentUnitLoader.load(url);
                }
            }
            if (loader.loader.data) {
                setTimeout(function () {
                    if (callback) {
                        var loaderEvent = new egret3d.LoaderEvent3D();
                        loaderEvent.eventType = egret3d.LoaderEvent3D.LOADER_COMPLETE;
                        loaderEvent.target = loader.loader;
                        loaderEvent.loader = loader.loader;
                        loaderEvent.data = loader.loader.data;
                        loaderEvent.param = param;
                        callback.call(_this, loaderEvent);
                    }
                }, 0);
            }
            else {
                loader.loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, callback, this, param);
                loader.loader.addEventListener(egret3d.LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);
            }
            return loader;
        };
        UnitLoader.prototype.onUnitComplete = function (e) {
            this._unitQueue.shift();
            if (this._unitQueue.length > 0) {
                var url = this._unitQueue[0];
                var loader = this._dictUnitLoader[url];
                this._currentUnitLoader = loader.loader;
                this._currentUnitLoader.load(url);
                if (loader.pathRoot) {
                    this._currentUnitLoader.pathRoot = loader.pathRoot;
                }
            }
            else {
                this._currentUnitLoader = null;
            }
        };
        UnitLoader.prototype.onTexture = function (e) {
            var load = e.loader;
            var name = e.param;
            this._textures[name] = load.data;
            this.processTask(load);
        };
        UnitLoader.prototype.onHudTexture = function (e) {
            var load = e.loader;
            var hudData = e.param;
            hudData.hud.diffuseTexture = load.data;
            this.processTask(load);
        };
        UnitLoader.prototype.onMaterialTexture = function (e) {
            var load = e.loader;
            var textureData = e.param;
            var mesh = null;
            var mat = null;
            var mapNodeData = textureData.mapNodeData;
            mesh = mapNodeData.object3d;
            mat = mesh.getMaterial(textureData.matID);
            mat[textureData.type] = load.data;
            this.processTask(load);
        };
        UnitLoader.prototype.onMethodTexture = function (e) {
            var load = e.loader;
            var methodData = e.param;
            methodData.method[methodData.textureName] = load.data;
            this.processTask(load);
        };
        UnitLoader.prototype.onGrassDetailTexture = function (e) {
            var load = e.loader;
            var paramData = e.param;
            var grassData = paramData.grassData;
            var mapNodeData = paramData.mapNodeData;
            var terrain = mapNodeData.object3d;
            var list = this.getGrassPositions(terrain, load.data);
            if (list.length > 0) {
                var mat = new egret3d.TextureMaterial();
                mat.ambientColor = 0xffffff;
                mat.blendMode = egret3d.BlendMode.NORMAL;
                mat.cutAlpha = 0.4;
                //todo草的lightmap需要后期加入
                var rect = new egret3d.Rectangle(terrain.x, terrain.z, terrain.x * 2, terrain.z * 2);
                var grassMesh = new egret3d.GrassMesh(list, mat, grassData);
                grassMesh.method.setLightMapData(egret3d.CheckerboardTexture.texture, rect);
                //end
                terrain.addChild(grassMesh);
                terrain.x;
                terrain.y;
                var data = paramData.grassData;
                if (data.grassTexture) {
                    var path = this._pathRoot + data.grassTexture;
                    this.doAssetLoader(path, this.onGrassDiffuseTexture, grassMesh.material);
                }
            }
            this.processTask(load);
        };
        UnitLoader.prototype.getGrassPositions = function (terrain, texture) {
            var elevationGeometry = terrain.geometry;
            var image = texture.readPixels(0, 0, texture.width, texture.height);
            var width = image.width;
            var height = image.height;
            var color;
            var offset;
            var ratio = 1 / 16;
            var positions = [];
            var pos;
            var xFloat;
            var yFloat;
            for (var i = 0; i < height; i++) {
                for (var j = 0; j < width; j++) {
                    offset = i * width + j;
                    offset *= 4;
                    color = image.data[offset] * ratio;
                    color = Math.round(color);
                    if (color > 0) {
                        for (var k = 0; k < color; k++) {
                            xFloat = j + Math.random() - 0.5;
                            yFloat = i + Math.random() - 0.5;
                            if (xFloat < 0) {
                                xFloat = 0;
                            }
                            else if (xFloat >= width) {
                                xFloat = width - 0.01;
                            }
                            if (yFloat < 0) {
                                yFloat = 0;
                            }
                            else if (yFloat >= height) {
                                yFloat -= 0.01;
                            }
                            pos = elevationGeometry.get3DCoordAtPixel(xFloat, yFloat, width, height);
                            positions.push(pos);
                        }
                    }
                }
            }
            return positions;
        };
        UnitLoader.prototype.onGrassDiffuseTexture = function (e) {
            var load = e.loader;
            e.param.diffuseTexture = load.data;
            this.processTask(load);
        };
        UnitLoader.prototype.doLoadEpa = function (mapNodeData) {
            if (mapNodeData.propertyAnims) {
                for (var j = 0; j < mapNodeData.propertyAnims.length; ++j) {
                    if (!mapNodeData.object3d.proAnimation) {
                        mapNodeData.object3d.proAnimation = new egret3d.PropertyAnimController(mapNodeData.object3d);
                    }
                    var propertyAnimsData = mapNodeData.propertyAnims[j];
                    var path = this._pathRoot + propertyAnimsData["path"];
                    this.doAssetLoader(path, this.onEpaLoad, mapNodeData);
                }
            }
            var propertyAnimController = this.proAnimDict[mapNodeData.propertyAnimsId];
            if (propertyAnimController) {
                mapNodeData.object3d.proAnimation = propertyAnimController;
            }
        };
        UnitLoader.prototype.processEpa = function (mapNodeData, pro) {
            mapNodeData.object3d.proAnimation.propertyAnimController.addPropertyAnim(pro);
            if (this.autoPlayAnimation) {
                if (mapNodeData.object3d.proAnimation) {
                    this.addAutoAnimation(mapNodeData.object3d.proAnimation);
                }
            }
        };
        UnitLoader.prototype.processHeightMesh = function (mapNodeData, mesh) {
            this.processObject3d(mapNodeData, mesh);
            this.processMat(mapNodeData);
            this.doLoadEpa(mapNodeData);
        };
        UnitLoader.prototype.processMesh = function (mapNodeData, geometry) {
            var animation = this.skinClipDict[mapNodeData.skeletonAnimation];
            var mesh = null;
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
                mesh = new egret3d.Mesh(geometry, new egret3d.TextureMaterial(), animation);
            }
            else if (mapNodeData.type == "CubeSky") {
                mesh = new egret3d.Sky(geometry, new egret3d.CubeTextureMaterial());
            }
            else if (mapNodeData.type == "SphereSky") {
                mesh = new egret3d.Sky(geometry, new egret3d.TextureMaterial());
            }
            egret3d.EUMVersion.fillGeometryUv2(mapNodeData.uv2Id, this.uv2Dict, mesh.geometry);
            this.processObject3d(mapNodeData, mesh);
            this.processMat(mapNodeData);
            for (var j = 0; j < mapNodeData.skinClips.length; j++) {
                var eamData = mapNodeData.skinClips[j];
                var path = this._pathRoot + eamData["path"];
                var loadData = {};
                loadData.eamData = eamData;
                loadData.mapNodeData = mapNodeData;
                this.doAssetLoader(path, this.onEamLoad, loadData);
            }
            this.doLoadEpa(mapNodeData);
        };
        UnitLoader.prototype.onEsmLoad = function (e) {
            var load = e.loader;
            var mapNodeData = e.param;
            if (mapNodeData) {
                var geo = load.data;
                if (this.uv2Dict && this.uv2Dict[mapNodeData.uv2Id]) {
                    geo = new egret3d.Geometry();
                    geo.copy(load.data);
                }
                this.processMesh(mapNodeData, geo);
            }
            this.processTask(load);
        };
        UnitLoader.prototype.onParticleEsmLoad = function (e) {
            var load = e.loader;
            var parData = e.param;
            var particle = parData.particle;
            var nodeData = parData.nodeData;
            switch (parData.type) {
                case "shape":
                    particle.shape.geometry = load.data;
                    break;
                case "property":
                    particle.property.geometry = load.data;
                    break;
            }
            var needLoad = 0;
            var loaded = 0;
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
                this.processParticleGeometry(particle, nodeData);
            }
            this.processTask(load);
        };
        UnitLoader.prototype.onParticleEsmLoad1 = function (e) {
            var load = e.loader;
            var parData = e.param;
            var particle = parData.particle;
            switch (parData.type) {
                case "shape":
                    particle.shape.geometry = load.data;
                    break;
                case "property":
                    particle.property.geometry = load.data;
                    break;
            }
            var needLoad = 0;
            var loaded = 0;
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
        };
        UnitLoader.prototype.onEamLoad = function (e) {
            var load = e.loader;
            var loadData = e.param;
            var clip = load.data;
            clip.animationName = loadData.eamData.name;
            var mesh = loadData.mapNodeData.object3d;
            mesh.animation.skeletonAnimationController.state.addAnimClip(clip);
            if (this.autoPlayAnimation) {
                this.addAutoAnimation(mesh.animation, 1, false, false, clip.animationName);
            }
            this.processTask(load);
        };
        UnitLoader.prototype.onSkinClip = function (e) {
            var load = e.loader;
            var loadData = e.param;
            var skeletonAnimation = loadData.skinClip;
            var skinData = loadData.skinData;
            var clipData = loadData.clip;
            var clip = load.data;
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
        };
        UnitLoader.prototype.onProAnim = function (e) {
            var load = e.loader;
            var loadData = e.param;
            var proAnimation = loadData.proAnimation;
            var proData = loadData.proData;
            var clipData = loadData.clip;
            var clip = load.data;
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
        };
        UnitLoader.prototype.onEpaLoad = function (e) {
            var load = e.loader;
            var mapNodeData = e.param;
            var pa = load.data;
            var clonePa = pa.clone();
            this.processEpa(mapNodeData, clonePa);
            this.processTask(load);
        };
        UnitLoader.prototype.addTask = function () {
            this._taskCount++;
        };
        UnitLoader.prototype.calculateProgress = function () {
            var progress = 0;
            for (var key in this._taskDict) {
                var has = false;
                for (var i = 0; i < this.continueProgressEvent.length; ++i) {
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
        };
        UnitLoader.prototype.processTaskCurrent = function (load) {
            if (this._taskDict[load.url]) {
                if (this._taskDict[load.url].status == 1) {
                    this.taskCurrent++;
                    this._taskDict[load.url].status = 2;
                    this._taskDict[load.url].currentProgress = 1;
                    this._event.loader = load;
                    this._event.data = load.data;
                    var isDisEventProgress = true;
                    //for (var i: number = 0; i < this.continueProgressEvent.length; ++i) {
                    //    if (load.url == this.continueProgressEvent[i]) {
                    //        isDisEventProgress = false;
                    //        break;
                    //    }
                    //}
                    // 触发 LOADER_PROGRESS
                    this.currentProgress = this.calculateProgress();
                    if (this.currentProgress < 1.0) {
                        this._event.eventType = egret3d.LoaderEvent3D.LOADER_PROGRESS;
                        this._event.currentProgress = this.currentProgress;
                        this.dispatchEvent(this._event);
                    }
                    this._event.currentProgress = this.currentProgress;
                    // 某一个文件加载完成  
                    this._event.eventType = egret3d.LoaderEvent3D.LOADER_ONCE_COMPLETE;
                    this.dispatchEvent(this._event);
                }
            }
        };
        UnitLoader.prototype.processTask = function (load) {
            this.processTaskCurrent(load);
            this._taskCount--;
            if (this._taskCount <= 0) {
                this.currentProgress = 1.0;
                this.onLoaderComplete();
                this._event.loader = this;
                this._event.data = this.data;
                this._event.currentProgress = this.currentProgress;
                // 触发 LOADER_PROGRESS
                this._event.eventType = egret3d.LoaderEvent3D.LOADER_PROGRESS;
                this.dispatchEvent(this._event);
                // 全部文件加载完成
                this._event.eventType = egret3d.LoaderEvent3D.LOADER_COMPLETE;
                this.dispatchEvent(this._event);
            }
        };
        UnitLoader.prototype.onLoaderComplete = function () {
            if (!this._configParser) {
                return;
            }
            if (this._mapParser) {
                this.data = this.container;
                var subEmitters = [];
                for (var i = 0; i < this._mapParser.nodeList.length; i++) {
                    var mapNodeData = this._mapParser.nodeList[i];
                    if (mapNodeData.object3d instanceof egret3d.ParticleEmitter) {
                        var patEmitter = mapNodeData.object3d;
                        for (var j = 0; j < mapNodeData.childs.length; ++j) {
                            var childData = mapNodeData.childs[j];
                            var childPatEmitter = this.container.findObject3D(childData.name);
                            subEmitters.push(childPatEmitter);
                            if (childPatEmitter instanceof egret3d.ParticleEmitter) {
                                patEmitter.addSubEmitter(Number(egret3d.ParticleDataSubEmitterPhase[childData.phase]), childPatEmitter);
                            }
                        }
                    }
                    if (mapNodeData.boneBind.skeletonAnimation) {
                        var id = Number(mapNodeData.boneBind.skeletonAnimation);
                        var skeletonAnimation = this.skinClipDict[id];
                        skeletonAnimation.bindToJointPose(mapNodeData.boneBind.boneName, mapNodeData.object3d);
                    }
                }
                var tempEmitter;
                for (var i = 0; i < subEmitters.length; i++) {
                    tempEmitter = subEmitters[i];
                    if (tempEmitter && tempEmitter.parent) {
                        tempEmitter.parent.removeChild(tempEmitter);
                    }
                }
                //**********场景加载完毕 自动 merge ****************
                var auto = true;
                if (auto) {
                    var meshs = egret3d.StaticMergeUtil.bacthingMesh(this._mapParser);
                    for (var m in meshs) {
                        this.container.addChild(meshs[m]);
                    }
                }
            }
            if (this.view3d) {
                for (var i = 0; i < this.huds.length; ++i) {
                    this.view3d.addHUD(this.huds[i]);
                }
            }
            for (var i = 0; i < this.autoAnimationList.length; ++i) {
                var autoPlayData = this.autoAnimationList[i];
                if (autoPlayData.animation instanceof egret3d.SkeletonAnimation) {
                    autoPlayData.animation.play(autoPlayData.name, autoPlayData.speed, autoPlayData.reset, autoPlayData.prewarm);
                }
                else if (autoPlayData.animation instanceof egret3d.PropertyAnimController) {
                    autoPlayData.animation.play(autoPlayData.name);
                }
                else if (autoPlayData.animation instanceof egret3d.MethodBase) {
                    autoPlayData.animation.start(true);
                }
                else if (autoPlayData.animation instanceof egret3d.ParticleEmitter) {
                    autoPlayData.animation.play(autoPlayData.speed, autoPlayData.reset, autoPlayData.prewarm);
                }
                else if (autoPlayData.animation instanceof egret3d.EffectGroup) {
                    autoPlayData.animation.play();
                }
            }
            if (this._configParser.type == egret3d.IConfigParser.TYPE_EFFECT_GROUP) {
                var effect = this.data;
                if (effect) {
                    effect.init(this._mapParser.loop);
                    if (this._mapParser.auto) {
                        effect.play();
                    }
                }
            }
            if (this._configParser.type == egret3d.IConfigParser.TYPE_SKIN_MESH) {
                var role = this.data;
                for (var key in this.skinClipDict) {
                    role.skeletonAnimation = this.skinClipDict[key];
                    break;
                }
            }
        };
        UnitLoader.prototype.addImaTask = function (name, type, matID, mapNodeData, material) {
            var load = null;
            var path = this._pathRoot + name;
            var textureData = {};
            textureData.type = type;
            textureData.matID = matID;
            textureData.mapNodeData = mapNodeData;
            this.doAssetLoader(path, this.onMaterialTexture, textureData);
            return load;
        };
        /*
        * @private
        */
        UnitLoader.prototype.addMethodImgTask = function (name, method, textureName) {
            var path = this._pathRoot + name;
            var methodData = {};
            methodData.method = method;
            methodData.textureName = textureName;
            var loader = this.doAssetLoader(path, this.onMethodTexture, methodData);
            return loader;
        };
        UnitLoader.prototype.processMat = function (mapNodeData) {
            var mesh = mapNodeData.object3d;
            for (var i = 0; i < mapNodeData.materialIDs.length; ++i) {
                var matData = this._mapParser.matDict[mapNodeData.materialIDs[i]];
                if (!matData) {
                    continue;
                }
                var material = mesh.getMaterial(i);
                if (!material) {
                    material = new egret3d.TextureMaterial();
                    mesh.addSubMaterial(i, material);
                }
                var load = null;
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
                var lightGroup = new egret3d.LightGroup();
                for (var j = 0; j < matData.lightIds.length; ++j) {
                    var light = this.lightDict[matData.lightIds[j]];
                    if (light) {
                        lightGroup.addLight(light);
                    }
                }
                if (lightGroup.lightNum > 0) {
                    material.lightGroup = lightGroup;
                }
                this.processMethod(material, matData);
            }
            var lg = mesh.lightGroup || new egret3d.LightGroup();
            for (var i = 0; i < mapNodeData.lightIds.length; ++i) {
                var light = this.lightDict[mapNodeData.lightIds[i]];
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
        };
        UnitLoader.prototype.processMethod = function (material, matData) {
            var load = null;
            var method = null;
            for (var _i = 0, _a = matData.methods; _i < _a.length; _i++) {
                method = _a[_i];
                egret3d.MethodUtils.doMethod(material, method, this);
            }
        };
        UnitLoader.prototype.processNode = function () {
            for (var i = 0; i < this._mapParser.nodeList.length; i++) {
                var mapNodeData = this._mapParser.nodeList[i];
                if (mapNodeData.type == "Camera3D") {
                    var camera = new egret3d.Camera3D();
                    camera.fieldOfView = mapNodeData.fov;
                    camera.near = mapNodeData.clipNear;
                    camera.far = mapNodeData.clipFar;
                    mapNodeData.object3d = camera;
                }
                else if (mapNodeData.type == "Billboard") {
                    mapNodeData.object3d = new egret3d.Billboard(new egret3d.TextureMaterial(egret3d.CheckerboardTexture.texture));
                }
                else if (mapNodeData.type == "Terrain") {
                    mapNodeData.object3d = new egret3d.Object3D();
                }
                else if (mapNodeData.type == "DirectLight") {
                    var dirLight = new egret3d.DirectLight();
                    mapNodeData.object3d = dirLight;
                    dirLight.lightId = mapNodeData.lightData.id;
                    dirLight.diffuse = mapNodeData.lightData.diffuseColor;
                    dirLight.ambient = mapNodeData.lightData.ambientColor;
                    dirLight.halfIntensity = mapNodeData.lightData.halfIntensity;
                    dirLight.intensity = mapNodeData.lightData.intensity;
                    this.lightDict[mapNodeData.lightData.id] = dirLight;
                }
                else if (mapNodeData.type == "PointLight") {
                    var pLight = new egret3d.PointLight();
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
                    mapNodeData.object3d = new egret3d.Object3D();
                }
                mapNodeData.object3d.name = mapNodeData.name;
                mapNodeData.object3d.visible = mapNodeData.visible;
                mapNodeData.object3d.position = new egret3d.Vector3(mapNodeData.x, mapNodeData.y, mapNodeData.z);
                mapNodeData.object3d.orientation = new egret3d.Quaternion(mapNodeData.rx, mapNodeData.ry, mapNodeData.rz, mapNodeData.rw);
                mapNodeData.object3d.scale = new egret3d.Vector3(mapNodeData.sx, mapNodeData.sy, mapNodeData.sz);
                if (mapNodeData.tagName != "") {
                    mapNodeData.object3d.tag.name = mapNodeData.tagName;
                }
            }
            for (var i = 0; i < this._mapParser.nodeList.length; i++) {
                var mapNodeData0 = this._mapParser.nodeList[i];
                for (var j = 0; j < this._mapParser.nodeList.length; j++) {
                    var mapNodeData1 = this._mapParser.nodeList[j];
                    if (mapNodeData0.parent == mapNodeData1.insID) {
                        mapNodeData1.object3d.addChild(mapNodeData0.object3d);
                        break;
                    }
                }
            }
        };
        UnitLoader.prototype.processSkinClip = function () {
            for (var key in this._mapParser.skeletonAnimationDict) {
                var skinClip = this._mapParser.skeletonAnimationDict[key];
                var id = Number(key);
                var skeletonAnimation = new egret3d.SkeletonAnimation(new egret3d.SkeletonAnimationState());
                this.skinClipDict[id] = skeletonAnimation;
                for (var i = 0; i < skinClip.clips.length; ++i) {
                    var clip = skinClip.clips[i];
                    var path = this._pathRoot + clip.path;
                    var clipData = {};
                    clipData.skinClip = skeletonAnimation;
                    clipData.skinData = skinClip;
                    clipData.clip = clip;
                    this.doAssetLoader(path, this.onSkinClip, clipData);
                }
            }
        };
        UnitLoader.prototype.processProAnim = function () {
            for (var key in this._mapParser.proAnimationDict) {
                var proData = this._mapParser.proAnimationDict[key];
                var id = Number(key);
                var proAnimation = new egret3d.PropertyAnimController();
                this.proAnimDict[id] = proAnimation;
                for (var i = 0; i < proData.clips.length; ++i) {
                    var clip = proData.clips[i];
                    var path = this._pathRoot + clip.path;
                    var clipData = {};
                    clipData.proAnimation = proAnimation;
                    clipData.proData = proData;
                    clipData.clip = clip;
                    this.doAssetLoader(path, this.onProAnim, clipData);
                }
            }
        };
        //灯光
        UnitLoader.prototype.createLight = function () {
            var mapLightData = null;
            for (var key in this._mapParser.lightDict) {
                mapLightData = this._mapParser.lightDict[key];
                if (mapLightData.type == egret3d.LightType.directlight && this._mapParser.directLight) {
                    var dirLight = new egret3d.DirectLight(mapLightData.direction);
                    dirLight.lightId = mapLightData.id;
                    dirLight.diffuse = mapLightData.diffuseColor;
                    dirLight.ambient = mapLightData.ambientColor;
                    dirLight.halfIntensity = mapLightData.halfIntensity;
                    dirLight.intensity = mapLightData.intensity;
                    this.lightDict[mapLightData.id] = dirLight;
                }
                else if (mapLightData.type == egret3d.LightType.pointlight && this._mapParser.pointLight) {
                    var pLight = new egret3d.PointLight(0);
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
        };
        UnitLoader.prototype.onUnitLoader = function (e) {
            var mapNodeData = e.param;
            var unitLoader = e.target;
            unitLoader.removeEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onUnitLoader, this);
            switch (mapNodeData.type) {
                case UnitLoader.NODE_TYPE_EffectGroup:
                    this.processObject3d(mapNodeData, unitLoader.container);
                    var effectGroup = unitLoader.container;
                    if (effectGroup) {
                        if (mapNodeData.auto) {
                            this.addAutoAnimation(effectGroup);
                        }
                    }
                    break;
                case UnitLoader.NODE_TYPE_ParticleEmitter:
                    var particleData = unitLoader.data;
                    particleData.materialData = this._mapParser.matDict[mapNodeData.materialIDs[0]];
                    var particleNode = new egret3d.ParticleEmitter(particleData, new egret3d.TextureMaterial());
                    mapNodeData.visible = egret3d.Egret3DPolicy.useParticle;
                    this.processObject3d(mapNodeData, particleNode);
                    if (this.autoPlayAnimation || particleData.property.playOnAwake) {
                        this.addAutoAnimation(particleNode, 1, false, particleData.property.prewarm);
                    }
                    this.processMat(mapNodeData);
                    break;
            }
            this.doLoadEpa(mapNodeData);
            this.processTask(unitLoader);
        };
        return UnitLoader;
    }(egret3d.ILoader));
    /**
    * @language zh_CN
    * Object3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    UnitLoader.NODE_TYPE_Object3D = "Object3D";
    /**
    * @language zh_CN
    * Camera3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    UnitLoader.NODE_TYPE_Camera3D = "Camera3D";
    /**
    * @language zh_CN
    * @private
    * CubeSky
    * @version Egret 3.0
    * @platform Web,Native
    */
    UnitLoader.NODE_TYPE_CubeSky = "CubeSky";
    /**
    * @language zh_CN
    * @private
    * SphereSky
    * @version Egret 3.0
    * @platform Web,Native
    */
    UnitLoader.NODE_TYPE_SphereSky = "SphereSky";
    /**
    * @language zh_CN
    * Mesh
    * @version Egret 3.0
    * @platform Web,Native
    */
    UnitLoader.NODE_TYPE_MESH = "Mesh";
    /**
    * @language zh_CN
    * Terrain
    * @version Egret 3.0
    * @platform Web,Native
    */
    UnitLoader.NODE_TYPE_Terrain = "Terrain";
    /**
    * @language zh_CN
    * ParticleEmitter
    * @version Egret 3.0
    * @platform Web,Native
    */
    UnitLoader.NODE_TYPE_ParticleEmitter = "ParticleEmitter";
    /**
    * @language zh_CN
    * EffectGroup
    * @version Egret 3.0
    * @platform Web,Native
    */
    UnitLoader.NODE_TYPE_EffectGroup = "EffectGroup";
    egret3d.UnitLoader = UnitLoader;
    __reflect(UnitLoader.prototype, "egret3d.UnitLoader");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=UnitLoader.js.map