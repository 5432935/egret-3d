var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @language zh_CN
    * @class egret3d.BezierCurve
    * @classdesc
    * 贝塞尔曲线
    * @includeExample geom/BezierCurve.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var BezierCurve = (function () {
        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        function BezierCurve() {
        }
        /**
        * @language zh_CN
        * 计算贝塞尔曲线在t值时候的y值
        * @param pos 贝塞尔曲线的坐标列表
        * @param t 时刻
        * @version Egret 3.0
        * @platform Web,Native
        */
        BezierCurve.prototype.calcLineX = function (pos, t) {
            var A0;
            var A1;
            for (var i = 0, count = pos.length - 1; i < count; i++) {
                A0 = pos[i];
                A1 = pos[i + 1];
                if (A0.x <= t && A1.x >= t) {
                    break;
                }
            }
            return egret3d.MathUtil.mix(A0.y, A1.y, (t - A0.x) / (t - A1.x));
        };
        BezierCurve.prototype.calcBezierY = function (pos, ctrl, t) {
            var A0;
            var B0;
            var A1;
            var B1;
            for (var i = 0; i < 3; i++) {
                if (t >= pos[i].x && t <= pos[i + 1].x) {
                    A0 = pos[i];
                    B0 = ctrl[i];
                    A1 = pos[i + 1];
                    B1 = ctrl[i + 1];
                    break;
                }
            }
            if (!A0) {
                A0 = pos[pos.length - 1];
            }
            if (!B0) {
                B0 = ctrl[ctrl.length - 1];
            }
            A1 = A1 || A0;
            B1 = B1 || B0;
            t = (t - A0.x) / (A1.x - A0.x);
            return this.cubic_bezier(A0.y, B0.y, B1.y, A1.y, t);
        };
        BezierCurve.prototype.calcBezierX = function (pos, ctrl, t) {
            var A0;
            var B0;
            var A1;
            var B1;
            for (var i = 0; i < 3; i++) {
                if (t >= pos[i].x && t <= pos[i + 1].x) {
                    A0 = pos[i];
                    B0 = ctrl[i];
                    A1 = pos[i + 1];
                    B1 = ctrl[i + 1];
                    break;
                }
            }
            t = (t - A0.x) / (A1.x - A0.x);
            return this.cubic_bezier(A0.x, B0.x, B1.x, A1.x, t);
        };
        BezierCurve.prototype.cubic_bezier = function (p0, p1, p2, p3, t) {
            //第一次混合
            p0 = egret3d.MathUtil.mix(p0, p1, t);
            p1 = egret3d.MathUtil.mix(p1, p2, t);
            p2 = egret3d.MathUtil.mix(p2, p3, t);
            //第二次混合
            p0 = egret3d.MathUtil.mix(p0, p1, t);
            p1 = egret3d.MathUtil.mix(p1, p2, t);
            //第三次混合
            p0 = egret3d.MathUtil.mix(p0, p1, t);
            return p0;
        };
        return BezierCurve;
    }());
    egret3d.BezierCurve = BezierCurve;
    __reflect(BezierCurve.prototype, "egret3d.BezierCurve");
    /**
    * @private
    * @language zh_CN
    * @class egret3d.BezierData
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    */
    var BezierData = (function () {
        function BezierData() {
            this.posPoints = [];
            this.ctrlPoints = [];
            this.lineMode = false;
            this.linePoints = [];
        }
        BezierData.prototype.calc = function (t) {
            var value;
            if (!this.lineMode) {
                value = BezierData.calc.calcBezierY(this.posPoints, this.ctrlPoints, t);
            }
            else {
                value = BezierData.calc.calcLineX(this.linePoints, t);
            }
            return value;
        };
        BezierData.prototype.trySampler = function () {
            var dataValide;
            if (this.lineMode) {
                for (var i = 0, count = this.linePoints.length; i < count; i++) {
                    if (this.linePoints[i].y != 0) {
                        dataValide = true;
                        break;
                    }
                }
            }
            else {
                for (var i = 0, count = this.posPoints.length; i < count; i++) {
                    if (this.posPoints[i].y != 0 || this.ctrlPoints[i].y != 0) {
                        dataValide = true;
                        break;
                    }
                }
            }
            if (dataValide) {
                return this.sampler();
                ;
            }
            return null;
        };
        BezierData.prototype.sampler = function () {
            if (this.lineMode) {
                return this.samplerLine();
            }
            return this.samplerBezier();
        };
        BezierData.prototype.samplerLine = function () {
            var SampleNum = 8;
            var res = new Float32Array(1 + (SampleNum * 2 + 1) * 2);
            res[res.length - 1] = this.linePoints.length;
            for (var i = 0, count = this.linePoints.length; i < count; i++) {
                res[i * 2] = this.linePoints[i].x;
                res[i * 2 + 1] = this.linePoints[i].y;
            }
            return res;
        };
        /*
        * @private
        * 采样bezier变成线段的形式
        */
        BezierData.prototype.samplerBezier = function () {
            //2段bezier，第一段9个点，第二段8个点
            //每个点有(x,y)
            //最后一个数据表示当前采样了几个点，如果是bezier的情况，值是9+8；如果是线段类型，则在(1，8 + 9)之间的一个整数
            var SampleNum = 8;
            var res = new Float32Array(1 + (SampleNum * 2 + 1) * 2);
            var tempTime;
            var now = 0;
            var i, j, count;
            var position = 0;
            res[position] = now;
            position++;
            res[position] = this.posPoints[0].y;
            position++;
            for (i = 0, count = BezierData.SegCount; i < count; i++) {
                tempTime = this.posPoints[i * 2 + 1].x - this.posPoints[i * 2].x;
                tempTime /= SampleNum;
                for (j = 0; j < SampleNum; j++) {
                    now += tempTime;
                    if (now > 1) {
                        now = 1;
                    }
                    res[position] = now;
                    position++;
                    res[position] = this.calc(now);
                    position++;
                }
            }
            //最后放入数量
            res[position] = SampleNum * 2 + 1;
            position++;
            return res;
        };
        //private doSampler1(): Float32Array {
        //    var floats: Array<number> = [];
        //    var times: Array<number> = [];
        //    var segmentTime: number;
        //    var segmentStartTime: number = 0;
        //    var segmentEndTime: number = 0;
        //    //每段有10个数据，将该段曲线分为10小段
        //    const SegmentCount: number = 9;
        //    var i: number;
        //    var count: number;
        //    for (i = 0, count = BezierData.SegCount; i < count; i++) {
        //        floats.push(this.posPoints[i * 2].y);//第一个数字
        //        segmentStartTime = this.posPoints[i * 2].x;
        //        segmentEndTime = this.posPoints[i * 2 + 1].x;
        //        segmentTime = (segmentEndTime - segmentStartTime) / SegmentCount;//该贝塞尔的每小段
        //        times.push(segmentTime);
        //        for (var j: number = 1; j < SegmentCount; j++) {
        //            floats.push(this.calc(segmentStartTime + segmentTime * j));
        //        }
        //        floats.push(this.posPoints[i * 2 + 1].y);//第10个数字
        //    }
        //    var res: Float32Array = new Float32Array(floats.length + times.length);
        //    for (i = 0, count = floats.length; i < count; i++) {
        //        res[i] = floats[i];
        //    }
        //    for (var j: number = 0, count = times.length; j < count; i++ , j++) {
        //        res[i] = times[j];
        //    }
        //    return res;
        //}
        BezierData.prototype.validate = function () {
            var i = 0, count = 0;
            if (!this.lineMode) {
                if (this.posPoints == null) {
                    this.posPoints = [];
                }
                if (this.ctrlPoints == null) {
                    this.ctrlPoints = [];
                }
                for (i = this.posPoints.length / 2, count = BezierData.SegCount; i < count; i++) {
                    this.posPoints.push(new egret3d.Point(0, 0));
                    this.posPoints.push(new egret3d.Point(1, 0));
                }
                for (i = this.ctrlPoints.length / 2, count = BezierData.SegCount; i < count; i++) {
                    this.ctrlPoints.push(new egret3d.Point(0, 0));
                    this.ctrlPoints.push(new egret3d.Point(1, 0));
                }
                this.ctrlPoints.length = BezierData.SegCount * 2;
                this.posPoints.length = BezierData.SegCount * 2;
            }
            else {
                if (this.linePoints == null) {
                    this.linePoints = [];
                }
                for (i = this.linePoints.length, count = 17 /*(8 + 9)*/; i < count; i++) {
                    this.linePoints.push(new egret3d.Point(1, 0));
                }
            }
        };
        return BezierData;
    }());
    BezierData.SegCount = 2; //最多2段贝塞尔曲线
    BezierData.calc = new BezierCurve();
    egret3d.BezierData = BezierData;
    __reflect(BezierData.prototype, "egret3d.BezierData");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=BezierCurve.js.map