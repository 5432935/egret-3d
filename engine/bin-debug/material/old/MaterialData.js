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
     * @class egret3d.MaterialData
     */
    var MaterialData = (function (_super) {
        __extends(MaterialData, _super);
        function MaterialData() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
            * @private
            * @language zh_CN
            * 材质类型数组。
            * @每个材质球可能会有很多种贴图方法，而这个是做为默认支持的材质方法的添加通道。要使用的方法
            * @default MaterialType.DIFFUSE
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.shaderPhaseTypes = {};
            /**
            * @language zh_CN
            * 深度 pass usage data。
            * @version Egret 3.0
            * @platform Web,Native
            */
            //public depthPassUsageData: PassUsage = new PassUsage(); 
            /**
            * @language zh_CN
            * 法线 pass usage 数据。
            * @version Egret 3.0
            * @platform Web,Native
            */
            //public normalPassUsageData: PassUsage = new PassUsage(); 
            /**
            * @language zh_CN
            * position pass usage 数据。
            * @version Egret 3.0
            * @platform Web,Native
            */
            //public positionPassUsageData: PassUsage = new PassUsage(); 
            /**
            * @language zh_CN
            * post pass usage 数据。
            * @version Egret 3.0
            * @platform Web,Native
            */
            //public postPassUsageData: PassUsage = new PassUsage(); 
            /**
            * @language zh_CN
            * 灯光 pass usage 数据。
            * @version Egret 3.0
            * @platform Web,Native
            */
            //public lightPassUsageData: PassUsage = new PassUsage(); 
            /**
            * @language zh_CN
            * 阴影 pass usage 数据。
            * @version Egret 3.0
            * @platform Web,Native
            */
            //public shadowPassUsageData: PassUsage = new PassUsage(); 
            /**
            * @language zh_CN
            * 材质球ID。
            * <p> 一个合成材质球，可以多维合成，用于标记 subGeometry 所用的材质方法
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.matID = 0;
            /**
            * @language zh_CN
            * 渲染模式。
            * @default DrawMode.TRIANGLES
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.drawMode = egret3d.DrawMode.TRIANGLES;
            /**
            * @language zh_CN
            * 渲染模式。
            * @default DrawMode.TRIANGLES
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.useMipmap = true;
            /**
            * @language zh_CN
            * 法线贴图。
            * @default CheckerboardTexture.texture
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.normalTexture = egret3d.CheckerboardTexture.texture;
            /**
            * @language zh_CN
            * matCapTexture。
            * @default CheckerboardTexture.texture
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.matcapTexture = egret3d.CheckerboardTexture.texture;
            /**
            * @language zh_CN
            * 特效贴图。
            * @default CheckerboardTexture.texture
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.specularTexture = egret3d.CheckerboardTexture.texture;
            /**
            * @language zh_CN
            * 灯光贴图。
            * @default CheckerboardTexture.texture
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.lightTexture = egret3d.CheckerboardTexture.texture;
            /**
            * @language zh_CN
            * 遮罩贴图。
            * @default CheckerboardTexture.texture
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.maskTexture = egret3d.CheckerboardTexture.texture;
            /**
            * @language zh_CN
            * ao 贴图。
            * @default CheckerboardTexture.texture
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.aoTexture = egret3d.CheckerboardTexture.texture;
            /**
            * @language zh_CN
            * 环境贴图。
            * @default CheckerboardTexture.texture
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.environmentTexture = egret3d.CheckerboardTexture.texture;
            /**
            * @language zh_CN
            * mask 贴图。
            * @default CheckerboardTexture.texture
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.blendMaskTexture = egret3d.CheckerboardTexture.texture;
            /**
            * @language zh_CN
            * splat_0 贴图。
            * @default CheckerboardTexture.texture
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.splat_0Tex = egret3d.CheckerboardTexture.texture;
            /**
            * @language zh_CN
            * splat_1 贴图。
            * @default CheckerboardTexture.texture
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.splat_1Tex = egret3d.CheckerboardTexture.texture;
            /**
            * @language zh_CN
            * splat_2 贴图。
            * @default CheckerboardTexture.texture
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.splat_2Tex = egret3d.CheckerboardTexture.texture;
            /**
            * @language zh_CN
            * splat_3 贴图。
            * @default CheckerboardTexture.texture
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.splat_3Tex = egret3d.CheckerboardTexture.texture;
            /**
            * @language zh_CN
            * layer。
            * @default 0
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.layer = 0;
            /**
            * @language zh_CN
            * 投射阴影 。
            * @default false
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.castShadow = false;
            /**
            * @language zh_CN
            * 接受阴影。
            * @default true
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.acceptShadow = false;
            /**
            * @language zh_CN
            * 阴影颜色
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.shadowColor = new Float32Array([0.2, 0.2, 0.2, 0.003]);
            /**
            * @language zh_CN
            * 深度测试 。
            * @default true
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.depthTest = true;
            /**
            * @language zh_CN
            * 深度写入 。
            * @default true
            * @version Egret 4.0
            * @platform Web,Native
            */
            _this.depthWrite = true;
            /**
            * @language zh_CN
            * 深度测试模式
            * @default true
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.depthMode = 0;
            /**
            * @language zh_CN
            * 混合模式 。
            * @default BlendMode.NORMAL
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.blendMode = egret3d.BlendMode.NORMAL;
            /**
            * @language zh_CN
            * alphaBlending。
            * @default false
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.alphaBlending = false;
            /**
            * @language zh_CN
            * ambientColor 值。
            * @default 0x0
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.ambientColor = 0x0;
            /**
            * @language zh_CN
            * diffuseColor 值。
            * @default 0xffffff
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.diffuseColor = 0xffffff;
            /**
            * @language zh_CN
            * specularColor 值。
            * @default 0xffffff
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.specularColor = 0xffffff;
            /**
            * @language zh_CN
            * 色相。
            * @default 8.0
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.tintColor = 0x80808080;
            /**
            * @language zh_CN
            * 材质球的高光强度。
            * @default 8.0
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.specularLevel = 1.0;
            /**
            * @language zh_CN
            * gama 矫正。
            * @default 8.0
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.gamma = 1.0;
            _this.refraction = 1.9;
            _this.refractionintensity = 0.0;
            /**
            * @language zh_CN
            * 材质球的光滑度。
            * @default 8.0
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.gloss = 10.0;
            /**
            * @language zh_CN
            * cutAlpha 值。
            * @default 0.7
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.cutAlpha = 0;
            /**
            * @language zh_CN
            * 是否重复。
            * @default false
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.repeat = false;
            /**
            * @language zh_CN
            * bothside 值。
            * @default false
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.bothside = false;
            /**
            * @language zh_CN
            * alpha 值。
            * @default 1.0
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.alpha = 1.0;
            /**
            * @language zh_CN
            * 光照光滑程度，会影响反光的面积，强度。
            * @default 1.0
            * @version Egret 3.0
            * @platform Web,Native
            */
            //public roughness: number = 1.0; 
            /**
             * @language zh_CN
             * 反射颜色的强度值，出射光照的出射率。
             * @default 1.0
             * @version Egret 3.0
             * @platform Web,Native
             */
            _this.albedo = 0.95;
            /**
            * @language zh_CN
            * 法线贴图的Y轴朝向
            * @default 1.0
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.normalDir = -1.0;
            /**
            * @language zh_CN
            * uv 在贴图上的映射区域，值的范围限制在0.0~1.0之间。
            * @default 1.0
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.uvRectangle = new egret3d.Rectangle(0, 0, 1, 1);
            /**
            * @language zh_CN
            * ambientPower 值。
            * @default 1.0
            * @version Egret 3.0
            * @platform Web,Native
            */
            //public ambientPower: number = 1.0; 
            /**
            * @language zh_CN
            * diffusePower。
            * @default 1.0
            * @version Egret 3.0
            * @platform Web,Native
            */
            //public diffusePower: number = 1.0; 
            /**
            * @language zh_CN
            * normalPower 值。
            * @default 1.0
            * @version Egret 3.0
            * @platform Web,Native
            */
            //public normalPower: number = 1.0; 
            /**
            * @language zh_CN
            * 材质数据需要变化。
            * @default true
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.materialDataNeedChange = true;
            /**
            * @language zh_CN
            * 纹理变化。
            * @default false
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.textureChange = false;
            /**
            * @language zh_CN
            * 纹理状态需要更新。
            * @default false
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.textureStateChage = true;
            /**
            * @language zh_CN
            * cullFrontOrBack。
            * @default Egret3DDrive.BACK
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.cullFrontOrBack = egret3d.ContextConfig.BACK;
            //data
            /**
             * @language zh_CN
             */
            _this.materialSourceData = new Float32Array(20); //20
            //public materialSourceData2: Float32Array = new Float32Array(21);//20
            /**
             * @language zh_CN
             */
            _this.colorGradientsSource = new Float32Array(6); //y y rgba
            return _this;
        }
        /**
        * @language zh_CN
        * 克隆方法。
        * @returns {MaterialData}
        * @version Egret 3.0
        * @platform Web,Native
        */
        MaterialData.prototype.clone = function () {
            var data = new MaterialData();
            //data.depthPassUsageData = this.depthPassUsageData;
            //data.normalPassUsageData = this.normalPassUsageData;
            //data.positionPassUsageData = this.positionPassUsageData;
            //data.postPassUsageData = this.positionPassUsageData;
            //data.lightPassUsageData = this.positionPassUsageData;
            //data.shadowPassUsageData = this.positionPassUsageData;
            //data.textureChange = true;
            //data.textureMethodTypes = this.textureMethodTypes;
            data.drawMode = this.drawMode;
            //data.context3D = this.context3D;
            data.diffuseTexture = this.diffuseTexture;
            //data.specularTex = this.specularTex;
            //data.lightMapTex = this.lightMapTex;
            //data.environmentMapTex = this.environmentMapTex;
            data.shadowMapTexture = this.shadowMapTexture;
            for (var i = 0; i < 4; ++i) {
                data.shadowColor[i] = this.shadowColor[i];
            }
            //data.splat_0Tex = this.splat_0Tex;
            //data.splat_1Tex = this.splat_1Tex;
            //data.splat_2Tex = this.splat_2Tex;
            //data.splat_3Tex = this.splat_3Tex;
            data.layer = this.layer;
            data.castShadow = this.castShadow;
            data.acceptShadow = this.acceptShadow;
            data.depthTest = this.depthTest;
            data.depthWrite = this.depthWrite;
            data.blendMode = this.blendMode;
            data.blend_src = this.blend_src;
            data.blend_dest = this.blend_dest;
            data.ambientColor = this.ambientColor;
            data.diffuseColor = this.diffuseColor;
            data.specularColor = this.specularColor;
            data.cutAlpha = this.cutAlpha;
            data.alpha = this.alpha;
            data.specularLevel = this.specularLevel;
            data.gloss = this.gloss;
            data.albedo = this.albedo;
            data.gamma = this.gamma;
            data.refraction = this.refraction;
            data.refractionintensity = this.refractionintensity;
            data.materialDataNeedChange = this.materialDataNeedChange;
            data.textureChange = true;
            data.cullFrontOrBack = this.cullFrontOrBack;
            data.colorTransform = this.colorTransform;
            //material state
            return data;
        };
        /**
        * @language zh_CN
        * 销毁。
        * @version Egret 3.0
        * @platform Web,Native
        */
        MaterialData.prototype.dispose = function () {
            //if (this.depthPassUsageData)
            //    this.depthPassUsageData.dispose();
            //if (this.normalPassUsageData)
            //    this.normalPassUsageData.dispose();
            //if (this.normalPassUsageData)
            //    this.normalPassUsageData.dispose();
            //if (this.positionPassUsageData)
            //    this.positionPassUsageData.dispose();
            //if (this.postPassUsageData)
            //    this.postPassUsageData.dispose();
            //if (this.lightPassUsageData)
            //    this.lightPassUsageData.dispose();
            //if (this.shadowPassUsageData)
            //    this.shadowPassUsageData.dispose();
            //if (this.directLightList.length > 0) {
            //    this.directLightList.length = 0;
            //    this.directLightList = null;
            //}
            //if (this.sportLightList.length > 0) {
            //    this.sportLightList.length = 0;
            //    this.sportLightList = null;
            //}
            //if (this.pointLightList.length > 0) {
            //    this.pointLightList.length = 0;
            //    this.pointLightList = null;
            //}
        };
        return MaterialData;
    }(Object));
    egret3d.MaterialData = MaterialData;
    __reflect(MaterialData.prototype, "egret3d.MaterialData");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=MaterialData.js.map