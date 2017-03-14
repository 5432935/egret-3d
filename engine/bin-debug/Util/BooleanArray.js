var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @language zh_CN
    * @class egret3d.BooleanArray
    * @classdesc
    * 合并24个bool到一个float32中
    * @version Egret 3.0
    * @platform Web,Native
    */
    var BooleanArray = (function () {
        /**
        * @language zh_CN
        * constructor
        * @version Egret 3.0
        * @platform Web,Native
        */
        function BooleanArray() {
            //...一共可以有24个，用的时候加
            this._dirty = true;
            this._makeResult = 0;
            /**
            * @language zh_CN
            * 值队列
            * @version Egret 3.0
            * @platform Web,Native
            */
            this._values = [];
            this._values = [];
            this._values.length = BooleanArray.MAX_COUNT;
        }
        /**
       * @language zh_CN
       * 在指定的位置s设置bool值
       * @param index 指定下标
       * @param value 需要设置的bool值
       * @version Egret 3.0
       * @platform Web,Native
       */
        BooleanArray.prototype.setBoolean = function (index, value) {
            if (index >= BooleanArray.MAX_COUNT)
                throw Error("BooleanArray MAX_COUNT：" + BooleanArray.MAX_COUNT);
            if (this._values[index] != value) {
                this._values[index] = value;
                this._dirty = true;
            }
        };
        /**
        * @language zh_CN
        * 在指定的位置获取bool值
        * @param index 指定下标
        * @returns bool值
        * @version Egret 3.0
        * @platform Web,Native
        */
        BooleanArray.prototype.getBoolean = function (index) {
            if (index >= BooleanArray.MAX_COUNT)
                return false;
            return this._values[index];
        };
        Object.defineProperty(BooleanArray.prototype, "dirty", {
            /**
            * @language zh_CN
            * 是否需要重新计算
            * @returns bool值
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._dirty;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 强制设置需要计算
        * @version Egret 3.0
        * @platform Web,Native
        */
        BooleanArray.prototype.forceDirty = function () {
            this._dirty = true;
        };
        Object.defineProperty(BooleanArray.prototype, "makeResult", {
            /**
            * @language zh_CN
            * 获取压缩后的值
            * @returns number 压缩的结果
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                if (this._dirty) {
                    this.make();
                }
                return this._makeResult;
            },
            enumerable: true,
            configurable: true
        });
        BooleanArray.prototype.make = function () {
            this._makeResult = 0;
            for (var i = 0, count = BooleanArray.MAX_COUNT; i < count; i++) {
                if (this._values[i]) {
                    this._makeResult += 1 << i;
                }
            }
            this._dirty = false;
            return this._makeResult;
        };
        /**
        * @language zh_CN
        * 重置该列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        BooleanArray.prototype.clear = function () {
            this._dirty = true;
            this._makeResult = 0;
            this._values.length = 0;
        };
        return BooleanArray;
    }());
    BooleanArray.FLAG_0 = 0;
    BooleanArray.FLAG_1 = 1;
    BooleanArray.FLAG_2 = 2;
    BooleanArray.FLAG_3 = 3;
    BooleanArray.FLAG_4 = 4;
    BooleanArray.FLAG_5 = 5;
    BooleanArray.FLAG_6 = 6;
    BooleanArray.FLAG_7 = 7;
    BooleanArray.FLAG_8 = 8;
    BooleanArray.FLAG_9 = 9;
    BooleanArray.FLAG_10 = 10;
    BooleanArray.MAX_COUNT = 24;
    egret3d.BooleanArray = BooleanArray;
    __reflect(BooleanArray.prototype, "egret3d.BooleanArray");
})(egret3d || (egret3d = {}));
