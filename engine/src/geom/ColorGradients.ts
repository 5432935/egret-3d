module egret3d {
    /**
    * @language zh_CN
    * @class egret3d.ColorGradients
    * @classdesc
    * 用于描述一个颜色渐变信息，由一个颜色数组和一个时间数组构成，并且数据一一对应。</p>
    * [clr1, clr2, clr3...], [t1, t2, t3...]含义为在t1时间点颜色值为clr1，t2时间点颜色值为clr2，以此类推。</p>
    * t1至t2之间的颜色信息渐变插值生成出来。该数据目前主要用于粒子在存活，颜色线性变化过渡过程。
    * @includeExample geom/ColorGradients.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ColorGradients {

        /**
        * @language zh_CN
        * 渐变色列表，对应时间列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public colors: Array<Color> = [];

        /**
        * @language zh_CN
        * 渐变色所处时间下标位置[0-1]，对应颜色列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public times: Array<number> = [];

        /**
        * @language zh_CN
        * 创建一个ColorGradients对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
           
        }

        /**
        * @language zh_CN
        * 渐变颜色取插值，根据时间线性插值获得。
        * @param t (0.0-1.0)
        * @returns Color，线性插值获得的颜色。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public lerpColor(t: number, dst: Color = null): Color {
            if (t < 0) {
                t = 0;
            } else if (t > 1) {
                t = 1;
            }

            if (dst == null)
                dst = new Color();

            var clr: Color;
            var nextClr: Color;
            for (var i: number = 0, count = this.times.length - 1; i < count; i++) {
                if (t >= this.times[i] && t < this.times[i + 1]) {
                    t = (t - this.times[i]) / (this.times[i + 1] - this.times[i]);
                    dst.lerp(this.colors[i], this.colors[i + 1], t);
                    break;
                }
            }

            return dst;
        }


    }

}