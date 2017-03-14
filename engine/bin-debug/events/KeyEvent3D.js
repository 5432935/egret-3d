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
    /**
     * @language zh_CN
     * 按键码
     * @version Egret 3.0
     * @platform Web,Native
     */
    var KeyCode;
    (function (KeyCode) {
        KeyCode[KeyCode["Key_BackSpace"] = 8] = "Key_BackSpace";
        KeyCode[KeyCode["Key_Tab"] = 9] = "Key_Tab";
        KeyCode[KeyCode["Key_Clear"] = 12] = "Key_Clear";
        KeyCode[KeyCode["Key_Enter"] = 13] = "Key_Enter";
        KeyCode[KeyCode["Key_Shift_L"] = 16] = "Key_Shift_L";
        KeyCode[KeyCode["Key_Control_L"] = 17] = "Key_Control_L";
        KeyCode[KeyCode["Key_Alt_L"] = 18] = "Key_Alt_L";
        KeyCode[KeyCode["Key_Pause"] = 19] = "Key_Pause";
        KeyCode[KeyCode["Key_CapsLock"] = 20] = "Key_CapsLock";
        KeyCode[KeyCode["Key_Escape"] = 21] = "Key_Escape";
        KeyCode[KeyCode["Key_Space"] = 32] = "Key_Space";
        KeyCode[KeyCode["Key_Prior"] = 33] = "Key_Prior";
        KeyCode[KeyCode["Key_Next"] = 34] = "Key_Next";
        KeyCode[KeyCode["Key_End"] = 35] = "Key_End";
        KeyCode[KeyCode["Key_Home"] = 36] = "Key_Home";
        KeyCode[KeyCode["Key_Left"] = 37] = "Key_Left";
        KeyCode[KeyCode["Key_Up"] = 38] = "Key_Up";
        KeyCode[KeyCode["Key_Right"] = 39] = "Key_Right";
        KeyCode[KeyCode["Key_Down"] = 40] = "Key_Down";
        KeyCode[KeyCode["Key_Select"] = 41] = "Key_Select";
        KeyCode[KeyCode["Key_Print"] = 42] = "Key_Print";
        KeyCode[KeyCode["Key_Execute"] = 43] = "Key_Execute";
        KeyCode[KeyCode["Key_Insert"] = 45] = "Key_Insert";
        KeyCode[KeyCode["Key_Delete"] = 46] = "Key_Delete";
        KeyCode[KeyCode["Key_Help"] = 47] = "Key_Help";
        KeyCode[KeyCode["Key_0"] = 48] = "Key_0";
        KeyCode[KeyCode["Key_1"] = 49] = "Key_1";
        KeyCode[KeyCode["Key_2"] = 50] = "Key_2";
        KeyCode[KeyCode["Key_3"] = 51] = "Key_3";
        KeyCode[KeyCode["Key_4"] = 52] = "Key_4";
        KeyCode[KeyCode["Key_5"] = 53] = "Key_5";
        KeyCode[KeyCode["Key_6"] = 54] = "Key_6";
        KeyCode[KeyCode["Key_7"] = 55] = "Key_7";
        KeyCode[KeyCode["Key_8"] = 56] = "Key_8";
        KeyCode[KeyCode["Key_9"] = 57] = "Key_9";
        KeyCode[KeyCode["Key_A"] = 65] = "Key_A";
        KeyCode[KeyCode["Key_B"] = 66] = "Key_B";
        KeyCode[KeyCode["Key_C"] = 67] = "Key_C";
        KeyCode[KeyCode["Key_D"] = 68] = "Key_D";
        KeyCode[KeyCode["Key_E"] = 69] = "Key_E";
        KeyCode[KeyCode["Key_F"] = 70] = "Key_F";
        KeyCode[KeyCode["Key_G"] = 71] = "Key_G";
        KeyCode[KeyCode["Key_H"] = 72] = "Key_H";
        KeyCode[KeyCode["Key_I"] = 73] = "Key_I";
        KeyCode[KeyCode["Key_J"] = 74] = "Key_J";
        KeyCode[KeyCode["Key_K"] = 75] = "Key_K";
        KeyCode[KeyCode["Key_L"] = 76] = "Key_L";
        KeyCode[KeyCode["Key_M"] = 77] = "Key_M";
        KeyCode[KeyCode["Key_N"] = 78] = "Key_N";
        KeyCode[KeyCode["Key_O"] = 79] = "Key_O";
        KeyCode[KeyCode["Key_P"] = 80] = "Key_P";
        KeyCode[KeyCode["Key_Q"] = 81] = "Key_Q";
        KeyCode[KeyCode["Key_R"] = 82] = "Key_R";
        KeyCode[KeyCode["Key_S"] = 83] = "Key_S";
        KeyCode[KeyCode["Key_T"] = 84] = "Key_T";
        KeyCode[KeyCode["Key_U"] = 85] = "Key_U";
        KeyCode[KeyCode["Key_V"] = 86] = "Key_V";
        KeyCode[KeyCode["Key_W"] = 87] = "Key_W";
        KeyCode[KeyCode["Key_X"] = 88] = "Key_X";
        KeyCode[KeyCode["Key_Y"] = 89] = "Key_Y";
        KeyCode[KeyCode["Key_Z"] = 90] = "Key_Z";
        KeyCode[KeyCode["Key_KP_0"] = 96] = "Key_KP_0";
        KeyCode[KeyCode["Key_KP_1"] = 97] = "Key_KP_1";
        KeyCode[KeyCode["Key_KP_2"] = 98] = "Key_KP_2";
        KeyCode[KeyCode["Key_KP_3"] = 99] = "Key_KP_3";
        KeyCode[KeyCode["Key_KP_4"] = 100] = "Key_KP_4";
        KeyCode[KeyCode["Key_KP_5"] = 101] = "Key_KP_5";
        KeyCode[KeyCode["Key_KP_6"] = 102] = "Key_KP_6";
        KeyCode[KeyCode["Key_KP_7"] = 103] = "Key_KP_7";
        KeyCode[KeyCode["Key_KP_8"] = 104] = "Key_KP_8";
        KeyCode[KeyCode["Key_KP_9"] = 105] = "Key_KP_9";
        KeyCode[KeyCode["Key_Multiply"] = 106] = "Key_Multiply";
        KeyCode[KeyCode["Key_Add"] = 107] = "Key_Add";
        KeyCode[KeyCode["Key_Separator"] = 108] = "Key_Separator";
        KeyCode[KeyCode["Key_Subtract"] = 109] = "Key_Subtract";
        KeyCode[KeyCode["Key_Decimal"] = 110] = "Key_Decimal";
        KeyCode[KeyCode["Key_Divide"] = 111] = "Key_Divide";
        KeyCode[KeyCode["Key_F1"] = 112] = "Key_F1";
        KeyCode[KeyCode["Key_F2"] = 113] = "Key_F2";
        KeyCode[KeyCode["Key_F3"] = 114] = "Key_F3";
        KeyCode[KeyCode["Key_F4"] = 115] = "Key_F4";
        KeyCode[KeyCode["Key_F5"] = 116] = "Key_F5";
        KeyCode[KeyCode["Key_F6"] = 117] = "Key_F6";
        KeyCode[KeyCode["Key_F7"] = 118] = "Key_F7";
        KeyCode[KeyCode["Key_F8"] = 119] = "Key_F8";
        KeyCode[KeyCode["Key_F9"] = 120] = "Key_F9";
        KeyCode[KeyCode["Key_F10"] = 121] = "Key_F10";
        KeyCode[KeyCode["Key_F11"] = 122] = "Key_F11";
        KeyCode[KeyCode["Key_F12"] = 123] = "Key_F12";
        KeyCode[KeyCode["Key_F13"] = 124] = "Key_F13";
        KeyCode[KeyCode["Key_F14"] = 125] = "Key_F14";
        KeyCode[KeyCode["Key_F15"] = 126] = "Key_F15";
        KeyCode[KeyCode["Key_F16"] = 127] = "Key_F16";
        KeyCode[KeyCode["Key_F17"] = 128] = "Key_F17";
        KeyCode[KeyCode["Key_F18"] = 129] = "Key_F18";
        KeyCode[KeyCode["Key_F19"] = 130] = "Key_F19";
        KeyCode[KeyCode["Key_F20"] = 131] = "Key_F20";
        KeyCode[KeyCode["Key_F21"] = 132] = "Key_F21";
        KeyCode[KeyCode["Key_F22"] = 133] = "Key_F22";
        KeyCode[KeyCode["Key_F23"] = 134] = "Key_F23";
        KeyCode[KeyCode["Key_F24"] = 135] = "Key_F24";
        KeyCode[KeyCode["Key_Num_Lock"] = 136] = "Key_Num_Lock";
        KeyCode[KeyCode["Key_Scroll_Lock"] = 137] = "Key_Scroll_Lock";
    })(KeyCode = egret3d.KeyCode || (egret3d.KeyCode = {}));
    /**
    * @language zh_CN
    * @class egret3d.MouseEvent3D
    * @classdesc
    * KeyEvent3D 按键事件，
    * 只有Input.addEventListener 才会产生下类事件
    * @includeExample events/KeyEvent3D.ts
    * @see egret3d.Event3D
    * @see egret3d.EventDispatcher
    * @see egret3d.Input
    * @version Egret 3.0
    * @platform Web,Native
    */
    var KeyEvent3D = (function (_super) {
        __extends(KeyEvent3D, _super);
        function KeyEvent3D() {
            ///**
            //* @language zh_CN
            //* KEY_CLICK 常量定义 按键点击事件标识。
            //* 可注册对象 : Input类型。
            //* 事件响应状态 : 按键每次点击响应，按下回弹为一次点击。
            //* 响应事件参数 : KeyEvent3D类型,其中KeyEvent3D.keyCode的内容即为Key的值。
            //* @see egret3d.Input
            //* @default "onKeyClick"
            //* @version Egret 3.0
            //* @platform Web,Native
            //*/
            //public static KEY_CLICK: string = "onKeyClick";
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
            * @language zh_CN
            * 按键code值,枚举类型可以参考egret3d.KeyCode
            * @see egret3d.KeyCode
            * @default 0
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.keyCode = 0;
            return _this;
        }
        return KeyEvent3D;
    }(egret3d.Event3D));
    /**
    * @language zh_CN
    * KEY_DOWN 常量定义  按键按下事件标识。
    * 可注册对象 : Input类型。
    * 事件响应状态 : 按键每次按下时响应。
    * 响应事件参数 : KeyEvent3D类型,其中KeyEvent3D.keyCode的内容即为Key的值。
    * @see egret3d.Input
    * @default "onKeyDown"
    * @version Egret 3.0
    * @platform Web,Native
    */
    KeyEvent3D.KEY_DOWN = "onKeyDown";
    /**
    * @language zh_CN
    * KEY_UP 常量定义 按键回弹事件标识。
    * 可注册对象 : Input类型。
    * 事件响应状态 : 按键每次回弹时响应。
    * 响应事件参数 : KeyEvent3D类型,其中KeyEvent3D.keyCode的内容即为Key的值。
    * @see egret3d.Input
    * @default "onKeyUp"
    * @version Egret 3.0
    * @platform Web,Native
    */
    KeyEvent3D.KEY_UP = "onKeyUp";
    egret3d.KeyEvent3D = KeyEvent3D;
    __reflect(KeyEvent3D.prototype, "egret3d.KeyEvent3D");
})(egret3d || (egret3d = {}));
