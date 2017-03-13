var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /*
    * @private
    */
    var PostRenderBuffer = (function () {
        function PostRenderBuffer() {
            //public depthBuffer      : MultiRender;
            //public normalBuffer     : MultiRender;
            //public colorBuffer      : MultiRender;
            //public specularBuffer   : MultiRender;
            //public defaultBuffer    : MultiRender;
            this.useDepthPass = false;
            this.useNormalPass = false;
            this.useColorPass = false;
            this.useSpecularPass = false;
            this.debugHUD = new egret3d.HUD();
        }
        //public enableDepthPass(w: number, h: number, flag: boolean) {
        //    this.useDepthPass = flag; 
        //    if (flag) {
        //        this.depthBuffer = new MultiRender(PassType.depthPass_8);
        //    }
        //}
        PostRenderBuffer.prototype.drawRenderBuffer = function (time, delay, context3D, collect, camera, backViewPort) {
            //if (this.useDepthPass)
            //    this.depthBuffer.draw(time, delay, context3D, collect, camera, backViewPort);
            if (backViewPort === void 0) { backViewPort = null; }
            //this.debugHUD.diffuseTexture = this.depthBuffer.renderTexture ; 
            //this.debugHUD.draw(context3D);
        };
        return PostRenderBuffer;
    }());
    egret3d.PostRenderBuffer = PostRenderBuffer;
    __reflect(PostRenderBuffer.prototype, "egret3d.PostRenderBuffer");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=PostRenderBuffer.js.map