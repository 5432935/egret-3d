var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var nid;
(function (nid) {
    "use strict";
    /**
     * @private
     * LZMA Decoder
     * @author Nidin Vinayakan | nidinthb@gmail.com
     */
    var LZMA = (function () {
        function LZMA() {
            this.decoder = new nid.LzmaDecoder();
        }
        LZMA.prototype.decode = function (data) {
            this.data = data;
            //var header:Uint8Array = data.readUint8Array(13);
            var header = new Uint8Array(13);
            var i; //int
            for (i = 0; i < 13; i++) {
                header[i] = data[i];
            }
            this.decoder.decodeProperties(header);
            //console.log("lc="+this.decoder.lc+", lp="+this.decoder.lp+", pb="+this.decoder.pb);
            //console.log("Dictionary Size in properties = "+this.decoder.dictSizeInProperties);
            //console.log("Dictionary Size for decoding  = "+this.decoder.dictSize);
            //return this.ucdata;
            var unpackSize = 0; //UInt64
            var unpackSizeDefined = false;
            for (i = 0; i < 8; i++) {
                var b = header[5 + i];
                if (b != 0xFF) {
                    unpackSizeDefined = true;
                }
                unpackSize |= b << (8 * i);
            }
            this.decoder.markerIsMandatory = !unpackSizeDefined;
            if (unpackSizeDefined) {
                console.log("Uncompressed Size : " + unpackSize + " bytes");
            }
            else {
                console.log("End marker is expected");
            }
            this.decoder.rangeDec.inStream = data;
            this.decoder.create();
            // we support the streams that have uncompressed size and marker.
            var res = this.decoder.decode(unpackSizeDefined, unpackSize); //int
            //console.log("Read    ", this.decoder.rangeDec.in_pos);
            //console.log("Written ", this.decoder.outWindow.out_pos);
            if (res == nid.LZMAConfig.LZMA_RES_ERROR) {
                throw "LZMA decoding error";
            }
            else if (res == nid.LZMAConfig.LZMA_RES_FINISHED_WITHOUT_MARKER) {
            }
            else if (res == nid.LZMAConfig.LZMA_RES_FINISHED_WITH_MARKER) {
                if (unpackSizeDefined) {
                    if (this.decoder.outWindow.out_pos != unpackSize) {
                        throw "Finished with end marker before than specified size";
                    }
                }
            }
            else {
                throw "Internal Error";
            }
            if (this.decoder.rangeDec.corrupted) {
                console.log("Warning: LZMA stream is corrupted");
            }
            return this.decoder.outWindow.outStream;
        };
        return LZMA;
    }());
    nid.LZMA = LZMA;
    __reflect(LZMA.prototype, "nid.LZMA");
})(nid || (nid = {}));
//# sourceMappingURL=LZMA.js.map