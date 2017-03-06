﻿module egret3d {
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
    export class PlaneGeometry extends Geometry {

        /**
        * @private
        */
        private _wCenter: boolean;
        /**
        * @private
        */
        private _hCenter: boolean;


        private _segmentsW: number = 1;
        /**
        * @language zh_CN
        * 宽度分段数
        * @returns {number} 宽度分段数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get segmentsW(): number {
            return this._segmentsW;
        }
        private _segmentsH: number = 1;
        /**
        * @language zh_CN
        * 高度分段数
        * @returns {number} 高度分段数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get segmentsH(): number {
            return this._segmentsH;
        }
        private _width: number = 500.0;
        /**
        * @language zh_CN
        * 宽度
        * @returns {number} 宽度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get width(): number {
            return this._width;
        }
        private _height: number = 500.0;
        /**
        * @language zh_CN
        * 高度
        * @returns {number} 高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get height(): number {
            return this._height;
        }
        private _scaleU: number = 1;
        /**
        * @language zh_CN
        * U缩放
        * @returns {number} 缩放值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get scaleU(): number {
            return this._scaleU;
        }
        private _scaleV: number = 1;
        /**
        * @language zh_CN
        * U缩放
        * @returns {number} 缩放值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get scaleV(): number {
            return this._scaleV;
        }

        /**
        * @language zh_CN
        * 构造函数
        * @param width {number} 宽度
        * @param height {number} 高度
        * @param segmentsW {number} 宽度分段数
        * @param segmentsH {number} 高度分段数
        * @param uScale {number} U缩放
        * @param vScale {number} V缩放
        * @param aixs {Vector3D} 平面的朝向 默认参数为Vector3D.Y_AXIS
        * @param wCenter {boolean} 是否width以中心位置为(0,0)点
        * @param hCenter {boolean} 是否height以中心位置为(0,0)点
        */
        constructor(width: number = 500, height: number = 500, segmentsW: number = 1, segmentsH: number = 1, uScale: number = 1, vScale: number = 1, aixs: Vector3D = Vector3D.Y_AXIS,
            wCenter: boolean = true, hCenter: boolean = true) {

            super();
            this._width = width;
            this._height = height;
            this._segmentsW = segmentsW;
            this._segmentsH = segmentsH;
            this._scaleU = uScale;
            this._scaleV = vScale;
            this._wCenter = wCenter;
            this._hCenter = hCenter;
            this.buildGeometry(aixs);
        }

        private buildGeometry(aixs: Vector3D): void {

            this.vertexFormat = VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_TANGENT | VertexFormat.VF_COLOR | VertexFormat.VF_UV0;
            var x: number, y: number;
            var numIndices: number;
            var base: number;
            var tw: number = this._segmentsW + 1;
            var numVertices: number = (this._segmentsH + 1) * tw;
            var stride: number = this.vertexAttLength;
            var skip: number = stride - 15;

            numIndices = this._segmentsH * this._segmentsW * 6;

            this.vertexCount = numVertices;
            this.indexCount = numIndices;


            numIndices = 0;
            var point: Vector3D = new Vector3D();
            var index: number = 0;
            for (var yi: number = 0; yi <= this._segmentsH; ++yi) {
                for (var xi: number = 0; xi <= this._segmentsW; ++xi) {
                    x = (xi / this._segmentsW - .5) * this._width;
                    y = (yi / this._segmentsH - .5) * this._height;
                    if (this._wCenter == false) {
                        x += this._width / 2;
                    }
                    if (this._hCenter == false) {
                        y += this._height / 2;
                    }
                    switch (aixs) {
                        case Vector3D.Y_AXIS:
                            this.vertexArray[index++] = x;
                            this.vertexArray[index++] = 0;
                            this.vertexArray[index++] = y;

                            this.vertexArray[index++] = 0;
                            this.vertexArray[index++] = 1;
                            this.vertexArray[index++] = 0;
                            break;
                        case Vector3D.Z_AXIS:
                            this.vertexArray[index++] = x;
                            this.vertexArray[index++] = y;
                            this.vertexArray[index++] = 0;

                            this.vertexArray[index++] = 0;
                            this.vertexArray[index++] = 0;
                            this.vertexArray[index++] = -1;
                            break;
                        case Vector3D.X_AXIS:
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
                        var mult: number = 1;

                        this.indexArray[numIndices++] = base * mult;
                        this.indexArray[numIndices++] = (base + tw + 1) * mult;
                        this.indexArray[numIndices++] = (base + tw) * mult;

                        this.indexArray[numIndices++] = base * mult;
                        this.indexArray[numIndices++] = (base + 1) * mult;
                        this.indexArray[numIndices++] = (base + tw + 1) * mult;

                    }
                }
            }

            var subGeometry: SubGeometry = new SubGeometry();
            subGeometry.geometry = this;
            subGeometry.start = 0;
            subGeometry.count = this.indexCount;
            this.subGeometrys.push(subGeometry);
        }
    }
}