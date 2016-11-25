module egret3d {
    //鼠标拣选事件 左键点击变大 右键点击变小 中键点击cube在点中模型的位置

    export class Class_MouseEvent extends Class_View3D {

        private moveIndex: number = 0;
        private overIndex: number = 0;
        private sphere: Mesh;
        private cameraCtl: LookAtController;
        private view1: View3D;
        private cube: Mesh;
        constructor() {
            super();

            var geometery: SphereGeometry = new SphereGeometry();
            this.sphere = new Mesh(geometery);

            this.cube = new egret3d.Mesh(new egret3d.CubeGeometry(10, 10, 10));


            this.sphere.pickType = PickType.UVPick;
            this.sphere.enablePick = true;
            this.sphere.addEventListener(PickEvent3D.PICK_DOWN, this.onMouseDown, this);
            this.sphere.addEventListener(PickEvent3D.PICK_UP, this.onMouseUp, this);
            this.sphere.addEventListener(PickEvent3D.PICK_CLICK, this.onClick, this);
            this.sphere.addEventListener(PickEvent3D.PICK_MOVE, this.onMouseMove, this);

            this.view1 = new View3D(0, 0, window.innerWidth, window.innerHeight);
            this.view1.camera3D.lookAt(new Vector3D(0, 0, -1000), new Vector3D(0, 0, 0));
            this.view1.backColor = 0xff000000;

            this.cameraCtl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            this._egret3DCanvas.addView3D(this.view1);
            this.view1.addChild3D(this.sphere);

            this.view1.addChild3D(this.cube);

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;

            var lights: LightGroup = new LightGroup();
            var dirLight: DirectLight = new DirectLight(new Vector3D(-0.5, 0.6, 0.2));
            dirLight.diffuse = 0xff0000ff;
            lights.addLight(dirLight);
            this.sphere.material.lightGroup = lights;
           
            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }

        private onMouseDown(e: PickEvent3D): void {
            console.log("OnMouseDown");

            var target: Mesh = e.target;
            if (e.targetEvent instanceof MouseEvent3D) {
                var mEvent: MouseEvent3D = <MouseEvent3D>(e.targetEvent);
                if (mEvent.mouseCode == MouseCode.Mouse_Left) {
                    target.scaleX++;
                    target.scaleY = target.scaleZ = target.scaleX;
                }
                else if (mEvent.mouseCode == MouseCode.Mouse_Right) {
                    if (target.scaleX - 1 <= 0) {
                        return;
                    }
                    target.scaleX--;
                    target.scaleY = target.scaleZ = target.scaleX;
                }
                else if (mEvent.mouseCode == MouseCode.Mouse_Mid) {
                    this.cube.position = e.pickResult.globalPosition;
                }
            }
            else {

                this.sphere.scaleX++;
                this.sphere.scaleY = this.sphere.scaleZ = this.sphere.scaleX;
            }
        }

        private onMouseUp(e: PickEvent3D): void {
            console.log("onMouseUp");
        }

        private onClick(e: PickEvent3D): void {
            console.log("onClick");
        }

        private onMouseMove(e: PickEvent3D): void {
            console.log("onMouseMove" + this.moveIndex++);
            var object3d: Object3D = <Object3D>e.target;
            object3d.rotationY++;
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}