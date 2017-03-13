var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @class egret3d.ColorTransform
    * @classdesc
    * 可使用 ColorTransform 类调整显示对象的颜色值
    * @includeExample geom/ColorTransform.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ColorTransform = (function () {
        /**
        * @language zh_CN
        * @class egret3d.ColorTransform
        * @classdesc 创建一个颜色变化矩阵对象，用于偏色某个材质球
        * @version Egret 3.0
        * @platform Web,Native
        */
        function ColorTransform() {
            /**
            * @language zh_CN
            * 颜色变化矩阵(r,g,b)数据，a单独放在外面计算
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.m44 = new egret3d.Matrix4();
            /**
            * @language zh_CN
            * 透明度
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.alpha = 1.0;
        }
        /**
        * @language zh_CN
        * 缩放颜色，对rgba进行对应比例的系数缩放
        * @param r red通道
        * @param g green通道
        * @param b blue通道
        * @param a alpha通道
        * @version Egret 3.0
        * @platform Web,Native
        */
        ColorTransform.prototype.scale = function (r, g, b, a) {
            if (r === void 0) { r = 1.0; }
            if (g === void 0) { g = 1.0; }
            if (b === void 0) { b = 1.0; }
            if (a === void 0) { a = 1.0; }
            this.m44.appendScale(r, g, b);
            this.alpha *= a;
        };
        /**
        * @language zh_CN
        * 偏移颜色，对rgba进行对应便宜
        * @param r red通道偏移值
        * @param g green通道偏移值
        * @param b blue通道偏移值
        * @param a alpha通道偏移值
        * @version Egret 3.0
        * @platform Web,Native
        */
        ColorTransform.prototype.offset = function (r, g, b, a) {
            if (r === void 0) { r = 0.0; }
            if (g === void 0) { g = 0.0; }
            if (b === void 0) { b = 0.0; }
            if (a === void 0) { a = 0.0; }
            this.m44.appendTranslation(r, g, b);
            this.alpha += a;
        };
        /**
        * @language zh_CN
        * 灰度变换
        * @version Egret 3.0
        * @platform Web,Native
        */
        ColorTransform.prototype.gray = function () {
            var grayFloats = new Float32Array(16);
            grayFloats[0] = 0.2126;
            grayFloats[1] = 0.7152;
            grayFloats[2] = 0.0722;
            grayFloats[3] = 1;
            grayFloats[4] = 0.2126;
            grayFloats[5] = 0.7152;
            grayFloats[6] = 0.0722;
            grayFloats[7] = 1;
            grayFloats[8] = 0.2126;
            grayFloats[9] = 0.7152;
            grayFloats[10] = 0.0722;
            grayFloats[11] = 1;
            grayFloats[12] = 0;
            grayFloats[13] = 0;
            grayFloats[14] = 0;
            grayFloats[15] = 1;
            this.m44.copyRawDataFrom(grayFloats);
        };
        /**
        * @language zh_CN
        * 重置数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        ColorTransform.prototype.reset = function () {
            this.m44.identity();
            this.alpha = 1;
        };
        /**
        * @language zh_CN
        * 颜色变换叠加
        * @param ctf 叠加的颜色变换的矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        ColorTransform.prototype.multiply = function (ctf) {
            this.m44.multiply(ctf.m44);
            this.alpha *= ctf.alpha;
        };
        /**
        * @language zh_CN
        * 拷贝一个颜色变换数据
        * @param transform 被拷贝的对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        ColorTransform.prototype.copyFrom = function (transform) {
            this.m44.copyFrom(transform.m44);
            this.alpha = transform.alpha;
        };
        /**
        * @language zh_CN
        * 拷贝该颜色变换数据
        * @param transform 拷贝至目标对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        ColorTransform.prototype.copyTo = function (transform) {
            transform.copyFrom(this);
        };
        /**
         * @language zh_CN
         * 设置颜色值
         * @param value rgb，0xffffff格式
         * @version Egret 3.0
         * @platform Web,Native
         */
        ColorTransform.prototype.setColorRGB = function (value) {
            var r = value & 0xff0000;
            r >>= 16;
            var g = value & 0xff00;
            g >>= 8;
            var b = value & 0xff;
            r /= 0xff;
            g /= 0xff;
            b /= 0xff;
            this.m44.identity();
            this.scale(r, g, b, 1.0);
        };
        return ColorTransform;
    }());
    egret3d.ColorTransform = ColorTransform;
    __reflect(ColorTransform.prototype, "egret3d.ColorTransform");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ColorTransform.js.map