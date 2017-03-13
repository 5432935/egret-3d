var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /*
    * @private
    */
    var Reference = (function () {
        function Reference() {
            this.count = 0;
        }
        Reference.prototype.incRef = function () {
            this.count++;
        };
        Reference.prototype.decRef = function () {
            if (this.count - 1 >= 0) {
                this.count--;
            }
        };
        Object.defineProperty(Reference.prototype, "isDispose", {
            get: function () {
                return this.count <= 0;
            },
            enumerable: true,
            configurable: true
        });
        return Reference;
    }());
    egret3d.Reference = Reference;
    __reflect(Reference.prototype, "egret3d.Reference");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Reference.js.map