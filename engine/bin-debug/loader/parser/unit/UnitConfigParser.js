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
    var UnitConfigParser = (function (_super) {
        __extends(UnitConfigParser, _super);
        function UnitConfigParser(data, type, fileType) {
            var _this = _super.call(this, fileType) || this;
            /**
             * @language zh_CN
             * 节点列表
             * @version Egret 3.0
             * @platform Web,Native
             */
            _this.nodeList = new Array();
            _this.hudList = new Array();
            _this.auto = false;
            _this.loop = false;
            _this.matDict = {};
            _this.lightDict = {};
            _this.skeletonAnimationDict = {};
            _this.proAnimationDict = {};
            _this.directLight = false;
            _this.pointLight = false;
            _this.textures = [];
            egret3d.UnitParserUtils.mapParser(type, data, _this);
            return _this;
        }
        UnitConfigParser.prototype.calculateTask = function () {
            if (this.uv2) {
                this.taskDict[this.uv2] = 0;
            }
        };
        UnitConfigParser.prototype.calculateProAnimationTask = function (data) {
            for (var i = 0; i < data.clips; ++i) {
                var clip = data.clips[i];
                if (clip.path) {
                    this.taskDict[data.path] = 0;
                }
            }
        };
        UnitConfigParser.prototype.calculateSkeletonAnimationTask = function (data) {
            for (var i = 0; i < data.clips; ++i) {
                var clip = data.clips[i];
                if (clip.path) {
                    this.taskDict[data.path] = 0;
                }
            }
        };
        UnitConfigParser.prototype.calculateMatTask = function (data) {
            if (data.diffuseTextureName != "") {
                this.taskDict[data.diffuseTextureName] = 0;
            }
            if (data.normalTextureName != "") {
                this.taskDict[data.normalTextureName] = 0;
            }
            if (data.specularTextureName != "") {
                this.taskDict[data.specularTextureName] = 0;
            }
            for (var i = 0; i < data.methods.length; ++i) {
                var methodData = data.methods[i];
                for (var j = 0; j < methodData.texturesData.length; ++j) {
                    var texData = methodData.texturesData[j];
                    if (texData.path) {
                        this.taskDict[texData.path] = 0;
                    }
                }
            }
        };
        UnitConfigParser.prototype.calculateNodeTask = function (data) {
            if (data.path) {
                this.taskDict[data.path] = 0;
            }
            for (var j = 0; j < data.skinClips.length; j++) {
                var eamData = data.skinClips[j];
                if (eamData.path) {
                    this.taskDict[eamData.path] = 0;
                }
            }
            for (var j = 0; j < data.propertyAnims.length; ++j) {
                var propertyAnimsData = data.propertyAnims[j];
                if (propertyAnimsData.path) {
                    this.taskDict[propertyAnimsData.path] = 0;
                }
            }
            for (var j = 0; j < data.grass.length; ++j) {
                var grassData = data.grass[j];
                if (grassData.detailTexture) {
                    this.taskDict[grassData.detailTexture] = 0;
                }
                if (grassData.grassTexture) {
                    this.taskDict[grassData.detailTexture] = 0;
                }
            }
        };
        UnitConfigParser.prototype.calculateHudTask = function (data) {
            if (data.texture) {
                this.taskDict[data.texture] = 0;
            }
        };
        UnitConfigParser.prototype.calculateTextureTask = function (data) {
            if (data.path) {
                this.taskDict[data.path] = 0;
            }
        };
        return UnitConfigParser;
    }(egret3d.IConfigParser));
    egret3d.UnitConfigParser = UnitConfigParser;
    __reflect(UnitConfigParser.prototype, "egret3d.UnitConfigParser");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=UnitConfigParser.js.map