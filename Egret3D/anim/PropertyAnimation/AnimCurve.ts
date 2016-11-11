module egret3d {


    /**
    * @language zh_CN
    * @class egret3d.CurveType
    * @classdesc
    * 曲线的类型
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum CurveType {

        /**
        * @language zh_CN
        * 普通的线  直线
        * @version Egret 3.0
        * @platform Web,Native
        */
        Line,

        /**
        * @language zh_CN
        * 贝塞尔曲线
        * @version Egret 3.0
        * @platform Web,Native
        */
        BesselCurve
    };

    /**
    * @language zh_CN
    * @class egret3d.AnimCurve
    * @classdesc
    * AnimCurve 类为动画曲线，其中包含该曲线的类型，起始结束时刻以及参数
    * 
    * @includeExample anim/PropertyAnimation/AnimCurve.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class AnimCurve {

        /**
        * @language zh_CN
        * start.x - end.x 之间 插值y值 使用哪种类型
        * @see egret3d.CurveType
        * @see egret3d.AnimCurve.start
        * @see egret3d.AnimCurve.end
        *
        * @see egret3d.Point
        * @version Egret 3.0
        * @platform Web,Native
        */
        public type: CurveType = CurveType.Line;


        /**
        * @language zh_CN
        * start.x 开始时间
        * start.y 值
        * @see egret3d.Point
        * @version Egret 3.0
        * @platform Web,Native
        */
        public start: Point = new Point();


        /**
        * @language zh_CN
        * end.x 结束时间
        * end.y 值
        * @see egret3d.Point
        * @version Egret 3.0
        * @platform Web,Native
        */
        public end: Point = new Point();

        /**
        * @language zh_CN
        * 贝塞尔 控制点1
        * @see egret3d.Point
        * @version Egret 3.0
        * @platform Web,Native
        */
        public c1: Point = new Point();

        /**
        * @language zh_CN
        * 贝塞尔 控制点2
        * @see egret3d.Point
        * @version Egret 3.0
        * @platform Web,Native
        */
        public c2: Point = new Point();

        /**
        * @private
        */
        public cache: number[] = null;

        /**
        * @language zh_CN
        * 是否缓存数据
        * @see egret3d.Point
        * @version Egret 3.0
        * @platform Web,Native
        */
        public useCache: boolean = false;

        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public constructor() {
        }

        /**
        * @language zh_CN
        * 取曲线某一时刻的值 
        * @param time 某个时刻
        * @returns number 该时刻对应的数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public calculateValue(time: number): number {

            if (time < this.start.x || time > this.end.x) {
                return 0;
            }

            if (this.useCache) {
                return this.cache[Math.floor(time - this.start.x)];
            }

            switch (this.type & 0xffff) {
                case CurveType.Line:
                    return this.valueFromLine(time);
                case CurveType.BesselCurve:
                    return this.valueFromBesselCurve(time);
                case 3:
                    return this.colorValueFromLine(time);
            }
            
            return 0;
        }

        protected valueFromLine(time: number): number {

            var t: number = (time - this.start.x) / (this.end.x - this.start.x);

            return this.start.y + t * (this.end.y - this.start.y);
        }

        protected colorValueFromLine(time: number): number {

            var a0: number = (this.start.y >> 24) & 0xff;
            var r0: number = (this.start.y >> 16) & 0xff;
            var g0: number = (this.start.y >> 8) & 0xff ;
            var b0: number = (this.start.y & 0xff);

            var a1: number = (this.end.y >> 24) & 0xff;
            var r1: number = (this.end.y >> 16) & 0xff;
            var g1: number = (this.end.y >> 8) & 0xff;
            var b1: number = (this.end.y & 0xff);

            var t: number = (time - this.start.x) / (this.end.x - this.start.x);

            var a: number = Math.floor(a0 + t * (a1 - a0));
            var r: number = Math.floor(r0 + t * (r1 - r0));
            var g: number = Math.floor(g0 + t * (g1 - g0));
            var b: number = Math.floor(b0 + t * (b1 - b0));
            return ((a << 24) | (r << 16) | (g << 8) | b) >>> 0;
        }

        protected valueFromBesselCurve(time: number): number {

            var t: number = (time - this.start.x) / (this.end.x - this.start.x);

            var _1t: number = 1 - t;

            var _1t2: number = _1t * _1t;

            var _1t3: number = _1t2 * _1t;
            
            return this.start.y * _1t3 + 3 * this.c1.y * t * _1t2 + 3 * this.c2.x * t * t * _1t + this.end.y * t * t * t;
        }

        /**
        * @private
        */
        public cacheCurveData(): void {

            if (this.useCache) {
                this.cache = [];

                for (var time = this.start.x; time < this.end.x; time++) {
                    this.cache.push(this.calculateValue(time));
                }
            }
        }
    }
}