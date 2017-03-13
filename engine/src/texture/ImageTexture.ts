﻿module egret3d {

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
    export class ImageTexture extends ITexture {

        /**
        * @language zh_CN
        * 贴图数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public imageData: HTMLImageElement;


        /**
        * @language zh_CN
        * 构造函数
        * @param img HTMLImageElement（网页图像元素）
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(img: HTMLImageElement) {
            super();
            this.imageData = img;
            this.texture2D = new ContextTexture2D();
            this.texture2D.imageData = img;
        }
        /**
        * @language zh_CN
        * 获取贴图像素宽度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get width(): number {
            return this.imageData.width;
        }
         /**
        * @language zh_CN
        * 获取贴图像素高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get height(): number {
            return this.imageData.height;
        }

        /**
        * @language zh_CN
        * 上传贴图数据给GPU
        * @param context3D 呈现几何定义图形的上下文
        * @version Egret 3.0
        * @platform Web,Native
        */
        public upload(context3D: Context3DProxy) {
            if (!this.texture2D.textureBuffer ) {
                this.texture2D.textureBuffer = this.texture2D.textureBuffer || context3D.creatTexture(); 
                this.texture2D.internalFormat = InternalFormat.ImageData;
                this.texture2D.imageData = this.imageData;

                this.texture2D.dataFormat = Context3DProxy.gl.UNSIGNED_BYTE;
                this.texture2D.colorFormat = ContextConfig.ColorFormat_RGBA8888;
                context3D.upLoadTextureData(0, this );
            }
        }

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
            context3D.upLoadTextureData(0, this );
        }


        /**
        * @language zh_CN
        * 释放接口
        * @version Egret 3.0
        * @platform Web,Native
        */
        public dispose(): void {
            super.dispose();
            if (this.imageData) {
                delete this.imageData;
                this.imageData = null;
            }
        } 


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
        public readPixels(x: number, y: number, width: number, height: number, format: number = ContextConfig.ColorFormat_RGBA8888, type: number = ContextConfig.UNSIGNED_BYTE, pixels: ArrayBufferView = null): any {
            return Stage3D.draw2DImage(this.imageData, x, y, width, height);
        }
    }
}