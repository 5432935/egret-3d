var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @private
     */
    var Egret3DPerformance = (function () {
        function Egret3DPerformance() {
            this._entities = {};
            this.enable = false;
            this.prefix = "";
        }
        Object.defineProperty(Egret3DPerformance.prototype, "entities", {
            get: function () {
                return this._entities;
            },
            enumerable: true,
            configurable: true
        });
        Egret3DPerformance.prototype.getFps = function () {
            var entity = this.getEntity("fps");
            return (entity && entity.averageDelta) ? Math.floor(1000 / entity.averageDelta) : 0;
        };
        Egret3DPerformance.prototype.updateFps = function () {
            if (!this.enable) {
                return;
            }
            this.endCounter("fps");
            this.startCounter("fps", 60);
        };
        Egret3DPerformance.prototype.getNow = function () {
            if (window.performance) {
                return window.performance.now();
            }
            return new Date().getTime();
        };
        Egret3DPerformance.prototype.getEntity = function (key) {
            key = this.prefix + key;
            return this._entities[key];
        };
        Egret3DPerformance.prototype.startCounter = function (key, averageRange) {
            if (!this.enable) {
                return;
            }
            key = this.prefix + key;
            var entity = this._entities[key];
            if (!entity) {
                entity = {
                    start: 0,
                    end: 0,
                    delta: 0,
                    _cache: [],
                    averageRange: 1,
                    averageDelta: 0
                };
                this._entities[key] = entity;
            }
            entity.start = this.getNow();
            entity.averageRange = averageRange || 1;
        };
        Egret3DPerformance.prototype.endCounter = function (key) {
            if (!this.enable) {
                return;
            }
            key = this.prefix + key;
            var entity = this._entities[key];
            if (entity) {
                entity.end = this.getNow();
                entity.delta = entity.end - entity.start;
                if (entity.averageRange > 1) {
                    entity._cache.push(entity.delta);
                    var length = entity._cache.length;
                    if (length >= entity.averageRange) {
                        if (length > entity.averageRange) {
                            entity._cache.shift();
                            length--;
                        }
                        var sum = 0;
                        for (var i = 0; i < length; i++) {
                            sum += entity._cache[i];
                        }
                        entity.averageDelta = sum / length;
                    }
                }
            }
        };
        return Egret3DPerformance;
    }());
    egret3d.Egret3DPerformance = Egret3DPerformance;
    __reflect(Egret3DPerformance.prototype, "egret3d.Egret3DPerformance");
})(egret3d || (egret3d = {}));
