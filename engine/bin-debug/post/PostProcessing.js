var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /*
    * @private
    */
    var SizeUtil = (function () {
        function SizeUtil() {
        }
        SizeUtil.prototype.isDimensionValid = function (d) {
            return d >= 1 && d <= SizeUtil.MAX_SIZE && this.isPowerOfTwo(d);
        };
        SizeUtil.prototype.isPowerOfTwo = function (value) {
            return value ? ((value & -value) == value) : false;
        };
        SizeUtil.prototype.getBestPowerOf2 = function (value) {
            var p = 1;
            while (p < value)
                p <<= 1;
            if (p > SizeUtil.MAX_SIZE)
                p = SizeUtil.MAX_SIZE;
            return p;
        };
        return SizeUtil;
    }());
    SizeUtil.MAX_SIZE = 2048;
    egret3d.SizeUtil = SizeUtil;
    __reflect(SizeUtil.prototype, "egret3d.SizeUtil");
    /*
    * @private
    */
    egret3d.sizeUtil = new SizeUtil();
    /*
    * @private
    */
    var PostProcessing = (function () {
        function PostProcessing(renderQuen) {
            this.posTex = {};
            this.hud = new egret3d.HUD();
            this._sizeChange = false;
            this._renderQuen = renderQuen;
            this.postArray = [];
        }
        PostProcessing.prototype.draw = function (time, delay, contextProxy, collect, camera, backViewPort) {
            var self = this;
            var post;
            var po;
            if (!self._renderQuen.mainRender.renderTexture) {
                po = camera.maxWidthAndHeight;
                this._renderQuen.mainRender.setRenderToTexture(po.x, po.y, egret3d.FrameBufferFormat.UNSIGNED_BYTE_RGB);
            }
            self.finalTexture = self.posTex["final"] = self.posTex["source"] = self._renderQuen.mainRender.renderTexture;
            if (self.postArray.length > 2) {
                for (var i = 0; i < self.postArray.length - 1; i++) {
                    post = self.postArray[i];
                    post.renderQuen = self._renderQuen;
                    post.setRenderTexture(po.x, po.y);
                    post.draw(time, delay, contextProxy, collect, camera, backViewPort, self.posTex);
                    self.finalTexture = self.posTex["final"];
                }
            }
            post = self.postArray[self.postArray.length - 1];
            post.renderQuen = self._renderQuen;
            post.draw(time, delay, contextProxy, collect, camera, backViewPort, self.posTex);
        };
        return PostProcessing;
    }());
    egret3d.PostProcessing = PostProcessing;
    __reflect(PostProcessing.prototype, "egret3d.PostProcessing");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=PostProcessing.js.map