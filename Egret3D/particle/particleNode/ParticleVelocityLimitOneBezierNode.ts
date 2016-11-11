﻿module egret3d {

    /**
    * @language zh_CN
    * @private
    * @class egret3d.ParticleVelocityLimitOneBezierNode
    * @classdesc
    * 粒子速度限制,贝塞尔曲线获得
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleVelocityLimitOneBezierNode extends AnimationNode {

        private _floatCompressData: Float32Array;
        private _node: ParticleDataMoveSpeed;

        constructor() {
            super();
            //##FilterBegin## ##Particle##
            this.name = "ParticleVelocityLimitOneBezierNode";

            this.vertex_ShaderName[ShaderPhaseType.global_vertex] = this.vertex_ShaderName[ShaderPhaseType.global_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.global_vertex].push("particle_velocityLimitOneBezier");

            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * 填充粒子移动速度数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode): void {
            //##FilterBegin## ##Particle##
            this._node = <ParticleDataMoveSpeed>data;
            this._floatCompressData = this._node.velocityLimit.bezier1.sampler();
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

        }



        /**
        * @private
        */
        public activeState(time: number, animTime: number, delay: number, animDelay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy) {
            //##FilterBegin## ##Particle##
            context3DProxy.uniform1fv(usage["uniform_velocityLimit"].uniformIndex, this._floatCompressData);
            //##FilterEnd##
        }

        /**
        * @private 
        */
        public dispose(): void {
            super.dispose();
            this._floatCompressData = null;
            this._node = null;
        }


    }
} 