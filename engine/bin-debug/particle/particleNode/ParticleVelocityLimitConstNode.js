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
    * @class egret3d.ParticleVelocityLimitConstNode
    * @classdesc
    * 粒子速度节点限制(常量的影响方式)
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParticleVelocityLimitConstNode = (function (_super) {
        __extends(ParticleVelocityLimitConstNode, _super);
        function ParticleVelocityLimitConstNode() {
            var _this = _super.call(this) || this;
            //##FilterBegin## ##Particle##
            _this.name = "ParticleVelocityLimitConstNode";
            _this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_velocityLimitConst");
            _this.attribute_velocityLimit = new egret3d.GLSL.VarRegister();
            _this.attribute_velocityLimit.name = "attribute_velocityLimit";
            _this.attribute_velocityLimit.size = 1;
            _this.attributes.push(_this.attribute_velocityLimit);
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
        ParticleVelocityLimitConstNode.prototype.initNode = function (data) {
            //##FilterBegin## ##Particle##
            var node = data;
            this._limitValue = new egret3d.ConstRandomValueShape();
            this._limitValue.max = node.velocityLimit.max;
            this._limitValue.min = node.velocityLimit.min;
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
        ParticleVelocityLimitConstNode.prototype.build = function (geometry, count) {
            //##FilterBegin## ##Particle##
            this._animationState = this.state;
            var vertices = geometry.vertexCount / count;
            var index = 0;
            var data = this._limitValue.calculate(count);
            for (var i = 0; i < count; ++i) {
                var limit = data[i];
                for (var j = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_velocityLimit.offsetIndex;
                    geometry.vertexArray[index + 0] = limit;
                }
            }
            //##FilterEnd##
        };
        /**
        * @private
        * 构建结束后需要清理掉临时数据
        */
        ParticleVelocityLimitConstNode.prototype.afterBuild = function () {
            //##FilterBegin## ##Particle##
            this._limitValue.dispose();
            this._limitValue = null;
            //##FilterEnd##
        };
        /**
        * @private
        */
        ParticleVelocityLimitConstNode.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._animationState = null;
            this._limitValue = null;
        };
        return ParticleVelocityLimitConstNode;
    }(egret3d.AnimationNode));
    egret3d.ParticleVelocityLimitConstNode = ParticleVelocityLimitConstNode;
    __reflect(ParticleVelocityLimitConstNode.prototype, "egret3d.ParticleVelocityLimitConstNode");
})(egret3d || (egret3d = {}));
