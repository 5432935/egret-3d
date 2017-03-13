var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @class egret3d.MathUtil
    * @classdesc
    * 可使用 MathUtil 类 进行3d矩阵的计算
    * @includeExample geom/MathUtil.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var MathUtil = (function () {
        function MathUtil() {
        }
        /**
        * @private
        * @language zh_CN
        * 两个Float是否相等
        * @param f0 float
        * @param f1 float
        * @returns boolean 是否相等
        * @version Egret 3.0
        * @platform Web,Native
        */
        MathUtil.FloatEqual = function (f0, f1) {
            return Math.abs(f0 - f1) < 0.00000001;
        };
        /**
        * @private
        * @language zh_CN
        * 四元数转矩阵
        * @param quarternion 源四元数
        * @param m 目标矩阵 默认为null 如果为null将会new 一个Matrix4
        * @returns 返回转出矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        MathUtil.quaternion2matrix = function (quarternion, m) {
            if (m === void 0) { m = null; }
            var x = quarternion.x;
            var y = quarternion.y;
            var z = quarternion.z;
            var w = quarternion.w;
            var xx = x * x;
            var xy = x * y;
            var xz = x * z;
            var xw = x * w;
            var yy = y * y;
            var yz = y * z;
            var yw = y * w;
            var zz = z * z;
            var zw = z * w;
            var raw = MathUtil.RAW_DATA_CONTAINER;
            raw[0] = 1 - 2 * (yy + zz);
            raw[1] = 2 * (xy + zw);
            raw[2] = 2 * (xz - yw);
            raw[4] = 2 * (xy - zw);
            raw[5] = 1 - 2 * (xx + zz);
            raw[6] = 2 * (yz + xw);
            raw[8] = 2 * (xz + yw);
            raw[9] = 2 * (yz - xw);
            raw[10] = 1 - 2 * (xx + yy);
            raw[3] = raw[7] = raw[11] = raw[12] = raw[13] = raw[14] = 0;
            raw[15] = 1;
            if (m) {
                m.copyRawDataFrom(raw);
                return m;
            }
            else
                return new egret3d.Matrix4(new Float32Array(raw));
        };
        /**
        * @private
        * @language zh_CN
        * 得到矩阵朝前的方向
        * @param m 源矩阵
        * @param v 返回的方向 可为null 如果为null将会new 一个Vector3
        * @returns Vector3 返回方向
        * @version Egret 3.0
        * @platform Web,Native
        */
        MathUtil.getForward = function (m, v) {
            if (v === void 0) { v = null; }
            if (v === null) {
                v = new egret3d.Vector3(0.0, 0.0, 0.0);
            }
            m.copyRowTo(2, v);
            v.normalize();
            return v;
        };
        /**
        * @private
        * @language zh_CN
        * 得到矩阵朝上的方向
        * @param m 源矩阵
        * @param v 返回的方向 可为null 如果为null将会new 一个Vector3
        * @returns Vector3 返回方向
        * @version Egret 3.0
        * @platform Web,Native
        */
        MathUtil.getUp = function (m, v) {
            //v ||= new Vector3(0.0, 0.0, 0.0);
            if (v === void 0) { v = null; }
            if (v === null) {
                v = new egret3d.Vector3(0.0, 0.0, 0.0);
            }
            m.copyRowTo(1, v);
            v.normalize();
            return v;
        };
        /**
        * @private
        * @language zh_CN
        * 得到矩阵朝右的方向
        * @param m 源矩阵
        * @param v 返回的方向 可为null 如果为null将会new 一个Vector3
        * @returns Vector3 返回方向
        * @version Egret 3.0
        * @platform Web,Native
        */
        MathUtil.getRight = function (m, v) {
            if (v === void 0) { v = null; }
            //v ||= new Vector3(0.0, 0.0, 0.0);
            if (v === null) {
                v = new egret3d.Vector3(0.0, 0.0, 0.0);
            }
            m.copyRowTo(0, v);
            v.normalize();
            return v;
        };
        /**
        * @private
        * @language zh_CN
        * 比较两个矩阵是否相同
        * @param m1 矩阵1
        * @param m2 矩阵2
        * @returns boolean 相同返回true
        * @version Egret 3.0
        * @platform Web,Native
        */
        MathUtil.compare = function (m1, m2) {
            var r1 = MathUtil.RAW_DATA_CONTAINER;
            var r2 = m2.rawData;
            m1.copyRawDataTo(r1);
            for (var i = 0; i < 16; ++i) {
                if (r1[i] != r2[i])
                    return false;
            }
            return true;
        };
        /**
        * @private
        * @language zh_CN
        * 得到平面的反射矩阵
        * @param plane 反射的面
        * @param target 计算返回的矩阵 可为null 如果为null将会new 一个Matrix4
        * @returns Matrix4 返回计算的结果
        * @version Egret 3.0
        * @platform Web,Native
        */
        MathUtil.reflection = function (plane, target) {
            if (target === void 0) { target = null; }
            if (target === null)
                target = new egret3d.Matrix4();
            var a = plane.a, b = plane.b, c = plane.c, d = plane.d;
            var rawData = MathUtil.RAW_DATA_CONTAINER;
            var ab2 = -2 * a * b;
            var ac2 = -2 * a * c;
            var bc2 = -2 * b * c;
            // reflection matrix
            rawData[0] = 1 - 2 * a * a;
            rawData[4] = ab2;
            rawData[8] = ac2;
            rawData[12] = -2 * a * d;
            rawData[1] = ab2;
            rawData[5] = 1 - 2 * b * b;
            rawData[9] = bc2;
            rawData[13] = -2 * b * d;
            rawData[2] = ac2;
            rawData[6] = bc2;
            rawData[10] = 1 - 2 * c * c;
            rawData[14] = -2 * c * d;
            rawData[3] = 0;
            rawData[7] = 0;
            rawData[11] = 0;
            rawData[15] = 1;
            target.copyRawDataFrom(rawData);
            return target;
        };
        /**
        * @private
        * @language zh_CN
        * 得到矩阵的平移
        * @param transform 计算的矩阵
        * @param result 计算返回平移坐标 可为null 如果为null将会new 一个VeVector3
        * @returns Vector3 返回平移坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        MathUtil.getTranslation = function (transform, result) {
            if (result === void 0) { result = null; }
            if (!result)
                result = new egret3d.Vector3();
            transform.copyRowTo(3, result);
            return result;
        };
        /**
        * @private
        * @language zh_CN
        * 把一个值固定在一个范围之内
        * @param value 当前判定的值
        * @param min_inclusive 最小取值
        * @param max_inclusive 最大取值
        * @returns number 计算后的结果
        * @version Egret 3.0
        * @platform Web,Native
        */
        MathUtil.clampf = function (value, min_inclusive, max_inclusive) {
            if (min_inclusive > max_inclusive) {
                var temp = min_inclusive;
                min_inclusive = max_inclusive;
                max_inclusive = temp;
            }
            return value < min_inclusive ? min_inclusive : (value < max_inclusive ? value : max_inclusive);
        };
        /**
        * @private
        */
        MathUtil.ScreenToPosition = function (value, offset, max) {
            return (value + offset * 0.5) / max * 2 - 1;
        };
        /**
        * @private
        */
        MathUtil.PositionToScreen = function (value, offset, max) {
            return (value + 1) * 0.5 * max - offset * 0.5;
        };
        /**
        * @private
        */
        MathUtil.mix = function (value0, value1, t) {
            return value0 * (1 - t) + value1 * t;
        };
        /**
        * @private
        */
        MathUtil.calcDegree = function (quat, angleVector) {
            //计算billboard矩阵x
            quat.transformVector(egret3d.Vector3.Y_AXIS, this._tempVector);
            this._tempVector.x = 0;
            this._tempVector.normalize();
            var dotX = egret3d.Vector3.Y_AXIS.dotProduct(this._tempVector);
            var angleX = Math.acos(dotX) * MathUtil.RADIANS_TO_DEGREES;
            if (this._tempVector.z < 0) {
                angleX = 180 - angleX;
            }
            //计算billboard矩阵y
            quat.transformVector(egret3d.Vector3.Z_AXIS, this._tempVector);
            this._tempVector.y = 0;
            this._tempVector.normalize();
            var dotY = egret3d.Vector3.Z_AXIS.dotProduct(this._tempVector);
            var angleY = Math.acos(dotY) * MathUtil.RADIANS_TO_DEGREES;
            if (this._tempVector.x < 0) {
                angleY = 360 - angleY;
            }
            //计算billboard矩阵z
            quat.transformVector(egret3d.Vector3.X_AXIS, this._tempVector);
            this._tempVector.z = 0;
            this._tempVector.normalize();
            var dotZ = egret3d.Vector3.X_AXIS.dotProduct(this._tempVector);
            var angleZ = Math.acos(dotZ) * MathUtil.RADIANS_TO_DEGREES;
            if (this._tempVector.y < 0) {
                angleZ = 360 - angleZ;
            }
            angleX = this.clampAngle(angleX);
            angleY = this.clampAngle(angleY);
            angleZ = this.clampAngle(angleZ);
            angleVector.setTo(angleX, angleY, angleZ);
        };
        MathUtil.clampAngle = function (angle) {
            while (angle < -180) {
                angle += 360;
            }
            while (angle > 180) {
                angle -= 360;
            }
            return angle;
        };
        return MathUtil;
    }());
    /**
    * @language zh_CN
    * 1弧度为多少角度
    * @version Egret 3.0
    * @platform Web,Native
    */
    MathUtil.RADIANS_TO_DEGREES = 180 / Math.PI;
    /**
    * @language zh_CN
    * 1角度为多少弧度
    * @version Egret 3.0
    * @platform Web,Native
    */
    MathUtil.DEGREES_TO_RADIANS = Math.PI / 180;
    /**
    * @language zh_CN
    * 整型最大值
    * @version Egret 3.0
    * @platform Web,Native
    */
    MathUtil.MAX_VALUE = 0x7fffffff;
    /**
    * @language zh_CN
    * 整型最小值
    * @version Egret 3.0
    * @platform Web,Native
    */
    MathUtil.MIN_VALUE = -0x7fffffff;
    /**
    * @private
    * 1角度为多少弧度
    * @version Egret 3.0
    * @platform Web,Native
    */
    MathUtil.RAW_DATA_CONTAINER = new Float32Array(16);
    /**
    * @private
    */
    MathUtil.CALCULATION_MATRIX = new egret3d.Matrix4();
    /**
    * @private
    */
    MathUtil.CALCULATION_QUATERNION = new egret3d.Quaternion();
    /**
    * @private
    */
    MathUtil.CALCULATION_VECTOR3D = new egret3d.Vector3();
    /**
    * @private
    */
    MathUtil.CALCULATION_VECTOR3D_0 = new egret3d.Vector3();
    /**
    * @private
    */
    MathUtil.CALCULATION_VECTOR3D_1 = new egret3d.Vector3();
    /**
    * @private
    */
    MathUtil.CALCULATION_VECTOR3D_2 = new egret3d.Vector3();
    MathUtil._tempVector = new egret3d.Vector3();
    egret3d.MathUtil = MathUtil;
    __reflect(MathUtil.prototype, "egret3d.MathUtil");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=MathUtil.js.map