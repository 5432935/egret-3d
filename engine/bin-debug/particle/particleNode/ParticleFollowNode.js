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
    * @class egret3d.ParticleFollowNode
    * @classdesc
    * 粒子跟随效果节点
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParticleFollowNode = (function (_super) {
        __extends(ParticleFollowNode, _super);
        //##FilterEnd##
        function ParticleFollowNode() {
            var _this = _super.call(this) || this;
            _this._count = 0;
            _this._followRotation = false;
            _this._followScale = false;
            _this.bornTime = 0;
            _this.life = 0;
            _this.id = 0;
            _this.timeIndex = 0;
            /**
            * @language zh_CN
            * 顶点数据是否需要重新upload
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this._verticesDataDirty = false;
            //##FilterBegin## ##Particle##
            _this.name = "ParticleFollowNode";
            _this.importShader(true, egret3d.ShaderPhaseType.global_vertex, "particle_follow_vs");
            _this.attribute_followPosition = new egret3d.GLSL.VarRegister();
            _this.attribute_followPosition.name = "attribute_followPosition";
            _this.attribute_followPosition.size = 3;
            _this.attributes.push(_this.attribute_followPosition);
            _this.attribute_followRotation = new egret3d.GLSL.VarRegister();
            _this.attribute_followRotation.name = "attribute_followRotation";
            _this.attribute_followRotation.size = 4;
            _this.attributes.push(_this.attribute_followRotation);
            _this.attribute_followScale = new egret3d.GLSL.VarRegister();
            _this.attribute_followScale.name = "attribute_followScale";
            _this.attribute_followScale.size = 3;
            _this.attributes.push(_this.attribute_followScale);
            return _this;
            //##FilterEnd##
        }
        /**
        * @language zh_CN
        * 填充粒子跟随属性
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleFollowNode.prototype.initNode = function (data) {
            //##FilterBegin## ##Particle##
            var node = data;
            this._followScale = node.followScale;
            this._followRotation = node.followRotation;
            //##FilterEnd##
        };
        /**
        * @private
        * 强制更新了时间之后，follow数据需要更新
        */
        ParticleFollowNode.prototype.onAnimTimeChange = function () {
            _super.prototype.onAnimTimeChange.call(this);
            this.resetCircleData();
        };
        /**
        * @language zh_CN
        * 填充顶点数据
        * @param geometry 网格数据
        * @param count 粒子数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleFollowNode.prototype.build = function (geometry, count) {
            //##FilterBegin## ##Particle##
            this._count = count;
            this._animationState = this.state;
            //先重置成-1，然后每帧检测每个粒子的上一帧的所属出身次数和下一帧的出身次数，判定是否要刷新他的初始位置
            this._lifeCircles = [];
            this.resetCircleData();
            //##FilterEnd##
        };
        ParticleFollowNode.prototype.resetCircleData = function () {
            for (var i = 0; i < this._count; i++) {
                this._lifeCircles[i] = -1;
            }
        };
        /**
        * @language zh_CN
        * @param animTime 动画当前时间（单位为ms）
        * @param delay  这一帧的时间跨度
        * @param geometry 几何对象
        * 顶点数据是否需要重新upload
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleFollowNode.prototype.update = function (animTime, delay, geometry) {
            //##FilterBegin## ##Particle##
            //保留原来的geometryDirty为true的属性
            this._verticesDataDirty = this._verticesDataDirty;
            //非循环的粒子生命周期达上限
            var particleData = this._animationState.emitter.data;
            var loop = particleData.life.loop;
            var maxLife = this._animationState.modTime + particleData.life.duration + particleData.life.delay;
            if (!loop && (animTime * 0.001 >= maxLife)) {
                return;
            }
            //animTime += delay;
            var index = 0;
            var vertices = geometry.vertexCount / this._count;
            var particleIndex = 0;
            var changed = false;
            var timeOffsetIndex = this._animationState.emitter.timeNode.offsetIndex;
            var particleTime = animTime * 0.001 - particleData.life.delay;
            var verticesData = geometry.sharedVertexBuffer ? geometry.sharedVertexBuffer.arrayBuffer : geometry.vertexArray;
            //没有跟随对象，使用自己
            var followTarget = this._animationState.followTarget || this._animationState.emitter;
            for (var i = 0; i < this._count; ++i) {
                particleIndex = i * vertices;
                this.timeIndex = particleIndex * geometry.vertexAttLength + timeOffsetIndex;
                this.bornTime = verticesData[this.timeIndex + 0]; //出生时间
                this.life = verticesData[this.timeIndex + 1]; //单次生命周期时间
                //this.id = verticesData[this.timeIndex + 2];                //下标(i)
                var curCircleIndex = -1;
                if (particleTime >= this.bornTime) {
                    //粒子超时了，并且不需要继续循环
                    if (particleTime > (this.bornTime + this.life) && !loop)
                        continue;
                    curCircleIndex = Math.floor((particleTime - this.bornTime) / this._animationState.modTime);
                    //
                    if (((particleTime - this.bornTime) % this._animationState.modTime) > this.life) {
                        continue;
                    }
                    if (curCircleIndex != this._lifeCircles[i]) {
                        this._lifeCircles[i] = curCircleIndex;
                        changed = true;
                        for (var j = 0; j < vertices; ++j) {
                            //position
                            index = particleIndex + j;
                            index = index * geometry.vertexAttLength + this.attribute_followPosition.offsetIndex;
                            if (true) {
                                verticesData[index + 0] = followTarget.globalPosition.x;
                                verticesData[index + 1] = followTarget.globalPosition.y;
                                verticesData[index + 2] = followTarget.globalPosition.z;
                            }
                            //rotation
                            index = particleIndex + j;
                            index = index * geometry.vertexAttLength + this.attribute_followRotation.offsetIndex;
                            if (this._followRotation) {
                                verticesData[index + 0] = followTarget.globalOrientation.x;
                                verticesData[index + 1] = followTarget.globalOrientation.y;
                                verticesData[index + 2] = followTarget.globalOrientation.z;
                                verticesData[index + 3] = followTarget.globalOrientation.w;
                            }
                            else {
                                verticesData[index + 0] = 0;
                                verticesData[index + 1] = 0;
                                verticesData[index + 2] = 0;
                                verticesData[index + 3] = 0;
                            }
                            //scale
                            index = particleIndex + j;
                            index = index * geometry.vertexAttLength + this.attribute_followScale.offsetIndex;
                            if (this._followScale) {
                                verticesData[index + 0] = followTarget.globalScaleX;
                                verticesData[index + 1] = followTarget.globalScaleY;
                                verticesData[index + 2] = followTarget.globalScaleZ;
                            }
                            else {
                                verticesData[index + 0] = 0;
                                verticesData[index + 1] = 0;
                                verticesData[index + 2] = 0;
                            }
                        }
                    }
                }
            }
            this._verticesDataDirty = changed;
            //##FilterEnd##
        };
        /**
        * @private
        */
        ParticleFollowNode.prototype.activeState = function (time, animTime, delay, animDelay, usage, geometry, context3DProxy) {
            //##FilterBegin## ##Particle##
            if (this._verticesDataDirty) {
                geometry.geometry.upload(context3DProxy);
                this._verticesDataDirty = false;
            }
            //##FilterEnd##
        };
        /**
        * @private
        */
        ParticleFollowNode.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._animationState = null;
            this._lifeCircles = null;
        };
        return ParticleFollowNode;
    }(egret3d.AnimationNode));
    egret3d.ParticleFollowNode = ParticleFollowNode;
    __reflect(ParticleFollowNode.prototype, "egret3d.ParticleFollowNode");
})(egret3d || (egret3d = {}));
