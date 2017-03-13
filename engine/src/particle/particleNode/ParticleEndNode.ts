module egret3d {

    /**
    * @private
    */
    export class ParticleEndNode extends AnimationNode {

        constructor() {
            super();
            //##FilterBegin## ##Particle##
            this.name = "ParticleEndNode";
            this.importShader(true, ShaderPhaseType.end_vertex, "particle_end_vs");
            this.importShader(false, ShaderPhaseType.end_fragment, "particle_end_fs");
            //##FilterEnd##
        }

        public build(geometry: Geometry, count: number) {
        }
    }
} 