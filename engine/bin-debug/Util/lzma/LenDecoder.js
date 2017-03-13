var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var nid;
(function (nid) {
    /**
     * @private
     * LZMA Decoder
     * @author Nidin Vinayakan | nidinthb@gmail.com
     */
    var LenDecoder = (function () {
        function LenDecoder() {
            this.lowCoder = nid.BitTreeDecoder.constructArray(3, 1 << nid.LZMAConfig.kNumPosBitsMax);
            this.midCoder = nid.BitTreeDecoder.constructArray(3, 1 << nid.LZMAConfig.kNumPosBitsMax);
            this.highCoder = new nid.BitTreeDecoder(8);
        }
        LenDecoder.prototype.init = function () {
            this.choice = [nid.LZMAConfig.PROB_INIT_VAL, nid.LZMAConfig.PROB_INIT_VAL];
            this.highCoder.init();
            for (var i = 0; i < (1 << nid.LZMAConfig.kNumPosBitsMax); i++) {
                this.lowCoder[i].init();
                this.midCoder[i].init();
            }
        };
        LenDecoder.prototype.decode = function (rc, posState) {
            if (rc.decodeBit(this.choice, 0) == 0) {
                return this.lowCoder[posState].decode(rc);
            }
            if (rc.decodeBit(this.choice, 1) == 0) {
                return 8 + this.midCoder[posState].decode(rc);
            }
            return 16 + this.highCoder.decode(rc);
        };
        return LenDecoder;
    }());
    nid.LenDecoder = LenDecoder;
    __reflect(LenDecoder.prototype, "nid.LenDecoder");
})(nid || (nid = {}));
//# sourceMappingURL=LenDecoder.js.map