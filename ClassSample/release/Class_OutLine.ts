module egret3d {
    //静态模型使用多材质 和 材质球特殊光效贴图
    export class Class_OutLine extends Class_View3D {

        private laohu: Mesh;
        private view1: View3D;
        private lights: LightGroup = new LightGroup();

        private cameraCtl: LookAtController;

        constructor() {
            super();


            this.view1 = new View3D(0, 0, 1024, 800);
            this.view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            this.view1.backColor = 0xffffffff;
            this._egret3DCanvas.addView3D(this.view1);

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;

            this._queueLoad = new QueueLoader();
            this._queueLoad.loadDefaultGUISkin();
            this._queueLoad.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.init3D, this);

        }

    
        private init3D() {
            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);

            this.cameraCtl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            this.initGUI();
            this.initScene();

            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }

        private initGUI() {

        }

        private initScene() {
            var cube: Mesh = new Mesh(new CubeGeometry(), new TextureMaterial());

            //创建 显示 绘制外线框 pass
            var pass: OutLinePass = new OutLinePass();
            cube.material.addDiffuseChilderPass(pass);//cube.material.materialData
            //调整绘制外线框颜色
            pass.outLineColor = 0xff00ff00;
            //调整绘制外线框size
            pass.outLineSize = 0.5;

            this.view1.addChild3D(cube);
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}