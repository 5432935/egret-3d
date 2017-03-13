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
    * @class egret3d.ParticleColorGlobalNode
    * @classdesc
    * 颜色渐变
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParticleColorGlobalNode = (function (_super) {
        __extends(ParticleColorGlobalNode, _super);
        function ParticleColorGlobalNode() {
            var _this = _super.call(this) || this;
            _this._colorSegment = new Float32Array(ParticleColorGlobalNode.MaxColor * 2);
            //##FilterBegin## ##Particle##
            _this.name = "ParticleColorGlobalNode";
            _this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_color_vs");
            var fsShader = egret3d.Egret3DPolicy.useLowLoop ? "particle_color_fs_low" : "particle_color_fs";
            _this.importShader(false, egret3d.ShaderPhaseType.end_fragment, fsShader);
            return _this;
            //##FilterEnd##
        }
        /**
        * @language zh_CN
        * 填充粒子颜色变化数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleColorGlobalNode.prototype.initNode = function (data) {
            //##FilterBegin## ##Particle##
            var node = data;
            var count = ParticleColorGlobalNode.MaxColor;
            var gradients = node.data;
            gradients.colors.length = gradients.times.length = count;
            var color;
            for (var i = 0; i < count; i++) {
                color = gradients.colors[i];
                if (color) {
                    //这里采用了压缩方法：rgb三个数值压缩到一个float，a和time压缩放到第二个float
                    //然后在gpu中还原
                    this._colorSegment[i] = this.getGpuColor(color.r, color.g, color.b);
                    this._colorSegment[i + count] = this.getTimeAndAlpha(gradients.times[i], color.a);
                }
                else {
                    this._colorSegment[i] = 0;
                    this._colorSegment[i + count] = 0;
                }
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
        ParticleColorGlobalNode.prototype.build = function (geometry, count) {
        };
        /**
        * @private
        */
        ParticleColorGlobalNode.prototype.activeState = function (time, animTime, delay, animDelay, usage, geometry, context3DProxy) {
            //##FilterBegin## ##Particle##
            if (usage["uniform_colorTransform"]) {
                context3DProxy.uniform1fv(usage["uniform_colorTransform"].uniformIndex, this._colorSegment);
            }
            //##FilterEnd##
        };
        /**
        * 压缩一个颜色值到一个float中
        */
        ParticleColorGlobalNode.prototype.getGpuColor = function (r, g, b) {
            var value;
            //##FilterBegin## ##Particle##
            r = this.normalizeChannel(r);
            g = this.normalizeChannel(g);
            b = this.normalizeChannel(b);
            value = r * 0x100 + g + b / 0x100;
            //##FilterEnd##
            return value;
        };
        /**
        * @private
        * 将一个颜色通道规范到0-255之间
        */
        ParticleColorGlobalNode.prototype.normalizeChannel = function (value) {
            //##FilterBegin## ##Particle##
            if (value > 0xff)
                value = 0xff;
            else if (value < 0)
                value = 0;
            value = Math.floor(value);
            //##FilterEnd##
            return value;
        };
        /**
        * @private
        * 将时间规范到0和0.9999之间
        */
        ParticleColorGlobalNode.prototype.normalizeTime = function (value) {
            //##FilterBegin## ##Particle##
            //注：value是一个0-1之间的数，而非真实的秒时间
            //所以超过1将为无效会被设定成为一个接近1的数
            if (value >= 1)
                value = 0.9999;
            else if (value < 0)
                value = 0;
            //##FilterEnd##
            return value;
        };
        /**
        * @private
        * 合并alpha和time到一个float中
        */
        ParticleColorGlobalNode.prototype.getTimeAndAlpha = function (time, a) {
            //##FilterBegin## ##Particle##
            a = this.normalizeChannel(a);
            time = this.normalizeTime(time);
            //##FilterEnd##
            return a + time;
        };
        /**
        * @private
        */
        ParticleColorGlobalNode.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._colorSegment = null;
        };
        return ParticleColorGlobalNode;
    }(egret3d.AnimationNode));
    /**
    * @private
    * 最大支持的颜色变化数量
    */
    ParticleColorGlobalNode.MaxColor = 20;
    egret3d.ParticleColorGlobalNode = ParticleColorGlobalNode;
    __reflect(ParticleColorGlobalNode.prototype, "egret3d.ParticleColorGlobalNode");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ParticleColorGlobalNode.js.map