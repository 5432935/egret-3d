/**
 *  内存泄漏测试
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StorageTestSample = (function () {
    function StorageTestSample() {
        this.count = 0;
        StageMgr.Instance().init();
        this.init();
    }
    StorageTestSample.prototype.init = function () {
        this.addCube();
        this.InitCameraCtl();
        StageMgr.Instance().stage3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
    };
    StorageTestSample.prototype.InitCameraCtl = function () {
        this.cameraCtl = new egret3d.LookAtController(StageMgr.Instance().view3d.camera3D, new egret3d.Object3D());
        this.cameraCtl.distance = 300;
        this.cameraCtl.rotationX = 0;
    };
    StorageTestSample.prototype.update = function (e) {
        this.cameraCtl.update();
        this.count++;
        if (this.count > 30) {
            this.count = 0;
            this.cube ? this.removeCube() : this.addCube();
        }
    };
    StorageTestSample.prototype.addCube = function () {
        console.log("add cube");
        var geom = new egret3d.CubeGeometry(50, 100, 10);
        var mat = new egret3d.TextureMaterial();
        var cube = new egret3d.Mesh(geom, mat);
        StageMgr.Instance().view3d.addChild3D(cube);
        this.cube = cube;
    };
    StorageTestSample.prototype.removeCube = function () {
        console.log("remove cube");
        var cube = this.cube;
        StageMgr.Instance().view3d.removeChild3D(cube);
        cube.dispose();
        this.cube = null;
    };
    return StorageTestSample;
}());
__reflect(StorageTestSample.prototype, "StorageTestSample");
