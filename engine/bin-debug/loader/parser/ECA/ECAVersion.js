var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @private
     * @language zh_CN
     * @class egret3d.ECAVersion
     * @classdesc
     */
    var ECAVersion = (function () {
        function ECAVersion() {
        }
        ECAVersion.parserVersion_1 = function (bytes) {
            var cameraAnimationController = new egret3d.CameraAnimationController();
            var nFrame = bytes.readUnsignedInt();
            var cameraAnimationFrame = null;
            var scaling = new egret3d.Vector3(1, 1, 1, 1);
            while (nFrame--) {
                cameraAnimationFrame = new egret3d.CameraAnimationFrame();
                cameraAnimationFrame.time = bytes.readInt();
                cameraAnimationFrame.fov = bytes.readFloat();
                cameraAnimationFrame.rotation = new egret3d.Vector3(bytes.readFloat() * egret3d.MathUtil.RADIANS_TO_DEGREES + 90, bytes.readFloat() * egret3d.MathUtil.RADIANS_TO_DEGREES, bytes.readFloat() * egret3d.MathUtil.RADIANS_TO_DEGREES);
                cameraAnimationFrame.translation = new egret3d.Vector3(bytes.readFloat(), bytes.readFloat(), bytes.readFloat());
                cameraAnimationFrame.matrix = new egret3d.Matrix4();
                cameraAnimationFrame.matrix.recompose([cameraAnimationFrame.translation, cameraAnimationFrame.rotation, scaling]);
                cameraAnimationController.cameraAnimationFrames.push(cameraAnimationFrame);
            }
            return cameraAnimationController;
        };
        return ECAVersion;
    }());
    ECAVersion.versionDictionary = {
        1: function (bytes) { return ECAVersion.parserVersion_1(bytes); },
    };
    egret3d.ECAVersion = ECAVersion;
    __reflect(ECAVersion.prototype, "egret3d.ECAVersion");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ECAVersion.js.map