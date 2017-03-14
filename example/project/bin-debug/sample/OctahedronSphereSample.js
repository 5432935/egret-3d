/**
 * 六面球体模型
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var OctahedronSphereSample = (function () {
    function OctahedronSphereSample() {
        StageMgr.Instance().init();
        this.init();
    }
    OctahedronSphereSample.prototype.init = function () {
        var geom = new egret3d.OctahedronSphereGeometry(10, 10);
        var mat = new egret3d.TextureMaterial();
        var cube = new egret3d.Mesh(geom, mat);
        StageMgr.Instance().view3d.addChild3D(cube);
        this.InitCameraCtl();
        StageMgr.Instance().stage3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
    };
    OctahedronSphereSample.prototype.InitCameraCtl = function () {
        this.cameraCtl = new egret3d.LookAtController(StageMgr.Instance().view3d.camera3D, new egret3d.Object3D());
        this.cameraCtl.distance = 300;
        this.cameraCtl.rotationX = 0;
    };
    OctahedronSphereSample.prototype.update = function (e) {
        this.cameraCtl.update();
    };
    return OctahedronSphereSample;
}());
__reflect(OctahedronSphereSample.prototype, "OctahedronSphereSample");
