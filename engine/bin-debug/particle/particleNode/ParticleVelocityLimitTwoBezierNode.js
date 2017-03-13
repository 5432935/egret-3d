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
    * @class egret3d.ParticleVelocityLimitTwoBezierNode
    * @classdesc
    * 粒子速度限制,贝塞尔曲线获得
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParticleVelocityLimitTwoBezierNode = (function (_super) {
        __extends(ParticleVelocityLimitTwoBezierNode, _super);
        //##FilterEnd##
        function ParticleVelocityLimitTwoBezierNode() {
            var _this = _super.call(this) || this;
            //##FilterBegin## ##Particle##
            _this.name = "ParticleVelocityLimitTwoBezierNode";
            _this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_velocityLimitTwoBezier");
            _this.attribute_randomSeed = new egret3d.GLSL.VarRegister();
            _this.attribute_randomSeed.name = "attribute_velocityLimitRandomSeed";
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
        ParticleVelocityLimitTwoBezierNode.prototype.initNode = function (data) {
            //##FilterBegin## ##Particle##
            this._node = data;
            this._floatCompressData = this._node.velocityLimit.bezier1.sampler();
            this._floatCompressData2 = this._node.velocityLimit.bezier2.sampler();
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
        ParticleVelocityLimitTwoBezierNode.prototype.build = function (geometry, count) {
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
        ParticleVelocityLimitTwoBezierNode.prototype.activeState = function (time, animTime, delay, animDelay, usage, geometry, context3DProxy) {
            //##FilterBegin## ##Particle##
            context3DProxy.uniform1fv(usage["uniform_velocityLimit"].uniformIndex, this._floatCompressData);
            context3DProxy.uniform1fv(usage["uniform_velocityLimit2"].uniformIndex, this._floatCompressData2);
            //##FilterEnd##
        };
        /**
        * @private
        */
        ParticleVelocityLimitTwoBezierNode.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._floatCompressData = null;
            this._floatCompressData2 = null;
            this._animationState = null;
            this._node = null;
        };
        return ParticleVelocityLimitTwoBezierNode;
    }(egret3d.AnimationNode));
    egret3d.ParticleVelocityLimitTwoBezierNode = ParticleVelocityLimitTwoBezierNode;
    __reflect(ParticleVelocityLimitTwoBezierNode.prototype, "egret3d.ParticleVelocityLimitTwoBezierNode");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ParticleVelocityLimitTwoBezierNode.js.map