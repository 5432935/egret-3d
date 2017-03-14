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
    * @class egret3d.ParticleVelocityForceTwoBezierNode
    * @classdesc
    * 粒子加速度叠加节点,双贝塞尔曲线获得
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParticleVelocityForceTwoBezierNode = (function (_super) {
        __extends(ParticleVelocityForceTwoBezierNode, _super);
        function ParticleVelocityForceTwoBezierNode() {
            var _this = _super.call(this) || this;
            //##FilterBegin## ##Particle##
            _this.name = "ParticleVelocityForceTwoBezierNode";
            _this.attribute_randomSeed = new egret3d.GLSL.VarRegister();
            _this.attribute_randomSeed.name = "attribute_velocityForceRandomSeed";
            _this.attribute_randomSeed.size = 1;
            _this.attributes.push(_this.attribute_randomSeed);
            return _this;
            //##FilterEnd##
        }
        /**
        * @language zh_CN
        * 填充粒子加速度数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleVelocityForceTwoBezierNode.prototype.initNode = function (data) {
            //##FilterBegin## ##Particle##
            this._node = data;
            this._floatCompressDataX1 = this._node.velocityForce.xBezier1.trySampler();
            this._floatCompressDataY1 = this._node.velocityForce.yBezier1.trySampler();
            this._floatCompressDataZ1 = this._node.velocityForce.zBezier1.trySampler();
            this._floatCompressDataX2 = this._node.velocityForce.xBezier2.trySampler();
            this._floatCompressDataY2 = this._node.velocityForce.yBezier2.trySampler();
            this._floatCompressDataZ2 = this._node.velocityForce.zBezier2.trySampler();
            this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_velocityForceTwoBezier");
            if (this._floatCompressDataX1) {
                this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_velocityForceTwoBezierX1");
            }
            if (this._floatCompressDataX2) {
                this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_velocityForceTwoBezierX2");
            }
            if (this._floatCompressDataY1) {
                this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_velocityForceTwoBezierY1");
            }
            if (this._floatCompressDataY2) {
                this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_velocityForceTwoBezierY2");
            }
            if (this._floatCompressDataZ1) {
                this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_velocityForceTwoBezierZ1");
            }
            if (this._floatCompressDataZ2) {
                this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_velocityForceTwoBezierZ2");
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
        ParticleVelocityForceTwoBezierNode.prototype.build = function (geometry, count) {
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
        ParticleVelocityForceTwoBezierNode.prototype.activeState = function (time, animTime, delay, animDelay, usage, geometry, context3DProxy) {
            //##FilterBegin## ##Particle##
            if (this._floatCompressDataX1) {
                context3DProxy.uniform1fv(usage["uniform_velocityForceX1"].uniformIndex, this._floatCompressDataX1);
            }
            if (this._floatCompressDataX2) {
                context3DProxy.uniform1fv(usage["uniform_velocityForceX2"].uniformIndex, this._floatCompressDataX2);
            }
            if (this._floatCompressDataY1) {
                context3DProxy.uniform1fv(usage["uniform_velocityForceY1"].uniformIndex, this._floatCompressDataY1);
            }
            if (this._floatCompressDataY2) {
                context3DProxy.uniform1fv(usage["uniform_velocityForceY2"].uniformIndex, this._floatCompressDataY2);
            }
            if (this._floatCompressDataZ1) {
                context3DProxy.uniform1fv(usage["uniform_velocityForceZ1"].uniformIndex, this._floatCompressDataZ1);
            }
            if (this._floatCompressDataZ2) {
                context3DProxy.uniform1fv(usage["uniform_velocityForceZ2"].uniformIndex, this._floatCompressDataZ2);
            }
            //##FilterEnd##
        };
        /**
        * @private
        */
        ParticleVelocityForceTwoBezierNode.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._floatCompressDataX1 = this._floatCompressDataY1 = this._floatCompressDataZ1 = null;
            this._floatCompressDataX2 = this._floatCompressDataY2 = this._floatCompressDataZ2 = null;
            this._node = null;
            this._animationState = null;
        };
        return ParticleVelocityForceTwoBezierNode;
    }(egret3d.AnimationNode));
    egret3d.ParticleVelocityForceTwoBezierNode = ParticleVelocityForceTwoBezierNode;
    __reflect(ParticleVelocityForceTwoBezierNode.prototype, "egret3d.ParticleVelocityForceTwoBezierNode");
})(egret3d || (egret3d = {}));
