/*
* w s a d 摄像机移动
* 点击鼠标摄像机可以旋转
*/

class Class_CameraTansfrom {

    protected egret3DCanvas: egret3d.Egret3DCanvas;
    protected view: egret3d.View3D;
    protected cameraCtl: egret3d.LookAtController;
    protected cObj: egret3d.Object3D;
    protected cBox: egret3d.Mesh;
    constructor() {
        // ------------------ 初始化引擎 ---------------------
        this.egret3DCanvas = new egret3d.Egret3DCanvas();
        this.egret3DCanvas.x = 0;
        this.egret3DCanvas.y = 0;
        this.egret3DCanvas.width = window.innerWidth;
        this.egret3DCanvas.height = window.innerHeight;
        this.egret3DCanvas.start();

        var view: egret3d.View3D = new egret3d.View3D(0, 0, window.innerWidth, window.innerHeight);
        //view.camera3D.lookAt(new egret3d.Vector3D(0, 1000, -1000), new egret3d.Vector3D(0, 0, 0));
        view.backColor = 0xffcccccc;

        this.egret3DCanvas.addView3D(view);
        this.view = view;

        //this.cameraCtl = new egret3d.LookAtController(view.camera3D, new egret3d.Object3D());
        //this.cameraCtl.distance = 1000;
        //this.cameraCtl.rotationX = 60;

        this.egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
        // ------------------ 初始化引擎 ---------------------


        this.cObj = new egret3d.Object3D();
        this.cObj.y = 200;

        this.cBox = new egret3d.Mesh(new egret3d.CubeGeometry(10, 10, 10), new egret3d.ColorMaterial(0xff0000));
        this.cObj.addChild(this.cBox);

        this.view.addChild3D(this.cObj);

        for (var i: number = 0; i < 100; ++i) {
            var box: egret3d.Mesh = new egret3d.Mesh(new egret3d.CubeGeometry(100, 100, 100), new egret3d.ColorMaterial(0x000000));
            box.x = Math.floor(i % 10) * 120 - 600;
            box.z = Math.floor(i / 10) * 120 - 600;
            this.view.addChild3D(box);
        }

        this.createWireframe();

        egret3d.Input.addEventListener(egret3d.KeyEvent3D.KEY_DOWN, this.onKeyDown, this);
        egret3d.Input.addEventListener(egret3d.KeyEvent3D.KEY_UP, this.onKeyUp, this);
        egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_MOVE, this.mouseMove, this);

        egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_DOWN, this.mouseDown, this);
        egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_UP, this.mouseUp, this);
    }

    protected isDown: boolean = false;

    protected keyState: boolean[] = [];
    protected onKeyDown(e: egret3d.KeyEvent3D) {
        this.keyState[e.keyCode] = true;
    }

    protected onKeyUp(e: egret3d.KeyEvent3D) {
        this.keyState[e.keyCode] = false;
    }


    private mouseMove(m: egret3d.MouseEvent3D) {
        if (!this.isDown) {
            return;
        }
        this.cBox.rotationY += egret3d.Input.mouseOffsetX;
        this.cBox.rotationX += egret3d.Input.mouseOffsetY;
    }

    private mouseDown(m: egret3d.MouseEvent3D) {
        this.isDown = true;
    }

    private mouseUp(m: egret3d.MouseEvent3D) {
        this.isDown = false;
    }

    // 用顶点和索引的方式 创建线框
    protected createWireframe() {
        // 创建一个20 * 20 行的 每个格子100 * 100 大小
        var wir: egret3d.Wireframe = new egret3d.Wireframe();
        wir.material.diffuseColor = 0xffffff;
        this.view.addChild3D(wir);
        var geom: egret3d.Geometry = wir.geometry;

        var width: number = 100;
        var height: number = 100;

        var row: number = 20;
        var col: number = 20;

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
        // 设置顶点数据 
        geom.setVerticesForIndex(0, egret3d.VertexFormat.VF_POSITION, vb, vb.length / 3);

        // 设置索引数据
        geom.setVertexIndices(0, ib);
    }

    protected dir: egret3d.Vector3D = new egret3d.Vector3D();
    protected v0: egret3d.Vector3D = new egret3d.Vector3D();
    protected q0: egret3d.Quaternion = new egret3d.Quaternion();

    protected speed: number = 300;
    protected update(e: egret3d.Event3D) {
        //this.cameraCtl.update();

        //this.cObj.rotationY++;

        var speed: number = this.speed * e.delay / 1000;


        if (this.keyState[egret3d.KeyCode.Key_W]) {
            this.view.camera3D.globalOrientation.transformVector(egret3d.Vector3D.Z_AXIS, this.dir);
            this.dir.normalize();

            this.v0.copyFrom(this.dir);
            this.v0.scaleBy(speed);
            this.cBox.globalPosition.add(this.v0, this.v0);
            this.cBox.globalPosition = this.v0;
        }

        if (this.keyState[egret3d.KeyCode.Key_S]) {
            this.view.camera3D.globalOrientation.transformVector(egret3d.Vector3D.Z_AXIS, this.dir);
            this.dir.normalize();

            this.v0.copyFrom(this.dir);
            this.v0.scaleBy(speed);
            this.cBox.globalPosition.subtract(this.v0, this.v0);
            this.cBox.globalPosition = this.v0;
        }

        if (this.keyState[egret3d.KeyCode.Key_A]) {
            this.view.camera3D.globalOrientation.transformVector(egret3d.Vector3D.X_AXIS, this.dir);
            this.dir.normalize();
            this.v0.copyFrom(this.dir);
            this.v0.scaleBy(speed);
            this.cBox.globalPosition.subtract(this.v0, this.v0);
            this.cBox.globalPosition = this.v0;
        }

        if (this.keyState[egret3d.KeyCode.Key_D]) {
            this.view.camera3D.globalOrientation.transformVector(egret3d.Vector3D.X_AXIS, this.dir);
            this.dir.normalize();
            this.v0.copyFrom(this.dir);
            this.v0.scaleBy(speed);
            this.cBox.globalPosition.add(this.v0, this.v0);
            this.cBox.globalPosition = this.v0;
        }

        this.view.camera3D.globalPosition = this.cBox.globalPosition;
        //this.view.camera3D.globalRotation = this.cBox.globalRotation;
        this.view.camera3D.globalOrientation = this.cBox.globalOrientation;
    }
}