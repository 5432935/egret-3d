class StageMgr {

    private _stage3d: egret3d.Egret3DCanvas//.Stage3D;
    private _view3D: egret3d.View3D;

    public get stage3d(): egret3d.Egret3DCanvas {
        return this._stage3d;
    }

    public get view3d(): egret3d.View3D {
        return this._view3D;
    }

    private static _this: StageMgr = new StageMgr();
    public static Instance(): StageMgr {
        return StageMgr._this;
    }

    public init(_bgColor: number = 0xffcccccc) {
        this._stage3d = new egret3d.Egret3DCanvas();
        this._stage3d.x = 0;
        this._stage3d.y = 0;
        this._stage3d.width = window.innerWidth;
        this._stage3d.height = window.innerHeight;

        this._view3D = new egret3d.View3D(0, 0, window.innerWidth, window.innerHeight);
        this._view3D.camera3D.lookAt(new egret3d.Vector3D(0, 0, 1000), new egret3d.Vector3D(0, 0, 0));

        this._view3D.backColor = _bgColor;
        this._stage3d.addView3D(this._view3D);
        this._stage3d.start();
        
        this._stage3d.addEventListener(egret3d.Event3D.RESIZE, this.OnWindowResize, this);
    }

    private OnWindowResize(e: egret3d.Event3D): void {
        this._stage3d.width = window.innerWidth;
        this._stage3d.height = window.innerHeight;
        this._view3D.width = window.innerWidth;
        this._view3D.height = window.innerHeight;
    }

}