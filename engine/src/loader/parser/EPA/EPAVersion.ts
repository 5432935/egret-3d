module egret3d {

    /**
     * @private 
     * @language zh_CN
     * @class egret3d.EPAVersion
     * @classdesc
     */
    export class EPAVersion {
        static versionDictionary: any = {
            1: (bytes: ByteArray) => EPAVersion.parserVersion_1(bytes),
            2: (bytes: ByteArray) => EPAVersion.parserVersion_2(bytes),
        };

        public static VALUE_TYPE_UINT: number = 0x40000000;

        public static parserVersion_1(bytes: ByteArray): PropertyAnim {

            var propertyAnim: PropertyAnim = new PropertyAnim();

            //属性个数;
            var propertyCount: number = bytes.readUnsignedShort()

            for (var i = 0; i < propertyCount; i++) {

                //属性名称;
                var propertyName: string = bytes.readUTF();

                var keyFrames: AnimCurve[] = [];

                //曲线数量;
                var curveCount: number = bytes.readUnsignedShort();

                for (var j = 0; j < curveCount; j++) {

                    var animCurve: AnimCurve = new AnimCurve();
                    animCurve.type = bytes.readUnsignedInt();

                    if (animCurve.type & EPAVersion.VALUE_TYPE_UINT) {
                        animCurve.frame = bytes.readFloat(); //ms
                        animCurve.frame = Math.floor(animCurve.frame / 16);
                        animCurve.value = bytes.readUnsignedInt();
                        bytes.readFloat();
                        bytes.readUnsignedInt();
                        bytes.readFloat();
                        bytes.readFloat();
                        bytes.readFloat();
                        bytes.readFloat();
                    }
                    else {
                        animCurve.frame = bytes.readFloat(); //ms
                        animCurve.frame = Math.floor(animCurve.frame / 16);
                        animCurve.value = bytes.readFloat();
                        bytes.readFloat();
                        bytes.readFloat();
                        bytes.readFloat();
                        bytes.readFloat();
                        bytes.readFloat();
                        bytes.readFloat();
                    }
                    keyFrames.push(animCurve);
                }

                propertyAnim.addAnimCurve(propertyName, keyFrames);
            }

            return propertyAnim;
        }

        public static parserVersion_2(bytes: ByteArray): PropertyAnim {

            var propertyAnim: PropertyAnim = new PropertyAnim();
            ///总时长
            var time: number = bytes.readFloat();
            //读取采样率;
            var sampling: number = bytes.readUnsignedByte();
            //属性个数;
            var propertyCount: number = bytes.readUnsignedShort();

            for (var i = 0; i < propertyCount; i++) {

                //属性名称;
                var propertyName: string = bytes.readUTF();

                var keyFrames: AnimCurve[] = [];

                //曲线数量;
                var curveCount: number = bytes.readUnsignedShort();

                for (var j = 0; j < curveCount; j++) {

                    var animCurve: AnimCurve = new AnimCurve();
                    animCurve.type = bytes.readUnsignedInt();

                    if (animCurve.type & EPAVersion.VALUE_TYPE_UINT) {
                        animCurve.frame = bytes.readFloat(); //ms
                        animCurve.frame = Math.floor(animCurve.frame / 16);
                        animCurve.value = bytes.readUnsignedInt();
                        bytes.readFloat();
                        bytes.readUnsignedInt();
                        bytes.readFloat();
                        bytes.readFloat();
                        bytes.readFloat();
                        bytes.readFloat();
                    }
                    else {
                        animCurve.frame = bytes.readFloat(); //ms
                        animCurve.frame = Math.floor(animCurve.frame / 16);
                        animCurve.value = bytes.readFloat();
                        bytes.readFloat();
                        bytes.readFloat();
                        bytes.readFloat();
                        bytes.readFloat();
                        bytes.readFloat();
                        bytes.readFloat();
                    }
                    keyFrames.push(animCurve);
                }

                propertyAnim.addAnimCurve(propertyName, keyFrames);
            }

            return propertyAnim;
        }
    }
} 