class SampleAsset {


    // 点击鼠标左键 移动鼠标 控制摄像机旋转 
    // w s a d 控制摄像机移动

    protected egret3DCanvas: egret3d.Egret3DCanvas;
    protected view: egret3d.View3D;
    protected cameraCtl: egret3d.LookAtController;

    protected bigProgress: egret3d.gui.UIProgressBar;
    protected smallProgress: egret3d.gui.UIProgressBar;
    protected sceneProgress: egret3d.gui.UIProgressBar;

    protected queueLoader: egret3d.QueueLoader;
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

        //this.doURLLoader();

        this.queueLoader = new egret3d.QueueLoader();
        this.queueLoader.loadDefaultGUISkin();
        this.queueLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onGUISkin, this);

    }

    protected onGUISkin(e: egret3d.LoaderEvent3D) {

        this.smallProgress = new egret3d.gui.UIProgressBar();
        this.smallProgress.y = 175;
        this.smallProgress.width = 500;
        this.smallProgress.height = 20;

        this.bigProgress = new egret3d.gui.UIProgressBar();
        this.bigProgress.y = 200;
        this.bigProgress.width = 500;
        this.bigProgress.height = 20;


        this.sceneProgress = new egret3d.gui.UIProgressBar();
        this.sceneProgress.y = 500;
        this.sceneProgress.width = 500;
        this.sceneProgress.height = 20;


        this.doQueueLoader();

        this.view.addGUI(this.bigProgress);
        this.view.addGUI(this.smallProgress);
        this.view.addGUI(this.sceneProgress);
        //this.doURLLoader();

        this.queueLoader.removeEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onGUISkin, this);
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

        this.queueLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onComplete, this);
        this.queueLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_PROGRESS, this.onProgress, this);


        var loadList: egret3d.UnitLoader[] = [];


        //// 这个资源是unity3d插件导出的场景资源
        //var sponazLoader: egret3d.UnitLoader = this.queueLoader.load("resource/doc/sponza_Demo/MapConfig.json");
        //loadList.push(this.queueLoader.load("resource/scene/Compress_Resource/Scene1.e3dPack"));

        //var sponazLoader: egret3d.UnitLoader = this.queueLoader.load("resource/scene/s/MapConfig.json");


        //loadList.push(sponazLoader);

        //// 监听某个文件的加载进度事件
        //sponazLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_PROGRESS, this.onSceneProgress, this);

        //// 监听某个文件的加载完成事件
        //sponazLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_ONCE_COMPLETE, this.onSceneOnceProgress, this);

        loadList.push(this.queueLoader.load("resource/doc/0_Model/Esm/Zhouyu.esm"));
        loadList.push(this.queueLoader.load("resource/doc/0_Model/Eam/attack.eam"));
        loadList.push(this.queueLoader.load("resource/doc/0_Model/Eam/idle.eam"));
        loadList.push(this.queueLoader.load("resource/doc/0_Model/Texture/hero_01.png"));

        //loadList.push(this.queueLoader.load("resource/skill/MapConfig.json"));


        //this.queueLoader.addAssetEventListener("resource/skill/MapConfig.json", egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onSkill, this);

        for (var i: number = 0; i < loadList.length; ++i) {
            loadList[i].addEventListener(egret3d.LoaderEvent3D.LOADER_PROGRESS, this.onOnceProgress, this);
        }

        // 监听完成事件
        this.queueLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onQueueLoader, this);

        // 监听单个文件完成事件
        this.queueLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_ONCE_COMPLETE, this.onOnceComplete, this);
        // ------------------ 使用QueueLoader加载 ---------------------


    }

    protected onSkill(e: egret3d.LoaderEvent3D) {
         var o = e.data;
    }

    protected onOnceProgress(e: egret3d.LoaderEvent3D) {
        this.smallProgress.ratio = e.currentProgress;
        console.log(e.currentProgress);
    }

    protected onComplete(e: egret3d.LoaderEvent3D) {
        this.bigProgress.ratio = e.currentProgress;
    }

    protected onProgress(e: egret3d.LoaderEvent3D) {
        this.bigProgress.ratio = e.currentProgress;
    }

    protected onSceneProgress(e: egret3d.LoaderEvent3D) {
        this.sceneProgress.ratio = e.currentProgress;
    }

    protected onSceneOnceProgress(e: egret3d.LoaderEvent3D) {
    }

    protected onQueueLoader(e: egret3d.LoaderEvent3D) {
        var queueLoader: egret3d.QueueLoader = e.target;

      
        
        // 加载完成后用url查找资源 
        var geo: egret3d.Geometry = queueLoader.getAsset("resource/doc/0_Model/Esm/Zhouyu.esm");
        var clip0: egret3d.SkeletonAnimationClip = queueLoader.getAsset("resource/doc/0_Model/Eam/attack.eam");
        var clip1: egret3d.SkeletonAnimationClip = queueLoader.getAsset("resource/doc/0_Model/Eam/idle.eam");
        var textures: egret3d.ITexture[] = [];

        textures[0] = queueLoader.getAsset("resource/doc/0_Model/Texture/hero_01.png");

        clip0.animationName = "Attack1";
        clip1.animationName = "Idle";

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
        mesh.animation.play("Idle");


        

        // 加载完场景资源可以直接替换View3D中的Scene对象
        //var scene3d: egret3d.Scene3D = queueLoader.getAsset("resource/doc/sponza_Demo/MapConfig.json");
        //var scene3d: egret3d.Scene3D = queueLoader.getAsset("resource/scene/Compress_Resource/Scene1.e3dPack");

        
        //if (!scene3d)
        //    return;
        //this.view.scene = scene3d;
        //this.view.scene.addChild(this.view.camera3D);


        this.view.addChild3D(mesh);
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