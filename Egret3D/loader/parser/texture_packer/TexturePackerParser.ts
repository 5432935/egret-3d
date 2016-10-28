module egret3d {
    /*
    * @private
    */
    export class TexturePackerParser extends IConfigParser{

        public data: any;
        constructor(data: any, type: string, fileType: string) {
            super(fileType);

            switch (type) {
                case "json":
                    this.data = eval("(" + data + ")");
                    break;
            }

            if (this.data.meta && this.data.meta.image) {
                this.taskDict[this.data.meta.image] = 0;
            }
        }
    }
}