module egret3d {
    export class Class_Wireframe extends Class_View3D {

        private view1: View3D;
        private cameraCtl: LookAtController;

        private mapLoader: MapLoader;
        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xff7f7f00;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            var wir: egret3d.Wireframe = new egret3d.Wireframe();
            wir.material.diffuseColor = 0xffffff;
            wir.material.ambientColor = 0xffffff;
            this.view1.addChild3D(wir);

            var geom: egret3d.Geometry = wir.geometry;

            var width: number = 200;
            var height: number = 200;

            var row: number = 10;
            var col: number = 10;

            var point_row: number = row + 1;
            var point_col: number = col + 1;

            var vb: Array<number> = new Array<number>();
            var ib: Array<number> = new Array<number>();

            for (var i: number = 0; i < point_row; ++i) {
                vb.push(-width * col / 2, 0, height * i - height * row / 2);
                vb.push(width * col / 2, 0, height * i - height * row / 2);
            }

            for (var i: number = 0; i < point_col; ++i) {
                vb.push(width * i - width * col / 2, 0, height * col / 2);
                vb.push(width * i - width * col / 2, 0, -height * col / 2);
            }

            for (var i: number = 0; i < vb.length / 3; ++i) {
                ib.push(i);
            }

            geom.setVerticesForIndex(0, egret3d.VertexFormat.VF_POSITION, vb, vb.length / 3);
            geom.setVertexIndices(0, ib);

            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            var cube: Mesh = new Mesh(new CubeGeometry(100, 100, 100), new ColorMaterial(0x333333));
            this.view1.addChild3D(cube);

            cube.x = 100;
            var cubeWireframe: Wireframe = new Wireframe();
            cubeWireframe.fromGeometry(cube.geometry);
            cube.addChild(cubeWireframe);

            var s: Mesh = new Mesh(new SphereGeometry(100, 20, 20), new ColorMaterial(0x333333));
            this.view1.addChild3D(s);
            s.bound.visible = true;
            s.x = -100;

            var sWireframe: Wireframe = new Wireframe();
            sWireframe.fromGeometry(s.geometry);
            s.addChild(sWireframe);
        }
        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}