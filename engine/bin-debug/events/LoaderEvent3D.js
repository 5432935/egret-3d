var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var egret3d;
(function (egret3d) {
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
    var LoaderEvent3D = (function (_super) {
        __extends(LoaderEvent3D, _super);
        function LoaderEvent3D() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return LoaderEvent3D;
    }(egret3d.Event3D));
    /**
    * @language zh_CN
    * LOADER_COMPLETE 常量定义 资源加载完成事件标识。
    * (3.2.5版本后请使用COMPLETE)
    * 可注册对象 : URLLoader类型。
    * 事件响应状态 : 加载完成后触发。
    * 响应事件参数 : LoaderEvent3D类型,其中LoaderEvent3D.data的内容即为此次加载的内容。
    * @see egret3d.URLLoader
    * @version Egret 3.0
    * @platform Web,Native
    */
    LoaderEvent3D.LOADER_COMPLETE = "onLoadComplete";
    /**
    * @language zh_CN
    * COMPLETE 常量定义 资源加载完成事件标识。
    * 可注册对象 : URLLoader类型。
    * 事件响应状态 : 加载完成后触发。
    * 响应事件参数 : LoaderEvent3D类型,其中LoaderEvent3D.data的内容即为此次加载的内容。
    * @see egret3d.URLLoader
    * @version Egret 3.0
    * @platform Web,Native
    */
    LoaderEvent3D.COMPLETE = "onLoadComplete";
    /**
    * @language zh_CN
    * LOADER_ONCE_COMPLETE 常量定义 资源加载一个文件完成事件标识。
    * (3.2.5版本后请使用ONCE_COMPLETE)
    * 可注册对象 : URLLoader类型。
    * 事件响应状态 : 加载一个文件完成触发。
    * 响应事件参数 : LoaderEvent3D类型,其中LoaderEvent3D.data的内容即为此次加载的内容。
    * @see egret3d.URLLoader
    * @version Egret 3.0
    * @platform Web,Native
    */
    LoaderEvent3D.LOADER_ONCE_COMPLETE = "onLoadOnceComplete";
    /**
    * @language zh_CN
    * ONCE_COMPLETE 常量定义 资源加载一个文件完成事件标识。
    * 可注册对象 : URLLoader类型。
    * 事件响应状态 : 加载一个文件完成触发。
    * 响应事件参数 : LoaderEvent3D类型,其中LoaderEvent3D.data的内容即为此次加载的内容。
    * @see egret3d.URLLoader
    * @version Egret 3.0
    * @platform Web,Native
    */
    LoaderEvent3D.ONCE_COMPLETE = "onLoadOnceComplete";
    /**
    * @language zh_CN
    * LOADER_PROGRESS 常量定义 加载进度事件标识。
    * (3.2.5版本后请使用PROGRESS)
    * 可注册对象 : URLLoader类型。
    * 事件响应状态 : 加载过程中事件响应。
    * 响应事件参数 : LoaderEvent3D类型,其中LoaderEvent3D.currentProgress的内容即为此次加载的进度。
    * @see egret3d.URLLoader
    * @version Egret 3.0
    * @platform Web,Native
    */
    LoaderEvent3D.LOADER_PROGRESS = "onLoadProgress";
    /**
    * @language zh_CN
    * PROGRESS 常量定义 加载进度事件标识。
    * 可注册对象 : URLLoader类型。
    * 事件响应状态 : 加载过程中事件响应。
    * 响应事件参数 : LoaderEvent3D类型,其中LoaderEvent3D.currentProgress的内容即为此次加载的进度。
    * @see egret3d.URLLoader
    * @version Egret 3.0
    * @platform Web,Native
    */
    LoaderEvent3D.PROGRESS = "onLoadProgress";
    /**
    * @language zh_CN
    * LOADER_ERROR 常量定义 加载出错事件标识。
    * (3.2.5版本后请使用ERROR)
    * 可注册对象 : URLLoader类型。
    * 事件响应状态 : 加载出错时事件响应。
    * 响应事件参数 : LoaderEvent3D类型,其中LoaderEvent3D.loader的内容即为出错的加载器。
    * @see egret3d.URLLoader
    * @version Egret 3.0
    * @platform Web,Native
    */
    LoaderEvent3D.LOADER_ERROR = "onLoadError";
    /**
    * @language zh_CN
    * LOADER_ERROR 常量定义 加载出错事件标识。
    * 可注册对象 : URLLoader类型。
    * 事件响应状态 : 加载出错时事件响应。
    * 响应事件参数 : LoaderEvent3D类型,其中LoaderEvent3D.loader的内容即为出错的加载器。
    * @see egret3d.URLLoader
    * @version Egret 3.0
    * @platform Web,Native
    */
    LoaderEvent3D.ERROR = "onLoadError";
    egret3d.LoaderEvent3D = LoaderEvent3D;
    __reflect(LoaderEvent3D.prototype, "egret3d.LoaderEvent3D");
})(egret3d || (egret3d = {}));
