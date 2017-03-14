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
    var AnimationEvent3D = (function (_super) {
        __extends(AnimationEvent3D, _super);
        function AnimationEvent3D() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AnimationEvent3D;
    }(egret3d.Event3D));
    /**
    * @language zh_CN
    * 动画属性是循环状态下触发
    * 动画一个周期结束后循环
    * 可注册对象 : SkeletonAnimation
    * 响应事件参数 : AnimationEvent3D类型。
    * @see egret3d.Event3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    AnimationEvent3D.CYCLE = "cycle";
    /**
    * @language zh_CN
    * 动画属性是非循环状态下触发
    * 动画在不循环的时候完成动画触发
    * 可注册对象 : SkeletonAnimation
    * 响应事件参数 : AnimationEvent3D类型。
    * @see egret3d.Event3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    AnimationEvent3D.COMPLETE = "complete";
    egret3d.AnimationEvent3D = AnimationEvent3D;
    __reflect(AnimationEvent3D.prototype, "egret3d.AnimationEvent3D");
})(egret3d || (egret3d = {}));
