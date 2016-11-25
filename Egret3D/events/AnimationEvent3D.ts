module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.AnimationEvent3D
    * @classdesc
    * 在骨骼动画、粒子动画和属性动画播放时，会有触发动画播放完成事件和动画帧更改事件。
    * AnimationEvent3D内定义了这两种事件的标识符，发生事件时。
    * AnimationEvent3D 对象将作为参数传递给事件侦听器。
    * EVENT_PLAY_COMPLETE 粒子动画 骨骼动画 属性动画 都会触发。
    * EVENT_FRAME_CHANGE 骨骼动画会触发。
    *
    * @see egret3d.PropertyAnimController
    * @see egret3d.SkeletonAnimation
    * @see egret3d.ParticleAnimation
    * @see egret3d.Event3D
    * @see egret3d.EventDispatcher
    * @includeExample events/PropertyAnimEvent3D.ts
    * @includeExample events/SkeletonAnimationEvent3D.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class AnimationEvent3D extends Event3D {

        /**
        * @language zh_CN
        * EVENT_PLAY_COMPLETE 常量定义 属性动画播放完成事件标识。
        * 可注册对象 : PropertyAnimController，SkeletonAnimation 
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