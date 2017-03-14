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
    * @class egret3d.ParticleVelocityOverConstNode
    * @classdesc
    * 粒子速度节点叠加(常量的影响方式)
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParticleVelocityOverConstNode = (function (_super) {
        __extends(ParticleVelocityOverConstNode, _super);
        function ParticleVelocityOverConstNode() {
            var _this = _super.call(this) || this;
            //##FilterBegin## ##Particle##
            _this.name = "ParticleVelocityOverConstNode";
            _this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_velocityOverConst");
            _this.attribute_velocityOver = new egret3d.GLSL.VarRegister();
            _this.attribute_velocityOver.name = "attribute_velocityOverConst";
            _this.attribute_velocityOver.size = 3;
            _this.attributes.push(_this.attribute_velocityOver);
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
        ParticleVelocityOverConstNode.prototype.initNode = function (data) {
            //##FilterBegin## ##Particle##
            var node = data;
            this._overValue = new egret3d.Vec3ConstRandomValueShape();
            this._overValue.maxX = node.velocityOver.max.x;
            this._overValue.maxY = node.velocityOver.max.y;
            this._overValue.maxZ = node.velocityOver.max.z;
            this._overValue.minX = node.velocityOver.min.x;
            this._overValue.minY = node.velocityOver.min.y;
            this._overValue.minZ = node.velocityOver.min.z;
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
        ParticleVelocityOverConstNode.prototype.build = function (geometry, count) {
            //##FilterBegin## ##Particle##
            this._animationState = this.state;
            var vertices = geometry.vertexCount / count;
            var index = 0;
            var data = this._overValue.calculate(count);
            for (var i = 0; i < count; ++i) {
                var over = data[i];
                for (var j = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_velocityOver.offsetIndex;
                    geometry.vertexArray[index + 0] = over.x;
                    geometry.vertexArray[index + 1] = over.y;
                    geometry.vertexArray[index + 2] = over.z;
                }
            }
            //##FilterEnd##
        };
        /**
        * @private
        * 构建结束后需要清理掉临时数据
        */
        ParticleVelocityOverConstNode.prototype.afterBuild = function () {
            //##FilterBegin## ##Particle##
            this._overValue.dispose();
            this._overValue = null;
            //##FilterEnd##
        };
        /**
        * @private
        */
        ParticleVelocityOverConstNode.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._overValue = null;
            this._animationState = null;
        };
        return ParticleVelocityOverConstNode;
    }(egret3d.AnimationNode));
    egret3d.ParticleVelocityOverConstNode = ParticleVelocityOverConstNode;
    __reflect(ParticleVelocityOverConstNode.prototype, "egret3d.ParticleVelocityOverConstNode");
})(egret3d || (egret3d = {}));
