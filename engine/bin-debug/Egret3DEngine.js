var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @private
     * @class egret3D.Egret3DPolicy
     * @classdesc
     */
    var Egret3DPolicy = (function () {
        function Egret3DPolicy() {
        }
        return Egret3DPolicy;
    }());
    Egret3DPolicy.engineVersion = "4.0.0";
    Egret3DPolicy.exportToolsVersion = ["4.0.0", "3.2.6"];
    Egret3DPolicy.useParticle = true;
    Egret3DPolicy.useAnimEffect = true;
    Egret3DPolicy.useEffect = true;
    Egret3DPolicy.useRibbon = true;
    Egret3DPolicy.useAnimPoseInterpolation = true;
    Egret3DPolicy.useAnimMixInterpolation = true;
    Egret3DPolicy.useAnimCache = false;
    Egret3DPolicy.useLowLoop = false;
    Egret3DPolicy.useLight = true;
    Egret3DPolicy.usePost = true;
    Egret3DPolicy.useCompress = false;
    Egret3DPolicy.useLowLOD = false;
    egret3d.Egret3DPolicy = Egret3DPolicy;
    __reflect(Egret3DPolicy.prototype, "egret3d.Egret3DPolicy");
    /**
    * @private
    * @language zh_CN
    * 请求全屏
    */
    function requestFullScreen() {
        var dom = document.documentElement;
        if (dom.requestFullscreen) {
            dom.requestFullscreen();
        }
        else if (dom.webkitRequestFullScreen) {
            dom.webkitRequestFullScreen();
        }
    }
    egret3d.requestFullScreen = requestFullScreen;
    /**
     * @private
     * @class egret3D.Egret3DEngine
     * @classdesc
     * 引擎库文件加载
     * 引擎库前期加载设置，开发中加载未压缩的编译引擎
     */
    var Egret3DEngine = (function () {
        function Egret3DEngine() {
            /**
             * @private
             **/
            this.performance = new egret3d.Egret3DPerformance();
            /**
             * @private
             **/
            this.inspector = new egret3d.Egret3DInspector();
            this.debug = false;
        }
        return Egret3DEngine;
    }());
    Egret3DEngine.instance = new Egret3DEngine();
    egret3d.Egret3DEngine = Egret3DEngine;
    __reflect(Egret3DEngine.prototype, "egret3d.Egret3DEngine");
})(egret3d || (egret3d = {}));
