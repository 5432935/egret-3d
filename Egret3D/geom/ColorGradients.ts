module egret3d {
    /**
    * @language zh_CN
    * @class egret3d.ColorGradients
    * @classdesc
    * 使用 ColorGradients记录一个颜色渐变信息
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
        * 渐变颜色取插值
        * @param c0 颜色1
        * @param c1 颜色2
        * @param t (0.0-1.0)
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