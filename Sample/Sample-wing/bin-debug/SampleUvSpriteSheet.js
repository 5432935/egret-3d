/**
 * @language zh_CN
 * @classdesc
 * UV序列帧动画使用示例
 * @version Egret 3.0
 * @platform Web,Native
 */
var SampleUvSpriteSheet = (function (_super) {
    __extends(SampleUvSpriteSheet, _super);
    function SampleUvSpriteSheet() {
        _super.call(this);
        ///创建Canvas对象。
        this._egret3DCanvas = new egret3d.Egret3DCanvas();
        ///Canvas的起始坐标，页面左上角为起始坐标(0,0)。
        this._egret3DCanvas.x = 0;
        this._egret3DCanvas.y = 0;
        ///设置Canvas页面尺寸。
        this._egret3DCanvas.width = window.innerWidth;
        this._egret3DCanvas.height = window.innerHeight;
        ///创建View3D对象,页面左上角为起始坐标(0,0),其参数依次为:
        ///@param x: number 起始坐标x,
        ///@param y: number 起始坐标y
        ///@param  width: number 显示区域的宽
        ///@param  height: number 显示区域的高
        this._view3D = new egret3d.View3D(0, 0, window.innerWidth, window.innerHeight);
        ///当前对象对视位置,其参数依次为:
        ///@param pos 对象的位置
        ///@param target 目标的位置
        this._view3D.camera3D.lookAt(new egret3d.Vector3D(0, 0, -1000), new egret3d.Vector3D(0, 0, 0));
        ///View3D的背景色设置
        this._view3D.backColor = 0xffffffff;
        ///将View3D添加进Canvas中
        this._egret3DCanvas.addView3D(this._view3D);
        ///启动Canvas。
        this._egret3DCanvas.start();
        ///设置window resize事件
        egret3d.Input.addEventListener(egret3d.Event3D.RESIZE, this.OnWindowResize, this);
        ///初始化摄像机控制器
        this.ctl = new egret3d.HoverController(this._view3D.camera3D);
        this.ctl.tiltAngle = 60;
        this.ctl.distance = 1000;
        ///添加面片
        this.matPlane = new egret3d.TextureMaterial();
        var plane = new egret3d.Mesh(new egret3d.PlaneGeometry(1000, 1000, 10, 10, 1, 1), this.matPlane);
        this._view3D.addChild3D(plane);
        ///UV序列帧动画
        var uvSpriteSheetMethod = new egret3d.UVSpriteSheetMethod(34, 6, 6, 3.0);
        ///添加渲染方式
        this.matPlane.diffusePass.addMethod(uvSpriteSheetMethod);
        ///抗锯齿设置
        this.matPlane.smooth = false;
        ///开始播放
        uvSpriteSheetMethod.start(true);
        ///加载纹理资源
        var loadDiffuse = new egret3d.URLLoader();
        loadDiffuse.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoadDiffuse, this);
        loadDiffuse.load("resource/squen/test1.png");
        this.CloseLoadingView();
        this._egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
    }
    var d = __define,c=SampleUvSpriteSheet,p=c.prototype;
    /**
    * @language zh_CN
    * 读取纹理回调
    * @version Egret 3.0
    * @platform Web,Native
    */
    p.onLoadDiffuse = function (e) {
        this.matPlane.diffuseTexture = e.loader.data;
    };
    /**
    * @language zh_CN
    * 窗口尺寸变化事件
    * @version Egret 3.0
    * @platform Web,Native
    */
    p.OnWindowResize = function (e) {
        ///重置ui大小
        this._egret3DCanvas.width = window.innerWidth;
        this._egret3DCanvas.height = window.innerHeight;
        this._view3D.width = window.innerWidth;
        this._view3D.height = window.innerHeight;
    };
    p.update = function (e) {
        this.ctl.update();
    };
    return SampleUvSpriteSheet;
}(SampleBase));
egret.registerClass(SampleUvSpriteSheet,'SampleUvSpriteSheet');
//# sourceMappingURL=SampleUvSpriteSheet.js.map