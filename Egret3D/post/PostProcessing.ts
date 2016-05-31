﻿module egret3d {
    export class PostProcessing {

        public postItem: IPost[];
        public posTex: any;
        public endTexture: ITexture;

        public postRender: MultiRender;
        constructor() {
            this.postItem = []; 
            this.postRender = new MultiRender(PassType.diffusePass);
            this.postRender.setRenderToTexture(512, 512, FrameBufferFormat.FLOAT_RGBA);
            this.endTexture = this.posTex["end"] = this.postRender.renderTexture ;
        }

        public drawFrameBuffer(time: number, delay: number, context3D: Context3DProxy, collect: CollectBase, camera: Camera3D, backViewPort: Rectangle = null) {
            for (var i: number = 0; i < this.postItem.length; i++){
                this.postItem[i].drawTexture(time, delay, context3D, collect, camera, backViewPort, this.posTex);
                this.endTexture = this.posTex["end"];
            }
        }
    }
}