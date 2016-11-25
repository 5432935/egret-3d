module egret3d {

    class Face {
        public v_0: Vector3D; 
        public v_1: Vector3D; 
        public v_2: Vector3D; 

        public min: Vector3D;
        public max: Vector3D;

        public centre: Vector3D;

        constructor() {
        }
    }


    export class TerrainCollision{

        private ray: Ray;
        private _geometry: Geometry;
        private _faceList:number[][];

        //private _kdTree: KDTree;
        constructor(geometry: Geometry) {
            this.ray = new Ray();
            this._geometry = geometry; 
            this._faceList = []; 
            //this._kdTree = new KDTree(3);

            this.buildFace();
            this.buildTree();
        }

        private buildFace() {
           var index1:number = 0;
           var index2:number = 0;
           var index3: number = 0;

           //var nodes: KDNode[] = [];
           for (var i: number = 0; i < this._geometry.indexCount / 3; i++) {
               var face: Face = new Face();
               face.v_0 = new Vector3D();
               face.v_1 = new Vector3D();
               face.v_2 = new Vector3D();
               face.min = new Vector3D();
               face.max = new Vector3D();
               face.centre = new Vector3D();

               index1 = this._geometry.indexArray[i * 3 + 0];
               index2 = this._geometry.indexArray[i * 3 + 1];
               index3 = this._geometry.indexArray[i * 3 + 2];

               face.v_0.x = this._geometry.vertexArray[index1 * this._geometry.vertexAttLength + 0];
               face.v_0.y = this._geometry.vertexArray[index1 * this._geometry.vertexAttLength + 1];
               face.v_0.z = this._geometry.vertexArray[index1 * this._geometry.vertexAttLength + 2];

               face.v_1.x = this._geometry.vertexArray[index2 * this._geometry.vertexAttLength + 0];
               face.v_1.y = this._geometry.vertexArray[index2 * this._geometry.vertexAttLength + 1];
               face.v_1.z = this._geometry.vertexArray[index2 * this._geometry.vertexAttLength + 2];

               face.v_2.x = this._geometry.vertexArray[index3 * this._geometry.vertexAttLength + 0];
               face.v_2.y = this._geometry.vertexArray[index3 * this._geometry.vertexAttLength + 1];
               face.v_2.z = this._geometry.vertexArray[index3 * this._geometry.vertexAttLength + 2];

               face.min.x = Math.min(face.v_0.x, face.v_1.x, face.v_2.x);
               face.min.y = Math.min(face.v_0.y, face.v_1.y, face.v_2.y);
               face.min.z = Math.min(face.v_0.z, face.v_1.z, face.v_2.z);

               face.max.x = Math.max(face.v_0.x, face.v_1.x, face.v_2.x);
               face.max.y = Math.max(face.v_0.y, face.v_1.y, face.v_2.y);
               face.max.z = Math.max(face.v_0.z, face.v_1.z, face.v_2.z);

               face.centre.x = face.min.x + (face.max.x - face.min.x) * 0.5;
               face.centre.y = face.min.z + (face.max.z - face.min.z) * 0.5;
               face.centre.z = 0;
               //face.centre.z = face.min.z +(face.max.z - face.min.z) * 0.5;
               //var temp:{ point?: Vector3D, data?: any } = {};
               //temp.point = face.centre;
               //temp.data = face;

               //this._faceList.push([face.v_0.x, face.v_0.y, face.v_0.z]);
               //this._faceList.push([face.v_1.x, face.v_1.y, face.v_1.z]);
               //this._faceList.push([face.v_2.x, face.v_2.y, face.v_2.z]);
               //var kdNode_0: KDNode = new KDNode(face.v_0, face);
               //var kdNode_1: KDNode = new KDNode(face.v_1, face);
               //var kdNode_2: KDNode = new KDNode(face.v_2, face);

               //nodes.push(kdNode_0);
               //nodes.push(kdNode_1);
               //nodes.push(kdNode_2);
           }



           //this._kdTree = new KDTree(2);
           //this._kdTree.build(nodes);
           //this._kdTree.printTree();
        }

        private buildTree() {
           // this._kdTree.build(this._faceList);
        }

        private _reslut: number[] = [];
        public getTerrainCollisionHeight(sceneX: number, sceneZ: number): number[] {
            this._reslut.length = 0;

            Vector3D.HELP_0.x = sceneX;
            Vector3D.HELP_0.y = sceneZ;
            //var nodes = this._kdTree.nearest([sceneX, 0, sceneZ], 3);

            //this.ray.dir.x = 0;
            //this.ray.dir.y = 1;
            //this.ray.dir.z = 0;

            //var face: Face;
            //for (const node of nodes) {
            //    face = node["node"].data;
            //    if (face&&this.ray.IntersectTriangle(face.v_0, face.v_1, face.v_2, this._reslut)) {
            //        return this._reslut;
            //    }
            //}
            return [0];
        }
    }
}