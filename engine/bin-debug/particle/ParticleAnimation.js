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
    * @classdesc
    * 粒子动画的实现IAnimation的部分，ParticleEmitter会自动创建该对象，不建议使用者在外部自行创建该对象。
    * 主要用于控制粒子的播放/暂停/更改播放速度/粒子的帧刷新，控制当前粒子所有节点的数据更新等。
    * @see egret3d.IAnimation
    * @see egret3d.EventDispatcher
    * @see egret3d.ParticleData
    * @see egret3d.ParticleAnimationState
    * @class egret3d.ParticleAnimation
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParticleAnimation = (function (_super) {
        __extends(ParticleAnimation, _super);
        /**
        * @language zh_CN
        * 构造函数，创建一个ParticleAnimation对象
        * @param emitter 该动画对应粒子发射器对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        function ParticleAnimation(emitter) {
            var _this = _super.call(this) || this;
            /**
            * @language zh_CN
            * 总时间，加成过特效播放速度后的时间
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.animTime = 0;
            _this._event3D = new egret3d.AnimationEvent3D();
            _this._lastAnimTime = 0;
            /**
            * @language zh_CN
            * 帧间隔时间
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.delay = 0;
            /**
            * @language zh_CN
            * 一个完整的动画播放时间周期
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.loopTime = 0;
            /**
            * @language zh_CN
            * 播放速度，注意0的情况（x/0=?）
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.speed = 1;
            /**
            * @language zh_CN
            * 是否在播放
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this._play = false;
            _this.animStates = [];
            _this.particleAnimationState = new egret3d.ParticleAnimationState("particle", emitter);
            _this.addAnimState(_this.particleAnimationState);
            return _this;
        }
        /**
        * @private
        * @language zh_CN
        * 更新调度
        * @param time 总时间
        * @param delay 帧间隔时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleAnimation.prototype.update = function (time, delay, geometry) {
            if (ParticleAnimation.Reset) {
                this.animTime = 0;
            }
            if (this._play && this.speed != 0) {
                this.animTime += delay * this.speed;
                this.particleAnimationState.update(this.animTime, delay, geometry);
                if (this.isLoop == false) {
                    var endTime = this.loopTime * 1000;
                    if (this._lastAnimTime <= endTime && this.animTime > endTime) {
                        this._event3D.eventType = egret3d.AnimationEvent3D.COMPLETE;
                        this._event3D.target = this;
                        this.dispatchEvent(this._event3D);
                    }
                }
                this._lastAnimTime = this.animTime;
            }
        };
        /**
       * @private
       * @language zh_CN
       * 将粒子信息更新给GPU
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
        ParticleAnimation.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            if (this.particleAnimationState) {
                this.particleAnimationState.activeState(time, this.animTime, delay, delay, usage, geometry, context3DProxy, camera3D);
            }
        };
        /**
        * @language zh_CN
        * 播放该粒子动画，你可以使用stop函数暂停该粒子的播放
        * @param animName 动画名称
        * @param speed 播放速度（默认为1）
        * @param reset 是否从头播放
        * @param prewarm 是否预热
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleAnimation.prototype.play = function (animName, speed, reset, prewarm) {
            if (speed === void 0) { speed = 1; }
            if (reset === void 0) { reset = true; }
            if (prewarm === void 0) { prewarm = true; }
            this._play = true;
            if (reset) {
                this.animTime = 0;
            }
            if (prewarm) {
                this.animTime = this.particleAnimationState.modTime;
            }
            if (prewarm || reset) {
                this.particleAnimationState.onAnimTimeChange();
            }
            this.speed = speed;
        };
        /**
        * @language zh_CN
        * 暂停播放该粒子，你可以在之后使用play函数继续播放该动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleAnimation.prototype.stop = function () {
            this._play = false;
        };
        /**
        * @language zh_CN
        * 获取当前粒子是否正在播放
        * @returns 是否播放中
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleAnimation.prototype.isPlay = function () {
            return this._play;
        };
        /**
        * @language zh_CN
        * 添加动画状态
        * @param animState IAnimationState给改动画添加一个控制器，应该为ParticleAnimationState的实例。
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleAnimation.prototype.addAnimState = function (animState) {
            var has = this.animStates.indexOf(animState);
            if (has == -1)
                this.animStates.push(animState);
        };
        /**
        * @language zh_CN
        * 移除一个动画状态机
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleAnimation.prototype.removeAnimState = function (animState) {
            var has = this.animStates.indexOf(animState);
            if (has != -1)
                this.animStates.splice(has, 1);
        };
        /**
        * @private
        * @language zh_CN
        * 获取动画列表
        * @returns 动画名称列表
        */
        ParticleAnimation.prototype.getAnimList = function () {
            return [];
        };
        /**
        * @private
        * @language zh_CN
        * 获取动画节点
        * @returns 动画节点数组
        */
        ParticleAnimation.prototype.getAnimNode = function () {
            return [];
        };
        /**
        * @private
        * @language zh_CN
        * 克隆新的ParticleAnimation对象;
        * @returns 新的ParticleAnimation对象
        */
        ParticleAnimation.prototype.clone = function () {
            return null;
        };
        return ParticleAnimation;
    }(egret3d.EventDispatcher));
    egret3d.ParticleAnimation = ParticleAnimation;
    __reflect(ParticleAnimation.prototype, "egret3d.ParticleAnimation", ["egret3d.IAnimation"]);
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ParticleAnimation.js.map