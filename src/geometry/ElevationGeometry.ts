module egret3d {

    /**
    * @class egret3d.ElevationGeometry
    * @classdesc
    * 使用高度图创建Geometry
    * 高度图的一个任意一个通道 算出0.0 - 1.0 值  然后乘以 height 就是当前顶点高度值
    * @version Egret 3.0
    * @platform Web,Native
    * @includeExample geometry/CubeGeometry.ts
    */
    export class ElevationGeometry extends Geometry {

        private _width: number = 100;
        private _height: number = 100;

        private _segmentsW: number = 100;
        private _segmentsH: number = 100;

        private _depth: number = 100;

        private _minElevation: number = 100;
        private _maxElevation: number = 100;

        private _heightmap: ImageTexture;

        private _scaleU: number = 1;
        private _scaleV: number = 1;
        private _imageData: ImageData;

        private _positionXYZ: number[];

        /**
        * @language zh_CN
        * 得到宽度
        * @returns {ImageTexture} 宽度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get width(): number {
            return this._width;
        }

        /**
        * @language zh_CN
        * 得到高度
        * @returns {ImageTexture} 高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get height(): number {
            return this._height;
        }

        /**
        * @language zh_CN
        * 得到深度
        * @returns {ImageTexture} 深度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get depth(): number {
            return this._depth;
        }

        /**
        * @language zh_CN
        * 得到高度图
        * @returns {ImageTexture} 高度图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get heightmap(): ImageTexture {
            return this._heightmap;
        }

        /**
        * @language zh_CN
        * 得到格子列数
        * @returns {number} 格子列数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get segmentsW(): number {
            return this._segmentsW;
        }

        /**
        * @language zh_CN
        * 得到格子行数
        * @returns {number} 格子行数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get segmentsH(): number {
            return this._segmentsH;
        }

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
        constructor(heightmap: ImageTexture, width: number = 1000, height: number = 100, depth: number = 1000, segmentsW: number = 30, segmentsH: number = 30, maxElevation: number = 255, minElevation: number = 0) {
            super();
            this._segmentsW = segmentsW;
            this._segmentsH = segmentsH;
            this._width = width;
            this._height = height;
            this._depth = depth;
            this._minElevation = minElevation;
            this._maxElevation = maxElevation;
            this._heightmap = heightmap;

            this._imageData = heightmap.readPixels(0, 0, heightmap.width, heightmap.height);
            this._positionXYZ = [];


            this.buildGeomtry(true);
        }

        /**
       * @private
       * @language zh_CN
       * 生成网格
       * @version Egret 3.0
       * @platform Web,Native
       */
        public buildGeomtry(front: boolean) {
            this.vertexFormat = VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_TANGENT | VertexFormat.VF_COLOR | VertexFormat.VF_UV0 | VertexFormat.VF_UV1;

            var x: number, z: number;
            var numInds: number;
            var base: number;
            var tw: number = this._segmentsW + 1;
            var numVerts: number = (this._segmentsH + 1) * tw;
            var uDiv: number = (this._heightmap.width - 1) / this._segmentsW;
            var vDiv: number = (this._heightmap.height - 1) / this._segmentsH;
            var u: number, v: number;
            var y: number;

            this.vertexCount = numVerts;
            this.indexCount = this._segmentsH * this._segmentsW * 6;

            numVerts = 0;
            numInds = 0;
            var col: number;

            for (var zi: number = 0; zi <= this._segmentsH; ++zi) {
                for (var xi: number = 0; xi <= this._segmentsW; ++xi) {
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
        }


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
        private getHeightByPixel(intX: number, intZ: number): number {
            intX = Math.floor(intX);
            intZ = Math.floor(intZ);
            if (intX < 0) {
                intX = 0;
            } else if (intX >= this._imageData.width) {
                intX = this._imageData.width - 1;
            }
            if (intZ < 0) {
                intZ = 0;
            } else if (intZ > this._imageData.height) {
                intZ = this._imageData.height - 1;
            }

            var color: number = this.getPixelColor(intX, intZ) & 0xff;
            return (color > this._maxElevation) ? (this._maxElevation / 0xff) * this._height : ((color < this._minElevation) ? (this._minElevation / 0xff) * this._height : (color / 0xff) * this._height);
        }

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
        private getPixelColor(intX: number, intZ: number): number {
            var index: number = (intZ * this._heightmap.imageData.width + intX) * 4;
            var color: number = this._imageData.data[index + 3] << 24 | this._imageData.data[index + 0] << 16 | this._imageData.data[index + 1] << 8 | this._imageData.data[index + 2];
            return color;
        }










        /**
        * @language zh_CN
        * 根据像素浮点位置获取3D场景的位置(需要插值计算)
        * @param floatX {number} 像素浮点位置X
        * @param floatZ {number} 像素浮点位置Z
        * @param imageWidth {number} 所在图片的宽度
        * @param imageHeight {number} 所在图片的高度
        * @returns {Vector3D} 场景中的3D坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get3DCoordAtPixel(floatX: number, floatZ: number, imageWidth: number, imageHeight: number, target: Vector3D = null): Vector3D {
            floatZ = imageHeight - floatZ;
            target = target || new Vector3D();
            //换算成3d空间的xy位置
            floatX *= this._width / imageWidth;
            floatX -= this._width * 0.5;

            floatZ *= this._depth / imageHeight;
            floatZ -= this._depth * 0.5;

            target.setTo(floatX, 0, floatZ);

            target.y = this.getHeightBySceneCoord(floatX, floatZ);
            return target;
        }


        /**
        * @language zh_CN
        * 根据3D场景中的浮点位置X和Z获取高度Y
        * @param floatX {number} 像素浮点位置X
        * @param floatZ {number} 像素浮点位置Z
        * @return {number} 指定位置的高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getHeightBySceneCoord(floatX: number, floatZ: number): number {
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

            var pixelX: number = Math.floor(floatX);
            var pixelY: number = Math.floor(floatZ);

            var y0: number = this.getHeightByPixel(pixelX, pixelY);
            var y1: number = this.getHeightByPixel(pixelX + 1, pixelY);
            var y2: number = this.getHeightByPixel(pixelX, pixelY + 1);
            var y3: number = this.getHeightByPixel(pixelX + 1, pixelY + 1);

            var tx: number = floatX - pixelX;
            var ty: number = floatZ - pixelY;

            y0 = MathUtil.mix(y0, y1, tx);
            y1 = MathUtil.mix(y2, y3, tx);

            y0 = MathUtil.mix(y0, y1, ty);

            return y0;

        }




        private updateFaceNormals() {
            var i: number = 0, j: number = 0, k: number = 0;
            var index: number;
            var len: number = this.indexCount
            var x1: number, x2: number, x3: number;
            var y1: number, y2: number, y3: number;
            var z1: number, z2: number, z3: number;
            var dx1: number, dy1: number, dz1: number;
            var dx2: number, dy2: number, dz2: number;
            var cx: number, cy: number, cz: number;
            var d: number;
            var posStride: number = 17;
            var posOffset: number = 0;
            var faceNormals: number[] = [];
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
            var f1: number = 0, f2: number = 1, f3: number = 2;
            var normalStride: number = this.vertexAttLength;
            var normalOffset: number = 3;
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
        }

    }
}