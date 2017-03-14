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
    * @private
    * @version Egret 3.0
    * @platform Web,Native
    */
    var UnitJsonParser = (function (_super) {
        __extends(UnitJsonParser, _super);
        function UnitJsonParser(data, mapConfigParser) {
            var _this = _super.call(this, data, mapConfigParser) || this;
            _this._mapConfigParser.version = Number(data.version);
            _this._mapConfigParser.engineVersion = String(data.egret3DVersion);
            return _this;
        }
        UnitJsonParser.prototype.parser = function () {
            if (this._mapConfigParser.engineVersion == undefined) {
                console.log("the resource engine Version is old , but the current engine Version is " + egret3d.Egret3DPolicy.engineVersion);
            }
            var index = egret3d.Egret3DPolicy.exportToolsVersion.indexOf(this._mapConfigParser.engineVersion);
            if (index == -1) {
                console.log("the resource engine Version is " + this._mapConfigParser.engineVersion + ", but the current engine Version is " + egret3d.Egret3DPolicy.engineVersion);
            }
            this._versionParser = egret3d.UnitParserUtils.jsonVersion(this._mapConfigParser.version, this._data, this._mapConfigParser);
            this._versionParser.parseEnvironment(this._data.env);
            if (this._data.auto) {
                this._mapConfigParser.auto = this._data.auto == "true" ? true : false;
            }
            if (this._data.loop) {
                this._mapConfigParser.loop = this._data.loop == "true" ? true : false;
            }
            if (this._data.uv2) {
                this._mapConfigParser.uv2 = this._data.uv2;
            }
            this._mapConfigParser.calculateTask();
            if (this._data.propertyAnimations) {
                for (var i = 0; i < this._data.propertyAnimations.length; i++) {
                    var proAnimation = this._data.propertyAnimations[i];
                    var id = Number(proAnimation.id);
                    if (proAnimation) {
                        this._mapConfigParser.proAnimationDict[id] = proAnimation;
                        this._mapConfigParser.calculateProAnimationTask(proAnimation);
                    }
                }
            }
            if (this._data.skeletonAnimations) {
                for (var i = 0; i < this._data.skeletonAnimations.length; i++) {
                    var skeletonAnimation = this._data.skeletonAnimations[i];
                    var id = Number(skeletonAnimation.id);
                    if (skeletonAnimation) {
                        this._mapConfigParser.skeletonAnimationDict[id] = skeletonAnimation;
                        this._mapConfigParser.calculateSkeletonAnimationTask(skeletonAnimation);
                    }
                }
            }
            if (this._data.mats) {
                for (var i = 0; i < this._data.mats.length; i++) {
                    var matNodeData = this._versionParser.parseMat(this._data.mats[i]);
                    if (matNodeData) {
                        this._mapConfigParser.matDict[matNodeData.id] = matNodeData;
                        this._mapConfigParser.calculateMatTask(matNodeData);
                    }
                }
            }
            if (this._data.nodes) {
                for (var i = 0; i < this._data.nodes.length; i++) {
                    var mapNodeData = this._versionParser.parseNode(this._data.nodes[i]);
                    if (mapNodeData) {
                        this._mapConfigParser.nodeList.push(mapNodeData);
                        this._mapConfigParser.calculateNodeTask(mapNodeData);
                    }
                }
            }
            if (this._data.textures) {
                for (var i = 0; i < this._data.textures.length; i++) {
                    this._versionParser.parseTexture(this._data.textures[i]);
                }
            }
            if (this._data.huds) {
                for (var i = 0; i < this._data.huds.length; i++) {
                    var hudNodeData = this._versionParser.parseHud(this._data.huds[i]);
                    if (hudNodeData) {
                        this._mapConfigParser.hudList.push(hudNodeData);
                        this._mapConfigParser.calculateHudTask(hudNodeData);
                    }
                }
            }
        };
        return UnitJsonParser;
    }(egret3d.UnitParser));
    egret3d.UnitJsonParser = UnitJsonParser;
    __reflect(UnitJsonParser.prototype, "egret3d.UnitJsonParser");
})(egret3d || (egret3d = {}));
