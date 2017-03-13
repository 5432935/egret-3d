var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var GLSL;
    (function (GLSL) {
        /**
        * @private
        * @class egret3d.UniformType
        * @classdesc
        * shader Uniform 变量的类型
        */
        var UniformType = (function () {
            function UniformType() {
            }
            return UniformType;
        }());
        /**
        * shader bool类型
        * @version Egret 3.0
        * @platform Web,Native
        */
        UniformType.bool = "bool";
        /**
        * shader int类型
        * @version Egret 3.0
        * @platform Web,Native
        */
        UniformType.int = "int";
        /**
        * shader float类型
        * @version Egret 3.0
        * @platform Web,Native
        */
        UniformType.float = "float";
        /**
        * shader vec2类型 两个 float 组成
        * @version Egret 3.0
        * @platform Web,Native
        */
        UniformType.vec2 = "vec2";
        /**
        * shader vec3类型 三个 float 组成
        * @version Egret 3.0
        * @platform Web,Native
        */
        UniformType.vec3 = "vec3";
        /**
        * shader vec4类型 四个 float 组成
        * @version Egret 3.0
        * @platform Web,Native
        */
        UniformType.vec4 = "vec4";
        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        UniformType.bvec2 = "bvec2";
        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        UniformType.bvec3 = "bvec3";
        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        UniformType.bvec4 = "bvec4";
        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        UniformType.ivec2 = "ivec2";
        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        UniformType.ivec3 = "ivec3";
        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        UniformType.ivec4 = "ivec4";
        /**
        * shader 2x2 矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        UniformType.mat2 = "mat2";
        /**
        * shader 3x3 矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        UniformType.mat3 = "mat3";
        /**
        * shader 4x4 矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        UniformType.mat4 = "mat4";
        /**
        * shader 贴图对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        UniformType.sampler2D = "sampler2D";
        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        UniformType.sampleCube = "sampleCube";
        GLSL.UniformType = UniformType;
        __reflect(UniformType.prototype, "egret3d.GLSL.UniformType");
    })(GLSL = egret3d.GLSL || (egret3d.GLSL = {}));
})(egret3d || (egret3d = {}));
//# sourceMappingURL=UniformType.js.map