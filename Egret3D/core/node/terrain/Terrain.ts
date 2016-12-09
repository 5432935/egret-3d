module egret3d {

    /**
    * @class egret3d.Terrain
    * @classdesc
    * 地形网格创建
    * 使用地形高度图,生成地形。
    * 通过读取草数据，主要有草密度/宽度/高度/颜色/使用贴图等属性，结合高度图组装成一片草。
    * @see egret3d.ElevationGeometry
    * @see egret3d.ImageTexture
    * @see egret3d.Mesh
    * @includeExample core/node/terrain/Terrain.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Terrain extends Mesh {

        /**
        * @language zh_CN
        * @private
        * lod处理对象
        * @see egret3d.LODQuadTree
        * @version Egret 3.0
        * @platform Web,Native
        */
        public lodQuadTree: LODQuadTree;

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public cullCamrea: Camera3D;

        private vertex: any;
        private useLod: boolean;


        /**
        * @language zh_CN
        * @private
        * @param other copy对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public copy(other: Terrain) {
            super.copy(other);
        }

        /**
        * @private
        * @language zh_CN
        * 克隆当前地形
        * @returns Terrain 克隆后的对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): Terrain {
            var cloneMesh: Terrain = new Terrain(
                this.terrainGeometry.heightmap,
                this.terrainGeometry.width,
                this.terrainGeometry.height,
                this.terrainGeometry.depth,
                this.terrainGeometry.segmentsW,
                this.terrainGeometry.segmentsH,
                this.useLod,
                this.material);

            cloneMesh.copy(this);
            return cloneMesh;
        }


        /**
        * @language zh_CN
        * 构造函数
        * @param heightmap 高度图
        * @param width 地形宽度 默认1000
        * @param height 地形主度 默认100
        * @param depth 地形长度 默认1000
        * @param segmentsW 格子列 默认128
        * @param segmentsH 格子行 默认128
        * @param useLod 是否使用lod  如果使用lod segmentsW和segmentsH必须相等并且是2的n次方
        * @param mat 材质 默认为null
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(heightmap: ImageTexture, width: number = 1000, height: number = 100, depth: number = 1000, segmentsW: number = 128, segmentsH: number = 128, useLod: boolean = false, mat: MaterialBase = null) {
            super(new ElevationGeometry(heightmap, width, height, depth, segmentsW, segmentsH), mat);
            this.useLod = useLod;
            if (useLod) {
                if (segmentsW == segmentsH && (segmentsW & (segmentsW - 1)) == 0) {
                    this.vertex = this.geometry.getVertexForIndex(0, VertexFormat.VF_POSITION, null, this.geometry.vertexCount);
                    this.lodQuadTree = new LODQuadTree(this.vertex, segmentsW);
                    this.lodQuadTree.onUpdate(this.modelMatrix);
                    //this.wireframe.geometry.setVerticesForIndex(0, VertexFormat.VF_POSITION, this.vertex, this.geometry.vertexCount);
                    //this.wireframe.geometry.indexCount = this.geometry.faceCount * 6;
                    //this.addChild(this.wireframe);
                }
                else {
                    Egret3DLog.outError("地形宽高不相等或者不是2的N次方!");
                }
            }
        }

        /**
        * @language zh_CN
        * 返回地形的ElevationGeometry
        * @see egret3d.ElevationGeometry
        * @returns ElevationGeometry 地形网格
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get terrainGeometry(): ElevationGeometry {
            return <ElevationGeometry>this.geometry;
        }

        protected onUpdateTransform() {
            super.onUpdateTransform();
            if (this.lodQuadTree) {
                this.lodQuadTree.onUpdate(this.modelMatrix);
            }
        }

        /**
        * @language zh_CN
        * 开启或关闭LOD
        * @param useLod 开启或关闭
        * @version Egret 3.0
        * @platform Web,Native
        */
        public startLOD(useLod: boolean) {
            if (useLod && !this.lodQuadTree) {
                var eleGeo: ElevationGeometry = <ElevationGeometry>this.geometry;

                if (eleGeo.segmentsW == eleGeo.segmentsH && (eleGeo.segmentsW & (eleGeo.segmentsW - 1)) == 0) {
                    this.vertex = this.geometry.getVertexForIndex(0, VertexFormat.VF_POSITION, null, this.geometry.vertexCount);
                    this.lodQuadTree = new LODQuadTree(this.vertex, eleGeo.segmentsW);
                    this.lodQuadTree.onUpdate(this.modelMatrix);
                }
                else {
                    Egret3DLog.outError("地形宽高不相等或者不是2的N次方!");
                }
            }
            else {
                if (this.lodQuadTree) {
                    this.lodQuadTree.enable = false;
                }
            }
        }

        /**
        * @language zh_CN
        * @private
        */
        public update(time: number, delay: number, camera: Camera3D) {
            super.update(time, delay, camera);

            if (this.lodQuadTree) {

                var index: number = 0;

                index = this.lodQuadTree.build(index, this.geometry.indexArray, this.cullCamrea ? this.cullCamrea : camera);
                this.geometry.indexCount = index;
                this.geometry.bufferDiry = true;
                this.geometry.subGeometrys[0].count = this.geometry.indexCount;
                if (!this.lodQuadTree.enable) {
                    this.lodQuadTree = null;
                }

                //for (var i: number = 0; i < this.geometry.faceCount; ++i) {
                //    this.wireframe.geometry.indexArray[i * 6 + 0] = this.geometry.indexArray[i * 3 + 0];
                //    this.wireframe.geometry.indexArray[i * 6 + 1] = this.geometry.indexArray[i * 3 + 1];
                //    this.wireframe.geometry.indexArray[i * 6 + 2] = this.geometry.indexArray[i * 3 + 1];
                //    this.wireframe.geometry.indexArray[i * 6 + 3] = this.geometry.indexArray[i * 3 + 2];
                //    this.wireframe.geometry.indexArray[i * 6 + 4] = this.geometry.indexArray[i * 3 + 2];
                //    this.wireframe.geometry.indexArray[i * 6 + 5] = this.geometry.indexArray[i * 3 + 0];
                //}

                //this.wireframe.geometry.indexCount = this.geometry.faceCount * 6;

                //this.wireframe.geometry.bufferDiry = true;
                //if (this.wireframe.geometry.subGeometrys[0]) {
                //    this.wireframe.geometry.subGeometrys[0].count = this.wireframe.geometry.indexCount;
                //}
            }
        }
    }
}