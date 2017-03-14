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
    * @private
    * @class egret3d.ParticlePosition
    * @classdesc
    * 粒子位置效果节点，刚出生相对于(0,0,0)位置的偏移量
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParticlePosition = (function (_super) {
        __extends(ParticlePosition, _super);
        function ParticlePosition() {
            var _this = _super.call(this) || this;
            //##FilterBegin## ##Particle##
            _this.name = "ParticlePosition";
            _this.attribute_offsetPosition = new egret3d.GLSL.VarRegister();
            _this.attribute_offsetPosition.name = "attribute_offsetPosition";
            _this.attribute_offsetPosition.size = 3;
            _this.attributes.push(_this.attribute_offsetPosition);
            return _this;
            //##FilterEnd##
        }
        /**
        * @language zh_CN
        * 填充粒子发射器形状数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticlePosition.prototype.initNode = function (data, arg) {
            //##FilterBegin## ##Particle##
            //根据粒子的属性，选择使用相机方式
            var renderMode = arg.renderMode;
            if (renderMode == egret3d.ParticleRenderModeType.StretchedBillboard) {
                this.importShader(true, egret3d.ShaderPhaseType.local_vertex, "particle_stretched_mode");
            }
            //初始化顶点数据
            var node = this._node = data;
            if (node.type == egret3d.ParticleDataShapeType.Point) {
                var pointShape = new egret3d.Vec3ConstValueShape();
                pointShape.minX = 0;
                pointShape.minY = 0;
                pointShape.minZ = 0;
                this._positions = pointShape;
            }
            else if (node.type == egret3d.ParticleDataShapeType.Cube) {
                var cubeShape = new egret3d.CubeVector3DValueShape();
                cubeShape.width = node.cubeW;
                cubeShape.height = node.cubeH;
                cubeShape.depth = node.cubeD;
                this._positions = cubeShape;
            }
            else if (node.type == egret3d.ParticleDataShapeType.Sphere) {
                var sphereShape = new egret3d.BallValueShape();
                sphereShape.r = node.sphereRadius;
                sphereShape.fromShell = node.emitFromShell;
                this._positions = sphereShape;
            }
            else if (node.type == egret3d.ParticleDataShapeType.HemiSphere) {
                var hemiShape = new egret3d.HemiBallValueShape();
                hemiShape.r = node.hemiSphereRadius;
                hemiShape.fromShell = node.emitFromShell;
                this._positions = hemiShape;
            }
            else if (node.type == egret3d.ParticleDataShapeType.Cone) {
                var coneShape = new egret3d.ConeValueShape();
                coneShape.angle = node.coneAngle;
                coneShape.length = node.coneLength;
                coneShape.radius = node.coneRadius;
                coneShape.coneType = node.coneType;
                this._positions = coneShape;
            }
            else if (node.type == egret3d.ParticleDataShapeType.Mesh) {
                var meshShape = new egret3d.Mesh3DValueShape();
                meshShape.geometry = node.geometry;
                meshShape.type = node.meshType;
                this._positions = meshShape;
            }
            else if (node.type == egret3d.ParticleDataShapeType.External) {
                var externalShape = new egret3d.ValueShapeExternal();
                externalShape.positionList = node.externalPositionList;
                this._positions = externalShape;
            }
            //##FilterEnd##
        };
        Object.defineProperty(ParticlePosition.prototype, "offsetIndex", {
            /**
            * @language zh_CN
            * 获取位置节点在geometry的顶点数据中偏移量
            * @returns number
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.attribute_offsetPosition.offsetIndex;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 填充顶点数据
        * @param geometry 网格数据
        * @param count 粒子数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticlePosition.prototype.build = function (geometry, count) {
            //##FilterBegin## ##Particle##
            this._animationState = this.state;
            var positionArray = this._positions.calculate(count);
            var directionArray = this._animationState.directionArray = [];
            var meshNormalArray;
            if (this._node.type == egret3d.ParticleDataShapeType.Mesh) {
                meshNormalArray = this._positions.normalList;
            }
            var vertices = geometry.vertexCount / count;
            var index = 0;
            var data = this._animationState.emitter.data;
            var recordPos = new egret3d.Vector3(); //用于计算方向，缩放后的位置不能用于计算方向
            var coneShape = this._positions;
            for (var i = 0; i < count; ++i) {
                var pos = positionArray[i];
                recordPos.copyFrom(pos);
                //缩放______________________________________________________
                //pos.multiply(data.property.scale, pos);
                //粒子发射方向
                var dir = new egret3d.Vector3();
                if (data.shape.randomDirection) {
                    if (this._node.type == egret3d.ParticleDataShapeType.Cone &&
                        (this._node.coneType == egret3d.ParticleConeShapeType.Base || this._node.coneType == egret3d.ParticleConeShapeType.BaseShell)) {
                        this._positions.randomDirectionToTop(dir);
                    }
                    else {
                        dir.setTo(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
                    }
                }
                else {
                    if (this._node.type == egret3d.ParticleDataShapeType.Point) {
                        dir.setTo(0, 0, 1, 1);
                    }
                    else if (this._node.type == egret3d.ParticleDataShapeType.Cube) {
                        dir.setTo(0, 0, 1, 1);
                    }
                    else if (this._node.type == egret3d.ParticleDataShapeType.Sphere) {
                        dir.copyFrom(recordPos);
                    }
                    else if (this._node.type == egret3d.ParticleDataShapeType.HemiSphere) {
                        dir.copyFrom(recordPos);
                    }
                    else if (this._node.type == egret3d.ParticleDataShapeType.Cone) {
                        dir = coneShape.directions[i];
                    }
                    else if (this._node.type == egret3d.ParticleDataShapeType.Mesh) {
                        dir.copyFrom(meshNormalArray[i]);
                    }
                    else if (this._node.type == egret3d.ParticleDataShapeType.External) {
                        dir.setTo(0, 0, 1, 1);
                    }
                }
                dir.normalize();
                directionArray.push(dir);
                //创建位置
                for (var j = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_offsetPosition.offsetIndex;
                    geometry.vertexArray[index + 0] = pos.x;
                    geometry.vertexArray[index + 1] = pos.y;
                    geometry.vertexArray[index + 2] = pos.z;
                }
            }
            //##FilterEnd##
        };
        /**
        * @private
        * 构建结束后需要清理掉临时数据
        */
        ParticlePosition.prototype.afterBuild = function () {
            //##FilterBegin## ##Particle##
            this._positions.dispose();
            this._positions = null;
            this._animationState.directionArray.length = 0;
            this._animationState.directionArray = null;
            //##FilterEnd##
        };
        /**
        * @private
        */
        ParticlePosition.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._positions = null;
            this._animationState = null;
            this._node = null;
        };
        return ParticlePosition;
    }(egret3d.AnimationNode));
    egret3d.ParticlePosition = ParticlePosition;
    __reflect(ParticlePosition.prototype, "egret3d.ParticlePosition");
})(egret3d || (egret3d = {}));
