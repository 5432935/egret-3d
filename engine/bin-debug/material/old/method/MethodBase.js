var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @class egret3d.MethodBase
    * @classdesc
    * 增加多种渲染效果的方法基类

    * @version Egret 3.0
    * @platform Web,Native
    */
    var MethodBase = (function () {
        function MethodBase() {
            /**
            * @private
            * @language zh_CN
            */
            this.vsShaderList = [];
            /**
            * @private
            * @language zh_CN
            */
            this.fsShaderList = [];
        }
        /**
        * @private
        * @language zh_CN
        */
        MethodBase.prototype.upload = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D, renderQuen) {
        };
        /**
        * @private
        * @language zh_CN
        */
        MethodBase.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D, renderQuen) {
        };
        /**
        * @private
        * @language zh_CN
        */
        MethodBase.prototype.dispose = function () {
        };
        return MethodBase;
    }());
    egret3d.MethodBase = MethodBase;
    __reflect(MethodBase.prototype, "egret3d.MethodBase");
})(egret3d || (egret3d = {}));
