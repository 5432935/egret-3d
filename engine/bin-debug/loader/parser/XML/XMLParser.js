var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @language zh_CN
    * @class egret3d.XMLParser
    * @classdesc
    * 解析XML文件格式
    * @version Egret 3.0
    * @platform Web,Native
    */
    var XMLParser = (function () {
        function XMLParser() {
        }
        /**
        * @language zh_CN
        *
        * @param xml xml文件
        * @returns any
        */
        XMLParser.parse = function (xml) {
            var xmlDoc = null;
            ///判断浏览器的类型
            if (window["DOMParser"] && document.implementation && document.implementation.createDocument) {
                try {
                    /* DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。
                     * 要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
                     * parseFromString(text, contentType) 参数text:要解析的 XML 标记 参数contentType文本的内容类型
                     * 可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
                     */
                    var domParser = new DOMParser();
                    xmlDoc = domParser.parseFromString(xml, 'text/xml');
                }
                catch (e) {
                }
            }
            else {
                return null;
            }
            return xmlDoc;
        };
        /**
        * @private
        * @language zh_CN
        * 解析node节点的属性值
        * @version Egret 3.0
        * @platform Web,Native
        */
        XMLParser.eachXmlAttr = function (item, fun) {
            if (item == null || fun == null)
                return;
            var attr;
            for (var i = 0, count = item.attributes.length; i < count; i++) {
                attr = item.attributes[i];
                fun(attr.name, attr.value);
            }
        };
        return XMLParser;
    }());
    egret3d.XMLParser = XMLParser;
    __reflect(XMLParser.prototype, "egret3d.XMLParser");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=XMLParser.js.map