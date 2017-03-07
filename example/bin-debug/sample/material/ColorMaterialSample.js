/**
 * 颜色材质
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ColorMaterialSample = (function () {
    function ColorMaterialSample() {
        StageMgr.Instance().init();
        this.init();
    }
    ColorMaterialSample.prototype.init = function () {
        var geom = new egret3d.CubeGeometry(128, 128, 128);
        var mat = new egret3d.ColorMaterial(0x00ff00);
        var cube = new egret3d.Mesh(geom, mat);
        StageMgr.Instance().view3d.addChild3D(cube);
        this.InitCameraCtl();
        StageMgr.Instance().stage3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
    };
    ColorMaterialSample.prototype.InitCameraCtl = function () {
        this.cameraCtl = new egret3d.LookAtController(StageMgr.Instance().view3d.camera3D, new egret3d.Object3D());
        this.cameraCtl.distance = 1000;
        this.cameraCtl.rotationX = 40;
        this.cameraCtl.rotationY = 40;
    };
    ColorMaterialSample.prototype.update = function (e) {
        this.cameraCtl.update();
    };
    return ColorMaterialSample;
}());
__reflect(ColorMaterialSample.prototype, "ColorMaterialSample");
//# sourceMappingURL=ColorMaterialSample.js.map