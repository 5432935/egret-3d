/**
 * 多个View3D
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var View3DSample = (function () {
    function View3DSample() {
        StageMgr.Instance().init(0xffff0000);
        this.init();
    }
    View3DSample.prototype.init = function () {
        var cubegeom = new egret3d.CubeGeometry(128, 128, 128);
        var cube = this.createMesh(cubegeom);
        StageMgr.Instance().view3d.addChild3D(cube);
        StageMgr.Instance().view3d.width = window.innerWidth / 2;
        this.setCamera(StageMgr.Instance().view3d.camera3D);
        var sphgeom = new egret3d.SphereGeometry();
        var sph = this.createMesh(sphgeom);
        var view = new egret3d.View3D(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
        view.addChild3D(sph);
        view.camera3D.lookAt(new egret3d.Vector3D(0, 0, 1000), new egret3d.Vector3D(0, 0, 0));
        StageMgr.Instance().stage3d.addView3D(view);
        this.setCamera(view.camera3D);
    };
    View3DSample.prototype.createMesh = function (geom) {
        var mat = new egret3d.TextureMaterial();
        var mesh = new egret3d.Mesh(geom, mat);
        return mesh;
    };
    View3DSample.prototype.setCamera = function (cam) {
        cam.lookAt(new egret3d.Vector3D(500, 500, 500), new egret3d.Vector3D(0, 0, 0));
    };
    return View3DSample;
}());
__reflect(View3DSample.prototype, "View3DSample");
