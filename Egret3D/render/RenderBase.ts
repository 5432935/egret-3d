module egret3d {
                            
    /**
    * @private
    * @class egret3d.RenderBase
    * @classdesc
    * 渲染器基类
    */
    export class RenderBase {


        public name: string = "default";


        /**
        * @public
        * @language zh_CN
        * 是否启用当前渲染器，善用当前开关，可以优化渲染性能
        * @classdesc
        */
        public enabled: boolean = true;

        /**
        * @public
        * @language zh_CN
        * 渲染器使用的相机
        * @classdesc
        */
        public camera: Camera3D;

        /**
        * @public
        * @language zh_CN
        * 渲染器使用的相机
        * @classdesc
        */
        public viewPort: Rectangle;

        /**
        * @public
        * @language zh_CN
        * 如果设置了当前渲染的视图，需要渲染到贴图，此变量才会有值
        * @classdesc
        */
        public renderTexture: RenderTexture;

        /**
        * @public
        * @language zh_CN
        * 前渲染的视图，渲染物体的总数目
        * @classdesc
        */
        public numEntity: number = 0; 

        /**
        * @private
        * @language zh_CN
        */
        protected _renderIndex: number = 0;

        /**
        * @private
        * @language zh_CN
        */
        protected _pass: number; 

        /**
        * @language zh_CN
        * constructor
        */
        constructor() {
            ///this.camera3D = camera3D;
        }

        /**
        * @public
        * @language zh_CN
        * 渲染器渲染的通道名
        * @classdesc
        */
        public set pass(value: PassType) {
            this._pass = value;
        }

        /**
        * @public
        * @language zh_CN
        * 渲染器渲染的通道名
        * @classdesc
        */
        public get pass(): PassType {
            return this._pass;
        }
               
        public setRenderToTexture(width: number, height: number, format: FrameBufferFormat = FrameBufferFormat.UNSIGNED_BYTE_RGB) {
            if (this.renderTexture) this.renderTexture.dispose();
            this.renderTexture = new RenderTexture(width, height, format);
            //this.renderTexture.

        }

        //camera: Camera3D, backViewPort: Rectangle = null, shadow:boolean = false
        /**
        * @language zh_CN
        * 每帧渲染
        * @param time 当前时间
        * @param delay 每帧间隔时间
        * @param context3D 设备上下文
        * @param collect 渲染对象收集器
        * @param camera 渲染时的相机
        */
        public draw(time: number, delay: number, context3D: Context3DProxy, collect: CollectBase, backViewPort: Rectangle,renderQuen:RenderQuen, posList: any = null) {
        }
    }
} 