
class Main extends egret.DisplayObjectContainer {

    private _stage3d: egret3d.Stage3D;
    private _view3D: egret3d.View3D;

    public constructor() {
        super();
        let data:egret3d.DefaultMaterialDefines = new egret3d.DefaultMaterialDefines("default_fragment");
        data.DIFFUSE = true;
        data.AMBIENT = true;
        console.log( data["DIFFUSE"] ); 
        console.log( data.toName() )
        egret3d.ShaderGenerator.createShaderSource( data, "default_fragment" );

        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {



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

        let geom: egret3d.CubeGeometry = new egret3d.CubeGeometry(128, 128, 128);
        let mat: egret3d.ColorMaterial = new egret3d.ColorMaterial(0x00ff00);
        let cube: egret3d.Mesh = new egret3d.Mesh(geom, mat);
        this._view3D.addChild3D(cube);

        let yuan:egret3d.SphereGeometry = new egret3d.SphereGeometry();
        let mm:egret3d.TextureMaterial = new egret3d.TextureMaterial();
        let yy:egret3d.Mesh = new egret3d.Mesh( yuan, mm );
        this._view3D.addChild3D( yy );

        this.InitCameraCtl();
        this._stage3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);

        this._stage3d.start();
    }

    private OnWindowResize(e: egret3d.Event3D): void {
        this._stage3d.width = window.innerWidth;
        this._stage3d.height = window.innerHeight;
        this._view3D.width = window.innerWidth;
        this._view3D.height = window.innerHeight;
    }

    private cameraCtl: egret3d.LookAtController;
    private InitCameraCtl() {
        this.cameraCtl = new egret3d.LookAtController(this._view3D.camera3D, new egret3d.Object3D());
        this.cameraCtl.distance = 1000;
        this.cameraCtl.rotationX = 40;
        this.cameraCtl.rotationY = 40;
    }

    public update(e: egret3d.Event3D) {
        this.cameraCtl.update();
    }
    
}


