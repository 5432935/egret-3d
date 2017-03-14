var egret3d;
(function (egret3d) {
    /**
    * @private
    */
    var TextureMethodType;
    (function (TextureMethodType) {
        TextureMethodType[TextureMethodType["diffuse"] = 0] = "diffuse";
        TextureMethodType[TextureMethodType["normal"] = 1] = "normal";
        TextureMethodType[TextureMethodType["specular"] = 2] = "specular";
        TextureMethodType[TextureMethodType["color"] = 3] = "color";
        TextureMethodType[TextureMethodType["shadow"] = 4] = "shadow";
    })(TextureMethodType = egret3d.TextureMethodType || (egret3d.TextureMethodType = {}));
    /**
    * @private
    */
    var ShaderPhaseType;
    (function (ShaderPhaseType) {
        ShaderPhaseType[ShaderPhaseType["utils_vertex"] = 0] = "utils_vertex";
        ShaderPhaseType[ShaderPhaseType["base_vertex"] = 1] = "base_vertex";
        ShaderPhaseType[ShaderPhaseType["start_vertex"] = 2] = "start_vertex";
        ShaderPhaseType[ShaderPhaseType["local_vertex"] = 3] = "local_vertex";
        ShaderPhaseType[ShaderPhaseType["global_vertex"] = 4] = "global_vertex";
        ShaderPhaseType[ShaderPhaseType["end_vertex"] = 5] = "end_vertex";
        ShaderPhaseType[ShaderPhaseType["utils_fragment"] = 6] = "utils_fragment";
        ShaderPhaseType[ShaderPhaseType["base_fragment"] = 7] = "base_fragment";
        ShaderPhaseType[ShaderPhaseType["start_fragment"] = 8] = "start_fragment";
        ShaderPhaseType[ShaderPhaseType["materialsource_fragment"] = 9] = "materialsource_fragment";
        ShaderPhaseType[ShaderPhaseType["diffuse_fragment"] = 10] = "diffuse_fragment";
        ShaderPhaseType[ShaderPhaseType["normal_fragment"] = 11] = "normal_fragment";
        ShaderPhaseType[ShaderPhaseType["matCap_fragment"] = 12] = "matCap_fragment";
        ShaderPhaseType[ShaderPhaseType["specular_fragment"] = 13] = "specular_fragment";
        ShaderPhaseType[ShaderPhaseType["shadow_fragment"] = 14] = "shadow_fragment";
        ShaderPhaseType[ShaderPhaseType["lighting_fragment"] = 15] = "lighting_fragment";
        ShaderPhaseType[ShaderPhaseType["multi_end_fragment"] = 16] = "multi_end_fragment";
        ShaderPhaseType[ShaderPhaseType["end_fragment"] = 17] = "end_fragment";
    })(ShaderPhaseType = egret3d.ShaderPhaseType || (egret3d.ShaderPhaseType = {}));
})(egret3d || (egret3d = {}));
