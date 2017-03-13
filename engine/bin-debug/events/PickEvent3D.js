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
    * @class egret3d.PickEvent3D
    * @classdesc
    * PickEvent3D 是所有引擎中可操作物体拣选事件的事件类型标记。
    * 当IRender对象开启了 enablePick ，并且监听了PickEvent3D事件后，
    * 鼠标或触摸对IRender对象进行操作后会产生一些对应的事件进行影响。
    * 只有Object3D对象调用addEventListener 才会产生下类事件
    * @includeExample events/PickEvent3D.ts
    * @see egret3d.Event3D
    * @see egret3d.EventDispatcher
    * @see egret3d.Object3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    var PickEvent3D = (function (_super) {
        __extends(PickEvent3D, _super);
        function PickEvent3D() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PickEvent3D;
    }(egret3d.Event3D));
    /**
     * @language zh_CN
     * PICK_CLICK 点击拣选事件标识
     * 可注册对象 : Object3D类型。
     * 事件响应状态 : 点击拣选时触发，手机上不触发此事件。
     * 响应事件参数 : PickEvent3D类型,其中PickEvent3D.pickResult的内容即为此次拣选结果。
     * @version Egret 3.0
     * @platform Web,Native
     */
    PickEvent3D.PICK_CLICK = "onPickClick";
    /**
     * @language zh_CN
     * PICK_DOWN  按下拣选事件标识
     * 可注册对象 : Object3D类型。
     * 事件响应状态 : 按下拣选时触发。
     * 响应事件参数 : PickEvent3D类型,其中PickEvent3D.pickResult的内容即为此次拣选结果。
     * @version Egret 3.0
     * @platform Web,Native
     */
    PickEvent3D.PICK_DOWN = "onPickDown";
    /**
     * @language zh_CN
     * PICK_UP 弹起拣选事件标识
     * 可注册对象 : Object3D类型。
     * 事件响应状态 : 弹起拣选时触发。
     * 响应事件参数 : PickEvent3D类型,其中PickEvent3D.pickResult的内容即为此次拣选结果。
     * @version Egret 3.0
     * @platform Web,Native
     */
    PickEvent3D.PICK_UP = "onPickUp";
    /**
     * @language zh_CN
     * PICK_MOVE 光标移动拣选事件标识
     * 可注册对象 : Object3D类型。
     * 事件响应状态 : 光标移动拣选时触发。
     * 响应事件参数 : PickEvent3D类型,其中PickEvent3D.pickResult的内容即为此次拣选结果。
     * @version Egret 3.0
     * @platform Web,Native
     */
    PickEvent3D.PICK_MOVE = "onPickMove";
    /**
     * @language zh_CN
     * PICK_WHEEL 滚轮滚动拣选事件标识
     * 可注册对象 : Object3D类型。
     * 事件响应状态 : 滚轮滚动拣选时触发。
     * 响应事件参数 : PickEvent3D类型,其中PickEvent3D.pickResult的内容即为此次拣选结果。
     * @version Egret 3.0
     * @platform Web,Native
     */
    PickEvent3D.PICK_WHEEL = "onPickWheel";
    egret3d.PickEvent3D = PickEvent3D;
    __reflect(PickEvent3D.prototype, "egret3d.PickEvent3D");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=PickEvent3D.js.map