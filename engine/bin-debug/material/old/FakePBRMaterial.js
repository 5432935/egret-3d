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
    var FakePBRMaterial = (function (_super) {
        __extends(FakePBRMaterial, _super);
        /**
         * @language zh_CN
         * 创建一个新的 TextureMaterial 对象。
         * @param texture 用来渲染的贴图，默认会给出一张棋盘格贴图
         * @param materialData 材质数据信息，可以不指定
         * @version Egret 3.0
         * @platform Web,Native
         */
        function FakePBRMaterial(texture, materialData) {
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
        FakePBRMaterial.prototype.initMatPass = function () {
            //this.addPass(PassType.diffusePass);
            this._fakePBR = new egret3d.FakePBRPass(this.materialData);
            this.materialData.shaderPhaseTypes[egret3d.PassType.diffusePass] = [];
            this.passes[egret3d.PassType.diffusePass] = [this._fakePBR];
        };
        Object.defineProperty(FakePBRMaterial.prototype, "albedoTexture", {
            /**
            * @language zh_CN
            * 设置albedo贴图
            * @param tex 指定的贴图对象
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (tex) {
                this._fakePBR.setTexture("albedoTex", tex);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FakePBRMaterial.prototype, "normalTexture", {
            /**
            * @language zh_CN
            * 设置normal贴图
            * @param tex 指定的贴图对象
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (tex) {
                this._fakePBR.setTexture("normalTex", tex);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FakePBRMaterial.prototype, "glossTexture", {
            /**
            * @language zh_CN
            * 设置gloss贴图
            * @param tex 指定的贴图对象
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (tex) {
                this._fakePBR.setTexture("glossTex", tex);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FakePBRMaterial.prototype, "specularTexture", {
            /**
            * @language zh_CN
            * 设置specular贴图
            * @param tex 指定的贴图对象
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (tex) {
                this._fakePBR.setTexture("specularTex", tex);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FakePBRMaterial.prototype, "opacityTexture", {
            /**
            * @language zh_CN
            * 设置opacity贴图
            * @param tex 指定的贴图对象
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (tex) {
                this._fakePBR.setTexture("opacityTex ", tex);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FakePBRMaterial.prototype, "reflectionTexture", {
            /**
            * @language zh_CN
            * 设置reflection贴图
            * @param tex 指定的贴图对象
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (tex) {
                this._fakePBR.setTexture("reflectionMap", tex);
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 克隆方法。
        * 将材质球克隆一份，公用shader着色器和贴图，不公用参数
        * @returns {TextureMaterial}
        * @version Egret 3.0
        * @platform Web,Native
        */
        FakePBRMaterial.prototype.clone = function () {
            var mat = new egret3d.TextureMaterial(this.diffuseTexture, this.materialData.clone());
            return mat;
        };
        return FakePBRMaterial;
    }(egret3d.MaterialBase));
    egret3d.FakePBRMaterial = FakePBRMaterial;
    __reflect(FakePBRMaterial.prototype, "egret3d.FakePBRMaterial");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=FakePBRMaterial.js.map