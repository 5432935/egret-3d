module egret3d {

    /*
    * @private
    */
    export interface IPost{
        renderQuen: RenderQuen;
        drawRectangle: Rectangle ;
        setRenderTexture(width: number, height: number, change?: boolean);
        draw(time: number, delay: number, context3D: Context3DProxy, collect: EntityCollect, camera: Camera3D, backViewPort: Rectangle, posList: any);
    }
}