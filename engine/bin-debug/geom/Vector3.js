var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @class egret3d.Vector3
    * @classdesc
    * 用 Vector3 表示三维空间中的位置,也可以做4维向量,当为3维向量时w始终为0。</p>
    * 定义了一个三元的浮点向量。</p>
    * 当使用一个向量表示一个表面法线时，向量应该是标准化的。</p>
    * 其他用途的定向矢量的大小不变。当用作一个点，元素的矢量表示在三维空间中的位置。</p>
    * @includeExample geom/Vector3.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Vector3 = (function () {
        /**
        * @language en_US
        * Creates an instance of a Vector3 object. If you do not specify a。
        * parameter for the constructor, a Vector3 object is created with
        * the elements (0,0,0,0).
        *
        * @param x The first element, such as the x coordinate.
        * @param y The second element, such as the y coordinate.
        * @param z The third element, such as the z coordinate.
        * @param w An optional element for additional data such as the angle
        *          of rotation.
        */
        /**
        * @language zh_CN
        * 创建一个对象实例，默认为(0, 0, 0, 0)
        * @param x x的值
        * @param y y的值
        * @param z z的值
        * @param w w的值
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Vector3(x, y, z, w) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (w === void 0) { w = 0; }
            /**
            * @language en_US
            * The first element of a Vector3 object, such as the x coordinate of
            * a point in the three-dimensional space. The default value is 0.
            */
            /**
            * @language zh_CN
            * 在三维空间中x坐标，默认值是0
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.x = 0;
            /**
            * @language en_US
            * The second element of a Vector3 object, such as the y coordinate of
            * a point in the three-dimensional space. The default value is 0.
            */
            /**
            * @language zh_CN
            * 在三维空间中y坐标，默认值是0
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.y = 0;
            /**
            * @language en_US
            * The third element of a Vector3 object, such as the y coordinate of
            * a point in the three-dimensional space. The default value is 0.
            */
            /**
            * @language zh_CN
            * 在三维空间中z坐标，默认值是0
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.z = 0;
            /**
            * @language zh_CN
            * 可作为一种透视投影的三维位置或投影
            * 也可以做四元数中的w
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.w = 0;
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
        Object.defineProperty(Vector3.prototype, "a", {
            /**
            * @language en_US
            *  得到w分量
            * @returns 获得w的值
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.w;
            },
            /**
            * @language en_US
            *  设置w分量
            * @param value 设置给w的值
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this.w = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector3.prototype, "r", {
            /**
            * @language en_US
            *  得到x分量
            * @returns 获得x的值
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.x;
            },
            /**
            * @language en_US
            *  设置x分量
            * @param value 设置给x的值
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this.x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector3.prototype, "g", {
            /**
            * @language en_US
            *  得到y分量
            * @returns 获得y的值
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.y;
            },
            /**
            * @language en_US
            *  设置y分量
            * @param value 设置给y的值
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this.y = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector3.prototype, "b", {
            /**
            * @language en_US
            *  得到z分量
            * @returns 获得z的值
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.z;
            },
            /**
            * @language en_US
            *  设置z分量
            * @param value 设置给z的值
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this.z = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector3.prototype, "length", {
            /**
            * @language en_US
            * The length, magnitude, of the current Vector3 object from the
            * origin (0,0,0) to the object's x, y, and z coordinates. The w
            * property is ignored. A unit vector has a length or magnitude of
            * one.
            */
            /**
            * @language zh_CN
            * 向量的长度，原点(0, 0, 0)到(x, y, z)的距离
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return Math.sqrt(this.lengthSquared);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector3.prototype, "lengthSquared", {
            /**
            * @language en_US
            * The square of the length of the current Vector3 object, calculated。
            * using the x, y, and z properties. The w property is ignored. Use the
            * <code>lengthSquared()</code> method whenever possible instead of the
            * slower <code>Math.sqrt()</code> method call of the
            * <code>Vector3.length()</code> method.
            */
            /**
            * @language zh_CN
            * 3维向量的坐标x的平方加 y的平方加 z的平方
            * @returns 获得长度的平方
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.x * this.x + this.y * this.y + this.z * this.z;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language en_US
        * Adds the value of the x, y, and z elements of the current Vector3。
        * object to the values of the x, y, and z elements of another Vector3
        * object. The <code>add()</code> method does not change the current
        * Vector3 object. Instead, it returns a new Vector3 object with
        * the new values.
        *
        * <p>The result of adding two vectors together is a resultant vector.
        * One way to visualize the result is by drawing a vector from the
        * origin or tail of the first vector to the end or head of the second
        * vector. The resultant vector is the distance between the origin
        * point of the first vector and the end point of the second vector.
        * </p>
        */
        /**
        * @language zh_CN
        * 向量相加，结果返回一个新实例
        * @param a Vector3 加成的值
        * @param target Vector3 默认为null
        * @returns Vector3 结果返回
        * @version Egret 3.0
        * @platform Web,Native
        */
        Vector3.prototype.add = function (a, target) {
            if (target === void 0) { target = null; }
            if (!target) {
                target = new Vector3();
            }
            var a0x = this.x;
            var a0y = this.y;
            var a0z = this.z;
            var a0w = this.w;
            var a1x = a.x;
            var a1y = a.y;
            var a1z = a.z;
            var a1w = a.w;
            target.setTo(a0x + a1x, a0y + a1y, a0z + a1z, a0w + a1w);
            return target;
        };
        /**
        * @language en_US
        * Returns a new Vector3 object that is an exact copy of the current
        * Vector3 object.
        *
        * @returns A new Vector3 object that is a copy of the current
        * Vector3 object.
        */
        /**
        * @language zh_CN
        * 克隆一个Vector3
        * @returns 返回克隆后的实例
        * @version Egret 3.0
        * @platform Web,Native
        */
        Vector3.prototype.clone = function () {
            return new Vector3(this.x, this.y, this.z, this.w);
        };
        /**
        * @language en_US
        * Copies all of vector data from the source Vector3 object into the
        * calling Vector3 object.
        *
        * @param src The Vector3 object from which to copy the data.
        */
        /**
        * @language zh_CN
        * 复制Vector3对象
        * @param src 数据源
        * @version Egret 3.0
        * @platform Web,Native
        */
        Vector3.prototype.copyFrom = function (src) {
            var v = this;
            v.x = src.x;
            v.y = src.y;
            v.z = src.z;
            v.w = src.w;
        };
        /**
        * @language en_US
        * Returns a new Vector3 object that is perpendicular (at a right。
        * angle) to the current Vector3 and another Vector3 object. If the
        * returned Vector3 object's coordinates are (0,0,0), then the two
        * Vector3 objects are parallel to each other.
        *
        * <p>You can use the normalized cross product of two vertices of a
        * polygon surface with the normalized vector of the camera or eye
        * viewpoint to get a dot product. The value of the dot product can
        * identify whether a surface of a three-dimensional object is hidden
        * from the viewpoint.</p>
        *
        * @param a A second Vector3 object.
        * @returns A new Vector3 object that is perpendicular to the current
        *          Vector3 object and the Vector3 object specified as the
        *          parameter.
        */
        /**
        * @language zh_CN
        * 两个Vector3进行叉乘 this 叉乘 a
        * 叉乘后的结果是这两条向量的垂直向量
        * @param a 求叉乘的另外一个向量
        * @returns Vector3 返回叉乘结果向量
        * @version Egret 3.0
        * @platform Web,Native
        */
        Vector3.prototype.crossProduct = function (a, target) {
            if (target === void 0) { target = null; }
            target = target || new Vector3();
            target.x = this.y * a.z - this.z * a.y;
            target.y = this.z * a.x - this.x * a.z;
            target.z = this.x * a.y - this.y * a.x;
            target.w = 1;
            return target;
        };
        /**
        * @language en_US
        * Decrements the value of the x, y, and z elements of the current。
        * Vector3 object by the values of the x, y, and z elements of
        * specified Vector3 object. Unlike the
        * <code>Vector3.subtract()</code> method, the
        * <code>decrementBy()</code> method changes the current Vector3
        * object and does not return a new Vector3 object.
        *
        * @param a The Vector3 object containing the values to subtract from
        *          the current Vector3 object.
        */
        /**
        * @language zh_CN
        * 当前向量减去a向量，结果赋值给自己
        * @param a 减去的向量
        * @version Egret 3.0
        * @platform Web,Native
        */
        Vector3.prototype.decrementBy = function (a) {
            this.x -= a.x;
            this.y -= a.y;
            this.z -= a.z;
        };
        /**
        * @language en_US
        * Returns the distance between two Vector3 objects. The。
        * <code>distance()</code> method is a static method. You can use it
        * directly as a method of the Vector3 class to get the Euclidean
        * distance between two three-dimensional points.
        *
        * @param pt1 A Vector3 object as the first three-dimensional point.
        * @param pt2 A Vector3 object as the second three-dimensional point.
        * @returns The distance between two Vector3 objects.
        */
        /**
        * @language zh_CN
        * 计算两个Vector3之间的距离
        * @param pt1 坐标1
        * @param pt2 坐标2
        * @returns number 两个Vector3之间的距离
        * @version Egret 3.0
        * @platform Web,Native
        */
        Vector3.distance = function (pt1, pt2) {
            var x = (pt1.x - pt2.x);
            var y = (pt1.y - pt2.y);
            var z = (pt1.z - pt2.z);
            return Math.sqrt(x * x + y * y + z * z);
        };
        /**
        * @language en_US
        * If the current Vector3 object and the one specified as the。
        * parameter are unit vertices, this method returns the cosine of the
        * angle between the two vertices. Unit vertices are vertices that
        * point to the same direction but their length is one. They remove the
        * length of the vector as a factor in the result. You can use the
        * <code>normalize()</code> method to convert a vector to a unit
        * vector.
        *
        * <p>The <code>dotProduct()</code> method finds the angle between two
        * vertices. It is also used in backface culling or lighting
        * calculations. Backface culling is a procedure for determining which
        * surfaces are hidden from the viewpoint. You can use the normalized
        * vertices from the camera, or eye, viewpoint and the cross product of
        * the vertices of a polygon surface to get the dot product. If the dot
        * product is less than zero, then the surface is facing the camera or
        * the viewer. If the two unit vertices are perpendicular to each
        * other, they are orthogonal and the dot product is zero. If the two
        * vertices are parallel to each other, the dot product is one.</p>
        *
        * @param a The second Vector3 object.
        * @returns A scalar which is the dot product of the current Vector3
        *          object and the specified Vector3 object.
        *
        */
        /**
        * @language zh_CN
        * 计算两个Vector3的点积,返回两个Vector3之间的夹角关系
        * @param a 另一个Vector3
        * @returns number 返回两个Vector3之间的夹角关系
        * @version Egret 3.0
        * @platform Web,Native
        */
        Vector3.prototype.dotProduct = function (a) {
            return this.x * a.x + this.y * a.y + this.z * a.z;
        };
        /**
        * @language en_US
        * @param toCompare The Vector3 object to be compared with the current
        *                  Vector3 object.
        * @param allFour   An optional parameter that specifies whether the w
        *                  property of the Vector3 objects is used in the
        *                  comparison.
        * @returns A value of true if the specified Vector3 object is equal
        *          to the current Vector3 object; false if it is not equal.
        */
        /**
        * @language zh_CN
        * 求两个Vector3的值是否全等
        * @param toCompare 与些Vector3进行比较
        * @param allFour 默认参数为1，是否比较w分量
        * @returns boolean 全等返回true
        * @version Egret 3.0
        * @platform Web,Native
        */
        Vector3.prototype.equals = function (toCompare, allFour) {
            if (allFour === void 0) { allFour = false; }
            return (this.x == toCompare.x && this.y == toCompare.y && this.z == toCompare.z && (!allFour || this.w == toCompare.w));
        };
        /**
        * @language en_US

        * Increments the value of the x, y, and z elements of the current
        * Vector3 object by the values of the x, y, and z elements of a
        * specified Vector3 object. Unlike the <code>Vector3.add()</code>
        * method, the <code>incrementBy()</code> method changes the current
        * Vector3 object and does not return a new Vector3 object.
        *
        * @param a The Vector3 object to be added to the current Vector3
        *          object.
        */
        /**
        * @language zh_CN
        * 当前Vector3加等于a Vector3，只加x y z 3个分量
        * @param a 加等a
        * @version Egret 3.0
        * @platform Web,Native
        */
        Vector3.prototype.incrementBy = function (a) {
            this.x += a.x;
            this.y += a.y;
            this.z += a.z;
        };
        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        Vector3.prototype.fromArray = function (d) {
            this.x = d[0];
            this.y = d[1];
            this.z = d[2];
        };
        /**
        * @language zh_CN
        * 当前Vector3除分量 或者 除Vector3
        * @param v 如果是number就是除分量 如果为Vector3 就是除Vector3
        * @returns Vector3 返回自己，计算之后的结果
        * @version Egret 3.0
        * @platform Web,Native
        */
        Vector3.prototype.divide = function (v) {
            if (v instanceof Vector3)
                return new Vector3(this.x / v.x, this.y / v.y, this.z / v.z);
            else {
                this.x = this.x / v;
                this.y = this.y / v;
                this.z = this.z / v;
            }
            return this;
        };
        /**
        * @language en_US
        * Sets the current Vector3 object to its inverse. The inverse object
        * is also considered the opposite of the original object. The value of
        * the x, y, and z properties of the current Vector3 object is changed
        * to -x, -y, and -z.
        */
        /**
        * @language zh_CN
        * 当前Vector3 x y z 3个分量取反
        * @version Egret 3.0
        * @platform Web,Native
        */
        Vector3.prototype.negate = function () {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
        };
        /**
        * @language en_US
        * Scales the line segment between(0,0) and the current point to a set
        * length.
        *
        * @param thickness The scaling value. For example, if the current
        * Vector3 object is (0,3,4), and you normalize it to
        * 1, the point returned is at(0,0.6,0.8).
        */
        /**
        * @language zh_CN
        * 当前Vector3标准化
        * @param thickness 默认参数为1，使当前Vector3的长度为thickness 原点(0, 0, 0)到(x, y, z)的距离
        * @version Egret 3.0
        * @platform Web,Native
        */
        Vector3.prototype.normalize = function (thickness) {
            if (thickness === void 0) { thickness = 1; }
            if (this.length != 0) {
                var invLength = thickness / this.length;
                this.x *= invLength;
                this.y *= invLength;
                this.z *= invLength;
                return;
            }
        };
        /**
        * @language en_US
        * Scales the current Vector3 object by a scalar, a magnitude. The
        * Vector3 object's x, y, and z elements are multiplied by the scalar
        * number specified in the parameter. For example, if the vector is
        * scaled by ten, the result is a vector that is ten times longer. The
        * scalar can also change the direction of the vector. Multiplying the
        * vector by a negative number reverses its direction.
        *
        * @param s A multiplier (scalar) used to scale a Vector3 object.
        */
        /**
        * @language zh_CN
        * 当前Vector3扩大s倍
        * @param s 扩大的倍数
        * @version Egret 3.0
        * @platform Web,Native
        */
        Vector3.prototype.scaleBy = function (s) {
            this.x *= s;
            this.y *= s;
            this.z *= s;
        };
        /**
        * @language en_US
        * Sets the members of Vector3 to the specified values
        *
        * @param xa The first element, such as the x coordinate.
        * @param ya The second element, such as the y coordinate.
        * @param za The third element, such as the z coordinate.
        */
        /**
        * @language zh_CN
        * 填充当前Vector3的x, y, z
        * @param xa
        * @param yz
        * @param za
        * @param wz
        * @version Egret 3.0
        * @platform Web,Native
        */
        Vector3.prototype.setTo = function (xa, ya, za, wa) {
            if (wa === void 0) { wa = 1; }
            this.x = xa;
            this.y = ya;
            this.z = za;
            this.w = wa;
        };
        /**
        * @language en_US
        * Subtracts the value of the x, y, and z elements of the current
        * Vector3 object from the values of the x, y, and z elements of
        * another Vector3 object. The <code>subtract()</code> method does not
        * change the current Vector3 object. Instead, this method returns a
        * new Vector3 object with the new values.
        *
        * @param a The Vector3 object to be subtracted from the current
        *          Vector3 object.
        * @returns A new Vector3 object that is the difference between the
        *          current Vector3 and the specified Vector3 object.
        */
        /**
        * @language zh_CN
        * 当前Vector3减去a Vector3 结果返回新实例
        * @param a 减去的Vector3
        * @param target 默认参数为null,如果当前参数为null那么就会new一个新的Vector3返回
        * @returns Vector3 结果返回
        * @version Egret 3.0
        * @platform Web,Native
        */
        Vector3.prototype.subtract = function (a, target) {
            if (target === void 0) { target = null; }
            if (!target) {
                target = new Vector3();
            }
            target.setTo(this.x - a.x, this.y - a.y, this.z - a.z);
            return target;
        };
        /**
        * @language zh_CN
        * 当前Vector3乘other Vector3 结果返回新实例
        * @param a 相乘的Vector3
        * @param target 如果当前参数为null那么就会new一个新的Vector3返回
        * @returns Vector3 结果返回
        * @version Egret 3.0
        * @platform Web,Native
        */
        Vector3.prototype.multiply = function (other, target) {
            if (target === void 0) { target = null; }
            if (!target) {
                target = new Vector3();
            }
            var x0 = this.x;
            var y0 = this.y;
            var z0 = this.z;
            var x1 = other.x;
            var y1 = other.y;
            var z1 = other.z;
            target.setTo(x0 * x1, y0 * y1, z0 * z1);
            return target;
        };
        /**
        * @language zh_CN
        * 当前Vector3除以other Vector3 结果返回新实例
        * @param a 相除的Vector3
        * @param target 如果当前参数为null那么就会new一个新的Vector3返回
        * @returns Vector3 结果返回
        * @version Egret 3.0
        * @platform Web,Native
        */
        Vector3.prototype.divided = function (other, target) {
            if (target === void 0) { target = null; }
            if (!target) {
                target = new Vector3();
            }
            var x0 = this.x;
            var y0 = this.y;
            var z0 = this.z;
            var x1 = other.x;
            var y1 = other.y;
            var z1 = other.z;
            target.setTo(x0 / x1, y0 / y1, z0 / z1);
            return target;
        };
        /**
        * @language zh_CN
        * 计算两个Vector3之间的线性插值，结果为当前对象
        * @param v0 Vector3 1
        * @param v1 Vector3 2
        * @param t 时刻
        * @version Egret 3.0
        * @platform Web,Native
        */
        Vector3.prototype.lerp = function (v0, v1, t) {
            var v0x = v0.x, v0y = v0.y, v0z = v0.z, v0w = v0.w;
            var v1x = v1.x, v1y = v1.y, v1z = v1.z, v1w = v1.w;
            this.x = (v1x - v0x) * t + v0x;
            this.y = (v1y - v0y) * t + v0y;
            this.z = (v1z - v0z) * t + v0z;
            this.w = (v1w - v0w) * t + v0w;
        };
        Vector3.prototype.Dot = function (v0, v1) {
            return v0.x * v1.x + v0.y * v1.y + v0.z * v1.z;
        };
        Vector3.prototype.OrthoNormalVectorFast = function (n, target) {
            if (!target) {
                target = new Vector3();
            }
            var a;
            var k;
            if (Math.abs(n.z) > 0.70710678) {
                // choose p in y-z plane
                a = n.y * n.y + n.z * n.z;
                k = 1.0 / Math.sqrt(a);
                target.x = 0;
                target.y = -n.z * k;
                target.z = n.y * k;
            }
            else {
                // choose p in x-y plane
                a = n.x * n.x + n.y * n.y;
                k = 1.0 / Math.sqrt(a);
                target.x = -n.y * k;
                target.y = n.x * k;
                target.z = 0;
            }
            return target;
        };
        /**
       * @language zh_CN
       * 计算两个Vector3之间的线性插值，结果为当前对象
       * @param lhs Vector3 1
       * @param rhs Vector3 2
       * @param t 时刻
       * @version Egret 3.0
       * @platform Web,Native
       */
        Vector3.prototype.slerp = function (lhs, rhs, t) {
            var lhsMag = Math.sqrt(this.Dot(lhs, lhs));
            var rhsMag = Math.sqrt(this.Dot(rhs, rhs));
            if (lhsMag < 0.00001 || rhsMag < 0.00001) {
                return this.lerp(lhs, rhs, t);
            }
            var lerpedMagnitude = lhsMag + t * (rhsMag - lhsMag);
            var dot = this.Dot(lhs, rhs) / (lhsMag * rhsMag);
            // direction is almost the same
            if (dot > 1.0 - 0.00001) {
                return this.lerp(lhs, rhs, t);
            }
            else if (dot < -1.0 + 0.00001) {
                Vector3.HELP_0.copyFrom(lhs);
                var lhsNorm = Vector3.HELP_0.divide(lhsMag);
                this.OrthoNormalVectorFast(lhsNorm, Vector3.HELP_1);
                var axis = Vector3.HELP_1;
                egret3d.Quaternion.HELP_0.fromAxisAngle(Vector3.HELP_1, 3.1415926 * t * egret3d.MathUtil.RADIANS_TO_DEGREES);
                var m = egret3d.Quaternion.HELP_0.toMatrix3D(egret3d.Matrix4.helpMatrix);
                m.transformVector(lhsNorm, this);
                this.scaleBy(lerpedMagnitude);
                return;
            }
            else {
                lhs.dotProduct;
                this.Cross(lhs, rhs, Vector3.HELP_0);
                var axis = Vector3.HELP_0;
                Vector3.HELP_1.copyFrom(lhs);
                var lhsNorm = Vector3.HELP_1.divide(lhsMag);
                axis.normalize();
                var angle = Math.acos(dot) * t;
                egret3d.Quaternion.HELP_0.fromAxisAngle(axis, angle * egret3d.MathUtil.RADIANS_TO_DEGREES);
                var m = egret3d.Quaternion.HELP_0.toMatrix3D(egret3d.Matrix4.helpMatrix);
                m.transformVector(lhsNorm, this);
                this.scaleBy(lerpedMagnitude);
                return;
            }
        };
        Vector3.prototype.Cross = function (lhs, rhs, target) {
            if (target === void 0) { target = null; }
            if (!target) {
                target = new Vector3();
            }
            target.x = lhs.y * rhs.z - lhs.z * rhs.y;
            target.y = lhs.z * rhs.x - lhs.x * rhs.z;
            target.z = lhs.x * rhs.y - lhs.y * rhs.x;
            return target;
        };
        /**
        * @language zh_CN
        * 当前Vector3以字符串形式返回
        * @returns string
        * @version Egret 3.0
        * @platform Web,Native
        */
        Vector3.prototype.toString = function () {
            return "<" + this.x + ", " + this.y + ", " + this.z + ">";
        };
        /**
        * @language zh_CN
        * 解析字符串为Vector3
        * @param str 格式用空格间隔开，只解析为x,y,z
        * @version Egret 3.0
        * @platform Web,Native
        */
        Vector3.prototype.parsing = function (str) {
            var strS = str.split(" ");
            if (strS.length < 3)
                return;
            this.x = parseFloat(strS[0]);
            this.y = parseFloat(strS[1]);
            this.z = parseFloat(strS[2]);
        };
        /**
         * @language zh_CN
         * 是否相等
         * @param rectangle  比较的对象
         * @returns boolean 相等返回ture
         * @version Egret 3.0
         * @platform Web,Native
         */
        Vector3.prototype.equal = function (other) {
            return !((this.x != other.x) ||
                (this.y != other.y) ||
                (this.z != other.z) ||
                (this.w != other.w));
        };
        return Vector3;
    }());
    /**
    * @language en_US
    * The x axis defined as a Vector3 object with coordinates (1,0,0).
    */
    /**
    * @language zh_CN
    * X轴坐标 (1,0,0).
    * @version Egret 3.0
    * @platform Web,Native
    */
    Vector3.X_AXIS = new Vector3(1, 0, 0);
    /**
    * @language en_US
    * The y axis defined as a Vector3 object with coordinates (0,1,0).
    */
    /**
    * @language zh_CN
    * Y轴坐标 (0,1,0).
    * @version Egret 3.0
    * @platform Web,Native
    */
    Vector3.Y_AXIS = new Vector3(0, 1, 0);
    /**
    * @language en_US
    * The z axis defined as a Vector3 object with coordinates (0,0,1).
    */
    /**
    * @language zh_CN
    * Z轴坐标 (0,0,1).
    * @version Egret 3.0
    * @platform Web,Native
    */
    Vector3.Z_AXIS = new Vector3(0, 0, 1);
    /**
    * @language zh_CN
    * @private
    * @version Egret 3.0
    * @platform Web,Native
    */
    Vector3.HELP_0 = new Vector3();
    /**
    * @language zh_CN
    * @private
    * @version Egret 3.0
    * @platform Web,Native
    */
    Vector3.HELP_1 = new Vector3();
    /**
    * @language zh_CN
    * @private
    * @version Egret 3.0
    * @platform Web,Native
    */
    Vector3.HELP_2 = new Vector3();
    /**
    * @language zh_CN
    * @private
    * @version Egret 3.0
    * @platform Web,Native
    */
    Vector3.HELP_3 = new Vector3();
    egret3d.Vector3 = Vector3;
    __reflect(Vector3.prototype, "egret3d.Vector3");
})(egret3d || (egret3d = {}));
