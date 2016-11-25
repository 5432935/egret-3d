module egret3d {

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
    export class TouchEvent3D extends Event3D {
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
        static TOUCH_MOVE: string = "onTouchMove";

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
        static TOUCH_START: string = "onTouchStart";
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
        static TOUCH_END: string = "onTouchEnd";

        /**
        * @language zh_CN
        * touch列表
        * @version Egret 3.0
        * @see egret3d.TouchData
        * @platform Web,Native
        */
        public targetTouches: Array<TouchData>;
    }
} 