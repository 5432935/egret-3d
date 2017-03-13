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
    * @language zh_CN
    * @class egret3d.CameraType
    * @classdesc
    * 摄像机类型</p>
    * 不同的摄像机类型，会产生不同的渲染视觉效果。</p>
    * 透视投影 是从某个投射中心将物体投射到单一投影面上所得到的图形。</p>
    * 正交投影 投影线垂直于投影面的投影。</p>
    * orthogonal 和 orthogonalToCenter都是正交投影，只是使用不同的方式创建</p>
    * @version Egret 3.0
    * @platform Web,Native
    */
    var CameraType;
    (function (CameraType) {
        /**
        * @language zh_CN
        * 透视投影
        * @version Egret 3.0
        * @platform Web,Native
        */
        CameraType[CameraType["perspective"] = 0] = "perspective";
        /**
        * @language zh_CN
        * 正交投影
        * @see egret3d.Matrix4.ortho
        * @version Egret 3.0
        * @platform Web,Native
        */
        CameraType[CameraType["orthogonal"] = 1] = "orthogonal";
        /**
        * @language zh_CN
        * 正交投影
        * @see egret3d.Matrix4.orthoOffCenter
        * @version Egret 3.0
        * @platform Web,Native
        */
        CameraType[CameraType["orthogonalToCenter"] = 2] = "orthogonalToCenter";
        ///**
        //* VR投影
        //* @version Egret 3.0
        //* @platform Web,Native
        //*/
        //VR
    })(CameraType = egret3d.CameraType || (egret3d.CameraType = {}));
    ;
    /**
    * @class egret3d.Camera3D
    * @classdesc
    * 相机数据处理，生成3D摄相机。</p>
    * 渲染场景从摄像机视点到缓冲区。</p>
    * 相机分为透视摄像机、正交摄像机。</p>
    * 默认相机朝向是(0, 0, 1) 头朝向是(0, 1, 0)
    *
    * @see egret3d.Matrix4
    * @see egret3d.Object3D
    *
    * @includeExample camera/Camera3D.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Camera3D = (function (_super) {
        __extends(Camera3D, _super);
        /**
        * @language zh_CN
        * constructor
        * @param cameraType 相机类型 默认为 CameraType.perspective 透视相机
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Camera3D(cameraType) {
            if (cameraType === void 0) { cameraType = CameraType.perspective; }
            var _this = _super.call(this) || this;
            /**
            * @language zh_CN
            * 相机投影矩阵
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.projectMatrix = new egret3d.Matrix4();
            /**
            * @private
            * @language zh_CN
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this._orthProjectMatrix = new egret3d.Matrix4();
            _this._viewPort = new egret3d.Rectangle();
            _this._scissorRect = new egret3d.Rectangle();
            _this._aspectRatio = 1.0;
            _this._fovY = 45.0;
            _this._near = 1;
            _this._far = 10000.0;
            _this.temp = new egret3d.Matrix4();
            _this._lookAtPosition = new egret3d.Vector3();
            _this._up = new egret3d.Vector3(0, 1, 0);
            _this._cameraType = 0;
            _this._cameraMatrixChange = false;
            _this._viewMatrix = new egret3d.Matrix4();
            _this._tempQuat = new egret3d.Quaternion();
            _this._normalMatrix = new egret3d.Matrix4();
            _this._unprojection = new egret3d.Matrix4();
            _this._animation = [];
            _this.orthProjectChange = true;
            _this._mat = new egret3d.Matrix4();
            _this._maxBest = false;
            _this._maxBestPoint = new egret3d.Point();
            _this._angleVector = new egret3d.Vector3();
            /*
            * @private
            */
            _this.billboardX = new egret3d.Matrix4();
            /*
            * @private
            */
            _this.billboardY = new egret3d.Matrix4();
            /*
            * @private
            */
            _this.billboardZ = new egret3d.Matrix4();
            /*
            * @private
            */
            _this.billboardXYZ = new egret3d.Matrix4();
            _this.raw = new Float32Array(16);
            _this.v = new egret3d.Vector3();
            _this.p = new egret3d.Vector3();
            _this.frustum = new egret3d.Frustum(_this);
            _this._orthProjectMatrix.ortho(_this._viewPort.width, _this._viewPort.height, _this._near, _this._far);
            _this.cameraType = cameraType;
            _this._viewMatrix.identity();
            return _this;
        }
        Object.defineProperty(Camera3D.prototype, "cameraType", {
            /**
            * @language zh_CN
            * 获取相机类型
            * @returns CameraType 相机类型
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._cameraType;
            },
            /**
             * @language zh_CN
             * 设置相机类型
             * @param cameraType 相机类型
             * @version Egret 3.0
             * @platform Web,Native
             */
            set: function (cameraType) {
                this._cameraType = cameraType;
                switch (cameraType) {
                    case CameraType.orthogonal:
                        this.projectMatrix.ortho(this._viewPort.width, this._viewPort.height, this._near, this._far);
                        break;
                    case CameraType.orthogonalToCenter:
                        this.projectMatrix.orthoOffCenter(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height, this._near, this._far);
                        break;
                    case CameraType.perspective:
                        this.projectMatrix.perspective(this._fovY, this._aspectRatio, this._near, this._far);
                        break;
                }
                this._orthProjectMatrix.ortho(this._viewPort.width, this._viewPort.height, this._near, this._far);
                this.frustum.updateFrustum();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera3D.prototype, "maxWidthAndHeight", {
            get: function () {
                if (!this._maxBest) {
                    this._maxBest = true;
                    this._maxBestPoint.x = egret3d.sizeUtil.getBestPowerOf2(this.viewPort.width);
                    this._maxBestPoint.y = egret3d.sizeUtil.getBestPowerOf2(this.viewPort.height);
                }
                return this._maxBestPoint;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera3D.prototype, "aspectRatio", {
            /**
            * @language zh_CN
            * 返回相机横纵比
            *
            * @returns number 横纵比
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._aspectRatio;
            },
            /**
            * @private
            * @language zh_CN
            * 打开VR相机
            * @param cameraType 相机类型
            * @param vrType VR类型
            * @version Egret 3.0
            * @platform Web,Native
            */
            //public tap(cameraType: CameraType, vrType: VRType = null) {
            //    if (cameraType == CameraType.VR) {
            //        this.eyeMatrix.update(this);
            //        this.orthProjectChange = true;
            //        if (vrType == VRType.left) {
            //            this.viewMatrix.copyFrom(this.eyeMatrix.leftEyeMatrix);
            //        } else if (vrType == VRType.right) {
            //            this.viewMatrix.copyFrom(this.eyeMatrix.rightEyeMatrix);
            //        }
            //        this.viewMatrix.invert();
            //    }
            //}
            /**
            * @language zh_CN
            * 设置相机横纵比
            *
            * @param value 横纵比
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._aspectRatio != value) {
                    this._aspectRatio = value;
                    this.cameraType = this._cameraType;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera3D.prototype, "fieldOfView", {
            /**
            * @language zh_CN
            * 返回相机fovY
            *
            * @returns number fovY
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._fovY;
            },
            /**
            * @language zh_CN
            * 设置相机fovY
            *
            * @param value fovY
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._fovY != value) {
                    this._fovY = value;
                    this.cameraType = this._cameraType;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera3D.prototype, "near", {
            /**
            * @language zh_CN
            * 返回相机近截面
            *
            * @returns 近截面
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._near;
            },
            /**
            * @language zh_CN
            * 设置相机近截面
            *
            * @param value 近截面
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._near != value) {
                    this._near = value;
                    this.cameraType = this._cameraType;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera3D.prototype, "far", {
            /**
            * @language zh_CN
            * 返回相机远截面
            *
            * @returns 远截面
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._far;
            },
            /**
            * @language zh_CN
            * 设置相机远截面
            *
            * @param value 远截面
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._far != value) {
                    this._far = value;
                    this.cameraType = this._cameraType;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera3D.prototype, "viewPort", {
            /**
            * @language zh_CN
            * 返回viewPort
            *
            * @returns Rectangle
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._viewPort;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera3D.prototype, "viewProjectionMatrix", {
            /**
            * @language zh_CN
            * 返回相机视图投影矩阵
            *
            * @returns 视图投影矩阵
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                this.temp.copyFrom(this.viewMatrix);
                this.temp.multiply(this.projectMatrix);
                return this.temp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera3D.prototype, "orthProjectionMatrix", {
            get: function () {
                //this.updataOrth(this._orthProjectMatrix);
                if (this.orthProjectChange) {
                    this.orthProjectChange = false;
                    this._orthProjectMatrix.ortho(this._viewPort.width, this._viewPort.height, this._near, this._far);
                }
                return this._orthProjectMatrix;
            },
            enumerable: true,
            configurable: true
        });
        ///**
        //* @language zh_CN
        //* 视图noormal矩阵
        //* normal 矩阵用来纠正透视相机影响视图变形，所影响的法线轴变形，一般用 modeviewMatrix 的逆举证的转置矩阵。
        //* @version Egret 3.0
        //* @platform Web,Native
        //*/
        //public get normalMatrix(): Matrix4 {
        //    this._normalMatrix.copyFrom(this.viewMatrix);
        //    this._normalMatrix.multiply(this.projectMatrix);
        //    return this._normalMatrix; 
        //}
        /**
         * @private
         * @language zh_CN
         * @param x number
         * @param y number
         * @param width number
         * @param height number
         * @version Egret 3.0
         * @platform Web,Native
         */
        Camera3D.prototype.updateScissorRect = function (x, y, width, height) {
            this._scissorRect.x = x;
            this._scissorRect.y = y;
            this._scissorRect.width = width;
            this._scissorRect.height = height;
        };
        /**
        * @language zh_CN
        * 更新视口
        * @param x number
        * @param y number
        * @param width number
        * @param height number
        * @version Egret 3.0
        * @platform Web,Native
        */
        Camera3D.prototype.updateViewport = function (x, y, width, height) {
            if (x == this._viewPort.x && y == this._viewPort.y &&
                width == this._viewPort.width && height == this._viewPort.height) {
                return;
            }
            this.orthProjectChange = true;
            this._viewPort.x = x;
            this._viewPort.y = y;
            this._viewPort.width = width;
            this._viewPort.height = height;
            switch (this.cameraType) {
                case CameraType.orthogonal:
                case CameraType.orthogonalToCenter:
                    this.cameraType = this.cameraType;
                    break;
            }
        };
        /**
        * @language zh_CN
        * 当前对象对视位置 (全局坐标) (修改的是自身的全局变换)
        * @param pos 相机的位置     (全局坐标)
        * @param target 目标的位置  (全局坐标)
        * @param up 向上的方向
        * @version Egret 3.0
        * @platform Web,Native
        */
        Camera3D.prototype.lookAt = function (pos, target, up) {
            if (up === void 0) { up = egret3d.Vector3.Y_AXIS; }
            this.globalPosition = pos;
            this._lookAtPosition.copyFrom(target);
            this._up.copyFrom(up);
            this._viewMatrix.lookAt(pos, target, up);
            this._mat.copyFrom(this._viewMatrix);
            this._mat.invert();
            var prs = this._mat.decompose(egret3d.Orientation3D.QUATERNION);
            this._tempQuat.x = prs[1].x;
            this._tempQuat.y = prs[1].y;
            this._tempQuat.z = prs[1].z;
            this._tempQuat.w = prs[1].w;
            this.globalOrientation = this._tempQuat;
        };
        /**
        * @language zh_CN
        * 当前对象对视位置 (本地坐标) (修改的是自身的本地变换)
        * @param pos 相机的位置     (本地坐标)
        * @param target 目标的位置  (本地坐标)
        * @param up 向上的方向
        * @version Egret 3.0
        * @platform Web,Native
        */
        Camera3D.prototype.lookAtLocal = function (pos, target, up) {
            if (up === void 0) { up = egret3d.Vector3.Y_AXIS; }
            this.position = pos;
            this._lookAtPosition.copyFrom(target);
            this._up.copyFrom(up);
            this._viewMatrix.lookAt(pos, target, up);
            this._mat.copyFrom(this._viewMatrix);
            this._mat.invert();
            var prs = this._mat.decompose(egret3d.Orientation3D.QUATERNION);
            this._tempQuat.x = prs[1].x;
            this._tempQuat.y = prs[1].y;
            this._tempQuat.z = prs[1].z;
            this._tempQuat.w = prs[1].w;
            this.orientation = this._tempQuat;
        };
        Camera3D.prototype.onMakeTransform = function () {
            egret3d.Vector3.HELP_1.setTo(1, 1, 1, 1);
            egret3d.Vector3.HELP_0.setTo(0, 0, 0, 1);
            this._modelMatrix3D.makeTransform(this._pos, egret3d.Vector3.HELP_1, this._orientation);
            this._modelMatrix3D.makeTransform(this._globalPos, egret3d.Vector3.HELP_1, this._globalOrientation);
            egret3d.MathUtil.calcDegree(this._globalOrientation, this._angleVector);
            //this.billboardX.identity();
            //this.billboardX.appendRotation(this._angleVector.x, Vector3.X_AXIS);
            this.billboardY.identity();
            this.billboardY.createByRotation(this._angleVector.y, egret3d.Vector3.Y_AXIS);
            //this.billboardZ.identity();
            //this.billboardZ.appendRotation(this._angleVector.z, Vector3.Z_AXIS);
            this.billboardXYZ.makeTransform(egret3d.Vector3.HELP_0, egret3d.Vector3.HELP_1, this._globalOrientation);
        };
        Camera3D.prototype.onUpdateTransform = function () {
            this._viewMatrix.copyFrom(this._modelMatrix3D);
            this._viewMatrix.invert();
            this.frustum.update();
        };
        Object.defineProperty(Camera3D.prototype, "viewMatrix", {
            /**
             * @language zh_CN
             *
             * 相机视图矩阵
             * @version Egret 3.0
             * @platform Web,Native
             */
            get: function () {
                if (this._transformChange) {
                    this.modelMatrix;
                }
                return this._viewMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera3D.prototype, "lookAtPosition", {
            /**
             * @language zh_CN
             *
             * 相机目标点
             * @version Egret 3.0
             * @platform Web,Native
             */
            get: function () {
                return this._lookAtPosition;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @private
        * @language zh_CN
        * 更新正交矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        Camera3D.prototype.updataOrth = function (target) {
            var _projectionHeight = 2000;
            var _yMax = _projectionHeight * .5;
            var _xMax = _yMax * this._aspectRatio;
            var left, right, top, bottom;
            ///return 
            if (this._scissorRect.x == 0 && this._scissorRect.y == 0 && this._scissorRect.width == this._viewPort.width && this._scissorRect.height == this._viewPort.height) {
                /// assume symmetric frustum
                left = -_xMax;
                right = _xMax;
                top = -_yMax;
                bottom = _yMax;
                this.raw[0] = 2 / (_projectionHeight * this._aspectRatio);
                this.raw[5] = 2 / _projectionHeight;
                this.raw[10] = 1 / (this._far - this._near);
                this.raw[14] = this._near / (this._near - this._far);
                this.raw[1] = this.raw[2] = this.raw[3] = this.raw[4] =
                    this.raw[6] = this.raw[7] = this.raw[8] = this.raw[9] =
                        this.raw[11] = this.raw[12] = this.raw[13] = 0;
                this.raw[15] = 1;
            }
            else {
                var xWidth = _xMax * (this._viewPort.width / this._scissorRect.width);
                var yHgt = _yMax * (this._viewPort.height / this._scissorRect.height);
                var center = _xMax * (this._scissorRect.x * 2 - this._viewPort.width) / this._scissorRect.width + _xMax;
                var middle = -_yMax * (this._scissorRect.y * 2 - this._viewPort.height) / this._scissorRect.height - _yMax;
                left = center - xWidth;
                right = center + xWidth;
                top = middle - yHgt;
                bottom = middle + yHgt;
                this.raw[0] = 2 * 1 / (right - left);
                this.raw[5] = -2 * 1 / (top - bottom);
                this.raw[10] = 1 / (this._far - this._near);
                this.raw[12] = (right + left) / (right - left);
                this.raw[13] = (bottom + top) / (bottom - top);
                this.raw[14] = this._near / (this.near - this.far);
                this.raw[1] = this.raw[2] = this.raw[3] = this.raw[4] =
                    this.raw[6] = this.raw[7] = this.raw[8] = this.raw[9] = this.raw[11] = 0;
                this.raw[15] = 1;
            }
            target.copyRawDataFrom(this.raw);
        };
        /**
         * @language zh_CN
         * 检测对象是否在相机视椎体内
         * @param renderItem 需要体测的对象
         * @returns 成功返回true
         * @version Egret 3.0
         * @platform Web,Native
         */
        Camera3D.prototype.isVisibleToCamera = function (renderItem) {
            //尝试刷新modelMatrix的值，有可能changed为true
            renderItem.modelMatrix;
            this.modelMatrix;
            //添加 手动让当前单位一直处于不剔除状态
            var bool = true;
            if (renderItem.bound) {
                bool = renderItem.bound.inBound(this.frustum) || !renderItem.enableCulling;
            }
            renderItem.inFrustum = bool;
            return bool;
        };
        /**
        * @private
        * @language zh_CN
        * 增加相机动画
        * @param name 相机动画名字
        * @param ani 相机动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        Camera3D.prototype.addAnimation = function (name, ani) {
            this._animation[name] = ani;
        };
        /**
        * @private
        * @language zh_CN
        * 播放某个动画
        * 根据动画名字来播放，指定摄像机，并且控制动画是否循环播放
        * @param name 动画名
        * @param isLoop 是否循环
        * @version Egret 3.0
        * @platform Web,Native
        */
        Camera3D.prototype.play = function (name, isLoop) {
            if (isLoop === void 0) { isLoop = false; }
            if (this._animation[name]) {
                this._animation[name].bindCamera(this);
                this._animation[name].play(isLoop);
            }
        };
        /**
        * @private
        * @language zh_CN
        * 当前对象数据更新
        * @param time 当前时间
        * @param delay 每帧时间间隔
        * @param camera 当前渲染的摄相机
        * @version Egret 3.0
        * @platform Web,Native
        */
        Camera3D.prototype.update = function (time, delay, camera) {
            _super.prototype.update.call(this, time, delay, camera);
            for (var key in this._animation) {
                this._animation[key].update(time, delay);
            }
        };
        /**
        * @language zh_CN
        * 3维坐标转2维屏幕坐标
        * @param n 3维坐标
        * @param target 2维屏幕坐标 默认为null 为null会返回一个新的对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Camera3D.prototype.object3DToScreenRay = function (n, target) {
            if (target === void 0) { target = null; }
            if (!target) {
                target = new egret3d.Vector3();
            }
            this._halfw = this.viewPort.width * 0.5;
            this._halfh = this.viewPort.height * 0.5;
            target = this.viewMatrix.transformVector(n, target);
            this.project(target, target);
            target.x = this._halfw + target.x * this._halfw;
            target.y = this.viewPort.height - (this._halfh - target.y * this._halfh);
            return target;
        };
        /**
        * @language zh_CN
        * 2维屏幕坐标转3维坐标
        * @param n 2维屏幕坐标
        * @param target 3维坐标 默认为null 为null会返回一个新的对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Camera3D.prototype.ScreenRayToObject3D = function (n, target) {
            if (target === void 0) { target = null; }
            if (!target) {
                target = new egret3d.Vector3();
            }
            this._halfw = this.viewPort.width * 0.5;
            this._halfh = this.viewPort.height * 0.5;
            target.x = (n.x - this._halfw) / this._halfw;
            target.y = (this._halfh - (this.viewPort.height - n.y)) / this._halfh;
            this.unproject(target.x, target.y, n.z, target);
            this.modelMatrix.transformVector(target, target);
            return target;
        };
        Camera3D.prototype.unproject = function (nX, nY, sZ, target) {
            target.x = nX;
            target.y = -nY;
            target.z = sZ;
            target.w = 1.0;
            target.x *= sZ;
            target.y *= sZ;
            this._unprojection.copyFrom(this.projectMatrix);
            this._unprojection.invert();
            this._unprojection.transformVector(target, target);
            target.z = sZ;
            return target;
        };
        Camera3D.prototype.project = function (n, target) {
            target = this.projectMatrix.transformVector(n, target);
            target.x = target.x / target.w;
            target.y = -target.y / target.w;
            target.z = n.z;
            return target;
        };
        /**
        * @language zh_CN
        * 释放所有数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        Camera3D.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this.frustum) {
                this.frustum.dispose();
            }
            this.frustum = null;
        };
        /**
        * @language zh_CN
        * 克隆当前Camera3D
        * @returns Camera3D 克隆后的对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Camera3D.prototype.clone = function () {
            var cloneObject = new Camera3D();
            cloneObject.copy(this);
            return cloneObject;
        };
        return Camera3D;
    }(egret3d.Object3D));
    egret3d.Camera3D = Camera3D;
    __reflect(Camera3D.prototype, "egret3d.Camera3D");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Camera3D.js.map