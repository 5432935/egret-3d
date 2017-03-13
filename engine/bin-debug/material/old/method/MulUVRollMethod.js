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
    * 用来实现多UV滚动效果的渲染方法
    * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/MulUVRollMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var MulUVRollMethod = (function (_super) {
        __extends(MulUVRollMethod, _super);
        /**
        * @private
        * @language zh_CN
        */
        function MulUVRollMethod() {
            var _this = _super.call(this) || this;
            _this._uvRoll = new Float32Array(4);
            _this._uvSpeed = new Float32Array(4);
            _this._time = 0.0;
            _this._start = false;
            _this.fsShaderList[egret3d.ShaderPhaseType.diffuse_fragment] = _this.fsShaderList[egret3d.ShaderPhaseType.diffuse_fragment] || [];
            _this.fsShaderList[egret3d.ShaderPhaseType.diffuse_fragment].push("mulUvRoll_fs");
            _this._uvSpeed[0] = 0.00005;
            _this._uvSpeed[1] = 0.0;
            _this._uvSpeed[2] = 0.00005;
            _this._uvSpeed[3] = 0.0;
            return _this;
        }
        /**
        * @language zh_CN
        * 用来设置UV u的滚动速度
        * @param index 下标
        * @param value u的滚动速度
        * @version Egret 3.0
        * @platform Web,Native
        */
        MulUVRollMethod.prototype.setSpeedU = function (index, value) {
            this._uvSpeed[index * 2 + 0] = value;
        };
        /**
        * @language zh_CN
        * 获取UV u的滚动速度
        * @param index 下标
        * @returns number u的滚动速度
        * @version Egret 3.0
        * @platform Web,Native
        */
        MulUVRollMethod.prototype.getSpeedU = function (index) {
            return this._uvSpeed[index * 2 + 0];
        };
        /**
        * @language zh_CN
        * 用来设置UV v的滚动速度
        * @param index 下标
        * @param value v的滚动速度
        * @version Egret 3.0
        * @platform Web,Native
        */
        MulUVRollMethod.prototype.setSpeedV = function (index, value) {
            this._uvSpeed[index * 2 + 1] = value;
        };
        /**
        * @language zh_CN
        * 获取UV v的滚动速度
        * @param index 下标
        * @returns number v的滚动速度
        * @version Egret 3.0
        * @platform Web,Native
        */
        MulUVRollMethod.prototype.getSpeedV = function (index) {
            return this._uvSpeed[index * 2 + 1];
        };
        /**
        * @language zh_CN
        * 开始播放uv动画
        * @param rest 如果为ture就是重置播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        MulUVRollMethod.prototype.start = function (rest) {
            if (rest === void 0) { rest = false; }
            if (rest)
                this._time = 0;
            this._start = true;
        };
        /**
        * @language zh_CN
        * 停止播放uv动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        MulUVRollMethod.prototype.stop = function () {
            this._start = false;
        };
        Object.defineProperty(MulUVRollMethod.prototype, "diffuseTexture1", {
            /**
            * @language zh_CN
            * 获取流动贴图
            * @returns ITexture 流动贴图
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._diffuseTexture1;
            },
            /**
            * @language zh_CN
            * 设置流动贴图
            * @param tex 流动贴图
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (tex) {
                this._diffuseTexture1 = tex;
                this.materialData["diffuseTexture1"] = tex;
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
        MulUVRollMethod.prototype.upload = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            usage["mulUvRoll"] = context3DProxy.getUniformLocation(usage.program3D, "mulUvRoll");
        };
        /**
        * @private
        * @language zh_CN
        */
        MulUVRollMethod.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            if (this._start) {
                this._time += delay;
            }
            for (var i = 0; i < 4; ++i) {
                this._uvRoll[i] = this._time * this._uvSpeed[i];
            }
            context3DProxy.uniform1fv(usage["mulUvRoll"], this._uvRoll);
        };
        return MulUVRollMethod;
    }(egret3d.MethodBase));
    egret3d.MulUVRollMethod = MulUVRollMethod;
    __reflect(MulUVRollMethod.prototype, "egret3d.MulUVRollMethod");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=MulUVRollMethod.js.map