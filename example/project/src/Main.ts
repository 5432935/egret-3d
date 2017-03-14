class Main extends egret.DisplayObject {

    constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.init, this);
    }

    private init(e: egret.Event) {
        // 某个示例的调用方式，工程url添加后缀：?sample=sampleName
        new window[this.getCurrentTest()]();
    }

    private list = [
        //Geometry
        "CubeSample"
    ];

    private getCurrentTest() {
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
    }

}