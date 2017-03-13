module egret3d {

    /**
     * @private
     * @class egret3D.Egret3DPolicy
     * @classdesc
     */
    export class Egret3DPolicy {

        public static engineVersion: string = "4.0.0";
        public static exportToolsVersion: string[] = ["4.0.0", "3.2.6"];

        public static useParticle: boolean = true;
        public static useAnimEffect: boolean = true;
        public static useEffect: boolean = true;
        public static useRibbon: boolean = true;

        public static useAnimPoseInterpolation: boolean = true;
        public static useAnimMixInterpolation: boolean = true;
        public static useAnimCache: boolean = false;
        public static useLowLoop: boolean = false;
        
        public static useLight: boolean = true;

        public static usePost: boolean = true;

        public static useCompress: boolean = false;

        public static useLowLOD: boolean = false;
    }

    /**
    * @private
    * @language zh_CN
    * 请求全屏
    */
    export function requestFullScreen():void {
        var dom: HTMLElement = document.documentElement;
        if (dom.requestFullscreen) {
            dom.requestFullscreen();
        } else if (dom.webkitRequestFullScreen) {
            dom.webkitRequestFullScreen();
        }
    }

   

    /**
     * @private
     * @class egret3D.Egret3DEngine
     * @classdesc
     * 引擎库文件加载
     * 引擎库前期加载设置，开发中加载未压缩的编译引擎
     */
    export class Egret3DEngine {
        public static instance: Egret3DEngine = new Egret3DEngine();

        /**
         * @private
         **/
        public performance:Egret3DPerformance = new Egret3DPerformance();

        /**
         * @private
         **/
        public inspector:Egret3DInspector = new Egret3DInspector();

        public debug: boolean = false;

    }
}