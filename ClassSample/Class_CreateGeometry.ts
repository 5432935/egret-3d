module egret3d {
    /*
    * 自定义Geometry
    */
    export class Class_CreateGeometry extends Class_View3D {

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
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);


            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;


            this.createTriangle();

            this.createRcet();
        }

        protected createTriangle() {
            var geom: Geometry = GeometryUtil.createGeometry();

            var vb: number[] = [];
            var ib: number[] = [];

            vb.push(-50, -50, 0, 1, 0, 0, 1);
            vb.push(0, 50, 0, 0, 1, 0, 1);
            vb.push(50, -50, 0, 0, 0, 1, 1);

            ib.push(0, 1, 2);

            geom.setVerticesForIndex(0, VertexFormat.VF_POSITION | VertexFormat.VF_COLOR, vb, 3);
            geom.setVertexIndices(0, ib);

            var mesh: Mesh = new Mesh(geom, new ColorMaterial(0xffffff));

            // 设置双面渲染
            mesh.material.bothside = true;

            this.view1.addChild3D(mesh);

            mesh.x = -100;

        }

        protected createRcet() {

            var geom: Geometry = GeometryUtil.createGeometry();

            var vb: number[] = [];
            var ib: number[] = [];

            vb.push(-50, 50, 0, 0, 1, 0, 1, 0, 0);
            vb.push(50, 50, 0, 0, 0, 1, 1, 1, 0);
            vb.push(-50, -50, 0, 1, 0, 0, 1, 0, 1);
            vb.push(50, -50, 0, 0, 0, 1, 1, 1, 1);

            ib.push(0, 2, 1, 2, 3, 1);

            geom.setVerticesForIndex(0, VertexFormat.VF_POSITION | VertexFormat.VF_COLOR | VertexFormat.VF_UV0, vb, 4);
            geom.setVertexIndices(0, ib);

            var mesh: Mesh = new Mesh(geom, new TextureMaterial());

            // 设置双面渲染
            //mesh.material.bothside = true;

            this.view1.addChild3D(mesh);
            mesh.x = 100;
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}