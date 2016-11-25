module egret3d {

    /*
    */
    export class Class_Test7Z extends Class_View3D {

        private view1: View3D;
        private cameraCtl: LookAtController;

        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, this._egret3DCanvas.width, this._egret3DCanvas.height);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xff7f7f00;
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this._egret3DCanvas.addView3D(view1);
           

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            //this._queueLoad = new QueueLoader();
            //this._queueLoad.addEventListener( LoaderEvent3D.LOADER_COMPLETE,this.onCpmplete,this);
            //this._queueLoad.load("resource/scene/smallMap/smallMap.7z");

            var load: URLLoader = new URLLoader();
            load.dataformat = URLLoader.DATAFORMAT_BINARY;
            load.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onCpmplete, this);
            load.load("resource/scene/smallMap/MapConfig.zip");
        }


        protected onCpmplete(e: LoaderEvent3D) {

            var a = e.loader.data;
            if (a instanceof ByteArray) {
                nid.LZMAHelper.decode((<ByteArray>a).buffer);
                //nid.LZMAHelper.decodeAsync((<ByteArray>a).buffer,()=>this.lzma());
            }
            a
        }

        private lzma() {
            console.log( "decode complete" );
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}