var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @class egret3d.ContextTexture2D
    * @classdesc
    * Texture 类表示上载到渲染上下文的二维纹理。</p>
    *
    * 定义一个 2D 纹理，以便在渲染期间使用。</p>
    * 无法直接实例化 Texture。使用 Context3DProxy createTexture() 方法创建实例。</p>
    * @see egret3d.Program3D
    * @see egret3d.IndexBuffer3D
    * @see egret3d.VertexBuffer3D
    * @see egret3d.Shader
    * @see egret3d.CubeTexture
    * @see egret3d.Context3DProxy
    * @includeExample core/context/ContextTexture2D.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ContextTexture2D = (function () {
        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        function ContextTexture2D() {
            this.border = 0;
            this.imageData = null;
            //this.colorFormat = ContextConfig.ColorFormat_RGBA8888;
            //this.dataFormat = Context3DProxy.gl.UNSIGNED_BYTE;
            //this.internalFormat = InternalFormat.PixelArray;
            //this.mimapData = new Array<MipmapData>();
        }
        /**
        * @language zh_CN
        * 释放接口
        * @version Egret 3.0
        * @platform Web,Native
        */
        ContextTexture2D.prototype.dispose = function () {
            if (this.textureBuffer) {
                egret3d.Context3DProxy.gl.deleteTexture(this.textureBuffer);
                this.textureBuffer = null;
            }
            if (this.frameBuffer) {
                egret3d.Context3DProxy.gl.deleteFramebuffer(this.frameBuffer);
                this.frameBuffer = null;
            }
            if (this.renderbuffer) {
                egret3d.Context3DProxy.gl.deleteRenderbuffer(this.renderbuffer);
                this.renderbuffer = null;
            }
        };
        return ContextTexture2D;
    }());
    egret3d.ContextTexture2D = ContextTexture2D;
    __reflect(ContextTexture2D.prototype, "egret3d.ContextTexture2D");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ContextTexture2D.js.map