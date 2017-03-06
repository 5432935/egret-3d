/**
 * 颜色材质
 * 
 */

class ColorMaterialSample {
    public constructor() {
        StageMgr.Instance().init();
        this.init();
    }

    private init() {

        let geom: egret3d.CubeGeometry = new egret3d.CubeGeometry(128, 128, 128);
        let mat: egret3d.ColorMaterial = new egret3d.ColorMaterial(0x00ff00);
        let cube: egret3d.Mesh = new egret3d.Mesh(geom, mat);
        StageMgr.Instance().view3d.addChild3D(cube);

        this.InitCameraCtl();
        StageMgr.Instance().stage3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
    }

    private cameraCtl: egret3d.LookAtController;
    private InitCameraCtl() {
        this.cameraCtl = new egret3d.LookAtController(StageMgr.Instance().view3d.camera3D, new egret3d.Object3D());
        this.cameraCtl.distance = 1000;
        this.cameraCtl.rotationX = 40;
        this.cameraCtl.rotationY = 40;
    }

    public update(e: egret3d.Event3D) {
        this.cameraCtl.update();
    }
}