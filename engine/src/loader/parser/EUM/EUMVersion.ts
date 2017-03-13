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
            2: (bytes: ByteArray) => EUMVersion.parserVersion_2(bytes),
        };
        static versionValue: number;
        private static parserVersion_1(bytes: ByteArray): { [key: number]: ByteArray } {

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
        private static parserVersion_2(bytes: ByteArray): { [key: number]: ByteArray } {
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
            switch (EUMVersion.versionValue) {
                case 1:
                    return EUMVersion.fillGeometryUv2_1(id, uv2Dict, geo);
                case 2:
                    return EUMVersion.fillGeometryUv2_2(id, uv2Dict, geo);
                default:
                    return null;
            }
        }
        private static fillGeometryUv2_1(id: number, uv2Dict: { [key: number]: ByteArray }, geo: Geometry) {

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
        private static fillGeometryUv2_2(id: number, uv2Dict: { [key: number]: ByteArray }, geo: Geometry) {


            if (!uv2Dict || !uv2Dict[id]) {
                return;
            }

            var array: ByteArray = uv2Dict[id];
            array.position = 0;


            var x = array.readFloat();
            var y = array.readFloat();
            var z = array.readFloat();
            var w = array.readFloat();


            
            var uertexIndex: number = 0;
            var faceCount: number = geo.faceCount;
            for (var i: number = 0; i < faceCount; i++) {

                for (var j: number = 0; j < 3; ++j) {
                    uertexIndex = i * 3 + j;
                    var uv1 = geo.getVertexForIndex(uertexIndex, VertexFormat.VF_UV1);
                    var u: number = uv1[0] * x + z;
                    var v: number = 1 - (uv1[1] * y + w);
                    geo.setVerticesForIndex(uertexIndex, VertexFormat.VF_UV1, [u, v]);
                }
            }
        }
    }
}  