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
    * @private
    * 追踪某个固定位置
    */
    var ParticleTrackPositionNode = (function (_super) {
        __extends(ParticleTrackPositionNode, _super);
        function ParticleTrackPositionNode() {
            var _this = _super.call(this) || this;
            _this._verticesDataDirty = true;
            //##FilterBegin## ##Particle##
            _this.name = "ParticleTrackPositionNode";
            _this.importShader(true, egret3d.ShaderPhaseType.local_vertex, "particle_trackPosition");
            _this.attribute_trackPosition = new egret3d.GLSL.VarRegister();
            _this.attribute_trackPosition.name = "attribute_trackPosition";
            _this.attribute_trackPosition.size = 3;
            _this.attributes.push(_this.attribute_trackPosition);
            return _this;
            //##FilterEnd##
        }
        Object.defineProperty(ParticleTrackPositionNode.prototype, "endCoords", {
            get: function () {
                return this._toCoords;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 将粒子的出生位置设置为原结束为止，然后重新设置结束位置
        * @param fromCoords 粒子出生位置列表
        * @param endCoords 粒子目标位置列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleTrackPositionNode.prototype.trackPosition = function (fromCoords, endCoords) {
            //##FilterBegin## ##Particle##
            if (fromCoords.length != this._count || endCoords.length != this._count) {
                throw new Error("count don't match!");
            }
            var index;
            var positionIndex = this._animationState.emitter.positionNode.offsetIndex;
            var geometry = this._animationState.emitter.geometry;
            var vertices = geometry.vertexCount / this._count;
            for (var i = 0; i < this._count; ++i) {
                var fromPos = fromCoords[i];
                var toPos = endCoords[i];
                //创建位置
                for (var j = 0; j < vertices; ++j) {
                    //from
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + positionIndex;
                    geometry.vertexArray[index + 0] = fromPos.x;
                    geometry.vertexArray[index + 1] = fromPos.y;
                    geometry.vertexArray[index + 2] = fromPos.z;
                    //end
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_trackPosition.offsetIndex;
                    geometry.vertexArray[index + 0] = toPos.x;
                    geometry.vertexArray[index + 1] = toPos.y;
                    geometry.vertexArray[index + 2] = toPos.z;
                }
            }
            this._toCoords = endCoords;
            this._verticesDataDirty = true;
            //##FilterEnd##
        };
        /**
        * @private
        */
        ParticleTrackPositionNode.prototype.activeState = function (time, animTime, delay, animDelay, usage, geometry, context3DProxy) {
            //##FilterBegin## ##Particle##
            if (this._verticesDataDirty) {
                geometry.geometry.upload(context3DProxy);
                this._verticesDataDirty = false;
            }
            //##FilterEnd##
        };
        /**
        * @language zh_CN
        * 填充粒子过程旋转数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        ParticleTrackPositionNode.prototype.initNode = function (data) {
            //##FilterBegin## ##Particle##
            //var node: ParticleDataRotationSpeed = <ParticleDataRotationSpeed>data;
            this._trackPosition = new egret3d.CubeVector3DValueShape();
            this._trackPosition.depth = 200;
            this._trackPosition.width = 300;
            this._trackPosition.height = 100;
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
        ParticleTrackPositionNode.prototype.build = function (geometry, count) {
            //##FilterBegin## ##Particle##
            this._animationState = this.state;
            this._count = count;
            //##FilterEnd##
        };
        /**
        * @private
        * 构建结束后需要清理掉临时数据
        */
        ParticleTrackPositionNode.prototype.afterBuild = function () {
            //##FilterBegin## ##Particle##
            this._trackPosition.dispose();
            this._trackPosition = null;
            //##FilterEnd##
        };
        /**
        * @private
        */
        ParticleTrackPositionNode.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._trackPosition = null;
        };
        return ParticleTrackPositionNode;
    }(egret3d.AnimationNode));
    egret3d.ParticleTrackPositionNode = ParticleTrackPositionNode;
    __reflect(ParticleTrackPositionNode.prototype, "egret3d.ParticleTrackPositionNode");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ParticleTrackPositionNode.js.map