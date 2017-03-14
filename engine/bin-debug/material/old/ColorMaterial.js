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
    var ColorMaterial = (function (_super) {
        __extends(ColorMaterial, _super);
        function ColorMaterial(color) {
            if (color === void 0) { color = 0xcccccc; }
            var _this = _super.call(this) || this;
            _this.color = color;
            _this.diffuseTexture = egret3d.CheckerboardTexture.texture;
            _this.initMatPass();
            return _this;
        }
        ColorMaterial.prototype.initMatPass = function () {
            this.creatPass(egret3d.PassType.diffusePass);
            this.diffusePass.addMethod(new egret3d.ColorMethod());
        };
        Object.defineProperty(ColorMaterial.prototype, "color", {
            get: function () {
                return this.materialData.diffuseColor;
            },
            set: function (value) {
                this.materialData.diffuseColor = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ColorMaterial.prototype, "alpha", {
            get: function () {
                return this.materialData.alpha;
            },
            set: function (value) {
                this.materialData.alpha = value;
            },
            enumerable: true,
            configurable: true
        });
        return ColorMaterial;
    }(egret3d.MaterialBase));
    egret3d.ColorMaterial = ColorMaterial;
    __reflect(ColorMaterial.prototype, "egret3d.ColorMaterial");
})(egret3d || (egret3d = {}));
