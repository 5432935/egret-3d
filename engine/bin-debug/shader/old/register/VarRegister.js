var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var GLSL;
    (function (GLSL) {
        /**
        * @private
        * @class egret3d.VarRegister
        * @classdesc
        * shader 变量 基类
        *
        * @version Egret 3.0
        * @platform Web,Native
        */
        var VarRegister = (function () {
            function VarRegister() {
                /**
                * @language zh_CN
                * 值名字
                */
                this.varName = ""; /// a
                /**
                * @language zh_CN
                * 变量名
                */
                this.name = ""; /// a[0]
                /**
                * @language zh_CN
                * 变量属性类型
                */
                this.key = ""; /// att varying uniform
                /**
                * @language zh_CN
                * 变量类型
                */
                this.valueType = ""; /// float vec2 vec3 vec4 int int2 int3 int4
                /**
                * @language zh_CN
                * 变量值
                */
                this.value = ""; /// var value
                /**
                * @language zh_CN
                * active Texture Index
                */
                this.activeTextureIndex = -1;
                /**
                * @language zh_CN
                * index
                */
                this.index = -1;
                /**
                * @language zh_CN
                * level
                */
                this.level = "";
                this.size = 0;
                this.dataType = 0;
                this.normalized = false;
                this.stride = 0;
                this.offset = 0;
                this.offsetIndex = 0;
                this.offsetBytes = 0;
            }
            /**
            * @language zh_CN
            * 得到组合后的字符串
            * @param compoments
            */
            VarRegister.prototype.var = function (compoments) {
                return this.level + " " + this.valueType + " " + name + "." + compoments;
            };
            /**
            * @language zh_CN
            *
            * @param compoments
            */
            VarRegister.prototype.use = function (compoments) {
                if (compoments === void 0) { compoments = ""; }
                if (compoments != "")
                    return this.name + "." + compoments;
                return this.name;
            };
            /**
            * @language zh_CN
            *
            * @returns VarRegister
            */
            VarRegister.prototype.clone = function () {
                var temp = new VarRegister();
                temp.name = this.name;
                temp.valueType = this.valueType;
                temp.level = this.level;
                temp.varName = this.varName;
                temp.value = this.value;
                temp.key = this.key;
                return temp;
            };
            VarRegister.prototype.computeVarName = function () {
                var index = this.name.indexOf("[");
                if (index >= 0) {
                    this.varName = this.name.substr(0, index);
                }
                else {
                    this.varName = this.name;
                }
            };
            return VarRegister;
        }());
        GLSL.VarRegister = VarRegister;
        __reflect(VarRegister.prototype, "egret3d.GLSL.VarRegister");
    })(GLSL = egret3d.GLSL || (egret3d.GLSL = {}));
})(egret3d || (egret3d = {}));
//# sourceMappingURL=VarRegister.js.map