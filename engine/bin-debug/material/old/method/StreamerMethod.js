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
    * 用来实现UV流光滚动效果的渲染方法
    * 在3D游戏中用来制作物体装备流光的特效显示，比如《奇迹》中的装备流光
    * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/StreamerMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var StreamerMethod = (function (_super) {
        __extends(StreamerMethod, _super);
        /**
        * @private
        * @language zh_CN
        */
        function StreamerMethod() {
            var _this = _super.call(this) || this;
            _this._uvRoll = new Float32Array(3);
            _this._speedU = 0.0001;
            _this._speedV = 0.0001;
            _this._intensity = 0.9;
            _this._time = 0.0;
            _this._start = false;
            _this.fsShaderList[egret3d.ShaderPhaseType.diffuse_fragment] = _this.fsShaderList[egret3d.ShaderPhaseType.diffuse_fragment] || [];
            _this.fsShaderList[egret3d.ShaderPhaseType.diffuse_fragment].push("uvStreamerRoll_fs");
            _this.start();
            return _this;
        }
        Object.defineProperty(StreamerMethod.prototype, "speedU", {
            /**
            * @language zh_CN
            * 获取UV u的滚动速度
            * @returns number u的滚动速度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._speedU;
            },
            /**
            * @language zh_CN
            * 用来UV u的滚动速度
            * @param value u的滚动速度
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._speedU = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StreamerMethod.prototype, "speedV", {
            /**
            * @language zh_CN
            * 获取UV v的滚动速度
            * @returns number v的滚动速度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._speedV;
            },
            /**
            * @language zh_CN
            * 用来UV v的滚动速度
            * @param value v的滚动速度
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._speedV = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StreamerMethod.prototype, "steamerTexture", {
            /**
            * @language zh_CN
            * 获取流动贴图
            * @returns ITexture 流动贴图
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._steamerTexture;
            },
            /**
            * @language zh_CN
            * 设置流动贴图
            * @param tex 流动贴图
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (tex) {
                this._steamerTexture = tex;
                this.materialData["streamerTexture"] = tex;
                this.materialData.textureChange = true;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 开始播放uv动画
        * @param rest 如果为ture就是重置播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        StreamerMethod.prototype.start = function (rest) {
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
        StreamerMethod.prototype.stop = function () {
            this._start = false;
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
        StreamerMethod.prototype.upload = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            usage["uvRoll"] = context3DProxy.getUniformLocation(usage.program3D, "uvRoll");
        };
        /**
        * @private
        * @language zh_CN
        */
        StreamerMethod.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            if (this._start) {
                this._time += delay;
            }
            this._uvRoll[0] = this._time * this._speedU;
            this._uvRoll[1] = this._time * this._speedV;
            this._uvRoll[2] = this._intensity;
            context3DProxy.uniform1fv(usage["uvRoll"], this._uvRoll);
        };
        return StreamerMethod;
    }(egret3d.MethodBase));
    egret3d.StreamerMethod = StreamerMethod;
    __reflect(StreamerMethod.prototype, "egret3d.StreamerMethod");
})(egret3d || (egret3d = {}));
