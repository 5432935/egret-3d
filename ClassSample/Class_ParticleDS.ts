module egret3d {
    export class Class_ParticleDS extends Class_View3D {

        protected view1: View3D;
        protected cameraCrl: LookAtController;
        private particle: ParticleEmitter;
        private count: number = 2000;

        private pyramidLoader: URLLoader;
        private shapeLoader2: URLLoader;
        private shapeLoader1: URLLoader;


        private shape1Value: Mesh3DValueShape;
        private shape2Value: Mesh3DValueShape;
        private _modelCount: number = 0;


        private _ball: Mesh;

        private lightVector: Vector3D;

        constructor() {
            super();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this.view1 = new View3D(0, 0, window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);

            this.view1.camera3D.lookAt(new Vector3D(0, 500, -500), new Vector3D(0, 0, 0));
            this.view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(this.view1);

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);

            this.cameraCrl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCrl.distance = 1000;

            this._ball = new Mesh(new SphereGeometry(50));
            this.view1.addChild3D(this._ball);

            this.pyramidLoader = new URLLoader("resource/scene/particle/pyramid.esm");
            this.pyramidLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadMesh, this);

            this.shapeLoader1 = new URLLoader("resource/scene/particle/0_Object001.esm");
            this.shapeLoader1.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadMesh, this);

            this.shapeLoader2 = new URLLoader("resource/scene/particle/pyramid.esm");
            this.shapeLoader2.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadMesh, this);
        }

        protected onLoadMesh(e: LoaderEvent3D) {
            this._modelCount++;
            if (this._modelCount == 3) {

                this.shape1Value = new Mesh3DValueShape();
                this.shape1Value.geometry = this.shapeLoader1.data;
                this.shape1Value.type = ParticleMeshShapeType.Triangle;
                this.shape1Value.scale = 2;

                this.shape2Value = new Mesh3DValueShape();
                this.shape2Value.geometry = this.shapeLoader2.data;
                this.shape2Value.type = ParticleMeshShapeType.Triangle;
                this.shape2Value.scale = 20;

                //
                this.initParticle(this.pyramidLoader.data);

                this.initLight();
            }
        }

        private initParticle(geom: Geometry): void {


            var mat: TextureMaterial = new TextureMaterial();
            mat.bothside = true;
            mat.ambientColor = 0xffffff;
            mat.blendMode = BlendMode.NORMAL;

            var data: ParticleData = new ParticleData();
            data.geometry.planeW = data.geometry.planeH = 12;


            var life: ParticleDataLife = data.life;
            life.type = ParticleValueType.RandomConst;
            life.max = 5;
            life.min = 3;
            life.duration = 1;
            life.delay = 0;
            life.loop = true;

            var emission: ParticleDataEmission = data.emission;
            emission.rate = 0;

            emission.bursts = [new Point(0, this.count)];

            var property: ParticleDataProperty = data.property;
            property.particleCount = this.count;
            property.bounds.setTo(MathUtil.MAX_VALUE, MathUtil.MAX_VALUE, MathUtil.MAX_VALUE);
            property.renderMode = ParticleRenderModeType.Mesh;
            property.stayAtEnd = true;
            property.trackPosition = true;

            property.meshFile = "xxx";
            property.geometry = geom;

            property.colorConst1.setTo(255, 255, 255, 255);
            property.colorConst2.setTo(255, 255, 255, 255);

            var shape: ParticleDataShape = data.shape;

            shape.type = ParticleDataShapeType.Sphere;
            shape.emitFromShell = false;
            shape.sphereRadius = 600;

            var rotateSpeed: ParticleDataRotationSpeed = data.rotationSpeed = new ParticleDataRotationSpeed();
            rotateSpeed.min.setTo(-40, -40, -40);
            rotateSpeed.max.setTo(40, 40, 40);
            rotateSpeed.type = ParticleValueType.RandomConst;
            rotateSpeed.rot3Axis = true;

            data.validate();
            this.particle = new ParticleEmitter(data, mat);
            this.particle.play();

            this.view1.addChild3D(this.particle);

            this.view1.addChild3D(new AxisMesh(200));


            var loadtex: URLLoader = new URLLoader("resource/floor/WOOD09.png");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
            loadtex["mat"] = mat;



            var vv: HTMLInputElement = <HTMLInputElement>document.createElement("input");
            vv.type = "submit";
            vv.value = "点我";
            document.body.appendChild(vv);
            vv.onmousedown = (e: MouseEvent) => this.mouseDown(e);


            this.trackNewPosition();

        }

        private _initialize: Boolean = true;
        private _lastIsCube: boolean = true;
        private trackNewPosition(): void {
            var fromCoords: Vector3D[];
            var endCoords: Vector3D[];


            if (this._initialize) {
                fromCoords = this.shape1Value.calculate(this.count);
                endCoords = this.shape2Value.calculate(this.count);
                this._lastIsCube = true;

            } else {
                fromCoords = this.particle.trackEndCoords;
                if (this._lastIsCube) {
                    endCoords = this.shape1Value.calculate(this.count);
                } else {
                    endCoords = this.shape2Value.calculate(this.count);
                }
                this._lastIsCube = !this._lastIsCube;

            }

            //加入一些随机
            var radius: number = 700;
            for (var i: number = 0, count: number = endCoords.length; i < count; i++) {
                if (Math.random() > 0.8) {
                    endCoords[i].setTo((Math.random() * 2 - 1) * radius, (Math.random() * 2 - 1) * radius, (Math.random() * 2 - 1) * radius);
                }

                var y: number = endCoords[i].y;
                var z: number = endCoords[i].z;
                endCoords[i].z = y;
                endCoords[i].y = z;

            }

            this.particle.trackPosition(fromCoords, endCoords);
            this._initialize = false;
        }

        protected mouseDown(e: MouseEvent) {
            this.trackNewPosition();
        }

        protected onLoadTexture(e: LoaderEvent3D) {
            e.loader["mat"].diffuseTexture = e.loader.data;
        }

        private initLight(): void {
            var lights: LightGroup = new LightGroup();

            this.lightVector = new Vector3D(-0.5, -0.6, 0.2);
            this.dirLight = new DirectLight(this.lightVector);
            this.dirLight.diffuse = 0xffffff;
            lights.addLight(this.dirLight);

            this.particle.lightGroup = lights;


            //var mesh: Mesh = new Mesh(this.shapeLoader2.data);
            //mesh.scale = new Vector3D(20, 20, 20);
            //this.view1.addChild3D(mesh);
            //mesh.x = 200;
            //mesh.lightGroup = lights;
        }

        private anlge: number = 0;
        private dirLight: DirectLight;
        private position: Vector3D = new Vector3D();
        public update(e: Event3D) {
            this.cameraCrl.update();

            this.anlge += 0.01;
            if (this.particle) {
                this.dirLight.dir = this.lightVector;
                this.position.setTo(Math.sin(this.anlge) * 300, 10, Math.cos(this.anlge) * 300);
                this.lightVector.setTo(-this.position.x, 0, -this.position.z, 1);
                this.lightVector.normalize();
                this._ball.x = this.position.x;
                this._ball.y = this.position.y;
                this._ball.z = this.position.z;
            } else {

            }

        }

    }
} 