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
    * @class egret3d.ParticleVelocityLimitOneBezierNode
    * @classdesc
    * 粒子速度限制,贝塞尔曲线获得
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParticleVelocityLimitOneBezierNode = (function (_super) {
        __extends(ParticleVelocityLimitOneBezierNode, _super);
        function ParticleVelocityLimitOneBezierNode() {
            var _this = _super.call(this) || this;
            //##FilterBegin## ##Particle##
            _this.name = "ParticleVelocityLimitOneBezierNode";
            _this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_velocityLimitOneBezier");
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
        ParticleVelocityLimitOneBezierNode.prototype.initNode = function (data) {
            //##FilterBegin## ##Particle##
            this._node = data;
            this._floatCompressData = this._node.velocityLimit.bezier1.sampler();
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
        ParticleVelocityLimitOneBezierNode.prototype.build = function (geometry, count) {
        };
        /**
        * @private
        */
        ParticleVelocityLimitOneBezierNode.prototype.activeState = function (time, animTime, delay, animDelay, usage, geometry, context3DProxy) {
            //##FilterBegin## ##Particle##
            context3DProxy.uniform1fv(usage["uniform_velocityLimit"].uniformIndex, this._floatCompressData);
            //##FilterEnd##
        };
        /**
        * @private
        */
        ParticleVelocityLimitOneBezierNode.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._floatCompressData = null;
            this._node = null;
        };
        return ParticleVelocityLimitOneBezierNode;
    }(egret3d.AnimationNode));
    egret3d.ParticleVelocityLimitOneBezierNode = ParticleVelocityLimitOneBezierNode;
    __reflect(ParticleVelocityLimitOneBezierNode.prototype, "egret3d.ParticleVelocityLimitOneBezierNode");
})(egret3d || (egret3d = {}));
