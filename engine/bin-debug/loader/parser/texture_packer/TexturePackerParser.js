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
    /*
    * @private
    */
    var TexturePackerParser = (function (_super) {
        __extends(TexturePackerParser, _super);
        function TexturePackerParser(data, type, fileType) {
            var _this = _super.call(this, fileType) || this;
            _this.data = data;
            switch (type) {
                case "json":
                    if (_this.data.meta && _this.data.meta.image) {
                        _this.taskDict[_this.data.meta.image] = 0;
                    }
                    break;
            }
            return _this;
        }
        return TexturePackerParser;
    }(egret3d.IConfigParser));
    egret3d.TexturePackerParser = TexturePackerParser;
    __reflect(TexturePackerParser.prototype, "egret3d.TexturePackerParser");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=TexturePackerParser.js.map