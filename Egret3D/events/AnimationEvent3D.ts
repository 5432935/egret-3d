module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.AnimationEvent3D
    * @classdesc
    * 动画播放产生事件
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class AnimationEvent3D extends Event3D {

        /**
        * @language zh_CN
        * EVENT_PLAY_COMPLETE 常量定义 属性动画播放完成事件标识。
        * 可注册对象 : PropertyAnimController、SkeletonAnimation 
        * 事件响应状态 : 属性动画播放完成时触发。
        * 响应事件参数 : AnimationEvent3D类型。
        * @see egret3d.Event3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static EVENT_PLAY_COMPLETE: string = "event_play_complete";

        /**
        * @language zh_CN
        * EVENT_FRAME_CHANGE 常量定义 动画帧更改的事件标识。
        * 可注册对象 : SkeletonAnimation
        * 事件响应状态 :  动画帧更改时触发。
        * 响应事件参数 : AnimationEvent3D类型。
        * @see egret3d.Event3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static EVENT_FRAME_CHANGE: string = "event_frame_change";
    }

} 