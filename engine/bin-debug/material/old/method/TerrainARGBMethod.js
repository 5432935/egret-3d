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
    * @class egret3d.TerrainARGBMethod
    * @classdesc
    * 地形贴图混合渲染方法。
    * 使用一张贴图中的ARGB色来进行4张贴图进行混合。
    * 总的需要5张纹理贴图，4张地表纹理，一张融合图
    * 地表最大支持4张地表纹理混合，后期如果需要更多，还可以增加额外的Pass来增加融合地表的纹理数量。
    * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/TerrainARGBMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var TerrainARGBMethod = (function (_super) {
        __extends(TerrainARGBMethod, _super);
        /**
        * @language zh_CN
        * 创建地形贴图混合渲染方法
        * @param controlTex 混合贴图
        * @param splat_0 第一张贴图
        * @param splat_1 第二张贴图
        * @param splat_2 第三张贴图
        * @param splat_3 第四张贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        function TerrainARGBMethod(controlTex, splat_0, splat_1, splat_2, splat_3) {
            if (controlTex === void 0) { controlTex = egret3d.CheckerboardTexture.texture; }
            if (splat_0 === void 0) { splat_0 = egret3d.CheckerboardTexture.texture; }
            if (splat_1 === void 0) { splat_1 = egret3d.CheckerboardTexture.texture; }
            if (splat_2 === void 0) { splat_2 = egret3d.CheckerboardTexture.texture; }
            if (splat_3 === void 0) { splat_3 = egret3d.CheckerboardTexture.texture; }
            var _this = _super.call(this) || this;
            _this.uvs = new Float32Array(8);
            _this.fsShaderList[egret3d.ShaderPhaseType.diffuse_fragment] = _this.fsShaderList[egret3d.ShaderPhaseType.diffuse_fragment] || [];
            _this.fsShaderList[egret3d.ShaderPhaseType.diffuse_fragment].push("terrainRGBA_fragment");
            _this.controlTex = controlTex;
            _this.splat_0 = splat_0;
            _this.splat_1 = splat_1;
            _this.splat_2 = splat_2;
            _this.splat_3 = splat_3;
            _this.uvs[0] = 1.0;
            _this.uvs[1] = 1.0;
            _this.uvs[2] = 1.0;
            _this.uvs[3] = 1.0;
            _this.uvs[4] = 1.0;
            _this.uvs[5] = 1.0;
            _this.uvs[6] = 1.0;
            _this.uvs[7] = 1.0;
            return _this;
        }
        /**
        * @language zh_CN
        * 设置 UVTitling。
        * @param index {Number} 图层索引
        * @param x {Number} u 的重复次数
        * @param y {Number} v 的重复次数
        * @version Egret 3.0
        * @platform Web,Native
        */
        TerrainARGBMethod.prototype.setUVTitling = function (index, x, y) {
            this.uvs[index * 2] = x;
            this.uvs[index * 2 + 1] = y;
        };
        Object.defineProperty(TerrainARGBMethod.prototype, "splat_0_Texture", {
            /**
            * @language zh_CN
            * 设置第一张贴图
            * @param texture 贴图
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (texture) {
                this.splat_0 = texture;
                this.materialData.splat_0Tex = texture;
                this.materialData.textureChange = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TerrainARGBMethod.prototype, "splat_1_Texture", {
            /**
            * @language zh_CN
            * 设置第二张贴图
            * @param texture 贴图
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (texture) {
                this.splat_1 = texture;
                this.materialData.splat_1Tex = texture;
                this.materialData.textureChange = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TerrainARGBMethod.prototype, "splat_2_Texture", {
            /**
            * @language zh_CN
            * 设置第三张贴图
            * @version Egret 3.0
            * @platform Web,Native
            * @param texture 贴图
            */
            set: function (texture) {
                this.splat_2 = texture;
                this.materialData.splat_2Tex = texture;
                this.materialData.textureChange = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TerrainARGBMethod.prototype, "splat_3_Texture", {
            /**
            * @language zh_CN
            * 设置第四张贴图
            * @param texture 贴图
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (texture) {
                this.splat_3 = texture;
                this.materialData.splat_3Tex = texture;
                this.materialData.textureChange = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TerrainARGBMethod.prototype, "controlTexture", {
            /**
            * @language zh_CN
            * 设置混合贴图
            * @param texture 贴图
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (texture) {
                this.controlTex = texture;
                this.materialData.blendMaskTexture = texture;
                this.materialData.textureChange = true;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @private
        * @language zh_CN
        * @param time
        * @param delay
        * @param usage
        * @param materialData
        * @param geometry
        * @param context3DProxy
        * @param modeltransform
        * @param modeltransform
        * @param camera3D
        */
        TerrainARGBMethod.prototype.upload = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            usage["uvs"] = context3DProxy.getUniformLocation(usage.program3D, "uvs");
        };
        /**
        * @language zh_CN
        * @private
        */
        TerrainARGBMethod.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            context3DProxy.uniform1fv(usage["uvs"], this.uvs);
        };
        /**
        * @language zh_CN
        * @private
        */
        TerrainARGBMethod.prototype.dispose = function () {
        };
        return TerrainARGBMethod;
    }(egret3d.MethodBase));
    egret3d.TerrainARGBMethod = TerrainARGBMethod;
    __reflect(TerrainARGBMethod.prototype, "egret3d.TerrainARGBMethod");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=TerrainARGBMethod.js.map