module egret3d {
   /**
    * @private
    * @class egret3d.OctahedronSphereGeometry
    * @classdesc
    * 六面体球形Geometry
    * @version Egret 3.0
    * @platform Web,Native
    * @includeExample geometry/CubeGeometry.ts
    */
    export class OctahedronSphereGeometry extends Geometry {

        private _subdivisions: number;
        private _radius: number;
        private vector3_Down: Vector3D = new Vector3D(0, -1, 0);
        private vector3_Forward: Vector3D = new Vector3D(0, 0, 1);
        private vector3_Up: Vector3D = new Vector3D(0, 1, 0);
        private directions: Vector3D[] = [
            //Vector3.left,
            new Vector3D(-1, 0, 0),
            //Vector3.back,
            new Vector3D(0, 0, -1),
            //Vector3.right
            new Vector3D(1, 0, 0),
            //Vector3.forward
            new Vector3D(0, 0, 1)
        ];

        /**
        * @language zh_CN
        * 构造函数
        * @returns {number} 宽度  
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(subdivisions: number, radius: number, isHemisphere: boolean = false ) {
            super();
            if (subdivisions < 0) {
                subdivisions = 0;
                console.error("Sky Sphere subdivisions increased to minimum, which is 0.");
            }
            else if (subdivisions > 6) {
                subdivisions = 6;
                console.error("Sky Sphere subdivisions decreased to maximum, which is 6.");
            }
            this._subdivisions = subdivisions;
            this._radius = radius;
            this.buildGeomtry(false, isHemisphere);
        }

        public buildGeomtry(front: boolean, isHemisphere: boolean) {

            var vertexBuffer: number[] = [];
            var indexBuffer: number[] = [];

            var resolution = 1 << this._subdivisions;
            var vertices: Vector3D[] = [];
            var triangles: number[] = [];
            this.CreateOctahedron(vertices, triangles, resolution, isHemisphere);

            for (var i = 0; i < vertices.length; i++) {
                console.log(vertices[i]);
            }

            var normals: Vector3D[] = [];
            this.Normalize(vertices, normals, front);

            var uv: UV[] = [];
            this.CreateUV(vertices, uv);

            //var tangents: Quaternion[] = [];
            //this.CreateTangents(vertices, tangents);

            if (this._radius != 1) {
                for (var i = 0; i < vertices.length; i++) {
                    vertices[i].x *= this._radius;
                    vertices[i].y *= this._radius;
                    vertices[i].z *= this._radius;
                    console.log(vertices[i].x + " " + vertices[i].y + " " + vertices[i].z);
                }
            }


            this.vertexFormat = VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_COLOR | VertexFormat.VF_UV0;


            for (var i = 0; i < vertices.length; i++) {
                var pos = vertices[i];
                vertexBuffer.push(pos.x);
                vertexBuffer.push(pos.y);
                vertexBuffer.push(pos.z);
                var normal = normals[i];
                vertexBuffer.push(normal.x);
                vertexBuffer.push(normal.y);
                vertexBuffer.push(normal.z);
                ///color
                vertexBuffer.push(1, 1, 1, 1);

                var uv_0 = uv[i];
                vertexBuffer.push(uv_0.u);
                vertexBuffer.push(1 - uv_0.v);
            }


            indexBuffer = triangles;

            this.setVerticesForIndex(0, this.vertexFormat, vertexBuffer, vertexBuffer.length / this.vertexAttLength);
            this.setVertexIndices(0, indexBuffer);
            this.buildDefaultSubGeometry();
        }

        private CreateOctahedron(vertices: Vector3D[], triangles: number[], resolution: number, isHemisphere: boolean) {

            var v = 0, vBottom = 0, t = 0;
            if (isHemisphere == false) {
                for (var i = 0; i < 4; i++) {
                    vertices[v++] = this.vector3_Down.clone();
                }
                for (var i = 1; i <= resolution; i++) {

                    var progress = i / resolution;
                    var _from: Vector3D = new Vector3D();
                    var _to: Vector3D = new Vector3D();
                    _to.lerp(this.vector3_Down, this.vector3_Forward, progress);
                    vertices[v++] = _to;



                    for (var d = 0; d < 4; d++) {
                        _from = _to.clone();
                        _to.lerp(this.vector3_Down, this.directions[d], progress);
                        t = this.CreateLowerStrip(i, v, vBottom, t, triangles);
                        v = this.CreateVertexLine(_from, _to, i, v, vertices);
                        vBottom += i > 1 ? (i - 1) : 1;
                    }
                    vBottom = v - 1 - i * 4;
                }
            }


            for (var i = resolution - 1; i >= 1; i--) {

                var progress = i / resolution;
                var _from: Vector3D;
                var _to: Vector3D = new Vector3D();
                _to.lerp(this.vector3_Up, this.vector3_Forward, progress);
                vertices[v++] = _to;
                for (var d = 0; d < 4; d++) {
                    _from = _to.clone();
                    _to.lerp(this.vector3_Up, this.directions[d], progress);
                    t = this.CreateUpperStrip(i, v, vBottom, t, triangles);
                    v = this.CreateVertexLine(_from, _to, i, v, vertices);
                    vBottom += i + 1;
                }
                vBottom = v - 1 - i * 4;
            }
            for (var i = 0; i < 4; i++) {
                triangles[t++] = vBottom;
                triangles[t++] = v;
                triangles[t++] = ++vBottom;
                vertices[v++] = this.vector3_Up.clone();
            }
            //triangles = triangles.reverse();
        }

        private CreateLowerStrip(steps: number, vTop: number, vBottom: number, t: number, triangles: number[]): number {
            for (var i = 1; i < steps; i++) {
                triangles[t++] = vBottom;
                triangles[t++] = vTop - 1;
                triangles[t++] = vTop;

                triangles[t++] = vBottom++;
                triangles[t++] = vTop++;
                triangles[t++] = vBottom;
            }
            triangles[t++] = vBottom;
            triangles[t++] = vTop - 1;
            triangles[t++] = vTop;
            return t;
        }

        private CreateVertexLine(_from: Vector3D, _to: Vector3D, steps: number, v: number, vertices: Vector3D[]): number {
            for (var i = 1; i <= steps; i++) {

                var vec = new Vector3D();
                vec.lerp(_from, _to, i / steps);
                vertices[v++] = vec;
            }
            return v;
        }

        private CreateUpperStrip(steps: number, vTop: number, vBottom: number, t: number, triangles: number[]): number {
            triangles[t++] = vBottom;
            triangles[t++] = vTop - 1;
            triangles[t++] = ++vBottom;
            for (var i = 1; i <= steps; i++) {
                triangles[t++] = vTop - 1;
                triangles[t++] = vTop;
                triangles[t++] = vBottom;

                triangles[t++] = vBottom;
                triangles[t++] = vTop++;
                triangles[t++] = ++vBottom;
            }
            return t;
        }

        private Normalize(vertices: Vector3D[], normals: Vector3D[], front: boolean) {
            for (var i = 0; i < vertices.length; i++) {
                var vec = vertices[i];
                vec.normalize();
                normals[i] = vec;
                vertices[i] = vec;
            }
        }

        private CreateUV(vertices: Vector3D[], uv: UV[]) {
            var previousX = 1.0;
            for (var i = 0; i < vertices.length; i++) {
                var v = vertices[i];
                if (v.x == previousX) {
                    uv[i - 1].u = 1.0;
                }
                previousX = v.x;
                var textureCoordinates: UV = new UV();
                textureCoordinates.u = Math.atan2(v.x, v.z) / (-2.0 * Math.PI);
                if (textureCoordinates.u < 0) {
                    textureCoordinates.u += 1.0;
                }
                textureCoordinates.v = Math.asin(v.y) / Math.PI + 0.5;
                uv[i] = textureCoordinates;
            }
            uv[vertices.length - 4].u = uv[0].u = 0.125;
            uv[vertices.length - 3].u = uv[1].u = 0.375;
            uv[vertices.length - 2].u = uv[2].u = 0.625;
            uv[vertices.length - 1].u = uv[3].u = 0.875;
        }

        private CreateTangents(vertices: Vector3D[], tangents: Quaternion[]) {
            for (var i = 0; i < vertices.length; i++) {
                var v = vertices[i];
                v.y = 0;
                v.normalize();
                var tangent = new Quaternion();
                tangent.x = -v.z;
                tangent.y = 0.0;
                tangent.z = v.x;
                tangent.w = -1.0;
                tangents[i] = tangent;
            }
            tangents[0] = new Quaternion(-1, 0, -1);
            tangents[1] = new Quaternion(1, 0, -1);
            tangents[2] = new Quaternion(1, 0, 1);
            tangents[3] = new Quaternion(-1, 0, 1);
            tangents[0].normalize();
            tangents[1].normalize();
            tangents[2].normalize();
            tangents[3].normalize();
            tangents[vertices.length - 4] = tangents[0];
            tangents[vertices.length - 3] = tangents[1];
            tangents[vertices.length - 2] = tangents[2];
            tangents[vertices.length - 1] = tangents[3];
            for (var i = 0; i < 4; i++) {
                tangents[vertices.length - 1 - i].w = tangents[i].w = -1;
            }
        }
    }
} 