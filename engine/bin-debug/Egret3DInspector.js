var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var Egret3DInspector = (function () {
        function Egret3DInspector() {
            this.updateTime = 1000;
            this.time = 0;
        }
        Egret3DInspector.prototype.show = function (delay, performance, canvas) {
            this.time += delay;
            if (this.time < this.updateTime) {
                return;
            }
            this.showPerformancePanel(performance);
            this.showCollectionPanel(canvas);
            this.time = 0;
        };
        Egret3DInspector.prototype._createPerformancePanel = function () {
            var panel = document.createElement('div');
            panel.style.position = 'absolute';
            panel.style.background = 'rgba(0,0,0,0.5)';
            panel.style.left = '0px';
            panel.style.top = '0px';
            panel.style.pointerEvents = 'none';
            panel.style.color = 'white';
            document.body.appendChild(panel);
            return panel;
        };
        Egret3DInspector.prototype._createCollectionPanel = function () {
            var panel = document.createElement('div');
            panel.style.position = 'absolute';
            panel.style.background = 'rgba(0,0,0,0.5)';
            panel.style.left = '0px';
            panel.style.top = '300px';
            panel.style.pointerEvents = 'none';
            panel.style.color = 'white';
            document.body.appendChild(panel);
            return panel;
        };
        Egret3DInspector.prototype.showPerformancePanel = function (performance) {
            if (!this.performancePanel) {
                this.performancePanel = this._createPerformancePanel();
                performance.enable = true;
            }
            var html = "<span>Performance: </span><br/>";
            var fps = performance.getFps();
            html += "<span>fps: </span>" + (fps || "--") + "<br/>";
            for (var key in performance.entities) {
                if (key === "fps") {
                    continue;
                }
                if (performance.entities[key]) {
                    var entity = performance.entities[key];
                    html += "<span>" + key + ": </span>" + Math.round(entity.averageDelta) + "ms<br/>";
                }
            }
            this.performancePanel.innerHTML = html;
        };
        Egret3DInspector.prototype.showCollectionPanel = function (canvas) {
            if (!this.collectionPanel) {
                this.collectionPanel = this._createCollectionPanel();
            }
            var html = "<span>Collection: </span><br/>";
            for (var i = 0, view3Ds = canvas.view3Ds, l = canvas.view3Ds.length; i < l; i++) {
                // collection debug
                var collection = view3Ds[i].entityCollect;
                html += "<span>view" + i + "-drawCall: </span>" + collection.numberDraw.toString() + "<br/>";
                html += "<span>view" + i + "-vertex  : </span>" + collection.numberVertex.toString() + "<br/>";
                html += "<span>view" + i + "-tris    : </span>" + collection.numberFace.toString() + "<br/>";
                html += "<span>view" + i + "-skin    : </span>" + collection.numberSkin.toString() + "<br/>";
                html += "<span>view" + i + "-proAnim : </span>" + collection.numberAnimation.toString() + "<br/>";
                html += "<span>view" + i + "-particleEmiter: </span>" + collection.numberParticle.toString() + "<br/>";
                var len;
                for (var j = 0; j < egret3d.Layer.layerType.length; j++) {
                    html += "<span>view" + i + "-" + egret3d.Layer.layerType[j] + " layer: </span>" + collection.softLayerRenderItems[egret3d.Layer.layerType[j]].length.toString() + "<br/>";
                }
            }
            this.collectionPanel.innerHTML = html;
        };
        return Egret3DInspector;
    }());
    egret3d.Egret3DInspector = Egret3DInspector;
    __reflect(Egret3DInspector.prototype, "egret3d.Egret3DInspector");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Egret3DInspector.js.map