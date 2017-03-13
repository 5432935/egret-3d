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
    var ShadowPass = (function (_super) {
        __extends(ShadowPass, _super);
        function ShadowPass(materialData) {
            var _this = _super.call(this, materialData) || this;
            _this._passID = egret3d.PassType.shadowPass;
            return _this;
        }
        /**
        * @language zh_CN
        * @private
        * 初始化 UseMethod。
        * @version Egret 3.0
        * @platform Web,Native
        */
        ShadowPass.prototype.initUseMethod = function (animation, geom) {
            this._passChange = false;
            var i = 0;
            this._passUsage = new egret3d.PassUsage();
            this._vs_shader_methods = {};
            this._fs_shader_methods = {};
            ////pre Phase ---------------------------------------------------
            //if (animation) {
            //    // to add accept animation shader
            //    if (animation.skeletonAnimationController) {
            //        this._passUsage.maxBone = animation.skeletonAnimationController.jointNum * 2;
            //        this._vs_shader_methods[ShaderPhaseType.start_vertex] = [];
            //        this._vs_shader_methods[ShaderPhaseType.start_vertex].push("skeletonShadowPass_vs");
            //    }
            //    else if (animation.particleAnimationController) {
            //        //this._vs_shader_methods[ShaderPhaseType.start_vertex] = [];
            //        //this._vs_shader_methods[ShaderPhaseType.start_vertex].push("particle_vs");
            //        ////to change importent
            //        //this.addShaderPhase(animation.particleAnimationController.particleAnimationState.vertex_shaders, this._vs_shader_methods);
            //        //this.addShaderPhase(animation.particleAnimationController.particleAnimationState.fragment_shaders, this._fs_shader_methods);
            //    }
            //}
            //else {
            //    this._vs_shader_methods[ShaderPhaseType.start_vertex] = [];
            //    this._vs_shader_methods[ShaderPhaseType.start_vertex].push("staticShadowPass_vs");
            //}
            if (animation) {
                if (animation.skeletonAnimationController) {
                    this._passUsage.maxBone = animation.skeletonAnimationController.jointNum * 2;
                    this.addMethodShaders(this._passUsage.vertexShader, ["shadowPass_skeleton_vs"]);
                }
                else if (animation.particleAnimationController) {
                    this._vs_shader_methods[egret3d.ShaderPhaseType.start_vertex] = [];
                    this._vs_shader_methods[egret3d.ShaderPhaseType.start_vertex].push("particle_vs");
                    this.addShaderPhase(this._passID, animation.particleAnimationController.particleAnimationState.vertex_shaders, this._vs_shader_methods);
                    this.addMethodShaders(this._passUsage.vertexShader, ["base_vs"]);
                    var shaderList;
                    //start Phase
                    shaderList = this._vs_shader_methods[egret3d.ShaderPhaseType.start_vertex];
                    if (shaderList && shaderList.length > 0)
                        this.addMethodShaders(this._passUsage.vertexShader, shaderList);
                    //local
                    shaderList = this._vs_shader_methods[egret3d.ShaderPhaseType.local_vertex];
                    if (shaderList && shaderList.length > 0)
                        this.addMethodShaders(this._passUsage.vertexShader, shaderList);
                    //global
                    shaderList = this._vs_shader_methods[egret3d.ShaderPhaseType.global_vertex];
                    if (shaderList && shaderList.length > 0)
                        this.addMethodShaders(this._passUsage.vertexShader, shaderList);
                    //end
                    shaderList = this._vs_shader_methods[egret3d.ShaderPhaseType.end_vertex];
                    if (shaderList && shaderList.length > 0)
                        this.addMethodShaders(this._passUsage.vertexShader, shaderList);
                }
            }
            else {
                this.addMethodShaders(this._passUsage.vertexShader, ["shadowPass_vs"]);
            }
            this.addMethodShaders(this._passUsage.fragmentShader, ["shadowPass_fs"]);
            //if (this._materialData.shaderPhaseTypes[PassType.shadowPass].indexOf(ShaderPhaseType.diffuse_fragment) != -1) {
            //    this._fs_shader_methods[ShaderPhaseType.diffuse_fragment] = [];
            //    this._fs_shader_methods[ShaderPhaseType.diffuse_fragment].push("diffuseShadowPass_fs");
            //}
            //this.initOthreMethods();
            //pre Phase end ---------------------------------------------------
            //var shaderList: string[];
            ////---vs---shadering
            //this.addMethodShaders(this._passUsage.vertexShader, ["baseShadowPass_vs"]);
            ////start Phase
            //shaderList = this._vs_shader_methods[ShaderPhaseType.start_vertex];
            //if (shaderList && shaderList.length > 0)
            //    this.addMethodShaders(this._passUsage.vertexShader, shaderList);
            //this.addMethodShaders(this._passUsage.vertexShader, ["endShadowPass_vs"]);
            ////---vs---shadering-------------------------------------------------
            ////---fs---shadering
            //this.addMethodShaders(this._passUsage.fragmentShader, ["baseShadowPass_fs"]);
            ////diffuse
            //shaderList = this._fs_shader_methods[ShaderPhaseType.diffuse_fragment];
            //if (shaderList && shaderList.length > 0)
            //    this.addMethodShaders(this._passUsage.fragmentShader, shaderList);
            //this.addMethodShaders(this._passUsage.fragmentShader, ["endShadowPass_fs"]);
            ////---fs---shadering-------------------------------------------------
        };
        return ShadowPass;
    }(egret3d.MaterialPass));
    egret3d.ShadowPass = ShadowPass;
    __reflect(ShadowPass.prototype, "egret3d.ShadowPass");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ShadowPass.js.map