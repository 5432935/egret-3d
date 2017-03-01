module egret3d {

    /*
    * @private
    */
    export class BloomPost implements IPost{

        public renderQuen: RenderQuen;
        public drawRectangle: Rectangle;
        private postRender: PostRender;
        private _debugHud: HUD = new HUD();

        public bloom_amount: number ;
        constructor(bloom_amount: number = 0.15) {
            this.bloom_amount = bloom_amount; 
            this.postRender = new PostRender("hud_vs", "bloom_fs");
            this.postRender.hud.uniformData["bloom_amount"] = { uniformIndex: -1, type: UniformType.uniform1f, data: [bloom_amount] };
        }

        public setRenderTexture(width: number, height: number,change?:boolean) {
            if (!this.postRender.renderTexture || change){
                this.postRender.setRenderToTexture(width, height, FrameBufferFormat.UNSIGNED_BYTE_RGBA );
            }
        }

        public draw(time: number, delay: number, context3D: Context3DProxy, collect: EntityCollect, camera: Camera3D, backViewPort: Rectangle, posList: any) {
            let self = this;
            self.postRender.camera = camera;
            self.postRender.needClean = true;
            this.postRender.hud.uniformData["bloom_amount"].data[0] = self.bloom_amount ;
            self.postRender.draw(time, delay, context3D, collect,  backViewPort, posList);
            posList["final"] = this.postRender.renderTexture ;
        }
    }
}