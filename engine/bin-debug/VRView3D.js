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
    * @private
    */
    var EyesCamera = (function () {
        function EyesCamera(camera, fov, eyeCross) {
            if (fov === void 0) { fov = 55; }
            if (eyeCross === void 0) { eyeCross = 70; }
            this.eyeCross = 70;
            this.eyeRay = new egret3d.Vector3();
            this.dir = new egret3d.Vector3();
            this.mainCamera = camera;
            this.leftCamera = new egret3d.Camera3D();
            this.rightCamera = new egret3d.Camera3D();
        }
        EyesCamera.prototype.update = function () {
            this.mainCamera.globalOrientation.transformVector(egret3d.Vector3.X_AXIS, this.dir);
            this.dir.normalize();
            this.leftCamera.modelMatrix = this.mainCamera.modelMatrix;
            this.rightCamera.modelMatrix = this.mainCamera.modelMatrix;
            var space = this.eyeCross * 0.5;
            this.leftCamera.x += -this.dir.x * space;
            this.leftCamera.y += -this.dir.y * space;
            this.leftCamera.z += -this.dir.z * space;
            this.rightCamera.x += this.dir.x * space;
            this.rightCamera.y += this.dir.y * space;
            this.rightCamera.z += this.dir.z * space;
        };
        return EyesCamera;
    }());
    egret3d.EyesCamera = EyesCamera;
    __reflect(EyesCamera.prototype, "egret3d.EyesCamera");
    /**
    * @class egret3d.View3D
    * @classdesc
    * VRView3D 会把场景渲染成两个视口。
    * 两个视口是由不同的摄像机渲染出来的结果，也相当由左右眼。
    * @see egret3d.Camera3D
    * @see egret3d.Scene3D
    * @see egret3d.Stage3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    var VRView3D = (function (_super) {
        __extends(VRView3D, _super);
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
        function VRView3D(x, y, width, height) {
            var _this = _super.call(this, x, y, width, height, new egret3d.Camera3D(egret3d.CameraType.perspective)) || this;
            /**
            * @private
            * @language zh_CN
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.w = 0;
            /**
            * @private
            * @language zh_CN
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.h = 0;
            _this.w = width;
            _this.h = height;
            _this.init();
            return _this;
        }
        VRView3D.prototype.init = function () {
            this.eyesCamera = new EyesCamera(this.camera3D);
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
        };
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        VRView3D.prototype.update = function (time, delay) {
            this.eyesCamera.update();
            this.viewPort.width = this.w * 0.5;
            this.viewPort.height = this.h;
            this.viewPort.x = this.w * 0.5 - this.viewPort.width - 10;
            this.viewPort.y = this.h * 0.5 - this.viewPort.height * 0.5;
            this.camera3D = this.eyesCamera.leftCamera;
            _super.prototype.update.call(this, time, delay);
            this.viewPort.width = this.w * 0.5;
            this.viewPort.height = this.h;
            this.viewPort.x = this.w * 0.5 + 10;
            this.viewPort.y = this.h * 0.5 - this.viewPort.height * 0.5;
            this.camera3D = this.eyesCamera.rightCamera;
            _super.prototype.update.call(this, time, delay);
            //this._leftHUD.width = this.width * 0.5;
            //this._leftHUD.height = this.height;
            //this._leftHUD.x = this.width * 0.5 - this._leftHUD.width - 10;//- this.eyesCamera.eyeCross * 0.5;
            //this._leftHUD.y = this.height * 0.5 - this._leftHUD.height * 0.5;
            //this._rightHUD.width = this.width * 0.5;
            //this._rightHUD.height = this.height;
            //this._rightHUD.x = this.width * 0.5 + 10;//this.eyesCamera.eyeCross * 0.5;
            //this._rightHUD.y = this.height * 0.5 - this._rightHUD.height * 0.5;
            //Stage3D.context3DProxy.viewPort(this._leftHUD.x, this._leftHUD.y, this._leftHUD.width, this._leftHUD.height);
            //Stage3D.context3DProxy.setScissorRectangle(this._leftHUD.x, this._leftHUD.y, this._leftHUD.width, this._leftHUD.height);
            //this._leftHUD.diffuseTexture = this.leftRender.renderTexture;
            //this._rightHUD.diffuseTexture = this.rightRender.renderTexture;
            //Stage3D.context3DProxy.viewPort(this._leftHUD.x, this._leftHUD.y, this._leftHUD.width, this._leftHUD.height);
            //Stage3D.context3DProxy.setScissorRectangle(this._leftHUD.x, this._leftHUD.y, this._leftHUD.width, this._leftHUD.height);
            //this._leftHUD.draw(Stage3D.context3DProxy, this.camera3D);
            //Stage3D.context3DProxy.viewPort(this._rightHUD.x, this._rightHUD.y, this._rightHUD.width, this._rightHUD.height);
            //Stage3D.context3DProxy.setScissorRectangle(this._rightHUD.x, this._rightHUD.y, this._rightHUD.width, this._rightHUD.height);
            //this._rightHUD.draw(Stage3D.context3DProxy, this.camera3D);
        };
        return VRView3D;
    }(egret3d.View3D));
    egret3d.VRView3D = VRView3D;
    __reflect(VRView3D.prototype, "egret3d.VRView3D");
})(egret3d || (egret3d = {}));
