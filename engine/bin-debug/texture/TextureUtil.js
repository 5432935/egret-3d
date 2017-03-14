var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @class egret3d.TextureUtil
     * @private
     * @classdesc
     * TextureUtil
     *
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample texture/TextureUtil.ts
     */
    var TextureUtil = (function () {
        function TextureUtil() {
        }
        /**
         * @language zh_CN
         * 获取纹理数据
         * @private
         * @param image
         * @returns HTMLCanvasElement
         */
        TextureUtil.getTextureData = function (image) {
            var width = 1024; //image["width"];
            var height = 1024; //image["height"];
            TextureUtil.canvas2D.width = width;
            TextureUtil.canvas2D.height = height;
            TextureUtil.context2D.clearRect(0, 0, width, height);
            TextureUtil.context2D.drawImage(image, 0, 0, width, height, 0, 0, width, height);
            return TextureUtil.canvas2D;
        };
        /**
         * @language zh_CN
         * @private
         */
        TextureUtil.regist = function () {
            if (!TextureUtil.canvas2D) {
                TextureUtil.canvas2D = document.getElementById("TextureCanvasUtil");
                if (!TextureUtil.context2D) {
                    TextureUtil.canvas2D = document.createElement("canvas");
                    TextureUtil.canvas2D.id = "TextureCanvasUtil";
                    TextureUtil.canvas2D.hidden = true;
                    document.body.appendChild(TextureUtil.canvas2D);
                    TextureUtil.context2D = TextureUtil.canvas2D.getContext("2d");
                }
            }
        };
        /**
         * @language zh_CN
         * 生成MipMap
         * @param source  未生成MipMap的MipmapData对象
         */
        TextureUtil.generateMipMaps = function (source) {
            var minW = 1;
            var minH = 1;
            var w = Math.ceil(source.width / 2);
            var h = Math.ceil(source.height / 2);
            var mipmaps = new Array();
            mipmaps.push(source);
            var mipmap;
            while (w >= minW || h >= minH) {
                mipmap = new egret3d.MipmapData(getHalfArray(source.data), w, h);
                w >>= 1;
                h >>= 1;
                source = mipmap;
            }
            function getHalfArray(ary) {
                var result = new Uint8Array(Math.ceil(ary.length / 2));
                var index = 0;
                for (var i = 0; i < ary.length; i++) {
                    if (i % 2 == 0) {
                        result[index++] = ary[i];
                    }
                }
                return result;
            }
        };
        return TextureUtil;
    }());
    egret3d.TextureUtil = TextureUtil;
    __reflect(TextureUtil.prototype, "egret3d.TextureUtil");
})(egret3d || (egret3d = {}));
