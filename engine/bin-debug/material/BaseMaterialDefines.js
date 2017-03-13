var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var BaseMaterialDefines = (function () {
        function BaseMaterialDefines() {
            /**
            * @language zh_CN
            * 名称
            * @default BaseMaterialDefines._name
            * @version Egret 4.0
            * @platform Web,Native
            */
            this._name = "";
            this._shaderName = "";
        }
        /**
        * @language zh_CN
        * 获取关键词
        * @default BaseMaterialDefines.keys
        * @version Egret 4.0
        * @platform Web,Native
        */
        BaseMaterialDefines.prototype.keys = function () {
            return this._keys;
        };
        /**
        * @language zh_CN
        * 属性变化更新
        * @default BaseMaterialDefines.change
        * @version Egret 4.0
        * @platform Web,Native
        */
        BaseMaterialDefines.prototype.change = function () {
            this._name = "";
        };
        /**
        * @language zh_CN
        * 获取名称
        * @default BaseMaterialDefines.toName
        * @version Egret 4.0
        * @platform Web,Native
        */
        BaseMaterialDefines.prototype.toName = function () {
            if (this._name == "") {
                var len = this._keys.length;
                for (var i = 0; i < len; i++) {
                    if (this[this._keys[i]] == true) {
                        this._name += (this._keys[i] + "_");
                    }
                }
                this._name += this._shaderName;
            }
            return this._name;
        };
        return BaseMaterialDefines;
    }());
    egret3d.BaseMaterialDefines = BaseMaterialDefines;
    __reflect(BaseMaterialDefines.prototype, "egret3d.BaseMaterialDefines", ["egret3d.IMaterialDefines"]);
})(egret3d || (egret3d = {}));
//# sourceMappingURL=BaseMaterialDefines.js.map