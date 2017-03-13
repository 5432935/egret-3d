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
    * @class egret3d.Sky
    * @classdesc
    * 天空可由任意几何图形构成天空。
    * 场景中天空。
    * 可以是6面体cube，以6张无缝结合的贴图构成.
    *
    * @see egret3d.CubeTexture
    * @see egret3d.CubeTextureMaterial
    *
    * 示例:
    * @version Egret 3.0
    * @platform Web,Native
    * @includeExample core/node/Sky.ts
    */
    var Sky = (function (_super) {
        __extends(Sky, _super);
        /**
        * @language zh_CN
        * 构建一个天空盒子对象
        * @param geometry 天空模型数据
        * @param material 天空材质
        * @param camera 天空渲染相机
        * @default null
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Sky(geometry, material, camera) {
            if (camera === void 0) { camera = null; }
            var _this = _super.call(this, geometry, material) || this;
            _this.camera = camera;
            if (!_this.bound) {
                _this.bound = _this.buildBoundBox();
            }
            return _this;
        }
        /**
        * @language zh_CN
        * 当前对象数据更新，只有在视锥内的对象才会执行此更新
        * @param camera 当前渲染的摄相机
        * @param time 当前时间
        * @param delay 每帧时间间隔
        * @version Egret 3.0
        * @platform Web,Native
        */
        Sky.prototype.update = function (time, delay, camera) {
            _super.prototype.update.call(this, time, delay, camera);
            if (this.camera) {
                this.globalPosition = this.camera.globalPosition;
            }
        };
        /**
        * @language zh_CN
        * @private
        * @param other copy对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Sky.prototype.copy = function (other) {
            _super.prototype.copy.call(this, other);
        };
        /**
        * @language zh_CN
        * 克隆当前Sky
        * @returns Sky 克隆后的对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Sky.prototype.clone = function () {
            var cloneObject = new Sky(this.geometry, this.material, this.camera);
            cloneObject.copy(this);
            return cloneObject;
        };
        return Sky;
    }(egret3d.Mesh));
    egret3d.Sky = Sky;
    __reflect(Sky.prototype, "egret3d.Sky");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Sky.js.map