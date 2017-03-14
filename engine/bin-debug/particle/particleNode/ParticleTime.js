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
    * @private
    */
    var ParticleTime = (function (_super) {
        __extends(ParticleTime, _super);
        function ParticleTime() {
            var _this = _super.call(this) || this;
            //##FilterBegin## ##Particle##
            _this.name = "ParticleSpeedNode";
            var bezierShader = egret3d.Egret3DPolicy.useLowLoop ? "particle_bezier_low" : "particle_bezier";
            _this.importShader(true, egret3d.ShaderPhaseType.utils_vertex, bezierShader);
            _this.importShader(false, egret3d.ShaderPhaseType.utils_fragment, bezierShader);
            _this.importShader(false, egret3d.ShaderPhaseType.diffuse_fragment, "particle_diffuse_fragment");
            _this.attribute_time = new egret3d.GLSL.VarRegister();
            _this.attribute_time.name = "attribute_time";
            _this.attribute_time.size = 3;
            _this.attributes.push(_this.attribute_time);
            return _this;
            //##FilterEnd##
        }
        /**
        * @language zh_CN
        * 填充粒子生命周期数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleTime.prototype.initNode = function (data) {
        };
        /**
        * @language zh_CN
        * 填充顶点数据
        * @param geometry 网格数据
        * @param count 粒子数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleTime.prototype.build = function (geometry, count) {
            //##FilterBegin## ##Particle##
            this._animationState = this.state;
            var generator = this._animationState.emitter.generator;
            var vertices = geometry.vertexCount / count;
            var index = 0;
            var pt;
            var planes = generator.planes;
            for (var i = 0; i < count; ++i) {
                pt = planes[i];
                for (var j = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_time.offsetIndex;
                    geometry.vertexArray[index + 0] = pt.x; //出生时间
                    geometry.vertexArray[index + 1] = pt.y; //单次生命周期时间
                    geometry.vertexArray[index + 2] = i; //下标
                }
            }
            //对于每个面片而言，取模的时间（周期）
            this._animationState.modTime = generator.loopTime;
            //最后一个面片消失的时间，即整个循环时间
            this._animationState.emitter.animation.loopTime = generator.circleTime;
            //##FilterEnd##
        };
        /**
        * @private
        * 构建结束后需要清理掉临时数据
        */
        ParticleTime.prototype.afterBuild = function () {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        };
        Object.defineProperty(ParticleTime.prototype, "offsetIndex", {
            /**
           * @language zh_CN
           * 获取时间节点在geometry的顶点数据中偏移量
           * @returns number
           * @version Egret 3.0
           * @platform Web,Native
           */
            get: function () {
                return this.attribute_time.offsetIndex;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @private
        */
        ParticleTime.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._animationState = null;
        };
        return ParticleTime;
    }(egret3d.AnimationNode));
    egret3d.ParticleTime = ParticleTime;
    __reflect(ParticleTime.prototype, "egret3d.ParticleTime");
})(egret3d || (egret3d = {}));
