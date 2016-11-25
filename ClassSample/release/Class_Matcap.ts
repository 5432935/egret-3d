module egret3d {
    //静态模型使用多材质 和 材质球特殊光效贴图
    export class Class_Matcap extends Class_View3D {

        private laohu: Mesh;
        private view1: View3D;
        private lights: LightGroup = new LightGroup();

        private cameraCtl: LookAtController;

        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, 1024, 800 );
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xffffffff;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            view1.backImage = tex;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            var dirLight: DirectLight = new DirectLight(new Vector3D(-0.0, 0.6, 0.2));
            dirLight.diffuse = 0xffffff;
            this.lights.addLight(dirLight);

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            this._queueLoad = new QueueLoader();
            this._queueLoad.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.loadComplete, this);
            this._queueLoad.load("resource/test/0_dingji_f_fs/MapConfig.json"); 
            this._queueLoad.load("resource/matcap/12719-ambientocclusion.jpg"); 
        }

        private loadComplete(e: LoaderEvent3D) {
            var texture: Texture = <Texture>this._queueLoad.getAsset("resource/matcap/12719-ambientocclusion.jpg"); 
            var m: Role = this._queueLoad.getAsset("resource/test/0_dingji_f_fs/MapConfig.json");

            this.view1.addChild3D(m);
            m.skeletonAnimation.play();

            var mesh:Mesh ;
            for (var p in m.childs) {

                if (m.childs[p] instanceof Mesh) {
                    mesh = (<Mesh>m.childs[p]);

                    for (var i in mesh.geometry.subGeometrys) {
                        mesh.multiMaterial[i].matcapTexture = texture;
                    }
                }
             
            }

            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

        }
        
        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}