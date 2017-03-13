var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @class egret3d.ITexture
    * @classdesc
    * 贴图的接口、
    * 贴图的基类对象 包括各类贴图的公共数据
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ITexture = (function () {
        function ITexture() {
            /**
            * @language zh_CN
            * 贴图是否使用 mipmap , mipmap为一个贴图的LOD层级贴图。例如（1024*1024的贴图，往下就会自动生成 512* 512,256*256,128*128,64*64,32*32,16*16,8*8,4*4,2*2,1*1）
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.useMipmap = true;
            /**
            * @language zh_CN
            * 是否平滑插值
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.smooth = true;
            /**
            * @language zh_CN
            * 贴图采样重复方式
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.repeat = false;
            /**
            * @language zh_CN
            * 是否预乘alpha
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.premultiply_alpha = 0;
            /**
            * @language zh_CN
            * filp_y
            * Context3DProxy.gl.filp_y
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.filp_y = 0;
            /**
            * @private
            * @language zh_CN
            * 上传贴图数据给GPU
            * @param context3D
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.hasMipmap = false;
            /**
            * @language zh_CN
            * 贴图 是否需要按照U的方向镜像
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.mirroredU = false;
            /**
            * @language zh_CN
            * 贴图 是否需要按照V的方向镜像
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.mirroredV = false;
            this.ready = false;
        }
        /**
       * @language zh_CN
       * 从父级贴图对象中，拷贝一个贴图对象出来
       * @param texture 父级贴图对象
       * @param x 贴图在父级贴图中的x坐标偏移值
       * @param y 贴图在父级贴图中的y坐标偏移值
       * @param width 贴图宽度
       * @param height 贴图高度
       * @version Egret 3.0
       * @platform Web,Native
       */
        ITexture.prototype.copyFromTexture = function (texture, x, y, width, height) {
            this.parentTexture = texture;
            texture.width = width;
            texture.height = height;
            this.guiIndex = texture.guiIndex;
            this.texture2D = texture.texture2D;
            this.uvRectangle = this.uvRectangle || new egret3d.Rectangle();
            this.uvRectangle.x = x;
            this.uvRectangle.y = y;
            this.uvRectangle.width = width;
            this.uvRectangle.height = height;
        };
        /**
        * @language zh_CN
        * 上传贴图数据给GPU
        * @param context3D 图形绘制上下文
        * @version Egret 3.0
        * @platform Web,Native
        */
        ITexture.prototype.upload = function (context3D) {
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
        ITexture.prototype.uploadForcing = function (context3D) {
        };
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        ITexture.prototype.activeState = function (context3D) {
            if (this.ready)
                return;
            this.ready = true;
            if (!this.premultiply_alpha) {
                egret3d.Context3DProxy.gl.pixelStorei(egret3d.Context3DProxy.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
            }
            if (this.useMipmap && !this.hasMipmap) {
                egret3d.Context3DProxy.gl.generateMipmap(egret3d.Context3DProxy.gl.TEXTURE_2D);
                this.hasMipmap = true;
            }
            if (this.smooth) {
                if (this.hasMipmap) {
                    context3D.texParameteri(egret3d.Context3DProxy.gl.TEXTURE_2D, egret3d.Context3DProxy.gl.TEXTURE_MIN_FILTER, egret3d.Context3DProxy.gl.LINEAR_MIPMAP_LINEAR);
                    context3D.texParameteri(egret3d.Context3DProxy.gl.TEXTURE_2D, egret3d.Context3DProxy.gl.TEXTURE_MAG_FILTER, egret3d.Context3DProxy.gl.LINEAR);
                }
                else {
                    context3D.texParameteri(egret3d.Context3DProxy.gl.TEXTURE_2D, egret3d.Context3DProxy.gl.TEXTURE_MIN_FILTER, egret3d.Context3DProxy.gl.LINEAR);
                    context3D.texParameteri(egret3d.Context3DProxy.gl.TEXTURE_2D, egret3d.Context3DProxy.gl.TEXTURE_MAG_FILTER, egret3d.Context3DProxy.gl.LINEAR);
                }
            }
            else {
                context3D.texParameteri(egret3d.Context3DProxy.gl.TEXTURE_2D, egret3d.Context3DProxy.gl.TEXTURE_MIN_FILTER, egret3d.Context3DProxy.gl.NEAREST);
                context3D.texParameteri(egret3d.Context3DProxy.gl.TEXTURE_2D, egret3d.Context3DProxy.gl.TEXTURE_MAG_FILTER, egret3d.Context3DProxy.gl.NEAREST);
            }
            if (this.repeat) {
                if (this.mirroredU) {
                    egret3d.Context3DProxy.gl.texParameteri(egret3d.Context3DProxy.gl.TEXTURE_2D, egret3d.Context3DProxy.gl.TEXTURE_WRAP_S, egret3d.Context3DProxy.gl.MIRRORED_REPEAT);
                }
                else if (this.mirroredV) {
                    egret3d.Context3DProxy.gl.texParameteri(egret3d.Context3DProxy.gl.TEXTURE_2D, egret3d.Context3DProxy.gl.TEXTURE_WRAP_T, egret3d.Context3DProxy.gl.MIRRORED_REPEAT);
                }
                else {
                    context3D.texParameteri(egret3d.Context3DProxy.gl.TEXTURE_2D, egret3d.Context3DProxy.gl.TEXTURE_WRAP_S, egret3d.Context3DProxy.gl.REPEAT);
                    context3D.texParameteri(egret3d.Context3DProxy.gl.TEXTURE_2D, egret3d.Context3DProxy.gl.TEXTURE_WRAP_T, egret3d.Context3DProxy.gl.REPEAT);
                }
            }
            else {
                context3D.texParameteri(egret3d.Context3DProxy.gl.TEXTURE_2D, egret3d.Context3DProxy.gl.TEXTURE_WRAP_S, egret3d.Context3DProxy.gl.CLAMP_TO_EDGE);
                context3D.texParameteri(egret3d.Context3DProxy.gl.TEXTURE_2D, egret3d.Context3DProxy.gl.TEXTURE_WRAP_T, egret3d.Context3DProxy.gl.CLAMP_TO_EDGE);
            }
            if (this.filp_y) {
                egret3d.Context3DProxy.gl.pixelStorei(egret3d.Context3DProxy.gl.UNPACK_FLIP_Y_WEBGL, this.filp_y);
            }
        };
        /**
        * @language zh_CN
        * 释放接口
        * @version Egret 3.0
        * @platform Web,Native
        */
        ITexture.prototype.dispose = function () {
            if (this.texture2D) {
                this.texture2D.dispose();
            }
            this.texture2D = null;
            if (this.texture3D) {
                this.texture3D.dispose();
            }
            this.texture3D = null;
        };
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        ITexture.prototype.readPixels = function (x, y, width, height, format, type, pixels) {
            if (format === void 0) { format = egret3d.ContextConfig.ColorFormat_RGBA8888; }
            if (type === void 0) { type = egret3d.ContextConfig.UNSIGNED_BYTE; }
            if (pixels === void 0) { pixels = null; }
            if (!pixels) {
                switch (type) {
                    case egret3d.ContextConfig.UNSIGNED_BYTE:
                        if (format == egret3d.ContextConfig.ColorFormat_RGBA8888) {
                            pixels = new Uint8Array(width * height * 4);
                        }
                        else if (format == egret3d.ContextConfig.ColorFormat_RGB888) {
                            pixels = new Uint8Array(width * height * 3);
                        }
                        break;
                    case egret3d.ContextConfig.FLOAT:
                        if (format == egret3d.ContextConfig.ColorFormat_RGBA8888) {
                            pixels = new Float32Array(width * height * 4);
                        }
                        else if (format == egret3d.ContextConfig.ColorFormat_RGB888) {
                            pixels = new Float32Array(width * height * 3);
                        }
                        break;
                }
            }
            return pixels;
        };
        return ITexture;
    }());
    egret3d.ITexture = ITexture;
    __reflect(ITexture.prototype, "egret3d.ITexture");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ITexture.js.map