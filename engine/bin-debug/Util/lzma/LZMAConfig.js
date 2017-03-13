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
    var LZMAConfig = (function () {
        function LZMAConfig() {
        }
        LZMAConfig.INIT_PROBS = function (p) {
            for (var i = 0; i < p.length; i++) {
                p[i] = this.PROB_INIT_VAL;
            }
        };
        LZMAConfig.BitTreeReverseDecode = function (probs, numBits, rc, offset) {
            if (offset === void 0) { offset = 0; }
            var m = 1;
            var symbol = 0;
            for (var i = 0; i < numBits; i++) {
                var bit = rc.decodeBit(probs, offset + m);
                m <<= 1;
                m += bit;
                symbol |= (bit << i);
            }
            return symbol;
        };
        return LZMAConfig;
    }());
    LZMAConfig.LZMA_DIC_MIN = (1 << 12);
    LZMAConfig.LZMA_RES_ERROR = 0;
    LZMAConfig.LZMA_RES_FINISHED_WITH_MARKER = 1;
    LZMAConfig.LZMA_RES_FINISHED_WITHOUT_MARKER = 2;
    LZMAConfig.kNumBitModelTotalBits = 11;
    LZMAConfig.kNumMoveBits = 5;
    LZMAConfig.PROB_INIT_VAL = ((1 << LZMAConfig.kNumBitModelTotalBits) / 2); //1024
    LZMAConfig.kNumPosBitsMax = 4;
    LZMAConfig.kNumStates = 12;
    LZMAConfig.kNumLenToPosStates = 4;
    LZMAConfig.kNumAlignBits = 4;
    LZMAConfig.kStartPosModelIndex = 4;
    LZMAConfig.kEndPosModelIndex = 14;
    LZMAConfig.kNumFullDistances = (1 << (LZMAConfig.kEndPosModelIndex >>> 1));
    LZMAConfig.kMatchMinLen = 2;
    nid.LZMAConfig = LZMAConfig;
    __reflect(LZMAConfig.prototype, "nid.LZMAConfig");
})(nid || (nid = {}));
//# sourceMappingURL=LZMAConfig.js.map