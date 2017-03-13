var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /*
    * @private
    */
    var ColorCorrectionPost = (function () {
        function ColorCorrectionPost() {
            this.postRender = new egret3d.PostRender("hud_vs", "colorCorrection_fs");
            //this.postRender.setRenderToTexture(2048, 2048, FrameBufferFormat.UNSIGNED_BYTE_RGB);
        }
        ColorCorrectionPost.prototype.setRenderTexture = function (width, height) {
            this.postRender.setRenderToTexture(width, height);
        };
        Object.defineProperty(ColorCorrectionPost.prototype, "lutTexture", {
            get: function () {
                return this._lutTexture;
            },
            set: function (tex) {
                this._lutTexture = tex;
                this.postRender.hud["lutTexture"] = tex;
            },
            enumerable: true,
            configurable: true
        });
        ColorCorrectionPost.prototype.draw = function (time, delay, context3D, collect, camera, backViewPort, posList) {
            this.postRender.camera = camera;
            this.postRender.needClean = true;
            this.postRender.draw(time, delay, context3D, collect, backViewPort, posList);
            posList["final"] = this.postRender.renderTexture;
        };
        return ColorCorrectionPost;
    }());
    egret3d.ColorCorrectionPost = ColorCorrectionPost;
    __reflect(ColorCorrectionPost.prototype, "egret3d.ColorCorrectionPost", ["egret3d.IPost"]);
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ColorCorrectionPost.js.map