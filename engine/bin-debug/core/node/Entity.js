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
    * @class egret3d.Entity
    * @classdesc
    * 3d空间中的实体对象 extends Object3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Entity = (function (_super) {
        __extends(Entity, _super);
        /**
        * @language zh_CN
        * constructor
        */
        function Entity() {
            return _super.call(this) || this;
        }
        return Entity;
    }(egret3d.Object3D));
    egret3d.Entity = Entity;
    __reflect(Entity.prototype, "egret3d.Entity");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Entity.js.map