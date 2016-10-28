module egret3d {

    /**
    * @language zh_CN
    * @private
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UnitJsonParser extends UnitParser {

        constructor(data: any, mapConfigParser: UnitConfigParser) {
            super(data, mapConfigParser);
            this._mapConfigParser.version = Number(data.version);
        }

        public parser() {
            this._versionParser = UnitParserUtils.jsonVersion(this._mapConfigParser.version, this._data, this._mapConfigParser);

            this.parseEnvironment(this._data.env);

            if (this._data.propertyAnimations) {
                for (var i: number = 0; i < this._data.propertyAnimations.length; i++) {
                    var proAnimation: any = this._data.propertyAnimations[i];
                    var id: number = Number(proAnimation.id);
                    if (proAnimation) {
                        this._mapConfigParser.proAnimationDict[id] = proAnimation;
                        this._mapConfigParser.calculateProAnimationTask(proAnimation);
                    }
                }
            }

            if (this._data.skeletonAnimations) {
                for (var i: number = 0; i < this._data.skeletonAnimations.length; i++) {
                    var skeletonAnimation: any = this._data.skeletonAnimations[i];
                    var id: number = Number(skeletonAnimation.id);
                    if (skeletonAnimation) {
                        this._mapConfigParser.skeletonAnimationDict[id] = skeletonAnimation;
                        this._mapConfigParser.calculateSkeletonAnimationTask(skeletonAnimation);
                    }
                }
            }

            if (this._data.mats) {
                for (var i: number = 0; i < this._data.mats.length; i++) {
                    var matNodeData = this._versionParser.parseMat(this._data.mats[i]);
                    if (matNodeData) {
                        this._mapConfigParser.matDict[matNodeData.id] = matNodeData;

                        this._mapConfigParser.calculateMatTask(matNodeData);
                    }
                }
            }

            if (this._data.nodes) {
                for (var i: number = 0; i < this._data.nodes.length; i++) {
                    var mapNodeData: UnitNodeData = this._versionParser.parseNode(this._data.nodes[i]);
                    if (mapNodeData) {
                        this._mapConfigParser.nodeList.push(mapNodeData);
                        this._mapConfigParser.calculateNodeTask(mapNodeData);
                    }
                }
            }

            if (this._data.textures) {
                for (var i: number = 0; i < this._data.textures.length; i++) {
                    this._versionParser.parseTexture(this._data.textures[i]);
                }
            }

            if (this._data.huds) {
                for (var i: number = 0; i < this._data.huds.length; i++) {
                    var hudNodeData = this._versionParser.parseHud(this._data.huds[i]);
                    if (hudNodeData) {
                        this._mapConfigParser.hudList.push(hudNodeData);
                        this._mapConfigParser.calculateHudTask(hudNodeData);
                    }
                }
            }

            this._mapConfigParser.processNode();
        }    
    }
}