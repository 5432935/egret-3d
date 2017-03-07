/**
 * 圆柱体模型
 * close
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CylinderSample = (function () {
    function CylinderSample() {
        StageMgr.Instance().init();
        this.init();
    }
    CylinderSample.prototype.init = function () {
        var geom = new egret3d.CylinderGeometry(50, 50);
        var mat = new egret3d.TextureMaterial();
        var cube = new egret3d.Mesh(geom, mat);
        StageMgr.Instance().view3d.addChild3D(cube);
        this.InitCameraCtl();
        StageMgr.Instance().stage3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
    };
    CylinderSample.prototype.InitCameraCtl = function () {
        this.cameraCtl = new egret3d.LookAtController(StageMgr.Instance().view3d.camera3D, new egret3d.Object3D());
        this.cameraCtl.distance = 300;
        this.cameraCtl.rotationX = 0;
    };
    CylinderSample.prototype.update = function (e) {
        this.cameraCtl.update();
    };
    return CylinderSample;
}());
__reflect(CylinderSample.prototype, "CylinderSample");
//# sourceMappingURL=CylinderSample.js.map