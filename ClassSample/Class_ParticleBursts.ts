module egret3d {
    export class Class_ParticleBursts extends Class_View3D {
        protected view1: View3D;
        protected cameraCrl: LookAtController;
        private particle: ParticleEmitter;

        private cube: Mesh; 
        constructor() {
            super();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            var view1: View3D = new View3D(0, 0, 1024, 768);
            this.view1 = view1;

            view1.camera3D.lookAt(new Vector3D(0, 500, -500), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(view1);

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            view1.backImage = tex;

            this.cameraCrl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCrl.distance = 1000;
                      

            this.cube = new Mesh( new CubeGeometry(10,10,10) , null );
            this.view1.addChild3D(this.cube);

            var mat: TextureMaterial = new TextureMaterial();
            mat.ambientColor = 0xffffff;
            mat.blendMode = BlendMode.ADD;


            var data: ParticleData = new ParticleData();
            data.followTarget = new ParticleDataFollowTarget();

            data.property.particleCount = 1000;
            data.shape.type = ParticleDataShapeType.Point;

            var moveSpeed: ParticleDataMoveSpeed = new ParticleDataMoveSpeed();
            moveSpeed.min = 80;
            moveSpeed.max = 100;
            data.moveSpeed = moveSpeed;

            var lifeData: ParticleDataLife = data.life;
            lifeData.duration = 20;
            lifeData.min = lifeData.max = 2;

            var emission: ParticleDataEmission = data.emission;
            emission.rate = 10;
            emission.bursts = [];

            
            emission.bursts.push(new Point(2.0, 25));
            emission.bursts.push(new Point(4.0, 20));
            emission.bursts.push(new Point(6.0, 45));

            data.validate();
            
            this.particle = new ParticleEmitter(data, mat);


            this.particle.play();
            this.view1.addChild3D(this.particle);
           
            this.particle.followTarget = this.cube ;

            var loadtex: URLLoader = new URLLoader("resource/effect/ice_0001.png");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
            loadtex["mat"] = mat;
            
        }


        protected onLoadTexture(e: LoaderEvent3D) {
           e.loader["mat"].diffuseTexture = e.loader.data;
        }

        private angle: number = 0; 
        public update(e: Event3D) {
            this.cameraCrl.update();
            this.angle += 0.01;
            this.cube.x = Math.cos(this.angle) * 300;
            this.cube.z = Math.sin(this.angle) * 300;

        }

    }
} 