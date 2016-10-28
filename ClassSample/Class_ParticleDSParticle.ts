module egret3d {
    export class Class_ParticleDSParticle extends Class_View3D {

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
            vv.value = "rest";
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
                if (Math.random() > 0.7) {
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

        private angle: number = 0;
        public update(e: Event3D) {
            this.cameraCrl.update();

        }

    }
} 