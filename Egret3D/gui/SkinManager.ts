module egret3d.gui {
    export class SkinManager {
        private static _instance:SkinManager;
        private _defaultSkinTexture:any;
        constructor() {
            this._defaultSkinTexture = {};
        }

        public getDefaultSkin(skinName: string): Texture {
            return this._defaultSkinTexture[skinName];
        }

        public setDefaultSkin(skinName: string, texture: Texture) {
            this._defaultSkinTexture[skinName] = texture;
        }

        public static get instance(): SkinManager {
            if (!SkinManager._instance) {
                SkinManager._instance = new SkinManager();
            }
            return SkinManager._instance;
        }
    }

    export class DefaultSkinName {
        public static DEFAULT_BUTTON_UP:string = 'defaultButtonUp';
        public static DEFAULT_BUTTON_DOWN: string = 'defaultButtonDown';
        public static DEFAULT_BUTTON_OVER: string = 'defaultButtonOver';
        public static DEFAULT_BUTTON_DISABLE:String = "defaultButtonDisable";
        public static DEFAULT_LABEL_BUTTON_UP: string = 'defaultLabelButtonUp';
        public static DEFAULT_LABE_BUTTON_DOWN: string = 'defaultLabelButtonDown';
        public static DEFAULT_LABE_BUTTON_DISABLE: String = "defaultLabelButtonDisable";
        public static DEFAULT_CHECK_BOX_UP:string = "defaultCheckBoxUp";
        public static DEFAULT_CHECK_BOX_DOWN:string = "defaultCheckBoxDown";
        public static DEFAULT_CHECK_BOX_SELECTED_UP:string = "defaultCheckBoxSelectedUp";
        public static DEFAULT_CHECK_BOX_SELECTED_DOWN:string = "defaultCheckBoxSelectedDown";
        public static DEFAULT_CHECK_BOX_DISABLE:string = "defaultCheckBoxDisable";
        public static DEFAULT_PROGRESS_BAR:string = "defaultProgressBar";
        public static DEFAULT_PROGRESS_BAR_BACKGROUND:string = "defaultProgressBarBackground";
        public static DEFAULT_RADIO_BUTTON_UP:string = "defaultRadioButtonUp";
        public static DEFAULT_RADIO_BUTTON_DOWN:string = "defaultRadioButtonDown";
        public static DEFAULT_RADIO_BUTTON_SELECTED_UP:string = "defaultRadioButtonSelectedUp";
        public static DEFAULT_RADIO_BUTTON_SELECTED_DOWN:string = "defaultRadioButtonSelectedDown";
        public static DEFAULT_RADIO_BUTTON_DISABLE:string = "defaultRadioButtonDisable";
        public static DEFAULT_SLIDER_BAR:string  = "defaultSliderBar";
        public static DEFAULT_SLIDER_BACKGROUND:string  = "defaultSliderBarBACKGROUND";
        public static DEFAULT_PANEL_BACKGROUND:string = "defaultPanelBackground";

        
    }
} 