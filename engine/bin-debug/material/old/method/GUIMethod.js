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
    * 实现alpha遮罩渲染方法。
    * 该贴图的r通道被用于赋值到diffuse数据的alpha上面。
     * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/GUIMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var GUIMethod = (function (_super) {
        __extends(GUIMethod, _super);
        /**
        * @language zh_CN
        * 创建一个AlphaMaskMethod对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        function GUIMethod() {
            var _this = _super.call(this) || this;
            _this.vsShaderList[egret3d.ShaderPhaseType.base_vertex] = _this.vsShaderList[egret3d.ShaderPhaseType.base_vertex] || [];
            _this.vsShaderList[egret3d.ShaderPhaseType.base_vertex].push("gui_vs");
            _this.fsShaderList[egret3d.ShaderPhaseType.base_fragment] = _this.fsShaderList[egret3d.ShaderPhaseType.base_fragment] || [];
            _this.fsShaderList[egret3d.ShaderPhaseType.base_fragment].push("gui_fs");
            return _this;
        }
        /**
        * @language zh_CN
        * 设置lightmap贴图
        * @param texture lightmap贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        GUIMethod.prototype.setTextures = function (index, texture) {
            var textureName = "uiTexture_" + index.toString();
            this.materialData[textureName] = texture;
            this.materialData[textureName].useMipmap = false;
        };
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
        GUIMethod.prototype.upload = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
        };
        /**
        * @private
        * @language zh_CN
        */
        GUIMethod.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
        };
        return GUIMethod;
    }(egret3d.MethodBase));
    egret3d.GUIMethod = GUIMethod;
    __reflect(GUIMethod.prototype, "egret3d.GUIMethod");
})(egret3d || (egret3d = {}));
