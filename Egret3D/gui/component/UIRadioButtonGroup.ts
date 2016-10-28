module egret3d.gui {
         /**
    * @class egret3d.gui.UIRadioButtonGroup
    * @classdesc
    * RadioButtonGroup 类将一组 RadioButton 组件定义为单个组件。 选中一个单选按钮后，不能再选中同一组中的其它单选按钮
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UIRadioButtonGroup extends EventDispatcher {
        private _enable: boolean;
        private _selection:UIRadioButton;
        private _items:UIRadioButton[];
        constructor() {
            super();
            this._items = [];
            this._enable = true;
        }

           /**
        * @language zh_CN
        * 组件是否可用
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set enable(value: boolean) {
            if (this._enable === value) return;
            this._enable = value;
            for (var i: number = 0; i < this._items.length; i++) {
                var item: UIRadioButton = this._items[i];
                item.enable = value;
            }
        }

        public get enable(): boolean {
            return this._enable;
        }

         /**
        * @language zh_CN
          * 添加一个UIRadioButton到组件中
        * @param item 要添加的UIRadioButton组件
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addItem(item: UIRadioButton) {
            this._items.push(item);
            item.enable = this._enable;
            item.addEventListener(Event3D.CHANGE, this.onItemChange, this);
        }

         /**
        * @language zh_CN
          * 移除一个UIRadioButton组件
        * @param item 要移除的UIRadioButton组件
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeItem(item: UIRadioButton) {
            var index: number = this._items.indexOf(item);
            if (index !== -1) {
                item.removeEventListener(Event3D.CHANGE, this.onItemChange,this);
                this._items.splice(index, 1);
            }
        }

        public getRadioButtonAt(index: number): UIRadioButton {
            return this._items[index];
        } 

        private onItemChange(event: Event3D) {
            var target: UIRadioButton = event.target;
            if (target.selected === false) return;
            if (this._selection === target) {
                return;
            }
            if(this._selection) this._selection.selected = false;
            this._selection = target;
            var evt: Event3D = new Event3D(Event3D.CHANGE);
            evt.target = this;
            this.dispatchEvent(evt);
        }
    }
}