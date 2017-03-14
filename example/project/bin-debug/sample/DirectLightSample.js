var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DirectLightSample = (function () {
    function DirectLightSample() {
        this._lightDir = new egret3d.Vector3D(0, -1, 0);
        this._rotationX = 0.01;
        this._lightIntensity = 0.01;
        StageMgr.Instance().init();
        this.init();
    }
    DirectLightSample.prototype.init = function () {
        this.loader = new egret3d.UnitLoader("resource/texture/earth.png");
        this.loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoader, this);
    };
    DirectLightSample.prototype.onLoader = function (e) {
        var img = e.target.data;
        var geom = new egret3d.SphereGeometry(200, 30, 30);
        var mat = new egret3d.TextureMaterial(img);
        var earth = new egret3d.Mesh(geom, mat);
        StageMgr.Instance().view3d.addChild3D(earth);
        this.light = new egret3d.DirectLight(this._lightDir);
        this.light.diffuse = 0xffffff;
        this.light.intensity = 0.1;
        this.light.ambient = 0xffffffff;
        var group = new egret3d.LightGroup();
        group.addLight(this.light);
        earth.material.lightGroup = group;
        this.InitCameraCtl();
        StageMgr.Instance().stage3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
    };
    DirectLightSample.prototype.InitCameraCtl = function () {
        this.cameraCtl = new egret3d.LookAtController(StageMgr.Instance().view3d.camera3D, new egret3d.Object3D());
        this.cameraCtl.distance = 1000;
        this.cameraCtl.rotationX = 0;
    };
    DirectLightSample.prototype.update = function (e) {
        this.cameraCtl.update();
        if (this.light.intensity >= 0.5) {
            this._lightIntensity = -0.01;
        }
        if (this.light.intensity <= 0.1) {
            this._lightIntensity = 0.01;
        }
        this.light.intensity += this._lightIntensity;
        if (this.light.dir.x >= 1) {
            this._rotationX = -0.01;
        }
        if (this.light.dir.x <= -1) {
            this._rotationX = 0.01;
        }
        this.light.dir.x += this._rotationX;
    };
    return DirectLightSample;
}());
__reflect(DirectLightSample.prototype, "DirectLightSample");
