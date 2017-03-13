var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /*
    * @private
    */
    var GaussPost = (function () {
        function GaussPost() {
            this._debugHud = new egret3d.HUD();
            this._h_postRender = new egret3d.PostRender("hud_vs", "gaussian_H_fs");
            this._h_postRender.setRenderToTexture(2048, 2048, egret3d.FrameBufferFormat.UNSIGNED_BYTE_RGB);
            this._v_postRender = new egret3d.PostRender("hud_vs", "gaussian_V_fs"); //"gaussian_V_fs");
        }
        GaussPost.prototype.setRenderTexture = function (width, height) {
            this._v_postRender.setRenderToTexture(width, height, egret3d.FrameBufferFormat.UNSIGNED_BYTE_RGB);
        };
        GaussPost.prototype.draw = function (time, delay, context3D, collect, camera, backViewPort, posList) {
            this._h_postRender.camera = camera;
            this._h_postRender.needClean = true;
            this._h_postRender.draw(time, delay, context3D, collect, backViewPort, posList);
            posList["final"] = this._h_postRender.renderTexture;
            this._v_postRender.camera = camera;
            this._v_postRender.needClean = true;
            this._v_postRender.draw(time, delay, context3D, collect, backViewPort, posList);
            this._v_postRender["color"] = posList["source"];
            posList["final"] = this._v_postRender.renderTexture;
            //posList["bloomPass"] = this._v_postRender.renderTexture;
            //this._debugHud.viewPort = camera.viewPort;
            //this._debugHud.diffuseTexture = this._v_postRender.renderTexture;
            //this._debugHud.draw(context3D);
        };
        return GaussPost;
    }());
    egret3d.GaussPost = GaussPost;
    __reflect(GaussPost.prototype, "egret3d.GaussPost", ["egret3d.IPost"]);
})(egret3d || (egret3d = {}));
//# sourceMappingURL=GaussPost.js.map