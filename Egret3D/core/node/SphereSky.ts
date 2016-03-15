﻿module egret3d {
                        
    /**
    * @class egret3d.SphereSky
    * @classdesc
    * 天空球
    * 球形的天空盒子，需要sphere的360全景照片，可进行全景照片和video的球形显示
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class SphereSky extends Object3D {
                                
        /**
        * @language zh_CN
        * 天空球贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public skyTexture: CubeTexture;

        private viewMatIndex: WebGLUniformLocation;
        private vsShaderSource: string;
        private fsShaderSource: string;
        //private usage: MethodUsageData;
        private vsShader: Shader;
        private fsShader: Shader;
        private sphereGeometry: Geometry;
                        
        /**
        * @language zh_CN
        * constructor
        * @param tex1 天空球贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(tex1: CubeTexture) {
            super();
            this.skyTexture = tex1 ;
            //this.usage = new MethodUsageData();
            //this.vsShader = new GLSL.ShaderBase(null, this.usage);
            //this.fsShader = new GLSL.ShaderBase(null, this.usage);
            //this.setShader("spheresky_vertex", "spheresky_fragment");
        } 
                                
        /**
        * @language zh_CN
        * 设置渲染用的shader文件名字
        * @param vsName vs文件名
        * @param fsName fs文件名
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setShader(vsName: string, fsName: string) {
            //this.vsShader.addShader(vsName);
            //this.fsShader.addShader(fsName);

            //this.vsShaderSource = this.vsShader.getShaderSource();
            //this.fsShaderSource = this.fsShader.getShaderSource();
        }

        private rebuild(context3D: Context3DProxy) {
            var vertexShader: Shader = context3D.creatVertexShader(this.vsShaderSource);
            var fragmentShader: Shader = context3D.creatFragmentShader(this.fsShaderSource);

            //this.usage.program3D = context3D.creatProgram(vertexShader, fragmentShader);

            //if (this.usage.program3D) {
            //    context3D.setProgram(this.usage.program3D);
            //}

            //this.sphereGeometry = this.sphereGeometry || new SphereGeometry(25);
            //if (!this.sphereGeometry.sharedVertexBuffer) {
            //    this.sphereGeometry.sharedVertexBuffer = context3D.creatVertexBuffer(this.sphereGeometry.verticesData);
            //    this.sphereGeometry.numberOfVertices = this.sphereGeometry.verticesData.length / this.sphereGeometry.vertexAttLength;
            //    this.sphereGeometry.vertexSizeInBytes = this.sphereGeometry.positionSize * Float32Array.BYTES_PER_ELEMENT + ///pos 0
            //    3 * Float32Array.BYTES_PER_ELEMENT + ///normal 12
            //    3 * Float32Array.BYTES_PER_ELEMENT + ///tangent 24
            //    4 * Float32Array.BYTES_PER_ELEMENT + ///color 36 
            //    2 * Float32Array.BYTES_PER_ELEMENT + ///uv 52
            //    2 * Float32Array.BYTES_PER_ELEMENT; ///uv2 60
            //    this.sphereGeometry.sharedIndexBuffer = context3D.creatIndexBuffer(this.sphereGeometry.indexData);
            //}

            //this.usage.attribute_position.uniformIndex = context3D.getShaderAttribLocation(this.usage.program3D, "attribute_position");
            //this.usage.attribute_normal.uniformIndex = context3D.getShaderAttribLocation(this.usage.program3D, "attribute_normal");
            //this.usage.attribute_uv0.uniformIndex = context3D.getShaderAttribLocation(this.usage.program3D, "attribute_uv0");
            //this.usage.uniform_ProjectionMatrix.uniformIndex = context3D.getUniformLocation(this.usage.program3D, "uniform_ProjectionMatrix");
            //this.usage.uniform_ModelMatrix.uniformIndex = context3D.getUniformLocation(this.usage.program3D, "uniform_ModelMatrix");
            //this.usage.uniform_normalMatrix.uniformIndex = context3D.getUniformLocation(this.usage.program3D, "uniform_normalMatrix");
            /////--------texture----------------
            //var sampler2D: GLSL.Sampler2D;
            //for (var index in this.usage.sampler2DList) {
            //    sampler2D = this.usage.sampler2DList[index];
            //    if (sampler2D.varName == "sky_texture")
            //        sampler2D.texture = this.skyTexture;
            //    sampler2D.uniformIndex = context3D.getUniformLocation(this.usage.program3D, sampler2D.varName);
            //}
        }

        private px: number = 0;
        private py: number = 0;
        private pz: number = 0;

        private offest: Vector3D = new Vector3D(); 
                                        
        /**
        * @language zh_CN
        * 提交数据给GPU渲染当前天空球
        * @param context3D 设备上下文
        * @param camera 渲染时的相机
        * @version Egret 3.0
        * @platform Web,Native
        */
        public draw(context3D: Context3DProxy, camera:Camera3D ) {
            
            //if (!this.usage.program3D)
            //    this.rebuild(context3D);

            //context3D.setProgram(this.usage.program3D);
            //context3D.gl.enable(Egret3DDrive.CULL_FACE)
            //context3D.gl.cullFace(Egret3DDrive.FRONT);
            //context3D.gl.enable(Egret3DDrive.BLEND);
            //context3D.gl.blendFunc(Egret3DDrive.ONE, Egret3DDrive.ZERO);

            //context3D.bindVertexBuffer(this.sphereGeometry.sharedVertexBuffer);
            //context3D.vertexAttribPointer(this.usage.program3D, this.usage.attribute_position.uniformIndex, 3, Egret3DDrive.FLOAT, false, this.sphereGeometry.vertexSizeInBytes, 0);
            //context3D.vertexAttribPointer(this.usage.program3D, this.usage.attribute_uv0.uniformIndex, 2, Egret3DDrive.FLOAT, false, this.sphereGeometry.vertexSizeInBytes, 52 );
            //context3D.uniformMatrix4fv(this.usage.uniform_ProjectionMatrix.uniformIndex, false, camera.viewProjectionMatrix.rawData);
            /////--------texture----------------
            //var sampler2D: GLSL.Sampler2D;
            //for (var index in this.usage.sampler2DList) {
            //    sampler2D = this.usage.sampler2DList[index];
            //    sampler2D.texture.upload(context3D);
            //    context3D.setTexture2DAt(sampler2D.activeTextureIndex, sampler2D.uniformIndex, sampler2D.index, sampler2D.texture.texture);
            //}
            //context3D.drawElement(DrawMode.TRIANGLES, this.sphereGeometry.sharedIndexBuffer, 0, this.sphereGeometry.numItems );
        }

    }
} 