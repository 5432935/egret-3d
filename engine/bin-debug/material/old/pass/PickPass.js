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
    * @private
    */
    var PickPass = (function (_super) {
        __extends(PickPass, _super);
        function PickPass(materialData) {
            var _this = _super.call(this, materialData) || this;
            _this._passID = egret3d.PassType.PickPass;
            return _this;
        }
        PickPass.prototype.initUseMethod = function (animation, geom) {
            this._passChange = false;
            var i = 0;
            this._passUsage = new egret3d.PassUsage();
            this._vs_shader_methods = {};
            this._fs_shader_methods = {};
            if (animation) {
                if (animation.skeletonAnimationController) {
                    this._passUsage.maxBone = animation.skeletonAnimationController.jointNum * 2;
                    this.addMethodShaders(this._passUsage.vertexShader, ["pickPass_skeleton_vs"]);
                }
            }
            else {
                this.addMethodShaders(this._passUsage.vertexShader, ["pickPass_vs"]);
            }
            this.addMethodShaders(this._passUsage.fragmentShader, ["pickPass_fs"]);
        };
        return PickPass;
    }(egret3d.MaterialPass));
    egret3d.PickPass = PickPass;
    __reflect(PickPass.prototype, "egret3d.PickPass");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=PickPass.js.map