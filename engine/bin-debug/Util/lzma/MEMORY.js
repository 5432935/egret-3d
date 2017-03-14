var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var nid;
(function (nid) {
    /*
    * @private
    */
    var MEMORY = (function () {
        function MEMORY() {
        }
        MEMORY.allocateUint8 = function (len) {
            MEMORY.u8 = new Uint8Array(len);
        };
        MEMORY.allocateUint16 = function (len) {
            MEMORY.u16 = new Uint16Array(len);
        };
        MEMORY.allocateUint32 = function (len) {
            MEMORY.u32 = new Uint32Array(len);
        };
        MEMORY.reset = function () {
            MEMORY.u8Index = 0;
            MEMORY.u16Index = 0;
            MEMORY.u32Index = 0;
        };
        MEMORY.getUint8 = function () {
            if (!MEMORY.u8) {
                MEMORY.allocateUint8(10);
            }
            return MEMORY.u8Index++;
        };
        MEMORY.getUint16 = function () {
            if (!MEMORY.u16) {
                MEMORY.allocateUint16(24);
            }
            return MEMORY.u16Index++;
        };
        MEMORY.getUint32 = function () {
            if (!MEMORY.u32) {
                MEMORY.allocateUint32(10);
            }
            return MEMORY.u32Index++;
        };
        return MEMORY;
    }());
    MEMORY.u8Index = 0;
    MEMORY.u16Index = 0;
    MEMORY.u32Index = 0;
    nid.MEMORY = MEMORY;
    __reflect(MEMORY.prototype, "nid.MEMORY");
})(nid || (nid = {}));
