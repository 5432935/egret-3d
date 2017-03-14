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
    */
    var FakePBRPass = (function (_super) {
        __extends(FakePBRPass, _super);
        function FakePBRPass(materialData) {
            var _this = _super.call(this, materialData) || this;
            _this._passID = egret3d.PassType.diffusePass;
            return _this;
        }
        FakePBRPass.prototype.setTexture = function (name, texture) {
            this._materialData[name] = texture;
        };
        /**
        * @language zh_CN
        * @private
        * 初始化 UseMethod。
        * @version Egret 3.0
        * @platform Web,Native
        */
        //public initUseMethod(animation: IAnimation, geom: Geometry) {
        //    super.initUseMethod(animation, geom);
        //}
        FakePBRPass.prototype.initUseMethod = function (animation, geom) {
            this._passChange = false;
            var i = 0;
            this._passUsage = new egret3d.PassUsage();
            this._vs_shader_methods = {};
            this._fs_shader_methods = {};
            if (this.lightGroup) {
                this._passUsage.maxDirectLight = this.lightGroup.directLightList.length;
                this._passUsage.maxSpotLight = this.lightGroup.spotLightList.length;
                this._passUsage.maxPointLight = this.lightGroup.pointLightList.length;
                //this._vs_shader_methods[ShaderPhaseType.local_vertex] = this._vs_shader_methods[ShaderPhaseType.local_vertex] || [];
                //this._fs_shader_methods[ShaderPhaseType.lighting_fragment] = [];
                //this._fs_shader_methods[ShaderPhaseType.lighting_fragment].push("lightingBase_fs");
                if (this.lightGroup.directLightList.length) {
                    this._passUsage.directLightData = new Float32Array(egret3d.DirectLight.stride * this.lightGroup.directLightList.length);
                }
            }
            //pre Phase ---------------------------------------------------
            this.addMethodShaders(this._passUsage.vertexShader, ["FakePBR_vs"]);
            this.addMethodShaders(this._passUsage.fragmentShader, ["materialSource_fs"]);
            this.addMethodShaders(this._passUsage.fragmentShader, ["FakePBR_fs"]);
        };
        return FakePBRPass;
    }(egret3d.MaterialPass));
    egret3d.FakePBRPass = FakePBRPass;
    __reflect(FakePBRPass.prototype, "egret3d.FakePBRPass");
})(egret3d || (egret3d = {}));
