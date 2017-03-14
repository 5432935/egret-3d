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
     * @language zh_CN
     * @class egret3d.Channel3d
     * @classdesc
     * Channel3d 类控制应用程序中 在三维空间中播放的声音。每个声音均分配给一个声道，而且应用程序可以具有混合在一起的多个声道。
     * @version Egret 3.0
     * @platform Web,Native
     */
    var Channel3d = (function (_super) {
        __extends(Channel3d, _super);
        /**
        * @language zh_CN
        * 构造函数
        * 创建一个新的 Channel3d 对象。
        * @param sound {Sound} Sound 对象 音频的数据源。
        * @param {Object} options {any} ["volume":1,"loop":true volume] 回放音量, 0 到 1 ， loop 是否循环播放。
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Channel3d(sound, options) {
            var _this = _super.call(this, sound, options) || this;
            _this._position = new egret3d.Vector3();
            _this._velocity = new egret3d.Vector3();
            if (egret3d.AudioManager.instance.hasAudioContext())
                _this._panner = _this.context.createPanner();
            _this._maxDistance = 10000; // default maxDistance
            _this._minDistance = 1;
            _this._rollOffFactor = 1;
            _this._listener = new egret3d.Vector3();
            return _this;
        }
        Object.defineProperty(Channel3d.prototype, "listener", {
            /**
            * @language zh_CN
            * 返回监听者位置。
            * @returns Vector3 监听者位置。
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._listener;
            },
            /**
            * @language zh_CN
            * 设置监听者位置。
            * @param value Vector3监听者位置。
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._listener.copyFrom(value);
                if (egret3d.AudioManager.instance.hasAudio()) {
                    if (this.source) {
                        var factor = this.fallOff(this._listener, this.position, this.minDistance, this.maxDistance, this.rollOffFactor);
                        this.source.volume = this.volume * factor;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Channel3d.prototype, "position", {
            /**
            * @language zh_CN
            * 三维空间中的位置。
            * @returns {Vector3}
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._position;
            },
            /**
            * @language zh_CN
            * 三维空间中的位置。
            * @param opsition {Vector3}
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (position) {
                this._position.copyFrom(position);
                if (egret3d.AudioManager.instance.hasAudioContext()) {
                    this._panner.setPosition(position.x, position.y, position.z);
                }
                if (egret3d.AudioManager.instance.hasAudio()) {
                    if (this.source) {
                        var factor = this.fallOff(this._listener, this.position, this.minDistance, this.maxDistance, this.rollOffFactor);
                        this.source.volume = this.volume * factor;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Channel3d.prototype, "velocity", {
            /**
            * @language zh_CN
            * 传播方向。
            * @returns {Vector3}
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._velocity;
            },
            /**
            * @language zh_CN
            * 传播方向。
            * @param velocity {Vector3}
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (velocity) {
                this._velocity.copyFrom(velocity);
                if (egret3d.AudioManager.instance.hasAudioContext())
                    this._panner.setVelocity(velocity.x, velocity.y, velocity.z);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Channel3d.prototype, "maxDistance", {
            /**
            * @language zh_CN
            * 最大距离。
            * @returns {Vector3}
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._maxDistance;
            },
            /**
            * @language zh_CN
            * 最大距离，超出这个距离会听不见声音
            * @param max{Number}
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (max) {
                this._maxDistance = max;
                if (egret3d.AudioManager.instance.hasAudioContext())
                    this._panner.maxDistance = max;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Channel3d.prototype, "minDistance", {
            /**
            * @language zh_CN
            * 最小距离。
            * @returns {Vector3}
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._minDistance;
            },
            /**
            * @language zh_CN
            * 最小距离。
            * @param min{Number}
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (min) {
                this._minDistance = min;
                if (egret3d.AudioManager.instance.hasAudioContext())
                    this._panner.refDistance = min;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Channel3d.prototype, "rollOffFactor", {
            /**
            * @language zh_CN
            * rollOff 系数。
            * @returns {Number}
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._rollOffFactor;
            },
            /**
            * @language zh_CN
            * rollOff 系数。
            * @param factor {Number}
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (factor) {
                this._rollOffFactor = factor;
                if (this._panner)
                    this._panner.rolloffFactor = factor;
            },
            enumerable: true,
            configurable: true
        });
        Channel3d.prototype.createSource = function () {
            if (this.sound.buffer) {
                this.source = this.context.createBufferSource();
                this.source.buffer = this.sound.buffer;
                // Connect up the nodes
                this.source.connect(this._panner);
                this._panner.connect(this.gain);
                this.gain.connect(this.context.destination);
            }
        };
        // Fall off function which should be the same as the one in the Web Audio API,
        // taken from OpenAL
        Channel3d.prototype.fallOff = function (posOne, posTwo, refDistance, maxDistance, rolloffFactor) {
            var distance = egret3d.Vector3.distance(posOne, posTwo);
            if (distance < refDistance) {
                return 1;
            }
            else if (distance > maxDistance) {
                return 0;
            }
            else {
                //var numerator = refDistance + (rolloffFactor * (distance - refDistance));
                //if (numerator !== 0) {
                //    return refDistance / numerator;
                //} else {
                //    return 1;
                //}
                return 1 - distance / (maxDistance - refDistance);
            }
        };
        return Channel3d;
    }(egret3d.Channel));
    egret3d.Channel3d = Channel3d;
    __reflect(Channel3d.prototype, "egret3d.Channel3d");
})(egret3d || (egret3d = {}));
