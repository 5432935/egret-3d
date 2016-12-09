module egret3d {

    export class Face {
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

        public mesh: Mesh;
        private _geometry: Geometry;
        private _kdTree: KDTree;

        private _offsetPos: Vector3D;
        constructor(mesh:Mesh) {
            this.mesh = mesh; 
            this._offsetPos = new Vector3D();
            this._offsetPos.copyFrom(mesh.globalPosition);
            this._geometry = mesh.geometry;
            this.buildFace();
        }

        private buildFace() {
           var index1:number = 0;
           var index2:number = 0;
           var index3: number = 0;

           var nodes: KDData[] = [];
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

               face.v_0.x = this._offsetPos.x + this._geometry.vertexArray[index1 * this._geometry.vertexAttLength + 0];
               face.v_0.y = this._offsetPos.y + this._geometry.vertexArray[index1 * this._geometry.vertexAttLength + 1];
               face.v_0.z = this._offsetPos.z + this._geometry.vertexArray[index1 * this._geometry.vertexAttLength + 2];

               face.v_1.x = this._offsetPos.x + this._geometry.vertexArray[index2 * this._geometry.vertexAttLength + 0];
               face.v_1.y = this._offsetPos.y + this._geometry.vertexArray[index2 * this._geometry.vertexAttLength + 1];
               face.v_1.z = this._offsetPos.z + this._geometry.vertexArray[index2 * this._geometry.vertexAttLength + 2];

               face.v_2.x = this._offsetPos.x + this._geometry.vertexArray[index3 * this._geometry.vertexAttLength + 0];
               face.v_2.y = this._offsetPos.y + this._geometry.vertexArray[index3 * this._geometry.vertexAttLength + 1];
               face.v_2.z = this._offsetPos.z + this._geometry.vertexArray[index3 * this._geometry.vertexAttLength + 2];

               face.min.x = Math.min(face.v_0.x, face.v_1.x, face.v_2.x);
               face.min.y = Math.min(face.v_0.y, face.v_1.y, face.v_2.y);
               face.min.z = Math.min(face.v_0.z, face.v_1.z, face.v_2.z);

               face.max.x = Math.max(face.v_0.x, face.v_1.x, face.v_2.x);
               face.max.y = Math.max(face.v_0.y, face.v_1.y, face.v_2.y);
               face.max.z = Math.max(face.v_0.z, face.v_1.z, face.v_2.z);

               face.centre.x = face.min.x + (face.max.x - face.min.x) * 0.5;
               face.centre.y = face.min.y + (face.max.y - face.min.y) * 0.5;
               face.centre.z = face.min.z + (face.max.z - face.min.z) * 0.5;

               nodes.push(new KDData([face.centre.x, face.centre.z, face.centre.y], face));
           }

           this._kdTree = new KDTree();
           this._kdTree.buildTree(nodes);
        }

        private height: number = 0;
        public selectFaces: Face[] = [];
        public getTerrainCollisionHeight(sceneX: number, sceneZ: number): number {
            var list: KDData[] = this._kdTree.root.find([sceneX, sceneZ], 3);
            var face: Face;
            this.selectFaces.length = 0;
            for (var i: number = 0; i < list.length; i++) {
                face = (<Face>list[i]["datum"].data);
                this.selectFaces.push(face);
                if (this.checkPointInTriangle(sceneX, sceneZ, face)) {
                    return this.height = this.getHeightInTriangle(sceneX, sceneZ, face);
                }
            }
            return this.height;
        }

        public checkPointInTriangle(x: number, y: number, face :Face): boolean {
            var p1: Vector3D = face.v_0;
            var p2: Vector3D = face.v_1;
            var p3: Vector3D = face.v_2;

            // p1-p2
            var A1: number = p1.z - p2.z;
            var B1: number = p2.x - p1.x;
            var C1: number = p1.x * p2.z - p2.x * p1.z;
            // p2-p3
            var A2: number = p2.z - p3.z;
            var B2: number = p3.x - p2.x;
            var C2: number = p2.x * p3.z - p3.x * p2.z;
            // p3-p1
            var A3: number = p3.z - p1.z;
            var B3: number = p1.x - p3.x;
            var C3: number = p3.x * p1.z - p1.x * p3.z;

            var isInTri: boolean = false;
            var D1: number = A1 * x + B1 * y + C1;
            var D2: number = A2 * x + B2 * y + C2;
            var D3: number = A3 * x + B3 * y + C3;

            const Tiny: number = 0.01;
            if ((D1 >= -Tiny && D2 >= -Tiny && D3 >= -Tiny) || (D1 <= Tiny && D2 <= Tiny && D3 <= Tiny))
                isInTri = true;

            return isInTri;
        }

        private getHeightInTriangle(x: number, y: number, face: Face): number {

            var p1: Vector3D = face.v_0;
            var p2: Vector3D = face.v_1;
            var p3: Vector3D = face.v_2;

            // 计算(x,y)在三角面(p1,p2,p3)上的位置
            var tmp: Vector3D = Vector3D.HELP_2 ;
            // p1.x >= p2.x >= x >= p3.x || p1.x <= p2.x <= x <= p3.x
            if (p1.x >= x) {
                if (p3.x >= x) {
                    tmp = p3; p3 = p2; p2 = tmp;
                }
                else {
                    if (p2.x >= x) {

                    }
                    else {
                        tmp = p3; p3 = p1; p1 = tmp;
                    }
                }
            }
            else if (p1.x < x) {
                if (p3.x < x) {
                    tmp = p3; p3 = p2; p2 = tmp;
                }
                else {
                    if (p2.x < x) {

                    }
                    else {
                        tmp = p3; p3 = p1; p1 = tmp;
                    }
                }
            }
            else
                return p1.y;

            var p4: Vector3D = Vector3D.HELP_0;		// p4 in p1 p3
            var p5: Vector3D = Vector3D.HELP_1;		// p4 in p2 p3

            p4.x = x;
            if ((p1.x - p3.x) == 0) {
                p4.y = p3.y;
                p4.z = p3.z;
            }
            else {
                p4.y = (p1.y - p3.y) * (x - p3.x) / (p1.x - p3.x) + p3.y;
                p4.z = (p1.z - p3.z) * (x - p3.x) / (p1.x - p3.x) + p3.z;
            }

            p5.x = x;
            if ((p2.x - p3.x) == 0) {
                p5.y = p3.y;
                p5.z = p3.z;
            }
            else {
                p5.y = (p2.y - p3.y) * (x - p3.x) / (p2.x - p3.x) + p3.y;
                p5.z = (p2.z - p3.z) * (x - p3.x) / (p2.x - p3.x) + p3.z;
            }

            var result: number;
            if (p4.z == p5.z)
                result = p5.y;
            else
                result = (p4.y - p5.y) * (y - p5.z) / (p4.z - p5.z) + p5.y;

            return result;
        }
    }
}