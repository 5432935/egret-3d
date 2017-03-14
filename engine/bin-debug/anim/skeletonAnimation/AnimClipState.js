var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /*
    * @private
    */
    var AnimClipState = (function () {
        function AnimClipState(clip) {
            this.time = 0;
            this.offset = 0;
            this.speed = 1;
            this.loop = true;
            this._frameTime = 0;
            this._frame = 0;
            this._time = 0;
            this._nextframe = 0;
            this._lastframe = 0;
            this._weight = 0;
            this._reStart = false;
            this._end = false;
            this.cycleTime = 0;
            this.clip = clip;
            this.loop = this.clip.isLoop;
            //临时参数
            this.totalFrame = clip.totalFrame;
            this.totalTime = clip.totalTime;
        }
        AnimClipState.prototype.reset = function (time) {
            //this.offset = time;
            this._reStart = true;
            this._time = 0;
            this._lastframe = 0;
            this._end = false;
        };
        AnimClipState.prototype.reStart = function () {
            this._reStart = true;
        };
        AnimClipState.prototype.update = function (delay, pose) {
            if (this._reStart) {
                this._reStart = false;
                this.offset = this._time;
            }
            this.time = this._time - this.offset;
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
                var endFrame = this.speed < 0 ? 0 : this.totalFrame - 1;
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
            if (egret3d.Egret3DPolicy.useAnimPoseInterpolation) {
                pose.getLerpSkeletonPose(this._frame, this._nextframe, this._weight, this.clip, pose);
            }
            else {
                pose.copySkeletonPose(this.clip.getSkeletonPose(this._frame), pose);
            }
            this._time += delay * this.speed;
            if (this._time < 0) {
                this._time = this._time % this.totalTime;
                this._time = this.totalTime + this._time;
            }
        };
        return AnimClipState;
    }());
    egret3d.AnimClipState = AnimClipState;
    __reflect(AnimClipState.prototype, "egret3d.AnimClipState");
})(egret3d || (egret3d = {}));
