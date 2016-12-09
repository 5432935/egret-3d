module egret3d {
    export class Class_fog  extends Class_View3D {

        protected view1: View3D;
        protected ctl; HoverController;
        protected plane: Mesh;
        protected lights: LightGroup = new LightGroup();
        protected matPlane: TextureMaterial;

        private terrainMethod: TerrainARGBMethod;
        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 100, -100), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;
            this.ctl = new HoverController(view1.camera3D);
            this.ctl.tiltAngle = 60;
            this.ctl.distance = 500;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            //this.matPlane = new TextureMaterial();
            //var fog: LineFogMethod = new LineFogMethod();
            //fog.fogStartDistance = 100.0;
            ////fog.globalDensity = 0.01;
            ////fog.fogHeight = -1000.0;
            //fog.fogAlpha = 1.0;
           

            //var mesh: Mesh = new Mesh(new CubeGeometry(), this.matPlane); 
            //this.matPlane.diffusePass.addMethod(fog);
            //this.view1.addChild3D(mesh);
            //for (var i: number = 0; i < 100; i++) {
            //    var tmp: Mesh = mesh.clone();
            //    tmp.x = Math.random() * 1500 - 750;
            //    tmp.y = Math.random() * 1500 - 750;
            //    tmp.z = Math.random() * 1500 - 750;
            //    this.view1.addChild3D(tmp);
            //}

            this._queueLoad = new QueueLoader();
            this._queueLoad.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.loadComplete, this);
            this._queueLoad.load("resource/terrain/ziyan_xinshou/Heightmap_0.jpg");
            this._queueLoad.load("resource/terrain/ziyan_xinshou/Alphamap_0.png");
            this._queueLoad.load("resource/terrain/ziyan_xinshou/SplatPrototype_texture_0.jpg");
            this._queueLoad.load("resource/terrain/ziyan_xinshou/SplatPrototype_texture_1.jpg");
            this._queueLoad.load("resource/terrain/ziyan_xinshou/SplatPrototype_texture_2.jpg");
            this._queueLoad.load("resource/terrain/ziyan_xinshou/SplatPrototype_texture_3.jpg");
        }

        private loadComplete() {
            var heightImage: ImageTexture = <ImageTexture>this._queueLoad.getAsset("resource/terrain/ziyan_xinshou/Heightmap_0.jpg");
            var envHeightGeometry: ElevationGeometry = new ElevationGeometry(heightImage, 2000, 500, 2000, 200, 200);

            this.matPlane = new TextureMaterial();
            this.matPlane.gloss = 10.0;
            this.matPlane.repeat = true;

            this.plane = new Mesh(envHeightGeometry, this.matPlane);

            this.view1.addChild3D(this.plane);

            var fog: LineFogMethod = new LineFogMethod();
            fog.fogStartDistance = 200.0;
            fog.fogFarDistance = 2000.0;
            fog.fogAlpha = 1.0;
            fog.fogColor = 0xffffff;
            this.matPlane.diffusePass.addMethod(fog);


            this.terrainMethod = new TerrainARGBMethod(
                CheckerboardTexture.texture,
                CheckerboardTexture.texture,
                CheckerboardTexture.texture,
                CheckerboardTexture.texture,
                CheckerboardTexture.texture
            );
            this.matPlane.diffusePass.addMethod(this.terrainMethod);

            this.terrainMethod.setUVTitling(0, 26.7, 26.7);
            this.terrainMethod.setUVTitling(1, 16, 16);
            this.terrainMethod.setUVTitling(2, 26.7, 26.7);
            this.terrainMethod.setUVTitling(3, 26.7, 26.7);
            this.terrainMethod.controlTexture = this._queueLoad.getAsset("resource/terrain/ziyan_xinshou/Alphamap_0.png");
            this.terrainMethod.splat_0_Texture = this._queueLoad.getAsset("resource/terrain/ziyan_xinshou/SplatPrototype_texture_0.jpg");
            this.terrainMethod.splat_1_Texture = this._queueLoad.getAsset("resource/terrain/ziyan_xinshou/SplatPrototype_texture_1.jpg");
            this.terrainMethod.splat_2_Texture = this._queueLoad.getAsset("resource/terrain/ziyan_xinshou/SplatPrototype_texture_2.jpg");
            this.terrainMethod.splat_3_Texture = this._queueLoad.getAsset("resource/terrain/ziyan_xinshou/SplatPrototype_texture_3.jpg");
        }

        public update(e: Event3D) {
            this.ctl.update();
        }
    }
}