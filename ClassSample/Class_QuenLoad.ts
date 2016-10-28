module egret3d {
    //静态模型使用多材质 和 材质球特殊光效贴图
    export class Class_QuenLoad extends Class_View3D {

        private laohu: Mesh;
        private view1: View3D;
        private lights: LightGroup = new LightGroup();

        private cameraCtl: LookAtController;
        private _quenLoad: QuenLoad;
        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, 1024, 800);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xffffffff;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            view1.backImage = tex;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            this._quenLoad = new QuenLoad();
            this._quenLoad.addEventListener(QuenLoad.QUENLOAD_COMPLETE, this.quenLoadComplete, this);
            this._quenLoad.addLoaderQuen("resource/moreMaterial/0_Tree_06.esm");
            this._quenLoad.addLoaderQuen("resource/moreMaterial/LightmapFar-0.png");
            this._quenLoad.addLoaderQuen("resource/moreMaterial/Tree_bark_winter.png");
            this._quenLoad.addLoaderQuen("resource/moreMaterial/Tree_leaves_winter.png");

        }

        protected mat: TextureMaterial;
        private quenLoadComplete() {


            var dirLight: DirectLight = new DirectLight(new Vector3D(-0.0, -0.6, 0.2));
            dirLight.diffuse = 0xffffff;
            this.lights.addLight(dirLight);

            this.cameraCtl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1400;
            this.cameraCtl.rotationX = 60;

            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            var ge: Geometry = this._quenLoad.getModel("resource/moreMaterial/0_Tree_06.esm");
            var mesh: Mesh = new Mesh(ge, new TextureMaterial());

            this.view1.addChild3D(mesh);
            this.laohu = mesh;

            var mat = <TextureMaterial>mesh.getMaterial(0) || new TextureMaterial();
            mat.ambientColor = 0xffffff;
            mat.cutAlpha = 0.3;
            mat.diffuseTexture = this._quenLoad.getTexture("resource/moreMaterial/Tree_bark_winter.png");
            mesh.addSubMaterial(0, mat);
            mat.lightGroup = this.lights; 

            mat = <TextureMaterial>mesh.getMaterial(1) || new TextureMaterial() ;
            mat.ambientColor = 0xffffff;
            mat.cutAlpha = 0.3;
            mat.diffuseTexture = this._quenLoad.getTexture("resource/moreMaterial/Tree_leaves_winter.png");
            mesh.addSubMaterial(1, mat);
            mat.lightGroup = this.lights; 

        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}