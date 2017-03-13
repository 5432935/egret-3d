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
    * @class egret3d.ImageTexture
    * @classdesc
    * ImageTexture 类为 图像贴图
    * 加载png、jpg 会返回此对象
    *
    * 图像贴图用于封装 HTMLImageElement（网页图像元素）到引擎内部可使用的Texture2D对象, </p>
    * HTMLImageElement 可通过内嵌HTML文件中获取。</p>
    *
    *
    * 示例：
    * 假设html中已有 &lt;img id="t1" src="xxx.png" /&gt;
    * <pre>
    * var img: HTMLImageElement = <HTMLImageElement>document.getElementById("t1");
    * var imageTexture: egret3d.ImageTexture = new egret3d.ImageTexture(img);
    * </pre>
    * @includeExample texture/ImageTexture.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ImageTexture = (function (_super) {
        __extends(ImageTexture, _super);
        /**
        * @language zh_CN
        * 构造函数
        * @param img HTMLImageElement（网页图像元素）
        * @version Egret 3.0
        * @platform Web,Native
        */
        function ImageTexture(img) {
            var _this = _super.call(this) || this;
            _this.imageData = img;
            _this.texture2D = new egret3d.ContextTexture2D();
            _this.texture2D.imageData = img;
            return _this;
        }
        Object.defineProperty(ImageTexture.prototype, "width", {
            /**
            * @language zh_CN
            * 获取贴图像素宽度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.imageData.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImageTexture.prototype, "height", {
            /**
           * @language zh_CN
           * 获取贴图像素高度
           * @version Egret 3.0
           * @platform Web,Native
           */
            get: function () {
                return this.imageData.height;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 上传贴图数据给GPU
        * @param context3D 呈现几何定义图形的上下文
        * @version Egret 3.0
        * @platform Web,Native
        */
        ImageTexture.prototype.upload = function (context3D) {
            if (!this.texture2D.textureBuffer) {
                this.texture2D.textureBuffer = this.texture2D.textureBuffer || context3D.creatTexture();
                this.texture2D.internalFormat = egret3d.InternalFormat.ImageData;
                this.texture2D.imageData = this.imageData;
                this.texture2D.dataFormat = egret3d.Context3DProxy.gl.UNSIGNED_BYTE;
                this.texture2D.colorFormat = egret3d.ContextConfig.ColorFormat_RGBA8888;
                context3D.upLoadTextureData(0, this);
            }
        };
        /**
        * @private
        * @language zh_CN
        * 强制上传贴图数据给GPU，强制要求贴图更新。
        * 在video 贴图类型需要立即改变显卡中的贴图内存
        * @param context3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        ImageTexture.prototype.uploadForcing = function (context3D) {
            context3D.upLoadTextureData(0, this);
        };
        /**
        * @language zh_CN
        * 释放接口
        * @version Egret 3.0
        * @platform Web,Native
        */
        ImageTexture.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this.imageData) {
                delete this.imageData;
                this.imageData = null;
            }
        };
        /**
        * @private
        * @language zh_CN
        * 读取image的byteArray数据
        * @param x 读取的x偏移值
        * @param y 读取的y偏移值
        * @param width  读取的宽度
        * @param height 读取的高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        ImageTexture.prototype.readPixels = function (x, y, width, height, format, type, pixels) {
            if (format === void 0) { format = egret3d.ContextConfig.ColorFormat_RGBA8888; }
            if (type === void 0) { type = egret3d.ContextConfig.UNSIGNED_BYTE; }
            if (pixels === void 0) { pixels = null; }
            return egret3d.Stage3D.draw2DImage(this.imageData, x, y, width, height);
        };
        return ImageTexture;
    }(egret3d.ITexture));
    egret3d.ImageTexture = ImageTexture;
    __reflect(ImageTexture.prototype, "egret3d.ImageTexture");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ImageTexture.js.map