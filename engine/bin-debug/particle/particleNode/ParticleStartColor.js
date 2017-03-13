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
    * @class egret3d.ParticleStartColor
    * @classdesc
    * 粒子起始颜色，用顶点色实现
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParticleStartColor = (function (_super) {
        __extends(ParticleStartColor, _super);
        function ParticleStartColor() {
            var _this = _super.call(this) || this;
            _this.bornTime = 0;
            _this.life = 0;
            _this.id = 0;
            _this.timeIndex = 0;
            _this.name = "ParticleStartColor";
            return _this;
        }
        /**
        * @language zh_CN
        * 填充粒子发射器起始颜色
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleStartColor.prototype.initNode = function (data) {
            this._node = data;
        };
        /**
        * @language zh_CN
        * 填充顶点数据
        * @param geometry 网格数据
        * @param count 粒子数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleStartColor.prototype.build = function (geometry, count) {
            //##FilterBegin## ##Particle##
            this._animationState = this.state;
            var colorOffsetIndex = 6; //position, normal
            var vertices = geometry.vertexCount / count;
            var index = 0;
            var timeOffsetIndex = this._animationState.emitter.timeNode.offsetIndex;
            var particleIndex = 0;
            var clr1 = new egret3d.Color();
            var clr2 = new egret3d.Color();
            var progress = 0;
            var duration = this._animationState.emitter.data.life.duration;
            var scaleValue = 1 / 0xff;
            for (var i = 0; i < count; ++i) {
                particleIndex = i * vertices;
                this.timeIndex = particleIndex * geometry.vertexAttLength + timeOffsetIndex;
                this.bornTime = geometry.vertexArray[this.timeIndex + 0]; //出生时间
                //this.life = geometry.verticesData[this.timeIndex + 1];              //单次生命周期时间
                //this.id = geometry.verticesData[this.timeIndex + 2];              //下标(i)
                progress = this.bornTime / duration;
                progress = progress - Math.floor(progress); //取小数部分
                this.lerpBirthColor(clr1, clr2, progress);
                clr1.scaleBy(scaleValue);
                for (var j = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + colorOffsetIndex;
                    geometry.vertexArray[index + 0] = clr1.r;
                    geometry.vertexArray[index + 1] = clr1.g;
                    geometry.vertexArray[index + 2] = clr1.b;
                    geometry.vertexArray[index + 3] = clr1.a;
                }
            }
            //##FilterEnd##
        };
        //##FilterBegin## ##Particle##
        /**
        * @private
        * 根据每种出生颜色数据，相应获得一个颜色
        */
        ParticleStartColor.prototype.lerpBirthColor = function (c1, c2, t) {
            if (this._node.colorType == egret3d.ParticleBirthColorType.Const) {
                c1.copyFrom(this._node.colorConst1);
            }
            else if (this._node.colorType == egret3d.ParticleBirthColorType.RandomConst) {
                c1.randomColor(this._node.colorConst1, this._node.colorConst2, true);
            }
            else if (this._node.colorType == egret3d.ParticleBirthColorType.OneGradients) {
                this._node.colorGradients1.lerpColor(t, c1);
            }
            else if (this._node.colorType == egret3d.ParticleBirthColorType.TwoGradients) {
                this._node.colorGradients1.lerpColor(t, c1);
                this._node.colorGradients2.lerpColor(t, c2);
                c1.lerp(c1, c2, 0.5);
            }
        };
        //##FilterEnd##
        /**
        * @private
        */
        ParticleStartColor.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._node = null;
        };
        return ParticleStartColor;
    }(egret3d.AnimationNode));
    egret3d.ParticleStartColor = ParticleStartColor;
    __reflect(ParticleStartColor.prototype, "egret3d.ParticleStartColor");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ParticleStartColor.js.map