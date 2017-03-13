module egret3d {

    /**
     * @private 
     * @language zh_CN
     * @class egret3d.ERMVersion
     * @classdesc
     */
    export class E3dPackVersion {
        static versionDictionary: any = {
            1: (bytes: ByteArray, url: string) => E3dPackVersion.parserVersion_1(bytes, url),
        };


        public static parserVersion_1(bytes: ByteArray, url: string): { [key: string]: ByteArray } {

            var data: { [key: string]: ByteArray } = {};

            var name = bytes.readUTF();

            var len = bytes.readUnsignedShort();
            for (var i = 0; i < len; i++) {
                var path = bytes.readUTF();
                var count = bytes.readUnsignedInt();
                var array: ByteArray = new ByteArray();
                bytes.readBytes(array, 0, count);
                data[path] = array;

                var assetPath = url + path;
                assetMgr.addByteArray(assetPath, array, url);
            }
            return data;
        }
    }
} 