var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @language zh_CN
    * 注册GUI使用的Texture
    * GUI 使用的贴图只能是公用型的材质,为了提高渲染效率，减少提交次数，gui使用的材质均需要pack起来进行注册
    * @version Egret 3.0
    * @platform Web,Native
    */
    egret3d.registGUITexture = function (texture) {
        texture.upload(Stage3D.context3DProxy);
        for (var _i = 0, _a = Stage3D._instance.view3Ds; _i < _a.length; _i++) {
            var v = _a[_i];
            v.getGUIStage().registerTexture(texture);
        }
    };
    /**
    * @class egret3d.Stage3D
    * @classdesc
    * 3dCanvas 是一个3d渲染画布 它继承EventDispatcher 可以监听部分事件。
    * 如：Event3D.ENTER_FRAME 每帧响应回调事件
    * 一个3d渲染画布里面有多个view3d ，
    * 多个view3d进行渲染
    * @includeExample Stage3D.ts
    * @see egret3d.EventDispatcher
    * @see egret3d.View3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Stage3D = (function (_super) {
        __extends(Stage3D, _super);
        /**
        * @language zh_CN
        * 构造一个Stage3D对象
        * @param stage2D 从外部注入stage2D，可选
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Stage3D(stage2D) {
            var _this = _super.call(this) || this;
            /**
            * @private
            */
            _this.canvas3DRectangle = new egret3d.Rectangle();
            _this._view3DS = new Array();
            _this.sizeDiry = true;
            _this._time = 0;
            _this._delay = 0;
            _this._renderer = 0;
            /**
            * @language zh_CN
            * Stage3D X 偏移
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.offsetX = 0;
            /**
            * @language zh_CN
            * Stage3D Y 偏移
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.offsetY = 0;
            _this._start = false;
            _this.blend2D = false;
            if (Stage3D._instance)
                throw new Error("不能重复实例化这个类!");
            Stage3D._instance = _this;
            egret3d.ShaderUtil.instance.load();
            _this._envetManager = new egret3d.EventManager(_this);
            _this.stage2D = stage2D;
            _this.blend2D = !!stage2D;
            if (_this.blend2D) {
                _this.canvas = stage2D.$screen.canvas;
            }
            else {
                _this.canvas = document.createElement("canvas");
                _this.canvas.style.position = "absolute";
                _this.canvas.style.zIndex = "-1";
                if (document.getElementsByClassName("egret-player").length > 0) {
                    document.getElementsByClassName("egret-player")[0].appendChild(_this.canvas);
                }
                else {
                    document.body.appendChild(_this.canvas);
                }
                _this.canvas.id = "egret3D";
            }
            _this.canvas.oncontextmenu = function () {
                return false;
            };
            Stage3D.context3DProxy = new egret3d.Context3DProxy();
            egret3d.Context3DProxy.gl = _this.canvas.getContext("webgl");
            if (!egret3d.Context3DProxy.gl)
                egret3d.Context3DProxy.gl = _this.canvas.getContext("experimental-webgl");
            if (!egret3d.Context3DProxy.gl)
                alert("you drivers not suport webgl");
            _this.create2dContext();
            Stage3D.context3DProxy.register();
            console.log("this.context3D ==>", egret3d.Context3DProxy.gl);
            egret3d.Input.canvas = _this;
            if (_this.blend2D) {
                egret3d.Input["instance"].init(_this.canvas);
                _this.resizeBlend2D();
            }
            _this.initEvent();
            return _this;
        }
        Stage3D.prototype.getExtension = function (name) {
            var ext = egret3d.Context3DProxy.gl.getExtension(name);
            if (!ext) {
                alert("you drivers not suport " + name);
            }
            return ext;
        };
        Stage3D.prototype.initEvent = function () {
            this._enterFrameEvent3D = new egret3d.Event3D(egret3d.Event3D.ENTER_FRAME);
            this._enterFrameEvent3D.target = this;
        };
        Stage3D.prototype.create2dContext = function () {
            Stage3D._canvas2D = document.createElement("canvas");
            Stage3D._canvas2D.hidden = true;
            Stage3D._ctx2D = Stage3D._canvas2D.getContext("2d");
        };
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
        Stage3D.draw2DImage = function (imageElement, offsetX, offsetY, width, height) {
            if (offsetX === void 0) { offsetX = 0; }
            if (offsetY === void 0) { offsetY = 0; }
            if (width === void 0) { width = 1; }
            if (height === void 0) { height = 1; }
            document.body.appendChild(this._canvas2D);
            this._canvas2D.width = imageElement.width;
            this._canvas2D.height = imageElement.height;
            this._ctx2D.drawImage(imageElement, offsetX, offsetX, width, height);
            var imageData = this._ctx2D.getImageData(0, 0, width, height);
            document.body.removeChild(this._canvas2D);
            return imageData;
        };
        Object.defineProperty(Stage3D.prototype, "x", {
            /**
            * @language zh_CN
            * 获取 Stage3D 的x坐标
            * @returns number 返回x坐标
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.canvas3DRectangle.x;
            },
            /**
            * @language zh_CN
            * 设置 Stage3D 的x坐标
            * @param x x坐标
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this.canvas3DRectangle.x != value && !this.blend2D)
                    this.resize(value, this.canvas3DRectangle.y, this.canvas3DRectangle.width, this.canvas3DRectangle.height);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage3D.prototype, "y", {
            /**
            * @language zh_CN
            * 获取 Stage3D 的y坐标
            * @returns number 返回y坐标
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.canvas3DRectangle.y;
            },
            /**
            * @language zh_CN
            * 设置 Stage3D 的y坐标
            * @param y y坐标
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this.canvas3DRectangle.y != value && !this.blend2D)
                    this.resize(this.canvas3DRectangle.x, value, this.canvas3DRectangle.width, this.canvas3DRectangle.height);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage3D.prototype, "width", {
            /**
            * @language zh_CN
            * 获取 Stage3D 的宽度
            * @returns number 返回Stage3D 的宽度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.canvas3DRectangle.width;
            },
            /**
            * @language zh_CN
            * 设置 Stage3D 的宽度
            * @param value Stage3D 的宽度
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this.canvas3DRectangle.width != value && !this.blend2D)
                    this.resize(this.canvas3DRectangle.x, this.canvas3DRectangle.y, value, this.canvas3DRectangle.height);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage3D.prototype, "height", {
            /**
            * @language zh_CN
            * 获取 Stage3D 的高度
            * @returns number 返回Stage3D 的高度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.canvas3DRectangle.height;
            },
            /**
            * @language zh_CN
            * 设置 Stage3D 的高度
            * @param value Stage3D 的高度
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this.canvas3DRectangle.height != value && !this.blend2D)
                    this.resize(this.canvas3DRectangle.x, this.canvas3DRectangle.y, this.canvas3DRectangle.width, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage3D.prototype, "view3Ds", {
            /**
            * @language zh_CN
            * 获取 Stage3D 所有的view3d
            * @returns Array<View3D> 返回Stage3D view3ds列表
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._view3DS;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * Stage3D 中 增加一个view3d
        * @param view3D 增加的渲染视口
        * @version Egret 3.0
        * @platform Web,Native
        */
        Stage3D.prototype.addView3D = function (view3D) {
            var index = this._view3DS.indexOf(view3D);
            if (index == -1)
                this._view3DS.push(view3D);
        };
        /**
        * @language zh_CN
        * Stage3D 中 移除一个view3d
        * @param view3D 移除的渲染视口
        * @version Egret 3.0
        * @platform Web,Native
        */
        Stage3D.prototype.removeView3D = function (view3D) {
            var index = this._view3DS.indexOf(view3D);
            if (index != -1)
                this._view3DS.splice(index, 1);
        };
        Stage3D.prototype.$render = function () {
            var now = egret3d.Egret3DEngine.instance.performance.getNow();
            // TODO 第一帧可能会有异常
            this._delay = now - this._time;
            this._time = now;
            if (egret3d.Egret3DEngine.instance.debug) {
                egret3d.Egret3DEngine.instance.performance.startCounter("renderer", 60);
            }
            // 处理 enter frame
            this._enterFrameEvent3D.time = this._time;
            this._enterFrameEvent3D.delay = this._delay;
            this.dispatchEvent(this._enterFrameEvent3D);
            // 更新views
            for (var i = 0; i < this._view3DS.length; i++) {
                if (egret3d.Egret3DEngine.instance.debug) {
                    egret3d.Egret3DEngine.instance.performance.startCounter("view3D-" + i.toString(), 60);
                    egret3d.Egret3DEngine.instance.performance.prefix = "view3D-" + i.toString() + "-";
                }
                this._view3DS[i].update(this._time, this._delay);
                if (egret3d.Egret3DEngine.instance.debug) {
                    egret3d.Egret3DEngine.instance.performance.prefix = "";
                    egret3d.Egret3DEngine.instance.performance.endCounter("view3D-" + i.toString());
                }
            }
            if (egret3d.Egret3DEngine.instance.debug) {
                egret3d.Egret3DEngine.instance.performance.updateFps();
                egret3d.Egret3DEngine.instance.performance.endCounter("renderer");
                // 这里显示更新inspector
                egret3d.Egret3DEngine.instance.inspector.show(this._delay, egret3d.Egret3DEngine.instance.performance, this);
            }
            if (this.afterRender) {
                this.afterRender();
            }
        };
        /**
         * @language zh_CN
         * Stage3D 调用一次渲染
         * @version Egret 4.0
         * @platform Web,Native
         */
        Stage3D.prototype.render = function () {
            if (!this.blend2D) {
                return;
            }
            var context3DProxy = Stage3D.context3DProxy;
            var gl = egret3d.Context3DProxy.gl;
            context3DProxy.reset();
            context3DProxy.enableDepth();
            context3DProxy.enableCullFace();
            context3DProxy.enableBlend();
            this.$render();
            // 恢复2D上下文
            context3DProxy.disableDepth();
            context3DProxy.disableCullFace();
        };
        Stage3D.prototype.resizeBlend2D = function () {
            if (this.blend2D) {
                egret3d.Input.scaleX = this.stage2D.$screen["webTouchHandler"].scaleX;
                egret3d.Input.scaleY = this.stage2D.$screen["webTouchHandler"].scaleY;
                this.resize(0, 0, this.canvas.width, this.canvas.height);
                var bouding = this.canvas.getBoundingClientRect();
                this.offsetX = -bouding.left;
                this.offsetY = -bouding.top;
            }
        };
        /**
        * @language zh_CN
        * Stage3D 开始启动
        * @version Egret 3.0
        * @platform Web,Native
        */
        Stage3D.prototype.start = function () {
            if (this.blend2D) {
                return;
            }
            this._start = true;
            this.update(0);
            Stage3D.context3DProxy.enableBlend();
            Stage3D.context3DProxy.enableCullFace();
            egret3d.Context3DProxy.gl.enable(egret3d.Context3DProxy.gl.SCISSOR_TEST);
        };
        /**
        * @language zh_CN
        * Stage3D 停止启动
        * @version Egret 3.0
        * @platform Web,Native
        */
        Stage3D.prototype.stop = function () {
            this._start = false;
        };
        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        Stage3D.prototype.update = function (delay) {
            var _this = this;
            if (!this._start) {
                return;
            }
            this.$render();
            egret3d.Context3DProxy.gl.flush();
            requestAnimationFrame(function (delay) { return _this.update(delay); });
        };
        /**
        * @language zh_CN
        * 初始化,并创建显示区域的后台缓冲大小。
        * @param GPU_CONFIG
        * @param canvasRec
        * @event call
        */
        Stage3D.prototype.resize = function (x, y, width, height) {
            //var meta: HTMLMetaElement = <HTMLMetaElement>document.getElementById("view");
            //meta.content = "width=device-width, initial-scale=" + 1.0 / 2.0 + ", maximum-scale=" + 1.0 / 2.0+ ", user-scalable=no";
            this.canvas3DRectangle.x = x;
            this.canvas3DRectangle.y = y;
            this.canvas3DRectangle.width = width;
            this.canvas3DRectangle.height = height;
            egret3d.ContextConfig.canvasRectangle = this.canvas3DRectangle;
            if (!this.blend2D) {
                this.canvas.style.left = this.canvas3DRectangle.x.toString() + "px";
                this.canvas.style.top = this.canvas3DRectangle.y.toString() + "px";
                this.canvas.width = this.canvas3DRectangle.width;
                this.canvas.height = this.canvas3DRectangle.height;
            }
            else {
                egret3d.Input.scaleX = this.stage2D.$screen["webTouchHandler"].scaleX;
                egret3d.Input.scaleY = this.stage2D.$screen["webTouchHandler"].scaleY;
            }
        };
        // custom context implement
        Stage3D.prototype.onStart = function (egret2dContext) {
            egret2dContext.setAutoClear(false);
        };
        Stage3D.prototype.onRender = function (egret2dContext) {
            egret2dContext.save();
            this.render();
            egret2dContext.restore();
        };
        Stage3D.prototype.onStop = function () {
        };
        Stage3D.prototype.onResize = function () {
            this.resizeBlend2D();
        };
        return Stage3D;
    }(egret3d.EventDispatcher));
    egret3d.Stage3D = Stage3D;
    __reflect(Stage3D.prototype, "egret3d.Stage3D");
})(egret3d || (egret3d = {}));
