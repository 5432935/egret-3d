var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @class egret3d.FuncData
    * @classdesc
    * shader系统工具类，管理所有要用到的shader文件
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ShaderUtil = (function () {
        function ShaderUtil() {
            this._shaderContentDict = [];
            this.vs_begin = "##define vs begin##";
            this.vs_end = "##define vs end##";
            this.fs_begin = "##define fs begin##";
            this.fs_end = "##define fs end##";
        }
        Object.defineProperty(ShaderUtil, "instance", {
            /**
            * @language zh_CN
            *
            * 单例
            */
            get: function () {
                if (!this._instance) {
                    this._instance = new ShaderUtil();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * @private
        * 加载shader文件
        */
        ShaderUtil.prototype.load = function () {
            var del = [];
            var add = [];
            for (var key in egret3d.ShaderLib.lib) {
                var s_pos = egret3d.ShaderLib.lib[key].indexOf(this.vs_begin);
                var e_pos = egret3d.ShaderLib.lib[key].indexOf(this.vs_end);
                var isDel = false;
                if (s_pos != -1) {
                    isDel = true;
                    s_pos += this.vs_begin.length;
                    del.push(key);
                    add[key + "vs"] = egret3d.ShaderLib.lib[key].substr(s_pos, e_pos - s_pos);
                }
                s_pos = egret3d.ShaderLib.lib[key].indexOf(this.fs_begin);
                e_pos = egret3d.ShaderLib.lib[key].indexOf(this.fs_end);
                if (s_pos != -1) {
                    s_pos += this.fs_begin.length;
                    if (isDel) {
                        del.push(key);
                    }
                    add[key + "fs"] = egret3d.ShaderLib.lib[key].substr(s_pos, e_pos - s_pos);
                }
            }
            for (var key in del) {
                delete egret3d.ShaderLib.lib[del[key]];
            }
            for (var key in add) {
                egret3d.ShaderLib.lib[key] = add[key];
            }
            for (var key in egret3d.ShaderLib.lib) {
                var content = this.readShader(egret3d.ShaderLib.lib[key]);
                this._shaderContentDict[key] = content;
                content.name = key;
            }
        };
        ShaderUtil.prototype.readShader = function (str) {
            var content = new egret3d.GLSL.ShaderContent();
            var shaderStr = egret3d.StringUtil.processShaderFile(str);
            var source = egret3d.StringUtil.parseContent(shaderStr);
            var shaderLine = source.concat();
            while (shaderLine.length > 0) {
                var line = shaderLine[0];
                shaderLine.shift();
                var ret = egret3d.StringUtil.getLineType(line);
                var index = -1;
                index = ret.indexOf("struct");
                if (index != -1) {
                    var tempArray = ret.split(" ");
                    var structStr = line;
                    content.addStruct(tempArray[1], structStr);
                    egret3d.StringUtil.processStruct(tempArray[1], structStr, content);
                    continue;
                }
                index = ret.indexOf("function");
                if (index != -1) {
                    var tempArray = ret.split(" ");
                    var func = line;
                    content.addFunc(tempArray[1], func);
                    continue;
                }
                index = ret.indexOf("unknown");
                if (index != -1) {
                    var tempArray = egret3d.StringUtil.parseLines(line);
                    var key = egret3d.StringUtil.getVarKey(tempArray);
                    var valueType = egret3d.StringUtil.getVarType(tempArray);
                    if (valueType == "sampler2D") {
                        var sampler2D = egret3d.StringUtil.getSampler2D(line);
                        if (sampler2D)
                            content.addVar(sampler2D);
                    }
                    else if (valueType == "samplerCube") {
                        var sampler3D = egret3d.StringUtil.getSampler3D(line);
                        if (sampler3D)
                            content.addVar(sampler3D);
                    }
                    else {
                        if (key == "attribute") {
                            var att = egret3d.StringUtil.getAttribute(line);
                            if (att)
                                content.addVar(att);
                        }
                        else if (key == "varying") {
                            var varying = egret3d.StringUtil.getVarying(line);
                            if (varying)
                                content.addVar(varying);
                        }
                        else if (key == "uniform") {
                            var uniform = egret3d.StringUtil.getUniform(line);
                            if (uniform)
                                content.addVar(uniform);
                        }
                        else if (key == "const") {
                            var ConstVar = egret3d.StringUtil.getConst(line);
                            if (ConstVar)
                                content.addVar(ConstVar);
                        }
                        else if (key == "#extension") {
                            var extension = egret3d.StringUtil.getExtension(line);
                            if (extension)
                                content.addVar(extension);
                        }
                        else if (key == "#define") {
                            var def = egret3d.StringUtil.getDefine(line);
                            if (def)
                                content.addVar(def);
                        }
                        else {
                            content.addVar(egret3d.StringUtil.getTemper(line));
                        }
                    }
                    continue;
                }
            }
            return content;
        };
        /**
        * @language zh_CN
        * 返回组合shader后的内容
        * @param shaderNameList 要组合的shader名字列表
        * @param usage
        * @returns shader 内容
        */
        ShaderUtil.prototype.fillShaderContent = function (shaderBase, shaderNameList, usage) {
            var shaderContent;
            var i = 0;
            var varName = "";
            for (i = 0; i < shaderNameList.length; ++i) {
                if (varName != "") {
                    varName += "/";
                }
                varName += shaderNameList[i];
            }
            varName += "/d" + usage.maxDirectLight;
            varName += "/s" + usage.maxSpotLight;
            varName += "/p" + usage.maxPointLight;
            varName += "/b" + usage.maxBone;
            if (!this._shaderContentDict[varName]) {
                shaderContent = new egret3d.GLSL.ShaderContent();
                shaderContent.name = varName;
                for (i = 0; i < shaderNameList.length; ++i) {
                    var tempContent = this._shaderContentDict[shaderNameList[i]];
                    shaderContent.addContent(tempContent);
                }
            }
            else {
                shaderContent = this._shaderContentDict[varName].clone();
            }
            for (i = 0; i < shaderContent.attributeList.length; i++) {
                varName = shaderContent.attributeList[i].varName;
                usage[varName] = shaderContent.attributeList[i];
            }
            for (i = 0; i < shaderContent.varyingList.length; i++) {
                varName = shaderContent.varyingList[i].varName;
                if (!usage[varName]) {
                    usage[varName] = shaderContent.varyingList[i];
                }
            }
            for (i = 0; i < shaderContent.tempList.length; i++) {
                varName = shaderContent.tempList[i].varName;
                usage[varName] = shaderContent.tempList[i];
            }
            for (i = 0; i < shaderContent.uniformList.length; i++) {
                varName = shaderContent.uniformList[i].varName;
                usage[varName] = shaderContent.uniformList[i];
            }
            var constR;
            for (i = 0; i < shaderContent.constList.length; i++) {
                varName = shaderContent.constList[i].varName;
                constR = shaderContent.constList[i];
                usage[varName] = constR;
                switch (varName) {
                    case "max_directLight":
                        constR.value = usage.maxDirectLight;
                        break;
                    case "max_spotLight":
                        constR.value = usage.maxSpotLight;
                        break;
                    case "max_pointLight":
                        constR.value = usage.maxPointLight;
                        break;
                    case "bonesNumber":
                        shaderBase.maxBone = usage.maxBone;
                        constR.value = usage.maxBone;
                        break;
                }
            }
            ///sampler
            for (i = 0; i < shaderContent.sampler2DList.length; i++) {
                var sampler2D = shaderContent.sampler2DList[i];
                sampler2D.index = i;
                usage.sampler2DList.push(sampler2D);
                sampler2D.activeTextureIndex = ShaderUtil.getTexture2DIndex(i);
            }
            ///sampler
            for (i = 0; i < shaderContent.sampler3DList.length; i++) {
                var sampler3D = shaderContent.sampler3DList[i];
                sampler3D.activeTextureIndex = ShaderUtil.getTexture2DIndex(shaderContent.sampler2DList.length + i);
                sampler3D.index = shaderContent.sampler2DList.length + i;
                usage.sampler3DList.push(sampler3D);
            }
            //usage.sampler3DList = shaderContent.sampler3DList;
            this.synthesisShader(shaderContent, shaderBase);
            return ShaderPool.getGPUShader(shaderBase.shaderType, shaderContent.name, shaderContent.source);
        };
        ShaderUtil.prototype.synthesisShader = function (content, shaderBase) {
            var i;
            var source = "";
            for (i = 0; i < content.extensionList.length; i++) {
                source += ShaderUtil.connectExtension(content.extensionList[i]);
            }
            source += "precision highp float;            \t\n";
            for (i = 0; i < content.defineList.length; i++) {
                source += ShaderUtil.connectDefine(content.defineList[i]);
            }
            ///var attribute
            for (i = 0; i < content.attributeList.length; i++) {
                source += ShaderUtil.connectAtt(content.attributeList[i]);
            }
            ///var struct
            for (i = 0; i < content.structNames.length; i++) {
                source += ShaderUtil.connectStruct(content.structDict[content.structNames[i]]);
            }
            ///var varying
            for (i = 0; i < content.varyingList.length; i++) {
                source += ShaderUtil.connectVarying(content.varyingList[i]);
            }
            ///temp
            for (i = 0; i < content.tempList.length; i++) {
                source += ShaderUtil.connectTemp(content.tempList[i]);
            }
            ///const
            for (i = 0; i < content.constList.length; i++) {
                source += ShaderUtil.connectConst(content.constList[i]);
            }
            ///uniform
            for (i = 0; i < content.uniformList.length; i++) {
                source += ShaderUtil.connectUniform(content.uniformList[i]);
            }
            ///sampler
            for (i = 0; i < content.sampler2DList.length; i++) {
                var sampler2D = content.sampler2DList[i];
                source += ShaderUtil.connectSampler(sampler2D);
            }
            ///sampler
            for (i = 0; i < content.sampler3DList.length; i++) {
                var sampler3D = content.sampler3DList[i];
                source += ShaderUtil.connectSampler3D(sampler3D);
            }
            ///---------------------------------------------------------------------------------
            ///---------------------------------------------------------------------------------
            for (i = 0; i < content.funcNames.length; i++) {
                source += content.funcDict[content.funcNames[i]];
            }
            content.source = source;
        };
        //----------------------------------------------------------------------------------------------------------------
        //----------------------------------------------------------------------------------------------------------------
        //----------------------------------------------------------------------------------------------------------------
        //----------------------------------------------------------------------------------------------------------------
        //----------------------------------------------------------------------------------------------------------------
        /**
        * @language zh_CN
        *
        * @param att
        */
        ShaderUtil.connectAtt = function (att) {
            return "attribute " + att.valueType + " " + att.name + "; \r\n";
        };
        /**
        * @language zh_CN
        *
        * @param tempVar
        */
        ShaderUtil.connectTemp = function (tempVar) {
            if (tempVar.value != "") {
                return tempVar.valueType + " " + tempVar.name + " = " + tempVar.value + "; \r\n";
            }
            return tempVar.valueType + " " + tempVar.name + "; \r\n";
        };
        /**
        * @language zh_CN
        *
        * @param struct
        */
        ShaderUtil.connectStruct = function (struct) {
            return struct + " \r\n";
        };
        /**
        * @language zh_CN
        *
        * @param constVar
        */
        ShaderUtil.connectConst = function (constVar) {
            return "const " + constVar.valueType + " " + constVar.name + " = " + constVar.value + "; \r\n";
        };
        /**
        * @language zh_CN
        *
        * @param varying
        */
        ShaderUtil.connectVarying = function (varying) {
            return "varying " + varying.valueType + " " + varying.name + "; \r\n";
        };
        /**
        * @language zh_CN
        *
        * @param unifrom
        */
        ShaderUtil.connectUniform = function (unifrom) {
            return "uniform " + unifrom.valueType + " " + unifrom.name + "; \r\n";
        };
        /**
        * @language zh_CN
        *
        * @param sampler
        */
        ShaderUtil.connectSampler = function (sampler) {
            return "uniform sampler2D " + sampler.name + "; \r\n";
        };
        ShaderUtil.connectSampler3D = function (sampler) {
            return "uniform samplerCube " + sampler.name + "; \r\n";
        };
        ShaderUtil.connectExtension = function (extension) {
            return "#extension " + extension.name + ":" + extension.value + "\r\n";
        };
        ShaderUtil.connectDefine = function (def) {
            return def.key + " " + def.name + " " + def.value + "\r\n";
        };
        ShaderUtil.getTexture2DIndex = function (i) {
            switch (i) {
                case 0:
                    return egret3d.ContextSamplerType.TEXTURE_0;
                case 1:
                    return egret3d.ContextSamplerType.TEXTURE_1;
                case 2:
                    return egret3d.ContextSamplerType.TEXTURE_2;
                case 3:
                    return egret3d.ContextSamplerType.TEXTURE_3;
                case 4:
                    return egret3d.ContextSamplerType.TEXTURE_4;
                case 5:
                    return egret3d.ContextSamplerType.TEXTURE_5;
                case 6:
                    return egret3d.ContextSamplerType.TEXTURE_6;
                case 7:
                    return egret3d.ContextSamplerType.TEXTURE_7;
                case 8:
                    return egret3d.ContextSamplerType.TEXTURE_8;
            }
            throw new Error("texture not big then 8");
        };
        return ShaderUtil;
    }());
    ShaderUtil._shaderLibs = {};
    ShaderUtil._methodLibs = {};
    egret3d.ShaderUtil = ShaderUtil;
    __reflect(ShaderUtil.prototype, "egret3d.ShaderUtil");
})(egret3d || (egret3d = {}));
