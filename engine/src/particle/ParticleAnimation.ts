module egret3d {

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
    export class ParticleAnimation extends EventDispatcher implements IAnimation {
                    
        /**
        * @language zh_CN
        * 当前粒子的实例引用，通过该引用可获取对应的ParticleData数据和ParticleEmitter中的geometry数据等
        * @version Egret 3.0
        * @platform Web,Native
        */
        public emit: ParticleEmitter;
            
        /**
        * @language zh_CN
        * 粒子动画状态机
        * @version Egret 3.0
        * @platform Web,Native
        */
        public particleAnimationState: ParticleAnimationState;

        /**
        * @language zh_CN
        * 总时间，加成过特效播放速度后的时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public animTime: number = 0;


        private _event3D: AnimationEvent3D = new AnimationEvent3D();
        private _lastAnimTime: number = 0;
        /**
        * @language zh_CN
        * 帧间隔时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public delay: number = 0;

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
        * 播放速度，注意0的情况（x/0=?）
        * @version Egret 3.0
        * @platform Web,Native
        */
        public speed: number = 1;

        /**
        * @language zh_CN
        * 获取动画列表
        * @returns 动画名称数组
        * @version Egret 3.0
        * @platform Web,Native
        */
        public animStateNames: string[];

        /**
        * @language zh_CN
        * 获取动画节点
        * @returns 动画节点数组
        * @version Egret 3.0
        * @platform Web,Native
        */
        public animStates: IAnimationState[];

        /**
        * @language zh_CN
        * 是否在播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _play: boolean = false;


        /**
        * @language zh_CN
        * 构造函数，创建一个ParticleAnimation对象
        * @param emitter 该动画对应粒子发射器对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(emitter:ParticleEmitter) {
            super();
            this.animStates = [];
            this.particleAnimationState = new ParticleAnimationState("particle", emitter);
            this.addAnimState(this.particleAnimationState);
        }

        /*
        * @private
        */
        public static Reset: boolean;
       
        /**
        * @private
        * @language zh_CN
        * 更新调度
        * @param time 总时间
        * @param delay 帧间隔时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number, geometry: Geometry) {
            if (ParticleAnimation.Reset) {
                this.animTime = 0;
            }
            
            if (this._play && this.speed != 0) {
                this.animTime += delay * this.speed;
                this.particleAnimationState.update(this.animTime, delay, geometry);


                if (this.isLoop == false) {
                    var endTime: number = this.loopTime * 1000;
                    if (this._lastAnimTime <= endTime && this.animTime > endTime) {
                        this._event3D.eventType = AnimationEvent3D.COMPLETE;
                        this._event3D.target = this;
                        this.dispatchEvent(this._event3D);
                    }
                    
                }

                this._lastAnimTime = this.animTime;
            }


        }



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
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4, camera3D: Camera3D) {
            if (this.particleAnimationState) {
                this.particleAnimationState.activeState(time, this.animTime, delay, delay, usage, geometry, context3DProxy, camera3D);
            }
        }

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
        public play(animName?: string, speed: number = 1, reset: boolean = true, prewarm: boolean = true): void {
            this._play = true;
            if (reset) {
                this.animTime = 0;
            }
            if (prewarm){
                this.animTime = this.particleAnimationState.modTime;
            }
            if (prewarm || reset) {
                this.particleAnimationState.onAnimTimeChange();
            }
            this.speed = speed;
        } 

        /**
        * @language zh_CN
        * 暂停播放该粒子，你可以在之后使用play函数继续播放该动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        public stop() {
            this._play = false;
        }

        /**
        * @language zh_CN
        * 获取当前粒子是否正在播放
        * @returns 是否播放中
        * @version Egret 3.0
        * @platform Web,Native
        */
        public isPlay(): boolean {
            return this._play ;
        }

        /**
        * @language zh_CN
        * 添加动画状态
        * @param animState IAnimationState给改动画添加一个控制器，应该为ParticleAnimationState的实例。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addAnimState(animState: IAnimationState) {
            var has: number = this.animStates.indexOf(animState);
            if (has==-1)
                this.animStates.push( animState );
        }

        /**
        * @language zh_CN
        * 移除一个动画状态机
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeAnimState(animState: IAnimationState) {
            var has: number = this.animStates.indexOf(animState);
            if (has != -1)
                this.animStates.splice(has,1);
        }

        /**
        * @private
        * @language zh_CN
        * 获取动画列表
        * @returns 动画名称列表
        */
        public getAnimList(): string[] {
            return []; 
        }

        /**
        * @private
        * @language zh_CN
        * 获取动画节点
        * @returns 动画节点数组
        */
        public getAnimNode(): AnimationNode[] {
            return [];
        }

        /**
        * @private
        * @language zh_CN
        * 克隆新的ParticleAnimation对象;
        * @returns 新的ParticleAnimation对象
        */
        public clone(): IAnimation {
            return null;
        }
    }
}