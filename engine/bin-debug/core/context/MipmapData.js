var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @class egret3d.MipmapData
    * @classdesc
    * 一个贴图的不同LOD层级数据。</p>
    * 生成 mipmap 可以使用 TextureUtil.generateMipMaps() 来制作lod mipmapdata。</p>
    *
    *
    * @see egret3d.openGLES.Program3D
    * @see egret3d.openGLES.IndexBuffer3D
    * @see egret3d.openGLES.VertexBuffer3D
    * @see egret3d.openGLES.Texture2D
    * @see egret3d.openGLES.Shader
    * @see egret3d.openGLES.CubeTexture
    * @version Egret 3.0
    * @platform Web,Native
    */
    var MipmapData = (function () {
        /**
        * @language zh_CN
        * 创建一个MipmapData 对象
        * @param data 数据内容
        * @param width 宽度
        * @param height 高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        function MipmapData(data, width, height) {
            this.data = data;
            this.width = width;
            this.height = height;
        }
        return MipmapData;
    }());
    egret3d.MipmapData = MipmapData;
    __reflect(MipmapData.prototype, "egret3d.MipmapData");
})(egret3d || (egret3d = {}));
