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
    * @class egret3d.TouchEvent3D
    * @classdesc
    * TouchEvent3D 是所有引擎中可操作触摸事件节点 的事件类型标记。
    * 只有Input.addEventListener 才会产生下类事件
    * @includeExample events/TouchEvent3D.ts
    * @see egret3d.Event3D
    * @see egret3d.EventDispatcher
    * @see egret3d.Input
    * @version Egret 3.0
    * @platform Web,Native
    */
    var TouchEvent3D = (function (_super) {
        __extends(TouchEvent3D, _super);
        function TouchEvent3D() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TouchEvent3D;
    }(egret3d.Event3D));
    /**
     * @language zh_CN
     * TOUCH_MOVE 常量定义 触摸滑动事件标识。
     * 可注册对象 : Input类型。
     * 事件响应状态 : 触摸滑动时触发。
     * 响应事件参数 : TouchEvent3D类型,其中TouchEvent3D.targetTouches的内容即为此次触摸列表。
     * @see egret3d.Input
     * @version Egret 3.0
     * @platform Web,Native
     */
    TouchEvent3D.TOUCH_MOVE = "onTouchMove";
    /**
    * @language zh_CN
    * TOUCH_END 常量定义 触摸开始事件标识。
    * 可注册对象 : Input类型。
    * 事件响应状态 : 触摸开始触发。
    * 响应事件参数 : TouchEvent3D类型,其中TouchEvent3D.targetTouches的内容即为此次触摸列表。
    * @see egret3d.Input
    * @version Egret 3.0
    * @platform Web,Native
    */
    TouchEvent3D.TOUCH_START = "onTouchStart";
    /**
    * @language zh_CN
    * TOUCH_START 常量定义 触摸结束事件标识。
    * 可注册对象 : Input类型。
    * 事件响应状态 : 触摸结束触发。
    * 响应事件参数 : TouchEvent3D类型,其中TouchEvent3D.targetTouches的内容即为此次触摸列表。
    * @see egret3d.Input
    * @version Egret 3.0
    * @platform Web,Native
    */
    TouchEvent3D.TOUCH_END = "onTouchEnd";
    egret3d.TouchEvent3D = TouchEvent3D;
    __reflect(TouchEvent3D.prototype, "egret3d.TouchEvent3D");
})(egret3d || (egret3d = {}));
