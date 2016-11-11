module egret3d {
    // 按键播放 1. 2. 3. 4
    export class Class_SkeletonAnimation extends Class_View3D {

        private view1: View3D;
        private cameraCtl: LookAtController;
        private meshs: Mesh[] = [];
        private lights: LightGroup = new LightGroup();

        protected queueLoader: QueueLoader;

        public constructor() {

            super();

            this.view1 = new View3D(0, 0, window.innerWidth, window.innerHeight);
            this.view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            this.view1.backColor = 0xff707070;
            this.view1.backImage = new ImageTexture(<HTMLImageElement>document.getElementById("bg"));
            //this.view1.renderQuen.mainRender = this.view1.renderQuen.renderDictionary["shadowPass"];
            this._egret3DCanvas.addView3D(this.view1);

            this.cameraCtl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCtl.distance = 150;
            this.cameraCtl.rotationX = 60;

            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            Input.addEventListener(KeyEvent3D.KEY_DOWN, this.onKeyDown_Test, this);

            //this.load3DModel("resource/anim/xiaoqiao/", "Object01.esm", ["Object01.eam"]);
            //this.load3DModel("resource/anim/xiaoqiao/", "Plane01.esm", ["Plane01.eam"]);
            //this.load3DModel("resource/anim/xiaoqiao/", "Plane02.esm", ["Plane02.eam"]);
            //this.load3DModel("resource/anim/xiaoqiao/", "Object03.esm");
            //this.load3DModel("resource/anim/xiaoqiao/", "Object07.esm", ["Object01.eam"]);
            //this.load3DModel("resource/anim/xiaoqiao/", "1531_poisdragon02.esm", ["1531_poisdragon02_New Animation.eam"]);
            //this.load3DModel("resource/anim/xiaoqiao/", "zhanshen.esm", ["zhanshen.eam"]);
            //this.load3DModel("resource/anim/xiaoqiao/", "zhanshen_weapon.esm", ["zhanshen_weapon.eam"]);
            //this.load3DModel("resource/anim/xiaoqiao/", "body_27.esm", ["idle_1.eam", "run_1.eam", "attack_1.eam", "attack_2.eam", "skill_1.eam", "skill_2.eam", "skill_3.eam", "skill_4.eam"]);
            //this.load3DModel("resource/anim/ganning/", "Ganning.esm", ["Idle.eam", "Run.eam", "Attack1.eam", "Death.eam"]);

            this.queueLoader = new QueueLoader();
            this.queueLoader.load("resource/anim/ganning/Ganning.esm");
            this.queueLoader.load("resource/anim/ganning/Idle.eam");
            this.queueLoader.load("resource/anim/ganning/Run.eam");
            this.queueLoader.load("resource/anim/ganning/Attack1.eam");
            this.queueLoader.load("resource/anim/ganning/Death.eam");

            this.queueLoader.load("resource/anim/ganning/Ganning.png");
            this.queueLoader.load("resource/anim/ganning/Ganning_f.png");
            this.queueLoader.load("resource/anim/ganning/Ganning_Weapon.png");

            this.queueLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoader, this);

            var p: PointLight = new PointLight(0xffffff);
            p.y = 250;
            p.intensity = 1;
            p.radius = 300;
            p.cutoff = 0.01;
            this.lights.addLight(p);

            //var d: DirectLight = new DirectLight(new Vector3D(-0.5, -1.0, 0.0));
            //d.ambient = 0xffffff;
            //this.lights.addLight(d);


            var plane:Mesh = new Mesh(new PlaneGeometry(2000, 2000));
            //this.plane.lightGroup = this.lights;

            // 渲染阴影
            plane.material.castShadow = true;
            // 接受阴影 
            plane.material.acceptShadow = true;
            this.view1.addChild3D(plane);

            Input.addEventListener(MouseEvent3D.MOUSE_DOWN, this.onMouseDown, this);

        }

        protected onLoader(e: LoaderEvent3D) {
            var geo: Geometry = this.queueLoader.getAsset("resource/anim/ganning/Ganning.esm");
            var clip0: SkeletonAnimationClip = this.queueLoader.getAsset("resource/anim/ganning/Idle.eam");
            var clip1: SkeletonAnimationClip = this.queueLoader.getAsset("resource/anim/ganning/Run.eam");
            var clip2: SkeletonAnimationClip = this.queueLoader.getAsset("resource/anim/ganning/Attack1.eam");
            var clip3: SkeletonAnimationClip = this.queueLoader.getAsset("resource/anim/ganning/Death.eam");
            var textures: ITexture[] = [];
            textures[0] = this.queueLoader.getAsset("resource/anim/ganning/Ganning.png");
            textures[1] = this.queueLoader.getAsset("resource/anim/ganning/Ganning_f.png");
            textures[2] = this.queueLoader.getAsset("resource/anim/ganning/Ganning_Weapon.png");

            clip0.animationName = "Idle";
            clip1.animationName = "Run";
            clip2.animationName = "Attack1";
            clip3.animationName = "Death";
            var mesh: Mesh = new Mesh(geo, new TextureMaterial());

            for (var i: number = 0; i < geo.subGeometrys.length; ++i) {
                var mat: MaterialBase = mesh.getMaterial(i);
                if (!mat) {
                    mat = new TextureMaterial();
                    mesh.addSubMaterial(i, mat);
                }

                mat.diffuseTexture = textures[i];

                mat.ambientColor = 0xffffffff;
                mat.castShadow = true;
            }

            mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip0);
            mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip1);
            mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip2);
            mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip3);

            for (var x: number = 0; x < 10; x++) {

                var cloneMesh: Mesh = mesh.clone();
                cloneMesh.pickType = PickType.PositionPick;
                cloneMesh.lightGroup = this.lights;

                cloneMesh.x = -80 * 5 + x * 80;
                cloneMesh.z = 200;
                this.view1.addChild3D(cloneMesh);
                this.meshs.push(cloneMesh);
                cloneMesh.bound.visible = true;
                this.meshs.push(cloneMesh);
            }

            // 绑定一个box在 LeftHand 骨骼上
            this.cameraCtl.lookAtObject = cloneMesh;
            var box: Mesh = new Mesh(new CubeGeometry(10, 10, 50));
            box.material.castShadow = true;
            cloneMesh.addChild(box);
            cloneMesh.animation.skeletonAnimationController.bindToJointPose("LeftHand", box);
        }


        private onMouseDown(e: MouseEvent3D) {
            var objects: IRender[] = [];

            var t0: number = Date.now();
            Picker.pickObject3DList(this.view1, [this.meshs[0]], false, objects);
            var t1: number = Date.now();
            console.log(t1 - t0);
            for (var i: number = 0; i < objects.length; ++i) {
                objects[i].rotationY++;
            }
        }

        private onKeyDown_Test(e: KeyEvent3D): void {

            switch (e.keyCode) {
                case KeyCode.Key_1:
                case KeyCode.Key_2:
                case KeyCode.Key_3:
                case KeyCode.Key_4:
                case KeyCode.Key_5:
                case KeyCode.Key_6:
                case KeyCode.Key_7:
                case KeyCode.Key_8:
                case KeyCode.Key_9:

                    var index: number = e.keyCode - KeyCode.Key_1;

                    for (var i: number = 0; i < this.meshs.length; ++i) {
                        if (this.meshs[i].animation) {
                            //this.meshs[i].animation.skeletonAnimationController.isLoop = false;
                            this.meshs[i].animation.skeletonAnimationController.play(this.meshs[i].animation.animStateNames[Math.min(index, this.meshs[i].animation.animStateNames.length - 1)]);
                        }
                    }

                    //var plane01: Mesh = this.findMeshFromName("Plane01.esm");

                    //var plane02: Mesh = this.findMeshFromName("Plane02.esm");

                    //var Object03: Mesh = this.findMeshFromName("Object03.esm");

                    //var box: Mesh = new Mesh(new CubeGeometry(10, 10, 10), new ColorMaterial(0xff0000));
                    //this.view1.addChild3D(box);
                    //plane01.animation.skeletonAnimationController.bindToJointPose("Bone53", box);

                    //var box2: Mesh = new Mesh(new CubeGeometry(10, 10, 10), new ColorMaterial(0xff0000));
                    //this.view1.addChild3D(box2);
                    //plane02.animation.skeletonAnimationController.bindToJointPose("Bone76", box2);

                    break;
            }
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}