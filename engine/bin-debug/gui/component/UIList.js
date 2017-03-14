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
       * @class egret3d.gui.UIList
       * @classdesc
       * 基础的列表组件. 实现了滚动交互</p>
       * 鼠标按下拖动时, 将能够拖动内部的显示区域
       * @version Egret 3.0
       * @platform Web,Native
       */
        var UIList = (function (_super) {
            __extends(UIList, _super);
            /**
            * @language zh_CN
            * 构造函数
            * @version Egret 3.0
            * @platform Web,Native
            */
            function UIList() {
                var _this = _super.call(this) || this;
                _this._items = [];
                _this._gap = 5;
                _this._selectedIndex = -1;
                _this._selectedItem = null;
                _this.addEventListener(egret3d.MouseEvent3D.MOUSE_DOWN, _this.onMouseDown, _this);
                _this._startDrag = false;
                _this._container.height = 0;
                return _this;
            }
            /**
            * @private
            */
            UIList.prototype.onMouseDown = function (event) {
                this._startDrag = true;
                this.addEventListener(egret3d.MouseEvent3D.MOUSE_UP, this.onMouseUp, this);
                this.addEventListener(egret3d.MouseEvent3D.MOUSE_MOVE, this.onMouseMove, this);
                if (this.stage) {
                    this.stage.addEventListener(egret3d.MouseEvent3D.MOUSE_UP, this.onMouseUp, this);
                }
            };
            /**
            * @private
            */
            UIList.prototype.onMouseUp = function (event) {
                this._startDrag = false;
                this.removeEventListener(egret3d.MouseEvent3D.MOUSE_UP, this.onMouseUp, this);
                this.removeEventListener(egret3d.MouseEvent3D.MOUSE_MOVE, this.onMouseMove, this);
                if (this.stage) {
                    this.stage.removeEventListener(egret3d.MouseEvent3D.MOUSE_UP, this.onMouseUp, this);
                }
            };
            /**
            * @private
            */
            UIList.prototype.onMouseMove = function (event) {
                if (this._startDrag) {
                    //                this._container.x += Input.mouseOffsetX;
                    this._container.y += egret3d.Input.mouseOffsetY;
                    if (this._container.y > 0) {
                        this._container.y = 0;
                    }
                    else if (this._containerHeight < this.height) {
                        this._container.y = 0;
                    }
                    else if (this._container.y < this.height - this._containerHeight) {
                        this._container.y = this.height - this._containerHeight;
                    }
                }
            };
            /**
            * @private
            */
            UIList.prototype.updateView = function () {
                var sum = 0;
                for (var i = 0; i < this._items.length; i++) {
                    var child = this._items[i];
                    child.y = sum;
                    sum = child.y + child.height + this._gap;
                }
                this._containerHeight = sum;
            };
            Object.defineProperty(UIList.prototype, "gap", {
                /**
               * @language zh_CN
               * 组件内对象的间隔距离
               * @version Egret 3.0
               * @platform Web,Native
               */
                get: function () {
                    return this._gap;
                },
                /**
             * @language zh_CN
             * 组件内对象的间隔距离
             * @version Egret 3.0
             * @platform Web,Native
             */
                set: function (value) {
                    this._gap = value;
                    this.updateView();
                },
                enumerable: true,
                configurable: true
            });
            /**
           * @language zh_CN
           * 向组件里添加一项, 添加在组件尾部
           * @param item 需要添加的项
           * @version Egret 3.0
           * @platform Web,Native
           */
            UIList.prototype.addItem = function (item) {
                this._items.push(item);
                this.addChildAt(item, this._container.childs.length);
                this.updateView();
            };
            /**
           * @language zh_CN
           * 移除组件内部的一项
           * @param item 需要移除的项
           * @version Egret 3.0
           * @platform Web,Native
           */
            UIList.prototype.removeItem = function (item) {
                this.removeChild(item);
                this._items.splice(this._items.indexOf(item), 1);
                this.updateView();
            };
            return UIList;
        }(egret3d.gui.UIPanel));
        gui.UIList = UIList;
        __reflect(UIList.prototype, "egret3d.gui.UIList");
    })(gui = egret3d.gui || (egret3d.gui = {}));
})(egret3d || (egret3d = {}));
