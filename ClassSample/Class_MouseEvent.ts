module egret3d {
    //鼠标拣选事件

    export class Class_MouseEvent extends Class_View3D {

        private moveIndex: number = 0;
        private overIndex: number = 0;
        private cube: Mesh;
        private cameraCtl: LookAtController;
        private view1: View3D;
        constructor() {
            super();

            var geometery: SphereGeometry = new SphereGeometry();
            this.cube = new Mesh(geometery);

            this.cube.pickType = PickType.UVPick;
            this.cube.enablePick = true;
            this.cube.addEventListener(PickEvent3D.PICK_DOWN, this.onMouseDown, this);
            this.cube.addEventListener(PickEvent3D.PICK_UP, this.onMouseUp, this);
            this.cube.addEventListener(PickEvent3D.PICK_CLICK, this.onClick, this);
            this.cube.addEventListener(PickEvent3D.PICK_MOVE, this.onMouseMove, this);

            this.view1 = new View3D(0, 0, window.innerWidth, window.innerHeight);
            this.view1.camera3D.lookAt(new Vector3D(0, 0, -1000), new Vector3D(0, 0, 0));
            this.view1.backColor = 0xff000000;

            this.cameraCtl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            this._egret3DCanvas.addView3D(this.view1);
            this.view1.addChild3D(this.cube);


            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;

            var lights: LightGroup = new LightGroup();
            var dirLight: DirectLight = new DirectLight(new Vector3D(-0.5, 0.6, 0.2));
            dirLight.diffuse = 0xff0000ff;
            lights.addLight(dirLight);
            this.cube.material.lightGroup = lights;
           
            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }

        private onMouseDown(e: PickEvent3D): void {
            console.log("OnMouseDown");

            this.cube.scaleX++;
            this.cube.scaleY = this.cube.scaleZ = this.cube.scaleX;

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

            //this.mouse3DManager.update(this.view1.entityCollect);
            //this.cube.rotationY = this.cube.rotationY + 0.5;
            //this.cube.rotationX = this.cube.rotationX + 0.5;
        }
    }
}