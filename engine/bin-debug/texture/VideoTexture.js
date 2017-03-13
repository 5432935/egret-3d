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
     * @class egret3d.VideoTexture
     * @classdesc
     * VideoTexture 使用 Video 标签采集 video 视频 </p>
     * VideoTexture 仅且暂时只能在pc上正常使用，移动端需要直接与用户交互才可正常生成播放</p>
     * 需要设置贴图的宽度和高度。必须为2的N次</p>
     * @version Egret 3.0
     * @platform Web,Native
     */
    var VideoTexture = (function (_super) {
        __extends(VideoTexture, _super);
        /**
        * @language zh_CN
        * 构造函数
        * @param width 贴图宽度 默认参数 256
        * @param height 贴图高度 默认参数 256
        * @version Egret 3.0
        * @platform Web,Native
        */
        function VideoTexture(width, height) {
            if (width === void 0) { width = 256; }
            if (height === void 0) { height = 256; }
            var _this = _super.call(this) || this;
            _this.canUpdataTexture = false;
            _this.width = width;
            _this.height = height;
            _this.texture2D = new egret3d.ContextTexture2D();
            _this.tmpCanvas = document.createElement("canvas");
            _this.tmpCanvas.width = width;
            _this.tmpCanvas.height = height;
            _this.context = _this.tmpCanvas.getContext('2d');
            _this.video = document.createElement("video");
            _this.video.msZoom = true;
            _this.video.width = width;
            _this.video.height = height;
            _this.video.controls = false;
            _this.video.autoplay = true;
            _this.video.addEventListener("canplaythrough", function () { return _this.loadReady(); }, true);
            _this.tmpCanvas.hidden = true;
            return _this;
        }
        VideoTexture.prototype.loadReady = function () {
            this.canUpdataTexture = true;
        };
        Object.defineProperty(VideoTexture.prototype, "source", {
            /**
            * @language zh_CN
            * 返回 视频链接
            * 视频的链接地址，只要是h5 支持的格式都支持， 例如:ogv,mp4,avi
            * warning chrom need use url = http://127.0.0.1/resource/video/xxx.mp4
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.video.src;
            },
            /*
            * @language zh_CN
            * 设置 视频链接
            * 设置 视频的链接地址，只要是h5 支持的格式都支持， 例如: ogv,mp4,avi
            * warning chrom need use url = http://127.0.0.1/resource/video/xxx.mp4
            * @param src 视频格式的链接地址
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (src) {
                this.video.src = src;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 播放视频
        * 当视频缓冲好之后才能正常播放视频
        * @version Egret 3.0
        * @platform Web,Native
        */
        VideoTexture.prototype.play = function () {
            this.video.play();
        };
        /**
        * @language zh_CN
        * 暂停视频
        * 控制视频的播放暂停状态
        * @version Egret 3.0
        * @platform Web,Native
        */
        VideoTexture.prototype.pause = function () {
            this.video.pause();
        };
        /**
        * @private
        * @language zh_CN
        * 上传贴图数据给GPU
        * 将video的视频数据实时传输到GPU上
        * @param context3D
        */
        VideoTexture.prototype.upload = function (context3D) {
            if (!this.texture2D.textureBuffer) {
                this.texture2D.textureBuffer = this.texture2D.textureBuffer || context3D.creatTexture();
                this.context.drawImage(this.video, 0, 0, this.width, this.height);
                egret3d.Context3DProxy.gl.pixelStorei(egret3d.Context3DProxy.gl.UNPACK_ALIGNMENT, 1);
                egret3d.Context3DProxy.gl.bindTexture(egret3d.Context3DProxy.gl.TEXTURE_2D, this.texture2D.textureBuffer);
                egret3d.Context3DProxy.gl.texImage2D(egret3d.Context3DProxy.gl.TEXTURE_2D, 0, egret3d.Context3DProxy.gl.RGB, egret3d.Context3DProxy.gl.RGB, egret3d.Context3DProxy.gl.UNSIGNED_BYTE, this.tmpCanvas);
                egret3d.Context3DProxy.gl.texParameteri(egret3d.Context3DProxy.gl.TEXTURE_2D, egret3d.Context3DProxy.gl.TEXTURE_MIN_FILTER, egret3d.Context3DProxy.gl.LINEAR);
                egret3d.Context3DProxy.gl.texParameteri(egret3d.Context3DProxy.gl.TEXTURE_2D, egret3d.Context3DProxy.gl.TEXTURE_MAG_FILTER, egret3d.Context3DProxy.gl.LINEAR);
                egret3d.Context3DProxy.gl.texParameteri(egret3d.Context3DProxy.gl.TEXTURE_2D, egret3d.Context3DProxy.gl.TEXTURE_WRAP_S, egret3d.Context3DProxy.gl.CLAMP_TO_EDGE);
                egret3d.Context3DProxy.gl.texParameteri(egret3d.Context3DProxy.gl.TEXTURE_2D, egret3d.Context3DProxy.gl.TEXTURE_WRAP_T, egret3d.Context3DProxy.gl.CLAMP_TO_EDGE);
            }
            if (this.canUpdataTexture) {
                this.context.drawImage(this.video, 0, 0, this.width, this.height);
                egret3d.Context3DProxy.gl.pixelStorei(egret3d.Context3DProxy.gl.UNPACK_ALIGNMENT, 1);
                egret3d.Context3DProxy.gl.bindTexture(egret3d.Context3DProxy.gl.TEXTURE_2D, this.texture2D.textureBuffer);
                egret3d.Context3DProxy.gl.texImage2D(egret3d.Context3DProxy.gl.TEXTURE_2D, 0, egret3d.Context3DProxy.gl.RGB, egret3d.Context3DProxy.gl.RGB, egret3d.Context3DProxy.gl.UNSIGNED_BYTE, this.tmpCanvas);
                egret3d.Context3DProxy.gl.texParameteri(egret3d.Context3DProxy.gl.TEXTURE_2D, egret3d.Context3DProxy.gl.TEXTURE_MIN_FILTER, egret3d.Context3DProxy.gl.LINEAR);
                egret3d.Context3DProxy.gl.texParameteri(egret3d.Context3DProxy.gl.TEXTURE_2D, egret3d.Context3DProxy.gl.TEXTURE_MAG_FILTER, egret3d.Context3DProxy.gl.LINEAR);
                egret3d.Context3DProxy.gl.texParameteri(egret3d.Context3DProxy.gl.TEXTURE_2D, egret3d.Context3DProxy.gl.TEXTURE_WRAP_S, egret3d.Context3DProxy.gl.CLAMP_TO_EDGE);
                egret3d.Context3DProxy.gl.texParameteri(egret3d.Context3DProxy.gl.TEXTURE_2D, egret3d.Context3DProxy.gl.TEXTURE_WRAP_T, egret3d.Context3DProxy.gl.CLAMP_TO_EDGE);
            }
        };
        /**
        * @private
        */
        VideoTexture.prototype.uploadForcing = function (context3D) {
        };
        return VideoTexture;
    }(egret3d.ITexture));
    egret3d.VideoTexture = VideoTexture;
    __reflect(VideoTexture.prototype, "egret3d.VideoTexture");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=VideoTexture.js.map