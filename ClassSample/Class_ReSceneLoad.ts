module egret3d {

    /*
    * 按1卸载场景
    */
    export class Class_ReSceneLoad extends Class_View3D {

        private view1: View3D;
        private cameraCtl: LookAtController;

        private mapLoader: MapLoader;
        public renderList: IRender[] = [];
        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, this._egret3DCanvas.width, this._egret3DCanvas.height);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xff7f7f00;
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            this.loadFont(this.view1);

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            Input.addEventListener(KeyEvent3D.KEY_DOWN, this.onKeyDown, this);

            this.mapLoader = new MapLoader("resource/scene/sponza_Demo/MapConfig.json");
            this.view1.addChild3D(this.mapLoader.container);
            this.mapLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onMaploader, this);
        }

        protected onUiFonts(view: View3D) {
            super.onUiFonts(view);
            this.infoText.text = "按键:\n1.卸载场景\n2.重新加载场景";
        }

        private onKeyDown(e: KeyEvent3D) {
            switch (e.keyCode) {
                case KeyCode.Key_1:
                    this.view1.removeChild3D(this.mapLoader.container);
                    this.mapLoader.dispose();
                    break;
                case KeyCode.Key_2:
                    this.mapLoader = new MapLoader("resource/scene/sponza_Demo/MapConfig.json");
                    this.view1.addChild3D(this.mapLoader.container);
                    this.mapLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onMaploader, this);
                    break;
            }
        }

        private onMaploader(e: LoaderEvent3D) {
            this.mapLoader.removeEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onMaploader, this);
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}