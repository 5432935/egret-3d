var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var egret3d;
(function (egret3d) {
    var DefaultMaterialDefines = (function (_super) {
        __extends(DefaultMaterialDefines, _super);
        function DefaultMaterialDefines() {
            var _this = _super.call(this) || this;
            _this.DIFFUSE = false;
            _this.AMBIENT = false;
            _this.OPACITY = false;
            _this.OPACITYRGB = false;
            _this.REFLECTION = false;
            _this.EMISSIVE = false;
            _this.SPECULAR = false;
            _this.BUMP = false;
            _this.PARALLAX = false;
            _this.PARALLAXOCCLUSION = false;
            _this.SPECULAROVERALPHA = false;
            _this.CLIPPLANE = false;
            _this.ALPHATEST = false;
            _this.ALPHAFROMDIFFUSE = false;
            _this.POINTSIZE = false;
            _this.FOG = false;
            _this.SPECULARTERM = false;
            _this.DIFFUSEFRESNEL = false;
            _this.OPACITYFRESNEL = false;
            _this.REFLECTIONFRESNEL = false;
            _this.REFRACTIONFRESNEL = false;
            _this.EMISSIVEFRESNEL = false;
            _this.FRESNEL = false;
            _this.NORMAL = false;
            _this.UV1 = false;
            _this.UV2 = false;
            _this.VERTEXCOLOR = false;
            _this.VERTEXALPHA = false;
            _this.NUM_BONE_INFLUENCERS = 0;
            _this.BonesPerMesh = 0;
            _this.INSTANCES = false;
            _this.GLOSSINESS = false;
            _this.ROUGHNESS = false;
            _this.EMISSIVEASILLUMINATION = false;
            _this.LINKEMISSIVEWITHDIFFUSE = false;
            _this.REFLECTIONFRESNELFROMSPECULAR = false;
            _this.LIGHTMAP = false;
            _this.USELIGHTMAPASSHADOWMAP = false;
            _this.REFLECTIONMAP_3D = false;
            _this.REFLECTIONMAP_SPHERICAL = false;
            _this.REFLECTIONMAP_PLANAR = false;
            _this.REFLECTIONMAP_CUBIC = false;
            _this.REFLECTIONMAP_PROJECTION = false;
            _this.REFLECTIONMAP_SKYBOX = false;
            _this.REFLECTIONMAP_EXPLICIT = false;
            _this.REFLECTIONMAP_EQUIRECTANGULAR = false;
            _this.REFLECTIONMAP_EQUIRECTANGULAR_FIXED = false;
            _this.INVERTCUBICMAP = false;
            _this.LOGARITHMICDEPTH = false;
            _this.REFRACTION = false;
            _this.REFRACTIONMAP_3D = false;
            _this.REFLECTIONOVERALPHA = false;
            _this.INVERTNORMALMAPX = false;
            _this.INVERTNORMALMAPY = false;
            _this.SHADOWFULLFLOAT = false;
            _this.CAMERACOLORGRADING = false;
            _this.CAMERACOLORCURVES = false;
            _this._keys = ["DIFFUSE", "AMBIENT", "OPACITY", "OPACITYRGB", "REFLECTION",
                "EMISSIVE", "SPECULAR", "BUMP", "PARALLAX", "PARALLAXOCCLUSION",
                "SPECULAROVERALPHA", "CLIPPLANE", "ALPHATEST", "ALPHAFROMDIFFUSE", "POINTSIZE",
                "FOG", "SPECULARTERM", "DIFFUSEFRESNEL", "OPACITYFRESNEL", "REFLECTIONFRESNEL",
                "REFRACTIONFRESNEL", "EMISSIVEFRESNEL", "FRESNEL", "NORMAL", "UV1",
                "UV2", "VERTEXCOLOR", "VERTEXALPHA", "NUM_BONE_INFLUENCERS", "BonesPerMesh",
                "INSTANCES", "GLOSSINESS", "ROUGHNESS", "EMISSIVEASILLUMINATION", "LINKEMISSIVEWITHDIFFUSE",
                "REFLECTIONFRESNELFROMSPECULAR", "LIGHTMAP", "USELIGHTMAPASSHADOWMAP", "REFLECTIONMAP_3D", "REFLECTIONMAP_SPHERICAL",
                "REFLECTIONMAP_PLANAR", "REFLECTIONMAP_CUBIC", "REFLECTIONMAP_PROJECTION", "REFLECTIONMAP_SKYBOX", "REFLECTIONMAP_EXPLICIT",
                "REFLECTIONMAP_EQUIRECTANGULAR", "REFLECTIONMAP_EQUIRECTANGULAR_FIXED", "INVERTCUBICMAP", "LOGARITHMICDEPTH", "REFRACTION",
                "REFRACTIONMAP_3D", "REFLECTIONOVERALPHA", "INVERTNORMALMAPX", "INVERTNORMALMAPY", "SHADOWFULLFLOAT",
                "CAMERACOLORGRADING", "CAMERACOLORCURVES"];
            return _this;
        }
        return DefaultMaterialDefines;
    }(egret3d.BaseMaterialDefines));
    egret3d.DefaultMaterialDefines = DefaultMaterialDefines;
    __reflect(DefaultMaterialDefines.prototype, "egret3d.DefaultMaterialDefines");
})(egret3d || (egret3d = {}));
