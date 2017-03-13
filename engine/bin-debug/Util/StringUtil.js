var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @private
     * @class egret3d.StringUtil
     * @classdesc
     * 字符串处理工具类
     */
    var StringUtil = (function () {
        function StringUtil() {
        }
        /**
         * @language zh_CN
         * @private
         * 解析文件内容(按行解析)
         * @param file
         * @returns 行列表
         */
        StringUtil.parseContent = function (file) {
            var shaderList = new Array();
            var node = "";
            var endChar = ";";
            var index = -1;
            for (var i = 0; i < file.length; ++i) {
                if (file.charAt(i) == "{") {
                    index = node.indexOf("=");
                    if (index < 0) {
                        endChar = "}";
                    }
                }
                if (node == "") {
                    if (file.charAt(i) == " " || file.charAt(i) == "    " || file.charAt(i) == "\t") {
                        continue;
                    }
                }
                node += file.charAt(i);
                if (endChar != "\n") {
                    if (node.indexOf("#extension") >= 0) {
                        endChar = "\n";
                    }
                    else if (node.indexOf("#define") >= 0) {
                        endChar = "\n";
                    }
                }
                if (endChar == file.charAt(i)) {
                    if (endChar == "}") {
                        var s_num = 0;
                        var e_num = 0;
                        for (var j = 0; j < node.length; ++j) {
                            if (node.charAt(j) == "{") {
                                s_num++;
                            }
                            else if (node.charAt(j) == "}") {
                                e_num++;
                            }
                        }
                        if (s_num != e_num) {
                            continue;
                        }
                        if (node.indexOf("struct") >= 0) {
                            endChar = ";";
                            continue;
                        }
                    }
                    if (node.length > 0) {
                        shaderList.push(node);
                    }
                    node = "";
                    endChar = ";";
                }
            }
            return shaderList;
        };
        /**
         * @language zh_CN
         * 解析一行的内容 有多少个成员
         * @param line 源内容
         * @returns 成员列表
         */
        StringUtil.parseLines = function (line) {
            var list = new Array();
            var value = "";
            var isE = false;
            for (var i = 0; i < line.length; ++i) {
                if (isE) {
                    if (line.charAt(i) == ";") {
                        isE = false;
                        if (value.length > 0) {
                            list.push(value);
                            value = "";
                        }
                        break;
                    }
                    value += line.charAt(i);
                    continue;
                }
                if (line.charAt(i) != " " && line.charAt(i) != "\t" && line.charAt(i) != "," &&
                    line.charAt(i) != "\r" && line.charAt(i) != "\n" && line.charAt(i) != ":") {
                    if (line.charAt(i) == ";") {
                        if (value.length > 0) {
                            list.push(value);
                            value = "";
                        }
                        break;
                    }
                    else if (line.charAt(i) == "=") {
                        if (value.length > 0) {
                            list.push(value);
                            value = "";
                        }
                        list.push("=");
                        isE = true;
                        continue;
                    }
                    value += line.charAt(i);
                    if (i == line.length - 1 && line != "") {
                        list.push(value);
                        value = "";
                    }
                }
                else {
                    if (value != "") {
                        list.push(value);
                        value = "";
                    }
                }
            }
            return list;
        };
        /**
         * @language zh_CN
         * 是否存在此字符串
         * @param fields 被检测的列表
         * @param str 比较字符串
         * @returns 成功返回true
         */
        StringUtil.hasString = function (fields, str) {
            for (var i = 0; i < fields.length; ++i) {
                if (fields[i] == str) {
                    return i;
                }
            }
            return -1;
        };
        /**
         * @language zh_CN
         * 得到值的内容
         * @param fields 成员列表
         * @returns 值
         */
        StringUtil.getVarName = function (fields) {
            var index = this.hasString(fields, "=");
            if (index >= 0) {
                index -= 1;
                if (index >= 0 && index < fields.length) {
                    return fields[index];
                }
            }
            else {
                index = fields.length - 1;
                if (index >= 0 && index < fields.length) {
                    return fields[index];
                }
            }
            return "";
        };
        /**
         * @language zh_CN
         * 返回变量的值
         * @param fields 变量数据列表
         * @returns 变量的值
         */
        StringUtil.getVarValue = function (fields) {
            var index = this.hasString(fields, "=");
            if (index >= 0) {
                index += 1;
                if (index >= 0 && index < fields.length) {
                    return fields[index];
                }
            }
            return "";
        };
        /**
         * @language zh_CN
         * 返回变量类型
         * @param fields 变量数据列表
         * @returns 变量类型
         */
        StringUtil.getVarType = function (fields) {
            var index = this.hasString(fields, "=");
            if (index >= 0) {
                index -= 2;
                if (index >= 0 && index < fields.length) {
                    return fields[index];
                }
            }
            else {
                index = fields.length - 2;
                if (index >= 0 && index < fields.length) {
                    return fields[index];
                }
            }
            return "";
        };
        /**
         * @language zh_CN
         * 返回变量属性
         * @param fields 变量数据列表
         * @returns 变量属性
         */
        StringUtil.getVarKey = function (fields) {
            var index = this.hasString(fields, "=");
            if (index >= 0) {
                index -= 3;
                if (index >= 0 && index < fields.length) {
                    return fields[index];
                }
            }
            else {
                index = fields.length - 3;
                if (index >= 0 && index < fields.length) {
                    return fields[index];
                }
                else {
                    return fields[0];
                }
            }
            return "";
        };
        /**
         * @language zh_CN
         * @private
         * 筛选文件中的指定字符去掉
         * @param file xxx
         * @returns 筛选后的字符
         */
        StringUtil.processShaderFile = function (file) {
            var filterChar = ["\n", "\r"];
            filterChar = [];
            var src = file;
            var dest = src;
            while (true) {
                var pos = src.indexOf("//");
                if (pos < 0) {
                    break;
                }
                var end = src.indexOf("\r\n", pos);
                if (end == -1) {
                    end = src.indexOf("\n", pos);
                }
                var slice_s = src.slice(pos, end);
                src = src.replace(slice_s, "");
                if (src == dest) {
                    break;
                }
                dest = src;
            }
            for (var i = 0; i < filterChar.length; ++i) {
                while (true) {
                    dest = src.replace(filterChar[i], "");
                    if (src == dest) {
                        break;
                    }
                    src = dest;
                }
            }
            return src;
        };
        /**
         * @language zh_CN
         * 解析字符颜色值
         * @param color
         * @returns
         */
        StringUtil.colorRgb = function (color) {
            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            var sColor = color.toLowerCase();
            if (sColor && reg.test(sColor)) {
                if (sColor.length === 4) {
                    var sColorNew = "#";
                    for (var i = 1; i < 4; i += 1) {
                        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                    }
                    sColor = sColorNew;
                }
                //处理六位的颜色值  
                var sColorChange = [];
                for (var i = 1; i < 7; i += 2) {
                    sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
                }
                return "RGB(" + sColorChange.join(",") + ")";
            }
            else {
                return sColor;
            }
        };
        /**
         * @language zh_CN
         * @private
         * @returns
         */
        StringUtil.getLineType = function (line) {
            var index = line.indexOf("{");
            if (index > 0) {
                var firstStr = line.substr(0, index);
                if (firstStr.indexOf("struct") >= 0) {
                    var s_pos = firstStr.lastIndexOf(" ");
                    s_pos++;
                    var structName = firstStr.substr(s_pos, firstStr.length - s_pos);
                    return ("struct " + structName);
                }
                if (firstStr.indexOf("=") < 0) {
                    var pos = line.indexOf("(");
                    var s_pos = line.lastIndexOf(" ", pos);
                    s_pos++;
                    var func = line.substr(s_pos, pos - s_pos);
                    return ("function " + func);
                }
            }
            return "unknown";
        };
        /**
         * @language zh_CN
         * @private
         * @returns
         */
        StringUtil.processStruct = function (name, structStr, content) {
            var pos = structStr.lastIndexOf("}");
            pos++;
            var end = structStr.lastIndexOf(";");
            var varName = structStr.substr(pos, end - pos);
            var varList = StringUtil.parseLines(varName);
            for (var i = 0; i < varList.length; ++i) {
                var varTmp = StringUtil.getTemper(name + " " + varList[i] + ";");
                if (varTmp)
                    content.addVar(varTmp);
            }
        };
        /**
         * @language zh_CN
         * @private
         * @returns
         */
        StringUtil.getAttribute = function (shaderLine) {
            var tempStr = shaderLine;
            var tmpName;
            var valueType;
            var attribute;
            var tempArray = StringUtil.parseLines(tempStr);
            tmpName = StringUtil.getVarName(tempArray);
            valueType = StringUtil.getVarType(tempArray);
            attribute = new egret3d.GLSL.Attribute(tmpName, valueType);
            attribute.value = StringUtil.getVarValue(tempArray);
            return attribute;
        };
        /**
        * @language zh_CN
        * @private
        * @returns
        */
        StringUtil.getTemper = function (shaderLine) {
            var tempStr = shaderLine;
            var tmpName;
            var valueType;
            var tmpVar;
            var tempArray = StringUtil.parseLines(tempStr);
            tmpName = StringUtil.getVarName(tempArray);
            valueType = StringUtil.getVarType(tempArray);
            tmpVar = new egret3d.GLSL.TmpVar(tmpName, valueType);
            tmpVar.value = StringUtil.getVarValue(tempArray);
            return tmpVar;
        };
        /**
        * @language zh_CN
        * @private
        * @returns
        */
        StringUtil.getVarying = function (shaderLine) {
            var tempStr = shaderLine;
            var varyingName;
            var valueType;
            var varying;
            var tempArray = StringUtil.parseLines(tempStr);
            varyingName = StringUtil.getVarName(tempArray);
            valueType = StringUtil.getVarType(tempArray);
            varying = new egret3d.GLSL.Varying(varyingName, valueType);
            return varying;
        };
        /**
        * @language zh_CN
        * @private
        * @returns
        */
        StringUtil.getUniform = function (shaderLine) {
            var tempStr = shaderLine;
            var uniformName;
            var valueType;
            var uniform;
            var tempArray = StringUtil.parseLines(tempStr);
            uniformName = StringUtil.getVarName(tempArray);
            valueType = StringUtil.getVarType(tempArray);
            uniform = new egret3d.GLSL.Uniform(uniformName, valueType);
            return uniform;
        };
        /**
        * @language zh_CN
        * @private
        * @returns
        */
        StringUtil.getConst = function (shaderLine) {
            var tempStr = shaderLine;
            var constVarName;
            var valueType;
            var varValue;
            var constVar;
            var tempArray = StringUtil.parseLines(tempStr);
            constVarName = StringUtil.getVarName(tempArray);
            valueType = StringUtil.getVarType(tempArray);
            varValue = StringUtil.getVarValue(tempArray);
            constVar = new egret3d.GLSL.ConstVar(constVarName, valueType, varValue);
            return constVar;
        };
        StringUtil.getExtension = function (shaderLine) {
            var start = shaderLine.indexOf("#");
            var end = shaderLine.indexOf(" ");
            var type = shaderLine.substr(start, end);
            var namePosEnd = shaderLine.indexOf(":");
            var name = shaderLine.substr(end, namePosEnd - end);
            name = StringUtil.replaceCharacter(name, [" "], "");
            namePosEnd += 1;
            var value = shaderLine.substr(namePosEnd, shaderLine.length - namePosEnd);
            value = StringUtil.replaceCharacter(value, [" ", ":", "\n", "\r"], "");
            var extension = new egret3d.GLSL.Extension(name);
            extension.value = value;
            return extension;
        };
        StringUtil.getDefine = function (shaderLine) {
            //var start: number = shaderLine.indexOf("#");
            //var end: number = shaderLine.indexOf(" ");
            //var type: string = shaderLine.substr(start, end);
            var tempStr = shaderLine;
            var name = "";
            var value = "";
            var tmpVar;
            var tempArray = StringUtil.parseLines(tempStr);
            name = tempArray[1];
            if (tempArray.length >= 3) {
                value = tempArray[2];
            }
            tmpVar = new egret3d.GLSL.DefineVar(name, value);
            return tmpVar;
        };
        /**
        * @language zh_CN
        * @private
        * @returns
        */
        StringUtil.getSampler2D = function (shaderLine) {
            var tempStr = shaderLine;
            var sampler2DName;
            var valueType;
            var sampler2D;
            var tempArray = StringUtil.parseLines(tempStr);
            sampler2DName = StringUtil.getVarName(tempArray);
            sampler2D = new egret3d.GLSL.Sampler2D(sampler2DName);
            return sampler2D;
        };
        /**
        * @language zh_CN
        * @private
        * @returns
        */
        StringUtil.getSampler3D = function (shaderLine) {
            var tempStr = shaderLine;
            var sampler3DName;
            var valueType;
            var sampler3D;
            var tempArray = StringUtil.parseLines(tempStr);
            sampler3DName = StringUtil.getVarName(tempArray);
            sampler3D = new egret3d.GLSL.Sampler3D(sampler3DName);
            return sampler3D;
        };
        /**
        * @language zh_CN
        * @private
        * @returns
        */
        StringUtil.filterCharacter = function (name) {
            var src = name;
            var dest = src;
            for (var i = 0; i < StringUtil._filterChar.length; ++i) {
                while (true) {
                    dest = src.replace(StringUtil._filterChar[i], "");
                    if (src == dest) {
                        break;
                    }
                    src = dest;
                }
            }
            return dest;
        };
        StringUtil.replaceCharacter = function (src, searchValue, replaceValue) {
            var ret = src;
            var isBreak = false;
            while (!isBreak) {
                isBreak = true;
                for (var i = 0; i < searchValue.length; ++i) {
                    if (ret.indexOf(searchValue[i]) >= 0) {
                        isBreak = false;
                        break;
                    }
                }
                for (var i = 0; i < searchValue.length; ++i) {
                    ret = ret.replace(searchValue[i], replaceValue);
                }
            }
            return ret;
        };
        StringUtil.getURLName = function (url) {
            var urlArray = url.split(".");
            urlArray = urlArray[0].split("/");
            return urlArray[urlArray.length - 1];
        };
        StringUtil.getFileFormat = function (url) {
            var endPos = url.lastIndexOf(".");
            endPos++;
            var startPos = url.lastIndexOf("/");
            var fileFormat = url.substr(endPos, url.length - endPos);
            fileFormat = fileFormat.toLowerCase();
            return fileFormat;
        };
        StringUtil.getPath = function (url) {
            var s_pos = url.lastIndexOf("/");
            s_pos++;
            return url.substr(0, s_pos);
        };
        StringUtil.ab2str = function (byte, block) {
            if (block === void 0) { block = 65535; }
            //  return String.fromCharCode.apply(null, new Uint8Array(buf));
            var str = "";
            var oldPos = byte.position;
            var length = block;
            while (byte.position < byte.length) {
                length = block;
                if (byte.length - byte.position < length) {
                    length = byte.length - byte.position;
                }
                str += byte.readUTFBytes(length);
            }
            byte.position = oldPos;
            return str;
        };
        StringUtil.str2ab = function (str) {
            var byte = new egret3d.ByteArray();
            byte.writeUTFBytes(str);
            return byte;
        };
        return StringUtil;
    }());
    /**
     * @language zh_CN
     * @private
     */
    StringUtil._filterChar = [" ", "  ", ";", "\n", "\r", "\t", "\n", "\r", "\t"];
    egret3d.StringUtil = StringUtil;
    __reflect(StringUtil.prototype, "egret3d.StringUtil");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=StringUtil.js.map