var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    */
    var PassType;
    (function (PassType) {
        PassType[PassType["diffusePass"] = 0] = "diffusePass";
        PassType[PassType["colorPass"] = 1] = "colorPass";
        PassType[PassType["normalPass"] = 2] = "normalPass";
        PassType[PassType["shadowPass"] = 3] = "shadowPass";
        PassType[PassType["lightPass"] = 4] = "lightPass";
        PassType[PassType["matCapPass"] = 5] = "matCapPass";
        PassType[PassType["depthPass_8"] = 6] = "depthPass_8";
        PassType[PassType["depthPass_32"] = 7] = "depthPass_32";
        PassType[PassType["CubePass"] = 8] = "CubePass";
        PassType[PassType["Gbuffer"] = 9] = "Gbuffer";
        PassType[PassType["PickPass"] = 10] = "PickPass";
        PassType[PassType["OutLinePass"] = 11] = "OutLinePass";
        PassType[PassType["position"] = 12] = "position";
    })(PassType = egret3d.PassType || (egret3d.PassType = {}));
    /**
    * @private
    */
    var PassUtil = (function () {
        function PassUtil() {
        }
        PassUtil.CreatPass = function (pass, materialData) {
            switch (pass) {
                case PassType.colorPass:
                    materialData.shaderPhaseTypes[PassType.colorPass] = [];
                    return [new egret3d.ColorPass(materialData)];
                case PassType.diffusePass:
                    materialData.shaderPhaseTypes[PassType.diffusePass] = [];
                    return [new egret3d.DiffusePass(materialData)];
                case PassType.shadowPass:
                    materialData.shaderPhaseTypes[PassType.shadowPass] = [];
                    return [new egret3d.ShadowPass(materialData)];
                case PassType.depthPass_8:
                    materialData.shaderPhaseTypes[PassType.depthPass_8] = [];
                    return [new egret3d.PositionPass(materialData)];
                case PassType.normalPass:
                    materialData.shaderPhaseTypes[PassType.normalPass] = [];
                    return [new egret3d.NormalPass(materialData)];
                case PassType.Gbuffer:
                    materialData.shaderPhaseTypes[PassType.Gbuffer] = [];
                    return [new egret3d.GbufferPass(materialData)];
                case PassType.PickPass:
                    materialData.shaderPhaseTypes[PassType.PickPass] = [];
                    return [new egret3d.PickPass(materialData)];
                case PassType.OutLinePass:
                    materialData.shaderPhaseTypes[PassType.OutLinePass] = [];
                    return [new egret3d.OutLinePass()];
            }
            return null;
        };
        return PassUtil;
    }());
    PassUtil.PassAuto = [true, true, true, false, false, true, true, true, true, true, false, true, true];
    egret3d.PassUtil = PassUtil;
    __reflect(PassUtil.prototype, "egret3d.PassUtil");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=PassUtil.js.map