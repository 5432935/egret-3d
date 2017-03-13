var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @language zh_CN
    * @class egret3d.DoubleArray
    * @classdesc
    * 利用2个数组实现键值对的数组
    * @version Egret 3.0
    * @platform Web,Native
    */
    var DoubleArray = (function () {
        /**
        * @language zh_CN
        * constructor
        * @version Egret 3.0
        * @platform Web,Native
        */
        function DoubleArray() {
            /**
            * @language zh_CN
            * 键队列
            * @version Egret 3.0
            * @platform Web,Native
            */
            this._keys = new Array();
            /**
            * @language zh_CN
            * 值队列
            * @version Egret 3.0
            * @platform Web,Native
            */
            this._values = new Array();
        }
        /**
        * @language zh_CN
        * 根据键获得下标
        * @param  key（键）
        * @returns 下标
        * @version Egret 3.0
        * @platform Web,Native
        */
        DoubleArray.prototype.getIndexByKey = function (key) {
            return this._keys.indexOf(key);
        };
        /**
        * @language zh_CN
        * 根据键获得值
        * @param    key（键）
        * @returns 值
        * @version Egret 3.0
        * @platform Web,Native
        */
        DoubleArray.prototype.getValueByKey = function (key) {
            var index = this.getIndexByKey(key);
            if (index > -1) {
                return this._values[index];
            }
            return null;
        };
        /**
        * @language zh_CN
        * 放入一个键值对
        * @param    key     键
        * @param    value   值
        * @returns           原来的值
        * @version Egret 3.0
        * @platform Web,Native
        */
        DoubleArray.prototype.put = function (key, value) {
            if (key == null)
                return null;
            var old = this.remove(key);
            this._keys.push(key);
            this._values.push(value);
            return old;
        };
        /**
        * @language zh_CN
        * 移除一个键值对
        * @param    key     键
        * @returns          移除的值
        * @version Egret 3.0
        * @platform Web,Native
        */
        DoubleArray.prototype.remove = function (key) {
            var index = this._keys.indexOf(key);
            var item;
            if (index > -1) {
                item = this._values[index];
                this._keys.splice(index, 1);
                this._values.splice(index, 1);
            }
            return item;
        };
        /**
        * @language zh_CN
        * 获取值的队列
        * @returns          值的队列
        * @version Egret 3.0
        * @platform Web,Native
        */
        DoubleArray.prototype.getValues = function () {
            return this._values;
        };
        /**
        * @language zh_CN
        * 获取键的队列
        * @returns          键的队列
        * @version Egret 3.0
        * @platform Web,Native
        */
        DoubleArray.prototype.getKeys = function () {
            return this._keys;
        };
        /**
        * @language zh_CN
        * 重置该哈希表
        * @version Egret 3.0
        * @platform Web,Native
        */
        DoubleArray.prototype.clear = function () {
            this._values.length = 0;
            this._keys.length = 0;
        };
        return DoubleArray;
    }());
    egret3d.DoubleArray = DoubleArray;
    __reflect(DoubleArray.prototype, "egret3d.DoubleArray");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=DoubleArray.js.map