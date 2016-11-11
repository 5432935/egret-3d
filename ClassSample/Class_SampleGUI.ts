module egret3d {
    export class Class_SampleGUI extends Class_View3D {
        protected view1: View3D;
        protected ctl: HoverController;
        protected textField: gui.UITextField;

        public constructor() {
            super();

            this.view1 = new View3D(0,0,window.innerWidth * window.devicePixelRatio,window.innerHeight * window.devicePixelRatio);
            this.view1.camera3D.lookAt(new Vector3D(0, 100, -100), new Vector3D(0, 0, 0));
            this.view1.backColor = 0xffcccccc;
            this._egret3DCanvas.addView3D(this.view1);

            this.ctl = new HoverController(this.view1.camera3D);
            this.ctl.tiltAngle = 60;
            this.ctl.distance = 1000;

            Egret3DEngine.instance.debug = false;

            this._egret3DCanvas.start();
            //开启GUI.在加载处理完需要的资源后执行传入的回调函数
            this.view1.openGui(() => { this.initGui()} );
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }

        private initGui() {
//            var tex: Texture = textureResMgr.getTexture("normal.png");
//            var quad: Quad = new Quad();
//            quad.width = quad.height = 50;
//            quad.texture = tex;
//            this.view1.addGUI(quad);
            var btn: gui.UIButton = new gui.UIButton();
            this.view1.addGUI(btn);
            this.loadAssets();
        }

        private loadAssets() {
            let queueLoad: QueueLoader = new QueueLoader("resource/ui/gameAsset.json");
            queueLoad.addEventListener(LoaderEvent3D.LOADER_COMPLETE,
                (e) => {
                    var characterView: CharacterView = new CharacterView();
                    this.view1.addGUI(characterView);
                    var texture: Texture = textureResMgr.getTexture("45t.png");
                    var mesh: Mesh = new Mesh(new CubeGeometry(), new TextureMaterial(texture));
                    mesh.material.uvRectangle.x = texture.uvRectangle.x;
                    mesh.material.uvRectangle.y = texture.uvRectangle.y;
                    mesh.material.uvRectangle.width = texture.uvRectangle.width;
                    mesh.material.uvRectangle.height = texture.uvRectangle.height;
                    this.view1.addChild3D(mesh);
                },
                this);
        }

        private createCharacterPanel():DisplayObject {
            var panel: PropertyPanel = new PropertyPanel();
            return panel;
        }

        public update(e: Event3D) {
            this.ctl.update();
        }
    }

    //数据代理
    export class DataProxy extends EventDispatcher {
        private static instance:DataProxy;
        constructor() {
            super();
        }

        public static getInstance(): DataProxy {
            if(!this.instance) this.instance = new DataProxy()
            return this.instance;
        }
    }

    //标题面板基类
    export class TitlePanel extends gui.UIPanel{
        private _titleText:gui.UITextField;
        constructor(titleName:string) {
            super();
            this._titleText = new gui.UITextField();
            this.setStyle("background", textureResMgr.getTexture("yellowbg.png"));
            this.width = 225;
            this.height = 370;
            this._titleText = new gui.UITextField();
            this._titleText.autoSize = gui.UITextFieldAutoSize.CENTER;
            this._titleText.width = this.width;
            this._titleText.textColor = 0xefb54a;
            this._titleText.text = titleName;
            this._titleText.y = 5;
            this.addChild(this._titleText);
        }
        
    }

    //属性面板
    export class PropertyPanel extends  TitlePanel {
        constructor() {
            super("人物属性");
            this.init();
        }
        private init() {
            var createNameText: Function = () => {
                var nameTxt: gui.UITextField = new gui.UITextField();
                nameTxt.width = 80;
                nameTxt.x = 10;
                nameTxt.textColor = 0xfff4c9;
                nameTxt.autoSize = gui.UITextFieldAutoSize.RIGHT;
                return nameTxt;
            };

            var createValueText: Function = () => {
                var valueText: gui.UITextField = new gui.UITextField();
                valueText.width = 120;
                valueText.x = 95;
                valueText.textColor = 0xfff4c9;
                return valueText;
            };

            var obj: any = {
                "HP": "30000",
                "MP": "3000",
                "攻击力": "25-101",
                "防御": "45",
                "暴击": "50%",
                "攻击速度": "2.3",
                "移动速度": "350"
            }

            var startY: number = 35;
            var count: number = 0;
            var gapY: number = 25;
            for (var key in obj) {
                var nameText: gui.UITextField = createNameText();
                nameText.y = count * gapY + startY;
                nameText.text = key + ":";
                this.addChild(nameText);

                var valueText: gui.UITextField = createValueText();
                valueText.y = count * gapY + startY;
                valueText.text = obj[key];
                this.addChild(valueText);
                count++;
            }
        }
    }

    export class ItemVO {
        public id: number;
        public src:string;
        public type:number;//0:头盔, 1项链, 2上衣, 3戒指, 4护腕, 5 鞋子, 6武器
        constructor() {
        }
    }

    export class ItemEvent extends Event3D {
        public static ITEM_CLICK: string = "item_click";
        public static ITEM_DISCHARGE: string = "discharge_item";
        constructor(eventType: string = null, data: any = null) {
            super(eventType, data);
        }
    }

    //道具图标
    export class ItemView extends gui.UIElement {
        private _icon:Quad;
        private _data:ItemVO;
        constructor() {
            super();
            this._icon = new Quad();
            this._icon.width = this._icon.height = 48;
            this.addChild(this._icon);
            this._icon.texture = null;
        }

        public set data(data: ItemVO) {
            if (this._data === data) return;
            this._data = data;
            if (!this._data) {
                this._icon.texture = null;
                return;
            }
            this._icon.texture = textureResMgr.getTexture(this._data.src);;
        }
        public get data(): ItemVO {
            return this._data;
        }
    }

    //装备界面
    export class EquipmentPanel extends TitlePanel{
        private _dataList: ItemVO[];
        private _itemViewList:ItemView[];
        constructor() {
            super("装备");
            this.init();
        }

        public addItem(data: ItemVO) {
            var itemView: ItemView = this._itemViewList[data.type];
            if (!itemView) {
                console.log("EquipmentPanel::addItem Error, 没有类型为: " + data.type+ " 的装备格子");
                return;
            }

            if (itemView.data) {
                this.dispatchEvent(new ItemEvent(ItemEvent.ITEM_DISCHARGE, itemView.data));
            }
            itemView.data = data;
        }

        public removeItem(data: ItemVO) {
            var itemView: ItemView = this._itemViewList[data.type];
            if (!itemView) {
                console.log("EquipmentPanel::addItem Error, 没有类型为: " + data.type + " 的装备格子");
                return;
            } 

            if (itemView.data) {
                this.dispatchEvent(new ItemEvent(ItemEvent.ITEM_DISCHARGE, itemView.data));
                itemView.data = null;
            }
        }

        private init() {
            this._dataList = [];
            var createEquipmentIconBackgournd: Function = () => {
                var quad: Quad = new Quad();
                quad.texture = textureResMgr.getTexture("grid.png");
                quad.width = quad.height = 52;
                return quad;
            };
            var coords: Point[] = [
                new Point(85, 40), new Point(10, 95), new Point(160, 95), new Point(30, 160), new Point(145, 160),
                new Point(85, 220), new Point(85, 290)
            ];

            this._itemViewList = [];
            for (var i: number = 0; i < coords.length; i ++) {
                var coord: Point = coords[i];
                var iconBg: DisplayObject = createEquipmentIconBackgournd();
                iconBg.x = coord.x;
                iconBg.y = coord.y;
                this.addChild(iconBg);
                var item: ItemView = new ItemView();
                item.x = coord.x + 2;
                item.y = coord.y + 2;
                this.addChild(item);
                this._itemViewList.push(item);
                item.addEventListener(MouseEvent3D.MOUSE_CLICK,
                    (e) => {
                        var data: ItemVO = (<ItemView> e.target).data;
                        var evt: ItemEvent = new ItemEvent(ItemEvent.ITEM_CLICK, data);
                        this.dispatchEvent(evt);
                    },
                    this);
            }
        }
    }

    //背包格子
    export class BagItem extends gui.UIElement  {
        private _bg:Quad;
        private _icon: ItemView;
        private _data:ItemVO;
        constructor() {
            super();
            this._bg = new Quad();
            this._bg.texture = textureResMgr.getTexture("grid.png");
            this._bg.width = this._bg.height = 52;
            this._icon = new ItemView();
            this._icon.x = this._icon.y = 2;
            this.addChild(this._bg);
            this.addChild(this._icon);
            this.updateView();
        }

        public set data(data: ItemVO) {
            this._data = data;
            this.updateView();
        }

        public get data(): ItemVO {
            return this._data;  
        }

        private updateView() {
            this._icon.data = this._data;
        }
    }

    //背包
    export class BagPanel extends TitlePanel {
        private _dataList: ItemVO[];
        private _itemViews:BagItem[];
        constructor() {
            super("背包");
            this.initView();
        }

        private initView() {
            this._dataList = [];
            const posY: number = 25;
            const posX: number = 4;
            this._itemViews = [];
            for (let i: number = 0; i < 24; i++) {
                var item: BagItem = new BagItem();
                item.x = i % 4 * 55 + posX;
                item.y = (i / 4 >>> 0) * 55 + posY;
                this.addChild(item);
                this._itemViews.push(item);
                item.addEventListener(MouseEvent3D.MOUSE_CLICK,
                    (e) => {
                        var data: ItemVO = (<BagItem>e.target).data;
                        if (data) {
                            var evt: ItemEvent = new ItemEvent(ItemEvent.ITEM_CLICK, data);
                            this.dispatchEvent(evt);
                            console.log("bagItem click");
                        }
                    },
                    this);
            }
        }

        public addItem(data: ItemVO) {
            if (!data) return;
            this._dataList.push(data);
            this.updateView();
        }

        public removeItem(data: ItemVO) {
            if (!data) return;
            var index: number = this._dataList.indexOf(data);
            if (index !== -1) {
                this._dataList.splice(index, 1);
            }
            this.updateView();
        }

        private updateView() {
            for (let i: number = 0; i < this._itemViews.length; i++) {
                if (i < this._dataList.length) {
                    this._itemViews[i].data = this._dataList[i];
                } else {
                    this._itemViews[i].data = null;
                }
            }
        }
    }

    //角色界面
    export class CharacterView  extends gui.UIElement{
        private _propertyPanel:PropertyPanel;
        private _equipmentPanel: EquipmentPanel;
        private _bagPanel:BagPanel;
        constructor() {
            super();
            this._propertyPanel = new PropertyPanel();
            this.addChild(this._propertyPanel);
            this._equipmentPanel = new EquipmentPanel();
            this._equipmentPanel.x = 250;
            this.addChild(this._equipmentPanel);
            this._bagPanel = new BagPanel();
            this._bagPanel.x = 500;
            this.addChild(this._bagPanel);
            this.initView();
            this.initListeners();
        }

        private initListeners() {
            this._equipmentPanel.addEventListener(ItemEvent.ITEM_DISCHARGE,
                (e) => {
                    this._bagPanel.addItem(e.data);
                },
                this);
            this._bagPanel.addEventListener(ItemEvent.ITEM_CLICK,
                (e) => {
                    this._equipmentPanel.addItem(e.data);
                    this._bagPanel.removeItem(e.data);
                },
                this);
            this._equipmentPanel.addEventListener(ItemEvent.ITEM_CLICK,
                (e) => {
                    this._equipmentPanel.removeItem(e.data);
                },
                this);
        }

        private initView() {

            var bagItems: ItemVO[] = [];
            //0:头盔, 1项链, 2上衣, 3戒指, 4护腕, 5 鞋子, 6武器
            var iconNames: string[] = [
                "t_07.png", "63t.png", "140_t.png", "50t.png", "45t.png", "124t.png", "131_t.png"
            ];
            for (let i: number = 0; i < iconNames.length; i++) {
                var itemVO: ItemVO = new ItemVO();
                itemVO.src = iconNames[i];
                itemVO.id = i;
                itemVO.type = i % 7;
                bagItems.push(itemVO);
                this._bagPanel.addItem(itemVO);
            }
        }
        
    }
} 