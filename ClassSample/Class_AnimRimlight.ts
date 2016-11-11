module egret3d {
    // 按键播放 1. 2. 3. 4
    export class Class_AnimRimlight extends Class_View3D {

        private view1: View3D;
        private cameraCtl: LookAtController;
        private meshs: Mesh[] = [];
        private lights: LightGroup = new LightGroup();

        public constructor() {

            super();

            this.view1 = new View3D(0, 0, window.innerWidth, window.innerHeight);
            this.view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            this.view1.backColor = 0xff707070;
            this.view1.backImage = new ImageTexture(<HTMLImageElement>document.getElementById("bg"));
            this._egret3DCanvas.addView3D(this.view1);

            this.cameraCtl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCtl.distance = 150;
            this.cameraCtl.rotationX = 60;



            //这里是通过零部件组装的骨骼动画，也可以使用直接 加载 骨骼动画配置的加载方式，可以参考 Class_SkeletonAnimationEx.ts
            this._queueLoad = new QueueLoader();
            this._queueLoad.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.quenLoadComplete, this);
            //this._queueLoad.load("resource/anim/ganning/Ganning.esm");
            //this._queueLoad.load("resource/anim/ganning/Idle.eam");
            //this._queueLoad.load("resource/anim/ganning/Run.eam");
            //this._queueLoad.load("resource/anim/ganning/Attack1.eam");
            //this._queueLoad.load("resource/anim/ganning/Death.eam");
            //this._queueLoad.load("resource/anim/ganning/Ganning.png");

            this._queueLoad.load("resource/anim/simayi/Simayi.esm");
            this._queueLoad.load("resource/anim/simayi/idle.eam");
            this._queueLoad.load("resource/anim/simayi/Simayi_d.png");
        }

        private quenLoadComplete() {
            var p: PointLight = new PointLight(0xffffff);
            p.y = 250;
            p.intensity = 1;
            p.radius = 300;
            p.cutoff = 0.01;
            this.lights.addLight(p);

            //---------------------------
            var skinGeometry: Geometry = <Geometry>this._queueLoad.getAsset("resource/anim/simayi/Simayi.esm");
            var texture: Texture = <Texture>this._queueLoad.getAsset("resource/anim/simayi/Simayi_d.png");
            var anim_idle: SkeletonAnimationClip = <SkeletonAnimationClip>this._queueLoad.getAsset("resource/anim/simayi/idle.eam");

            var animMesh: Mesh = new Mesh(skinGeometry, new TextureMaterial(texture));
            animMesh.material.castShadow = true; 
            anim_idle.animationName = "idle";

            //设置边缘光特效方法
            var rimMethod: RimlightMethod = new RimlightMethod();
            //设置边缘光颜色,alpha值为特效的亮度,其他为颜色
            rimMethod.rimColor = 0xff0000ff;
            //设置边缘光宽度
            rimMethod.rimPow = 5.0;
            animMesh.material.diffusePass.addMethod(rimMethod);

            animMesh.animation.skeletonAnimationController.addSkeletonAnimationClip(anim_idle);

            //你可以加快播放速度试一试
            animMesh.animation.play( "idle" , 1.0 );
            this.view1.addChild3D(animMesh);
            //---------------------------

            var plane: Mesh = new Mesh(new PlaneGeometry(2000, 2000));
            // 渲染阴影
            plane.material.castShadow = true;
            // 接受阴影 
            plane.material.acceptShadow = true;
            this.view1.addChild3D(plane);

            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}