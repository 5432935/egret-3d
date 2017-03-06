/**
 * 天空盒
 * close
 */

class SkyboxSample {
    public constructor() {
        StageMgr.Instance().init();

        this.init();
    }

    private queueLoader: egret3d.QueueLoader;

    private init() {
        this.queueLoader = new egret3d.QueueLoader();

        this.queueLoader.load("resource/skybox/cloudy_noon_BK.png");
        this.queueLoader.load("resource/skybox/cloudy_noon_DN.png");
        this.queueLoader.load("resource/skybox/cloudy_noon_FR.png");
        this.queueLoader.load("resource/skybox/cloudy_noon_LF.png");
        this.queueLoader.load("resource/skybox/cloudy_noon_RT.png");
        this.queueLoader.load("resource/skybox/cloudy_noon_UP.png");

        this.queueLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onQueueLoader, this);

        //this.loader = new egret3d.UnitLoader("resource/skybox/cloudy_noon_BK.png");
        //this.loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onQueueLoader, this);
    }

    private loader: egret3d.UnitLoader;

    private onQueueLoader2(e: egret3d.LoaderEvent3D) {
        console.log("ede", this.queueLoader.getAsset("resource/skybox/cloudy_noon_UP.png"));
    }

    private onQueueLoader(e: egret3d.LoaderEvent3D) {

        //console.log(this.queueLoader.getAsset("resource/skybox/cloudy_noon_FR.png"));
        //console.log(this.queueLoader.getAsset("resource/skybox/cloudy_noon_BK.png"));
        //console.log(this.queueLoader.getAsset("resource/skybox/cloudy_noon_LF.png"));
        //console.log(this.queueLoader.getAsset("resource/skybox/cloudy_noon_RT.png"));

        let cubeTexture: egret3d.CubeTexture = egret3d.CubeTexture.createCubeTextureByImageTexture(
            this.queueLoader.getAsset("resource/skybox/cloudy_noon_FR.png"),
            this.queueLoader.getAsset("resource/skybox/cloudy_noon_BK.png"),
            this.queueLoader.getAsset("resource/skybox/cloudy_noon_LF.png"),
            this.queueLoader.getAsset("resource/skybox/cloudy_noon_RT.png"),
            this.queueLoader.getAsset("resource/skybox/cloudy_noon_UP.png"),
            this.queueLoader.getAsset("resource/skybox/cloudy_noon_DN.png")
        );

        let mat: egret3d.CubeTextureMaterial = new egret3d.CubeTextureMaterial(cubeTexture);
        let cube: egret3d.CubeGeometry = new egret3d.CubeGeometry(50, 50, 50);//10000, 10000, 10000);
        //cube.buildGeomtry(false);
        let sky: egret3d.Sky = new egret3d.Sky(cube, mat, StageMgr.Instance().view3d.camera3D);
        StageMgr.Instance().view3d.addChild3D(sky);

        console.log("load")
        let img: egret3d.ImageTexture = this.queueLoader.getAsset("resource/skybox/cloudy_noon_UP.png");
        let mat2: egret3d.TextureMaterial = new egret3d.TextureMaterial(img);
        let a: egret3d.Mesh = new egret3d.Mesh(cube, mat2);
        StageMgr.Instance().view3d.addChild3D(a);

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