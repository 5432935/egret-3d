module egret3d {

    /**
    * @private
    */
    export class ShaderPool {
        //总shader的map容器
        static programlib: HashMap = new HashMap();
        // static vsShaderHashMap: HashMap = new HashMap();
        // static fsShaderHashMap: HashMap = new HashMap();

        private static context: Context3DProxy;
        constructor() {
            
        }

        public static register(context: Context3DProxy) {
            this.context = context;
        }

        // public static getGPUShader( shaderType:number , source:string ):Shader {
        //     // var shader: Shader = this.vsShaderHashMap.getValue(shaderID);
        //     // if (!shader) {
        //     //     shader = this.fsShaderHashMap.getValue(shaderID);
        //     // }

        //     // if (!shader) {
        //         var shader: Shader;
        //         if (shaderType == Shader.vertex) {
        //             shader = this.context.creatVertexShader(source);
        //             // shader.id = shaderID;
        //             // this.vsShaderHashMap.add(shaderID, shader);
        //         } else if (shaderType == Shader.fragment) {
        //             shader = this.context.creatFragmentShader(source);
        //             // shader.id = shaderID;
        //             // this.fsShaderHashMap.add(shaderID, shader);
        //         }
        //     // }
        //         return shader;
        //     //if (shaderType == Shader.vertex) {
        //     //    return this.context.creatVertexShader(source);
        //     //}
        //     //return this.context.creatFragmentShader(source);
        // }

        public static getProgram(vshaderBase: ShaderBase, fshaderBase: ShaderBase, passUsage:PassUsage): WebGLProgram {
            var name: string = this.getProgramCode(vshaderBase.getShaderName(), fshaderBase.getShaderName(), passUsage);
            var program: WebGLProgram;
            if (this.programlib.isHas(name)) {
                program = this.programlib.getValue(name);
            } else {
                program = this.createProgram(vshaderBase, fshaderBase, passUsage);
                this.programlib.add(name, program);
            }
            return program;
        }

        public static deleteProgram(vshaderBase: ShaderBase, fshaderBase: ShaderBase, passUsage:PassUsage): void {
            var name: string = this.getProgramCode(vshaderBase.getShaderName(), fshaderBase.getShaderName(), passUsage);
            var program: WebGLProgram;
            if (this.programlib.isHas(name)) {
                program = this.programlib.getValue(name);
                
                this.context.deleteProgram(program);

                this.programlib.remove(name);
            }
        }

        private static createProgram(vshaderBase: ShaderBase, fshaderBase: ShaderBase, passUsage:PassUsage): WebGLProgram {
            var vsShaderContent: GLSL.ShaderContent = this.fillShaderContent(vshaderBase, vshaderBase.getShaderName(), passUsage);
            var fsShaderContent: GLSL.ShaderContent = this.fillShaderContent(fshaderBase, fshaderBase.getShaderName(), passUsage);

            var vsShader:WebGLShader = this.context.createShader(vshaderBase.shaderType, vsShaderContent.source);
            var fsShader:WebGLShader = this.context.createShader(fshaderBase.shaderType, fsShaderContent.source);

            // passUsage.vertexShader.shader = vsShader;
            // passUsage.fragmentShader.shader = fsShader;

            let program = this.context.createProgram(vsShader, fsShader);

            // delete WebGLShader after linked
            this.context.deleteShader(vsShader);
            this.context.deleteShader(fsShader);
            // vsShader.dispose();
            // fsShader.dispose();
            return program;
        }

        // private static unRegisterShader(list: Array<string>) {
        //     //to delet shader
        // }

        // private static registerProgram(vsShader: Shader, fsShader: Shader):Program3D {
        //     var program3D: Program3D = this.context.creatProgram(vsShader, fsShader);
        //     return program3D; 
        // }

        // private static unRegisterProgram(vsKey: string, fsKey: string) {
        //     //to delet program
        // }

        // private static _shaderLibs: any = {};
        // private static _methodLibs: any = {};
        private static _shaderContentDict: any = [];
        private static vs_begin = "##define vs begin##";
        private static vs_end = "##define vs end##";
        private static fs_begin = "##define fs begin##";
        private static fs_end = "##define fs end##";

        /**
        * @language zh_CN
        * @private
        * 加载shader文件
        */
        public static load() {
            var del: any = [];
            var add: any = [];

            for (var key in ShaderLib.lib) {
                var s_pos: number = ShaderLib.lib[key].indexOf(this.vs_begin);
                var e_pos: number = ShaderLib.lib[key].indexOf(this.vs_end);
                var isDel: boolean = false;
                if (s_pos != -1) {
                    isDel = true;
                    s_pos += this.vs_begin.length;
                    del.push(key);
                    add[key + "vs"] = ShaderLib.lib[key].substr(s_pos, e_pos - s_pos);
                }

                s_pos = ShaderLib.lib[key].indexOf(this.fs_begin);
                e_pos = ShaderLib.lib[key].indexOf(this.fs_end);

                if (s_pos != -1) {
                    s_pos += this.fs_begin.length;
                    if (isDel) {
                        del.push(key);
                    }
                    add[key + "fs"] = ShaderLib.lib[key].substr(s_pos, e_pos - s_pos);
                }
            }

            for (var key in del) {
                delete ShaderLib.lib[del[key]];
            }

            for (var key in add) {
                ShaderLib.lib[key] = add[key];
            }

            for (var key in ShaderLib.lib) {
                var content = this.readShader(ShaderLib.lib[key]);
                this._shaderContentDict[key] = content;
                content.name = key;
            }
        }

        private static readShader(str: string): GLSL.ShaderContent {
            var content: GLSL.ShaderContent = new GLSL.ShaderContent();

            var shaderStr: string = StringUtil.processShaderFile(str);

            var source: Array<string> = StringUtil.parseContent(shaderStr);
            var shaderLine: Array<string> = source.concat();

            while (shaderLine.length > 0) {
                var line: string = shaderLine[0];
                shaderLine.shift();

                var ret: string = StringUtil.getLineType(line);
                var index: number = -1;

                index = ret.indexOf("struct");
                if (index != -1) {
                    var tempArray: Array<string> = ret.split(" ");
                    var structStr: string = line;

                    content.addStruct(tempArray[1], structStr);
                    StringUtil.processStruct(tempArray[1], structStr, content);
                    continue;
                }

                index = ret.indexOf("function");
                if (index != -1) {
                    var tempArray: Array<string> = ret.split(" ");
                    var func: string = line;
                    content.addFunc(tempArray[1], func);
                    continue;
                }


                index = ret.indexOf("unknown");
                if (index != -1) {
                    var tempArray: Array<string> = StringUtil.parseLines(line);
                    var key: string = StringUtil.getVarKey(tempArray);
                    var valueType: string = StringUtil.getVarType(tempArray);
                    if (valueType == "sampler2D") {
                        var sampler2D: GLSL.Sampler2D = StringUtil.getSampler2D(line);
                        if (sampler2D)
                            content.addVar(sampler2D);
                    }
                    else if (valueType == "samplerCube") {
                        var sampler3D: GLSL.Sampler3D = StringUtil.getSampler3D(line);
                        if (sampler3D)
                            content.addVar(sampler3D);
                    }
                    else {
                        if (key == "attribute") {
                            var att: GLSL.Attribute = StringUtil.getAttribute(line);
                            if (att)
                                content.addVar(att);
                        }
                        else if (key == "varying") {
                            var varying: GLSL.Varying = StringUtil.getVarying(line);
                            if (varying)
                                content.addVar(varying);
                        }
                        else if (key == "uniform") {
                            var uniform: GLSL.Uniform = StringUtil.getUniform(line);
                            if (uniform)
                                content.addVar(uniform);
                        }
                        else if (key == "const") {
                            var ConstVar: GLSL.ConstVar = StringUtil.getConst(line);
                            if (ConstVar)
                                content.addVar(ConstVar);
                        }
                        else if (key == "#extension"){
                            var extension: GLSL.Extension = StringUtil.getExtension(line);
                            if (extension)
                                content.addVar(extension);
                        }
                        else if (key == "#define") {
                            var def: GLSL.DefineVar = StringUtil.getDefine(line);
                            if (def)
                                content.addVar(def);
                        }
                        else {
                            content.addVar(StringUtil.getTemper(line));
                        }
                    }
                    continue;
                }
            }
            return content;
        }

        private static getProgramCode(vshaderNameList: Array<string>, fshaderNameList: Array<string>, usage: PassUsage):string {
            var i: number = 0;
            var varName: string = "";

            for (i = 0; i < vshaderNameList.length; ++i) {
                if (varName != "") {
                    varName += "/";
                }
                varName += vshaderNameList[i];
            }

            for (i = 0; i < fshaderNameList.length; ++i) {
                if (varName != "") {
                    varName += "/";
                }
                varName += fshaderNameList[i];
            }

            varName += "/d" + usage.maxDirectLight;
            varName += "/s" + usage.maxSpotLight;
            varName += "/p" + usage.maxPointLight;
            varName += "/b" + usage.maxBone;

            return varName;
        }

        /**
        * @language zh_CN
        * 返回组合shader后的内容
        * @param shaderNameList 要组合的shader名字列表
        * @param usage
        * @returns shader 内容
        */
        private static fillShaderContent(shaderBase: ShaderBase, shaderNameList: Array<string>, usage: PassUsage): GLSL.ShaderContent {

            
            var i: number = 0;
            var varName: string = "";
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

            var shaderContent: GLSL.ShaderContent;

            if (!this._shaderContentDict[varName]) {
                shaderContent = new GLSL.ShaderContent();
                shaderContent.name = varName;
                for (i = 0; i < shaderNameList.length; ++i) {
                    var tempContent: GLSL.ShaderContent = this._shaderContentDict[shaderNameList[i]];
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

            var constR: GLSL.ConstVar;
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
                var sampler2D: GLSL.Sampler2D = shaderContent.sampler2DList[i];
                sampler2D.index = i;
                usage.sampler2DList.push(sampler2D);
                sampler2D.activeTextureIndex = this.getTexture2DIndex(i);
            }

            //for (i = 0; i < usage.sampler2DList.length; i++) {
            //    var sampler2D: GLSL.Sampler2D = usage.sampler2DList[i];
            //    sampler2D.index = i;
            //}
            
            ///sampler
            for (i = 0; i < shaderContent.sampler3DList.length; i++) {
                var sampler3D: GLSL.Sampler3D = shaderContent.sampler3DList[i];
                sampler3D.activeTextureIndex = this.getTexture2DIndex(shaderContent.sampler2DList.length + i);
                sampler3D.index = shaderContent.sampler2DList.length + i;

                usage.sampler3DList.push(sampler3D);
            }
            //usage.sampler3DList = shaderContent.sampler3DList;

            this.synthesisShader(shaderContent, shaderBase);

            return shaderContent;

            // return ShaderPool.getGPUShader(shaderBase.shaderType, shaderContent.name, shaderContent.source);
        }

        private static synthesisShader(content: GLSL.ShaderContent, shaderBase:ShaderBase) {
            var i: number; 
            var source: string = "";

            for (i = 0; i < content.extensionList.length; i++) {
                source += this.connectExtension(content.extensionList[i]);
            }

            source += "precision highp float;            \t\n";
            for (i = 0; i < content.defineList.length; i++) {
                source += this.connectDefine(content.defineList[i]);
            }

            ///var attribute
            for (i = 0; i < content.attributeList.length; i++) {
                source += this.connectAtt(content.attributeList[i]);
            }
            ///var struct
            for (i = 0; i < content.structNames.length; i++) {
                source += this.connectStruct(content.structDict[content.structNames[i]]);
            }
            ///var varying
            for (i = 0; i < content.varyingList.length; i++) {
                source += this.connectVarying(content.varyingList[i]);
            }
            ///temp
            for (i = 0; i < content.tempList.length; i++) {
                source += this.connectTemp(content.tempList[i]);
            }
            ///const
            for (i = 0; i < content.constList.length; i++) {
                source += this.connectConst(content.constList[i]);
            }
            ///uniform
            for (i = 0; i < content.uniformList.length; i++) {
                source += this.connectUniform(content.uniformList[i]);
            }
            ///sampler
            for (i = 0; i < content.sampler2DList.length; i++) {
                var sampler2D: GLSL.Sampler2D = content.sampler2DList[i];
                source += this.connectSampler(sampler2D);
            }
            ///sampler
            for (i = 0; i < content.sampler3DList.length; i++) {
                var sampler3D: GLSL.Sampler3D = content.sampler3DList[i];
                source += this.connectSampler3D(sampler3D);
            }
            ///---------------------------------------------------------------------------------
            ///---------------------------------------------------------------------------------
            for (i = 0; i < content.funcNames.length; i++) {
                source += content.funcDict[content.funcNames[i]];
            }
            content.source = source;
        }

        /**
        * @language zh_CN
        * 
        * @param att 
        */
        public static connectAtt(att: GLSL.Attribute):string {
            return "attribute " + att.valueType + " " + att.name + "; \r\n";
        }

        /**
        * @language zh_CN
        * 
        * @param tempVar 
        */
        private static connectTemp(tempVar: GLSL.TmpVar): string {

            if (tempVar.value != "") {
                return tempVar.valueType + " " + tempVar.name + " = " + tempVar.value + "; \r\n";
            }
            return tempVar.valueType + " " + tempVar.name + "; \r\n";
        }

        /**
        * @language zh_CN
        * 
        * @param struct 
        */
        private static connectStruct(struct: string): string {
            return struct + " \r\n";
        }

        /**
        * @language zh_CN
        * 
        * @param constVar 
        */
        private static connectConst(constVar: GLSL.ConstVar): string {
            return "const " + constVar.valueType + " " + constVar.name + " = " + constVar.value + "; \r\n";
        }

        /**
        * @language zh_CN
        * 
        * @param varying 
        */
        private static connectVarying(varying: GLSL.Varying): string {
            return "varying " + varying.valueType + " " + varying.name + "; \r\n";
        }

        /**
        * @language zh_CN
        * 
        * @param unifrom 
        */
        private static connectUniform(unifrom: GLSL.Uniform): string {
            return "uniform " + unifrom.valueType + " " + unifrom.name + "; \r\n";
        }
        /**
        * @language zh_CN
        * 
        * @param sampler 
        */
        private static connectSampler(sampler: GLSL.Sampler2D): string {
            return "uniform sampler2D " + sampler.name + "; \r\n";

        }

        private static connectSampler3D(sampler: GLSL.Sampler3D): string {
            return "uniform samplerCube " + sampler.name + "; \r\n";
        }

        private static connectExtension(extension: GLSL.Extension): string {
            return "#extension " + extension.name + ":" +  extension.value + "\r\n";
        }

        private static connectDefine(def: GLSL.DefineVar): string {
            return def.key + " " + def.name + " " + def.value + "\r\n";
        }

        private static getTexture2DIndex(i: number): number {
            switch (i) {
                case 0:
                    return ContextSamplerType.TEXTURE_0;
                case 1:
                    return ContextSamplerType.TEXTURE_1;
                case 2:
                    return ContextSamplerType.TEXTURE_2;
                case 3:
                    return ContextSamplerType.TEXTURE_3;
                case 4:
                    return ContextSamplerType.TEXTURE_4;
                case 5:
                    return ContextSamplerType.TEXTURE_5;
                case 6:
                    return ContextSamplerType.TEXTURE_6;
                case 7:
                    return ContextSamplerType.TEXTURE_7;
                case 8:
                    return ContextSamplerType.TEXTURE_8;
            }

            throw new Error("texture not big then 8")
        }
    }
}


  






      