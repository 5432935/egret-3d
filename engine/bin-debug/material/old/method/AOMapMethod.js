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
    * @class egret3d.AOMapMethod
    * @classdesc
    * 继承自 MethodBase,为材质球附加特效的共有基类.
    * AO贴图渲染方法,Ambient Occlusion texture 的简称.
    * 使用第三方软件渲染好的3D模型AO贴图进行mapping,模拟自然环境遮挡效果.增强真实感.
    * 推荐3Dmax Ambient Occlusion 渲染到贴图的功能,将模型的 AO 渲染成为一张贴图,赋给模型使用,前提需要保证模型第二UV要保证一致
    * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/AOMapMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var AOMapMethod = (function (_super) {
        __extends(AOMapMethod, _super);
        /**
        * @language zh_CN
        * 创建AO贴图方法
        * @version Egret 3.0
        * @platform Web,Native
        */
        function AOMapMethod() {
            var _this = _super.call(this) || this;
            _this.aoPower = 1.0;
            _this.fsShaderList[egret3d.ShaderPhaseType.shadow_fragment] = _this.fsShaderList[egret3d.ShaderPhaseType.shadow_fragment] || [];
            _this.fsShaderList[egret3d.ShaderPhaseType.shadow_fragment].push("AOMap_fs");
            return _this;
        }
        Object.defineProperty(AOMapMethod.prototype, "lightTexture", {
            /**
            * @language zh_CN
            * 设置AO贴图
            * @param texture AO贴图
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (texture) {
                this.texture = texture;
                this.materialData.aoTexture = this.texture;
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
        AOMapMethod.prototype.upload = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            usage["aoPower"] = context3DProxy.getUniformLocation(usage.program3D, "aoPower");
        };
        /**
        * @private
        */
        AOMapMethod.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            context3DProxy.uniform1f(usage["aoPower"], this.aoPower);
        };
        /**
        * @language zh_CN
        * @private
        */
        AOMapMethod.prototype.dispose = function () {
        };
        return AOMapMethod;
    }(egret3d.MethodBase));
    egret3d.AOMapMethod = AOMapMethod;
    __reflect(AOMapMethod.prototype, "egret3d.AOMapMethod");
})(egret3d || (egret3d = {}));
