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
     * @class egret3d.CubeGeometry
     * @classdesc
     * CubeGeometry类 表示立方体</p>
     *
     * 示例：</p>
     * 用 CubeGeometry 对象创建一个mesh，并给予默认纹理材质TextureMaterial（默认为棋盘格纹理）; </p>
     <pre>
      var box: egret3d.Mesh = new egret3d.Mesh( new egret3d.CubeGeometry(), new egret3d.TextureMaterial() );
     </pre>
     *
     * @see egret3d.Geometry
     * @see egret3d.Mesh
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample geometry/CubeGeometry.ts
     */
    var CubeGeometry = (function (_super) {
        __extends(CubeGeometry, _super);
        /**
        * @language zh_CN
        * 构造函数
        * @param width {number} 宽度 默认为80
        * @param height {number} 高度 默认为80
        * @param depth {number} 深度 默认为80
        * @version Egret 3.0
        * @platform Web,Native
        */
        function CubeGeometry(width, height, depth) {
            if (width === void 0) { width = 80; }
            if (height === void 0) { height = 80; }
            if (depth === void 0) { depth = 80; }
            var _this = _super.call(this) || this;
            _this._width = 80;
            _this._height = 80;
            _this._depth = 80;
            _this._width = width;
            _this._height = height;
            _this._depth = depth;
            _this.buildGeomtry(true);
            return _this;
        }
        Object.defineProperty(CubeGeometry.prototype, "width", {
            /**
            * @language zh_CN
            * Cube宽度
            * @returns {number} 宽度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CubeGeometry.prototype, "height", {
            /**
            * @language zh_CN
            * Cube高度
            * @returns {number} 高度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CubeGeometry.prototype, "depth", {
            /**
            * @language zh_CN
            * Cube深度
            * @returns {number} 高度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._depth;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @private
        * @language zh_CN
        * 生成网格
        * @version Egret 3.0
        * @platform Web,Native
        */
        CubeGeometry.prototype.buildGeomtry = function (front) {
            this.vertexFormat = egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_NORMAL | egret3d.VertexFormat.VF_TANGENT | egret3d.VertexFormat.VF_COLOR | egret3d.VertexFormat.VF_UV0 | egret3d.VertexFormat.VF_UV1;
            this.vertexCount = 36;
            this.indexCount = 36;
            this.vertexArray.set([
                -this._width * 0.5, -this._height * 0.5, -this._depth * 0.5, 0.0, 0.0, -10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0,
                -this._width * 0.5, this._height * 0.5, -this._depth * 0.5, 0.0, 0.0, -10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,
                this._width * 0.5, this._height * 0.5, -this._depth * 0.5, 0.0, 0.0, -10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 1.0, 0, 0,
                this._width * 0.5, this._height * 0.5, -this._depth * 0.5, 0.0, 0.0, -10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 1.0, 0, 0,
                this._width * 0.5, -this._height * 0.5, -this._depth * 0.5, 0.0, 0.0, -10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,
                -this._width * 0.5, -this._height * 0.5, -this._depth * 0.5, 0.0, 0.0, -10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0,
                -this._width * 0.5, -this._height * 0.5, this._depth * 0.5, 0.0, 0.0, 10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,
                this._width * 0.5, -this._height * 0.5, this._depth * 0.5, 0.0, 0.0, 10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0,
                this._width * 0.5, this._height * 0.5, this._depth * 0.5, 0.0, 0.0, 10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,
                this._width * 0.5, this._height * 0.5, this._depth * 0.5, 0.0, 0.0, 10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,
                -this._width * 0.5, this._height * 0.5, this._depth * 0.5, 0.0, 0.0, 10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 1.0, 0, 0,
                -this._width * 0.5, -this._height * 0.5, this._depth * 0.5, 0.0, 0.0, 10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,
                -this._width * 0.5, -this._height * 0.5, -this._depth * 0.5, 0.0, -10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,
                this._width * 0.5, -this._height * 0.5, -this._depth * 0.5, 0.0, -10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0,
                this._width * 0.5, -this._height * 0.5, this._depth * 0.5, 0.0, -10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,
                this._width * 0.5, -this._height * 0.5, this._depth * 0.5, 0.0, -10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,
                -this._width * 0.5, -this._height * 0.5, this._depth * 0.5, 0.0, -10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 1.0, 0, 0,
                -this._width * 0.5, -this._height * 0.5, -this._depth * 0.5, 0.0, -10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,
                this._width * 0.5, -this._height * 0.5, -this._depth * 0.5, 10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,
                this._width * 0.5, this._height * 0.5, -this._depth * 0.5, 10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0,
                this._width * 0.5, this._height * 0.5, this._depth * 0.5, 10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,
                this._width * 0.5, this._height * 0.5, this._depth * 0.5, 10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,
                this._width * 0.5, -this._height * 0.5, this._depth * 0.5, 10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 1.0, 0, 0,
                this._width * 0.5, -this._height * 0.5, -this._depth * 0.5, 10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,
                this._width * 0.5, this._height * 0.5, -this._depth * 0.5, 0.0, 10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,
                -this._width * 0.5, this._height * 0.5, -this._depth * 0.5, 0.0, 10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0,
                -this._width * 0.5, this._height * 0.5, this._depth * 0.5, 0.0, 10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,
                -this._width * 0.5, this._height * 0.5, this._depth * 0.5, 0.0, 10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,
                this._width * 0.5, this._height * 0.5, this._depth * 0.5, 0.0, 10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 1.0, 0, 0,
                this._width * 0.5, this._height * 0.5, -this._depth * 0.5, 0.0, 10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,
                -this._width * 0.5, this._height * 0.5, -this._depth * 0.5, -10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,
                -this._width * 0.5, -this._height * 0.5, -this._depth * 0.5, -10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0,
                -this._width * 0.5, -this._height * 0.5, this._depth * 0.5, -10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,
                -this._width * 0.5, -this._height * 0.5, this._depth * 0.5, -10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,
                -this._width * 0.5, this._height * 0.5, this._depth * 0.5, -10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 1.0, 0, 0,
                -this._width * 0.5, this._height * 0.5, -this._depth * 0.5, -10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0
            ]);
            if (front) {
                this.indexArray.set([
                    0, 2, 1, 3, 5, 4,
                    6, 8, 7, 9, 11, 10,
                    12, 14, 13, 15, 17, 16,
                    18, 20, 19, 21, 23, 22,
                    24, 26, 25, 27, 29, 28,
                    30, 32, 31, 33, 35, 34
                ]);
            }
            else {
                this.indexArray.set([
                    0, 1, 2, 3, 4, 5,
                    6, 7, 8, 9, 10, 11,
                    12, 13, 14, 15, 16, 17,
                    18, 19, 20, 21, 22, 23,
                    24, 25, 26, 27, 28, 29,
                    30, 31, 32, 33, 34, 35
                ]);
            }
            this.buildDefaultSubGeometry();
        };
        return CubeGeometry;
    }(egret3d.Geometry));
    egret3d.CubeGeometry = CubeGeometry;
    __reflect(CubeGeometry.prototype, "egret3d.CubeGeometry");
})(egret3d || (egret3d = {}));
