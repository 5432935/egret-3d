var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @class egret3d.View3D
     * @classdesc
     * 渲染视图。</p>
     * view3D 是整个3D引擎的渲染视口，可以控制渲染窗口的大小，渲染的方式。</p>
     * 可以设置不同的相机 Camera3D。</p>
     * 交换不同的场景元素 Scene3D 。</p>
     * 当前的View3D中会有一个Scene3D的节点和一个Camera3D来进行场景中的渲染。
     * 整个渲染的主循环通过 update  。</p>
     * Engre3DCanvas 中的View3D列表会主动调用View3D的update,加入了Engre3DCanvas中的View3D列表后不需要使用者update
     * @includeExample View3D.ts
     * @see egret3d.Camera3D
     * @see egret3d.Scene3D
     * @see egret3d.Stage3D
     * @version Egret 3.0
     * @platform Web,Native
     */
    var View3D = (function () {
        /**
        * @language zh_CN
        * 构建一个view3d对象 如果不给摄像机 内部会创建一个默认的摄像机
        * @param x 视口的屏幕x坐标
        * @param y 视口的屏幕y坐标
        * @param width 视口的屏幕宽度
        * @param height 视口的屏幕高度
        * @param camera 摄像机 默认参数为null，会在内部新建一个CameraType.perspective 类型的Camera3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        function View3D(x, y, width, height, camera) {
            if (camera === void 0) { camera = null; }
            this.scissorRect = new egret3d.Rectangle();
            this._viewPort = new egret3d.Rectangle();
            this._backColor = new egret3d.Vector3(0.3, 0.3, 0.6, 1.0);
            this._cleanParmerts = egret3d.Context3DProxy.gl.COLOR_BUFFER_BIT | egret3d.Context3DProxy.gl.DEPTH_BUFFER_BIT;
            this._scene = new egret3d.Scene3D();
            this._huds = new Array();
            this._postList = [];
            this.sunLight = new egret3d.DirectLight(new egret3d.Vector3(0, -1, 1));
            this._entityCollect = new egret3d.EntityCollect();
            this._entityCollect.root = this._scene;
            this._camera = camera || new egret3d.Camera3D(egret3d.CameraType.perspective);
            this._camera.name = "MainCamera";
            this._scene.addChild(this._camera);
            this._renderQuen = new egret3d.RenderQuen();
            this._renderQuen.mainRender.camera = this._camera;
            this._viewPort.x = x;
            this._viewPort.y = y;
            this._viewPort.width = width;
            this._viewPort.height = height;
            this._camera.aspectRatio = width / height;
            this._camera.updateViewport(x, y, width, height);
            if (this._backImg) {
                this._backImg.x = x;
                this._backImg.y = y;
                this._backImg.width = width;
                this._backImg.height = height;
            }
            this.scissorRect.x = x;
            this.scissorRect.y = y;
            this.scissorRect.width = width;
            this.scissorRect.height = height;
            this._shadowCast = new egret3d.ShadowCast(this);
        }
        Object.defineProperty(View3D.prototype, "renderQuen", {
            /**
            * @private
            * @language zh_CN
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._renderQuen;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View3D.prototype, "shadowCast", {
            /**
            * @language zh_CN
            * 获取控制阴影实例对象
            * @returns ShadowCast 控制阴影实例对象
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._shadowCast;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View3D.prototype, "post", {
            /**
            * @private
            * @language zh_CN
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (list) {
                this._postList = list;
                if (list.length > 0) {
                    this._postProcessing = this._postProcessing || new egret3d.PostProcessing(this._renderQuen);
                    this._postHUD = this._postHUD || new egret3d.HUD(0, 0, 512, 512);
                    this._postHUD.fsShader = "hud_H_fs";
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 设置是否清除背景缓冲颜色 和 深度
        * @param cleanColor 是否清除背景缓冲颜色
        * @param cleanDepth 是否清除背景缓冲深度
        * @version Egret 3.0
        * @platform Web,Native
        */
        View3D.prototype.blender = function (cleanColor, cleanDepth) {
            this._cleanParmerts = (cleanColor ? egret3d.Context3DProxy.gl.COLOR_BUFFER_BIT : 0) | (cleanDepth ? egret3d.Context3DProxy.gl.DEPTH_BUFFER_BIT : 0);
        };
        Object.defineProperty(View3D.prototype, "backColor", {
            /**
            * @language zh_CN
            * 获取view3d背景颜色
            * @returns number 颜色值 a r g b
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return (this._backColor.w * 255 << 24) | (this._backColor.x * 255 << 16) | (this._backColor.y * 255 << 8) | (this._backColor.z * 255);
            },
            /**
            * @language zh_CN
            * 设置view3d背景颜色
            * @param value  颜色值 a r g b
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._backColor.w = (value >> 24 & 0xff) / 255;
                this._backColor.x = (value >> 16 & 0xff) / 255;
                this._backColor.y = (value >> 8 & 0xff) / 255;
                this._backColor.z = (value & 0xff) / 255;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View3D.prototype, "backImage", {
            /**
            * @language zh_CN
            * 获取view3d背景贴图
            * @returns ITexture 背景贴图
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._backImg.diffuseTexture;
            },
            /**
            * @language zh_CN
            * 设置view3d背景贴图
            * @param tex 背景贴图
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (tex) {
                if (tex) {
                    this._backImg = this._backImg || new egret3d.HUD();
                    this._backImg.diffuseTexture = tex;
                    this._backImg.x = this.x;
                    this._backImg.y = this.y;
                    this._backImg.width = this.width;
                    this._backImg.height = this.height;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View3D.prototype, "camera3D", {
            /**
            * @language zh_CN
            * 获取View3d中的渲染摄像机
            * @returns Camera3D 当前View3D的摄像机
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._camera;
            },
            /**
            * @language zh_CN
            * 设置View3d中的渲染摄像机
            * @param value 当前View3D的摄像机
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._camera = value;
                this._camera.aspectRatio = this._viewPort.width / this._viewPort.height;
                this._camera.updateViewport(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);
                if (this._quadStage) {
                    this._quadStage.changeCamera();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View3D.prototype, "scene", {
            /**
            * @language zh_CN
            * 获取View3d中的场景对象
            * @returns Scene3D 场景对象
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._scene;
            },
            /**
            * @language zh_CN
            * 设置View3d中的场景对象
            * 当前scene 会被替换  你需要你原来的主摄像机加入当前场景中
            * @param sc 当前View3D的场景对象
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (sc) {
                this._scene = sc;
                this._entityCollect.root = this._scene;
                if (this.camera3D.parent) {
                    this.addChild3D(this._camera);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View3D.prototype, "x", {
            /**
            * @language zh_CN
            * 获得当前视口的屏幕x坐标
            * @returns number 视口的屏幕x坐标
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._viewPort.x;
            },
            /**
            * @language zh_CN
            * 设置当前视口的屏幕x坐标
            * @param x 视口的屏幕x坐标
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._viewPort.x = value; // * window.devicePixelRatio;
                this._camera.updateViewport(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);
                if (this._backImg) {
                    this._backImg.x = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View3D.prototype, "y", {
            /**
            * @language zh_CN
            * 获得当前视口的屏幕y坐标
            * @returns number 视口的屏幕y坐标
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._viewPort.y;
            },
            /**
            * @language zh_CN
            * 设置当前视口的屏幕y坐标
            * @param y 视口的屏幕y坐标
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._viewPort.y = value; //* window.devicePixelRatio ;
                this._camera.updateViewport(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);
                if (this._backImg) {
                    this._backImg.y = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View3D.prototype, "width", {
            /**
            * @language zh_CN
            * 获取视口的屏幕宽度
            * @returns number 视口的屏幕宽度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._viewPort.width;
            },
            /**
            * @language zh_CN
            * 设置视口的屏幕宽度
            * @param width 视口的屏幕宽度
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._viewPort.width = value; // * window.devicePixelRatio ;
                this._camera.aspectRatio = this._viewPort.width / this._viewPort.height;
                this._camera.updateViewport(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);
                if (this._backImg) {
                    this._backImg.width = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View3D.prototype, "height", {
            /**
            * @language zh_CN
            * 获取视口的屏幕高度
            * @returns number 视口的屏幕高度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._viewPort.height;
            },
            /**
            * @language zh_CN
            * 设置视口的屏幕高度
            * @param width 视口的屏幕高度
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._viewPort.height = value; //* window.devicePixelRatio;
                this._camera.aspectRatio = this._viewPort.width / this._viewPort.height;
                this._camera.updateViewport(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);
                if (this._backImg) {
                    this._backImg.height = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View3D.prototype, "viewPort", {
            /**
            * @language zh_CN
            * 获取视口数据 x y width height
            * @returns Rectangle 视口数据
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._viewPort;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View3D.prototype, "entityCollect", {
            /**
            * @private
            * @language zh_CN
            * 获取View3D的数据收集对象
            * @returns EntityCollect 数据收集对象
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._entityCollect;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @private
        * @language zh_CN
        * 获取gui stage
        * @returns QuadStage
        * @version Egret 3.0
        * @platform Web,Native
        */
        View3D.prototype.getGUIStage = function () {
            if (!this._quadStage) {
                this._quadStage = new egret3d.QuadStage(this);
            }
            return this._quadStage;
        };
        /**
        * @language zh_CN
        * 添加一个gui对象
        * @param displayObject displayObject显示对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        View3D.prototype.addGUI = function (displayObject) {
            if (!this._quadStage) {
                this._quadStage = new egret3d.QuadStage(this);
            }
            this._quadStage.addChild(displayObject);
        };
        /**
        * @language zh_CN
        * 从场景根节点中移除一个gui quad对象
        * @param displayObject displayObject显示对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        View3D.prototype.removeGUI = function (displayObject) {
            this._quadStage.removeChild(displayObject);
        };
        /**
        * @language zh_CN
        * 添加一个Object3D对象进场景根节点
        * @param child3d Object3D需要添加的对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        View3D.prototype.addChild3D = function (child3d) {
            this._scene.addChild(child3d);
        };
        /**
        * @language zh_CN
        * 从场景根节点中移除一个Object3D对象
        * @param child3d 需要移除的Object3D对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        View3D.prototype.removeChild3D = function (child3d) {
            this._scene.removeChild(child3d);
        };
        /**
        * @language zh_CN
        * 检测x y 是否在当前视口内
        * @param x  x 坐标。
        * @param y  y 坐标。
        */
        View3D.prototype.inView3D = function (x, y) {
            return this._viewPort.inner(x, y);
        };
        /**
        * @language zh_CN
        * 添加 HUD 到渲染列表中
        * @param hud 需要增加的HUD
        * @version Egret 3.0
        * @platform Web,Native
        */
        View3D.prototype.addHUD = function (hud) {
            if (this._huds.indexOf(hud) == -1) {
                hud.viewPort = this._viewPort;
                this._huds.push(hud);
            }
        };
        /**
        * @language zh_CN
        * 查找HUD
        * @param name hud 名字
        * @version Egret 3.0
        * @platform Web,Native
        */
        View3D.prototype.findHud = function (name) {
            for (var i = 0; i < this._huds.length; ++i) {
                if (this._huds[i].name == name) {
                    return this._huds[i];
                }
            }
            return null;
        };
        /**
        * @language zh_CN
        * 在渲染列表中删除一个HUD
        * @param hud 需要删除的HUD
        * @version Egret 3.0
        * @platform Web,Native
        */
        View3D.prototype.delHUD = function (hud) {
            var index = this._huds.indexOf(hud);
            if (index >= 0 && index < this._huds.length) {
                this._huds.splice(index, 1);
            }
        };
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        View3D.prototype.update = function (time, delay) {
            if (egret3d.Egret3DEngine.instance.debug) {
                egret3d.Egret3DEngine.instance.performance.startCounter("updateObject3D", 60);
            }
            this.updateObject3D(this._scene, time, delay);
            if (egret3d.Egret3DEngine.instance.debug) {
                egret3d.Egret3DEngine.instance.performance.endCounter("updateObject3D");
            }
            egret3d.Stage3D.context3DProxy.viewPort(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);
            egret3d.Stage3D.context3DProxy.setScissorRectangle(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);
            if (egret3d.Egret3DEngine.instance.debug) {
                egret3d.Egret3DEngine.instance.performance.startCounter("entityCollect", 60);
            }
            //收集器做物体检测,分类
            this._entityCollect.update(this._camera);
            //检测阴影是否存在接收者，如果有就需要渲染阴影，没有就暂停
            this._shadowCast.shadowRender.enabled = false;
            if (this._entityCollect.numberAcceptShadow > 0) {
                this._shadowCast.shadowRender.enabled = true;
                this._shadowCast.update(this._entityCollect, time, delay);
            }
            if (egret3d.Egret3DEngine.instance.debug) {
                egret3d.Egret3DEngine.instance.performance.endCounter("entityCollect");
            }
            // background
            if (this._cleanParmerts & egret3d.Context3DProxy.gl.COLOR_BUFFER_BIT) {
                egret3d.Stage3D.context3DProxy.clearColor(this._backColor.x, this._backColor.y, this._backColor.z, this._backColor.w);
            }
            egret3d.Stage3D.context3DProxy.clear(this._cleanParmerts);
            if (this._backImg) {
                this._backImg.draw(egret3d.Stage3D.context3DProxy);
            }
            // render quen
            if (egret3d.Egret3DEngine.instance.debug) {
                egret3d.Egret3DEngine.instance.performance.startCounter("draw", 60);
            }
            this._renderQuen.mainRender.camera = this.camera3D;
            this._renderQuen.draw(time, delay, egret3d.Stage3D.context3DProxy, this._entityCollect, this._viewPort);
            if (egret3d.Egret3DEngine.instance.debug) {
                egret3d.Egret3DEngine.instance.performance.endCounter("draw");
            }
            // post processing
            if (this._postList.length > 0) {
                if (egret3d.Egret3DEngine.instance.debug) {
                    egret3d.Egret3DEngine.instance.performance.startCounter("post", 60);
                }
                this._postProcessing.postArray = this._postList;
                this._postProcessing.draw(time, delay, egret3d.Stage3D.context3DProxy, this._entityCollect, this.camera3D, this._viewPort);
                if (egret3d.Egret3DEngine.instance.debug) {
                    egret3d.Egret3DEngine.instance.performance.endCounter("post");
                }
            }
            // hud
            for (var i = 0; i < this._huds.length; ++i) {
                this._huds[i].draw(egret3d.Stage3D.context3DProxy);
            }
            // quad
            if (this._quadStage) {
                if (egret3d.Egret3DEngine.instance.debug) {
                    egret3d.Egret3DEngine.instance.performance.startCounter("GUI", 60);
                }
                this._quadStage.update(time, delay, egret3d.Stage3D.context3DProxy, this);
                if (egret3d.Egret3DEngine.instance.debug) {
                    egret3d.Egret3DEngine.instance.performance.endCounter("GUI");
                }
            }
        };
        View3D.prototype.updateObject3D = function (object3d, time, delay) {
            if (object3d && object3d.visible) {
                object3d.update(time, delay, this.camera3D);
                for (var i = 0; i < object3d.childs.length; ++i) {
                    this.updateObject3D(object3d.childs[i], time, delay);
                }
            }
        };
        return View3D;
    }());
    egret3d.View3D = View3D;
    __reflect(View3D.prototype, "egret3d.View3D");
})(egret3d || (egret3d = {}));
