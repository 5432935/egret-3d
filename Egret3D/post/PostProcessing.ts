module egret3d {

    /*
    * @private
    */
    export class SizeUtil {
        private static  MAX_SIZE: number = 2048;

        public isDimensionValid(d: number): boolean {
            return d >= 1 && d <= SizeUtil.MAX_SIZE && this.isPowerOfTwo(d);
        }

        public isPowerOfTwo(value: number): boolean {
            return value ? ((value & -value) == value) : false;
        }

        public getBestPowerOf2(value: number): number {
            var p: number = 1;
            while (p < value)
                p <<= 1;
            if (p > SizeUtil.MAX_SIZE)
                p = SizeUtil.MAX_SIZE;
            return p;
        }
    }

    /*
    * @private
    */
    export var sizeUtil = new SizeUtil();

    /*
    * @private
    */
    export class PostProcessing {
        public postArray: IPost[] ;
        public posTex: any = {} ;
        public finalTexture: ITexture;
        public hud: HUD = new HUD();

        private _renderQuen: RenderQuen;
        private _sizeChange: boolean = false;

        constructor(renderQuen: RenderQuen) {
            this._renderQuen = renderQuen;
            this.postArray = []; 
        }

        public draw(time: number, delay: number, contextProxy: Context3DProxy, collect: CollectBase, camera: Camera3D, backViewPort: Rectangle) {
            let self = this;
            var post: IPost;
            var po;

            if (!self._renderQuen.mainRender.renderTexture) {
                po = camera.maxWidthAndHeight;
                this._renderQuen.mainRender.setRenderToTexture(po.x , po.y , FrameBufferFormat.UNSIGNED_BYTE_RGB);
            }

            self.finalTexture = self.posTex["final"] = self.posTex["source"] = self._renderQuen.mainRender.renderTexture;

            if (self.postArray.length > 2) {
                for (var i: number = 0; i < self.postArray.length - 1; i++) {
                    post = self.postArray[i];
                    post.renderQuen = self._renderQuen;

                    post.setRenderTexture(po.x, po.y);
                    post.draw(time, delay, contextProxy, collect, camera, backViewPort, self.posTex);
                    self.finalTexture = self.posTex["final"];
                }
            }

            post = self.postArray[self.postArray.length - 1];
            post.renderQuen = self._renderQuen;
            post.draw(time, delay, contextProxy, collect, camera, backViewPort, self.posTex);
        }
    }
}