var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var nid;
(function (nid) {
    "use strict";
    /*
    * @private
    */
    var LZMAWorker = (function () {
        function LZMAWorker() {
            this.command = null;
            var _this = this;
            this.decoder = new nid.LZMA();
            addEventListener('message', function (e) {
                if (_this.command == null) {
                    _this.command = e.data;
                }
                else if (_this.command['job'] == 1) {
                    _this.command = null;
                }
                else if (_this.command['job'] == 2) {
                    _this.decode(e.data);
                }
            }, false);
        }
        LZMAWorker.prototype.decode = function (data) {
            this.time = Date.now();
            var result = this.decoder.decode(new Uint8Array(data));
            this.command['time'] = Date.now() - this.time;
            postMessage(this.command);
            postMessage(result.buffer, [result.buffer]);
        };
        return LZMAWorker;
    }());
    LZMAWorker.ENCODE = 1;
    LZMAWorker.DECODE = 2;
    nid.LZMAWorker = LZMAWorker;
    __reflect(LZMAWorker.prototype, "nid.LZMAWorker");
})(nid || (nid = {}));
/*
* @private
*/
new nid.LZMAWorker();
