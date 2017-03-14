module egret3d {
    export interface IContextVertexProxy {
        creatIndexBuffer(indexData: Int16Array): IndexBuffer3D;
        uploadIndexBuffer(indexBuffer3D: IndexBuffer3D): void;
        creatVertexBuffer(vertexData: Float32Array, dawType: number): VertexBuffer3D;
        uploadVertexBuffer(vertexBuffer3D: VertexBuffer3D): void;

        getShaderAttribLocation(programe: Program3D, attribName: string): any;
        vertexAttribPointer(index: number, size: number, dataType: number, normalized: boolean, stride: number, offset: number): void;
        activeAttribPointer(vertexFormat: number, formatLen: number): boolean;
        disAttribPointer(): void;

        setVertexShaderConstData(floats: Float32Array, offest: number, numLen: number): void;

        bindIndexBuffer(indexBuffer: IndexBuffer3D): void;
        bindVertexBuffer(vertexBuffer: VertexBuffer3D): void;
    }
}