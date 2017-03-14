﻿module egret3d {


    /**
    * @class egret3d.Shader
    * @classdesc
    * Shader 类表示上载到渲染上下文的一对渲染程序中的 顶点找色shader，或片段着色的shader 。</p>
    * 
    * shader 是基于 opengl es 2.0 标准 也就是webgl版本的shader着色器。</p>
    *
    * @see egret3d.Program3D
    * @see egret3d.IndexBuffer3D
    * @see egret3d.VertexBuffer3D
    * @see egret3d.Texture2D
    * @see egret3d.Shader
    * @see egret3d.CubeTexture
    * @includeExample core/context/Shader.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Shader {

        /**
        * @language zh_CN
        * @private
        * 声明 shader 为顶点 类型
        * @see egret3d.ShaderPool
        */
        static vertex: number = 0;

        /**
        * @language zh_CN
        * @private
        * 声明 shader 为片段 类型
        * @see egret3d.ShaderPool
        */
        static fragment: number = 1;

        /**
       * @language zh_CN
       * @private
       * 获取已经有的shader 的ID
       */
        static ID_COUNT: number = 0;

        /**
        * @pirvate
        * @language zh_CN
        *  
        * 获取已经有的shader 的ID
        */
        public id: string;


        /**
        * @language zh_CN
        * @private
        * WebGLShader 的引用
        */
        private _shader: WebGLShader;

        public type: number;

        public name: string;

        /**
        * @language zh_CN
        * 构造
        * @param shader WebGLShader对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(shader: WebGLShader) {
            this._shader = shader;
        }

        /**
        * @language zh_CN
        * @private
        * WebGLShader 的引用
        */
        public get shader(): WebGLShader {
            return this._shader;
        }

        /**
        * @language zh_CN
        * 释放接口
        * @version Egret 3.0
        * @platform Web,Native
        */
        public dispose(): void {
            if (this._shader) {
                Context3DProxy.gl.deleteShader(this._shader);
                this._shader = null;
            }
        }
    }
} 