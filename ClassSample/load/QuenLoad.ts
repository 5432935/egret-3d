module egret3d {
    export class QuenLoad extends EventDispatcher {
        static QUENLOAD_COMPLETE: string = "LOADER_COMPLETE"; 
        static QUENLOAD_PROGRESS: string = "LOADER_PROGRESS"; 

        private _loadList: URLLoader[];
        private _loadHasmap: { [url: string]: URLLoader }
        private _textures: { [name: string]: Texture };
        private _geometrys: { [name: string]: Geometry };
        private _string: {[name:string]:string};

        private _loadCount: number = 0; 
        private _total: number = 1;
        private _loaded: number = 0;

        constructor() {
            super();
            this._loadHasmap = {};
            this._textures = {}; 
            this._geometrys = {}; 
            this._loadList = []; 
            this._string = {}; 
        }

        public addLoaderQuen(url: string) {
            if (this._loadHasmap[url]) return;

            var load: URLLoader = assetMgr.loadAsset(url, this.loadComplete, this);
            load.addEventListener(LoaderEvent3D.LOADER_PROGRESS,  this.loadProgressComplete , this );
            this._loadHasmap[url] = load; 
            this._loadList.push(load);
        }

        public getTexture(url: string): ITexture {
            return this._textures[url];
        }

        public getModel(url: string): Geometry {
            return this._geometrys[url];
        }

        public getString(url: string): string {
            return this._string[url];
        }

        private loadProgressComplete(e: LoaderEvent3D) {
            var e: LoaderEvent3D = new LoaderEvent3D(QuenLoad.QUENLOAD_PROGRESS);
            this.dispatchEvent(e);

            this.checlAllProgress();
        }

        private loadComplete(e: LoaderEvent3D) {
            if (e.loader.data instanceof ITexture) {
                this._textures[e.loader.url] = <ITexture>e.loader.data;
            } else if (e.loader.data instanceof Geometry) {
                this._geometrys[e.loader.url] = <Geometry>e.loader.data;
            } else if (<string>e.loader.data) {
                this._string[e.loader.url] = e.loader.data;
            }
            this.checkAllComplete();
        }

        private checlAllProgress() {
            var bytesLoaded: number = 0 ; 
            var bytesTotal: number = 0; 

            this._loaded = 0;

            var pice = (1.0 / this._loadList.length); 

            for (var url in this._loadHasmap) {
                bytesLoaded += this._loadHasmap[url].bytesLoaded;
                bytesTotal += this._loadHasmap[url].bytesTotal;
               
                this._loaded += pice * (isNaN(this._loadHasmap[url].bytesLoaded / this._loadHasmap[url].bytesTotal) ? 0 : (this._loadHasmap[url].bytesLoaded / this._loadHasmap[url].bytesTotal));
            }

            console.log("preload : ", this._loaded * 100.0 + "%" );
        }

        private checkAllComplete() {
            this._loadCount++;
            if (this._loadCount == this._loadList.length) {
                this.dispatchEvent(new LoaderEvent3D(QuenLoad.QUENLOAD_COMPLETE) );
            }
        }
    }
}