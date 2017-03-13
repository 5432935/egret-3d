var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @class egret3d.Program3D
    * @classdesc
    * Program3D 类表示上载到渲染上下文的一对渲染程序（也称为“编译后的着色器”）。</p>
    *
    * 由 Program3D 对象管理的程序控制 drawTriangles 调用期间的整个三角形渲染。使用 upload 方法将二进制字节码上载到渲染上下文。（上载完成后，将不再引用原始字节数组中的数据；更改或放弃源字节数组不会更改该程序。）。</p>
    * 这些程序始终由两个相互关联的部分组成：顶点程序和片段程序。</p>
    * 顶点程序会操作 VertexBuffer3D 中定义的数据，负责将顶点投影到剪辑空间，并将任何所需的顶点数据（例如颜色）传递到片段着色器。</p>
    * 片段着色器会操作顶点程序传递给它的属性，并为三角形的每个栅格化片段生成颜色，最终形成像素颜色。请注意，片段程序在 3D 编程文献中具有多个名称，包括片段着色器和像素着色器。</p>
    * 通过将相应 Program3D 实例传递到 Context3DProxy setProgram() 方法，指定后续渲染操作要使用的程序对。</p>
    * 您无法直接创建 Program3D 对象；请改用 Context3DProxy createProgram() 方法。</p>
    *
    * @see egret3d.Program3D
    * @see egret3d.IndexBuffer3D
    * @see egret3d.VertexBuffer3D
    * @see egret3d.Texture2D
    * @see egret3d.Shader
    * @see egret3d.CubeTexture
    * @includeExample core/context/Program3D.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Program3D = (function () {
        /**
        * @language zh_CN
        * 构造函数
        * @param pg3D WebGLProgram对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Program3D(pg3D) {
            this.program = pg3D;
        }
        /**
        * @language zh_CN
        * 释放接口
        * @version Egret 3.0
        * @platform Web,Native
        */
        Program3D.prototype.dispose = function () {
            if (this.program) {
                egret3d.Context3DProxy.gl.deleteProgram(this.program);
                this.program = null;
            }
        };
        return Program3D;
    }());
    egret3d.Program3D = Program3D;
    __reflect(Program3D.prototype, "egret3d.Program3D");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Program3D.js.map