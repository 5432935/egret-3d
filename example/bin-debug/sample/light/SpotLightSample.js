/**
 * 聚光灯
 * close
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SpotLightSample = (function () {
    function SpotLightSample() {
        this._lightDir = new egret3d.Vector3D(0, -1, 0);
        this._rotationX = 0.01;
        this._lightIntensity = 0.01;
        StageMgr.Instance().init();
        this.init();
    }
    SpotLightSample.prototype.init = function () {
        this.loader = new egret3d.UnitLoader("resource/texture/earth.png");
        this.loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoader, this);
    };
    SpotLightSample.prototype.onLoader = function (e) {
        var img = e.target.data;
        var geom = new egret3d.SphereGeometry(200, 30, 30);
        var mat = new egret3d.TextureMaterial(img);
        var earth = new egret3d.Mesh(geom, mat);
        StageMgr.Instance().view3d.addChild3D(earth);
        this.light = new egret3d.SpotLight(0xffffff);
        this.light.y = 250;
        var group = new egret3d.LightGroup();
        group.addLight(this.light);
        earth.material.lightGroup = group;
        this.InitCameraCtl();
        StageMgr.Instance().stage3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
    };
    SpotLightSample.prototype.InitCameraCtl = function () {
        this.cameraCtl = new egret3d.LookAtController(StageMgr.Instance().view3d.camera3D, new egret3d.Object3D());
        this.cameraCtl.distance = 1000;
        this.cameraCtl.rotationX = 0;
    };
    SpotLightSample.prototype.update = function (e) {
        this.cameraCtl.update();
    };
    return SpotLightSample;
}());
__reflect(SpotLightSample.prototype, "SpotLightSample");
//# sourceMappingURL=SpotLightSample.js.map