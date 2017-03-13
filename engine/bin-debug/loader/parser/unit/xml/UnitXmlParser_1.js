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
    * @language zh_CN
    * @private
    * @version Egret 3.0
    * @platform Web,Native
    */
    var UnitXmlParser_1 = (function (_super) {
        __extends(UnitXmlParser_1, _super);
        function UnitXmlParser_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UnitXmlParser_1.prototype.parseTexture = function (node) {
            if (node.childNodes.length == 1)
                return null;
            var attr = null;
            var item;
            var i = 0;
            var count = 0;
            for (i = 0, count = node.childNodes.length; i < count; i++) {
                item = node.childNodes[i];
                if (this.nodeFilter(item))
                    continue;
                var data = {};
                for (var j = 0; j < item.attributes.length; ++j) {
                    attr = item.attributes[j];
                    data[attr.name] = attr.value;
                }
                this._mapConfigParser.textures.push(data);
                this._mapConfigParser.calculateTextureTask(data);
            }
        };
        UnitXmlParser_1.prototype.parseMethod = function (node) {
            if (node.childNodes.length <= 1)
                return null;
            var list = [];
            var item;
            var nodeName;
            var count = 0;
            var method;
            var attr = null;
            for (var i = 0, count = node.childNodes.length; i < count; i++) {
                item = node.childNodes[i];
                nodeName = item.nodeName;
                if (this.nodeFilter(item))
                    continue;
                method = new egret3d.UnitMatMethodData();
                method.type = nodeName;
                for (var j = 0; j < item.attributes.length; ++j) {
                    attr = item.attributes[j];
                    var v = typeof method[attr.name];
                    if (v == "string") {
                        method[attr.name] = attr.value;
                    }
                    else if (v == "number") {
                        method[attr.name] = Number(attr.value);
                    }
                    else if (v == "boolean") {
                        method[attr.name] = (attr.value == "true" ? true : false);
                    }
                    else {
                        method[attr.name] = attr.value;
                    }
                }
                for (var j = 0; j < item.childNodes.length; ++j) {
                    var textureItem = item.childNodes[j];
                    if (this.nodeFilter(textureItem)) {
                        continue;
                    }
                    var textureData = {};
                    for (var k = 0; k < textureItem.attributes.length; ++k) {
                        attr = textureItem.attributes[k];
                        textureData[attr.name] = attr.value;
                    }
                    method.texturesData.push(textureData);
                }
                list.push(method);
            }
            return list;
        };
        UnitXmlParser_1.prototype.parseMat = function (node) {
            if (node.childNodes.length == 0)
                return null;
            var data = new egret3d.UnitMatSphereData();
            var attr = null;
            for (var i = 0; i < node.attributes.length; ++i) {
                attr = node.attributes[i];
                data[attr.name] = attr.value;
            }
            var item;
            var nodeName;
            var count = 0;
            for (var i = 0, count = node.childNodes.length; i < count; i++) {
                item = node.childNodes[i];
                nodeName = item.nodeName;
                if (this.nodeFilter(item)) {
                    continue;
                }
                if (nodeName == "methods") {
                    data.methods = this.parseMethod(item);
                }
                else if (nodeName == "uvRectangle") {
                    for (var j = 0; j < item.attributes.length; ++j) {
                        data.uvRectangle[item.attributes[j].name] = Number(item.attributes[j].value);
                    }
                }
                else if (nodeName == "blendMode") {
                    data[item.nodeName] = egret3d.BlendMode[item.textContent];
                }
                else if (nodeName == "lightIds") {
                    if (item.textContent) {
                        var splits = item.textContent.split(",");
                        for (var j = 0; j < splits.length; ++j) {
                            data.lightIds.push(Number(splits[j]));
                        }
                    }
                }
                else {
                    var v = typeof data[item.nodeName];
                    if (v == "string") {
                        data[item.nodeName] = item.textContent;
                    }
                    else if (v == "number") {
                        data[item.nodeName] = Number(item.textContent);
                    }
                    else if (v == "boolean") {
                        data[item.nodeName] = (item.textContent == "true" ? true : false);
                    }
                }
            }
            return data;
        };
        UnitXmlParser_1.prototype.parseNode = function (node) {
            if (node.childNodes.length == 1)
                return null;
            var attr = null;
            var data = new egret3d.UnitNodeData();
            for (var i = 0; i < node.attributes.length; ++i) {
                attr = node.attributes[i];
                var v = typeof data[attr.name];
                if (v == "number") {
                    data[attr.name] = Number(attr.value);
                }
                else if (v == "boolean") {
                    data[attr.name] = (attr.value == "true") ? true : false;
                }
                else {
                    data[attr.name] = attr.value;
                }
            }
            var item;
            var nodeName;
            var i = 0;
            var count = 0;
            for (i = 0, count = node.childNodes.length; i < count; i++) {
                item = node.childNodes[i];
                nodeName = item.nodeName;
                if (this.nodeFilter(item)) {
                    continue;
                }
                if (nodeName == "pos") {
                    for (var j = 0; j < item.attributes.length; ++j) {
                        attr = item.attributes[j];
                        data[attr.nodeName] = Number(attr.value);
                    }
                }
                else if (nodeName == "rot") {
                    for (var j = 0; j < item.attributes.length; ++j) {
                        attr = item.attributes[j];
                        data[attr.nodeName] = Number(attr.value);
                    }
                }
                else if (nodeName == "scale") {
                    for (var j = 0; j < item.attributes.length; ++j) {
                        attr = item.attributes[j];
                        data[attr.nodeName] = Number(attr.value);
                    }
                }
                else if (nodeName == "mat") {
                    for (var j = 0; j < item.attributes.length; ++j) {
                        attr = item.attributes[j];
                        if (attr.nodeName == "id") {
                            data.materialIDs = (attr.value + "").split(",");
                        }
                    }
                }
                else if (nodeName == "skinClip") {
                    var skinClipData = {};
                    data.skinClips.push(skinClipData);
                    for (var j = 0; j < item.attributes.length; ++j) {
                        attr = item.attributes[j];
                        skinClipData[attr.nodeName] = attr.value;
                    }
                }
                else if (nodeName == "propertyAnim") {
                    var propertyAnimsData = {};
                    data.propertyAnims.push(propertyAnimsData);
                    for (var j = 0; j < item.attributes.length; ++j) {
                        attr = item.attributes[j];
                        propertyAnimsData[attr.nodeName] = attr.value;
                    }
                }
                else if (nodeName == "geometry") {
                    var geo = {};
                    for (var j = 0; j < item.attributes.length; ++j) {
                        attr = item.attributes[j];
                        if (attr.name == "type") {
                            geo[attr.name] = attr.value;
                        }
                        else {
                            geo[attr.name] = Number(attr.value);
                        }
                    }
                    data.geometry = geo;
                }
                else if (nodeName == "sub") {
                    var childData = {};
                    for (var j = 0; j < item.attributes.length; ++j) {
                        attr = item.attributes[j];
                        childData[attr.name] = attr.value;
                    }
                    data.childs.push(childData);
                }
            }
            return data;
        };
        UnitXmlParser_1.prototype.parseEnvironment = function (environment) {
            if (environment.length <= 0) {
                return;
            }
            //解析灯光
            var item;
            var item0;
            var item1;
            var attr = null;
            for (var iii = 0; iii < environment[0].attributes.length; ++iii) {
                attr = environment[0].attributes[iii];
                this._mapConfigParser[attr.name] = (attr.value == "open");
            }
            for (var i = 0, count = environment.length; i < count; i++) {
                item = environment[i];
                for (var ii = 0; ii < item.childNodes.length; ++ii) {
                    item0 = item.childNodes[ii];
                    if (this.nodeFilter(item0))
                        continue;
                    if (item0.nodeName == "light") {
                        var lightData = new egret3d.UnitLightData();
                        for (var iii = 0; iii < item0.attributes.length; ++iii) {
                            attr = item0.attributes[iii];
                            if (attr.name == "id") {
                                lightData[attr.name] = Number(attr.value);
                            }
                            else {
                                lightData[attr.name] = attr.value;
                            }
                        }
                        this._mapConfigParser.lightDict[lightData.id] = lightData;
                        for (var iii = 0; iii < item0.childNodes.length; ++iii) {
                            item1 = item0.childNodes[iii];
                            if (this.nodeFilter(item1)) {
                                continue;
                            }
                            if (item1.nodeName == "direction") {
                                for (var iiii = 0; iiii < item1.attributes.length; ++iiii) {
                                    attr = item1.attributes[iiii];
                                    lightData.direction[attr.name] = Number(attr.value);
                                }
                            }
                            else if (item1.nodeName == "position") {
                                for (var iiii = 0; iiii < item1.attributes.length; ++iiii) {
                                    attr = item1.attributes[iiii];
                                    lightData.position[attr.name] = Number(attr.value);
                                }
                            }
                            else if (item1.nodeName == "type") {
                                lightData.type = egret3d.LightType[item1.textContent];
                            }
                            else {
                                lightData[item1.nodeName] = Number(item1.textContent);
                            }
                        }
                    }
                    else if (item0.nodeName == "fog") {
                    }
                }
            }
        };
        UnitXmlParser_1.prototype.parseHud = function (node) {
            if (node.childNodes.length == 1)
                return null;
            var attr = null;
            var hudData = new egret3d.UnitHUDData();
            for (var i = 0; i < node.attributes.length; ++i) {
                attr = node.attributes[i];
                if (attr.nodeName == "bothside") {
                    hudData[attr.nodeName] = (attr.value == "true");
                }
                else {
                    hudData[attr.nodeName] = attr.value;
                }
            }
            var item;
            var nodeName;
            var i = 0;
            var count = 0;
            for (i = 0, count = node.childNodes.length; i < count; i++) {
                item = node.childNodes[i];
                nodeName = item.nodeName;
                if (this.nodeFilter(item)) {
                    continue;
                }
                for (var j = 0; j < item.attributes.length; ++j) {
                    attr = item.attributes[j];
                    if (nodeName == "shader") {
                        hudData[attr.nodeName] = attr.value;
                    }
                    else {
                        hudData[attr.nodeName] = Number(attr.value);
                    }
                }
            }
            return hudData;
        };
        return UnitXmlParser_1;
    }(egret3d.UnitXmlParser));
    egret3d.UnitXmlParser_1 = UnitXmlParser_1;
    __reflect(UnitXmlParser_1.prototype, "egret3d.UnitXmlParser_1");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=UnitXmlParser_1.js.map