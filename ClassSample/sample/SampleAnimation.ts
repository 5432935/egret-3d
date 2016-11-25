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
        //this.queueLoader.load("resource/doc/ganning/Ganning.esm");

        //// 加载动画文件
        //this.queueLoader.load("resource/doc/ganning/Idle.eam");
        //this.queueLoader.load("resource/doc/ganning/Run.eam");
        //this.queueLoader.load("resource/doc/ganning/Attack1.eam");
        //this.queueLoader.load("resource/doc/ganning/Death.eam");
        //// ---------------------------------

        //// 加载贴图文件
        //this.queueLoader.load("resource/doc/ganning/Ganning.png");
        //this.queueLoader.load("resource/doc/ganning/Ganning_f.png");
        //this.queueLoader.load("resource/doc/ganning/Ganning_Weapon.png");

        //this.queueLoader.load("resource/doc/effect/MapConfig.json");

        //this.queueLoader.load("resource/doc/animation/MapConfig.json");

        //this.queueLoader.load("resource/doc/ice_0001.png");

        this.queueLoader.load("resource/doc/materail/FLOOR_1.png");

        this.queueLoader.load("resource/doc/test1.png");
        this.queueLoader.load("resource/doc/Lava_05.png");
        // 监听完成事件
        this.queueLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onQueueLoader, this);

        // 监听键盘按下事件
        egret3d.Input.addEventListener(egret3d.KeyEvent3D.KEY_DOWN, this.onKeyDown, this);
    }

    protected onQueueLoader(e: egret3d.LoaderEvent3D) {
        //this.createSkeletonAnimation();
        //this.createEffect();

        //this.createParticle();
        //this.createObjectAnimation();
        //this.importObjectAnimationScene();
        this.uvSpriteAnimation();
    }

    // 使用uv 帧动画 
    protected uvSpriteAnimation() {
        var mat: egret3d.TextureMaterial = new egret3d.TextureMaterial();
        mat.repeat = true;
        var plane: egret3d.Mesh = new egret3d.Mesh(new egret3d.PlaneGeometry(1000, 1000, 10, 10, 1, 1), mat);
        this.view.addChild3D(plane);
        plane.y = 10;
        var uvSpriteSheetMethod: egret3d.UVSpriteSheetMethod = new egret3d.UVSpriteSheetMethod(34, 6, 6, 3.0);
        mat.diffusePass.addMethod(uvSpriteSheetMethod);
        uvSpriteSheetMethod.start(true);
        mat.diffuseTexture = this.queueLoader.getAsset("resource/doc/test1.png");


        plane.scaleX = 0.5;
    }

    // 使用uv 滚动动画 
    protected uvRollAnimation() {
        var mat: egret3d.TextureMaterial = new egret3d.TextureMaterial();
        mat.repeat = true;
        var plane: egret3d.Mesh = new egret3d.Mesh(new egret3d.PlaneGeometry(1000, 1000, 100, 100, 1, 1), mat);
        this.view.addChild3D(plane);
        plane.y = 10;

        var uvRollMethod: egret3d.UVRollMethod = new egret3d.UVRollMethod();
        mat.diffusePass.addMethod(uvRollMethod);
        uvRollMethod.start(true);

        mat.diffuseTexture = this.queueLoader.getAsset("resource/doc/Lava_05.png");

    }

    // 按1 2 3 4键 切换动画
    protected onKeyDown(e: egret3d.KeyEvent3D) {
        switch (e.keyCode) {
            case egret3d.KeyCode.Key_1:
                if (this.role) {
                    this.role.animation.play("Idle");
                }
                break;
            case egret3d.KeyCode.Key_2:
                if (this.role) {
                    this.role.animation.play("Run");
                }
                break;
            case egret3d.KeyCode.Key_3:
                if (this.role) {
                    this.role.animation.play("Attack1");
                }
                break;
            case egret3d.KeyCode.Key_4:
                if (this.role) {
                    this.role.animation.play("Death");
                }
                break;
        }
    }

    // 加载资源完成后 创建骨骼动画
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

        // 给每个动画指定名字 用于动画切换使用
        clip0.animationName = "Idle";
        clip1.animationName = "Run";
        clip2.animationName = "Attack1";
        clip3.animationName = "Death";

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
        mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip1);
        mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip2);
        mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip3);
        mesh.animation.play("Idle");

        this.view.addChild3D(mesh);
        // 监听动画播放完成事件 
        mesh.animation.skeletonAnimationController.addEventListener(egret3d.AnimationEvent3D.EVENT_PLAY_COMPLETE, this.onPlayComplete, this);
        mesh.animation.skeletonAnimationController.addEventListener(egret3d.AnimationEvent3D.EVENT_FRAME_CHANGE, this.onPlayChange, this);

    }

    // 播放完成事件 如果是循环动画 完成一次会触发一次
    protected onPlayComplete(e: egret3d.AnimationEvent3D) {
        var skeletonAnimation: egret3d.SkeletonAnimation = e.target;
        console.log("onPlayComplete:" + skeletonAnimation.currentAnimName);
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

    // 自定义数据动画
    protected createObjectAnimation() {
        var cube: egret3d.Mesh = new egret3d.Mesh(new egret3d.CubeGeometry(100, 100, 100));
        cube.material.diffuseTexture = this.queueLoader.getAsset("resource/doc/materail/FLOOR_1.png");
        this.view.addChild3D(cube);

        // 创建一个动画对象
        var proAnim: egret3d.PropertyAnim = new egret3d.PropertyAnim();

        // 指定动画曲线
        var animCurves: egret3d.AnimCurve[] = [];

        var c0: egret3d.AnimCurve = new egret3d.AnimCurve();
        c0.start.x = 0;
        c0.start.y = 0;

        c0.end.x = 3000;
        c0.end.y = 300;

        c0.c1.x = 0;
        c0.c1.y = 0;

        c0.c2.x = 10;
        c0.c2.y = 10;

        var c1: egret3d.AnimCurve = new egret3d.AnimCurve();
        c1.start.x = 3000;
        c1.start.y = 8;

        c1.end.x = 6000;
        c1.end.y = -500;

        c1.c1.x = 30;
        c1.c1.y = 30;

        c1.c2.x = 50;
        c1.c2.y = 10;

        animCurves.push(c0);
        animCurves.push(c1);

        proAnim.addAnimCurve("y", animCurves);

        var proAnimation: egret3d.PropertyAnimController = new egret3d.PropertyAnimController();
        proAnimation.addPropertyAnim(proAnim);
        // 给cube 创建属性动画控制器
        
        cube.proAnimation = proAnimation;

        // 播放
        proAnimation.play();
    }

    // 导入有动画的场景
    protected importObjectAnimationScene() {
        // 特效资源加载完成后，把特效加入场景中
        var scene: egret3d.Scene3D = this.queueLoader.getAsset("resource/doc/animation/MapConfig.json");
        this.view.scene = scene;
        // 找到导出场景中的主摄像机  设置为当前摄像机
        this.view.camera3D = <egret3d.Camera3D>scene.findObject3D("Camera");

        //// 找到场景中的水晶对象 然后播放动画  如果动画没有自动播放需要查找节点proAnimation.play()
        //var Crystal: egret3d.Object3D = scene.findObject3D("Crystal");
        //Crystal.proAnimation.play();
    }

    protected update(e: egret3d.Event3D) {
        this.cameraCtl.update();

        //this.angle += 0.01;
        //this.cube.x = Math.cos(this.angle) * 300;
        //this.cube.z = Math.sin(this.angle) * 300;
    }
}