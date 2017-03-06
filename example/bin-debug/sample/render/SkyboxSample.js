/**
 * 天空盒
 * close
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SkyboxSample = (function () {
    function SkyboxSample() {
        StageMgr.Instance().init();
        this.init();
    }
    SkyboxSample.prototype.init = function () {
        this.queueLoader = new egret3d.QueueLoader();
        this.queueLoader.load("resource/skybox/cloudy_noon_BK.png");
        this.queueLoader.load("resource/skybox/cloudy_noon_DN.png");
        this.queueLoader.load("resource/skybox/cloudy_noon_FR.png");
        this.queueLoader.load("resource/skybox/cloudy_noon_LF.png");
        this.queueLoader.load("resource/skybox/cloudy_noon_RT.png");
        this.queueLoader.load("resource/skybox/cloudy_noon_UP.png");
        this.queueLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onQueueLoader, this);
        //this.loader = new egret3d.UnitLoader("resource/skybox/cloudy_noon_BK.png");
        //this.loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onQueueLoader, this);
    };
    SkyboxSample.prototype.onQueueLoader2 = function (e) {
        console.log("ede", this.queueLoader.getAsset("resource/skybox/cloudy_noon_UP.png"));
    };
    SkyboxSample.prototype.onQueueLoader = function (e) {
        //console.log(this.queueLoader.getAsset("resource/skybox/cloudy_noon_FR.png"));
        //console.log(this.queueLoader.getAsset("resource/skybox/cloudy_noon_BK.png"));
        //console.log(this.queueLoader.getAsset("resource/skybox/cloudy_noon_LF.png"));
        //console.log(this.queueLoader.getAsset("resource/skybox/cloudy_noon_RT.png"));
        var cubeTexture = egret3d.CubeTexture.createCubeTextureByImageTexture(this.queueLoader.getAsset("resource/skybox/cloudy_noon_FR.png"), this.queueLoader.getAsset("resource/skybox/cloudy_noon_BK.png"), this.queueLoader.getAsset("resource/skybox/cloudy_noon_LF.png"), this.queueLoader.getAsset("resource/skybox/cloudy_noon_RT.png"), this.queueLoader.getAsset("resource/skybox/cloudy_noon_UP.png"), this.queueLoader.getAsset("resource/skybox/cloudy_noon_DN.png"));
        var mat = new egret3d.CubeTextureMaterial(cubeTexture);
        var cube = new egret3d.CubeGeometry(50, 50, 50); //10000, 10000, 10000);
        //cube.buildGeomtry(false);
        var sky = new egret3d.Sky(cube, mat, StageMgr.Instance().view3d.camera3D);
        StageMgr.Instance().view3d.addChild3D(sky);
        console.log("load");
        var img = this.queueLoader.getAsset("resource/skybox/cloudy_noon_UP.png");
        var mat2 = new egret3d.TextureMaterial(img);
        var a = new egret3d.Mesh(cube, mat2);
        StageMgr.Instance().view3d.addChild3D(a);
        this.InitCameraCtl();
        StageMgr.Instance().stage3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
    };
    SkyboxSample.prototype.InitCameraCtl = function () {
        this.cameraCtl = new egret3d.LookAtController(StageMgr.Instance().view3d.camera3D, new egret3d.Object3D());
        this.cameraCtl.distance = 300;
        this.cameraCtl.rotationX = 0;
    };
    SkyboxSample.prototype.update = function (e) {
        this.cameraCtl.update();
    };
    return SkyboxSample;
}());
__reflect(SkyboxSample.prototype, "SkyboxSample");
//# sourceMappingURL=SkyboxSample.js.map