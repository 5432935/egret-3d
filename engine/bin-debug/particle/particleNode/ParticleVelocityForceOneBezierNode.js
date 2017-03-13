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
    * @class egret3d.ParticleVelocityForceOneBezierNode
    * @classdesc
    * 粒子加速度叠加节点,贝塞尔曲线获得
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParticleVelocityForceOneBezierNode = (function (_super) {
        __extends(ParticleVelocityForceOneBezierNode, _super);
        function ParticleVelocityForceOneBezierNode() {
            var _this = _super.call(this) || this;
            _this.name = "ParticleVelocityForceOneBezierNode";
            return _this;
        }
        /**
        * @language zh_CN
        * 填充粒子加速度数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleVelocityForceOneBezierNode.prototype.initNode = function (data) {
            //##FilterBegin## ##Particle##
            this._node = data;
            this._floatCompressDataX = this._node.velocityForce.xBezier1.trySampler();
            this._floatCompressDataY = this._node.velocityForce.yBezier1.trySampler();
            this._floatCompressDataZ = this._node.velocityForce.zBezier1.trySampler();
            this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_velocityForceOneBezier");
            if (this._floatCompressDataX) {
                this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_velocityForceOneBezierX");
            }
            if (this._floatCompressDataY) {
                this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_velocityForceOneBezierY");
            }
            if (this._floatCompressDataZ) {
                this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_velocityForceOneBezierZ");
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
        ParticleVelocityForceOneBezierNode.prototype.build = function (geometry, count) {
        };
        /**
        * @private
        */
        ParticleVelocityForceOneBezierNode.prototype.activeState = function (time, animTime, delay, animDelay, usage, geometry, context3DProxy) {
            //##FilterBegin## ##Particle##
            if (this._floatCompressDataX) {
                context3DProxy.uniform1fv(usage["uniform_velocityForceX"].uniformIndex, this._floatCompressDataX);
            }
            if (this._floatCompressDataY) {
                context3DProxy.uniform1fv(usage["uniform_velocityForceY"].uniformIndex, this._floatCompressDataY);
            }
            if (this._floatCompressDataZ) {
                context3DProxy.uniform1fv(usage["uniform_velocityForceZ"].uniformIndex, this._floatCompressDataZ);
            }
            //##FilterEnd##
        };
        /**
        * @private
        */
        ParticleVelocityForceOneBezierNode.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._floatCompressDataX = this._floatCompressDataY = this._floatCompressDataZ = null;
            this._node = null;
        };
        return ParticleVelocityForceOneBezierNode;
    }(egret3d.AnimationNode));
    egret3d.ParticleVelocityForceOneBezierNode = ParticleVelocityForceOneBezierNode;
    __reflect(ParticleVelocityForceOneBezierNode.prototype, "egret3d.ParticleVelocityForceOneBezierNode");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ParticleVelocityForceOneBezierNode.js.map