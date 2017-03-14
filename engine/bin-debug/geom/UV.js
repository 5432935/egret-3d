var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @private
     * @language zh_CN
     * @class egret3d.UV
     * @classdesc
     * UV类，用来存储模型顶点uv数据
     *
     * @see egret3d.GeometryData
     *
     * @version Egret 3.0
     * @platform Web,Native
     */
    var UV = (function () {
        /**
        * @language zh_CN
        * constructor
        */
        function UV(u, v) {
            if (u === void 0) { u = 0; }
            if (v === void 0) { v = 0; }
            /**
            * @language zh_CN
            * u
            */
            this.u = 0;
            /**
            * @language zh_CN
            * v
            */
            this.v = 0;
            this.u = u;
            this.v = v;
        }
        return UV;
    }());
    egret3d.UV = UV;
    __reflect(UV.prototype, "egret3d.UV");
})(egret3d || (egret3d = {}));
