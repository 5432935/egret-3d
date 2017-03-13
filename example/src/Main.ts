class Main extends egret.DisplayObject {

    constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.init, this);
    }

    private init(e: egret.Event) {

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
        let demo: View3DSample = new View3DSample();

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
    }

}