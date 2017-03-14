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
     * @class egret3d.SphereGeometry
     * @classdesc
     * SphereGeometry类 表示球体
     *
     * 示例：
     * //用 SphereGeometry 对象创建一个mesh，并给予默认纹理材质TextureMaterial（默认为棋盘格纹理）;
     * var box: egret3d.Mesh = new egret3d.Mesh( new egret3d.SphereGeometry(), new egret3d.TextureMaterial() );
     *
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample geometry/CubeGeometry.ts
     */
    var SphereGeometry = (function (_super) {
        __extends(SphereGeometry, _super);
        /**
        * @language zh_CN
        * 构造函数
        * @param r {number} 半径 默认值 100
        * @param segmentsW {number} 宽度分段数 默认值 15
        * @param segmentsH {number} 高度分段数 默认值 15
        * @version Egret 3.0
        * @platform Web,Native
        */
        function SphereGeometry(r, segmentsW, segmentsH) {
            if (r === void 0) { r = 100.0; }
            if (segmentsW === void 0) { segmentsW = 15; }
            if (segmentsH === void 0) { segmentsH = 15; }
            var _this = _super.call(this) || this;
            _this._segmentsW = 50;
            _this._segmentsH = 50;
            _this._radius = 100;
            _this._radius = r;
            _this._segmentsW = segmentsW;
            _this._segmentsH = segmentsH;
            _this.buildSphere(true);
            return _this;
        }
        Object.defineProperty(SphereGeometry.prototype, "segmentsW", {
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
        Object.defineProperty(SphereGeometry.prototype, "segmentsH", {
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
        Object.defineProperty(SphereGeometry.prototype, "radius", {
            /**
            * @language zh_CN
            * 半径
            * @returns {number} 半径
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._radius;
            },
            enumerable: true,
            configurable: true
        });
        SphereGeometry.prototype.buildSphere = function (front) {
            if (front === void 0) { front = true; }
            this.vertexFormat = egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_NORMAL | egret3d.VertexFormat.VF_TANGENT | egret3d.VertexFormat.VF_COLOR | egret3d.VertexFormat.VF_UV0 | egret3d.VertexFormat.VF_UV1;
            var i = 0, j = 0, triIndex = 0;
            var numVerts = (this._segmentsH + 1) * (this._segmentsW + 1);
            var stride = this.vertexAttLength;
            var skip = stride - 9;
            this.vertexCount = numVerts;
            this.indexCount = (this._segmentsH - 1) * this._segmentsW * 6;
            var startIndex = 0;
            var index = 0;
            var comp1 = 0, comp2 = 0, t1 = 0, t2 = 0;
            for (j = 0; j <= this._segmentsH; ++j) {
                startIndex = index;
                var horangle = Math.PI * j / this._segmentsH;
                var z = -this._radius * Math.cos(horangle);
                var ringradius = this._radius * Math.sin(horangle);
                for (i = 0; i <= this._segmentsW; ++i) {
                    var verangle = 2 * Math.PI * i / this._segmentsW;
                    var x = ringradius * Math.cos(verangle);
                    var y = ringradius * Math.sin(verangle);
                    var normLen = 1 / Math.sqrt(x * x + y * y + z * z);
                    var tanLen = Math.sqrt(y * y + x * x);
                    t1 = 0;
                    t2 = tanLen > .007 ? x / tanLen : 0;
                    comp1 = -z;
                    comp2 = y;
                    if (i == this._segmentsW) {
                        this.vertexArray[index++] = this.vertexArray[startIndex];
                        this.vertexArray[index++] = this.vertexArray[startIndex + 1];
                        this.vertexArray[index++] = this.vertexArray[startIndex + 2];
                        this.vertexArray[index++] = x * normLen;
                        ;
                        this.vertexArray[index++] = comp1 * normLen;
                        ;
                        this.vertexArray[index++] = comp2 * normLen;
                        ;
                        this.vertexArray[index++] = tanLen > .007 ? -y / tanLen : 1;
                        this.vertexArray[index++] = t1;
                        this.vertexArray[index++] = t2;
                        this.vertexArray[index + 0] = 1.0;
                        this.vertexArray[index + 1] = 1.0;
                        this.vertexArray[index + 2] = 1.0;
                        this.vertexArray[index + 3] = 1.0;
                    }
                    else {
                        this.vertexArray[index++] = x;
                        this.vertexArray[index++] = comp1;
                        this.vertexArray[index++] = comp2;
                        this.vertexArray[index++] = x * normLen;
                        this.vertexArray[index++] = comp1 * normLen;
                        this.vertexArray[index++] = comp2 * normLen;
                        this.vertexArray[index++] = tanLen > .007 ? -y / tanLen : 1;
                        this.vertexArray[index++] = t1;
                        this.vertexArray[index++] = t2;
                        this.vertexArray[index] = 1.0;
                        this.vertexArray[index + 1] = 1.0;
                        this.vertexArray[index + 2] = 1.0;
                        this.vertexArray[index + 3] = 1.0;
                    }
                    if (i > 0 && j > 0) {
                        var a = (this._segmentsW + 1) * j + i;
                        var b = (this._segmentsW + 1) * j + i - 1;
                        var c = (this._segmentsW + 1) * (j - 1) + i - 1;
                        var d = (this._segmentsW + 1) * (j - 1) + i;
                        if (j == this._segmentsH) {
                            this.vertexArray[index - 9] = this.vertexArray[startIndex];
                            this.vertexArray[index - 8] = this.vertexArray[startIndex + 1];
                            this.vertexArray[index - 7] = this.vertexArray[startIndex + 2];
                            if (front) {
                                this.indexArray[triIndex++] = a;
                                this.indexArray[triIndex++] = d;
                                this.indexArray[triIndex++] = c;
                            }
                            else {
                                this.indexArray[triIndex++] = a;
                                this.indexArray[triIndex++] = c;
                                this.indexArray[triIndex++] = d;
                            }
                        }
                        else if (j == 1) {
                            if (front) {
                                this.indexArray[triIndex++] = a;
                                this.indexArray[triIndex++] = c;
                                this.indexArray[triIndex++] = b;
                            }
                            else {
                                this.indexArray[triIndex++] = a;
                                this.indexArray[triIndex++] = b;
                                this.indexArray[triIndex++] = c;
                            }
                        }
                        else {
                            if (front) {
                                this.indexArray[triIndex++] = a;
                                this.indexArray[triIndex++] = d;
                                this.indexArray[triIndex++] = c;
                                this.indexArray[triIndex++] = a;
                                this.indexArray[triIndex++] = c;
                                this.indexArray[triIndex++] = b;
                            }
                            else {
                                this.indexArray[triIndex++] = a;
                                this.indexArray[triIndex++] = c;
                                this.indexArray[triIndex++] = d;
                                this.indexArray[triIndex++] = a;
                                this.indexArray[triIndex++] = b;
                                this.indexArray[triIndex++] = c;
                            }
                        }
                    }
                    index += skip;
                }
            }
            //var i: number, j: number;
            var stride = 17;
            var numUvs = (this._segmentsH + 1) * (this._segmentsW + 1) * stride;
            var data;
            var skip = stride - 2;
            var index = 13;
            for (j = 0; j <= this._segmentsH; ++j) {
                for (i = 0; i <= this._segmentsW; ++i) {
                    this.vertexArray[index++] = (i / this._segmentsW);
                    this.vertexArray[index++] = (j / this._segmentsH);
                    index += skip;
                }
            }
            var subGeometry = new egret3d.SubGeometry();
            subGeometry.geometry = this;
            subGeometry.start = 0;
            subGeometry.count = this.indexCount;
            this.subGeometrys.push(subGeometry);
        };
        return SphereGeometry;
    }(egret3d.Geometry));
    egret3d.SphereGeometry = SphereGeometry;
    __reflect(SphereGeometry.prototype, "egret3d.SphereGeometry");
})(egret3d || (egret3d = {}));
