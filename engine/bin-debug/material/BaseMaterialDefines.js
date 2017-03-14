var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var BaseMaterialDefines = (function () {
        function BaseMaterialDefines() {
            /**
            * @language zh_CN
            * 名称，该名称字运行时使用
            * @default BaseMaterialDefines._name
            * @version Egret 4.0
            * @platform Web,Native
            */
            this._name = "";
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
        BaseMaterialDefines.prototype.isChange = function () {
            var _cName = this.cName();
            if (this._name != _cName) {
                this._name = _cName;
                return true;
            }
            return false;
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
                this._name = this.cName();
            }
            return this._name;
        };
        BaseMaterialDefines.prototype.cName = function () {
            var _cName = "";
            var len = this._keys.length;
            for (var i = 0; i < len; i++) {
                if (this[this._keys[i]] == true) {
                    _cName += (this._keys[i] + "_");
                }
            }
            return _cName;
        };
        return BaseMaterialDefines;
    }());
    egret3d.BaseMaterialDefines = BaseMaterialDefines;
    __reflect(BaseMaterialDefines.prototype, "egret3d.BaseMaterialDefines", ["egret3d.IMaterialDefines"]);
})(egret3d || (egret3d = {}));
