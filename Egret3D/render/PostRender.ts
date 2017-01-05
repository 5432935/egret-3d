module egret3d {

    /*
    * @private
    */
    export class PostRender extends RenderBase {

        public hud: HUD = new HUD();
        public needClean: boolean = false;
        constructor(vs: string, fs: string) {
            super();
            this.hud.vsShader = vs;
            this.hud.fsShader = fs;
        }

        public setTexture( name:string , texture:Texture ) {
            this.hud[name] = texture ;
        }

        public setRenderToTexture(width: number, height: number, format: FrameBufferFormat = FrameBufferFormat.UNSIGNED_BYTE_RGB) {
            this.renderTexture = new RenderTexture(width, height, format );
        }

        public draw(time: number, delay: number, context3D: Context3DProxy, collect: CollectBase, backViewPort:Rectangle, posList: any) {
            this.numEntity = collect.renderList.length;

            if (this.renderTexture) {
                this.renderTexture.upload(context3D);
                context3D.setRenderToTexture(this.renderTexture.texture2D, this.needClean , true, 0);
            }

            //--------render container--------------
            this.hud.viewPort = this.camera.viewPort;
            this.hud.x = this.camera.viewPort.x;
            this.hud.y = this.camera.viewPort.y;
            this.hud.width = this.camera.viewPort.width;
            this.hud.height = this.camera.viewPort.height;
            this.hud.diffuseTexture = posList["final"];
            this.hud["colorTexture"] = posList["source"];
            this.hud.draw(context3D, this.camera);
            //--------------------------------------

            if (this.renderTexture)
                context3D.setRenderToBackBuffer();

            if (backViewPort) {
                context3D.viewPort(backViewPort.x, backViewPort.y, backViewPort.width, backViewPort.height);
                context3D.setScissorRectangle(backViewPort.x, backViewPort.y, backViewPort.width, backViewPort.height);
            }
        }
    }
}
