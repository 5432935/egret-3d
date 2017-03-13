var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    */
    var ShaderPool = (function () {
        function ShaderPool() {
        }
        ShaderPool.register = function (context) {
            this.context = context;
        };
        ShaderPool.getGPUShader = function (shaderType, shaderID, source) {
            var shader = this.vsShaderHashMap.getValue(shaderID);
            if (!shader) {
                shader = this.fsShaderHashMap.getValue(shaderID);
            }
            if (!shader) {
                if (shaderType == egret3d.Shader.vertex) {
                    shader = this.context.creatVertexShader(source);
                    shader.id = shaderID;
                    this.vsShaderHashMap.add(shaderID, shader);
                }
                else if (shaderType == egret3d.Shader.fragment) {
                    shader = this.context.creatFragmentShader(source);
                    shader.id = shaderID;
                    this.fsShaderHashMap.add(shaderID, shader);
                }
            }
            return shader;
            //if (shaderType == Shader.vertex) {
            //    return this.context.creatVertexShader(source);
            //}
            //return this.context.creatFragmentShader(source);
        };
        ShaderPool.getProgram = function (vs_shaderID, fs_shaderID) {
            var vsShader = this.vsShaderHashMap.getValue(vs_shaderID);
            var fsShader = this.fsShaderHashMap.getValue(fs_shaderID);
            var name = vsShader.id + "_" + fsShader.id;
            var program3D;
            if (this.programlib.isHas(name)) {
                program3D = this.programlib.getValue(name);
            }
            else {
                program3D = this.registerProgram(vsShader, fsShader);
                this.programlib.add(name, program3D);
            }
            return this.programlib.getValue(name);
        };
        ShaderPool.unRegisterShader = function (list) {
            //to delet shader
        };
        ShaderPool.registerProgram = function (vsShader, fsShader) {
            var program3D = this.context.creatProgram(vsShader, fsShader);
            return program3D;
        };
        ShaderPool.unRegisterProgram = function (vsKey, fsKey) {
            //to delet program
        };
        return ShaderPool;
    }());
    //总shader的map容器
    ShaderPool.programlib = new egret3d.HashMap();
    ShaderPool.vsShaderHashMap = new egret3d.HashMap();
    ShaderPool.fsShaderHashMap = new egret3d.HashMap();
    egret3d.ShaderPool = ShaderPool;
    __reflect(ShaderPool.prototype, "egret3d.ShaderPool");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ShaderPool.js.map