var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /*
    * @private
    */
    var Gbuffer = (function () {
        function Gbuffer() {
            this._debugHud = new egret3d.HUD();
            this.postRender = new egret3d.PostRender("hud_vs", "gaussian_H_fs");
        }
        Gbuffer.prototype.setRenderTexture = function (width, height) {
            this.postRender.setRenderToTexture(width, height);
        };
        Gbuffer.prototype.draw = function (time, delay, context3D, collect, camera, backViewPort, posList) {
            this.postRender.camera = camera;
            this.postRender.needClean = true;
            this.postRender.draw(time, delay, context3D, collect, backViewPort, posList);
            posList["final"] = this.postRender.renderTexture;
        };
        return Gbuffer;
    }());
    egret3d.Gbuffer = Gbuffer;
    __reflect(Gbuffer.prototype, "egret3d.Gbuffer", ["egret3d.IPost"]);
})(egret3d || (egret3d = {}));
