/**
 *  内存泄漏测试
 * 
 */

class StorageTestSample {

    public constructor() {
        StageMgr.Instance().init();

        this.init();
    }

    private init() {
        this.addCube();

        this.InitCameraCtl();
        StageMgr.Instance().stage3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
    }

    private cameraCtl: egret3d.LookAtController;
    private InitCameraCtl() {
        this.cameraCtl = new egret3d.LookAtController(StageMgr.Instance().view3d.camera3D, new egret3d.Object3D());
        this.cameraCtl.distance = 300;
        this.cameraCtl.rotationX = 0;
    }

    private count = 0;

    public update(e: egret3d.Event3D) {
        this.cameraCtl.update();

        this.count++;
        
        if(this.count > 30) {
            this.count = 0;
            this.cube ? this.removeCube() : this.addCube();
        }
    }

    private cube:egret3d.Mesh;

    private addCube() {
        console.log("add cube");

        let geom: egret3d.CubeGeometry = new egret3d.CubeGeometry(50, 100, 10);
        let mat: egret3d.TextureMaterial = new egret3d.TextureMaterial();
        let cube: egret3d.Mesh = new egret3d.Mesh(geom, mat);

        StageMgr.Instance().view3d.addChild3D(cube);

        this.cube = cube;
    }

    private removeCube() {
        console.log("remove cube");

        let cube = this.cube;

        StageMgr.Instance().view3d.removeChild3D(cube);

        cube.dispose();

        this.cube = null;
    }

}