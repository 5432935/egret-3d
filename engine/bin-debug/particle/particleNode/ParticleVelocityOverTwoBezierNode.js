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
    * @class egret3d.ParticleVelocityOverTwoBezierNode
    * @classdesc
    * 粒子速度叠加节点,双贝塞尔曲线获得
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParticleVelocityOverTwoBezierNode = (function (_super) {
        __extends(ParticleVelocityOverTwoBezierNode, _super);
        function ParticleVelocityOverTwoBezierNode() {
            var _this = _super.call(this) || this;
            //##FilterBegin## ##Particle##
            _this.name = "ParticleVelocityOverTwoBezierNode";
            _this.attribute_randomSeed = new egret3d.GLSL.VarRegister();
            _this.attribute_randomSeed.name = "attribute_velocityOverRandomSeed";
            _this.attribute_randomSeed.size = 1;
            _this.attributes.push(_this.attribute_randomSeed);
            return _this;
            //##FilterEnd##
        }
        /**
        * @language zh_CN
        * 填充粒子移动速度数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleVelocityOverTwoBezierNode.prototype.initNode = function (data) {
            //##FilterBegin## ##Particle##
            this._node = data;
            this._floatCompressDataX1 = this._node.velocityOver.xBezier1.trySampler();
            this._floatCompressDataY1 = this._node.velocityOver.yBezier1.trySampler();
            this._floatCompressDataZ1 = this._node.velocityOver.zBezier1.trySampler();
            this._floatCompressDataX2 = this._node.velocityOver.xBezier2.trySampler();
            this._floatCompressDataY2 = this._node.velocityOver.yBezier2.trySampler();
            this._floatCompressDataZ2 = this._node.velocityOver.zBezier2.trySampler();
            this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_velocityOverTwoBezier");
            if (this._floatCompressDataX1) {
                this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_velocityOverTwoBezierX1");
            }
            if (this._floatCompressDataX2) {
                this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_velocityOverTwoBezierX2");
            }
            if (this._floatCompressDataY1) {
                this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_velocityOverTwoBezierY1");
            }
            if (this._floatCompressDataY2) {
                this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_velocityOverTwoBezierY2");
            }
            if (this._floatCompressDataZ1) {
                this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_velocityOverTwoBezierZ1");
            }
            if (this._floatCompressDataZ2) {
                this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_velocityOverTwoBezierZ2");
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
        ParticleVelocityOverTwoBezierNode.prototype.build = function (geometry, count) {
            //##FilterBegin## ##Particle##
            this._animationState = this.state;
            var vertices = geometry.vertexCount / count;
            var index = 0;
            for (var i = 0; i < count; ++i) {
                var random = Math.random();
                for (var j = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_randomSeed.offsetIndex;
                    geometry.vertexArray[index + 0] = random;
                }
            }
            //##FilterEnd##
        };
        /**
        * @private
        */
        ParticleVelocityOverTwoBezierNode.prototype.activeState = function (time, animTime, delay, animDelay, usage, geometry, context3DProxy) {
            //##FilterBegin## ##Particle##
            if (this._floatCompressDataX1) {
                context3DProxy.uniform1fv(usage["uniform_velocityOverX1"].uniformIndex, this._floatCompressDataX1);
            }
            if (this._floatCompressDataX2) {
                context3DProxy.uniform1fv(usage["uniform_velocityOverX2"].uniformIndex, this._floatCompressDataX2);
            }
            if (this._floatCompressDataY1) {
                context3DProxy.uniform1fv(usage["uniform_velocityOverY1"].uniformIndex, this._floatCompressDataY1);
            }
            if (this._floatCompressDataY2) {
                context3DProxy.uniform1fv(usage["uniform_velocityOverY2"].uniformIndex, this._floatCompressDataY2);
            }
            if (this._floatCompressDataZ1) {
                context3DProxy.uniform1fv(usage["uniform_velocityOverZ1"].uniformIndex, this._floatCompressDataZ1);
            }
            if (this._floatCompressDataZ2) {
                context3DProxy.uniform1fv(usage["uniform_velocityOverZ2"].uniformIndex, this._floatCompressDataZ2);
            }
            //##FilterEnd##
        };
        /**
        * @private
        */
        ParticleVelocityOverTwoBezierNode.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._floatCompressDataX1 = this._floatCompressDataY1 = this._floatCompressDataZ1 = null;
            this._floatCompressDataX2 = this._floatCompressDataY2 = this._floatCompressDataZ2 = null;
            this._node = null;
            this._animationState = null;
        };
        return ParticleVelocityOverTwoBezierNode;
    }(egret3d.AnimationNode));
    egret3d.ParticleVelocityOverTwoBezierNode = ParticleVelocityOverTwoBezierNode;
    __reflect(ParticleVelocityOverTwoBezierNode.prototype, "egret3d.ParticleVelocityOverTwoBezierNode");
})(egret3d || (egret3d = {}));
