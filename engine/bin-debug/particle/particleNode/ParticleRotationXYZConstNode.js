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
    * @class egret3d.ParticleRotationTwoBezierNode
    * @classdesc
    * 粒子的旋转角速度，当前实现为XYZ轴的速度
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParticleRotationXYZConstNode = (function (_super) {
        __extends(ParticleRotationXYZConstNode, _super);
        function ParticleRotationXYZConstNode() {
            var _this = _super.call(this) || this;
            //##FilterBegin## ##Particle##
            _this.name = "ParticleRotationXYZConstNode";
            _this.importShader(true, egret3d.ShaderPhaseType.local_vertex, "particle_rotationXYZConst");
            _this.attribute_rotBirthXYZ = new egret3d.GLSL.VarRegister();
            _this.attribute_rotBirthXYZ.name = "attribute_rotBirthXYZ";
            _this.attribute_rotBirthXYZ.size = 3;
            _this.attributes.push(_this.attribute_rotBirthXYZ);
            _this.attribute_rotSpeedXYZ = new egret3d.GLSL.VarRegister();
            _this.attribute_rotSpeedXYZ.name = "attribute_rotSpeedXYZ";
            _this.attribute_rotSpeedXYZ.size = 3;
            _this.attributes.push(_this.attribute_rotSpeedXYZ);
            return _this;
            //##FilterEnd##
        }
        /**
        * @language zh_CN
        * 填充粒子过程旋转数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleRotationXYZConstNode.prototype.initNode = function (data) {
            //##FilterBegin## ##Particle##
            var node = data;
            this._rotationSpeed = new egret3d.Vec3ConstRandomValueShape();
            this._rotationSpeed.maxX = node.max.x;
            this._rotationSpeed.maxY = node.max.y;
            this._rotationSpeed.maxZ = node.max.z;
            this._rotationSpeed.minX = node.min.x;
            this._rotationSpeed.minY = node.min.y;
            this._rotationSpeed.minZ = node.min.z;
            //##FilterEnd##
        };
        /**
        * @language zh_CN
        * 填充顶点数据
        * @param geometry 网格数据
        * @param count 粒子数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleRotationXYZConstNode.prototype.build = function (geometry, count) {
            //##FilterBegin## ##Particle##
            var index = 0;
            var vertices = geometry.vertexCount / count;
            var data = this._rotationSpeed.calculate(count);
            var birthRotX;
            var birthRotY;
            var birthRotZ;
            for (var i = 0; i < count; ++i) {
                var rot = data[i];
                birthRotX = Math.random() * 360 - 180;
                birthRotY = Math.random() * 360 - 180;
                birthRotZ = Math.random() * 360 - 180;
                for (var j = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_rotSpeedXYZ.offsetIndex;
                    geometry.vertexArray[index + 0] = rot.x;
                    geometry.vertexArray[index + 1] = rot.y;
                    geometry.vertexArray[index + 2] = rot.z;
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_rotBirthXYZ.offsetIndex;
                    geometry.vertexArray[index + 0] = birthRotX;
                    geometry.vertexArray[index + 1] = birthRotY;
                    geometry.vertexArray[index + 2] = birthRotZ;
                }
            }
            //##FilterEnd##
        };
        /**
        * @private
        * 构建结束后需要清理掉临时数据
        */
        ParticleRotationXYZConstNode.prototype.afterBuild = function () {
            //##FilterBegin## ##Particle##
            this._rotationSpeed.dispose();
            this._rotationSpeed = null;
            //##FilterEnd##
        };
        /**
        * @private
        */
        ParticleRotationXYZConstNode.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._rotationSpeed = null;
        };
        return ParticleRotationXYZConstNode;
    }(egret3d.AnimationNode));
    egret3d.ParticleRotationXYZConstNode = ParticleRotationXYZConstNode;
    __reflect(ParticleRotationXYZConstNode.prototype, "egret3d.ParticleRotationXYZConstNode");
})(egret3d || (egret3d = {}));
