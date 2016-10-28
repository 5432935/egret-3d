module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.SkeletonAnimationEvent3D
    * @classdesc
    * 骨骼动画播放产生事件
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class SkeletonAnimationEvent3D extends Event3D {

        /**
        * @language zh_CN
        * 动画播放完一个周期的事件
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static EVENT_PLAY_COMPLETE: string = "event_play_complete";

        /**
        * @language zh_CN
        * 动画帧更改的事件
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static EVENT_FRAME_CHANGE: string = "event_frame_change";

        constructor(eventType: string = null, data: any = null) {
            super(eventType, data);
        }
    }

}