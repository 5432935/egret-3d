var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @class egret3d.Wireframe
    * @classdesc
    * 渲染线框 以线的形式渲染顶点。
    * 使用LINES的模式进行渲染。
    * 会使用两个索引来进行渲染一个线段。
    * 实例化一个Wireframe对象之后需要把geometry顶点数据和索引数据填充
    * @see egret3d.Geometry.setVerticesForIndex
    * @see egret3d.Geometry.indexData
    * @see egret3d.Geometry
    * @includeExample core/node/Wireframe.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Wireframe = (function (_super) {
        __extends(Wireframe, _super);
        /**
        * @language zh_CN
        * 构造函数，输入一个模型，拷贝这个模型的顶点数据，创建一个只绘制边框的渲染对象
        * @param src  画线顶点数据列表 默认为null 没有设置数据 可以调用 this.fromVertexs 或 this.fromGeometry设置数据
        * @param vf 画线顶点数据格式 默认为 VertexFormat.VF_POSITION (x, y, z) 可以加上颜色 VertexFormat.VF_COLOR (r, g, b, a)
        * 每个顶点数据格式必须统一
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Wireframe(src, vf) {
            if (src === void 0) { src = null; }
            if (vf === void 0) { vf = egret3d.VertexFormat.VF_POSITION; }
            var _this = _super.call(this) || this;
            _this.type = egret3d.IRender.TYPE_WIREFRAME;
            _this.geometry = new egret3d.Geometry();
            _this.material = new egret3d.ColorMaterial(0xffffff);
            _this.addSubMaterial(0, _this.material);
            _this.material.drawMode = egret3d.DrawMode.LINES;
            _this.geometry.vertexFormat = egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_NORMAL | egret3d.VertexFormat.VF_COLOR | egret3d.VertexFormat.VF_UV0;
            _this.fromVertexs(src, vf);
            return _this;
        }
        /**
        * @language zh_CN
        * 设置画线顶点数据 规则是把传入的所有点依次连接
        * @param src  画线顶点数据列表
        * @param vf 画线顶点数据格式 默认为 VertexFormat.VF_POSITION (x, y, z) 可以加上颜色 VertexFormat.VF_COLOR (r, g, b, a)
        * 每个顶点数据格式必须统一
        * @version Egret 3.0
        * @platform Web,Native
        */
        Wireframe.prototype.fromVertexs = function (src, vf) {
            if (vf === void 0) { vf = egret3d.VertexFormat.VF_POSITION; }
            if (src) {
                this.geometry.setVerticesForIndex(0, vf, src, src.length / egret3d.GeometryUtil.fromVertexFormatToLength(vf));
                this.geometry.indexCount = (this.geometry.vertexCount - 1) * 2;
                for (var i = 0; i < this.geometry.vertexCount - 1; ++i) {
                    this.geometry.indexArray[i * 2 + 0] = i;
                    this.geometry.indexArray[i * 2 + 1] = i + 1;
                }
            }
        };
        /**
       * @language zh_CN
       * 设置画线顶点数据 规则是把传入的点两两相连
       * @param src  画线顶点数据列表
       * @param vf 画线顶点数据格式 默认为 VertexFormat.VF_POSITION (x, y, z) 可以加上颜色 VertexFormat.VF_COLOR (r, g, b, a)
       * 每个顶点数据格式必须统一
       * @version Egret 3.0
       * @platform Web,Native
       */
        Wireframe.prototype.fromVertexsEx = function (src, vf) {
            if (vf === void 0) { vf = egret3d.VertexFormat.VF_POSITION; }
            if (src) {
                this.geometry.setVerticesForIndex(0, vf, src, src.length / egret3d.GeometryUtil.fromVertexFormatToLength(vf));
                this.geometry.indexCount = this.geometry.vertexCount;
                for (var i = 0; i < this.geometry.vertexCount; ++i) {
                    this.geometry.indexArray[i] = i;
                }
            }
        };
        /**
        * @language zh_CN
        * 设置画线顶点数据来源为Geometry 规则是按面连接
        * @param geo  画线顶点数据来源 只会用到Geometry 和坐标数据和颜色数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        Wireframe.prototype.fromGeometry = function (geo) {
            var target = [];
            geo.getVertexForIndex(0, egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_COLOR, target, geo.vertexCount);
            this.geometry.setVerticesForIndex(0, egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_COLOR, target, geo.vertexCount);
            this.geometry.indexCount = geo.faceCount * 6;
            for (var i = 0; i < geo.faceCount; ++i) {
                var _0 = geo.indexArray[i * 3 + 0];
                var _1 = geo.indexArray[i * 3 + 1];
                var _2 = geo.indexArray[i * 3 + 2];
                this.geometry.indexArray[i * 6 + 0] = _0;
                this.geometry.indexArray[i * 6 + 1] = _1;
                this.geometry.indexArray[i * 6 + 2] = _1;
                this.geometry.indexArray[i * 6 + 3] = _2;
                this.geometry.indexArray[i * 6 + 4] = _2;
                this.geometry.indexArray[i * 6 + 5] = _0;
            }
        };
        /**
        * @language zh_CN
        * @private
        * @param other copy对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Wireframe.prototype.copy = function (other) {
            _super.prototype.copy.call(this, other);
            this.geometry = other.geometry;
            this.material = other.material;
        };
        /**
        * @language zh_CN
        * @private
        * 克隆当前Wireframe
        * @returns Wireframe 克隆后的对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Wireframe.prototype.clone = function () {
            var cloneObject = new Wireframe();
            cloneObject.copy(this);
            return cloneObject;
        };
        return Wireframe;
    }(egret3d.IRender));
    egret3d.Wireframe = Wireframe;
    __reflect(Wireframe.prototype, "egret3d.Wireframe");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Wireframe.js.map