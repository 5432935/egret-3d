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
    var GbufferPass = (function (_super) {
        __extends(GbufferPass, _super);
        function GbufferPass(materialData) {
            var _this = _super.call(this, materialData) || this;
            _this._passID = egret3d.PassType.CubePass;
            return _this;
        }
        /**
        * @language zh_CN
        * @private
        * 初始化 UseMethod。
        * @version Egret 3.0
        * @platform Web,Native
        */
        GbufferPass.prototype.initUseMethod = function (animation, geom) {
            this._passChange = false;
            var i = 0;
            this._passUsage = new egret3d.PassUsage();
            this._vs_shader_methods = {};
            this._fs_shader_methods = {};
            //pre Phase ---------------------------------------------------
            if (animation) {
                // to add accept animation shader
                if (animation.skeletonAnimationController) {
                    this._passUsage.maxBone = animation.skeletonAnimationController.jointNum * 2;
                    this._vs_shader_methods[egret3d.ShaderPhaseType.start_vertex] = [];
                    this._vs_shader_methods[egret3d.ShaderPhaseType.start_vertex].push("skeleton_vs");
                }
                else if (animation.particleAnimationController) {
                    this._vs_shader_methods[egret3d.ShaderPhaseType.start_vertex] = [];
                    this._vs_shader_methods[egret3d.ShaderPhaseType.start_vertex].push("particle_vs");
                    //to change importent
                    this.addShaderPhase(this._passID, animation.particleAnimationController.particleAnimationState.vertex_shaders, this._vs_shader_methods);
                    this.addShaderPhase(this._passID, animation.particleAnimationController.particleAnimationState.fragment_shaders, this._fs_shader_methods);
                }
            }
            if (this._materialData.acceptShadow) {
                // to add accept shadow maping shader+
                this._vs_shader_methods[egret3d.ShaderPhaseType.global_vertex] = this._vs_shader_methods[egret3d.ShaderPhaseType.global_vertex] || [];
                //this._vs_shader_methods[ShaderPhaseType.global_vertex].push("particle_vs");
                this._fs_shader_methods[egret3d.ShaderPhaseType.shadow_fragment] = this._fs_shader_methods[egret3d.ShaderPhaseType.shadow_fragment] || [];
            }
            if (this._materialData.shaderPhaseTypes[egret3d.PassType.diffusePass].indexOf(egret3d.ShaderPhaseType.diffuse_fragment) != -1) {
                this._fs_shader_methods[egret3d.ShaderPhaseType.diffuse_fragment] = [];
                this._fs_shader_methods[egret3d.ShaderPhaseType.diffuse_fragment].push("diffuse_fragment");
            }
            if (this._materialData.shaderPhaseTypes[egret3d.PassType.diffusePass].indexOf(egret3d.ShaderPhaseType.normal_fragment) != -1) {
                this._fs_shader_methods[egret3d.ShaderPhaseType.normal_fragment] = [];
                this._fs_shader_methods[egret3d.ShaderPhaseType.normal_fragment].push("normalMap_fragment");
            }
            if (this._materialData.shaderPhaseTypes[egret3d.PassType.diffusePass].indexOf(egret3d.ShaderPhaseType.specular_fragment) != -1) {
                this._fs_shader_methods[egret3d.ShaderPhaseType.specular_fragment] = [];
                this._fs_shader_methods[egret3d.ShaderPhaseType.specular_fragment].push("specularMap_fragment");
            }
            this._vs_shader_methods[egret3d.ShaderPhaseType.end_vertex] = this._vs_shader_methods[egret3d.ShaderPhaseType.end_vertex] || [];
            this._vs_shader_methods[egret3d.ShaderPhaseType.end_vertex].push("positionEndPass_vs");
            this._fs_shader_methods[egret3d.ShaderPhaseType.end_fragment] = this._fs_shader_methods[egret3d.ShaderPhaseType.end_fragment] || [];
            this._fs_shader_methods[egret3d.ShaderPhaseType.end_fragment].push("Gbuffer");
            this.initOthreMethods();
            //pre Phase end ---------------------------------------------------
            this.phaseEnd(animation);
        };
        return GbufferPass;
    }(egret3d.MaterialPass));
    egret3d.GbufferPass = GbufferPass;
    __reflect(GbufferPass.prototype, "egret3d.GbufferPass");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=GbufferPass.js.map