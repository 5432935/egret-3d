module egret3d {
    export class Material implements IMaterial {

        protected _defines: IMaterialDefines;
        protected _vShaderName: string = "";
        protected _fShaderName: string = "";
        protected _programName: string = "";

        protected createProgram(): void {
            this._programName = ShaderGenerator.createProgram(this._defines, this._vShaderName, this._fShaderName);
        }

        protected upload(): void {
 
        }

        public draw(): void {

        }

        public dispose(): void {

        }
    }
}