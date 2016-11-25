module egret3d {

    /**
     * @private 
     * @language zh_CN
     * @class egret3d.ERMParser
     * @classdesc
     * 用 EPMParser 类 解析.erm 文件
     */
    export class E3dPackParser {

        /**
         * @language zh_CN
         * @param datas 加载的二进制流
         * @returns PropertyAnim
         */
        public static parse(datas: ArrayBuffer, url: string): { [key: string]: ByteArray } {
            var bytes: ByteArray = new ByteArray(datas);


            var iscompress = bytes.readByte();

            if (iscompress == 1) {
                var len = bytes.readInt();
                var context: ByteArray = new ByteArray();

                bytes.readBytes(context, 0, len);
                context.uncompress();
                bytes = context;
            }



            var fileFormatBytes: ByteArray = new ByteArray();
            bytes.readBytes(fileFormatBytes, 0, 7);


            //版本号;
            var version: number = bytes.readUnsignedShort();

            if (!E3dPackVersion.versionDictionary[version]) {
                console.log("egret3d engine not found " + version + " version");
                return null;
            }

            var path = url.replace(".e3dPack", "/");


            return E3dPackVersion.versionDictionary[version](bytes, path);
        }
    }
} 