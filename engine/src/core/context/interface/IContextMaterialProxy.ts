module egret3d {
    export interface IContextMaterialProxy {
        viewPort(x: number, y: number, width: number, height: number): void;

        texParameteri(target: number, pname: number, param: number): void;
        upLoadTextureData(mipLevel: number, texture: ITexture): void;
        upLoadCompressedTexture2D(mipLevel: number, texture: ContextTexture2D): void;
        creatTexture(): WebGLTexture;
        uploadCubetexture(tex: ContextTexture3D): void;

        setProgram(program: Program3D): void;

        getUniformLocation(programe3D: Program3D, name: string): any;
        uniform1fv(location: any, v: any): void;
        uniform1i(location: any, x: number): void;
        uniform1iv(location: any, v: Int32Array): void;
        uniform2f(location: any, x: number, y: number): void;
        uniform2fv(location: any, v: any): void;
        uniform2i(location: any, x: number, y: number): void;
        uniform2iv(location: any, v: Int32Array): void;
        uniform3f(location: any, x: number, y: number, z: number): void;
        uniform3fv(location: any, v: any): void;
        uniform3i(location: any, x: number, y: number, z: number): void;
        uniform3iv(location: any, v: Int32Array): void;
        uniform4f(location: any, x: number, y: number, z: number, w: number): void;
        uniform4fv(location: any, v: any): void;
        uniform4i(location: any, x: number, y: number, z: number, w: number): void;
        uniform4iv(location: any, v: Int32Array): void;
        uniformMatrix2fv(location: any, transpose: boolean, value: any): void;
        uniformMatrix3fv(location: any, transpose: boolean, value: any): void;
        uniformMatrix4fv(location: any, transpose: boolean, value: any): void;

        setBlendFactors(src: number, dst: number): void;
        setCulling(mode: number): void;
        depthFunc(compareMode: number): void;

        setTexture2DAt(samplerIndex: number, uniLocation: any, index: number, texture: ContextTexture2D): void;
        setCubeTextureAt(samplerIndex: number, uniLocation: number, index: number, texture: ContextTexture3D): void;
        setFragmentShaderConstData(floats: Float32Array, offest: number, numLen: number): void;
        disableTexture2DAt(samplerIndex: number, uniLocation: number, index: number): void;
    }
}