var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        /*
                egret3d.ShaderGenerator.createProgram();
        
                let data:egret3d.DefaultMaterialDefines = new egret3d.DefaultMaterialDefines("default_fragment");
                data.DIFFUSE = true;
                data.AMBIENT = true;
                console.log( data["DIFFUSE"] );
                console.log( data.toName() )
                egret3d.ShaderGenerator.createShaderSource( data, "default_fragment" );
                */
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        this._stage3d = new egret3d.Stage3D();
        this._stage3d.x = 0;
        this._stage3d.y = 0;
        this._stage3d.width = window.innerWidth;
        this._stage3d.height = window.innerHeight;
        this._view3D = new egret3d.View3D(0, 0, window.innerWidth, window.innerHeight);
        this._view3D.camera3D.lookAt(new egret3d.Vector3(0, 0, 1000), new egret3d.Vector3(0, 0, 0));
        this._view3D.backColor = 0xffcccccc;
        this._stage3d.addView3D(this._view3D);
        this._stage3d.addEventListener(egret3d.Event3D.RESIZE, this.OnWindowResize, this);
        var geom = new egret3d.CubeGeometry(128, 128, 128);
        var mat = new egret3d.ColorMaterial(0x00ff00);
        var cube = new egret3d.Mesh(geom, mat);
        this._view3D.addChild3D(cube);
        var yuan = new egret3d.SphereGeometry();
        var mm = new egret3d.TextureMaterial();
        var yy = new egret3d.Mesh(yuan, mm);
        this._view3D.addChild3D(yy);
        this.InitCameraCtl();
        this._stage3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
        this._stage3d.start();
    };
    Main.prototype.OnWindowResize = function (e) {
        this._stage3d.width = window.innerWidth;
        this._stage3d.height = window.innerHeight;
        this._view3D.width = window.innerWidth;
        this._view3D.height = window.innerHeight;
    };
    Main.prototype.InitCameraCtl = function () {
        this.cameraCtl = new egret3d.LookAtController(this._view3D.camera3D, new egret3d.Object3D());
        this.cameraCtl.distance = 1000;
        this.cameraCtl.rotationX = 40;
        this.cameraCtl.rotationY = 40;
    };
    Main.prototype.update = function (e) {
        this.cameraCtl.update();
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
