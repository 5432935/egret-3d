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
     * 鼠标键码
     * @version Egret 3.0
     * @platform Web,Native
     */
    var MouseCode;
    (function (MouseCode) {
        /**
        * @language zh_CN
        * 鼠标左键
        * @version Egret 3.0
        * @platform Web,Native
        */
        MouseCode[MouseCode["Mouse_Left"] = 0] = "Mouse_Left";
        /**
        * @language zh_CN
        * 鼠标中键
        * @version Egret 3.0
        * @platform Web,Native
        */
        MouseCode[MouseCode["Mouse_Mid"] = 1] = "Mouse_Mid";
        /**
        * @language zh_CN
        * 鼠标右键
        * @version Egret 3.0
        * @platform Web,Native
        */
        MouseCode[MouseCode["Mouse_Right"] = 2] = "Mouse_Right";
    })(MouseCode = egret3d.MouseCode || (egret3d.MouseCode = {}));
    /**
    * @language zh_CN
    * @class egret3d.MouseEvent3D
    * @classdesc
    * MouseEvent3D 是所有引擎中可操作鼠标事件节点 的事件类型标记。
    * 只有Input.addEventListener 才会产生下类事件
    * @includeExample events/MouseEvent3D.ts
    * @see egret3d.Event3D
    * @see egret3d.EventDispatcher
    * @see egret3d.Input
    * @version Egret 3.0
    * @platform Web,Native
    */
    var MouseEvent3D = (function (_super) {
        __extends(MouseEvent3D, _super);
        function MouseEvent3D() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
               * @language zh_CN
               * 鼠标code值,枚举值可以参考egret3d.MouseCode
               * @see egret3d.MouseCode
               * @version Egret 3.0
               * @platform Web,Native
               */
            _this.mouseCode = 0;
            return _this;
        }
        return MouseEvent3D;
    }(egret3d.Event3D));
    /**
     * @language zh_CN
     * MOUSE_CLICK 常量定义 鼠标点击事件标识。
     * 可注册对象 : Input类型。
     * 事件响应状态 : 鼠标点击后触发。
     * 响应事件参数 : MouseEvent3D类型,其中LoaderEvent3D.mouseCode的内容即为此次鼠标键码。
     * @see egret3d.Input
     * @version Egret 3.0
     * @platform Web,Native
     */
    MouseEvent3D.MOUSE_CLICK = "onMouseClick";
    /**
     * @language zh_CN
     * MOUSE_DOWN 常量定义 鼠标按下事件标识。
     * 可注册对象 : Input类型。
     * 事件响应状态 : 鼠标按下后触发。
     * 响应事件参数 : MouseEvent3D类型,其中LoaderEvent3D.mouseCode的内容即为此次鼠标键码。
     * @see egret3d.Input
     * @version Egret 3.0
     * @platform Web,Native
     */
    MouseEvent3D.MOUSE_DOWN = "onMouseDown";
    /**
     * @language zh_CN
     * MOUSE_UP 常量定义 鼠标弹回事件标识
     * 可注册对象 : Input类型。
     * 事件响应状态 : 鼠标弹回后触发。
     * 响应事件参数 : MouseEvent3D类型,其中LoaderEvent3D.mouseCode的内容即为此次鼠标键码。
     * @see egret3d.Input
     * @version Egret 3.0
     * @platform Web,Native
     */
    MouseEvent3D.MOUSE_UP = "onMouseUp";
    /**
     * @language zh_CN
     * MOUSE_MOVE 常量定义 鼠标移动事件标识。
     * 可注册对象 : Input类型。
     * 事件响应状态 : 鼠标移动时触发。
     * 响应事件参数 : MouseEvent3D类型,其中LoaderEvent3D.mouseCode的内容即为此次鼠标键码。
     * @see egret3d.Input
     * @version Egret 3.0
     * @platform Web,Native
     */
    MouseEvent3D.MOUSE_MOVE = "onMouseMove";
    /**
     * @language zh_CN
     * MOUSE_OVER 常量定义 鼠标穿过物体事件标识。
     * 可注册对象 : Input类型。
     * 事件响应状态 : 鼠标穿过物体时触发。
     * 响应事件参数 : MouseEvent3D类型,其中LoaderEvent3D.mouseCode的内容即为此次鼠标键码。
     * @see egret3d.Input
     * @version Egret 3.0
     * @platform Web,Native
     */
    MouseEvent3D.MOUSE_OVER = "onMouseOver";
    /**
    * @language zh_CN
    * MOUSE_OVER 常量定义 鼠标离开物体事件标识。
    * 可注册对象 : Input类型。
    * 事件响应状态 : 鼠标离开物体时触发。
    * 响应事件参数 : MouseEvent3D类型,其中LoaderEvent3D.mouseCode的内容即为此次鼠标键码。
    * @see egret3d.Input
    * @version Egret 3.0
    * @platform Web,Native
    */
    MouseEvent3D.MOUSE_OUT = "onMouseOut";
    /**
     * @language zh_CN
     * MOUSE_WHEEL 常量定义 滚轮事件标识。
     * 可注册对象 : Input类型。
     * 事件响应状态 : 鼠标滚轮滚动时触发。
     * 响应事件参数 : MouseEvent3D类型。
     * @see egret3d.Input
     * @version Egret 3.0
     * @platform Web,Native
     */
    MouseEvent3D.MOUSE_WHEEL = "onMouseWheel";
    egret3d.MouseEvent3D = MouseEvent3D;
    __reflect(MouseEvent3D.prototype, "egret3d.MouseEvent3D");
})(egret3d || (egret3d = {}));
