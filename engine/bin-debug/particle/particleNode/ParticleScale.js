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
    * @class egret3d.ParticleScale
    * @classdesc
    * 粒子初始化的尺寸大小
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParticleScale = (function (_super) {
        __extends(ParticleScale, _super);
        /*
        *@private
        */
        function ParticleScale() {
            var _this = _super.call(this) || this;
            _this.name = "ParticleScale";
            return _this;
        }
        /**
        * @language zh_CN
        * 填充粒子尺寸缩放数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleScale.prototype.initNode = function (data) {
            //##FilterBegin## ##Particle##
            var node = this._node = data;
            this._scaleValue = new egret3d.ConstRandomValueShape();
            this._scaleValue.max = node.max;
            this._scaleValue.min = node.min;
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
        ParticleScale.prototype.build = function (geometry, count) {
            //##FilterBegin## ##Particle##
            this._animationState = this.state;
            var scaleArray = this._scaleValue.calculate(count);
            var vertices = geometry.vertexCount / count;
            var index = 0;
            var progress = 0;
            var duration = this._animationState.emitter.data.life.duration;
            var timeOffsetIndex = this._animationState.emitter.timeNode.offsetIndex;
            var particleIndex = 0;
            var timeIndex;
            var bornTime;
            var scale = 0;
            for (var i = 0; i < count; ++i) {
                //
                if (this._node.type == egret3d.ParticleValueType.OneBezier || this._node.type == egret3d.ParticleValueType.TwoBezier) {
                    timeIndex = particleIndex * geometry.vertexAttLength + timeOffsetIndex;
                    bornTime = geometry.vertexArray[timeIndex + 0]; //出生时间
                    progress = bornTime / duration;
                    progress = progress - Math.floor(progress); //取小数部分
                    scale = this._node.bezier1.calc(progress);
                    if (this._node.type == egret3d.ParticleValueType.TwoBezier) {
                        var random = Math.random();
                        scale *= random;
                        scale += this._node.bezier2.calc(progress) * (1 - random);
                    }
                    scaleArray[i] = scale;
                }
                else {
                    scale = scaleArray[i];
                }
            }
            this._animationState.scaleBirthArray = scaleArray;
            //##FilterEnd##
        };
        /**
        * @private
        * 构建结束后需要清理掉临时数据
        */
        ParticleScale.prototype.afterBuild = function () {
            //##FilterBegin## ##Particle##
            this._scaleValue.dispose();
            this._scaleValue = null;
            //##FilterEnd##
        };
        /**
        * @private
        */
        ParticleScale.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._animationState = null;
            this._node = null;
            this._scaleValue = null;
        };
        return ParticleScale;
    }(egret3d.AnimationNode));
    egret3d.ParticleScale = ParticleScale;
    __reflect(ParticleScale.prototype, "egret3d.ParticleScale");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ParticleScale.js.map