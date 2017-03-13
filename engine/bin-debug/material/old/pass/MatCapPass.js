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
    var MatCapPass = (function (_super) {
        __extends(MatCapPass, _super);
        function MatCapPass(materialData) {
            var _this = _super.call(this, materialData) || this;
            _this._passID = egret3d.PassType.matCapPass;
            return _this;
        }
        /**
        * @language zh_CN
        * @private
        * 初始化 UseMethod。
        * @version Egret 3.0
        * @platform Web,Native
        */
        MatCapPass.prototype.initUseMethod = function (animation, geom) {
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
            }
            // if (this._materialData.shaderPhaseTypes[PassType.matCapPass] && this._materialData.shaderPhaseTypes[PassType.matCapPass].indexOf(ShaderPhaseType.local_vertex) != -1) {
            //this._vs_shader_methods[ShaderPhaseType.local_vertex] = [];
            //this._vs_shader_methods[ShaderPhaseType.local_vertex].push("matCapPass_vs");
            // }
            // if (this._materialData.shaderPhaseTypes[PassType.matCapPass] && this._materialData.shaderPhaseTypes[PassType.matCapPass].indexOf(ShaderPhaseType.diffuse_fragment) != -1) {
            this._fs_shader_methods[egret3d.ShaderPhaseType.diffuse_fragment] = [];
            this._fs_shader_methods[egret3d.ShaderPhaseType.diffuse_fragment].push("diffuse_fragment");
            this._fs_shader_methods[egret3d.ShaderPhaseType.matCap_fragment] = [];
            this._fs_shader_methods[egret3d.ShaderPhaseType.matCap_fragment].push("matCap_TextureAdd_fs");
            //  }
            if (this._materialData.shaderPhaseTypes[egret3d.PassType.matCapPass] && this._materialData.shaderPhaseTypes[egret3d.PassType.matCapPass].indexOf(egret3d.ShaderPhaseType.normal_fragment) != -1) {
                this._fs_shader_methods[egret3d.ShaderPhaseType.normal_fragment] = [];
                this._fs_shader_methods[egret3d.ShaderPhaseType.normal_fragment].push("normalMap_fragment");
            }
            //------pre----
            //this._fs_shader_methods[ShaderPhaseType.diffuse_fragment].push("matCapPass_fs");
            //this.initOthreMethods();
            //pre Phase end ---------------------------------------------------
            var shaderList;
            //---vs---shadering
            this.addMethodShaders(this._passUsage.vertexShader, ["base_vs", "tangent_vs"]);
            //start Phase
            shaderList = this._vs_shader_methods[egret3d.ShaderPhaseType.start_vertex];
            if (shaderList && shaderList.length > 0)
                this.addMethodShaders(this._passUsage.vertexShader, shaderList);
            else
                this.addMethodShaders(this._passUsage.vertexShader, ["diffuse_vertex"]);
            //local
            shaderList = this._vs_shader_methods[egret3d.ShaderPhaseType.local_vertex];
            if (shaderList && shaderList.length > 0)
                this.addMethodShaders(this._passUsage.vertexShader, shaderList);
            this.addMethodShaders(this._passUsage.vertexShader, ["end_vs"]);
            this.addMethodShaders(this._passUsage.vertexShader, ["out_vs"]);
            //---vs---shadering-------------------------------------------------
            //---fs---shadering
            this.addMethodShaders(this._passUsage.fragmentShader, ["base_fs"]);
            //materialsource
            shaderList = this._fs_shader_methods[egret3d.ShaderPhaseType.materialsource_fragment];
            if (shaderList && shaderList.length > 0)
                this.addMethodShaders(this._passUsage.fragmentShader, shaderList);
            else
                this.addMethodShaders(this._passUsage.fragmentShader, ["materialSource_fs"]);
            //diffuse
            shaderList = this._fs_shader_methods[egret3d.ShaderPhaseType.diffuse_fragment];
            if (shaderList && shaderList.length > 0)
                this.addMethodShaders(this._passUsage.fragmentShader, shaderList);
            //normal
            shaderList = this._fs_shader_methods[egret3d.ShaderPhaseType.normal_fragment];
            if (shaderList && shaderList.length > 0)
                this.addMethodShaders(this._passUsage.fragmentShader, shaderList);
            //matCap
            shaderList = this._fs_shader_methods[egret3d.ShaderPhaseType.matCap_fragment];
            if (shaderList && shaderList.length > 0)
                this.addMethodShaders(this._passUsage.fragmentShader, shaderList);
            this.addMethodShaders(this._passUsage.fragmentShader, ["end_fs"]);
            //---fs---shadering-------------------------------------------------
            this.addMethodShaders(this._passUsage.fragmentShader, ["out_fs"]);
        };
        return MatCapPass;
    }(egret3d.MaterialPass));
    egret3d.MatCapPass = MatCapPass;
    __reflect(MatCapPass.prototype, "egret3d.MatCapPass");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=MatCapPass.js.map