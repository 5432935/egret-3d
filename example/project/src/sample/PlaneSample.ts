/**
 * 平面模型
 * 
 */

class PlaneSample {
    public constructor() {
        StageMgr.Instance().init();

        this.init();
    }

    private init() {
        let geom: egret3d.PlaneGeometry = new egret3d.PlaneGeometry(50, 100, 10);
        let mat: egret3d.TextureMaterial = new egret3d.TextureMaterial();
        let cube: egret3d.Mesh = new egret3d.Mesh(geom, mat);
        StageMgr.Instance().view3d.addChild3D(cube);

        this.InitCameraCtl();
        StageMgr.Instance().stage3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
    }

    private cameraCtl: egret3d.LookAtController;
    private InitCameraCtl() {
        this.cameraCtl = new egret3d.LookAtController(StageMgr.Instance().view3d.camera3D, new egret3d.Object3D());
        this.cameraCtl.distance = 300;
        this.cameraCtl.rotationX = 40;
    }

    public update(e: egret3d.Event3D) {
        this.cameraCtl.update();
    }
}