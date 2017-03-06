/**
 * 高度图模型
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ElevationSample = (function () {
    function ElevationSample() {
        StageMgr.Instance().init();
        this.init();
    }
    ElevationSample.prototype.init = function () {
        this.loader = new egret3d.UnitLoader("resource/elevation/timg.jpg");
        this.loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoader, this);
    };
    ElevationSample.prototype.onLoader = function (e) {
        var img = e.target.data;
        var geom = new egret3d.ElevationGeometry(img, 512, 100, 512);
        var mat = new egret3d.TextureMaterial(img);
        var cube = new egret3d.Mesh(geom, mat);
        StageMgr.Instance().view3d.addChild3D(cube);
        this.InitCameraCtl();
        StageMgr.Instance().stage3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
    };
    ElevationSample.prototype.InitCameraCtl = function () {
        this.cameraCtl = new egret3d.LookAtController(StageMgr.Instance().view3d.camera3D, new egret3d.Object3D());
        this.cameraCtl.distance = 300;
        this.cameraCtl.rotationX = 40;
    };
    ElevationSample.prototype.update = function (e) {
        this.cameraCtl.update();
    };
    return ElevationSample;
}());
__reflect(ElevationSample.prototype, "ElevationSample");
//# sourceMappingURL=ElevationSample.js.map