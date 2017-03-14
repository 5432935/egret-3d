var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @private
    * @class egret3d.MaterialMethodData
    * @classdesc
    * 材质球的特效数据
    * @version Egret 3.0
    * @platform Web,Native
    */
    var UnitMatMethodData = (function () {
        function UnitMatMethodData() {
            /**
             * @language zh_CN
             * 特效的类型
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.type = "";
            /**
             * @language zh_CN
             * 是否增强specular的强度
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.usePower = false;
            /**
             * @language zh_CN
             * 贴图索引数据（name）
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.texturesData = [];
            /**
             * @language zh_CN
             * u的滚动速度
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.uSpeed = 0;
            /**
             * @language zh_CN
             * v的滚动速度
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.vSpeed = 0;
            this.play = true;
            this.loop = true;
            this.frameNum = 0;
            this.row = 0;
            this.col = 0;
            this.delayTime = 0;
            this.totalTime = 0;
        }
        return UnitMatMethodData;
    }());
    UnitMatMethodData.methodType = {
        lightmapMethod: "lightmapMethod",
        uvRollMethod: "uvRollMethod",
        uvSpriteSheetMethod: "uvSpriteSheetMethod",
        mulUvRollMethod: "mulUvRollMethod",
        alphaMaskMethod: "alphaMaskMethod",
        streamerMethod: "streamerMethod",
        terrainARGBMethod: "terrainARGBMethod",
        waterWaveMethod: "waterWaveMethod",
        waterNormalMethod: "waterNormalMethod",
        particleUVRoll: "particleUVRoll",
    };
    egret3d.UnitMatMethodData = UnitMatMethodData;
    __reflect(UnitMatMethodData.prototype, "egret3d.UnitMatMethodData");
})(egret3d || (egret3d = {}));
