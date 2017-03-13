module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.PropertyAnimController
    * @classdesc
    * 属性动画控制器 管理 多个 PropertyAnim
    * @see egret3d.PropertyAnim
    * @see egret3d.EventDispatcher
    * @see egret3d.IAnimation
    *
    * @includeExample anim/PropertyAnimation/PropertyAnim.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class PropertyAnimController extends EventDispatcher implements IAnimation {

        protected _animTime: number = 0;
        skeletonAnimationController: SkeletonAnimation;
        particleAnimationController: ParticleAnimation;

        /**
        * @language zh_CN
        * 帧间隔时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public delay: number;

        /**
        * @language zh_CN
        * 播放速度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public speed: number = 1;

        /**
        * @language zh_CN
        * 一个完整的动画播放时间周期
        * @version Egret 3.0
        * @platform Web,Native
        */
        public loopTime: number = 0;


        /**
        * @language zh_CN
        * 是否为一个循环播放的动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        public isLoop: boolean;

        /**
        * @language zh_CN
        * 当前动画名字
        * @version Egret 3.0
        * @platform Web,Native
        */
        public currentAnimName: string = "";

        protected _target: Object3D;

        /**
        * @language zh_CN
        *  绑定目标
        * @param tar 目标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set target(tar: Object3D) {
            this._target = tar;

            if (tar) {
                for (var key in this._proAnimDict) {
                    this._proAnimDict[key].bindObject3D(this._target);
                }
            }
        }

        /**
        * @language zh_CN
        * 动画时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get animTime(): number {
            return this._animTime;
        }

        /**
        * @language zh_CN
        * 动画时间
        * @param value 动画时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        //public set animTime(value: number) {
        //    this._animTime = value;
        //    if (this.current) {
        //        this.current.timePosition = value;
        //    }
        //}

        /**
        * @language zh_CN
        *  绑定目标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get target(): Object3D {
            return this._target;
        }

        /**
        * @language zh_CN
        *  当前播放动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        protected current: PropertyAnim;

        protected _proAnimDict: any = {};
        protected _event3D: AnimationEvent3D = new AnimationEvent3D();

        /**
        * @language zh_CN
        * 构造函数，创建一个属性动画控制器
        * @param target 控制器的目标对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(target:Object3D = null) {
            super();
            this._target = target;
        }

        /**
        * @language zh_CN
        * 只有属性动画对象才有此接口
        * @returns PropertyAnimController 动画控制器
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get propertyAnimController(): PropertyAnimController {
            return this;
        }
        /**
        * @language zh_CN
        * 是否正在播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public isPlay(): boolean {
            return true;
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
        public play(animName : string = "", speed: number = 1, reset: boolean = true, prewarm: boolean = true): void {
            this.current = this._proAnimDict[animName];

            if (!this.current) {
                for (var key in this._proAnimDict) {
                    this.current = this._proAnimDict[key];
                    break;
                }
            }
            this.speed = speed;

            if (this.current) {
                this.current.speed = this.speed;
                if (this.target) {
                    this.current.bindObject3D(this.target);
                }

                //this.current.timePosition = this._animTime;

                this.currentAnimName = this.current.name;

                this.current.play(speed, reset);
            }
        }
     
        /**
        * @language zh_CN
        * 停止骨骼动画播放（停留在第一帧）
        * @version Egret 3.0
        * @platform Web,Native
        */
        public stop(): void {
            if (this.current) {
                this.current.stop();
            }
            this.current = null;
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
            if (this.current) {
                this.current.update(delay);
            }
        }

        /**
        * @private
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4, camera3D: Camera3D) {
        }

        /**
        * @language zh_CN
        * 克隆骨骼动画对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): PropertyAnimController {
            var pro: PropertyAnimController = new PropertyAnimController();
            for (var key in this._proAnimDict) {
                pro.addPropertyAnim(this._proAnimDict[key].clone());
            }
            return pro;
        }

        /**
        * @language zh_CN
        * 动画名列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get animStateNames(): string[] {
            return null;
        }

        /**
        * @language zh_CN
        * 动画状态对象列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get animStates(): IAnimationState[] {
            return null;
        }


        /**
        * @private
        */
        public addAnimState(animState: IAnimationState) {
        }

        /**
        * @private
        */
        public removeAnimState(animState: IAnimationState) {
        }

        /**
        * @language zh_CN
        * 添加动画属性对象
        * @param proAnim 动画属性对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addPropertyAnim(proAnim: PropertyAnim) {
            this._proAnimDict[proAnim.name] = proAnim;
            proAnim.proAnimController = this;
            if (this.target) {
                proAnim.bindObject3D(this.target);
            }

            this.loopTime = Math.max(this.loopTime, proAnim.totalTime);
            if (proAnim.isLoop == false) {
                this.isLoop = proAnim.isLoop;
            }
        }

        /**
        * @language zh_CN
        * 移除动画属性对象
        * @param proAnim 动画对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removePropertyAnim(proAnim: PropertyAnim) {
            delete this._proAnimDict[proAnim.name];
        }

        /**
        * @private
        */
        public doEvent(event: any, target: any) {
            this._event3D.eventType = event;
            this._event3D.target = target;

            this.dispatchEvent(this._event3D);
        }
    }
} 