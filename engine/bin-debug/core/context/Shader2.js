var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
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
    var Shader2 = (function () {
        /**
        * @language zh_CN
        * 构造
        * @param shader WebGLShader对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Shader2(shader) {
            this._shader = shader;
        }
        Object.defineProperty(Shader2.prototype, "shader", {
            /**
            * @language zh_CN
            * @private
            * WebGLShader 的引用
            */
            get: function () {
                return this._shader;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 释放接口
        * @version Egret 3.0
        * @platform Web,Native
        */
        Shader2.prototype.dispose = function () {
            if (this._shader) {
                egret3d.Context3DProxy.gl.deleteShader(this._shader);
                this._shader = null;
            }
        };
        return Shader2;
    }());
    /**
    * @language zh_CN
    * @private
    * 声明 shader 为顶点 类型
    * @see egret3d.ShaderPool
    */
    Shader2.vertex = 0;
    /**
    * @language zh_CN
    * @private
    * 声明 shader 为片段 类型
    * @see egret3d.ShaderPool
    */
    Shader2.fragment = 1;
    /**
   * @language zh_CN
   * @private
   * 获取已经有的shader 的ID
   */
    Shader2.ID_COUNT = 0;
    egret3d.Shader2 = Shader2;
    __reflect(Shader2.prototype, "egret3d.Shader2");
})(egret3d || (egret3d = {}));
