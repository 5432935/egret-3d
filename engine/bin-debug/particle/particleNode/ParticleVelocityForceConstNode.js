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
    * @class egret3d.ParticleVelocityForceConstNode(常量部分)
    * @classdesc
    * 粒子加速度效果节点
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParticleVelocityForceConstNode = (function (_super) {
        __extends(ParticleVelocityForceConstNode, _super);
        function ParticleVelocityForceConstNode() {
            var _this = _super.call(this) || this;
            //##FilterBegin## ##Particle##
            _this.name = "ParticleVelocityForceConstNode";
            _this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_velocityForceConst");
            _this.attribute_accelerationSpeed = new egret3d.GLSL.VarRegister();
            _this.attribute_accelerationSpeed.name = "attribute_velocityForceConst";
            _this.attribute_accelerationSpeed.size = 3;
            _this.attributes.push(_this.attribute_accelerationSpeed);
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
        ParticleVelocityForceConstNode.prototype.initNode = function (data) {
            //##FilterBegin## ##Particle##
            this._node = data;
            var node = this._node.velocityForce;
            this._forceValue = new egret3d.Vec3ConstRandomValueShape();
            this._forceValue.maxX = node.max.x;
            this._forceValue.maxY = node.max.y;
            this._forceValue.maxZ = node.max.z;
            this._forceValue.minX = node.min.x;
            this._forceValue.minY = node.min.y;
            this._forceValue.minZ = node.min.z;
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
        ParticleVelocityForceConstNode.prototype.build = function (geometry, count) {
            //##FilterBegin## ##Particle##
            var vertices = geometry.vertexCount / count;
            var index = 0;
            var data = this._forceValue.calculate(count);
            for (var i = 0; i < count; ++i) {
                var accSpeed = data[i];
                for (var j = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_accelerationSpeed.offsetIndex;
                    geometry.vertexArray[index + 0] = accSpeed.x;
                    geometry.vertexArray[index + 1] = accSpeed.y;
                    geometry.vertexArray[index + 2] = accSpeed.z;
                }
            }
            //##FilterEnd##
        };
        /**
        * @private
        * 构建结束后需要清理掉临时数据
        */
        ParticleVelocityForceConstNode.prototype.afterBuild = function () {
            //##FilterBegin## ##Particle##
            this._forceValue.dispose();
            this._forceValue = null;
            //##FilterEnd##
        };
        /**
        * @private
        */
        ParticleVelocityForceConstNode.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._forceValue = null;
            this._node = null;
        };
        return ParticleVelocityForceConstNode;
    }(egret3d.AnimationNode));
    egret3d.ParticleVelocityForceConstNode = ParticleVelocityForceConstNode;
    __reflect(ParticleVelocityForceConstNode.prototype, "egret3d.ParticleVelocityForceConstNode");
})(egret3d || (egret3d = {}));
