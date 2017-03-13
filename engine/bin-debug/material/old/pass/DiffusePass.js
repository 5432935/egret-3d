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
    var DiffusePass = (function (_super) {
        __extends(DiffusePass, _super);
        function DiffusePass(materialData) {
            var _this = _super.call(this, materialData) || this;
            _this._passID = egret3d.PassType.diffusePass;
            return _this;
        }
        /**
        * @language zh_CN
        * @private
        * 初始化 UseMethod。
        * @version Egret 3.0
        * @platform Web,Native
        */
        DiffusePass.prototype.initUseMethod = function (animation, geom) {
            _super.prototype.initUseMethod.call(this, animation, geom);
        };
        return DiffusePass;
    }(egret3d.MaterialPass));
    egret3d.DiffusePass = DiffusePass;
    __reflect(DiffusePass.prototype, "egret3d.DiffusePass");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=DiffusePass.js.map