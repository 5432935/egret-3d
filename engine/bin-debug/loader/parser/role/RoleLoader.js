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
    * @private
    * @class egret3d.RoleLoader
    * @classdesc
    * 加载角色
    * @see egret3d.UnitLoader
    * @version Egret 3.0
    * @platform Web,Native
    */
    var RoleLoader = (function (_super) {
        __extends(RoleLoader, _super);
        /**
        * @language zh_CN
        * 构造
        * @param url 角色文件路径
        * @version Egret 3.0
        * @platform Web,Native
        */
        function RoleLoader(url) {
            if (url === void 0) { url = null; }
            var _this = _super.call(this, url) || this;
            _this.container = _this.createObject();
            return _this;
        }
        RoleLoader.prototype.createObject = function () {
            this.role = new egret3d.Role();
            return this.role;
        };
        return RoleLoader;
    }(egret3d.UnitLoader));
    egret3d.RoleLoader = RoleLoader;
    __reflect(RoleLoader.prototype, "egret3d.RoleLoader");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=RoleLoader.js.map