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
    /*
    * @private
    */
    var BindAnimType;
    (function (BindAnimType) {
        BindAnimType[BindAnimType["translate"] = 0] = "translate";
        BindAnimType[BindAnimType["rotation"] = 1] = "rotation";
        BindAnimType[BindAnimType["scale"] = 2] = "scale";
        BindAnimType[BindAnimType["translate_rotation"] = 3] = "translate_rotation";
        BindAnimType[BindAnimType["translate_scale"] = 4] = "translate_scale";
        BindAnimType[BindAnimType["all"] = 5] = "all";
    })(BindAnimType = egret3d.BindAnimType || (egret3d.BindAnimType = {}));
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
    var SkeletonAnimation = (function (_super) {
        __extends(SkeletonAnimation, _super);
        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        function SkeletonAnimation(state) {
            if (state === void 0) { state = null; }
            var _this = _super.call(this) || this;
            /**
            * @language zh_CN
            * 一个完整的动画播放时间周期
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.loopTime = 0;
            /**
            * @language zh_CN
            * 总时间
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.animTime = 0;
            /**
            * @language zh_CN
            * 播放速度
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.speed = 1;
            /**
            * @private
            * @language zh_CN
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.event3D = new egret3d.AnimationEvent3D();
            /**
            * @language zh_CN
            * 是否循环
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.isLoop = true;
            /**
            * @private
            * @language zh_CN
            * 一个完整的动画播放时间周期
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this._loopTime = 1;
            _this._isPlay = false;
            //private _fpsDelay: number = 30;
            //private _numberFrameTime: number = 0;
            //private _frame: number = 0;
            //private _nextFrame: number = 0;
            //private _weight: number = 0;
            _this._time = 0;
            _this._cacheTime = 0;
            _this._cycleEvent = new egret3d.Event3D(egret3d.AnimationEvent3D.CYCLE);
            _this._completeEvent = new egret3d.Event3D(egret3d.AnimationEvent3D.COMPLETE);
            _this._isPlay = false;
            _this._skeletonAnimationState = state || new egret3d.SkeletonAnimationState();
            state.animation = _this;
            _this._movePosition = new egret3d.Vector3();
            return _this;
        }
        Object.defineProperty(SkeletonAnimation.prototype, "skeletonAnimationController", {
            /**
            * @language zh_CN
            * 骨骼动画对象
            * @returns SkeletonAnimation  骨骼动画对象
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkeletonAnimation.prototype, "state", {
            /**
            * @language zh_CN
            * 骨骼动画状态
            * @returns SkeletonAnimationState  骨骼动画状态
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._skeletonAnimationState;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 挂载 基于 Object3D 的物体到指定的骨骼或虚拟提上
        * @param nodeName 节点的名字
        * @param type egret3d.BindAnimType
        * @version Egret 3.0
        * @platform Web,Native
        */
        SkeletonAnimation.prototype.bindToJointPose = function (nodeName, node, type) {
            if (type === void 0) { type = BindAnimType.all; }
            this._skeletonAnimationState.bindList = this._skeletonAnimationState.bindList || {};
            this._skeletonAnimationState.bindList[nodeName] = { node: node, type: type };
        };
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
        SkeletonAnimation.prototype.play = function (animName, speed, reset, prewarm) {
            if (speed === void 0) { speed = 1; }
            if (reset === void 0) { reset = false; }
            if (prewarm === void 0) { prewarm = true; }
            this._skeletonAnimationState.play(animName, speed, reset);
            this._isPlay = true;
            return true;
        };
        /**
        * @language zh_CN
        * 暂停骨骼动画播放（停留在当前帧）
        * @version Egret 3.0
        * @platform Web,Native
        */
        SkeletonAnimation.prototype.pause = function () {
            this._isPlay = false;
        };
        /**
        * @language zh_CN
        * 停止骨骼动画播放（停留在第一帧）
        * @version Egret 3.0
        * @platform Web,Native
        */
        SkeletonAnimation.prototype.stop = function () {
            this._isPlay = false;
        };
        /**
        * @language zh_CN
        * 更新骨骼动画
        * @param time 总时间
        * @param delay 延迟时间
        * @param geometry 该值无效
        * @version Egret 3.0
        * @platform Web,Native
        */
        SkeletonAnimation.prototype.update = function (time, delay, geometry) {
            if (!this._isPlay)
                return;
            if (this._cacheTime != time) {
                this._cacheTime = time; // 标记不重复
                this.time += delay;
                this._skeletonAnimationState.update(this.time, delay);
            }
        };
        Object.defineProperty(SkeletonAnimation.prototype, "time", {
            /*
            * @private
            */
            get: function () {
                return this._time;
            },
            /*
            * @private
            */
            set: function (value) {
                this._time = value;
            },
            enumerable: true,
            configurable: true
        });
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
        SkeletonAnimation.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            var state = this._skeletonAnimationState;
            if (state && state.gpuSkeletonPose) {
                state.gpuSkeletonPose.updateGPUData(geometry.geometry.skeleton, geometry.geometry.skeletonGPUData, this._movePosition);
            }
            if (usage.uniform_time) {
                context3DProxy.uniform1f(usage.uniform_time.uniformIndex, time);
            }
            if (usage.uniform_PoseMatrix)
                context3DProxy.uniform4fv(usage.uniform_PoseMatrix.uniformIndex, geometry.geometry.skeletonGPUData);
        };
        Object.defineProperty(SkeletonAnimation.prototype, "jointNum", {
            /**
            * @language zh_CN
            * 骨架骨骼数量
            * @returns number 骨架骨骼数量，当前默认为48
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return 48;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 当前动画是否正在播放
        * @returns 是否在播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        SkeletonAnimation.prototype.isPlay = function () {
            return this._isPlay;
        };
        /**
        * @language zh_CN
        * 克隆当前骨骼动画
        * @returns IAnimation 骨骼动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        SkeletonAnimation.prototype.clone = function () {
            var cloneSkeletonAnimation = new SkeletonAnimation(this._skeletonAnimationState.clone());
            for (var s in cloneSkeletonAnimation.state.animClip) {
                cloneSkeletonAnimation.state.animClip[s].animation = cloneSkeletonAnimation;
            }
            return cloneSkeletonAnimation;
        };
        /**
        * @language zh_CN
        * 添加 SkeletonAnimationClip 对象
        * @param animationClip 添加的动画剪辑对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        SkeletonAnimation.prototype.addSkeletonAnimationClip = function (clip) {
            this.state.addAnimClip(clip);
        };
        /*
        * @private
        */
        SkeletonAnimation.prototype.addAnimState = function (animState) { };
        ;
        /*
        * @private
        */
        SkeletonAnimation.prototype.removeAnimState = function (animState) { };
        ;
        /*
        * @private
        */
        SkeletonAnimation.prototype.addAnim = function (clip) { };
        /*
        * @private
        */
        SkeletonAnimation.prototype.dispatchCycle = function () {
            this.dispatchEvent(this._cycleEvent);
        };
        /*
        * @private
        */
        SkeletonAnimation.prototype.dispatchComplete = function () {
            this.dispatchEvent(this._completeEvent);
        };
        return SkeletonAnimation;
    }(egret3d.EventDispatcher));
    /**
    * @language zh_CN
    * 动画速率
    * @version Egret 3.0
    * @platform Web,Native
    */
    SkeletonAnimation.fps = 1000 / 60;
    egret3d.SkeletonAnimation = SkeletonAnimation;
    __reflect(SkeletonAnimation.prototype, "egret3d.SkeletonAnimation", ["egret3d.IAnimation"]);
})(egret3d || (egret3d = {}));
