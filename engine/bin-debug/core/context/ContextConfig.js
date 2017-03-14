var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var ShaderType = (function () {
        function ShaderType() {
        }
        return ShaderType;
    }());
    ShaderType.VertexShader = egret3d.Context3DProxy.gl.VERTEX_SHADER;
    ShaderType.FragmentShader = egret3d.Context3DProxy.gl.FRAGMENT_SHADER;
    egret3d.ShaderType = ShaderType;
    __reflect(ShaderType.prototype, "egret3d.ShaderType");
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
    var DrawMode = (function () {
        function DrawMode() {
        }
        return DrawMode;
    }());
    /**
    * @language zh_CN
    * 线框显示模式
    * @version Egret 3.0
    * @platform Web,Native
    */
    DrawMode.LINES = egret3d.Context3DProxy.gl.LINES;
    /**
    * @language zh_CN
    * 点显示模式
    * @version Egret 3.0
    * @platform Web,Native
    */
    DrawMode.POINTS = egret3d.Context3DProxy.gl.POINTS;
    /**
    * @language zh_CN
    * 三角形显示模式
    * @version Egret 3.0
    * @platform Web,Native
    */
    DrawMode.TRIANGLES = egret3d.Context3DProxy.gl.TRIANGLES;
    /**
    * @language zh_CN
    * 连接线显示模式
    * @version Egret 3.0
    * @platform Web,Native
    */
    DrawMode.LINE_STRIP = egret3d.Context3DProxy.gl.LINE_STRIP;
    egret3d.DrawMode = DrawMode;
    __reflect(DrawMode.prototype, "egret3d.DrawMode");
    /**
    * @private
    */
    var UniformType;
    (function (UniformType) {
        UniformType[UniformType["uniform1f"] = 0] = "uniform1f";
        UniformType[UniformType["uniform1fv"] = 1] = "uniform1fv";
        UniformType[UniformType["uniform1i"] = 2] = "uniform1i";
        UniformType[UniformType["uniform1iv"] = 3] = "uniform1iv";
        UniformType[UniformType["uniform2f"] = 4] = "uniform2f";
        UniformType[UniformType["uniform2fv"] = 5] = "uniform2fv";
        UniformType[UniformType["uniform2i"] = 6] = "uniform2i";
        UniformType[UniformType["uniform2iv"] = 7] = "uniform2iv";
        UniformType[UniformType["uniform3f"] = 8] = "uniform3f";
        UniformType[UniformType["uniform3fv"] = 9] = "uniform3fv";
        UniformType[UniformType["uniform3i"] = 10] = "uniform3i";
        UniformType[UniformType["uniform3iv"] = 11] = "uniform3iv";
        UniformType[UniformType["uniform4f"] = 12] = "uniform4f";
        UniformType[UniformType["uniform4fv"] = 13] = "uniform4fv";
        UniformType[UniformType["uniform4i"] = 14] = "uniform4i";
        UniformType[UniformType["uniform4iv"] = 15] = "uniform4iv";
        UniformType[UniformType["uniformMatrix2fv"] = 16] = "uniformMatrix2fv";
        UniformType[UniformType["uniformMatrix3fv"] = 17] = "uniformMatrix3fv";
        UniformType[UniformType["uniformMatrix4fv"] = 18] = "uniformMatrix4fv";
    })(UniformType = egret3d.UniformType || (egret3d.UniformType = {}));
    /**
    * @private
    */
    var InternalFormat;
    (function (InternalFormat) {
        InternalFormat[InternalFormat["PixelArray"] = 0] = "PixelArray";
        InternalFormat[InternalFormat["CompressData"] = 1] = "CompressData";
        InternalFormat[InternalFormat["ImageData"] = 2] = "ImageData";
    })(InternalFormat = egret3d.InternalFormat || (egret3d.InternalFormat = {}));
    ;
    /**
    * @private
    */
    //export class ColorFormat {
    //    ColorFormat_RGBA8888
    //} 
    /**
    * @private
    */
    var FrameBufferType;
    (function (FrameBufferType) {
        FrameBufferType[FrameBufferType["shadowFrameBufrfer"] = 0] = "shadowFrameBufrfer";
        FrameBufferType[FrameBufferType["defaultFrameBuffer"] = 1] = "defaultFrameBuffer";
        FrameBufferType[FrameBufferType["positionFrameBuffer"] = 2] = "positionFrameBuffer";
        FrameBufferType[FrameBufferType["normalFrameBuffer"] = 3] = "normalFrameBuffer";
        FrameBufferType[FrameBufferType["specularFrameBuffer"] = 4] = "specularFrameBuffer";
        FrameBufferType[FrameBufferType["leftEyeFrameBuffer"] = 5] = "leftEyeFrameBuffer";
        FrameBufferType[FrameBufferType["rightEyeFrameBuffer"] = 6] = "rightEyeFrameBuffer";
        FrameBufferType[FrameBufferType["nextFrameBuffer"] = 7] = "nextFrameBuffer";
    })(FrameBufferType = egret3d.FrameBufferType || (egret3d.FrameBufferType = {}));
    /**
    * @private
    */
    var FrameBufferFormat;
    (function (FrameBufferFormat) {
        FrameBufferFormat[FrameBufferFormat["FLOAT_RGB"] = 0] = "FLOAT_RGB";
        FrameBufferFormat[FrameBufferFormat["FLOAT_RGBA"] = 1] = "FLOAT_RGBA";
        FrameBufferFormat[FrameBufferFormat["UNSIGNED_BYTE_RGB"] = 2] = "UNSIGNED_BYTE_RGB";
        FrameBufferFormat[FrameBufferFormat["UNSIGNED_BYTE_RGBA"] = 3] = "UNSIGNED_BYTE_RGBA";
    })(FrameBufferFormat = egret3d.FrameBufferFormat || (egret3d.FrameBufferFormat = {}));
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
    var BlendMode;
    (function (BlendMode) {
        /**
        * @language zh_CN
        * 将显示对象的每个像素的 Alpha 值应用于背景。
        * @version Egret 3.0
        * @platform Web,Native
        */
        BlendMode[BlendMode["ALPHA"] = 0] = "ALPHA";
        /**
        * @language zh_CN
        * 强制为该显示对象创建一个透明度组。
        * @version Egret 3.0
        * @platform Web,Native
        */
        BlendMode[BlendMode["LAYER"] = 1] = "LAYER";
        /**
        * @language zh_CN
        * 该显示对象出现在背景前面。
        * @version Egret 3.0
        * @platform Web,Native
        */
        BlendMode[BlendMode["NORMAL"] = 2] = "NORMAL";
        /**
        * @language zh_CN
        * 将显示对象的原色值与背景颜色的原色值相乘，然后除以 0xFF 进行标准化，从而得到较暗的颜色。
        * @version Egret 3.0
        * @platform Web,Native
        */
        BlendMode[BlendMode["MULTIPLY"] = 3] = "MULTIPLY";
        /**
        * @language zh_CN
        * 将显示对象的原色值添加到它的背景颜色中，上限值为 0xFF。
        * @version Egret 3.0
        * @platform Web,Native
        */
        BlendMode[BlendMode["ADD"] = 4] = "ADD";
        /**
        * @language zh_CN
        * 从背景颜色的值中减去显示对象原色的值，下限值为 0。
        * @version Egret 3.0
        * @platform Web,Native
        */
        BlendMode[BlendMode["SUB"] = 5] = "SUB";
        /**
        * @language zh_CN
        * 将显示对象颜色的补色（反色）与背景颜色的补色相除。
        * @version Egret 3.0
        * @platform Web,Native
        */
        BlendMode[BlendMode["DIV"] = 6] = "DIV";
        /**
        * @language zh_CN
        * 将显示对象颜色的补色（反色）与背景颜色的补色相乘，会产生漂白效果。
        * @version Egret 3.0
        * @platform Web,Native
        */
        BlendMode[BlendMode["SCREEN"] = 7] = "SCREEN";
        /**
        * @language zh_CN
        * 将显示对象的原色值添加到它的背景颜色中(较ADD稍微暗一些)，上限值为 0xFF。
        * @version Egret 3.0
        * @platform Web,Native
        */
        BlendMode[BlendMode["SOFT_ADD"] = 8] = "SOFT_ADD";
    })(BlendMode = egret3d.BlendMode || (egret3d.BlendMode = {}));
    /**
    * @private
    * @class egret3d.ContextSamplerType
    * @classdesc
    * 贴图采样类型
    */
    var ContextSamplerType = (function () {
        function ContextSamplerType() {
        }
        return ContextSamplerType;
    }());
    /**
    * @language zh_CN
    * 纹理0数据
    */
    ContextSamplerType.TEXTURE_0 = egret3d.Context3DProxy.gl.TEXTURE0;
    /**
    * @language zh_CN
    * 纹理1数据
    */
    ContextSamplerType.TEXTURE_1 = egret3d.Context3DProxy.gl.TEXTURE1;
    /**
    * @language zh_CN
    * 纹理2数据
    */
    ContextSamplerType.TEXTURE_2 = egret3d.Context3DProxy.gl.TEXTURE2;
    /**
    * @language zh_CN
    * 纹理3数据
    */
    ContextSamplerType.TEXTURE_3 = egret3d.Context3DProxy.gl.TEXTURE3;
    /**
    * @language zh_CN
    * 纹理4数据
    */
    ContextSamplerType.TEXTURE_4 = egret3d.Context3DProxy.gl.TEXTURE4;
    /**
    * @language zh_CN
    * 纹理5数据
    */
    ContextSamplerType.TEXTURE_5 = egret3d.Context3DProxy.gl.TEXTURE5;
    /**
    * @language zh_CN
    * 纹理6数据
    */
    ContextSamplerType.TEXTURE_6 = egret3d.Context3DProxy.gl.TEXTURE6;
    /**
    * @language zh_CN
    * 纹理7数据
    */
    ContextSamplerType.TEXTURE_7 = egret3d.Context3DProxy.gl.TEXTURE7;
    /**
    * @language zh_CN
    * 纹理8数据
    */
    ContextSamplerType.TEXTURE_8 = egret3d.Context3DProxy.gl.TEXTURE8;
    egret3d.ContextSamplerType = ContextSamplerType;
    __reflect(ContextSamplerType.prototype, "egret3d.ContextSamplerType");
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
    var ContextConfig = (function () {
        function ContextConfig() {
        }
        ;
        return ContextConfig;
    }());
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
    ContextConfig.VERTEX_SHADER = egret3d.Context3DProxy.gl.VERTEX_SHADER;
    /**
    * @private
    */
    ContextConfig.FRAGMENT_SHADER = egret3d.Context3DProxy.gl.FRAGMENT_SHADER;
    /**
    * @private
    */
    ContextConfig.BLEND = egret3d.Context3DProxy.gl.BLEND;
    /**
    * @language zh_CN
    * UNSIGNED_BYTE 数据类型
    * @version Egret 3.0
    * @platform Web,Native
    */
    ContextConfig.UNSIGNED_BYTE = egret3d.Context3DProxy.gl.UNSIGNED_BYTE;
    /**
    * @language zh_CN
    * FLOAT 数据类型
    * @version Egret 3.0
    * @platform Web,Native
    */
    ContextConfig.FLOAT = egret3d.Context3DProxy.gl.FLOAT;
    /**
    * @private
    */
    ContextConfig.CULL_FACE = egret3d.Context3DProxy.gl.CULL_FACE;
    /**
    * @language zh_CN
    * 裁剪正面进行反面渲染
    * @version Egret 3.0
    * @platform Web,Native
    */
    ContextConfig.FRONT = egret3d.Context3DProxy.gl.FRONT;
    /**
    * @language zh_CN
    * 裁剪反面进行正面渲染
    * @version Egret 3.0
    * @platform Web,Native
    */
    ContextConfig.BACK = egret3d.Context3DProxy.gl.BACK;
    /**
    * @language zh_CN
    * 裁剪正面和反面
    * @version Egret 3.0
    * @platform Web,Native
    */
    ContextConfig.FRONT_AND_BACK = egret3d.Context3DProxy.gl.FRONT_AND_BACK;
    /**
    * @language zh_CN
    * 深度测试
    * @version Egret 3.0
    * @platform Web,Native
    */
    ContextConfig.DEPTH_TEST = egret3d.Context3DProxy.gl.DEPTH_TEST;
    /**
    * @language zh_CN
    * 深度缓冲值
    * @version Egret 3.0
    * @platform Web,Native
    */
    ContextConfig.DEPTH_BUFFER_BIT = egret3d.Context3DProxy.gl.DEPTH_BUFFER_BIT;
    /**
    * @private
    */
    ContextConfig.ELEMENT_ARRAY_BUFFER = egret3d.Context3DProxy.gl.ELEMENT_ARRAY_BUFFER;
    /**
    * @private
    */
    ContextConfig.UNSIGNED_SHORT = egret3d.Context3DProxy.gl.UNSIGNED_SHORT;
    /**
    * @private
    */
    ContextConfig.NEAREST = egret3d.Context3DProxy.gl.NEAREST;
    /**
    * @private
    */
    ContextConfig.REPEAT = egret3d.Context3DProxy.gl.REPEAT;
    /**
    * @private
    */
    ContextConfig.ONE = egret3d.Context3DProxy.gl.ONE;
    /**
    * @private
    */
    ContextConfig.ZERO = egret3d.Context3DProxy.gl.ZERO;
    /**
    * @private
    */
    ContextConfig.SRC_ALPHA = egret3d.Context3DProxy.gl.SRC_ALPHA;
    /**
    * @private
    */
    ContextConfig.ONE_MINUS_SRC_ALPHA = egret3d.Context3DProxy.gl.ONE_MINUS_SRC_ALPHA;
    /**
    * @private
    */
    ContextConfig.SRC_COLOR = egret3d.Context3DProxy.gl.SRC_COLOR;
    /**
    * @private
    */
    ContextConfig.ONE_MINUS_SRC_COLOR = egret3d.Context3DProxy.gl.ONE_MINUS_SRC_COLOR;
    /**
    * @private
    */
    ContextConfig.ColorFormat_RGB565 = egret3d.Context3DProxy.gl.RGB565;
    /**
    * @private
    */
    ContextConfig.ColorFormat_RGBA5551 = egret3d.Context3DProxy.gl.RGB5_A1;
    /**
    * @private
    */
    ContextConfig.ColorFormat_RGBA4444 = egret3d.Context3DProxy.gl.RGBA4;
    /**
    * @private
    */
    ContextConfig.ColorFormat_RGBA8888 = egret3d.Context3DProxy.gl.RGBA;
    /**
    * @private
    */
    ContextConfig.ColorFormat_RGB888 = egret3d.Context3DProxy.gl.RGB;
    /**
    * @private
    */
    ContextConfig.ColorFormat_DXT1_RGB = 0;
    /**
    * @private
    */
    ContextConfig.ColorFormat_DXT1_RGBA = 0;
    /**
    * @private
    */
    ContextConfig.ColorFormat_DXT3_RGBA = 0;
    /**
    * @private
    */
    ContextConfig.ColorFormat_DXT5_RGBA = 0;
    /**
    * @private
    * 用户窗口矩形
    */
    //static clientRect: ClientRect;
    /**
    * @private
    */
    ContextConfig.LEQUAL = egret3d.Context3DProxy.gl.LEQUAL;
    egret3d.ContextConfig = ContextConfig;
    __reflect(ContextConfig.prototype, "egret3d.ContextConfig");
})(egret3d || (egret3d = {}));
