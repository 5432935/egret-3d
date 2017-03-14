var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @class egret3d.Debug
    * @classdesc
    * 调试面板
    */
    var Debug = (function () {
        /**
         * @language zh_CN
         * 构造
         */
        function Debug() {
            this.isDebug = false;
            this._console = document.createElement('console');
            document.body.appendChild(this._console);
            this._console.style.color = "red";
            this._console.style.zIndex = "1000";
            this._console.style.position = "absolute";
            this._console.style.top = "10px";
            this._console.style.left = "10px";
        }
        /**
         * @language zh_CN
         * 输出调试信息
         * @param parameters
         */
        Debug.prototype.trace = function () {
            var parameters = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                parameters[_i] = arguments[_i];
            }
            if (this.isDebug) {
                this.reset();
                var len = parameters.length;
                for (var i = 0; i < len; i++) {
                    this._console.innerHTML += parameters[i] + "</br>";
                }
            }
        };
        /**
         * @language zh_CN
         * 重置显示数据
         */
        Debug.prototype.reset = function () {
            this._console.innerHTML = "";
        };
        Object.defineProperty(Debug, "instance", {
            /**
             * @language zh_CN
             * 取到当前Debug单例对象
             */
            get: function () {
                if (this._instance == null) {
                    this._instance = new Debug();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        return Debug;
    }());
    Debug._instance = null;
    egret3d.Debug = Debug;
    __reflect(Debug.prototype, "egret3d.Debug");
})(egret3d || (egret3d = {}));
