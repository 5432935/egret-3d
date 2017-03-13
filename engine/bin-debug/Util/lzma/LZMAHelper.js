var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var nid;
(function (nid) {
    //import LZMA = nid.LZMA;
    /*
    * @private
    */
    var LZMAHelper = (function () {
        function LZMAHelper() {
        }
        LZMAHelper.init = function () {
            var command = 0;
            //LZMAHelper.decoderAsync.onmessage = function(e){
            //    if(command == 0){
            //        command = e.data;
            //    }else if(command == LZMAHelper.ENCODE){
            //        command = 0;//encode not implemented
            //    }else if(command == LZMAHelper.DECODE){
            //        command = 0;
            //        LZMAHelper.callback(e.data);
            //        LZMAHelper.callback = null;
            //    }
            //}
        };
        LZMAHelper.encode = function (data) {
            return null;
        };
        LZMAHelper.decode = function (data) {
            return LZMAHelper.decoder.decode(new Uint8Array(data)).buffer;
        };
        LZMAHelper.encodeAsync = function (data, _callback) {
            //��ʱû֧�� ѹ��
        };
        LZMAHelper.decodeAsync = function (data, _callback) {
            if (LZMAHelper.callback == null) {
                LZMAHelper.callback = _callback;
            }
            else {
                console.log('Warning! Another LZMA decoding is running...');
            }
        };
        return LZMAHelper;
    }());
    LZMAHelper.decoder = new nid.LZMA();
    LZMAHelper.ENCODE = 1;
    LZMAHelper.DECODE = 2;
    nid.LZMAHelper = LZMAHelper;
    __reflect(LZMAHelper.prototype, "nid.LZMAHelper");
})(nid || (nid = {}));
nid.LZMAHelper.init();
//# sourceMappingURL=LZMAHelper.js.map