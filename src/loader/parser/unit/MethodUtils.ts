module egret3d {

    /*
    * @private
    */
    export class MethodUtils {

        public static doMethod(material: MaterialBase, method: UnitMatMethodData, loader: UnitLoader) {
            var defaultTexture: ITexture = CheckerboardTexture.texture;
            var methodBase: MethodBase = null;
            switch (method.type) {
                case UnitMatMethodData.methodType.lightmapMethod:
                    var lightmapMethod: LightmapMethod = new LightmapMethod(method.usePower);
                    methodBase = lightmapMethod;

                    material.diffusePass.addMethod(lightmapMethod);
                    lightmapMethod.lightTexture = defaultTexture;
                    var textureData: any = method.texturesData[0];
                    loader.addMethodImgTask(textureData.path, lightmapMethod, textureData.attributeName);

                    break;
                case UnitMatMethodData.methodType.uvRollMethod:
                    var uvScrollMethod: UVRollMethod = new UVRollMethod();
                    methodBase = uvScrollMethod;

                    material.diffusePass.addMethod(uvScrollMethod);
                    uvScrollMethod.speedU = method.uSpeed;
                    uvScrollMethod.speedV = method.vSpeed;
                    material.repeat = true;

                    break;
                case UnitMatMethodData.methodType.uvSpriteSheetMethod:
                    var uvSpriteSheetMethod: UVSpriteSheetMethod = new UVSpriteSheetMethod(method.frameNum, method.row, method.col, method.totalTime);
                    methodBase = uvSpriteSheetMethod;

                    material.diffusePass.addMethod(uvSpriteSheetMethod);
                    uvSpriteSheetMethod.isLoop = method.loop;
                    uvSpriteSheetMethod.delayTime = method.delayTime;

                    break;
                case UnitMatMethodData.methodType.mulUvRollMethod: 

                    var uvMethod: MulUVRollMethod = new MulUVRollMethod();
                    methodBase = uvMethod;

                    material.diffusePass.addMethod(uvMethod);

                    uvMethod.diffuseTexture1 = defaultTexture;

                    uvMethod.setSpeedU(0, method.uSpeed);
                    uvMethod.setSpeedV(0, method.vSpeed);

                    var textureData: any = method.texturesData[0];

                    uvMethod.setSpeedU(1, textureData.uSpeed);
                    uvMethod.setSpeedV(1, textureData.vSpeed);

                    loader.addMethodImgTask(textureData.path, uvMethod, textureData.attributeName);

                    material.repeat = true;

                    break;
                case UnitMatMethodData.methodType.alphaMaskMethod:
                    var maskmapMethod: AlphaMaskMethod = new AlphaMaskMethod();
                    methodBase = maskmapMethod;
                    material.diffusePass.addMethod(maskmapMethod);
                    maskmapMethod.maskTexture = defaultTexture;
                    var textureData: any = method.texturesData[0];
                    loader.addMethodImgTask(textureData.path, maskmapMethod, textureData.attributeName);

                    break;
                case UnitMatMethodData.methodType.streamerMethod:

                    var streamerMethod: StreamerMethod = new StreamerMethod();
                    methodBase = streamerMethod;

                    material.diffusePass.addMethod(streamerMethod);
                    streamerMethod.steamerTexture = defaultTexture;
                    var textureData: any = method.texturesData[0];

                    loader.addMethodImgTask(textureData.path, streamerMethod, textureData.attributeName);

                    streamerMethod.speedU = method.uSpeed;
                    streamerMethod.speedV = method.vSpeed;

                    break;
                case UnitMatMethodData.methodType.terrainARGBMethod:
                    var terrainARGBMethod: TerrainARGBMethod = new TerrainARGBMethod(defaultTexture, defaultTexture, defaultTexture, defaultTexture, defaultTexture);
                    methodBase = terrainARGBMethod;

                    material.diffusePass.addMethod(terrainARGBMethod);
                    var textureData: any = null;
                    for (var i: number = 0; i < method.texturesData.length; ++i) {
                        textureData = method.texturesData[i];
                        loader.addMethodImgTask(textureData.path, terrainARGBMethod, textureData.attributeName);
                        if (i != 0) {
                            terrainARGBMethod.setUVTitling(i - 1, Number(textureData.uvTitlingX), Number(textureData.uvTitlingY));
                        }
                    }

                    break;
                case UnitMatMethodData.methodType.waterWaveMethod:
                    var waterWaveMethod: WaterWaveMethod = new WaterWaveMethod();
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

                case UnitMatMethodData.methodType.waterNormalMethod:
                    var waterNormalMethod: WaterNormalMethod = new WaterNormalMethod();
                    methodBase = waterNormalMethod;
                    material.diffusePass.addMethod(waterNormalMethod);
                    waterNormalMethod.normalTextureA = defaultTexture;
                    waterNormalMethod.normalTextureB = defaultTexture;

                    if (method["uScale"] && method["vScale"]) {
                        waterNormalMethod.setUvScale(Number(method["uScale"]), Number(method["vScale"]));
                    }

                    var textureData: any = null;
                    for (var i: number = 0; i < method.texturesData.length; ++i) {
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
        }
    }
}