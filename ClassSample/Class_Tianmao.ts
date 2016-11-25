module egret3d {
    export class Class_Tianmao extends Class_View3D {
        protected view1: View3D;
        protected cameraCtl; LookAtController;
        protected textField: gui.UITextField;

        public constructor() {
            super();

            egret3d.Egret3DEngine.instance.debug = true ;

            this.view1 = new View3D(0, 0, window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);
            this.view1.camera3D.lookAt(new Vector3D(0, 100, -1000), new Vector3D(0, 0, 0));
            this.view1.camera3D.far = 100000;
            this.view1.camera3D.near = 100;
            this.view1.backColor = 0xffcccccc;
            this._egret3DCanvas.addView3D(this.view1);

            this.cameraCtl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCtl.distance = 150;
            this.cameraCtl.rotationX = 60;

            //this.view1.addChild3D( new AxisMesh() );
             
            this._egret3DCanvas.start();
            this.loadAssets();
        }

        private loadAssets() {
            this._queueLoad = new QueueLoader();;
            this._queueLoad.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.loadComplete, this);
            this._queueLoad.load("resource/scene/tianmao/MapConfig.json");
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }

        private loadComplete() {
            var scene: Object3D = this._queueLoad.getAsset("resource/scene/tianmao/MapConfig.json"); 
            this.view1.addChild3D(scene);


            scene.findObject3D
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}