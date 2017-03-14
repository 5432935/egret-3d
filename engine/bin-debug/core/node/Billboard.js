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
    * @class egret3d.Billboard
    * @classdesc
    * 公告板渲染对象 始终面朝摄像机的面板
    * @includeExample core/node/BilllBoard.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Billboard = (function (_super) {
        __extends(Billboard, _super);
        /**
        * @language zh_CN
        * 指定材质，和公告板宽、高，构建一个公告板
        * @param material 渲染材质
        * @param geometry 几何数据，默认参数为null 为null会在内部创建一个PlaneGeometry  自定义PlaneGeometry的时候 请注意创建面的朝向
        * @param width 公告板宽度 默认参数为 100
        * @param height 公告板高度 默认参数为 100
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Billboard(material, geometry, width, height) {
            if (geometry === void 0) { geometry = null; }
            if (width === void 0) { width = 100; }
            if (height === void 0) { height = 100; }
            var _this = this;
            if (geometry == null) {
                geometry = new egret3d.PlaneGeometry(width, height, 1, 1, 1, 1, egret3d.Vector3.Z_AXIS);
            }
            _this = _super.call(this, geometry, material) || this;
            _this.width = width;
            _this.height = height;
            if (!_this.bound) {
                _this.bound = _this.buildBoundBox();
            }
            return _this;
        }
        /**
        * @private
        * @language zh_CN
        * 数据更新，不前对象的旋转和摄像机的旋转一致
        * @param camera 当前渲染的摄相机
        * @param time 当前时间
        * @param delay 间隔时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        Billboard.prototype.update = function (time, delay, camera) {
            _super.prototype.update.call(this, time, delay, camera);
            this.globalOrientation = camera.globalOrientation;
        };
        /**
        * @language zh_CN
        * @private
        * @param other copy对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Billboard.prototype.copy = function (other) {
            _super.prototype.copy.call(this, other);
        };
        /**
        * @language zh_CN
        * 克隆当前公告板
        * @returns Billboard 克隆后的对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Billboard.prototype.clone = function () {
            var cloneMesh = new Billboard(this.material, this.geometry, this.width, this.height);
            cloneMesh.copy(this);
            return cloneMesh;
        };
        return Billboard;
    }(egret3d.Mesh));
    egret3d.Billboard = Billboard;
    __reflect(Billboard.prototype, "egret3d.Billboard");
})(egret3d || (egret3d = {}));
