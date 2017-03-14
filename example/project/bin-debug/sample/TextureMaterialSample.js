/**
 * 纹理材质
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TextureMaterialSample = (function () {
    function TextureMaterialSample() {
        StageMgr.Instance().init();
        this.init();
    }
    TextureMaterialSample.prototype.init = function () {
        this.loader = new egret3d.UnitLoader("resource/texture/Icon.png");
        this.loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoader, this);
    };
    TextureMaterialSample.prototype.onLoader = function (e) {
        var img = e.target.data;
        var geom = new egret3d.CubeGeometry(128, 128, 128);
        var mat = new egret3d.TextureMaterial(img);
        var cube = new egret3d.Mesh(geom, mat);
        StageMgr.Instance().view3d.addChild3D(cube);
        this.InitCameraCtl();
        StageMgr.Instance().stage3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
    };
    TextureMaterialSample.prototype.InitCameraCtl = function () {
        this.cameraCtl = new egret3d.LookAtController(StageMgr.Instance().view3d.camera3D, new egret3d.Object3D());
        this.cameraCtl.distance = 1000;
        this.cameraCtl.rotationX = 40;
        this.cameraCtl.rotationY = 40;
    };
    TextureMaterialSample.prototype.update = function (e) {
        this.cameraCtl.update();
    };
    return TextureMaterialSample;
}());
__reflect(TextureMaterialSample.prototype, "TextureMaterialSample");
