var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    */
    var GUITextureGroup = (function () {
        function GUITextureGroup() {
            this._nextIndex = 0;
            this._textures = [];
            for (var i = 0; i < GUITextureGroup.MAX_COUNT; i++) {
                this._textures[i] = egret3d.CheckerboardTexture.texture;
            }
        }
        /**
        * @language zh_CN
        * @private
        * 注册一张UI贴图，最多支持7张
        * @param texture 将要注册的贴图
        * @returns boolean 是否注册成功
        * @version Egret 3.0
        * @platform Web,Native
        */
        GUITextureGroup.prototype.register = function (texture) {
            if (this._nextIndex >= GUITextureGroup.MAX_COUNT)
                return false;
            if (this._textures.indexOf(texture) >= 0)
                return false;
            this._textures[this._nextIndex] = texture;
            texture.guiIndex = this._nextIndex;
            this._nextIndex++;
            return true;
        };
        /**
        * @language zh_CN
        * @private
        * 替换一张UI贴图至指定下标位置
        * @param texture 将要注册的贴图
        * @param index 指定下标位置
        * @returns boolean 是否注册成功
        * @version Egret 3.0
        * @platform Web,Native
        */
        GUITextureGroup.prototype.replace = function (texture, index) {
            if (index < 0 || index >= GUITextureGroup.MAX_COUNT)
                throw new Error("index error");
            var last = this._textures[index];
            this._textures[index] = texture;
            return last;
        };
        /**
        * @language zh_CN
        * @private
        * 渲染之前，将贴图信息绑定至mesh中
        * @param mesh 绑定至目标mesh对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        GUITextureGroup.prototype.activeTexture = function (mesh) {
            for (var i = 0; i < GUITextureGroup.MAX_COUNT; i++) {
                mesh.setTexture(i, this._textures[i]);
            }
        };
        return GUITextureGroup;
    }());
    GUITextureGroup.MAX_COUNT = 7;
    egret3d.GUITextureGroup = GUITextureGroup;
    __reflect(GUITextureGroup.prototype, "egret3d.GUITextureGroup");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=GUITextureGroup.js.map