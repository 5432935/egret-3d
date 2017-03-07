/**
 * 点光源
 * close
 */

class PointLightSample {
    public constructor() {
        StageMgr.Instance().init();
        this.init();
    }

    private loader: egret3d.UnitLoader;
    private init() {

        this.loader = new egret3d.UnitLoader("resource/texture/earth.png");
        this.loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoader, this);
    }

    private onLoader(e: egret3d.LoaderEvent3D) {
        let img: egret3d.ImageTexture = e.target.data;

        let geom: egret3d.SphereGeometry = new egret3d.SphereGeometry(200, 30, 30);
        let mat: egret3d.TextureMaterial = new egret3d.TextureMaterial(img);
        let earth: egret3d.Mesh = new egret3d.Mesh(geom, mat);
        StageMgr.Instance().view3d.addChild3D(earth);

        let light: egret3d.PointLight = new egret3d.PointLight(0xffff0000);
        light.radius = 200;
        light.cutoff = 0.1;
        light.y = 300;

        let group: egret3d.LightGroup = new egret3d.LightGroup();
        group.addLight(light);
        earth.material.lightGroup = group;

        this.InitCameraCtl();
        StageMgr.Instance().stage3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
    }

    private cameraCtl: egret3d.LookAtController;
    private InitCameraCtl() {
        this.cameraCtl = new egret3d.LookAtController(StageMgr.Instance().view3d.camera3D, new egret3d.Object3D());
        this.cameraCtl.distance = 1000;
        this.cameraCtl.rotationX = 0;
    }

    public update(e: egret3d.Event3D) {
        this.cameraCtl.update();
    }
}