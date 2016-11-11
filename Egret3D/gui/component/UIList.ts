module egret3d.gui {

     /**
    * @class egret3d.gui.UIList
    * @classdesc
    * 基础的列表组件. 实现了滚动交互</p>
    * 鼠标按下拖动时, 将能够拖动内部的显示区域
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UIList extends egret3d.gui.UIPanel{

        private _selectedIndex: number;
        private _selectedItem:any;
        private _items:DisplayObject[];
        private _gap:number;
        private _startDrag:boolean;
        private _containerHeight:number;
      
        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
            this._items = [];
            this._gap = 5;
            this._selectedIndex = -1;
            this._selectedItem = null;
            this.addEventListener(MouseEvent3D.MOUSE_DOWN, this.onMouseDown, this);
            
            this._startDrag = false;
            this._container.height = 0;
        }

        /**
        * @private
        */
        private onMouseDown(event: MouseEvent3D) {
            this._startDrag = true;
            this.addEventListener(MouseEvent3D.MOUSE_UP, this.onMouseUp, this);
            this.addEventListener(MouseEvent3D.MOUSE_MOVE, this.onMouseMove, this);
            this.stage.addEventListener(MouseEvent3D.MOUSE_UP, this.onMouseUp, this);

        }
        /**
        * @private
        */
        private onMouseUp(event: MouseEvent3D) {
            this._startDrag = false;
            this.removeEventListener(MouseEvent3D.MOUSE_UP, this.onMouseUp, this);
            this.removeEventListener(MouseEvent3D.MOUSE_MOVE, this.onMouseMove, this);
            this.stage.removeEventListener(MouseEvent3D.MOUSE_UP, this.onMouseUp, this);
            
        }
        /**
        * @private
        */
        private onMouseMove(event: MouseEvent3D) {
            if (this._startDrag) {
//                this._container.x += Input.mouseOffsetX;
                this._container.y += Input.mouseOffsetY;
                if (this._container.y > 0) {
                    this._container.y = 0;
                } else if (this._containerHeight < this.height) {
                    this._container.y = 0;
                } else if (this._container.y < this.height - this._containerHeight) {
                    this._container.y = this.height - this._containerHeight;
                }

            } 
        }
        /**
        * @private
        */
        protected updateView() {
            var sum: number = 0;
            for (var i: number = 0; i < this._items.length; i++) {
                var child: DisplayObject = this._items[i];
                child.y = sum;
                sum = child.y + child.height + this._gap;
            }

            this._containerHeight = sum;
        }

         /**
        * @language zh_CN
        * 组件内对象的间隔距离
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get gap(): number {
            return this._gap;
        }

           /**
        * @language zh_CN
        * 组件内对象的间隔距离
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set gap(value: number) {
            this._gap = value;
            this.updateView();
        }

         /**
        * @language zh_CN
        * 向组件里添加一项, 添加在组件尾部
        * @param item 需要添加的项
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addItem(item: DisplayObject) {
            this._items.push(item);
            this.addChildAt(item, this._container.childs.length);
            
            this.updateView();
        }
         /**
        * @language zh_CN
        * 移除组件内部的一项
        * @param item 需要移除的项
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeItem(item: DisplayObject) {
            this.removeChild(item);
            this._items.splice(this._items.indexOf(item), 1);
            this.updateView();
        }

    }
} 