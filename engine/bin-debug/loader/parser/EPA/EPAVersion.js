var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @private
     * @language zh_CN
     * @class egret3d.EPAVersion
     * @classdesc
     */
    var EPAVersion = (function () {
        function EPAVersion() {
        }
        EPAVersion.parserVersion_1 = function (bytes) {
            var propertyAnim = new egret3d.PropertyAnim();
            //属性个数;
            var propertyCount = bytes.readUnsignedShort();
            for (var i = 0; i < propertyCount; i++) {
                //属性名称;
                var propertyName = bytes.readUTF();
                var keyFrames = [];
                //曲线数量;
                var curveCount = bytes.readUnsignedShort();
                for (var j = 0; j < curveCount; j++) {
                    var animCurve = new egret3d.AnimCurve();
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
        };
        EPAVersion.parserVersion_2 = function (bytes) {
            var propertyAnim = new egret3d.PropertyAnim();
            ///总时长
            var time = bytes.readFloat();
            //读取采样率;
            var sampling = bytes.readUnsignedByte();
            //属性个数;
            var propertyCount = bytes.readUnsignedShort();
            for (var i = 0; i < propertyCount; i++) {
                //属性名称;
                var propertyName = bytes.readUTF();
                var keyFrames = [];
                //曲线数量;
                var curveCount = bytes.readUnsignedShort();
                for (var j = 0; j < curveCount; j++) {
                    var animCurve = new egret3d.AnimCurve();
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
        };
        return EPAVersion;
    }());
    EPAVersion.versionDictionary = {
        1: function (bytes) { return EPAVersion.parserVersion_1(bytes); },
        2: function (bytes) { return EPAVersion.parserVersion_2(bytes); },
    };
    EPAVersion.VALUE_TYPE_UINT = 0x40000000;
    egret3d.EPAVersion = EPAVersion;
    __reflect(EPAVersion.prototype, "egret3d.EPAVersion");
})(egret3d || (egret3d = {}));
