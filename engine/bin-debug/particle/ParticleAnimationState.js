var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @language zh_CN
     * @class egret3d.ParticleAnimationState
     * @classdesc
     * 粒子动画状态机，继承自IAnimationState。ParticleEmitter会自动创建该对象，不建议使用者在外部自行创建该对象。
     * 该类主要用于维护粒子的顶点数据/shader拼装/辅助初始化Geometry对象；负责在每次update时更新每个节点，和绘制前的基础数据上传工作。
     * @see egret3d.IAnimationState
     * @see egret3d.AnimationNode
     * @see egret3d.Geometry
     * @see egret3d.ParticleData
     * @see egret3d.ParticleAnimation
     * @version Egret 3.0
     * @platform Web,Native
     */
    var ParticleAnimationState = (function () {
        /**
        * @language zh_CN
        * 构造函数，随着ParticleEmitter的初始化，会创建该ParticleAnimationState对象
        * @param name 粒子动画状态名
        * @param emitter 当前粒子动画主体部分
        * @version Egret 3.0
        * @platform Web,Native
        */
        function ParticleAnimationState(name, emitter) {
            /**
            * @language zh_CN
            * 新增顶点个数总量
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.numberOfVertices = 0;
            /**
            * @language zh_CN
            * 新增顶点的长度
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.vertexSizeInBytes = 0;
            /**
            * @language zh_CN
            * 动画状态机顶点着色器文件名列表
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.vertex_shaders = {};
            /**
            * @language zh_CN
            * 动画状态机片段着色器文件名列表
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.fragment_shaders = {};
            /**
            * @language zh_CN
            * 对于每个面片而言周期时间
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.modTime = 0;
            /**
            * @language zh_CN
            * 是否反转 1.0是反转 0.0是不反转
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.reverse = 1.0; //0.0/1.0
            /**
            * @language zh_CN
            * 跟随的目标，在被使用的情况下，新出生的粒子会使用这个对象的旋转和位置信息。
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.followTarget = null;
            this._particleProperty = new Float32Array(27);
            this._emitter = emitter;
            this.name = name;
            this.animNodes = [];
            this.keyFrames = [];
        }
        Object.defineProperty(ParticleAnimationState.prototype, "emitter", {
            /**
           * @language zh_CN
           * 获取发射器
           * @returns ParticleEmitter
           * @version Egret 3.0
           * @platform Web,Native
           */
            get: function () {
                return this._emitter;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 添加动画功能节点
        * 添加继承 animNodeBase 功能节点 例如粒子的 加速度功能节点，匀速功能节点
        * @param node 节点对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleAnimationState.prototype.addNode = function (node) {
            node.state = this;
            this.animNodes.push(node);
        };
        /**
        * @language zh_CN
        * 移除动画功能节点
        * 删除指定的动画功能节点，但是不能动态删除，需要进行 功能重置
        * @param node 节点对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleAnimationState.prototype.removeNode = function (node) {
            var index = this.animNodes.indexOf(node);
            if (index != -1)
                this.animNodes.splice(index, 1);
        };
        /**
        * @private
        * 强制更新了时间之后，follow数据需要更新
        */
        ParticleAnimationState.prototype.onAnimTimeChange = function () {
            var node;
            for (var i = 0, count = this.animNodes.length; i < count; i++) {
                this.animNodes[i].onAnimTimeChange();
            }
        };
        /**
       * @language zh_CN
       * 清空分配好的动画节点
       * @version Egret 3.0
       * @platform Web,Native
       */
        ParticleAnimationState.prototype.clean = function () {
            this.animNodes.length = 0;
        };
        ParticleAnimationState.prototype.addShaderPhase = function (sourcePhase, targetPhase) {
            //##FilterBegin## ##Particle##
            var names;
            var phase;
            for (phase in sourcePhase) {
                names = sourcePhase[phase];
                for (var i = 0; i < names.length; i++) {
                    targetPhase[phase] = targetPhase[phase] || [];
                    targetPhase[phase].push(names[i]);
                }
            }
            //##FilterEnd##
        };
        /**
        * @private
        * @language zh_CN
        * 计算节点
        */
        ParticleAnimationState.prototype.calculate = function (geometry) {
            //##FilterBegin## ##Particle##
            for (var i = 0; i < this.animNodes.length; i++) {
                this.addShaderPhase(this.animNodes[i].vertex_ShaderName, this.vertex_shaders);
                this.addShaderPhase(this.animNodes[i].fragment_ShaderName, this.fragment_shaders);
                var offsetIndex = geometry.vertexAttLength;
                for (var j = 0; j < this.animNodes[i].attributes.length; ++j) {
                    if (this.animNodes[i].attributes[j].size > 0) {
                        this.animNodes[i].attributes[j].offsetIndex = offsetIndex;
                        geometry.vertexAttLength += this.animNodes[i].attributes[j].size;
                        geometry.vertexSizeInBytes += this.animNodes[i].attributes[j].size * 4;
                        geometry.subGeometrys[0].preAttList.push(this.animNodes[i].attributes[j]);
                    }
                    offsetIndex = geometry.vertexAttLength;
                }
            }
            //##FilterEnd##
        };
        /**
        * @private
        * @language zh_CN
        */
        ParticleAnimationState.prototype.fill = function (geometry, maxParticle) {
            //##FilterBegin## ##Particle##
            for (var i = 0; i < this.animNodes.length; i++) {
                this.animNodes[i].build(geometry, maxParticle);
            }
            for (var i = 0; i < this.animNodes.length; i++) {
                this.animNodes[i].afterBuild();
            }
            //##FilterEnd##
        };
        /**
        * @private
        * @language zh_CN
        */
        ParticleAnimationState.prototype.update = function (animTime, delay, geometry) {
            //##FilterBegin## ##Particle##
            for (var i = 0; i < this.animNodes.length; i++) {
                this.animNodes[i].update(animTime, delay, geometry);
            }
            //##FilterEnd##
        };
        /**
        * @language zh_CN
        * @private
        */
        ParticleAnimationState.prototype.activeState = function (time, animTime, delay, animDelay, usage, geometry, context3DProxy, camera3D) {
            //##FilterBegin## ##Particle##
            var scaleData;
            var rotateData;
            var positionData;
            var data = this._emitter.data;
            if (data.followTarget && this._emitter.followTarget) {
                scaleData = this._emitter.followTarget.globalScale;
                rotateData = this._emitter.followTarget.globalOrientation;
                positionData = this._emitter.followTarget.globalPosition;
            }
            else {
                scaleData = this._emitter.globalScale;
                rotateData = this._emitter.globalOrientation;
                positionData = this._emitter.globalPosition;
            }
            var multiAlpha = this._emitter.material.materialData.blendMode == egret3d.BlendMode.ALPHA;
            //
            this._particleProperty[0] = animTime * 0.001;
            this._particleProperty[1] = data.life.loop ? 1 : 0;
            this._particleProperty[2] = data.followTarget ? 1 : 0;
            this._particleProperty[3] = scaleData.x;
            this._particleProperty[4] = scaleData.y;
            this._particleProperty[5] = scaleData.z;
            this._particleProperty[6] = rotateData.x;
            this._particleProperty[7] = rotateData.y;
            this._particleProperty[8] = rotateData.z;
            this._particleProperty[9] = rotateData.w;
            this._particleProperty[10] = positionData.x;
            this._particleProperty[11] = positionData.y;
            this._particleProperty[12] = positionData.z;
            this._particleProperty[13] = this.modTime;
            this._particleProperty[14] = data.life.delay;
            this._particleProperty[15] = data.life.duration;
            this._particleProperty[16] = data.property.gravity;
            this._particleProperty[17] = (data.moveSpeed.velocityOver && data.moveSpeed.velocityOver.worldSpace) ? 1 : 0;
            this._particleProperty[18] = (data.moveSpeed.velocityForce && data.moveSpeed.velocityForce.worldSpace) ? 1 : 0;
            this._particleProperty[19] = data.moveSpeed.velocityLimit ? data.moveSpeed.velocityLimit.dampen : 0;
            this._particleProperty[20] = data.property.cameraScale;
            this._particleProperty[21] = data.property.speedScale;
            this._particleProperty[22] = data.property.lengthScale;
            this._particleProperty[23] = data.property.renderMode;
            this._particleProperty[24] = data.property.stayAtEnd ? 1 : 0;
            this._particleProperty[25] = multiAlpha ? 1 : 0;
            this._particleProperty[26] = data.shape.type;
            context3DProxy.uniform1fv(usage["uniform_particleState"].uniformIndex, this._particleProperty);
            for (var i = 0; i < this.animNodes.length; i++) {
                this.animNodes[i].activeState(time, animTime, delay, animDelay, usage, geometry, context3DProxy);
            }
            //##FilterEnd##
        };
        /**
        * @language zh_CN
        * 释放所有数据，销毁该对象的内部属性
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleAnimationState.prototype.dispose = function () {
            var node;
            for (var _i = 0, _a = this.animNodes; _i < _a.length; _i++) {
                node = _a[_i];
                node.dispose();
            }
            this.animNodes.length = 0;
            this.animNodes = null;
            this.keyFrames.length = 0;
            this.keyFrames = null;
        };
        return ParticleAnimationState;
    }());
    egret3d.ParticleAnimationState = ParticleAnimationState;
    __reflect(ParticleAnimationState.prototype, "egret3d.ParticleAnimationState", ["egret3d.IAnimationState"]);
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ParticleAnimationState.js.map