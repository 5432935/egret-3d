module egret3d {
    export class ShaderCache {
        private static programlib: HashMap = new HashMap();
        private static vsShaderHashMap: HashMap = new HashMap();
        private static fsShaderHashMap: HashMap = new HashMap();

        public static addShader(shader: Shader): void {
            if (shader.type == ShaderType.VertexShader) {
                ShaderCache.vsShaderHashMap.add(shader.name, shader);
            } else {
                ShaderCache.fsShaderHashMap.add(shader.name, shader);
            }
        }

        public static removeShader(_name: string, _type: number): void {
            if (_type == ShaderType.VertexShader) {
                ShaderCache.vsShaderHashMap.remove(_name)
            } else {
                ShaderCache.fsShaderHashMap.remove(_name)
            }
        }

        public static getShader(_name: string, _type: number): Shader {
            if (_type == ShaderType.VertexShader) {
                return ShaderCache.vsShaderHashMap.getValue(_name);
            } else {
                return ShaderCache.fsShaderHashMap.getValue(_name)
            }
        }

        public static addProgram(program: Program3D): void {
            ShaderCache.programlib.add(program.name, program);
        }

        public static removeProgram(_name: string): void {
            ShaderCache.programlib.remove(_name);
        }

        public static getProgram(_name: string): Program3D {
            return ShaderCache.programlib.getValue(_name);
        }
    }
}