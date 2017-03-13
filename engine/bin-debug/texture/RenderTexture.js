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
    * @private
    * @class egret3d.RenderTexture
    * @classdesc
    * 渲染目标贴图
    * @see egret3d.ITexture
    * @version Egret 3.0
    * @platform Web,Native
    */
    var RenderTexture = (function (_super) {
        __extends(RenderTexture, _super);
        /**
        * @language zh_CN
        * 构造函数
        * @param width  贴图的宽度 默认参数 默认为512
        * @param height 贴图的高度 默认参数 默认为512
        * @param frameBufferFormat 帧buffer的格式 默认参数 FrameBufferFormat.UNSIGNED_BYTE_RGB
        * @version Egret 3.0
        * @platform Web,Native
        */
        function RenderTexture(width, height, frameBufferFormat) {
            if (width === void 0) { width = 512; }
            if (height === void 0) { height = 512; }
            if (frameBufferFormat === void 0) { frameBufferFormat = egret3d.FrameBufferFormat.UNSIGNED_BYTE_RGB; }
            var _this = _super.call(this) || this;
            /**
            * @language zh_CN
            * 帧buffer的格式
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.frameBufferFormat = egret3d.FrameBufferFormat.UNSIGNED_BYTE_RGB;
            _this.useMipmap = false;
            _this.smooth = false;
            _this.width = width;
            _this.height = height;
            _this.frameBufferFormat = frameBufferFormat;
            _this.uvRectangle = new egret3d.Rectangle(0, 0, 1.0, 1.0);
            switch (_this.frameBufferFormat) {
                case egret3d.FrameBufferFormat.UNSIGNED_BYTE_RGBA:
                    _this.colorFormat = egret3d.ContextConfig.UNSIGNED_BYTE;
                    break;
                case egret3d.FrameBufferFormat.UNSIGNED_BYTE_RGB:
                    _this.colorFormat = egret3d.ContextConfig.UNSIGNED_BYTE;
                    break;
                case egret3d.FrameBufferFormat.FLOAT_RGBA:
                    _this.colorFormat = egret3d.ContextConfig.FLOAT;
                    break;
                case egret3d.FrameBufferFormat.FLOAT_RGB:
                    _this.colorFormat = egret3d.ContextConfig.FLOAT;
                    break;
            }
            return _this;
        }
        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        RenderTexture.prototype.upload = function (context3D) {
            if (!this.texture2D) {
                this.texture2D = context3D.createFramebuffer(this.width, this.height, this.frameBufferFormat);
            }
        };
        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        RenderTexture.prototype.uploadForcing = function (context3D) {
        };
        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        RenderTexture.prototype.fillPixels = function () {
            if (this.texture2D) {
                var pixels;
                if (!this.texture2D.mimapData) {
                    this.texture2D.mimapData = [];
                    switch (this.frameBufferFormat) {
                        case egret3d.FrameBufferFormat.UNSIGNED_BYTE_RGBA:
                            pixels = new Uint8Array(this.width * this.height * 4);
                            break;
                        case egret3d.FrameBufferFormat.UNSIGNED_BYTE_RGB:
                            pixels = new Uint8Array(this.width * this.height * 3);
                            break;
                        case egret3d.FrameBufferFormat.FLOAT_RGBA:
                            pixels = new Float32Array(this.width * this.height * 4);
                            break;
                        case egret3d.FrameBufferFormat.FLOAT_RGB:
                            pixels = new Float32Array(this.width * this.height * 3);
                            break;
                    }
                    var mipmapData = new egret3d.MipmapData(pixels, this.width, this.height);
                    this.texture2D.mimapData.push(mipmapData);
                }
                else {
                    var mipmapData = this.texture2D.mimapData[0];
                    pixels = mipmapData.data;
                }
                egret3d.Context3DProxy.gl.readPixels(0, 0, this.width, this.height, this.colorFormat, egret3d.ContextConfig.UNSIGNED_BYTE, pixels);
            }
        };
        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        RenderTexture.prototype.readPixels = function (x, y, width, height, format, type, pixels) {
            if (format === void 0) { format = egret3d.ContextConfig.ColorFormat_RGBA8888; }
            if (type === void 0) { type = egret3d.ContextConfig.UNSIGNED_BYTE; }
            if (pixels === void 0) { pixels = null; }
            pixels = _super.prototype.readPixels.call(this, x, y, width, height, format, type, pixels);
            if (this.texture2D && this.texture2D.mimapData) {
                var mipmapData = this.texture2D.mimapData[0];
                var data = mipmapData.data;
                var count = 4;
                switch (this.frameBufferFormat) {
                    case egret3d.FrameBufferFormat.UNSIGNED_BYTE_RGBA:
                    case egret3d.FrameBufferFormat.FLOAT_RGBA:
                        count = 4;
                        break;
                    case egret3d.FrameBufferFormat.UNSIGNED_BYTE_RGB:
                    case egret3d.FrameBufferFormat.FLOAT_RGB:
                        count = 3;
                        break;
                }
                for (var i = 0; i < height; ++i) {
                    for (var j = 0; j < width; ++j) {
                        for (var k = 0; k < count; ++k) {
                            pixels[(i * width + j) * 4 + k] = data[((y + i) * this.width + (x + j)) * 4 + k];
                        }
                    }
                }
            }
            return pixels;
        };
        return RenderTexture;
    }(egret3d.ITexture));
    egret3d.RenderTexture = RenderTexture;
    __reflect(RenderTexture.prototype, "egret3d.RenderTexture");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=RenderTexture.js.map