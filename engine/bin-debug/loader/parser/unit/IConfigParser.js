var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /*
    * @private
    */
    var IConfigParser = (function () {
        function IConfigParser(type) {
            /**
            * @language zh_CN
            * 资源列表
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.taskDict = {};
            this.type = type;
        }
        return IConfigParser;
    }());
    IConfigParser.TYPE_SCENE = "scene";
    IConfigParser.TYPE_SKIN_MESH = "ShinnedMesh";
    IConfigParser.TYPE_EFFECT_GROUP = "EffectGroup";
    IConfigParser.TYPE_PARTICLE = "ParticleConfig";
    IConfigParser.TYPE_TEXTUREPACKER = "TexturePacker";
    egret3d.IConfigParser = IConfigParser;
    __reflect(IConfigParser.prototype, "egret3d.IConfigParser");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=IConfigParser.js.map