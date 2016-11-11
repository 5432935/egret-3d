module egret3d {

    /**
    * @class egret3d.ITexture
    * @classdesc
    * 贴图的接口、
    * 贴图的基类对象 包括各类贴图的公共数据
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
        * 是否平滑插值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public smooth: boolean = true;

        /**
        * @language zh_CN
        * 贴图采样重复方式
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
        * 保存贴图的数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public texture2D: ContextTexture2D;

        /**
        * @language zh_CN
        * 保存贴图的数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public texture3D: ContextTexture3D;

        /**
        * @language zh_CN
        * 是否预乘alpha
        * @version Egret 3.0
        * @platform Web,Native
        */
        public premultiply_alpha: number = 0;

        /**
        * @language zh_CN
        * min_filter
        * Context3DProxy.gl.LINEAR
        * Context3DProxy.gl.NEAREST
        * Context3DProxy.gl.LINEAR_MIPMAP_LINEAR
        * Context3DProxy.gl.LINEAR_MIPMAP_NEAREST
        * Context3DProxy.gl.NEAREST_MIPMAP_LINEAR
        * Context3DProxy.gl.NEAREST_MIPMAP_NEAREST
        * @version Egret 3.0
        * @platform Web,Native
        */
        public min_filter: number;

        /**
        * @language zh_CN
        * Context3DProxy.gl.LINEAR
        * Context3DProxy.gl.NEAREST
        * Context3DProxy.gl.LINEAR_MIPMAP_LINEAR
        * Context3DProxy.gl.LINEAR_MIPMAP_NEAREST
        * Context3DProxy.gl.NEAREST_MIPMAP_LINEAR
        * Context3DProxy.gl.NEAREST_MIPMAP_NEAREST
        * mag_filter
        * @version Egret 3.0
        * @platform Web,Native
        */
        public mag_filter: number;

        /**
        * @language zh_CN
        * Context3DProxy.gl.REPEAT
        * Context3DProxy.gl.MIRRORED_REPEAT
        * Context3DProxy.gl.CLAMP_TO_EDGE
        * wrap_u_filter
        * @version Egret 3.0
        * @platform Web,Native
        */
        public wrap_u_filter: number;

        /**
        * @language zh_CN
        * filp_y
        * Context3DProxy.gl.filp_y
        * @version Egret 3.0
        * @platform Web,Native
        */
        public filp_y: number = 0;

        /**
        * @language zh_CN
        * wrap_v_filter
        * Context3DProxy.gl.REPEAT
        * Context3DProxy.gl.MIRRORED_REPEAT
        * Context3DProxy.gl.CLAMP_TO_EDGE
        * @version Egret 3.0
        * @platform Web,Native
        */
        public wrap_v_filter: number;

        /**
        * @language zh_CN
        * 在gui中的的下标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public guiIndex: number;

        /**
        * @language zh_CN
        * uv信息，st坐标和缩放数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uvRectangle: Rectangle;

        /**
        * @language zh_CN
        * 所属父级贴图，表示当前贴图隶属于某个贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public parentTexture: ITexture;

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
        * @param context3D 图形绘制上下文
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
        * 贴图 是否需要按照U的方向镜像
        * @version Egret 3.0
        * @platform Web,Native
        */
        public mirroredU: boolean = false;

        /**
        * @language zh_CN
        * 贴图 是否需要按照V的方向镜像
        * @version Egret 3.0
        * @platform Web,Native
        */
        public mirroredV: boolean = false;

        /**
        * @private
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

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
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
                context3D.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MIN_FILTER, Context3DProxy.gl.NEAREST);
                context3D.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MAG_FILTER, Context3DProxy.gl.NEAREST);
            }

            if (this.repeat) {
                if (this.mirroredU) {
                    Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_S, Context3DProxy.gl.MIRRORED_REPEAT);
                }
                else if (this.mirroredV) {
                    Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_T, Context3DProxy.gl.MIRRORED_REPEAT);  
                }
                else {
                    context3D.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_S, Context3DProxy.gl.REPEAT);
                    context3D.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_T, Context3DProxy.gl.REPEAT);
                }
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
        * @private
        * @language zh_CN
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