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
    * @class egret3d.ParticleVelocityNode
    * @classdesc
    * 粒子速度节点(根据粒子的出生相对位置，以及是否随机方向获得一个三维向量)
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParticleVelocityNode = (function (_super) {
        __extends(ParticleVelocityNode, _super);
        //##FilterEnd##
        function ParticleVelocityNode() {
            var _this = _super.call(this) || this;
            //##FilterBegin## ##Particle##
            _this.name = "ParticleVelocityNode";
            _this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_velocity");
            _this.attribute_velocity = new egret3d.GLSL.VarRegister();
            _this.attribute_velocity.name = "attribute_velocity";
            _this.attribute_velocity.size = 3;
            _this.attributes.push(_this.attribute_velocity);
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
        ParticleVelocityNode.prototype.initNode = function (data) {
            //##FilterBegin## ##Particle##
            var node = this._node = data;
            if (node.type == egret3d.ParticleValueType.Const || node.type == egret3d.ParticleValueType.RandomConst) {
                this._constValue = new egret3d.ConstRandomValueShape();
                this._constValue.max = node.max;
                this._constValue.min = node.min;
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
        ParticleVelocityNode.prototype.build = function (geometry, count) {
            //##FilterBegin## ##Particle##
            this._animationState = this.state;
            var vertices = geometry.vertexCount / count;
            var index = 0;
            var constList;
            if (this._constValue)
                constList = this._constValue.calculate(count);
            var directionVector = this._animationState.directionArray;
            var direction = new egret3d.Vector3();
            //
            var progress = 0;
            var duration = this._animationState.emitter.data.life.duration;
            var timeOffsetIndex = this._animationState.emitter.timeNode.offsetIndex;
            var particleIndex = 0;
            var timeIndex;
            var bornTime;
            var speed;
            for (var i = 0; i < count; ++i) {
                particleIndex = i * vertices;
                //
                if (this._node.type == egret3d.ParticleValueType.OneBezier || this._node.type == egret3d.ParticleValueType.TwoBezier) {
                    timeIndex = particleIndex * geometry.vertexAttLength + timeOffsetIndex;
                    bornTime = geometry.vertexArray[timeIndex + 0]; //出生时间
                    progress = bornTime / duration;
                    progress = progress - Math.floor(progress); //取小数部分
                    speed = this._node.bezier1.calc(progress);
                    if (this._node.type == egret3d.ParticleValueType.TwoBezier) {
                        var random = Math.random();
                        speed *= random;
                        speed += this._node.bezier2.calc(progress) * (1 - random);
                    }
                }
                else {
                    speed = constList[i];
                }
                direction.copyFrom(directionVector[i]);
                direction.scaleBy(speed);
                for (var j = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_velocity.offsetIndex;
                    geometry.vertexArray[index + 0] = direction.x;
                    geometry.vertexArray[index + 1] = direction.y;
                    geometry.vertexArray[index + 2] = direction.z;
                }
            }
            //##FilterEnd##
        };
        /**
        * @private
        * 构建结束后需要清理掉临时数据
        */
        ParticleVelocityNode.prototype.afterBuild = function () {
            //##FilterBegin## ##Particle##
            this._constValue && this._constValue.dispose();
            this._constValue = null;
            //##FilterEnd##
        };
        /**
        * @private
        */
        ParticleVelocityNode.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._constValue = null;
            this._animationState = null;
            this._node = null;
        };
        return ParticleVelocityNode;
    }(egret3d.AnimationNode));
    egret3d.ParticleVelocityNode = ParticleVelocityNode;
    __reflect(ParticleVelocityNode.prototype, "egret3d.ParticleVelocityNode");
})(egret3d || (egret3d = {}));
