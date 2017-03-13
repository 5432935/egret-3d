module egret3d {
    export class ShaderCache {
        private static programlib: HashMap = new HashMap();

        public static addProgram(program: Program3D): void {
            ShaderCache.programlib.add(program.name, program);
        }

        public static removeProgram(_name: string): void {
            let program: Program3D = ShaderCache.getProgram( _name );
            program.dispose();
            ShaderCache.programlib.remove(_name);
        }

        public static getProgram(_name: string): Program3D {
            return ShaderCache.programlib.getValue(_name);
        }
    }
}