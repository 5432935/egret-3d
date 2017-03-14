var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @class egret3d.Plane3D
    * @classdesc
    * Plane3D 类 3D空间中的平面表示数据
    * 由a,b,c,d4个分量组成 在三维空间中定义了一个平面 Ax + By + Cz + D = 0
    * @includeExample geom/Plane3D.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Plane3D = (function () {
        /**
         * @language en_US
         * Create a Plane3D with ABCD coefficients
         */
        /**
        * @language zh_CN
        * 创建一个平面实例
        * @param a
        * @param b
        * @param c
        * @param d
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Plane3D(a, b, c, d) {
            if (a === void 0) { a = 0; }
            if (b === void 0) { b = 0; }
            if (c === void 0) { c = 0; }
            if (d === void 0) { d = 0; }
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
        }
        /**
        * @language zh_CN
        * 填充平面的各分量的值
        * @param a
        * @param b
        * @param c
        * @param d
        * @version Egret 3.0
        * @platform Web,Native
        */
        Plane3D.prototype.setTo = function (a, b, c, d) {
            if (a === void 0) { a = 0; }
            if (b === void 0) { b = 0; }
            if (c === void 0) { c = 0; }
            if (d === void 0) { d = 0; }
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
        };
        /**
         * @language en_US
         * Fills this Plane3D with the coefficients from 3 points in 3d space.
         * @param p0 Vector3
         * @param p1 Vector3
         * @param p2 Vector3
         */
        /**
        * @language zh_CN
        * 由3个坐标来创建一个3d平面
        * @param p0 Vector3
        * @param p1 Vector3
        * @param p2 Vector3
        * @version Egret 3.0
        * @platform Web,Native
        */
        Plane3D.prototype.fromPoints = function (p0, p1, p2) {
            var d1x = p1.x - p0.x;
            var d1y = p1.y - p0.y;
            var d1z = p1.z - p0.z;
            var d2x = p2.x - p0.x;
            var d2y = p2.y - p0.y;
            var d2z = p2.z - p0.z;
            this.a = d1y * d2z - d1z * d2y;
            this.b = d1z * d2x - d1x * d2z;
            this.c = d1x * d2y - d1y * d2x;
            this.d = -(this.a * p0.x + this.b * p0.y + this.c * p0.z);
        };
        /**
         * @language en_US
         * Fills this Plane3D with the coefficients from the plane's normal and a point in 3d space.
         * @param normal Vector3
         * @param point  Vector3
         */
        /**
        * @language zh_CN
        * 由一条normal向量和一个坐标创建一个3d平面
        * @param normal Vector3
        * @param point  Vector3
        * @version Egret 3.0
        * @platform Web,Native
        */
        Plane3D.prototype.fromNormalAndPoint = function (normal, point) {
            this.a = normal.x;
            this.b = normal.y;
            this.c = normal.z;
            this.d = -(this.a * point.x + this.b * point.y + this.c * point.z);
        };
        /**
         * @language en_US
         * Normalize this Plane3D
         * @returns Plane3D This Plane3D.
         */
        /**
        * @language zh_CN
        * 单位化3d平面
        * @returns number 返回平面长度
        * @version Egret 3.0
        * @platform Web,Native
        */
        Plane3D.prototype.normalize = function () {
            var len = Math.sqrt(this.a * this.a + this.b * this.b + this.c * this.c);
            if (len > 0.0) {
                var invLength = 1.0 / len;
                this.a *= invLength;
                this.b *= invLength;
                this.c *= invLength;
                this.d *= invLength;
            }
            return len;
        };
        /**
         * @language en_US
         * Returns the signed distance between this Plane3D and the point p.
         * @param p Vector3
         * @returns Number
         */
        /**
        * @language zh_CN
        * 计算3d平面到点p的距离
        * @param p Vector3
        * @returns number 返回计算后的距离
        * @version Egret 3.0
        * @platform Web,Native
        */
        Plane3D.prototype.distance = function (p) {
            return this.a * p.x + this.b * p.y + this.c * p.z + this.d;
        };
        /**
         * @language en_US
         * Classify a point against this Plane3D. (in front, back or intersecting)
         * @param p Vector3
         * @param epsilon
         * @returns PlaneClassification.FRONT在平面正面
         * PlaneClassification.BACK在平面背面面
         * PlaneClassification.INTERSECT在平面上
         */
        /**
        * @language zh_CN
        * 计算3d平面和点p的空间关系
        * @param p Vector3
        * @param epsilon 相对偏移值
        * @returns number int Plane3.FRONT or Plane3D.BACK or Plane3D.INTERSECT
        * @version Egret 3.0
        * @platform Web,Native
        */
        Plane3D.prototype.classifyPoint = function (p, epsilon) {
            if (epsilon === void 0) { epsilon = 0.01; }
            var dis = this.distance(p);
            if (dis < -epsilon) {
                return egret3d.PlaneClassification.BACK;
            }
            else if (dis > epsilon) {
                return egret3d.PlaneClassification.FRONT;
            }
            return egret3d.PlaneClassification.INTERSECT;
        };
        /**
        * @language zh_CN
        * 当前Plane3D以字符串形式返回
        * @returns string
        * @version Egret 3.0
        * @platform Web,Native
        */
        Plane3D.prototype.toString = function () {
            return "Plane3D [a:" + this.a + ", b:" + this.b + ", c:" + this.c + ", d:" + this.d + "]";
        };
        return Plane3D;
    }());
    // indicates the alignment of the plane
    /**
     * @private
     */
    Plane3D.ALIGN_ANY = 0;
    /**
     * @private
     */
    Plane3D.ALIGN_XY_AXIS = 1;
    /**
     * @private
     */
    Plane3D.ALIGN_YZ_AXIS = 2;
    /**
     * @private
     */
    Plane3D.ALIGN_XZ_AXIS = 3;
    egret3d.Plane3D = Plane3D;
    __reflect(Plane3D.prototype, "egret3d.Plane3D");
})(egret3d || (egret3d = {}));
