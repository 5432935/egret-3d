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
    * @class egret3d.CubeTextureMaterial
    * @classdesc
    * cube纹理材质。
    * 6张无缝连接的贴图，使一个cube的6个面贴上不同的贴图。
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    var CubeTextureMaterial = (function (_super) {
        __extends(CubeTextureMaterial, _super);
        /**
         * @language zh_CN
         * 创建一个新的 CubeTextureMaterial 对象。
         * @param texture {CubeTexture}
         * @param materialData {MaterialData}
         * @version Egret 3.0
         * @platform Web,Native
         */
        function CubeTextureMaterial(texture, materialData) {
            if (texture === void 0) { texture = null; }
            if (materialData === void 0) { materialData = null; }
            var _this = _super.call(this, materialData) || this;
            _this.initMatPass();
            if (!texture) {
                texture = egret3d.CubeTexture.createCubeTextureByImageTexture(egret3d.CheckerboardTexture.texture, egret3d.CheckerboardTexture.texture, egret3d.CheckerboardTexture.texture, egret3d.CheckerboardTexture.texture, egret3d.CheckerboardTexture.texture, egret3d.CheckerboardTexture.texture);
            }
            _this.materialData["diffuseTexture3D"] = texture;
            return _this;
        }
        CubeTextureMaterial.prototype.initMatPass = function () {
            this.creatPass(egret3d.PassType.diffusePass);
            this.diffusePass.addMethod(new egret3d.CubeMethod());
        };
        /**
         * @language zh_CN
         * 克隆方法。
         * 将材质球克隆一份，公用shader着色器和贴图，不公用参数
         * @returns {TextureMaterial}
         * @version Egret 3.0
         * @platform Web,Native
         */
        CubeTextureMaterial.prototype.clone = function () {
            var mat = new CubeTextureMaterial(this.diffuseTexture, this.materialData.clone());
            return mat;
        };
        return CubeTextureMaterial;
    }(egret3d.MaterialBase));
    egret3d.CubeTextureMaterial = CubeTextureMaterial;
    __reflect(CubeTextureMaterial.prototype, "egret3d.CubeTextureMaterial");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=CubeTextureMaterial.js.map