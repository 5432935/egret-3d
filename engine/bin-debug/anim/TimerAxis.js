var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    */
    var TimerAxis = (function (_super) {
        __extends(TimerAxis, _super);
        function TimerAxis() {
            var _this = _super.call(this) || this;
            _this._timeEvent = new egret3d.Event3D();
            _this._times = new Array();
            _this._processTimes = new Array();
            _this._timer = 0;
            _this._start = false;
            return _this;
        }
        TimerAxis.prototype.start = function () {
            this._timer = 0;
            this._start = true;
            this._processTimes.length = 0;
            for (var i = 0; i < this._times.length; ++i) {
                this._processTimes[i] = this._times[i];
            }
        };
        TimerAxis.prototype.addTimerAxis = function (time) {
            this._times.push(time);
        };
        TimerAxis.prototype.clearTimerAxis = function () {
            this._times.length = 0;
            this._processTimes.length = 0;
        };
        TimerAxis.prototype.reset = function () {
            this._processTimes.length = 0;
            this._timer = 0;
            this._start = false;
            for (var i = 0; i < this._times.length; ++i) {
                this._processTimes[i] = this._times[i];
            }
        };
        TimerAxis.prototype.update = function (delay, time) {
            if (!this._start) {
                return;
            }
            this._timer += delay;
            console.log(this._timer + "update");
            for (var i = 0; i < this._processTimes.length; ++i) {
                if (this._timer >= this._processTimes[i]) {
                    this._timeEvent.eventType = TimerAxis.TIME_EVENT;
                    this._timeEvent.data = this._processTimes[i];
                    this.dispatchEvent(this._timeEvent);
                    this._processTimes.splice(i, 1);
                    break;
                }
            }
        };
        return TimerAxis;
    }(egret3d.EventDispatcher));
    TimerAxis.TIME_EVENT = "TimeEvent";
    egret3d.TimerAxis = TimerAxis;
    __reflect(TimerAxis.prototype, "egret3d.TimerAxis");
})(egret3d || (egret3d = {}));
