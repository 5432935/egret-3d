var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @class egret3d.PointUtils
    * @classdesc
    * 这个类里面封装了一个用于判定一个2d点是否在另外3个2d点的三角形内部的方法。
    * @version Egret 3.0
    * @platform Web,Native
    */
    var PointUtils = (function () {
        function PointUtils() {
        }
        /**
       * @language zh_CN
       * 判定2d点是否在一个2d的三角形内
       * @param pt0        被判定的点
       * @param pt1        三角形的顶点1
       * @param pt2        三角形的顶点2
       * @param pt3        三角形的顶点3
       * @returns boolean 是否处于三角形内
       * @version Egret 3.0
       * @platform Web,Native
       */
        PointUtils.pointInsideTriangle = function (pt, pt0, pt1, pt2) {
            PointUtils.pp.setTo(pt.x, pt.z);
            PointUtils.p1.setTo(pt0.x, pt0.z);
            PointUtils.p2.setTo(pt1.x, pt1.z);
            PointUtils.p3.setTo(pt2.x, pt2.z);
            return PointUtils.pointInsideTriangle2d();
        };
        /**
        * @language zh_CN
        * @private
        * @returns boolean 判定2d点是否在一个2d的三角形内
        * @version Egret 3.0
        * @platform Web,Native
        */
        PointUtils.pointInsideTriangle2d = function () {
            if (PointUtils.product2d(PointUtils.p1, PointUtils.p2, PointUtils.p3) >= 0) {
                return (PointUtils.product2d(PointUtils.p1, PointUtils.p2, PointUtils.pp) >= 0)
                    && (PointUtils.product2d(PointUtils.p2, PointUtils.p3, PointUtils.pp)) >= 0
                    && (PointUtils.product2d(PointUtils.p3, PointUtils.p1, PointUtils.pp) >= 0);
            }
            else {
                return (PointUtils.product2d(PointUtils.p1, PointUtils.p2, PointUtils.pp) <= 0)
                    && (PointUtils.product2d(PointUtils.p2, PointUtils.p3, PointUtils.pp)) <= 0
                    && (PointUtils.product2d(PointUtils.p3, PointUtils.p1, PointUtils.pp) <= 0);
            }
        };
        /**
        * @language zh_CN
        * 叉乘计算
        * @param pt1        点1
        * @param pt2        点2
        * @param pt3        点3
        * @returns number 结果值
        * @version Egret 3.0
        * @platform Web,Native
        */
        PointUtils.product2d = function (p1, p2, p3) {
            var val = (p1.x - p3.x) * (p2.y - p3.y) - (p1.y - p3.y) * (p2.x - p3.x);
            if (val > -0.00001 && val < 0.00001)
                val = 0;
            return val;
        };
        return PointUtils;
    }());
    /**
    * @language zh_CN
    * @private
    * 静态变量2d点
    * @version Egret 3.0
    * @platform Web,Native
    */
    PointUtils.p1 = new egret3d.Point();
    /**
    * @language zh_CN
    * @private
    * 静态变量2d点
    * @version Egret 3.0
    * @platform Web,Native
    */
    PointUtils.p2 = new egret3d.Point();
    /**
    * @language zh_CN
    * @private
    * 静态变量2d点
    * @version Egret 3.0
    * @platform Web,Native
    */
    PointUtils.p3 = new egret3d.Point();
    /**
    * @language zh_CN
    * @private
    * 静态变量2d点
    * @version Egret 3.0
    * @platform Web,Native
    */
    PointUtils.pp = new egret3d.Point();
    egret3d.PointUtils = PointUtils;
    __reflect(PointUtils.prototype, "egret3d.PointUtils");
})(egret3d || (egret3d = {}));
