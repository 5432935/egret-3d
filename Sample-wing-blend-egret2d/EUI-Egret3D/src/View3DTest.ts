/**
 *
 * @author 
 *
 */
class View3DTest {
    
  
    public isRotationX: boolean = false;
    public isRotationY: boolean = false;
    public isRotationZ: boolean = false;
    public rotationXSpeed: number = 0.5;
    public rotationYSpeed: number = 0.5;
    public rotationZSpeed: number = 0.5;
    
    /**
   * Canvas操作对象
   * @version Egret 3.0
   * @platform Web,Native
   */
    protected _egret3DCanvas: egret3d.Egret3DCanvas;
    /**
    * View3D操作对象
    * @version Egret 3.0
    * @platform Web,Native
    */
    protected _view3D: egret3d.View3D;
    /**
    * 立方体对象
    * @version Egret 3.0
    * @platform Web,Native
    */
    protected _cube: egret3d.Mesh;

    
	public constructor() {
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
        this._view3D = new egret3d.View3D(0,0,window.innerWidth,window.innerHeight);
        ///当前对象对视位置,其参数依次为:
        ///@param pos 对象的位置
        ///@param target 目标的位置
        this._view3D.camera3D.lookAt(new egret3d.Vector3D(200, 200,-1000),new egret3d.Vector3D(0,0,0));
        ///View3D的背景色设置
        this._view3D.backColor = 0xffffffff;
        ///将View3D添加进Canvas中
        this._egret3DCanvas.addView3D(this._view3D);
    
        this.CreatCube();
        
        this.CreatGrid();
        
        this.CreatSky();
        
        ///启动Canvas。
        this._egret3DCanvas.start();
        ///注册每帧更新，让cube进行旋转
        this._egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME,this.update,this);
        ///设置window resize事件
        egret3d.Input.addEventListener(egret3d.Event3D.RESIZE,this.OnWindowResize,this);
	}
	
	
	private CreatCube():void{
        ///创建颜色材质
        var mat_0: egret3d.TextureMaterial = new egret3d.TextureMaterial();
        ///创建立方体对象
        var geometery_0: egret3d.CubeGeometry = new egret3d.CubeGeometry(150,150,150);
        ///通过材质和立方体对象生成Mesh
        this._cube = new egret3d.Mesh(geometery_0,mat_0);
        ///将mesh插入view3D
        this._view3D.addChild3D(this._cube);
	}
	
	/**
   * @language zh_CN        
   * 创建天空盒子
   * @version Egret 3.0
   * @platform Web,Native
   */
	private CreatSky():void {
        ///天空贴图用于Sky类使用，其内部是将6张HTMLImageElement（网页图片元素）封装到CubeTexture对象，CubeTexture为引擎内部使用对象
        //* 需要在html中已有 < /p>
        //  < pre >
        //      <img id="t1" src= "image_front.png" />
        //      <img id="t2" src= "image_back.png" />
        //      <img id="t3" src= "image_left.png" />
        //      <img id="t4" src= "image_right.png" />
        //      <img id="t5" src= "image_up.png" />
        //      <img id="t6" src= "image_down.png" />
        //  </pre>
        var cubeTexture: egret3d.CubeTexture = egret3d.CubeTexture.createCubeTexture(
            <HTMLImageElement>document.getElementById("f"),
            <HTMLImageElement>document.getElementById("b"),
            <HTMLImageElement>document.getElementById("l"),
            <HTMLImageElement>document.getElementById("r"),
            <HTMLImageElement>document.getElementById("u"),
            <HTMLImageElement>document.getElementById("d")
        );
        ///创建天空盒
        var sky: egret3d.Sky = new egret3d.Sky(new egret3d.CubeTextureMaterial(cubeTexture),this._view3D.camera3D);
        ///将天空盒子插入view3D
        this._view3D.addChild3D(sky);
        ///启动Canvas。
        this._egret3DCanvas.start();   
	}
	
	/**
   * @language zh_CN        
   * 创建纯色网格地面
   * @version Egret 3.0
   * @platform Web,Native
   */
    private CreatGrid(): void {
        
       
        ///生成面板
        var mat_1: egret3d.ColorMaterial = new egret3d.ColorMaterial(0xff000000);
        var geometery_1: egret3d.PlaneGeometry = new egret3d.PlaneGeometry(3000,10000);
        var plane = new egret3d.Mesh(geometery_1,mat_1);
        plane.y = -150;
        this._view3D.addChild3D(plane);
        
        var width: number = 200;
        var height: number = 200;

        var row: number = 10000 /200 ;
        var col: number = 3000 /200 + 2;

        var geom: egret3d.Geometry = new egret3d.Geometry();
        geom.vertexFormat = egret3d.VertexFormat.VF_POSITION;
        geom.verticesData = new Array<number>();
        geom.indexData = new Array<number>();


        for(var i: number = 0;i < row;i++) {
            for(var j: number = 0;j < col;j++) {
                var index: number = i * col + j;
                index = index * geom.vertexAttLength;
                geom.verticesData[index + 0] = width * j - width * col / 2;
                geom.verticesData[index + 1] = -149;
                geom.verticesData[index + 2] = height * i - height * row / 2;
               

                if(j + 1 < col) {
                    geom.indexData.push(i * col + j);
                    geom.indexData.push(i * col + j + 1);
                }

                if(i + 1 < row) {
                    geom.indexData.push(i * col + j);
                    geom.indexData.push((i + 1) * col + j);
                }
            }
        }


        var wir: egret3d.Wireframe = new egret3d.Wireframe(geom);
        wir.material.diffuseColor = 0x00ffff;
        this._view3D.addChild3D(wir);
    }
	
    /**
   * @language zh_CN        
   * 窗口尺寸变化事件
   * @version Egret 3.0
   * @platform Web,Native
   */
    private OnWindowResize(e: egret3d.Event3D): void {
        ///重置ui大小
        this._egret3DCanvas.width = window.innerWidth;
        this._egret3DCanvas.height = window.innerHeight;
        this._view3D.width = window.innerWidth;
        this._view3D.height = window.innerHeight;
    }
	

    public update(e: egret3d.Event3D) {
        ///旋转
        if(this.isRotationX) {
            this._cube.rotationX += this.rotationXSpeed;
        }
        if(this.isRotationY) {
            this._cube.rotationY += this.rotationYSpeed;
        }
        if(this.isRotationZ) {
            this._cube.rotationZ += this.rotationZSpeed;
        }
    }
}
