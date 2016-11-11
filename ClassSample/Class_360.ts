module egret3d {

    //移动灯光
    export class Class_360 extends Class_View3D {

        protected view: View3D;
        protected plane: Mesh;
        protected matPlane: TextureMaterial;
        protected lights: LightGroup = new LightGroup();

        private _eyePicker: EyePick;
        private _cameraController: HoverController;

        constructor() {
            super();

            //Egret3DEngine.instance.debug = true;
            this.view = new View3D(0, 0, window.innerWidth, window.innerHeight);
            //this.view.camera3D.lookAt(new Vector3D(0, 100, -100), new Vector3D(0, 0, 0));
            this.view.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(this.view);
            this._cameraController = new HoverController(this.view.camera3D);
            this._cameraController.steps = 12;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view.backImage = tex;

            this._egret3DCanvas.start();

            this._queueLoad = new QueueLoader();
            this._queueLoad.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.quenLoadComplete, this);
            this._queueLoad.load("resource/moreMaterial/0_Tree_06.esm");
            this._queueLoad.load("resource/moreMaterial/LightmapFar-0.png");
            this._queueLoad.load("resource/moreMaterial/Tree_bark_winter.png");
            this._queueLoad.load("resource/moreMaterial/Tree_leaves_winter.png");
            this._queueLoad.load("resource/scene/SkyBox/2.JPG");
        }

        protected mat: TextureMaterial;
        private quenLoadComplete() {
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
            var texture = <Texture>this._queueLoad.getAsset("resource/scene/SkyBox/2.JPG");
            var material: TextureMaterial = new TextureMaterial(texture);
            material.repeat = true;
            material.ambientColor = 0x0 ;
            var mesh: Mesh = new Mesh(new SphereGeometry(200, 45, 45), material);
            mesh.material.cullMode = ContextConfig.FRONT;
            this.view.addChild3D(mesh);
        }

        public update(e: Event3D) {
            this._cameraController.update();
        }
    }
}