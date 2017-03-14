var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @class egret3d.TreeBase
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    */
    var TreeBase = (function () {
        function TreeBase(object3D) {
            this._searchList = new Array();
            this._root = object3D;
        }
        TreeBase.prototype.infrustumList = function (camera) {
            this._searchList.length = 0;
            return this._searchList;
        };
        return TreeBase;
    }());
    egret3d.TreeBase = TreeBase;
    __reflect(TreeBase.prototype, "egret3d.TreeBase");
})(egret3d || (egret3d = {}));
