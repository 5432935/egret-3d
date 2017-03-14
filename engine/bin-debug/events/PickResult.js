var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @class egret3d.PickResult
    * @classdesc
    * 鼠标拾取返回数据。</p>
    * 鼠标拾取模型上的交点 (本地坐标、世界坐标)。</p>
    * 鼠标拾取模型的uv。</p>
    * @version Egret 3.0
    * @platform Web,Native
    */
    var PickResult = (function () {
        function PickResult() {
            /**
            * @language zh_CN
            * 鼠标拾取模型上的交点 (本地坐标)。
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.localPosition = new egret3d.Vector3();
            /**
            * @language zh_CN
            * 鼠标拾取模型上的交点 (世界坐标)。
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.globalPosition = new egret3d.Vector3();
            /**
            * @language zh_CN
            * 鼠标拾取模型的uv。
            * 只有对象的PickType为UVPick 并且模型有uv才会返回
            * @see egret3d.PickType
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.uv = new egret3d.Vector3();
        }
        return PickResult;
    }());
    egret3d.PickResult = PickResult;
    __reflect(PickResult.prototype, "egret3d.PickResult");
})(egret3d || (egret3d = {}));
