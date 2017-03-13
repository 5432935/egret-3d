var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @class egret3d.Point
    * @classdesc
    * Point 对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。
    * @includeExample geom/Point.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Point = (function () {
        /**
         * @language en_US
         * Creates a new point. If you pass no parameters to this method, a point is
         * created at(0,0).
         *
         * @param x The horizontal coordinate.
         * @param y The vertical coordinate.
         */
        /**
         * @language zh_CN
         * 创建一个Point实例
         * @param x x坐标 默认为0
         * @param y y坐标 默认为0
         * @version Egret 3.0
         * @platform Web,Native
         */
        function Point(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        Object.defineProperty(Point.prototype, "length", {
            /**
             * @language en_US
             * The length of the line segment from(0,0) to this point.
             * @returns length
                    * @version Egret 3.0
            * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 返回从(0, 0)到(x, y)的距离
             * @returns number 当前2维向量的长度
             * @version Egret 3.0
             * @platform Web,Native
             */
            get: function () {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @language en_US
         * Adds the coordinates of another point to the coordinates of this point to
         * create a new point.
         *
         * @param v The point to be added.
         * @returns The new point.
         */
        /**
         * @language zh_CN
         * 当前Point加上v Point，结果返回新的实例
         * @param v
         * @version Egret 3.0
         * @platform Web,Native
         */
        Point.prototype.add = function (v) {
            return new Point(this.x + v.x, this.y + v.y);
        };
        /**
        * @language zh_CN
        * 当前Point自生加上v Point
        * @param v
        * @version Egret 3.0
        * @platform Web,Native
        */
        Point.prototype.incrementBy = function (v) {
            this.x += v.x;
            this.y += v.y;
        };
        /**
        * @language zh_CN
        * 重新赋值Point实例
        * @param x x坐标 默认为0
        * @param y y坐标 默认为0
        * @version Egret 3.0
        * @platform Web,Native
        */
        Point.prototype.setTo = function (x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x += x;
            this.y += y;
        };
        /**
         * @language en_US
         * Creates a copy of this Point object.
         *
         * @returns The new Point object.
         */
        /**
         * @language zh_CN
         * 克隆Point
         * @returns  Point 返回克隆后的Point
         * @version Egret 3.0
         * @platform Web,Native
         */
        Point.prototype.clone = function () {
            return new Point(this.x, this.y);
        };
        /**
         * @language zh_CN
         * 复制源Point的值
         * @param sourcePoint 数据源
         * @version Egret 3.0
         * @platform Web,Native
         */
        Point.prototype.copyFrom = function (sourcePoint) {
            this.x = sourcePoint.x;
            this.y = sourcePoint.y;
        };
        /**
         * @language en_US
         * Determines whether two points are equal. Two points are equal if they have
         * the same <i>x</i> and <i>y</i> values.
         *
         * @param toCompare The point to be compared.
         * @returns A value of <code>true</code> if the object is equal to this Point
         *         object; <code>false</code> if it is not equal.
         */
        /**
         * @language zh_CN
         * 比较两个Point是否全等
         * @param toCompare 被比较的Point
         * @returns boolean 全等返回true
         * @version Egret 3.0
         * @platform Web,Native
         */
        Point.prototype.equals = function (toCompare) {
            return (this.x == toCompare.x && this.y == toCompare.y);
        };
        /**
         * @language en_US
         * Scales the line segment between(0,0) and the current point to a set
         * length.
         *
         * @param thickness The scaling value. For example, if the current point is
         *                 (0,5), and you normalize it to 1, the point returned is
         *                  at(0,1).
         */
        /**
         * @language zh_CN
         * 当前Point标准化
         * @param thickness 默认参数为1，使当前Point的长度为thickness 原点(0, 0)到(x, y)的距离
         * @version Egret 3.0
         * @platform Web,Native
         */
        Point.prototype.normalize = function (thickness) {
            if (thickness === void 0) { thickness = 1; }
            var len = this.length;
            if (len != 0) {
                var invLength = thickness / len;
                this.x *= invLength;
                this.y *= invLength;
                return;
            }
            throw "Cannot divide by zero length.";
        };
        /**
         * @language en_US
         * Offsets the Point object by the specified amount. The value of
         * <code>dx</code> is added to the original value of <i>x</i> to create the
         * new <i>x</i> value. The value of <code>dy</code> is added to the original
         * value of <i>y</i> to create the new <i>y</i> value.
         *
         * @param dx The amount by which to offset the horizontal coordinate,
         *           <i>x</i>.
         * @param dy The amount by which to offset the vertical coordinate, <i>y</i>.
         */
        /**
         * @language zh_CN
         * 当前Point偏移位置
         * @param dx 偏移的x坐标
         * @param dx 偏移的y坐标
         * @version Egret 3.0
         * @platform Web,Native
         */
        Point.prototype.offset = function (dx, dy) {
            this.x += dx;
            this.y += dy;
        };
        /**
         * @language en_US
         * Subtracts the coordinates of another point from the coordinates of this
         * point to create a new point.
         *
         * @param v The point to be subtracted.
         * @returns The new point.
         */
        /**
         * @language zh_CN
         * 当前Point减去v Point,结果返回一个新实例
         * @param v
         * @returns Point 结果返回
         * @version Egret 3.0
         * @platform Web,Native
         */
        Point.prototype.subtract = function (v) {
            return new Point(this.x - v.x, this.y - v.y);
        };
        /**
         * @language en_US
         * Returns a string that contains the values of the <i>x</i> and <i>y</i>
         * coordinates. The string has the form <code>"(x=<i>x</i>,
         * y=<i>y</i>)"</code>, so calling the <code>toString()</code> method for a
         * point at 23,17 would return <code>"(x=23, y=17)"</code>.
         *
         * @returns The string representation of the coordinates.
         */
        /**
        * @language zh_CN
        * 当前Point以字符串形式返回
        * @returns string
         * @version Egret 3.0
         * @platform Web,Native
        */
        Point.prototype.toString = function () {
            return "[Point] (x=" + this.x + ", y=" + this.y + ")";
        };
        /**
         * @language en_US
         * Returns the distance between <code>pt1</code> and <code>pt2</code>.
         *
         * @param pt1 The first point.
         * @param pt2 The second point.
         * @returns The distance between the first and second points.
         */
        /**
        * @language zh_CN
        * 计算两个Point之间的距离
        * @returns number 返回两个Point之间的距离
         * @version Egret 3.0
         * @platform Web,Native
        */
        Point.distance = function (pt1, pt2) {
            var dx = pt2.x - pt1.x;
            var dy = pt2.y - pt1.y;
            return Math.sqrt(dx * dx + dy * dy);
        };
        return Point;
    }());
    egret3d.Point = Point;
    __reflect(Point.prototype, "egret3d.Point");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Point.js.map