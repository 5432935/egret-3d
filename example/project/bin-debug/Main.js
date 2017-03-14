var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.list = [
            //Geometry
            "CubeSample"
        ];
        _this.once(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    Main.prototype.init = function (e) {
        // 某个示例的调用方式，工程url添加后缀：?sample=sampleName
        new window[this.getCurrentTest()]();
    };
    Main.prototype.getCurrentTest = function () {
        var appFile;
        var hasTest = false;
        var str = location.search;
        str = str.slice(1, str.length);
        var totalArray = str.split("&");
        for (var i = 0; i < totalArray.length; i++) {
            var itemArray = totalArray[i].split("=");
            if (itemArray.length == 2) {
                var key = itemArray[0];
                var value = itemArray[1];
                if (key == "sample") {
                    appFile = value;
                    hasTest = true;
                    break;
                }
            }
        }
        if (!hasTest) {
            appFile = this.list[0];
        }
        return appFile;
    };
    return Main;
}(egret.DisplayObject));
__reflect(Main.prototype, "Main");
