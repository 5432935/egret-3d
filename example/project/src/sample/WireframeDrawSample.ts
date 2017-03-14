class WireframeDrawSample{
    public constructor() {
        StageMgr.Instance().init();

        this.init();
    }

    private init() {
        let geom: egret3d.SphereGeometry = new egret3d.SphereGeometry(100, 100, 100);
        let wf: egret3d.Wireframe = new egret3d.Wireframe();
        wf.fromGeometry(geom);
        wf.fromVertexs(egret3d.VertexFormat.VF_POSITION);
        wf.material.drawMode = egret3d.DrawMode.POINTS;
        StageMgr.Instance().view3d.addChild3D(wf);

        this.InitCameraCtl();
        StageMgr.Instance().stage3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
    }

    private cameraCtl: egret3d.LookAtController;
    private InitCameraCtl() {
        this.cameraCtl = new egret3d.LookAtController(StageMgr.Instance().view3d.camera3D, new egret3d.Object3D());
        this.cameraCtl.distance = 300;
        this.cameraCtl.rotationX = 0;
    }

    public update(e: egret3d.Event3D) {
        this.cameraCtl.update();
    }
}