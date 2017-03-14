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
    * @class egret3d.TextureMaterial
    * @classdesc
    * 纹理材质。
    * 标准的贴图材质球，可以设置三种贴图， diffuse ， normal ， speclar 贴图
    * 材质球中默认不设置纹理，显示的黑白棋盘格
    * @version Egret 3.0
    * @platform Web,Native
    */
    var TextureMaterial = (function (_super) {
        __extends(TextureMaterial, _super);
        /**
        * @language zh_CN
        * 创建一个新的 TextureMaterial 对象。
        * @param texture 用来渲染的贴图，默认会给出一张棋盘格贴图
        * @param materialData 材质数据信息，可以不指定
        * @version Egret 3.0
        * @platform Web,Native
        */
        function TextureMaterial(texture, materialData) {
            if (texture === void 0) { texture = null; }
            if (materialData === void 0) { materialData = null; }
            var _this = _super.call(this, materialData) || this;
            if (!texture) {
                _this.diffuseTexture = egret3d.CheckerboardTexture.texture;
            }
            else {
                _this.diffuseTexture = texture;
            }
            _this.initMatPass();
            return _this;
        }
        TextureMaterial.prototype.initMatPass = function () {
            this.creatPass(egret3d.PassType.diffusePass);
        };
        /**
         * @language zh_CN
         * 克隆方法。
         * 将材质球克隆一份，公用shader着色器和贴图，不公用参数
         * @returns {TextureMaterial}
         * @version Egret 3.0
         * @platform Web,Native
         */
        TextureMaterial.prototype.clone = function () {
            var mat = new TextureMaterial(this.diffuseTexture, this.materialData.clone());
            return mat;
        };
        return TextureMaterial;
    }(egret3d.MaterialBase));
    egret3d.TextureMaterial = TextureMaterial;
    __reflect(TextureMaterial.prototype, "egret3d.TextureMaterial");
})(egret3d || (egret3d = {}));
