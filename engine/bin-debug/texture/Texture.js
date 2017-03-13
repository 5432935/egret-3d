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
    /**
    * @class egret3d.MimapTexture
    * @classdesc
    * Texture 贴图对象
    * dds tga hdr 几种贴图的格式加载后会生成的对象
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Texture = (function (_super) {
        __extends(Texture, _super);
        /**
        * @language zh_CN
        * 构造函数
        * 默认是平滑采样
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Texture() {
            var _this = _super.call(this) || this;
            _this.smooth = true;
            _this.texture2D = new egret3d.ContextTexture2D();
            return _this;
        }
        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        Texture.prototype.upload = function (context3D) {
            if (!this.texture2D.textureBuffer) {
                this.texture2D.textureBuffer = this.texture2D.textureBuffer || context3D.creatTexture();
                this.texture2D.internalFormat = this.internalFormat;
                this.texture2D.colorFormat = this.colorFormat;
                this.texture2D.mimapData = this.mimapData;
                this.texture2D.dataFormat = egret3d.Context3DProxy.gl.UNSIGNED_BYTE;
                if (this.mimapData && this.mimapData.length > 0) {
                    for (var i = 0; i < this.mimapData.length; i++) {
                        context3D.upLoadTextureData(i, this);
                    }
                }
                else {
                    context3D.upLoadTextureData(0, this);
                }
                if (this.parentTexture) {
                    if (!this.parentTexture.texture2D) {
                        this.parentTexture.upload(context3D);
                    }
                    this.texture2D = this.parentTexture.texture2D;
                    this.texture2D.internalFormat = this.parentTexture.internalFormat;
                    this.texture2D.colorFormat = this.parentTexture.colorFormat;
                    this.texture2D.mimapData = this.parentTexture.mimapData;
                }
            }
        };
        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        Texture.prototype.uploadForcing = function (context3D) {
            context3D.upLoadTextureData(0, this);
        };
        return Texture;
    }(egret3d.ITexture));
    egret3d.Texture = Texture;
    __reflect(Texture.prototype, "egret3d.Texture");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Texture.js.map