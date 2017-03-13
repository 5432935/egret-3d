var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @private
    * @class egret3d.ShaderBase
    * @classdesc
    * shader 基类
    */
    var ShaderBase = (function () {
        /**
        * @language zh_CN
        * constructor
        * @param materialData
        * @param usage
        */
        function ShaderBase(type) {
            this.index = 0;
            this.shadersName = new Array();
            this.endShadername = "";
            this.stateChange = false;
            /**
            * @language zh_CN
            *
            */
            this.maxBone = 0;
            this.shaderType = -1;
            this.shaderType = type;
        }
        /**
        * @language zh_CN
        *
        * @param shaderName xxx
        */
        ShaderBase.prototype.addUseShaderName = function (shaderName) {
            this.shadersName.push(shaderName);
        };
        /**
        * @language zh_CN
        *
        * @param shaderName xxx
        */
        ShaderBase.prototype.addEndShaderName = function (shaderName) {
            this.endShadername = shaderName;
        };
        /**
        * @language zh_CN
        *
        * @returns string
        */
        ShaderBase.prototype.getShader = function (passUsage) {
            if (this.endShadername != "") {
                var index = this.shadersName.indexOf(this.endShadername);
                if (index == -1) {
                    this.shadersName.push(this.endShadername);
                }
            }
            return egret3d.ShaderUtil.instance.fillShaderContent(this, this.shadersName, passUsage);
        };
        return ShaderBase;
    }());
    egret3d.ShaderBase = ShaderBase;
    __reflect(ShaderBase.prototype, "egret3d.ShaderBase");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ShaderBase.js.map