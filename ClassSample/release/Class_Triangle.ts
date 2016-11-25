module egret3d {

    export class Class_Triangle {
        // Canvas操作对象
        protected _egret3DCanvas: egret3d.Egret3DCanvas;

        // View3D操作对象
        protected _view3D: egret3d.View3D;
        /**
        * look at 摄像机控制器 。</p>
        * 指定摄像机看向的目标对象。</p>
        * 1.按下鼠标左键并移动鼠标可以使摄像机绕着目标进行旋转。</p>
        * 2.按下键盘的(w s a d) 可以摄像机(上 下 左 右)移动。</p>
        * 3.滑动鼠标滚轮可以控制摄像机的视距。</p>
        */
        private cameraCtl: egret3d.LookAtController;

        // 灯光组
        private lights: egret3d.LightGroup = new egret3d.LightGroup();

        // 模型对象
        private model: egret3d.Mesh;

        constructor() {

            //创建Canvas对象。
            this._egret3DCanvas = new egret3d.Egret3DCanvas();
            //Canvas的起始坐标，页面左上角为起始坐标(0,0)。
            this._egret3DCanvas.x = 0;
            this._egret3DCanvas.y = 0;
            //设置Canvas页面尺寸。
            this._egret3DCanvas.width = window.innerWidth;
            this._egret3DCanvas.height = window.innerHeight;

            //创建View3D对象,页面左上角为起始坐标(0,0)
            this._view3D = new egret3d.View3D(0, 0, window.innerWidth, window.innerHeight);
            //当前对象对视位置,其参数依次为:
            //@param pos 对象的位置
            //@param target 目标的位置
            this._view3D.camera3D.lookAt(new egret3d.Vector3D(0, 0, 1000), new egret3d.Vector3D(0, 0, 0));
            //View3D的背景色设置
            this._view3D.backColor = 0xff333333;
            //将View3D添加进Canvas中
            this._egret3DCanvas.addView3D(this._view3D);

            //创建平行光
            var dirLight: egret3d.DirectLight = new egret3d.DirectLight(new egret3d.Vector3D(0.3, -0.3, 0.1));
            dirLight.diffuse = 0xffffff;
            this.lights.addLight(dirLight);

            ///创建加载类
            var load: egret3d.URLLoader = new egret3d.URLLoader();

            this.InitCameraCtl();

            //启动Canvas。
            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);

            //设置window resize事件
            egret3d.Input.addEventListener(egret3d.Event3D.RESIZE, this.OnWindowResize, this);

            this.createAxisDisp();
            this.createTriangleWireframe();
            this.createTriangleColorMat();
            this.createTriangleTexture();

            console.log("TestTriangle.constructor");
        }

        public update(e: egret3d.Event3D) {
            this.cameraCtl.update();
        }

        /**
        * 窗口尺寸变化事件
        */
        private OnWindowResize(e: egret3d.Event3D): void {
            //重置ui大小
            this._egret3DCanvas.width = window.innerWidth;
            this._egret3DCanvas.height = window.innerHeight;
            this._view3D.width = window.innerWidth;
            this._view3D.height = window.innerHeight;
        }

        /**
        * 初始化相机控制
        */
        private InitCameraCtl() {
            //摄像机控制类
            this.cameraCtl = new egret3d.LookAtController(this._view3D.camera3D, new egret3d.Object3D());
            //设置目标和相机的距离
            this.cameraCtl.distance = 300;

            //设置相机x轴旋转
            this.cameraCtl.rotationX = 20;
            this.cameraCtl.rotationY = -150;//让摄像机转到轴正方向上
            this.cameraCtl.rotationZ = 0;
        }

        protected createAxisDisp(): void {
            var AixsLen: number = 100;
            this.createBox(AixsLen, 0, 0, 0xff0000);
            this.createBox(0, AixsLen, 0, 0x00ff00);
            this.createBox(0, 0, AixsLen, 0x0000ff);
            this.createBox(0, 0, 0, 0xffff00);
        }
        protected createBox(px: number, py: number, pz: number, color: number, size: number = 8): void {
            var geom = new egret3d.CubeGeometry(size, size, size);
            var box: egret3d.Mesh = new egret3d.Mesh(geom, new egret3d.ColorMaterial(color));
            box.x = px;
            box.y = py;
            box.z = pz;

            this._view3D.addChild3D(box);
        }

        /**
         * 创建线框的三角形
         */
        protected createTriangleWireframe(): void {
            var geom = egret3d.GeometryUtil.createGeometry();

            geom.setVerticesForIndex(0, egret3d.VertexFormat.VF_POSITION, [0, 0, 0]);//[0,0,0]顶点 原点
            geom.setVerticesForIndex(1, egret3d.VertexFormat.VF_POSITION, [0, 80, 0]);//[0,80,0]顶点 Y轴的点
            geom.setVerticesForIndex(2, egret3d.VertexFormat.VF_POSITION, [80, 0, 0]);//[80,0,0]顶点 X轴的点
            geom.setVertexIndices(0, [0, 1, 2]);//三角形索引

            var wireMesh: egret3d.Wireframe = new egret3d.Wireframe();
            wireMesh.fromGeometry(geom);

            this._view3D.addChild3D(wireMesh);
        }

        /**
         * 创建贴图的三角形
         */
        protected createTriangleColorMat(): void {
            var geom: egret3d.Geometry = egret3d.GeometryUtil.createGeometry();

            geom.setVerticesForIndex(0, egret3d.VertexFormat.VF_POSITION, [0, 0, 10]);//[0,0,0]顶点 原点
            geom.setVerticesForIndex(1, egret3d.VertexFormat.VF_POSITION, [0, 70, 10]);//[0,80,0]顶点 Y轴的点
            geom.setVerticesForIndex(2, egret3d.VertexFormat.VF_POSITION, [70, 0, 10]);//[80,0,0]顶点 X轴的点

            geom.setVertexIndices(0, [0, 1, 2]);//三角形索引

            var colorMtl = new egret3d.ColorMaterial(0x00ffff);
            colorMtl.alpha = .7;//材质透明度
            colorMtl.bothside = true;//双面材质 

            var mesh: egret3d.Mesh = new egret3d.Mesh(geom, colorMtl);

            this._view3D.addChild3D(mesh);
        }


        private mat: egret3d.TextureMaterial = new egret3d.TextureMaterial();
        private loadtex: egret3d.URLLoader = new egret3d.URLLoader();
        /**
         * 创建一个带纹理贴图的三角形
         */
        private createTriangleTexture(): void {
            //注册贴图读取完成回调
            this.loadtex.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
            //开始读取贴图 
            this.loadtex.load("resource/matcap/450.jpg");//resource/LingTong/hero_12.png
        }

        protected onLoadTexture(e: egret3d.LoaderEvent3D) {
            //设置纹理材质漫反射贴图
            //var te
            //this.mat.diffuseTexture = e.loader.data;
            var material: TextureMaterial = new egret3d.TextureMaterial() ;
            var geom: egret3d.Geometry = egret3d.GeometryUtil.createGeometry();

            geom.setVerticesForIndex(0, egret3d.VertexFormat.VF_POSITION, [0, 0, 20]);//[0,0,0]顶点 原点
            geom.setVerticesForIndex(1, egret3d.VertexFormat.VF_POSITION, [0, 70, 20]);//[0,80,0]顶点 Y轴的点
            geom.setVerticesForIndex(2, egret3d.VertexFormat.VF_POSITION, [70, 0, 20]);//[80,0,0]顶点 X轴的点

            //◆◆◆设置顶点UV方式1，不能生效
            geom.setVerticesForIndex(0, egret3d.VertexFormat.VF_UV0, [0, 1]);//设置顶点0的UV
            geom.setVerticesForIndex(1, egret3d.VertexFormat.VF_UV0, [0, 0]);//设置顶点1的UV
            geom.setVerticesForIndex(2, egret3d.VertexFormat.VF_UV0, [1, 1]);//设置顶点2的UV

            //◆◆◆设置顶点UV方式2,不能生效
            //    geom.setVerticesForIndex( 0,egret3d.VertexFormat.VF_UV0,[0]);//设置顶点0的UV
            //    geom.setVerticesForIndex( 0,egret3d.VertexFormat.VF_UV1,[1]);//设置顶点0的UV
            //    geom.setVerticesForIndex( 1,egret3d.VertexFormat.VF_UV0,[0]);//设置顶点1的UV
            //    geom.setVerticesForIndex( 1,egret3d.VertexFormat.VF_UV0,[0]);//设置顶点1的UV
            //    geom.setVerticesForIndex( 2,egret3d.VertexFormat.VF_UV0,[1]);//设置顶点2的UV
            //    geom.setVerticesForIndex( 2,egret3d.VertexFormat.VF_UV0,[1]);//设置顶点2的UV

            geom.setVertexIndices(0, [0, 1, 2]);//三角形索引

            //material.alpha = .7;//材质透明度
            //material.bothside = true;//双面材质 


            var mesh: egret3d.Mesh = new egret3d.Mesh(geom, material );//◆◆◆◆◆◆图片纹理：不能正常工作，只能看到3个白点◆◆◆     
            //var mesh:egret3d.Mesh = new egret3d.Mesh(geom,colorMtl);//ColorMaterial是可以正常工作的


            this._view3D.addChild3D(mesh);
        }

    }
}