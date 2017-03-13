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
    * @language zh_CN
    * @private
    * @class egret3d.ParticleSubEmitterNode
    * @classdesc
    * 粒子子发射器
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParticleSubEmitterNode = (function (_super) {
        __extends(ParticleSubEmitterNode, _super);
        function ParticleSubEmitterNode() {
            var _this = _super.call(this) || this;
            _this._empty = true;
            _this.bornTime = 0;
            _this.life = 0;
            _this.id = 0;
            _this.timeIndex = 0;
            _this.count = 0;
            _this.position = new egret3d.Vector3();
            _this._added = false;
            _this._orientation = new egret3d.Quaternion();
            _this._birthPhase = new ParticleSubEmitterNodePhase(egret3d.ParticleDataSubEmitterPhase.BIRTH);
            _this._collisionPhase = new ParticleSubEmitterNodePhase(egret3d.ParticleDataSubEmitterPhase.COLLISION);
            _this._deathPhase = new ParticleSubEmitterNodePhase(egret3d.ParticleDataSubEmitterPhase.DEATH);
            _this.name = "ParticleSubEmitterNode";
            return _this;
        }
        /**
        * @language zh_CN
        * 填充粒子属性
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleSubEmitterNode.prototype.initNode = function (data, parent) {
            if (parent === void 0) { parent = null; }
            this._parent = parent;
        };
        /**
        * @language zh_CN
        * 导入新的子粒子发射
        * @param subEmitter ParticleEmitter 子发射器
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleSubEmitterNode.prototype.importSubEmitter = function (phase, subEmitter) {
            var nodePhase;
            if (phase == egret3d.ParticleDataSubEmitterPhase.BIRTH) {
                nodePhase = this._birthPhase;
            }
            else if (phase == egret3d.ParticleDataSubEmitterPhase.COLLISION) {
                nodePhase = this._collisionPhase;
            }
            else if (phase == egret3d.ParticleDataSubEmitterPhase.DEATH) {
                nodePhase = this._deathPhase;
            }
            if (nodePhase) {
                this._empty = false;
                nodePhase.importSubEmitter(subEmitter);
            }
        };
        /**
        * @language zh_CN
        * 获取子粒子
        * @param phase 某个阶段的子粒子
        * @returns ParticleEmitter列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleSubEmitterNode.prototype.getSubEmitters = function (phase) {
            if (phase == egret3d.ParticleDataSubEmitterPhase.BIRTH) {
                return this._birthPhase.playing.getKeys();
            }
            else if (phase == egret3d.ParticleDataSubEmitterPhase.COLLISION) {
                return this._collisionPhase.playing.getKeys();
            }
            else if (phase == egret3d.ParticleDataSubEmitterPhase.DEATH) {
                return this._deathPhase.playing.getKeys();
            }
            return null;
        };
        /**
        * @language zh_CN
        * 填充顶点数据
        * @param geometry 网格数据
        * @param count 粒子数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleSubEmitterNode.prototype.build = function (geometry, count) {
            this.count = count;
            this._animationState = this.state;
            //先重置成-1，然后每帧检测每个粒子的上一帧的所属出身次数和下一帧的出身次数，判定是否要刷新他的初始位置
            this._lifeCircles = [];
            this.resetCircleData();
        };
        ParticleSubEmitterNode.prototype.resetCircleData = function () {
            for (var i = 0; i < this.count; i++) {
                this._lifeCircles[i] = -1;
            }
        };
        /**
        * @language zh_CN
        * @param animTime 动画当前时间（单位为ms）
        * @param delay  这一帧的时间跨度
        * @param geometry 几何对象
        * 判定是否需要发射子粒子
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleSubEmitterNode.prototype.update = function (animTime, delay, geometry) {
            if (this._empty)
                return;
            //回收已经可以结束的子特效
            this.recycleParticle();
            //卡顿了就不发射子粒子了
            this.ignoreEmit = delay > 25;
            //非循环的粒子生命周期达上限
            var particleData = this._animationState.emitter.data;
            var loop = particleData.life.loop;
            var maxLife = this._animationState.modTime + particleData.life.duration + particleData.life.delay;
            if (!loop && (animTime * 0.001 >= maxLife)) {
                return;
            }
            //animTime += delay;
            var index = 0;
            var vertices = geometry.vertexCount / this.count;
            var particleIndex = 0;
            var positionOffsetIndex = this._animationState.emitter.positionNode.offsetIndex;
            var timeOffsetIndex = this._animationState.emitter.timeNode.offsetIndex;
            var particleTime = animTime * 0.001 - particleData.life.delay;
            var verticesData = geometry.sharedVertexBuffer ? geometry.sharedVertexBuffer.arrayBuffer : geometry.vertexArray;
            //没有跟随对象，使用自己
            var followTarget = this._animationState.followTarget || this._animationState.emitter;
            for (var i = 0; i < this.count; ++i) {
                particleIndex = i * vertices;
                this.timeIndex = particleIndex * geometry.vertexAttLength + timeOffsetIndex;
                this.bornTime = verticesData[this.timeIndex + 0]; //出生时间
                this.life = verticesData[this.timeIndex + 1]; //单次生命周期时间
                //this.id = array32[this.timeIndex + 2];                //下标(i)
                var curCircleIndex = -1;
                if (particleTime >= this.bornTime) {
                    //粒子超时了，并且不需要继续循环
                    if (particleTime > (this.bornTime + this.life) && !loop)
                        continue;
                    curCircleIndex = Math.floor((particleTime - this.bornTime) / this._animationState.modTime);
                    if (curCircleIndex != this._lifeCircles[i]) {
                        //不发射
                        this._lifeCircles[i] = curCircleIndex;
                        if (this.ignoreEmit) {
                            continue;
                        }
                        index = particleIndex * geometry.vertexAttLength + positionOffsetIndex;
                        //position
                        this.position.x = verticesData[index + 0];
                        this.position.y = verticesData[index + 1];
                        this.position.z = verticesData[index + 2];
                        this.emitParticleAtPhase(this._birthPhase, this.position);
                    }
                }
            }
        };
        ParticleSubEmitterNode.prototype.emitParticleAtPhase = function (phase, pos) {
            var bakEmitter;
            var bakEmitters = phase.playing.getKeys();
            var playingArr;
            var recycleArr;
            var newParticle;
            this._orientation.copyFrom(this._parent.orientation);
            this._orientation.w *= -1;
            for (var i = 0, count = bakEmitters.length; i < count; i++) {
                bakEmitter = bakEmitters[i];
                recycleArr = phase.recycle.getValueByKey(bakEmitter);
                playingArr = phase.playing.getValueByKey(bakEmitter);
                newParticle = recycleArr.shift();
                if (newParticle == null) {
                    newParticle = new egret3d.ParticleEmitter(bakEmitter.data, bakEmitter.material);
                }
                playingArr.push(newParticle);
                newParticle.play(1.0, true, bakEmitter.data.property.prewarm);
                newParticle.position = pos;
                newParticle.orientation = this._orientation;
                this._parent.addChild(newParticle);
            }
        };
        ParticleSubEmitterNode.prototype.recycleParticle = function () {
            this.recycleParticleAtPhase(this._birthPhase);
            this.recycleParticleAtPhase(this._collisionPhase);
            this.recycleParticleAtPhase(this._deathPhase);
        };
        ParticleSubEmitterNode.prototype.recycleParticleAtPhase = function (phaseNode) {
            var bakEmiter;
            var playingArr;
            var recycleArr;
            var tempParticle;
            var j;
            var jCount;
            var bakEmitters = phaseNode.playing.getKeys();
            for (var i = 0, count = bakEmitters.length; i < count; i++) {
                bakEmiter = bakEmitters[i];
                playingArr = phaseNode.playing.getValueByKey(bakEmiter);
                recycleArr = phaseNode.recycle.getValueByKey(bakEmiter);
                for (j = playingArr.length - 1; j >= 0; j--) {
                    tempParticle = playingArr[j];
                    if (tempParticle.loopProgress > 1) {
                        playingArr.splice(j, 1);
                        tempParticle.stop();
                        this._parent.removeChild(tempParticle);
                        recycleArr.push(tempParticle);
                    }
                }
            }
        };
        /**
        * @private
        */
        ParticleSubEmitterNode.prototype.activeState = function (time, animTime, delay, animDelay, usage, geometry, context3DProxy) {
        };
        /**
        * @private
        */
        ParticleSubEmitterNode.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._animationState = null;
            this._birthPhase && this._birthPhase.dispose();
            this._birthPhase = null;
            this._collisionPhase && this._collisionPhase.dispose();
            this._collisionPhase = null;
            this._deathPhase && this._deathPhase.dispose();
            this._deathPhase = null;
            this._lifeCircles = null;
            this._orientation = null;
            this._parent = null;
        };
        return ParticleSubEmitterNode;
    }(egret3d.AnimationNode));
    egret3d.ParticleSubEmitterNode = ParticleSubEmitterNode;
    __reflect(ParticleSubEmitterNode.prototype, "egret3d.ParticleSubEmitterNode");
    /**
    * @language zh_CN
    * @private
    * @class egret3d.ParticleSubEmitterNodePhase
    * @classdesc
    * 用于子粒子的回收
    * @see egret3d.DoubleArray
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParticleSubEmitterNodePhase = (function () {
        function ParticleSubEmitterNodePhase(phase) {
            this.playing = new egret3d.DoubleArray();
            this.recycle = new egret3d.DoubleArray();
            this._phase = phase;
        }
        /**
        * @private
        */
        ParticleSubEmitterNodePhase.prototype.importSubEmitter = function (subEmitter) {
            if (this.playing.getKeys().indexOf(subEmitter) >= 0)
                return;
            this.playing.put(subEmitter, []);
            this.recycle.put(subEmitter, []);
        };
        /**
        * @private
        */
        ParticleSubEmitterNodePhase.prototype.dispose = function () {
            var emitter;
            for (var _i = 0, _a = this.playing.getValues(); _i < _a.length; _i++) {
                emitter = _a[_i];
                emitter.dispose();
            }
            for (var _b = 0, _c = this.recycle.getValues(); _b < _c.length; _b++) {
                emitter = _c[_b];
                emitter.dispose();
            }
            this.playing.clear();
            this.recycle.clear();
            this.playing = this.recycle = null;
        };
        return ParticleSubEmitterNodePhase;
    }());
    egret3d.ParticleSubEmitterNodePhase = ParticleSubEmitterNodePhase;
    __reflect(ParticleSubEmitterNodePhase.prototype, "egret3d.ParticleSubEmitterNodePhase");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ParticleSubEmitterNode.js.map