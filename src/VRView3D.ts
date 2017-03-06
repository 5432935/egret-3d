module egret3d {

    /**
    * @private
    */
    export class EyesCamera {

        public leftCamera: Camera3D;
        public rightCamera: Camera3D;
        public mainCamera: Camera3D;
        public eyeCross: number = 70 ;


        public eyeRay: Vector3D = new Vector3D();
        public dir: Vector3D = new Vector3D();
        constructor(camera: Camera3D, fov: number = 55, eyeCross: number = 70) {
            this.mainCamera = camera; 
            this.leftCamera = new Camera3D();
            this.rightCamera = new Camera3D();
        }

        public update() {

            this.mainCamera.globalOrientation.transformVector(Vector3D.X_AXIS, this.dir);
            this.dir.normalize();

            this.leftCamera.modelMatrix = this.mainCamera.modelMatrix;
            this.rightCamera.modelMatrix = this.mainCamera.modelMatrix;

            var space: number = this.eyeCross * 0.5;

            this.leftCamera.x += -this.dir.x * space;
            this.leftCamera.y += -this.dir.y * space;
            this.leftCamera.z += -this.dir.z * space;

            this.rightCamera.x += this.dir.x * space;
            this.rightCamera.y += this.dir.y * space;
            this.rightCamera.z += this.dir.z * space;
        }

    }

    /**
    * @class egret3d.View3D
    * @classdesc
    * VRView3D 会把场景渲染成两个视口。
    * 两个视口是由不同的摄像机渲染出来的结果，也相当由左右眼。
    * @see egret3d.Camera3D
    * @see egret3d.Scene3D
    * @see egret3d.Egret3DCanvas
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class VRView3D extends View3D {

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public eyesCamera: EyesCamera;

        private _leftHUD: HUD;
        private _rightHUD: HUD;

        protected leftRender: MultiRender;
        protected rightRender: MultiRender;

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public w: number = 0;

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public h: number = 0;

        /**
        * @language zh_CN
        * 构建一个view3d对象
        * @param x 视口的屏幕x坐标
        * @param y 视口的屏幕y坐标
        * @param width 视口的屏幕宽度
        * @param height 视口的屏幕高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(x: number, y: number, width: number, height: number) {
            super(x, y, width, height, new Camera3D(CameraType.perspective));

            this.w = width; 
            this.h = height; 
            this.init();
        }

        private init() {
            this.eyesCamera = new EyesCamera( this.camera3D );

            //this.leftRender = new MultiRender(PassType.diffusePass);
            //this.rightRender = new MultiRender(PassType.diffusePass);

            //this.leftRender.setRenderToTexture(512, 512);
            //this.rightRender.setRenderToTexture(512, 512);

            //this.leftRender.name = "VR_left";
            //this.rightRender.name = "VR_right";

            //this.leftRender.camera = this.eyesCamera.leftCamera;
            //this.rightRender.camera = this.eyesCamera.rightCamera;

            //this._renderQuen.mainRender.enabled = false;
            //this._renderQuen.addRender(this.leftRender);
            //this._renderQuen.addRender(this.rightRender);

            //this._leftHUD = new HUD();
            //this._rightHUD = new HUD();

            //this._leftHUD.vsShader = "hud_vs";
            //this._leftHUD.fsShader = "hud_H_fs";

            //this._rightHUD.vsShader = "hud_vs";
            //this._rightHUD.fsShader = "hud_H_fs";
        }

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number) {
            this.eyesCamera.update( );

            this.viewPort.width = this.w * 0.5;
            this.viewPort.height = this.h ;
            this.viewPort.x = this.w * 0.5 - this.viewPort.width - 10 ;
            this.viewPort.y = this.h * 0.5 - this.viewPort.height * 0.5 ;
            this.camera3D = this.eyesCamera.leftCamera; 
            super.update(time, delay);

            this.viewPort.width = this.w * 0.5;
            this.viewPort.height = this.h;
            this.viewPort.x = this.w * 0.5 + 10;
            this.viewPort.y = this.h * 0.5 - this.viewPort.height * 0.5;
            this.camera3D = this.eyesCamera.rightCamera; 
            super.update(time, delay);

            //this._leftHUD.width = this.width * 0.5;
            //this._leftHUD.height = this.height;
            //this._leftHUD.x = this.width * 0.5 - this._leftHUD.width - 10;//- this.eyesCamera.eyeCross * 0.5;
            //this._leftHUD.y = this.height * 0.5 - this._leftHUD.height * 0.5;

            //this._rightHUD.width = this.width * 0.5;
            //this._rightHUD.height = this.height;
            //this._rightHUD.x = this.width * 0.5 + 10;//this.eyesCamera.eyeCross * 0.5;
            //this._rightHUD.y = this.height * 0.5 - this._rightHUD.height * 0.5;

            //Egret3DCanvas.context3DProxy.viewPort(this._leftHUD.x, this._leftHUD.y, this._leftHUD.width, this._leftHUD.height);
            //Egret3DCanvas.context3DProxy.setScissorRectangle(this._leftHUD.x, this._leftHUD.y, this._leftHUD.width, this._leftHUD.height);

            //this._leftHUD.diffuseTexture = this.leftRender.renderTexture;
            //this._rightHUD.diffuseTexture = this.rightRender.renderTexture;

            //Egret3DCanvas.context3DProxy.viewPort(this._leftHUD.x, this._leftHUD.y, this._leftHUD.width, this._leftHUD.height);
            //Egret3DCanvas.context3DProxy.setScissorRectangle(this._leftHUD.x, this._leftHUD.y, this._leftHUD.width, this._leftHUD.height);
            //this._leftHUD.draw(Egret3DCanvas.context3DProxy, this.camera3D);

            //Egret3DCanvas.context3DProxy.viewPort(this._rightHUD.x, this._rightHUD.y, this._rightHUD.width, this._rightHUD.height);
            //Egret3DCanvas.context3DProxy.setScissorRectangle(this._rightHUD.x, this._rightHUD.y, this._rightHUD.width, this._rightHUD.height);
            //this._rightHUD.draw(Egret3DCanvas.context3DProxy, this.camera3D);
        }
    }
} 