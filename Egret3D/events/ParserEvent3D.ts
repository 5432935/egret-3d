module egret3d {

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
    export class ParserEvent3D extends Event3D {

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
        public static PARSER_COMPLETE: string = "onParserComplete";

        /**
        * @language zh_CN
        * 解析对象
        * @see egret3d.ParserUtils
        * @version Egret 3.0
        * @platform Web,Native
        */
        public parser: ParserUtils;
    }
} 