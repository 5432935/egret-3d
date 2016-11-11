module egret3d {
    //静态模型使用多材质 和 材质球特殊光效贴图
    export class Class_Globe extends Class_View3D {

        private laohu: Mesh;
        private view1: View3D;
        private lights: LightGroup = new LightGroup();

        private cameraCtl: LookAtController;

        private _earth: Mesh;
        private _could: Mesh;
        constructor() { 
            super();

            this.init3D();
        }

        private init3D() {
            Egret3DEngine.instance.debug = true;

            var view1: View3D = new View3D(0, 0, 1024, 800);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xffffffff;

            //view1.post = [new BloomPass()]; //[new GaussPass()]; //

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            view1.backImage = tex;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;


            this._queueLoad = new QueueLoader();
            this._queueLoad.addEventListener( LoaderEvent3D.LOADER_COMPLETE , this.initScene, this);
            this._queueLoad.load("resource/scene/globe/land_ocean_ice_2048_match.jpg");
            this._queueLoad.load("resource/scene/globe/EarthNormal.png");
            this._queueLoad.load("resource/scene/globe/earth_specular_2048.jpg");
            this._queueLoad.load("resource/scene/globe/land_lights_16384.jpg");
            this._queueLoad.load("resource/scene/globe/cloud_combined_2048.jpg");
            
        }

        private initScene() {

            var dirlight: DirectLight = new DirectLight( new Vector3D(0.2,-1,1.0) );
            this.lights.addLight(dirlight);

            var diffuseTexture: Texture = this._queueLoad.getAsset("resource/scene/globe/land_ocean_ice_2048_match.jpg");
            var normalTexture: Texture = this._queueLoad.getAsset("resource/scene/globe/EarthNormal.png");
            var specularTexture: Texture = this._queueLoad.getAsset("resource/scene/globe/earth_specular_2048.jpg");  
            var lightsTexture: Texture = this._queueLoad.getAsset("resource/scene/globe/land_lights_16384.jpg");  
            var cloudTexture: Texture = this._queueLoad.getAsset("resource/scene/globe/cloud_combined_2048.jpg");  

            this._earth = new Mesh(new OctahedronSphereGeometry(6, 50), new TextureMaterial(diffuseTexture));
            this._earth.material.normalTexture = normalTexture; 
            this._earth.material.ambientColor = 0x222222;
            this._earth.material.specularTexture = specularTexture; 
            this._earth.material.gloss = 1.0;
            this._earth.material.specularLevel = 0.1;
            this._earth.material.cullMode = ContextConfig.FRONT;

            var rimlight: RimlightMethod = new RimlightMethod();
            rimlight.rimColor = 0xffffffff;
            rimlight.rimPow = 2.6;
            rimlight.strength = 0.65;
           // this._earth.material.diffusePass.addMethod(rimlight);
            this._earth.lightGroup = this.lights;

            this._could = new Mesh(new OctahedronSphereGeometry(6, 50), new TextureMaterial(cloudTexture));
            this._could.scale = new Vector3D(1.03, 1.03, 1.03);
            this._could.material.blendMode = BlendMode.ADD;
           // this._could.material.alpha = 0.65;
            this._could.lightGroup = this.lights;
            this._could.material.gloss = 1.0;
            this._could.material.specularLevel = 0.0;
            this._could.material.cullMode = ContextConfig.FRONT;

            this.view1.addChild3D(this._earth);
            this.view1.addChild3D(this._could);

            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }


        public update(e: Event3D) {
            this.cameraCtl.update();

            this._earth.rotationY += 0.01;
            this._could.rotationY -= 0.01;
        }
    }
}