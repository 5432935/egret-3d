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
    var gui;
    (function (gui) {
        /**
        * @class egret3d.gui.UIRadioButtonGroup
        * @classdesc
        * RadioButtonGroup 类将一组 RadioButton 组件定义为单个组件。 选中一个单选按钮后，不能再选中同一组中的其它单选按钮
        * 当组内的选定 RadioButton 实例发生变化时调度Event3D.CHANGE.</p>
        * @see egret3d.Event3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        var UIRadioButtonGroup = (function (_super) {
            __extends(UIRadioButtonGroup, _super);
            /**
            * @language zh_CN
            * 构造函数
            * @version Egret 3.0
            * @platform Web,Native
            */
            function UIRadioButtonGroup() {
                var _this = _super.call(this) || this;
                _this._items = [];
                _this._enable = true;
                return _this;
            }
            Object.defineProperty(UIRadioButtonGroup.prototype, "enable", {
                /**
                * @language zh_CN
                * 组件是否可用
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._enable;
                },
                /**
                * @language zh_CN
                * 组件是否可用
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (value) {
                    if (this._enable === value)
                        return;
                    this._enable = value;
                    for (var i = 0; i < this._items.length; i++) {
                        var item = this._items[i];
                        item.enable = value;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UIRadioButtonGroup.prototype, "selection", {
                /**
                * @language zh_CN
                * (只读)获取当前选中的项
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._selection;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UIRadioButtonGroup.prototype, "selectedIndex", {
                /**
                * @language zh_CN
                * 获取或设置当前选中项的索引
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    return this._items.indexOf(this._selection);
                },
                /**
                * @language zh_CN
                * 获取或设置当前选中项的索引
                * @version Egret 3.0
                * @platform Web,Native
                */
                set: function (index) {
                    var item = this._items[index];
                    if (item) {
                        item.selected = true;
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
           * @language zh_CN
           * 添加一个UIRadioButton到组件中
           * @param item 要添加的UIRadioButton组件
           * @version Egret 3.0
           * @platform Web,Native
           */
            UIRadioButtonGroup.prototype.addItem = function (item) {
                this._items.push(item);
                item.enable = this._enable;
                item.addEventListener(egret3d.Event3D.CHANGE, this.onItemChange, this);
            };
            /**
            * @language zh_CN
            * 移除一个UIRadioButton组件
            * @param item 要移除的UIRadioButton组件
            * @version Egret 3.0
            * @platform Web,Native
            */
            UIRadioButtonGroup.prototype.removeItem = function (item) {
                var index = this._items.indexOf(item);
                if (index !== -1) {
                    item.removeEventListener(egret3d.Event3D.CHANGE, this.onItemChange, this);
                    this._items.splice(index, 1);
                }
            };
            /**
            * @private
            */
            UIRadioButtonGroup.prototype.getRadioButtonAt = function (index) {
                return this._items[index];
            };
            /**
            * @private
            */
            UIRadioButtonGroup.prototype.onItemChange = function (event) {
                var target = event.target;
                this.changeSelectedItem(target);
                //            if (target.selected === false) return;
                //            if (this._selection === target) {
                //                return;
                //            }
                //            if(this._selection) this._selection.selected = false;
                //            this._selection = target;
                //            var evt: Event3D = new Event3D(Event3D.CHANGE);
                //            evt.target = this;
                //            this.dispatchEvent(evt);
            };
            /**
           * @private
           */
            UIRadioButtonGroup.prototype.changeSelectedItem = function (item) {
                if (item.selected === false)
                    return;
                if (this._selection === item) {
                    return;
                }
                if (this._selection)
                    this._selection.selected = false;
                this._selection = item;
                var evt = new egret3d.Event3D(egret3d.Event3D.CHANGE);
                evt.target = this;
                this.dispatchEvent(evt);
            };
            return UIRadioButtonGroup;
        }(egret3d.EventDispatcher));
        gui.UIRadioButtonGroup = UIRadioButtonGroup;
        __reflect(UIRadioButtonGroup.prototype, "egret3d.gui.UIRadioButtonGroup");
    })(gui = egret3d.gui || (egret3d.gui = {}));
})(egret3d || (egret3d = {}));
//# sourceMappingURL=UIRadioButtonGroup.js.map