var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @language zh_CN
    * @class egret3d.UnitLightData
    * @classdesc
    * 顶光数据
    * @version Egret 3.0
    * @platform Web,Native
    */
    var UnitLightData = (function () {
        function UnitLightData() {
            this.id = 0;
            /**
             * @language zh_CN
             * 灯光类型
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.type = 0;
            /**
             * @language zh_CN
             * diffuseColor
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.diffuseColor = 0xffffff;
            /**
             * @language zh_CN
             * ambientColor
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.ambientColor = 0xffffff;
            /**
             * @language zh_CN
             * 强度
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.intensity = 1.0;
            /**
             * @language zh_CN
             * 强度的一半
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.halfIntensity = 0.0;
            this.direction = new egret3d.Vector3(-0.5, -0.6, 0.2);
            this.position = new egret3d.Vector3();
            /**
             * @language zh_CN
             * 衰减值
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.falloff = 0.0;
            /**
             * @language zh_CN
             * 半径数据
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.radius = 100;
        }
        return UnitLightData;
    }());
    egret3d.UnitLightData = UnitLightData;
    __reflect(UnitLightData.prototype, "egret3d.UnitLightData");
})(egret3d || (egret3d = {}));
