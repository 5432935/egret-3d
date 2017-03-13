var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /*
    * @private
    */
    var BloomPost = (function () {
        function BloomPost(bloom_amount) {
            if (bloom_amount === void 0) { bloom_amount = 0.15; }
            this._debugHud = new egret3d.HUD();
            this.bloom_amount = bloom_amount;
            this.postRender = new egret3d.PostRender("hud_vs", "bloom_fs");
            this.postRender.hud.uniformData["bloom_amount"] = { uniformIndex: -1, type: egret3d.UniformType.uniform1f, data: [bloom_amount] };
        }
        BloomPost.prototype.setRenderTexture = function (width, height, change) {
            if (!this.postRender.renderTexture || change) {
                this.postRender.setRenderToTexture(width, height, egret3d.FrameBufferFormat.UNSIGNED_BYTE_RGBA);
            }
        };
        BloomPost.prototype.draw = function (time, delay, context3D, collect, camera, backViewPort, posList) {
            var self = this;
            self.postRender.camera = camera;
            self.postRender.needClean = true;
            this.postRender.hud.uniformData["bloom_amount"].data[0] = self.bloom_amount;
            self.postRender.draw(time, delay, context3D, collect, backViewPort, posList);
            posList["final"] = this.postRender.renderTexture;
        };
        return BloomPost;
    }());
    egret3d.BloomPost = BloomPost;
    __reflect(BloomPost.prototype, "egret3d.BloomPost", ["egret3d.IPost"]);
})(egret3d || (egret3d = {}));
//# sourceMappingURL=BloomPost.js.map