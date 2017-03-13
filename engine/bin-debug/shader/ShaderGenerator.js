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
        ShaderGenerator.createShaderSource = function (defdata, _ShaderName) {
            var shaderName = defdata.toName();
            var keys = defdata.keys();
            var len = keys.length;
            var defStr = "";
            for (var i = 0; i < len; i++) {
                if (defdata[keys[i]] == true) {
                    defStr += "#define " + keys[i] + "\n";
                }
            }
            ShaderGenerator._processIncludes(egret3d.ShaderStore.lib[_ShaderName], function (rel) {
                //处理完成后shader代码
                defStr += rel;
                //console.log( defStr );
            });
        };
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
//# sourceMappingURL=ShaderGenerator.js.map