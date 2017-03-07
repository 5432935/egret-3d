module egret3d {
    /*
    * @private
    */
    export class CrossFadeNode {

        //-------
        public nextName: string = "" ;
        //-------
        public crossA: string = "";
        //-------
        public crossB: string = "";
        //-------
        public blend_startFrame: number = 0;
        //-------
        public blend_endFrame: number = 0;
        //-------
        public crossB_startFrame: number = 0;

        public blendTime: number = 0;
        public blendStartTime: number = 0;

        public crossA_state: AnimClipState;
        public crossB_state: AnimClipState;

        public totalTime: number = 0;

    }

    /*
    * @private
    */
    export class CrossFade {

        private _crossFades: { [key: string]: CrossFadeNode };
        private _currentCrossFadeNode: CrossFadeNode;
        private _lerpAPose: SkeletonPose;
        private _lerpBPose: SkeletonPose;

        constructor() {
            this._crossFades = {}; 
        }

        public addCrossFadeNode(fade: CrossFadeNode) {
            this._crossFades[fade.crossA + fade.crossB] = fade;
        }

        public getNextAnim(): string {
            var anyState = this._crossFades["base"];
            
            if (anyState) {
                return "base";
            } else {
                if(this._currentCrossFadeNode) {
                    if (this._currentCrossFadeNode.nextName != "") {
                        return this._currentCrossFadeNode.nextName;
                    } else if (this._currentCrossFadeNode.nextName == "") {
                        if (this._currentCrossFadeNode.crossB_state.clip.isLoop) {
                            return this._currentCrossFadeNode.crossB;
                        }
                    }
                } else {
                    console.warn("CrossFade: miss _currentCrossFadeNode!");
                }
            }
            return "";
        }

        public checkCrossFade(currentName: string, lastName: string, anim: { [key: string]: AnimClipState }): CrossFadeNode {
            this._currentCrossFadeNode = this._crossFades[currentName + lastName];
            if (this._currentCrossFadeNode) {
                var a: AnimClipState = anim[this._currentCrossFadeNode.crossA];
                var b: AnimClipState = anim[this._currentCrossFadeNode.crossB];

                b.reStart();

                this._currentCrossFadeNode.crossA_state = a;
                this._currentCrossFadeNode.crossB_state = b;

                this._currentCrossFadeNode.blendTime = (this._currentCrossFadeNode.blend_endFrame - this._currentCrossFadeNode.blend_startFrame) * 33;
                this._currentCrossFadeNode.blendStartTime = this._currentCrossFadeNode.blend_startFrame * 33;

               
                this._currentCrossFadeNode.totalTime = Math.max(a.totalFrame, this._currentCrossFadeNode.crossB_startFrame + b.totalFrame) * a.clip.frameRate;
            }
            return this._currentCrossFadeNode; 
        }

        private _frameTime: number = 0;
        private _frame: number = 0;
        private _nextFrame: number = 0;
        private _weight: number = 0;
        private _offset: number = 0;
        private _time: number = 0;
        public update( time:number ) {
         
        }
    }
}