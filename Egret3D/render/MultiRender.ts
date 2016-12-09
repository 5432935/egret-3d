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
              
        private _renderItem: IRender; 

        private _i: number = 0;
        private _j: number = 0;


        public drawOver: Function;

        protected currentViewPort: Rectangle = new Rectangle();
        /**
        * @language zh_CN
        * constructor
        */
        constructor( pass:number = PassType.diffusePass ) {
            super();
            this.pass = pass; 
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
        public draw(time: number, delay: number, context3D: Context3DProxy, collect: CollectBase, backViewPort: Rectangle, renderQuen: RenderQuen, posList: any = null) {
            this.numEntity = collect.renderList.length;

            this.viewPort = backViewPort;


            if (this.renderTexture) {
                this.renderTexture.upload(context3D);
                context3D.setRenderToTexture(this.renderTexture.texture2D, true, true, 0);
                this.currentViewPort.x = 0;
                this.currentViewPort.y = 0;
                this.currentViewPort.width = this.renderTexture.texture2D.width;
                this.currentViewPort.height = this.renderTexture.texture2D.height;
                this.viewPort = this.currentViewPort;
            }

            var material: MaterialBase;
            for (this._renderIndex = 0; this._renderIndex < this.numEntity; this._renderIndex++) {
                this._renderItem = collect.renderList[this._renderIndex];

                this._renderItem.geometry.activeState(time, delay, Egret3DCanvas.context3DProxy, this.camera);
                for (this._i = 0; this._i < this._renderItem.geometry.subGeometrys.length; this._i++) {
                    var subGeometry = this._renderItem.geometry.subGeometrys[this._i];
                    var matID = subGeometry.matID;
                    material = this._renderItem.multiMaterial[matID] ;
                    if (material == null)
                        continue;

                    if (material.passes[this._pass]) {
                        for (this._j = material.passes[this._pass].length - 1; this._j >=0 ; this._j--){
                            material.passes[this._pass][this._j].draw(time, delay, context3D, this._renderItem.modelMatrix, this.camera, subGeometry, this._renderItem, renderQuen);
                        }
                    } else if (PassUtil.PassAuto[this._pass]) {
                        //// 补充新的需要的渲染pass
                        if (!material.passes[this._pass]) {
                            material.creatPass(this._pass);
                        }

                        for (this._j = material.passes[this._pass].length - 1; this._j >= 0; this._j--) {
                            material.passes[this._pass] = PassUtil.CreatPass(this._pass, material.materialData);
                            material.passes[this._pass][this._j].draw(time, delay, context3D, this._renderItem.modelMatrix, this.camera, subGeometry, this._renderItem, renderQuen);
                        }
                    }

                    material = null;
                }
            }

            if (this.drawOver) {
                this.drawOver(collect, this.camera, time, delay, this.viewPort );
            }

            if (this.renderTexture) {
                this.viewPort = backViewPort;

                context3D.setRenderToBackBuffer();
                if (this.viewPort) {
                    context3D.viewPort(this.viewPort.x, this.viewPort.y, this.viewPort.width, this.viewPort.height);
                    context3D.setScissorRectangle(this.viewPort.x, this.viewPort.y, this.viewPort.width, this.viewPort.height);
                }
            }

            this._renderItem = null;
        }
    }
} 

