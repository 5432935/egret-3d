module egret3d {

    /*
    * @private
    */
    export class GaussPost implements IPost {

        public renderQuen: RenderQuen;
        public drawRectangle: Rectangle;

        public sourceTexture: Texture;

        private _h_postRender: PostRender;
        private _v_postRender: PostRender;

        private _debugHud: HUD = new HUD();
        constructor() {
            this._h_postRender = new PostRender("hud_vs", "gaussian_H_fs");
            this._h_postRender.setRenderToTexture(2048, 2048, FrameBufferFormat.UNSIGNED_BYTE_RGB);

            this._v_postRender = new PostRender("hud_vs", "gaussian_V_fs");//"gaussian_V_fs");
        }

        public setRenderTexture(width: number, height: number) {
            this._v_postRender.setRenderToTexture(width, height, FrameBufferFormat.UNSIGNED_BYTE_RGB);
        }

        public draw(time: number, delay: number, context3D: Context3DProxy, collect: CollectBase, camera: Camera3D, backViewPort: Rectangle, posList: any) {
            this._h_postRender.camera = camera;
            this._h_postRender.needClean = true;
            this._h_postRender.draw(time, delay, context3D, collect, backViewPort, posList);
            posList["final"] = this._h_postRender.renderTexture;

            this._v_postRender.camera = camera;
            this._v_postRender.needClean = true;
            this._v_postRender.draw(time, delay, context3D, collect, backViewPort, posList); 
            this._v_postRender["color"] = posList["source"];
            posList["final"] = this._v_postRender.renderTexture;

            //posList["bloomPass"] = this._v_postRender.renderTexture;

            //this._debugHud.viewPort = camera.viewPort;
            //this._debugHud.diffuseTexture = this._v_postRender.renderTexture;
            //this._debugHud.draw(context3D);
        }
    }
}