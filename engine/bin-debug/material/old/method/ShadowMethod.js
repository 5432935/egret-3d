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
    * @class egret3d.AlphaMaskMethod
    * @classdesc
    * 实现实时阴影渲染方法
    * @see egret3d.MethodBase
    * @includeExample material/method/ShadowMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ShadowMethod = (function (_super) {
        __extends(ShadowMethod, _super);
        function ShadowMethod(matData) {
            if (matData === void 0) { matData = null; }
            var _this = _super.call(this) || this;
            if (matData)
                _this.materialData = matData;
            _this.vsShaderList[egret3d.ShaderPhaseType.local_vertex] = _this.vsShaderList[egret3d.ShaderPhaseType.local_vertex] || [];
            _this.vsShaderList[egret3d.ShaderPhaseType.local_vertex].push("shadowMapping_vs");
            _this.fsShaderList[egret3d.ShaderPhaseType.shadow_fragment] = _this.fsShaderList[egret3d.ShaderPhaseType.shadow_fragment] || [];
            _this.fsShaderList[egret3d.ShaderPhaseType.shadow_fragment].push("shadowMapping_fs");
            return _this;
        }
        Object.defineProperty(ShadowMethod.prototype, "shadowMapTexture", {
            /**
            * @language zh_CN
            * 获取阴影贴图
            * @returns ITexture 阴影贴图
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.materialData.shadowMapTexture;
            },
            /**
            * @language zh_CN
            * 设置阴影贴图
            * @param texture 阴影贴图
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (texture) {
                if (this.materialData.shadowMapTexture != texture) {
                    this.materialData.shadowMapTexture = texture;
                    this.materialData.textureChange = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @private
        */
        ShadowMethod.prototype.upload = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D, renderQuen) {
            if (usage.uniform_ShadowMatrix) {
                usage.uniform_ShadowMatrix.uniformIndex = context3DProxy.getUniformLocation(usage.program3D, "uniform_ShadowMatrix");
            }
        };
        /**
        * @private
        */
        ShadowMethod.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D, renderQuen) {
            var camera = renderQuen.renderDictionary[egret3d.PassType.shadowPass].camera;
            if (camera) {
                if (usage.uniform_ShadowMatrix && usage.uniform_ShadowMatrix.uniformIndex) {
                    context3DProxy.uniformMatrix4fv(usage.uniform_ShadowMatrix.uniformIndex, false, camera.viewProjectionMatrix.rawData);
                }
            }
            context3DProxy.uniform4fv(usage.uniform_ShadowColor.uniformIndex, this.materialData.shadowColor);
        };
        return ShadowMethod;
    }(egret3d.MethodBase));
    egret3d.ShadowMethod = ShadowMethod;
    __reflect(ShadowMethod.prototype, "egret3d.ShadowMethod");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ShadowMethod.js.map