class SampleAnimation {


    // 点击鼠标左键 移动鼠标 控制摄像机旋转 
    // w s a d 控制摄像机移动

    protected egret3DCanvas: egret3d.Egret3DCanvas;
    protected view: egret3d.View3D;
    protected cameraCtl: egret3d.LookAtController;
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

        this.queueLoader = new egret3d.QueueLoader();

        this.createWireframe();


        this.queueLoader.load("resource/doc/ganning/Ganning.esm");
        this.queueLoader.load("resource/doc/ganning/Idle.eam");
        this.queueLoader.load("resource/doc/ganning/Run.eam");
        this.queueLoader.load("resource/doc/ganning/Attack1.eam");
        this.queueLoader.load("resource/doc/ganning/Death.eam");
        this.queueLoader.load("resource/doc/ganning/Ganning.png");
        this.queueLoader.load("resource/doc/ganning/Ganning_f.png");
        this.queueLoader.load("resource/doc/ganning/Ganning_Weapon.png");

        // 监听完成事件
        this.queueLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onQueueLoader, this);
    }

    protected onQueueLoader(e: egret3d.LoaderEvent3D) {
        this.createSkeletonAnimation();
    }

    // 
    protected createSkeletonAnimation() {
        // 加载完成后用url查找资源 
        var geo: egret3d.Geometry = this.queueLoader.getAsset("resource/doc/ganning/Ganning.esm");
        var clip0: egret3d.SkeletonAnimationClip = this.queueLoader.getAsset("resource/doc/ganning/Idle.eam");
        var clip1: egret3d.SkeletonAnimationClip = this.queueLoader.getAsset("resource/doc/ganning/Run.eam");
        var clip2: egret3d.SkeletonAnimationClip = this.queueLoader.getAsset("resource/doc/ganning/Attack1.eam");
        var clip3: egret3d.SkeletonAnimationClip = this.queueLoader.getAsset("resource/doc/ganning/Death.eam");
        var textures: egret3d.ITexture[] = [];

        textures[0] = this.queueLoader.getAsset("resource/doc/ganning/Ganning.png");
        textures[1] = this.queueLoader.getAsset("resource/doc/ganning/Ganning_f.png");
        textures[2] = this.queueLoader.getAsset("resource/doc/ganning/Ganning_Weapon.png");

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

        mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip0);
        mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip1);
        mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip2);
        mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip3);
        mesh.animation.play("Idle");

        this.view.addChild3D(mesh);
        // 监听动画播放完成事件
        mesh.animation.skeletonAnimationController.addEventListener(egret3d.AnimationEvent3D.EVENT_PLAY_COMPLETE, this.onPlayComplete, this);
        mesh.animation.skeletonAnimationController.addEventListener(egret3d.AnimationEvent3D.EVENT_FRAME_CHANGE, this.onPlayChange, this);
    }

    protected onPlayComplete(e: egret3d.AnimationEvent3D) {
        var skeletonAnimation: egret3d.SkeletonAnimation = e.target;
        console.log("onPlayComplete:" + skeletonAnimation.currentAnimName);
    }

    protected onPlayChange(e: egret3d.AnimationEvent3D) {
        var skeletonAnimation: egret3d.SkeletonAnimation = e.target;
        //console.log("onPlayChange:" + skeletonAnimation.currentAnimName);
    }

    // 用顶点和索引的方式 创建线框
    protected createWireframe() {
        // 创建一个20 * 20 行的 每个格子100 * 100 大小
        var wir: egret3d.Wireframe = new egret3d.Wireframe();
        wir.material.diffuseColor = 0xffffff;
        this.view.addChild3D(wir);
        var geom: egret3d.Geometry = wir.geometry;

        var width: number = 100;
        var height: number = 100;

        var row: number = 20;
        var col: number = 20;

        var point_row: number = row + 1;
        var point_col: number = col + 1;

        var vb: Array<number> = new Array<number>();
        var ib: Array<number> = new Array<number>();

        for (var i: number = 0; i < point_row; ++i) {
            vb.push(-width * col / 2, 0, height * i - height * row / 2);
            vb.push(width * col / 2, 0, height * i - height * row / 2);
        }

        for (var i: number = 0; i < point_col; ++i) {
            vb.push(width * i - width * col / 2, 0, height * col / 2);
            vb.push(width * i - width * col / 2, 0, -height * col / 2);
        }

        for (var i: number = 0; i < vb.length / 3; ++i) {
            ib.push(i);
        }
        // 设置顶点数据 
        geom.setVerticesForIndex(0, egret3d.VertexFormat.VF_POSITION, vb, vb.length / 3);

        // 设置索引数据
        geom.setVertexIndices(0, ib);
    }

    protected update(e: egret3d.Event3D) {
        this.cameraCtl.update();
    }
}