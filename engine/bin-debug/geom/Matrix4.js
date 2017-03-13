var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @class egret3d.Matrix4
    * @classdesc
    *
    * Matrix4 类表示一个转换矩阵，该矩阵确定三维 (3D) 显示对象的位置和方向。
    * 该矩阵可以执行转换功能，包括平移（沿 x、y 和 z 轴重新定位）、旋转和缩放（调整大小）.
    * Matrix4 类还可以执行透视投影，这会将 3D 坐标空间中的点映射到二维 (2D) 视图.
    * 单一矩阵可以将多个转换组合在一起，并一次性对 3D 显示对象应用这些转换.
    * 例如，可以将一个矩阵应用于 3D 坐标，以便依次执行旋转和平移.
    *
    * @includeExample geom/Matrix4.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Matrix4 = (function () {
        /**
        * @language zh_CN
        * 构造
        * @param datas {number[16]}
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Matrix4(datas) {
            if (datas === void 0) { datas = null; }
            this.length = 16;
            this.rowLength = 4;
            if (datas) {
                this.rawData = datas;
            }
            else
                this.rawData = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        }
        /**
        * @language zh_CN
        * 生成一个注视目标的矩阵.
        * @param eye 眼睛的位置.
        * @param at 目标的位置.
        * @param up 向上的方向.
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.lookAt = function (eye, at, up) {
            if (up === void 0) { up = egret3d.Vector3.Y_AXIS; }
            var data = this.rawData;
            at.subtract(eye, egret3d.Vector3.HELP_0);
            var zaxis = egret3d.Vector3.HELP_0;
            zaxis.normalize();
            var xaxis = up.crossProduct(zaxis, egret3d.Vector3.HELP_1);
            if (xaxis.length < 0.05) {
                xaxis.x = up.y;
                xaxis.y = up.x;
                if (Math.abs(xaxis.x - xaxis.y) < 0.05) {
                    xaxis.x = -up.z;
                    xaxis.y = up.x;
                    xaxis.z = 0;
                }
                else {
                    xaxis.z = 0;
                }
            }
            xaxis.normalize();
            var yaxis = zaxis.crossProduct(xaxis, egret3d.Vector3.HELP_2);
            data[0] = xaxis.x;
            data[1] = yaxis.x;
            data[2] = zaxis.x;
            data[3] = 0;
            data[4] = xaxis.y;
            data[5] = yaxis.y;
            data[6] = zaxis.y;
            data[7] = 0;
            data[8] = xaxis.z;
            data[9] = yaxis.z;
            data[10] = zaxis.z;
            data[11] = 0;
            data[12] = -xaxis.dotProduct(eye);
            data[13] = -yaxis.dotProduct(eye);
            data[14] = -zaxis.dotProduct(eye);
            data[15] = 1;
        };
        /**
        * @language zh_CN
        * 矩阵相乘.
        * @param mat4 相乘的矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.multiply = function (mat4) {
            var a = this.rawData, b = mat4.rawData, r = Matrix4.helpMatrix;
            r[0] = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
            r[1] = a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13];
            r[2] = a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14];
            r[3] = a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15];
            r[4] = a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12];
            r[5] = a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13];
            r[6] = a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14];
            r[7] = a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15];
            r[8] = a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12];
            r[9] = a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13];
            r[10] = a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14];
            r[11] = a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15];
            r[12] = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12];
            r[13] = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13];
            r[14] = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14];
            r[15] = a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15];
            a[0] = r[0];
            a[1] = r[1];
            a[2] = r[2];
            a[3] = r[3];
            a[4] = r[4];
            a[5] = r[5];
            a[6] = r[6];
            a[7] = r[7];
            a[8] = r[8];
            a[9] = r[9];
            a[10] = r[10];
            a[11] = r[11];
            a[12] = r[12];
            a[13] = r[13];
            a[14] = r[14];
            a[15] = r[15];
        };
        /**
        * @private
        * @language zh_CN
        */
        Matrix4.prototype.perspectiveB = function (fov, aspect, near, far) {
            var y = Math.tan(fov * Math.PI / 360) * near;
            var x = y * aspect;
            return this.frustum(-x, x, -y, y, near, far);
        };
        /**
        * @private
        * @language zh_CN
        */
        Matrix4.prototype.frustum = function (l, r, b, t, n, f) {
            var m = this.rawData;
            m[0] = 2 * n / (r - l);
            m[1] = 0;
            m[2] = (r + l) / (r - l);
            m[3] = 0;
            m[4] = 0;
            m[5] = 2 * n / (t - b);
            m[6] = (t + b) / (t - b);
            m[7] = 0;
            m[8] = 0;
            m[9] = 0;
            m[10] = -(f + n) / (f - n);
            m[11] = -2 * f * n / (f - n);
            m[12] = 0;
            m[13] = 0;
            m[14] = -1;
            m[15] = 0;
            return this;
        };
        //public ortho(l: number, r: number, b: number, t: number, n: number, f: number): Matrix4 {
        //    var m = data;
        //    m[0] = 2 / (r - l);
        //    m[1] = 0;
        //    m[2] = 0;
        //    m[3] = -(r + l) / (r - l);
        //    m[4] = 0;
        //    m[5] = 2 / (t - b);
        //    m[6] = 0;
        //    m[7] = -(t + b) / (t - b);
        //    m[8] = 0;
        //    m[9] = 0;
        //    m[10] = -2 / (f - n);
        //    m[11] = -(f + n) / (f - n);
        //    m[12] = 0;
        //    m[13] = 0;
        //    m[14] = 0;
        //    m[15] = 1;
        //    return this;
        //}
        /**
        * @language zh_CN
        * 生成一个透视投影矩阵.
        * @param fovy 观察时y 轴方向的角度，就是观察范围夹角。
        * @param aspect 横纵比，在视空间宽度除以高度.
        * @param zn 近裁剪面位置Z值.
        * @param zf 远裁剪面位置Z值.
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.perspective = function (fovy, aspect, zn, zf) {
            var data = this.rawData;
            var angle = fovy * (Math.PI / 180.0);
            var yScale = Math.tan((Math.PI - angle) / 2.0);
            var xScale = yScale / aspect;
            data[0] = xScale;
            data[1] = 0;
            data[2] = 0;
            data[3] = 0;
            data[4] = 0;
            data[5] = yScale;
            data[6] = 0;
            data[7] = 0;
            data[8] = 0;
            data[9] = 0;
            data[10] = zf / (zf - zn);
            data[11] = 1;
            data[12] = 0;
            data[13] = 0;
            data[14] = -zn * zf / (zf - zn);
            data[15] = 0;
        };
        /**
        * @language zh_CN
        * 生成一个透视投影矩阵.
        * @param w 屏幕的宽度。
        * @param h 屏幕的高度.
        * @param zn 近裁剪面位置Z值.
        * @param zf 远裁剪面位置Z值.
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.ortho = function (w, h, zn, zf) {
            var data = this.rawData;
            data[0] = 2 / w;
            data[1] = 0;
            data[2] = 0;
            data[3] = 0;
            data[4] = 0;
            data[5] = 2 / h;
            data[6] = 0;
            data[7] = 0;
            data[8] = 0;
            data[9] = 0;
            data[10] = 1 / (zf - zn);
            data[11] = 0;
            data[12] = 0;
            data[13] = 0;
            data[14] = zn / (zn - zf);
            data[15] = 1;
        };
        /**
        * @language zh_CN
        * 生成一个透视投影矩阵.
        * @param l 观察时X轴最小值.
        * @param r 观察时X轴最大值.
        * @param b 观察时Y轴最小值。
        * @param t 观察时Y轴最大值.
        * @param zn 近裁剪面位置Z值.
        * @param zf 远裁剪面位置Z值.
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.orthoOffCenter = function (l, r, b, t, zn, zf) {
            var data = this.rawData;
            data[0] = 2 / (r - l);
            data[1] = 0;
            data[2] = 0;
            data[3] = 0;
            data[4] = 0;
            data[5] = 2 / (t - b);
            data[6] = 0;
            data[7] = 0;
            data[8] = 0;
            data[9] = 0;
            data[10] = 1.0 / (zf - zn);
            data[11] = 0;
            data[12] = (l + r) / (l - r);
            data[13] = (t + b) / (b - t);
            data[14] = zn / (zn - zf);
            data[15] = 1;
        };
        /**
        * @language zh_CN
        * 计算出一个方向变换到另一个方向的旋转矩阵
        * @param fromDirection 初始方向
        * @param toDirection 变换后的方向
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.fromToRotation = function (fromDirection, toDirection) {
            var data = this.rawData;
            var EPSILON = 0.000001;
            var v = egret3d.Vector3.HELP_0;
            toDirection.crossProduct(fromDirection, v);
            var e = toDirection.dotProduct(fromDirection);
            if (e > 1.0 - EPSILON) {
                this.identity();
            }
            else if (3 < -1.0 + EPSILON) {
                var up = egret3d.Vector3.HELP_1;
                var left = egret3d.Vector3.HELP_2;
                var invlen = 0;
                var fxx = void 0, fyy = void 0, fzz = void 0, fxy = void 0, fxz = void 0, fyz = void 0;
                var uxx = void 0, uyy = void 0, uzz = void 0, uxy = void 0, uxz = void 0, uyz = void 0;
                var lxx = void 0, lyy = void 0, lzz = void 0, lxy = void 0, lxz = void 0, lyz = void 0;
                left.x = 0.0;
                left.y = fromDirection.z;
                left.z = -fromDirection.y;
                if (left.dotProduct(left) < EPSILON) {
                    left.x = -fromDirection.z;
                    left.y = 0.0;
                    left.z = fromDirection.x;
                }
                /* normalize "left" */
                invlen = 1.0 / Math.sqrt(left.dotProduct(left));
                left[0] *= invlen;
                left[1] *= invlen;
                left[2] *= invlen;
                left.crossProduct(fromDirection, up);
                fxx = -fromDirection.x * fromDirection.x;
                fyy = -fromDirection.y * fromDirection.y;
                fzz = -fromDirection.z * fromDirection.z;
                fxy = -fromDirection.x * fromDirection.y;
                fxz = -fromDirection.x * fromDirection.z;
                fyz = -fromDirection.y * fromDirection.z;
                uxx = up.x * up.x;
                uyy = up.y * up.y;
                uzz = up.z * up.z;
                uxy = up.x * up.y;
                uxz = up.x * up.z;
                uyz = up.y * up.z;
                lxx = -left.x * left.x;
                lyy = -left.y * left.y;
                lzz = -left.z * left.z;
                lxy = -left.x * left.y;
                lxz = -left.x * left.z;
                lyz = -left.y * left.z;
                data[0] = fxx + uxx + lxx;
                data[1] = fxy + uxy + lxy;
                data[2] = fxz + uxz + lxz;
                data[4] = data[1];
                data[5] = fyy + uyy + lyy;
                data[6] = fyz + uyz + lyz;
                data[8] = data[2];
                data[9] = data[6];
                data[10] = fzz + uzz + lzz;
                data[3] = 0;
                data[7] = 0;
                data[11] = 0;
                data[15] = 1;
            }
            else {
                var hvx = void 0, hvz = void 0, hvxy = void 0, hvxz = void 0, hvyz = void 0;
                var h = (1.0 - e) / v.dotProduct(v);
                hvx = h * v.x;
                hvz = h * v.z;
                hvxy = hvx * v.y;
                hvxz = hvx * v.z;
                hvyz = hvz * v.y;
                data[0] = e + hvx * v.x;
                data[1] = hvxy - v.z;
                data[2] = hvxz + v.y;
                data[4] = hvxy + v.z;
                data[5] = e + h * v.y * v.y;
                data[6] = hvyz - v.x;
                data[8] = hvxz - v.y;
                data[9] = hvyz + v.x;
                data[10] = e + hvz * v.z;
                data[3] = 0;
                data[7] = 0;
                data[11] = 0;
                data[15] = 1;
            }
        };
        /**
        * @language zh_CN
        * 计算出一个方向变换到另一个方向的旋转矩阵
        * @param fromDirection 初始方向
        * @param toDirection 变换后的方向
        * @param target 计算出的旋转矩阵 默认为null 结果会返回
        * @returns Matrix4 计算出的旋转矩阵 如果 target为null 就会创建新实例返回
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.fromToRotation = function (fromDirection, toDirection, target) {
            if (target === void 0) { target = null; }
            if (!target) {
                target = new Matrix4();
            }
            target.fromToRotation(fromDirection, toDirection);
            return target;
        };
        /**
        * @language zh_CN
        * 通过将当前 Matrix4 对象与另一个 Matrix4 对象相乘来前置一个矩阵
        * @param lhs 目标矩阵.
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.append = function (lhs) {
            var data = this.rawData;
            var m111 = data[0], m121 = data[4], m131 = data[8], m141 = data[12], m112 = data[1], m122 = data[5], m132 = data[9], m142 = data[13], m113 = data[2], m123 = data[6], m133 = data[10], m143 = data[14], m114 = data[3], m124 = data[7], m134 = data[11], m144 = data[15];
            data[0] = m111 * lhs.rawData[0] + m112 * lhs.rawData[4] + m113 * lhs.rawData[8] + m114 * lhs.rawData[12];
            data[1] = m111 * lhs.rawData[1] + m112 * lhs.rawData[5] + m113 * lhs.rawData[9] + m114 * lhs.rawData[13];
            data[2] = m111 * lhs.rawData[2] + m112 * lhs.rawData[6] + m113 * lhs.rawData[10] + m114 * lhs.rawData[14];
            data[3] = m111 * lhs.rawData[3] + m112 * lhs.rawData[7] + m113 * lhs.rawData[11] + m114 * lhs.rawData[15];
            data[4] = m121 * lhs.rawData[0] + m122 * lhs.rawData[4] + m123 * lhs.rawData[8] + m124 * lhs.rawData[12];
            data[5] = m121 * lhs.rawData[1] + m122 * lhs.rawData[5] + m123 * lhs.rawData[9] + m124 * lhs.rawData[13];
            data[6] = m121 * lhs.rawData[2] + m122 * lhs.rawData[6] + m123 * lhs.rawData[10] + m124 * lhs.rawData[14];
            data[7] = m121 * lhs.rawData[3] + m122 * lhs.rawData[7] + m123 * lhs.rawData[11] + m124 * lhs.rawData[15];
            data[8] = m131 * lhs.rawData[0] + m132 * lhs.rawData[4] + m133 * lhs.rawData[8] + m134 * lhs.rawData[12];
            data[9] = m131 * lhs.rawData[1] + m132 * lhs.rawData[5] + m133 * lhs.rawData[9] + m134 * lhs.rawData[13];
            data[10] = m131 * lhs.rawData[2] + m132 * lhs.rawData[6] + m133 * lhs.rawData[10] + m134 * lhs.rawData[14];
            data[11] = m131 * lhs.rawData[3] + m132 * lhs.rawData[7] + m133 * lhs.rawData[11] + m134 * lhs.rawData[15];
            data[12] = m141 * lhs.rawData[0] + m142 * lhs.rawData[4] + m143 * lhs.rawData[8] + m144 * lhs.rawData[12];
            data[13] = m141 * lhs.rawData[1] + m142 * lhs.rawData[5] + m143 * lhs.rawData[9] + m144 * lhs.rawData[13];
            data[14] = m141 * lhs.rawData[2] + m142 * lhs.rawData[6] + m143 * lhs.rawData[10] + m144 * lhs.rawData[14];
            data[15] = m141 * lhs.rawData[3] + m142 * lhs.rawData[7] + m143 * lhs.rawData[11] + m144 * lhs.rawData[15];
        };
        /**
        * @language zh_CN
        * 矩阵相加.
        * @param lhs 目标矩阵.
        * @returns Matrix4 相加后的结果.
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.add = function (lhs) {
            var data = this.rawData;
            var m111 = data[0], m121 = data[4], m131 = data[8], m141 = data[12], m112 = data[1], m122 = data[5], m132 = data[9], m142 = data[13], m113 = data[2], m123 = data[6], m133 = data[10], m143 = data[14], m114 = data[3], m124 = data[7], m134 = data[11], m144 = data[15], m211 = lhs.rawData[0], m221 = lhs.rawData[4], m231 = lhs.rawData[8], m241 = lhs.rawData[12], m212 = lhs.rawData[1], m222 = lhs.rawData[5], m232 = lhs.rawData[9], m242 = lhs.rawData[13], m213 = lhs.rawData[2], m223 = lhs.rawData[6], m233 = lhs.rawData[10], m243 = lhs.rawData[14], m214 = lhs.rawData[3], m224 = lhs.rawData[7], m234 = lhs.rawData[11], m244 = lhs.rawData[15];
            data[0] = m111 + m211;
            data[1] = m112 + m212;
            data[2] = m113 + m213;
            data[3] = m114 + m214;
            data[4] = m121 + m221;
            data[5] = m122 + m222;
            data[6] = m123 + m223;
            data[7] = m124 + m224;
            data[8] = m131 + m231;
            data[9] = m132 + m232;
            data[10] = m133 + m233;
            data[11] = m134 + m234;
            data[12] = m141 + m241;
            data[13] = m142 + m242;
            data[14] = m143 + m243;
            data[15] = m144 + m244;
            return this;
        };
        /**
        * @language zh_CN
        * 矩阵相减.
        * @param lhs 目标矩阵.
        * @returns Matrix4 相加减的结果.
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.sub = function (lhs) {
            var data = this.rawData;
            var m111 = data[0], m121 = data[4], m131 = data[8], m141 = data[12], m112 = data[1], m122 = data[5], m132 = data[9], m142 = data[13], m113 = data[2], m123 = data[6], m133 = data[10], m143 = data[14], m114 = data[3], m124 = data[7], m134 = data[11], m144 = data[15], m211 = lhs.rawData[0], m221 = lhs.rawData[4], m231 = lhs.rawData[8], m241 = lhs.rawData[12], m212 = lhs.rawData[1], m222 = lhs.rawData[5], m232 = lhs.rawData[9], m242 = lhs.rawData[13], m213 = lhs.rawData[2], m223 = lhs.rawData[6], m233 = lhs.rawData[10], m243 = lhs.rawData[14], m214 = lhs.rawData[3], m224 = lhs.rawData[7], m234 = lhs.rawData[11], m244 = lhs.rawData[15];
            data[0] = m111 - m211;
            data[1] = m112 - m212;
            data[2] = m113 - m213;
            data[3] = m114 - m214;
            data[4] = m121 - m221;
            data[5] = m122 - m222;
            data[6] = m123 - m223;
            data[7] = m124 - m224;
            data[8] = m131 - m231;
            data[9] = m132 - m232;
            data[10] = m133 - m233;
            data[11] = m134 - m234;
            data[12] = m141 - m241;
            data[13] = m142 - m242;
            data[14] = m143 - m243;
            data[15] = m144 - m244;
            return this;
        };
        /**
        * @language zh_CN
        * 矩阵乘分量.
        * @param v 该矩阵会乘以这个值
        * @returns Matrix4 返回一个相乘后的结果 矩阵.
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.mult = function (v) {
            var data = this.rawData;
            data[0] *= v;
            data[1] *= v;
            data[2] *= v;
            data[3] *= v;
            data[4] *= v;
            data[5] *= v;
            data[6] *= v;
            data[7] *= v;
            data[8] *= v;
            data[9] *= v;
            data[10] *= v;
            data[11] *= v;
            data[12] *= v;
            data[13] *= v;
            data[14] *= v;
            data[15] *= v;
            return this;
        };
        /**
        * @language zh_CN
        * 创建一个欧拉旋转矩阵.
        * @param x 绕x轴旋转角度.
        * @param y 绕y轴旋转角度.
        * @param z 绕z轴旋转角度.
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.rotation = function (x, y, z) {
            egret3d.MathUtil.CALCULATION_QUATERNION.fromEulerAngles(x, y, z);
            this.makeTransform(Matrix4.position_000, Matrix4.scale_111, egret3d.MathUtil.CALCULATION_QUATERNION);
        };
        /**
       * @language zh_CN
       * 给当前矩阵追加一个方向角旋转 (按axis轴旋转degrees角度创建出来的矩阵)
       * @param degrees 旋转角度.
       * @param axis 绕axis轴旋转角度
       * @version Egret 3.0
       * @platform Web,Native
       */
        Matrix4.prototype.appendRotation = function (degrees, axis) {
            var m = Matrix4.getAxisRotation(axis.x, axis.y, axis.z, degrees);
            this.append(m);
        };
        /**
        * @language zh_CN
        * 根据坐标轴和旋转角，创建矩阵 (按axis轴旋转degrees角度创建出来的矩阵)
        * @param degrees 旋转角度.
        * @param axis 绕axis轴旋转角度.axis需要指定为x/y/z之间的一个轴的朝向
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.createByRotation = function (degrees, axis) {
            var tmp = egret3d.MathUtil.CALCULATION_MATRIX;
            var s, c;
            var angle = degrees * egret3d.MathUtil.DEGREES_TO_RADIANS;
            s = Math.sin(angle);
            c = Math.cos(angle);
            if (axis.x == 1) {
                tmp.rawData[0] = 1.0;
                tmp.rawData[1] = 0.0;
                tmp.rawData[2] = 0.0;
                tmp.rawData[3] = 0.0;
                tmp.rawData[4] = 0.0;
                tmp.rawData[5] = c;
                tmp.rawData[6] = s;
                tmp.rawData[7] = 0.0;
                tmp.rawData[8] = 0.0;
                tmp.rawData[9] = -s;
                tmp.rawData[10] = c;
                tmp.rawData[11] = 0.0;
                tmp.rawData[12] = 0.0;
                tmp.rawData[13] = 0.0;
                tmp.rawData[14] = 0.0;
                tmp.rawData[15] = 1.0;
            }
            if (axis.y == 1) {
                tmp.rawData[0] = c;
                tmp.rawData[1] = 0.0;
                tmp.rawData[2] = -s;
                tmp.rawData[3] = 0.0;
                tmp.rawData[4] = 0.0;
                tmp.rawData[5] = 1.0;
                tmp.rawData[6] = 0.0;
                tmp.rawData[7] = 0.0;
                tmp.rawData[8] = s;
                tmp.rawData[9] = 0.0;
                tmp.rawData[10] = c;
                tmp.rawData[11] = 0.0;
                tmp.rawData[12] = 0.0;
                tmp.rawData[13] = 0.0;
                tmp.rawData[14] = 0.0;
                tmp.rawData[15] = 1.0;
            }
            if (axis.z == 1) {
                tmp.rawData[0] = c;
                tmp.rawData[1] = s;
                tmp.rawData[2] = 0.0;
                tmp.rawData[3] = 0.0;
                tmp.rawData[4] = -s;
                tmp.rawData[5] = c;
                tmp.rawData[6] = 0.0;
                tmp.rawData[7] = 0.0;
                tmp.rawData[8] = 0.0;
                tmp.rawData[9] = 0.0;
                tmp.rawData[10] = 1.0;
                tmp.rawData[11] = 0.0;
                tmp.rawData[12] = 0.0;
                tmp.rawData[13] = 0.0;
                tmp.rawData[14] = 0.0;
                tmp.rawData[15] = 1.0;
            }
            this.append(tmp);
        };
        /**
        * @language zh_CN
        * 追加三轴缩放值
        * @param xScale x轴缩放
        * @param yScale y轴缩放
        * @param zScale z轴缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.appendScale = function (xScale, yScale, zScale) {
            Matrix4.helpMatrix.createByScale(xScale, yScale, zScale);
            this.append(Matrix4.helpMatrix);
        };
        /**
        * @language zh_CN
        * 生成一个缩放矩阵，其他的属性会被重置
        * @param xScale x轴缩放
        * @param yScale y轴缩放
        * @param zScale z轴缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.createByScale = function (xScale, yScale, zScale) {
            var data = this.rawData;
            data[0] = xScale;
            data[1] = 0.0;
            data[2] = 0.0;
            data[3] = 0.0;
            data[4] = 0.0;
            data[5] = yScale;
            data[6] = 0.0;
            data[7] = 0.0;
            data[8] = 0.0;
            data[9] = 0.0;
            data[10] = zScale;
            data[11] = 0.0;
            data[12] = 0.0;
            data[13] = 0.0;
            data[14] = 0.0;
            data[15] = 1.0;
        };
        /**
        * @language zh_CN
        * 加上一个平移矩阵
        * @param x x轴坐标
        * @param y y轴坐标
        * @param z z轴坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.appendTranslation = function (x, y, z) {
            var data = this.rawData;
            data[12] += x;
            data[13] += y;
            data[14] += z;
        };
        /**
        * @language zh_CN
        * 返回一个当前矩阵的克隆矩阵
        * @returns Matrix4 克隆后的矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.clone = function () {
            var ret = new Matrix4();
            ret.copyFrom(this);
            return ret;
        };
        /**
        * @language zh_CN
        * 给当前矩阵其中一行赋值
        * @param row 拷贝的行
        * @param vector3D 拷贝的值
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.copyRowFrom = function (row, vector3D) {
            var data = this.rawData;
            switch (row) {
                case 0:
                    data[0] = vector3D.x;
                    data[1] = vector3D.y;
                    data[2] = vector3D.z;
                    data[3] = vector3D.w;
                    break;
                case 1:
                    data[4] = vector3D.x;
                    data[5] = vector3D.y;
                    data[6] = vector3D.z;
                    data[7] = vector3D.w;
                    break;
                case 2:
                    data[8] = vector3D.x;
                    data[9] = vector3D.y;
                    data[10] = vector3D.z;
                    data[11] = vector3D.w;
                    break;
                case 3:
                    data[12] = vector3D.x;
                    data[13] = vector3D.y;
                    data[14] = vector3D.z;
                    data[15] = vector3D.w;
                    break;
                default:
            }
        };
        /**
        * @language zh_CN
        * 拷贝矩阵中的其中一行 把值存在vector3D.
        * @param row 拷贝的行
        * @param vector3D 拷贝存值目标
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.copyRowTo = function (row, vector3D) {
            var data = this.rawData;
            switch (row) {
                case 0:
                    vector3D.x = data[0];
                    vector3D.y = data[1];
                    vector3D.z = data[2];
                    vector3D.w = data[3];
                    break;
                case 1:
                    vector3D.x = data[4];
                    vector3D.y = data[5];
                    vector3D.z = data[6];
                    vector3D.w = data[7];
                    break;
                case 2:
                    vector3D.x = data[8];
                    vector3D.y = data[9];
                    vector3D.z = data[10];
                    vector3D.w = data[11];
                    break;
                case 3:
                    vector3D.x = data[12];
                    vector3D.y = data[13];
                    vector3D.z = data[14];
                    vector3D.w = data[15];
                    break;
                default:
            }
        };
        /**
        * @language zh_CN
        * 把一个矩阵的值赋给当前矩阵.
        * @param sourceMatrix3D 源矩阵.
        * @returns 返回当前矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.copyFrom = function (sourceMatrix3D) {
            var data = this.rawData;
            data[0] = sourceMatrix3D.rawData[0];
            data[1] = sourceMatrix3D.rawData[1];
            data[2] = sourceMatrix3D.rawData[2];
            data[3] = sourceMatrix3D.rawData[3];
            data[4] = sourceMatrix3D.rawData[4];
            data[5] = sourceMatrix3D.rawData[5];
            data[6] = sourceMatrix3D.rawData[6];
            data[7] = sourceMatrix3D.rawData[7];
            data[8] = sourceMatrix3D.rawData[8];
            data[9] = sourceMatrix3D.rawData[9];
            data[10] = sourceMatrix3D.rawData[10];
            data[11] = sourceMatrix3D.rawData[11];
            data[12] = sourceMatrix3D.rawData[12];
            data[13] = sourceMatrix3D.rawData[13];
            data[14] = sourceMatrix3D.rawData[14];
            data[15] = sourceMatrix3D.rawData[15];
            return this;
        };
        /**
        * @language zh_CN
        * 把一个 float 数组赋值给当前矩阵.
        * @param vector 源数组.
        * @param index 从数组的index 开始copy.
        * @param transpose 是否转置当前矩阵.
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.copyRawDataFrom = function (vector, index, transpose) {
            if (index === void 0) { index = 0; }
            if (transpose === void 0) { transpose = false; }
            var data = this.rawData;
            data[0] = vector[0 + index];
            data[1] = vector[1 + index];
            data[2] = vector[2 + index];
            data[3] = vector[3 + index];
            data[4] = vector[4 + index];
            data[5] = vector[5 + index];
            data[6] = vector[6 + index];
            data[7] = vector[7 + index];
            data[8] = vector[8 + index];
            data[9] = vector[9 + index];
            data[10] = vector[10 + index];
            data[11] = vector[11 + index];
            data[12] = vector[12 + index];
            data[13] = vector[13 + index];
            data[14] = vector[14 + index];
            data[15] = vector[15 + index];
        };
        /**
        * @language zh_CN
        * 把当前矩阵的值拷贝给一个 float 数组.
        * @param vector 目标数组.
        * @param index 从数组的index 开始copy.
        * @param transpose 是否转置当前矩阵.
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.copyRawDataTo = function (vector, index, transpose) {
            if (index === void 0) { index = 0; }
            if (transpose === void 0) { transpose = false; }
            var data = this.rawData;
            vector[0 + index] = data[0];
            vector[1 + index] = data[1];
            vector[2 + index] = data[2];
            vector[3 + index] = data[3];
            vector[4 + index] = data[4];
            vector[5 + index] = data[5];
            vector[6 + index] = data[6];
            vector[7 + index] = data[7];
            vector[8 + index] = data[8];
            vector[9 + index] = data[9];
            vector[10 + index] = data[10];
            vector[11 + index] = data[11];
            vector[12 + index] = data[12];
            vector[13 + index] = data[13];
            vector[14 + index] = data[14];
            vector[15 + index] = data[15];
        };
        /**
        * @language zh_CN
        * 给当前矩阵的某一列 赋值
        * @param col 列
        * @param vector3D 值来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.copyColFrom = function (col, vector3D) {
            var data = this.rawData;
            switch (col) {
                case 0:
                    data[0] = vector3D.x;
                    data[4] = vector3D.y;
                    data[8] = vector3D.z;
                    data[12] = vector3D.w;
                    break;
                case 1:
                    data[1] = vector3D.x;
                    data[5] = vector3D.y;
                    data[9] = vector3D.z;
                    data[13] = vector3D.w;
                    break;
                case 2:
                    data[2] = vector3D.x;
                    data[6] = vector3D.y;
                    data[10] = vector3D.z;
                    data[14] = vector3D.w;
                    break;
                case 3:
                    data[3] = vector3D.x;
                    data[7] = vector3D.y;
                    data[11] = vector3D.z;
                    data[15] = vector3D.w;
                    break;
                default:
                    new Error("no more raw!");
            }
        };
        /**
        * @language zh_CN
        * 拷贝当前矩阵的某一列
        * @param col 列
        * @param vector3D 拷贝目标
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.copyColTo = function (col, vector3D) {
            var data = this.rawData;
            switch (col) {
                case 0:
                    vector3D.x = data[0];
                    vector3D.y = data[4];
                    vector3D.z = data[8];
                    vector3D.w = data[12];
                    break;
                case 1:
                    vector3D.x = data[1];
                    vector3D.y = data[5];
                    vector3D.z = data[9];
                    vector3D.w = data[13];
                    break;
                case 2:
                    vector3D.x = data[2];
                    vector3D.y = data[6];
                    vector3D.z = data[10];
                    vector3D.w = data[14];
                    break;
                case 3:
                    vector3D.x = data[3];
                    vector3D.y = data[7];
                    vector3D.z = data[11];
                    vector3D.w = data[15];
                    break;
                default:
                    new Error("no more raw!");
            }
        };
        /**
        * @language zh_CN
        * 拷贝当前矩阵
        * @param dest 拷贝目标
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.copyToMatrix3D = function (dest) {
            dest.rawData = this.rawData.slice(0);
        };
        /**
        * @language zh_CN
        * 分解当前矩阵
        * @param orientationStyle 分解类型 默认为 Orientation3D.EULER_ANGLES
        * @see egret3d.Orientation3D.AXIS_ANGLE
        * @see egret3d.Orientation3D.EULER_ANGLES
        * @see egret3d.Orientation3D.QUATERNION
        * @returns Vector3[3] pos rot scale
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.decompose = function (orientationStyle, target) {
            if (orientationStyle === void 0) { orientationStyle = "eulerAngles"; }
            if (target === void 0) { target = null; }
            var q = egret3d.MathUtil.CALCULATION_QUATERNION;
            var vec = target ? target : Matrix4.prs;
            this.copyRawDataTo(Matrix4.helpMatrix.rawData);
            var mr = Matrix4.helpMatrix.rawData;
            var pos = vec[0];
            pos.x = mr[12];
            pos.y = mr[13];
            pos.z = mr[14];
            mr[12] = 0;
            mr[13] = 0;
            mr[14] = 0;
            var scale = vec[2];
            scale.x = Math.sqrt(mr[0] * mr[0] + mr[1] * mr[1] + mr[2] * mr[2]);
            scale.y = Math.sqrt(mr[4] * mr[4] + mr[5] * mr[5] + mr[6] * mr[6]);
            scale.z = Math.sqrt(mr[8] * mr[8] + mr[9] * mr[9] + mr[10] * mr[10]);
            if (mr[0] * (mr[5] * mr[10] - mr[6] * mr[9]) - mr[1] * (mr[4] * mr[10] - mr[6] * mr[8]) + mr[2] * (mr[4] * mr[9] - mr[5] * mr[8]) < 0)
                scale.z = -scale.z;
            mr[0] /= scale.x;
            mr[1] /= scale.x;
            mr[2] /= scale.x;
            mr[4] /= scale.y;
            mr[5] /= scale.y;
            mr[6] /= scale.y;
            mr[8] /= scale.z;
            mr[9] /= scale.z;
            mr[10] /= scale.z;
            var rot = vec[1];
            switch (orientationStyle) {
                case egret3d.Orientation3D.AXIS_ANGLE:
                    rot.w = Math.acos((mr[0] + mr[5] + mr[10] - 1) / 2);
                    var len = Math.sqrt((mr[6] - mr[9]) * (mr[6] - mr[9]) + (mr[8] - mr[2]) * (mr[8] - mr[2]) + (mr[1] - mr[4]) * (mr[1] - mr[4]));
                    rot.x = (mr[6] - mr[9]) / len;
                    rot.y = (mr[8] - mr[2]) / len;
                    rot.z = (mr[1] - mr[4]) / len;
                    break;
                case egret3d.Orientation3D.QUATERNION:
                    var tr = mr[0] + mr[5] + mr[10];
                    if (tr > 0) {
                        rot.w = Math.sqrt(1 + tr) / 2;
                        rot.x = (mr[6] - mr[9]) / (4 * rot.w);
                        rot.y = (mr[8] - mr[2]) / (4 * rot.w);
                        rot.z = (mr[1] - mr[4]) / (4 * rot.w);
                    }
                    else if ((mr[0] > mr[5]) && (mr[0] > mr[10])) {
                        rot.x = Math.sqrt(1 + mr[0] - mr[5] - mr[10]) / 2;
                        rot.w = (mr[6] - mr[9]) / (4 * rot.x);
                        rot.y = (mr[1] + mr[4]) / (4 * rot.x);
                        rot.z = (mr[8] + mr[2]) / (4 * rot.x);
                    }
                    else if (mr[5] > mr[10]) {
                        rot.y = Math.sqrt(1 + mr[5] - mr[0] - mr[10]) / 2;
                        rot.x = (mr[1] + mr[4]) / (4 * rot.y);
                        rot.w = (mr[8] - mr[2]) / (4 * rot.y);
                        rot.z = (mr[6] + mr[9]) / (4 * rot.y);
                    }
                    else {
                        rot.z = Math.sqrt(1 + mr[10] - mr[0] - mr[5]) / 2;
                        rot.x = (mr[8] + mr[2]) / (4 * rot.z);
                        rot.y = (mr[6] + mr[9]) / (4 * rot.z);
                        rot.w = (mr[1] - mr[4]) / (4 * rot.z);
                    }
                    break;
                case egret3d.Orientation3D.EULER_ANGLES:
                    var tr = mr[0] + mr[5] + mr[10];
                    if (tr > 0) {
                        q.w = Math.sqrt(1 + tr) / 2;
                        q.x = (mr[6] - mr[9]) / (4 * q.w);
                        q.y = (mr[8] - mr[2]) / (4 * q.w);
                        q.z = (mr[1] - mr[4]) / (4 * q.w);
                    }
                    else if ((mr[0] > mr[5]) && (mr[0] > mr[10])) {
                        q.x = Math.sqrt(1 + mr[0] - mr[5] - mr[10]) / 2;
                        q.w = (mr[6] - mr[9]) / (4 * q.x);
                        q.y = (mr[1] + mr[4]) / (4 * q.x);
                        q.z = (mr[8] + mr[2]) / (4 * q.x);
                    }
                    else if (mr[5] > mr[10]) {
                        rot.y = Math.sqrt(1 + mr[5] - mr[0] - mr[10]) / 2;
                        q.x = (mr[1] + mr[4]) / (4 * q.y);
                        q.w = (mr[8] - mr[2]) / (4 * q.y);
                        q.z = (mr[6] + mr[9]) / (4 * q.y);
                    }
                    else {
                        q.z = Math.sqrt(1 + mr[10] - mr[0] - mr[5]) / 2;
                        q.x = (mr[8] + mr[2]) / (4 * q.z);
                        q.y = (mr[6] + mr[9]) / (4 * q.z);
                        q.w = (mr[1] - mr[4]) / (4 * q.z);
                    }
                    q.toEulerAngles(rot);
                    break;
            }
            vec[0] = pos;
            vec[1] = rot;
            vec[2] = scale;
            return vec;
        };
        /**
        * @language zh_CN
        * 当前矩阵变换一个向量
        * @param v 要变换的向量
        * @param target 默认为 null 如果当前参数为null那么就会new一个新的Vector3返回
        * @returns Vector3 变换后的向量
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.deltaTransformVector = function (v, target) {
            if (target === void 0) { target = null; }
            if (!target) {
                target = new egret3d.Vector3();
            }
            var data = this.rawData;
            var x = v.x;
            var y = v.y;
            var z = v.z;
            target.x = x * data[0] + y * data[4] + z * data[8];
            target.y = x * data[1] + y * data[5] + z * data[9];
            target.z = x * data[2] + y * data[6] + z * data[10];
            target.w = x * data[3] + y * data[7] + z * data[11];
            return target;
        };
        /**
        * @language zh_CN
        * 单位化当前矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.identity = function () {
            var data = this.rawData;
            data[1] = 0;
            data[2] = 0;
            data[3] = 0;
            data[4] = 0;
            data[6] = 0;
            data[7] = 0;
            data[8] = 0;
            data[9] = 0;
            data[11] = 0;
            data[12] = 0;
            data[13] = 0;
            data[14] = 0;
            data[0] = 1;
            data[5] = 1;
            data[10] = 1;
            data[15] = 1;
        };
        /**
        * @language zh_CN
        * 填充当前矩阵
        * @param value 填充的值
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.fill = function (value) {
            var data = this.rawData;
            data[1] = value;
            data[2] = value;
            data[3] = value;
            data[4] = value;
            data[6] = value;
            data[7] = value;
            data[8] = value;
            data[9] = value;
            data[11] = value;
            data[12] = value;
            data[13] = value;
            data[14] = value;
            data[0] = value;
            data[5] = value;
            data[10] = value;
            data[15] = value;
        };
        /**
        * @language zh_CN
        * 当前矩阵求逆
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.invers33 = function () {
            /// Invert a 3x3 using cofactors.  This is about 8 times faster than
            /// the Numerical Recipes code which uses Gaussian elimination.
            var data = this.rawData;
            var rkInverse_00 = data[5] * data[10] - data[9] * data[6];
            var rkInverse_01 = data[8] * data[6] - data[4] * data[10];
            var rkInverse_02 = data[4] * data[9] - data[8] * data[5];
            var rkInverse_10 = data[9] * data[2] - data[1] * data[10];
            var rkInverse_11 = data[0] * data[10] - data[8] * data[2];
            var rkInverse_12 = data[8] * data[1] - data[0] * data[9];
            var rkInverse_20 = data[1] * data[6] - data[5] * data[2];
            var rkInverse_21 = data[4] * data[2] - data[0] * data[6];
            var rkInverse_22 = data[0] * data[5] - data[4] * data[1];
            var fDet = data[0] * rkInverse_00 +
                data[4] * rkInverse_10 +
                data[8] * rkInverse_20;
            if (Math.abs(fDet) > 0.00000000001) {
                var fInvDet = 1.0 / fDet;
                data[0] = fInvDet * rkInverse_00;
                data[4] = fInvDet * rkInverse_01;
                data[8] = fInvDet * rkInverse_02;
                data[1] = fInvDet * rkInverse_10;
                data[5] = fInvDet * rkInverse_11;
                data[9] = fInvDet * rkInverse_12;
                data[2] = fInvDet * rkInverse_20;
                data[6] = fInvDet * rkInverse_21;
                data[10] = fInvDet * rkInverse_22;
            }
        };
        /**
        * private
        */
        Matrix4.transpose = function (matrix, result) {
            result = result || new Matrix4();
            var m = matrix.rawData, r = result.rawData;
            r[0] = m[0];
            r[1] = m[4];
            r[2] = m[8];
            r[3] = m[12];
            r[4] = m[1];
            r[5] = m[5];
            r[6] = m[9];
            r[7] = m[13];
            r[8] = m[2];
            r[9] = m[6];
            r[10] = m[10];
            r[11] = m[14];
            r[12] = m[3];
            r[13] = m[7];
            r[14] = m[11];
            r[15] = m[15];
            return result;
        };
        ;
        /**
        * private
        */
        Matrix4.inverse = function (matrix, result) {
            result = result || new Matrix4();
            var m = matrix.rawData, r = result.rawData;
            r[0] = m[5] * m[10] * m[15] - m[5] * m[14] * m[11] - m[6] * m[9] * m[15] + m[6] * m[13] * m[11] + m[7] * m[9] * m[14] - m[7] * m[13] * m[10];
            r[1] = -m[1] * m[10] * m[15] + m[1] * m[14] * m[11] + m[2] * m[9] * m[15] - m[2] * m[13] * m[11] - m[3] * m[9] * m[14] + m[3] * m[13] * m[10];
            r[2] = m[1] * m[6] * m[15] - m[1] * m[14] * m[7] - m[2] * m[5] * m[15] + m[2] * m[13] * m[7] + m[3] * m[5] * m[14] - m[3] * m[13] * m[6];
            r[3] = -m[1] * m[6] * m[11] + m[1] * m[10] * m[7] + m[2] * m[5] * m[11] - m[2] * m[9] * m[7] - m[3] * m[5] * m[10] + m[3] * m[9] * m[6];
            r[4] = -m[4] * m[10] * m[15] + m[4] * m[14] * m[11] + m[6] * m[8] * m[15] - m[6] * m[12] * m[11] - m[7] * m[8] * m[14] + m[7] * m[12] * m[10];
            r[5] = m[0] * m[10] * m[15] - m[0] * m[14] * m[11] - m[2] * m[8] * m[15] + m[2] * m[12] * m[11] + m[3] * m[8] * m[14] - m[3] * m[12] * m[10];
            r[6] = -m[0] * m[6] * m[15] + m[0] * m[14] * m[7] + m[2] * m[4] * m[15] - m[2] * m[12] * m[7] - m[3] * m[4] * m[14] + m[3] * m[12] * m[6];
            r[7] = m[0] * m[6] * m[11] - m[0] * m[10] * m[7] - m[2] * m[4] * m[11] + m[2] * m[8] * m[7] + m[3] * m[4] * m[10] - m[3] * m[8] * m[6];
            r[8] = m[4] * m[9] * m[15] - m[4] * m[13] * m[11] - m[5] * m[8] * m[15] + m[5] * m[12] * m[11] + m[7] * m[8] * m[13] - m[7] * m[12] * m[9];
            r[9] = -m[0] * m[9] * m[15] + m[0] * m[13] * m[11] + m[1] * m[8] * m[15] - m[1] * m[12] * m[11] - m[3] * m[8] * m[13] + m[3] * m[12] * m[9];
            r[10] = m[0] * m[5] * m[15] - m[0] * m[13] * m[7] - m[1] * m[4] * m[15] + m[1] * m[12] * m[7] + m[3] * m[4] * m[13] - m[3] * m[12] * m[5];
            r[11] = -m[0] * m[5] * m[11] + m[0] * m[9] * m[7] + m[1] * m[4] * m[11] - m[1] * m[8] * m[7] - m[3] * m[4] * m[9] + m[3] * m[8] * m[5];
            r[12] = -m[4] * m[9] * m[14] + m[4] * m[13] * m[10] + m[5] * m[8] * m[14] - m[5] * m[12] * m[10] - m[6] * m[8] * m[13] + m[6] * m[12] * m[9];
            r[13] = m[0] * m[9] * m[14] - m[0] * m[13] * m[10] - m[1] * m[8] * m[14] + m[1] * m[12] * m[10] + m[2] * m[8] * m[13] - m[2] * m[12] * m[9];
            r[14] = -m[0] * m[5] * m[14] + m[0] * m[13] * m[6] + m[1] * m[4] * m[14] - m[1] * m[12] * m[6] - m[2] * m[4] * m[13] + m[2] * m[12] * m[5];
            r[15] = m[0] * m[5] * m[10] - m[0] * m[9] * m[6] - m[1] * m[4] * m[10] + m[1] * m[8] * m[6] + m[2] * m[4] * m[9] - m[2] * m[8] * m[5];
            var det = m[0] * r[0] + m[1] * r[4] + m[2] * r[8] + m[3] * r[12];
            for (var i = 0; i < 16; i++)
                r[i] /= det;
            return result;
        };
        ;
        /**
        * @language zh_CN
        * 当前矩阵求逆
        * @returns boolean 是否能求逆
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.invert = function () {
            var d = this.determinant;
            var invertable = Math.abs(d) > 0.00000000001;
            var data = this.rawData;
            if (invertable) {
                d = 1 / d;
                var m11 = data[0];
                var m21 = data[4];
                var m31 = data[8];
                var m41 = data[12];
                var m12 = data[1];
                var m22 = data[5];
                var m32 = data[9];
                var m42 = data[13];
                var m13 = data[2];
                var m23 = data[6];
                var m33 = data[10];
                var m43 = data[14];
                var m14 = data[3];
                var m24 = data[7];
                var m34 = data[11];
                var m44 = data[15];
                data[0] = d * (m22 * (m33 * m44 - m43 * m34) - m32 * (m23 * m44 - m43 * m24) + m42 * (m23 * m34 - m33 * m24));
                data[1] = -d * (m12 * (m33 * m44 - m43 * m34) - m32 * (m13 * m44 - m43 * m14) + m42 * (m13 * m34 - m33 * m14));
                data[2] = d * (m12 * (m23 * m44 - m43 * m24) - m22 * (m13 * m44 - m43 * m14) + m42 * (m13 * m24 - m23 * m14));
                data[3] = -d * (m12 * (m23 * m34 - m33 * m24) - m22 * (m13 * m34 - m33 * m14) + m32 * (m13 * m24 - m23 * m14));
                data[4] = -d * (m21 * (m33 * m44 - m43 * m34) - m31 * (m23 * m44 - m43 * m24) + m41 * (m23 * m34 - m33 * m24));
                data[5] = d * (m11 * (m33 * m44 - m43 * m34) - m31 * (m13 * m44 - m43 * m14) + m41 * (m13 * m34 - m33 * m14));
                data[6] = -d * (m11 * (m23 * m44 - m43 * m24) - m21 * (m13 * m44 - m43 * m14) + m41 * (m13 * m24 - m23 * m14));
                data[7] = d * (m11 * (m23 * m34 - m33 * m24) - m21 * (m13 * m34 - m33 * m14) + m31 * (m13 * m24 - m23 * m14));
                data[8] = d * (m21 * (m32 * m44 - m42 * m34) - m31 * (m22 * m44 - m42 * m24) + m41 * (m22 * m34 - m32 * m24));
                data[9] = -d * (m11 * (m32 * m44 - m42 * m34) - m31 * (m12 * m44 - m42 * m14) + m41 * (m12 * m34 - m32 * m14));
                data[10] = d * (m11 * (m22 * m44 - m42 * m24) - m21 * (m12 * m44 - m42 * m14) + m41 * (m12 * m24 - m22 * m14));
                data[11] = -d * (m11 * (m22 * m34 - m32 * m24) - m21 * (m12 * m34 - m32 * m14) + m31 * (m12 * m24 - m22 * m14));
                data[12] = -d * (m21 * (m32 * m43 - m42 * m33) - m31 * (m22 * m43 - m42 * m23) + m41 * (m22 * m33 - m32 * m23));
                data[13] = d * (m11 * (m32 * m43 - m42 * m33) - m31 * (m12 * m43 - m42 * m13) + m41 * (m12 * m33 - m32 * m13));
                data[14] = -d * (m11 * (m22 * m43 - m42 * m23) - m21 * (m12 * m43 - m42 * m13) + m41 * (m12 * m23 - m22 * m13));
                data[15] = d * (m11 * (m22 * m33 - m32 * m23) - m21 * (m12 * m33 - m32 * m13) + m31 * (m12 * m23 - m22 * m13));
            }
            return invertable;
        };
        /**
        * @language zh_CN
        * 生成一个变换矩阵
        * @param pos  位移
        * @param scale 缩放
        * @param rot 旋转的四元素
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.makeTransform = function (pos, scale, rot) {
            //let data: Float32Array = this.rawData;
            //data[0] = scale.x;
            //data[5] = scale.y;
            //data[10] = scale.z;
            //rot.toMatrix3D(Matrix4.helpMatrix);
            //this.append(Matrix4.helpMatrix);
            //data[12] = pos.x;
            //data[13] = pos.y;
            //data[14] = pos.z;
            //data[15] = 1.0;
            this.createByScale(scale.x, scale.y, scale.z);
            rot.toMatrix3D(egret3d.MathUtil.CALCULATION_MATRIX);
            this.append(egret3d.MathUtil.CALCULATION_MATRIX);
            this.rawData[12] = pos.x;
            this.rawData[13] = pos.y;
            this.rawData[14] = pos.z;
            this.rawData[15] = 1;
        };
        /**
        * @language zh_CN
        * 生成一个变换矩阵
        * @param components Vector3[3] 位移 旋转 缩放
        * @returns boolean 生成是否成功
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.recompose = function (components) {
            egret3d.MathUtil.CALCULATION_QUATERNION.fromEulerAngles(components[1].x, components[1].y, components[1].z);
            this.makeTransform(components[0], components[2], egret3d.MathUtil.CALCULATION_QUATERNION);
            return true;
        };
        /**
        * @language zh_CN
        * 用当前矩阵变换一个3D向量
        * @param v 变换的向量
        * @param target 如果当前参数为null那么就会new一个新的Vector3返回
        * @returns Vector3 变换后的向量
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.transformVector = function (v, target) {
            if (target === void 0) { target = null; }
            var data = this.rawData;
            if (!target) {
                target = new egret3d.Vector3();
            }
            var x = v.x;
            var y = v.y;
            var z = v.z;
            target.x = x * data[0] + y * data[4] + z * data[8] + data[12];
            target.y = x * data[1] + y * data[5] + z * data[9] + data[13];
            target.z = x * data[2] + y * data[6] + z * data[10] + data[14];
            target.w = x * data[3] + y * data[7] + z * data[11] + data[15];
            return target;
        };
        /**
        * @language zh_CN
        * 用当前矩阵变换一个3D向量
        * @param v 变换的向量  w 会进行计算
        * @param target 如果当前参数为null那么就会new一个新的Vector3返回
        * @returns Vector3 变换后的向量
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.transformVector4 = function (v, target) {
            if (target === void 0) { target = null; }
            var data = this.rawData;
            if (!target) {
                target = new egret3d.Vector3();
            }
            var x = v.x;
            var y = v.y;
            var z = v.z;
            var w = v.w;
            target.x = x * data[0] + y * data[4] + z * data[8] + w * data[12];
            target.y = x * data[1] + y * data[5] + z * data[9] + w * data[13];
            target.z = x * data[2] + y * data[6] + z * data[10] + w * data[14];
            target.w = x * data[3] + y * data[7] + z * data[11] + w * data[15];
            return target;
        };
        /**
        * @language zh_CN
        * 用当前矩阵变换一个3D向量 不处理位移
        * @param v 变换的向量
        * @param target 如果当前参数为null那么就会new一个新的Vector3返回
        * @returns Vector3 变换后的向量
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.mat3TransformVector = function (v, target) {
            if (target === void 0) { target = null; }
            var data = this.rawData;
            if (!target) {
                target = new egret3d.Vector3();
            }
            var x = v.x;
            var y = v.y;
            var z = v.z;
            target.x = x * data[0] + y * data[4] + z * data[8];
            target.y = x * data[1] + y * data[5] + z * data[9];
            target.z = x * data[2] + y * data[6] + z * data[10];
            return target;
        };
        /**
        * @language zh_CN
        * 用当前矩阵变换一个3D平面
        * @param plane 变换的平面
        * @returns Plane3D 变换后的平面
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.transformPlane = function (plane) {
            var mat = new Matrix4();
            mat.copyFrom(this);
            mat.invert();
            mat.transpose();
            var v = new egret3d.Vector3(plane.a, plane.b, plane.c, plane.d);
            v.copyFrom(mat.transformVector(v));
            var p = new egret3d.Plane3D();
            p.a = v.x;
            p.b = v.y;
            p.c = v.z;
            p.d = v.w / Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
            return p;
        };
        /**
        * @language zh_CN
        * 当前矩阵转置
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.transpose = function () {
            var data = this.rawData;
            for (var i = 0; i < Matrix4.helpMatrix.rawData.length; i++) {
                Matrix4.helpMatrix.rawData[i] = data[i];
            }
            data[1] = Matrix4.helpMatrix.rawData[4];
            data[2] = Matrix4.helpMatrix.rawData[8];
            data[3] = Matrix4.helpMatrix.rawData[12];
            data[4] = Matrix4.helpMatrix.rawData[1];
            data[6] = Matrix4.helpMatrix.rawData[9];
            data[7] = Matrix4.helpMatrix.rawData[13];
            data[8] = Matrix4.helpMatrix.rawData[2];
            data[9] = Matrix4.helpMatrix.rawData[6];
            data[11] = Matrix4.helpMatrix.rawData[14];
            data[12] = Matrix4.helpMatrix.rawData[3];
            data[13] = Matrix4.helpMatrix.rawData[7];
            data[14] = Matrix4.helpMatrix.rawData[11];
        };
        /**
        * @language zh_CN
        * 生成一个(以x,y,z为中心轴旋转degrees角度)的矩阵
        * @param x 中心轴的x
        * @param y 中心轴的y
        * @param z 中心轴的z
        * @param degrees 旋转角度
        * @returns Matrix4 矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.getAxisRotation = function (x, y, z, degrees) {
            var m = new Matrix4();
            var rad = degrees * (Math.PI / 180);
            var c = Math.cos(rad);
            var s = Math.sin(rad);
            var t = 1 - c;
            var tmp1, tmp2;
            m.rawData[0] = c + x * x * t;
            m.rawData[5] = c + y * y * t;
            m.rawData[10] = c + z * z * t;
            tmp1 = x * y * t;
            tmp2 = z * s;
            m.rawData[1] = tmp1 + tmp2;
            m.rawData[4] = tmp1 - tmp2;
            tmp1 = x * z * t;
            tmp2 = y * s;
            m.rawData[8] = tmp1 + tmp2;
            m.rawData[2] = tmp1 - tmp2;
            tmp1 = y * z * t;
            tmp2 = x * s;
            m.rawData[9] = tmp1 - tmp2;
            m.rawData[6] = tmp1 + tmp2;
            return m;
        };
        Object.defineProperty(Matrix4.prototype, "determinant", {
            /**
            * @language zh_CN
            * 返回矩阵行列式
            * @returns number 行列式值
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                var data = this.rawData;
                return ((data[0] * data[5] - data[4] * data[1]) * (data[10] * data[15] - data[14] * data[11]) - (data[0] * data[9] - data[8] * data[1]) * (data[6] * data[15] - data[14] * data[7]) + (data[0] * data[13] - data[12] * data[1]) * (data[6] * data[11] - data[10] * data[7]) + (data[4] * data[9] - data[8] * data[5]) * (data[2] * data[15] - data[14] * data[3]) - (data[4] * data[13] - data[12] * data[5]) * (data[2] * data[11] - data[10] * data[3]) + (data[8] * data[13] - data[12] * data[9]) * (data[2] * data[7] - data[6] * data[3]));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix4.prototype, "position", {
            /**
            * @language zh_CN
            * 返回矩阵位移
            *
            * @returns Vector3 位移
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                var data = this.rawData;
                return new egret3d.Vector3(data[12], data[13], data[14]);
            },
            /**
            * @language zh_CN
            * 设置矩阵位移
            *
            * @param value 位移
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                var data = this.rawData;
                data[12] = value.x;
                data[13] = value.y;
                data[14] = value.z;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix4.prototype, "scale", {
            /**
            * @language zh_CN
            * 返回矩阵缩放
            *
            * @returns Vector3 缩放
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                var data = this.rawData;
                return new egret3d.Vector3(data[0], data[5], data[10]);
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 以字符串返回矩阵的值
        *
        * @returns string 字符
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.toString = function () {
            var data = this.rawData;
            return "matrix3d(" + Math.round(data[0] * 1000) / 1000 + "," + Math.round(data[1] * 1000) / 1000 + "," + Math.round(data[2] * 1000) / 1000 + "," + Math.round(data[3] * 1000) / 1000 + "," + Math.round(data[4] * 1000) / 1000 + "," + Math.round(data[5] * 1000) / 1000 + "," + Math.round(data[6] * 1000) / 1000 + "," + Math.round(data[7] * 1000) / 1000 + "," + Math.round(data[8] * 1000) / 1000 + "," + Math.round(data[9] * 1000) / 1000 + "," + Math.round(data[10] * 1000) / 1000 + "," + Math.round(data[11] * 1000) / 1000 + "," + Math.round(data[12] * 1000) / 1000 + "," + Math.round(data[13] * 1000) / 1000 + "," + Math.round(data[14] * 1000) / 1000 + "," + Math.round(data[15] * 1000) / 1000 + ")";
        };
        /**
        * @language zh_CN
        * 求两个矩阵之间的插值
        * @param m0 矩阵0
        * @param m1 矩阵1
        * @param t 时间差 0.0 - 1.0
        * @version Egret 3.0
        * @platform Web,Native
        */
        Matrix4.prototype.lerp = function (m0, m1, t) {
            ///t(m1 - m0) + m0
            this.copyFrom(m1).sub(m0).mult(t).add(m0);
        };
        /**
        * @language zh_CN
        * 求矩阵在各个轴上缩放的最大值
        * @version Egret 4.0
        * @platform Web,Native
        */
        Matrix4.prototype.getMaxScaleOnAxis = function () {
            var te = this.rawData;
            var scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
            var scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
            var scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
            return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
        };
        return Matrix4;
    }());
    /**
    * @private
    */
    Matrix4.helpMatrix = new Matrix4();
    Matrix4.helpMatrix2 = new Matrix4();
    Matrix4.position_000 = new egret3d.Vector3();
    Matrix4.scale_111 = new egret3d.Vector3(1, 1, 1);
    Matrix4.prs = [new egret3d.Vector3(), new egret3d.Vector3(), new egret3d.Vector3()];
    egret3d.Matrix4 = Matrix4;
    __reflect(Matrix4.prototype, "egret3d.Matrix4");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Matrix4.js.map