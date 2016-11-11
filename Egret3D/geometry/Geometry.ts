﻿module egret3d {
    
    /**
    * @language zh_CN
    * @class egret3d.VertexFormat
    * @classdesc
    * 顶点数据格式类型 是由2进制组成 一个顶点可以由多个类型组成
    * 创建顶点数据的顺序必需按照下面枚举定义的顺序进行赋值
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum VertexFormat {
                
        /**
        * @language zh_CN
        * 顶点坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        VF_POSITION = 0x00000001,

        /**
        * @language zh_CN
        * 顶点法线
        * @version Egret 3.0
        * @platform Web,Native
        */
        VF_NORMAL = 0x00000002,
                        
        /**
        * @language zh_CN
        * 顶点切线
        * @version Egret 3.0
        * @platform Web,Native
        */
        VF_TANGENT = 0x00000004,
        
        /**
        * @language zh_CN
        * 顶点颜色
        * @version Egret 3.0
        * @platform Web,Native
        */
        VF_COLOR = 0x00000008,
        
        /**
        * @language zh_CN
        * 顶点uv
        * @version Egret 3.0
        * @platform Web,Native
        */
        VF_UV0 = 0x00000010,
                
        /**
        * @language zh_CN
        * 顶点第二uv
        * @version Egret 3.0
        * @platform Web,Native
        */
        VF_UV1 = 0x00000020,

        /**
        * @language zh_CN
        * 顶点蒙皮信息
        * @version Egret 3.0
        * @platform Web,Native
        */
        VF_SKIN = 0x00000040,

        /**
          * @private
          * @language zh_CN
          * quad uv rectangle
          * @version Egret 3.0
          * @platform Web,Native
          */
        VF_QUAD_UVREC = 0x00000080,

             /**
          * @private
          * @language zh_CN
          * quad uv rectangle
          * @version Egret 3.0
          * @platform Web,Native
          */
        VF_QUAD_ROTATION = 0x00000100,


             /**
          * @private
          * @language zh_CN
          * quad uv rectangle
          * @version Egret 3.0
          * @platform Web,Native
          */
        VF_QUAD_MASK = 0x00000400,

        /**
        * @private
        * @language zh_CN
        * quad uv rectangle
        * @version Egret 3.0
        * @platform Web,Native
        */
        VF_QUAD_POS = 0x00000800,

        /**
        * @private
        * @language zh_CN
        * quad uv rectangle
        * @version Egret 3.0
        * @platform Web,Native
        */
        VF_QUAD_ORIGN = 0x00001000,

        /**
         * @private
         * @language zh_CN
         * quad uv rectangle
         * @version Egret 3.0
         * @platform Web,Native
         */
        VF_QUAD_COLOR = 0x00002000,
    }

    /**
    * @language zh_CN
    * @class egret3d.Geometry
    * @classdesc
    * 注意:当使用vertexArray 或 indexArray 必须先设置 vertexCount 或 indexCount
    * 表示几何形状 子集
    * @see egret3d.VertexBuffer3D
    * @see egret3d.IndexBuffer3D
    * @see egret3d.SubGeometry
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Geometry extends Reference {

        /**
        * @private
        * @language zh_CN
        * 顶点格式
        * @version Egret 3.0
        * @platform Web,Native
        */
        public drawType: number = Context3DProxy.gl.STATIC_DRAW ; 

        /**
        * @language zh_CN
        * 顶点格式
        * @default 0
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _vertexFormat: number = 0 ;

        /**
        * @language zh_CN
        * 顶点属性长度
        * @default 0
        * @version Egret 3.0
        * @platform Web,Native
        */
        public vertexAttLength: number = 0;

        /**
        * @language zh_CN
        * 顶点数据 
        * @version Egret 3.0
        * @platform Web,Native
        */
        public vertexArray: Float32Array;

        /**
        * @language zh_CN
        * 索引数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public indexArray: Uint16Array;

        /**
        * @language zh_CN
        * shader buffer
        * @version Egret 3.0
        * @platform Web,Native
        */
        public sharedVertexBuffer: VertexBuffer3D;
        /**
        * @language zh_CN
        * shader index
        * @version Egret 3.0
        * @platform Web,Native
        */
        public sharedIndexBuffer: IndexBuffer3D;

        /**
        * @private
        */
        private _skeleton: Skeleton;

        /**
        * @private
        */
        public skeletonGPUData: Float32Array;

        /**
        * @language zh_CN
        * 顶点字节数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public vertexSizeInBytes: number;

        /**
        * @language zh_CN
        * 面翻转，仅对系统 geometry 有效
        * @version Egret 3.0
        * @platform Web,Native
        */
        public faceOrBack: boolean = false 

        /**
        * @language zh_CN
        * 顶点坐标大小
        * @default 3
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static positionSize: number = 3;

        /**
        * @language zh_CN
        * 顶点法线大小
        * @default 3
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static normalSize: number = 3;

        /**
        * @language zh_CN
        * 顶点切线大小
        * @default 3
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static tangentSize: number = 3;

        /**
        * @language zh_CN
        * 顶点色大小
        * @default 4
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static colorSize: number = 4;

        /**
        * @language zh_CN
        * 顶点uv大小
        * @default 2
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static uvSize: number = 2;

        /**
        * @language zh_CN
        * 顶点uv2大小
        * @default 2
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static uv2Size: number = 2;

        /**
        * @language zh_CN
        * 顶点uv2大小
        * @default 8
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static skinSize: number = 8;

        /**
        * @language zh_CN
        * geometry子集
        * @version Egret 3.0
        * @platform Web,Native
        */
        public subGeometrys: Array<SubGeometry> = [];       

        /**
        * @language zh_CN
        * @private
        * buffer 需要重新提交的时候
        */
        private _bufferDiry: boolean = true;


        /**
        * @language zh_CN
        * 是否重新提交数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set bufferDiry(value: boolean) {
            this._bufferDiry = value;
        }

        /**
        * @language zh_CN
        * 是否重新提交数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get bufferDiry(): boolean {
            return this._bufferDiry;
        }

        /**
        * @language zh_CN
        * 顶点的数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _vertexCount: number = 0;

        /**
        * @language zh_CN
        * 索引数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _indexCount: number = 0;

        private _totalIndexCount: number = 0;

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set skeleton(skeleton: Skeleton) {

            if (!skeleton) {
                return;
            }
            this._skeleton = skeleton;
            this.skeletonGPUData = new Float32Array(skeleton.jointNum * 8);
            for (var i: number = 0; i < skeleton.jointNum; ++i) {
                this.skeletonGPUData[i * 8 + 3] = 1;
                this.skeletonGPUData[i * 8 + 7] = 1;
            }
        }

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get skeleton(): Skeleton {
            return this._skeleton;
        }

        /**
        * @language zh_CN
        * 顶点的数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get vertexCount(): number {
            return this._vertexCount;
        }

        /**
        * @language zh_CN
        * 设置顶点的数量，同时 this.vertexArray = new Float32Array(this.vertexAttLength * this.vertexCount);
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set vertexCount(value: number) {
            if (this._vertexCount == value) {
                return;
            }
            var dataCount: number = value * this.vertexAttLength;

            var data: Float32Array = null;
            if (this.vertexArray) {
                if (this.vertexCount < value) {
                    data = new Float32Array(dataCount);
                    data.set(this.vertexArray);
                    delete this.vertexArray;
                }
                else {
                    data = this.vertexArray;
                }
            }
            else {
                data = new Float32Array(dataCount);
            }
            this.vertexArray = data;
            this._vertexCount = value;
        }

        /**
        * @language zh_CN
        * 索引的数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get indexCount(): number {
            return this._indexCount;
        }

        /**
        * @language zh_CN
        * 设置索引的数量，同时 this.indexArray = new Uint16Array(this._indexCount);
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set indexCount(value: number) {
            this._indexCount = value;
            this._faceCount = value / 3;

            if (this._totalIndexCount >= value) {
                return;
            }

            var data: Uint16Array = new Uint16Array(value);
            if (this.indexArray) {
                data.set(this.indexArray);
                delete this.indexArray;
            }
            this.indexArray = data;

            this._totalIndexCount = value;
        }

        public _faceCount: number = 0;

        /**
        * @language zh_CN
        * 模型面数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set faceCount(value: number) {
            if (this._faceCount == value) {
                return;
            }
            this.indexCount = value * 3;
            this._faceCount = value;
        }

        /**
        * @language zh_CN
        * 模型面数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get faceCount(): number {
            return this._faceCount;
        }

        /**
        * @language zh_CN
        * @private
        */
        public buildDefaultSubGeometry() {
            var subGeometry: SubGeometry = new SubGeometry();
            subGeometry.matID = 0;
            subGeometry.geometry = this;
            subGeometry.start = 0;
            subGeometry.count = this.indexCount;
            this.subGeometrys.push(subGeometry);
        }

        /**
        * @language zh_CN
        * 使用和定义顶点的数据结构
        *<p>例如 vertexFormat( VertexFormat.VF_POSITION )
        *设置这样的定义后,就会增加这样的数据顶点数据结构，
        *如果源文件中没有这样的数据结构，
        *就会通过计算的方式计算补全，
        *不能计算的就默认为0
        *@param vertexFormat 需要定义的顶点格式类型 VertexFormat.VF_COLOR | VertexFormat.VF_UV1
        * this.useVertexFormat( VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_COLOR |  VertexFormat.VF_UV0 | VertexFormat.VF_UV1 );//定义了一个完整的数据结构
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set vertexFormat(vertexFormat: number) {
            this._vertexFormat = vertexFormat;

            if (this.vertexFormat & VertexFormat.VF_POSITION) {
                this.vertexAttLength += Geometry.positionSize;
            }

            if (this.vertexFormat & VertexFormat.VF_NORMAL) {
                this.vertexAttLength += Geometry.normalSize;
            }

            if (this.vertexFormat & VertexFormat.VF_TANGENT) {
                this.vertexAttLength += Geometry.tangentSize;
            }

            if (this.vertexFormat & VertexFormat.VF_COLOR) {
                this.vertexAttLength += Geometry.colorSize;
            }

            if (this.vertexFormat & VertexFormat.VF_UV0) {
                this.vertexAttLength += Geometry.uvSize;
            }

            if (this.vertexFormat & VertexFormat.VF_UV1) {
                this.vertexAttLength += Geometry.uv2Size;
            }

            if (this.vertexFormat & VertexFormat.VF_SKIN) {
                this.vertexAttLength += Geometry.skinSize;
            }

            if (this.vertexFormat & VertexFormat.VF_QUAD_UVREC) {
                this.vertexAttLength += QuadData.uvRectangleSize;
            }

            if (this.vertexFormat & VertexFormat.VF_QUAD_ROTATION) {
                this.vertexAttLength += QuadData.rotationSize;
            }


            if (this.vertexFormat & VertexFormat.VF_QUAD_MASK) {
                this.vertexAttLength += QuadData.maskSize;
            }

            if (this.vertexFormat & VertexFormat.VF_QUAD_POS) {
                this.vertexAttLength += QuadData.posSize;
            }

            if (this.vertexFormat & VertexFormat.VF_QUAD_ORIGN) {
                this.vertexAttLength += QuadData.originalSize;
            }

            if (this.vertexFormat & VertexFormat.VF_QUAD_COLOR) {
                this.vertexAttLength += QuadData.colorSize;
            }

            this.vertexSizeInBytes = this.vertexAttLength * 4;
        }
                        
        /**
        * @language zh_CN
        * 获取顶点格式
        * @returns number 顶点格式
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get vertexFormat(): number {
            return this._vertexFormat;
        }
                        
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public activeState(time: number, delay: number, context3DProxy: Context3DProxy, camera3D: Camera3D) {
            if (this._bufferDiry) {
                this._bufferDiry = false; 
                this.upload(context3DProxy, this.drawType );
            }
            context3DProxy.bindVertexBuffer(this.sharedVertexBuffer);
            context3DProxy.bindIndexBuffer(this.sharedIndexBuffer);
        }
                                
        /**
        * @language zh_CN
        * @private
        * 提交顶点数据 如果顶点数据有变化的话,需要调用此函数重新提交
        * @param context3DProxy 上下文设备
        * @version Egret 3.0
        * @platform Web,Native
        */
        public upload(context3DProxy: Context3DProxy, drawType: number = Context3DProxy.gl.STATIC_DRAW ) {
            if (!this.sharedIndexBuffer && !this.sharedVertexBuffer) {
                this.sharedIndexBuffer = context3DProxy.creatIndexBuffer(this.indexArray);
                this.sharedVertexBuffer = context3DProxy.creatVertexBuffer(this.vertexArray, drawType); 
            } else {
                context3DProxy.uploadVertexBuffer(this.sharedVertexBuffer);
                context3DProxy.uploadIndexBuffer(this.sharedIndexBuffer);
            }
        }

        /**
        * @language zh_CN
        * 由顶点索引根据格式拿到顶点数据
        * @param index 顶点索引
        * @param vf 得到顶点的需要的数据格式
        * @param target 得到数据返回目标可以为null
        * @param count 得到顶点个数 默认一个
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getVertexForIndex(index: number, vf: VertexFormat, target: Array<number> = null, count: number = 1): Array<number> {
            if (!target) {
                target = new Array<number>();
            }

            if (index < 0 || index >= this.vertexCount) {
                return target;
            }
            for (var i: number = 0; i < count; ++i) {
                var offset: number = 0;
                if (vf & VertexFormat.VF_POSITION) {
                    if (this.vertexFormat & VertexFormat.VF_POSITION) {
                        target.push(this.vertexArray[index * this.vertexAttLength + offset + 0]);
                        target.push(this.vertexArray[index * this.vertexAttLength + offset + 1]);
                        target.push(this.vertexArray[index * this.vertexAttLength + offset + 2]);
                    }
                    else {
                        target.push(0, 0, 0);
                    }
                }
                if (this.vertexFormat & VertexFormat.VF_POSITION) {
                    offset += Geometry.positionSize;
                }

                if (vf & VertexFormat.VF_NORMAL) {
                    if (this.vertexFormat & VertexFormat.VF_NORMAL) {
                        target.push(this.vertexArray[index * this.vertexAttLength + offset + 0]);
                        target.push(this.vertexArray[index * this.vertexAttLength + offset + 1]);
                        target.push(this.vertexArray[index * this.vertexAttLength + offset + 2]);
                    }
                    else {
                        target.push(0, 0, 0);
                    }
                }

                if (this.vertexFormat & VertexFormat.VF_NORMAL) {
                    offset += Geometry.normalSize;
                }

                if (vf & VertexFormat.VF_TANGENT) {
                    if (this.vertexFormat & VertexFormat.VF_TANGENT) {
                        target.push(this.vertexArray[index * this.vertexAttLength + offset + 0]);
                        target.push(this.vertexArray[index * this.vertexAttLength + offset + 1]);
                        target.push(this.vertexArray[index * this.vertexAttLength + offset + 2]);
                    }
                    else {
                        target.push(0, 0, 0);
                    }
                }

                if (this.vertexFormat & VertexFormat.VF_TANGENT) {
                    offset += Geometry.tangentSize;

                }

                if (vf & VertexFormat.VF_COLOR) {
                    if (this.vertexFormat & VertexFormat.VF_COLOR) {
                        target.push(this.vertexArray[index * this.vertexAttLength + offset + 0]);
                        target.push(this.vertexArray[index * this.vertexAttLength + offset + 1]);
                        target.push(this.vertexArray[index * this.vertexAttLength + offset + 2]);
                        target.push(this.vertexArray[index * this.vertexAttLength + offset + 3]);
                    }
                    else {
                        target.push(0, 0, 0, 0);
                    }
                }

                if (this.vertexFormat & VertexFormat.VF_COLOR) {
                    offset += Geometry.colorSize;
                }

                if (vf & VertexFormat.VF_UV0) {
                    if (this.vertexFormat & VertexFormat.VF_UV0) {
                        target.push(this.vertexArray[index * this.vertexAttLength + offset + 0]);
                        target.push(this.vertexArray[index * this.vertexAttLength + offset + 1]);
                    }
                    else {
                        target.push(0, 0);
                    }
                }
                if (this.vertexFormat & VertexFormat.VF_UV0) {
                    offset += Geometry.uvSize;
                }


                if (vf & VertexFormat.VF_UV1) {
                    if (this.vertexFormat & VertexFormat.VF_UV1) {
                        target.push(this.vertexArray[index * this.vertexAttLength + offset + 0]);
                        target.push(this.vertexArray[index * this.vertexAttLength + offset + 1]);
                    }
                    else {
                        target.push(0, 0);
                    }
                }
                if (this.vertexFormat & VertexFormat.VF_UV1) {
                    offset += Geometry.uv2Size;
                }

                if (vf & VertexFormat.VF_SKIN) {
                    if (this.vertexFormat & VertexFormat.VF_SKIN) {
                        for (var j = 0; j < Geometry.skinSize; ++j) {
                            target.push(this.vertexArray[index * this.vertexAttLength + offset + j]);
                        }
                    }
                    else {
                        target.push(0, 0, 0, 0, 0, 0, 0, 0);
                    }
                }
                if (this.vertexFormat & VertexFormat.VF_SKIN) {
                    offset += Geometry.skinSize;
                }

                index++;
            }
           
            return target;
        }

       
        /**
        * @language zh_CN
        * 由顶点索引根据格式设置顶点数据
        * @param index 顶点索引
        * @param vf 设置顶点的需要的数据格式
        * @param src 设置的数据
        * @param vertexCount 设置的顶点数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setVerticesForIndex(index: number, vf: VertexFormat, src: Array<number>, vertexCount: number = 1) {
            if (index + vertexCount > this.vertexCount) {
                this.vertexCount = index + vertexCount;
            }

            this._bufferDiry = true;
            var offset: number = 0;
            var srcOffset: number = 0;
            for (var i: number = 0; i < vertexCount; ++i) {
                offset = 0;

                if (this.vertexFormat & VertexFormat.VF_POSITION) {
                    if (vf & VertexFormat.VF_POSITION) {
                        this.vertexArray[index * this.vertexAttLength + offset + 0] = src[srcOffset + 0];
                        this.vertexArray[index * this.vertexAttLength + offset + 1] = src[srcOffset + 1];
                        this.vertexArray[index * this.vertexAttLength + offset + 2] = src[srcOffset + 2];
                    }

                    offset += Geometry.positionSize;
                }
                if (vf & VertexFormat.VF_POSITION) {
                    srcOffset += Geometry.positionSize;
                }

                if (this.vertexFormat & VertexFormat.VF_NORMAL) {
                    if (vf & VertexFormat.VF_NORMAL) {
                        this.vertexArray[index * this.vertexAttLength + offset + 0] = src[srcOffset + 0];
                        this.vertexArray[index * this.vertexAttLength + offset + 1] = src[srcOffset + 1];
                        this.vertexArray[index * this.vertexAttLength + offset + 2] = src[srcOffset + 2];
                    }

                    offset += Geometry.normalSize;
                }
                if (vf & VertexFormat.VF_NORMAL) {
                    srcOffset += Geometry.normalSize;
                }

                if (this.vertexFormat & VertexFormat.VF_TANGENT) {
                    if (vf & VertexFormat.VF_TANGENT) {
                        this.vertexArray[index * this.vertexAttLength + offset + 0] = src[srcOffset + 0];
                        this.vertexArray[index * this.vertexAttLength + offset + 1] = src[srcOffset + 1];
                        this.vertexArray[index * this.vertexAttLength + offset + 2] = src[srcOffset + 2];
                    }

                    offset += Geometry.tangentSize;
                }
                if (vf & VertexFormat.VF_TANGENT) {
                    srcOffset += Geometry.tangentSize;
                }

                if (this.vertexFormat & VertexFormat.VF_COLOR) {
                    if (vf & VertexFormat.VF_COLOR) {
                        this.vertexArray[index * this.vertexAttLength + offset + 0] = src[srcOffset + 0];
                        this.vertexArray[index * this.vertexAttLength + offset + 1] = src[srcOffset + 1];
                        this.vertexArray[index * this.vertexAttLength + offset + 2] = src[srcOffset + 2];
                        this.vertexArray[index * this.vertexAttLength + offset + 3] = src[srcOffset + 3];
                    }
                    else {
                        this.vertexArray[index * this.vertexAttLength + offset + 0] = 1;
                        this.vertexArray[index * this.vertexAttLength + offset + 1] = 1;
                        this.vertexArray[index * this.vertexAttLength + offset + 2] = 1;
                        this.vertexArray[index * this.vertexAttLength + offset + 3] = 1;
                    }
                    offset += Geometry.colorSize;
                }
                if (vf & VertexFormat.VF_COLOR) {
                    srcOffset += Geometry.colorSize;
                }

                if (this.vertexFormat & VertexFormat.VF_UV0) {
                    if (vf & VertexFormat.VF_UV0) {
                        this.vertexArray[index * this.vertexAttLength + offset + 0] = src[srcOffset + 0];
                        this.vertexArray[index * this.vertexAttLength + offset + 1] = src[srcOffset + 1];
                    }

                    offset += Geometry.uvSize;
                }
                if (vf & VertexFormat.VF_UV0) {
                    srcOffset += Geometry.uvSize;
                }

                if (this.vertexFormat & VertexFormat.VF_UV1) {
                    if (vf & VertexFormat.VF_UV1) {
                        this.vertexArray[index * this.vertexAttLength + offset + 0] = src[srcOffset + 0];
                        this.vertexArray[index * this.vertexAttLength + offset + 1] = src[srcOffset + 1];
                    }

                    offset += Geometry.uv2Size;
                }
                if (vf & VertexFormat.VF_UV1) {
                    srcOffset += Geometry.uv2Size;
                }

                if (this.vertexFormat & VertexFormat.VF_SKIN) {
                    if (vf & VertexFormat.VF_SKIN) {
                        for (var j = 0; j < Geometry.skinSize; ++j) {
                            this.vertexArray[index * this.vertexAttLength + offset + j] = src[srcOffset + j];
                        }
                    }

                    offset += Geometry.skinSize;
                }
                if (vf & VertexFormat.VF_SKIN) {
                    srcOffset += Geometry.skinSize;
                }
                index++;
            }
        }

        /**
        * @language zh_CN
        * 获取顶点索引数据
        * @param start 数据开始位置
        * @param count 需要的索引数据，默认参数为-1，如果为-1那么取从start后面的所有索引数据
        * @param target 取到之后的数据，默认参数为null，如果为null那么就会new Array<number>进行返回
        * @returns Array<number> 索引数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getVertexIndices(start: number, count: number = -1, target: Array<number> = null): Array<number> {
            if (!target) {
                target = new Array<number>();
            }

            if (start >= this.indexCount) {
                return target;
            }

            count == -1 ? count = this.indexCount : count;

            if (start + count > this.indexCount) {
                count = this.indexCount - start;
            }

            for (var i: number = 0; i < count; ++i) {
                target[i] = this.indexArray[i + start];
            }
            return target;
        }

        /**
        * @language zh_CN
        * 设置顶点索引数据
        * @param start 数据开始位置
        * @param indices 数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setVertexIndices(start: number, indices: Array<number>) {
            if (start + indices.length > this.indexCount) {
                this.indexCount = start + indices.length;
            }
            for (var i: number = 0; i < indices.length; ++i) {
                this.indexArray[start + i] = indices[i];
            }
        }

        /*
        * @private
        */
        public cloneMirror(x: boolean, y: boolean, z: boolean): Geometry {
            var geometry: Geometry = new Geometry();
            geometry.vertexFormat = this.vertexFormat;
            geometry.vertexCount = this.vertexCount;
            geometry.indexCount = this.indexCount;

            var i: number = 0;
            var tempPos: Vector3D = new Vector3D(); 
            var pos: Vector3D = new Vector3D();
            var scal: Vector3D = new Vector3D(x ? -1 : 1, y ? -1 : 1, z ? -1 : 1);
            var rot: Quaternion = new Quaternion();

            geometry.vertexArray = new Float32Array(this.vertexArray.length);// this.vertexArray.subarray(0, this.vertexArray.length);
            geometry.indexArray = new Float32Array(this.indexArray.length);//this.indexArray.subarray(0, this.indexArray.length);

            for (i = 0; i < geometry.vertexArray.length; i++) {
                geometry.vertexArray[i] = this.vertexArray[i];
            }
            for (i = 0; i < geometry.indexArray.length; i++) {
                geometry.indexArray[i] = this.indexArray[i];
            }

            Matrix4_4.helpMatrix.makeTransform(pos, scal, rot);

            for (i = 0; i < this.vertexCount; i++){
                tempPos.x = geometry.vertexArray[i * this.vertexAttLength];
                tempPos.y = geometry.vertexArray[i * this.vertexAttLength + 1];
                tempPos.z = geometry.vertexArray[i * this.vertexAttLength + 2];

                Matrix4_4.helpMatrix.transformVector(tempPos, Vector3D.HELP_0);

                geometry.vertexArray[i * this.vertexAttLength] = Vector3D.HELP_0.x;
                geometry.vertexArray[i * this.vertexAttLength + 1] = Vector3D.HELP_0.y;
                geometry.vertexArray[i * this.vertexAttLength + 2] = Vector3D.HELP_0.z;
            }

            for (i = 0; i < this.indexCount/3; i++) {
                tempPos.x = geometry.indexArray[i * 3 + 0];
                tempPos.y = geometry.indexArray[i * 3 + 1];
                tempPos.z = geometry.indexArray[i * 3 + 2];

                geometry.indexArray[i * 3 + 0] = tempPos.x;
                geometry.indexArray[i * 3 + 1] = tempPos.z;
                geometry.indexArray[i * 3 + 2] = tempPos.y;
            }

            for (i = 0; i < this.subGeometrys.length ; ++i) {
                var subGeometry: SubGeometry = new SubGeometry();
                subGeometry.matID = i;
                subGeometry.geometry = geometry;
                //subGeometry.start = source.material[i].start * 3 * Uint16Array.BYTES_PER_ELEMENT;
                subGeometry.start = this.subGeometrys[i].start * 3;
                subGeometry.count = this.subGeometrys[i].count * 3;
                subGeometry.textureDiffuse = this.subGeometrys[i].textureDiffuse;
                subGeometry.textureNormal = this.subGeometrys[i].textureNormal;
                subGeometry.textureSpecular = this.subGeometrys[i].textureSpecular;
                geometry.subGeometrys.push(subGeometry);
            }
            
            return geometry;
        }

        /**
        * @language zh_CN
        * 释放接口
        * @version Egret 3.0
        * @platform Web,Native
        */
        public dispose(): void {
            this.decRef();
            if (this.isDispose) {
                if (this.sharedIndexBuffer) {
                    this.sharedIndexBuffer.dispose();
                    this.sharedIndexBuffer = null;
                }

                if (this.sharedVertexBuffer) {
                    this.sharedVertexBuffer.dispose();
                    this.sharedVertexBuffer = null;
                }
                this.vertexArray = null;
                this.indexArray = null;
                this.skeletonGPUData = null;
                this.skeleton = null;
                this.subGeometrys = [];
            }
        }
    }
} 