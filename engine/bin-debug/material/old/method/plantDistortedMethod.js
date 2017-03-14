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
    * 植物模拟自然风吹摇动特效方法
    * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/PlantDistortedMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var PlantDistortedMethod = (function (_super) {
        __extends(PlantDistortedMethod, _super);
        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        function PlantDistortedMethod() {
            var _this = _super.call(this) || this;
            _this._speed = new egret3d.Vector3();
            _this._time = 0.0;
            _this._windData = new Float32Array(4);
            _this.vsShaderList[egret3d.ShaderPhaseType.local_vertex] = _this.vsShaderList[egret3d.ShaderPhaseType.local_vertex] || [];
            _this.vsShaderList[egret3d.ShaderPhaseType.local_vertex].push("detail_Bending_vs");
            return _this;
        }
        Object.defineProperty(PlantDistortedMethod.prototype, "windDirAndSpeed", {
            get: function () {
                return this._speed;
            },
            /**
            * @language zh_CN
            * 设置风的方向，Vector3的长度代表其速度
            * @param dirAndStr 风向和风的强度数据
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (dirAndStr) {
                this._speed = dirAndStr;
                this._windData[1] = dirAndStr.x;
                this._windData[2] = dirAndStr.y;
                this._windData[3] = dirAndStr.z;
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
        PlantDistortedMethod.prototype.upload = function (time, delay, usage, geometry, context3DProxy, moodeltransform, camera3D) {
            usage["uniformTime"] = context3DProxy.getUniformLocation(usage.program3D, "uniformTime");
        };
        /**
        * @private
        * @language zh_CN
        */
        PlantDistortedMethod.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            this._time += delay;
            this._windData[0] = this._time;
            context3DProxy.uniform1fv(usage["uniformTime"], this._windData);
        };
        return PlantDistortedMethod;
    }(egret3d.MethodBase));
    egret3d.PlantDistortedMethod = PlantDistortedMethod;
    __reflect(PlantDistortedMethod.prototype, "egret3d.PlantDistortedMethod");
})(egret3d || (egret3d = {}));
