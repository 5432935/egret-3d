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
    * @private
    * @language zh_CN
    * @class egret3d.ParserEvent3D
    * @classdesc
    * ParserEvent3D 使用ParserUtils加载资源的事件返回对象
    * @see egret3d.Event3D
    * @see egret3d.EventDispatcher
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ParserEvent3D = (function (_super) {
        __extends(ParserEvent3D, _super);
        function ParserEvent3D() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ParserEvent3D;
    }(egret3d.Event3D));
    /**
     * @language zh_CN
     * PARSER_COMPLETE 常量定义 egret3d资源加载完成事件标识符。
     * 可注册对象 : ParserUtils类型。
     * 事件响应状态 : gret3d资源加载完成时触发。
     * 响应事件参数 : ParserEvent3D类型,其中ParserEvent3D.parser的内容即为此次解析对象。
     * @see egret3d.ParserUtils
     * @version Egret 3.0
     * @platform Web,Native
     */
    ParserEvent3D.PARSER_COMPLETE = "onParserComplete";
    egret3d.ParserEvent3D = ParserEvent3D;
    __reflect(ParserEvent3D.prototype, "egret3d.ParserEvent3D");
})(egret3d || (egret3d = {}));
