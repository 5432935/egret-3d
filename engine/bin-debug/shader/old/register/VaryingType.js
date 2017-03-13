var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var GLSL;
    (function (GLSL) {
        /**
        * @private
        * @class egret3d.VaryingType
        * @classdesc
        * shader中varying 变量 类型
        * @version Egret 3.0
        * @platform Web,Native
        */
        var VaryingType = (function () {
            function VaryingType() {
            }
            return VaryingType;
        }());
        /**
        * shader bool类型
        * @version Egret 3.0
        * @platform Web,Native
        */
        VaryingType.bool = "bool";
        /**
        * shader int类型
        * @version Egret 3.0
        * @platform Web,Native
        */
        VaryingType.int = "int";
        /**
        * shader float类型
        * @version Egret 3.0
        * @platform Web,Native
        */
        VaryingType.float = "float";
        /**
        * shader vec2类型 两个 float 组成
        * @version Egret 3.0
        * @platform Web,Native
        */
        VaryingType.vec2 = "vec2";
        /**
        * shader vec3类型 三个 float 组成
        * @version Egret 3.0
        * @platform Web,Native
        */
        VaryingType.vec3 = "vec3";
        /**
        * shader vec4类型 四个 float 组成
        * @version Egret 3.0
        * @platform Web,Native
        */
        VaryingType.vec4 = "vec4";
        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        VaryingType.bvec2 = "bvec2";
        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        VaryingType.bvec3 = "bvec3";
        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        VaryingType.bvec4 = "bvec4";
        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        VaryingType.ivec2 = "ivec2";
        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        VaryingType.ivec3 = "ivec3";
        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        VaryingType.ivec4 = "ivec4";
        /**
        * shader 2x2 矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        VaryingType.mat2 = "mat2";
        /**
        * shader 3x3 矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        VaryingType.mat3 = "mat3";
        /**
        * shader 4x4 矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        VaryingType.mat4 = "mat4";
        /**
        * shader 贴图对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        VaryingType.sampler2D = "sampler2D";
        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        VaryingType.sampleCube = "sampleCube";
        GLSL.VaryingType = VaryingType;
        __reflect(VaryingType.prototype, "egret3d.GLSL.VaryingType");
    })(GLSL = egret3d.GLSL || (egret3d.GLSL = {}));
})(egret3d || (egret3d = {}));
//# sourceMappingURL=VaryingType.js.map