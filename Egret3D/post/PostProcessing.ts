module egret3d {

    /*
    * @private
    */
    export class PostProcessing {
        public postArray: IPost[] ;
        public posTex: any = {} ;
        public finalTexture: ITexture;
        public hud: HUD = new HUD();

        private _renderQuen: RenderQuen;


        public width: number = 2048 ;
        public height: number = 2048;;

        constructor(renderQuen: RenderQuen) {
            this._renderQuen = renderQuen;
            this.postArray = []; 

            this._renderQuen.mainRender.setRenderToTexture(this.width, this.height, FrameBufferFormat.UNSIGNED_BYTE_RGB);
        }

        public draw(time: number, delay: number, contextProxy: Context3DProxy, collect: CollectBase, camera: Camera3D, backViewPort: Rectangle) {
            this.finalTexture = this.posTex["final"] = this.posTex["source"] = this._renderQuen.mainRender.renderTexture ;
            for (var i: number = 0; i < this.postArray.length; i++){
                this.postArray[i].renderQuen = this._renderQuen;
                this.postArray[i].draw(time, delay, contextProxy, collect, camera, backViewPort, this.posTex);
                this.finalTexture = this.posTex["final"];
            }

            contextProxy.viewPort(camera.viewPort.x, camera.viewPort.y, camera.viewPort.width, camera.viewPort.height);
            contextProxy.setScissorRectangle(camera.viewPort.x, camera.viewPort.y, camera.viewPort.width, camera.viewPort.height);

            if (this.finalTexture){
                this.hud.viewPort = camera.viewPort;
                this.hud.x = camera.viewPort.x;
                this.hud.y = camera.viewPort.y;
                this.hud.width = camera.viewPort.width;
                this.hud.height = camera.viewPort.height;
                this.hud.diffuseTexture = this.finalTexture;
                this.hud.draw(contextProxy, camera);
            }
        }
    }
}