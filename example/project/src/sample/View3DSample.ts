/**
 * 多个View3D
 * 
 */

class View3DSample {
    public constructor() {
        StageMgr.Instance().init(0xffff0000);
        this.init();
    }

    private init() {

        let cubegeom: egret3d.CubeGeometry = new egret3d.CubeGeometry(128, 128, 128);
        let cube: egret3d.Mesh = this.createMesh(cubegeom);
        StageMgr.Instance().view3d.addChild3D(cube);
        StageMgr.Instance().view3d.width = window.innerWidth / 2;
        this.setCamera(StageMgr.Instance().view3d.camera3D);


        let sphgeom: egret3d.SphereGeometry = new egret3d.SphereGeometry();
        let sph: egret3d.Mesh = this.createMesh(sphgeom);

        let view: egret3d.View3D = new egret3d.View3D(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
        view.addChild3D(sph);
        view.camera3D.lookAt(new egret3d.Vector3D(0, 0, 1000), new egret3d.Vector3D(0, 0, 0));

        StageMgr.Instance().stage3d.addView3D(view);
        this.setCamera(view.camera3D);

    }

    private createMesh(geom: egret3d.Geometry): egret3d.Mesh {
        let mat: egret3d.TextureMaterial = new egret3d.TextureMaterial();
        let mesh: egret3d.Mesh = new egret3d.Mesh(geom, mat);
        return mesh;
    }

    private setCamera(cam: egret3d.Camera3D) {
        cam.lookAt(new egret3d.Vector3D(500, 500, 500), new egret3d.Vector3D(0, 0, 0));
    }

}