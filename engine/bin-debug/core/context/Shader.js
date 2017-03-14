var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var Shader = (function () {
        function Shader(shader) {
            this._shader = shader;
        }
        Object.defineProperty(Shader.prototype, "shader", {
            /**
            * @language zh_CN
            * @private
            * WebGLShader 的引用
            */
            get: function () {
                return this._shader;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 释放接口
        * @version Egret 3.0
        * @platform Web,Native
        */
        Shader.prototype.dispose = function () {
            if (this._shader) {
                egret3d.Context3DProxy.gl.deleteShader(this._shader);
                this._shader = null;
            }
        };
        return Shader;
    }());
    egret3d.Shader = Shader;
    __reflect(Shader.prototype, "egret3d.Shader");
})(egret3d || (egret3d = {}));
