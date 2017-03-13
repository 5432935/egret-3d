var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @class egret3d.CameraAnimationController
    * @classdesc
    * 摄像机动画控制器。
    * 每个摄像机动画绑定一个摄像机，控制摄像机的行为
    * 可以更换绑定的摄像机
    * @see egret3d.Camera3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    var CameraAnimationController = (function () {
        /**
        * @language zh_CN
        * 构造函数
        * @param camera 需要一个摄像机对象来创建摄像机动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        function CameraAnimationController(camera) {
            if (camera === void 0) { camera = null; }
            /**
            * @language zh_CN
            * 相机动画每帧数据列表
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.cameraAnimationFrames = [];
            this._playing = false;
            this._playTime = 0;
            this._currentFrameIndex = 0;
            this._loop = true;
            this._smooth = true;
            this._cameraAnimationFrame = new CameraAnimationFrame();
            this._event = new egret3d.Event3D();
            this._quatCurrentFrame = new egret3d.Quaternion();
            this._quatnNextFrame = new egret3d.Quaternion();
            this._quatn = new egret3d.Quaternion();
            this._camera = camera;
            this._cameraAnimationFrame.fov = 45;
            this._cameraAnimationFrame.rotation = new egret3d.Vector3();
            this._cameraAnimationFrame.translation = new egret3d.Vector3();
        }
        /**
        * @language zh_CN
        * 绑定动画控制的相机
        * @param camera
        * @version Egret 3.0
        * @platform Web,Native
        */
        CameraAnimationController.prototype.bindCamera = function (camera) {
            this._camera = camera;
        };
        /**
        * @language zh_CN
        * 播放相机动画 是否循环
        * @param isLoop 是否循环播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        CameraAnimationController.prototype.play = function (isLoop) {
            if (this.cameraAnimationFrames.length <= 0)
                return;
            this._loop = isLoop;
            this._playTime = 0;
            this._camera.isController = false;
            this._playing = true;
        };
        /**
        * @language zh_CN
        * 停止播放相机动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        CameraAnimationController.prototype.stop = function () {
            this._camera.isController = true;
            this._playing = false;
        };
        /**
        * @private
        * @language zh_CN
        * 数据更新
        * @param time 当前时间
        * @param delay 每帧间隔时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        CameraAnimationController.prototype.update = function (time, delay) {
            if (!this._playing)
                return;
            this._playTime += delay * 5;
            var Tnow = this._playTime % ((this.cameraAnimationFrames[this.cameraAnimationFrames.length - 1].time - this.cameraAnimationFrames[0].time) + (160));
            var currentFrameIndex = Math.floor(Tnow / (160)) % this.cameraAnimationFrames.length;
            if (this._currentFrameIndex > currentFrameIndex) {
                if (!this._loop) {
                    this._playing = false;
                    this._camera.isController = true;
                }
                if (this._camera) {
                    this._event.eventType = CameraAnimationController.EVENT_CAMERA_COMPLETE;
                    this._camera.dispatchEvent(this._event);
                }
            }
            this._currentFrameIndex = currentFrameIndex;
            var currentFrame = this.cameraAnimationFrames[currentFrameIndex];
            if (this._smooth) {
                var nextFrameIndex = (currentFrameIndex + 1) % this.cameraAnimationFrames.length;
                var nextFrame = this.cameraAnimationFrames[nextFrameIndex];
                var t = (Tnow - currentFrame.time) / Math.abs(nextFrame.time - currentFrame.time);
                ///(v1.x - v0.x) * t + v0.x;
                this._cameraAnimationFrame.fov = (nextFrame.fov - currentFrame.fov) * t + currentFrame.fov;
                this._quatCurrentFrame.fromEulerAngles(currentFrame.rotation.x, currentFrame.rotation.y, currentFrame.rotation.z);
                this._quatnNextFrame.fromEulerAngles(nextFrame.rotation.x, nextFrame.rotation.y, nextFrame.rotation.z);
                this._quatn.lerp(this._quatCurrentFrame, this._quatnNextFrame, t);
                this._quatn.toEulerAngles(this._cameraAnimationFrame.rotation);
                this._cameraAnimationFrame.translation.lerp(currentFrame.translation, nextFrame.translation, t);
            }
            else {
                this._cameraAnimationFrame.fov = currentFrame.fov;
                this._cameraAnimationFrame.rotation.copyFrom(currentFrame.rotation);
                this._cameraAnimationFrame.translation.copyFrom(currentFrame.translation);
            }
            //this._camera.fieldOfView = this._cameraAnimationFrame.fov;
            this._camera.rotation = this._cameraAnimationFrame.rotation;
            this._camera.position = this._cameraAnimationFrame.translation;
        };
        return CameraAnimationController;
    }());
    /**
    * @language zh_CN
    * 动画播放完一个周期的事件
    */
    CameraAnimationController.EVENT_CAMERA_COMPLETE = "event_camera_complete";
    egret3d.CameraAnimationController = CameraAnimationController;
    __reflect(CameraAnimationController.prototype, "egret3d.CameraAnimationController");
    /**
    * @class egret3d.CameraAnimationFrame
    * @private
    * @classdesc
    * 摄像机动画每帧数据
    * @version Egret 3.0
    * @platform Web,Native
    */
    var CameraAnimationFrame = (function () {
        function CameraAnimationFrame() {
        }
        return CameraAnimationFrame;
    }());
    egret3d.CameraAnimationFrame = CameraAnimationFrame;
    __reflect(CameraAnimationFrame.prototype, "egret3d.CameraAnimationFrame");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=CameraAnimationController.js.map