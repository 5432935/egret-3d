module egret3d {

    export class Class_OctahedronSphere extends Class_View3D {

        protected role: Role;
        protected view1: View3D;
        protected cameraCtl: LookAtController;

        public constructor() {
            super();

            this.view1 = new View3D(0, 0, window.innerWidth, window.innerHeight);
            this.view1.camera3D.lookAt(new Vector3D(0, 0, -100), new Vector3D(0, 0, 0));
            this.view1.camera3D.far = 100000;
            this.view1.backColor = 0xff888888;
            this._egret3DCanvas.addView3D(this.view1);

            this.cameraCtl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCtl.distance = 150;
            this.cameraCtl.rotationX = 60;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            var loadDiffuse: URLLoader = new URLLoader("resource/scene/SkyBox/sky0026.png");
            loadDiffuse.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadDiffuse, this);
        }

        public onLoadDiffuse(e: LoaderEvent3D) {
            var mat: egret3d.TextureMaterial = new egret3d.TextureMaterial();
            mat.diffuseTexture = e.loader.data;
            var geometery: egret3d.OctahedronSphereGeometry = new egret3d.OctahedronSphereGeometry(6, 100);
            var sky = new egret3d.Mesh(geometery, mat);

            var wireframe: Wireframe = new Wireframe();
            wireframe.fromGeometry(sky.geometry);
            sky.addChild(wireframe);

            this.view1.addChild3D(sky);
        }


        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}