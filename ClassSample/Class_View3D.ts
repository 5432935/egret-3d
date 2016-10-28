module egret3d {
    export class Class_View3D {

        protected _egret3DCanvas: Egret3DCanvas;
        private globalTime: number;
        protected infoText: gui.UITextField;
        constructor() {
            this._egret3DCanvas = new Egret3DCanvas();
            this._egret3DCanvas.x = 0; 
            this._egret3DCanvas.y = 0; 
            this._egret3DCanvas.width = window.innerWidth; 
            this._egret3DCanvas.height = window.innerHeight; 
            this._egret3DCanvas.start();
        }

        protected loadFont(view: View3D) {

            view.openGui(() => this.onUiFonts(view));
        }

        protected onUiFonts(view: View3D) {
            this.infoText = new gui.UITextField();
            view.addGUI(this.infoText);
            this.infoText.multiline = true;
            this.infoText.textColor = 0xff0000;
        }
    }
}