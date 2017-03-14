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
    * @class egret3d.ParticleTextureSheetNode
    * @classdesc
    * uv序列帧
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParticleTextureSheetNode = (function (_super) {
        __extends(ParticleTextureSheetNode, _super);
        function ParticleTextureSheetNode() {
            var _this = _super.call(this) || this;
            _this._sheetFloatData = new Float32Array(5);
            //##FilterBegin## ##Particle##
            _this.name = "ParticleTextureSheetNode";
            //
            _this.attribute_textureSheetData = new egret3d.GLSL.VarRegister();
            _this.attribute_textureSheetData.name = "attribute_textureSheetData";
            _this.attribute_textureSheetData.size = 3;
            _this.attributes.push(_this.attribute_textureSheetData);
            _this.importShader(true, egret3d.ShaderPhaseType.local_vertex, "particle_textureSheet_vs");
            return _this;
            //##FilterEnd##
        }
        /**
        * @language zh_CN
        * 填充UV滚动
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleTextureSheetNode.prototype.initNode = function (data, args) {
            //##FilterBegin## ##Particle##
            this._sheetData = args;
            this._sheetFloatData[0] = this._sheetData.tileX;
            this._sheetFloatData[1] = this._sheetData.tileY;
            this._sheetFloatData[2] = this._sheetData.circles;
            if (this._sheetData.whole) {
                this._sheetFloatData[3] = 0;
                this._sheetFloatData[4] = this._sheetData.tileX * this._sheetData.tileY - 1;
            }
            else {
                this._sheetFloatData[3] = 0;
                this._sheetFloatData[4] = this._sheetData.tileY - 1;
            }
            if (this._sheetData.frameType == egret3d.ParticleValueType.Const || this._sheetData.frameType == egret3d.ParticleValueType.RandomConst) {
                this.importShader(false, egret3d.ShaderPhaseType.start_fragment, "particle_textureSheetConst");
            }
            else if (this._sheetData.frameType == egret3d.ParticleValueType.OneBezier) {
                this.importShader(false, egret3d.ShaderPhaseType.start_fragment, "particle_textureSheetOneBezier");
                this._floatCompressData1 = this._sheetData.bezier1.sampler();
            }
            else if (this._sheetData.frameType == egret3d.ParticleValueType.TwoBezier) {
                this.importShader(false, egret3d.ShaderPhaseType.start_fragment, "particle_textureSheetTwoBezier");
                this._floatCompressData1 = this._sheetData.bezier1.sampler();
                this._floatCompressData2 = this._sheetData.bezier2.sampler();
            }
            //##FilterEnd##
        };
        /**
        * @language zh_CN
        * 填充顶点数据
        * @param geometry 网格数据
        * @param count 粒子数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleTextureSheetNode.prototype.build = function (geometry, count) {
            //##FilterBegin## ##Particle##
            var frameStart = 0;
            var frameConst = 0;
            var randomSeed = 0;
            //将frameStart放入到顶点数据中
            var index = 0;
            var vertices = geometry.vertexCount / count;
            for (var i = 0; i < count; ++i) {
                //frameStart
                if (this._sheetData.whole) {
                    frameStart = 0;
                }
                else {
                    if (this._sheetData.randomRow) {
                        frameStart = Math.floor(this._sheetData.tileY * Math.random()) * this._sheetData.tileX;
                    }
                    else {
                        frameStart = this._sheetData.row * this._sheetData.tileX;
                    }
                }
                //frame const
                if (this._sheetData.frameType == egret3d.ParticleValueType.Const || this._sheetData.frameType == egret3d.ParticleValueType.RandomConst) {
                    frameConst = (this._sheetData.max - this._sheetData.min) * Math.random() + this._sheetData.min;
                    frameConst = Math.floor(frameConst);
                }
                else {
                    frameConst = 0;
                }
                //
                if (this._sheetData.frameType == egret3d.ParticleValueType.TwoBezier) {
                    randomSeed = Math.random();
                }
                else {
                    randomSeed = 1;
                }
                for (var j = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_textureSheetData.offsetIndex;
                    geometry.vertexArray[index + 0] = frameStart + 0.001; //修复抖动的问题
                    geometry.vertexArray[index + 1] = frameConst;
                    geometry.vertexArray[index + 2] = randomSeed;
                }
            }
            //##FilterEnd##
        };
        /**
        * @private
        */
        ParticleTextureSheetNode.prototype.activeState = function (time, animTime, delay, animDelay, usage, geometry, context3DProxy) {
            //##FilterBegin## ##Particle##
            context3DProxy.uniform1fv(usage["uniform_textureSheet"].uniformIndex, this._sheetFloatData);
            if (this._sheetData.frameType == egret3d.ParticleValueType.OneBezier) {
                context3DProxy.uniform1fv(usage["uniform_frameBezier"].uniformIndex, this._floatCompressData1);
            }
            else if (this._sheetData.frameType == egret3d.ParticleValueType.TwoBezier) {
                context3DProxy.uniform1fv(usage["uniform_frameBezier1"].uniformIndex, this._floatCompressData1);
                context3DProxy.uniform1fv(usage["uniform_frameBezier2"].uniformIndex, this._floatCompressData2);
            }
            //##FilterEnd##
        };
        /**
        * @private
        */
        ParticleTextureSheetNode.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._animationState = null;
            this._floatCompressData1 = this._floatCompressData2 = null;
            this._sheetData = null;
            this._sheetFloatData = null;
        };
        return ParticleTextureSheetNode;
    }(egret3d.AnimationNode));
    egret3d.ParticleTextureSheetNode = ParticleTextureSheetNode;
    __reflect(ParticleTextureSheetNode.prototype, "egret3d.ParticleTextureSheetNode");
})(egret3d || (egret3d = {}));
