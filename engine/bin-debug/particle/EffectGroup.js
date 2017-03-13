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
    * @class egret3d.EffectGroup
    * @classdesc
    * 特效组，可以是粒子也可以是其他动画，如uv滚动等。通过加载特效配置文件，自动创建该对象。用于外部统一控制播放/暂停/以及速度控制。
    * @see egret3d.UnitLoader
    * @includeExample particle/EffectGroup.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var EffectGroup = (function (_super) {
        __extends(EffectGroup, _super);
        function EffectGroup() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._animations = [];
            _this._proAnimations = [];
            _this._animCount = 0;
            _this._loopTime = 1;
            _this._animTime = 0;
            _this._speed = 1;
            _this._noLoopAnims = [];
            /*
            * @private
            * 记录当前特效处于活动状态的时间,-1表示回收的状态
            */
            _this.liveTime = -1;
            /*
            * @private
            * 是否原始的资源，而非拷贝出来的对象
            */
            _this.isOriginal = true;
            //播放完毕事件
            _this._event3D = new egret3d.AnimationEvent3D();
            _this._lastAnimTime = 0;
            return _this;
        }
        /**
        * @language zh_CN
        * 初始化所有动画
        * 初始化之后才能调用播放
        * @param isLoop 是否需要自动循环播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        EffectGroup.prototype.init = function (isLoop) {
            if (isLoop === void 0) { isLoop = false; }
            this._animations = [];
            this._loop = isLoop;
            this.collectAnimations(this, this._animations);
            this._timeOffset = [];
            this._animCount = this._timeOffset.length = this._animations.length;
            for (var index = 0; index < this._animCount; index++) {
                this._timeOffset[index] = 0;
            }
        };
        EffectGroup.prototype.collectAnimations = function (object, animations) {
            var mesh;
            var animation;
            if (object instanceof egret3d.Mesh) {
                mesh = object;
                animation = mesh.animation;
                if (animation) {
                    animations.push(animation);
                    if (!animation.isLoop) {
                        this._noLoopAnims.push(animation);
                    }
                }
            }
            if (object.proAnimation) {
                this._proAnimations.push(object.proAnimation);
                if (!object.proAnimation.isLoop) {
                    this._noLoopAnims.push(object.proAnimation);
                }
            }
            var childCount = object.childs.length;
            for (var i = 0; i < childCount; i++) {
                this.collectAnimations(object.childs[i], animations);
            }
            //修改当前最大循环时间
            if (this._loop) {
                for (var _i = 0, _a = this._noLoopAnims; _i < _a.length; _i++) {
                    animation = _a[_i];
                    this._loopTime = Math.max(this._loopTime, animation.loopTime * 1000);
                }
            }
        };
        /**
        * @language zh_CN
        * 播放动画
        * @param speed 播放速度（默认为1）
        * @param reset 是否从头播放 默认为false
        * @param prewarm 是否预热  默认为false
        * @version Egret 3.0
        * @platform Web,Native
        */
        EffectGroup.prototype.play = function (speed, reset, prewarm) {
            speed = speed || 1;
            reset = reset || false;
            prewarm = prewarm || false;
            for (var index = 0; index < this._animCount; index++) {
                var animator = this._animations[index];
                animator.play("", speed, reset, prewarm);
            }
            for (var index = 0; index < this._proAnimations.length; index++) {
                var animator = this._proAnimations[index];
                animator.play("", speed, reset, prewarm);
            }
            this._isPlay = true;
            this._prewarm = prewarm;
            this._speed = speed;
            if (reset) {
                this._animTime = 0;
            }
        };
        /**
        * @language zh_CN
        * 设置动画当前的时间
        * @param offset
        * @version Egret 3.0
        * @platform Web,Native
        */
        EffectGroup.prototype.resetTime = function (offset) {
            if (offset === void 0) { offset = 0; }
            for (var index; index < this._animCount; index++) {
                var animator = this._animations[index];
                animator.animTime = this._timeOffset[index] + offset;
            }
            for (var index; index < this._proAnimations.length; index++) {
                var animator = this._proAnimations[index];
                animator.animTime = this._timeOffset[index] + offset;
            }
        };
        Object.defineProperty(EffectGroup.prototype, "speed", {
            /**
            * @language zh_CN
            * 设置动画当前的播放速度
            * @return 播放速度值，不能小于等于0
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._speed;
            },
            /**
            * @language zh_CN
            * 设置动画当前的播放速度
            * @param value 播放速度值，不能小于等于0
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (value < 0.0000001) {
                    value = 0.0000001;
                }
                this._speed = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 停止动画播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        EffectGroup.prototype.stop = function () {
            for (var index; index < this._animCount; index++) {
                this._animations[index].stop();
            }
            for (var index = 0; index < this._proAnimations.length; index++) {
                var animator = this._proAnimations[index];
                animator.stop();
            }
            this._isPlay = false;
        };
        /**
        * @language zh_CN
        * 是否正在播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        EffectGroup.prototype.isPlay = function () {
            return this._isPlay;
        };
        /**
        * @language zh_CN
        * 当前对象数据更新
        * @private
        * @param camera 当前渲染的摄相机
        * @param time 当前时间
        * @param delay 每帧时间间隔
        * @version Egret 3.0
        * @platform Web,Native
        */
        EffectGroup.prototype.update = function (time, delay, camera) {
            _super.prototype.update.call(this, time, delay, camera);
            if (this._loop && this._animTime > this._loopTime) {
                this._animTime -= this._loopTime;
                var anim;
                for (var _i = 0, _a = this._noLoopAnims; _i < _a.length; _i++) {
                    anim = _a[_i];
                    anim.play("", this._speed, true, this._prewarm);
                }
            }
            this._animTime += this._speed * delay;
            if (!this._loop) {
                var endTime = this._loopTime * 1000;
                if (this._lastAnimTime <= endTime && this._animTime > endTime) {
                    this._event3D.eventType = egret3d.AnimationEvent3D.COMPLETE;
                    this._event3D.target = this;
                    this.dispatchEvent(this._event3D);
                }
            }
            this._lastAnimTime = this._animTime;
        };
        /**
        * @language zh_CN
        * 销毁
        * @version Egret 3.0
        * @platform Web,Native
        */
        EffectGroup.prototype.dispose = function () {
            this.stop();
            if (this._animations) {
                this._animations.length = 0;
                delete this._animations;
            }
            if (this._noLoopAnims) {
                this._noLoopAnims.length = 0;
                delete this._noLoopAnims;
            }
        };
        /**
        * @language zh_CN
        * @private
        * @param other copy对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        EffectGroup.prototype.copy = function (other) {
            _super.prototype.copy.call(this, other);
        };
        /**
        * @language zh_CN
        * @private
        * 克隆当前EffectGroup
        * @returns EffectGroup 克隆后的对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        EffectGroup.prototype.clone = function () {
            var cloneObject = new EffectGroup();
            cloneObject.copy(this);
            return cloneObject;
        };
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        EffectGroup.prototype.deepClone = function () {
            var newObject = _super.prototype.deepClone.call(this);
            newObject.init(this._loop);
            return newObject;
        };
        return EffectGroup;
    }(egret3d.Object3D));
    egret3d.EffectGroup = EffectGroup;
    __reflect(EffectGroup.prototype, "egret3d.EffectGroup");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=EffectGroup.js.map