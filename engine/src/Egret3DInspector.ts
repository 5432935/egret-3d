module egret3d {
    export class Egret3DInspector {

        public updateTime:number;

        private time:number;

        private performancePanel:HTMLElement;

        private collectionPanel:HTMLElement;

        constructor() {
            this.updateTime = 1000;
            this.time = 0;
        }

        show(delay:number, performance:Egret3DPerformance, canvas:Stage3D):void {
            this.time += delay;
            if(this.time < this.updateTime) {
                return;
            }

            this.showPerformancePanel(performance);
            this.showCollectionPanel(canvas);

            this.time = 0;
        }

        private _createPerformancePanel():HTMLElement {
            let panel = document.createElement('div');
            panel.style.position = 'absolute';
            panel.style.background = 'rgba(0,0,0,0.5)';
            panel.style.left = '0px';
            panel.style.top = '0px';
            panel.style.pointerEvents = 'none';
            panel.style.color = 'white';
            document.body.appendChild(panel);
            return panel;
        }

        private _createCollectionPanel():HTMLElement {
            let panel = document.createElement('div');
            panel.style.position = 'absolute';
            panel.style.background = 'rgba(0,0,0,0.5)';
            panel.style.left = '0px';
            panel.style.top = '300px';
            panel.style.pointerEvents = 'none';
            panel.style.color = 'white';
            document.body.appendChild(panel);
            return panel;
        }

        private showPerformancePanel(performance:Egret3DPerformance):void {
            if(!this.performancePanel) {
                this.performancePanel = this._createPerformancePanel();
                performance.enable = true;
            }

            let html = "<span>Performance: </span><br/>";

            let fps = performance.getFps();
            html += "<span>fps: </span>" + (fps || "--") + "<br/>";

            for(let key in performance.entities) {
                if(key === "fps") {
                    continue;
                }
                if(performance.entities[key]) {
                    let entity = performance.entities[key];
                    html += "<span>" + key + ": </span>" + Math.round(entity.averageDelta) + "ms<br/>";
                }
            }

            this.performancePanel.innerHTML = html;
        }

        private showCollectionPanel(canvas:Stage3D):void {
            if(!this.collectionPanel) {
                this.collectionPanel = this._createCollectionPanel();
            }

            let html = "<span>Collection: </span><br/>";

            for(let i = 0, view3Ds = canvas.view3Ds, l = canvas.view3Ds.length; i < l; i++) {
                // collection debug
                let collection = view3Ds[i].entityCollect;

                html += "<span>view" + i + "-drawCall: </span>" + collection.numberDraw.toString() + "<br/>";
                html += "<span>view" + i + "-vertex  : </span>" + collection.numberVertex.toString() + "<br/>";
                html += "<span>view" + i + "-tris    : </span>" + collection.numberFace.toString() + "<br/>";
                html += "<span>view" + i + "-skin    : </span>" + collection.numberSkin.toString() + "<br/>";
                html += "<span>view" + i + "-proAnim : </span>" + collection.numberAnimation.toString() + "<br/>";
                html += "<span>view" + i + "-particleEmiter: </span>" + collection.numberParticle.toString() + "<br/>";

                var len: string;
                for (var j: number = 0; j < Layer.layerType.length; j++) {
                    html += "<span>view" + i + "-" + Layer.layerType[j] + " layer: </span>" + collection.softLayerRenderItems[Layer.layerType[j]].length.toString() + "<br/>";
                }
            }

            this.collectionPanel.innerHTML = html;
        }
    }
}