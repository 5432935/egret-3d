﻿module egret3d {

    /**
    * @private
    */
    export class MatCapPass extends MaterialPass {

        constructor(materialData: MaterialData) {
            super(materialData);
        }

        /**
        * @language zh_CN
        * @private
        * 初始化 UseMethod。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initUseMethod(animation: IAnimation, geom: Geometry) {
            this._passChange = false;
            var i: number = 0;
            this._passUsage = new PassUsage();

            this._vs_shader_methods = {};
            this._fs_shader_methods = {};

            //pre Phase ---------------------------------------------------
            if (animation) {
                // to add accept animation shader
                if (animation.skeletonAnimationController) {
                    this._passUsage.maxBone = animation.skeletonAnimationController.jointNumber * 2;

                    this._vs_shader_methods[ShaderPhaseType.start_vertex] = [];
                    this._vs_shader_methods[ShaderPhaseType.start_vertex].push("skeleton_vs");
                }
            }

            if (this._materialData.shaderPhaseTypes[PassType.shadowPass].indexOf(ShaderPhaseType.diffuse_fragment) != -1) {
                this._fs_shader_methods[ShaderPhaseType.diffuse_fragment] = [];
                this._fs_shader_methods[ShaderPhaseType.diffuse_fragment].push("diffuse_fragment");
            }

            //this.initOthreMethods();
            //pre Phase end ---------------------------------------------------

            var shaderList: string[];
            //---vs---shadering
            this.addMethodShaders(this._passUsage.vertexShader, ["base_vs"]);

            //start Phase
            shaderList = this._vs_shader_methods[ShaderPhaseType.start_vertex];

            if (shaderList && shaderList.length > 0)
                this.addMethodShaders(this._passUsage.vertexShader, shaderList);
            this.addMethodShaders(this._passUsage.vertexShader, ["end_vs"]);

            //---vs---shadering-------------------------------------------------

            //---fs---shadering
            this.addMethodShaders(this._passUsage.fragmentShader, ["base_fs"]);

            //diffuse
            shaderList = this._fs_shader_methods[ShaderPhaseType.diffuse_fragment];
            if (shaderList && shaderList.length > 0)
                this.addMethodShaders(this._passUsage.fragmentShader, shaderList);

            this.addMethodShaders(this._passUsage.fragmentShader, ["end_fs"]);
            //---fs---shadering-------------------------------------------------
        }
    }
} 