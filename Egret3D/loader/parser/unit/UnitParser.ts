module egret3d {

    /**
    * @language zh_CN
    * @private
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UnitParser {
        protected _mapConfigParser: UnitConfigParser;
        protected _data: any;
        protected _versionParser: UnitParser;

        constructor(data: any, mapConfigParser: UnitConfigParser) {
            this._data = data;
            this._mapConfigParser = mapConfigParser;
            this._versionParser = null;
        }

        public parser() {
        }

        public parseTexture(node: any) {

        }

        public parseMethod(node: any): UnitMatMethodData[] {
            return null;
        }

        public parseMat(node: any): UnitMatSphereData {
            return null;
        }

        public parseNode(node: any): UnitNodeData {
            return null;
        }

        public parseEnvironment(environment: any): void {

        }

        public parseHud(node: any): UnitHUDData {
            return null;
        }
    }
}