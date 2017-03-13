var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @class egret3d.MethodUsageData
    * @classdesc
    * 方法中需要用到的数据。
    * @version Egret 3.0
    * @platform Web,Native
    */
    var PassUsage = (function () {
        function PassUsage() {
            /**
             * @language zh_CN
             */
            this.sampler2DList = new Array();
            /**
             * @language zh_CN
             */
            this.sampler3DList = new Array();
            //----------------------------------------------
            //public vertexShaderRegister: ver;
            this.vertexShader = new egret3d.ShaderBase(egret3d.Shader.vertex);
            this.fragmentShader = new egret3d.ShaderBase(egret3d.Shader.fragment);
            this.maxDirectLight = 0;
            this.maxSpotLight = 0;
            this.maxPointLight = 0;
            this.maxBone = 0;
            this.attributeDiry = true;
        }
        /**
         * @language zh_CN
         */
        PassUsage.prototype.dispose = function () {
            if (this.program3D) {
                this.program3D.dispose();
            }
            this.program3D = null;
            if (this.vertexShader) {
                if (this.vertexShader.shader) {
                    this.vertexShader.shader.dispose();
                }
            }
            this.vertexShader = null;
            if (this.fragmentShader) {
                if (this.fragmentShader.shader) {
                    this.fragmentShader.shader.dispose();
                }
            }
            this.fragmentShader = null;
        };
        return PassUsage;
    }());
    egret3d.PassUsage = PassUsage;
    __reflect(PassUsage.prototype, "egret3d.PassUsage");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=PassUsage.js.map