var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @private
    * @class egret3d.UnitMatSphereData
    * @classdesc
    * 材质球的特效数据
    * @version Egret 3.0
    * @platform Web,Native
    */
    var UnitMatSphereData = (function () {
        function UnitMatSphereData() {
            /**
             * @language zh_CN
             * diffuse贴图的索引（name）
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.id = 0;
            /**
             * @language zh_CN
             * diffuse贴图的索引（name）
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.diffuseTextureName = "";
            /**
             * @language zh_CN
             * normal贴图的索引（name）
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.normalTextureName = "";
            /**
             * @language zh_CN
             * specular贴图的索引（name）
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.specularTextureName = "";
            /**
            * @language zh_CN
            * matcap贴图的索引（name）
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.matcapTextureName = "";
            /**
             * @language zh_CN
             * diffuse的颜色，0xffffff格式
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.diffuseColor = 0;
            /**
             * @language zh_CN
             * ambient的颜色，0xffffff格式
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.ambientColor = 0;
            /**
             * @language zh_CN
             * specular的颜色，0xffffff格式
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.specularColor = 0;
            /**
             * @language zh_CN
             * tintColor的颜色，0xaarrggbb格式
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.tintColor = 0x80808080;
            /**
             * @language zh_CN
             * 透明度
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.alpha = 0;
            /**
             * @language zh_CN
             * specular增强等级
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.specularLevel = 0;
            /**
             * @language zh_CN
             * 光泽系数
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.gloss = 0;
            this.gamma = 1.0;
            this.refraction = 1.9;
            this.refractionintensity = 2.0;
            /**
             * @language zh_CN
             * ambient的强度
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.ambientPower = 0;
            /**
             * @language zh_CN
             * diffuse的强度
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.diffusePower = 0;
            /**
             * @language zh_CN
             * normal的强度
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.normalPower = 0;
            /**
             * @language zh_CN
             * 是否产生阴影
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.castShadow = false;
            /**
             * @language zh_CN
             * 是否接受阴影
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.acceptShadow = false;
            /**
             * @language zh_CN
             * 是否平滑采样贴图
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.smooth = false;
            /**
             * @language zh_CN
             * 采样贴图的边缘是否重复
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.repeat = false;
            /**
             * @language zh_CN
             * 是否开启双面渲染
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.bothside = false;
            /**
             * @language zh_CN
             * 绘制模式设定
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.drawMode = 0;
            /**
             * @language zh_CN
             * 剔除模式设定
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.cullMode = 0;
            /**
             * @language zh_CN
             * 叠加模式
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.blendMode = 0;
            /**
             * @language zh_CN
             * alpha裁切值
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.cutAlpha = 0.7;
            /**
             * @language zh_CN
             * 材质球拥有的特效
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.methods = [];
            this.lightIds = [];
            /**
             * @language zh_CN
             * 材质球uv区域
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.uvRectangle = new egret3d.Rectangle(0, 0, 1, 1);
        }
        return UnitMatSphereData;
    }());
    egret3d.UnitMatSphereData = UnitMatSphereData;
    __reflect(UnitMatSphereData.prototype, "egret3d.UnitMatSphereData");
})(egret3d || (egret3d = {}));
