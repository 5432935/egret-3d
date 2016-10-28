module egret3d {

    /*
    */
    export class Class_ReURLLoader extends Class_View3D {

        private view1: View3D;
        private cameraCtl: LookAtController;

        protected url: URLLoader;
        protected mesh: Mesh;
        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, this._egret3DCanvas.width, this._egret3DCanvas.height);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xff7f7f00;
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;


            this.mesh = new Mesh(new CubeGeometry());
            this.view1.addChild3D(this.mesh);

            this.url = new URLLoader("./resource/effect/blue_streamer.jpg");
            this.url.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onTexture, this);
        }

        protected onTexture(e: LoaderEvent3D) {
            console.log("complete");
            this.url.removeEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onTexture, this);
            this.mesh.material.diffuseTexture = e.data;

            this.url.load("./resource/effect/Fx_Water_01.png");
            this.url.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onTexture1, this);
        }


        protected onTexture1(e: LoaderEvent3D) {
            console.log("complete1");
            this.mesh.material.diffuseTexture = e.data;
        }
     


        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}