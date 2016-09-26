﻿module egret3d {
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
     * @includeExample geometry/SphereGeometry.ts
     */
    export class SphereGeometry extends Geometry {

        private _segmentsW: number = 50;
        /**
        * @language zh_CN
        * 宽度分段数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get segmentsW(): number {
            return this._segmentsW;
        }
        private _segmentsH: number = 50;
        /**
        * @language zh_CN
        * 高度分段数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get segmentsH(): number {
            return this._segmentsH;
        }
        private _radius: number = 100;
        /**
        * @language zh_CN
        * 半径
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get radius(): number {
            return this._radius;
        }


        /**
        * @language zh_CN
        * 构造函数
        * @param r 半径 默认值 100
        * @param segmentsW 宽度分段数 默认值 15
        * @param segmentsH 高度分段数 默认值 15
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(r: number = 100.0, segmentsW: number = 15, segmentsH: number = 15 ) {
            super();

            this._radius = r;
            this._segmentsW = segmentsW;
            this._segmentsH = segmentsH;

            this.buildSphere(true);
        }

        private buildSphere(front: boolean = true) {
            this.vertexFormat = VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_TANGENT | VertexFormat.VF_COLOR | VertexFormat.VF_UV0 | VertexFormat.VF_UV1;


            var i: number = 0, j: number = 0, triIndex: number = 0;
            var numVerts: number = (this._segmentsH + 1) * (this._segmentsW + 1);
            var stride: number = this.vertexAttLength;
            var skip: number = stride - 9;

            this.vertexCount = numVerts;
            this.indexCount = (this._segmentsH - 1) * this._segmentsW * 6;

            var startIndex: number = 0;
            var index: number = 0;
            var comp1: number = 0, comp2: number = 0, t1: number = 0, t2: number = 0;

            for (j = 0; j <= this._segmentsH; ++j) {

                startIndex = index;

                var horangle: number = Math.PI * j / this._segmentsH;
                var z: number = -this._radius * Math.cos(horangle);
                var ringradius: number = this._radius * Math.sin(horangle);

                for (i = 0; i <= this._segmentsW; ++i) {
                    var verangle: number = 2 * Math.PI * i / this._segmentsW;
                    var x: number = ringradius * Math.cos(verangle);
                    var y: number = ringradius * Math.sin(verangle);
                    var normLen: number = 1 / Math.sqrt(x * x + y * y + z * z);
                    var tanLen: number = Math.sqrt(y * y + x * x);

                    t1 = 0;
                    t2 = tanLen > .007 ? x / tanLen : 0;
                    comp1 = -z;
                    comp2 = y;

                    if (i == this._segmentsW) {

                        this.vertexArray[index++] = this.vertexArray[startIndex];
                        this.vertexArray[index++] = this.vertexArray[startIndex + 1];
                        this.vertexArray[index++] = this.vertexArray[startIndex + 2];

                        this.vertexArray[index++] = x * normLen;;
                        this.vertexArray[index++] = comp1 * normLen;;
                        this.vertexArray[index++] = comp2 * normLen;;

                        this.vertexArray[index++] = tanLen > .007 ? -y / tanLen : 1;
                        this.vertexArray[index++] = t1;
                        this.vertexArray[index++] = t2;

                        this.vertexArray[index + 0] = 1.0;
                        this.vertexArray[index + 1] = 1.0;
                        this.vertexArray[index + 2] = 1.0;
                        this.vertexArray[index + 3] = 1.0;

                    } else {
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
                        var a: number = (this._segmentsW + 1) * j + i;
                        var b: number = (this._segmentsW + 1) * j + i - 1;
                        var c: number = (this._segmentsW + 1) * (j - 1) + i - 1;
                        var d: number = (this._segmentsW + 1) * (j - 1) + i;

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
                            

                        } else if (j == 1) {

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
                          

                        } else {

                            if (front) {
                                this.indexArray[triIndex++] = a;
                                this.indexArray[triIndex++] = d
                                this.indexArray[triIndex++] = c;
                                this.indexArray[triIndex++] = a;
                                this.indexArray[triIndex++] = c;
                                this.indexArray[triIndex++] = b;
                            }
                            else {
                                this.indexArray[triIndex++] = a;
                                this.indexArray[triIndex++] = c
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
            var stride: number = 17;
            var numUvs: number = (this._segmentsH + 1) * (this._segmentsW + 1) * stride;
            var data: Array<number>;
            var skip: number = stride - 2;


            var index: number = 13;
            for (j = 0; j <= this._segmentsH; ++j) {
                for (i = 0; i <= this._segmentsW; ++i) {
                    this.vertexArray[index++] = (i / this._segmentsW);
                    this.vertexArray[index++] = (j / this._segmentsH);
                    index += skip;
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