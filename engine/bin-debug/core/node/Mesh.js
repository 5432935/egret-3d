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
    * @class egret3d.Mesh
    * @classdesc
    * 3d模型网格 生成渲染模型
    * 创建一个Mesh网格数据和材质数据是必需的，如果是动态模型就加上动画数据
    * 继承Object3D对象，场景中实体渲染对象
    *
    * @see egret3d.Object3D
    * @see egret3d.Geometry
    * @see egret3d.MaterialBase
    * @see egret3d.IAnimation
    * @see egret3d.SkeletonAnimation
    *
    * 示例:
    * @includeExample core/node/Mesh.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Mesh = (function (_super) {
        __extends(Mesh, _super);
        /**
        * @language zh_CN
        * 构建一个Mesh对象
        * @param geometry 模型数据
        * @param material 模型材质 默认为null 为null做自动创建一个TextureMaterial
        * @param animation 模型动画 默认为null 没有动画可以不指定
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Mesh(geometry, material, animation) {
            if (material === void 0) { material = null; }
            if (animation === void 0) { animation = null; }
            var _this = _super.call(this) || this;
            _this.type = egret3d.IRender.TYPE_MESH;
            _this.geometry = geometry;
            if (animation) {
                _this.animation = animation;
            }
            else {
                if (geometry) {
                    if (_this.geometry.vertexFormat & egret3d.VertexFormat.VF_SKIN) {
                        _this.animation = new egret3d.SkeletonAnimation(new egret3d.SkeletonAnimationState());
                    }
                }
            }
            _this.material = material ? material : new egret3d.TextureMaterial();
            _this.addSubMaterial(0, _this.material);
            _this.bound = _this.buildBoundBox();
            return _this;
        }
        Object.defineProperty(Mesh.prototype, "aabb", {
            /**
            * @private
            */
            get: function () {
                return this._aabbBox;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @private
        */
        Mesh.prototype.initAABB = function () {
            this._aabbBox = new egret3d.QuadAABB();
            this.calcGlobalQuadAABB();
        };
        /**
        * @private
        * 更新绑定盒的全局数据，适用于静态物体
        */
        Mesh.prototype.calcGlobalQuadAABB = function () {
            var box = this.bound;
            var mtx = this.modelMatrix;
            Mesh.AABB_BL_2.setTo(box.min.x, box.min.y, box.min.z);
            Mesh.AABB_BR_2.setTo(box.max.x, box.min.y, box.min.z);
            Mesh.AABB_TL_2.setTo(box.min.x, box.max.y, box.min.z);
            Mesh.AABB_TR_2.setTo(box.max.x, box.max.y, box.min.z);
            Mesh.AABB_BL_1.setTo(box.min.x, box.min.y, box.max.z);
            Mesh.AABB_BR_1.setTo(box.max.x, box.min.y, box.max.z);
            Mesh.AABB_TL_1.setTo(box.min.x, box.max.y, box.max.z);
            Mesh.AABB_TR_1.setTo(box.max.x, box.max.y, box.max.z);
            mtx.transformVector(Mesh.AABB_BL_2, Mesh.AABB_BL_2);
            mtx.transformVector(Mesh.AABB_BR_2, Mesh.AABB_BR_2);
            mtx.transformVector(Mesh.AABB_TL_2, Mesh.AABB_TL_2);
            mtx.transformVector(Mesh.AABB_TR_2, Mesh.AABB_TR_2);
            mtx.transformVector(Mesh.AABB_BL_1, Mesh.AABB_BL_1);
            mtx.transformVector(Mesh.AABB_BR_1, Mesh.AABB_BR_1);
            mtx.transformVector(Mesh.AABB_TL_1, Mesh.AABB_TL_1);
            mtx.transformVector(Mesh.AABB_TR_1, Mesh.AABB_TR_1);
            this._aabbBox.maxPosX = Math.max(Mesh.AABB_TL_2.x, Mesh.AABB_TR_2.x, Mesh.AABB_BL_2.x, Mesh.AABB_BR_2.x, Mesh.AABB_TL_1.x, Mesh.AABB_TR_1.x, Mesh.AABB_BL_1.x, Mesh.AABB_BR_1.x);
            this._aabbBox.maxPosY = Math.max(Mesh.AABB_TL_2.y, Mesh.AABB_TR_2.y, Mesh.AABB_BL_2.y, Mesh.AABB_BR_2.y, Mesh.AABB_TL_1.y, Mesh.AABB_TR_1.y, Mesh.AABB_BL_1.y, Mesh.AABB_BR_1.y);
            this._aabbBox.minPosX = Math.min(Mesh.AABB_TL_2.x, Mesh.AABB_TR_2.x, Mesh.AABB_BL_2.x, Mesh.AABB_BR_2.x, Mesh.AABB_TL_1.x, Mesh.AABB_TR_1.x, Mesh.AABB_BL_1.x, Mesh.AABB_BR_1.x);
            this._aabbBox.minPosY = Math.min(Mesh.AABB_TL_2.y, Mesh.AABB_TR_2.y, Mesh.AABB_BL_2.y, Mesh.AABB_BR_2.y, Mesh.AABB_TL_1.y, Mesh.AABB_TR_1.y, Mesh.AABB_BL_1.y, Mesh.AABB_BR_1.y);
        };
        Object.defineProperty(Mesh.prototype, "isTriangle", {
            /**
            * @private
            */
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Mesh.prototype.onUpdateTransform = function () {
            this._aabbBox.setOffset(this._pos);
        };
        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        Mesh.prototype.copy = function (other) {
            _super.prototype.copy.call(this, other);
            for (var key in other.multiMaterial) {
                if (key == "0") {
                    continue;
                }
                this._multiMaterial[key] = other.multiMaterial[key];
            }
            this._materialCount = other.materialCount;
        };
        /**
        * @language zh_CN
        * 克隆一个模型
        * @returns 克隆后的模型
        * @version Egret 3.0
        * @platform Web,Native
        */
        Mesh.prototype.clone = function () {
            var ani = null;
            if (this.animation) {
                ani = this.animation.clone();
            }
            var cloneMesh = new Mesh(this.geometry, this.material, ani);
            cloneMesh.copy(this);
            return cloneMesh;
        };
        /**
        * @language zh_CN
        * @private
        * 生成包围盒
        */
        Mesh.prototype.buildBoundBox = function () {
            var bound = new egret3d.BoundBox(this);
            if (this.geometry && this.geometry.vertexArray) {
                bound.min.copyFrom(new egret3d.Vector3(egret3d.MathUtil.MAX_VALUE, egret3d.MathUtil.MAX_VALUE, egret3d.MathUtil.MAX_VALUE));
                bound.max.copyFrom(new egret3d.Vector3(-egret3d.MathUtil.MAX_VALUE, -egret3d.MathUtil.MAX_VALUE, -egret3d.MathUtil.MAX_VALUE));
                for (var i = 0; i < this.geometry.vertexArray.length; i += this.geometry.vertexAttLength) {
                    if (bound.max.x < this.geometry.vertexArray[i]) {
                        bound.max.x = this.geometry.vertexArray[i];
                    }
                    if (bound.max.y < this.geometry.vertexArray[i + 1]) {
                        bound.max.y = this.geometry.vertexArray[i + 1];
                    }
                    if (bound.max.z < this.geometry.vertexArray[i + 2]) {
                        bound.max.z = this.geometry.vertexArray[i + 2];
                    }
                    if (bound.min.x > this.geometry.vertexArray[i]) {
                        bound.min.x = this.geometry.vertexArray[i];
                    }
                    if (bound.min.y > this.geometry.vertexArray[i + 1]) {
                        bound.min.y = this.geometry.vertexArray[i + 1];
                    }
                    if (bound.min.z > this.geometry.vertexArray[i + 2]) {
                        bound.min.z = this.geometry.vertexArray[i + 2];
                    }
                }
            }
            bound.fillBox(bound.min, bound.max);
            bound.createChild();
            this.bound = bound;
            this.initAABB();
            return bound;
        };
        return Mesh;
    }(egret3d.IRender));
    Mesh.AABB_TL_1 = new egret3d.Vector3();
    Mesh.AABB_TR_1 = new egret3d.Vector3();
    Mesh.AABB_BL_1 = new egret3d.Vector3();
    Mesh.AABB_BR_1 = new egret3d.Vector3();
    Mesh.AABB_TL_2 = new egret3d.Vector3();
    Mesh.AABB_TR_2 = new egret3d.Vector3();
    Mesh.AABB_BL_2 = new egret3d.Vector3();
    Mesh.AABB_BR_2 = new egret3d.Vector3();
    egret3d.Mesh = Mesh;
    __reflect(Mesh.prototype, "egret3d.Mesh", ["egret3d.IQuadNode"]);
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Mesh.js.map