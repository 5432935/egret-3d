var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @class egret3d.MultiRender
    * @classdesc
    * default render
    * 把所有需要渲染的对象，依次进行渲染
    * @version Egret 3.0
    * @platform Web,Native
    */
    var MultiRender = (function (_super) {
        __extends(MultiRender, _super);
        /**
        * @language zh_CN
        * constructor
        */
        function MultiRender(pass) {
            if (pass === void 0) { pass = egret3d.PassType.diffusePass; }
            var _this = _super.call(this) || this;
            _this.pass = pass;
            return _this;
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
        MultiRender.prototype.draw = function (time, delay, context3D, collect, backViewPort, renderQuen, posList) {
            if (posList === void 0) { posList = null; }
            if (this.renderTexture) {
                this.renderTexture.upload(context3D);
                this.renderTexture.useMipmap = false;
                context3D.setRenderToTexture(this.renderTexture.texture2D, true, true, 0);
                this.viewPort.setTo(0, 0, this.renderTexture.texture2D.width, this.renderTexture.texture2D.height);
            }
            else {
                this.viewPort.copyFrom(backViewPort);
            }
            for (var index = 0, len = collect.renderList.length; index < len; index++) {
                var renderItem = collect.renderList[index];
                renderItem.geometry.activeState(time, delay, egret3d.Stage3D.context3DProxy, this.camera);
                for (var i = 0; i < renderItem.geometry.subGeometrys.length; i++) {
                    var subGeometry = renderItem.geometry.subGeometrys[i];
                    var matID = subGeometry.matID;
                    var material = renderItem.multiMaterial[matID];
                    if (material == null) {
                        continue;
                    }
                    if (material.passes[this._pass] || egret3d.PassUtil.PassAuto[this._pass]) {
                        if (!material.passes[this._pass]) {
                            material.creatPass(this._pass);
                        }
                        for (var j = material.passes[this._pass].length - 1; j >= 0; j--) {
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
        };
        return MultiRender;
    }(egret3d.RenderBase));
    egret3d.MultiRender = MultiRender;
    __reflect(MultiRender.prototype, "egret3d.MultiRender");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=MultiRender.js.map