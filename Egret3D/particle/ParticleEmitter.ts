module egret3d {

    /**
    * @class egret3d.ParticleEmitter
    * @classdesc
    * 粒子发射器的主体，继承自Mesh，封装有粒子的各种动画节点在内。<p/>
    * 根据ParticleData中的包含的每个数据节点，初始化对应的AnimationNode，然后填充Geometry数据和拼装shader。<p/>
    * Egret3D的粒子是基于GPU的粒子，初始化完毕之后，不再使用CPU计算每个粒子的相关数据，如位置变化和颜色变化等。<p/>
    * 通过释放CPU的负担获得更高的运行效率，让你的程序有更多的可能性。
    * 在需要大量使用粒子的环境下，你需要考虑到的是渲染面积和drawcall的数量，从这2方面着手来优化你的程序。
    * @see egret3d.Mesh
    * @see egret3d.Geometry
    * @see egret3d.AnimationNode
    * @see egret3d.ParticleAnimation
    * @see egret3d.ParticleAnimationState
    * @includeExample particle/ParticleEmitter.ts
    * @version Egret 3.0
    * @platform Web,Native 
    */
    export class ParticleEmitter extends Mesh {


        private _timeNode: ParticleTime;
        private _positionNode: ParticlePosition;

        private _geometryShape: Geometry;
        private _particleAnimation: ParticleAnimation;
        private _particleState: ParticleAnimationState;
        private _subEmitterNode: ParticleSubEmitterNode;
        private _trackPositionNode: ParticleTrackPositionNode;

        private _isEmitterDirty: boolean = true;

        private _userNodes: AnimationNode[] = [];

        private _data: ParticleData;
        private _externalGeometry: Geometry;

        private _generator: ParticleLifeGenerator;

        /**
        * @language zh_CN
        * 构造函数，创建一个粒子对象，然后添加至场景中后，使用play函数即可。
        * @param data ParticleData 生成粒子的数据来源，该对象描述了该粒子的大部分信息。
        * @param material 粒子用到的材质球数据。
        * @version Egret 3.0
        * @platform Web,Native 
        */
        constructor(data: ParticleData, material: MaterialBase = null) {
            super(null, material);
            //##FilterBegin## ##Particle##
            this.tag.name = "effect";
            this.type = IRender.TYPE_PARTICLE_EMIT;

            this._data = data;
            this._externalGeometry = data.property.geometry;
            this.animation = this._particleAnimation = new ParticleAnimation(this);
            this.animation.particleAnimationController = this._particleAnimation;
            this._particleState = this._particleAnimation.particleAnimationState;

            this._generator = new ParticleLifeGenerator();
            this._particleAnimation.emit = this;


            this.buildParticle();

            this.animation.isLoop = this._data.life.loop;
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * 将每个粒子单元的出生位置设置为原结束位置。然后重新设置结束位置，以衔接更新追踪到一个新的目标位置。
        * @param fromCoords 粒子出生位置列表
        * @param endCoords 粒子目标位置列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public trackPosition(fromCoords: Vector3D[], endCoords: Vector3D[]): void {
            if (this._trackPositionNode) {
                this.animation.animTime = 0.0;
                this._trackPositionNode.trackPosition(fromCoords, endCoords);
            }
        }

        /**
        * @language zh_CN
        * 返回上一次跟踪目标点的列表
        * @returns 粒子目标位置列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get trackEndCoords(): Vector3D[] {
            if (this._trackPositionNode) {
                return this._trackPositionNode.endCoords;
            }
            return null;
        }

        /**
        * @private
        */
        public get generator(): ParticleLifeGenerator {
            return this._generator;
        }

        /**
        * @language zh_CN
        * 渲染排序的参数，数值越大，先渲染。<p/>
        * 例如一个火焰的特效可能同时含有高亮部分和灰色烟雾部分，你可以通过修改它们这个数据强制让灰色烟雾部分获得优先绘制权。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get drawOrder(): number {
            return this._data.property.sortingFudge;
        }

        /**
        * @private
        * 添加子发射器
        */
        public addSubEmitter(phase: number, subEmitter: ParticleEmitter): void {
            //##FilterBegin## ##Particle##
            subEmitter.animation.stop();
            this._subEmitterNode.importSubEmitter(phase, subEmitter);
            //##FilterEnd##
        }
        /**
        * @language zh_CN
        * @private
        * 重新构建这个粒子
        * @param geo Geometry 几何数据
        * @param data ParticleData 生成粒子的数据来源
        * @param material 粒子的材质
        * @version Egret 3.0
        * @platform Web,Native 
        */
        private buildParticle(): void {
            //##FilterBegin## ##Particle##
            if (this._externalGeometry == null) {
                this._geometryShape = this.createPlane();
            } else {
                this._geometryShape = this._externalGeometry;
            }
            var mode: number = this._data.property.renderMode;
            if (mode == ParticleRenderModeType.Billboard || mode == ParticleRenderModeType.StretchedBillboard) {
                this.billboard = BillboardType.STANDARD;
            } else if (mode == ParticleRenderModeType.HorizontalBillboard || mode == ParticleRenderModeType.VerticalBillboard) {
                this.billboard = BillboardType.Y_AXIS;
            } else {
                this.billboard = BillboardType.DISABLE;
            }

            this.initialize();

            this.initBoudBox(this._data.property.bounds);

            this._isEmitterDirty = false;
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * 根据粒子的配置信息，生成geometry
        * @returns Geometry
        * @version Egret 3.0
        * @platform Web,Native
        */
        private createPlane(): Geometry {
            var geo: Geometry;
            //##FilterBegin## ##Particle##
            var geomData: ParticleDataGeometry = this._data.geometry;

            var defaultAxis: Vector3D = Vector3D.Z_AXIS;
            var wCenter: boolean = true;
            var hCenter: boolean = true;

            if (this._data.property.renderMode == ParticleRenderModeType.StretchedBillboard) {
                //需要偏移一半位置
                wCenter = false;
                hCenter = true;
            }

            geo = new PlaneGeometry(geomData.planeW, geomData.planeH, 1, 1, 1, 1, defaultAxis, wCenter, hCenter);
            //##FilterEnd##
            return geo;
        }

        /**
        * @language zh_CN
        * 获取该粒子的描述数据
        * @returns ParticleData 初始化该粒子用到的数据。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get data(): ParticleData {
            return this._data;
        }


        /**
        * @language zh_CN
        * 获取时间节点
        * @returns ParticleTime 时间节点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get timeNode(): ParticleTime {
            return this._timeNode;
        }

        /**
        * @language zh_CN
        * 获取位置节点，该节点控制每个粒子单元的出生位置，并将数据写入顶点数据中。
        * @returns ParticlePosition 创建粒子单元出生位置的节点。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get positionNode(): ParticlePosition {
            return this._positionNode;
        }

        /**
        * @language zh_CN
        * 设置跟随的目标，如果设置了，粒子发射器会跟随目标 
        * @param o 粒子发射器会跟随目标 
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public set followTarget(o: Object3D) {
            this._particleState.followTarget = o;
        }

        /**
        * @language zh_CN
        * 获取跟随的目标，全局粒子可能会绑定有一个跟随的目标，获得该目标对象
        * @returns Object3D 跟随的目标 
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public get followTarget(): Object3D {
            return this._particleState.followTarget;
        }


        /**
        * @language zh_CN
        * 给粒子发射器添加 粒子效果节点
        * @param node 粒子效果节点 
        * @version Egret 3.0
        * @platform Web,Native 
        */
        private addAnimNode(node: AnimationNode) {
            //##FilterBegin## ##Particle##
            var index: number = this._userNodes.indexOf(node);
            if (index == -1) {
                this._userNodes.push(node);
                this._isEmitterDirty = true;
            }
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * 移除粒子发射器上的效果节点
        * @param node 粒子效果节点 
        * @version Egret 3.0
        * @platform Web,Native 
        */
        private removeAnimNode(node: AnimationNode) {
            //##FilterBegin## ##Particle##
            var index: number = this._userNodes.indexOf(node);
            if (index != -1) {
                this._userNodes.slice(index);
                this._isEmitterDirty = true;
            }
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * 播放粒子，你可以之后使用stop函数暂停该特效的动画播放
        * @param speed 粒子播放速度
        * @param reset 是否重置到0位置
        * @param prewarm 是否预热
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public play(speed:number = 1, reset:boolean = false, prewarm: boolean = false) {
            //##FilterBegin## ##Particle##
            this.animation.play("", speed, reset, prewarm);
            //##FilterEnd##
        }


        /**
        * @language zh_CN
        * 暂停播放粒子，你可以再次使用play函数继续该粒子特效播放。
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public stop(): void {
            this.animation.stop();
        }



        /**
        * @private
        */
        protected initialize() {
            //##FilterBegin## ##Particle##
            //clean
            this._particleAnimation.particleAnimationState.clean();
            this._generator.generator(this._data);

            var count: number = this._generator.planes.length;

            this.geometry = new Geometry();
            this.geometry.buildDefaultSubGeometry();
            this.geometry.subGeometrys[0].count = count * this._geometryShape.indexCount;


            //根据 模型形状初始化 
            var vertexIndex: number = 0;
            var vertexArray: Array<number> = new Array<number>();

            //根据 动画功能节点初始化 着色器 并初始化粒子顶点结构
            var vf: number = VertexFormat.VF_POSITION | VertexFormat.VF_UV0 | VertexFormat.VF_COLOR | VertexFormat.VF_NORMAL;
            this.geometry.vertexFormat = vf;

            //根据动画节点，预计算顶点信息，长度，字节总量
            this.initMainAnimNode();
            this.initUserAnimNode();
            this.initEndNode();

            this.geometry.vertexCount = count * this._geometryShape.vertexCount;
            this.geometry.indexCount = count * this._geometryShape.indexCount;

            this._geometryShape.getVertexForIndex(0, vf, vertexArray, this._geometryShape.vertexCount);
            for (var i: number = 0; i < count; ++i) {
                vertexIndex = i * this._geometryShape.vertexCount;
                this.geometry.setVerticesForIndex(vertexIndex, vf, vertexArray, this._geometryShape.vertexCount);
            }

            for (var i: number = 0; i < count; ++i) {
                for (var j: number = 0; j < this._geometryShape.indexArray.length; ++j) {
                    this.geometry.indexArray[i * this._geometryShape.indexArray.length + j] = this._geometryShape.indexArray[j] + i * this._geometryShape.vertexCount;
                }
            }

            //最后根据节点功能，填充模型
            this._particleAnimation.particleAnimationState.fill(this.geometry, count);
            //##FilterEnd##
        }

        /**
        * @private
        * 根据ParticleData中的数据初始化
        */
        private initMainAnimNode() {
            //##FilterBegin## ##Particle##
            var nodes: Array<AnimationNode> = [];
            //time 
            this._timeNode = new ParticleTime();
            this._timeNode.initNode(this._data.life);
            nodes.push(this._timeNode);

            //position
            this._positionNode = new ParticlePosition();
            this._positionNode.initNode(this._data.shape, this._data.property);
            nodes.push(this._positionNode);

            //speed(依赖于position)
            var speedNode: ParticleVelocityNode = new ParticleVelocityNode();
            speedNode.initNode(this._data.moveSpeed);
            nodes.push(speedNode);

            //subEmitter
            this._subEmitterNode = new ParticleSubEmitterNode();
            this._subEmitterNode.initNode(null, this);
            this._particleAnimation.particleAnimationState.addNode(this._subEmitterNode);


            //velocity
            var velocityOver: VelocityOverLifeTimeData = this._data.moveSpeed.velocityOver;
            if (velocityOver) {
                if (velocityOver.type == ParticleValueType.Const || velocityOver.type == ParticleValueType.RandomConst) {
                    var overConstNode: ParticleVelocityOverConstNode = new ParticleVelocityOverConstNode();
                    overConstNode.initNode(this._data.moveSpeed);
                    nodes.push(overConstNode);
                } else if (velocityOver.type == ParticleValueType.OneBezier) {
                    var overOneBezierNode: ParticleVelocityOverOneBezierNode = new ParticleVelocityOverOneBezierNode();
                    overOneBezierNode.initNode(this._data.moveSpeed);
                    nodes.push(overOneBezierNode);
                } else if (velocityOver.type == ParticleValueType.TwoBezier) {
                    var overTwoBezierNode: ParticleVelocityOverTwoBezierNode = new ParticleVelocityOverTwoBezierNode();
                    overTwoBezierNode.initNode(this._data.moveSpeed);
                    nodes.push(overTwoBezierNode);
                }
            }
            var limit: VelocityLimitLifeTimeData = this._data.moveSpeed.velocityLimit;
            if (limit) {
                if (limit.type == ParticleValueType.Const || limit.type == ParticleValueType.RandomConst) {
                    var limitConstNode: ParticleVelocityLimitConstNode = new ParticleVelocityLimitConstNode();
                    limitConstNode.initNode(this._data.moveSpeed);
                    nodes.push(limitConstNode);
                } else if (limit.type == ParticleValueType.OneBezier) {
                    var limitOneBezierNode: ParticleVelocityLimitOneBezierNode = new ParticleVelocityLimitOneBezierNode();
                    limitOneBezierNode.initNode(this._data.moveSpeed);
                    nodes.push(limitOneBezierNode);
                }
                else if (limit.type == ParticleValueType.TwoBezier) {
                    var limitTwoBezierNode: ParticleVelocityLimitTwoBezierNode = new ParticleVelocityLimitTwoBezierNode();
                    limitTwoBezierNode.initNode(this._data.moveSpeed);
                    nodes.push(limitTwoBezierNode);
                }
            }

            var velocityForce: VelocityForceLifeTimeData = this._data.moveSpeed.velocityForce;
            if (velocityForce) {
                if (velocityForce.type == ParticleValueType.Const || velocityForce.type == ParticleValueType.RandomConst) {
                    var forceConstNode: ParticleVelocityForceConstNode = new ParticleVelocityForceConstNode();
                    forceConstNode.initNode(this._data.moveSpeed);
                    nodes.push(forceConstNode);
                } else if (velocityForce.type == ParticleValueType.OneBezier) {
                    var forceOneBezierNode: ParticleVelocityForceOneBezierNode = new ParticleVelocityForceOneBezierNode();
                    forceOneBezierNode.initNode(this._data.moveSpeed);
                    nodes.push(forceOneBezierNode);
                } else if (velocityForce.type == ParticleValueType.TwoBezier) {
                    var forceTwoBezierNode: ParticleVelocityForceTwoBezierNode = new ParticleVelocityForceTwoBezierNode();
                    forceTwoBezierNode.initNode(this._data.moveSpeed);
                    nodes.push(forceTwoBezierNode);
                }
            }

            //rotation
            var rotationNode: ParticleRotation = new ParticleRotation();
            rotationNode.initNode(this._data.rotationBirth);
            nodes.push(rotationNode);

            //scale
            var scaleNode: ParticleScale = new ParticleScale();
            scaleNode.initNode(this._data.scaleBirth);
            nodes.push(scaleNode);

            var scaleSize: ParticleSizeGlobalNode = new ParticleSizeGlobalNode();
            scaleSize.initNode(this._data.scaleSize);
            nodes.push(scaleSize);
            //start color
            var colorNode: ParticleStartColor = new ParticleStartColor();
            colorNode.initNode(this._data.property);
            nodes.push(colorNode);

            //follow
            if (this._data.followTarget) {
                var particleFollowNode: ParticleFollowNode = new ParticleFollowNode();
                particleFollowNode.initNode(this._data.followTarget);
                nodes.push(particleFollowNode);
            }

            if (this._data.rotationSpeed) {
                if (this._data.rotationSpeed.rot3Axis) {
                    var rotateXYZConst: ParticleRotationXYZConstNode = new ParticleRotationXYZConstNode();
                    rotateXYZConst.initNode(this._data.rotationSpeed);
                    nodes.push(rotateXYZConst);
                } else {
                    if (this._data.rotationSpeed.type == ParticleValueType.Const || this._data.rotationSpeed.type == ParticleValueType.RandomConst) {
                        var rotateConst: ParticleRotationConstNode = new ParticleRotationConstNode();
                        rotateConst.initNode(this._data.rotationSpeed);
                        nodes.push(rotateConst);
                    } else if (this._data.rotationSpeed.type == ParticleValueType.OneBezier) {
                        var rotateOneBezier: ParticleRotationOneBezierNode = new ParticleRotationOneBezierNode();
                        rotateOneBezier.initNode(this._data.rotationSpeed);
                        nodes.push(rotateOneBezier);
                    } else if (this._data.rotationSpeed.type == ParticleValueType.TwoBezier) {
                        var rotateTwoBezier: ParticleRotationTwoBezierNode = new ParticleRotationTwoBezierNode();
                        rotateTwoBezier.initNode(this._data.rotationSpeed);
                        nodes.push(rotateTwoBezier);
                    }
                }

            }

            if (this._data.colorOffset) {
                var colorOffset: ParticleColorGlobalNode = new ParticleColorGlobalNode();
                colorOffset.initNode(this._data.colorOffset);
                nodes.push(colorOffset);
            }

            //materialData
            if (this._data.materialData) {
                //uvRoll
                var method: UnitMatMethodData;
                for (method of this._data.materialData.methods) {
                    if (method.type == UnitMatMethodData.methodType.lightmapMethod) {

                    }
                    else if (method.type == UnitMatMethodData.methodType.uvRollMethod) {
                        var uvNode: ParticleUVRollNode = new ParticleUVRollNode();
                        uvNode.initNode(null, method);
                        nodes.push(uvNode);
                    }
                    else if (method.type == UnitMatMethodData.methodType.alphaMaskMethod) {
                        //var maskmapMethod: AlphaMaskMethod = new AlphaMaskMethod();
                        //var lightTexture: ITexture = this._sourceLib.getImage(method.texture);
                        //material.diffusePass.addMethod(maskmapMethod);
                        //maskmapMethod.maskTexture = lightTexture ? lightTexture : CheckerboardTexture.texture;
                    }
                    else if (method.type == UnitMatMethodData.methodType.streamerMethod) {
                        //var streamerMethod: StreamerMethod = new StreamerMethod();
                        //var streamerTexture: ITexture = this._sourceLib.getImage(method.texture);
                        //streamerMethod.speedU = method.uSpeed;
                        //streamerMethod.speedV = method.vSpeed;
                        //streamerMethod.start(true);
                        //material.diffusePass.addMethod(streamerMethod);
                        //streamerMethod.steamerTexture = streamerTexture ? streamerTexture : CheckerboardTexture.texture;
                    }
                }
            }

            //texture sheet
            if (this._data.textureSheet) {
                var textureSheet: ParticleTextureSheetNode = new ParticleTextureSheetNode();
                textureSheet.initNode(null, this._data.textureSheet);
                nodes.push(textureSheet);
            }

            //track
            if (this._data.property.trackPosition) {
                this._trackPositionNode = new ParticleTrackPositionNode();
                this._trackPositionNode.initNode(null);
                nodes.push(this._trackPositionNode);
            }

            //
            for (var i: number = 0, count: number = nodes.length; i < count; i++) {
                this._particleAnimation.particleAnimationState.addNode(nodes[i]);
            }

            //##FilterEnd##
        }

        private initUserAnimNode() {
            //##FilterBegin## ##Particle##
            //加入自定义节点
            for (var i: number = 0; i < this._userNodes.length; i++) {
                this._particleAnimation.particleAnimationState.addNode(this._userNodes[i]);
            }
            //##FilterEnd##
        }

        private initEndNode(): void {
            //##FilterBegin## ##Particle##
            //永远是最后一个加入
            var endNode: ParticleEndNode = new ParticleEndNode();
            this._particleAnimation.particleAnimationState.addNode(endNode);
            //计算加入动画后，会获取的节点信息，重新计算 geometry 结构
            this._particleAnimation.particleAnimationState.calculate(this.geometry);
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * @private
        * 构建包围盒
        * @version Egret 3.0
        * @platform Web,Native
        */
        private initBoudBox(vector: Vector3D) {
            //##FilterBegin## ##Particle##
            var b: BoundBox = new BoundBox(this);
            b.fillBox(new Vector3D(-vector.x / 2, -vector.y / 2, -vector.z / 2), new Vector3D(vector.x / 2, vector.y / 2, vector.z / 2));
            this.bound = b;
            this.initAABB();
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * 循环完毕的次数，用于检测是否单个循环结束
        * @returns number 获得这个粒子播放的进度，0-1之间。如果该粒子有循环播放属性，获得的数据无效。
        * @version Egret 3.0
        * @platform Web,Native
        */

        public get loopProgress(): number {
            var p: number;
            //##FilterBegin## ##Particle##
            p = this.animation.animTime / (this.animation.loopTime * 1000);
            //##FilterEnd##
            return p;
        }

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number, camera: Camera3D) {
            //##FilterBegin## ##Particle##
            if (this._isEmitterDirty) {
                this.buildParticle();
            }
            super.update(time, delay, camera);

            //##FilterEnd##
        }

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public copy(other: ParticleEmitter) {
            super.copy(other);
            var phaseList: number[] = [ParticleDataSubEmitterPhase.BIRTH, ParticleDataSubEmitterPhase.COLLISION, ParticleDataSubEmitterPhase.DEATH];
            if (other._subEmitterNode) {
                for (var j: number = 0; j < phaseList.length; j++) {
                    var phase: number = phaseList[j];
                    var emitters: ParticleEmitter[] = other._subEmitterNode.getSubEmitters(phase);
                    if (emitters && emitters.length > 0) {
                        for (var i: number = 0; i < emitters.length; i++) {
                            this.addSubEmitter(phase, emitters[i]);
                        }
                    }
                }
            }
        }

        /**
        * @language zh_CN
        * 克隆该粒子个粒子，播放信息需要外部去设置（Geometry为全新创建的，ParticleData和MaterialBase数据共享。）
        * @returns ParticleEmitter 克隆后的粒子特效
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): ParticleEmitter {
            var newParticle: ParticleEmitter;
            //##FilterBegin## ##Particle##
            newParticle = new ParticleEmitter(this.data, this.material);

            newParticle.copy(this);

            //##FilterEnd##
            return newParticle;
        }


        /**
        * @language zh_CN
        * 释放所有数据（ParticleData和MaterialBase数据在这个释放过程中，仅仅是移除引用）
        * @version Egret 3.0
        * @platform Web,Native
        */
        public dispose(): void {
            super.dispose();
            if (this._generator) {
                this._generator.dispose();
                this._generator = null;
            }

            this._timeNode = null;
            this._positionNode = null;

            if (this._geometryShape) {
                this._geometryShape.dispose();
                this._geometryShape = null;
            }

            if (this._externalGeometry) {
                this._externalGeometry.dispose();
                this._externalGeometry = null;
            }

            this._particleAnimation = null;

            if (this._particleState) {
                this._particleState.dispose();
                this._particleState = null;
            }

            this._subEmitterNode = null;

            this._userNodes = null;
            this._data = null;


        }


    }
}