module egret3d {

    //移动灯光
    export class Class_VR extends Class_View3D {

        protected view: VRView3D;
        protected plane: Mesh;
        protected matPlane: TextureMaterial;
        protected lights: LightGroup = new LightGroup();

        private _quenLoad: QuenLoad;
        private _eyePicker: EyePick;
        private vrController: VRController;

        constructor() {
            super();

            //Egret3DEngine.instance.debug = true;
            this.view = new VRView3D(0, 0, window.innerWidth, window.innerHeight);
            this.view.camera3D.lookAt(new Vector3D(0, 100, -100), new Vector3D(0, 0, 0));
            this.view.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(this.view);
            this.vrController = new VRController( this.view.camera3D );

            //this.ctl.tiltAngle = 60;
            //this.ctl.distance = 1400; 
            this._eyePicker = new EyePick();
            //view1.render = new MultiRender(PassType.matCapPass);
             
            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view.backImage = tex;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            window.addEventListener("orientationchange", () => this.OrientationChange());
            this.view.openGui( this.uiComplete, this );
        }

        private uiComplete() {
            this._quenLoad = new QuenLoad();
            this._quenLoad.addEventListener(QuenLoad.QUENLOAD_COMPLETE, this.quenLoadComplete, this);
            this._quenLoad.addLoaderQuen("resource/moreMaterial/0_Tree_06.esm");
            this._quenLoad.addLoaderQuen("resource/moreMaterial/LightmapFar-0.png");
            this._quenLoad.addLoaderQuen("resource/moreMaterial/Tree_bark_winter.png");
            this._quenLoad.addLoaderQuen("resource/moreMaterial/Tree_leaves_winter.png");

            this._quenLoad.addLoaderQuen("resource/SkyBox/cloudy_noon_FR.png");
            this._quenLoad.addLoaderQuen("resource/SkyBox/cloudy_noon_BK.png");
            this._quenLoad.addLoaderQuen("resource/SkyBox/cloudy_noon_LF.png");
            this._quenLoad.addLoaderQuen("resource/SkyBox/cloudy_noon_RT.png");
            this._quenLoad.addLoaderQuen("resource/SkyBox/cloudy_noon_UP.png");
            this._quenLoad.addLoaderQuen("resource/SkyBox/cloudy_noon_DN.png");

        }                           
                                    
        protected mat: TextureMaterial;
        private quenLoadComplete() {
            var dirLight: DirectLight = new DirectLight(new Vector3D(-0.0, -0.6, 0.2));
            dirLight.diffuse = 0xffffff;
            this.lights.addLight(dirLight);

            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);


            var cubeTexture: CubeTexture = CubeTexture.createCubeTextureByImageTexture(
                this._quenLoad.getTexture("resource/SkyBox/cloudy_noon_FR.png"),
                this._quenLoad.getTexture("resource/SkyBox/cloudy_noon_BK.png"),
                this._quenLoad.getTexture("resource/SkyBox/cloudy_noon_LF.png"),
                this._quenLoad.getTexture("resource/SkyBox/cloudy_noon_RT.png"),
                this._quenLoad.getTexture("resource/SkyBox/cloudy_noon_UP.png"),
                this._quenLoad.getTexture("resource/SkyBox/cloudy_noon_DN.png")
            );

            var sky: Mesh = new Mesh(new OctahedronSphereGeometry(2, 5000), new CubeTextureMaterial(cubeTexture));
            sky.material.cullMode = ContextConfig.FRONT;
            this.view.addChild3D(sky);

            var ge: Geometry = this._quenLoad.getModel("resource/moreMaterial/0_Tree_06.esm");
            var mesh: Mesh = new Mesh(ge, new TextureMaterial());

            this.view.addChild3D(mesh);
            mesh.enablePick = true;
            mesh.z = 3000;
            mesh.bound.visible = true;

            var mat = <TextureMaterial>mesh.getMaterial(0) || new TextureMaterial();
            mat.ambientColor = 0xffffff;
            mat.cutAlpha = 0.3;
            mat.diffuseTexture = this._quenLoad.getTexture("resource/moreMaterial/Tree_bark_winter.png");
            mesh.addSubMaterial(0, mat);
            mat.lightGroup = this.lights;

            mat = <TextureMaterial>mesh.getMaterial(1) || new TextureMaterial();
            mat.ambientColor = 0xffffff;
            mat.cutAlpha = 0.3;
            mat.diffuseTexture = this._quenLoad.getTexture("resource/moreMaterial/Tree_leaves_winter.png");
            mesh.addSubMaterial(1, mat);
            mat.lightGroup = this.lights;

            for (var i: number = 0; i < 2 ;i++){
                var m1: Mesh = new Mesh(mesh.geometry, new TextureMaterial());
                this.view.addChild3D(m1);
                m1.x = Math.random() * 3000 - 1500;
                m1.y = Math.random() * 3000 - 1500;
                m1.z = Math.random() * 3000 - 1500;
                m1.enablePick = true;
            }

            this._label = new gui.UITextField();
            this._label.x = window.innerWidth * 0.5 - 100;
            this._label.y = window.innerHeight * 0.5 - 20;
            this._label.text = "x";
            this.view.addGUI(this._label);

            var btn: gui.UIButton = new gui.UIButton();
            this.view.addGUI(btn);

            this._eyePicker.addEventListener(EyePick.PICK_SURE, this.eyePickSure, this);
            this._eyePicker.addEventListener(EyePick.PICK_CANCLE, this.eyePickCancale, this);
            this._eyePicker.addEventListener( EyePick.PICK_PROGRESS , this.eyePickProgress , this );
        }

        private _label: gui.UITextField;

        private eyePickSure(e: PickEvent3D) {
            if (e.pickTarget instanceof Mesh)
                (<Mesh>e.pickTarget).material.diffuseColor = 0xff0000;
        }

        private eyePickCancale(e: PickEvent3D) {
            if (e.pickTarget instanceof Mesh)
                (<Mesh>e.pickTarget).material.diffuseColor = 0xffffff;
        }

        private eyePickProgress(e: PickEvent3D) {
            this._label.text = "x-" + e.delay.toString();
            if (e.pickTarget instanceof Mesh)
                (<Mesh>e.pickTarget).material.diffuseColor = 0xffffff * e.delay;
        }

        private OrientationChange() {
            this.view.width = window.innerWidth; 
            this.view.height = window.innerHeight; 
        }

        public update(e: Event3D) {
            this.vrController.update();
            this._eyePicker.update(this.view,e.time,e.delay);
        }
    }
}