var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @class egret3d.Event3D
    * @classdesc
    * Event3D 类作为创建 Event3D 对象的基类，当发生事件时，Event3D 对象将作为参数传递给事件侦听器。
    * Event3D 类的属性包含有关事件的基本信息，例如事件的类型。对于许多事件（如由 Event3D 类常量表示的事件），
    * 此基本信息就足够了。但其他事件可能需要更详细的信息。
    * 例如，与鼠标单击关联的事件需要包括有关单击事件的位置以及在单击事件期间是否按下了任何键的其他信息。
    * 您可以通过扩展 Event3D 类（MouseEvent 类执行的操作）将此类其他信息传递给事件侦听器。
    * @includeExample events/Event3D.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Event3D = (function () {
        /**
        * @language zh_CN
        * 创建一个作为参数传递给事件侦听器的 Event3D 对象。
        * @param eventType {any} 事件类型
        * @param data {any} 附加数据(可选)
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Event3D(eventType, data) {
            if (eventType === void 0) { eventType = null; }
            if (data === void 0) { data = null; }
            /**
            * @language zh_CN
            * 当前时间戳。
            * @see egret3d.Stage3D
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.time = 0;
            /**
            * @language zh_CN
            * 每帧间隔延时。
            * @see egret3d.Stage3D
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.delay = 0;
            this._stopImmediatePropagation = false;
            this.eventType = eventType;
            this.data = data;
        }
        /**
        * @language zh_CN
        * 防止对事件流中当前节点的后续节点中的所有事件侦听器进行处理。
        * @version Egret 3.0
        * @platform Web,Native
        */
        Event3D.prototype.stopImmediatePropagation = function () {
            this._stopImmediatePropagation = true;
        };
        /**
         * @private
       * @language zh_CN
       * 重置_stopImmediatePropagation等属性为默认值.引擎内部使用.不对外开放
       * @version Egret 3.0
       * @platform Web,Native
       */
        Event3D.prototype.reset = function () {
            this._stopImmediatePropagation = false;
        };
        Object.defineProperty(Event3D.prototype, "isStopImmediatePropagation", {
            /**
            * @language zh_CN
            * (只读)是否调用过 stopImmediatePropagation() 方法.
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._stopImmediatePropagation;
            },
            enumerable: true,
            configurable: true
        });
        return Event3D;
    }());
    /**
    * @language zh_CN
    * COMPLETE 常量定义 相关完成事件。
    * @version Egret 3.0
    * @platform Web,Native
    */
    //static COMPLETE: string = "complete";
    /**
    * @language zh_CN
    * CHANGE_PROPERTY 常量定义 changeProperty 事件对象的 type 属性的值。
    * @version Egret 3.0
    * @platform Web,Native
    */
    //static CHANGE: string = "change";
    /**
    * @language zh_CN
    * ENTER_FRAME 常量定义 每帧更新事件标识。
    * 可注册对象 : Stage3D类型。
    * 事件响应状态 : 每帧更新时响应一次。
    * 响应事件参数 : Event3D类型,其中Event3D.target的内容即为此次注册事件的Stage3D对象。
    * @see egret3d.Stage3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    Event3D.ENTER_FRAME = "enter_frame";
    /**
    * @language zh_CN
    * RESIZE 常量定义 窗体尺寸变换事件标识。
    * 可注册对象 : Input类型。
    * 事件响应状态 : 窗体尺寸变换时响应一次。
    * 响应事件参数 : Event3D类型,其中Event3D.target的内容即为此次注册事件的Input对象。
    * @see egret3d.Input
    * @version Egret 3.0
    * @platform Web,Native
    */
    Event3D.RESIZE = "resize";
    /**
    * @private
    * @language zh_CN
    * CHANGE 常量定义 change 事件对象的 type 属性值。
    * @version Egret 3.0
    * @platform Web,Native
    */
    Event3D.CHANGE = "change";
    egret3d.Event3D = Event3D;
    __reflect(Event3D.prototype, "egret3d.Event3D");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Event3D.js.map