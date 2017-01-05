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
        private _lastframe: number = 0;
        private _weight: number = 0;
        private _reStart: boolean = false;
        private _end: boolean = false;

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
            this._time = 0;
            this._lastframe = 0;
            this._end = false;
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

            this.time = this.time % this.totalTime;
            this._frameTime = this.time / this.clip.frameRate;
            this._frame = Math.floor(this._frameTime);
            this._weight = (this._frameTime - this._frame);

            this._nextframe = this._frame + 1;

            if (this._nextframe >= this.totalFrame) {
                this._nextframe = 0;
            }

            if (!this._end) {
                // 根据播放速度计算出最后一帧
                var endFrame: number = this.speed < 0 ? 0 : this.totalFrame - 1;
                if (this._frame == endFrame && this._frame != this._lastframe) {
                    if (this.loop) {
                        this.animation.dispatchCycle();
                    }
                    else {
                        this._frame = this._nextframe = this.speed < 0 ? 0 : this.totalFrame - 1;
                        this._end = true;
                        this.animation.dispatchComplete();
                    }
                }
            }
            else {
                this._frame = this._nextframe = this.speed < 0 ? 0 : this.totalFrame - 1;
            }
            this._lastframe = this._frame;

            if (Egret3DPolicy.useAnimPoseInterpolation) {
                pose.getLerpSkeletonPose(this._frame, this._nextframe, this._weight, this.clip, pose);
            } else {
                pose.copySkeletonPose(this.clip.getSkeletonPose(this._frame), pose);
            }
            this._time += delay * this.speed;
            if (this._time < 0) {
                this._time = this._time % this.totalTime;
                this._time = this.totalTime + this._time;
            }
        }
        private cycleTime: number = 0;

    }
}