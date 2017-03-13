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
    * @class egret3d.ElevationGeometry
    * @classdesc
    * 使用高度图创建Geometry
    * 高度图的一个任意一个通道 算出0.0 - 1.0 值  然后乘以 height 就是当前顶点高度值
    * @version Egret 3.0
    * @platform Web,Native
    * @includeExample geometry/CubeGeometry.ts
    */
    var ElevationGeometry = (function (_super) {
        __extends(ElevationGeometry, _super);
        /**
        * @language zh_CN
        * 构造函数
       
        * @param heightmap {ImageTexture} 高度图
        * @param width {number} 地形宽度 默认1000
        * @param height {number} 地形主度 默认100
        * @param depth {number} 地形长度 默认1000
        * @param segmentsW {number} 格子列 默认30
        * @param segmentsH {number} 格子行 默认30
        * @param maxElevation {number} 高度最大值 默认255
        * @param minElevation {number} 高度最小值 默认0
        * @version Egret 3.0
        * @platform Web,Native
        */
        function ElevationGeometry(heightmap, width, height, depth, segmentsW, segmentsH, maxElevation, minElevation) {
            if (width === void 0) { width = 1000; }
            if (height === void 0) { height = 100; }
            if (depth === void 0) { depth = 1000; }
            if (segmentsW === void 0) { segmentsW = 30; }
            if (segmentsH === void 0) { segmentsH = 30; }
            if (maxElevation === void 0) { maxElevation = 255; }
            if (minElevation === void 0) { minElevation = 0; }
            var _this = _super.call(this) || this;
            _this._width = 100;
            _this._height = 100;
            _this._segmentsW = 100;
            _this._segmentsH = 100;
            _this._depth = 100;
            _this._minElevation = 100;
            _this._maxElevation = 100;
            _this._scaleU = 1;
            _this._scaleV = 1;
            _this._segmentsW = segmentsW;
            _this._segmentsH = segmentsH;
            _this._width = width;
            _this._height = height;
            _this._depth = depth;
            _this._minElevation = minElevation;
            _this._maxElevation = maxElevation;
            _this._heightmap = heightmap;
            _this._imageData = heightmap.readPixels(0, 0, heightmap.width, heightmap.height);
            _this._positionXYZ = [];
            _this.buildGeomtry(true);
            return _this;
        }
        Object.defineProperty(ElevationGeometry.prototype, "width", {
            /**
            * @language zh_CN
            * 得到宽度
            * @returns {ImageTexture} 宽度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElevationGeometry.prototype, "height", {
            /**
            * @language zh_CN
            * 得到高度
            * @returns {ImageTexture} 高度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElevationGeometry.prototype, "depth", {
            /**
            * @language zh_CN
            * 得到深度
            * @returns {ImageTexture} 深度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._depth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElevationGeometry.prototype, "heightmap", {
            /**
            * @language zh_CN
            * 得到高度图
            * @returns {ImageTexture} 高度图
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._heightmap;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElevationGeometry.prototype, "segmentsW", {
            /**
            * @language zh_CN
            * 得到格子列数
            * @returns {number} 格子列数
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._segmentsW;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElevationGeometry.prototype, "segmentsH", {
            /**
            * @language zh_CN
            * 得到格子行数
            * @returns {number} 格子行数
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._segmentsH;
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
        ElevationGeometry.prototype.buildGeomtry = function (front) {
            this.vertexFormat = egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_NORMAL | egret3d.VertexFormat.VF_TANGENT | egret3d.VertexFormat.VF_COLOR | egret3d.VertexFormat.VF_UV0 | egret3d.VertexFormat.VF_UV1;
            var x, z;
            var numInds;
            var base;
            var tw = this._segmentsW + 1;
            var numVerts = (this._segmentsH + 1) * tw;
            var uDiv = (this._heightmap.width - 1) / this._segmentsW;
            var vDiv = (this._heightmap.height - 1) / this._segmentsH;
            var u, v;
            var y;
            this.vertexCount = numVerts;
            this.indexCount = this._segmentsH * this._segmentsW * 6;
            numVerts = 0;
            numInds = 0;
            var col;
            for (var zi = 0; zi <= this._segmentsH; ++zi) {
                for (var xi = 0; xi <= this._segmentsW; ++xi) {
                    x = (xi / this._segmentsW - 0.5) * this._width;
                    z = (zi / this._segmentsH - 0.5) * this._depth;
                    u = xi * uDiv;
                    v = (this._segmentsH - zi) * vDiv;
                    y = this.getHeightByPixel(u, v);
                    //pos
                    this.vertexArray[numVerts++] = x;
                    this.vertexArray[numVerts++] = y;
                    this.vertexArray[numVerts++] = z;
                    //normal
                    this.vertexArray[numVerts++] = 1.0;
                    this.vertexArray[numVerts++] = 1.0;
                    this.vertexArray[numVerts++] = 1.0;
                    //tan
                    this.vertexArray[numVerts++] = -1.0;
                    this.vertexArray[numVerts++] = 0.0;
                    this.vertexArray[numVerts++] = 0.0;
                    //color
                    this.vertexArray[numVerts++] = 1.0;
                    this.vertexArray[numVerts++] = 1.0;
                    this.vertexArray[numVerts++] = 1.0;
                    this.vertexArray[numVerts++] = 1.0;
                    //uv
                    this.vertexArray[numVerts++] = xi / this._segmentsW * this._scaleU;
                    this.vertexArray[numVerts++] = 1.0 - zi / this._segmentsH * this._scaleV;
                    this.vertexArray[numVerts++] = xi / this._segmentsW;
                    this.vertexArray[numVerts++] = 1.0 - zi / this._segmentsH;
                    if (xi != this._segmentsW && zi != this._segmentsH) {
                        base = xi + zi * tw;
                        this.indexArray[numInds++] = base;
                        this.indexArray[numInds++] = base + tw + 1;
                        this.indexArray[numInds++] = base + tw;
                        this.indexArray[numInds++] = base;
                        this.indexArray[numInds++] = base + 1;
                        this.indexArray[numInds++] = base + tw + 1;
                    }
                }
            }
            this.updateFaceNormals();
            this.buildDefaultSubGeometry();
        };
        /**
       * @language zh_CN
       * @private
       * 根据像素点获取高度
     
       * @param intX {number} 像素整形位置X
       * @param intZ {number} 像素整形位置Z
       * @returns {number} 指定位置的高度
       * @version Egret 3.0
       * @platform Web,Native
       */
        ElevationGeometry.prototype.getHeightByPixel = function (intX, intZ) {
            intX = Math.floor(intX);
            intZ = Math.floor(intZ);
            if (intX < 0) {
                intX = 0;
            }
            else if (intX >= this._imageData.width) {
                intX = this._imageData.width - 1;
            }
            if (intZ < 0) {
                intZ = 0;
            }
            else if (intZ > this._imageData.height) {
                intZ = this._imageData.height - 1;
            }
            var color = this.getPixelColor(intX, intZ) & 0xff;
            return (color > this._maxElevation) ? (this._maxElevation / 0xff) * this._height : ((color < this._minElevation) ? (this._minElevation / 0xff) * this._height : (color / 0xff) * this._height);
        };
        /**
        * @language zh_CN
        * @private
        * 获取像素点颜色
        * @param intX {number} 像素浮点位置X
        * @param intZ {number} 像素浮点位置Z
        * @returns {number} 颜色值
        * @version Egret 3.0
        * @platform Web,Native
        */
        ElevationGeometry.prototype.getPixelColor = function (intX, intZ) {
            var index = (intZ * this._heightmap.imageData.width + intX) * 4;
            var color = this._imageData.data[index + 3] << 24 | this._imageData.data[index + 0] << 16 | this._imageData.data[index + 1] << 8 | this._imageData.data[index + 2];
            return color;
        };
        /**
        * @language zh_CN
        * 根据像素浮点位置获取3D场景的位置(需要插值计算)
        * @param floatX {number} 像素浮点位置X
        * @param floatZ {number} 像素浮点位置Z
        * @param imageWidth {number} 所在图片的宽度
        * @param imageHeight {number} 所在图片的高度
        * @returns {Vector3} 场景中的3D坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        ElevationGeometry.prototype.get3DCoordAtPixel = function (floatX, floatZ, imageWidth, imageHeight, target) {
            if (target === void 0) { target = null; }
            floatZ = imageHeight - floatZ;
            target = target || new egret3d.Vector3();
            //换算成3d空间的xy位置
            floatX *= this._width / imageWidth;
            floatX -= this._width * 0.5;
            floatZ *= this._depth / imageHeight;
            floatZ -= this._depth * 0.5;
            target.setTo(floatX, 0, floatZ);
            target.y = this.getHeightBySceneCoord(floatX, floatZ);
            return target;
        };
        /**
        * @language zh_CN
        * 根据3D场景中的浮点位置X和Z获取高度Y
        * @param floatX {number} 像素浮点位置X
        * @param floatZ {number} 像素浮点位置Z
        * @return {number} 指定位置的高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        ElevationGeometry.prototype.getHeightBySceneCoord = function (floatX, floatZ) {
            //得到所在网格的index
            floatX += this._width * 0.5;
            floatZ += this._depth * 0.5;
            if (floatX < 0 || floatZ < 0) {
                return 0;
            }
            if (floatX >= this._width || floatZ >= this._depth) {
                return 0;
            }
            //颠倒一下
            floatZ = this._depth - floatZ;
            floatX *= this._imageData.width / this._width;
            floatZ *= this._imageData.height / this._depth;
            var pixelX = Math.floor(floatX);
            var pixelY = Math.floor(floatZ);
            var y0 = this.getHeightByPixel(pixelX, pixelY);
            var y1 = this.getHeightByPixel(pixelX + 1, pixelY);
            var y2 = this.getHeightByPixel(pixelX, pixelY + 1);
            var y3 = this.getHeightByPixel(pixelX + 1, pixelY + 1);
            var tx = floatX - pixelX;
            var ty = floatZ - pixelY;
            y0 = egret3d.MathUtil.mix(y0, y1, tx);
            y1 = egret3d.MathUtil.mix(y2, y3, tx);
            y0 = egret3d.MathUtil.mix(y0, y1, ty);
            return y0;
        };
        ElevationGeometry.prototype.updateFaceNormals = function () {
            var i = 0, j = 0, k = 0;
            var index;
            var len = this.indexCount;
            var x1, x2, x3;
            var y1, y2, y3;
            var z1, z2, z3;
            var dx1, dy1, dz1;
            var dx2, dy2, dz2;
            var cx, cy, cz;
            var d;
            var posStride = 17;
            var posOffset = 0;
            var faceNormals = [];
            while (i < len) {
                index = posOffset + this.indexArray[i + 0] * posStride;
                x1 = this.vertexArray[index];
                y1 = this.vertexArray[index + 1];
                z1 = this.vertexArray[index + 2];
                index = posOffset + this.indexArray[i + 1] * posStride;
                x2 = this.vertexArray[index];
                y2 = this.vertexArray[index + 1];
                z2 = this.vertexArray[index + 2];
                index = posOffset + this.indexArray[i + 2] * posStride;
                x3 = this.vertexArray[index];
                y3 = this.vertexArray[index + 1];
                z3 = this.vertexArray[index + 2];
                dx1 = x2 - x1;
                dy1 = y2 - y1;
                dz1 = z2 - z1;
                dx2 = x3 - x1;
                dy2 = y3 - y1;
                dz2 = z3 - z1;
                cx = dz1 * dy2 - dy1 * dz2;
                cy = dx1 * dz2 - dz1 * dx2;
                cz = dy1 * dx2 - dx1 * dy2;
                d = Math.sqrt(cx * cx + cy * cy + cz * cz);
                faceNormals[j++] = cz * d;
                faceNormals[j++] = cy * d;
                faceNormals[j++] = cx * d;
                i += 3;
            }
            i = 0;
            var f1 = 0, f2 = 1, f3 = 2;
            var normalStride = this.vertexAttLength;
            var normalOffset = 3;
            while (i < len) {
                index = normalOffset + this.indexArray[i++] * normalStride;
                this.vertexArray[index++] = faceNormals[f1];
                this.vertexArray[index++] = faceNormals[f2];
                this.vertexArray[index++] = faceNormals[f3];
                index = normalOffset + this.indexArray[i++] * normalStride;
                this.vertexArray[index++] = faceNormals[f1];
                this.vertexArray[index++] = faceNormals[f2];
                this.vertexArray[index++] = faceNormals[f3];
                index = normalOffset + this.indexArray[i++] * normalStride;
                this.vertexArray[index++] = faceNormals[f1];
                this.vertexArray[index++] = faceNormals[f2];
                this.vertexArray[index++] = faceNormals[f3];
                f1 += 3;
                f2 += 3;
                f3 += 3;
            }
        };
        return ElevationGeometry;
    }(egret3d.Geometry));
    egret3d.ElevationGeometry = ElevationGeometry;
    __reflect(ElevationGeometry.prototype, "egret3d.ElevationGeometry");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ElevationGeometry.js.map