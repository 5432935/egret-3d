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
     * @class egret3d.Sound
     * @classdesc
     * Sound 类允许您在应用程序中使用声音。</p>
     * 使用 Sound 类可以创建 Sound 对象、将外部 MP3 文件加载到该对象并播放该文件、关闭声音流，以及访问有关声音的数据，如有关流中字节数和 ID3 元数据的信息。</p>
     * 可通过以下项对声音执行更精细的控制：声音源（声音的 Channel 和 Channel3d）用于控制向计算机扬声器输出声音的属性。  </p>
     * @see egret3d.EventDispatcher
     * @version Egret 3.0
     * @platform Web,Native
     */
    var Sound = (function (_super) {
        __extends(Sound, _super);
        /**
        * @language zh_CN
        * 创建一个新的 Sound 对象。一旦某个 Sound 对象加载完成声音文件，就不能再将另一个声音文件加载到该 Sound 对象中。要加载另一个声音文件，请创建新的 Sound 对象。
        * @param {String}   指向外部音频文件的 URL。
        * @param {Function} 一个可选的音频文件加载成功的事件处理函数。
        * @param {Function} 一个可选的音频文件加载失败的事件处理函数。
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Sound(url, success, error) {
            if (success === void 0) { success = null; }
            if (error === void 0) { error = null; }
            var _this = _super.call(this) || this;
            /**
            * @language zh_CN
            * HTML音频 数据源。
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.audio = null;
            _this._event = new egret3d.Event3D();
            _this._success = success;
            _this._error = error;
            _this.isLoaded = false;
            if (egret3d.AudioManager.instance.hasAudioContext()) {
                if (!egret3d.AudioManager.instance.isSupported(url, _this.audio)) {
                    console.warn('Audio format not supported');
                    _this._event.eventType = Sound.SOUND_ERROR;
                    _this._event.target = _this;
                    _this.dispatchEvent(_this._event);
                    error(_this);
                }
                else {
                    if (egret3d.AudioManager.instance.context) {
                        _this.loadAudioFile(url);
                    }
                }
            }
            else if (egret3d.AudioManager.instance.hasAudio()) {
                try {
                    _this.audio = new Audio();
                }
                catch (e) {
                    console.warn("No support for Audio element");
                    _this._event.eventType = Sound.SOUND_ERROR;
                    _this._event.target = _this;
                    _this.dispatchEvent(_this._event);
                    if (error)
                        error(_this);
                    return _this;
                }
                if (!egret3d.AudioManager.instance.isSupported(url, _this.audio)) {
                    console.warn('Audio format not supported');
                    _this._event.eventType = Sound.SOUND_ERROR;
                    _this._event.target = _this;
                    _this.dispatchEvent(_this._event);
                    if (error)
                        error(_this);
                }
                else {
                    _this.audio.src = url;
                    _this.audio.addEventListener("canplaythrough", function (ev) { return _this.oncanplaythrough(ev); });
                    _this.audio.addEventListener("ended", function (ev) { return _this.onended(ev); });
                    _this.audio.load();
                }
            }
            return _this;
        }
        Object.defineProperty(Sound.prototype, "buffer", {
            /**
            * @language zh_CN
            * Web音频 数据源。
            * @returns {AudioBuffer}
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._buffer;
            },
            enumerable: true,
            configurable: true
        });
        Sound.prototype.loadAudioFile = function (url) {
            var _this = this;
            if (this.xhr == null)
                this.xhr = new XMLHttpRequest(); //通过XHR下载音频文件
            this.xhr.open('GET', url, true);
            this.xhr.responseType = 'arraybuffer';
            this.xhr.onload = function (e) { return _this.audioLoadend(e); };
            this.xhr.send();
        };
        Sound.prototype.audioLoadend = function (e) {
            var _this = this;
            egret3d.AudioManager.instance.context.decodeAudioData(this.xhr.response, function (buffer) { return _this.decodeSuccessCallback(buffer); });
        };
        Sound.prototype.decodeSuccessCallback = function (buffer) {
            this._buffer = buffer;
            this._event.eventType = Sound.SOUND_SUCCESS;
            this._event.target = this;
            this._event.data = buffer;
            this.dispatchEvent(this._event);
            if (this._success) {
                this._success(this);
            }
        };
        Sound.prototype.onended = function (ev) {
        };
        Sound.prototype.oncanplaythrough = function (ev) {
            if (!this.isLoaded) {
                this.isLoaded = true;
                this._event.eventType = Sound.SOUND_SUCCESS;
                this._event.target = this;
                this._event.data = ev;
                this.dispatchEvent(this._event);
                if (this._success) {
                    this._success(this);
                }
            }
        };
        return Sound;
    }(egret3d.EventDispatcher));
    /**
    * @language zh_CN
    * Sound 加載成功事件
    * @version Egret 3.0
    * @platform Web,Native
    */
    Sound.SOUND_SUCCESS = "SoundSuccess";
    /**
    * @language zh_CN
    * Sound 加載失敗事件
    * @version Egret 3.0
    * @platform Web,Native
    */
    Sound.SOUND_ERROR = "SoundError";
    egret3d.Sound = Sound;
    __reflect(Sound.prototype, "egret3d.Sound");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Sound.js.map