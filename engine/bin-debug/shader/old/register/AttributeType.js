var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var GLSL;
    (function (GLSL) {
        /**
        * @private
        * @class egret3d.AttributeType
        * @classdesc
        *
        * shader中的变量属性类型
        * @version Egret 3.0
        * @platform Web,Native
        */
        var AttributeType = (function () {
            function AttributeType() {
            }
            return AttributeType;
        }());
        /**
        * shader int类型
        * @version Egret 3.0
        * @platform Web,Native
        */
        AttributeType.int = "int";
        /**
        * shader float类型
        * @version Egret 3.0
        * @platform Web,Native
        */
        AttributeType.float = "float";
        /**
        * shader vec2类型 两个 float 组成
        * @version Egret 3.0
        * @platform Web,Native
        */
        AttributeType.vec2 = "vec2";
        /**
        * shader vec3类型 三个 float 组成
        * @version Egret 3.0
        * @platform Web,Native
        */
        AttributeType.vec3 = "vec3";
        /**
        * shader vec4类型 四个 float 组成
        * @version Egret 3.0
        * @platform Web,Native
        */
        AttributeType.vec4 = "vec4";
        /**
        * shader 2x2 矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        AttributeType.mat2 = "mat2";
        /**
        * shader 3x3 矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        AttributeType.mat3 = "mat3";
        /**
        * shader 4x4 矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        AttributeType.mat4 = "mat4";
        GLSL.AttributeType = AttributeType;
        __reflect(AttributeType.prototype, "egret3d.GLSL.AttributeType");
    })(GLSL = egret3d.GLSL || (egret3d.GLSL = {}));
})(egret3d || (egret3d = {}));
//# sourceMappingURL=AttributeType.js.map