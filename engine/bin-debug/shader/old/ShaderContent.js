var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var GLSL;
    (function (GLSL) {
        /**
        * @private
        * @class egret3d.ShaderContent
        * @classdesc
        * shader文件解析后的数据内容
        * 每种变量类型都进行了规类
        * 用相应的列表进行存储，这样可以便于shader文件进行合并
        * @version Egret 3.0
        * @platform Web,Native
        */
        var ShaderContent = (function () {
            function ShaderContent() {
                /**
                * @private
                * shader文件名
                * @version Egret 3.0
                * @platform Web,Native
                */
                this.name = "";
                this.source = "";
                this.funcNames = new Array();
                this.funcDict = {};
                /**
                * @private
                * 结构体列表
                * @version Egret 3.0
                * @platform Web,Native
                */
                this.structDict = {};
                this.structNames = new Array();
                /**
                * @private
                * attribute列表
                * @version Egret 3.0
                * @platform Web,Native
                */
                this.attributeList = new Array();
                /**
                * @private
                * varying列表
                * @version Egret 3.0
                * @platform Web,Native
                */
                this.varyingList = new Array();
                /**
                * @private
                * uniform列表
                * @version Egret 3.0
                * @platform Web,Native
                */
                this.uniformList = new Array();
                /**
                * @private
                * const列表
                * @version Egret 3.0
                * @platform Web,Native
                */
                this.constList = new Array();
                /**
                * @private
                * 临时变量列表
                * @version Egret 3.0
                * @platform Web,Native
                */
                this.tempList = new Array();
                /**
                * @private
                * sampler2D列表
                * @version Egret 3.0
                * @platform Web,Native
                */
                this.sampler2DList = new Array();
                /**
                * @private
                * sampler3D列表
                * @version Egret 3.0
                * @platform Web,Native
                */
                this.sampler3DList = new Array();
                this.extensionList = new Array();
                this.defineList = new Array();
            }
            /**
            * @private
            * 增加一个变量对象
            * @version Egret 3.0
            * @platform Web,Native
            */
            ShaderContent.prototype.addVar = function (sVar) {
                if (sVar.key == "attribute") {
                    this.attributeList.push(sVar);
                }
                else if (sVar.key == "varying") {
                    this.varyingList.push(sVar);
                }
                else if (sVar.key == "uniform") {
                    this.uniformList.push(sVar);
                }
                else if (sVar.key == "const") {
                    this.constList.push(sVar);
                }
                else if (sVar.key == "sampler2D") {
                    this.sampler2DList.push(sVar);
                }
                else if (sVar.key == "samplerCube") {
                    this.sampler3DList.push(sVar);
                }
                else if (sVar.key == "#extension") {
                    this.extensionList.push(sVar);
                }
                else if (sVar.key == "#define") {
                    this.defineList.push(sVar);
                }
                else {
                    this.tempList.push(sVar);
                }
            };
            /**
            * @private
            * 增加一个函数
            * @version Egret 3.0
            * @platform Web,Native
            */
            ShaderContent.prototype.addFunc = function (name, func) {
                if (!this.funcDict[name]) {
                    this.funcDict[name] = func;
                    this.funcNames.push(name);
                }
                else {
                    // if (name == "main") {
                    var newfunc = this.mergeMainFunc(this.funcDict[name], func);
                    this.funcDict[name] = newfunc;
                }
                if (this.funcDict["main"]) {
                    var index = this.funcNames.indexOf("main");
                    this.funcNames.splice(index, 1);
                    this.funcNames.push("main");
                }
            };
            /**
            * @private
            * 增加一个结构体
            * @version Egret 3.0
            * @platform Web,Native
            */
            ShaderContent.prototype.addStruct = function (name, structStr) {
                if (!this.structDict[name]) {
                    this.structDict[name] = structStr;
                    this.structNames.push(name);
                }
                else {
                    console.log("<" + name + ">" + "struct重复");
                }
            };
            /**
            * @private
            * 合并一个shader内容
            * @version Egret 3.0
            * @platform Web,Native
            */
            ShaderContent.prototype.addContent = function (otherContent) {
                for (var i = 0; i < otherContent.structNames.length; ++i) {
                    this.addStruct(otherContent.structNames[i], otherContent.structDict[otherContent.structNames[i]]);
                }
                for (var i = 0; i < otherContent.funcNames.length; ++i) {
                    this.addFunc(otherContent.funcNames[i], otherContent.funcDict[otherContent.funcNames[i]]);
                }
                for (var i = 0; i < otherContent.attributeList.length; ++i) {
                    var isAdd = true;
                    for (var j = 0; j < this.attributeList.length; ++j) {
                        if (otherContent.attributeList[i].name == this.attributeList[j].name) {
                            if (otherContent.attributeList[i].valueType != this.attributeList[j].valueType ||
                                otherContent.attributeList[i].key != this.attributeList[j].key) {
                            }
                            isAdd = false;
                            break;
                        }
                    }
                    if (isAdd) {
                        this.attributeList.push(otherContent.attributeList[i].clone());
                    }
                }
                for (var i = 0; i < otherContent.varyingList.length; ++i) {
                    var isAdd = true;
                    for (var j = 0; j < this.varyingList.length; ++j) {
                        if (otherContent.varyingList[i].name == this.varyingList[j].name) {
                            if (otherContent.varyingList[i].valueType != this.varyingList[j].valueType ||
                                otherContent.varyingList[i].key != this.varyingList[j].key) {
                            }
                            isAdd = false;
                            break;
                        }
                    }
                    if (isAdd) {
                        this.varyingList.push(otherContent.varyingList[i].clone());
                    }
                }
                for (var i = 0; i < otherContent.uniformList.length; ++i) {
                    var isAdd = true;
                    for (var j = 0; j < this.uniformList.length; ++j) {
                        if (otherContent.uniformList[i].name == this.uniformList[j].name) {
                            if (otherContent.uniformList[i].valueType != this.uniformList[j].valueType ||
                                otherContent.uniformList[i].key != this.uniformList[j].key) {
                            }
                            isAdd = false;
                            break;
                        }
                    }
                    if (isAdd) {
                        this.uniformList.push(otherContent.uniformList[i].clone());
                    }
                }
                for (var i = 0; i < otherContent.constList.length; ++i) {
                    var isAdd = true;
                    for (var j = 0; j < this.constList.length; ++j) {
                        if (otherContent.constList[i].name == this.constList[j].name) {
                            if (otherContent.constList[i].valueType != this.constList[j].valueType ||
                                otherContent.constList[i].key != this.constList[j].key) {
                            }
                            isAdd = false;
                            break;
                        }
                    }
                    if (isAdd) {
                        this.constList.push(otherContent.constList[i].clone());
                    }
                }
                for (var i = 0; i < otherContent.tempList.length; ++i) {
                    var isAdd = true;
                    for (var j = 0; j < this.tempList.length; ++j) {
                        if (otherContent.tempList[i].name == this.tempList[j].name) {
                            if (otherContent.tempList[i].valueType != this.tempList[j].valueType ||
                                otherContent.tempList[i].key != this.tempList[j].key) {
                            }
                            isAdd = false;
                            break;
                        }
                    }
                    if (isAdd) {
                        this.tempList.push(otherContent.tempList[i].clone());
                    }
                }
                for (var i = 0; i < otherContent.sampler2DList.length; ++i) {
                    var isAdd = true;
                    for (var j = 0; j < this.sampler2DList.length; ++j) {
                        if (otherContent.sampler2DList[i].name == this.sampler2DList[j].name) {
                            if (otherContent.sampler2DList[i].valueType != this.sampler2DList[j].valueType ||
                                otherContent.sampler2DList[i].key != this.sampler2DList[j].key) {
                            }
                            isAdd = false;
                            break;
                        }
                    }
                    if (isAdd) {
                        this.sampler2DList.push(otherContent.sampler2DList[i].clone());
                    }
                }
                for (var i = 0; i < otherContent.sampler3DList.length; ++i) {
                    var isAdd = true;
                    for (var j = 0; j < this.sampler3DList.length; ++j) {
                        if (otherContent.sampler3DList[i].name == this.sampler3DList[j].name) {
                            if (otherContent.sampler2DList[i].valueType != this.sampler3DList[j].valueType ||
                                otherContent.sampler3DList[i].key != this.sampler3DList[j].key) {
                            }
                            isAdd = false;
                            break;
                        }
                    }
                    if (isAdd) {
                        this.sampler3DList.push(otherContent.sampler3DList[i].clone());
                    }
                }
                for (var i = 0; i < otherContent.extensionList.length; ++i) {
                    var isAdd = true;
                    for (var j = 0; j < this.extensionList.length; ++j) {
                        if (otherContent.extensionList[i].name == this.extensionList[j].name) {
                            isAdd = false;
                            break;
                        }
                    }
                    if (isAdd) {
                        this.extensionList.push(otherContent.extensionList[i].clone());
                    }
                }
                for (var i = 0; i < otherContent.defineList.length; ++i) {
                    var isAdd = true;
                    for (var j = 0; j < this.defineList.length; ++j) {
                        if (otherContent.defineList[i].name == this.defineList[j].name) {
                            isAdd = false;
                            break;
                        }
                    }
                    if (isAdd) {
                        this.defineList.push(otherContent.defineList[i].clone());
                    }
                }
            };
            ShaderContent.prototype.mergeMainFunc = function (func1, func2) {
                var ret = func1;
                var func = "";
                var s_pos = func2.indexOf("{");
                var e_pos = func2.lastIndexOf("}");
                s_pos++;
                func = func2.slice(s_pos, e_pos);
                s_pos = ret.lastIndexOf("}");
                var f_func = ret.substr(0, s_pos);
                var s_func = ret.substr(s_pos, ret.length - s_pos);
                ret = f_func;
                ret += func;
                var temp = "";
                var line = "";
                var old = ret;
                ret += line;
                ret += s_func;
                return ret;
            };
            ShaderContent.prototype.clone = function () {
                var content = new ShaderContent();
                content.name = this.name;
                content.source = this.source;
                for (var i = 0; i < this.funcNames.length; ++i) {
                    content.funcNames.push(this.funcNames[i]);
                }
                for (var key in this.funcDict) {
                    content.funcDict[key] = this.funcDict[key];
                }
                for (var i = 0; i < this.structNames.length; ++i) {
                    content.structNames.push(this.structNames[i]);
                }
                for (var key in this.structDict) {
                    content.structDict[key] = this.structDict[key];
                }
                for (var i = 0; i < this.attributeList.length; ++i) {
                    content.attributeList.push(this.attributeList[i].clone());
                }
                for (var i = 0; i < this.varyingList.length; ++i) {
                    content.varyingList.push(this.varyingList[i].clone());
                }
                for (var i = 0; i < this.uniformList.length; ++i) {
                    content.uniformList.push(this.uniformList[i].clone());
                }
                for (var i = 0; i < this.constList.length; ++i) {
                    content.constList.push(this.constList[i].clone());
                }
                for (var i = 0; i < this.tempList.length; ++i) {
                    content.tempList.push(this.tempList[i].clone());
                }
                for (var i = 0; i < this.sampler2DList.length; ++i) {
                    content.sampler2DList.push(this.sampler2DList[i].clone());
                }
                for (var i = 0; i < this.sampler3DList.length; ++i) {
                    content.sampler3DList.push(this.sampler3DList[i].clone());
                }
                for (var i = 0; i < this.attributeList.length; ++i) {
                    content.attributeList.push(this.attributeList[i].clone());
                }
                for (var i = 0; i < this.extensionList.length; ++i) {
                    content.extensionList.push(this.extensionList[i].clone());
                }
                for (var i = 0; i < this.defineList.length; ++i) {
                    content.defineList.push(this.defineList[i].clone());
                }
                return content;
            };
            return ShaderContent;
        }());
        GLSL.ShaderContent = ShaderContent;
        __reflect(ShaderContent.prototype, "egret3d.GLSL.ShaderContent");
    })(GLSL = egret3d.GLSL || (egret3d.GLSL = {}));
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ShaderContent.js.map