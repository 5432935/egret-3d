module egret3d {

    /*
    * 按1卸载场景
    */
    export class Class_ReSceneLoad extends Class_View3D {

        private view1: View3D;
        private cameraCtl: LookAtController;

        public renderList: IRender[] = [];
        protected loader: UnitLoader;
        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, this._egret3DCanvas.width, this._egret3DCanvas.height);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xff7f7f00;
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            this.cameraCtl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            this._queueLoad = new QueueLoader();
            this._queueLoad.loadDefaultGUISkin();
            this.loader = this._queueLoad.load("resource/scene/smallMap/MapConfig.json");
            this._queueLoad.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onMaploader, this);
        }

        protected onMaploader(e:LoaderEvent3D) {
            super.onUiFonts(this.view1);
            this.infoText.text = "按键:\n1.卸载场景\n2.重新加载场景";

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;

 

            Input.addEventListener(KeyEvent3D.KEY_DOWN, this.onKeyDown, this);

            var scene = this._queueLoad.getAsset("resource/scene/smallMap/MapConfig.json");
            this.view1.scene = scene;
            this.view1.camera3D = new Camera3D();

            this.view1.scene.addChild(this.view1.camera3D);

            this.cameraCtl.target = this.view1.camera3D;

            this._queueLoad.removeEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onMaploader, this);
        }

        private onKeyDown(e: KeyEvent3D) {
            switch (e.keyCode) {
                case KeyCode.Key_1:

                    this._queueLoad.disposeUnitLoader("resource/scene/smallMap/MapConfig.json");
                    this.view1.scene = new Scene3D();
                    this.view1.camera3D = new Camera3D();
                    this.view1.scene.addChild(this.view1.camera3D);

                    break;
                case KeyCode.Key_2:
                    this.loader = this._queueLoad.load("resource/scene/smallMap/MapConfig.json");
                    this._queueLoad.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onMaploader, this);

                    break;
            }
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}