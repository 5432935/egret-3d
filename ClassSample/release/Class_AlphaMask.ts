module egret3d {
    export class Class_AlphaMask extends Class_View3D {

        private view1: View3D;
        private cameraCtl: LookAtController;
        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xffffffff;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            view1.backImage = tex;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            this._queueLoad = new QueueLoader();
            this._queueLoad.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.quenLoadComplete, this);
            this._queueLoad.load("resource/doc/effect_doc/alpha_mask/texture.jpg");
            this._queueLoad.load("resource/doc/effect_doc/streamer_method/streamer.png");
        }

        private quenLoadComplete(e: LoaderEvent3D) {

            var texture2: ITexture = this._queueLoad.getAsset("resource/doc/effect_doc/alpha_mask/texture.jpg");
            var texture1: ITexture = this._queueLoad.getAsset("resource/doc/effect_doc/streamer_method/streamer.png");
            var material1: TextureMaterial = new TextureMaterial(texture2);
            material1.diffuseTexture = texture2;

            var plane_1: Mesh = new Mesh(new PlaneGeometry(), material1);
            plane_1.material.blendMode = BlendMode.ALPHA;
            plane_1.material.cutAlpha = 0;
            plane_1.x = -200;
            plane_1.y -= 50;
            plane_1.name = "plane_2";
            this.view1.addChild3D(plane_1);



            var material2: TextureMaterial = new TextureMaterial(texture2);
            material2.diffuseTexture = texture2;
            var plane_2: Mesh = new Mesh(new PlaneGeometry(), material2);
            var method: StreamerMethod = new StreamerMethod();
            material2.diffusePass.addMethod(method);
            material2.repeat = true;
            method.steamerTexture = texture1;

            plane_2.material.blendMode = BlendMode.ALPHA;
            plane_2.material.cutAlpha = 0;
            plane_2.x = 200;
            plane_2.y -= 50;
            plane_2.name = "plane_2";
            this.view1.addChild3D(plane_2);


            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
            Egret3DState.showTime(Math.floor(1000 / e.delay), e.delay);
        }
    }
}