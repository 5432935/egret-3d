var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @class egret3d.SkeletonAnimationState
    * @classdesc
    * 骨骼动画状态机对象
    * 处理骨骼动画的状态切换
    * @see egret3d.IAnimationState
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    var SkeletonAnimationState = (function () {
        /**
        * @language zh_CN
        * 构造函数
        * 创建一个骨骼动画状态机对象
        * @param name 状态名字
        * @version Egret 3.0
        * @platform Web,Native
        */
        function SkeletonAnimationState() {
            this._canTransitionToSelf = false;
            this._atomic = true;
            this._time = 0;
            this._weight = 0;
            /**
            * @language zh_CN
            * @private
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.gpuSkeletonPose = null;
            /**
            * @language zh_CN
            * @private
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.currentAnimName = "";
            /**
            * @language zh_CN
            * @private
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.nextAnimName = "";
            this._reset = false;
            this._offset = 0;
            this._defaultFade = new egret3d.CrossFadeNode;
            this._animState = {};
        }
        /*
        * @private
        */
        SkeletonAnimationState.prototype.addCrossFadeNode = function (fade) {
            if (fade)
                this._crossFade = this._crossFade || new egret3d.CrossFade();
            this._crossFade.addCrossFadeNode(fade);
        };
        /**
        * @language zh_CN
        * 添加 SkeletonAnimationClip 对象
        * @param animationClip 添加的动画剪辑对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        SkeletonAnimationState.prototype.addAnimClip = function (clip) {
            if (clip.animationName) {
                var animState = new egret3d.AnimClipState(clip);
                animState.animation = this.animation;
                this._animState[clip.animationName] = animState;
                this._currentState = animState;
            }
        };
        Object.defineProperty(SkeletonAnimationState.prototype, "animClip", {
            /*
            * @private
            */
            get: function () {
                return this._animState;
            },
            enumerable: true,
            configurable: true
        });
        /*
        * @private
        */
        SkeletonAnimationState.prototype.getCurrentState = function () {
            return this._currentState;
        };
        /**
        * @language zh_CN
        * 播放骨骼动画
        * @param name 动画名称
        * @param speed 播放速度
        * @param reset 是否重置
        * @version Egret 3.0
        * @platform Web,Native
        */
        SkeletonAnimationState.prototype.play = function (name, speed, reset) {
            if (reset === void 0) { reset = false; }
            if (this.currentAnimName == name && !reset)
                return;
            //let gpuSkeletonPose = this.gpuSkeletonPose;
            var currentCrossFadeNode = this._currentCrossFadeNode;
            var a; //= this._currentCrossFadeNode.crossA_state;
            var b; // this._currentCrossFadeNode.crossB_state;
            var defaultFade = this._defaultFade; // this._currentCrossFadeNode.crossB_state;
            this._currentCrossFadeNode = null;
            if (this._crossFade) {
                this._currentCrossFadeNode = this._crossFade.checkCrossFade(this.currentAnimName, name, this._animState);
            }
            if (!this._currentCrossFadeNode && !reset) {
                a = this._animState[this.currentAnimName];
                b = this._animState[name];
                if (a && b) {
                    this._currentCrossFadeNode = defaultFade;
                    defaultFade.crossA = this.currentAnimName;
                    defaultFade.crossB = name;
                    defaultFade.crossA_state = a;
                    defaultFade.crossB_state = b;
                    var defaultMixTime = 300;
                    defaultFade.blend_startFrame = Math.floor((a.totalTime - defaultMixTime) / a.clip.frameRate);
                    defaultFade.blend_endFrame = a.totalFrame;
                    defaultFade.crossB_startFrame = defaultFade.blend_startFrame;
                    defaultFade.blendTime = defaultMixTime;
                    defaultFade.blendStartTime = defaultFade.blend_startFrame * a.clip.frameRate;
                    defaultFade.totalTime = defaultFade.blendStartTime + b.totalTime;
                }
            }
            this.currentAnimName = name;
            if (this._animState[name]) {
                this._currentState = this._animState[name];
                this._currentState.speed = speed;
            }
            else {
                return;
            }
            this._reset = true;
            //-------初始化
            if (!this.gpuSkeletonPose) {
                this.gpuSkeletonPose = new egret3d.SkeletonPose();
                this.gpuSkeletonPose.initSkeletonPose(this._animState[name].clip.getSkeletonPose(0), this.gpuSkeletonPose);
            }
            if (egret3d.Egret3DPolicy.useAnimMixInterpolation && !this._lerpAPose) {
                this._lerpAPose = new egret3d.SkeletonPose();
                this.gpuSkeletonPose.initSkeletonPose(this._animState[name].clip.getSkeletonPose(0), this._lerpAPose);
            }
            if (egret3d.Egret3DPolicy.useAnimMixInterpolation && !this._lerpBPose) {
                this._lerpBPose = new egret3d.SkeletonPose();
                this.gpuSkeletonPose.initSkeletonPose(this._animState[name].clip.getSkeletonPose(0), this._lerpBPose);
            }
        };
        //先算出交换动作后的时间起始点
        //获取融合时间轴上的 指定时间的 a clip
        //获取融合时间轴上的 指定时间的 b clip
        //计算 A/B 的融合
        //获取最终的clip
        /*
        * @private
        */
        SkeletonAnimationState.prototype.update = function (time, delay) {
            if (this._reset) {
                this._reset = false;
                this._offset = time;
                this._currentState.reset(time);
            }
            if (egret3d.Egret3DPolicy.useAnimMixInterpolation && this._currentCrossFadeNode) {
                this.mixUpdate(time, delay);
            }
            else {
                if (this._currentState) {
                    this._currentState.update(delay, this.gpuSkeletonPose);
                }
            }
            if (this.bindList) {
                for (var node in this.bindList) {
                    var joint = this.gpuSkeletonPose.jointsDictionary[node];
                    joint.copyTo(this.bindList[node].node, this.bindList[node].type);
                }
            }
        };
        SkeletonAnimationState.prototype.mixUpdate = function (time, delay) {
            var _lerpAPose = this._lerpAPose;
            var _lerpBPose = this._lerpBPose;
            var gpuSkeletonPose = this.gpuSkeletonPose;
            var currentCrossFadeNode = this._currentCrossFadeNode;
            var a = currentCrossFadeNode.crossA_state || this._animState[currentCrossFadeNode.crossA];
            var b = currentCrossFadeNode.crossB_state || this._animState[currentCrossFadeNode.crossB];
            var hasA = false;
            var hasB = false;
            var mix = false;
            this._time = time - this._offset + currentCrossFadeNode.blendStartTime;
            if (this._time <= currentCrossFadeNode.totalTime) {
                //动作A 部分
                if (this._time < (currentCrossFadeNode.blendStartTime + currentCrossFadeNode.blendTime)) {
                    hasA = true;
                }
                //动作B 部分
                if (this._time >= currentCrossFadeNode.crossB_startFrame * 33 && this._time <= currentCrossFadeNode.crossB_startFrame * 33 + b.totalTime) {
                    hasB = true;
                }
                //融合部分
                if (this._time <= (currentCrossFadeNode.blendStartTime + currentCrossFadeNode.blendTime)) {
                    mix = true;
                }
                if (mix) {
                    this._weight = (this._time - currentCrossFadeNode.blendStartTime) / currentCrossFadeNode.blendTime;
                    if (this._weight > 1) {
                        this._weight = 1;
                    }
                    a.update(delay, _lerpAPose);
                    b.update(delay, _lerpBPose);
                    gpuSkeletonPose.mixAnim(_lerpAPose, _lerpBPose, this._weight, gpuSkeletonPose);
                }
                else {
                    if (hasA && !hasB) {
                        a.update(delay, gpuSkeletonPose);
                    }
                    else if (hasB && !hasA) {
                        b.update(delay, gpuSkeletonPose);
                    }
                }
            }
            else {
                if (this._crossFade) {
                    this.play(this._crossFade.getNextAnim(), 1);
                }
                this._currentCrossFadeNode = null;
            }
        };
        /*
        * @private
        */
        SkeletonAnimationState.prototype.clone = function () {
            var animationState = new SkeletonAnimationState();
            var animState;
            for (var n in this._animState) {
                animationState.addAnimClip(this._animState[n].clip);
            }
            animationState._crossFade = this._crossFade;
            return animationState;
        };
        return SkeletonAnimationState;
    }());
    egret3d.SkeletonAnimationState = SkeletonAnimationState;
    __reflect(SkeletonAnimationState.prototype, "egret3d.SkeletonAnimationState");
})(egret3d || (egret3d = {}));
