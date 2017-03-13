module egret3d {
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
    export class Event3D {

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
        static ENTER_FRAME: string = "enter_frame";

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
        static RESIZE: string = "resize";


        /**
        * @private
        * @language zh_CN
        * CHANGE 常量定义 change 事件对象的 type 属性值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        static CHANGE: string = "change";

        //----------------------------------------------------
        //----------------------------------------------------
        //----------------------------------------------------


        /**
        * @language zh_CN
        * 事件目标。
        * 一般为注册事件的对象本身。 EventDispatcher
        * @see egret3d.EventDispatcher
        * @version Egret 3.0
        * @platform Web,Native
        */
        public target: any;

        /**
        * @language zh_CN
        * 当前正在使用某个事件侦听器处理 Event3D 对象的对象
        * @see egret3d.EventListener
        * @version Egret 3.0
        * @platform Web,Native
        */
        public currentTarget: EventListener;

        /**
        * @language zh_CN
        * 3D引擎中的事件的类型标识字符串
        * @version Egret 3.0
        * @platform Web,Native
        */
        public eventType: string;

        /**
        * @language zh_CN
        * 附加数据。
        * 例如,保存QueueLoader加载后的原始数据,加载完毕后,作为参数传出。
        * @see egret3d.QueueLoader
        * @version Egret 3.0
        * @platform Web,Native
        */
        public data: any;

        /**
        * @language zh_CN
        * 注册事件时传递的参数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public param: any;

        /**
        * @language zh_CN
        * 当前时间戳。
        * @see egret3d.Stage3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public time: number = 0;

        /**
        * @language zh_CN
        * 每帧间隔延时。
        * @see egret3d.Stage3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public delay: number = 0;

        private _stopImmediatePropagation:boolean   = false;

        /**
        * @language zh_CN
        * 创建一个作为参数传递给事件侦听器的 Event3D 对象。
        * @param eventType {any} 事件类型
        * @param data {any} 附加数据(可选)
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(eventType: string = null, data: any = null) {
            this.eventType = eventType;
            this.data = data;
        }
        /**
        * @language zh_CN
        * 防止对事件流中当前节点的后续节点中的所有事件侦听器进行处理。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public stopImmediatePropagation() {
            this._stopImmediatePropagation = true;
        }


         /**
          * @private 
        * @language zh_CN
        * 重置_stopImmediatePropagation等属性为默认值.引擎内部使用.不对外开放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public reset() {
            this._stopImmediatePropagation = false;
        }

        /**
        * @language zh_CN
        * (只读)是否调用过 stopImmediatePropagation() 方法.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get isStopImmediatePropagation(): boolean {
            return this._stopImmediatePropagation;
        }
    }
}