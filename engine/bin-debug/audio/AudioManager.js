var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @class egret3d.AudioManager
    * @classdesc
    * AudioManager 类允许您在应用程序中 播放 HTML5 Audio 和 Web Audio。
    * @includeExample audio/AudioManager.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var AudioManager = (function () {
        /**
        * @language zh_CN
        * 创建一个新的 AudioManager 对象。
        * @version Egret 3.0
        * @platform Web,Native
        */
        function AudioManager() {
            /**
            * @language zh_CN
            * 音量，范围从 0（静音）至 1（最大幅度）。
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.volume = 1;
            this.codecs = null;
            if (this.hasAudioContext()) {
                if (typeof AudioContext !== 'undefined') {
                    this.context = new AudioContext();
                }
            }
        }
        /**
        * @language zh_CN
        * 是否支持 HTML5 Audio tag API。
        * @returns {boolean}
        * @version Egret 3.0
        * @platform Web,Native
        */
        AudioManager.prototype.hasAudio = function () {
            return (typeof Audio !== 'undefined');
        };
        /**
        * @language zh_CN
        * 是否支持 Web Audio API。
        * @returns {boolean}
        * @version Egret 3.0
        * @platform Web,Native
        */
        AudioManager.prototype.hasAudioContext = function () {
            return !!(typeof AudioContext !== 'undefined');
        };
        /**
        * @language zh_CN
        * 浏览器是否可以播放这种音频类型。
        * @param url 指向外部音频文件的 URL。
        * @param audio {HTMLAudioElement} HTMLAudio元素
        * @returns {boolean}
        * @version Egret 3.0
        * @platform Web,Native
        */
        AudioManager.prototype.isSupported = function (url, audio) {
            if (this.codecs == null) {
                if (audio == null)
                    audio = new Audio();
                this.codecs = {
                    mp3: !!audio.canPlayType('audio/mpeg;').replace(/^no$/, ''),
                    opus: !!audio.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ''),
                    ogg: !!audio.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
                    wav: !!audio.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''),
                    aac: !!audio.canPlayType('audio/aac;').replace(/^no$/, ''),
                    m4a: !!(audio.canPlayType('audio/x-m4a;') || audio.canPlayType('audio/m4a;') || audio.canPlayType('audio/aac;')).replace(/^no$/, ''),
                    mp4: !!(audio.canPlayType('audio/x-mp4;') || audio.canPlayType('audio/mp4;') || audio.canPlayType('audio/aac;')).replace(/^no$/, ''),
                    weba: !!audio.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')
                };
            }
            var ext = url.match(/^data:audio\/([^;,]+);/i);
            if (!ext) {
                ext = url.split('?', 1)[0].match(/\.([^.]+)$/);
            }
            if (ext) {
                ext = ext[1].toLowerCase();
            }
            return this.codecs[ext];
        };
        /**
        * @language zh_CN
        * 生成一个新的 Sound 对象 ，将声音数据加载到 Sound 对象中。
        * @param url {String}   指向外部音频文件的 URL。
        * @param success {Function} 一个可选的音频文件加载成功的事件处理函数。
        * @param error {Function} 一个可选的音频文件加载失败的事件处理函数。
        * @returns {Sound}
        * @version Egret 3.0
        * @platform Web,Native
        */
        AudioManager.prototype.createSound = function (url, success, error) {
            if (success === void 0) { success = null; }
            if (error === void 0) { error = null; }
            return new egret3d.Sound(url, success, error);
        };
        /**
        * @language zh_CN
        * 生成一个新的 Channel 对象来播放该声音。此方法返回 Channel 对象，访问该对象可停止声音并监控音量。
        * @param sound{Sound} 要播放的声音数据。
        * @param options{any}   ["volume":1,"loop":true volume] 回放音量, 0 到 1 ， loop 是否循环播放。
        * @returns {Channel}
        * @version Egret 3.0
        * @platform Web,Native
        */
        AudioManager.prototype.playSound = function (sound, options) {
            options = options || {};
            var channel = new egret3d.Channel(sound, options);
            channel.play();
            return channel;
        };
        /**
        * @language zh_CN
        * 生成一个新的 Channel3d 对象来播放该声音。此方法返回 Channel3d 对象，访问该对象可停止声音并监控音量。
        * @param sound {Sound}  要播放的声音数据。
        * @param position {Vector3} 在三维空间中播放的位置。
        * @param options {any} ["volume":1,"loop":true volume] 回放音量, 0 到 1 ， loop 是否循环播放。
        * @returns {Channel}
        * @version Egret 3.0
        * @platform Web,Native
        */
        AudioManager.prototype.playSound3d = function (sound, position, options) {
            options = options || {};
            var channel = new egret3d.Channel3d(sound, options);
            channel.position = position;
            if (options.volume) {
                channel.volume = options.volume;
            }
            if (options.loop) {
                channel.loop = options.loop;
            }
            if (options.maxDistance) {
                channel.maxDistance = options.maxDistance;
            }
            if (options.minDistance) {
                channel.minDistance = options.minDistance;
            }
            if (options.rollOffFactor) {
                channel.rollOffFactor = options.rollOffFactor;
            }
            channel.play();
            return channel;
        };
        Object.defineProperty(AudioManager, "instance", {
            /**
            * @language zh_CN
            * AudioManager类的单例模式，返回一个 AudioManager 对象。
            * @returns AudioManager
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                if (this._instance == null) {
                    this._instance = new AudioManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        return AudioManager;
    }());
    egret3d.AudioManager = AudioManager;
    __reflect(AudioManager.prototype, "egret3d.AudioManager");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=AudioManager.js.map