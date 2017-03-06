var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StageMgr = (function () {
    function StageMgr() {
    }
    Object.defineProperty(StageMgr.prototype, "stage3d", {
        get: function () {
            return this._stage3d;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageMgr.prototype, "view3d", {
        get: function () {
            return this._view3D;
        },
        enumerable: true,
        configurable: true
    });
    StageMgr.Instance = function () {
        return StageMgr._this;
    };
    StageMgr.prototype.init = function (_bgColor) {
        if (_bgColor === void 0) { _bgColor = 0xffcccccc; }
        this._stage3d = new egret3d.Stage3D();
        this._stage3d.x = 0;
        this._stage3d.y = 0;
        this._stage3d.width = window.innerWidth;
        this._stage3d.height = window.innerHeight;
        this._view3D = new egret3d.View3D(0, 0, window.innerWidth, window.innerHeight);
        this._view3D.camera3D.lookAt(new egret3d.Vector3D(0, 0, 1000), new egret3d.Vector3D(0, 0, 0));
        this._view3D.backColor = _bgColor;
        this._stage3d.addView3D(this._view3D);
        this._stage3d.start();
        console.log("init");
        this._stage3d.addEventListener(egret3d.Event3D.RESIZE, this.OnWindowResize, this);
    };
    StageMgr.prototype.OnWindowResize = function (e) {
        this._stage3d.width = window.innerWidth;
        this._stage3d.height = window.innerHeight;
        this._view3D.width = window.innerWidth;
        this._view3D.height = window.innerHeight;
    };
    return StageMgr;
}());
StageMgr._this = new StageMgr();
__reflect(StageMgr.prototype, "StageMgr");
//# sourceMappingURL=StageMgr.js.map