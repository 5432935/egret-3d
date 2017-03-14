var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /*
    * @private
    */
    var MethodUtils = (function () {
        function MethodUtils() {
        }
        MethodUtils.doMethod = function (material, method, loader) {
            var defaultTexture = egret3d.CheckerboardTexture.texture;
            var methodBase = null;
            switch (method.type) {
                case egret3d.UnitMatMethodData.methodType.lightmapMethod:
                    var lightmapMethod = new egret3d.LightmapMethod(method.usePower);
                    methodBase = lightmapMethod;
                    material.diffusePass.addMethod(lightmapMethod);
                    lightmapMethod.lightTexture = defaultTexture;
                    var textureData = method.texturesData[0];
                    loader.addMethodImgTask(textureData.path, lightmapMethod, textureData.attributeName);
                    break;
                case egret3d.UnitMatMethodData.methodType.uvRollMethod:
                    var uvScrollMethod = new egret3d.UVRollMethod();
                    methodBase = uvScrollMethod;
                    material.diffusePass.addMethod(uvScrollMethod);
                    uvScrollMethod.speedU = method.uSpeed;
                    uvScrollMethod.speedV = method.vSpeed;
                    material.repeat = true;
                    break;
                case egret3d.UnitMatMethodData.methodType.uvSpriteSheetMethod:
                    var uvSpriteSheetMethod = new egret3d.UVSpriteSheetMethod(method.frameNum, method.row, method.col, method.totalTime);
                    methodBase = uvSpriteSheetMethod;
                    material.diffusePass.addMethod(uvSpriteSheetMethod);
                    uvSpriteSheetMethod.isLoop = method.loop;
                    uvSpriteSheetMethod.delayTime = method.delayTime;
                    break;
                case egret3d.UnitMatMethodData.methodType.mulUvRollMethod:
                    var uvMethod = new egret3d.MulUVRollMethod();
                    methodBase = uvMethod;
                    material.diffusePass.addMethod(uvMethod);
                    uvMethod.diffuseTexture1 = defaultTexture;
                    uvMethod.setSpeedU(0, method.uSpeed);
                    uvMethod.setSpeedV(0, method.vSpeed);
                    var textureData = method.texturesData[0];
                    uvMethod.setSpeedU(1, textureData.uSpeed);
                    uvMethod.setSpeedV(1, textureData.vSpeed);
                    loader.addMethodImgTask(textureData.path, uvMethod, textureData.attributeName);
                    material.repeat = true;
                    break;
                case egret3d.UnitMatMethodData.methodType.alphaMaskMethod:
                    var maskmapMethod = new egret3d.AlphaMaskMethod();
                    methodBase = maskmapMethod;
                    material.diffusePass.addMethod(maskmapMethod);
                    maskmapMethod.maskTexture = defaultTexture;
                    var textureData = method.texturesData[0];
                    loader.addMethodImgTask(textureData.path, maskmapMethod, textureData.attributeName);
                    break;
                case egret3d.UnitMatMethodData.methodType.streamerMethod:
                    var streamerMethod = new egret3d.StreamerMethod();
                    methodBase = streamerMethod;
                    material.diffusePass.addMethod(streamerMethod);
                    streamerMethod.steamerTexture = defaultTexture;
                    var textureData = method.texturesData[0];
                    loader.addMethodImgTask(textureData.path, streamerMethod, textureData.attributeName);
                    streamerMethod.speedU = method.uSpeed;
                    streamerMethod.speedV = method.vSpeed;
                    break;
                case egret3d.UnitMatMethodData.methodType.terrainARGBMethod:
                    var terrainARGBMethod = new egret3d.TerrainARGBMethod(defaultTexture, defaultTexture, defaultTexture, defaultTexture, defaultTexture);
                    methodBase = terrainARGBMethod;
                    material.diffusePass.addMethod(terrainARGBMethod);
                    var textureData = null;
                    for (var i = 0; i < method.texturesData.length; ++i) {
                        textureData = method.texturesData[i];
                        loader.addMethodImgTask(textureData.path, terrainARGBMethod, textureData.attributeName);
                        if (i != 0) {
                            terrainARGBMethod.setUVTitling(i - 1, Number(textureData.uvTitlingX), Number(textureData.uvTitlingY));
                        }
                    }
                    break;
                case egret3d.UnitMatMethodData.methodType.waterWaveMethod:
                    var waterWaveMethod = new egret3d.WaterWaveMethod();
                    methodBase = waterWaveMethod;
                    material.diffusePass.addMethod(waterWaveMethod);
                    if (method["deepWaterColor"]) {
                        waterWaveMethod.deepWaterColor = Number(method["deepWaterColor"]);
                    }
                    if (method["shallowWaterColor"]) {
                        waterWaveMethod.shallowWaterColor = Number(method["shallowWaterColor"]);
                    }
                    material.repeat = true;
                    break;
                case egret3d.UnitMatMethodData.methodType.waterNormalMethod:
                    var waterNormalMethod = new egret3d.WaterNormalMethod();
                    methodBase = waterNormalMethod;
                    material.diffusePass.addMethod(waterNormalMethod);
                    waterNormalMethod.normalTextureA = defaultTexture;
                    waterNormalMethod.normalTextureB = defaultTexture;
                    if (method["uScale"] && method["vScale"]) {
                        waterNormalMethod.setUvScale(Number(method["uScale"]), Number(method["vScale"]));
                    }
                    var textureData = null;
                    for (var i = 0; i < method.texturesData.length; ++i) {
                        textureData = method.texturesData[i];
                        waterNormalMethod.setUvSpeed(i, Number(textureData.uSpeed), Number(textureData.vSpeed));
                        loader.addMethodImgTask(textureData.path, waterNormalMethod, textureData.attributeName);
                    }
                    break;
            }
            if (method.play) {
                if (methodBase["start"]) {
                    loader.addAutoAnimation(methodBase);
                }
            }
        };
        return MethodUtils;
    }());
    egret3d.MethodUtils = MethodUtils;
    __reflect(MethodUtils.prototype, "egret3d.MethodUtils");
})(egret3d || (egret3d = {}));
