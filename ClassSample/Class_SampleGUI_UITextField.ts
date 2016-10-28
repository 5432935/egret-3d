module egret3d {

    export class Class_SampleGUI_UITextField extends Class_View3D {

        protected view1: View3D;
        protected ctl; HoverController;
        protected textField: gui.UITextField;

        public tempMesh: Mesh;

        public constructor() {
            super();

            this.view1 = new View3D(0, 0, window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);
            this.view1.camera3D.lookAt(new Vector3D(0, 100, -100), new Vector3D(0, 0, 0));
            this.view1.backColor = 0xffcccccc;
            this._egret3DCanvas.addView3D(this.view1);

            this.ctl = new HoverController(this.view1.camera3D);
            this.ctl.tiltAngle = 60;
            this.ctl.distance = 1000;

            Egret3DEngine.instance.debug = false;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
            //
            //            this.tempMesh = new Mesh(new CubeGeometry());
            //            this.view1.addChild3D(this.tempMesh);


            //var gui: QuadStage = this.view1.getGUIStage();
            //TextureResourceManager.getInstance().guiStage = gui;
            this.view1.openGui(() => {
                this.onLoadFonts(null)
            })
            //TextureResourceManager.getInstance().loadTexture("resource/ui/fonts.json", "resource/ui/fonts.png");
            //TextureResourceManager.getInstance().loadTexture("resource/ui/GUI.json", "resource/ui/GUI.png");
            //TextureResourceManager.getInstance().addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.guiInited, this);
            //TextureResourceManager.getInstance().addEventListener(LoaderEvent3D.LOADER_PROGRESS, this.onLoadProgress, this);
        }

        private onLoadProgress(e: LoaderEvent3D) {
         
        }

        protected onLoadFonts(e: LoaderEvent3D) {
            gui.BitmapFont.load(textureResMgr.getTextureDic());
            var upState: Texture = textureResMgr.getTexture("normal.png");
            var downState: Texture = textureResMgr.getTexture("pressed.png");
            var overState: Texture = textureResMgr.getTexture("hover.png");

            var checkUpState: Texture = textureResMgr.getTexture("default.png");
            var checkDownState: Texture = textureResMgr.getTexture("checked.png");

            var whiteBg: Texture = textureResMgr.getTexture("whitebackground.png");

            var progressBg: Texture = textureResMgr.getTexture("backgroundpic.png");
            var progressBarSkin: Texture = textureResMgr.getTexture("blue.png");

            var radioUpState: Texture = textureResMgr.getTexture("unselected.png");
            var radioSelected: Texture = textureResMgr.getTexture("selected.png");
            var radioHover: Texture = textureResMgr.getTexture("hover1.png");

            var sliderBar: Texture = textureResMgr.getTexture("bluebackground.png");
            var sliderBackground: Texture = textureResMgr.getTexture("whitebackground.png");

            gui.SkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_BUTTON_UP, upState);
            gui.SkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_BUTTON_DOWN, downState);
            gui.SkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_BUTTON_OVER, overState);
            gui.SkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_LABEL_BUTTON_UP, upState);
            gui.SkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_LABE_BUTTON_DOWN, downState);
            gui.SkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_CHECK_BOX_UP, checkUpState);
            gui.SkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_CHECK_BOX_DOWN, checkUpState);
            gui.SkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_CHECK_BOX_SELECTED_UP, checkDownState);
            gui.SkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_CHECK_BOX_SELECTED_DOWN, checkDownState);
            gui.SkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_RADIO_BUTTON_UP, radioUpState);
            gui.SkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_RADIO_BUTTON_DOWN, radioHover);
            gui.SkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_RADIO_BUTTON_SELECTED_DOWN, radioHover);
            gui.SkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_RADIO_BUTTON_SELECTED_UP, radioSelected);
            gui.SkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_SLIDER_BAR, sliderBar);
            gui.SkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_SLIDER_BACKGROUND, sliderBackground);
            gui.SkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_PROGRESS_BAR, progressBarSkin);
            gui.SkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_PROGRESS_BAR_BACKGROUND, progressBg);
            gui.SkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_PANEL_BACKGROUND, whiteBg);



            var quad: Quad = this.quad = new Quad();
            this.view1.addGUI(quad);
            this.quad.width = this.quad.height = 400;
            this.tex = gui.BitmapFont.getTexture(("来").charCodeAt(0));

        }

        private quad: Quad;
        private tex: Texture;

        private count: number = 0;
        public update(e: Event3D) {
            if (this.quad) {
                this.count++;
                if (this.count == 180) {
                    this.quad.texture = this.tex;
                    this.quad.width = this.quad.height = 400;

                } else if (this.count == 360) {
                    this.quad.texture = null;
                    this.quad.width = this.quad.height = 400;

                }
            }
            this.ctl.update();
        }
    }

}