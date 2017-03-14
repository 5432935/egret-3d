var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @class egret3d.IndexBuffer3D
    * @classdesc
    * IndexBuffer3D 用于表示顶点索引列表，由图形子系统保留的图形元素构成。</p>
    *
    * 定义一个立方图纹理，以便在渲染期间使用。立方体贴图可用于多种渲染技术，例如环境图、skyboxes 和 skylight 光照。</p>
    * 不能直接创建 CubeTexture 对象，而应使用 Context3DProxy createCubeTexture()。</p>
    *
    * 由 IndexBuffer3D 对象管理的索引可用于从顶点流中选择顶点。索引为 16 位无符号整数。所允许的最大索引值为 65535 (0xffff)。图形子系统不会保留对提供给此对象的顶点的引用。修改或丢弃上载到此对象中的数据不会影响已存储的值。</p>

    * 无法直接实例化 IndexBuffer3D。使用 Context3DProxy.CreateIndexBuffer() 可创建实例。</p>
    * @see egret3d.Context3DProxy
    * @see egret3d.CubeTexture
    * @version Egret 3.0
    * @platform Web,Native
    */
    var IndexBuffer3D = (function () {
        /**
        * @language zh_CN
        * 构造
        * @param buffer webglbuffer
        * @version Egret 3.0
        * @platform Web,Native
        */
        function IndexBuffer3D(buffer) {
            this.buffer = buffer;
        }
        /**
        * @language zh_CN
        * 释放接口
        */
        IndexBuffer3D.prototype.dispose = function () {
            if (this.buffer) {
                egret3d.Context3DProxy.gl.deleteBuffer(this.buffer);
                this.buffer = null;
            }
            if (this.arrayBuffer) {
                delete this.arrayBuffer;
                this.arrayBuffer = null;
            }
        };
        return IndexBuffer3D;
    }());
    egret3d.IndexBuffer3D = IndexBuffer3D;
    __reflect(IndexBuffer3D.prototype, "egret3d.IndexBuffer3D");
})(egret3d || (egret3d = {}));
