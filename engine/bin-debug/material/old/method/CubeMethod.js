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
    * @class egret3d.CubeMethod
    * @classdesc
    * @see egret3d.MethodBase
    * @version Egret 3.0
    * @platform Web,Native
    */
    var CubeMethod = (function (_super) {
        __extends(CubeMethod, _super);
        /**
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        function CubeMethod() {
            var _this = _super.call(this) || this;
            _this.vsShaderList[egret3d.ShaderPhaseType.global_vertex] = _this.fsShaderList[egret3d.ShaderPhaseType.global_vertex] || [];
            _this.vsShaderList[egret3d.ShaderPhaseType.global_vertex].push("cube_vertex");
            _this.fsShaderList[egret3d.ShaderPhaseType.diffuse_fragment] = _this.fsShaderList[egret3d.ShaderPhaseType.diffuse_fragment] || [];
            _this.fsShaderList[egret3d.ShaderPhaseType.diffuse_fragment].push("cube_fragment");
            return _this;
        }
        /**
        * @private
        */
        CubeMethod.prototype.upload = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
        };
        /**
        * @private
        * @language zh_CN
        */
        CubeMethod.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
        };
        return CubeMethod;
    }(egret3d.MethodBase));
    egret3d.CubeMethod = CubeMethod;
    __reflect(CubeMethod.prototype, "egret3d.CubeMethod");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=CubeMethod.js.map