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
    * @class egret3d.Object3D
    * @classdesc
    * 拣选类型，拣选时可以分为，包围盒拣选、模型拣选返回模型拣选到的位置、模型拣选返回模型拣选到的UV坐标
    * 这几种拣选方式
    * 设置鼠标拣选的类型，鼠标拣选不同的类型有不同的效果作用，还有性能
    * 需要的拣选精度越高，性能要求就越高，反之亦然
    *
    * @see egret3d.Picker
    * @version Egret 3.0
    * @platform Web,Native
    */
    var PickType;
    (function (PickType) {
        /**
        * @language zh_CN
        * 包围盒拣选
        * @version Egret 3.0
        * @platform Web,Native
        */
        PickType[PickType["BoundPick"] = 0] = "BoundPick";
        /**
        * @language zh_CN
        * 模型拣选返回模型拣选到的位置
        * @version Egret 3.0
        * @platform Web,Native
        */
        PickType[PickType["PositionPick"] = 1] = "PositionPick";
        /**
        * @language zh_CN
        * 模型拣选返回模型拣选到的UV坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        PickType[PickType["UVPick"] = 2] = "UVPick";
    })(PickType = egret3d.PickType || (egret3d.PickType = {}));
    ;
    /**
    * @language zh_CN
    * @private
    * @class egret3d.BillboardType
    * @classdesc
    * billboard类型
    * @see egret3d.Camera3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    var BillboardType;
    (function (BillboardType) {
        /**
        * @language zh_CN
        * 非billboard类型
        * @version Egret 3.0
        * @platform Web,Native
        */
        BillboardType[BillboardType["DISABLE"] = 0] = "DISABLE";
        /**
        * @language zh_CN
        * 只允许绕x轴旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        BillboardType[BillboardType["X_AXIS"] = 1] = "X_AXIS";
        /**
        * @language zh_CN
        * 只允许绕y轴旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        BillboardType[BillboardType["Y_AXIS"] = 2] = "Y_AXIS";
        /**
        * @language zh_CN
        * 只允许绕z轴旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        BillboardType[BillboardType["Z_AXIS"] = 3] = "Z_AXIS";
        /**
        * @language zh_CN
        * 标准的billboard
        * @version Egret 3.0
        * @platform Web,Native
        */
        BillboardType[BillboardType["STANDARD"] = 4] = "STANDARD";
    })(BillboardType = egret3d.BillboardType || (egret3d.BillboardType = {}));
    ;
    /**
    * @language zh_CN
    * @class egret3d.Object3D
    * @classdesc
    * 3d空间中的实体对象。
    * 场景图中的Object3D对象是一个树型结构，对象中包含了变换信息.
    * 这些变换信息应用于所有的子对象,子对象也有自己的变换信息,最终
    * 的变换信息要结合父对象的变换信息
    * 每个Object3D对象在生成时会创建一个包围盒
    *
    * @see egret3d.Vector3
    * @see egret3d.Matrix4
    * @see egret3d.Quaternion
    * @see egret3d.Bound
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Object3D = (function (_super) {
        __extends(Object3D, _super);
        /**
        * @language zh_CN
        * 如果直接实例化这个类，就会生成一个空的3D容器，可以往里添加3D显示对象，作为对象的父级，但是本身没有渲染属性。
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Object3D() {
            var _this = _super.call(this) || this;
            _this._modelMatrix3D = new egret3d.Matrix4();
            _this._localMatrix3D = new egret3d.Matrix4();
            _this._transformChange = true;
            _this._pos = new egret3d.Vector3();
            _this._rot = new egret3d.Vector3();
            _this._sca = new egret3d.Vector3(1, 1, 1);
            _this._orientation = new egret3d.Quaternion();
            _this._axis = new egret3d.Vector3();
            _this._angle = 0;
            _this._globalPos = new egret3d.Vector3();
            _this._globalRot = new egret3d.Vector3();
            _this._globalSca = new egret3d.Vector3(1, 1, 1);
            _this._globalOrientation = new egret3d.Quaternion();
            _this._qut = new egret3d.Quaternion();
            _this._vec = new egret3d.Vector3();
            _this._active = false;
            _this._isRoot = true;
            _this.inFrustum = false;
            /**
            * @language zh_CN
            * @private
            * 该对象所使用的面向相机模式，默认为关闭状态
            * @see egret3d.BillboardType
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.billboard = BillboardType.DISABLE;
            /**
            * @language zh_CN
            * @private
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.renderLayer = 0;
            /**
            * @language zh_CN
            * 当前对象名
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.name = "";
            /**
            * @language zh_CN
            * 当前对象id
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.id = 0;
            /**
            * @language zh_CN
            * 渲染层级 。</p>
            * 渲染时分组进行依次渲染 前16位表示tag,后16位表示layer。</p>
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.layer = 0x00000000;
            /**
            * @language zh_CN
            * 渲染层级分类标签
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.tag = new egret3d.Tag();
            /**
            * @language zh_CN
            * 父亲节点
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.parent = null;
            /**
            * @language zh_CN
            * 子对象列表。</p>
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.childs = new Array();
            /**
            * @language zh_CN
            * 是否控制，当摄像机被绑定摄像机动画时，这个值为false.
            * @private
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.isController = true;
            /**
            * @language zh_CN
            * 是否可见
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.visible = true;
            /**
            * @language zh_CN
            * 鼠标拣选类型。</p>
            * 设置鼠标的拣选类型，可通过 PickType来进行设置。</p>
            * 快速拣选默认使用 正方形包围盒子。</p>
            * 高精度型需要 PositionPick ， uv pick 等。</p>
            * @see egret3d.PickType
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.pickType = PickType.BoundPick;
            /**
            * @language zh_CN
            * 鼠标检测数据
            * @private
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.pickResult = new egret3d.PickResult();
            /**
            * @language zh_CN
            * 是否开启拣选检测。</p>
            * 设定这个物件是否具有 鼠标交互能力的开关。</p>
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.enablePick = false;
            /**
            * @language zh_CN
            * 是否开启检测LOD盒子，每个物体的碰撞盒子中有一个小的盒子，当开启这个盒子后，
            * 鼠标检测就是用的这个小盒子来进行检测
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.mouseChildren = false;
            /**
            * @language zh_CN
            * 是否开启相机视锥裁剪 默认为true
            * 设定这个物件是否具有 视锥体裁剪功能，为否的话，将永远不参加场景渲染剔除树，无论是否在显示范围内都会进行相关的渲染逻辑运算。</p>
            * @default true
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.enableCulling = true;
            _this.id = ++Object3D.s_id;
            _this._modelMatrix3D.identity();
            return _this;
        }
        Object.defineProperty(Object3D.prototype, "proAnimation", {
            /**
            * @language zh_CN
            * 属性动画对象
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._proAnimation;
            },
            /**
            * @language zh_CN
            * 属性动画对象
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (animation) {
                this.setProAnimation(animation);
            },
            enumerable: true,
            configurable: true
        });
        Object3D.prototype.setProAnimation = function (animation) {
            this._proAnimation = animation;
            if (this._proAnimation) {
                this._proAnimation.propertyAnimController.target = this;
            }
        };
        Object.defineProperty(Object3D.prototype, "bound", {
            /**
            * @language zh_CN
            * 獲取对象模型包围盒。</p>
            * 每个场景物件都需要有的 包围盒子，可以自定义包围盒形状大小，也可以根据模型本身生成。</p>
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._bound;
            },
            /**
            * @language zh_CN
            * 設置对象模型包围盒。</p>
            * 每个场景物件都需要有的 包围盒子，可以自定义包围盒形状大小，也可以根据模型本身生成。</p>
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (bound) {
                if (this._bound == bound) {
                    return;
                }
                if (this._bound) {
                    this._bound.dispose();
                }
                this._bound = bound;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "currentBound", {
            /**
            * @language zh_CN
            * 对象模型当前使用包围盒。
            * @see mouseChilder 根据这个值取不同的包围盒为true取大包围盒 false取子包围盒
            *
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                if (this.mouseChildren) {
                    return this.bound.childBound;
                }
                return this.bound;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "position", {
            /**
            * @language zh_CN
            * 返回位移。</p> （本地）
            * 获取容器的坐标位置，基于父节点的位置坐标。</p>
            * @returns 位移
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._pos;
            },
            /**
            * @language zh_CN
            * 设置位移。</p> （本地）
            * 设置基于父节点的位置坐标，当父容器发生变化时，子节点也会变化。</p>
            * @param vec 位移
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (vec) {
                if (this._pos.x == vec.x && this._pos.y == vec.y && this._pos.z == vec.z) {
                    return;
                }
                this.updateTransformChange(true);
                this._pos.copyFrom(vec);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "rotation", {
            /**
            * @language zh_CN
            * 返回旋转。</p> （本地）
            * 获取容器的旋转信息，基于父节点的旋转信息 欧拉角信息。</p>
            * @returns 旋转 欧拉角信息
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._rot;
            },
            /**
            * @language zh_CN
            * 设置旋转 。</p> （本地）
            * 设置基于父节点的旋转信息 欧拉角信息，当父容器发生变化时，子节点也会变化。</p>
            * @param vec 旋转 欧拉角信息
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._rot.x == value.x && this._rot.y == value.y && this._rot.z == value.z) {
                    return;
                }
                this._rot.x = value.x;
                this._rot.y = value.y;
                this._rot.z = value.z;
                this._orientation.fromEulerAngles(this._rot.x, this._rot.y, this._rot.z);
                this._angle = this._orientation.toAxisAngle(this._axis);
                this.updateTransformChange(true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "orientation", {
            /**
            * @language zh_CN
            * 返回旋转。</p> （本地）
            * 返回 基于四元素的旋转信息。</p>
            * @returns 旋转
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._orientation;
            },
            /**
            * @language zh_CN
            * 设置旋转。</p> （本地）
            * 设置旋转 基于四元素 旋转信息，当父容器发生变化时，子节点也会变化。</p>
            * @param value 旋转
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._orientation.x == value.x &&
                    this._orientation.y == value.y &&
                    this._orientation.z == value.z &&
                    this._orientation.w == value.w) {
                    return;
                }
                this._orientation.copyFrom(value);
                this._orientation.toEulerAngles(this._rot);
                this._angle = this._orientation.toAxisAngle(this._axis);
                this.updateTransformChange(true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "orientationX", {
            /**
            * @language zh_CN
            * 设置旋转 分量x （本地）
            * @param value 分量x
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._orientation.x == value) {
                    return;
                }
                this._orientation.x = value;
                this._orientation.toEulerAngles(this._rot);
                this._angle = this._orientation.toAxisAngle(this._axis);
                this.updateTransformChange(true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "orientationY", {
            /**
            * @language zh_CN
            * 设置旋转 分量y （本地）
            * @param value 分量y
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._orientation.y == value) {
                    return;
                }
                this._orientation.y = value;
                this._orientation.toEulerAngles(this._rot);
                this._angle = this._orientation.toAxisAngle(this._axis);
                this.updateTransformChange(true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "orientationZ", {
            /**
            * @language zh_CN
            * 设置旋转 分量z （本地）
            * @param value 分量z
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._orientation.z == value) {
                    return;
                }
                this._orientation.z = value;
                this._orientation.toEulerAngles(this._rot);
                this._angle = this._orientation.toAxisAngle(this._axis);
                this.updateTransformChange(true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "orientationW", {
            /**
            * @language zh_CN
            * 设置旋转 分量w （本地）
            * @param value 分量w
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._orientation.w == value) {
                    return;
                }
                this._orientation.w = value;
                this._orientation.toEulerAngles(this._rot);
                this._angle = this._orientation.toAxisAngle(this._axis);
                this.updateTransformChange(true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "scale", {
            /**
            * @language zh_CN
            * 返回缩放。</p> （本地）
            * 返回基于父容器的缩放信息。</p>
            * @returns 缩放
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._sca;
            },
            /**
            * @language zh_CN
            * 设置缩放。</p> （本地）
            * 设置基于父容器的缩放信息，当父容器发生变化时，子节点也会变化。</p>
            * @param vec 缩放
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (val) {
                if (this._sca.x == val.x &&
                    this._sca.y == val.y &&
                    this._sca.z == val.z) {
                    return;
                }
                this.updateTransformChange(true);
                this._sca = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "x", {
            /**
            * @language zh_CN
            * 返回x坐标 （本地）
            * 返回基于父容器的位置坐标信息值
            * @returns x坐标
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._pos.x;
            },
            /**
            * @language zh_CN
            * 设置x坐标。</p> （本地）
            * 设置基于父容器的位置信息，当父容器发生变化时，子节点也会变化，值不变。</p>
            * @param value x坐标
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._pos.x == value)
                    return;
                this._pos.x = value;
                this.updateTransformChange(true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "y", {
            /**
            * @language zh_CN
            * 返回y坐标 （本地）
            *
            * 返回基于父容器的位置坐标信息值
            * @returns y坐标
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._pos.y;
            },
            /**
            * @language zh_CN
            * 设置y坐标。</p> （本地）
            * 设置基于父容器的位置信息，当父容器发生变化时，子节点也会变化，值不变。</p>
            * @param value y坐标
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._pos.y == value)
                    return;
                this._pos.y = value;
                this.updateTransformChange(true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "z", {
            /**
            * @language zh_CN
            * 返回z坐标 （本地）
            *
            * 返回基于父容器的位置坐标信息值
            * @returns z坐标
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._pos.z;
            },
            /**
            * @language zh_CN
            * 设置z坐标。</p> （本地）
            * 设置基于父容器的位置信息，当父容器发生变化时，子节点也会变化，值不变。</p>
            * @param value z坐标
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._pos.z == value)
                    return;
                this._pos.z = value;
                this.updateTransformChange(true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "rotationX", {
            /**
            * @language zh_CN
            * 返回x旋转 （本地）
            *
            * 返回基于父容器的位置旋转信息值
            * @returns x旋转
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._rot.x;
            },
            /**
            * @language zh_CN
            * 设置x轴旋转。</p> （本地）
            * 设置基于父容器的旋转信息，当父容器发生变化时，子节点也会变化，值不变。</p>
            * @param value x轴旋转
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._rot.x == value)
                    return;
                this._rot.x = value;
                this._orientation.fromEulerAngles(this._rot.x, this._rot.y, this._rot.z);
                this._angle = this._orientation.toAxisAngle(this._axis);
                this.updateTransformChange(true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "rotationY", {
            /**
            * @language zh_CN
            * 返回y旋转 （本地）
            *
            * 返回基于父容器的位置旋转信息值
            * @returns y旋转
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._rot.y;
            },
            /**
            * @language zh_CN
            * 设置y轴旋转。</p> （本地）
            * 设置基于父容器的旋转信息，当父容器发生变化时，子节点也会变化，值不变。</p>
            * @param value y轴旋转
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._rot.y == value)
                    return;
                this._rot.y = value;
                this._orientation.fromEulerAngles(this._rot.x, this._rot.y, this._rot.z);
                this._angle = this._orientation.toAxisAngle(this._axis);
                this.updateTransformChange(true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "rotationZ", {
            /**
            * @language zh_CN
            * 返回z旋转 （本地）
            *
            * 返回基于父容器的位置旋转信息值
            * @returns z旋转
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._rot.z;
            },
            /**
            * @language zh_CN
            * 设置z轴旋转。</p> （本地）
            * 设置基于父容器的旋转信息，当父容器发生变化时，子节点也会变化，值不变。</p>
            * @param value z轴旋转
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._rot.z == value)
                    return;
                this._rot.z = value;
                this._orientation.fromEulerAngles(this._rot.x, this._rot.y, this._rot.z);
                this._angle = this._orientation.toAxisAngle(this._axis);
                this.updateTransformChange(true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "scaleX", {
            /**
            * @language zh_CN
            * 返回x缩放 （本地）
            * 返回基于父容器的缩放信息值
            * @returns x缩放
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._sca.x;
            },
            /**
            * @language zh_CN
            * 设置x轴缩放。</p> （本地）
            * 设置基于父容器的旋转信息，当父容器发生变化时，子节点也会变化，值不变
            * @param value x轴缩放
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._sca.x == value)
                    return;
                this._sca.x = value;
                this.updateTransformChange(true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "scaleY", {
            /**
            * @language zh_CN
            * 返回y缩放 （本地）
            * 返回基于父容器的缩放信息值
            * @returns y缩放
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._sca.y;
            },
            /**
            * @language zh_CN
            * 设置y轴缩放 （本地）
            *
            * 设置基于父容器的旋转信息，当父容器发生变化时，子节点也会变化，值不变
            * @param value y轴缩放
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._sca.y == value)
                    return;
                this._sca.y = value;
                this.updateTransformChange(true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "scaleZ", {
            /**
            * @language zh_CN
            * 返回z缩放 （本地）
            * 返回基于父容器的缩放信息值
            * @returns z缩放
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._sca.z;
            },
            /**
            * @language zh_CN
            * 设置z轴缩放 （本地）
            *
            * 设置基于父容器的旋转信息，当父容器发生变化时，子节点也会变化，值不变
            * @param value z轴缩放
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._sca.z == value)
                    return;
                this._sca.z = value;
                this.updateTransformChange(true);
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 以axis轴为中心进行旋转
        * 设置基于父容器的旋转信息，数值通过axis的角度进行设置。当父容器发生变化时，子节点也会变化，值不变
        * @param axis 中心轴
        * @param angle 旋转的角度
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.setRotationFromAxisAngle = function (axis, angle) {
            axis.normalize();
            this.updateTransformChange(true);
            this._orientation.fromAxisAngle(axis, angle);
            this._orientation.toEulerAngles(this._rot);
            this._axis.copyFrom(axis);
            this._angle = angle;
        };
        Object.defineProperty(Object3D.prototype, "modelMatrix", {
            /**
            * @language zh_CN
            * 返回 object在世界中的渲染矩阵 （全局）
            * @returns Matrix4 世界渲染矩阵
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                if (this._transformChange) {
                    this.updateModelMatrix();
                }
                return this._modelMatrix3D;
            },
            /**
            * @language zh_CN
            * 设置 object在世界中的渲染矩阵 （全局）
            * @param matrix 世界矩阵
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (matrix) {
                var tas = matrix.decompose(egret3d.Orientation3D.QUATERNION);
                this.globalPosition = tas[0];
                egret3d.MathUtil.CALCULATION_QUATERNION.x = tas[1].x;
                egret3d.MathUtil.CALCULATION_QUATERNION.y = tas[1].y;
                egret3d.MathUtil.CALCULATION_QUATERNION.z = tas[1].z;
                egret3d.MathUtil.CALCULATION_QUATERNION.w = tas[1].w;
                this.globalOrientation = egret3d.MathUtil.CALCULATION_QUATERNION;
                this.globalScale = tas[2];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "localMatrix", {
            /**
            * @language zh_CN
            * 返回 object在本地空间中的矩阵 （本地）
            * @returns Matrix4 本地空间矩阵
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                this.modelMatrix;
                return this._localMatrix3D;
            },
            /**
            * @language zh_CN
            * 设置 object在本地空间中的矩阵 （本地）
            * @param matrix 本地空间矩阵
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (matrix) {
                var tas = matrix.decompose(egret3d.Orientation3D.QUATERNION);
                this.position = tas[0];
                Object3D.qua0.setTo(tas[1].x, tas[1].y, tas[1].z, tas[1].w);
                this.orientation = Object3D.qua0;
                this.scale = tas[2];
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * @private
        * @platform Web,Native
        */
        Object3D.prototype.updateModelMatrix = function () {
            if (this.parent != null) {
                var parentOrientation = this.parent.globalOrientation;
                this._globalOrientation.multiply(parentOrientation, this._orientation);
                this._globalOrientation.toEulerAngles(this._globalRot);
                var parentScale = this.parent.globalScale;
                this._globalSca.copyFrom(parentScale.multiply(this._sca, Object3D.v0));
                parentOrientation.transformVector(parentScale.multiply(this._pos, Object3D.v0), this._globalPos);
                this._globalPos.copyFrom(this._globalPos.add(this.parent.globalPosition, Object3D.v0));
            }
            else {
                this._globalOrientation.copyFrom(this._orientation);
                this._globalPos.copyFrom(this._pos);
                this._globalSca.copyFrom(this._sca);
                this._globalRot.copyFrom(this._rot);
            }
            this.onMakeTransform();
            this._transformChange = false;
            this.onUpdateTransform();
        };
        Object3D.prototype.onUpdateTransform = function () {
        };
        Object3D.prototype.onMakeTransform = function () {
            this._localMatrix3D.makeTransform(this._pos, this._sca, this._orientation);
            this._modelMatrix3D.makeTransform(this._globalPos, this._globalSca, this._globalOrientation);
        };
        Object.defineProperty(Object3D.prototype, "globalX", {
            /**
            * @language zh_CN
            * 返回 object 世界位置 x (全局)
            * @returns object 世界位置x
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.globalPosition.x;
            },
            /**
            * @language zh_CN
            * 设置 object 世界位置 x (全局)
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._vec.copyFrom(this.globalPosition);
                this._vec.x = value;
                this.globalPosition = this._vec;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "globalY", {
            /**
            * @language zh_CN
            * 返回 object 世界位置 y (全局)
            * @returns object 世界位置 y
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.globalPosition.y;
            },
            /**
            * @language zh_CN
            * 设置 object 世界位置 y (全局)
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._vec.copyFrom(this.globalPosition);
                this._vec.y = value;
                this.globalPosition = this._vec;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "globalZ", {
            /**
            * @language zh_CN
            * 返回 object 世界位置 z (全局)
            * @returns object 世界位置 z
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.globalPosition.z;
            },
            /**
            * @language zh_CN
            * 设置 object 世界位置 z (全局)
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._vec.copyFrom(this.globalPosition);
                this._vec.z = value;
                this.globalPosition = this._vec;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "globalPosition", {
            /**
            * @language zh_CN
            * 返回 object 世界位置 （全局）
            * 返回世界坐标系的 全局位置坐标
            * @returns object 世界位置
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                if (this._transformChange) {
                    this.modelMatrix;
                }
                return this._globalPos;
            },
            /**
            * @language zh_CN
            * 设置 object 世界位置 （全局）
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (pos) {
                if (this.parent) {
                    this.parent.globalOrientation.inverse(this._qut);
                    pos.subtract(this.parent.globalPosition, this._vec);
                    this._qut.transformVector(this._vec, this._vec);
                    this._vec.divided(this.parent.globalScale, this._vec);
                    this.position = this._vec;
                }
                else {
                    this.position = pos;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "globalRotationX", {
            /**
            * @language zh_CN
            * 返回 object 世界旋转x (全局)
            * @returns object 世界旋转x
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.globalRotation.x;
            },
            /**
            * @language zh_CN
            * 设置 object 世界旋转 x (全局)
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._vec.copyFrom(this.globalRotation);
                this._vec.x = value;
                this.globalRotation = this._vec;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "globalRotationY", {
            /**
            * @language zh_CN
            * 返回 object 世界旋转y (全局)
            * @returns object 世界旋转y
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.globalRotation.y;
            },
            /**
            * @language zh_CN
            * 设置 object 世界旋转 y (全局)
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._vec.copyFrom(this.globalRotation);
                this._vec.y = value;
                this.globalRotation = this._vec;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "globalRotationZ", {
            /**
            * @language zh_CN
            * 返回 object 世界旋转z (全局)
            * @returns object 世界旋转z
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.globalRotation.z;
            },
            /**
            * @language zh_CN
            * 设置 object 世界旋转 z (全局)
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._vec.copyFrom(this.globalRotation);
                this._vec.z = value;
                this.globalRotation = this._vec;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "globalRotation", {
            /**
            * @language zh_CN
            * 返回 object 世界旋转 (全局)
            * 返回世界坐标系的 全局旋转信息
            * @returns object 世界旋转
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                if (this._transformChange) {
                    this.modelMatrix;
                }
                return this._globalRot;
            },
            /**
            * @language zh_CN
            * 设置 object 世界旋转 (全局)
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (rot) {
                egret3d.MathUtil.CALCULATION_QUATERNION.fromEulerAngles(rot.x, rot.y, rot.z);
                this.globalOrientation = egret3d.MathUtil.CALCULATION_QUATERNION;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "globalScale", {
            /**
            * @language zh_CN
            * 返回 object 世界缩放 (全局)
            * 返回世界坐标系的 全局缩放信息
            * @returns object 世界缩放
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                if (this._transformChange) {
                    this.modelMatrix;
                }
                return this._globalSca;
            },
            /**
            * @language zh_CN
            * 设置 object 世界缩放 (全局)
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (sca) {
                if (this.parent) {
                    sca.divided(this.parent.globalScale, this._vec);
                    this.scale = this._vec;
                }
                else {
                    this.scale = sca;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "globalScaleX", {
            /**
            * @language zh_CN
            * 获取 object 世界缩放 x (全局)
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.globalScale.x;
            },
            /**
            * @language zh_CN
            * 设置 object 世界缩放 x (全局)
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._vec.copyFrom(this.globalScale);
                this._vec.x = value;
                this.globalScale = this._vec;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "globalScaleY", {
            /**
            * @language zh_CN
            * 获取 object 世界缩放 y (全局)
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.globalScale.y;
            },
            /**
            * @language zh_CN
            * 设置 object 世界缩放 y (全局)
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._vec.copyFrom(this.globalScale);
                this._vec.y = value;
                this.globalScale = this._vec;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "globalScaleZ", {
            /**
            * @language zh_CN
            * 获取 object 世界缩放 z (全局)
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.globalScale.z;
            },
            /**
            * @language zh_CN
            * 设置 object 世界缩放 z (全局)
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._vec.copyFrom(this.globalScale);
                this._vec.z = value;
                this.globalScale = this._vec;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "globalOrientation", {
            /**
            * @language zh_CN
            * 返回 object 世界旋转 四元数 (全局)
            * 返回世界坐标系的 全局旋转信息，数据类型是 四元数
            * @returns object 世界旋转
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                if (this._transformChange) {
                    this.modelMatrix;
                }
                return this._globalOrientation;
            },
            /**
            * @language zh_CN
            * 设置 object 世界旋转 四元数 (全局)
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (ori) {
                if (this.parent) {
                    this.parent.globalOrientation.inverse(this._qut);
                    this._qut.multiply(this._qut, ori);
                    this.orientation = this._qut;
                }
                else {
                    this.orientation = ori;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 增加一个子对象,并返回当前子对象。
        * 如果child 本身有父节点 会先进行移除父节点。
        * 在容器中添加子对象，如果有显示接口的，将会放到场景显示树种进行渲染逻辑运算，及渲染
        * @param child 增加的子对象
        * @returns 子对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.addChild = function (child) {
            if (child.parent) {
                child.parent.removeChild(child);
            }
            if (this.childs.indexOf(child) >= 0) {
                this.removeChild(child);
            }
            this.childs.push(child);
            child.parent = this;
            child._isRoot = false;
            child.updateTransformChange(true);
            return child;
        };
        /**
        * @language zh_CN
        * 增加一个子对象,并返回当前子对象
        * 在容器中添加子对象，如果有显示接口的，将会放到场景显示树种进行渲染逻辑运算，及渲染
        * @param child 增加的子对象
        * @param index 子对象的下标
        * @returns 子对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.addChildAt = function (child, index) {
            if (index < 0) {
                this.childs.splice(0, 0, child);
            }
            else if (index >= this.childs.length) {
                this.childs.push(child);
            }
            else {
                this.childs.splice(index, 0, child);
            }
            child.parent = this;
            child.updateTransformChange(true);
            return child;
        };
        /**
        * @language zh_CN
        * 返回下标为index的子对象
        * @param index 子对象下标
        * @returns 如果有就返回子对象,否则就返回null.
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.getChildAt = function (index) {
            if (index < 0 || index >= this.childs.length)
                return null;
            return this.childs[index];
        };
        /**
        * @language zh_CN
        * 将一个2D GPU UI对象位置与该3d对象在屏幕位置投射位置相绑定
        * @param ui 需要绑定的2d对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.addFollowUI = function (ui) {
            this._displayList = this._displayList || [];
            var index = this._displayList.indexOf(ui);
            if (index == -1)
                this._displayList.push(ui);
        };
        /**
        * @language zh_CN
        * 解除一个2D GPU UI对象位置与该3d对象在屏幕位置投射位置相绑定
        * @param ui 需要解除绑定的2d对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.removeFollowUI = function (ui) {
            if (!this._displayList) {
                return;
            }
            var index = this._displayList.indexOf(ui);
            if (index >= 0)
                this._displayList.splice(index, 1);
        };
        /**
        * @language zh_CN
        * 返回子对象child的下标
        * @param child 子对象
        * @returns 如果有就返回子对象的下标,否则就返回-1.
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.getChildIndex = function (child) {
            for (var index = 0; index < this.childs.length; ++index) {
                if (this.childs[index] != child) {
                    continue;
                }
                return index;
            }
            return -1;
        };
        /**
        * @language zh_CN
        * 返回子对象
        * @param index 索引
        * @returns Object3D 子对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.getChild = function (index) {
            if (index >= 0 && index < this.childs.length) {
                return this.childs[index];
            }
            return null;
        };
        /**
        * @language zh_CN
        * 移除child子对象 并返回
        * 移除显示列表中的指定对象，如果为空将会返回
        * @param child 子对象
        * @returns Object3D 如果成功就返回child,否则返回null
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.removeChild = function (child) {
            var index = this.childs.indexOf(child);
            if (index < 0) {
                return null;
            }
            child.parent = null;
            this.childs.splice(index, 1);
            child.updateTransformChange(true);
            return child;
        };
        /**
        * @language zh_CN
        * 移除下标为index的子对象 并返回
        * @param index 子对象的下标
        * @returns 如果成功就返回child,否则返回null
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.removeChildAt = function (index) {
            if (index < 0 || index >= this.childs.length)
                return null;
            var object3D = this.childs[index];
            object3D.parent = null;
            this.childs.splice(index, 1);
            object3D.updateTransformChange(true);
            return object3D;
        };
        /**
        * @language zh_CN
        * 移除全部child子对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.removeAllChild = function () {
            while (this.childs.length > 0) {
                this.removeChild(this.childs[0]);
            }
        };
        /**
        * @language zh_CN
        * 设置子对象的下标
        * @private
        * @param child 子对象
        * @param index 子对象的下标
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.setChildIndex = function (child, index) {
            for (var i = 0; i < this.childs.length; ++i) {
                if (this.childs[i] != child) {
                    continue;
                }
                if (i == index) {
                    return;
                }
                else if (index > i) {
                    for (var m = i; m > index; --m) {
                        this.childs[m] = this.childs[m - 1];
                    }
                }
                else if (index < i) {
                    for (var m = i; m < index; ++m) {
                        this.childs[m] = this.childs[m + 1];
                    }
                }
                this.childs[index] = child;
                return;
            }
        };
        /**
        * @language zh_CN
        * @private
        * 交换对象
        * @param other 交换中的对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.swapObject = function (other) {
            var parent = other.parent;
            if (this.parent) {
                var index = this.parent.getChildIndex(this);
                var thisParent = this.parent;
                thisParent.removeChildAt(index);
                thisParent.addChildAt(other, index);
            }
            var childs = [];
            while (this.childs.length > 0) {
                childs.push(this.childs[0]);
                this.removeChild(this.childs[0]);
            }
            for (var i = 0; i < childs.length; ++i) {
                other.addChild(childs[i]);
            }
            this.updateTransformChange(true);
            other.updateTransformChange(true);
        };
        /**
        * @language zh_CN
        * @private
        * 交换对象 包括子节点
        * @param other 交换中的对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.swapObjectAndChilds = function (other) {
            var parent = other.parent;
            var childs = new Array();
            for (var i = 0; i < other.childs.length; ++i) {
                childs[i] = other.childs[i];
            }
            if (this.parent) {
                var index = this.parent.getChildIndex(this);
                this.parent.childs[index] = other;
            }
            if (other.parent) {
                var index = other.parent.getChildIndex(other);
                other.parent.childs[index] = this;
            }
            other.parent = this.parent;
            this.parent = parent;
            other.childs.length = 0;
            for (var i = 0; i < this.childs.length; ++i) {
                other.childs[i] = this.childs[i];
                other.childs[i].parent = other;
            }
            this.childs.length = 0;
            for (var i = 0; i < childs.length; ++i) {
                this.childs[i] = childs[i];
                this.childs[i].parent = this;
            }
            this.updateTransformChange(true);
            other.updateTransformChange(true);
        };
        /**
        * @language zh_CN
        * @private
        * 交换子对象的位置
        * @param child1 子对象1
        * @param child2 子对象2
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.swapChildren = function (child1, child2) {
            var index1 = 0, index2 = 0;
            for (; index1 < this.childs.length; ++index1) {
                if (this.childs[index1] != child1) {
                    continue;
                }
                for (; index2 < this.childs.length; ++index2) {
                    if (this.childs[index2] != child2) {
                        continue;
                    }
                    var tmp = this.childs[index1];
                    this.childs[index1] = this.childs[index2];
                    this.childs[index2] = tmp;
                    break;
                }
                return;
            }
        };
        /**
        * @language zh_CN
        * @private
        * 交换子对象的位置
        * @param index1 子对象1下标
        * @param index2 子对象2下标
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.swapChildrenAt = function (index1, index2) {
            if (index1 < 0 || index1 >= this.childs.length)
                return;
            if (index2 < 0 || index2 >= this.childs.length)
                return;
            var tmp = this.childs[index1];
            this.childs[index1] = this.childs[index2];
            this.childs[index2] = tmp;
        };
        /**
        * @language zh_CN
        * 当前对象对视位置 （全局） (修改的是自身的全局变换)
        * @param pos 自身的位置 （全局）
        * @param target 目标的位置 （全局）
        * @param up 向上的方向
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.lookAt = function (pos, target, up) {
            if (up === void 0) { up = egret3d.Vector3.Y_AXIS; }
            this.globalPosition = pos;
            egret3d.MathUtil.CALCULATION_MATRIX.lookAt(pos, target, up);
            egret3d.MathUtil.CALCULATION_MATRIX.invert();
            var prs = egret3d.MathUtil.CALCULATION_MATRIX.decompose(egret3d.Orientation3D.QUATERNION);
            egret3d.MathUtil.CALCULATION_QUATERNION.x = prs[1].x;
            egret3d.MathUtil.CALCULATION_QUATERNION.y = prs[1].y;
            egret3d.MathUtil.CALCULATION_QUATERNION.z = prs[1].z;
            egret3d.MathUtil.CALCULATION_QUATERNION.w = prs[1].w;
            this.globalOrientation = egret3d.MathUtil.CALCULATION_QUATERNION;
        };
        /**
        * @language zh_CN
        * 当前对象对视位置 （本地） (修改的是自身的本地变换)
        * @param pos 自身的位置 （本地）
        * @param target 目标的位置 （本地）
        * @param up 向上的方向
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.lookAtLocal = function (pos, target, up) {
            if (up === void 0) { up = egret3d.Vector3.Y_AXIS; }
            this.position = pos;
            egret3d.MathUtil.CALCULATION_MATRIX.lookAt(pos, target, up);
            egret3d.MathUtil.CALCULATION_MATRIX.invert();
            var prs = egret3d.MathUtil.CALCULATION_MATRIX.decompose(egret3d.Orientation3D.QUATERNION);
            egret3d.MathUtil.CALCULATION_QUATERNION.x = prs[1].x;
            egret3d.MathUtil.CALCULATION_QUATERNION.y = prs[1].y;
            egret3d.MathUtil.CALCULATION_QUATERNION.z = prs[1].z;
            egret3d.MathUtil.CALCULATION_QUATERNION.w = prs[1].w;
            this.orientation = egret3d.MathUtil.CALCULATION_QUATERNION;
        };
        /**
        * @language zh_CN
        * 看向目标  (会根据目标对象的全局坐标进行改变) (修改的是自身的全局变换)
        * @param target 目标对象 (会根据目标对象的全局坐标进行改变)
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.lookAtTarget = function (target) {
            egret3d.MathUtil.CALCULATION_MATRIX.lookAt(this.globalPosition, target.globalPosition, egret3d.Vector3.Y_AXIS);
            egret3d.MathUtil.CALCULATION_MATRIX.invert();
            var prs = egret3d.MathUtil.CALCULATION_MATRIX.decompose(egret3d.Orientation3D.QUATERNION);
            egret3d.MathUtil.CALCULATION_QUATERNION.x = prs[1].x;
            egret3d.MathUtil.CALCULATION_QUATERNION.y = prs[1].y;
            egret3d.MathUtil.CALCULATION_QUATERNION.z = prs[1].z;
            egret3d.MathUtil.CALCULATION_QUATERNION.w = prs[1].w;
            this.globalOrientation = egret3d.MathUtil.CALCULATION_QUATERNION;
        };
        /**
        * @language zh_CN
        * 看向目标 (会根据目标对象的本地坐标进行改变) (修改的是自身的本地变换)
        * @param target 目标对象 (会根据目标对象的本地坐标进行改变)
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.lookAtTargetLocal = function (target) {
            egret3d.MathUtil.CALCULATION_MATRIX.lookAt(this.position, target.position, egret3d.Vector3.Y_AXIS);
            egret3d.MathUtil.CALCULATION_MATRIX.invert();
            var prs = egret3d.MathUtil.CALCULATION_MATRIX.decompose(egret3d.Orientation3D.QUATERNION);
            egret3d.MathUtil.CALCULATION_QUATERNION.x = prs[1].x;
            egret3d.MathUtil.CALCULATION_QUATERNION.y = prs[1].y;
            egret3d.MathUtil.CALCULATION_QUATERNION.z = prs[1].z;
            egret3d.MathUtil.CALCULATION_QUATERNION.w = prs[1].w;
            this.orientation = egret3d.MathUtil.CALCULATION_QUATERNION;
        };
        /**
        * @language zh_CN
        * 以Object3D name 来查找Object3D
        * @param name Object3D名字
        * @returns Object3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.findObject3D = function (name) {
            var object3d = null;
            for (var i = 0; i < this.childs.length; ++i) {
                if (this.childs[i].name == name) {
                    object3d = this.childs[i];
                    return object3d;
                }
                object3d = this.childs[i].findObject3D(name);
                if (object3d) {
                    return object3d;
                }
            }
            return object3d;
        };
        /**
        * @language zh_CN
        * 以Object3D id 来查找Object3D
        * @param id Object3D id
        * @returns Object3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.findObject3DToID = function (id) {
            var object3d = null;
            for (var i = 0; i < this.childs.length; ++i) {
                if (this.childs[i].id == id) {
                    object3d = this.childs[i];
                    return object3d;
                }
                object3d = this.childs[i].findObject3DToID(id);
                if (object3d) {
                    return object3d;
                }
            }
            return object3d;
        };
        Object3D.prototype.updateTransformChange = function (change) {
            this._transformChange = change;
            ///Octree.getInstance().checkObject3D(obj);
            for (var i = 0; i < this.childs.length; ++i) {
                this.childs[i].updateTransformChange(change);
            }
        };
        /**
        * @language zh_CN
        * 当前对象数据更新
        * @private
        * @param camera 当前渲染的摄相机
        * @param time 当前时间
        * @param delay 每帧时间间隔
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.update = function (time, delay, camera) {
            if (this.inFrustum) {
                if (this.proAnimation) {
                    this.proAnimation.update(time, delay, null);
                }
            }
            if (this._displayList) {
                for (var i = 0; i < this._displayList.length; i++) {
                    camera.object3DToScreenRay(this.globalPosition, egret3d.Vector3.HELP_0);
                    this._displayList[i].x = egret3d.Vector3.HELP_0.x;
                    this._displayList[i].y = egret3d.Vector3.HELP_0.y;
                }
            }
        };
        /**
        * @language zh_CN
        * 释放所有数据
        * 是否内存中的相关数据连接引用，移除逻辑运算，从主渲染刘表中挪出
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            for (var i = 0; i < this.childs.length; i++) {
                this.childs[i].dispose();
            }
            this.removeAllChild();
        };
        Object.defineProperty(Object3D.prototype, "root", {
            /**
            * @language zh_CN
            * 获取当前节点的根节点
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                if (!this.parent) {
                    return this;
                }
                return this.parent.root;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.copy = function (other) {
            this.position = other.position;
            this.rotation = other.rotation;
            this.scale = other.scale;
            this.visible = other.visible;
            this.name = other.name;
        };
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.clone = function () {
            var newObject = new Object3D();
            newObject.copy(this);
            return newObject;
        };
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        Object3D.prototype.deepClone = function () {
            var newObject = this.clone();
            for (var i = 0; i < this.childs.length; ++i) {
                newObject.addChild(this.childs[i].deepClone());
            }
            return newObject;
        };
        return Object3D;
    }(egret3d.EventDispatcher));
    /**
    * @private
    * @language zh_CN
    * 当前对象名
    * @version Egret 3.0
    * @platform Web,Native
    */
    Object3D.s_id = 0;
    //public awayInFrustum: boolean = false;
    Object3D.qua0 = new egret3d.Quaternion();
    Object3D.mat0 = new egret3d.Matrix4();
    Object3D.v0 = new egret3d.Vector3();
    Object3D.v1 = new egret3d.Vector3();
    Object3D.v2 = new egret3d.Vector3();
    egret3d.Object3D = Object3D;
    __reflect(Object3D.prototype, "egret3d.Object3D");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Object3D.js.map