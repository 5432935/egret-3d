class SampleAnimation {


    // 点击鼠标左键 移动鼠标 控制摄像机旋转 
    // w s a d 控制摄像机移动

    protected egret3DCanvas: egret3d.Egret3DCanvas;
    protected view: egret3d.View3D;
    protected cameraCtl: egret3d.LookAtController;
    protected queueLoader: egret3d.QueueLoader;
    protected role: egret3d.Mesh;
    protected cube: egret3d.Mesh; 
    private angle: number = 0; 

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
        view.backColor = 0xff000000;

        this.egret3DCanvas.addView3D(view);
        this.view = view;

        this.cameraCtl = new egret3d.LookAtController(view.camera3D, new egret3d.Object3D());
        this.cameraCtl.distance = 1000;
        this.cameraCtl.rotationX = 60;

        this.egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
        // ------------------ 初始化引擎 ---------------------

        this.queueLoader = new egret3d.QueueLoader();

        this.createWireframe();


        //// 加载模型文件
        //this.queueLoader.load("resource/doc/0_Model/Esm/Zhouyu.esm");

        //// 加载动画文件
        //this.queueLoader.load("resource/doc/0_Model/Eam/idle.eam");
        //this.queueLoader.load("resource/doc/0_Model/Eam/attack.eam");
        //// ---------------------------------

        //// 加载贴图文件
        //this.queueLoader.load("resource/doc/0_Model/Texture/hero_01.png");

        //this.queueLoader.load("resource/doc/effect/MapConfig.json");

        this.queueLoader.load("resource/doc/animation/MapConfig.json");
        // 监听完成事件
        this.queueLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onQueueLoader, this);

        // 监听键盘按下事件
        egret3d.Input.addEventListener(egret3d.KeyEvent3D.KEY_DOWN, this.onKeyDown, this);
    }

    protected onQueueLoader(e: egret3d.LoaderEvent3D) {
        //this.createSkeletonAnimation();
        this.createEffect();
    }



    // 按1 2 3 4键 切换动画
    protected onKeyDown(e: egret3d.KeyEvent3D) {
        switch (e.keyCode) {
            case egret3d.KeyCode.Key_1:
                if (this.role) {
                    this.role.animation.play("Idle");
                }
                break;
         
            case egret3d.KeyCode.Key_3:
                if (this.role) {
                    this.role.animation.play("Attack1");
                }
                break;
        }
    }

    // 加载资源完成后 创建骨骼动画
    protected createSkeletonAnimation() {
        // 加载完成后用url查找资源 
        var geo: egret3d.Geometry = this.queueLoader.getAsset("resource/doc/0_Model/Esm/Zhouyu.esm");

        var clip0: egret3d.SkeletonAnimationClip = this.queueLoader.getAsset("resource/doc/0_Model/Eam/idle.eam");
        var clip2: egret3d.SkeletonAnimationClip = this.queueLoader.getAsset("resource/doc/0_Model/Eam/attack.eam");
        var textures: egret3d.ITexture[] = [];

        textures[0] = this.queueLoader.getAsset("resource/doc/0_Model/Texture/hero_01.png");

        // 给每个动画指定名字 用于动画切换使用
        clip0.animationName = "Idle";
        clip2.animationName = "Attack1";

        // 创建Mesh
        var mesh: egret3d.Mesh = new egret3d.Mesh(geo, new egret3d.TextureMaterial());
        this.role = mesh;
        for (var i: number = 0; i < geo.subGeometrys.length; ++i) {
            var mat: egret3d.MaterialBase = mesh.getMaterial(i);
            if (!mat) {
                mat = new egret3d.TextureMaterial();
                mesh.addSubMaterial(i, mat);
            }

            mat.diffuseTexture = textures[i];
        }

        mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip0);
        mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip2);
        mesh.animation.play("Idle");

        this.view.addChild3D(mesh);
        // 监听动画播放完成事件 
        mesh.animation.skeletonAnimationController.addEventListener(egret3d.AnimationEvent3D.COMPLETE, this.onPlayComplete, this);
        mesh.animation.skeletonAnimationController.addEventListener(egret3d.AnimationEvent3D.CHANGE, this.onPlayChange, this);

    }

    // 播放完成事件 如果是循环动画 完成一次会触发一次
    protected onPlayComplete(e: egret3d.AnimationEvent3D) {
        var skeletonAnimation: egret3d.SkeletonAnimation = e.target;
    }

    // 换帧事件
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

    // 特效组加载完成
    protected createEffect() {
        // 特效资源加载完成后，把特效加入场景中
        var effect: egret3d.EffectGroup = this.queueLoader.getAsset("resource/doc/effect/MapConfig.json");
        this.view.addChild3D(effect);
    }

    // 创建一个粒子动画
    protected createParticle() {

        var mat: egret3d.TextureMaterial = new egret3d.TextureMaterial();
        mat.ambientColor = 0xffffff;

        // 获取资源 这张贴图不是透明贴图 
        mat.diffuseTexture = this.queueLoader.getAsset("resource/doc/ice_0001.png");

        // 设置渲染模式  颜色叠加渲染出来的效果会受背景影响
        mat.blendMode = egret3d.BlendMode.ADD;

        var particle: egret3d.ParticleEmitter;
        var data: egret3d.ParticleData = new egret3d.ParticleData();
        data.followTarget = new egret3d.ParticleDataFollowTarget();

        // 设置最大粒子数量 
        data.property.particleCount = 1000;
        // 
        data.shape.type = egret3d.ParticleDataShapeType.Point;

        var moveSpeed: egret3d.ParticleDataMoveSpeed = new egret3d.ParticleDataMoveSpeed();
        moveSpeed.min = 80;
        moveSpeed.max = 100;
        data.moveSpeed = moveSpeed;

        var lifeData: egret3d.ParticleDataLife = data.life;
        lifeData.duration = 20;
        lifeData.min = lifeData.max = 2;

        var emission: egret3d.ParticleDataEmission = data.emission;
        emission.rate = 10;

        // 爆发的粒子数据
        emission.bursts = [];


        emission.bursts.push(new egret3d.Point(2.0, 25));
        emission.bursts.push(new egret3d.Point(4.0, 20));
        emission.bursts.push(new egret3d.Point(6.0, 45));

        // 数据矫正
        data.validate();

        // 创建跟随的cube
        this.cube = new egret3d.Mesh(new egret3d.CubeGeometry(10, 10, 10));
        this.view.addChild3D(this.cube);

        // 数据准备好后创建粒子
        particle = new egret3d.ParticleEmitter(data, mat);

        // 设置跟随的对象
        particle.followTarget = this.cube;

        // 播放粒子
        particle.play();

        // 加入场景 
        this.view.addChild3D(particle);
    }
    protected update(e: egret3d.Event3D) {
        this.cameraCtl.update();

        //this.angle += 0.01;
        //this.cube.x = Math.cos(this.angle) * 300;
        //this.cube.z = Math.sin(this.angle) * 300;
    }
}