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
    * @class egret3d.FogMethod
    * @classdesc
    * 继承自 MethodBase,为材质球附加特效的共有基类.
    * 3D物体雾化模式,继续像素的顶点雾化模式 提供几种显示方式
    * 如果要给场景添加雾化,务必需要将此方法赋予场景中的所有材质中
    * Exponential Height Fog渲染方法。
    * 实现3种fog类型： line、exp、exp height
    * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/FogMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var FogMethod = (function (_super) {
        __extends(FogMethod, _super);
        /**
        * @language zh_CN
        * 创建一个雾的渲染方法
        * @param fogType 雾的类型 line/exp/expHeightFog
        * @version Egret 3.0
        * @platform Web,Native
        */
        function FogMethod(fogType) {
            if (fogType === void 0) { fogType = "expHeightFog_fs"; }
            var _this = _super.call(this) || this;
            _this.uniform_globalFog = new Float32Array(7);
            _this._fogColor = 0x0000cc;
            _this._globalDensity = 1.0;
            _this._fogStartDistance = 1000;
            _this._fogDistanceScale = 0.5;
            _this._height = 500;
            _this._fogAlpha = 1.0;
            _this.vsShaderList[egret3d.ShaderPhaseType.local_vertex] = _this.vsShaderList[egret3d.ShaderPhaseType.local_vertex] || [];
            _this.vsShaderList[egret3d.ShaderPhaseType.local_vertex].push("vertexPos_vs");
            if (fogType == "line") {
                _this.fsShaderList[egret3d.ShaderPhaseType.lighting_fragment].push("lineFog");
            }
            else if (fogType == "exp") {
                _this.fsShaderList[egret3d.ShaderPhaseType.lighting_fragment].push("expFog_fs");
            }
            else if (fogType == "expHeightFog_fs") {
                _this.fsShaderList[egret3d.ShaderPhaseType.lighting_fragment] = _this.fsShaderList[egret3d.ShaderPhaseType.lighting_fragment] || [];
                _this.fsShaderList[egret3d.ShaderPhaseType.lighting_fragment].push("expHeightFog_fs");
            }
            //0.5, 0.6, 0.7
            _this.uniform_globalFog[0] = 0.5;
            _this.uniform_globalFog[1] = 0.6;
            _this.uniform_globalFog[2] = 0.7;
            _this.uniform_globalFog[3] = _this._globalDensity;
            _this.uniform_globalFog[4] = _this._fogStartDistance;
            _this.uniform_globalFog[5] = _this._height;
            _this.uniform_globalFog[6] = _this._fogAlpha;
            return _this;
        }
        Object.defineProperty(FogMethod.prototype, "fogColor", {
            /**
            * @language zh_CN
            * 获取雾颜色
            * @returns 雾颜色 rgb  0xffffff
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.fogColor;
            },
            /**
            * @language zh_CN
            * 设置雾颜色
            * @param value 雾颜色 rgb  0xffffff
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._fogColor = value;
                this.uniform_globalFog[0] = (this._fogColor >> 16 & 0xff) / 255.0;
                this.uniform_globalFog[1] = (this._fogColor >> 8 & 0xff) / 255.0;
                this.uniform_globalFog[2] = (this._fogColor & 0xff) / 255.0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FogMethod.prototype, "globalDensity", {
            /**
            * @language zh_CN
            * 获取雾的全局浓度
            * @returns number 雾的全局浓度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._globalDensity;
            },
            /**
            * @language zh_CN
            * 设置雾的全局浓度
            * @param value 雾的全局浓度
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._globalDensity = value;
                this.uniform_globalFog[3] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FogMethod.prototype, "fogStartDistance", {
            /**
            * @language zh_CN
            * 获取雾的开始距离
            * @returns number 雾的开始距离
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._fogStartDistance;
            },
            /**
            * @language zh_CN
            * 设置雾的开始距离
            * @param value 雾的开始距离
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._fogStartDistance = value;
                this.uniform_globalFog[4] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FogMethod.prototype, "fogHeight", {
            /**
            * @language zh_CN
            * 获取雾的高度值
            * @returns number 雾的高度值
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._height;
            },
            //public set fogDistanceScale(value: number) {
            //    this._fogDistanceScale = value;
            //    this.uniform_globalFog[5] = value;
            //}
            //public get fogDistanceScale(): number {
            //    return this._fogDistanceScale;
            //}
            /**
            * @language zh_CN
            * 设置雾的高度值
            * @param value 雾的高度值
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._height = value;
                this.uniform_globalFog[5] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FogMethod.prototype, "fogAlpha", {
            /**
            * @language zh_CN
            * 获取雾的Alpha值
            * @returns number 雾的Alpha值
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._height;
            },
            /**
            * @language zh_CN
            * 设置雾的Alpha值
            * @param value 雾的Alpha值
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._height = value;
                this.uniform_globalFog[6] = value;
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
        FogMethod.prototype.upload = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            usage["uniform_globalFog"] = context3DProxy.getUniformLocation(usage.program3D, "uniform_globalFog");
        };
        /**
         * @language zh_CN
         * @private
         */
        FogMethod.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            context3DProxy.uniform1fv(usage["uniform_globalFog"], this.uniform_globalFog);
        };
        /**
         * @language zh_CN
         * @private
         */
        FogMethod.prototype.dispose = function () {
        };
        return FogMethod;
    }(egret3d.MethodBase));
    egret3d.FogMethod = FogMethod;
    __reflect(FogMethod.prototype, "egret3d.FogMethod");
})(egret3d || (egret3d = {}));
