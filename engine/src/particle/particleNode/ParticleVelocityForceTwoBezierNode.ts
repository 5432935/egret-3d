﻿module egret3d {

    /**
    * @language zh_CN
    * @private
    * @class egret3d.ParticleVelocityForceTwoBezierNode
    * @classdesc
    * 粒子加速度叠加节点,双贝塞尔曲线获得
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleVelocityForceTwoBezierNode extends AnimationNode {
        private _node: ParticleDataMoveSpeed;
        private attribute_randomSeed: GLSL.VarRegister;
        private _floatCompressDataX1: Float32Array;
        private _floatCompressDataY1: Float32Array;
        private _floatCompressDataZ1: Float32Array;
        private _floatCompressDataX2: Float32Array;
        private _floatCompressDataY2: Float32Array;
        private _floatCompressDataZ2: Float32Array;

        private _animationState: ParticleAnimationState;

        constructor() {
            super();
            //##FilterBegin## ##Particle##
            this.name = "ParticleVelocityForceTwoBezierNode";

            this.attribute_randomSeed = new GLSL.VarRegister();
            this.attribute_randomSeed.name = "attribute_velocityForceRandomSeed";
            this.attribute_randomSeed.size = 1;
            this.attributes.push(this.attribute_randomSeed);
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * 填充粒子加速度数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode): void {
            //##FilterBegin## ##Particle##
            this._node = <ParticleDataMoveSpeed>data;
            this._floatCompressDataX1 = this._node.velocityForce.xBezier1.trySampler();
            this._floatCompressDataY1 = this._node.velocityForce.yBezier1.trySampler();
            this._floatCompressDataZ1 = this._node.velocityForce.zBezier1.trySampler();

            this._floatCompressDataX2 = this._node.velocityForce.xBezier2.trySampler();
            this._floatCompressDataY2 = this._node.velocityForce.yBezier2.trySampler();
            this._floatCompressDataZ2 = this._node.velocityForce.zBezier2.trySampler();


            this.importShader(true, ShaderPhaseType.global_vertex, "particle_velocityForceTwoBezier");

            if (this._floatCompressDataX1) {
                this.importShader(true, ShaderPhaseType.global_vertex, "particle_velocityForceTwoBezierX1");
            }
            if (this._floatCompressDataX2) {
                this.importShader(true, ShaderPhaseType.global_vertex, "particle_velocityForceTwoBezierX2");
            }
            if (this._floatCompressDataY1) {
                this.importShader(true, ShaderPhaseType.global_vertex, "particle_velocityForceTwoBezierY1");
            }
            if (this._floatCompressDataY2) {
                this.importShader(true, ShaderPhaseType.global_vertex, "particle_velocityForceTwoBezierY2");
            }
            if (this._floatCompressDataZ1) {
                this.importShader(true, ShaderPhaseType.global_vertex, "particle_velocityForceTwoBezierZ1");
            }
            if (this._floatCompressDataZ2) {
                this.importShader(true, ShaderPhaseType.global_vertex, "particle_velocityForceTwoBezierZ2");
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
            //##FilterBegin## ##Particle##
            this._animationState = <ParticleAnimationState>this.state;

            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;
            for (var i: number = 0; i < count; ++i) {
                var random: number = Math.random();
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_randomSeed.offsetIndex;
                    geometry.vertexArray[index + 0] = random;
                }
            }
            //##FilterEnd##
        }



        /**
        * @private
        */
        public activeState(time: number, animTime: number, delay: number, animDelay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy) {
            //##FilterBegin## ##Particle##
            if (this._floatCompressDataX1) {
                context3DProxy.uniform1fv(usage["uniform_velocityForceX1"].uniformIndex, this._floatCompressDataX1);
            }
            if (this._floatCompressDataX2) {
                context3DProxy.uniform1fv(usage["uniform_velocityForceX2"].uniformIndex, this._floatCompressDataX2);
            }
            if (this._floatCompressDataY1) {
                context3DProxy.uniform1fv(usage["uniform_velocityForceY1"].uniformIndex, this._floatCompressDataY1);
            }
            if (this._floatCompressDataY2) {
                context3DProxy.uniform1fv(usage["uniform_velocityForceY2"].uniformIndex, this._floatCompressDataY2);
            }
            if (this._floatCompressDataZ1) {
                context3DProxy.uniform1fv(usage["uniform_velocityForceZ1"].uniformIndex, this._floatCompressDataZ1);
            }
            if (this._floatCompressDataZ2) {
                context3DProxy.uniform1fv(usage["uniform_velocityForceZ2"].uniformIndex, this._floatCompressDataZ2);
            }
            //##FilterEnd##
        }


        /**
        * @private 
        */
        public dispose(): void {
            super.dispose();
            this._floatCompressDataX1 = this._floatCompressDataY1 = this._floatCompressDataZ1 = null;
            this._floatCompressDataX2 = this._floatCompressDataY2 = this._floatCompressDataZ2 = null;
            this._node = null;
            this._animationState = null;
        }

    }
} 