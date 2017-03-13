var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @class egret3d.ContextTexture3D
    * @classdesc
    * 由6加Texture2D 组成
    * 可以使一个6面体上贴出不同的贴图
    * @see egret3d.Program3D
    * @see egret3d.IndexBuffer3D
    * @see egret3d.VertexBuffer3D
    * @see egret3d.ContextTexture2D
    * @see egret3d.Shader
    * @see egret3d.CubeTexture
    * @includeExample core/context/ContextTexture3D.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ContextTexture3D = (function () {
        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        function ContextTexture3D() {
            this.border = 0;
            this.useMipmap = true;
            this.colorformat = egret3d.ContextConfig.ColorFormat_RGBA8888;
            this.internalformat = egret3d.InternalFormat.PixelArray;
            this.mimapData = new Array();
        }
        /**
        * @language zh_CN
        * 释放接口
        * @version Egret 3.0
        * @platform Web,Native
        */
        ContextTexture3D.prototype.dispose = function () {
            if (this.texture) {
                egret3d.Context3DProxy.gl.deleteTexture(this.texture);
                this.texture = null;
            }
            if (this.image_front) {
                this.image_front.dispose();
                this.image_front = null;
            }
            if (this.image_back) {
                this.image_back.dispose();
                this.image_back = null;
            }
            if (this.image_left) {
                this.image_left.dispose();
                this.image_left = null;
            }
            if (this.image_right) {
                this.image_right.dispose();
                this.image_right = null;
            }
            if (this.image_up) {
                this.image_up.dispose();
                this.image_up = null;
            }
            if (this.image_down) {
                this.image_down.dispose();
                this.image_down = null;
            }
        };
        return ContextTexture3D;
    }());
    egret3d.ContextTexture3D = ContextTexture3D;
    __reflect(ContextTexture3D.prototype, "egret3d.ContextTexture3D");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ContextTexture3D.js.map