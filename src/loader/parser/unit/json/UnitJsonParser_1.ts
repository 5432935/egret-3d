module egret3d {

    /**
    * @language zh_CN
    * @private
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UnitJsonParser_1 extends UnitJsonParser {
        public parseMethod(node: any): UnitMatMethodData[] {
            var list = [];

            var method: UnitMatMethodData;

            for (var key in node) {
                method = new UnitMatMethodData();
                method.type = key;
                var item: any = node[key]
                for (var met in item) {
                    if (met == "textures") {
                        for (var varKey in item.textures) {
                            var textureData: any = {};
                            for (var texKey in item.textures[varKey]) {
                                textureData[texKey] = item.textures[varKey][texKey];
                            }
                            method.texturesData.push(textureData);
                        }
                    }
                    else {
                        var v: string = typeof method[met];
                        if (v == "string") {
                            method[met] = item[met];
                        }
                        else if (v == "number") {
                            method[met] = Number(item[met]);
                        }
                        else if (v == "boolean") {
                            method[met] = (item[met] == "true" ? true : false);
                        }
                        else {
                            method[met] = item[met];
                        }
                    }
                }

                list.push(method);
            }

            return list;
        }

        public parseMat(node: any): UnitMatSphereData {
            var data: UnitMatSphereData = new UnitMatSphereData();

            for (var key in node) {
                switch (key) {
                    case "uvRectangle":
                        data.uvRectangle.x = Number(node.uvRectangle.x);
                        data.uvRectangle.y = Number(node.uvRectangle.y);
                        data.uvRectangle.width = Number(node.uvRectangle.width);
                        data.uvRectangle.height = Number(node.uvRectangle.height);
                        break;
                    case "methods":
                        data.methods = this.parseMethod(node.methods);
                        break;
                    case "blendMode":
                        data.blendMode = Number(BlendMode[node[key]]);
                        break;
                    case "lightIds":
                        var splits: string[] = node[key].split(",");
                        for (var j: number = 0; j < splits.length; ++j) {
                            data.lightIds.push(Number(splits[j]));
                        }
                        break;
                    default:
                        var type: string = typeof data[key];
                        if (type == "number") {
                            data[key] = Number(node[key]);
                        }
                        else if (type == "boolean") {
                            data[key] = (node[key] == "true");
                        }
                        else if (type == "string") {
                            data[key] = node[key];
                        }
                        break;
                }
            }
            return data;
        }

        public parseNode(node: any): UnitNodeData {

            var data: UnitNodeData = new UnitNodeData();

            for (var key in node) {
                if (key == "pos" || key == "rot" || key == "scale") {
                    for (var tKey in node[key]) {
                        data[tKey] = Number(node[key][tKey]);
                    }
                }
                else if (key == "geometry") {
                    for (var gKey in node[key]) {
                        if (gKey == "type") {
                            data.geometry[gKey] = node[key][gKey];
                        }
                        else {
                            data.geometry[gKey] = Number(node[key][gKey]);
                        }
                    }
                }
                else if (key == "skinClips") {
                    for (var i: number = 0; i < node.skinClips.length; ++i) {
                        data.skinClips.push(node.skinClips[i]);
                    }
                }
                else if (key == "propertyAnims") {
                    for (var i: number = 0; i < node.propertyAnims.length; ++i) {
                        data.propertyAnims.push(node.propertyAnims[i]);
                    }
                }
                else if (key == "grass") {
                    for (var i: number = 0; i < node.grass.length; ++i) {
                        data.grass.push(node.grass[i]);
                    }
                }
                else if (key == "mats") {
                    data.materialIDs = (node[key] + "").split(",");
                }
                else if (key == "subs") {
                    for (var i: number = 0; i < node.subs.length; ++i) {
                        data.childs.push(node.subs[i]);
                    }
                }
                else if (key == "boneBind") {
                    data.boneBind = node.boneBind;
                }
                else if (key == "lightInfo") {
                    data.lightData = this.parseLight(node.lightInfo);
                }
                else if (key == "lightIds") {
                    data.lightIds = (node[key] + "").split(",");
                }
                else {
                    var v: string = typeof data[key];
                    if (v == "number") {
                        data[key] = Number(node[key]);
                    }
                    else if (v == "boolean") {
                        data[key] = (node[key] == "true") ? true : false;
                    }
                    else {
                        data[key] = node[key];
                    }
                }
            }

            return data;
        }

        public parseEnvironment(environment: any): void {
            if (!environment) {
                return;
            }

            

            if (environment) {
                this._mapConfigParser.isFogOpen = Boolean(environment.isFogOpen);
                if (this._mapConfigParser.isFogOpen) {
                    this._mapConfigParser.fogColor = Number(environment.fogColor);
                    this._mapConfigParser.fogMode = String(environment.fogMode);
                    this._mapConfigParser.fogDensity = Number(environment.fogDensity);
                    this._mapConfigParser.linearFogStart = Number(environment.linearFogStart);
                    this._mapConfigParser.linearFogEnd = Number(environment.linearFogEnd);
                }
            }

            if (environment.directLight) {
                this._mapConfigParser.directLight = (environment.directLight == "open")
            }

            if (environment.pointLight) {
                this._mapConfigParser.pointLight = (environment.pointLight == "open")
            }

            if (!environment.lightList) {
                return;
            }

            for (var i: number = 0; i < environment.lightList.length; ++i) {
                var lightData: UnitLightData = this.parseLight(environment.lightList[i]);
                this._mapConfigParser.lightDict[lightData.id] = lightData;
            }


        }

        public parseHud(node: any): UnitHUDData {
            var hudData: UnitHUDData = new UnitHUDData();

            for (var key in node) {
                if (key == "pos" || key == "rot" || key == "size") {
                    for (var tKey in node[key]) {
                        hudData[tKey] = Number(node[key][tKey]);
                    }
                }
                else if (key == "bothside") {
                    hudData[key] = (node[key] == "true");
                }
                else {
                    hudData[key] = node[key];
                }
            }

            return hudData;
        }

        public parseTexture(node: any) {

            this._mapConfigParser.textures.push(node);
            this._mapConfigParser.calculateTextureTask(node);
        }

        public parseLight(node: any): UnitLightData {
            var lightData: UnitLightData = new UnitLightData();
            for (var key in node) {
                switch (key) {
                    case "id":
                    case "diffuseColor":
                    case "ambientColor":
                    case "intensity":
                    case "halfIntensity":
                    case "falloff":
                    case "radius":
                        lightData[key] = Number(node[key]);
                        break;
                    case "type":
                        lightData.type = Number(LightType[node.type]);
                        break;
                    case "direction":
                        lightData.direction.x = Number(node[key].x);
                        lightData.direction.y = Number(node[key].y);
                        lightData.direction.z = Number(node[key].z);
                        break;
                    case "position":
                        lightData.position.x = Number(node[key].x);
                        lightData.position.y = Number(node[key].y);
                        lightData.position.z = Number(node[key].z);
                        break;
                }
            }

            return lightData;
        }
    }
}