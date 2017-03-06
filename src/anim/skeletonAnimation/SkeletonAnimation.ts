module egret3d {

    /*
    * @private
    */
    export enum BindAnimType { translate, rotation, scale, translate_rotation, translate_scale , all }

    /**
    * @language zh_CN
    * @class egret3d.SkeletonAnimation
    * @classdesc
    * SkeletonAnimation 类表示骨骼动画控制类
    * 
    * 骨骼动画控制类中管理若干个 SkeletonAnimationClip（骨骼动画） 对象，每个SkeletonAnimationClip对象，都是对*.eam 文件的实例。
    * 此对象会触发 SkeletonAnimationEvent3D 事件
    * @see egret3d.SkeletonAnimationClip
    * @see egret3d.EventDispatcher
    * @see egret3d.IAnimation
    * @see egret3d.SkeletonAnimationEvent3D
    * @includeExample anim/skeletonAnimation/SkeletonAnimation.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class SkeletonAnimation extends EventDispatcher implements IAnimation {

        /**
        * @language zh_CN
        * 一个完整的动画播放时间周期
        * @version Egret 3.0
        * @platform Web,Native
        */
        public loopTime: number = 0;

        /**
        * @language zh_CN
        * 总时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public animTime: number = 0;

        /**
        * @language zh_CN
        * 动画速率
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static fps: number = 1000 / 60;

        /**
        * @language zh_CN
        * 播放速度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public speed: number = 1;


        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public event3D: Event3D = new AnimationEvent3D();

        /**
        * @language zh_CN
        * 是否循环
        * @version Egret 3.0
        * @platform Web,Native
        */
        public isLoop: boolean = true;

        /**
        * @language zh_CN
        * 帧间隔时间
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public delay: number;

        /**
        * @private
        * @language zh_CN
        * 一个完整的动画播放时间周期
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _loopTime: number = 1;

        private _skeletonAnimationState: SkeletonAnimationState;
        private _isPlay: boolean = false;
        //private _fpsDelay: number = 30;
        //private _numberFrameTime: number = 0;
        //private _frame: number = 0;
        //private _nextFrame: number = 0;
        //private _weight: number = 0;
        private _time: number = 0;
        private _cacheTime: number = 0;
        private _movePosition: Vector3D; // 偏移GPU里的参数

        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(state: SkeletonAnimationState = null) {
            super();
            this._isPlay = false;
            this._skeletonAnimationState = state || new SkeletonAnimationState();
            state.animation = this;
            this._movePosition = new Vector3D();
        }

        /**
        * @language zh_CN
        * 骨骼动画对象
        * @returns SkeletonAnimation  骨骼动画对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get skeletonAnimationController(): SkeletonAnimation {
            return this;
        }

        /**
        * @language zh_CN
        * 骨骼动画状态
        * @returns SkeletonAnimationState  骨骼动画状态
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get state(): SkeletonAnimationState {
            return this._skeletonAnimationState;
        }

        /**
        * @language zh_CN
        * 挂载 基于 Object3D 的物体到指定的骨骼或虚拟提上
        * @param nodeName 节点的名字
        * @param type egret3d.BindAnimType
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bindToJointPose(nodeName: string, node: Object3D, type: BindAnimType = BindAnimType.all) { 
            this._skeletonAnimationState.bindList = this._skeletonAnimationState.bindList || {};
            this._skeletonAnimationState.bindList[nodeName] = { node: node, type: type};
        }

        /**
        * @language zh_CN
        * 播放骨骼动画
        * @param animName 动画名称
        * @param speed 播放速度
        * @param reset 是否重置
        * @param prewarm 是否预热
        * @version Egret 3.0
        * @platform Web,Native
        */
        public play(animName?: string, speed: number = 1, reset: boolean = false , prewarm: boolean = true): boolean {
            this._skeletonAnimationState.play(animName, speed, reset);
            this._isPlay = true; 
            return true ;
        }

        /**
        * @language zh_CN
        * 暂停骨骼动画播放（停留在当前帧）
        * @version Egret 3.0
        * @platform Web,Native
        */
        public pause(): void {
            this._isPlay = false;
        }

        /**
        * @language zh_CN
        * 停止骨骼动画播放（停留在第一帧）
        * @version Egret 3.0
        * @platform Web,Native
        */
        public stop(): void {
            this._isPlay = false;
        }

        /**
        * @language zh_CN
        * 更新骨骼动画
        * @param time 总时间
        * @param delay 延迟时间
        * @param geometry 该值无效
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number, geometry: Geometry): void {
            if (!this._isPlay) return;
            if (this._cacheTime != time) {
                this._cacheTime = time; // 标记不重复
                this.time += delay; 
                this._skeletonAnimationState.update(this.time,delay);
            }
        } 

        /*
        * @private
        */
        public set time(value: number) {
            this._time = value; 
        }

        /*
        * @private
        */
        public get time(): number {
            return this._time; 
        }

        /**
        * @private
        * @language zh_CN
        * 将骨骼信息更新给GPU
        * @param time 当前时间
        * @param delay 当前帧时间
        * @param usage PassUsage
        * @param geometry 子几何信息
        * @param context3DProxy 上下文信息
        * @param modeltransform 模型矩阵
        * @param camera3D 相机
        * @version Egret 3.0
        * @platform Web,Native
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            var state = this._skeletonAnimationState;
            if (state && state.gpuSkeletonPose) {
                state.gpuSkeletonPose.updateGPUData(geometry.geometry.skeleton, geometry.geometry.skeletonGPUData, this._movePosition);
            }
            if (usage.uniform_time) {
                context3DProxy.uniform1f(usage.uniform_time.uniformIndex, time);
            }

            if (usage.uniform_PoseMatrix)
                context3DProxy.uniform4fv(usage.uniform_PoseMatrix.uniformIndex, geometry.geometry.skeletonGPUData);
        }

        /**
        * @language zh_CN
        * 骨架骨骼数量
        * @returns number 骨架骨骼数量，当前默认为48
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get jointNum(): number {
            return 48;
        }

        /**
        * @language zh_CN
        * 当前动画是否正在播放
        * @returns 是否在播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public isPlay(): boolean {
            return this._isPlay;
        }

        /**
        * @language zh_CN
        * 克隆当前骨骼动画
        * @returns IAnimation 骨骼动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): IAnimation {
            var cloneSkeletonAnimation: SkeletonAnimation = new SkeletonAnimation(this._skeletonAnimationState.clone());
            for (var s in cloneSkeletonAnimation.state.animClip ) {
                cloneSkeletonAnimation.state.animClip[s].animation = cloneSkeletonAnimation;
            }
            return cloneSkeletonAnimation;
        }

        /**
        * @language zh_CN
        * 添加 SkeletonAnimationClip 对象
        * @param animationClip 添加的动画剪辑对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addSkeletonAnimationClip(clip: SkeletonAnimationClip) {
            this.state.addAnimClip(clip);
        }

        /*
        * @private
        */
        animStateNames: string[];

        /*
        * @private
        */
        animStates: IAnimationState[];

        /*
        * @private
        */
        addAnimState(animState: IAnimationState) { };

        /*
        * @private
        */
        removeAnimState(animState: IAnimationState) { };

        /*
        * @private
        */
        addAnim(clip: SkeletonAnimationClip) { }

        private _cycleEvent: Event3D = new Event3D(AnimationEvent3D.CYCLE);
        private _completeEvent: Event3D = new Event3D(AnimationEvent3D.COMPLETE);

        /*
        * @private
        */
        public dispatchCycle() {
            this.dispatchEvent(this._cycleEvent);
        }

        /*
        * @private
        */
        public dispatchComplete() {
            this.dispatchEvent(this._completeEvent);
        }
    }

      
}