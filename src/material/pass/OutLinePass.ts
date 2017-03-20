module egret3d {

    /**
    * @private
    * @language zh_CN
    * @class egret3d.OutLinePass
    * @classdesc
    * 材质球描边特效
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class OutLinePass extends MaterialPass {

        private outline: Float32Array = new Float32Array(5);

        constructor() {
            super(null);
            this._passID = PassType.colorPass;
            this.outline[0] = 0.2; 
            this.outline[1] = 1.0; 
            this.outline[2] = 0.0; 
            this.outline[3] = 0.0; 
            this.outline[4] = 1.0 ; 
        }


       /**
       * @language zh_CN
       * @public
       * @param  val 设置描边线框的现实颜色。
       * @version Egret 3.0
       * @platform Web,Native
       */
        public set outLineColor(val: number) {
            var color: Vector3D = Color.getColor(val); 
           
            this.outline[1] = color.x;
            this.outline[2] = color.y;
            this.outline[3] = color.z;
            this.outline[4] = color.w; 
        }

       /**
       * @language zh_CN
       * @public
       * @param  val 获取描边线框的现实颜色。
       * @version Egret 3.0
       * @platform Web,Native
       */
        public get outLineColor(): number {
            return Color.RGBAToColor(
                this.outline[1],
                this.outline[2],
                this.outline[3],
                this.outline[4]
            ); 
        }

       /**
       * @language zh_CN
       * @public
       * @param  size 设置描边线框的尺寸大小 从0开始的数值，可以无限大，一般在0~1之间会有意义。
       * @version Egret 3.0
       * @platform Web,Native
       */
        public set outLineSize( size:number ) {
            this.outline[0] = size; 
        }

       /**
       * @language zh_CN
       * @public
       * @param  size 获取描边线框的尺寸大小 从0开始的数值，可以无限大，一般在0~1之间会有意义。
       * @version Egret 3.0
       * @platform Web,Native
       */
        public get outLineSize(): number {
            return this.outline[0];
        }

        /**
       * @language zh_CN
       * @private
       * 初始化 UseMethod。
       * @version Egret 3.0
       * @platform Web,Native
       */
        public initUseMethod(animation: IAnimation, geom: Geometry) {

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

            this._vs_shader_methods[ShaderPhaseType.global_vertex] = this._vs_shader_methods[ShaderPhaseType.global_vertex] || [];
            this._vs_shader_methods[ShaderPhaseType.global_vertex].push("outLine_vs");

            this._fs_shader_methods[ShaderPhaseType.end_fragment] = this._fs_shader_methods[ShaderPhaseType.end_fragment] || [];
            this._fs_shader_methods[ShaderPhaseType.end_fragment].push("outLine_fs");

            this.phaseEnd(animation);
        }

        /**
        * @private
        */
        public upload(time: number, delay: number, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D, animation: IAnimation, geometry: Geometry, renderQuen: RenderQuen) {
            super.upload(time, delay, context3DProxy, modeltransform, camera3D, animation, geometry,renderQuen);

        }

        /**
        * @private
        */
        //public draw(time: number, delay: number, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D, subGeometry: SubGeometry, render: IRender) {
        //    var depthTest: boolean = this._materialData.depthTest;
        //    var bothside: boolean = this._materialData.bothside;

        //    this._materialData.depthTest = false;
        //    this._materialData.bothside = true;
        //    super.draw(time, delay, context3DProxy, modeltransform, camera3D, subGeometry, render);

        //    this._materialData.depthTest = depthTest;
        //    this._materialData.bothside = bothside;
        //}

        /**
      * @private
      */
        public draw(time: number, delay: number, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D, subGeometry: SubGeometry, render: IRender, renderQuen: RenderQuen) {
            if (!this.enable) return;

            if (this._passChange) {
                this.upload(time, delay, context3DProxy, modeltransform, camera3D, render.animation, subGeometry.geometry,renderQuen);
            }

            context3DProxy.setProgram(this._passUsage.program);
            subGeometry.activeState(time, delay, this._passUsage, context3DProxy);
  
            Context3DProxy.gl.depthMask(false);
            if (this._passUsage.uniform_materialSource) {
                context3DProxy.uniform1fv(this._passUsage.uniform_materialSource.uniformIndex, this._materialData.materialSourceData);
            }

            if (this._passUsage.uniform_ModelMatrix) {
                context3DProxy.uniformMatrix4fv(this._passUsage.uniform_ModelMatrix.uniformIndex, false, modeltransform.rawData);
            }

            if (this._passUsage.uniform_ViewMatrix) {
                context3DProxy.uniformMatrix4fv(this._passUsage.uniform_ViewMatrix.uniformIndex, false, camera3D.viewMatrix.rawData);
            }

            if (this._passUsage.uniform_ProjectionMatrix) {
                context3DProxy.uniformMatrix4fv(this._passUsage.uniform_ProjectionMatrix.uniformIndex, false, camera3D.projectMatrix.rawData);
            }

            if (this._passUsage.uniform_ViewProjectionMatrix) {
                context3DProxy.uniformMatrix4fv(this._passUsage.uniform_ViewProjectionMatrix.uniformIndex, false, camera3D.viewProjectionMatrix.rawData);
            }

            if (this._passUsage.uniform_orthProjectMatrix) {
                context3DProxy.uniformMatrix4fv(this._passUsage.uniform_orthProjectMatrix.uniformIndex, false, camera3D.orthProjectionMatrix.rawData);
            }

            if (this._passUsage["uniform_ouline"]) {
                context3DProxy.uniform1fv(this._passUsage["uniform_ouline"].uniformIndex,this.outline );
            }

            if (render.animation) {
                render.animation.activeState(time, delay, this._passUsage, subGeometry, context3DProxy, modeltransform, camera3D);
            }
            if (this.methodList) {
                for (var i: number = 0; i < this.methodList.length; i++) {
                    this.methodList[i].activeState(time, delay, this._passUsage, null, context3DProxy, modeltransform, camera3D,renderQuen);
                }
            }

            if (this._passUsage.uniform_eyepos) {
                context3DProxy.uniform3f(this._passUsage.uniform_eyepos.uniformIndex, camera3D.x, camera3D.y, camera3D.z);
            }

            if (this._passUsage.uniform_cameraMatrix) {
                context3DProxy.uniformMatrix4fv(this._passUsage.uniform_cameraMatrix.uniformIndex, false, camera3D.modelMatrix.rawData);
            }

            context3DProxy.drawElement(this._materialData.drawMode, subGeometry.start, subGeometry.count);
            Context3DProxy.gl.depthMask(true);
        }
    }
} 