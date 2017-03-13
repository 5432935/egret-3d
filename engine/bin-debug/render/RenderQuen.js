var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /*
    * @private
    */
    var RenderQuen = (function () {
        function RenderQuen() {
            this.renderDictionary = [];
            this.renderArray = [];
            var defaultRender = new egret3d.MultiRender(egret3d.PassType.diffusePass);
            this.setMainRender(defaultRender);
        }
        RenderQuen.prototype.setMainRender = function (render) {
            this.mainRender = render;
        };
        RenderQuen.prototype.addRender = function (render, index) {
            if (index === void 0) { index = -1; }
            var index = this.renderArray.indexOf(render);
            this.renderDictionary[render.name] = render;
            if (index == -1) {
                if (index == -1) {
                    this.renderArray.push(render);
                }
                else {
                    this.renderArray.splice(index, -1, render);
                }
            }
        };
        RenderQuen.prototype.removeRender = function (render) {
            var index = this.renderArray.indexOf(render);
            if (this.renderDictionary[render.name])
                delete this.renderDictionary[render.name];
            if (index != -1) {
                this.renderArray.splice(index, 1, render);
            }
        };
        RenderQuen.prototype.draw = function (time, delay, context3D, collect, backViewPort, posList) {
            if (posList === void 0) { posList = null; }
            var i;
            for (i = 0; i < this.renderArray.length; i++) {
                if (this.renderArray[i].enabled) {
                    this.renderArray[i].draw(time, delay, context3D, collect, backViewPort, this, posList);
                }
            }
            if (this.mainRender) {
                this.mainRender.draw(time, delay, context3D, collect, backViewPort, this, posList);
            }
        };
        return RenderQuen;
    }());
    egret3d.RenderQuen = RenderQuen;
    __reflect(RenderQuen.prototype, "egret3d.RenderQuen");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=RenderQuen.js.map