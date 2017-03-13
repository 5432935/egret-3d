var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @language zh_CN
    * @class egret3d.AnimationCurve
    * @classdesc
    * 具有单一属性的 关键帧动画
    * 通过预计算后，动画信息将会缓存
    * @version Egret 3.0
    * @platform Web,Native
    */
    var AnimationCurve = (function () {
        function AnimationCurve() {
        }
        return AnimationCurve;
    }());
    egret3d.AnimationCurve = AnimationCurve;
    __reflect(AnimationCurve.prototype, "egret3d.AnimationCurve");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=AnimationCurve.js.map