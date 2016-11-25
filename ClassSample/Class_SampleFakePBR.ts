module egret3d {

    export class Class_SampleFakePBR extends Class_View3D{

        protected view1: View3D;
        protected ctl; HoverController;
        protected textField: gui.UITextField;

        public constructor(){
            super();

            this.view1 = new View3D(0, 0, window.innerWidth, window.innerHeight);
            this.view1.camera3D.lookAt(new Vector3D(0, 100, -100), new Vector3D(0, 0, 0));
            this.view1.backColor = 0x888888;
            this._egret3DCanvas.addView3D(this.view1);


            this.ctl = new HoverController(this.view1.camera3D );
            this.ctl.tiltAngle = 10;
            this.ctl.distance = 1000;

            Egret3DEngine.instance.debug = false;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this._queueLoad = new QueueLoader();
            this._queueLoad.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.complete, this);
            this._queueLoad.load("resource/PBR/Karatos/Model/wargod.esm");
            this._queueLoad.load("resource/PBR/Karatos/Texture/Kratos_Albedo.png");
            this._queueLoad.load("resource/PBR/Karatos/Texture/Kratos_Gloss.png");
            this._queueLoad.load("resource/PBR/Karatos/Texture/Kratos_Normal.png");
            this._queueLoad.load("resource/PBR/Karatos/Texture/Kratos_Opacity.png");
            this._queueLoad.load("resource/PBR/Karatos/Texture/Kratos_Specular.png");
        }

       //uniform sampler2D albedoTex ;
       //uniform sampler2D normalTex ;
       //uniform sampler2D glossTex ;
       //uniform sampler2D specularTex ;
       //uniform sampler2D opacityTex ;
        public complete(e: any) {
            var fakePBR: FakePBRMaterial = new FakePBRMaterial();
            fakePBR.albedoTexture = this._queueLoad.getAsset("resource/PBR/Karatos/Texture/Kratos_Albedo.png");
            fakePBR.glossTexture = this._queueLoad.getAsset("resource/PBR/Karatos/Texture/Kratos_Gloss.png");
            fakePBR.normalTexture = this._queueLoad.getAsset("resource/PBR/Karatos/Texture/Kratos_Normal.png");
            fakePBR.opacityTexture = this._queueLoad.getAsset("resource/PBR/Karatos/Texture/Kratos_Opacity.png");
            fakePBR.specularTexture = this._queueLoad.getAsset("resource/PBR/Karatos/Texture/Kratos_Specular.png");
            fakePBR.cutAlpha = 0;

            var dirlight: DirectLight = new DirectLight(new Vector3D(0.5, -1, 0));
            dirlight.intensity = 1.0;
            dirlight.ambient = 0x666666; 
            var lightGroup: LightGroup = new LightGroup();
            lightGroup.addLight(dirlight);
            this.view1.addChild3D(dirlight);

            var geometry = this._queueLoad.getAsset("resource/PBR/Karatos/Model/wargod.esm"); 
            var mesh: Mesh = new Mesh(geometry, fakePBR);
            mesh.scale = new Vector3D(0.022, 0.022, 0.022);
            mesh.y -= 100;

           mesh.lightGroup = lightGroup; 
            this.view1.addChild3D(mesh);
        }

        public update(e: Event3D) {
            this.ctl.update();
        }
    }

}