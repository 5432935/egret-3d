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
    * @class egret3d.ParticleRotation
    * @classdesc
    * 粒子旋转效果节点(初始角度，直接加成到了顶点位置上，不会在shader上反映出)
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParticleRotation = (function (_super) {
        __extends(ParticleRotation, _super);
        function ParticleRotation() {
            var _this = _super.call(this) || this;
            _this.name = "ParticleRotation";
            _this.attribute_rotationBirth = new egret3d.GLSL.VarRegister();
            _this.attribute_rotationBirth.name = "attribute_rotationBirth";
            _this.attribute_rotationBirth.size = 1;
            _this.attributes.push(_this.attribute_rotationBirth);
            return _this;
        }
        /**
        * @language zh_CN
        * 填充粒子初始旋转数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleRotation.prototype.initNode = function (data) {
            //##FilterBegin## ##Particle##
            var node = this._node = data;
            this._rotations = new egret3d.ConstRandomValueShape();
            this._rotations.max = node.max;
            this._rotations.min = node.min;
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
        ParticleRotation.prototype.build = function (geometry, count) {
            //##FilterBegin## ##Particle##
            this._animationState = this.state;
            var renderMode = this._animationState.emitter.data.property.renderMode;
            if (renderMode == egret3d.ParticleRenderModeType.StretchedBillboard) {
                //忽略旋转
                return;
            }
            var rotationArray = this._rotations.calculate(count);
            var vertices = geometry.vertexCount / count;
            var index = 0;
            var pos = new egret3d.Vector3();
            var rot;
            var progress = 0;
            var duration = this._animationState.emitter.data.life.duration;
            var timeOffsetIndex = this._animationState.emitter.timeNode.offsetIndex;
            var particleIndex = 0;
            var timeIndex;
            var bornTime;
            for (var i = 0; i < count; ++i) {
                //
                if (this._node.type == egret3d.ParticleValueType.OneBezier || this._node.type == egret3d.ParticleValueType.TwoBezier) {
                    timeIndex = particleIndex * geometry.vertexAttLength + timeOffsetIndex;
                    bornTime = geometry.vertexArray[timeIndex + 0]; //出生时间
                    progress = bornTime / duration;
                    progress = progress - Math.floor(progress); //取小数部分
                    rot = this._node.bezier1.calc(progress);
                    if (this._node.type == egret3d.ParticleValueType.TwoBezier) {
                        var random = Math.random();
                        rot *= random;
                        rot += this._node.bezier2.calc(progress) * (1 - random);
                    }
                }
                else {
                    rot = rotationArray[i];
                }
                for (var j = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_rotationBirth.offsetIndex;
                    geometry.vertexArray[index + 0] = rot;
                }
            }
            //##FilterEnd##
        };
        /**
        * @private
        * 构建结束后需要清理掉临时数据
        */
        ParticleRotation.prototype.afterBuild = function () {
            //##FilterBegin## ##Particle##
            this._rotations.dispose();
            this._rotations = null;
            //##FilterEnd##
        };
        /**
        * @private
        */
        ParticleRotation.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._animationState = null;
            this._node = null;
            this._rotations = null;
        };
        return ParticleRotation;
    }(egret3d.AnimationNode));
    egret3d.ParticleRotation = ParticleRotation;
    __reflect(ParticleRotation.prototype, "egret3d.ParticleRotation");
})(egret3d || (egret3d = {}));
