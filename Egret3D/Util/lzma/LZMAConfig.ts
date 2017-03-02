module nid {
    /**
     * @private
     * LZMA Decoder
     * @author Nidin Vinayakan | nidinthb@gmail.com
     */

    export class LZMAConfig {
        static LZMA_DIC_MIN: number = (1 << 12);
        static LZMA_RES_ERROR: number = 0;
        static LZMA_RES_FINISHED_WITH_MARKER: number = 1;
        static LZMA_RES_FINISHED_WITHOUT_MARKER: number = 2;
        static kNumBitModelTotalBits: number = 11;
        static kNumMoveBits: number = 5;
        static PROB_INIT_VAL = ((1 << LZMAConfig.kNumBitModelTotalBits) / 2);//1024
        static kNumPosBitsMax: number = 4;

        static kNumStates: number = 12;
        static kNumLenToPosStates: number = 4;
        static kNumAlignBits: number = 4;
        static kStartPosModelIndex: number = 4;
        static kEndPosModelIndex: number = 14;
        static kNumFullDistances: number = (1 << (LZMAConfig.kEndPosModelIndex >>> 1));
        static kMatchMinLen: number = 2;

        static INIT_PROBS(p: Uint16Array): void {
            for (var i: number = 0; i < p.length; i++) {
                p[i] = this.PROB_INIT_VAL;
            }
        }
        static BitTreeReverseDecode(probs, numBits: number, rc: RangeDecoder, offset: number = 0): number {
            var m: number = 1;
            var symbol: number = 0;
            for (var i: number = 0; i < numBits; i++) {
                var bit: number = rc.decodeBit(probs, offset + m);
                m <<= 1;
                m += bit;
                symbol |= (bit << i);
            }
            return symbol;
        }
    }
}