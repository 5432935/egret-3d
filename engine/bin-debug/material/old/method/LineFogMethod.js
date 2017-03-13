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
    * @class egret3d.FogMethod
    * @classdesc
    * Exponential Height Fog渲染方法。
    * 实现3种fog类型： line、exp、exp height
     * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/LineFogMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var LineFogMethod = (function (_super) {
        __extends(LineFogMethod, _super);
        /**
        * @language zh_CN
        * 创建一个雾的渲染方法
        * @param fogType 雾的类型 line/exp/expHeightFog
        * @version Egret 3.0
        * @platform Web,Native
        */
        function LineFogMethod() {
            var _this = _super.call(this) || this;
            _this.uniform_globalFog = new Float32Array(7);
            _this._fogColor = 0x0000cc;
            _this._fogStartDistance = 100;
            _this._fogFarDistance = 1000;
            _this._fogAlpha = 1.0;
            _this.vsShaderList[egret3d.ShaderPhaseType.local_vertex] = _this.vsShaderList[egret3d.ShaderPhaseType.local_vertex] || [];
            _this.vsShaderList[egret3d.ShaderPhaseType.local_vertex].push("vertexPos_vs");
            _this.fsShaderList[egret3d.ShaderPhaseType.multi_end_fragment] = _this.fsShaderList[egret3d.ShaderPhaseType.multi_end_fragment] || [];
            _this.fsShaderList[egret3d.ShaderPhaseType.multi_end_fragment].push("lineFog");
            //0.5, 0.6, 0.7
            _this.uniform_globalFog[0] = 0.5;
            _this.uniform_globalFog[1] = 0.6;
            _this.uniform_globalFog[2] = 0.7;
            _this.uniform_globalFog[3] = 1.0;
            _this.uniform_globalFog[4] = _this._fogStartDistance;
            _this.uniform_globalFog[5] = _this._fogFarDistance;
            _this.uniform_globalFog[6] = _this._fogAlpha;
            return _this;
        }
        Object.defineProperty(LineFogMethod.prototype, "fogColor", {
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
        Object.defineProperty(LineFogMethod.prototype, "fogStartDistance", {
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
        Object.defineProperty(LineFogMethod.prototype, "fogFarDistance", {
            /**
            * @language zh_CN
            * 获取雾的结束距离
            * @returns number 雾的结束距离
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._fogFarDistance;
            },
            /**
            * @language zh_CN
            * 设置雾的结束距离
            * @param value 雾的结束距离
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._fogFarDistance = value;
                this.uniform_globalFog[5] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LineFogMethod.prototype, "fogAlpha", {
            /**
            * @language zh_CN
            * 获取雾的Alpha值
            * @returns number 雾的Alpha值
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._fogAlpha;
            },
            /**
            * @language zh_CN
            * 设置雾的Alpha值
            * @param value 雾的Alpha值
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._fogAlpha = value;
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
        LineFogMethod.prototype.upload = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            usage["uniform_globalFog"] = context3DProxy.getUniformLocation(usage.program3D, "uniform_globalFog");
        };
        /**
         * @language zh_CN
         * @private
         */
        LineFogMethod.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            context3DProxy.uniform1fv(usage["uniform_globalFog"], this.uniform_globalFog);
        };
        /**
         * @language zh_CN
         * @private
         */
        LineFogMethod.prototype.dispose = function () {
        };
        return LineFogMethod;
    }(egret3d.MethodBase));
    egret3d.LineFogMethod = LineFogMethod;
    __reflect(LineFogMethod.prototype, "egret3d.LineFogMethod");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=LineFogMethod.js.map