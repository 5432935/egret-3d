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
    /*
    * @private
    */
    var PostRender = (function (_super) {
        __extends(PostRender, _super);
        function PostRender(vs, fs) {
            var _this = _super.call(this) || this;
            _this.hud = new egret3d.HUD();
            _this.needClean = false;
            _this.hud.vsShader = vs;
            _this.hud.fsShader = fs;
            return _this;
        }
        PostRender.prototype.setRenderToTexture = function (width, height, format) {
            if (format === void 0) { format = egret3d.FrameBufferFormat.UNSIGNED_BYTE_RGB; }
            this.renderTexture = new egret3d.RenderTexture(width, height, format);
        };
        PostRender.prototype.draw = function (time, delay, context3D, collect, backViewPort, posList) {
            var len = collect.renderList.length;
            if (this.renderTexture) {
                this.renderTexture.upload(context3D);
                context3D.setRenderToTexture(this.renderTexture.texture2D, this.needClean, true, 0);
            }
            //--------render container--------------
            this.hud.viewPort = this.camera.viewPort;
            this.hud.x = this.camera.viewPort.x;
            this.hud.y = this.camera.viewPort.y;
            this.hud.width = this.camera.viewPort.width;
            this.hud.height = this.camera.viewPort.height;
            this.hud.diffuseTexture = posList["final"];
            this.hud["colorTexture"] = posList["source"];
            this.hud.draw(context3D, this.camera);
            //--------------------------------------
            if (this.renderTexture)
                context3D.setRenderToBackBuffer();
            if (backViewPort) {
                context3D.viewPort(backViewPort.x, backViewPort.y, backViewPort.width, backViewPort.height);
                context3D.setScissorRectangle(backViewPort.x, backViewPort.y, backViewPort.width, backViewPort.height);
            }
        };
        return PostRender;
    }(egret3d.RenderBase));
    egret3d.PostRender = PostRender;
    __reflect(PostRender.prototype, "egret3d.PostRender");
})(egret3d || (egret3d = {}));
