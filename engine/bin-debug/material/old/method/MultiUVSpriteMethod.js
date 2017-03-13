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
    * @includeExample material/method/MultiUVSpriteMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var MultiUVSpriteMethod = (function (_super) {
        __extends(MultiUVSpriteMethod, _super);
        /**
        * @language zh_CN
        * 创建一个MultiUVSpriteMethod对象
        * 构造函数
        * @param row 行数
        * @param column 列数
        * @param sum 序列帧的总数
        * @param isRandom 是否随机序列帧
        * @version Egret 3.0
        * @platform Web,Native
        */
        function MultiUVSpriteMethod(row, column, sum, isRandom) {
            if (isRandom === void 0) { isRandom = true; }
            var _this = _super.call(this) || this;
            _this._isRandom = true;
            _this._multiData = new Float32Array(4);
            _this._multiData[0] = row;
            _this._multiData[1] = column;
            _this._multiData[2] = sum;
            _this._isRandom = isRandom;
            _this.fsShaderList[egret3d.ShaderPhaseType.diffuse_fragment] = _this.fsShaderList[egret3d.ShaderPhaseType.diffuse_fragment] || [];
            _this.fsShaderList[egret3d.ShaderPhaseType.diffuse_fragment].push("MultiUVSprite_fs");
            return _this;
        }
        Object.defineProperty(MultiUVSpriteMethod.prototype, "row", {
            get: function () {
                return this._multiData[0];
            },
            set: function (v) {
                this._multiData[0] = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MultiUVSpriteMethod.prototype, "column", {
            get: function () {
                return this._multiData[1];
            },
            set: function (v) {
                this._multiData[1] = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MultiUVSpriteMethod.prototype, "sum", {
            get: function () {
                return this._multiData[2];
            },
            set: function (v) {
                this._multiData[2] = v;
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
        MultiUVSpriteMethod.prototype.upload = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            usage["multiUV"] = context3DProxy.getUniformLocation(usage.program3D, "multiUV");
            if (this._isRandom)
                this._multiData[3] = Math.floor(Math.random() * this.sum);
        };
        /**
        * @private
        * @language zh_CN
        */
        MultiUVSpriteMethod.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            context3DProxy.uniform4fv(usage["multiUV"], this._multiData);
        };
        return MultiUVSpriteMethod;
    }(egret3d.MethodBase));
    egret3d.MultiUVSpriteMethod = MultiUVSpriteMethod;
    __reflect(MultiUVSpriteMethod.prototype, "egret3d.MultiUVSpriteMethod");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=MultiUVSpriteMethod.js.map