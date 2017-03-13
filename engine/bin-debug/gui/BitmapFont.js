var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var gui;
    (function (gui) {
        /**
        * @private
        */
        var BitmapFont = (function () {
            function BitmapFont() {
            }
            /**
            * @private
            */
            BitmapFont.load = function (data) {
                this._fontTextures = data;
            };
            /**
            * @private
            */
            BitmapFont.getTexture = function (unicode) {
                var texture = this._fontTextures[unicode];
                return texture;
            };
            return BitmapFont;
        }());
        gui.BitmapFont = BitmapFont;
        __reflect(BitmapFont.prototype, "egret3d.gui.BitmapFont");
    })(gui = egret3d.gui || (egret3d.gui = {}));
})(egret3d || (egret3d = {}));
//# sourceMappingURL=BitmapFont.js.map