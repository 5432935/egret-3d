/**
* @language zh_CN
* @classdesc
* 创建模型使用示例
* @version Egret 3.0
* @platform Web,Native
*/
var SampleStaticModel = (function (_super) {
    __extends(SampleStaticModel, _super);
    function SampleStaticModel() {
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
        this._view3D.camera3D.lookAt(new egret3d.Vector3D(0, 0, 1000), new egret3d.Vector3D(10, 20, 30));
        ///View3D的背景色设置
        this._view3D.backColor = 0xffffffff;
        ///将View3D添加进Canvas中
        this._egret3DCanvas.addView3D(this._view3D);
        ////创建加载类
        var load = new egret3d.URLLoader();
        ///设置加载完成回调
        load.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoad, this);
        ///开始加载
        load.load("resource/laohu/Mon_04.esm");
        this.InitCameraCtl();
        ///启动Canvas。
        this._egret3DCanvas.start();
        this._egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
        this.OnInitLoadingView(2);
        ///设置window resize事件
        egret3d.Input.addEventListener(egret3d.Event3D.RESIZE, this.OnWindowResize, this);
    }
    var d = __define,c=SampleStaticModel,p=c.prototype;
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
    /**
    * @language zh_CN
    * 初始化相机控制
    * @version Egret 3.0
    * @platform Web,Native
    */
    p.InitCameraCtl = function () {
        ///摄像机控制类
        this.cameraCtl = new egret3d.LookAtController(this._view3D.camera3D, new egret3d.Object3D());
        ///设置目标和相机的距离
        this.cameraCtl.distance = 1000;
        ///设置相机x轴旋转
        this.cameraCtl.rotationX = 60;
    };
    /**
    * @language zh_CN
    * 模型加载回调
    * @param e: egret3d.URLLoader 加载器对象
    * @version Egret 3.0
    * @platform Web,Native
    */
    p.onLoad = function (e) {
        this.OnLoadFinished();
        ///创建纹理材质
        this.mat = new egret3d.TextureMaterial();
        ///创建模型基类
        var ge = e.loader.data;
        ///生成mesh
        this.model = new egret3d.Mesh(ge, this.mat);
        if (ge.vertexFormat & egret3d.VertexFormat.VF_SKIN) {
            ///设置骨骼动画
            this.model.animation = new egret3d.SkeletonAnimation(ge.skeleton);
        }
        ///插入model
        this._view3D.addChild3D(this.model);
        var loadtex = new egret3d.URLLoader();
        ///注册贴图读取完成回调
        loadtex.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
        ///开始读取贴图 
        loadtex.load("resource/laohu/Mon_04.png");
    };
    /**
    * @language zh_CN
    * 漫反射贴图加载回调
    * @param e: egret3d.URLLoader 加载器对象
    * @version Egret 3.0
    * @platform Web,Native
    */
    p.onLoadTexture = function (e) {
        this.OnLoadFinished();
        ///设置材质球的漫反射贴图。
        this.mat.diffuseTexture = e.loader.data;
        ///注销回调
        e.loader.removeEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
    };
    p.update = function (e) {
        this.cameraCtl.update();
    };
    return SampleStaticModel;
}(SampleBase));
egret.registerClass(SampleStaticModel,'SampleStaticModel');
//# sourceMappingURL=SampleStaticModel.js.map