var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var ShaderCache = (function () {
        function ShaderCache() {
        }
        ShaderCache.addProgram = function (program) {
            ShaderCache.programlib.add(program.name, program);
        };
        ShaderCache.removeProgram = function (_name) {
            var program = ShaderCache.getProgram(_name);
            program.dispose();
            ShaderCache.programlib.remove(_name);
        };
        ShaderCache.getProgram = function (_name) {
            return ShaderCache.programlib.getValue(_name);
        };
        return ShaderCache;
    }());
    ShaderCache.programlib = new egret3d.HashMap();
    egret3d.ShaderCache = ShaderCache;
    __reflect(ShaderCache.prototype, "egret3d.ShaderCache");
})(egret3d || (egret3d = {}));
