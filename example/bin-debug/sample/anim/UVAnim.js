/**
 * UV动画
 * close
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UVAnim = (function () {
    function UVAnim() {
        StageMgr.Instance().init();
        this.init();
    }
    UVAnim.prototype.init = function () {
        this.loader = new egret3d.UnitLoader("resource/texture/uv.jpg");
        this.loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoader, this);
    };
    UVAnim.prototype.onLoader = function (e) {
        var mat = new egret3d.TextureMaterial();
        mat.repeat = true;
        var img = e.target.data;
        mat.diffuseTexture = img;
        var uvRollMethod = new egret3d.UVRollMethod();
        mat.diffusePass.addMethod(uvRollMethod);
        uvRollMethod.speedU = 0.0001;
        uvRollMethod.speedV = 0.0001;
        uvRollMethod.start(true);
        var geom = new egret3d.ElevationGeometry(img, 1000, 50, 1000);
        var mesh = new egret3d.Mesh(geom, mat);
        StageMgr.Instance().view3d.addChild3D(mesh);
        this.InitCameraCtl();
        StageMgr.Instance().stage3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
    };
    UVAnim.prototype.InitCameraCtl = function () {
        this.cameraCtl = new egret3d.LookAtController(StageMgr.Instance().view3d.camera3D, new egret3d.Object3D());
        this.cameraCtl.distance = 1000;
        this.cameraCtl.rotationX = 40;
        this.cameraCtl.rotationY = 40;
    };
    UVAnim.prototype.update = function (e) {
        this.cameraCtl.update();
    };
    return UVAnim;
}());
__reflect(UVAnim.prototype, "UVAnim");
//# sourceMappingURL=UVAnim.js.map