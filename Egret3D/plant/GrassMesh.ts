module egret3d {

    /**
   * @class egret3d.GrassMesh
   * @classdesc
   * 草
   * @see egret3d.Mesh
   * @version Egret 3.0
   * @platform Web,Native 
   */
    export class GrassMesh extends Mesh {

        private _node: ParticleDataShape;
        private _attrPosition: GLSL.VarRegister;
        private _attrAngleY: GLSL.VarRegister;

        private _plantShape: Geometry;
        private _count: number;
        private _method: GrassMethod;
        private _data: GrassData;

        private _birthPoints: Vector3D[];
        /**
        * @language zh_CN
        * 构造函数
        * @param birthPoints 草的出生位置列表
        * @param material 材质
        * @param data 草的属性
        * @version Egret 3.0
        * @platform Web,Native 
        */
        constructor(birthPoints:Vector3D[], material: MaterialBase, data:GrassData) {
            super(null, material);
            material.bothside = true;
            this._method = new GrassMethod(data);
            material.diffusePass.addMethod(this._method);
            this._data = data;
            this._birthPoints = birthPoints;
            this._count = birthPoints.length;
            this._plantShape = new PlaneGeometry(1, 1, 1, 1, 1, 1, Vector3D.Z_AXIS, true, false);
            this.initialize();
            this.initBoudBox(new Vector3D(MathUtil.MAX_VALUE, MathUtil.MAX_VALUE, MathUtil.MAX_VALUE));
        }

        /**
        * @language zh_CN
        * 获取GrassMethod
        * @return 草的Method，用于外部控制
        */
        public get method(): GrassMethod {
            return this._method;
        }
        
        /**
        * @private
        */
        protected initialize() {
            this.geometry = new Geometry();
            this.geometry.buildDefaultSubGeometry();
            this.geometry.subGeometrys[0].count = this._count * this._plantShape.indexCount;

            //
            var vertexIndex: number = 0;
            var vertexArray: Array<number> = [];

            //
            var vf: number = VertexFormat.VF_POSITION | VertexFormat.VF_UV0 | VertexFormat.VF_COLOR | VertexFormat.VF_NORMAL;
            this.geometry.vertexFormat = vf;

            //
            this.initGeometryAttr(this.geometry);

            this.geometry.vertexCount = this._count * this._plantShape.vertexCount;
            this.geometry.indexCount = this._count * this._plantShape.indexCount;

            this._plantShape.getVertexForIndex(0, vf, vertexArray, this._plantShape.vertexCount);
            for (var i: number = 0; i < this._count; ++i) {
                vertexIndex = i * this._plantShape.vertexCount;
                this.geometry.setVerticesForIndex(vertexIndex, vf, vertexArray, this._plantShape.vertexCount);
            }

            for (var i: number = 0; i < this._count; ++i) {
                for (var j: number = 0; j < this._plantShape.indexArray.length; ++j) {
                    this.geometry.indexArray[i * this._plantShape.indexArray.length + j] = this._plantShape.indexArray[j] + i * this._plantShape.vertexCount;
                }
            }
            //最后根据节点功能，填充模型
            this.initPostionData(this.geometry, this._count);
        }


        /**
        * @language zh_CN
        * 计算节点
        * @private 
        */
        private initGeometryAttr(geometry: Geometry) {

            //position
            this._attrPosition = new GLSL.VarRegister();
            this._attrPosition.name = "attribute_grassOffset";
            this._attrPosition.size = 3;

            var offsetIndex: number = geometry.vertexAttLength;
            this._attrPosition.offsetIndex = offsetIndex;
            geometry.vertexAttLength += this._attrPosition.size;
            geometry.vertexSizeInBytes += this._attrPosition.size * 4;
            geometry.subGeometrys[0].preAttList.push(this._attrPosition);

            //angleY
            this._attrAngleY = new GLSL.VarRegister();
            this._attrAngleY.name = "attribute_grassAngleY";
            this._attrAngleY.size = 1;

            var offsetIndex: number = geometry.vertexAttLength;
            this._attrAngleY.offsetIndex = offsetIndex;
            geometry.vertexAttLength += this._attrAngleY.size;
            geometry.vertexSizeInBytes += this._attrAngleY.size * 4;
            geometry.subGeometrys[0].preAttList.push(this._attrAngleY);


        }
      
        /**
        * @language zh_CN
        * @private
        * 构建包围盒
        * @version Egret 3.0
        * @platform Web,Native
        */
        private initBoudBox(vector: Vector3D) {
            //##FilterBegin## ##Particle##
            var b: BoundBox = new BoundBox(this);
            b.fillBox(new Vector3D(-vector.x / 2, -vector.y / 2, -vector.z / 2), new Vector3D(vector.x / 2, vector.y / 2, vector.z / 2));
            this.bound = b;
            this.initAABB();
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number, camera: Camera3D) {
            super.update(time, delay, camera);
        }



        /**
        * @language zh_CN
        * 填充顶点数据
        * @param geometry 网格数据
        * @param count 数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        private initPostionData(geometry: Geometry, count: number) {
            var positionArray: Vector3D[] = this._birthPoints;
            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;

           

            //创建位置
            var birthPosIndex: number = this._attrPosition.offsetIndex;
            for (var i: number = 0; i < count; ++i) {
                var pos: Vector3D = positionArray[i];
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + birthPosIndex ;

                    geometry.vertexArray[index + 0] = pos.x;
                    geometry.vertexArray[index + 1] = pos.y;
                    geometry.vertexArray[index + 2] = pos.z;
                }
               
            }

            //修改width height
            var width: number;
            var height: number;
            var vertexPosIndex: number = 0;
            if (this._data.maxWidth != 1 || this._data.minWidth != 1 || this._data.maxHeight != 1 || this._data.minHeight != 1) {
                for (var i: number = 0; i < count; ++i) {
                    //创建位置
                    width = MathUtil.mix(this._data.minWidth, this._data.maxWidth, Math.random());
                    height = MathUtil.mix(this._data.minHeight, this._data.maxHeight, Math.random());

                    for (var j: number = 0; j < vertices; ++j) {
                        index = i * vertices + j;
                        index = index * geometry.vertexAttLength + 0;
                        geometry.vertexArray[index + 0] *= width;
                        geometry.vertexArray[index + 1] *= height;
                    }

                }
            }

            //修改颜色
            var colorPosIndex: number = 6;//position + normal
            var tempColor: Color = new Color();
            var random: number;
            var r: number;
            var g: number;
            var b: number;

            var noiseSpread: number = Math.abs(this._data.noiseSpread);
            noiseSpread = Math.min(noiseSpread, 1);
            var scaleValue: number = 1 / 0xff;

            var healthyColor: Color = new Color();
            var dryColor: Color = new Color();

            healthyColor.setColorRGB(Number(this._data.healthyColor));
            dryColor.setColorRGB(Number(this._data.dryColor));

            for (var i: number = 0; i < count; ++i) {
                if (Math.random() > noiseSpread) {
                    continue;
                }

                random = Math.random() * noiseSpread * 0.5;
                random = MathUtil.mix(0.5 - random, 0.5 + random, Math.random());
                tempColor.lerp(healthyColor, dryColor, random);
                tempColor.scaleBy(scaleValue);
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + colorPosIndex;
                    geometry.vertexArray[index + 0] *= tempColor.r;
                    geometry.vertexArray[index + 1] *= tempColor.g;
                    geometry.vertexArray[index + 2] *= tempColor.b;
                    geometry.vertexArray[index + 3] = 1.0;

                }

            }

            //修改旋转
            if (!this._data.billboard) {
                var rotationYIndex: number = this._attrAngleY.offsetIndex;
                var angleY: number;
                for (var i: number = 0; i < count; ++i) {
                    angleY = Math.random() * 2 * Math.PI;
                    for (var j: number = 0; j < vertices; ++j) {
                        index = i * vertices + j;
                        index = index * geometry.vertexAttLength + rotationYIndex;
                        geometry.vertexArray[index + 0] = angleY;
                    }

                }
            }

            this.billboard = this._data.billboard ? BillboardType.Y_AXIS : BillboardType.DISABLE;

        }


        /**
        * @language zh_CN
        * 克隆一个模型
        * @returns 克隆后的草
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): GrassMesh {
            var newPlantGroup: GrassMesh;
            newPlantGroup = new GrassMesh(this._birthPoints.slice(), this.material, this._data);
            newPlantGroup.position = this.position;
            newPlantGroup.orientation = this.orientation;
            newPlantGroup.scale = this.scale;
            return newPlantGroup;
        }


        /**
        * @language zh_CN
        * 释放所有数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public dispose(): void {
            super.dispose();
            if (this._plantShape) {
                this._plantShape.dispose();
                this._plantShape = null;
            }
            this._birthPoints = null;

        }




    }

    /**
    * @language zh_CN
    * 构造函数，用于设置草的属性
    * @version Egret 3.0
    * @platform Web,Native 
    */
    export class GrassData{
        public minWidth: number = 100;
        public maxWidth: number = 100;
        public minHeight: number = 100;
        public maxHeight: number = 100;

        public noiseSpread: number = 0;
        public healthyColor: string;
        public dryColor: string;

        public billboard: boolean = true;
        public detailTexture: string;
        public grassTexture: string;


    }

}




    
