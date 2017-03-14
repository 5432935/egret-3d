module egret3d {
    export interface IContextProxy {

        clear(BUFFER_BIT: number): void;
        clearColor(r: number, g: number, b: number, a: number): void;
        flush(): void;

        createFramebuffer(width: number, height: number, format: FrameBufferFormat, needDepth?: boolean): ContextTexture2D;
        setRenderToTexture(texture: ContextTexture2D, clean: boolean, enableDepthAndStencil: Boolean, surfaceSelector: number): void;
        setRenderToBackBuffer(): void;

        enableDepth(): void;
        disableDepth(): void;

        enableCullFace(): void;
        disableCullFace(): void;

        enableBlend(): void;
        disableBlend(): void;

        setScissorRectangle(x: number, y: number, width: number, height: number): void;

        drawArrays(type: number, first: number, length: number): void;
        drawElement(type: number, offset: number, length: number): void;

    }
}