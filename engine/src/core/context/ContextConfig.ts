module egret3d {

    export class ShaderType{
        public static VertexShader:number = Context3DProxy.gl.VERTEX_SHADER;
        public static FragmentShader:number = Context3DProxy.gl.FRAGMENT_SHADER;
    }

    /**
    * @class egret3d.DrawMode
    * @classdesc
    * 渲染模式。
    * LINES 线框显示模式。
    * POINTS 点显示模式。
    * TRIANGLES 三角形显示模式。
    * LINE_STRIP 连接线显示模式。
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class DrawMode {
                    
        /**
        * @language zh_CN
        * 线框显示模式
        * @version Egret 3.0
        * @platform Web,Native
        */
        static LINES: number = Context3DProxy.gl.LINES;
                            
        /**
        * @language zh_CN
        * 点显示模式
        * @version Egret 3.0
        * @platform Web,Native
        */
        static POINTS: number = Context3DProxy.gl.POINTS;
                                    
        /**
        * @language zh_CN
        * 三角形显示模式
        * @version Egret 3.0
        * @platform Web,Native
        */
        static TRIANGLES: number = Context3DProxy.gl.TRIANGLES;
                                    
        /**
        * @language zh_CN
        * 连接线显示模式
        * @version Egret 3.0
        * @platform Web,Native
        */
        static LINE_STRIP: number = Context3DProxy.gl.LINE_STRIP;

    }
    
    /**
    * @private
    */
    export enum UniformType { uniform1f, uniform1fv, uniform1i, uniform1iv, uniform2f, uniform2fv, uniform2i, uniform2iv, uniform3f, uniform3fv, uniform3i, uniform3iv, uniform4f, uniform4fv, uniform4i, uniform4iv, uniformMatrix2fv, uniformMatrix3fv, uniformMatrix4fv }

    /**
    * @private
    */
    export enum InternalFormat { PixelArray, CompressData, ImageData };

    /**
    * @private
    */
    //export class ColorFormat {
    //    ColorFormat_RGBA8888
    //} 

    /**
    * @private
    */
    export enum FrameBufferType { shadowFrameBufrfer, defaultFrameBuffer, positionFrameBuffer, normalFrameBuffer, specularFrameBuffer, leftEyeFrameBuffer, rightEyeFrameBuffer, nextFrameBuffer }
    
    /**
    * @private
    */
    export enum FrameBufferFormat { FLOAT_RGB, FLOAT_RGBA, UNSIGNED_BYTE_RGB, UNSIGNED_BYTE_RGBA }

    /**
    * @language zh_CN
    * 渲染混合模式</p>
    * BlendMode 类中的一个值，用于指定要使用的混合模式。 内部绘制位图的方法有两种。</p>
    * 如果启用了混合模式或外部剪辑遮罩，则将通过向矢量渲染器添加有位图填充的正方形来绘制位图。</p>
    * 如果尝试将此属性设置为无效值，运行时会将此值设置为 BlendMode.NORMAL。</p>
    * blendMode 属性影响显示对象的每个像素。</p>
    * 每个像素都由三种原色（红色、绿色和蓝色）组成，每种原色的值介于 0x00 和 0xFF 之间。</p>
    * 将影片剪辑中一个像素的每种原色与背景中像素的对应颜色进行比较。</p>
    * 下表将对 blendMode 设置进行说明。BlendMode 类定义可使用的字符串值。</p>
    * 表中的插图显示应用于交叠于显示对象</p>
    * (1) 之上的圆形显示对象 (2) 的 blendMode 值。</p>
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum BlendMode {

        /**
        * @language zh_CN
        * 将显示对象的每个像素的 Alpha 值应用于背景。
        * @version Egret 3.0
        * @platform Web,Native
        */
        ALPHA,
        
        /**
        * @language zh_CN
        * 强制为该显示对象创建一个透明度组。
        * @version Egret 3.0
        * @platform Web,Native
        */
        LAYER, 

        /**
        * @language zh_CN
        * 该显示对象出现在背景前面。
        * @version Egret 3.0
        * @platform Web,Native
        */
        NORMAL, 

        /**
        * @language zh_CN
        * 将显示对象的原色值与背景颜色的原色值相乘，然后除以 0xFF 进行标准化，从而得到较暗的颜色。
        * @version Egret 3.0
        * @platform Web,Native
        */
        MULTIPLY, 

        /**
        * @language zh_CN
        * 将显示对象的原色值添加到它的背景颜色中，上限值为 0xFF。
        * @version Egret 3.0
        * @platform Web,Native
        */
        ADD, 

        /**
        * @language zh_CN
        * 从背景颜色的值中减去显示对象原色的值，下限值为 0。
        * @version Egret 3.0
        * @platform Web,Native
        */
        SUB, 

        /**
        * @language zh_CN
        * 将显示对象颜色的补色（反色）与背景颜色的补色相除。
        * @version Egret 3.0
        * @platform Web,Native
        */
        DIV, 

        /**
        * @language zh_CN
        * 将显示对象颜色的补色（反色）与背景颜色的补色相乘，会产生漂白效果。
        * @version Egret 3.0
        * @platform Web,Native
        */
        SCREEN,

        /**
        * @language zh_CN
        * 将显示对象的原色值添加到它的背景颜色中(较ADD稍微暗一些)，上限值为 0xFF。
        * @version Egret 3.0
        * @platform Web,Native
        */
        SOFT_ADD,
    }

    /**
    * @private
    * @class egret3d.ContextSamplerType
    * @classdesc
    * 贴图采样类型
    */
    export class ContextSamplerType {

        /**
        * @language zh_CN
        * 纹理0数据
        */
        public static TEXTURE_0: any = Context3DProxy.gl.TEXTURE0;

        /**
        * @language zh_CN
        * 纹理1数据
        */
        public static TEXTURE_1: any = Context3DProxy.gl.TEXTURE1;
        
        /**
        * @language zh_CN
        * 纹理2数据
        */
        public static TEXTURE_2: any = Context3DProxy.gl.TEXTURE2;
        
        /**
        * @language zh_CN
        * 纹理3数据
        */
        public static TEXTURE_3: any = Context3DProxy.gl.TEXTURE3;
        
        /**
        * @language zh_CN
        * 纹理4数据
        */
        public static TEXTURE_4: any = Context3DProxy.gl.TEXTURE4;
        
        /**
        * @language zh_CN
        * 纹理5数据
        */
        public static TEXTURE_5: any = Context3DProxy.gl.TEXTURE5;
        
        /**
        * @language zh_CN
        * 纹理6数据
        */
        public static TEXTURE_6: any = Context3DProxy.gl.TEXTURE6;
        
        /**
        * @language zh_CN
        * 纹理7数据
        */
        public static TEXTURE_7: any = Context3DProxy.gl.TEXTURE7;
        
        /**
        * @language zh_CN
        * 纹理8数据
        */
        public static TEXTURE_8: any = Context3DProxy.gl.TEXTURE8;

        /**
        * @language zh_CN
        * 重复 0~1 的纹理坐标 例如：5.2 % 1 = 0.2
        */
        //public static REPEAT: number;

        /**
        * @language zh_CN
        * 重复 0~1 的纹理坐标 例如：5.2 % 1 = 0.2
        */
        //public static NEAREST: number;

        /**
        * @language zh_CN
        * 重复 0~1 的纹理坐标 例如：5.2 % 1 = 0.2
        */
        //public static LINEAR: number;
    }

    
          
    /**
    * @class egret3d.ContextConfig
    * @classdesc
    *
    * 一些渲染状态，裁剪模式和数据类型的一些常量值。
    * 对应WebGLRenderingContext中的常量值。
    * 
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ContextConfig {
                    
        /**
        * @private
        */
        //static Direct3D_Opengl_Auto: string = "Direct3D_Opengl_Auto";
                            
        /**
        * @private
        */
        //static Direct3D_9_0: string = "Direct3D_9_0";
                            
        /**
        * @private
        */
        //static Direct3D_10_0: string = "Direct3D_10_0";
                            
        /**
        * @private
        */
        //static Direct3D_11_0: string = "Direct3D_11_0";
                            
        /**
        * @private
        */
        //static OpenGLES_2_0: string = "OpenGLES_2_0";
                            
        /**
        * @private
        */
        //static OpenGLES_3_0: string = "OpenGLES_3_0";
                            
        /**
        * @private
        */
        //static OpenGL: string = "OpenGL";
                            
        /**
        * @private
        */
        //static canvas: HTMLCanvasElement;
                            
        /**
        * @private
        */
        static VERTEX_SHADER: number = Context3DProxy.gl.VERTEX_SHADER;
                            
        /**
        * @private
        */
        static FRAGMENT_SHADER: number= Context3DProxy.gl.FRAGMENT_SHADER;
                            
        /**
        * @private
        */
        static BLEND: number= Context3DProxy.gl.BLEND;

        /**
        * @language zh_CN
        * UNSIGNED_BYTE 数据类型
        * @version Egret 3.0
        * @platform Web,Native
        */
        static UNSIGNED_BYTE: number = Context3DProxy.gl.UNSIGNED_BYTE;

        /**
        * @language zh_CN
        * FLOAT 数据类型
        * @version Egret 3.0
        * @platform Web,Native
        */
        static FLOAT: number = Context3DProxy.gl.FLOAT;

        /**
        * @private
        */
        static CULL_FACE: number = Context3DProxy.gl.CULL_FACE;                         
                
        /**
        * @language zh_CN
        * 裁剪正面进行反面渲染
        * @version Egret 3.0
        * @platform Web,Native
        */
        static FRONT: number = Context3DProxy.gl.FRONT;
                
        /**
        * @language zh_CN
        * 裁剪反面进行正面渲染
        * @version Egret 3.0
        * @platform Web,Native
        */
        static BACK: number = Context3DProxy.gl.BACK;
        
        /**
        * @language zh_CN
        * 裁剪正面和反面
        * @version Egret 3.0
        * @platform Web,Native
        */
        static FRONT_AND_BACK: number = Context3DProxy.gl.FRONT_AND_BACK;
     
        /**
        * @language zh_CN
        * 深度测试
        * @version Egret 3.0
        * @platform Web,Native
        */
        static DEPTH_TEST: number = Context3DProxy.gl.DEPTH_TEST;
 
        /**
        * @language zh_CN
        * 深度缓冲值
        * @version Egret 3.0
        * @platform Web,Native
        */
        static DEPTH_BUFFER_BIT: number = Context3DProxy.gl.DEPTH_BUFFER_BIT;
                                    
        /**
        * @private
        */
        static ELEMENT_ARRAY_BUFFER: number = Context3DProxy.gl.ELEMENT_ARRAY_BUFFER;
                                            
        /**
        * @private
        */
        static UNSIGNED_SHORT: number = Context3DProxy.gl.UNSIGNED_SHORT;
                                            
        /**
        * @private
        */
        static NEAREST: number = Context3DProxy.gl.NEAREST;
                                            
        /**
        * @private
        */
        static REPEAT: number = Context3DProxy.gl.REPEAT;
                                            
        /**
        * @private
        */
        static ONE: number = Context3DProxy.gl.ONE;
                                            
        /**
        * @private
        */
        static ZERO: number = Context3DProxy.gl.ZERO;
                                            
        /**
        * @private
        */
        static SRC_ALPHA: number = Context3DProxy.gl.SRC_ALPHA;
                                            
        /**
        * @private
        */
        static ONE_MINUS_SRC_ALPHA: number = Context3DProxy.gl.ONE_MINUS_SRC_ALPHA;
                                            
        /**
        * @private
        */
        static SRC_COLOR: number = Context3DProxy.gl.SRC_COLOR;
                                            
        /**
        * @private
        */
        static ONE_MINUS_SRC_COLOR: number = Context3DProxy.gl.ONE_MINUS_SRC_COLOR;;
                                            
        /**
        * @private
        */
        static ColorFormat_RGB565: number = Context3DProxy.gl.RGB565;
                                            
        /**
        * @private
        */
        static ColorFormat_RGBA5551: number = Context3DProxy.gl.RGB5_A1;
                                            
        /**
        * @private
        */
        static ColorFormat_RGBA4444: number = Context3DProxy.gl.RGBA4;
                                            
        /**
        * @private
        */
        static ColorFormat_RGBA8888: number = Context3DProxy.gl.RGBA;
        /**
        * @private
        */
        static ColorFormat_RGB888: number = Context3DProxy.gl.RGB;                              
        /**
        * @private
        */
        static ColorFormat_DXT1_RGB: number = 0;
                                            
        /**
        * @private
        */
        static ColorFormat_DXT1_RGBA: number = 0;
                                            
        /**
        * @private
        */
        static ColorFormat_DXT3_RGBA: number = 0;
                                            
        /**
        * @private
        */
        static ColorFormat_DXT5_RGBA: number = 0;

        /**
        * @private
        * canvas窗口矩形
        */
        static canvasRectangle: Rectangle ;
                                            
        /**
        * @private
        * 用户窗口矩形
        */
        //static clientRect: ClientRect;

        /**
        * @private
        */
        static LEQUAL: number = Context3DProxy.gl.LEQUAL;

    }
}