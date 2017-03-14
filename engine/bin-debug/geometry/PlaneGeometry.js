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
     * @class egret3d.PlaneGeometry
     * @classdesc
     * PlaneGeometry类 表示面板几何体
     *
     * 示例：
     * //用 PlaneGeometry 对象创建一个mesh，并给予默认纹理材质TextureMaterial（默认为棋盘格纹理）;
     * var box: egret3d.Mesh = new egret3d.Mesh( new egret3d.PlaneGeometry(), new egret3d.TextureMaterial() );
     *
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample geometry/CubeGeometry.ts
     */
    var PlaneGeometry = (function (_super) {
        __extends(PlaneGeometry, _super);
        /**
        * @language zh_CN
        * 构造函数
        * @param width {number} 宽度
        * @param height {number} 高度
        * @param segmentsW {number} 宽度分段数
        * @param segmentsH {number} 高度分段数
        * @param uScale {number} U缩放
        * @param vScale {number} V缩放
        * @param aixs {Vector3} 平面的朝向 默认参数为Vector3.Y_AXIS
        * @param wCenter {boolean} 是否width以中心位置为(0,0)点
        * @param hCenter {boolean} 是否height以中心位置为(0,0)点
        */
        function PlaneGeometry(width, height, segmentsW, segmentsH, uScale, vScale, aixs, wCenter, hCenter) {
            if (width === void 0) { width = 500; }
            if (height === void 0) { height = 500; }
            if (segmentsW === void 0) { segmentsW = 1; }
            if (segmentsH === void 0) { segmentsH = 1; }
            if (uScale === void 0) { uScale = 1; }
            if (vScale === void 0) { vScale = 1; }
            if (aixs === void 0) { aixs = egret3d.Vector3.Y_AXIS; }
            if (wCenter === void 0) { wCenter = true; }
            if (hCenter === void 0) { hCenter = true; }
            var _this = _super.call(this) || this;
            _this._segmentsW = 1;
            _this._segmentsH = 1;
            _this._width = 500.0;
            _this._height = 500.0;
            _this._scaleU = 1;
            _this._scaleV = 1;
            _this._width = width;
            _this._height = height;
            _this._segmentsW = segmentsW;
            _this._segmentsH = segmentsH;
            _this._scaleU = uScale;
            _this._scaleV = vScale;
            _this._wCenter = wCenter;
            _this._hCenter = hCenter;
            _this.buildGeometry(aixs);
            return _this;
        }
        Object.defineProperty(PlaneGeometry.prototype, "segmentsW", {
            /**
            * @language zh_CN
            * 宽度分段数
            * @returns {number} 宽度分段数
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._segmentsW;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlaneGeometry.prototype, "segmentsH", {
            /**
            * @language zh_CN
            * 高度分段数
            * @returns {number} 高度分段数
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._segmentsH;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlaneGeometry.prototype, "width", {
            /**
            * @language zh_CN
            * 宽度
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
        Object.defineProperty(PlaneGeometry.prototype, "height", {
            /**
            * @language zh_CN
            * 高度
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
        Object.defineProperty(PlaneGeometry.prototype, "scaleU", {
            /**
            * @language zh_CN
            * U缩放
            * @returns {number} 缩放值
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._scaleU;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlaneGeometry.prototype, "scaleV", {
            /**
            * @language zh_CN
            * U缩放
            * @returns {number} 缩放值
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._scaleV;
            },
            enumerable: true,
            configurable: true
        });
        PlaneGeometry.prototype.buildGeometry = function (aixs) {
            this.vertexFormat = egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_NORMAL | egret3d.VertexFormat.VF_TANGENT | egret3d.VertexFormat.VF_COLOR | egret3d.VertexFormat.VF_UV0;
            var x, y;
            var numIndices;
            var base;
            var tw = this._segmentsW + 1;
            var numVertices = (this._segmentsH + 1) * tw;
            var stride = this.vertexAttLength;
            var skip = stride - 15;
            numIndices = this._segmentsH * this._segmentsW * 6;
            this.vertexCount = numVertices;
            this.indexCount = numIndices;
            numIndices = 0;
            var point = new egret3d.Vector3();
            var index = 0;
            for (var yi = 0; yi <= this._segmentsH; ++yi) {
                for (var xi = 0; xi <= this._segmentsW; ++xi) {
                    x = (xi / this._segmentsW - .5) * this._width;
                    y = (yi / this._segmentsH - .5) * this._height;
                    if (this._wCenter == false) {
                        x += this._width / 2;
                    }
                    if (this._hCenter == false) {
                        y += this._height / 2;
                    }
                    switch (aixs) {
                        case egret3d.Vector3.Y_AXIS:
                            this.vertexArray[index++] = x;
                            this.vertexArray[index++] = 0;
                            this.vertexArray[index++] = y;
                            this.vertexArray[index++] = 0;
                            this.vertexArray[index++] = 1;
                            this.vertexArray[index++] = 0;
                            break;
                        case egret3d.Vector3.Z_AXIS:
                            this.vertexArray[index++] = x;
                            this.vertexArray[index++] = y;
                            this.vertexArray[index++] = 0;
                            this.vertexArray[index++] = 0;
                            this.vertexArray[index++] = 0;
                            this.vertexArray[index++] = -1;
                            break;
                        case egret3d.Vector3.X_AXIS:
                            this.vertexArray[index++] = 0;
                            this.vertexArray[index++] = x;
                            this.vertexArray[index++] = y;
                            this.vertexArray[index++] = 1;
                            this.vertexArray[index++] = 0;
                            this.vertexArray[index++] = 0;
                            break;
                        default:
                            this.vertexArray[index++] = x;
                            this.vertexArray[index++] = 0;
                            this.vertexArray[index++] = y;
                            this.vertexArray[index++] = 0;
                            this.vertexArray[index++] = 1;
                            this.vertexArray[index++] = 0;
                            break;
                    }
                    this.vertexArray[index++] = 1;
                    this.vertexArray[index++] = 0;
                    this.vertexArray[index++] = 0;
                    this.vertexArray[index++] = 1;
                    this.vertexArray[index++] = 1;
                    this.vertexArray[index++] = 1;
                    this.vertexArray[index++] = 1;
                    this.vertexArray[index++] = (xi / this._segmentsW) * this._scaleU;
                    this.vertexArray[index++] = (1 - yi / this._segmentsH) * this._scaleV;
                    index += skip;
                    if (xi != this._segmentsW && yi != this._segmentsH) {
                        base = xi + yi * tw;
                        var mult = 1;
                        this.indexArray[numIndices++] = base * mult;
                        this.indexArray[numIndices++] = (base + tw + 1) * mult;
                        this.indexArray[numIndices++] = (base + tw) * mult;
                        this.indexArray[numIndices++] = base * mult;
                        this.indexArray[numIndices++] = (base + 1) * mult;
                        this.indexArray[numIndices++] = (base + tw + 1) * mult;
                    }
                }
            }
            var subGeometry = new egret3d.SubGeometry();
            subGeometry.geometry = this;
            subGeometry.start = 0;
            subGeometry.count = this.indexCount;
            this.subGeometrys.push(subGeometry);
        };
        return PlaneGeometry;
    }(egret3d.Geometry));
    egret3d.PlaneGeometry = PlaneGeometry;
    __reflect(PlaneGeometry.prototype, "egret3d.PlaneGeometry");
})(egret3d || (egret3d = {}));
