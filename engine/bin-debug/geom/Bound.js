var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @class egret3d.Bound
    * @classdesc
    * 可使用 Bound 类 取得包围盒的数据。</p>
    * 包含包围盒的各顶点信息，当包围盒要进行世界变换时，应当变换各顶点信息。</p>
    * 包围物体的顶点数据都是和绑定物体同一空间,变换信息也是用的共同的
    *
    * @includeExample geom/Bound.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Bound = (function () {
        /**
        * @language zh_CN
        * 创建一个包围对象
        * @prame owner 绑定的Object3D对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Bound(owner) {
            /**
            * @language zh_CN
            * 顶点长度
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.vexLength = 3;
            this.matrix = new egret3d.Matrix4();
            this.temp = new egret3d.Vector3();
            this.owner = owner;
        }
        Bound.prototype.initBound = function () {
            if (this._bound == null) {
                this._bound = new egret3d.Wireframe();
                this._bound.material.diffuseColor = 0xffffff;
                this._bound.name = "Bound";
                this._bound.geometry.vertexCount = 8;
                this._bound.geometry.indexCount = 24;
                this._bound.geometry.setVertexIndices(0, [0, 1, 1, 2, 2, 3, 0, 3, 4, 5, 5, 6, 6, 7, 4, 7, 0, 4, 1, 5, 3, 7, 2, 6]);
            }
        };
        Object.defineProperty(Bound.prototype, "visible", {
            /**
            * @language zh_CN
            * 获取是否可见
            * @returns boolean 是否可见
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                if (this._bound == null) {
                    return false;
                }
                return this._bound.parent ? true : false;
            },
            /**
            * @language zh_CN
            * 设置是否可见
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this.initBound();
                if (value) {
                    if (!this._bound.parent) {
                        this.owner.addChild(this._bound);
                    }
                    else {
                        if (this._bound.parent != this.owner) {
                            this._bound.parent.removeChild(this._bound);
                            this.owner.addChild(this._bound);
                        }
                    }
                }
                else {
                    if (this._bound.parent) {
                        this._bound.parent.removeChild(this._bound);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bound.prototype, "transform", {
            /**
            * @language zh_CN
            * 得到变换矩阵，如果没有绑定Object3D对象返回本身的矩阵，否则返回父节点的模型矩阵
            * @returns 变换矩阵
            */
            get: function () {
                if (!this.owner) {
                    return this.matrix;
                }
                return this.owner.modelMatrix;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 检测一个点是否包围盒内
        * @param pos 检测的点
        * @returns 成功返回true
        */
        Bound.prototype.pointIntersect = function (pos) {
            return false;
        };
        /**
        * @language zh_CN
        * 检测两个包围对象是否相交
        * @param target 检测的目标
        * @param intersect 默认参数为null 相交的结果 可以为null
        * @returns  成功返回true
        */
        Bound.prototype.intersect = function (target, intersect) {
            if (intersect === void 0) { intersect = null; }
            return true;
        };
        /**
        * @language zh_CN
        * 克隆一个包围对象
        * @returns Bound 包圍對象
        */
        Bound.prototype.clone = function () {
            var bound = new Bound(this.owner);
            bound.copyVertex(this);
            return bound;
        };
        /**
        * @private
        */
        Bound.prototype.calculateTransform = function () {
            for (var j = 0; j < this.vexData.length; j += 3) {
                this.temp.setTo(this.vexData[j], this.vexData[j + 1], this.vexData[j + 2]);
                this.transform.transformVector(this.temp, this.temp);
                this.vexData[j + 0] = this.temp.x;
                this.vexData[j + 1] = this.temp.y;
                this.vexData[j + 2] = this.temp.z;
            }
        };
        /**
        * @private
        */
        Bound.prototype.copyVertex = function (bound) {
            for (var i = 0; i < bound.vexData.length; ++i) {
                this.vexData[i] = bound.vexData[i];
            }
            for (var i = 0; i < bound.indexData.length; ++i) {
                this.indexData[i] = bound.indexData[i];
            }
            this.vexLength = bound.vexLength;
        };
        /**
        * @private
        */
        Bound.prototype.createChild = function () {
            this.childBound = new Bound(this.owner);
        };
        /**
        * @private
        * @language zh_CN
        */
        Bound.prototype.inBound = function (frustum) {
            return true;
        };
        Bound.prototype.updateAABB = function () {
        };
        /**
        * @language zh_CN
        * 释放所有数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        Bound.prototype.dispose = function () {
            if (this._bound != null) {
                this._bound.dispose();
            }
            if (this.childBound) {
                this.childBound.dispose();
            }
        };
        return Bound;
    }());
    egret3d.Bound = Bound;
    __reflect(Bound.prototype, "egret3d.Bound");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Bound.js.map