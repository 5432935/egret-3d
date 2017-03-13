module egret3d {

    /**
     * @private 
     * @language zh_CN
     * @class egret3d.EUMParser
     * @classdesc
     * 用 EUMParser 类 解析.eum 文件
     */
    export class EUMParser {

        /**
         * @language zh_CN
         * @param datas 加载的二进制流
         * @returns { [key: number]: ByteArray }
         */
        public static parse(datas: ArrayBuffer): { [key: number]: ByteArray } {
            var bytes: ByteArray = new ByteArray(datas);

            var fileFormatBytes: ByteArray = new ByteArray();
            bytes.readBytes(fileFormatBytes, 0, 3);

            //版本号;
            var version: number = bytes.readUnsignedShort();

            if (!EUMVersion.versionDictionary[version]) {
                console.log("egret3d engine not found " + version + " version");
                return null;
            }

            EUMVersion.versionValue = version;
            return EUMVersion.versionDictionary[version](bytes);
        }
    }
}  