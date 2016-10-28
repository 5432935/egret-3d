module egret3d {

    /**
    * @private
    */
    export class ParticleEndNode extends AnimationNode {

        constructor() {
            super();
            //##FilterBegin## ##Particle##
            this.name = "ParticleEndNode";

            this.vertex_ShaderName[ShaderPhaseType.end_vertex] = this.vertex_ShaderName[ShaderPhaseType.end_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.end_vertex].push("particle_end_vs");

            this.fragment_ShaderName[ShaderPhaseType.end_fragment] = this.fragment_ShaderName[ShaderPhaseType.end_fragment] || [];
            this.fragment_ShaderName[ShaderPhaseType.end_fragment].push("particle_end_fs");

            //##FilterEnd##
        }

        public build(geometry: Geometry, count: number) {
        }
    }
} 