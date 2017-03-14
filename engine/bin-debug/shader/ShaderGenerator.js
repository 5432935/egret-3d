var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @class egret3d.ShaderGenerator
    * @classdesc
    * Shader 生成器
    */
    var ShaderGenerator = (function () {
        function ShaderGenerator() {
        }
        //根据shader的命名创建对应shader和program
        ShaderGenerator.createProgram = function (defdata, _vsShaderSourceName, _fsShaderSourceName) {
            //vsShader
            var vsSource = ShaderGenerator.generateShaderSource(defdata, _vsShaderSourceName);
            var vsShader = ShaderGenerator.createShader(vsSource, egret3d.ShaderType.VertexShader, defdata.toName() + _vsShaderSourceName);
            //fsShader
            var fsSource = ShaderGenerator.generateShaderSource(defdata, _fsShaderSourceName);
            var fsShader = ShaderGenerator.createShader(vsSource, egret3d.ShaderType.FragmentShader, defdata.toName() + _fsShaderSourceName);
            //program
            var program = ShaderGenerator.createProgramLogic(vsShader, fsShader);
            //清除shader
            vsShader.dispose();
            fsShader.dispose();
            return program;
        };
        //创建shader
        ShaderGenerator.createShader = function (_source, _type, _name) {
            var shader = egret3d.Context3DProxy.gl.createShader(_type);
            egret3d.Context3DProxy.gl.shaderSource(shader, _source);
            egret3d.Context3DProxy.gl.compileShader(shader);
            var tmpShader = new egret3d.Shader(shader);
            tmpShader.name = _name;
            return tmpShader;
        };
        //创建Program
        ShaderGenerator.createProgramLogic = function (vsShader, fsShader) {
            var shaderProgram = egret3d.Context3DProxy.gl.createProgram();
            egret3d.Context3DProxy.gl.attachShader(shaderProgram, vsShader.shader);
            egret3d.Context3DProxy.gl.attachShader(shaderProgram, fsShader.shader);
            egret3d.Context3DProxy.gl.linkProgram(shaderProgram);
            //debug模式下启用
            if (egret3d.Egret3DEngine.instance.debug) {
                var p = egret3d.Context3DProxy.gl.getProgramParameter(shaderProgram, egret3d.Context3DProxy.gl.LINK_STATUS);
                if (!p) {
                    console.log("vsShader error" + egret3d.Context3DProxy.gl.getShaderInfoLog(vsShader.shader));
                    console.log("fsShader error" + egret3d.Context3DProxy.gl.getShaderInfoLog(fsShader.shader));
                    console.log("program error" + egret3d.Context3DProxy.gl.getProgramInfoLog(shaderProgram));
                }
            }
            /////
            var program = new egret3d.Program3D(shaderProgram);
            program.name = vsShader.name + fsShader.name;
            //放入仓中
            egret3d.ShaderCache.addProgram(program);
            return program;
        };
        //生成shader源码
        ShaderGenerator.generateShaderSource = function (defdata, _ShaderSourceName) {
            var keys = defdata.keys();
            var len = keys.length;
            var defStr = "";
            for (var i = 0; i < len; i++) {
                if (defdata[keys[i]] == true) {
                    defStr += "#define " + keys[i] + "\n";
                }
            }
            var source = "";
            ShaderGenerator._processIncludes(egret3d.ShaderStore.lib[_ShaderSourceName], function (rel) {
                //处理完成后shader代码
                defStr += rel;
                source = defStr;
            });
            return source;
        };
        ///#include 替换
        ShaderGenerator._processIncludes = function (sourceCode, callback) {
            var regex = /#include<(.+)>(\((.*)\))*(\[(.*)\])*/g;
            var match = regex.exec(sourceCode);
            var returnValue = new String(sourceCode);
            while (match != null) {
                var includeFile = match[1];
                if (egret3d.ShaderStore.lib[includeFile]) {
                    // Substitution
                    var includeContent = egret3d.ShaderStore.lib[includeFile];
                    if (match[2]) {
                        var splits = match[3].split(",");
                        for (var index = 0; index < splits.length; index += 2) {
                            var source = new RegExp(splits[index], "g");
                            var dest = splits[index + 1];
                            includeContent = includeContent.replace(source, dest);
                        }
                    }
                    if (match[4]) {
                        var indexString = match[5];
                        if (indexString.indexOf("..") !== -1) {
                            var indexSplits = indexString.split("..");
                            var minIndex = parseInt(indexSplits[0]);
                            var maxIndex = parseInt(indexSplits[1]);
                            var sourceIncludeContent = includeContent.slice(0);
                            includeContent = "";
                            if (isNaN(maxIndex)) {
                                maxIndex = ShaderGenerator._indexParameters[indexSplits[1]];
                            }
                            for (var i = minIndex; i <= maxIndex; i++) {
                                includeContent += sourceIncludeContent.replace(/\{X\}/g, i.toString()) + "\n";
                            }
                        }
                        else {
                            includeContent = includeContent.replace(/\{X\}/g, indexString);
                        }
                    }
                    // Replace
                    returnValue = returnValue.replace(match[0], includeContent);
                }
                match = regex.exec(sourceCode);
            }
            callback(returnValue);
        };
        return ShaderGenerator;
    }());
    ShaderGenerator._indexParameters = {};
    egret3d.ShaderGenerator = ShaderGenerator;
    __reflect(ShaderGenerator.prototype, "egret3d.ShaderGenerator");
})(egret3d || (egret3d = {}));
