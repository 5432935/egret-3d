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
    * @class egret3d.ParticleUVRollNode
    * @classdesc
    * uv滚动
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParticleUVRollNode = (function (_super) {
        __extends(ParticleUVRollNode, _super);
        function ParticleUVRollNode() {
            var _this = _super.call(this) || this;
            _this._uvRollData = new Float32Array(2);
            //##FilterBegin## ##Particle##
            _this.name = "ParticleUVRollNode";
            //需要在之前进行设置UV
            _this.importShader(false, egret3d.ShaderPhaseType.start_fragment, "particle_uv_roll_fs");
            return _this;
            //##FilterEnd##
        }
        /**
        * @language zh_CN
        * 填充UV滚动
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleUVRollNode.prototype.initNode = function (data, args) {
            //##FilterBegin## ##Particle##
            this._methodData = args;
            this._uvRollData[0] = this._methodData.uSpeed;
            this._uvRollData[1] = this._methodData.vSpeed;
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
        ParticleUVRollNode.prototype.build = function (geometry, count) {
        };
        /**
        * @private
        */
        ParticleUVRollNode.prototype.activeState = function (time, animTime, delay, animDelay, usage, geometry, context3DProxy) {
            //##FilterBegin## ##Particle##
            context3DProxy.uniform1fv(usage["uniform_particleUVRoll"].uniformIndex, this._uvRollData);
            //##FilterEnd##
        };
        /**
        * @private
        */
        ParticleUVRollNode.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._animationState = null;
            this._methodData = null;
            this._uvRollData = null;
        };
        return ParticleUVRollNode;
    }(egret3d.AnimationNode));
    egret3d.ParticleUVRollNode = ParticleUVRollNode;
    __reflect(ParticleUVRollNode.prototype, "egret3d.ParticleUVRollNode");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ParticleUVRollNode.js.map