module egret3d {
    export class Class_Tianmao extends Class_View3D {
        protected view1: View3D;
        protected ctl; HoverController;
        protected textField: gui.UITextField;

        public constructor() {
            super();

            this.view1 = new View3D(0, 0, window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);
            this.view1.camera3D.lookAt(new Vector3D(0, 100, -100), new Vector3D(0, 0, 0));
            this.view1.camera3D.far = 100000;
            this.view1.camera3D.near = 200;
            this.view1.backColor = 0xffcccccc;
            this._egret3DCanvas.addView3D(this.view1);

            this.ctl = new HoverController(this.view1.camera3D);
            this.ctl.tiltAngle = 60;
            this.ctl.distance = 1000;

            Egret3DEngine.instance.debug = true;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
            this.loadAssets();
        }

        private loadAssets() {
            this._queueLoad = new QueueLoader();;
            this._queueLoad.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.loadComplete, this);
            this._queueLoad.load("resource/scene/tianmao/MapConfig.json");
        }

        private loadComplete() {
            var scene: Object3D = this._queueLoad.getAsset("resource/scene/tianmao/MapConfig.json"); 
            scene.rotationX -= 90;
            scene.rotationZ += 180;
            this.view1.addChild3D(scene);
        }

        public update(e: Event3D) {
            this.ctl.update();
        }
    }
}