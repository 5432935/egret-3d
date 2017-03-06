﻿module egret3d {

    /**
    * @language zh_CN
    * @private
    * @class egret3d.ParticleRotation
    * @classdesc
    * 粒子旋转效果节点(初始角度，直接加成到了顶点位置上，不会在shader上反映出)
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleRotation extends AnimationNode {

        /**
        * @private
        */
        private _animationState: ParticleAnimationState;
        private _node: ParticleDataRotationBirth;
        private _rotations: ConstRandomValueShape;
        private attribute_rotationBirth: GLSL.VarRegister;
        constructor() {
            super();

            this.name = "ParticleRotation";

            this.attribute_rotationBirth = new GLSL.VarRegister();
            this.attribute_rotationBirth.name = "attribute_rotationBirth";
            this.attribute_rotationBirth.size = 1;
            this.attributes.push(this.attribute_rotationBirth);
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
            var node: ParticleDataRotationBirth = this._node = <ParticleDataRotationBirth>data;
            this._rotations = new ConstRandomValueShape();
            this._rotations.max = node.max;
            this._rotations.min = node.min;
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
            var renderMode: number = this._animationState.emitter.data.property.renderMode;
            if (renderMode == ParticleRenderModeType.StretchedBillboard) {
                //忽略旋转
                return;
            }


            var rotationArray: number[] = this._rotations.calculate(count);
            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;
            var pos: Vector3D = new Vector3D();
            var rot: number;

            var progress: number = 0;
            var duration: number = this._animationState.emitter.data.life.duration;
            var timeOffsetIndex: number = this._animationState.emitter.timeNode.offsetIndex;
            var particleIndex: number = 0;
            var timeIndex: number;
            var bornTime: number;

            for (var i: number = 0; i < count; ++i) {
                //
                if (this._node.type == ParticleValueType.OneBezier || this._node.type == ParticleValueType.TwoBezier) {
                    timeIndex = particleIndex * geometry.vertexAttLength + timeOffsetIndex;
                    bornTime = geometry.vertexArray[timeIndex + 0];          //出生时间
                    progress = bornTime / duration;
                    progress = progress - Math.floor(progress);               //取小数部分
                    rot = this._node.bezier1.calc(progress);
                    if (this._node.type == ParticleValueType.TwoBezier) {
                        var random: number = Math.random();
                        rot *= random;
                        rot += this._node.bezier2.calc(progress) * (1 - random);
                    }
                } else {
                    rot = rotationArray[i];
                }

                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_rotationBirth.offsetIndex;

                    geometry.vertexArray[index + 0] = rot;
                }
                
            }

            //##FilterEnd##
        }

        /**
        * @private
        * 构建结束后需要清理掉临时数据
        */
        public afterBuild(): void {
            //##FilterBegin## ##Particle##
            this._rotations.dispose();
            this._rotations = null;
            //##FilterEnd##
        }


        /**
        * @private 
        */
        public dispose(): void {
            super.dispose();
            this._animationState = null;
            this._node = null;
            this._rotations = null;

        }

    }
} 
