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
    * @class egret3d.ParticleSizeGlobalNode
    * @classdesc
    * 粒子缩放变化
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParticleSizeGlobalNode = (function (_super) {
        __extends(ParticleSizeGlobalNode, _super);
        function ParticleSizeGlobalNode() {
            var _this = _super.call(this) || this;
            //##FilterBegin## ##Particle##
            _this.name = "ParticleSizeGlobalNode";
            return _this;
            //##FilterEnd##
        }
        /**
        * @language zh_CN
        * 填充粒子初始缩放数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleSizeGlobalNode.prototype.initNode = function (data) {
            //##FilterBegin## ##Particle##
            this._node = data;
            //由于初始缩放也要在这里输入，所以为必备的一个元素
            this.attribute_scaleSizeConst = new egret3d.GLSL.VarRegister();
            this.attribute_scaleSizeConst.name = "attribute_scaleSizeConst";
            this.attribute_scaleSizeConst.size = 1;
            this.attributes.push(this.attribute_scaleSizeConst);
            this.importShader(true, egret3d.ShaderPhaseType.local_vertex, "particle_scaleSizeConst");
            if (this._node) {
                this._sizeScale = new egret3d.ConstRandomValueShape();
                this._sizeScale.max = this._node.max;
                this._sizeScale.min = this._node.min;
                if (this._node.type == egret3d.ParticleValueType.OneBezier) {
                    this._floatCompressData1 = this._node.bezier1.sampler();
                    this.importShader(true, egret3d.ShaderPhaseType.local_vertex, "particle_scaleSizeBezier1");
                }
                else if (this._node.type == egret3d.ParticleValueType.TwoBezier) {
                    this.importShader(true, egret3d.ShaderPhaseType.local_vertex, "particle_scaleSizeBezier2");
                    this._floatCompressData2 = this._node.bezier1.sampler();
                    this._floatCompressData2 = this._node.bezier2.sampler();
                    this.attribute_bezierRandomSeed = new egret3d.GLSL.VarRegister();
                    this.attribute_bezierRandomSeed.name = "attribute_bezierRandomSeed";
                    this.attribute_bezierRandomSeed.size = 1;
                    this.attributes.push(this.attribute_bezierRandomSeed);
                }
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
        ParticleSizeGlobalNode.prototype.build = function (geometry, count) {
            //##FilterBegin## ##Particle##
            var pState = this.state;
            this._scaleResult = pState.scaleBirthArray;
            //
            var index = 0;
            var vertices = geometry.vertexCount / count;
            if (this._node) {
                if (this._node.type == egret3d.ParticleValueType.TwoBezier) {
                    for (var i = 0; i < count; ++i) {
                        var random = Math.random();
                        for (var j = 0; j < vertices; ++j) {
                            index = i * vertices + j;
                            index = index * geometry.vertexAttLength + this.attribute_bezierRandomSeed.offsetIndex;
                            geometry.vertexArray[index + 0] = random;
                        }
                    }
                }
                if (this._node.type == egret3d.ParticleValueType.Const || this._node.type == egret3d.ParticleValueType.RandomConst) {
                    var data = this._sizeScale.calculate(count);
                    for (var i = 0; i < count; i++) {
                        this._scaleResult[i] *= data[i];
                    }
                }
            }
            for (var i = 0; i < count; ++i) {
                for (var j = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_scaleSizeConst.offsetIndex;
                    geometry.vertexArray[index + 0] = this._scaleResult[i];
                }
            }
            //##FilterEnd##
        };
        /**
        * @private
        */
        ParticleSizeGlobalNode.prototype.activeState = function (time, animTime, delay, animDelay, usage, geometry, context3DProxy) {
            //##FilterBegin## ##Particle##
            if (this._floatCompressData1) {
                context3DProxy.uniform1fv(usage["uniform_scaleSizeBezier1"].uniformIndex, this._floatCompressData1);
            }
            if (this._floatCompressData2) {
                context3DProxy.uniform1fv(usage["uniform_scaleSizeBezier2"].uniformIndex, this._floatCompressData2);
            }
            //##FilterEnd##
        };
        /**
        * @private
        */
        ParticleSizeGlobalNode.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._floatCompressData1 = null;
            this._floatCompressData2 = null;
            this._node = null;
        };
        return ParticleSizeGlobalNode;
    }(egret3d.AnimationNode));
    egret3d.ParticleSizeGlobalNode = ParticleSizeGlobalNode;
    __reflect(ParticleSizeGlobalNode.prototype, "egret3d.ParticleSizeGlobalNode");
})(egret3d || (egret3d = {}));
