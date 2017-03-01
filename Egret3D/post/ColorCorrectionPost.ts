module egret3d {

    /*
    * @private
    */
    export class ColorCorrectionPost implements IPost{

        public renderQuen: RenderQuen;
        public drawRectangle: Rectangle;

        private postRender: PostRender;

        private _lutTexture: Texture;
        constructor( ) {
            this.postRender = new PostRender("hud_vs", "colorCorrection_fs");
            //this.postRender.setRenderToTexture(2048, 2048, FrameBufferFormat.UNSIGNED_BYTE_RGB);
        }

        public setRenderTexture(width: number, height: number) {
            this.postRender.setRenderToTexture(width, height);
        }

        public set lutTexture(tex: Texture) {
            this._lutTexture = tex; 
            this.postRender.hud["lutTexture"] = tex; 
        }

        public get lutTexture(): Texture {
            return this._lutTexture;
        }

        public draw(time: number, delay: number, context3D: Context3DProxy, collect: EntityCollect, camera: Camera3D, backViewPort: Rectangle, posList: any) {
            this.postRender.camera = camera;
            this.postRender.needClean = true;
            this.postRender.draw(time, delay, context3D, collect,  backViewPort, posList);
            posList["final"] = this.postRender.renderTexture ;
        }
    }
}