var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /*
    * @private
    */
    var Egret3DLog = (function () {
        function Egret3DLog() {
        }
        Egret3DLog.outError = function (message) {
            console.log("Error:" + message);
        };
        Egret3DLog.outWarn = function (message) {
            console.log("Warning:" + message);
        };
        Egret3DLog.outDebug = function (message) {
            if (egret3d.Egret3DEngine.instance.debug) {
                console.log("Debug:" + message);
            }
        };
        return Egret3DLog;
    }());
    egret3d.Egret3DLog = Egret3DLog;
    __reflect(Egret3DLog.prototype, "egret3d.Egret3DLog");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Egret3DLog.js.map