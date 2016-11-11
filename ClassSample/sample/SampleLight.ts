class SampleLight {


    // 点击鼠标左键 移动鼠标 控制摄像机旋转 
    // w s a d 控制摄像机移动

    protected egret3DCanvas: egret3d.Egret3DCanvas;
    protected view: egret3d.View3D;
    protected cameraCtl: egret3d.LookAtController;

    protected lights: egret3d.LightGroup;
    protected p0object: egret3d.Object3D;

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
        this.queueLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onAssetComplete, this);
        this.queueLoader.load("resource/doc/materail/brick-diffuse.jpg");
        this.queueLoader.load("resource/doc/materail/brick-normal.jpg");
        this.queueLoader.load("resource/doc/materail/brick-specular.jpg");
        this.queueLoader.load("resource/doc/materail/FLOOR_1.png");
        this.queueLoader.load("resource/doc/materail/land_ocean_ice_2048_match.jpg");

        this.queueLoader.load("resource/doc/materail/cut.png");

        //land_ocean_ice_2048_match.jpg

        // 创建一个灯光组
        this.lights = new egret3d.LightGroup();

    }
    // 
    protected onAssetComplete(e: egret3d.LoaderEvent3D) {
        //this.useCutAlpha();
        //this.createPointLight();
        this.createDirectLight();
    }


    // 使用漫反射贴图 法线贴图 高光贴图
    protected useTexture() {
        var plane: egret3d.Mesh = new egret3d.Mesh(new egret3d.PlaneGeometry(300, 300));
        this.view.addChild3D(plane);

        plane.material.ambientColor = 0xcccccc;
        var p0: egret3d.PointLight = new egret3d.PointLight(0xffffff);

        // 设置点光源的坐标
        p0.y = 50;
        p0.z = 200;

        this.lights.addLight(p0);

        plane.material.lightGroup = this.lights;

        // 设置漫反射贴图
        plane.material.diffuseTexture = this.queueLoader.getAsset("resource/doc/materail/brick-diffuse.jpg");

        // 设置法线贴图
        plane.material.normalTexture = this.queueLoader.getAsset("resource/doc/materail/brick-normal.jpg");

        // 设置高光贴图
        plane.material.specularTexture = this.queueLoader.getAsset("resource/doc/materail/brick-specular.jpg");
    }

    // 把一张透明贴图 cut alpha
    protected useCutAlpha() {
        var plane: egret3d.Mesh = new egret3d.Mesh(new egret3d.PlaneGeometry(300, 300));
        this.view.addChild3D(plane);
        plane.material.diffuseTexture = this.queueLoader.getAsset("resource/doc/materail/cut.png");
        plane.material.cutAlpha = 0.5;

        // 设置双面渲染
        plane.material.bothside = true;
    }
    
    protected createPointLight() {

        // 创建 一个接收光的模型
        var mesh: egret3d.Mesh = new egret3d.Mesh(new egret3d.SphereGeometry(100, 50, 50));
        mesh.material.diffuseTexture = this.queueLoader.getAsset("resource/doc/materail/land_ocean_ice_2048_match.jpg");

        this.view.addChild3D(mesh);

        // 创建一个空节点
        var p0object: egret3d.Object3D = new egret3d.Object3D();
        this.view.addChild3D(p0object);

        // 创建一个点光源
        var p0: egret3d.PointLight = new egret3d.PointLight(0xff0000);
        // 把点光源加载p0object这个节点中
        p0object.addChild(p0);

        // 设置点光源的坐标
        p0.y = 50;
        p0.z = 200;

        // 设置光的强度
        p0.intensity = 2.0;

        // 设置光的影响范围
        p0.radius = 500;
        // 把灯光加入灯光组中
        this.lights.addLight(p0);

        // 设置cube材质中的灯光
        mesh.material.lightGroup = this.lights;

        // 设置材质的自发光颜色
        mesh.material.ambientColor = 0xffffff;

        // 创建一个球 绑定在灯光上  当灯光显示 
        var p0mesh: egret3d.Mesh = new egret3d.Mesh(new egret3d.SphereGeometry(10));
        p0.addChild(p0mesh);

        this.p0object = p0object;
    }

    // 创建一个平行光 绕Y轴一直旋转
    protected createDirectLight() {

        // 创建接收光的模型
        var cube: egret3d.Mesh = new egret3d.Mesh(new egret3d.CubeGeometry(50, 50, 50));
        cube.material.diffuseTexture = this.queueLoader.getAsset("resource/doc/materail/FLOOR_1.png");

        for (var i: number = 0; i < 16; ++i) {
            var cube0: egret3d.Mesh = cube.clone();
            this.view.addChild3D(cube0);

            cube0.x = Math.floor(i / 4) * 100 - 200;
            cube0.z = Math.floor(i % 4) * 100 - 200;

            // 设置模型材质中的灯光
            cube0.material.lightGroup = this.lights;

            // 设置材质的自发光颜色
            cube0.material.ambientColor = 0xffffff;
        }

        // 创建接收光的模型
        var sphere: egret3d.Mesh = new egret3d.Mesh(new egret3d.SphereGeometry(25, 50, 50));
        sphere.material.diffuseTexture = this.queueLoader.getAsset("resource/doc/materail/land_ocean_ice_2048_match.jpg");
        for (var i: number = 0; i < 16; ++i) {
            var sphere0: egret3d.Mesh = sphere.clone();
            this.view.addChild3D(sphere0);

            sphere0.x = Math.floor(i / 4) * 100 - 200;
            sphere0.z = Math.floor(i % 4) * 100 - 200;


            sphere0.z += 400;

            // 设置模型材质中的灯光
            sphere0.material.lightGroup = this.lights;

            // 设置材质的自发光颜色
            sphere0.material.ambientColor = 0x00ff00;
        }

        // 创建一个空节点
        var p0object: egret3d.Object3D = new egret3d.Object3D();
        this.view.addChild3D(p0object);

        // 创建一个平行光
        var p0: egret3d.DirectLight = new egret3d.DirectLight();
        // 设置平行光的方向
        p0.dir = new egret3d.Vector3D(0, -0.3, 1);

        // 把点光源加载p0object这个节点中
        p0object.addChild(p0);

        // 设置光的强度
        p0.intensity = 2.0;

        // 把灯光加入灯光组中
        this.lights.addLight(p0);

        //// 创建一个模型 绑定在灯光上  当灯光显示 
        //var p0mesh: egret3d.Mesh = new egret3d.Mesh(new egret3d.CubeGeometry(10, 10, 100));
        //p0.addChild(p0mesh);

        //var pos: egret3d.Vector3D = new egret3d.Vector3D();
        //pos.copyFrom(p0.dir);
        //pos.scaleBy(-500);
        //p0mesh.position = pos;

        this.p0object = p0object;
    }

    protected update(e: egret3d.Event3D) {
        this.cameraCtl.update();

        if (this.p0object) {
            // 把灯光的对象绕Y轴旋转
            this.p0object.rotationY++;
        }
    }
}