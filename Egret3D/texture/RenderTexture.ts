module egret3d {

    /**
    * @private
    * @class egret3d.RenderTexture
    * @classdesc
    * 渲染目标贴图
    * @see egret3d.ITexture
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class RenderTexture extends ITexture{

        /**
        * @language zh_CN
        * 帧buffer的格式
        * @version Egret 3.0
        * @platform Web,Native
        */
        public frameBufferFormat: FrameBufferFormat = FrameBufferFormat.UNSIGNED_BYTE_RGB;

        /**
        * @language zh_CN
        * 构造函数
        * @param width  贴图的宽度 默认参数 默认为512
        * @param height 贴图的高度 默认参数 默认为512
        * @param frameBufferFormat 帧buffer的格式 默认参数 FrameBufferFormat.UNSIGNED_BYTE_RGB
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(width: number = 512, height: number = 512, frameBufferFormat: FrameBufferFormat = FrameBufferFormat.UNSIGNED_BYTE_RGB) {
            super();
            this.useMipmap = false;
            this.smooth = false;
            this.width = width;
            this.height = height;
            this.frameBufferFormat = frameBufferFormat;
            this.uvRectangle = new Rectangle(0, 0, 1.0, 1.0);
            switch (this.frameBufferFormat) {
                case FrameBufferFormat.UNSIGNED_BYTE_RGBA:
                    this.colorFormat = ContextConfig.UNSIGNED_BYTE;
                    break;
                case FrameBufferFormat.UNSIGNED_BYTE_RGB:
                    this.colorFormat = ContextConfig.UNSIGNED_BYTE;
                    break;
                case FrameBufferFormat.FLOAT_RGBA:
                    this.colorFormat = ContextConfig.FLOAT;
                    break;
                case FrameBufferFormat.FLOAT_RGB:
                    this.colorFormat = ContextConfig.FLOAT;
                    break;
            }
        }

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public upload(context3D: Context3DProxy) {
            if (!this.texture2D) {
                this.texture2D = context3D.createFramebuffer(this.width, this.height, this.frameBufferFormat );
            }
        }

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uploadForcing(context3D: Context3DProxy) {

        }

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public fillPixels() {
            if (this.texture2D) {
                var pixels: Uint8Array;
                if (!this.texture2D.mimapData) {
                    this.texture2D.mimapData = [];
                    switch (this.frameBufferFormat) {
                        case FrameBufferFormat.UNSIGNED_BYTE_RGBA:
                            pixels = new Uint8Array(this.width * this.height * 4);
                            break;
                        case FrameBufferFormat.UNSIGNED_BYTE_RGB:
                            pixels = new Uint8Array(this.width * this.height * 3);
                            break;
                        case FrameBufferFormat.FLOAT_RGBA:
                            pixels = new Float32Array(this.width * this.height * 4);
                            break;
                        case FrameBufferFormat.FLOAT_RGB:
                            pixels = new Float32Array(this.width * this.height * 3);
                            break;
                    }
                    var mipmapData: MipmapData = new MipmapData(pixels, this.width, this.height);
                    this.texture2D.mimapData.push(mipmapData);
                }
                else {
                    var mipmapData: MipmapData = this.texture2D.mimapData[0];
                    pixels = mipmapData.data;
                }

                Context3DProxy.gl.readPixels(0, 0, this.width, this.height, this.colorFormat, ContextConfig.UNSIGNED_BYTE, pixels);
            }
        }

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public readPixels(x: number, y: number, width: number, height: number, format: number = ContextConfig.ColorFormat_RGBA8888, type: number = ContextConfig.UNSIGNED_BYTE, pixels: ArrayBufferView = null): any {
            pixels = super.readPixels(x, y, width, height, format, type, pixels);

            if (this.texture2D && this.texture2D.mimapData) {
                var mipmapData: MipmapData = this.texture2D.mimapData[0];
                var data: Uint8Array = mipmapData.data;
                var count: number = 4;
                switch (this.frameBufferFormat) {
                    case FrameBufferFormat.UNSIGNED_BYTE_RGBA:
                    case FrameBufferFormat.FLOAT_RGBA:
                        count = 4;
                        break;
                    case FrameBufferFormat.UNSIGNED_BYTE_RGB:
                    case FrameBufferFormat.FLOAT_RGB:
                        count = 3;
                        break;
                }

                for (var i: number = 0; i < height; ++i) {
                    for (var j: number = 0; j < width; ++j) {
                        for (var k: number = 0; k < count; ++k) {
                            pixels[(i * width + j) * 4 + k] = data[((y + i) * this.width + (x + j)) * 4 + k];
                        }
                    }
                }
            }

            return pixels;
        }
    }
} 