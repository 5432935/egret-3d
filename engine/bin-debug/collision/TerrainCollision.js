var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var Face = (function () {
        function Face() {
        }
        return Face;
    }());
    egret3d.Face = Face;
    __reflect(Face.prototype, "egret3d.Face");
    var TerrainCollision = (function () {
        function TerrainCollision(mesh) {
            this.height = 0;
            this.selectFaces = [];
            this.mesh = mesh;
            this._offsetPos = new egret3d.Vector3();
            this._offsetPos.copyFrom(mesh.globalPosition);
            this._geometry = mesh.geometry;
            this.buildFace();
        }
        TerrainCollision.prototype.buildFace = function () {
            var index1 = 0;
            var index2 = 0;
            var index3 = 0;
            var nodes = [];
            for (var i = 0; i < this._geometry.indexCount / 3; i++) {
                var face = new Face();
                face.v_0 = new egret3d.Vector3();
                face.v_1 = new egret3d.Vector3();
                face.v_2 = new egret3d.Vector3();
                face.min = new egret3d.Vector3();
                face.max = new egret3d.Vector3();
                face.centre = new egret3d.Vector3();
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
                nodes.push(new egret3d.KDData([face.centre.x, face.centre.z, face.centre.y], face));
            }
            this._kdTree = new egret3d.KDTree();
            this._kdTree.buildTree(nodes);
        };
        TerrainCollision.prototype.getTerrainCollisionHeight = function (sceneX, sceneZ) {
            var list = this._kdTree.root.find([sceneX, sceneZ], 3);
            var face;
            this.selectFaces.length = 0;
            for (var i = 0; i < list.length; i++) {
                face = list[i]["datum"].data;
                this.selectFaces.push(face);
                if (this.checkPointInTriangle(sceneX, sceneZ, face)) {
                    return this.height = this.getHeightInTriangle(sceneX, sceneZ, face);
                }
            }
            return this.height;
        };
        TerrainCollision.prototype.checkPointInTriangle = function (x, y, face) {
            var p1 = face.v_0;
            var p2 = face.v_1;
            var p3 = face.v_2;
            // p1-p2
            var A1 = p1.z - p2.z;
            var B1 = p2.x - p1.x;
            var C1 = p1.x * p2.z - p2.x * p1.z;
            // p2-p3
            var A2 = p2.z - p3.z;
            var B2 = p3.x - p2.x;
            var C2 = p2.x * p3.z - p3.x * p2.z;
            // p3-p1
            var A3 = p3.z - p1.z;
            var B3 = p1.x - p3.x;
            var C3 = p3.x * p1.z - p1.x * p3.z;
            var isInTri = false;
            var D1 = A1 * x + B1 * y + C1;
            var D2 = A2 * x + B2 * y + C2;
            var D3 = A3 * x + B3 * y + C3;
            var Tiny = 0.01;
            if ((D1 >= -Tiny && D2 >= -Tiny && D3 >= -Tiny) || (D1 <= Tiny && D2 <= Tiny && D3 <= Tiny))
                isInTri = true;
            return isInTri;
        };
        TerrainCollision.prototype.getHeightInTriangle = function (x, y, face) {
            var p1 = face.v_0;
            var p2 = face.v_1;
            var p3 = face.v_2;
            // 计算(x,y)在三角面(p1,p2,p3)上的位置
            var tmp = egret3d.Vector3.HELP_2;
            // p1.x >= p2.x >= x >= p3.x || p1.x <= p2.x <= x <= p3.x
            if (p1.x >= x) {
                if (p3.x >= x) {
                    tmp = p3;
                    p3 = p2;
                    p2 = tmp;
                }
                else {
                    if (p2.x >= x) {
                    }
                    else {
                        tmp = p3;
                        p3 = p1;
                        p1 = tmp;
                    }
                }
            }
            else if (p1.x < x) {
                if (p3.x < x) {
                    tmp = p3;
                    p3 = p2;
                    p2 = tmp;
                }
                else {
                    if (p2.x < x) {
                    }
                    else {
                        tmp = p3;
                        p3 = p1;
                        p1 = tmp;
                    }
                }
            }
            else
                return p1.y;
            var p4 = egret3d.Vector3.HELP_0; // p4 in p1 p3
            var p5 = egret3d.Vector3.HELP_1; // p4 in p2 p3
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
            var result;
            if (p4.z == p5.z)
                result = p5.y;
            else
                result = (p4.y - p5.y) * (y - p5.z) / (p4.z - p5.z) + p5.y;
            return result;
        };
        return TerrainCollision;
    }());
    egret3d.TerrainCollision = TerrainCollision;
    __reflect(TerrainCollision.prototype, "egret3d.TerrainCollision");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=TerrainCollision.js.map