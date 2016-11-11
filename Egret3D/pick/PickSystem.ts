module egret3d {

    /**
    * @private
    * @language zh_CN
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class PickSystem {
        private static _instance: PickSystem;

        /**
        * @language zh_CN
        * 
        * @version Egret 3.0
        * @platform Web,Native
        */
        public pickRender: MultiRender;
        public piexs: Uint8Array;
        /**
        * @language zh_CN
        * 单例
        * @returns PickSystem 实例返回
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static get instance(): PickSystem {
            if (!PickSystem._instance) {
                PickSystem._instance = new PickSystem();
            }
            return PickSystem._instance;
        }

        public enablePick: boolean = false;

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            //this.pickRender = new MultiRender(PassType.PickPass);
            //this.pickRender.setRenderToTexture(512, 512, FrameBufferFormat.UNSIGNED_BYTE_RGBA);
            //this.pickRender.drawOver = (entityCollect: EntityCollect, camera: Camera3D, time: number, delay: number, viewPort: Rectangle) => this.drawOver(entityCollect, camera, time, delay, viewPort);
            //this.piexs = new Uint8Array(this.pickRender.renderTexture.width * this.pickRender.renderTexture.height * 4);
        }

     
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(entityCollect: EntityCollect, camera: Camera3D, time: number, delay: number, viewPort: Rectangle) {

            Egret3DCanvas.context3DProxy.clearColor(1.0, 1.0, 1.0, 1.0);
            Egret3DCanvas.context3DProxy.clear(Context3DProxy.gl.COLOR_BUFFER_BIT | Context3DProxy.gl.DEPTH_BUFFER_BIT);

            //this.pickRender.draw(time, delay, Egret3DCanvas.context3DProxy, entityCollect, camera, viewPort);
        }

        private drawOver(entityCollect: EntityCollect, camera: Camera3D, time: number, delay: number, viewPort: Rectangle) {

            Context3DProxy.gl.readPixels(0, 0, this.pickRender.renderTexture.width, this.pickRender.renderTexture.height, Context3DProxy.gl.RGBA, Context3DProxy.gl.UNSIGNED_BYTE, this.piexs);
            var i: number = 0;
        }

        public getObjectId(x: number, y: number, cavans:Egret3DCanvas, view: View3D): number {

            var vx: number = x - view.x;
            var vy: number = y - view.y;
            vy = view.height - vy; 

            var xx: number = Math.floor(vx / view.width * this.pickRender.renderTexture.width);
            var yy: number = Math.floor(vy / view.height * this.pickRender.renderTexture.height);

            var index: number = yy * this.pickRender.renderTexture.width + xx;
            
            return (this.piexs[index * 4 + 0] << 16) | (this.piexs[index * 4 + 1] << 8) | this.piexs[index * 4 + 2];
        }
    }

    /**
    * @private
    * @language zh_CN
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class EyePick extends EventDispatcher {


        static PICK_PROGRESS: string = "pick_Progress";
        static PICK_SURE: string = "pick_Sure";
        static PICK_CANCLE: string = "pick_cancle";

        public useDelay: number = 1000;

        private _sceneRay: Ray;
        private _selection: any;
        private _select: boolean = false;
        private _selectSure: boolean = false;
        private _count: number = 0;

        private _pickProgressEvent: PickEvent3D = new PickEvent3D("pick_Progress");
        private _pickSureEvent: PickEvent3D = new PickEvent3D("pick_Sure");
        private _pickCancleEvent: PickEvent3D = new PickEvent3D("pick_cancle");

        constructor() {
            super();
            this._sceneRay = new Ray();
        }

        public update(view: View3D, time: number, delay: number) {

            this._sceneRay.CalculateAndTransformRay(view.width, view.height, view.camera3D.modelMatrix, view.camera3D.projectMatrix, view.width * 0.5, view.height * 0.5);
            var pickList: IRender[] = view.entityCollect.specialCastItem[SpecialCast.Pick];

            var bound: Bound;
            var minDis: number = MathUtil.MAX_VALUE;
            if (this._selection)
                minDis = Vector3D.distance(view.camera3D.position, this._selection.position);;
            var dis: number = 0;

            this._select = false;
            for (var i: number = 0; i < pickList.length; i++) {
                bound = pickList[i].bound;
                //bound.visible = false;
                if (this._sceneRay.IntersectMesh(bound.vexData, bound.indexData, bound.vexLength, bound.indexData.length / 3, 0, pickList[i].modelMatrix, pickList[i].pickResult)) {
                    //bound.visible = true;
                    this._select = true;
                    dis = Vector3D.distance(view.camera3D.position, pickList[i].position);
                    if (dis < minDis) {
                        this._count = 0;
                        minDis = dis;
                        if (this._selection){
                            this._pickCancleEvent.pickTarget = this._selection;
                            this.dispatchEvent(this._pickCancleEvent);
                        }
                        this._selection = pickList[i];
                    }
                }
            }

            if (this._select && this._selection) {
                this._count++;
                this._pickProgressEvent.pickTarget = this._selection;
                this._pickProgressEvent.delay = this._count;
                this.dispatchEvent(this._pickProgressEvent);

                if (this._count > this.useDelay && !this._selectSure ) {
                    this._selectSure = true;
                    this._pickSureEvent.pickTarget = this._selection;
                    this.dispatchEvent(this._pickSureEvent);
                }
            } else if (this._selection) {
                this._pickCancleEvent.pickTarget = this._selection;
                this.dispatchEvent(this._pickCancleEvent);

                this._selectSure = false;
                this._selection = null;
                this._select = false;
                this._count = 0;
            }
        }
    }
}