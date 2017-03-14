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
    * @class egret3d.ParticleRotationConstNode
    * @classdesc
    * 粒子的旋转角速度，当前实现为Z轴的速度（todo：模型粒子或许需要同时有x/y/z三个方向的角速度）    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParticleRotationConstNode = (function (_super) {
        __extends(ParticleRotationConstNode, _super);
        function ParticleRotationConstNode() {
            var _this = _super.call(this) || this;
            //##FilterBegin## ##Particle##
            _this.name = "ParticleRotationConstNode";
            _this.importShader(true, egret3d.ShaderPhaseType.local_vertex, "particle_rotationConst");
            _this.attribute_Rotation = new egret3d.GLSL.VarRegister();
            _this.attribute_Rotation.name = "attribute_rotationZ";
            _this.attribute_Rotation.size = 1;
            _this.attributes.push(_this.attribute_Rotation);
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
        ParticleRotationConstNode.prototype.initNode = function (data) {
            //##FilterBegin## ##Particle##
            var node = data;
            this._rotation = new egret3d.ConstRandomValueShape();
            this._rotation.max = node.max.z;
            this._rotation.min = node.min.z;
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
        ParticleRotationConstNode.prototype.build = function (geometry, count) {
            //##FilterBegin## ##Particle##
            var index = 0;
            var vertices = geometry.vertexCount / count;
            var data = this._rotation.calculate(count);
            for (var i = 0; i < count; ++i) {
                var rot = data[i];
                for (var j = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_Rotation.offsetIndex;
                    geometry.vertexArray[index + 0] = rot;
                }
            }
            //##FilterEnd##
        };
        /**
        * @private
        * 构建结束后需要清理掉临时数据
        */
        ParticleRotationConstNode.prototype.afterBuild = function () {
            //##FilterBegin## ##Particle##
            this._rotation.dispose();
            this._rotation = null;
            //##FilterEnd##
        };
        /**
        * @private
        */
        ParticleRotationConstNode.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._rotation = null;
        };
        return ParticleRotationConstNode;
    }(egret3d.AnimationNode));
    egret3d.ParticleRotationConstNode = ParticleRotationConstNode;
    __reflect(ParticleRotationConstNode.prototype, "egret3d.ParticleRotationConstNode");
})(egret3d || (egret3d = {}));
