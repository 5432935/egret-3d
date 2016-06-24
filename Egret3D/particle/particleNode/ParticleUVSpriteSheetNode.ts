﻿module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticleUVSpriteSheetNode
    * @classdesc
    * uv滚动
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleUVSpriteSheetNode extends AnimationNode {

        /**
        * @private
        * 最大支持的颜色变化数量
        */
        private _methodData: MaterialMethodData;
        private _animationState: ParticleAnimationState;
        private _uvRollData: Float32Array = new Float32Array(2);
        constructor() {

            super();
            this.name = "ParticleUVSpriteSheetNode";
            //需要在之前进行设置UV
            this.fragment_ShaderName[ShaderPhaseType.start_fragment] = this.fragment_ShaderName[ShaderPhaseType.start_fragment] || [];
            this.fragment_ShaderName[ShaderPhaseType.start_fragment].push("particle_uv_sprite_sheet");
        }

        /**
        * @language zh_CN
        * 填充UV滚动
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode, args:any): void {
            this._methodData = args;
            this._uvRollData[0] = this._methodData.uSpeed;
            this._uvRollData[1] = this._methodData.vSpeed;
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
            context3DProxy.uniform1fv(usage["uniform_particleUVRoll"].uniformIndex, this._uvRollData);
        }

       


    }
} 