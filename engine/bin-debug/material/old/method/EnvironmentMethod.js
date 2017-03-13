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
    * @language zh_CN
    * @class egret3d.UVRollMethod
    * @classdesc
    * 继承自 MethodBase,为材质球附加特效的共有基类.
    * 环境映射是一种用来模拟光滑表面对周围环境的反射的技术，常见的如镜子、光亮漆面的金属等等。
    * 这种技术的实现主要通过将一张带有周围环境的贴图附在所需要表现的多边形表面来实现的。目前在实时3D游戏画面渲染中经常使用的有两种环境映射。
    * 球形环境映射是模拟在球体表面产生环境映射的技术，通过对普通贴图的UV坐标进行调整计算来产生在球体表面应产生的扭曲。
    * UV的计算利用球体表面的法线来计算。
    * 计算公式中的Nx和Ny是表面法线的x和y分量，除以2将区间限制在[-0.5,0.5]，+0.5将区间调整至UV坐标应在的[0,1]区间。在这个公式的计算下，当球体正中表面法线正对摄像机的地方，坐标不会有任何扭曲；周围点依次随着Nx和Ny分量的增大而产生扭曲。
    * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/EnvironmentMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var EnvironmentMethod = (function (_super) {
        __extends(EnvironmentMethod, _super);
        /**
        * @private
        * @language zh_CN
        */
        function EnvironmentMethod() {
            var _this = _super.call(this) || this;
            _this.reflectValue = 0.3;
            _this.fsShaderList[egret3d.ShaderPhaseType.lighting_fragment] = _this.fsShaderList[egret3d.ShaderPhaseType.lighting_fragment] || [];
            _this.fsShaderList[egret3d.ShaderPhaseType.lighting_fragment].push("environmentMapping_fragment");
            return _this;
        }
        Object.defineProperty(EnvironmentMethod.prototype, "reflect", {
            /**
             * @public
             * 返回环境的强弱度
             * @returns number 环境的强弱度
             */
            get: function () {
                return this.reflectValue;
            },
            /**
             * @public
             * 设置反射 环境的强弱度,值区间在[0~1]
             * @param value 强弱度
             * @version Egret 3.0
             * @platform Web,Native
             */
            set: function (value) {
                this.reflectValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnvironmentMethod.prototype, "environmentTexture", {
            /**
             * @language zh_CN
             * @public
             * 设置环境纹理,一张 cubemap,可配合天空纹理使用增强环境渲染效果
             * @see egret3d.MethodBase
             * @see egret3d.texture.CubeTexture
             * @param texture
             */
            set: function (texture) {
                this.texture = texture;
                if (texture) {
                    if (this.materialData["environmentMapTex"] != this.texture) {
                        this.materialData["environmentMapTex"] = texture;
                        this.materialData.textureChange = true;
                    }
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
        EnvironmentMethod.prototype.upload = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            usage["reflectValue"] = context3DProxy.getUniformLocation(usage.program3D, "reflectValue");
        };
        /**
        * @private
        * @language zh_CN
        */
        EnvironmentMethod.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            context3DProxy.uniform1f(usage["reflectValue"], this.reflectValue);
        };
        return EnvironmentMethod;
    }(egret3d.MethodBase));
    egret3d.EnvironmentMethod = EnvironmentMethod;
    __reflect(EnvironmentMethod.prototype, "egret3d.EnvironmentMethod");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=EnvironmentMethod.js.map