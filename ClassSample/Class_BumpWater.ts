module egret3d {
    export class Class_BumpWater  extends Class_View3D {

        protected view1: View3D;
        protected ctl; HoverController;
        protected plane: Mesh;
        protected lights: LightGroup = new LightGroup();
        protected matPlane: TextureMaterial;

        private _queueLoader: QueueLoader;
        constructor() {
            super();

            this.view1 = new View3D(0, 0, window.innerWidth, window.innerHeight);
            this.view1.camera3D.lookAt(new Vector3D(0, 100, -100), new Vector3D(0, 0, 0));
            this.view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(this.view1);
            this.ctl = new HoverController(this.view1.camera3D);
            this.ctl.tiltAngle = 60;
            this.ctl.distance = 1000;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this._queueLoader = new QueueLoader();
            this._queueLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.preloadComplete, this);
            this._queueLoader.load("resource/moreMaterial/0_Tree_06.esm");
            this._queueLoader.load("resource/moreMaterial/LightmapFar-0.png");
            this._queueLoader.load("resource/moreMaterial/Tree_bark_winter.png");
            this._queueLoader.load("resource/moreMaterial/Tree_leaves_winter.png");

            this._queueLoader.load("resource/scene/SkyBox/cubemap1/back.jpg");
            this._queueLoader.load("resource/scene/SkyBox/cubemap1/down.jpg");
            this._queueLoader.load("resource/scene/SkyBox/cubemap1/front.jpg");
            this._queueLoader.load("resource/scene/SkyBox/cubemap1/left.jpg");
            this._queueLoader.load("resource/scene/SkyBox/cubemap1/right.jpg");
            this._queueLoader.load("resource/scene/SkyBox/cubemap1/up.jpg");
            this._queueLoader.load("resource/effect/water/ocean.png");
            this._queueLoader.load("resource/effect/water/waterNormal.png");
            this._queueLoader.load("resource/effect/water/Waves_backface_normal.jpg");
            this._queueLoader.load("resource/effect/water/WaterBump.jpg");
            this._queueLoader.load("resource/effect/water/oceangradient.png");
        }

        private preloadComplete() {

            var back: Texture = this._queueLoader.getAsset("resource/scene/SkyBox/cubemap1/back.jpg");
            var down: Texture = this._queueLoader.getAsset("resource/scene/SkyBox/cubemap1/down.jpg");
            var front: Texture = this._queueLoader.getAsset("resource/scene/SkyBox/cubemap1/front.jpg");
            var left: Texture = this._queueLoader.getAsset("resource/scene/SkyBox/cubemap1/left.jpg");
            var right: Texture = this._queueLoader.getAsset("resource/scene/SkyBox/cubemap1/right.jpg");
            var up: Texture = this._queueLoader.getAsset("resource/scene/SkyBox/cubemap1/up.jpg");

            var cubeTexture: CubeTexture = CubeTexture.createCubeTextureByImageTexture(
                back,
                front,
                left,
                right,
                up,
                down
            );

            var waterNormal: WaterNormalMethod = new WaterNormalMethod();
            var waterBump: WaterBumpMethod = new WaterBumpMethod();
            var envMethod: EnvironmentMethod = new EnvironmentMethod();
            waterNormal.setUvScale(4.0,4.0);

            this.matPlane = new TextureMaterial();
            this.matPlane.repeat = true;
            this.matPlane.diffusePass.addMethod(waterBump);
            this.matPlane.diffusePass.addMethod(envMethod);

            waterBump.bumpTexture = this._queueLoader.getAsset("resource/effect/water/WaterBump.jpg"); 
            waterBump.colorTexture = this._queueLoader.getAsset("resource/effect/water/oceangradient.png"); 
            envMethod.environmentTexture = cubeTexture;

            var mesh: Mesh = new Mesh(new PlaneGeometry(10000, 10000, 1, 1, 1.0, 1.0), this.matPlane);
            this.view1.addChild3D(mesh);
            this.matPlane.gloss = 80.0;
            this.matPlane.specularLevel = 0.5;
            this.matPlane.ambientColor = 0x888888;

            var lights: LightGroup = new LightGroup();
            var dirLight: DirectLight = new DirectLight(new Vector3D(-0.5, -1.0, 1.0));
            lights.addLight(dirLight);

            //var pointLight: PointLight = new PointLight(0xffffff);
            //lights.addLight(pointLight);
           // pointLight.y = 200.0;
            mesh.lightGroup = lights;


            var sky: Mesh = new Mesh(new CubeGeometry(10000, 10000, 10000), new CubeTextureMaterial(cubeTexture));
            sky.material.cullMode = ContextConfig.FRONT;
            this.view1.addChild3D(sky);

        }


        public update(e: Event3D) {
            this.ctl.update();
        }
    }
}