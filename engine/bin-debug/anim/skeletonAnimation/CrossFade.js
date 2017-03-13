var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /*
    * @private
    */
    var CrossFadeNode = (function () {
        function CrossFadeNode() {
            //-------
            this.nextName = "";
            //-------
            this.crossA = "";
            //-------
            this.crossB = "";
            //-------
            this.blend_startFrame = 0;
            //-------
            this.blend_endFrame = 0;
            //-------
            this.crossB_startFrame = 0;
            this.blendTime = 0;
            this.blendStartTime = 0;
            this.totalTime = 0;
        }
        return CrossFadeNode;
    }());
    egret3d.CrossFadeNode = CrossFadeNode;
    __reflect(CrossFadeNode.prototype, "egret3d.CrossFadeNode");
    /*
    * @private
    */
    var CrossFade = (function () {
        function CrossFade() {
            this._frameTime = 0;
            this._frame = 0;
            this._nextFrame = 0;
            this._weight = 0;
            this._offset = 0;
            this._time = 0;
            this._crossFades = {};
        }
        CrossFade.prototype.addCrossFadeNode = function (fade) {
            this._crossFades[fade.crossA + fade.crossB] = fade;
        };
        CrossFade.prototype.getNextAnim = function () {
            var anyState = this._crossFades["base"];
            if (anyState) {
                return "base";
            }
            else {
                if (this._currentCrossFadeNode) {
                    if (this._currentCrossFadeNode.nextName != "") {
                        return this._currentCrossFadeNode.nextName;
                    }
                    else if (this._currentCrossFadeNode.nextName == "") {
                        if (this._currentCrossFadeNode.crossB_state.clip.isLoop) {
                            return this._currentCrossFadeNode.crossB;
                        }
                    }
                }
                else {
                    console.warn("CrossFade: miss _currentCrossFadeNode!");
                }
            }
            return "";
        };
        CrossFade.prototype.checkCrossFade = function (currentName, lastName, anim) {
            this._currentCrossFadeNode = this._crossFades[currentName + lastName];
            if (this._currentCrossFadeNode) {
                var a = anim[this._currentCrossFadeNode.crossA];
                var b = anim[this._currentCrossFadeNode.crossB];
                b.reStart();
                this._currentCrossFadeNode.crossA_state = a;
                this._currentCrossFadeNode.crossB_state = b;
                this._currentCrossFadeNode.blendTime = (this._currentCrossFadeNode.blend_endFrame - this._currentCrossFadeNode.blend_startFrame) * 33;
                this._currentCrossFadeNode.blendStartTime = this._currentCrossFadeNode.blend_startFrame * 33;
                this._currentCrossFadeNode.totalTime = Math.max(a.totalFrame, this._currentCrossFadeNode.crossB_startFrame + b.totalFrame) * a.clip.frameRate;
            }
            return this._currentCrossFadeNode;
        };
        CrossFade.prototype.update = function (time) {
        };
        return CrossFade;
    }());
    egret3d.CrossFade = CrossFade;
    __reflect(CrossFade.prototype, "egret3d.CrossFade");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=CrossFade.js.map