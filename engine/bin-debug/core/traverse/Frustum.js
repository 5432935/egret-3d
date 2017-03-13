var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @class egret3d.Frustum
    * @classdesc
    * 摄像机视椎体,计算出摄像机的可视范围.
    *
    * @see egret3d.Camera3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Frustum = (function () {
        /**
        * @language zh_CN
        * 构造
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Frustum(camera) {
            if (camera === void 0) { camera = null; }
            this._vtxNum = 8;
            this._planeNum = 6;
            this.nearCenter = new egret3d.Vector3();
            this.farCenter = new egret3d.Vector3();
            /**
            * @private
            **/
            this._tempVector = new egret3d.Vector3();
            this.camera = camera;
            this._vertex = new Array();
            for (var i = 0; i < this._vtxNum; ++i) {
                this._vertex.push(new egret3d.Vector3());
            }
            this._tempVertices = new Array();
            for (var i = 0; i < this._vtxNum; ++i) {
                this._tempVertices.push(new egret3d.Vector3());
            }
            this._pos = new egret3d.Vector3();
            this._plane = new Array();
            for (var i = 0; i < 6; ++i) {
                this._plane.push(new egret3d.Plane3D());
            }
            this.box = new egret3d.BoundBox(null, new egret3d.Vector3(), new egret3d.Vector3());
            this.center = new egret3d.Vector3();
        }
        Object.defineProperty(Frustum.prototype, "vertices", {
            /**
            * @language zh_CN
            * @private
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._vertex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Frustum.prototype, "wireframe", {
            /**
            * @language zh_CN
            * 摄像机渲染线框
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._frustum;
            },
            enumerable: true,
            configurable: true
        });
        Frustum.prototype.initFrustum = function () {
            if (this._frustum == null) {
                this._frustum = new egret3d.Wireframe();
                this._frustum.material.diffuseColor = 0xffffff;
                this._frustum.name = "CameraFrustum";
                this._frustum.geometry.vertexCount = 8;
                this._frustum.geometry.indexCount = 24;
                this._frustum.geometry.setVertexIndices(0, [0, 1, 1, 2, 2, 3, 0, 3, 4, 5, 5, 6, 6, 7, 4, 7, 0, 4, 1, 5, 3, 7, 2, 6]);
            }
        };
        Object.defineProperty(Frustum.prototype, "visible", {
            /**
            * @language zh_CN
            * 是否可见
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                if (this._frustum == null) {
                    return false;
                }
                return this._frustum.parent ? true : false;
            },
            /**
            * @language zh_CN
            * 是否可见
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this.initFrustum();
                if (value) {
                    if (!this._frustum.parent) {
                        this.camera.addChild(this._frustum);
                    }
                    else {
                        if (this._frustum.parent != this.camera) {
                            this._frustum.parent.removeChild(this._frustum);
                            this.camera.addChild(this._frustum);
                        }
                    }
                }
                else {
                    if (this._frustum.parent) {
                        this._frustum.parent.removeChild(this._frustum);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * @private
        * 生成一个视椎体
        * @param fovY 观察时y 轴方向的角度，就是观察范围夹角。
        * @param aspectRatio 纵横比，在视空间宽度除以高度.
        * @param nearPlane 近裁剪面位置Z值.
        * @param farPlane 远裁剪面位置Z值.
        * @version Egret 3.0
        * @platform Web,Native
        */
        Frustum.prototype.makeFrustum = function (fovY, aspectRatio, nearPlane, farPlane) {
            ///var tangent: number = Math.tan(fovY / 2.0 * (Math.PI / 180.0));
            var tangent = Math.tan(fovY / 2.0 * (Math.PI / 180.0));
            var nearHeight = nearPlane * tangent;
            var nearWidth = nearHeight * aspectRatio;
            var farHeight = farPlane * tangent;
            var farWidth = farHeight * aspectRatio;
            /// near top right
            this._vertex[0].x = nearWidth;
            this._vertex[0].y = nearHeight;
            this._vertex[0].z = nearPlane;
            /// near top left
            this._vertex[1].x = -nearWidth;
            this._vertex[1].y = nearHeight;
            this._vertex[1].z = nearPlane;
            /// near bottom left
            this._vertex[2].x = -nearWidth;
            this._vertex[2].y = -nearHeight;
            this._vertex[2].z = nearPlane;
            /// near bottom right
            this._vertex[3].x = nearWidth;
            this._vertex[3].y = -nearHeight;
            this._vertex[3].z = nearPlane;
            /// far top right
            this._vertex[4].x = farWidth;
            this._vertex[4].y = farHeight;
            this._vertex[4].z = farPlane;
            /// far top left
            this._vertex[5].x = -farWidth;
            this._vertex[5].y = farHeight;
            this._vertex[5].z = farPlane;
            /// far bottom left
            this._vertex[6].x = -farWidth;
            this._vertex[6].y = -farHeight;
            this._vertex[6].z = farPlane;
            /// far bottom right
            this._vertex[7].x = farWidth;
            this._vertex[7].y = -farHeight;
            this._vertex[7].z = farPlane;
        };
        Frustum.prototype.makeOrthoFrustum = function (w, h, zn, zf) {
            /// near top right
            this._vertex[0].x = w / 2;
            this._vertex[0].y = h / 2;
            this._vertex[0].z = zn;
            /// near top left
            this._vertex[1].x = -w / 2;
            this._vertex[1].y = h / 2;
            this._vertex[1].z = zn;
            /// near bottom left
            this._vertex[2].x = -w / 2;
            this._vertex[2].y = -h / 2;
            this._vertex[2].z = zn;
            /// near bottom right
            this._vertex[3].x = w / 2;
            this._vertex[3].y = -h / 2;
            this._vertex[3].z = zn;
            /// far top right
            this._vertex[4].x = w / 2;
            this._vertex[4].y = h / 2;
            this._vertex[4].z = zf;
            /// far top left
            this._vertex[5].x = -w / 2;
            this._vertex[5].y = h / 2;
            this._vertex[5].z = zf;
            /// far bottom left
            this._vertex[6].x = -w / 2;
            this._vertex[6].y = -h / 2;
            this._vertex[6].z = zf;
            /// far bottom right
            this._vertex[7].x = w / 2;
            this._vertex[7].y = -h / 2;
            this._vertex[7].z = zf;
        };
        Frustum.prototype.makeOrthoToCenterFrustum = function (l, r, b, t, zn, zf) {
            /// near top right
            this._vertex[0].x = r;
            this._vertex[0].y = t;
            this._vertex[0].z = zn;
            /// near top left
            this._vertex[1].x = l;
            this._vertex[1].y = t;
            this._vertex[1].z = zn;
            /// near bottom left
            this._vertex[2].x = l;
            this._vertex[2].y = b;
            this._vertex[2].z = zn;
            /// near bottom right
            this._vertex[3].x = r;
            this._vertex[3].y = b;
            this._vertex[3].z = zn;
            /// far top right
            this._vertex[4].x = r;
            this._vertex[4].y = t;
            this._vertex[4].z = zf;
            /// far top left
            this._vertex[5].x = l;
            this._vertex[5].y = t;
            this._vertex[5].z = zf;
            /// far bottom left
            this._vertex[6].x = l;
            this._vertex[6].y = b;
            this._vertex[6].z = zf;
            /// far bottom right
            this._vertex[7].x = r;
            this._vertex[7].y = b;
            this._vertex[7].z = zf;
        };
        /**
        * @language zh_CN
        * 数据更新.
        * @param camera 视椎的摄像机.
        * @version Egret 3.0
        * @platform Web,Native
        */
        Frustum.prototype.updateFrustum = function () {
            switch (this.camera.cameraType) {
                case egret3d.CameraType.perspective:
                    this.makeFrustum(this.camera.fieldOfView, this.camera.aspectRatio, this.camera.near, this.camera.far);
                    break;
                case egret3d.CameraType.orthogonal:
                    this.makeOrthoFrustum(this.camera.viewPort.width, this.camera.viewPort.height, this.camera.near, this.camera.far);
                    break;
                case egret3d.CameraType.orthogonalToCenter:
                    this.makeOrthoToCenterFrustum(this.camera.viewPort.x, this.camera.viewPort.y, this.camera.viewPort.width, this.camera.viewPort.height, this.camera.near, this.camera.far);
                    break;
            }
            if (this._frustum != null) {
                for (var i = 0; i < this.vertices.length; ++i) {
                    this._frustum.geometry.setVerticesForIndex(i, egret3d.VertexFormat.VF_POSITION, [this.vertices[i].x, this.vertices[i].y, this.vertices[i].z], 1);
                }
            }
        };
        /**
        * @language zh_CN
        * 数据更新.
        * @param camera 视椎的摄像机.
        * @version Egret 3.0
        * @platform Web,Native
        */
        Frustum.prototype.update = function () {
            /// 摄像机变化之后的顶点也变化;
            var mat = egret3d.Matrix4.helpMatrix;
            mat.copyFrom(this.camera.modelMatrix);
            //this._frustum.modelMatrix = mat;
            for (var i = 0; i < this._vtxNum; ++i) {
                mat.transformVector(this._vertex[i], this._tempVertices[i]);
            }
            this.box.max.x = this.box.max.y = this.box.max.z = -egret3d.MathUtil.MAX_VALUE;
            this.box.min.x = this.box.min.y = this.box.min.z = egret3d.MathUtil.MAX_VALUE;
            for (var i = 0; i < this._tempVertices.length; ++i) {
                if (this.box.max.x < this._tempVertices[i].x) {
                    this.box.max.x = this._tempVertices[i].x;
                }
                if (this.box.max.y < this._tempVertices[i].y) {
                    this.box.max.y = this._tempVertices[i].y;
                }
                if (this.box.max.z < this._tempVertices[i].z) {
                    this.box.max.z = this._tempVertices[i].z;
                }
                if (this.box.min.x > this._tempVertices[i].x) {
                    this.box.min.x = this._tempVertices[i].x;
                }
                if (this.box.min.y > this._tempVertices[i].y) {
                    this.box.min.y = this._tempVertices[i].y;
                }
                if (this.box.min.z > this._tempVertices[i].z) {
                    this.box.min.z = this._tempVertices[i].z;
                }
            }
            this.box.calculateBox();
            this._plane[0].fromPoints(this._tempVertices[4], this._tempVertices[5], this._tempVertices[6]); /// 远平面(far);
            this._plane[1].fromPoints(this._tempVertices[1], this._tempVertices[6], this._tempVertices[5]); /// 左平面(left);
            this._plane[2].fromPoints(this._tempVertices[0], this._tempVertices[4], this._tempVertices[7]); /// 右平面(right);
            this._plane[3].fromPoints(this._tempVertices[1], this._tempVertices[0], this._tempVertices[3]); /// 近平面(near);
            this._plane[4].fromPoints(this._tempVertices[1], this._tempVertices[5], this._tempVertices[4]); /// 上平面(top);
            this._plane[5].fromPoints(this._tempVertices[3], this._tempVertices[7], this._tempVertices[6]); /// 下平面(bottom);
            for (var i = 0; i < this._planeNum; i++) {
                this._plane[i].normalize();
            }
            this.nearCenter.copyFrom(this._tempVertices[0].subtract(this._tempVertices[2], egret3d.MathUtil.CALCULATION_VECTOR3D_0));
            this.nearCenter.scaleBy(0.5);
            this.nearCenter.copyFrom(this._tempVertices[2].add(this.nearCenter, egret3d.MathUtil.CALCULATION_VECTOR3D_1));
            this.farCenter.copyFrom(this._tempVertices[4].subtract(this._tempVertices[6], egret3d.MathUtil.CALCULATION_VECTOR3D_2));
            this.farCenter.scaleBy(0.5);
            this.farCenter.copyFrom(this._tempVertices[6].add(this.farCenter, egret3d.MathUtil.CALCULATION_VECTOR3D_0));
            this.center.copyFrom(this.farCenter.subtract(this.nearCenter, egret3d.MathUtil.CALCULATION_VECTOR3D_1));
            this.center.scaleBy(0.5);
            this.center.copyFrom(this.nearCenter.add(this.center, egret3d.MathUtil.CALCULATION_VECTOR3D_2));
        };
        /**
        * @language zh_CN
        * 检测一个坐标点是否在视椎体内
        * @param pos 检测的坐标
        * @returns 在视椎内返回ture
        * @version Egret 3.0
        * @platform Web,Native
        */
        Frustum.prototype.inPoint = function (pos) {
            var dis = 0;
            for (var i = 0; i < this._plane.length; ++i) {
                dis = this._plane[i].distance(pos);
                if (dis > 0.0) {
                    return false;
                }
            }
            return true;
        };
        /**
        * @language zh_CN
        * 检测一个球是否在视椎体内
        * @param center 球的坐标
        * @param radius 球的半径
        * @returns 在视椎内返回ture
        * @version Egret 3.0
        * @platform Web,Native
        */
        Frustum.prototype.inSphere = function (center, radius) {
            var dis = 0;
            for (var i = 0; i < this._plane.length; ++i) {
                dis = this._plane[i].distance(center);
                if (dis > radius) {
                    return false;
                }
            }
            return true;
        };
        /**
        * @language zh_CN
        * 检测一个盒子是否在视椎体内
        * @param box 盒子
        * @returns 在视椎内返回ture
        * @version Egret 3.0
        * @platform Web,Native
        */
        Frustum.prototype.inBox = function (box) {
            var dis = 0;
            var planeCount = this._plane.length;
            for (var i = 0; i < planeCount; ++i) {
                var incount = box.vexData.length / 3;
                var vexDataLength = box.vexData.length;
                for (var j = 0; j < vexDataLength; j += 3) {
                    this._tempVector.setTo(box.vexData[j], box.vexData[j + 1], box.vexData[j + 2]);
                    box.transform.transformVector(this._tempVector, this._tempVector);
                    dis = this._plane[i].distance(this._tempVector);
                    if (dis > 0) {
                        incount--;
                    }
                }
                if (incount <= 0) {
                    return false;
                }
            }
            return true;
        };
        /**
        * @language zh_CN
        * 释放所有数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        Frustum.prototype.dispose = function () {
            if (this._frustum != null) {
                this._frustum.dispose();
            }
            this._frustum = null;
        };
        return Frustum;
    }());
    egret3d.Frustum = Frustum;
    __reflect(Frustum.prototype, "egret3d.Frustum");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Frustum.js.map