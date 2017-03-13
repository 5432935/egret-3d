var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @class egret3d.Context3DProxy
    * @classdesc
    * Context3DProxy 类提供了用于呈现几何定义图形的上下文。</p>
    *
    * 渲染上下文包括一个绘图表面及其关联的资源和状态。</p>
    * Context3DProxy 渲染上下文是一个可编程的管道，基于OpenGL ES 2.0规范。</p>
    * 您可以通过提供适当的顶点和像素片段程序来创建 2D/3D渲染器，不同的平台有不同的硬件限制，对于移动端限制要求比较大。</p>
    * 一个canvas 只能申请一个Context3DProxy。</p>
    *
    * @see egret3d.Program3D
    * @see egret3d.IndexBuffer3D
    * @see egret3d.VertexBuffer3D
    * @see egret3d.Texture2D
    * @see egret3d.Shader
    * @see egret3d.CubeTexture
    * @includeExample core/context/Context3DProxy.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Context3DProxy = (function () {
        function Context3DProxy() {
            /**
            * @language zh_CN
            * @private
            */
            this.version = "3.2.2";
            /**
            * @language zh_CN
            * @private
            * 渲染3D 的驱动设备是否存在，或者丢失。
            * 一般情况下，当切换程序的时候，设备将会丢失，
            * 这个时候就需要快速重新申请设备，并将相应的资源buffer，texture重新提交至显卡
            */
            this.isLost = false;
            //-------cache-------
            this.DEPTH_TEST = false;
            this.CULL_FACE = false;
            this.BLEND = false;
            this.blend_Factors_src = -1;
            this.blend_Factors_dst = -1;
            this.cullingMode = -1;
            this.depthCompareMode = -1;
            this.cacheVertexPoint = [];
            this.cacheVertexFormat = 0;
        }
        //--------------
        /**
        * @private
        * @language zh_CN
        * reset
        * 重置缓存的状态
        */
        Context3DProxy.prototype.reset = function () {
            this.DEPTH_TEST = false;
            this.CULL_FACE = false;
            this.BLEND = false;
            this.blend_Factors_src = -1;
            this.blend_Factors_dst = -1;
            this.cullingMode = -1;
            this.depthCompareMode = -1;
            this.program = undefined;
            this.programChange = undefined;
        };
        /**
        * @private
        * @language zh_CN
        * get GPU Context3DProxy
        * 注册并初始化相关 GPU 参数配置信息
        * 用于设置显卡的相关参数
        */
        Context3DProxy.prototype.register = function () {
            var extension;
            Context3DProxy.gl.getExtension('WEBGL_depth_texture') || Context3DProxy.gl.getExtension('MOZ_WEBGL_depth_texture') || Context3DProxy.gl.getExtension('WEBKIT_WEBGL_depth_texture');
            Context3DProxy.gl.getExtension('EXT_texture_filter_anisotropic') || Context3DProxy.gl.getExtension('MOZ_EXT_texture_filter_anisotropic') || Context3DProxy.gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
            Context3DProxy.gl.getExtension('WEBGL_compressed_texture_pvrtc') || Context3DProxy.gl.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc');
            Context3DProxy.gl.getExtension('WEBGL_compressed_texture_etc1');
            Context3DProxy.gl.getExtension('OES_element_index_uint');
            Context3DProxy.gl.getExtension("OES_texture_float_linear");
            extension = Context3DProxy.gl.getExtension("OES_texture_float");
            //alert(extension);
            extension = Context3DProxy.gl.getExtension("OES_texture_half_float");
            //alert(extension);
            Context3DProxy.gl.getExtension("OES_texture_half_float_linear");
            Context3DProxy.gl.getExtension("OES_standard_derivatives");
            Context3DProxy.gl.getExtension("GL_OES_standard_derivatives");
            Context3DProxy.gl.getExtension("WEBGL_draw_buffers");
            Context3DProxy.gl.getExtension("WEBGL_depth_texture");
            Context3DProxy.gl.getExtension("WEBGL_lose_context");
            extension = Context3DProxy.gl.getExtension('WEBGL_compressed_texture_s3tc') || Context3DProxy.gl.getExtension('MOZ_WEBGL_compressed_texture_s3tc') || Context3DProxy.gl.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');
            if (extension) {
                egret3d.ContextConfig.ColorFormat_DXT1_RGB = extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
                egret3d.ContextConfig.ColorFormat_DXT1_RGBA = extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                egret3d.ContextConfig.ColorFormat_DXT3_RGBA = extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                egret3d.ContextConfig.ColorFormat_DXT5_RGBA = extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;
            }
            //WEBGL_color_buffer_float
            //EXT_color_buffer_half_float
            //EXT_texture_filter_anisotropic
            //EXT_frag_depth
            //EXT_shader_texture_lod
            //ContextConfig.BLEND = Context3DProxy.gl.BLEND;
            /*
                        DrawMode.TRIANGLES = Context3DProxy.gl.TRIANGLES;
                        DrawMode.POINTS = Context3DProxy.gl.POINTS;
                        DrawMode.LINES = Context3DProxy.gl.LINES;
                        DrawMode.LINE_STRIP = Context3DProxy.gl.LINE_STRIP;
            
                        ContextConfig.FLOAT = Context3DProxy.gl.FLOAT;
                        ContextConfig.UNSIGNED_BYTE = Context3DProxy.gl.UNSIGNED_BYTE;
                        ContextConfig.VERTEX_SHADER = Context3DProxy.gl.VERTEX_SHADER;
                        ContextConfig.FRAGMENT_SHADER = Context3DProxy.gl.FRAGMENT_SHADER;
            
                        ContextConfig.FRONT = Context3DProxy.gl.FRONT;
                        ContextConfig.BACK = Context3DProxy.gl.BACK;
                        ContextConfig.FRONT_AND_BACK = Context3DProxy.gl.FRONT_AND_BACK;
            
                        ContextConfig.DEPTH_BUFFER_BIT = Context3DProxy.gl.DEPTH_BUFFER_BIT;
                        ContextConfig.ELEMENT_ARRAY_BUFFER = Context3DProxy.gl.ELEMENT_ARRAY_BUFFER;
                        ContextConfig.UNSIGNED_SHORT = Context3DProxy.gl.UNSIGNED_SHORT;
            
                        ContextConfig.NEAREST = Context3DProxy.gl.NEAREST;
                        ContextConfig.REPEAT = Context3DProxy.gl.REPEAT;
                        ContextConfig.ONE = Context3DProxy.gl.ONE;
                        ContextConfig.ZERO = Context3DProxy.gl.ZERO;
                        ContextConfig.SRC_ALPHA = Context3DProxy.gl.SRC_ALPHA;
                        ContextConfig.ONE_MINUS_SRC_ALPHA = Context3DProxy.gl.ONE_MINUS_SRC_ALPHA;
                        ContextConfig.SRC_COLOR = Context3DProxy.gl.SRC_COLOR;
                        ContextConfig.ONE_MINUS_SRC_COLOR = Context3DProxy.gl.ONE_MINUS_SRC_COLOR;;
            
                        ContextConfig.ColorFormat_RGB565 = Context3DProxy.gl.RGB565;
                        ContextConfig.ColorFormat_RGBA5551 = Context3DProxy.gl.RGB5_A1;
                        ContextConfig.ColorFormat_RGBA4444 = Context3DProxy.gl.RGBA4;
                        ContextConfig.ColorFormat_RGBA8888 = Context3DProxy.gl.RGBA;
                        ContextConfig.ColorFormat_RGB888 = Context3DProxy.gl.RGB;
            
                        ContextConfig.DEPTH_TEST = Context3DProxy.gl.DEPTH_TEST;
                        ContextConfig.CULL_FACE = Context3DProxy.gl.CULL_FACE;
                        ContextConfig.BLEND = Context3DProxy.gl.BLEND;
            
                        ContextConfig.LEQUAL = Context3DProxy.gl.LEQUAL;
            
                        ContextSamplerType.TEXTURE_0 = Context3DProxy.gl.TEXTURE0;
                        ContextSamplerType.TEXTURE_1 = Context3DProxy.gl.TEXTURE1;
                        ContextSamplerType.TEXTURE_2 = Context3DProxy.gl.TEXTURE2;
                        ContextSamplerType.TEXTURE_3 = Context3DProxy.gl.TEXTURE3;
                        ContextSamplerType.TEXTURE_4 = Context3DProxy.gl.TEXTURE4;
                        ContextSamplerType.TEXTURE_5 = Context3DProxy.gl.TEXTURE5;
                        ContextSamplerType.TEXTURE_6 = Context3DProxy.gl.TEXTURE6;
                        ContextSamplerType.TEXTURE_7 = Context3DProxy.gl.TEXTURE7;
                        ContextSamplerType.TEXTURE_8 = Context3DProxy.gl.TEXTURE8;
            */
            console.log("requst GPU Config", Context3DProxy.gl);
            egret3d.ShaderPool.register(this);
        };
        //public creatBackBuffer(x: number, y: number, width: number, height: number) {
        //    this._canvas.style.left = x.toString();
        //    this._canvas.style.top = y.toString();
        //    this._canvas.width = width;
        //    this._canvas.height = height;
        //    this.viewPort(x, y, width, height);
        //}
        /**
        * @language zh_CN
        * 视口设置定义，用来确定我们定义的视口在canvas中的所在位置
        * @param x 屏幕坐标 X
        * @param y 屏幕坐标 Y
        * @param width  宽度
        * @param height 高度
        * @see egret3d.Stage3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.viewPort = function (x, y, width, height) {
            Context3DProxy.gl.viewport(x, egret3d.ContextConfig.canvasRectangle.height - height - y, width, height);
        };
        /**
        * @language zh_CN
        * 创建 显卡程序
        * @param vsShader
        * @param fsShader
        * @returns Program3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.creatProgram = function (vsShader, fsShader) {
            var shaderProgram = Context3DProxy.gl.createProgram();
            Context3DProxy.gl.attachShader(shaderProgram, vsShader.shader);
            Context3DProxy.gl.attachShader(shaderProgram, fsShader.shader);
            Context3DProxy.gl.linkProgram(shaderProgram);
            var p = Context3DProxy.gl.getProgramParameter(shaderProgram, Context3DProxy.gl.LINK_STATUS);
            if (!p) {
                console.log("vsShader error" + Context3DProxy.gl.getShaderInfoLog(vsShader.shader));
                console.log("fsShader error" + Context3DProxy.gl.getShaderInfoLog(fsShader.shader));
                console.log("program error" + Context3DProxy.gl.getProgramInfoLog(shaderProgram));
            }
            var program = new egret3d.Program3D(shaderProgram);
            return program;
        };
        /**
        * @language zh_CN
        * 创建 顶点索引流
        * @param indexData
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.creatIndexBuffer = function (indexData) {
            var indexBuffer = Context3DProxy.gl.createBuffer();
            Context3DProxy.gl.bindBuffer(Context3DProxy.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            Context3DProxy.gl.bufferData(Context3DProxy.gl.ELEMENT_ARRAY_BUFFER, indexData, Context3DProxy.gl.STATIC_DRAW);
            var ib = new egret3d.IndexBuffer3D(indexBuffer);
            ib.arrayBuffer = indexData;
            return ib;
        };
        /**
        * @language zh_CN
        * 提交索引数据
        * @param indexBuffer3D 索引buffer
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.uploadIndexBuffer = function (indexBuffer3D) {
            Context3DProxy.gl.bindBuffer(Context3DProxy.gl.ELEMENT_ARRAY_BUFFER, indexBuffer3D.buffer);
            Context3DProxy.gl.bufferData(Context3DProxy.gl.ELEMENT_ARRAY_BUFFER, indexBuffer3D.arrayBuffer, Context3DProxy.gl.DYNAMIC_DRAW);
        };
        /**
        * @language zh_CN
        * 创建 顶点数据流
        * @param vertexData
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.creatVertexBuffer = function (vertexData, dawType) {
            if (dawType === void 0) { dawType = Context3DProxy.gl.STATIC_DRAW; }
            var vertexBuffer = Context3DProxy.gl.createBuffer();
            Context3DProxy.gl.bindBuffer(Context3DProxy.gl.ARRAY_BUFFER, vertexBuffer);
            Context3DProxy.gl.bufferData(Context3DProxy.gl.ARRAY_BUFFER, vertexData, dawType);
            var vb = new egret3d.VertexBuffer3D(vertexBuffer);
            vb.arrayBuffer = vertexData;
            // vertexData.splice(0, vertexData.length);
            //vertexData.splice(0, vertexData.length);
            return vb;
        };
        /**
        * @language zh_CN
        * 提交顶点数据
        * @param vertexBuffer3D 顶点buffer
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.uploadVertexBuffer = function (vertexBuffer3D) {
            Context3DProxy.gl.bindBuffer(Context3DProxy.gl.ARRAY_BUFFER, vertexBuffer3D.buffer);
            Context3DProxy.gl.bufferData(Context3DProxy.gl.ARRAY_BUFFER, vertexBuffer3D.arrayBuffer, Context3DProxy.gl.DYNAMIC_DRAW);
        };
        /**
        * @language zh_CN
        * 设置2D纹理状态 来确定贴图的采样方式
        * @param target 指定活动纹理单元的目标纹理
        * @param pname 指定单值纹理参数的标记名
        * @param param 指定 pname 的值
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.texParameteri = function (target, pname, param) {
            Context3DProxy.gl.texParameteri(target, pname, param);
        };
        /**
        * @language zh_CN
        * 提交2D纹理
        * @param mipLevel
        * @param texture
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.upLoadTextureData = function (mipLevel, texture) {
            Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_2D, texture.texture2D.textureBuffer);
            if (texture.texture2D.internalFormat == egret3d.InternalFormat.ImageData) {
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_2D, 0, Context3DProxy.gl.RGBA, Context3DProxy.gl.RGBA, texture.texture2D.dataFormat, texture.texture2D.imageData);
            }
            else if (texture.texture2D.internalFormat == egret3d.InternalFormat.CompressData) {
                this.upLoadCompressedTexture2D(mipLevel, texture.texture2D);
            }
            else if (texture.texture2D.internalFormat == egret3d.InternalFormat.PixelArray) {
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_2D, mipLevel, texture.texture2D.colorFormat, texture.texture2D.mimapData[mipLevel].width, texture.texture2D.mimapData[mipLevel].height, texture.texture2D.border, texture.texture2D.colorFormat, texture.texture2D.dataFormat, texture.texture2D.mimapData[mipLevel].data);
            }
            if (texture.useMipmap)
                Context3DProxy.gl.generateMipmap(Context3DProxy.gl.TEXTURE_2D);
            //texture.activeState( this );
        };
        /**
        * @language zh_CN
        * 提交2D压缩纹理，用硬件来解析dds贴图
        * @param mipLevel
        * @param texture
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.upLoadCompressedTexture2D = function (mipLevel, texture) {
            Context3DProxy.gl.compressedTexImage2D(Context3DProxy.gl.TEXTURE_2D, mipLevel, texture.colorFormat, texture.mimapData[mipLevel].width, texture.mimapData[mipLevel].height, texture.border, texture.mimapData[mipLevel].data);
        };
        /**
        * @language zh_CN
        * 创建 2维贴图 向显卡提交buffer申请 并创建Texture2D对象
        * @returns 创建的Texture2D对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.creatTexture = function () {
            return Context3DProxy.gl.createTexture();
        };
        ///**
        //* @language zh_CN
        //* 创建 Cube贴图 向显卡提交buffer申请 并创建Texture3D对象
        //* @version Egret 3.0
        //* @platform Web,Native
        //*/
        //public creatCubeTexture(): ContextTexture3D {
        //    var texture: ContextTexture3D = new ContextTexture3D();
        //    texture.texture = Context3DProxy.gl.createTexture();
        //    return texture;
        //}
        /**
        * @language zh_CN
        * @private
        * @param tex
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.uploadCubetexture = function (tex) {
            /// 创建纹理并绑定纹理数据
            Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_CUBE_MAP, tex.texture);
            if (tex.image_right.mimapData && tex.image_right.mimapData.length > 0)
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, Context3DProxy.gl.RGB, tex.image_right.mimapData[0].width, tex.image_right.mimapData[0].height, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_right.mimapData[0].data);
            else
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_right.imageData);
            if (tex.image_left.mimapData && tex.image_left.mimapData.length > 0)
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, Context3DProxy.gl.RGB, tex.image_right.mimapData[0].width, tex.image_right.mimapData[0].height, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_right.mimapData[0].data);
            else
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_left.imageData);
            if (tex.image_left.mimapData && tex.image_left.mimapData.length > 0)
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, Context3DProxy.gl.RGB, tex.image_up.mimapData[0].width, tex.image_up.mimapData[0].height, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_up.mimapData[0].data);
            else
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_up.imageData);
            if (tex.image_left.mimapData && tex.image_left.mimapData.length > 0)
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, Context3DProxy.gl.RGB, tex.image_down.mimapData[0].width, tex.image_down.mimapData[0].height, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_down.mimapData[0].data);
            else
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_down.imageData);
            if (tex.image_left.mimapData && tex.image_left.mimapData.length > 0)
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, Context3DProxy.gl.RGB, tex.image_back.mimapData[0].width, tex.image_back.mimapData[0].height, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_back.mimapData[0].data);
            else
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_back.imageData);
            if (tex.image_left.mimapData && tex.image_left.mimapData.length > 0)
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, Context3DProxy.gl.RGB, tex.image_front.mimapData[0].width, tex.image_front.mimapData[0].height, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_front.mimapData[0].data);
            else
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_front.imageData);
            ///Context3DProxy.gl.generateMipmap(Context3DProxy.gl.TEXTURE_CUBE_MAP);
            ///gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            ///Context3DProxy.gl.texParameterf(Context3DProxy.gl.TEXTURE_CUBE_MAP, Context3DProxy.gl.TEXTURE_MAG_FILTER, Context3DProxy.gl.LINEAR_MIPMAP_NEAREST);
            ///Context3DProxy.gl.texParameterf(Context3DProxy.gl.TEXTURE_CUBE_MAP, Context3DProxy.gl.TEXTURE_MIN_FILTER, Context3DProxy.gl.LINEAR_MIPMAP_NEAREST);
            ///Context3DProxy.gl.texParameterf(Context3DProxy.gl.TEXTURE_CUBE_MAP, Context3DProxy.gl.TEXTURE_WRAP_S, Context3DProxy.gl.CLAMP_TO_EDGE);
            ///Context3DProxy.gl.texParameterf(Context3DProxy.gl.TEXTURE_CUBE_MAP, Context3DProxy.gl.TEXTURE_WRAP_T, Context3DProxy.gl.CLAMP_TO_EDGE);
            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_CUBE_MAP, Context3DProxy.gl.TEXTURE_MAG_FILTER, Context3DProxy.gl.LINEAR);
            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_CUBE_MAP, Context3DProxy.gl.TEXTURE_MIN_FILTER, Context3DProxy.gl.LINEAR);
            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_CUBE_MAP, Context3DProxy.gl.TEXTURE_WRAP_S, Context3DProxy.gl.CLAMP_TO_EDGE);
            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_CUBE_MAP, Context3DProxy.gl.TEXTURE_WRAP_T, Context3DProxy.gl.CLAMP_TO_EDGE);
            ///Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MIN_FILTER, min_filter);
            ///Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MAG_FILTER, mag_filter);
            ///Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_S, wrap_u_filter);
            ///Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_T, wrap_v_filter);
        };
        /**
        * @language zh_CN
        * @private
        * @param width
        * @param height
        * @param format
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.createFramebuffer = function (width, height, format, needDepth) {
            var gl = Context3DProxy.gl;
            var renderbuffer = gl.createRenderbuffer();
            var colorTexture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, colorTexture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            //var depthTexture = gl.createTexture();
            //gl.bindTexture(gl.TEXTURE_2D, depthTexture);
            //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            //gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, width, height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_BYTE, null);
            var framebuffer = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, colorTexture, 0);
            //gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthTexture, 0);
            gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);
            var texture2D = new egret3d.ContextTexture2D();
            texture2D.width = width;
            texture2D.height = height;
            texture2D.textureBuffer = colorTexture;
            //texture2D.depthBuffer = depthTexture ;
            texture2D.frameBuffer = framebuffer;
            texture2D.renderbuffer = renderbuffer;
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            return texture2D;
        };
        /**
        * @language zh_CN
        * @private
        * @param texture
        * @param enableDepthAndStencil
        * @param surfaceSelector
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.setRenderToTexture = function (texture, clean, enableDepthAndStencil, surfaceSelector) {
            if (clean === void 0) { clean = false; }
            if (enableDepthAndStencil === void 0) { enableDepthAndStencil = false; }
            if (surfaceSelector === void 0) { surfaceSelector = 0; }
            var gl = Context3DProxy.gl;
            Context3DProxy.gl.viewport(0, 0, texture.width, texture.height);
            Context3DProxy.gl.scissor(0, 0, texture.width, texture.height);
            gl.bindFramebuffer(Context3DProxy.gl.FRAMEBUFFER, texture.frameBuffer);
            gl.framebufferTexture2D(Context3DProxy.gl.FRAMEBUFFER, Context3DProxy.gl.COLOR_ATTACHMENT0, Context3DProxy.gl.TEXTURE_2D, texture.textureBuffer, 0);
            if (clean) {
                gl.clearColor(0, 0, 0, 0);
                gl.clear(Context3DProxy.gl.COLOR_BUFFER_BIT | Context3DProxy.gl.DEPTH_BUFFER_BIT);
            }
        };
        /**
        * @language zh_CN
        * 设置渲染缓冲为屏幕
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.setRenderToBackBuffer = function () {
            Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_2D, null);
            Context3DProxy.gl.bindFramebuffer(Context3DProxy.gl.FRAMEBUFFER, null);
            // Context3DProxy.gl.bindRenderbuffer(Context3DProxy.gl.RENDERBUFFER, null);
        };
        /**
        * @language zh_CN
        * 向显卡请求创建顶点shader对象
        * @param source shader代码内容
        * @returns Shader shader对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.creatVertexShader = function (source) {
            var shader = Context3DProxy.gl.createShader(Context3DProxy.gl.VERTEX_SHADER);
            Context3DProxy.gl.shaderSource(shader, source);
            Context3DProxy.gl.compileShader(shader);
            var tmpShader = new egret3d.Shader(shader);
            tmpShader.id = (egret3d.Shader.ID_COUNT++).toString();
            return tmpShader;
        };
        /**
        * @language zh_CN
        * 向显卡请求创建片段shader对象
        * @param source shader代码内容
        * @returns Shader shader对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.creatFragmentShader = function (source) {
            var shader = Context3DProxy.gl.createShader(Context3DProxy.gl.FRAGMENT_SHADER);
            Context3DProxy.gl.shaderSource(shader, source);
            Context3DProxy.gl.compileShader(shader);
            var tmpShader = new egret3d.Shader(shader);
            tmpShader.id = (egret3d.Shader.ID_COUNT++).toString();
            return tmpShader;
        };
        /**
        * @language zh_CN
        * 清除渲染buffer
        * @param BUFFER_BIT
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.clear = function (BUFFER_BIT) {
            Context3DProxy.gl.clear(BUFFER_BIT);
        };
        /**
        * @language zh_CN
        * 清除渲染区域的颜色 深度
        * @param r 红色值
        * @param g 绿色值
        * @param b 蓝色值
        * @param a alpha值
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.clearColor = function (r, g, b, a) {
            Context3DProxy.gl.clearColor(r, g, b, a);
        };
        ///**
        //* @language zh_CN
        //* 清除渲染区域的 深度
        //* @param depth
        //*/
        //public clearDepth(depth: number=1.0) {
        //    Context3DProxy.gl.clearDepth(depth);
        //    Context3DProxy.gl.clear(Context3DProxy.gl.DEPTH_BUFFER_BIT);
        //}
        /**
        * @language zh_CN
        * 清除渲染区域的 模板
        * @param stencil 模板值
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.clearStencil = function (stencil) {
            Context3DProxy.gl.clearStencil(stencil);
        };
        /**
        * @language zh_CN
        * 使用显卡着色器
        * @param program 设置当学显卡当前渲染程序
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.setProgram = function (program) {
            this.programChange = false;
            if (this.program == program) {
                return;
            }
            ;
            this.programChange = true;
            this.program = program;
            Context3DProxy.gl.useProgram(program.program);
        };
        /**
        * @language zh_CN
        * 获取矩阵变量ID
        * @param program
        * @param name
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.getUniformLocation = function (programe3D, name) {
            return Context3DProxy.gl.getUniformLocation(programe3D.program, name);
        };
        /**
        * @language zh_CN
        * 传值给shader一个float
        * @param location 指明要更改的uniform变量
        * @param x  uniform变量变量值
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.uniform1f = function (location, x) {
            Context3DProxy.gl.uniform1f(location, x);
        };
        /**
        * @language zh_CN
        * 传值给shader 一个vec3(float, float, float) 也可以是一个vec3数组
        * @param location 指明要更改的uniform变量
        * @param v uniform变量变量值Float32Array[3]
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.uniform1fv = function (location, v) {
            Context3DProxy.gl.uniform1fv(location, v);
        };
        /**
        * @language zh_CN
        * 传值给shader一个int
        * @param location 指明要更改的uniform变量
        * @param x uniform变量变量值
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.uniform1i = function (location, x) {
            Context3DProxy.gl.uniform1i(location, x);
        };
        /**
        * @language zh_CN
        * 传值给shader一个int数组
        * @param location 指明要更改的uniform变量
        * @param v int数组的值
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.uniform1iv = function (location, v) {
            Context3DProxy.gl.uniform1iv(location, v);
        };
        /**
        * @language zh_CN
        * 传值给shader两个float
        * @param location 指明要更改的uniform变量
        * @param x float x 的值
        * @param y float y 的值
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.uniform2f = function (location, x, y) {
            Context3DProxy.gl.uniform2f(location, x, y);
        };
        /**
        * @language zh_CN
        * 传值给shader vec(float, float)
        * @param location 指明要更改的uniform变量
        * @param v Float32Array[2]
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.uniform2fv = function (location, v) {
            Context3DProxy.gl.uniform2fv(location, v);
        };
        /**
        * @language zh_CN
        * 传值给shader 两个int值
        * @param location 指明要更改的uniform变量
        * @param x number x 的值
        * @param y number y 的值
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.uniform2i = function (location, x, y) {
            Context3DProxy.gl.uniform2i(location, x, y);
        };
        /**
        * @language zh_CN
        * 传值给shader
        * @param location 指明要更改的uniform变量
        * @param v
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.uniform2iv = function (location, v) {
            Context3DProxy.gl.uniform2iv(location, v);
        };
        /**
        * @language zh_CN
        * 传值给shader 3个float
        * @param location 指明要更改的uniform变量
        * @param x
        * @param y
        * @param z
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.uniform3f = function (location, x, y, z) {
            Context3DProxy.gl.uniform3f(location, x, y, z);
        };
        /**
        * @language zh_CN
        * 传值给shader vec3(float, float, float)
        * @param location 指明要更改的uniform变量
        * @param v Float32Array[3]
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.uniform3fv = function (location, v) {
            Context3DProxy.gl.uniform3fv(location, v);
        };
        /**
        * @language zh_CN
        * 传值给shader 3个int
        * @param location 指明要更改的uniform变量
        * @param x
        * @param y
        * @param z
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.uniform3i = function (location, x, y, z) {
            Context3DProxy.gl.uniform3i(location, x, y, z);
        };
        /**
        * @language zh_CN
        * 传值给shader vec3(int, int, int)
        * @param location 指明要更改的uniform变量
        * @param v Int32Array[3]
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.uniform3iv = function (location, v) {
            Context3DProxy.gl.uniform3iv(location, v);
        };
        /**
        * @language zh_CN
        * 传值给shader 4个float值
        * @param location 指明要更改的uniform变量
        * @param x
        * @param y
        * @param z
        * @param w
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.uniform4f = function (location, x, y, z, w) {
            Context3DProxy.gl.uniform4f(location, x, y, z, w);
        };
        /**
        * @language zh_CN
        * 传值给shader vec(float, float, float, float)
        * @param location 指明要更改的uniform变量
        * @param v Float32Array[4]
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.uniform4fv = function (location, v) {
            Context3DProxy.gl.uniform4fv(location, v);
        };
        /**
        * @language zh_CN
        * 传值给shader 4个int值
        * @param location 指明要更改的uniform变量
        * @param x
        * @param y
        * @param z
        * @param w
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.uniform4i = function (location, x, y, z, w) {
            Context3DProxy.gl.uniform4i(location, x, y, z, w);
        };
        /**
        * @language zh_CN
        * 传值给shader vec4(int, int, int, int)
        * @param location 指明要更改的uniform变量
        * @param v Int32Array[4]
        */
        Context3DProxy.prototype.uniform4iv = function (location, v) {
            Context3DProxy.gl.uniform4iv(location, v);
        };
        /**
        * @language zh_CN
        * 传值给shader 2 * 2矩阵
        * @param location 指明要更改的uniform变量
        * @param transpose 是否转置
        * @param value 矩阵值 Float32Array[4]
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.uniformMatrix2fv = function (location, transpose, value) {
            Context3DProxy.gl.uniformMatrix2fv(location, transpose, value);
        };
        /**
        * @language zh_CN
        * 传值给shader 3 * 3矩阵
        * @param location 指明要更改的uniform变量
        * @param transpose 是否转置
        * @param value 矩阵值 Float32Array[9]
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.uniformMatrix3fv = function (location, transpose, value) {
            Context3DProxy.gl.uniformMatrix3fv(location, transpose, value);
        };
        /**
        * @language zh_CN
        * 传值给shader 4 * 4矩阵
        * @param location 指明要更改的uniform变量
        * @param transpose 是否转置
        * @param value 矩阵值 Float32Array[16]
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.uniformMatrix4fv = function (location, transpose, value) {
            Context3DProxy.gl.uniformMatrix4fv(location, transpose, value);
        };
        /**
        * @language zh_CN
        * 设置 绘制混合模式
        * @param src
        * @param dst
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.setBlendFactors = function (src, dst) {
            if (this.blend_Factors_src == src && this.blend_Factors_dst == dst)
                return;
            this.blend_Factors_src = src;
            this.blend_Factors_dst = dst;
            Context3DProxy.gl.blendFunc(src, dst);
        };
        /**
        * @language zh_CN
        * 设置 绘制剔除模式
        * @param mode
        * @see egret3d.ContextConfig.FRONT
        * @see egret3d.ContextConfig.BACK
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.setCulling = function (mode) {
            if (this.cullingMode == mode)
                return;
            this.cullingMode = mode;
            Context3DProxy.gl.cullFace(mode);
        };
        /**
        * @language zh_CN
        * 开启 深度测试模式
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.enableDepth = function () {
            if (this.DEPTH_TEST)
                return;
            this.DEPTH_TEST = true;
            Context3DProxy.gl.enable(egret3d.ContextConfig.DEPTH_TEST);
        };
        /**
        * @language zh_CN
        * 关闭 深度测试模式
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.disableDepth = function () {
            if (!this.DEPTH_TEST)
                return;
            this.DEPTH_TEST = false;
            Context3DProxy.gl.disable(egret3d.ContextConfig.DEPTH_TEST);
        };
        /**
        * @language zh_CN
        * 开启 剔除面模式
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.enableCullFace = function () {
            if (this.CULL_FACE)
                return;
            this.CULL_FACE = true;
            Context3DProxy.gl.enable(egret3d.ContextConfig.CULL_FACE);
        };
        /**
        * @language zh_CN
        * 关闭 剔除面模式
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.disableCullFace = function () {
            if (!this.CULL_FACE)
                return;
            this.CULL_FACE = false;
            Context3DProxy.gl.disable(egret3d.ContextConfig.CULL_FACE);
        };
        /**
        * @language zh_CN
        * 开启 混合模式
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.enableBlend = function () {
            if (this.BLEND)
                return;
            this.BLEND = true;
            Context3DProxy.gl.enable(egret3d.ContextConfig.BLEND);
        };
        /**
        * @language zh_CN
        * 关闭 混合模式
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.disableBlend = function () {
            if (!this.BLEND)
                return;
            this.BLEND = false;
            Context3DProxy.gl.disable(egret3d.ContextConfig.BLEND);
        };
        ///**
        // * @language zh_CN
        // * 开启 绘制模式
        // * @param cap
        // * @version Egret 3.0
        // * @platform Web,Native
        // */
        //public enable(cap: number) {
        //    Context3DProxy.gl.enable(cap);
        //}
        ///**
        //* @language zh_CN
        //* 关闭 绘制模式
        //* @param cap
        //* @version Egret 3.0
        //* @platform Web,Native
        //*/
        //public disable(cap: number) {
        //    Context3DProxy.gl.disable(cap);
        //}
        /**
        * @language zh_CN
        * 开启 深度模式 及 深度测试比较模式
        * @param flag
        * @param compareMode
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.depthFunc = function (compareMode) {
            if (compareMode === void 0) { compareMode = 0; }
            if (this.depthCompareMode == compareMode)
                return;
            this.depthCompareMode = compareMode;
            Context3DProxy.gl.depthFunc(compareMode);
        };
        /**
        * @language zh_CN
        * 开启 深度模式 及 深度测试比较模式
        * @param flag
        * @param compareMode
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.enableDepthTest = function (flag, compareMode) {
            if (compareMode === void 0) { compareMode = 0; }
            if (flag)
                Context3DProxy.gl.enable(Context3DProxy.gl.DEPTH_TEST);
        };
        /**
        * @language zh_CN
        * 获取顶点着色器变量 索引
        * @param programe
        * @param attribName
        * @returns 着色器变量
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.getShaderAttribLocation = function (programe, attribName) {
            return Context3DProxy.gl.getAttribLocation(programe.program, attribName);
        };
        /**
        * @language zh_CN
        * 指定顶点着色器变量索引及结构
        * @param index 变量索引
        * @param size  数据个数
        * @param dataType  数据类型
        * @param normalized 是否单位化
        * @param stride 字节数
        * @param offset 当前变量字节偏移
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.vertexAttribPointer = function (index, size, dataType, normalized, stride, offset) {
            Context3DProxy.gl.vertexAttribPointer(index, size, dataType, normalized, stride, offset);
            Context3DProxy.gl.enableVertexAttribArray(index);
        };
        ///**
        //* @language zh_CN
        //* 激活的顶点结构
        //* @version Egret 3.0
        //* @platform Web,Native
        //*/
        //public activeVertexFormat(format: number){
        //    this.vertexFormat = format;
        //}
        /**
        * @language zh_CN
        * 要激活着色器上的顶点信息
        * @param vertexFormat 顶点格式
        * @param formatLen 顶点要激活的长度
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.activeAttribPointer = function (vertexFormat, formatLen) {
            //if (this.cacheVertexFormat != vertexFormat) {
            for (var j = 0; j < 8; j++) {
            }
            this.cacheVertexFormat = vertexFormat;
            //for (var j: number = 0; j < formatLen; j++) {
            //Context3DProxy.gl.enableVertexAttribArray(j);
            // }
            //  }
            return this.cacheVertexFormat == vertexFormat;
        };
        Context3DProxy.prototype.disAttribPointer = function () {
            for (var j = 0; j < 8; j++) {
                Context3DProxy.gl.disableVertexAttribArray(j);
            }
        };
        /**
        * @language zh_CN
        * @private
        * 实时传入显卡顶点着色器变量数组数据
        * @param floats
        * @param offest
        * @param numLen
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.setVertexShaderConstData = function (floats, offest, numLen) {
            Context3DProxy.gl.vertexAttrib4fv(offest, floats.subarray(offest, numLen));
        };
        /**
        * @language zh_CN
        * @private
        * 实时传入显卡片段着色器变量数组数据
        * @param floats
        * @param offest
        * @param numLen
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.setFragmentShaderConstData = function (floats, offest, numLen) {
        };
        /**
        * @language zh_CN
        * 设置贴图采样 第一个参数并不是类型
        * @param samplerIndex  ContextSamplerType
        * @param uniLocation
        * @param index
        * @param texture
        * @see egret3d.ContextSamplerType
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.setTexture2DAt = function (samplerIndex, uniLocation, index, texture) {
            Context3DProxy.gl.activeTexture(samplerIndex);
            Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_2D, texture.textureBuffer);
            Context3DProxy.gl.uniform1i(uniLocation, index);
        };
        Context3DProxy.prototype.disableTexture2DAt = function (samplerIndex, uniLocation, index) {
            //Context3DProxy.gl.activeTexture(samplerIndex);
            //Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_2D, null );
            //Context3DProxy.gl.uniform1i(uniLocation, index);
        };
        /**
        * @language zh_CN
        * 设置贴图采样 第一个参数并不是类型
        * @param samplerIndex  ContextSamplerType
        * @param uniLocation
        * @param index
        * @param texture
        * @see egret3d.ContextSamplerType
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.setCubeTextureAt = function (samplerIndex, uniLocation, index, texture) {
            if (!texture) {
                return;
            }
            Context3DProxy.gl.activeTexture(samplerIndex);
            Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_CUBE_MAP, texture.texture);
            Context3DProxy.gl.uniform1i(uniLocation, index);
        };
        /**
        * @language zh_CN
        * @private
        * 设置矩形裁切区域
        * @param rectangle
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.setScissorRectangle = function (x, y, width, height) {
            Context3DProxy.gl.scissor(x, egret3d.ContextConfig.canvasRectangle.height - height - y, width, height);
        };
        /**
        * @language zh_CN
        * @private
        * 设置模板测试
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.setStencilReferenceValue = function () {
        };
        /**
        * @language zh_CN
        * @private
        * 设置模板测试
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.setStencilActions = function (triangleFace, compareMode, actionOnBothPass, actionOnDepthFail, actionOnDepthPassStencilFail) {
        };
        /**
        * @language zh_CN
        * 绑定顶点Buffer
        * @param vertexBuffer
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.bindVertexBuffer = function (vertexBuffer) {
            Context3DProxy.gl.bindBuffer(Context3DProxy.gl.ARRAY_BUFFER, vertexBuffer.buffer);
        };
        /**
       * @language zh_CN
       * 绑定顶点索引Buffer
       * @param vertexBuffer
       * @version Egret 3.0
       * @platform Web,Native
       */
        Context3DProxy.prototype.bindIndexBuffer = function (indexBuffer) {
            Context3DProxy.gl.bindBuffer(Context3DProxy.gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);
        };
        /**
        * @language zh_CN
        * 绘制模型元素
        * @param type 图元类型
        * @param first 第一个顶点索引
        * @param length 顶点个数
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.drawArrays = function (type, first, length) {
            Context3DProxy.gl.drawArrays(type, first, length);
        };
        /**
        * @language zh_CN
        * 绘制模型元素
        * @param type 图元类型
        * @param indexBuffer 索引数据
        * @param offset 顶点索引偏移 (字节数)
        * @param length 顶点个数
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.drawElement = function (type, offset, length) {
            Context3DProxy.gl.drawElements(type, length, Context3DProxy.gl.UNSIGNED_SHORT, offset);
        };
        /**
        * @language zh_CN
        * @private
        * 绘制提交
        * @version Egret 3.0
        * @platform Web,Native
        */
        Context3DProxy.prototype.flush = function () {
            Context3DProxy.gl.flush();
        };
        return Context3DProxy;
    }());
    egret3d.Context3DProxy = Context3DProxy;
    __reflect(Context3DProxy.prototype, "egret3d.Context3DProxy");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Context3DProxy.js.map