var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @class egret3d.Ray
    * @classdesc
    * 射线是指直线上的一点和它一旁的部分所组成的直线，射线有且仅有一个端点，无法测量，由一个原点,和一个方向构成
    * 用于检测射线,也可用于鼠标拣选场景中的模型
    *
    * @see egret3d.Picker
    * @see egret3d.Vector3
    *
    * @includeExample geom/Ray.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Ray = (function () {
        /**
        * @language zh_CN
        * constructor
        * @origin 射线原点
        * @direction 射线方向
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Ray(origin, direction) {
            if (origin === void 0) { origin = new egret3d.Vector3(); }
            if (direction === void 0) { direction = new egret3d.Vector3(); }
            /**
            * @language zh_CN
            * 射线原点
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.origin = new egret3d.Vector3();
            /**
            * @language zh_CN
            * 射线方向
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.dir = new egret3d.Vector3();
            this.invViewMat = new egret3d.Matrix4();
            this.origin.copyFrom(origin);
            this.dir.copyFrom(direction);
        }
        /**
        * @language zh_CN
        * 计算一个三角形和一个射线的交点
        * @param v0 三角形的第一个顶点
        * @param v1 三角形的第二个顶点
        * @param v2 三角形的第三个顶点
        * @param ret t(交点到射线起始点的距离) u(交点在v1-v0上的投影的位置) v(交点在v1-v2上的投影的位置, 交点为ret=v0+pU*(v1-v0)+pV*(v2-v0))
        * @returns boolean 相交返回true
        * @version Egret 3.0
        * @platform Web,Native
        */
        Ray.prototype.IntersectTriangle = function (v0, v1, v2, ret) {
            if (ret === void 0) { ret = null; }
            var edge1 = v1.subtract(v0, Ray.v0);
            var edge2 = v2.subtract(v0, Ray.v1);
            var pvec = this.dir.crossProduct(edge2, Ray.v2);
            var det = edge1.dotProduct(pvec);
            var tvec;
            if (det > 0) {
                tvec = this.origin.subtract(v0, Ray.v3);
            }
            else {
                tvec = v0.subtract(this.origin, Ray.v3);
                det = -det;
            }
            if (det < 0.0001) {
                return false;
            }
            // Calculate U parameter and test bounds
            var u = tvec.dotProduct(pvec);
            if (ret != null) {
                ret[1] = u;
            }
            if (u < 0.0 || u > det) {
                return false;
            }
            // Prepare to test V parameter
            var qvec = tvec.crossProduct(edge1, Ray.v4);
            // Calculate V parameter and test bounds
            var v = this.dir.dotProduct(qvec);
            if (ret != null) {
                ret[2] = v;
            }
            if (v < 0.0 || u + v > det) {
                return false;
            }
            // Calculate T, scale parameters, ray intersects triangle
            var t = edge2.dotProduct(qvec);
            var invDet = 1.0 / det;
            t *= invDet;
            u *= invDet;
            v *= invDet;
            if (ret != null) {
                ret[0] = t;
                ret[1] = u;
                ret[2] = v;
            }
            if (t < 0) {
                return false;
            }
            return true;
        };
        /**
        * @language zh_CN
        * 计算射线是否和球相交
        * @param center 球中心点
        * @param radius 球的半径
        * @param ret 相交返回 数据
        * @param transform 是否要变换
        * @returns number[] 相交返回 数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        Ray.prototype.IntersectSphere = function (center, radius, ret, transform) {
            if (ret === void 0) { ret = null; }
            if (transform === void 0) { transform = null; }
            ret = ret || [];
            Ray.transformCenter.copyFrom(center);
            Ray.v0.copyFrom(egret3d.Vector3.X_AXIS);
            Ray.v0.scaleBy(radius);
            Ray.v0.add(Ray.transformCenter, Ray.v0);
            transform.mat3TransformVector(Ray.v0, Ray.v0);
            Ray.v0.subtract(Ray.transformCenter, Ray.v0);
            radius = Ray.v0.length;
            if (transform) {
                transform.transformVector(center, Ray.transformCenter);
            }
            var t0 = 0.0;
            var t1 = 0.0;
            var oc = Ray.transformCenter.subtract(this.origin, egret3d.MathUtil.CALCULATION_VECTOR3D_0);
            var projoc = this.dir.dotProduct(oc);
            if (projoc < 0)
                return null;
            var oc2 = oc.dotProduct(oc);
            var distance2 = oc2 - projoc * projoc; //计算出的球心到射线的距离
            var radiusSquare = radius * radius;
            if (distance2 > radiusSquare)
                return null;
            var discriminant = radiusSquare - distance2; //使用勾股定理，计算出另一条边的长度
            if (discriminant < 0) {
                t0 = t1 = projoc;
            }
            else {
                discriminant = Math.sqrt(discriminant);
                t0 = projoc - discriminant;
                t1 = projoc + discriminant;
                if (t0 < 0) {
                    t0 = t1;
                }
            }
            ret.push(t0);
            ret.push(t1);
            return ret;
        };
        /**
        * @language zh_CN
        * 检测射线相交包围盒
        * @param bound 检测的包围盒
        * @param result 相交数据 默认为null
        * @returns PickResult 相交返回PickResult 对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Ray.prototype.IntersectBound = function (bound, result) {
            if (result === void 0) { result = null; }
            result = result || new egret3d.PickResult();
            if (this.IntersectMesh(bound.vexData, bound.indexData, bound.vexLength, bound.indexData.length / 3, 0, bound.transform, result)) {
                return result;
            }
            return null;
        };
        /**
        * @language zh_CN
        * 检测射线相交模型
        * @param renderItem 检测的模型
        * @param uv_offset 顶点uv数据偏移 可以为-1
        * @param result 数据返回
        * @returns boolean 相交返回true
        * @version Egret 3.0
        * @platform Web,Native
        */
        Ray.prototype.IntersectMeshEx = function (renderItem, uv_offset, result) {
            return this.IntersectMesh(renderItem.geometry.vertexArray, renderItem.geometry.indexArray, renderItem.geometry.vertexAttLength, renderItem.geometry.faceCount, uv_offset, renderItem.modelMatrix, result);
        };
        /**
        * @language zh_CN
        * 检测射线相交模型
        * @param verticesData 检测的模型的顶点数据
        * @param indexData 检测的模型的索引数据
        * @param offset 每个顶点的大小
        * @param faces 模型面数
        * @param uv_offset 顶点uv数据偏移 可以为-1
        * @param mMat 顶点的世界变换矩阵
        * @param result 数据返回
        * @returns boolean 相交返回true
        * @version Egret 3.0
        * @platform Web,Native
        */
        Ray.prototype.IntersectMesh = function (verticesData, indexData, offset, faces, uv_offset, mMat, result) {
            var modletriangle = Ray.modletriangle;
            var uvarray = Ray.uvarray;
            var triangle = Ray.triangle;
            var v0 = triangle[0];
            var v1 = triangle[1];
            var v2 = triangle[2];
            var pos = Ray.pos;
            var uv = Ray.uv;
            var ret = Ray.ret;
            var face = -1;
            var t = egret3d.MathUtil.MAX_VALUE;
            var u = 0;
            var v = 0;
            for (var i = 0; i < faces; ++i) {
                for (var j = 0; j < 3; ++j) {
                    var index = indexData[3 * i + j];
                    pos.setTo(verticesData[offset * index + 0], verticesData[offset * index + 1], verticesData[offset * index + 2]);
                    pos.copyFrom(mMat.transformVector(pos));
                    triangle[j].x = pos.x;
                    triangle[j].y = pos.y;
                    triangle[j].z = pos.z;
                }
                if (this.IntersectTriangle(v0, v1, v2, ret)) {
                    if (ret[0] < t) {
                        face = i;
                        t = ret[0];
                        u = ret[1];
                        v = ret[2];
                    }
                }
            }
            if (face < faces && face >= 0) {
                for (var i = 0; i < 3; ++i) {
                    var index = indexData[3 * face + i];
                    pos.setTo(verticesData[offset * index + 0], verticesData[offset * index + 1], verticesData[offset * index + 2]);
                    modletriangle[i].copyFrom(pos);
                    if (uv_offset > 0) {
                        uv.x = verticesData[offset * index + 0 + uv_offset];
                        uv.y = verticesData[offset * index + 1 + uv_offset];
                        uvarray[i].x = uv.x;
                        uvarray[i].y = uv.y;
                    }
                    pos.copyFrom(mMat.transformVector(pos));
                    triangle[i].x = pos.x;
                    triangle[i].y = pos.y;
                    triangle[i].z = pos.z;
                }
                result.faceIndex = face;
                result.v0 = indexData[3 * face + 0];
                result.v1 = indexData[3 * face + 1];
                result.v2 = indexData[3 * face + 2];
                var tmp0 = v1.subtract(v0, Ray.v0);
                tmp0.scaleBy(u);
                var tmp1 = v2.subtract(v0, Ray.v1);
                tmp1.scaleBy(v);
                result.globalPosition.copyFrom(v0.add(tmp0.add(tmp1, Ray.v2), Ray.v3));
                tmp0 = modletriangle[1].subtract(modletriangle[0], tmp0);
                tmp0.scaleBy(u);
                tmp1 = modletriangle[2].subtract(modletriangle[0], tmp1);
                tmp1.scaleBy(v);
                result.localPosition.copyFrom(modletriangle[0].add(tmp0.add(tmp1, Ray.v2), Ray.v3));
                if (uv_offset > 0) {
                    tmp0 = uvarray[1].subtract(uvarray[0], tmp0);
                    tmp0.scaleBy(u);
                    tmp1 = uvarray[2].subtract(uvarray[0], tmp1);
                    tmp1.scaleBy(v);
                    result.uv.copyFrom(uvarray[0].add(tmp0.add(tmp1, Ray.v2), Ray.v3));
                }
                return true;
            }
            return false;
        };
        /**
        * @language zh_CN
        * 计算摄像机的射线
        * @param width 视口宽
        * @param height 视口高
        * @param modelMtx 相机世界矩阵
        * @param projMtx 相机投影矩阵
        * @param x 鼠标x
        * @param y 鼠标y
        * @version Egret 3.0
        * @platform Web,Native
        */
        Ray.prototype.CalculateAndTransformRay = function (width, height, modelMtx, projMtx, x, y) {
            this.reset();
            this.dir.x = (2.0 * x / width - 1.0) / projMtx.rawData[0];
            this.dir.y = (-2.0 * y / height + 1.0) / projMtx.rawData[5];
            this.dir.z = 1.0;
            this.invViewMat.copyFrom(modelMtx);
            this.origin.copyFrom(this.invViewMat.transformVector(this.origin, Ray.v0));
            this.dir.copyFrom(this.invViewMat.deltaTransformVector(this.dir, Ray.v0));
            this.dir.normalize();
        };
        /**
        * @language zh_CN
        * 射线重置
        * @version Egret 3.0
        * @platform Web,Native
        */
        Ray.prototype.reset = function () {
            this.origin.setTo(0, 0, 0);
            this.dir.setTo(0, 0, 0);
        };
        return Ray;
    }());
    Ray.v0 = new egret3d.Vector3();
    Ray.v1 = new egret3d.Vector3();
    Ray.v2 = new egret3d.Vector3();
    Ray.v3 = new egret3d.Vector3();
    Ray.v4 = new egret3d.Vector3();
    /*
    * @private
    */
    Ray.transformCenter = new egret3d.Vector3();
    Ray.modletriangle = [new egret3d.Vector3(), new egret3d.Vector3(), new egret3d.Vector3()];
    Ray.uvarray = [new egret3d.Vector3(), new egret3d.Vector3(), new egret3d.Vector3()];
    Ray.triangle = [new egret3d.Vector3(), new egret3d.Vector3(), new egret3d.Vector3()];
    Ray.ret = [0, 0, 0];
    Ray.pos = new egret3d.Vector3();
    Ray.uv = new egret3d.Point();
    egret3d.Ray = Ray;
    __reflect(Ray.prototype, "egret3d.Ray");
})(egret3d || (egret3d = {}));
