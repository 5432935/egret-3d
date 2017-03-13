var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    */
    var PVRFormat;
    (function (PVRFormat) {
        PVRFormat[PVRFormat["RGB_PVRTC_4BPPV1_Format"] = 2100] = "RGB_PVRTC_4BPPV1_Format";
        PVRFormat[PVRFormat["RGB_PVRTC_2BPPV1_Format"] = 2101] = "RGB_PVRTC_2BPPV1_Format";
        PVRFormat[PVRFormat["RGBA_PVRTC_4BPPV1_Format"] = 2102] = "RGBA_PVRTC_4BPPV1_Format";
        PVRFormat[PVRFormat["RGBA_PVRTC_2BPPV1_Format"] = 2103] = "RGBA_PVRTC_2BPPV1_Format";
    })(PVRFormat = egret3d.PVRFormat || (egret3d.PVRFormat = {}));
    ;
    /**
     * @private
     * @language zh_CN
     * @class egret3d.PVRParser
     * @classdesc
     * �� PVRParser �� ����.pvr �ļ�
     */
    var PVRParser = (function () {
        function PVRParser() {
        }
        /**
         * @language zh_CN
         * @param buffer
         */
        PVRParser.parse = function (buffer) {
            var texture;
            var headerLengthInt = 13;
            var header = new Uint32Array(buffer, 0, headerLengthInt);
            var pvrDatas = {
                buffer: buffer,
                header: header
            };
            // PVR v3
            if (header[0] === 0x03525650) {
                texture = PVRParser._parseV3(pvrDatas);
            }
            else if (header[11] === 0x21525650) {
                texture = PVRParser._parseV2(pvrDatas);
            }
            else {
                console.log("PVRParser unknow pvr format. PVRParser::parse");
                return texture;
            }
            texture.internalFormat = egret3d.InternalFormat.PixelArray;
            texture.colorFormat = egret3d.ContextConfig.ColorFormat_RGBA8888;
            texture.useMipmap = false;
            return texture;
        };
        PVRParser._parseV2 = function (pvrDatas) {
            var header = pvrDatas.header;
            var headerLength = header[0], height = header[1], width = header[2], numMipmaps = header[3], flags = header[4], dataLength = header[5], bpp = header[6], bitmaskRed = header[7], bitmaskGreen = header[8], bitmaskBlue = header[9], bitmaskAlpha = header[10], pvrTag = header[11], numSurfs = header[12];
            var TYPE_MASK = 0xff;
            var PVRTC_2 = 24, PVRTC_4 = 25;
            var formatFlags = flags & TYPE_MASK;
            var bpp, format;
            var _hasAlpha = bitmaskAlpha > 0;
            if (formatFlags === PVRTC_4) {
                format = _hasAlpha ? PVRFormat.RGBA_PVRTC_4BPPV1_Format : PVRFormat.RGB_PVRTC_4BPPV1_Format;
                bpp = 4;
            }
            else if (formatFlags === PVRTC_2) {
                format = _hasAlpha ? PVRFormat.RGBA_PVRTC_2BPPV1_Format : PVRFormat.RGB_PVRTC_2BPPV1_Format;
                bpp = 2;
            }
            else
                throw new Error("pvrtc - unknown format " + formatFlags);
            pvrDatas.dataPtr = headerLength;
            pvrDatas.bpp = bpp;
            pvrDatas.format = format;
            pvrDatas.width = width;
            pvrDatas.height = height;
            pvrDatas.numSurfaces = numSurfs;
            pvrDatas.numMipmaps = numMipmaps + 1;
            // guess cubemap type seems tricky in v2
            // it juste a pvr containing 6 surface (no explicit cubemap type)
            pvrDatas.isCubemap = (numSurfs === 6);
            return PVRParser._extract(pvrDatas);
        };
        PVRParser._parseV3 = function (pvrDatas) {
            var header = pvrDatas.header;
            var bpp, format;
            var metaLen = header[12], pixelFormat = header[2], height = header[6], width = header[7], numSurfs = header[9], numFaces = header[10], numMipmaps = header[11];
            switch (pixelFormat) {
                case 0:
                    bpp = 2;
                    format = PVRFormat.RGB_PVRTC_2BPPV1_Format;
                    break;
                case 1:
                    bpp = 2;
                    format = PVRFormat.RGBA_PVRTC_2BPPV1_Format;
                    break;
                case 2:
                    bpp = 4;
                    format = PVRFormat.RGB_PVRTC_4BPPV1_Format;
                    break;
                case 3:
                    bpp = 4;
                    format = PVRFormat.RGBA_PVRTC_4BPPV1_Format;
                    break;
                default:
                    throw new Error("pvrtc - unsupported PVR format " + pixelFormat);
            }
            pvrDatas.dataPtr = 52 + metaLen;
            pvrDatas.bpp = bpp;
            pvrDatas.format = format;
            pvrDatas.width = width;
            pvrDatas.height = height;
            pvrDatas.numSurfaces = numFaces;
            pvrDatas.numMipmaps = numMipmaps;
            pvrDatas.isCubemap = (numFaces === 6);
            return PVRParser._extract(pvrDatas);
        };
        PVRParser._extract = function (pvrDatas) {
            var texture = new egret3d.Texture();
            texture.width = pvrDatas.width;
            texture.height = pvrDatas.height;
            var buffer = pvrDatas.buffer;
            var dataOffset = pvrDatas.dataPtr, bpp = pvrDatas.bpp, numSurfs = pvrDatas.numSurfaces, dataSize = 0, blockSize = 0, blockWidth = 0, blockHeight = 0, widthBlocks = 0, heightBlocks = 0;
            if (bpp === 2) {
                blockWidth = 8;
                blockHeight = 4;
            }
            else {
                blockWidth = 4;
                blockHeight = 4;
            }
            blockSize = (blockWidth * blockHeight) * bpp / 8;
            texture.mimapData = [];
            //pvr.mipmaps.length = pvrDatas.numMipmaps * numSurfs;
            var mipLevel = 0;
            while (mipLevel < pvrDatas.numMipmaps) {
                var sWidth = pvrDatas.width >> mipLevel;
                var sHeight = pvrDatas.height >> mipLevel;
                widthBlocks = sWidth / blockWidth;
                heightBlocks = sHeight / blockHeight;
                // Clamp to minimum number of blocks
                if (widthBlocks < 2) {
                    widthBlocks = 2;
                }
                if (heightBlocks < 2) {
                    heightBlocks = 2;
                }
                dataSize = widthBlocks * heightBlocks * blockSize;
                for (var surfIndex = 0; surfIndex < numSurfs; surfIndex++) {
                    var byteArray = new Uint8Array(buffer, dataOffset, dataSize);
                    var mipmap = {
                        data: byteArray,
                        width: sWidth,
                        height: sHeight
                    };
                    texture.mimapData[surfIndex * pvrDatas.numMipmaps + mipLevel] = mipmap;
                    dataOffset += dataSize;
                }
                mipLevel++;
            }
            return texture;
        };
        return PVRParser;
    }());
    egret3d.PVRParser = PVRParser;
    __reflect(PVRParser.prototype, "egret3d.PVRParser");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=PVRParser.js.map