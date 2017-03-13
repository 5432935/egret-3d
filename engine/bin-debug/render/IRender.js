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
    * @class egret3d.IRender
    * @classdesc
    * 场景中的可见物体，可渲染的对象。
    * 在渲染之前会将渲染树中对象进行筛选.
    * 只有IRender对象才会进入渲染管线
    * @see egret3d.Object3D
    * @see egret3d.Geometry
    * @version Egret 3.0
    * @platform Web,Native
    */
    var IRender = (function (_super) {
        __extends(IRender, _super);
        ///**
        //* @private
        //* 需要进行alpha 排序
        //* @language zh_CN
        //* @version Egret 3.0
        //* @platform Web,Native
        //*/
        //public alphaBlend: boolean = false ;
        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        function IRender() {
            var _this = _super.call(this) || this;
            /**
            * @private
            * @language zh_CN
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.zIndex = -1;
            /**
            * @language zh_CN
            * 对象类型。</p>
            * @see egret3d.IRender.TYPE_MESH
            * @see egret3d.IRender.TYPE_PARTICLE_EMIT
            * @see egret3d.IRender.TYPE_WIREFRAME
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.type = "";
            /**
            * @private
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this._multiMaterial = {};
            /**
            * @private
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this._materialCount = 0;
            /**
            * @language zh_CN
            * 动作对象，控制骨骼动画/特效动画等。</p>
            * 可拓展的动画功能属性，动画功能的驱动类总接口。</p>
            * @see egret3d.IAnimation
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.animation = null;
            return _this;
        }
        Object.defineProperty(IRender.prototype, "geometry", {
            /**
            * @language zh_CN
            * 获取网格信息。</p>
            * geometry 为渲染对象的网格信息 ，渲染对象需要 vertexBuffer  和 indexBuffer 信息 及顶点着色器shade。</p>
            * @returns Geometry 网格信息
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._geometry;
            },
            /**
            * @language zh_CN
            * 设置网格信息。</p>
            * @param value 网格信息
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._geometry == value) {
                    return;
                }
                if (value) {
                    value.incRef();
                }
                if (this._geometry) {
                    this._geometry.dispose();
                }
                this._geometry = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IRender.prototype, "drawOrder", {
            /**
            * @language zh_CN
            * 渲染排序的参数，数值越大，先渲染</p>
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IRender.prototype, "lightGroup", {
            /**
            * @language zh_CN
            * 获取材质 lightGroup 。
            * @returns LightGroup 灯光组
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._lightGroup;
            },
            /**
            * @language zh_CN
            * 设置材质 lightGroup 。
            * 设置材质球接受的灯光组。
            * @param lightGroup LightGroup
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (lightGroup) {
                this._lightGroup = lightGroup;
                for (var id in this.multiMaterial) {
                    this.multiMaterial[id].lightGroup = this._lightGroup;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 增加一个材质
        * @param id 材质id
        * @param material 模型材质
        * @version Egret 3.0
        * @platform Web,Native
        */
        IRender.prototype.addSubMaterial = function (id, material) {
            if (!this._multiMaterial[id]) {
                this._materialCount++;
            }
            this.setSubMaterial(id, material);
        };
        /**
        * @language zh_CN
        * 设置材质
        * @param id 材质id
        * @param material 模型材质
        * @version Egret 3.0
        * @platform Web,Native
        */
        IRender.prototype.setSubMaterial = function (id, material) {
            this._multiMaterial[id] = material;
            if (!material) {
                this.removeSubMaterial(id);
            }
            if (id == 0) {
                this._material = material;
            }
            if (material) {
                material.lightGroup = this._lightGroup;
            }
        };
        /**
        * @language zh_CN
        * 删除一个材质
        * @param id 材质id
        * @version Egret 3.0
        * @platform Web,Native
        */
        IRender.prototype.removeSubMaterial = function (id) {
            if (this._multiMaterial[id]) {
                delete this._multiMaterial[id];
                this._materialCount--;
            }
        };
        /**
        * @language zh_CN
        * 根据id获取对应的材质
        * @param id 材质id
        * @returns MaterialBase 材质信息对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        IRender.prototype.getMaterial = function (id) {
            return this._multiMaterial[id];
        };
        Object.defineProperty(IRender.prototype, "materialCount", {
            /**
            * @language zh_CN
            * 得到所有材质的个数
            * @returns number 个数
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._materialCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IRender.prototype, "material", {
            /**
            * @language zh_CN
            * 获取材质
            * @returns MaterialBase 材质
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._material;
            },
            /**
            * @language zh_CN
            * 设置材质
            * @param mat 材质
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (mat) {
                this._material = mat;
                if (this._multiMaterial[0]) {
                    this.setSubMaterial(0, mat);
                }
                else {
                    this.addSubMaterial(0, mat);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IRender.prototype, "multiMaterial", {
            /**
            * @language zh_CN
            * 获取多材质
            * @returns { [matID: number]: MaterialBase } 多个材质
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._multiMaterial;
            },
            /**
            * @language zh_CN
            * 设置多材质
            * @param multiMat 多个材质
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (multiMat) {
                this._multiMaterial = multiMat;
                this._materialCount = 0;
                for (var key in multiMat) {
                    this._materialCount++;
                }
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
        IRender.prototype.update = function (time, delay, camera) {
            _super.prototype.update.call(this, time, delay, camera);
            if (this.inFrustum) {
                if (this.animation) {
                    this.animation.update(time, delay, this.geometry);
                }
            }
            if (this.geometry.subGeometrys.length <= 0) {
                this.geometry.buildDefaultSubGeometry();
            }
        };
        /**
        * @language zh_CN
        * 释放所有数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        IRender.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this._bound) {
                this._bound.dispose();
                this._bound = null;
            }
            this.geometry = null;
            //for (var key in this.multiMaterial) {
            //    this.multiMaterial[key].dispose();
            //}
            this.multiMaterial = {};
        };
        return IRender;
    }(egret3d.Object3D));
    /**
    * @language zh_CN
    * IRender Mesh 类型
    * @version Egret 3.0
    * @platform Web,Native
    */
    IRender.TYPE_MESH = "mesh";
    /**
    * @language zh_CN
    * IRender Particle 类型
    * @version Egret 3.0
    * @platform Web,Native
    */
    IRender.TYPE_PARTICLE_EMIT = "particleEmit";
    /**
    * @language zh_CN
    * IRender Wireframe 类型
    * @version Egret 3.0
    * @platform Web,Native
    */
    IRender.TYPE_WIREFRAME = "wireframe";
    egret3d.IRender = IRender;
    __reflect(IRender.prototype, "egret3d.IRender");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=IRender.js.map