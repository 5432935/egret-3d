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
     * @private
     * @class egret3d.OctahedronSphereGeometry
     * @classdesc
     * 六面体球形Geometry
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample geometry/CubeGeometry.ts
     */
    var OctahedronSphereGeometry = (function (_super) {
        __extends(OctahedronSphereGeometry, _super);
        /**
        * @language zh_CN
        * 构造函数
        * @returns {number} 宽度
        * @version Egret 3.0
        * @platform Web,Native
        */
        function OctahedronSphereGeometry(subdivisions, radius, isHemisphere) {
            if (isHemisphere === void 0) { isHemisphere = false; }
            var _this = _super.call(this) || this;
            _this.vector3_Down = new egret3d.Vector3(0, -1, 0);
            _this.vector3_Forward = new egret3d.Vector3(0, 0, 1);
            _this.vector3_Up = new egret3d.Vector3(0, 1, 0);
            _this.directions = [
                //Vector3.left,
                new egret3d.Vector3(-1, 0, 0),
                //Vector3.back,
                new egret3d.Vector3(0, 0, -1),
                //Vector3.right
                new egret3d.Vector3(1, 0, 0),
                //Vector3.forward
                new egret3d.Vector3(0, 0, 1)
            ];
            if (subdivisions < 0) {
                subdivisions = 0;
                console.error("Sky Sphere subdivisions increased to minimum, which is 0.");
            }
            else if (subdivisions > 6) {
                subdivisions = 6;
                console.error("Sky Sphere subdivisions decreased to maximum, which is 6.");
            }
            _this._subdivisions = subdivisions;
            _this._radius = radius;
            _this.buildGeomtry(false, isHemisphere);
            return _this;
        }
        OctahedronSphereGeometry.prototype.buildGeomtry = function (front, isHemisphere) {
            var vertexBuffer = [];
            var indexBuffer = [];
            var resolution = 1 << this._subdivisions;
            var vertices = [];
            var triangles = [];
            this.CreateOctahedron(vertices, triangles, resolution, isHemisphere);
            for (var i = 0; i < vertices.length; i++) {
                console.log(vertices[i]);
            }
            var normals = [];
            this.Normalize(vertices, normals, front);
            var uv = [];
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
            this.vertexFormat = egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_NORMAL | egret3d.VertexFormat.VF_COLOR | egret3d.VertexFormat.VF_UV0;
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
        };
        OctahedronSphereGeometry.prototype.CreateOctahedron = function (vertices, triangles, resolution, isHemisphere) {
            var v = 0, vBottom = 0, t = 0;
            if (isHemisphere == false) {
                for (var i = 0; i < 4; i++) {
                    vertices[v++] = this.vector3_Down.clone();
                }
                for (var i = 1; i <= resolution; i++) {
                    var progress = i / resolution;
                    var _from = new egret3d.Vector3();
                    var _to = new egret3d.Vector3();
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
                var _from;
                var _to = new egret3d.Vector3();
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
        };
        OctahedronSphereGeometry.prototype.CreateLowerStrip = function (steps, vTop, vBottom, t, triangles) {
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
        };
        OctahedronSphereGeometry.prototype.CreateVertexLine = function (_from, _to, steps, v, vertices) {
            for (var i = 1; i <= steps; i++) {
                var vec = new egret3d.Vector3();
                vec.lerp(_from, _to, i / steps);
                vertices[v++] = vec;
            }
            return v;
        };
        OctahedronSphereGeometry.prototype.CreateUpperStrip = function (steps, vTop, vBottom, t, triangles) {
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
        };
        OctahedronSphereGeometry.prototype.Normalize = function (vertices, normals, front) {
            for (var i = 0; i < vertices.length; i++) {
                var vec = vertices[i];
                vec.normalize();
                normals[i] = vec;
                vertices[i] = vec;
            }
        };
        OctahedronSphereGeometry.prototype.CreateUV = function (vertices, uv) {
            var previousX = 1.0;
            for (var i = 0; i < vertices.length; i++) {
                var v = vertices[i];
                if (v.x == previousX) {
                    uv[i - 1].u = 1.0;
                }
                previousX = v.x;
                var textureCoordinates = {
                    u: Math.atan2(v.x, v.z) / (-2.0 * Math.PI),
                    v: Math.asin(v.y) / Math.PI + 0.5
                };
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
        };
        OctahedronSphereGeometry.prototype.CreateTangents = function (vertices, tangents) {
            for (var i = 0; i < vertices.length; i++) {
                var v = vertices[i];
                v.y = 0;
                v.normalize();
                var tangent = new egret3d.Quaternion();
                tangent.x = -v.z;
                tangent.y = 0.0;
                tangent.z = v.x;
                tangent.w = -1.0;
                tangents[i] = tangent;
            }
            tangents[0] = new egret3d.Quaternion(-1, 0, -1);
            tangents[1] = new egret3d.Quaternion(1, 0, -1);
            tangents[2] = new egret3d.Quaternion(1, 0, 1);
            tangents[3] = new egret3d.Quaternion(-1, 0, 1);
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
        };
        return OctahedronSphereGeometry;
    }(egret3d.Geometry));
    egret3d.OctahedronSphereGeometry = OctahedronSphereGeometry;
    __reflect(OctahedronSphereGeometry.prototype, "egret3d.OctahedronSphereGeometry");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=OctahedronSphereGeometry.js.map