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
    */
    var QuadMesh = (function (_super) {
        __extends(QuadMesh, _super);
        function QuadMesh(start) {
            var _this = _super.call(this, new egret3d.Geometry(), new egret3d.TextureMaterial()) || this;
            _this.startQuad = 0;
            _this.numberQuad = 0;
            _this.quadList = [];
            _this.startQuad = start;
            _this.numberQuad = egret3d.QuadStage.moreQuad;
            _this.geometry.drawType = egret3d.Context3DProxy.gl.DYNAMIC_DRAW;
            egret3d.QuadData.buildGeometry(_this.geometry, start, egret3d.QuadStage.moreQuad);
            _this.guiMethod = new egret3d.GUIMethod();
            _this.enableCulling = false;
            _this.uiMaterial = _this.material;
            _this.uiMaterial.blendMode = egret3d.BlendMode.ALPHA;
            _this.uiMaterial.repeat = true;
            _this.uiMaterial.diffusePass.addMethod(_this.guiMethod);
            _this.enablePick = false;
            _this.tag.name = "gui";
            return _this;
        }
        /*
        *@private
        */
        QuadMesh.prototype.setTexture = function (index, texture) {
            this.guiMethod.setTextures(index, texture);
        };
        return QuadMesh;
    }(egret3d.Mesh));
    egret3d.QuadMesh = QuadMesh;
    __reflect(QuadMesh.prototype, "egret3d.QuadMesh");
    /*
    *@private
    * GUI的根容器
    */
    var GUIRootContainer = (function (_super) {
        __extends(GUIRootContainer, _super);
        function GUIRootContainer() {
            return _super.call(this) || this;
        }
        GUIRootContainer.prototype.dispose = function () {
            //啥也不干
        };
        return GUIRootContainer;
    }(egret3d.Object3D));
    egret3d.GUIRootContainer = GUIRootContainer;
    __reflect(GUIRootContainer.prototype, "egret3d.GUIRootContainer");
})(egret3d || (egret3d = {}));
