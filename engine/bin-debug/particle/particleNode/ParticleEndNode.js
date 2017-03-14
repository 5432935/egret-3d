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
    var ParticleEndNode = (function (_super) {
        __extends(ParticleEndNode, _super);
        function ParticleEndNode() {
            var _this = _super.call(this) || this;
            //##FilterBegin## ##Particle##
            _this.name = "ParticleEndNode";
            _this.importShader(true, egret3d.ShaderPhaseType.end_vertex, "particle_end_vs");
            _this.importShader(false, egret3d.ShaderPhaseType.end_fragment, "particle_end_fs");
            return _this;
            //##FilterEnd##
        }
        ParticleEndNode.prototype.build = function (geometry, count) {
        };
        return ParticleEndNode;
    }(egret3d.AnimationNode));
    egret3d.ParticleEndNode = ParticleEndNode;
    __reflect(ParticleEndNode.prototype, "egret3d.ParticleEndNode");
})(egret3d || (egret3d = {}));
