﻿module egret3d {

    /**
    * @class egret3d.ITexture
    * @classdesc
    * 贴图的接口
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ITexture {

        /**
        * @language zh_CN
        * 贴图是否使用 mipmap , mipmap为一个贴图的LOD层级贴图。例如（1024*1024的贴图，往下就会自动生成 512* 512,256*256,128*128,64*64,32*32,16*16,8*8,4*4,2*2,1*1）
        * @version Egret 3.0
        * @platform Web,Native
        */
        public useMipmap: boolean = true;

        /**
        * @language zh_CN
        * 是否平滑差值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public smooth: boolean = true;

        /**
        * @language zh_CN
        * 贴图采样方式
        * @version Egret 3.0
        * @platform Web,Native
        */
        public repeat: boolean = false;

        /**
        * @language zh_CN
        * 贴图的宽度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public width: number;

        /**
        * @language zh_CN
        * 贴图的高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public height: number;

        /**
        * @language zh_CN
        * Texture2D 对象 保存贴图的数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public texture2D: ContextTexture2D;

        /**
        * @language zh_CN
        * Texture3D 对象 保存贴图的数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public texture3D: ContextTexture3D;

        /**
         * @language zh_CN
         * 是否预乘alpha
         */
        public premultiply_alpha: number = 0;

        /**
         * gl.LINEAR
         * gl.NEAREST
         * gl.LINEAR_MIPMAP_LINEAR
         * gl.LINEAR_MIPMAP_NEAREST
         * gl.NEAREST_MIPMAP_LINEAR
         * gl.NEAREST_MIPMAP_NEAREST
         * @language zh_CN
         * 是否预乘alpha
         */
        public min_filter: number;

        /**
         * gl.LINEAR
         * gl.NEAREST
         * gl.LINEAR_MIPMAP_LINEAR
         * gl.LINEAR_MIPMAP_NEAREST
         * gl.NEAREST_MIPMAP_LINEAR
         * gl.NEAREST_MIPMAP_NEAREST
         * @language zh_CN
         * 是否预乘alpha
         */
        public mag_filter: number;

        /**
         * gl.REPEAT
         * gl.MIRRORED_REPEAT
         * gl.CLAMP_TO_EDGE
         * @language zh_CN
         * 是否预乘alpha
         */
        public wrap_u_filter: number;

        /**
         * gl.filp_y
         * @language zh_CN
         * 是否需要颠倒uv
         */
        public filp_y: number = 0;

        /**
         * gl.REPEAT
         * gl.MIRRORED_REPEAT
         * gl.CLAMP_TO_EDGE
         * @language zh_CN
         * 是否预乘alpha
         */
        public wrap_v_filter: number;

        public guiIndex: number;
        public uvRectangle: Rectangle;
        public parentTexture: ITexture;
        public copyFromTexture(texture: ITexture, x: number, y: number, width: number, height: number) {
            this.parentTexture = texture;
            texture.width = width; 
            texture.height = height; 
            this.guiIndex = texture.guiIndex;
            this.texture2D = texture.texture2D;
            this.uvRectangle = this.uvRectangle || new Rectangle();
            this.uvRectangle.x = x;
            this.uvRectangle.y = y;
            this.uvRectangle.width = width;
            this.uvRectangle.height = height;
        }

        /**
        * @language zh_CN
        * 上传贴图数据给GPU
        * @param context3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public upload(context3D: Context3DProxy) {
        }

        /**
        * @private
        * @language zh_CN
        * 上传贴图数据给GPU
        * @param context3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public hasMipmap: boolean = false;

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public internalFormat: InternalFormat;

        /**
        * @language zh_CN
        * 贴图颜色格式
        * @version Egret 3.0
        * @platform Web,Native
        */
        public colorFormat: number;

        /**
        * @language zh_CN
        * 贴图mipmap data
        * @version Egret 3.0
        * @platform Web,Native
        */
        public mimapData: Array<MipmapData>;

        /**
        * @language zh_CN
        * 强制上传贴图数据给GPU，强制要求贴图更新。
        * 在video 贴图类型需要立即改变显卡中的贴图内存
        * @param context3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uploadForcing(context3D: Context3DProxy) {

        }

        private ready: boolean = false;
        public activeState(context3D: Context3DProxy) {
            if (this.ready) return;
            this.ready = true;

            if (!this.premultiply_alpha) {
                Context3DProxy.gl.pixelStorei(Context3DProxy.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
            }

            if (this.useMipmap && !this.hasMipmap) {
                Context3DProxy.gl.generateMipmap(Context3DProxy.gl.TEXTURE_2D);
                this.hasMipmap = true;
            }

            if (this.smooth) {
                if (this.hasMipmap) {
                    context3D.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MIN_FILTER, Context3DProxy.gl.LINEAR_MIPMAP_LINEAR);
                    context3D.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MAG_FILTER, Context3DProxy.gl.LINEAR);
                }
                else {
                    context3D.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MIN_FILTER, Context3DProxy.gl.LINEAR);
                    context3D.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MAG_FILTER, Context3DProxy.gl.LINEAR);
                }
            }
            else {
                //if (this.useMipmap) {
                //    context3D.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MIN_FILTER, Context3DProxy.gl.NEAREST_MIPMAP_NEAREST);
                //    context3D.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MAG_FILTER, Context3DProxy.gl.NEAREST_MIPMAP_NEAREST);
                //}
                //else {
                context3D.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MIN_FILTER, Context3DProxy.gl.NEAREST);
                context3D.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MAG_FILTER, Context3DProxy.gl.NEAREST);
                //}
            }

            if (this.repeat) {
                context3D.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_S, Context3DProxy.gl.REPEAT);
                context3D.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_T, Context3DProxy.gl.REPEAT);
            } else {
                context3D.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_S, Context3DProxy.gl.CLAMP_TO_EDGE);
                context3D.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_T, Context3DProxy.gl.CLAMP_TO_EDGE);
            }

            if (this.filp_y) {
                Context3DProxy.gl.pixelStorei(Context3DProxy.gl.UNPACK_FLIP_Y_WEBGL, this.filp_y);
            }


        }

        /**
        * @language zh_CN
        * 释放接口
        * @version Egret 3.0
        * @platform Web,Native
        */
        public dispose(): void {
            if (this.texture2D) {
                this.texture2D.dispose();
            }
            this.texture2D = null;

            if (this.texture3D) {
                this.texture3D.dispose();
            }
            this.texture3D = null;
        }

        /**
        * @language zh_CN
        * 
        * @version Egret 3.0
        * @platform Web,Native
        */
        public readPixels(x: number, y: number, width: number, height: number, format: number = ContextConfig.ColorFormat_RGBA8888, type: number = ContextConfig.UNSIGNED_BYTE, pixels: ArrayBufferView = null): any{
            if (!pixels) {
                switch (type) {
                    case ContextConfig.UNSIGNED_BYTE:
                        if (format == ContextConfig.ColorFormat_RGBA8888) {
                            pixels = new Uint8Array(width * height * 4);
                        }
                        else if (format == ContextConfig.ColorFormat_RGB888) {
                            pixels = new Uint8Array(width * height * 3);
                        }
                        break;
                    case ContextConfig.FLOAT:
                        if (format == ContextConfig.ColorFormat_RGBA8888) {
                            pixels = new Float32Array(width * height * 4);
                        }
                        else if (format == ContextConfig.ColorFormat_RGB888) {
                            pixels = new Float32Array(width * height * 3);
                        }
                        break;
                }
            }

            return pixels;
        }
    }
}