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
    * @class egret3d.LightmapMethod
    * @classdesc
    * 实现lightmap渲染方法。
    * 在三维软件里实现打好光，然后渲染把场景各表面的光照输出到贴图上。
    * 然后使用模型的第2UV，渲染出Lightmap效果，lightmap贴图需要自己烘焙。
     * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/LightmapMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var LightmapMethod = (function (_super) {
        __extends(LightmapMethod, _super);
        /**
        * @language zh_CN
        * 创建一个LightmapMethod对象
        * @param useSpecularPower 是否使用高功率，默认参数为true
        * @version Egret 3.0
        * @platform Web,Native
        */
        function LightmapMethod(useSpecularPower) {
            if (useSpecularPower === void 0) { useSpecularPower = true; }
            var _this = _super.call(this) || this;
            _this._globalColorData = new Float32Array(3);
            _this.vsShaderList[egret3d.ShaderPhaseType.local_vertex] = _this.vsShaderList[egret3d.ShaderPhaseType.local_vertex] || [];
            _this.vsShaderList[egret3d.ShaderPhaseType.local_vertex].push("secondaryUV_vs");
            _this.fsShaderList[egret3d.ShaderPhaseType.lighting_fragment] = _this.fsShaderList[egret3d.ShaderPhaseType.lighting_fragment] || [];
            _this.fsShaderList[egret3d.ShaderPhaseType.lighting_fragment].push("lightingBase_fs");
            if (useSpecularPower) {
                _this.fsShaderList[egret3d.ShaderPhaseType.multi_end_fragment] = _this.fsShaderList[egret3d.ShaderPhaseType.multi_end_fragment] || [];
                _this.fsShaderList[egret3d.ShaderPhaseType.multi_end_fragment].push("lightMapSpecularPower_fs");
            }
            else {
                _this.fsShaderList[egret3d.ShaderPhaseType.multi_end_fragment] = _this.fsShaderList[egret3d.ShaderPhaseType.multi_end_fragment] || [];
                _this.fsShaderList[egret3d.ShaderPhaseType.multi_end_fragment].push("lightMap_fs");
            }
            return _this;
        }
        Object.defineProperty(LightmapMethod.prototype, "lightTexture", {
            /**
            * @language zh_CN
            * 设置lightmap贴图
            * @param texture lightmap贴图
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (texture) {
                this.texture = texture;
                if (this.materialData.lightTexture != this.texture) {
                    this.materialData.lightTexture = this.texture;
                    this.materialData.lightTexture.useMipmap = false;
                    this.materialData.lightTexture.smooth = true;
                    this.materialData.textureChange = true;
                }
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
        LightmapMethod.prototype.upload = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
        };
        /**
        * @private
        * @language zh_CN
        */
        LightmapMethod.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
        };
        return LightmapMethod;
    }(egret3d.MethodBase));
    egret3d.LightmapMethod = LightmapMethod;
    __reflect(LightmapMethod.prototype, "egret3d.LightmapMethod");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=LightMapMethod.js.map