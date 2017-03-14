/**
 * UV动画
 * close
 */

class UVAnim {
    public constructor() {
        StageMgr.Instance().init();
        this.init();
    }

    private loader: egret3d.UnitLoader;
    private init() {

        this.loader = new egret3d.UnitLoader("resource/texture/uv.jpg");
        this.loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoader, this);
    }

    private onLoader(e: egret3d.LoaderEvent3D) {

        let mat: egret3d.TextureMaterial = new egret3d.TextureMaterial();
        mat.repeat = true;
        let img: egret3d.ImageTexture = e.target.data;
        mat.diffuseTexture = img;

        let uvRollMethod: egret3d.UVRollMethod = new egret3d.UVRollMethod();
        mat.diffusePass.addMethod(uvRollMethod);
        uvRollMethod.speedU = 0.0001;
        uvRollMethod.speedV = 0.0001;
        uvRollMethod.start(true);

        let geom: egret3d.ElevationGeometry = new egret3d.ElevationGeometry(img, 512, 50, 512);
        let mesh: egret3d.Mesh = new egret3d.Mesh(geom, mat);
        StageMgr.Instance().view3d.addChild3D(mesh);

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