module egret3d {
    export class Class_ColorGradients extends Class_View3D {

        protected view1: View3D;
        protected mesh: Mesh;
        protected cameraCrl: LookAtController;
        private texture: ITexture;
        private method: ColorGradientsMethod;
        private color: Color;
        private startPos: Vector3D;
        private endPos: Vector3D;

        constructor() {
            super();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            var view1: View3D = new View3D(0, 0, 1024, 768);
            this.view1 = view1;

            view1.camera3D.lookAt(new Vector3D(0, 500, -500), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(view1);

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);

            this.cameraCrl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCrl.distance = 1000;

            var loadtex: URLLoader = new URLLoader("resource/scene/particle/vase_round.png");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);

        }

        private onLoadTexture(e: LoaderEvent3D): void {
            this.texture = e.loader.data;
            this.loadMesh();
        }

        private loadMesh(): void {

            var modelLoader: URLLoader = new URLLoader("resource/scene/particle/0_Object001.esm");
            modelLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onModelLoaded, this);
        }

        private onModelLoaded(e: LoaderEvent3D): void {
            var geo: Geometry = e.loader.data;
            var mat: TextureMaterial = new TextureMaterial(this.texture);

            this.method = new ColorGradientsMethod();
            this.color = new Color(0, 1, 0, 0.8);
            this.method.setStartData(-this.span, this.span, this.color);

            mat.diffusePass.addMethod(this.method);

            this.mesh = new Mesh(geo, mat);
            this.view1.addChild3D(this.mesh);

        }





        private pos: number = 0;
        private span: number = 20;
        public update(e: Event3D) {
            this.cameraCrl.update();
            if (this.method) {
                this.pos++;
                if (this.pos > 100) {
                    this.pos = -100;
                }
                this.method.setStartData(this.pos - this.span, this.pos + this.span, this.color);

            }
        }

    }
} 