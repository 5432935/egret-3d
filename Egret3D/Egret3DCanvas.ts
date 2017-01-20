module egret3d {

    /**
    * @private
    * @language zh_CN
    * 注册GUI使用的Texture
    * GUI 使用的贴图只能是公用型的材质,为了提高渲染效率，减少提交次数，gui使用的材质均需要pack起来进行注册
    * @version Egret 3.0
    * @platform Web,Native
    */
    export var registGUITexture = function (texture: Texture) {
        texture.upload(Egret3DCanvas.context3DProxy);
        for (const v of Egret3DCanvas._instance.view3Ds) {
            v.getGUIStage().registerTexture(texture);
        }
    }

    export let contextForEgret = {
        onStart: function (egret2dContext) {
            egret2dContext.setAutoClear(false);
        },

        onRender: function (egret2dContext) {
            egret2dContext.save();
            Egret3DCanvas._instance.render();
            egret2dContext.restore();
        },

        onStop: function () {

        },

        onResize: function() {
            Egret3DCanvas._instance.resizeBlend2D();
        }
    }

    // 切换prgram脏标记
    // 用于完成2D渲染后强制标脏
    export let proDirty:boolean = true;

    /**
    * @class egret3d.Egret3DCanvas
    * @classdesc
    * 3dCanvas 是一个3d渲染画布 它继承EventDispatcher 可以监听部分事件。
    * 如：Event3D.ENTER_FRAME 每帧响应回调事件
    * 一个3d渲染画布里面有多个view3d ，
    * 多个view3d进行渲染
    * @includeExample Egret3DCanvas.ts
    * @see egret3d.EventDispatcher
    * @see egret3d.View3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Egret3DCanvas extends EventDispatcher {

        /**
        * @private
        */
        static _instance: Egret3DCanvas;

        /**
        * @private
        */
        static context3DProxy: Context3DProxy;
                    
        /**
        * @private
        */
        private canvas3DRectangle: Rectangle = new Rectangle();

        private canvas: HTMLCanvasElement;

        private _view3DS: Array<View3D> = new Array<View3D>();
        private sizeDiry: boolean = true;


        private _enterFrameEvent3D: Event3D;

        protected _time: number = 0;
        protected _delay: number = 0;
        protected _renderer: number = 0;
        protected _timeDate: Date = null;
        protected _envetManager: EventManager;

        protected static _canvas2D: HTMLCanvasElement;
        protected static _ctx2D: CanvasRenderingContext2D;

        /**
        * @private
        */
        public static Performance_GPU: number = 0;//优：5.0 中：15
        /**
        * @private
        */
        public static Performance_CPU: number = 0;//优：0.5 中：3
       /**
       * @private
       */
        public static Performance_Enable: boolean = false;
        

        /**
        * @language zh_CN
        * Egret3DCanvas X 偏移
        * @version Egret 3.0
        * @platform Web,Native
        */
        public offsetX: number = 0;

        /**
        * @language zh_CN
        * Egret3DCanvas Y 偏移
        * @version Egret 3.0
        * @platform Web,Native
        */
        public offsetY: number = 0;

        /**
        * @language zh_CN
        * 渲染之后的回调
        * @version Egret 3.0
        * @platform Web,Native
        */
        public afterRender: Function;

        protected _start: boolean = false;

        protected blend2D:boolean = false;

        protected stage2D;
        /**
        * @language zh_CN
        * 构造一个Egret3DCanvas对象
        * @param stage2D 从外部注入stage2D，可选
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(stage2D?) {
            super();

            if (Egret3DCanvas._instance)
                throw new Error("不能重复实例化这个类!");
            Egret3DCanvas._instance = this;

            ShaderUtil.instance.load();
            this._envetManager = new EventManager(this);

            this.stage2D = stage2D;
            this.blend2D = !!stage2D;
            if(this.blend2D) {
                this.canvas = stage2D.$screen.canvas;
            } else {
                this.canvas = document.createElement("canvas");
                this.canvas.style.position = "absolute";
                this.canvas.style.zIndex = "-1";

                // this.canvas.style.transform = "rotate(90deg)";
                // this.canvas.style["-ms-transform"] = "rotate(90deg)";
                // this.canvas.style["-moz-transform"] = "rotate(90deg)";
                // this.canvas.style["-webkit-transform"] = "rotate(90deg)";
                // this.canvas.style["-o-transform"] = "rotate(90deg)" ;

                if (document.getElementsByClassName("egret-player").length > 0) {
                    document.getElementsByClassName("egret-player")[0].appendChild(this.canvas);
                }
                else {
                    document.body.appendChild(this.canvas);
                
                }

                this.canvas.id = "egret3D";
            }
            
            this.canvas.oncontextmenu = function () {
                return false;
            };

            Egret3DCanvas.context3DProxy = new egret3d.Context3DProxy();

            Context3DProxy.gl = <WebGLRenderingContext>this.canvas.getContext("webgl");

            if (!Context3DProxy.gl)
                Context3DProxy.gl = <WebGLRenderingContext>this.canvas.getContext("experimental-webgl");


            if (!Context3DProxy.gl)
                alert("you drivers not suport webgl");
            //getExtension
            //this.getExtension("WEBGL_draw_buffers"); 
            //this.getExtension("OES_element_index_uint"); 
            //this.getExtension("OES_texture_float"); 
            //this.getExtension("OES_texture_half_float"); 
            //this.getExtension("OES_texture_half_float_linear"); 
            //this.getExtension("WEBGL_depth_texture");
            //this.getExtension("WEBKIT_WEBGL_depth_texture");
            //this.getExtension("MOZ_WEBGL_depth_texture");

            this.create2dContext();

            Egret3DCanvas.context3DProxy.register();
            console.log("this.context3D ==>", Context3DProxy.gl);

            Input.canvas = this;
            if(this.blend2D) {
                Input["instance"].init(this.canvas);
                
                this.resizeBlend2D();
            }
            this.initEvent();
        }

        private getExtension(name: string):any {
            var ext = Context3DProxy.gl.getExtension(name);
            if (!ext) {
                alert("you drivers not suport " + name );
            }
            return ext;
        }

        private initEvent() {
            this._enterFrameEvent3D = new Event3D(Event3D.ENTER_FRAME);
            this._enterFrameEvent3D.target = this;

           
        }


        private create2dContext(): void {
            Egret3DCanvas._canvas2D = document.createElement("canvas");
            Egret3DCanvas._canvas2D.hidden = true;
            Egret3DCanvas._ctx2D = Egret3DCanvas._canvas2D.getContext("2d");
        }

         /**
        * @language zh_CN
        * 获得一张图片的像素值
        * @param imageElement图片数据
        * @param offsetX x方向偏移
        * @param offsetY y方向偏移
        * @param width 获取像素宽度
        * @param height 获取像素高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static draw2DImage(imageElement:HTMLImageElement, offsetX:number = 0, offsetY:number = 0, width:number = 1, height:number = 1): ImageData {
            document.body.appendChild(this._canvas2D);
            this._canvas2D.width = imageElement.width;
            this._canvas2D.height = imageElement.height;
            this._ctx2D.drawImage(imageElement, offsetX, offsetX, width, height);
            var imageData:ImageData = this._ctx2D.getImageData(0, 0, width, height);
            document.body.removeChild(this._canvas2D);
            return imageData;
        }
        /**
        * @language zh_CN
        * 设置 Egret3DCanvas 的x坐标
        * @param x x坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set x(value: number) {
            if (this.canvas3DRectangle.x != value && !this.blend2D)
                this.resize(value, this.canvas3DRectangle.y, this.canvas3DRectangle.width, this.canvas3DRectangle.height);
        }
                                            
        /**
        * @language zh_CN
        * 获取 Egret3DCanvas 的x坐标
        * @returns number 返回x坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get x(): number {
            return this.canvas3DRectangle.x;
        }

        /**
        * @language zh_CN
        * 设置 Egret3DCanvas 的y坐标
        * @param y y坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set y(value: number) {
            if (this.canvas3DRectangle.y != value && !this.blend2D)
                this.resize(this.canvas3DRectangle.x, value, this.canvas3DRectangle.width, this.canvas3DRectangle.height);
        }
                                                    
        /**
        * @language zh_CN
        * 获取 Egret3DCanvas 的y坐标
        * @returns number 返回y坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get y(): number {
            return this.canvas3DRectangle.y;
        }
        
        /**
        * @language zh_CN
        * 设置 Egret3DCanvas 的宽度
        * @param value Egret3DCanvas 的宽度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set width(value: number) {
            if (this.canvas3DRectangle.width != value && !this.blend2D)
                this.resize(this.canvas3DRectangle.x, this.canvas3DRectangle.y, value, this.canvas3DRectangle.height);
        }
                                                            
        /**
        * @language zh_CN
        * 获取 Egret3DCanvas 的宽度
        * @returns number 返回Egret3DCanvas 的宽度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get width(): number {
            return this.canvas3DRectangle.width;
        }
                
        /**
        * @language zh_CN
        * 设置 Egret3DCanvas 的高度
        * @param value Egret3DCanvas 的高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set height(value: number) {
            if (this.canvas3DRectangle.height != value && !this.blend2D)
                this.resize(this.canvas3DRectangle.x, this.canvas3DRectangle.y, this.canvas3DRectangle.width, value);
        }
                                                                    
        /**
        * @language zh_CN
        * 获取 Egret3DCanvas 的高度
        * @returns number 返回Egret3DCanvas 的高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get height(): number {
            return this.canvas3DRectangle.height;
        }
                                                                            
        /**
        * @language zh_CN
        * 获取 Egret3DCanvas 所有的view3d
        * @returns Array<View3D> 返回Egret3DCanvas view3ds列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get view3Ds(): Array<View3D> {
            return this._view3DS;
        }
                                                                                    
        /**
        * @language zh_CN
        * Egret3DCanvas 中 增加一个view3d
        * @param view3D 增加的渲染视口
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addView3D(view3D: View3D) {
            var index: number = this._view3DS.indexOf(view3D);
            if (index == -1)
                this._view3DS.push(view3D);
        }
                                                                                            
        /**
        * @language zh_CN
        * Egret3DCanvas 中 移除一个view3d
        * @param view3D 移除的渲染视口
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeView3D(view3D: View3D) {
            var index: number = this._view3DS.indexOf(view3D);
            if (index != -1)
                this._view3DS.splice(index, 1);
        }

        /**
         * @language zh_CN
         * Egret3DCanvas 调用一次渲染
         * @version Egret 4.0
         * @platform Web,Native
         */
        public render() {
            if(!this.blend2D) {
                return;
            }
            // 设置3D上下文
            // Egret3DCanvas.context3DProxy.enableBlend();
            // Egret3DCanvas.context3DProxy.enableCullFace();
            
            // Context3DProxy.gl.enable(Context3DProxy.gl.CULL_FACE);
            // Context3DProxy.gl.enable(Context3DProxy.gl.SCISSOR_TEST);
            var gl = Context3DProxy.gl;
            // Context3DProxy.gl.bindFramebuffer(Context3DProxy.gl.FRAMEBUFFER, null);
            gl.enable(gl.DEPTH_TEST);
            // Egret3DCanvas.context3DProxy.setRenderToBackBuffer();

            // 为3d的buffer以及着色器标脏
            proDirty = true;

            // 渲染
            this._timeDate = new Date();
            this._delay = this._timeDate.getTime() - this._time;
            this._time = this._timeDate.getTime();

            this._enterFrameEvent3D.time = this._time;
            this._enterFrameEvent3D.delay = this._delay;
            this.dispatchEvent(this._enterFrameEvent3D);

            //Context3DProxy.gl.enable(ContextConfig.BLEND);
            //Context3DProxy.gl.enable(ContextConfig.CULL_FACE);
            //Context3DProxy.gl.enable(Context3DProxy.gl.SCISSOR_TEST);

            Egret3DCanvas.context3DProxy.viewPort(this.canvas3DRectangle.x, this.canvas3DRectangle.y, this.canvas3DRectangle.width, this.canvas3DRectangle.height);
            Egret3DCanvas.context3DProxy.setScissorRectangle(this.canvas3DRectangle.x, this.canvas3DRectangle.y, this.canvas3DRectangle.width, this.canvas3DRectangle.height);

            CameraManager.instance.update(this._time, this._delay);
            for (var i: number = 0; i < this._view3DS.length; i++) {
                if (Egret3DEngine.instance.debug)
                    Egret3DState.help = new Date().getTime();
                this._view3DS[i].update(this._time, this._delay);
                if (Egret3DEngine.instance.debug)
                    Egret3DState.showDataInfo("view3D-" + i.toString() + ":" + (new Date().getTime() - Egret3DState.help) + " ms");
            }

            if (Egret3DEngine.instance.debug) {
                //this._renderer = Math.floor((new Date().getTime() - this._time) );
                Egret3DState.showTime(this._time, this._delay);
                egret3d.Egret3DState.showDataInfo("renderer: " + (new Date().getTime() - this._time).toString() + " ms");
                egret3d.Egret3DState.show();
            }

            if (this.afterRender) {
                this.afterRender();
            }    
            // 渲染end 

            // 恢复2D上下文
            // Egret3DCanvas.context3DProxy.disableCullFace();
            gl.disable(gl.CULL_FACE);
            gl.disable(gl.SCISSOR_TEST);
            gl.disable(gl.DEPTH_TEST);
            // Context3DProxy.gl.viewport(this.canvas3DRectangle.x, this.canvas3DRectangle.y, this.canvas3DRectangle.width, this.canvas3DRectangle.height);

            for (var j: number = 0; j < 8; j++) {
                if(j < 3) {
                    Context3DProxy.gl.enableVertexAttribArray(j);
                } else {
                    Context3DProxy.gl.disableVertexAttribArray(j);   
                }
               
            }

        }

        public resizeBlend2D():void {
            if(this.blend2D) {
                Input.scaleX = this.stage2D.$screen["webTouchHandler"].scaleX;
                Input.scaleY = this.stage2D.$screen["webTouchHandler"].scaleY;

                this.resize(0, 0, this.canvas.width, this.canvas.height);

                var bouding = this.canvas.getBoundingClientRect();
                this.offsetX = -bouding.left;
                this.offsetY = -bouding.top;
            }
        }

        /**
        * @language zh_CN
        * Egret3DCanvas 开始启动
        * @version Egret 3.0
        * @platform Web,Native
        */
        public start() {
            if(this.blend2D) {
                return;
            }
            this._start = true;
            this.update(0);

            Egret3DCanvas.context3DProxy.enableBlend();
            Egret3DCanvas.context3DProxy.enableCullFace();
            Context3DProxy.gl.enable(Context3DProxy.gl.SCISSOR_TEST);

            //Context3DProxy.gl.enableVertexAttribArray(0);
            //Context3DProxy.gl.enableVertexAttribArray(1);
            //Context3DProxy.gl.enableVertexAttribArray(2);
            //Context3DProxy.gl.enableVertexAttribArray(3);
            //Context3DProxy.gl.enableVertexAttribArray(4);
            //Context3DProxy.gl.enableVertexAttribArray(5);
            //Context3DProxy.gl.enableVertexAttribArray(6);

            //for (var j: number = 0; j < 8; j++) {
            //    Context3DProxy.gl.disableVertexAttribArray(j);
            //}
        }

        /**
        * @language zh_CN
        * Egret3DCanvas 停止启动
        * @version Egret 3.0
        * @platform Web,Native
        */
        public stop() {
            this._start = false;
        }

        
        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(delay: number) {
            if (!this._start) {
                return;
            }
            this._timeDate = new Date();
            this._delay = this._timeDate.getTime() - this._time;
            this._time = this._timeDate.getTime();

            this._enterFrameEvent3D.time = this._time;
            this._enterFrameEvent3D.delay = this._delay;
            this.dispatchEvent(this._enterFrameEvent3D);

            //Context3DProxy.gl.enable(ContextConfig.BLEND);
            //Context3DProxy.gl.enable(ContextConfig.CULL_FACE);
            //Context3DProxy.gl.enable(Context3DProxy.gl.SCISSOR_TEST);

            Egret3DCanvas.context3DProxy.viewPort(this.canvas3DRectangle.x, this.canvas3DRectangle.y, this.canvas3DRectangle.width, this.canvas3DRectangle.height);
            Egret3DCanvas.context3DProxy.setScissorRectangle(this.canvas3DRectangle.x, this.canvas3DRectangle.y, this.canvas3DRectangle.width, this.canvas3DRectangle.height);

            CameraManager.instance.update(this._time, this._delay);
            for (var i: number = 0; i < this._view3DS.length; i++) {
                if (Egret3DEngine.instance.debug)
                    Egret3DState.help = new Date().getTime();
                this._view3DS[i].update(this._time, this._delay);
                if (Egret3DEngine.instance.debug)
                    Egret3DState.showDataInfo("view3D-" + i.toString() + ":" + (new Date().getTime() - Egret3DState.help) + " ms");
            }

            if (Egret3DEngine.instance.debug) {
                //this._renderer = Math.floor((new Date().getTime() - this._time) );
                Egret3DState.showTime(this._time, this._delay);
                egret3d.Egret3DState.showDataInfo("renderer: " + (new Date().getTime() - this._time).toString() + " ms");
                egret3d.Egret3DState.show();
            }

            if (this.afterRender) {
                this.afterRender();
            }

            Context3DProxy.gl.flush();

            requestAnimationFrame((delay) => this.update(delay));
        }

        /**
        * @language zh_CN
        * 初始化,并创建显示区域的后台缓冲大小。
        * @param GPU_CONFIG
        * @param canvasRec
        * @event call
        */
        public resize(x: number, y: number, width: number, height: number) {

            //var meta: HTMLMetaElement = <HTMLMetaElement>document.getElementById("view");
            //meta.content = "width=device-width, initial-scale=" + 1.0 / 2.0 + ", maximum-scale=" + 1.0 / 2.0+ ", user-scalable=no";

            this.canvas3DRectangle.x = x;
            this.canvas3DRectangle.y = y;
            this.canvas3DRectangle.width = width;
            this.canvas3DRectangle.height = height;
            ContextConfig.canvasRectangle = this.canvas3DRectangle;

            if(!this.blend2D) {
                this.canvas.style.left = this.canvas3DRectangle.x.toString() + "px";
                this.canvas.style.top = this.canvas3DRectangle.y.toString() + "px";
                this.canvas.width = this.canvas3DRectangle.width;
                this.canvas.height = this.canvas3DRectangle.height;
            } else {
                Input.scaleX = this.stage2D.$screen["webTouchHandler"].scaleX;
                Input.scaleY = this.stage2D.$screen["webTouchHandler"].scaleY;
            }
        }
    }



}