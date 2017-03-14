var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @private
     * @language zh_CN
     * @class egret3d.PlaneClassification
     * @classdesc
     * 定义 PlaneClassification 常量
     * @version Egret 3.0
     * @platform Web,Native
     */
    var PlaneClassification = (function () {
        function PlaneClassification() {
        }
        return PlaneClassification;
    }());
    /**
    * @language zh_CN
    * 背面
    * @version Egret 3.0
    * @platform Web,Native
    */
    PlaneClassification.BACK = 0;
    /**
    * @language zh_CN
    * 正面
    * @version Egret 3.0
    * @platform Web,Native
    */
    PlaneClassification.FRONT = 1;
    /**
    * @language zh_CN
    * 在法线朝上的一面
    * @version Egret 3.0
    * @platform Web,Native
    */
    PlaneClassification.IN = 0;
    /**
    * @language zh_CN
    * 在法线朝下的一面
    * @version Egret 3.0
    * @platform Web,Native
    */
    PlaneClassification.OUT = 1;
    /**
    * @language zh_CN
    * 相交
    * @version Egret 3.0
    * @platform Web,Native
    */
    PlaneClassification.INTERSECT = 2;
    egret3d.PlaneClassification = PlaneClassification;
    __reflect(PlaneClassification.prototype, "egret3d.PlaneClassification");
})(egret3d || (egret3d = {}));
