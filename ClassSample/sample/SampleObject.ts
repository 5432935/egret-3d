class SampleObject {


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

        var camera: egret3d.Camera3D = this.createCamera();

        var view: egret3d.View3D = new egret3d.View3D(0, 0, window.innerWidth, window.innerHeight, camera);
        view.backColor = 0xffcccccc;

        this.egret3DCanvas.addView3D(view);
        this.view = view;

        this.cameraCtl = new egret3d.LookAtController(view.camera3D, new egret3d.Object3D());
        this.cameraCtl.distance = 1000;
        this.cameraCtl.rotationX = 60;

        this.egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
        // ------------------ 初始化引擎 ---------------------

        //this.createWireframe();

        //this.createWireframeForGeometry();

        //this.createWireframeForVertex();

        //this.createObject();

        //this.createMesh();

        //this.loaderRole();

        //this.createBillboard();

        //this.loaderScene();

        //this.loaderSkySphere();

        //this.loaderSkyBox();

        //this.loaderTerrain();

        this.loaderEffectGrop();
    }

    // 加载天空盒资源
    protected loaderSkyBox() {
        var loader: egret3d.QueueLoader = new egret3d.QueueLoader();
        loader.load("resource/doc/sky/cloudy_noon_FR.png");
        loader.load("resource/doc/sky/cloudy_noon_BK.png");
        loader.load("resource/doc/sky/cloudy_noon_LF.png");
        loader.load("resource/doc/sky/cloudy_noon_RT.png");
        loader.load("resource/doc/sky/cloudy_noon_UP.png");
        loader.load("resource/doc/sky/cloudy_noon_DN.png");
        loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onSkyBoxTexture, this);
    }

    // 天空盒资源加载完成 创建天空盒
    protected onSkyBoxTexture(e: egret3d.LoaderEvent3D) {
        var loader: egret3d.QueueLoader = e.target;

        var fr: egret3d.ITexture = loader.getAsset("resource/doc/sky/cloudy_noon_FR.png");
        var bk: egret3d.ITexture = loader.getAsset("resource/doc/sky/cloudy_noon_BK.png");
        var lf: egret3d.ITexture = loader.getAsset("resource/doc/sky/cloudy_noon_LF.png");
        var rt: egret3d.ITexture = loader.getAsset("resource/doc/sky/cloudy_noon_RT.png");
        var up: egret3d.ITexture = loader.getAsset("resource/doc/sky/cloudy_noon_UP.png");
        var dn: egret3d.ITexture = loader.getAsset("resource/doc/sky/cloudy_noon_DN.png");

        // 创建cube贴图
        var cubeTexture: egret3d.CubeTexture = egret3d.CubeTexture.createCubeTextureByImageTexture(fr, bk, lf, rt, up, dn);

        // 创建cube geometry 和 cube 材质
        var sky: egret3d.Sky = new egret3d.Sky(new egret3d.CubeGeometry(10000, 10000, 10000), new egret3d.CubeTextureMaterial(cubeTexture), this.view.camera3D);
        // 设置天空盒 渲染模式为背面渲染
        sky.material.cullMode = egret3d.ContextConfig.FRONT;
        this.view.addChild3D(sky);
    }

    // 加载天空球资源
    protected loaderSkySphere() {
        var loader: egret3d.QueueLoader = new egret3d.QueueLoader();
        loader.load("resource/doc/sky/sky0026.png");
        loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onSkySphereTexture, this);
    }

    // 天空球资源加载完成 创建天空盒
    protected onSkySphereTexture(e: egret3d.LoaderEvent3D) {
        var loader: egret3d.QueueLoader = e.target;

        var texture: egret3d.ITexture = loader.getAsset("resource/doc/sky/sky0026.png");

        // 创建SphereGeometry 和 材质
        var sky: egret3d.Sky = new egret3d.Sky(new egret3d.SphereGeometry(10000, 100, 100), new egret3d.TextureMaterial(texture), this.view.camera3D);
        // 设置天空盒 渲染模式为背面渲染
        sky.material.cullMode = egret3d.ContextConfig.FRONT;
        this.view.addChild3D(sky);
    }


    // 加载一个角色的配置
    protected loaderRole() {
        // 这是个avatar 角色
        var roleLoader: egret3d.QueueLoader = new egret3d.QueueLoader();
        roleLoader.load("resource/doc/Js_20161109/MapConfig.json");
        roleLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onRoleComplete, this);
    }

    // 角色加载完成
    protected onRoleComplete(e: egret3d.LoaderEvent3D) {
        var roleLoader: egret3d.QueueLoader = e.target;
        var role: egret3d.Role = roleLoader.getAsset("resource/doc/Js_20161109/MapConfig.json");
        this.view.addChild3D(role);
        role.x = 300;

        // avatar 角色 动画播放
        role.skeletonAnimation.play();
    }


    // 加载一个特效组的配置
    protected loaderEffectGrop() {
        // 这是个特效组
        var loader: egret3d.QueueLoader = new egret3d.QueueLoader();
        loader.load("resource/doc/effect/MapConfig.json");
        loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onEffectGropComplete, this);
    }

    // 特效组加载完成
    protected onEffectGropComplete(e: egret3d.LoaderEvent3D) {
        var loader: egret3d.QueueLoader = e.target;
        var effect: egret3d.EffectGroup = loader.getAsset("resource/doc/effect/MapConfig.json");
        this.view.addChild3D(effect);

        // 特效组 角色 动画播放

        //setTimeout(function () {
        //    effect.play(1, true);

        //}, 2000);
    }


    // 加载一个场景的配置
    protected loaderScene() {
        // 这是个特效组
        var loader: egret3d.QueueLoader = new egret3d.QueueLoader();
        loader.load("resource/doc/sponza_Demo/MapConfig.json");
        loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onSceneComplete, this);
    }

    // 场景加载完成
    protected onSceneComplete(e: egret3d.LoaderEvent3D) {
        var loader: egret3d.QueueLoader = e.target;
        var scene: egret3d.Scene3D = loader.getAsset("resource/doc/sponza_Demo/MapConfig.json");

        // 替换场景 中的scene
        // 并把原来主摄像机加载当前场景
        this.view.scene = scene;
        this.view.scene.addChild(this.view.camera3D);
    }

    protected createCamera() {

        // 创建摄像机 透视
        var camera: egret3d.Camera3D = new egret3d.Camera3D(egret3d.CameraType.perspective);
        //var camera: egret3d.Camera3D = new egret3d.Camera3D(egret3d.CameraType.orthogonal); 正交 

        // 设置摄像机的坐标为(0, 1000, -1000) 看向目标(0, 0, 0)
        camera.lookAt(new egret3d.Vector3D(0, 1000, -1000), new egret3d.Vector3D(0, 0, 0));

        // 或者直接设置摄像机 坐标或旋转
        //camera.z = -200;

        return camera;
    }

    protected createObject() {

        // 新建一个红色的cube 放在场景的（0，0，0）位置  大小为（10， 10， 10）;
        var cube: egret3d.Mesh = new egret3d.Mesh(new egret3d.CubeGeometry(10, 10, 10), new egret3d.ColorMaterial(0xff0000));
        this.view.addChild3D(cube);


        // 新建一个Object3D对象  
        var object0: egret3d.Object3D = new egret3d.Object3D();
        // 把object0加载场景中
        this.view.addChild3D(object0);

        // 设置object0的本地坐标z = 200
        object0.z = 200;

        // 新建一个Mesh对象  大小为 （100， 100， 100）的盒子
        var mesh0: egret3d.Mesh = new egret3d.Mesh(new egret3d.CubeGeometry(100, 100, 100), new egret3d.ColorMaterial(0x00ff00));
        // 把mesh0添加为object0的子节点
        object0.addChild(mesh0);

        // 设置mesh0的本地坐标z = 200
        mesh0.z = 200;

        // 新建一个Mesh对象  大小为 （100， 100， 100）的盒子
        var mesh1: egret3d.Mesh = new egret3d.Mesh(new egret3d.CubeGeometry(100, 100, 100), new egret3d.ColorMaterial(0x0000ff));
        object0.addChild(mesh1);


        // 新建一个Mesh对象  大小为 （100， 100， 100）的盒子
        var mesh2: egret3d.Mesh = new egret3d.Mesh(new egret3d.CubeGeometry(100, 100, 100), new egret3d.ColorMaterial(0xff00ff));
        object0.addChild(mesh2);
        // 设置mesh2的全局坐标z =  -100
        mesh2.globalZ = -100;

        var mesh: egret3d.Mesh = new egret3d.Mesh(new egret3d.CubeGeometry());
        for (var i: number = 0; i < mesh.materialCount; ++i) {
            var mat: egret3d.MaterialBase = mesh.getMaterial(i);
        }

        for (var i: number = 0; i < mesh.geometry.subGeometrys.length; ++i) {
            var sub: egret3d.SubGeometry = mesh.geometry.subGeometrys[i];
            var mat: egret3d.MaterialBase = mesh.getMaterial(i);
        }
    }

    // 创建Mesh
    protected createMesh() {
        this.createTriangle();
        this.createRcet();
    }

    // 创建3角形
    protected createTriangle() {
        var geom: egret3d.Geometry = egret3d.GeometryUtil.createGeometry();

        var vb: number[] = [];
        var ib: number[] = [];

        // 0 1 2 坐标 3 4 5 6 颜色 7 8 uv
        vb.push(-50, -50, 0, 1, 0, 0, 1);
        vb.push(0, 50, 0, 0, 1, 0, 1);
        vb.push(50, -50, 0, 0, 0, 1, 1);
        // 加入3个顶点       

        // 设置顶点索引  3个索引  1个3角形面
        ib.push(0, 1, 2);

        // 把数据填充进Geometry
        geom.setVerticesForIndex(0, egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_COLOR, vb, 3);
        geom.setVertexIndices(0, ib);

        // 使用Geometry 创建Mesh
        var mesh: egret3d.Mesh = new egret3d.Mesh(geom, new egret3d.ColorMaterial(0xffffff));

        // 设置双面渲染
        mesh.material.bothside = true;

        this.view.addChild3D(mesh);

        mesh.x = -200;
    }

    // 创建四边形
    protected createRcet() {

        //创建一个Geometry 顶点格式为 VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_TANGENT | VertexFormat.VF_COLOR | VertexFormat.VF_UV0 | VertexFormat.VF_UV1
        var geom: egret3d.Geometry = egret3d.GeometryUtil.createGeometry();

        var vb: number[] = [];
        var ib: number[] = [];

        // 0 1 2 坐标 3 4 5 6 颜色 7 8 uv
        vb.push(-50, 50, 0, 0, 1, 0, 1, 0, 0);
        vb.push(50, 50, 0, 0, 0, 1, 1, 1, 0);
        vb.push(-50, -50, 0, 1, 0, 0, 1, 0, 1);
        vb.push(50, -50, 0, 0, 0, 1, 1, 1, 1);
        // 加入4个顶点        

        // 设置顶点索引  6个索引  2个3角形面
        ib.push(0, 2, 1, 2, 3, 1);

        // 把数据填充进Geometry
        geom.setVerticesForIndex(0, egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_COLOR | egret3d.VertexFormat.VF_UV0, vb, 4);
        geom.setVertexIndices(0, ib);

        var mesh: egret3d.Mesh = new egret3d.Mesh(geom, new egret3d.TextureMaterial());

        // 设置双面渲染
        //mesh.material.bothside = true;

        this.view.addChild3D(mesh);
        mesh.x = 200;
    }

    // 用Geometry 创建线框
    protected createWireframeForGeometry() {
        // 创建一个cube Mesh
        var cube: egret3d.Mesh = new egret3d.Mesh(new egret3d.CubeGeometry(100, 100, 100), new egret3d.ColorMaterial(0x333333));
        this.view.addChild3D(cube);

        cube.x = 500;
        // 用cube 的Geometry 创建线框
        var cubeWireframe: egret3d.Wireframe = new egret3d.Wireframe();
        cubeWireframe.fromGeometry(cube.geometry);
        // 把cube的线框绑定在cube 上
        cube.addChild(cubeWireframe);

        // 创建一个球 Mesh
        var s: egret3d.Mesh = new egret3d.Mesh(new egret3d.SphereGeometry(100, 20, 20), new egret3d.ColorMaterial(0x333333));
        this.view.addChild3D(s);
        // 打开球的包围盒 显示包围盒
        s.bound.visible = true;
        s.x = 800;
        // 用球 的Geometry 创建线框
        var sWireframe: egret3d.Wireframe = new egret3d.Wireframe();
        sWireframe.fromGeometry(s.geometry);
        // 把球的线框绑定在球 上
        s.addChild(sWireframe);
    }

    // 用顶点 创建线框
    protected createWireframeForVertex() {
      
        var wireframe0: egret3d.Wireframe = new egret3d.Wireframe();
        var vb0: number[] = [];

        // 添加5个顶点 依次连接 连接成一个4边形
        vb0.push(0, 100, 0, 1, 0, 0, 1);
        vb0.push(0, 100, 100, 0, 1, 0, 1);
        vb0.push(100, 100, 100, 0, 0, 1, 1);
        vb0.push(100, 100, 0, 0, 0, 1, 1);
        vb0.push(0, 100, 0, 1, 0, 0, 1);

        // 设置顶点 和 顶点格式为 坐标和颜色
        wireframe0.fromVertexs(vb0, egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_COLOR);

        this.view.addChild3D(wireframe0);
        wireframe0.x = -400;


        var wireframe1: egret3d.Wireframe = new egret3d.Wireframe();

        var vb1: number[] = [];

        // 添加8个顶点 两两相边 连接成一个4边形
        vb1.push(0, 100, 0, 1, 0, 0, 1);
        vb1.push(0, 100, 100, 0, 1, 0, 1);

        vb1.push(0, 100, 100, 0, 1, 0, 1);
        vb1.push(100, 100, 100, 0, 0, 1, 1);

        vb1.push(100, 100, 100, 0, 0, 1, 1);
        vb1.push(100, 100, 0, 0, 0, 1, 1);

        vb1.push(100, 100, 0, 0, 0, 1, 1);
        vb1.push(0, 100, 0, 1, 0, 0, 1);

        // 设置顶点 和 顶点格式为 坐标和颜色
        wireframe1.fromVertexsEx(vb1, egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_COLOR);

        this.view.addChild3D(wireframe1);

        wireframe1.x = -200;
    }

    // 用顶点和索引的方式 创建线框
    protected createWireframe() {
        // 创建一个20 * 20 行的 每个格子100 * 100 大小
        var wir: egret3d.Wireframe = new egret3d.Wireframe();
        wir.material.diffuseColor = 0x000000;
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

    // 创建公告板
    protected createBillboard() {
        // Geometry 可以指定 
        var billboard: egret3d.Billboard = new egret3d.Billboard(new egret3d.TextureMaterial());
        this.view.addChild3D(billboard);

        billboard.y = 300;
    }

    // 加载地形的资源
    protected loaderTerrain() {
        var loader = new egret3d.QueueLoader();

        loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onTerrainComplete, this);

        // 高度图
        loader.load("resource/doc/ziyan_xinshou/Heightmap_0.jpg");
        // 地形混合图
        loader.load("resource/doc/ziyan_xinshou/Alphamap_0.jpg");
        // 地表贴图 4张
        loader.load("resource/doc/ziyan_xinshou/SplatPrototype_texture_0.jpg");
        loader.load("resource/doc/ziyan_xinshou/SplatPrototype_texture_1.jpg");
        loader.load("resource/doc/ziyan_xinshou/SplatPrototype_texture_2.jpg");
        loader.load("resource/doc/ziyan_xinshou/SplatPrototype_texture_3.jpg");
    }

    private onTerrainComplete(e: egret3d.LoaderEvent3D) {
        var loader: egret3d.QueueLoader = e.target;

        // 使用高度图创建地形
        var heightImage: egret3d.ImageTexture = <egret3d.ImageTexture>loader.getAsset("resource/doc/ziyan_xinshou/Heightmap_0.jpg");
        var terrain: egret3d.Terrain = new egret3d.Terrain(heightImage, 2000, 500, 2000, 200, 200);
        var mat: egret3d.MaterialBase = terrain.material;
        //mat.gloss = 10.0;
        mat.repeat = true;

        this.view.addChild3D(terrain);

        // 给地形增加地形混合渲染方法
        var terrainMethod: egret3d.TerrainARGBMethod = new egret3d.TerrainARGBMethod(
            egret3d.CheckerboardTexture.texture,
            egret3d.CheckerboardTexture.texture,
            egret3d.CheckerboardTexture.texture,
            egret3d.CheckerboardTexture.texture,
            egret3d.CheckerboardTexture.texture);

        mat.diffusePass.addMethod(terrainMethod);

        terrainMethod.setUVTitling(0, 26.7, 26.7);
        terrainMethod.setUVTitling(1, 16, 16);
        terrainMethod.setUVTitling(2, 26.7, 26.7);
        terrainMethod.setUVTitling(3, 26.7, 26.7);

        // 设置混合贴图和地表贴图
        terrainMethod.controlTexture = loader.getAsset("resource/doc/ziyan_xinshou/Alphamap_0.jpg");
        terrainMethod.splat_0_Texture = loader.getAsset("resource/doc/ziyan_xinshou/SplatPrototype_texture_0.jpg");
        terrainMethod.splat_1_Texture = loader.getAsset("resource/doc/ziyan_xinshou/SplatPrototype_texture_1.jpg");
        terrainMethod.splat_2_Texture = loader.getAsset("resource/doc/ziyan_xinshou/SplatPrototype_texture_2.jpg");
        terrainMethod.splat_3_Texture = loader.getAsset("resource/doc/ziyan_xinshou/SplatPrototype_texture_3.jpg");
    }

    protected update(e: egret3d.Event3D) {
        this.cameraCtl.update();
    }
}