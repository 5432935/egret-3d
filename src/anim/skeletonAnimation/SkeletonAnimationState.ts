module egret3d {




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
    export class SkeletonAnimationState {

    
        private _animState: { [key: string]: AnimClipState };

        private _canTransitionToSelf: boolean = false;

        private _atomic: boolean = true;

        private _crossFade: CrossFade;

        private _time: number = 0;

        private _weight: number = 0;

        private _currentCrossFadeNode: CrossFadeNode;

        private _currentState: AnimClipState;

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public gpuSkeletonPose: SkeletonPose = null;

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public currentAnimName: string = "";

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public nextAnimName: string = "";

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bindList: { [nodeName: string]: { type: BindAnimType, node: Object3D } };

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public animation: SkeletonAnimation;



        /**
        * @language zh_CN
        * 构造函数
        * 创建一个骨骼动画状态机对象
        * @param name 状态名字
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            this._animState = {};
        }

        /*
        * @private
        */
        public addCrossFadeNode(fade: CrossFadeNode) {
            if (fade)
                this._crossFade = this._crossFade || new CrossFade();
            this._crossFade.addCrossFadeNode(fade);
        }

        /**
        * @language zh_CN
        * 添加 SkeletonAnimationClip 对象
        * @param animationClip 添加的动画剪辑对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addAnimClip(clip: SkeletonAnimationClip): void {
            if (clip.animationName) {
                var animState: AnimClipState = new AnimClipState(clip);
                animState.animation = this.animation;
                this._animState[clip.animationName] = animState;
                this._currentState = animState;
            }
        }

        /*
        * @private
        */
        public get animClip(): { [key: string]: AnimClipState } {
            return this._animState;
        }

        /*
        * @private
        */
        public getCurrentState(): AnimClipState {
            return this._currentState;
        }


        private _reset: boolean = false;
        private _offset: number = 0;
        private _defaultFade: CrossFadeNode = new CrossFadeNode;

        /**
        * @language zh_CN
        * 播放骨骼动画
        * @param name 动画名称
        * @param speed 播放速度
        * @param reset 是否重置
        * @version Egret 3.0
        * @platform Web,Native
        */
        public play(name: string, speed?: number, reset: boolean = false) {
            if (this.currentAnimName == name && !reset) return;

            //let gpuSkeletonPose = this.gpuSkeletonPose;
            let currentCrossFadeNode = this._currentCrossFadeNode;
            let a: AnimClipState;//= this._currentCrossFadeNode.crossA_state;
            let b: AnimClipState;// this._currentCrossFadeNode.crossB_state;
            let defaultFade: CrossFadeNode = this._defaultFade ;// this._currentCrossFadeNode.crossB_state;

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

                    var defaultMixTime: number = 300;
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
            } else {
                return;
            }

            this._reset = true;

            //-------初始化
            if (!this.gpuSkeletonPose) {
                this.gpuSkeletonPose = new SkeletonPose();
                this.gpuSkeletonPose.initSkeletonPose(this._animState[name].clip.getSkeletonPose(0), this.gpuSkeletonPose);
            }
            if (Egret3DPolicy.useAnimMixInterpolation && !this._lerpAPose) {
                this._lerpAPose = new SkeletonPose();
                this.gpuSkeletonPose.initSkeletonPose(this._animState[name].clip.getSkeletonPose(0), this._lerpAPose);
            }
            if (Egret3DPolicy.useAnimMixInterpolation && !this._lerpBPose) {
                this._lerpBPose = new SkeletonPose();
                this.gpuSkeletonPose.initSkeletonPose(this._animState[name].clip.getSkeletonPose(0), this._lerpBPose);
            }
        }

        //先算出交换动作后的时间起始点
        //获取融合时间轴上的 指定时间的 a clip
        //获取融合时间轴上的 指定时间的 b clip
        //计算 A/B 的融合
        //获取最终的clip
        /*
        * @private
        */
        public update(time: number, delay: number) {

            if (this._reset) {
                this._reset = false;
                this._offset = time;
                this._currentState.reset(time);
            }

            if (Egret3DPolicy.useAnimMixInterpolation && this._currentCrossFadeNode) {
                this.mixUpdate(time, delay);
            } else {
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
        }

        private _lerpAPose: SkeletonPose;
        private _lerpBPose: SkeletonPose;
        private mixUpdate(time: number, delay: number) {
            let _lerpAPose: SkeletonPose = this._lerpAPose;
            let _lerpBPose: SkeletonPose = this._lerpBPose;
            let gpuSkeletonPose = this.gpuSkeletonPose;
            let currentCrossFadeNode = this._currentCrossFadeNode;
            let a: AnimClipState = currentCrossFadeNode.crossA_state || this._animState[currentCrossFadeNode.crossA];
            let b: AnimClipState = currentCrossFadeNode.crossB_state || this._animState[currentCrossFadeNode.crossB];
            let hasA: boolean = false;
            let hasB: boolean = false;
            let mix: boolean = false;

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
                } else {
                    if (hasA && !hasB) {
                        a.update(delay, gpuSkeletonPose);
                    } else if (hasB && !hasA) {
                        b.update(delay, gpuSkeletonPose);
                    }
                }
            } else {
                if (this._currentCrossFadeNode) {
                    this.play(this._crossFade.getNextAnim(), 1);
                    this._currentCrossFadeNode = null;
                }
            }
        }

        /*
        * @private
        */
        public clone(): SkeletonAnimationState {
            var animationState = new SkeletonAnimationState();
            var animState: AnimClipState;
            for (var n in this._animState) {
                animationState.addAnimClip(this._animState[n].clip);
            }
            animationState._crossFade = this._crossFade;
            return animationState;
        }

    }
}