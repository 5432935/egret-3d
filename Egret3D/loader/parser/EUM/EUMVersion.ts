module egret3d {




    /**
     * @private 
     * @language zh_CN
     * @class egret3d.EUMVersion
     * @classdesc
     */
    export class EUMVersion {
        static versionDictionary: any = {
            1: (bytes: ByteArray) => EUMVersion.parserVersion_1(bytes),
        };
        public static parserVersion_1(bytes: ByteArray): { [key: number]: ByteArray } {

            var source: { [key: number]: ByteArray } = {}

            var len = bytes.readUnsignedInt();

            for (var i = 0; i < len; i++) {
                var id = bytes.readUnsignedInt();
                var arrayLen = bytes.readUnsignedInt();
                var array: ByteArray = new ByteArray();
                bytes.readBytes(array, 0, arrayLen);
                source[id] = array;
            }

            return source;
        }

        public static fillGeometryUv2(id: number, uv2Dict: { [key: number]: ByteArray }, geo: Geometry) {

            if (!uv2Dict || !uv2Dict[id]) {
                return;
            }
            var array: ByteArray = uv2Dict[id];
            array.position = 0;
            var uv2Array: number[] = [];
            var uvCount: number = array.readUnsignedInt();
            for (var i: number = 0; i < uvCount; i++) {
                uv2Array.push(array.readFloat());
                uv2Array.push(array.readFloat());
            }

            var uertexIndex: number = 0;
            var faceCount: number = array.readUnsignedInt();
            for (var i: number = 0; i < faceCount; i++) {

                for (var j: number = 0; j < 3; ++j) {
                    uertexIndex = i * 3 + j;
                    var uv2Index: number = array.readUnsignedShort();
                    var u: number = uv2Array[uv2Index * Geometry.uv2Size + 0];
                    var v: number = uv2Array[uv2Index * Geometry.uv2Size + 1];
                    geo.setVerticesForIndex(uertexIndex, VertexFormat.VF_UV1, [u, v]);
                }
            }
        }
    }
}  