module egret3d {
    /**
    * @language zh_CN
    * @class egret3d.PointUtils
    * @classdesc
    * 这个类里面封装了一个用于判定一个2d点是否在另外3个2d点的三角形内部的方法。
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class PointUtils {
        /**
        * @language zh_CN
        * @private
        * 静态变量2d点
        * @version Egret 3.0
        * @platform Web,Native
        */
        private static p1: Point = new Point();

        /**
        * @language zh_CN
        * @private
        * 静态变量2d点
        * @version Egret 3.0
        * @platform Web,Native
        */
        private static p2: Point = new Point();

        /**
        * @language zh_CN
        * @private
        * 静态变量2d点
        * @version Egret 3.0
        * @platform Web,Native
        */
        private static p3: Point = new Point();

        /**
        * @language zh_CN
        * @private
        * 静态变量2d点
        * @version Egret 3.0
        * @platform Web,Native
        */
        private static pp: Point = new Point();




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
        public static pointInsideTriangle(pt: Vector3, pt0: Vector3, pt1: Vector3, pt2: Vector3): boolean {
            PointUtils.pp.setTo(pt.x, pt.z);
            PointUtils.p1.setTo(pt0.x, pt0.z);
            PointUtils.p2.setTo(pt1.x, pt1.z);
            PointUtils.p3.setTo(pt2.x, pt2.z);

            return PointUtils.pointInsideTriangle2d();
        }



        /**
        * @language zh_CN
        * @private
        * @returns boolean 判定2d点是否在一个2d的三角形内
        * @version Egret 3.0
        * @platform Web,Native
        */
        private static pointInsideTriangle2d(): boolean {
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
        }

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
        private static product2d(p1: Point, p2: Point, p3: Point): number {
            var val: number = (p1.x - p3.x) * (p2.y - p3.y) - (p1.y - p3.y) * (p2.x - p3.x);
            if (val > -0.00001 && val < 0.00001)
                val = 0;
            return val;
        }
    }


}
