﻿module egret3d {
    
    /**
    * @private
    */
    export class NormalPass extends MaterialPass {

        constructor(materialData: MaterialData) {
            super(materialData);
            this._passID = PassType.CubePass;
        }

        /**
        * @language zh_CN
        * @private
        * 初始化 UseMethod。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initUseMethod(animation: IAnimation, geom: Geometry) {
            //super.initUseMethod(animation, geom);
            var i: number = 0;
            this._passChange = false;
            this._passUsage = new PassUsage();
            this._passUsage.vertexShader.shaderType = ShaderType.VertexShader;
            this._passUsage.fragmentShader.shaderType = ShaderType.FragmentShader;

            //pre Phase ---------------------------------------------------
            if (animation) {
                // to add accept animation shader
                if (animation.skeletonAnimationController) {
                    this._passUsage.maxBone = animation.skeletonAnimationController.jointNum * 2;

                    this._vs_shader_methods[ShaderPhaseType.start_vertex] = [];
                    this._vs_shader_methods[ShaderPhaseType.start_vertex].push("skeleton_vs");
                }
                else if (animation.particleAnimationController) {
                    this._vs_shader_methods[ShaderPhaseType.start_vertex] = [];
                    this._vs_shader_methods[ShaderPhaseType.start_vertex].push("particle_vs");

                    //to change importent
                    this.addShaderPhase(this._passID, animation.particleAnimationController.particleAnimationState.vertex_shaders, this._vs_shader_methods);
                    this.addShaderPhase(this._passID, animation.particleAnimationController.particleAnimationState.fragment_shaders, this._fs_shader_methods);
                }
            }

            if (this._materialData.shaderPhaseTypes[PassType.diffusePass].indexOf(ShaderPhaseType.normal_fragment) != -1) {
                this._fs_shader_methods[ShaderPhaseType.normal_fragment] = [];
                this._fs_shader_methods[ShaderPhaseType.normal_fragment].push("normalMap_fragment");
            }

            this._fs_shader_methods[ShaderPhaseType.end_fragment] = this._fs_shader_methods[ShaderPhaseType.end_fragment] || [];
            this._fs_shader_methods[ShaderPhaseType.end_fragment].push("normalPassEnd_fs");

            this.phaseEnd(animation);
        }
    }
} 