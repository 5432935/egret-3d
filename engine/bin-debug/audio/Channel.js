var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @language zh_CN
     * @class egret3d.Channel
     * @classdesc
     * Channel 类控制应用程序中的声音，对声音执行更精细的控制。每个声音均分配给一个声道，而且应用程序可以具有混合在一起的多个声道。
     * @version Egret 3.0
     * @platform Web,Native
     */
    var Channel = (function () {
        /**
        * @language zh_CN
        * 创建一个新的 Channel 对象。
        * @param sound {Sound} Sound 对象 音频的数据源。
        * @param {Object} options {any} ["volume":1,"loop":true volume] 回放音量, 0 到 1 ， loop 是否循环播放。
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Channel(sound, options) {
            /**
            * @language zh_CN
            * 音量，范围从 0（静音）至 1（最大幅度）。
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.volume = 1.0;
            /**
            * @language zh_CN
            * 是否循环播放 使声音播放结束时重新开始播放。
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.loop = false;
            /**
            * @language zh_CN
            * 当前播放速度。1.0 正常速度。0.5 半速（更慢）。2.0 倍速（更快）。-1.0 向后。正常速度。-0.5 向后，半速。
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.pitch = 1.0;
            options = options || {};
            if (options.volume)
                this.volume = options.volume;
            if (options.loop)
                this.loop = options.loop;
            if (options.pitch)
                this.pitch = options.pitch;
            this.sound = sound;
            this.paused = false;
            if (egret3d.AudioManager.instance.hasAudioContext()) {
                this.context = egret3d.AudioManager.instance.context;
                this.startTime = 0;
                this.startOffset = 0;
                this.source = null;
                this.gain = this.context.createGain();
            }
            else if (egret3d.AudioManager.instance.hasAudio()) {
                if (this.sound.audio) {
                    this.source = this.sound.audio.cloneNode(false);
                    this.source.pause();
                }
            }
        }
        /**
        * @language zh_CN
        * 开始在该声道中播放声音。
        * @version Egret 3.0
        * @platform Web,Native
        */
        Channel.prototype.play = function () {
            if (egret3d.AudioManager.instance.hasAudioContext()) {
                if (this.source) {
                    throw new Error("Call stop() before calling play()");
                }
                this.createSource();
                if (!this.source) {
                    return;
                }
                this.startTime = this.context.currentTime;
                this.source.start(0, this.startOffset % this.source.buffer.duration);
            }
            else if (egret3d.AudioManager.instance.hasAudio) {
                this.paused = false;
                this.source.play();
            }
            this.setVolume(this.volume);
            this.setLoop(this.loop);
            this.setPitch(this.pitch);
        };
        /**
        * @language zh_CN
        * 暂停在该声道中播放声音。
        * @version Egret 3.0
        * @platform Web,Native
        */
        Channel.prototype.pause = function () {
            if (egret3d.AudioManager.instance.hasAudioContext()) {
                if (this.source) {
                    this.startOffset += this.context.currentTime - this.startTime;
                    this.source.stop(0);
                    this.source = null;
                }
            }
            else if (egret3d.AudioManager.instance.hasAudio()) {
                if (this.source) {
                    this.source.pause();
                }
            }
            this.paused = true;
        };
        /**
        * @language zh_CN
        * 从暂停的位置继续在该声道中播放声音。
        * @version Egret 3.0
        * @platform Web,Native
        */
        Channel.prototype.unpause = function () {
            if (egret3d.AudioManager.instance.hasAudioContext()) {
                if (this.source || !this.paused) {
                    throw new Error('Call pause() before unpausing.');
                }
                this.createSource();
                if (!this.source) {
                    return;
                }
                this.startTime = this.context.currentTime;
                this.source.start(0, this.startOffset % this.source.buffer.duration);
                // Initialize volume and loop
                this.setVolume(this.volume);
                this.setLoop(this.loop);
                this.setPitch(this.pitch);
            }
            else if (egret3d.AudioManager.instance.hasAudio()) {
                this.source.play();
            }
            this.paused = false;
        };
        /**
        * @language zh_CN
        * 停止在该声道中播放声音。
        * @version Egret 3.0
        * @platform Web,Native
        */
        Channel.prototype.stop = function () {
            if (egret3d.AudioManager.instance.hasAudioContext()) {
                if (this.source) {
                    this.source.stop(0);
                    this.startOffset = 0;
                    this.source = null;
                }
            }
            else if (egret3d.AudioManager.instance.hasAudio()) {
                if (this.source) {
                    this.source.pause();
                    this.source.currentTime = 0;
                }
            }
        };
        Channel.prototype.setLoop = function (value) {
            if (this.source) {
                this.source.loop = value;
            }
        };
        Channel.prototype.setVolume = function (value) {
            if (this.gain) {
                this.gain.gain.value = value * egret3d.AudioManager.instance.volume;
            }
            else if (this.source) {
                this.source.volume = value * egret3d.AudioManager.instance.volume;
            }
        };
        Channel.prototype.setPitch = function (value) {
            if (egret3d.AudioManager.instance.hasAudioContext()) {
                if (this.source) {
                    this.source.playbackRate.value = value;
                }
            }
            else if (egret3d.AudioManager.instance.hasAudio()) {
                if (this.source) {
                    this.source.playbackRate = value;
                }
            }
        };
        /**
        * @language zh_CN
        * 是否正在播放。
        * @returns {boolean}
        * @version Egret 3.0
        * @platform Web,Native
        */
        Channel.prototype.isPlaying = function () {
            if (egret3d.AudioManager.instance.hasAudioContext()) {
                return (!this.paused);
            }
            else if (egret3d.AudioManager.instance.hasAudio()) {
                return (!this.source.paused);
            }
        };
        /**
        * @language zh_CN
        * 获取音频持续时间。
        * @returns {number}
        * @version Egret 3.0
        * @platform Web,Native
        */
        Channel.prototype.getDuration = function () {
            if (egret3d.AudioManager.instance.hasAudioContext()) {
                if (this.source) {
                    return this.source.buffer.duration;
                }
            }
            else if (egret3d.AudioManager.instance.hasAudio()) {
                if (this.source) {
                    var d = this.source.duration;
                    if (d === d) {
                        return d;
                    }
                }
            }
            return 0;
        };
        Channel.prototype.createSource = function () {
            var _this = this;
            if (this.sound.buffer) {
                this.source = this.context.createBufferSource();
                this.source.buffer = this.sound.buffer;
                this.source.connect(this.gain);
                this.gain.connect(this.context.destination);
                if (this.loop) {
                    this.source.onended = function () { return _this.play(); };
                }
            }
        };
        return Channel;
    }());
    egret3d.Channel = Channel;
    __reflect(Channel.prototype, "egret3d.Channel");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Channel.js.map