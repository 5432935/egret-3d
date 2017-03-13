var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @class egret3d.RenderBase
    * @classdesc
    * 渲染器基类
    */
    var RenderBase = (function () {
        /**
        * @language zh_CN
        * constructor
        */
        function RenderBase() {
            /**
            * @language zh_CN
            * 渲染器名字
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.name = "default";
            /**
            * @language zh_CN
            * 是否启用当前渲染器，善用当前开关，可以优化渲染性能
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.enabled = true;
            /**
            * @language zh_CN
            * 渲染器使用的相机
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.viewPort = new egret3d.Rectangle();
        }
        Object.defineProperty(RenderBase.prototype, "pass", {
            /**
            * @public
            * @language zh_CN
            * 渲染器渲染的通道名
            * @classdesc
            */
            get: function () {
                return this._pass;
            },
            /**
            * @public
            * @language zh_CN
            * 渲染器渲染的通道名
            * @classdesc
            */
            set: function (value) {
                this._pass = value;
            },
            enumerable: true,
            configurable: true
        });
        RenderBase.prototype.setRenderToTexture = function (width, height, format) {
            if (format === void 0) { format = egret3d.FrameBufferFormat.UNSIGNED_BYTE_RGB; }
            if (this.renderTexture)
                this.renderTexture.dispose();
            this.renderTexture = new egret3d.RenderTexture(width, height, format);
        };
        /**
        * @language zh_CN
        * 每帧渲染
        * @param time 当前时间
        * @param delay 每帧间隔时间
        * @param context3D 设备上下文
        * @param collect 渲染对象收集器
        * @param camera 渲染时的相机
        */
        RenderBase.prototype.draw = function (time, delay, context3D, collect, backViewPort, renderQuen, posList) {
            if (posList === void 0) { posList = null; }
        };
        return RenderBase;
    }());
    egret3d.RenderBase = RenderBase;
    __reflect(RenderBase.prototype, "egret3d.RenderBase");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=RenderBase.js.map