module egret3d {
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
    export class EffectGroup extends Object3D {
        private _animations: IAnimation[] = [];
        private _proAnimations: IAnimation[] = [];

        private _timeOffset: number[];
        private _isPlay: boolean;
        private _animCount: number = 0;

        private _loop: boolean;
        private _loopTime: number = 1;
        private _animTime: number = 0;
        private _speed: number = 1;
        private _prewarm: boolean;

        private _noLoopAnims: IAnimation[] = [];
        /**
        * @language zh_CN
        * 初始化所有动画
        * 初始化之后才能调用播放
        * @param isLoop 是否需要自动循环播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public init(isLoop:boolean = false) {
            this._animations = [];
            this._loop = isLoop;

            this.collectAnimations(this, this._animations);

            this._timeOffset = [];
            this._animCount = this._timeOffset.length = this._animations.length;
            for (var index: number = 0; index < this._animCount; index++) {
                this._timeOffset[index] = 0;
            }
        }

        private collectAnimations(object: Object3D, animations:IAnimation[]): void {
            var mesh: Mesh;
            var animation: IAnimation;
            if (object instanceof Mesh) {
                mesh = <Mesh>object;
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

            var childCount: number = object.childs.length;
            for (var i: number = 0; i < childCount; i++) {
                this.collectAnimations(object.childs[i], animations);
            }

            //修改当前最大循环时间
            if (!this._loop) {
                for (animation of this._noLoopAnims) {
                    this._loopTime = Math.max(this._loopTime, animation.loopTime);
                }
            }
        }

        /**
        * @language zh_CN
        * 播放动画
        * @param speed 播放速度（默认为1）
        * @param reset 是否从头播放 默认为false
        * @param prewarm 是否预热  默认为false
        * @version Egret 3.0
        * @platform Web,Native
        */
        public play(speed?: number, reset?: boolean, prewarm?: boolean): void {
            for (var index: number = 0; index < this._animCount; index++) {
                var animator: IAnimation = this._animations[index];
                animator.play("", speed, reset, prewarm);
            }

            for (var index: number = 0; index < this._proAnimations.length; index++) {
                var animator: IAnimation = this._proAnimations[index];
                animator.play();
            }

            this._isPlay = true;
            this._prewarm = prewarm;
            if (reset) {
                this._animTime = 0;
            }
        }

        /**
        * @language zh_CN
        * 设置动画当前的时间
        * @param offset 
        * @version Egret 3.0
        * @platform Web,Native
        */
        public resetTime(offset: number = 0): void {
            for (var index: number; index < this._animCount; index++) {
                var animator: IAnimation = this._animations[index];
                animator.animTime = this._timeOffset[index] + offset;
            }

            for (var index: number; index < this._animCount; index++) {
                var animator: IAnimation = this._proAnimations[index];
                animator.animTime = this._timeOffset[index] + offset;
            }
        }




        /**
        * @language zh_CN
        * 停止动画播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public stop(): void {
            for (var index: number; index < this._animCount; index++) {
                this._animations[index].stop();
            }

            for (var index: number = 0; index < this._proAnimations.length; index++) {
                var animator: IAnimation = this._proAnimations[index];
                animator.stop();
            }

            this._isPlay = false;
        }

        /**
        * @language zh_CN
        * 是否正在播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public isPlay(): boolean {
            return this._isPlay;
        }

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
        public update(time: number, delay: number, camera: Camera3D) {
            super.update(time, delay, camera);
            this._animTime += delay * this._speed;

            if (this._loop && this._animTime > this._loopTime) {
                this._animTime -= this._loopTime;
                var anim: IAnimation;
                for (anim of this._noLoopAnims) {
                    anim.play("", this._speed, true, this._prewarm);
                }
            }
        }
        /**
        * @language zh_CN
        * 销毁
        * @version Egret 3.0
        * @platform Web,Native
        */
        public dispose(): void {
            this.stop();
            if (this._animations) {
                this._animations.length = 0;
                delete this._animations;
            }

            if (this._noLoopAnims) {
                this._noLoopAnims.length = 0;
                delete this._noLoopAnims;
            }

        }

        /**
        * @language zh_CN
        * @private
        * @param other copy对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public copy(other: EffectGroup) {
            super.copy(other);
        }

        /**
        * @language zh_CN
        * @private
        * 克隆当前EffectGroup
        * @returns EffectGroup 克隆后的对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): EffectGroup {
            var cloneObject: EffectGroup = new EffectGroup();
            cloneObject.copy(this);
            return cloneObject;
        }

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public deepClone(): Object3D {
            var newObject: EffectGroup = <EffectGroup>super.deepClone();
            newObject.init(this._loop);
            return newObject;
        }
    }

}
