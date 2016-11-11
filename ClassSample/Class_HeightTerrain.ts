module egret3d {
    // 混合地型和高度图
    export class Class_HeightTerrain extends Class_View3D {

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
            this.ctl.distance = 1000;

            this.lights.addLight( view1.sunLight );

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this._queueLoad = new QueueLoader();
            this._queueLoad.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.loadComplete, this);
            this._queueLoad.load("resource/terrain/ziyan_xinshou/Heightmap_0.jpg");
            this._queueLoad.load("resource/terrain/ziyan_xinshou/Alphamap_0.jpg");
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
            this.plane.lightGroup = this.lights;

            this.view1.addChild3D(this.plane);

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
            this.terrainMethod.controlTexture = this._queueLoad.getAsset("resource/terrain/ziyan_xinshou/Alphamap_0.jpg");
            this.terrainMethod.splat_0_Texture = this._queueLoad.getAsset("resource/terrain/ziyan_xinshou/SplatPrototype_texture_0.jpg");
            this.terrainMethod.splat_1_Texture = this._queueLoad.getAsset("resource/terrain/ziyan_xinshou/SplatPrototype_texture_1.jpg");
            this.terrainMethod.splat_2_Texture = this._queueLoad.getAsset("resource/terrain/ziyan_xinshou/SplatPrototype_texture_2.jpg");
            this.terrainMethod.splat_3_Texture =  this._queueLoad.getAsset("resource/terrain/ziyan_xinshou/SplatPrototype_texture_3.jpg");

        }

        private angle: number = 0;
        public update(e: Event3D) {
            this.ctl.update();
            this.angle+=0.01;
        }
    }
}