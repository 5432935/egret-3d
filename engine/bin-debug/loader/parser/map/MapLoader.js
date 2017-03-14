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
    * @language zh_CN
    * @class egret3d.MapLoader
    * @classdesc
    * 注意：当前还能使用 但是之后版本会被弃用 会直接使用 UnitLoader 来替换这个类的功能
    * 加载egret地图类
    * 用于加载和解析egret地图文件的类，加载完毕后，mesh内容已经添加到了container中.
    * 主要封装了esm/eca/png/eam的加载和组装，以及mesh的render method相关信息，和灯光数据的生效.
    * 加载完毕后，会派发事件LoaderEvent3D.LOADER_COMPLETE
    * @see egret3d.UnitLoader
    *
    * @includeExample loader/parser/map/MapLoader.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var MapLoader = (function (_super) {
        __extends(MapLoader, _super);
        /**
        * @language zh_CN
        * 加载场景配置文件 .json 或 .xml
        * @param url 默认参数为null  场景文件路径
        * @version Egret 3.0
        * @platform Web,Native
        */
        function MapLoader(url) {
            if (url === void 0) { url = null; }
            var _this = _super.call(this, url) || this;
            _this.container = _this.createObject();
            return _this;
        }
        MapLoader.prototype.createObject = function () {
            this.scene = new egret3d.Scene3D();
            return this.scene;
        };
        MapLoader.prototype.onLoaderComplete = function () {
            _super.prototype.onLoaderComplete.call(this);
        };
        return MapLoader;
    }(egret3d.UnitLoader));
    egret3d.MapLoader = MapLoader;
    __reflect(MapLoader.prototype, "egret3d.MapLoader");
})(egret3d || (egret3d = {}));
