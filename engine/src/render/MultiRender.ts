module egret3d {

    /**
    * @private
    * @class egret3d.MultiRender
    * @classdesc
    * default render
    * 把所有需要渲染的对象，依次进行渲染
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MultiRender extends RenderBase {
        
        /**
        * @language zh_CN
        * constructor
        */
        constructor(pass: number = PassType.diffusePass) {
            super();
            this.pass = pass;

            //this.setRenderToTexture(1024, 1024, FrameBufferFormat.UNSIGNED_BYTE_RGB);
        }


        /**
        * @language zh_CN
        * 把所有需要渲染的对象，依次进行渲染
        * @param time 当前时间
        * @param delay 每帧间隔时间
        * @param context3D 设备上下文
        * @param collect 渲染对象收集器
        * @param camera 渲染时的相机
        */
        public draw(time: number, delay: number, context3D: Context3DProxy, collect: EntityCollect, backViewPort: Rectangle, renderQuen: RenderQuen, posList: any = null) {
            if (this.renderTexture) {
                this.renderTexture.upload(context3D);
                this.renderTexture.useMipmap = false;
                context3D.setRenderToTexture(this.renderTexture.texture2D, true, true, 0);
                this.viewPort.setTo(0, 0, this.renderTexture.texture2D.width, this.renderTexture.texture2D.height);
            } else {
                this.viewPort.copyFrom(backViewPort);
            }

            for (let index = 0, len = collect.renderList.length; index < len; index++) {
                let renderItem: IRender = collect.renderList[index];

                renderItem.geometry.activeState(time, delay, Stage3D.context3DProxy, this.camera);

                for (let i = 0; i < renderItem.geometry.subGeometrys.length; i++) {
                    var subGeometry = renderItem.geometry.subGeometrys[i];
                    var matID = subGeometry.matID;
                    let material: MaterialBase = renderItem.multiMaterial[matID];

                    if (material == null) {
                        continue;
                    }

                    if(material.passes[this._pass] || PassUtil.PassAuto[this._pass]) {
                        if(!material.passes[this._pass]) {
                            material.creatPass(this._pass);
                        }

                        for (let j = material.passes[this._pass].length - 1; j >= 0; j--) {
                            material.passes[this._pass][j].draw(time, delay, context3D, renderItem.modelMatrix, this.camera, subGeometry, renderItem, renderQuen);
                        }
                    }
                }
            }

            if (this.renderTexture) {
                this.viewPort.copyFrom(backViewPort);

                context3D.setRenderToBackBuffer();

                context3D.viewPort(this.viewPort.x, this.viewPort.y, this.viewPort.width, this.viewPort.height);
                context3D.setScissorRectangle(this.viewPort.x, this.viewPort.y, this.viewPort.width, this.viewPort.height);
            }
        }
    }
}

