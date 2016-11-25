module egret3d {
    /**
    * 按回车播放动画 按1键切换摄像机
    */
    export class Class_NewScene extends Class_View3D {

        private view1: View3D;
        private cameraCtl: LookAtController;
        private node: Object3D;
        private mapLoader: MapLoader;





        constructor() {
            super();

            Egret3DEngine.instance.debug = true;

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 1000, 0), new Vector3D(0, 0, 0));
            view1.camera3D.far = 1000000;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.lookAtObject.x = 0;
            this.cameraCtl.lookAtObject.z = 0;
            this.cameraCtl.rotationX = 60;

            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);


            this._queueLoad = new QueueLoader();
            this._queueLoad.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.loadComplete, this);
            this._queueLoad.load("resource/scene/smallMap/MapConfig.json");
            this._queueLoad.load("resource/scene/SkyBox/cubemap1/back.jpg");
            this._queueLoad.load("resource/scene/SkyBox/cubemap1/down.jpg");
            this._queueLoad.load("resource/scene/SkyBox/cubemap1/front.jpg");
            this._queueLoad.load("resource/scene/SkyBox/cubemap1/left.jpg");
            this._queueLoad.load("resource/scene/SkyBox/cubemap1/right.jpg");
            this._queueLoad.load("resource/scene/SkyBox/cubemap1/up.jpg");
        }

        private loadComplete(e: LoaderEvent3D) {
            var back: Texture = this._queueLoad.getAsset("resource/scene/SkyBox/cubemap1/back.jpg");
            var down: Texture = this._queueLoad.getAsset("resource/scene/SkyBox/cubemap1/down.jpg");
            var front: Texture = this._queueLoad.getAsset("resource/scene/SkyBox/cubemap1/front.jpg");
            var left: Texture = this._queueLoad.getAsset("resource/scene/SkyBox/cubemap1/left.jpg");
            var right: Texture = this._queueLoad.getAsset("resource/scene/SkyBox/cubemap1/right.jpg");
            var up: Texture = this._queueLoad.getAsset("resource/scene/SkyBox/cubemap1/up.jpg");

            var cubeTexture: CubeTexture = CubeTexture.createCubeTextureByImageTexture(
                back,
                front,
                left,
                right,
                up,
                down
            );

            var sky: Mesh = new Mesh(new SphereGeometry(5000, 20, 20), new CubeTextureMaterial(cubeTexture));
            sky.material.cullMode = ContextConfig.FRONT;

            var scene: Scene3D = <Scene3D>this._queueLoad.getAsset("resource/scene/smallMap/MapConfig.json");
            this.view1.scene = scene;
            scene.addChild(sky);

        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }


}