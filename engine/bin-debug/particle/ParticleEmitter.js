var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var egret3d;
(function (egret3d) {
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
    var ParticleEmitter = (function (_super) {
        __extends(ParticleEmitter, _super);
        /**
        * @language zh_CN
        * 构造函数，创建一个粒子对象，然后添加至场景中后，使用play函数即可。
        * @param data ParticleData 生成粒子的数据来源，该对象描述了该粒子的大部分信息。
        * @param material 粒子用到的材质球数据。
        * @version Egret 3.0
        * @platform Web,Native
        */
        function ParticleEmitter(data, material) {
            if (material === void 0) { material = null; }
            var _this = _super.call(this, null, material) || this;
            _this._isEmitterDirty = true;
            _this._userNodes = [];
            // 粒子自动关闭depth写入
            _this.material.depthWrite = false;
            //##FilterBegin## ##Particle##
            _this.tag.name = "effect";
            _this.type = egret3d.IRender.TYPE_PARTICLE_EMIT;
            _this._data = data;
            _this._externalGeometry = data.property.geometry;
            _this.animation = _this._particleAnimation = new egret3d.ParticleAnimation(_this);
            _this.animation.particleAnimationController = _this._particleAnimation;
            _this._particleState = _this._particleAnimation.particleAnimationState;
            _this._generator = new egret3d.ParticleLifeGenerator();
            _this._particleAnimation.emit = _this;
            _this.buildParticle();
            _this.animation.isLoop = _this._data.life.loop;
            return _this;
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
        ParticleEmitter.prototype.trackPosition = function (fromCoords, endCoords) {
            if (this._trackPositionNode) {
                this.animation.animTime = 0.0;
                this._trackPositionNode.trackPosition(fromCoords, endCoords);
            }
        };
        Object.defineProperty(ParticleEmitter.prototype, "trackEndCoords", {
            /**
            * @language zh_CN
            * 返回上一次跟踪目标点的列表
            * @returns 粒子目标位置列表
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                if (this._trackPositionNode) {
                    return this._trackPositionNode.endCoords;
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParticleEmitter.prototype, "generator", {
            /**
            * @private
            */
            get: function () {
                return this._generator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParticleEmitter.prototype, "drawOrder", {
            /**
            * @language zh_CN
            * 渲染排序的参数，数值越大，先渲染。<p/>
            * 例如一个火焰的特效可能同时含有高亮部分和灰色烟雾部分，你可以通过修改它们这个数据强制让灰色烟雾部分获得优先绘制权。
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._data.property.sortingFudge;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @private
        * 添加子发射器
        */
        ParticleEmitter.prototype.addSubEmitter = function (phase, subEmitter) {
            //##FilterBegin## ##Particle##
            subEmitter.animation.stop();
            this._subEmitterNode.importSubEmitter(phase, subEmitter);
            //##FilterEnd##
        };
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
        ParticleEmitter.prototype.buildParticle = function () {
            //##FilterBegin## ##Particle##
            if (this._externalGeometry == null) {
                this._geometryShape = this.createPlane();
            }
            else {
                this._geometryShape = this._externalGeometry;
            }
            var mode = this._data.property.renderMode;
            if (mode == egret3d.ParticleRenderModeType.Billboard) {
                this.billboard = egret3d.BillboardType.STANDARD;
            }
            else if (mode == egret3d.ParticleRenderModeType.VerticalBillboard || mode == egret3d.ParticleRenderModeType.StretchedBillboard) {
                this.billboard = egret3d.BillboardType.Y_AXIS;
            }
            else {
                //ParticleRenderModeType.HorizontalBillboard
                //ParticleRenderModeType.Mesh
                this.billboard = egret3d.BillboardType.DISABLE;
            }
            this.initialize();
            this.initBoudBox(this._data.property.bounds);
            this._isEmitterDirty = false;
            //##FilterEnd##
        };
        /**
        * @language zh_CN
        * 根据粒子的配置信息，生成geometry
        * @returns Geometry
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleEmitter.prototype.createPlane = function () {
            var geo;
            //##FilterBegin## ##Particle##
            var geomData = this._data.geometry;
            var defaultAxis = egret3d.Vector3.Z_AXIS;
            var wCenter = true;
            var hCenter = true;
            if (this._data.property.renderMode == egret3d.ParticleRenderModeType.StretchedBillboard) {
                //需要偏移一半位置
                wCenter = false;
                hCenter = true;
            }
            geo = new egret3d.PlaneGeometry(geomData.planeW, geomData.planeH, 1, 1, 1, 1, defaultAxis, wCenter, hCenter);
            //##FilterEnd##
            return geo;
        };
        Object.defineProperty(ParticleEmitter.prototype, "data", {
            /**
            * @language zh_CN
            * 获取该粒子的描述数据
            * @returns ParticleData 初始化该粒子用到的数据。
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParticleEmitter.prototype, "timeNode", {
            /**
            * @language zh_CN
            * 获取时间节点
            * @returns ParticleTime 时间节点
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._timeNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParticleEmitter.prototype, "positionNode", {
            /**
            * @language zh_CN
            * 获取位置节点，该节点控制每个粒子单元的出生位置，并将数据写入顶点数据中。
            * @returns ParticlePosition 创建粒子单元出生位置的节点。
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._positionNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParticleEmitter.prototype, "followTarget", {
            /**
            * @language zh_CN
            * 获取跟随的目标，全局粒子可能会绑定有一个跟随的目标，获得该目标对象
            * @returns Object3D 跟随的目标
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._particleState.followTarget;
            },
            /**
            * @language zh_CN
            * 设置跟随的目标，如果设置了，粒子发射器会跟随目标
            * @param o 粒子发射器会跟随目标
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (o) {
                this._particleState.followTarget = o;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 给粒子发射器添加 粒子效果节点
        * @param node 粒子效果节点
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleEmitter.prototype.addAnimNode = function (node) {
            //##FilterBegin## ##Particle##
            var index = this._userNodes.indexOf(node);
            if (index == -1) {
                this._userNodes.push(node);
                this._isEmitterDirty = true;
            }
            //##FilterEnd##
        };
        /**
        * @language zh_CN
        * 移除粒子发射器上的效果节点
        * @param node 粒子效果节点
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleEmitter.prototype.removeAnimNode = function (node) {
            //##FilterBegin## ##Particle##
            var index = this._userNodes.indexOf(node);
            if (index != -1) {
                this._userNodes.slice(index);
                this._isEmitterDirty = true;
            }
            //##FilterEnd##
        };
        /**
        * @language zh_CN
        * 播放粒子，你可以之后使用stop函数暂停该特效的动画播放
        * @param speed 粒子播放速度
        * @param reset 是否重置到0位置
        * @param prewarm 是否预热
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleEmitter.prototype.play = function (speed, reset, prewarm) {
            if (speed === void 0) { speed = 1; }
            if (reset === void 0) { reset = false; }
            if (prewarm === void 0) { prewarm = false; }
            //##FilterBegin## ##Particle##
            this.animation.play("", speed, reset, prewarm);
            //##FilterEnd##
        };
        /**
        * @language zh_CN
        * 暂停播放粒子，你可以再次使用play函数继续该粒子特效播放。
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleEmitter.prototype.stop = function () {
            this.animation.stop();
        };
        /**
        * @private
        */
        ParticleEmitter.prototype.initialize = function () {
            //##FilterBegin## ##Particle##
            //clean
            this._particleAnimation.particleAnimationState.clean();
            this._generator.generator(this._data);
            var count = this._generator.planes.length;
            this.geometry = new egret3d.Geometry();
            this.geometry.buildDefaultSubGeometry();
            this.geometry.subGeometrys[0].count = count * this._geometryShape.indexCount;
            //根据 模型形状初始化 
            var vertexIndex = 0;
            var vertexArray = new Array();
            //根据 动画功能节点初始化 着色器 并初始化粒子顶点结构
            var vf = egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_UV0 | egret3d.VertexFormat.VF_COLOR | egret3d.VertexFormat.VF_NORMAL;
            this.geometry.vertexFormat = vf;
            //根据动画节点，预计算顶点信息，长度，字节总量
            this.initMainAnimNode();
            this.initUserAnimNode();
            this.initEndNode();
            this.geometry.vertexCount = count * this._geometryShape.vertexCount;
            this.geometry.indexCount = count * this._geometryShape.indexCount;
            this._geometryShape.getVertexForIndex(0, vf, vertexArray, this._geometryShape.vertexCount);
            for (var i = 0; i < count; ++i) {
                vertexIndex = i * this._geometryShape.vertexCount;
                this.geometry.setVerticesForIndex(vertexIndex, vf, vertexArray, this._geometryShape.vertexCount);
            }
            for (var i = 0; i < count; ++i) {
                for (var j = 0; j < this._geometryShape.indexArray.length; ++j) {
                    this.geometry.indexArray[i * this._geometryShape.indexArray.length + j] = this._geometryShape.indexArray[j] + i * this._geometryShape.vertexCount;
                }
            }
            //最后根据节点功能，填充模型
            this._particleAnimation.particleAnimationState.fill(this.geometry, count);
            //##FilterEnd##
        };
        /**
        * @private
        * 根据ParticleData中的数据初始化
        */
        ParticleEmitter.prototype.initMainAnimNode = function () {
            //##FilterBegin## ##Particle##
            var nodes = [];
            //time 
            this._timeNode = new egret3d.ParticleTime();
            this._timeNode.initNode(this._data.life);
            nodes.push(this._timeNode);
            //position
            this._positionNode = new egret3d.ParticlePosition();
            this._positionNode.initNode(this._data.shape, this._data.property);
            nodes.push(this._positionNode);
            //speed(依赖于position)
            var speedNode = new egret3d.ParticleVelocityNode();
            speedNode.initNode(this._data.moveSpeed);
            nodes.push(speedNode);
            //subEmitter
            this._subEmitterNode = new egret3d.ParticleSubEmitterNode();
            this._subEmitterNode.initNode(null, this);
            this._particleAnimation.particleAnimationState.addNode(this._subEmitterNode);
            //velocity
            var velocityOver = this._data.moveSpeed.velocityOver;
            if (velocityOver) {
                if (velocityOver.type == egret3d.ParticleValueType.Const || velocityOver.type == egret3d.ParticleValueType.RandomConst) {
                    var overConstNode = new egret3d.ParticleVelocityOverConstNode();
                    overConstNode.initNode(this._data.moveSpeed);
                    nodes.push(overConstNode);
                }
                else if (velocityOver.type == egret3d.ParticleValueType.OneBezier) {
                    var overOneBezierNode = new egret3d.ParticleVelocityOverOneBezierNode();
                    overOneBezierNode.initNode(this._data.moveSpeed);
                    nodes.push(overOneBezierNode);
                }
                else if (velocityOver.type == egret3d.ParticleValueType.TwoBezier) {
                    var overTwoBezierNode = new egret3d.ParticleVelocityOverTwoBezierNode();
                    overTwoBezierNode.initNode(this._data.moveSpeed);
                    nodes.push(overTwoBezierNode);
                }
            }
            var limit = this._data.moveSpeed.velocityLimit;
            if (limit) {
                if (limit.type == egret3d.ParticleValueType.Const || limit.type == egret3d.ParticleValueType.RandomConst) {
                    var limitConstNode = new egret3d.ParticleVelocityLimitConstNode();
                    limitConstNode.initNode(this._data.moveSpeed);
                    nodes.push(limitConstNode);
                }
                else if (limit.type == egret3d.ParticleValueType.OneBezier) {
                    var limitOneBezierNode = new egret3d.ParticleVelocityLimitOneBezierNode();
                    limitOneBezierNode.initNode(this._data.moveSpeed);
                    nodes.push(limitOneBezierNode);
                }
                else if (limit.type == egret3d.ParticleValueType.TwoBezier) {
                    var limitTwoBezierNode = new egret3d.ParticleVelocityLimitTwoBezierNode();
                    limitTwoBezierNode.initNode(this._data.moveSpeed);
                    nodes.push(limitTwoBezierNode);
                }
            }
            var velocityForce = this._data.moveSpeed.velocityForce;
            if (velocityForce) {
                if (velocityForce.type == egret3d.ParticleValueType.Const || velocityForce.type == egret3d.ParticleValueType.RandomConst) {
                    var forceConstNode = new egret3d.ParticleVelocityForceConstNode();
                    forceConstNode.initNode(this._data.moveSpeed);
                    nodes.push(forceConstNode);
                }
                else if (velocityForce.type == egret3d.ParticleValueType.OneBezier) {
                    var forceOneBezierNode = new egret3d.ParticleVelocityForceOneBezierNode();
                    forceOneBezierNode.initNode(this._data.moveSpeed);
                    nodes.push(forceOneBezierNode);
                }
                else if (velocityForce.type == egret3d.ParticleValueType.TwoBezier) {
                    var forceTwoBezierNode = new egret3d.ParticleVelocityForceTwoBezierNode();
                    forceTwoBezierNode.initNode(this._data.moveSpeed);
                    nodes.push(forceTwoBezierNode);
                }
            }
            //rotation
            var rotationNode = new egret3d.ParticleRotation();
            rotationNode.initNode(this._data.rotationBirth);
            nodes.push(rotationNode);
            //scale
            var scaleNode = new egret3d.ParticleScale();
            scaleNode.initNode(this._data.scaleBirth);
            nodes.push(scaleNode);
            var scaleSize = new egret3d.ParticleSizeGlobalNode();
            scaleSize.initNode(this._data.scaleSize);
            nodes.push(scaleSize);
            //start color
            var colorNode = new egret3d.ParticleStartColor();
            colorNode.initNode(this._data.property);
            nodes.push(colorNode);
            //follow
            if (this._data.followTarget) {
                var particleFollowNode = new egret3d.ParticleFollowNode();
                particleFollowNode.initNode(this._data.followTarget);
                nodes.push(particleFollowNode);
            }
            if (this._data.rotationSpeed) {
                if (this._data.rotationSpeed.rot3Axis) {
                    var rotateXYZConst = new egret3d.ParticleRotationXYZConstNode();
                    rotateXYZConst.initNode(this._data.rotationSpeed);
                    nodes.push(rotateXYZConst);
                }
                else {
                    if (this._data.rotationSpeed.type == egret3d.ParticleValueType.Const || this._data.rotationSpeed.type == egret3d.ParticleValueType.RandomConst) {
                        var rotateConst = new egret3d.ParticleRotationConstNode();
                        rotateConst.initNode(this._data.rotationSpeed);
                        nodes.push(rotateConst);
                    }
                    else if (this._data.rotationSpeed.type == egret3d.ParticleValueType.OneBezier) {
                        var rotateOneBezier = new egret3d.ParticleRotationOneBezierNode();
                        rotateOneBezier.initNode(this._data.rotationSpeed);
                        nodes.push(rotateOneBezier);
                    }
                    else if (this._data.rotationSpeed.type == egret3d.ParticleValueType.TwoBezier) {
                        var rotateTwoBezier = new egret3d.ParticleRotationTwoBezierNode();
                        rotateTwoBezier.initNode(this._data.rotationSpeed);
                        nodes.push(rotateTwoBezier);
                    }
                }
            }
            if (this._data.colorOffset) {
                var colorOffset = new egret3d.ParticleColorGlobalNode();
                colorOffset.initNode(this._data.colorOffset);
                nodes.push(colorOffset);
            }
            //materialData
            if (this._data.materialData) {
                //uvRoll
                var method;
                for (var _i = 0, _a = this._data.materialData.methods; _i < _a.length; _i++) {
                    method = _a[_i];
                    if (method.type == egret3d.UnitMatMethodData.methodType.lightmapMethod) {
                    }
                    else if (method.type == egret3d.UnitMatMethodData.methodType.uvRollMethod) {
                        var uvNode = new egret3d.ParticleUVRollNode();
                        uvNode.initNode(null, method);
                        nodes.push(uvNode);
                    }
                    else if (method.type == egret3d.UnitMatMethodData.methodType.alphaMaskMethod) {
                    }
                    else if (method.type == egret3d.UnitMatMethodData.methodType.streamerMethod) {
                    }
                }
            }
            //texture sheet
            if (this._data.textureSheet) {
                var textureSheet = new egret3d.ParticleTextureSheetNode();
                textureSheet.initNode(null, this._data.textureSheet);
                nodes.push(textureSheet);
            }
            //track
            if (this._data.property.trackPosition) {
                this._trackPositionNode = new egret3d.ParticleTrackPositionNode();
                this._trackPositionNode.initNode(null);
                nodes.push(this._trackPositionNode);
            }
            //
            for (var i = 0, count = nodes.length; i < count; i++) {
                this._particleAnimation.particleAnimationState.addNode(nodes[i]);
            }
            //##FilterEnd##
        };
        ParticleEmitter.prototype.initUserAnimNode = function () {
            //##FilterBegin## ##Particle##
            //加入自定义节点
            for (var i = 0; i < this._userNodes.length; i++) {
                this._particleAnimation.particleAnimationState.addNode(this._userNodes[i]);
            }
            //##FilterEnd##
        };
        ParticleEmitter.prototype.initEndNode = function () {
            //##FilterBegin## ##Particle##
            //永远是最后一个加入
            var endNode = new egret3d.ParticleEndNode();
            this._particleAnimation.particleAnimationState.addNode(endNode);
            //计算加入动画后，会获取的节点信息，重新计算 geometry 结构
            this._particleAnimation.particleAnimationState.calculate(this.geometry);
            //##FilterEnd##
        };
        /**
        * @language zh_CN
        * @private
        * 构建包围盒
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleEmitter.prototype.initBoudBox = function (vector) {
            //##FilterBegin## ##Particle##
            var b = new egret3d.BoundBox(this);
            b.fillBox(new egret3d.Vector3(-vector.x / 2, -vector.y / 2, -vector.z / 2), new egret3d.Vector3(vector.x / 2, vector.y / 2, vector.z / 2));
            this.bound = b;
            this.initAABB();
            //##FilterEnd##
        };
        Object.defineProperty(ParticleEmitter.prototype, "loopProgress", {
            /**
            * @language zh_CN
            * 循环完毕的次数，用于检测是否单个循环结束
            * @returns number 获得这个粒子播放的进度，0-1之间。如果该粒子有循环播放属性，获得的数据无效。
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                var p;
                //##FilterBegin## ##Particle##
                p = this.animation.animTime / (this.animation.loopTime * 1000);
                //##FilterEnd##
                return p;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleEmitter.prototype.update = function (time, delay, camera) {
            //##FilterBegin## ##Particle##
            if (this._isEmitterDirty) {
                this.buildParticle();
            }
            _super.prototype.update.call(this, time, delay, camera);
            //##FilterEnd##
        };
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleEmitter.prototype.copy = function (other) {
            _super.prototype.copy.call(this, other);
            var phaseList = [egret3d.ParticleDataSubEmitterPhase.BIRTH, egret3d.ParticleDataSubEmitterPhase.COLLISION, egret3d.ParticleDataSubEmitterPhase.DEATH];
            if (other._subEmitterNode) {
                for (var j = 0; j < phaseList.length; j++) {
                    var phase = phaseList[j];
                    var emitters = other._subEmitterNode.getSubEmitters(phase);
                    if (emitters && emitters.length > 0) {
                        for (var i = 0; i < emitters.length; i++) {
                            this.addSubEmitter(phase, emitters[i]);
                        }
                    }
                }
            }
        };
        /**
        * @language zh_CN
        * 克隆该粒子个粒子，播放信息需要外部去设置（Geometry为全新创建的，ParticleData和MaterialBase数据共享。）
        * @returns ParticleEmitter 克隆后的粒子特效
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleEmitter.prototype.clone = function () {
            var newParticle;
            //##FilterBegin## ##Particle##
            newParticle = new ParticleEmitter(this.data, this.material);
            newParticle.copy(this);
            //##FilterEnd##
            return newParticle;
        };
        /**
        * @language zh_CN
        * 释放所有数据（ParticleData和MaterialBase数据在这个释放过程中，仅仅是移除引用）
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleEmitter.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
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
        };
        return ParticleEmitter;
    }(egret3d.Mesh));
    egret3d.ParticleEmitter = ParticleEmitter;
    __reflect(ParticleEmitter.prototype, "egret3d.ParticleEmitter");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ParticleEmitter.js.map