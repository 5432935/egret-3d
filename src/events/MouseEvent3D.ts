module egret3d {

    
    /**
     * @language zh_CN
     * 鼠标键码
     * @version Egret 3.0
     * @platform Web,Native
     */
    export enum MouseCode {

        /**
        * @language zh_CN
        * 鼠标左键
        * @version Egret 3.0
        * @platform Web,Native
        */
        Mouse_Left = 0,

        /**
        * @language zh_CN
        * 鼠标中键
        * @version Egret 3.0
        * @platform Web,Native
        */
        Mouse_Mid = 1,

        /**
        * @language zh_CN
        * 鼠标右键
        * @version Egret 3.0
        * @platform Web,Native
        */
        Mouse_Right = 2,
    }

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
    export class MouseEvent3D extends Event3D {

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
        public static MOUSE_CLICK: string = "onMouseClick";

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
        public static MOUSE_DOWN: string = "onMouseDown";

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
        public static MOUSE_UP: string = "onMouseUp";

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
        public static MOUSE_MOVE: string = "onMouseMove";

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
        public static MOUSE_OVER: string = "onMouseOver";

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
        public static MOUSE_OUT: string = "onMouseOut";
        
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
        public static MOUSE_WHEEL: string = "onMouseWheel";

                
      /**
         * @language zh_CN
         * 鼠标code值,枚举值可以参考egret3d.MouseCode
         * @see egret3d.MouseCode
         * @version Egret 3.0
         * @platform Web,Native
         */
        public mouseCode: number = 0;
    }
}