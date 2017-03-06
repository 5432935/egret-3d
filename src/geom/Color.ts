﻿module egret3d {
    /**
    * @language zh_CN
    * @class egret3d.Color
    * @classdesc
    * 可使用 Color 类调整显示对象的颜色值
    * 使用的时候需要区分当前的值是0-255之间，还是0-1之间
    * @includeExample geom/Color.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Color {

        
        /**
        * @language zh_CN
        * alpha
        * @version Egret 3.0
        * @platform Web,Native
        */
        public a: number = 255;
                
        /**
        * @language zh_CN
        * red
        * @version Egret 3.0
        * @platform Web,Native
        */
        public r: number = 255;
                
        /**
        * @language zh_CN
        * green
        * @version Egret 3.0
        * @platform Web,Native
        */
        public g: number = 255;
                
        /**
        * @language zh_CN
        * blue
        * @version Egret 3.0
        * @platform Web,Native
        */
        public b: number = 255;

                        
        /**
        * @language zh_CN
        * 返回白色 new Color(255, 255, 255, 255)
        * @retruns Color 白色
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static white(): Color {
            return new Color(255, 255, 255, 255);
        }
                                
        /**
        * @language zh_CN
        * 返回黑色 new Color(0, 0, 0, 255)
        * @retrun Color 黑色
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static black(): Color {
            return new Color(0, 0, 0, 255);
        }
                                
        /**
        * @language zh_CN
        * 返回白色 new Color(255, 0, 0, 255)
        * @retrun 白色
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static red(): Color {
            return new Color(255, 0, 0, 255);
        }
                                
        /**
        * @language zh_CN
        * 返回绿色 new Color(0, 255, 0, 255)
        * @retrun 绿色
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static green(): Color {
            return new Color(0, 255, 0, 255);
        }
                                
        /**
        * @language zh_CN
        * 返回蓝色 new Color(0, 0, 255, 255)
        * @retruns 蓝色
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static blue(): Color {
            return new Color(0, 0, 255, 255);
        }

        /**
        * @language zh_CN
        * 返回Vector3D格式的颜色数据
        * @param color 颜色数据
        * @param colorFormat 指定的颜色格式
        * @param target 传入的Vector3D对象，如果为null，会自动创建一个用于返回
        * @retruns 返回Vector3D格式的颜色数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static getColor(color: number, colorFormat: ContextConfig = ContextConfig.ColorFormat_RGBA8888, target: Vector3D = null): Vector3D {
            if (!target) {
                target = new Vector3D();
            }
            target.setTo((color >> 16 & 0xff) / 255, (color >> 8 & 0xff) / 255, (color & 0xff) / 255, (color >> 24 & 0xff) / 255);
            return target ;
        }


        /**
        * @language zh_CN
        * 将rgba四个通道，分离过的数据合并为一个颜色数据
        * @param r red通道
        * @param g green通道
        * @param b blue通道
        * @param a alpha通道
        * @retruns number 返回颜色数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static RGBAToColor(r: number, g: number, b: number, a: number): number {
            return (a << 24) | (r << 16) | (g << 8) | b;
        }

        /**
        * @language zh_CN
        * 创建一个Color对象
        * @param r red
        * @param g green
        * @param b blue
        * @param a alpha
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 255) {
            this.a = a;
            this.r = r;
            this.g = g;
            this.b = b;
        }
                                                
        /**
        * @language zh_CN
        * 以number值返加颜色
        * @param colorFormat 格式
        * @returns number 颜色
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getColor(colorFormat: number = ContextConfig.ColorFormat_RGBA8888): number {

            if (colorFormat == ContextConfig.ColorFormat_RGB565)
                return 0;

            if (colorFormat == ContextConfig.ColorFormat_RGBA5551)
                return 0;

            if (colorFormat == ContextConfig.ColorFormat_RGBA4444)
                return 0;
            
            return this.r << 24 | this.g << 16 | this.b << 8 | this.a;
        }
                                                        
        /**
        * @language zh_CN
        * 颜色取插值
        * @param c0 颜色1
        * @param c1 颜色2
        * @param t (0.0-1.0)
        * @version Egret 3.0
        * @platform Web,Native
        */
        public lerp(c0: Color, c1: Color, t: number): void {
            ///t(c1 - c0) + c0

            this.a = t * (c1.a - c0.a) + c0.a;
            this.r = t * (c1.r - c0.r) + c0.r;
            this.g = t * (c1.g - c0.g) + c0.g;
            this.b = t * (c1.b - c0.b) + c0.b;

            this.a = Math.floor(this.a);
            this.r = Math.floor(this.r);
            this.g = Math.floor(this.g);
            this.b = Math.floor(this.b);
        }

        /**
         * @language zh_CN
         * 拷贝颜色值
         * @param src Color 被拷贝对象颜色
         * @version Egret 3.0
         * @platform Web,Native
         */
        public copyFrom(src: Color): void {
            this.a = src.a;
            this.r = src.r;
            this.g = src.g;
            this.b = src.b;
        }

        /**
         * @language zh_CN
         * 设置颜色值
         * @param a Alpha
         * @param r Red
         * @param g Green
         * @param b Blue
         * @version Egret 3.0
         * @platform Web,Native
         */
        public setTo(a: number = 255, r: number = 255, g: number = 255, b: number = 255): void {
            this.a = a;
            this.r = r;
            this.g = g;
            this.b = b;
        }

        /**
         * @language zh_CN
         * 创建颜色值
         * @param argb 0xff00ff00格式
         * @returns color
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static createColor(argb: number): Color {
            var color: Color = new Color();
            color.setColorARGB(argb);
            return color;
        }


        /**
         * @language zh_CN
         * 设置颜色值
         * @param argb 0xff00ff00格式
         * @version Egret 3.0
         * @platform Web,Native
         */
        public setColorARGB(argb: number): void {
            this.a = argb / 0x1000000;
            this.a >>= 0;

            this.r = argb & 0xff0000;
            this.r >>= 16;

            this.g = argb & 0xff00;
            this.g >>= 8;

            this.b = argb & 0xff;
        }

        /**
         * @language zh_CN
         * 设置颜色值
         * @param rgb 0xffffff格式
         * @version Egret 3.0
         * @platform Web,Native
         */
        public setColorRGB(rgb: number): void {

            this.r = rgb & 0xff0000;
            this.r >>= 16;

            this.g = rgb & 0xff00;
            this.g >>= 8;

            this.b = rgb & 0xff;
        }


        /**
         * @language zh_CN
         * 在2个颜色之间取随机颜色
         * @param c1 第一个颜色
         * @param c2 第二个颜色
         * @param sameRandom 是否argb的随机种子使用同一个
         * @version Egret 3.0
         * @platform Web,Native
         */
        public randomColor(c1: Color, c2: Color, sameRandom: boolean = false): void {
            if (sameRandom) {
                var random: number = Math.random();
                this.a = c1.a + (c2.a - c1.a) * random;
                this.r = c1.r + (c2.r - c1.r) * random;
                this.g = c1.g + (c2.g - c1.g) * random;
                this.b = c1.b + (c2.b - c1.b) * random;
            }
            else {
                this.a = c1.a + (c2.a - c1.a) * Math.random();
                this.r = c1.r + (c2.r - c1.r) * Math.random();
                this.g = c1.g + (c2.g - c1.g) * Math.random();
                this.b = c1.b + (c2.b - c1.b) * Math.random();
            }
            this.a = Math.floor(this.a);
            this.r = Math.floor(this.r);
            this.g = Math.floor(this.g);
            this.b = Math.floor(this.b);
        }

        /**
         * @language zh_CN
         * 缩放当前颜色
         * @param value 缩放系数
         * @version Egret 3.0
         * @platform Web,Native
         */
        public scaleBy(value: number): void {
            this.a *= value;
            this.r *= value;
            this.g *= value;
            this.b *= value;
        }

    }
} 