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
    * @class egret3d.GrassMesh
    * @classdesc
    * 实现风吹草动，并且实现了单个角色在草丛中，挤压草的效果
    * @see egret3d.plant.GrassMethod.ts
    * @includeExample plant/GrassMesh.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var GrassMesh = (function (_super) {
        __extends(GrassMesh, _super);
        /**
        * @language zh_CN
        * 构造函数
        * @param birthPoints 草的出生位置列表
        * @param material 材质
        * @param data 草的属性
        * @version Egret 3.0
        * @platform Web,Native
        */
        function GrassMesh(birthPoints, material, data) {
            var _this = _super.call(this, null, material) || this;
            material.bothside = true;
            _this._method = new egret3d.GrassMethod(data);
            material.diffusePass.addMethod(_this._method);
            _this._data = data;
            _this._birthPoints = birthPoints;
            _this._count = birthPoints.length;
            _this._plantShape = new egret3d.PlaneGeometry(1, 1, 1, 1, 1, 1, egret3d.Vector3.Z_AXIS, true, false);
            _this.initialize();
            _this.initBoudBox(new egret3d.Vector3(egret3d.MathUtil.MAX_VALUE, egret3d.MathUtil.MAX_VALUE, egret3d.MathUtil.MAX_VALUE));
            return _this;
        }
        Object.defineProperty(GrassMesh.prototype, "method", {
            /**
            * @language zh_CN
            * 获取GrassMethod
            * @returns 草的Method，用于外部控制
            */
            get: function () {
                return this._method;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @private
        */
        GrassMesh.prototype.initialize = function () {
            this.geometry = new egret3d.Geometry();
            this.geometry.buildDefaultSubGeometry();
            this.geometry.subGeometrys[0].count = this._count * this._plantShape.indexCount;
            //
            var vertexIndex = 0;
            var vertexArray = [];
            //
            var vf = egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_UV0 | egret3d.VertexFormat.VF_COLOR | egret3d.VertexFormat.VF_NORMAL;
            this.geometry.vertexFormat = vf;
            //
            this.initGeometryAttr(this.geometry);
            this.geometry.vertexCount = this._count * this._plantShape.vertexCount;
            this.geometry.indexCount = this._count * this._plantShape.indexCount;
            this._plantShape.getVertexForIndex(0, vf, vertexArray, this._plantShape.vertexCount);
            for (var i = 0; i < this._count; ++i) {
                vertexIndex = i * this._plantShape.vertexCount;
                this.geometry.setVerticesForIndex(vertexIndex, vf, vertexArray, this._plantShape.vertexCount);
            }
            for (var i = 0; i < this._count; ++i) {
                for (var j = 0; j < this._plantShape.indexArray.length; ++j) {
                    this.geometry.indexArray[i * this._plantShape.indexArray.length + j] = this._plantShape.indexArray[j] + i * this._plantShape.vertexCount;
                }
            }
            //最后根据节点功能，填充模型
            this.initPostionData(this.geometry, this._count);
        };
        /**
        * @language zh_CN
        * 计算节点
        * @private
        */
        GrassMesh.prototype.initGeometryAttr = function (geometry) {
            //position
            this._attrPosition = new egret3d.GLSL.VarRegister();
            this._attrPosition.name = "attribute_grassOffset";
            this._attrPosition.size = 3;
            var offsetIndex = geometry.vertexAttLength;
            this._attrPosition.offsetIndex = offsetIndex;
            geometry.vertexAttLength += this._attrPosition.size;
            geometry.vertexSizeInBytes += this._attrPosition.size * 4;
            geometry.subGeometrys[0].preAttList.push(this._attrPosition);
            //angleY
            this._attrAngleY = new egret3d.GLSL.VarRegister();
            this._attrAngleY.name = "attribute_grassAngleY";
            this._attrAngleY.size = 1;
            var offsetIndex = geometry.vertexAttLength;
            this._attrAngleY.offsetIndex = offsetIndex;
            geometry.vertexAttLength += this._attrAngleY.size;
            geometry.vertexSizeInBytes += this._attrAngleY.size * 4;
            geometry.subGeometrys[0].preAttList.push(this._attrAngleY);
        };
        /**
        * @language zh_CN
        * @private
        * 构建包围盒
        * @version Egret 3.0
        * @platform Web,Native
        */
        GrassMesh.prototype.initBoudBox = function (vector) {
            //##FilterBegin## ##Particle##
            var b = new egret3d.BoundBox(this);
            b.fillBox(new egret3d.Vector3(-vector.x / 2, -vector.y / 2, -vector.z / 2), new egret3d.Vector3(vector.x / 2, vector.y / 2, vector.z / 2));
            this.bound = b;
            this.initAABB();
            //##FilterEnd##
        };
        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        GrassMesh.prototype.update = function (time, delay, camera) {
            _super.prototype.update.call(this, time, delay, camera);
        };
        /**
        * @language zh_CN
        * 填充顶点数据
        * @param geometry 网格数据
        * @param count 数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        GrassMesh.prototype.initPostionData = function (geometry, count) {
            var positionArray = this._birthPoints;
            var vertices = geometry.vertexCount / count;
            var index = 0;
            //创建位置
            var birthPosIndex = this._attrPosition.offsetIndex;
            for (var i = 0; i < count; ++i) {
                var pos = positionArray[i];
                for (var j = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + birthPosIndex;
                    geometry.vertexArray[index + 0] = pos.x;
                    geometry.vertexArray[index + 1] = pos.y;
                    geometry.vertexArray[index + 2] = pos.z;
                }
            }
            //修改width height
            var width;
            var height;
            var vertexPosIndex = 0;
            if (this._data.maxWidth != 1 || this._data.minWidth != 1 || this._data.maxHeight != 1 || this._data.minHeight != 1) {
                for (var i = 0; i < count; ++i) {
                    //创建位置
                    width = egret3d.MathUtil.mix(this._data.minWidth, this._data.maxWidth, Math.random());
                    height = egret3d.MathUtil.mix(this._data.minHeight, this._data.maxHeight, Math.random());
                    for (var j = 0; j < vertices; ++j) {
                        index = i * vertices + j;
                        index = index * geometry.vertexAttLength + 0;
                        geometry.vertexArray[index + 0] *= width;
                        geometry.vertexArray[index + 1] *= height;
                    }
                }
            }
            //修改颜色
            var colorPosIndex = 6; //position + normal
            var tempColor = new egret3d.Color();
            var random;
            var r;
            var g;
            var b;
            var noiseSpread = Math.abs(this._data.noiseSpread) * 10;
            var scaleValue = 1 / 0xff;
            var healthyColor = new egret3d.Color();
            var dryColor = new egret3d.Color();
            healthyColor.setColorRGB(Number(this._data.healthyColor));
            dryColor.setColorRGB(Number(this._data.dryColor));
            for (var i = 0; i < count; ++i) {
                random = Math.random() * noiseSpread;
                if (random > 1) {
                    random = 1;
                }
                random *= random;
                tempColor.lerp(healthyColor, dryColor, random);
                tempColor.scaleBy(scaleValue);
                for (var j = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + colorPosIndex;
                    geometry.vertexArray[index + 0] *= tempColor.r;
                    geometry.vertexArray[index + 1] *= tempColor.g;
                    geometry.vertexArray[index + 2] *= tempColor.b;
                    geometry.vertexArray[index + 3] = 1.0;
                }
            }
            //修改旋转
            if (!this._data.billboard) {
                var rotationYIndex = this._attrAngleY.offsetIndex;
                var angleY;
                for (var i = 0; i < count; ++i) {
                    angleY = Math.random() * 2 * Math.PI;
                    for (var j = 0; j < vertices; ++j) {
                        index = i * vertices + j;
                        index = index * geometry.vertexAttLength + rotationYIndex;
                        geometry.vertexArray[index + 0] = angleY;
                    }
                }
            }
            this.billboard = this._data.billboard ? egret3d.BillboardType.Y_AXIS : egret3d.BillboardType.DISABLE;
        };
        /**
        * @language zh_CN
        * 克隆该风吹草动
        * @returns 克隆后的草
        * @version Egret 3.0
        * @platform Web,Native
        */
        GrassMesh.prototype.clone = function () {
            var newPlantGroup;
            newPlantGroup = new GrassMesh(this._birthPoints.slice(), this.material, this._data);
            newPlantGroup.position = this.position;
            newPlantGroup.orientation = this.orientation;
            newPlantGroup.scale = this.scale;
            return newPlantGroup;
        };
        /**
        * @language zh_CN
        * 释放所有数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        GrassMesh.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this._plantShape) {
                this._plantShape.dispose();
                this._plantShape = null;
            }
            this._birthPoints = null;
            this._data = null;
        };
        return GrassMesh;
    }(egret3d.Mesh));
    egret3d.GrassMesh = GrassMesh;
    __reflect(GrassMesh.prototype, "egret3d.GrassMesh");
    /**
    * @language zh_CN
    * @class egret3d.GrassMethod
    * @classdesc
    * 构造函数，用于设置草的属性
    * @version Egret 3.0
    * @platform Web,Native
    */
    var GrassData = (function () {
        function GrassData() {
            /**
            * @language zh_CN
            * 面片的最小宽度
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.minWidth = 100;
            /**
            * @language zh_CN
            * 面片的最大宽度
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.maxWidth = 100;
            /**
            * @language zh_CN
            * 面片的最小高度
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.minHeight = 100;
            /**
            * @language zh_CN
            * 面片的最大高度
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.maxHeight = 100;
            /**
            * @language zh_CN
            * 草的噪波产生簇大小。越低的值意味着噪波越低。
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.noiseSpread = 0;
            /**
            * @language zh_CN
            * 如果选中，草将随着摄像机一起转动，面朝主摄像机
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.billboard = true;
        }
        return GrassData;
    }());
    egret3d.GrassData = GrassData;
    __reflect(GrassData.prototype, "egret3d.GrassData");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=GrassMesh.js.map