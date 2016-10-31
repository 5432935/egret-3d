module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.LoaderEvent3D
    * @classdesc
    * LoaderEvent3D 使用URLLoader加载资源的事件返回对象
    * 只有URLLoader对象调用addEventListener 才会产生下类事件
    * @includeExample events/LoaderEvent3D.ts
    * @see egret3d.Event3D
    * @see egret3d.EventDispatcher
    @ @see egret3d.URLLoader
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class LoaderEvent3D extends Event3D {

        /**
        * @language zh_CN
        * LOADER_COMPLETE 常量定义 onLoadComplete 事件对象的 type 属性的值。
        * 加载完成后事件响应
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static LOADER_COMPLETE: string = "onLoadComplete";

        /**
        * @language zh_CN
        * LOADER_PROGRESS 常量定义 onLoadProgress 事件对象的 type 属性的值。
        * 加载过程中事件响应
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static LOADER_PROGRESS: string = "onLoadProgress";

        /**
        * @language zh_CN
        * LOADER_ERROR 常量定义 onLoadError 事件对象的 type 属性的值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static LOADER_ERROR: string = "onLoadError";
        
        /**
        * @language zh_CN
        * 加载对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public loader: ILoader;

          /**
        * @language zh_CN
        * 加载对象的总大小
        * @version Egret 3.0
        * @platform Web,Native
        */
        public total: number;


        /**
        * @language zh_CN
        * 加载对象的当前的加载大小
        * @version Egret 3.0
        * @platform Web,Native
        */
        public loaded: number;


        /**
        * @language zh_CN
        * 加载进度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public currentProgress: number;

       // addEventListener(type: "abort", listener: (ev: Event) => any, useCapture?: boolean): void;
       // addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
        //addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
        //addEventListener(type: "loadend", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
       // addEventListener(type: "loadstart", listener: (ev: Event) => any, useCapture?: boolean): void;
       // addEventListener(type: "progress", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
        //addEventListener(type: "readystatechange", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
       // addEventListener(type: "timeout", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    }
}