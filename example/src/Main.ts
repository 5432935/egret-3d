class Main extends egret.DisplayObject {

    constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.init, this);
    }

    private init(e: egret.Event) {
        StageMgr.Instance().init( 0xffff0000 );
    }

}