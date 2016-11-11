module egret3d {
    /**
    * @language zh_CN
    * @private
    * @class egret3d.ParticleSizeGlobalNode
    * @classdesc
    * 粒子缩放变化
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleSizeGlobalNode extends AnimationNode {

        private _node: ParticleDataScaleSize;

        private _floatCompressData1: Float32Array;
        private _floatCompressData2: Float32Array;
        private _sizeScale: ConstRandomValueShape;

        private attribute_bezierRandomSeed: GLSL.VarRegister;
        private attribute_scaleSizeConst: GLSL.VarRegister;
        constructor() {
            super();
            //##FilterBegin## ##Particle##
            this.name = "ParticleSizeGlobalNode";
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * 填充粒子初始旋转数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode): void {
            //##FilterBegin## ##Particle##
            this._node = <ParticleDataScaleSize>data;

            if (this._node.type == ParticleValueType.Const || this._node.type == ParticleValueType.RandomConst) {
                this.attribute_scaleSizeConst = new GLSL.VarRegister();
                this.attribute_scaleSizeConst.name = "attribute_scaleSizeConst";
                this.attribute_scaleSizeConst.size = 1;
                this.attributes.push(this.attribute_scaleSizeConst);

                this._sizeScale = new ConstRandomValueShape();
                this._sizeScale.max = this._node.max;
                this._sizeScale.min = this._node.min;
                this.vertex_ShaderName[ShaderPhaseType.local_vertex] = this.vertex_ShaderName[ShaderPhaseType.local_vertex] || [];
                this.vertex_ShaderName[ShaderPhaseType.local_vertex].push("particle_scaleSizeConst");
            }
            else {
                if (this._node.type == ParticleValueType.OneBezier) {
                    this._floatCompressData1 = this._node.bezier1.sampler();
                    this.vertex_ShaderName[ShaderPhaseType.local_vertex] = this.vertex_ShaderName[ShaderPhaseType.local_vertex] || [];
                    this.vertex_ShaderName[ShaderPhaseType.local_vertex].push("particle_scaleSizeBezier1");
                } else {
                    this.vertex_ShaderName[ShaderPhaseType.local_vertex] = this.vertex_ShaderName[ShaderPhaseType.local_vertex] || [];
                    this.vertex_ShaderName[ShaderPhaseType.local_vertex].push("particle_scaleSizeBezier2");
                    this._floatCompressData2 = this._node.bezier1.sampler();
                    this._floatCompressData2 = this._node.bezier2.sampler();


                    this.attribute_bezierRandomSeed = new GLSL.VarRegister();
                    this.attribute_bezierRandomSeed.name = "attribute_bezierRandomSeed";
                    this.attribute_bezierRandomSeed.size = 1;
                    this.attributes.push(this.attribute_bezierRandomSeed);
                }

            }


            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * 填充顶点数据
        * @param geometry 网格数据
        * @param count 粒子数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public build(geometry: Geometry, count: number) {
            var index: number = 0;
            var vertices: number = geometry.vertexCount / count;
            if (this._node.type == ParticleValueType.Const || this._node.type == ParticleValueType.RandomConst) {
                var data: any[] = this._sizeScale.calculate(count);

                for (var i: number = 0; i < count; ++i) {
                    var scale: number = data[i];
                    for (var j: number = 0; j < vertices; ++j) {
                        index = i * vertices + j;
                        index = index * geometry.vertexAttLength + this.attribute_scaleSizeConst.offsetIndex;

                        geometry.vertexArray[index + 0] = scale;
                    }
                }
            } else if(this._node.type == ParticleValueType.TwoBezier){
                for (var i: number = 0; i < count; ++i) {
                    var random: number = Math.random();
                    for (var j: number = 0; j < vertices; ++j) {
                        index = i * vertices + j;
                        index = index * geometry.vertexAttLength + this.attribute_bezierRandomSeed.offsetIndex;

                        geometry.vertexArray[index + 0] = random;
                    }
                }
            }
        }

        /**
        * @private
        */
        public activeState(time: number, animTime: number, delay: number, animDelay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy) {
            //##FilterBegin## ##Particle##
            if (this._floatCompressData1) {
                context3DProxy.uniform1fv(usage["uniform_scaleSizeBezier1"].uniformIndex, this._floatCompressData1);
            }
            if (this._floatCompressData2) {
                context3DProxy.uniform1fv(usage["uniform_scaleSizeBezier2"].uniformIndex, this._floatCompressData2);
            }
            //##FilterEnd##
        }

        /**
        * @private 
        */
        public dispose(): void {
            super.dispose();
            this._floatCompressData1 = null;
            this._floatCompressData2 = null;
            this._node = null;
        }

    }
}  