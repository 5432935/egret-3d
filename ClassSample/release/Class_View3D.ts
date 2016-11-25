module egret3d {
    export class Class_View3D {

        protected _egret3DCanvas: Egret3DCanvas;
        protected globalTime: number;
        protected infoText: gui.UITextField;
        protected _queueLoad: QueueLoader;
        constructor() {
            this._egret3DCanvas = new Egret3DCanvas();
            this._egret3DCanvas.x = 0; 
            this._egret3DCanvas.y = 0;
            this._egret3DCanvas.width = window.innerWidth; 
            this._egret3DCanvas.height = window.innerHeight; 
            this._egret3DCanvas.start();

            this._queueLoad = new QueueLoader();
            this._queueLoad.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onUiFonts, this);
        }

        protected onUiFonts(view: View3D) {
            this.infoText = new gui.UITextField();
            view.addGUI(this.infoText);
            this.infoText.multiline = true;
            this.infoText.textColor = 0xff0000;
        }
    }
}