var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var gui;
    (function (gui) {
        /**
        * @private
        * @class egret3d.GUISkinManager
        * @classdesc
        * gui的默认皮肤管理器
        * @see egret3d.TextureResourceManager
        * @version Egret 3.0
        * @platform Web,Native
        */
        var GUISkinManager = (function () {
            function GUISkinManager() {
                this._defaultSkinTexture = {};
            }
            /**
            * @private
            * 获取默认贴图
            * @param skinName 根据皮肤名称获取默认的Texture
            * @returns Texture 获取到的默认贴图
            * @version Egret 3.0
            * @platform Web,Native
            */
            GUISkinManager.prototype.getDefaultSkin = function (skinName) {
                return this._defaultSkinTexture[skinName];
            };
            /**
            * @private
            * 初始化该管理器
            * @version Egret 3.0
            * @platform Web,Native
            */
            GUISkinManager.prototype.initDefaultSkin = function () {
                var upState = egret3d.textureResMgr.getTexture("normal.png");
                var downState = egret3d.textureResMgr.getTexture("pressed.png");
                var overState = egret3d.textureResMgr.getTexture("hover.png");
                var checkUpState = egret3d.textureResMgr.getTexture("default.png");
                var checkDownState = egret3d.textureResMgr.getTexture("checked.png");
                var whiteBg = egret3d.textureResMgr.getTexture("whitebackground.png");
                var progressBg = egret3d.textureResMgr.getTexture("backgroundpic.png");
                var progressBarSkin = egret3d.textureResMgr.getTexture("blue.png");
                var radioUpState = egret3d.textureResMgr.getTexture("unselected.png");
                var radioSelected = egret3d.textureResMgr.getTexture("selected.png");
                var radioHover = egret3d.textureResMgr.getTexture("hover1.png");
                var sliderBar = egret3d.textureResMgr.getTexture("bluebackground.png");
                var sliderBackground = egret3d.textureResMgr.getTexture("whitebackground.png");
                GUISkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_BUTTON_UP, upState);
                GUISkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_BUTTON_DOWN, downState);
                GUISkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_BUTTON_OVER, overState);
                GUISkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_LABEL_BUTTON_UP, upState);
                GUISkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_LABE_BUTTON_DOWN, downState);
                GUISkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_CHECK_BOX_UP, checkUpState);
                GUISkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_CHECK_BOX_DOWN, checkUpState);
                GUISkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_CHECK_BOX_SELECTED_UP, checkDownState);
                GUISkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_CHECK_BOX_SELECTED_DOWN, checkDownState);
                GUISkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_RADIO_BUTTON_UP, radioUpState);
                GUISkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_RADIO_BUTTON_DOWN, radioHover);
                GUISkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_RADIO_BUTTON_SELECTED_DOWN, radioHover);
                GUISkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_RADIO_BUTTON_SELECTED_UP, radioSelected);
                GUISkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_SLIDER_BAR, sliderBar);
                GUISkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_SLIDER_BACKGROUND, sliderBackground);
                GUISkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_PROGRESS_BAR, progressBarSkin);
                GUISkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_PROGRESS_BAR_BACKGROUND, progressBg);
                GUISkinManager.instance.setDefaultSkin(gui.DefaultSkinName.DEFAULT_PANEL_BACKGROUND, whiteBg);
            };
            /**
            * @private
            * 设置默认皮肤对应的贴图
            * @param skinName 默认的皮肤名
            * @param texture 默认皮肤对应的贴图
            * @version Egret 3.0
            * @platform Web,Native
            */
            GUISkinManager.prototype.setDefaultSkin = function (skinName, texture) {
                if (typeof texture === "string") {
                    texture = egret3d.textureResMgr.getTexture(texture);
                }
                this._defaultSkinTexture[skinName] = texture;
            };
            Object.defineProperty(GUISkinManager, "instance", {
                /**
                * @private
                * 获取单例
                * @param skinName 默认的皮肤名
                * @returns SkinManager 管理器的蛋例
                * @version Egret 3.0
                * @platform Web,Native
                */
                get: function () {
                    if (!GUISkinManager._instance) {
                        GUISkinManager._instance = new GUISkinManager();
                    }
                    return GUISkinManager._instance;
                },
                enumerable: true,
                configurable: true
            });
            return GUISkinManager;
        }());
        gui.GUISkinManager = GUISkinManager;
        __reflect(GUISkinManager.prototype, "egret3d.gui.GUISkinManager");
        /**
        * @private
        */
        var DefaultSkinName = (function () {
            function DefaultSkinName() {
            }
            return DefaultSkinName;
        }());
        DefaultSkinName.DEFAULT_BUTTON_UP = 'defaultButtonUp';
        DefaultSkinName.DEFAULT_BUTTON_DOWN = 'defaultButtonDown';
        DefaultSkinName.DEFAULT_BUTTON_OVER = 'defaultButtonOver';
        DefaultSkinName.DEFAULT_BUTTON_DISABLE = "defaultButtonDisable";
        DefaultSkinName.DEFAULT_LABEL_BUTTON_UP = 'defaultLabelButtonUp';
        DefaultSkinName.DEFAULT_LABE_BUTTON_DOWN = 'defaultLabelButtonDown';
        DefaultSkinName.DEFAULT_LABE_BUTTON_DISABLE = "defaultLabelButtonDisable";
        DefaultSkinName.DEFAULT_CHECK_BOX_UP = "defaultCheckBoxUp";
        DefaultSkinName.DEFAULT_CHECK_BOX_DOWN = "defaultCheckBoxDown";
        DefaultSkinName.DEFAULT_CHECK_BOX_SELECTED_UP = "defaultCheckBoxSelectedUp";
        DefaultSkinName.DEFAULT_CHECK_BOX_SELECTED_DOWN = "defaultCheckBoxSelectedDown";
        DefaultSkinName.DEFAULT_CHECK_BOX_DISABLE = "defaultCheckBoxDisable";
        DefaultSkinName.DEFAULT_PROGRESS_BAR = "defaultProgressBar";
        DefaultSkinName.DEFAULT_PROGRESS_BAR_BACKGROUND = "defaultProgressBarBackground";
        DefaultSkinName.DEFAULT_RADIO_BUTTON_UP = "defaultRadioButtonUp";
        DefaultSkinName.DEFAULT_RADIO_BUTTON_DOWN = "defaultRadioButtonDown";
        DefaultSkinName.DEFAULT_RADIO_BUTTON_SELECTED_UP = "defaultRadioButtonSelectedUp";
        DefaultSkinName.DEFAULT_RADIO_BUTTON_SELECTED_DOWN = "defaultRadioButtonSelectedDown";
        DefaultSkinName.DEFAULT_RADIO_BUTTON_DISABLE = "defaultRadioButtonDisable";
        DefaultSkinName.DEFAULT_SLIDER_BAR = "defaultSliderBar";
        DefaultSkinName.DEFAULT_SLIDER_BACKGROUND = "defaultSliderBarBACKGROUND";
        DefaultSkinName.DEFAULT_PANEL_BACKGROUND = "defaultPanelBackground";
        gui.DefaultSkinName = DefaultSkinName;
        __reflect(DefaultSkinName.prototype, "egret3d.gui.DefaultSkinName");
    })(gui = egret3d.gui || (egret3d.gui = {}));
})(egret3d || (egret3d = {}));
