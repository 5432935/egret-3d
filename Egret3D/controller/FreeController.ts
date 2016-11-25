module egret3d {

    /**
    * @private
    * @class egret3d.LookAtController
    * @classdesc
    * 自由 摄像机控制器 。</p>
    * 指定摄像机看向的目标对象。</p>
    * 1.按下鼠标左键并移动鼠标可以使摄像机绕着目标进行旋转。</p>
    * 2.按下键盘的(w s a d) 可以摄像机(上 下 左 右)移动。</p>
    * 3.滑动鼠标滚轮可以控制摄像机的视距。</p>
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class FreeController extends ControllerBase {

        protected dir: Vector3D = new Vector3D();
        protected static v0: Vector3D = new Vector3D();
        constructor(target: Object3D = null) {
            super(target, null);

            Input.addEventListener(MouseEvent3D.MOUSE_MOVE, this.mouseMove, this);
            Input.addEventListener(MouseEvent3D.MOUSE_WHEEL, this.mouseWheel, this);
            Input.addEventListener(TouchEvent3D.TOUCH_MOVE, this.touchMove, this);
        }

        protected touchMove(t: TouchEvent3D) {
            if (t.targetTouches.length == 1) {
                this.mouseMove(null);
            }
            else {
                this.mouseWheel(null);
            }
        }

        protected mouseWheel(m: MouseEvent3D) {
            if (!this._target) {
                return;
            }
            var camera: Camera3D = <Camera3D>this._target;
            if (!camera) {
                return;
            }
            var value: number = Input.wheelDelta * 0.1;

            var viewPort: Rectangle = camera.viewPort;
            switch (camera.cameraType) {
                case CameraType.orthogonal:
                    var w: number = viewPort.width - value;
                    var h: number = viewPort.height - value;
                    camera.updateViewport(0, 0, w, h);
                    break;
                case CameraType.orthogonalToCenter:
                    var x: number = viewPort.x - value;
                    var y: number = viewPort.y - value;
                    var w: number = viewPort.width - value;
                    var h: number = viewPort.height - value;

                    camera.updateViewport(x, y, w, h);
                    break;
                case CameraType.perspective:

                    this.target.globalOrientation.transformVector(egret3d.Vector3D.Z_AXIS, this.dir);
                    this.dir.normalize();
                    FreeController.v0.copyFrom(this.dir);
                    FreeController.v0.scaleBy(value);
                    this.target.globalPosition.add(FreeController.v0, FreeController.v0);
                    this.target.globalPosition = FreeController.v0;

                    break;
            }
        }

        protected mouseMove(m: egret3d.MouseEvent3D) {
            if (Input.getMousePress(MouseCode.Mouse_Left)) {

                this.target.rotationY += egret3d.Input.mouseOffsetX;
                this.target.rotationX += egret3d.Input.mouseOffsetY;
            }
        }

        /**
        * @language zh_CN
        * 控制器数据更新
        * @param delay 帧间隔
        * @param time 当前时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(delay: number = 16.6, time: number = 0) {
            if (!this.target) {
                return;
            }

            var speed: number = this.speed * delay / 1000;

            if (Input.getKeyPress(egret3d.KeyCode.Key_W)) {
                this.target.globalOrientation.transformVector(egret3d.Vector3D.Z_AXIS, this.dir);
                this.dir.normalize();
                FreeController.v0.copyFrom(this.dir);
                FreeController.v0.scaleBy(speed);
                this.target.globalPosition.add(FreeController.v0, FreeController.v0);
                this.target.globalPosition = FreeController.v0;
            }

            if (Input.getKeyPress(egret3d.KeyCode.Key_S)) {
                this.target.globalOrientation.transformVector(egret3d.Vector3D.Z_AXIS, this.dir);
                this.dir.normalize();
                FreeController.v0.copyFrom(this.dir);
                FreeController.v0.scaleBy(speed);
                this.target.globalPosition.subtract(FreeController.v0, FreeController.v0);
                this.target.globalPosition = FreeController.v0;
            }

            if (Input.getKeyPress(egret3d.KeyCode.Key_A)) {
                this.target.globalOrientation.transformVector(egret3d.Vector3D.X_AXIS, this.dir);
                this.dir.normalize();
                FreeController.v0.copyFrom(this.dir);
                FreeController.v0.scaleBy(speed);
                this.target.globalPosition.subtract(FreeController.v0, FreeController.v0);
                this.target.globalPosition = FreeController.v0;
            }

            if (Input.getKeyPress(egret3d.KeyCode.Key_D)) {
                this.target.globalOrientation.transformVector(egret3d.Vector3D.X_AXIS, this.dir);
                this.dir.normalize();
                FreeController.v0.copyFrom(this.dir);
                FreeController.v0.scaleBy(speed);
                this.target.globalPosition.add(FreeController.v0, FreeController.v0);
                this.target.globalPosition = FreeController.v0;
            }
        }
    }
}