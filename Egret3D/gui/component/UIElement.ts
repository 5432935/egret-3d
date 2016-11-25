module egret3d.gui {
    /**
    * @class egret3d.gui.UIElement
    * @classdesc
    * 所有可视组件的基类</p>.
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UIElement extends DisplayObject {

        /**
        * @private
        */
        protected instanceStyles: Object;

        private static defaultStyles:Object = {
        }
        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
        }

        /**
        * @private
        */
        protected onRender() {
        }
        /**
        * @private
        */
        protected onUpdate() {
        }
        /**
        * @private
        */
        protected onEvent() {
        }

        /**
        * @language zh_CN
        * 对此组件实例设置样式属性。
        * @param style 样式属性的名称。
        * @param value  样式的值。可由Texture或string, string的值由texturepacker出的配置文件内的文件名得来.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setStyle(style: string, value: any): void {
            if (!this.instanceStyles) {
                this.instanceStyles = {};
            }

            if (typeof value === "string") {
                let tex:Texture = textureResMgr.getTexture(value);
                if (!tex) {
                    console.log("未找到名为: " + value + " 的资源贴图");
                    return;
                } else {
                    value = tex;
                }
            }
            if (this.instanceStyles[style] === value) {
                return;
            }
            this.instanceStyles[style] = value;
        }
          /**
        * @language zh_CN
        * 检索组件的样式查找链中设置的样式属性。
        * @param style 样式属性的名称。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getStyle(style: string): Texture {
            return this.instanceStyles ?  this.instanceStyles[style] : this.getDefaultStyle(style);
        }

        /**
        * @private
        */
        private getDefaultStyle(style: string): Texture {
            return GUISkinManager.instance.getDefaultSkin(this.getDefaultStyleNameByStyleName(style));
        }

        /**
         * @private
         * 用于子类重写
        * @version Egret 3.0
        * @platform Web,Native
        */
        protected getDefaultStyleNameByStyleName(styleName: string): string {
            return "";
        }


         /**
         * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static mergeStyles(...list):Object {
            var styles:Object = {};
            var l:number = list.length;
            for (var i: number=0; i<l; i++) {
                var styleList: Object = list[i];
                for (var n in styleList) {
                    if (styles[n] != null) { continue; }
                    styles[n] = list[i][n];
                }
            }
            return styles;
        }
    }

}