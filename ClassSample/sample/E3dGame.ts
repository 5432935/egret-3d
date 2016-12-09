/**
 *
 * @author 
 *
 */
class E3dGame {
    // Canvas操作对象
    protected egret3DCanvas: egret3d.Egret3DCanvas;

    // View3D操作对象
    protected view: egret3d.View3D;
    
    /*
     * 进度条
     */ 
    protected loadProgress: egret3d.gui.UIProgressBar;
    
    /**
     *  加载器
     */
    protected queueLoader: egret3d.QueueLoader;
    
    protected lightGroup:egret3d.LightGroup;
    
    /**
    * look at 摄像机控制器 。</p>
    * 指定摄像机看向的目标对象。</p>
    * 1.按下鼠标左键并移动鼠标可以使摄像机绕着目标进行旋转。</p>
    * 2.按下键盘的(w s a d) 可以摄像机(上 下 左 右)移动。</p>
    * 3.滑动鼠标滚轮可以控制摄像机的视距。</p>
    */
    private cameraCtl: egret3d.LookAtController;

	public constructor() {
    	  this.egret3DCanvas = new egret3d.Egret3DCanvas();
        this.egret3DCanvas.x = 0;
        this.egret3DCanvas.y = 0;
        this.egret3DCanvas.width = window.innerWidth;
        this.egret3DCanvas.height = window.innerHeight;
        this.egret3DCanvas.start();

        var view: egret3d.View3D = new egret3d.View3D(0,0,this.egret3DCanvas.width,this.egret3DCanvas.height);
        view.camera3D.lookAt(new egret3d.Vector3D(0, 1000, -1000), new egret3d.Vector3D(0, 0, 0));
        view.backColor = 0xffcccccc;

        this.egret3DCanvas.addView3D(view);
        this.view = view;

        this.cameraCtl = new egret3d.LookAtController(view.camera3D, new egret3d.Object3D());
        this.cameraCtl.lookAtObject.y = 100;
        
        this.cameraCtl.distance = 500;
        this.cameraCtl.rotationX = 30;
        this.cameraCtl.rotationY = 180;
        this.egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
        // ------------------ 初始化引擎 ---------------------


        

        this.queueLoader = new egret3d.QueueLoader();
        this.queueLoader.loadDefaultGUISkin();
        this.queueLoader.load("resource/EgretLoadingPage.jpg");
        this.queueLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onGUISkin, this);
        
        egret3d.Input.addEventListener(egret3d.Event3D.RESIZE,this.OnWindowResize,this);
        
	}
	
	/*
	 *  GUI皮肤和背景图加载完成
	 */ 
    protected onGUISkin(e:egret3d.LoaderEvent3D){
        this.queueLoader.removeEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE,this.onGUISkin,this);
        this.view.backImage = this.queueLoader.getAsset("resource/EgretLoadingPage.jpg");
        
        this.loadProgress = new egret3d.gui.UIProgressBar();
        this.loadProgress.y = this.egret3DCanvas.height - 175;
        this.loadProgress.width = 500;
        this.loadProgress.height = 20;

        this.loadProgress.x = this.egret3DCanvas.width / 2 - this.loadProgress.width / 2;
        
        this.view.addGUI(this.loadProgress);        
        
        this.queueLoader.addEventListener(egret3d.LoaderEvent3D.COMPLETE, this.onComplete, this);
        this.queueLoader.addEventListener(egret3d.LoaderEvent3D.PROGRESS,this.onProgress,this);
        
        // 加载完GUI 加载其它的资源
        this.queueLoader.load("resource/0_Model/Esm/Zhouyu.esm");
        this.queueLoader.load("resource/0_Model/Eam/attack.eam");
        this.queueLoader.load("resource/0_Model/Eam/idle.eam");
        this.queueLoader.load("resource/0_Model/Texture/hero_01.png");

        egret3d.Input.addEventListener(egret3d.KeyEvent3D.KEY_DOWN, this.onKeyDown, this);
    }

    protected ani: egret3d.IAnimation;
    protected onKeyDown(e: egret3d.KeyEvent3D) {
        switch (e.keyCode) {
            case egret3d.KeyCode.Key_1:
                this.ani.play("attack");
                break;
        }
    }
	
    protected onComplete(e:egret3d.LoaderEvent3D){
        this.view.removeGUI(this.loadProgress);
        var geo: egret3d.Geometry = this.queueLoader.getAsset("resource/0_Model/Esm/Zhouyu.esm");
        var clip: egret3d.SkeletonAnimationClip = this.queueLoader.getAsset("resource/0_Model/Eam/attack.eam");
        var idleClip: egret3d.SkeletonAnimationClip = this.queueLoader.getAsset("resource/0_Model/Eam/idle.eam");
        var tex: egret3d.ITexture = this.queueLoader.getAsset("resource/0_Model/Texture/hero_01.png");
       
        clip.animationName = "attack"; 
        idleClip.animationName = "idle"; 
        var mesh:egret3d.Mesh = new egret3d.Mesh(geo);        
        
        clip.isLoop = false;
        idleClip.isLoop = true;
        mesh.material.diffuseTexture = tex;
        mesh.material.ambientColor = 0xb4b4b4;
        mesh.material.gloss = 10;
        mesh.material.specularLevel = 0.5;
        
        mesh.animation.skeletonAnimationController.state.addAnimClip(clip);
        mesh.animation.skeletonAnimationController.state.addAnimClip(idleClip);
        mesh.animation.skeletonAnimationController.addEventListener(egret3d.AnimationEvent3D.COMPLETE, this.onAnimationComplete, this);
        mesh.animation.skeletonAnimationController.addEventListener(egret3d.AnimationEvent3D.CYCLE,this.onAnimationCycle,this);
        this.view.addChild3D(mesh);
        mesh.animation.play(idleClip.animationName);                
        this.ani = mesh.animation;
        this.lightGroup = new egret3d.LightGroup();
        var dirLight:egret3d.DirectLight = new egret3d.DirectLight(new egret3d.Vector3D(1, -1, 0))       
        this.lightGroup.addLight(dirLight);
        mesh.lightGroup = this.lightGroup;             
    }
    
    protected onAnimationComplete(e:egret3d.LoaderEvent3D) {
        console.log("onAnimationComplete");
    }
    
    protected onAnimationCycle(e: egret3d.LoaderEvent3D) {
        console.log("播放完成一个循环");
    }
    
    protected onProgress(e: egret3d.LoaderEvent3D) {
        this.loadProgress.ratio = e.currentProgress;
    }
    
	/**
    * 窗口尺寸变化事件
    */
    private OnWindowResize(e: egret3d.Event3D): void {
        //重置ui大小
        this.egret3DCanvas.width = window.innerWidth;
        this.egret3DCanvas.height = window.innerHeight;
        this.view.width = this.egret3DCanvas.width;
        this.view.height = this.egret3DCanvas.height;
    }
    
    protected update(e:egret3d.Event3D){
        this.cameraCtl.update();
    }
}
