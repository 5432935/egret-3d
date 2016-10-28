module egret3d {
    /**
     * @private 
     * @language zh_CN
     * @class egret3d.ParticleParser
     * @classdesc
     * 用 ParticleParser 解析粒子文件
     */
    export class ParticleParser extends IConfigParser {

        constructor(data: any, type: string, fileType:string = IConfigParser.TYPE_PARTICLE) {
            super(fileType);
            switch (type) {
                case "xml":
                    this.data = this.parseXml(data);
                    break;
                case "json":
                    this.data = this.parseJson(data);
                    break;
            }

            if (this.data.shape.meshFile) {
                this.taskDict[this.data.shape.meshFile] = 0;
            }

            if (this.data.property.meshFile) {
                this.taskDict[this.data.property.meshFile] = 0;
            }
        }
        public data: ParticleData;
        /**
         * @language zh_CN
         * @param xml 粒子特效的数据解析
         * @returns ParticleData
         */

        public parseJson(text:string): ParticleData {
            this.data = new ParticleData();
           
            var parser: ParticleJsonParser = new ParticleJsonParser();
            parser.parse(eval("(" + text + ")"), this.data);
            this.version = Number(parser.version);

            this.data.validate();
            return this.data;
        }

        public parseXml(text:string): ParticleData {
            this.data = new ParticleData();

            var parser: ParticleXmlParser = new ParticleXmlParser();
            parser.parse(XMLParser.parse(text), this.data);
            this.version = Number(parser.version);

            this.data.validate();
            return this.data;
        }
      

    }

}