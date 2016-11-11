class SampleAsset {


    // 点击鼠标左键 移动鼠标 控制摄像机旋转 
    // w s a d 控制摄像机移动

    protected egret3DCanvas: egret3d.Egret3DCanvas;
    protected view: egret3d.View3D;
    protected cameraCtl: egret3d.LookAtController;

    constructor() {
        // ------------------ 初始化引擎 ---------------------
        this.egret3DCanvas = new egret3d.Egret3DCanvas();
        this.egret3DCanvas.x = 0;
        this.egret3DCanvas.y = 0;
        this.egret3DCanvas.width = window.innerWidth;
        this.egret3DCanvas.height = window.innerHeight;
        this.egret3DCanvas.start();

        var view: egret3d.View3D = new egret3d.View3D(0, 0, window.innerWidth, window.innerHeight);
        view.camera3D.lookAt(new egret3d.Vector3D(0, 1000, -1000), new egret3d.Vector3D(0, 0, 0));
        view.backColor = 0xffcccccc;

        this.egret3DCanvas.addView3D(view);
        this.view = view;

        this.cameraCtl = new egret3d.LookAtController(view.camera3D, new egret3d.Object3D());
        this.cameraCtl.distance = 1000;
        this.cameraCtl.rotationX = 60;

        this.egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
        // ------------------ 初始化引擎 ---------------------

        this.doURLLoader();

        this.doQueueLoader();
    }

    protected doURLLoader() {

        // ------------------ 使用URLLoader加载 ---------------------

        var urlLoader: egret3d.URLLoader = new egret3d.URLLoader("resource/doc/brick-diffuse.jpg");
        // 监听完成事件
        urlLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoader, this);

        // ------------------ 使用URLLoader加载 ---------------------
    }

    protected doQueueLoader() {

        // ------------------ 使用QueueLoader加载 ---------------------

        var queueLoader: egret3d.QueueLoader = new egret3d.QueueLoader();

        queueLoader.load("resource/doc/ganning/Ganning.esm");
        queueLoader.load("resource/doc/ganning/Idle.eam");
        queueLoader.load("resource/doc/ganning/Run.eam");
        queueLoader.load("resource/doc/ganning/Attack1.eam");
        queueLoader.load("resource/doc/ganning/Death.eam");
        queueLoader.load("resource/doc/ganning/Ganning.png");
        queueLoader.load("resource/doc/ganning/Ganning_f.png");
        queueLoader.load("resource/doc/ganning/Ganning_Weapon.png");


        // 这个资源是unity3d插件导出的场景资源
        queueLoader.load("resource/doc/sponza_Demo/MapConfig.json");

        // 监听某个文件的加载进度事件
        queueLoader.addAssetEventListener("resource/doc/sponza_Demo/MapConfig.json", egret3d.LoaderEvent3D.LOADER_PROGRESS, this.onSceneProgress, this);

        // 监听某个文件的加载完成事件
        queueLoader.addAssetEventListener("resource/doc/sponza_Demo/MapConfig.json", egret3d.LoaderEvent3D.LOADER_ONCE_COMPLETE, this.onSceneOnceProgress, this);


        // 监听完成事件
        queueLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onQueueLoader, this);

        // 监听单个文件完成事件
        queueLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_ONCE_COMPLETE, this.onOnceComplete, this);
        // ------------------ 使用QueueLoader加载 ---------------------
    }

    protected onSceneProgress(e: egret3d.LoaderEvent3D) {
        var loader: egret3d.ILoader = e.target;

        var onceLoader: egret3d.ILoader = e.loader;


        console.log(loader.currentProgress);
    }
    protected onSceneOnceProgress(e: egret3d.LoaderEvent3D) {
        var loader: egret3d.ILoader = e.loader;
        console.log("onSceneOnceProgress:" + loader.url);
    }

    protected onQueueLoader(e: egret3d.LoaderEvent3D) {
        var queueLoader: egret3d.QueueLoader = e.target;

        // 加载完成后用url查找资源 
        var geo: egret3d.Geometry = queueLoader.getAsset("resource/doc/ganning/Ganning.esm");
        var clip0: egret3d.SkeletonAnimationClip = queueLoader.getAsset("resource/doc/ganning/Idle.eam");
        var clip1: egret3d.SkeletonAnimationClip = queueLoader.getAsset("resource/doc/ganning/Run.eam");
        var clip2: egret3d.SkeletonAnimationClip = queueLoader.getAsset("resource/doc/ganning/Attack1.eam");
        var clip3: egret3d.SkeletonAnimationClip = queueLoader.getAsset("resource/doc/ganning/Death.eam");
        var textures: egret3d.ITexture[] = [];

        textures[0] = queueLoader.getAsset("resource/doc/ganning/Ganning.png");
        textures[1] = queueLoader.getAsset("resource/doc/ganning/Ganning_f.png");
        textures[2] = queueLoader.getAsset("resource/doc/ganning/Ganning_Weapon.png");

        clip0.animationName = "Idle";
        clip1.animationName = "Run";
        clip2.animationName = "Attack1";
        clip3.animationName = "Death";

        // 创建Mesh
        var mesh: egret3d.Mesh = new egret3d.Mesh(geo, new egret3d.TextureMaterial());
        for (var i: number = 0; i < geo.subGeometrys.length; ++i) {
            var mat: egret3d.MaterialBase = mesh.getMaterial(i);
            if (!mat) {
                mat = new egret3d.TextureMaterial();
                mesh.addSubMaterial(i, mat);
            }

            mat.diffuseTexture = textures[i];
        }

        mesh.z = 100;

        mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip0);
        mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip1);
        mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip2);
        mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip3);
        mesh.animation.play("Idle");

        this.view.addChild3D(mesh);


        // 加载完场景资源可以直接替换View3D中的Scene对象
        var scene3d: egret3d.Scene3D = queueLoader.getAsset("resource/doc/sponza_Demo/MapConfig.json");
        this.view.scene = scene3d;
        this.view.scene.addChild(this.view.camera3D);
    }

    protected onOnceComplete(e: egret3d.LoaderEvent3D) {
        var loader: egret3d.ILoader = e.loader;
        console.log(loader.url);
    }

    protected onLoader(e: egret3d.LoaderEvent3D) {
        // 加载完成后数据
        var img: egret3d.ImageTexture = e.data;

        // 创建一个box 加载场景中
        var box: egret3d.Mesh = new egret3d.Mesh(new egret3d.CubeGeometry(), new egret3d.TextureMaterial(img));
        this.view.addChild3D(box);
    }

    protected update(e: egret3d.Event3D) {
        this.cameraCtl.update();
    }
}