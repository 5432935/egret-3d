module egret3d {
    /*
    * @private
    */
    export class AnimClipState{
       

        public time: number = 0 ; 
        public offset: number= 0 ; 

        public totalTime: number;
        public totalFrame: number;

        public speed: number = 1;

        public loop: boolean = true;

        public animation: SkeletonAnimation;

        public clip: SkeletonAnimationClip;
        private _frameTime: number = 0;
        private _frame: number = 0;
        private _time: number = 0;
        private _nextframe: number = 0;
        private _weight: number = 0;
        private _reStart: boolean = false;

        constructor(clip: SkeletonAnimationClip) {
            this.clip = clip;
            this.loop = this.clip.isLoop;
            //临时参数
            this.totalFrame = clip.totalFrame ;
            this.totalTime = clip.totalTime;

         
        }

        public reset(time:number) {
            //this.offset = time;
            this._reStart = true;
        }

        public reStart() {
            this._reStart = true;
        }

        public update(delay: number, pose: SkeletonPose) {
            if (this._reStart) {
                this._reStart = false;
                this.offset = this._time;
            }
            this.time = this._time - this.offset ;

            if (this.loop) {
                this.time = this.time % this.totalTime;

                this._frameTime = this.time / this.clip.frameRate;

                this._frame = Math.floor(this._frameTime);

                this._weight = (this._frameTime - this._frame);

                this._nextframe = this._frame + 1;

                if (this._nextframe >= this.totalFrame) {
                    this._nextframe = 0;
                    //complete event && cycle 
                    this.animation.dispatchCycle();
                }

            } else {
                if (this.time < this.totalTime) {
                    this._frameTime = this.time / this.clip.frameRate;

                    this._frame = Math.floor(this._frameTime);

                    this._weight = (this._frameTime - this._frame);

                    this._nextframe = this._frame + 1;

                    if (this._nextframe >= this.totalFrame) 
                        this._nextframe = this.totalFrame - 1;
                } else {
                    this._frame = this._nextframe = this.totalFrame - 1;
                    //complete event
                    this.animation.dispatchComplete();
                }
            }

            if (Egret3DPolicy.useAnimPoseInterpolation) {
                pose.getLerpSkeletonPose(this._frame, this._nextframe, this._weight, this.clip, pose);
            } else {
                pose.copySkeletonPose(this.clip.getSkeletonPose(this._frame), pose);
            }
            this._time += delay * this.speed ;
        }
        private cycleTime: number = 0;

    }
}