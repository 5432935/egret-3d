var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    Main.prototype.init = function (e) {
        //----------------------------------------------------------------------
        // Geometry
        //----------------------------------------------------------------------
        //let demo: CubeSample = new CubeSample();
        //let demo: CylinderSample = new CylinderSample();
        //let demo: ElevationSample = new ElevationSample();
        //let demo: OctahedronSphereSample = new OctahedronSphereSample();
        //let demo: PlaneSample = new PlaneSample();
        //let demo: SphereSample = new SphereSample();
        //----------------------------------------------------------------------
        // Material
        //----------------------------------------------------------------------
        //let demo: TextureMaterialSample = new TextureMaterialSample();
        //let demo: ColorMaterialSample = new ColorMaterialSample();
        var demo = new View3DSample();
        //----------------------------------------------------------------------
        // Render
        //----------------------------------------------------------------------
        //let demo: WireframeSample = new WireframeSample();
        //let demo: WireframeDrawSample = new WireframeDrawSample();
        //let demo: SkyboxSample = new SkyboxSample();
        //----------------------------------------------------------------------
        // Post
        //----------------------------------------------------------------------
        //----------------------------------------------------------------------
        // Pick
        //----------------------------------------------------------------------
        //----------------------------------------------------------------------
        // Light
        //----------------------------------------------------------------------
        //let demo: DirectLightSample = new DirectLightSample();
        //let demo: PointLightSample = new PointLightSample();
        //let demo: SpotLightSample = new SpotLightSample();
        //----------------------------------------------------------------------
        // Animation
        //----------------------------------------------------------------------
        //let demo: UVAnim = new UVAnim();
    };
    return Main;
}(egret.DisplayObject));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map