module egret3d {
    //静态模型使用多材质 和 材质球特殊光效贴图
    export class Class_Globe extends Class_View3D {

        private laohu: Mesh;
        private view1: View3D;
        private lights: LightGroup = new LightGroup();

        private cameraCtl: LookAtController;
        private queload: QuenLoad = new QuenLoad();

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

            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this.queload.addEventListener(QuenLoad.QUENLOAD_COMPLETE, this.initScene,this);
            this.queload.addLoaderQuen("resource/globe/land_ocean_ice_2048_match.jpg");
            this.queload.addLoaderQuen("resource/globe/EarthNormal.png");
            this.queload.addLoaderQuen("resource/globe/earth_specular_2048.jpg");
            this.queload.addLoaderQuen("resource/globe/land_lights_16384.jpg");
            this.queload.addLoaderQuen("resource/globe/cloud_combined_2048.jpg");
            this.queload.addLoaderQuen("resource/imageEffects/grayscaleRamp.png");
            this.queload.addLoaderQuen("resource/imageEffects/RGBTable16x1.png");
            
        }

        private initScene() {

            var dirlight: DirectLight = new DirectLight( new Vector3D(0.2,-1,1.0) );
            this.lights.addLight(dirlight);

            var diffuseTexture: Texture = this.queload.getTexture("resource/globe/land_ocean_ice_2048_match.jpg");
            var normalTexture: Texture = this.queload.getTexture("resource/globe/EarthNormal.png");
            var specularTexture: Texture = this.queload.getTexture("resource/globe/earth_specular_2048.jpg");  
            var lightsTexture: Texture = this.queload.getTexture("resource/globe/land_lights_16384.jpg");  
            var cloudTexture: Texture = this.queload.getTexture("resource/globe/cloud_combined_2048.jpg");  

            var lutTexture: Texture = this.queload.getTexture("resource/imageEffects/grayscaleRamp.png");  
            //var lutTexture: Texture = this.queload.getTexture("resource/imageEffects/RGBTable16x1.png");  
            lutTexture.hasMipmap = false;
            lutTexture.useMipmap = false ;

           // var pos: ColorCorrectionPost = new ColorCorrectionPost();
            //pos.lutTexture = lutTexture; 
           // this.view1.post = [pos];

            //this.queload.addLoaderQuen("resource/imageEffects/ContrastEnhanced3D16.jpg");
            //this.queload.addLoaderQuen("resource/imageEffects/Neutral3D16.jpg");
            this._earth = new Mesh(new OctahedronSphereGeometry(6, 50), new TextureMaterial(diffuseTexture));
            this._earth.material.normalTexture = normalTexture; 
            this._earth.material.ambientColor = 0x222222;
            this._earth.material.specularTexture = specularTexture; 
            this._earth.material.gloss = 1.0;
            this._earth.material.specularLevel = 0.1;

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

            this.view1.addChild3D(this._earth);
            this.view1.addChild3D(this._could);
        }


        public update(e: Event3D) {
            this.cameraCtl.update();

            this._earth.rotationY += 0.01;
            this._could.rotationY -= 0.01;
        }
    }
}