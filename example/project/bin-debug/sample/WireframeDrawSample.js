var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WireframeDrawSample = (function () {
    function WireframeDrawSample() {
        StageMgr.Instance().init();
        this.init();
    }
    WireframeDrawSample.prototype.init = function () {
        var geom = new egret3d.SphereGeometry(100, 100, 100);
        var wf = new egret3d.Wireframe();
        wf.fromGeometry(geom);
        wf.fromVertexs(egret3d.VertexFormat.VF_POSITION);
        wf.material.drawMode = egret3d.DrawMode.POINTS;
        StageMgr.Instance().view3d.addChild3D(wf);
        this.InitCameraCtl();
        StageMgr.Instance().stage3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
    };
    WireframeDrawSample.prototype.InitCameraCtl = function () {
        this.cameraCtl = new egret3d.LookAtController(StageMgr.Instance().view3d.camera3D, new egret3d.Object3D());
        this.cameraCtl.distance = 300;
        this.cameraCtl.rotationX = 0;
    };
    WireframeDrawSample.prototype.update = function (e) {
        this.cameraCtl.update();
    };
    return WireframeDrawSample;
}());
__reflect(WireframeDrawSample.prototype, "WireframeDrawSample");
