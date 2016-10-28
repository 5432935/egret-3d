module egret3d {

    /*
    * @private
    */
    export class BloomPost implements IPost{

        public renderQuen: RenderQuen;
        public drawRectangle: Rectangle;

        private postRender: PostRender;
        private gaussPass: GaussPost;

        private _debugHud: HUD = new HUD();
        constructor() {
            this.postRender = new PostRender("hud_vs", "bloom_fs");
            this.postRender.setRenderToTexture(2048, 2048, FrameBufferFormat.UNSIGNED_BYTE_RGB);

            this.gaussPass = new GaussPost();

            this._debugHud.fsShader = "hud_H_fs";
            this._debugHud.x = 512+256;
            this._debugHud.y = 0;
            this._debugHud.width = 128;
            this._debugHud.height = 128;
        }

        public draw(time: number, delay: number, context3D: Context3DProxy, collect: CollectBase, camera: Camera3D, backViewPort: Rectangle, posList: any) {
            //this._debugHud.viewPort = camera.viewPort;
            //this._debugHud.diffuseTexture = posList["colorTexture"];
            //this._debugHud.draw(context3D);

            this.postRender.camera = camera;
            this.postRender.needClean = true;
            this.postRender.draw(time, delay, context3D, collect,  backViewPort, posList);
            posList["final"] = this.postRender.renderTexture ;

            this.gaussPass.draw( time, delay , context3D , collect , camera , backViewPort , posList );
        }
    }
}