var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    */
    var ParticleLifeGenerator = (function () {
        function ParticleLifeGenerator() {
            this._tiny = 0.001;
        }
        /**
        * 根据粒子的数据生成生命周期数据。
        * @private
        */
        ParticleLifeGenerator.prototype.generator = function (data) {
            //if (data.life.loop) {
            //    this._inputCount = data.property.particleCount;
            //} else {
            //    this._inputCount = 2000;
            //}
            this._inputCount = 2000;
            //reset
            this._data = data;
            this._node = data.life;
            this._burstsClone = data.emission.bursts;
            if (this._burstsClone) {
                this._burstsClone = this._burstsClone.slice();
            }
            this.planes = [];
            this.loopTime = this.circleTime = 0;
            if (this._data.emission.type == egret3d.ParticleValueType.Const) {
                this.generatorConst();
            }
            else {
                this.generatorBezier();
            }
            this.planes.sort(function (a, b) {
                return a.x - b.x;
            });
            var pt;
            var lastBornTime = 0;
            for (var _i = 0, _a = this.planes; _i < _a.length; _i++) {
                pt = _a[_i];
                this.circleTime = Math.max(this.circleTime, pt.x + pt.y);
                this.loopTime = Math.max(this.loopTime, pt.y);
                lastBornTime = pt.x;
            }
            if (lastBornTime > this.loopTime) {
                this.loopTime = lastBornTime; //不循环的粒子，这个数值没有意义。
            }
            if (this.loopTime < this._data.life.duration) {
                this.loopTime = this._data.life.duration;
            }
            this.circleTime += this._data.life.delay;
        };
        ParticleLifeGenerator.prototype.burstPlanes = function (now, next) {
            var burstItem;
            var time;
            var burstCount;
            var spliceItem;
            for (var b = 0, bCount = this._burstsClone.length; b < bCount; b++) {
                burstItem = this._burstsClone[b];
                time = burstItem.x;
                spliceItem = false;
                if (time >= now && time <= next) {
                    burstCount = Math.min(burstItem.y, this._data.property.particleCount);
                    for (var i = 0; i < burstCount; i++) {
                        this.tryCreatePlane(time);
                    }
                    spliceItem = true;
                }
                else if (time >= this._data.life.duration) {
                    spliceItem = true;
                }
                if (spliceItem) {
                    this._burstsClone.splice(b, 1);
                    b--;
                    bCount--;
                }
            }
        };
        ParticleLifeGenerator.prototype.generatorConst = function () {
            //补漏的代码，duration尽量和单个粒子的生命周期成整数倍，计算循环时间modTime的时候，会更加准确
            if (this._data.emission.type == egret3d.ParticleValueType.Const && this._data.life.type == egret3d.ParticleValueType.Const) {
                this._data.life.duration = Math.ceil(this._data.life.duration / this._data.life.max) * this._data.life.max;
            }
            //补漏结束
            var rate = this._data.emission.rate;
            if (rate == 0) {
                //不发射粒子
                while (this._burstsClone && this._burstsClone.length > 0 && this.planes.length < this._inputCount) {
                    this.burstPlanes(0, egret3d.MathUtil.MAX_VALUE);
                }
                return;
            }
            var createInterval = Math.max(1 / rate, this._tiny);
            var duration = this._data.life.duration;
            var now = 0;
            var next = createInterval;
            while (now <= this._data.life.duration && this.planes.length < this._inputCount) {
                this.tryCreatePlane(now);
                next = now + createInterval;
                //try burst
                if (this._burstsClone && this._burstsClone.length > 0) {
                    this.burstPlanes(now, next);
                }
                now = next;
            }
        };
        ParticleLifeGenerator.prototype.generatorBezier = function () {
            var frameInterval = 1 / 20;
            var duration = this._data.life.duration;
            var now = frameInterval;
            var next = now;
            var emitFloat = 0;
            var emitInt = 0;
            var emitPerTime = 0;
            while (now < duration && this.planes.length < this._inputCount) {
                emitFloat += this._data.emission.bezier.calc(now / duration) * frameInterval;
                emitInt = Math.floor(emitFloat);
                emitFloat -= emitInt;
                if (emitInt > 0) {
                    emitPerTime = frameInterval / emitInt;
                    while (emitInt > 0) {
                        next += emitPerTime;
                        this.tryCreatePlane(now);
                        //try burst
                        if (this._burstsClone && this._burstsClone.length > 0) {
                            this.burstPlanes(now, next);
                        }
                        now = next;
                        emitInt--;
                    }
                }
                else {
                    next = now + frameInterval;
                    //try burst
                    if (this._burstsClone && this._burstsClone.length > 0) {
                        this.burstPlanes(now, next);
                    }
                    now = next;
                }
            }
        };
        ParticleLifeGenerator.prototype.tryCreatePlane = function (now) {
            var liveCount = 0; //存活的数量
            var bornTime;
            var pt;
            var maxCount = this._data.property.particleCount;
            for (var i = 0, count = this.planes.length; i < count; i++) {
                pt = this.planes[i];
                bornTime = pt.x;
                if (pt.x + pt.y > now + 0.01) {
                    liveCount++;
                }
            }
            //当前存活数在范围之内
            if (liveCount < maxCount) {
                pt = new egret3d.Point(now, this.getLifeTime(now));
                this.planes.push(pt);
            }
        };
        ParticleLifeGenerator.prototype.getLifeTime = function (time) {
            var lifeType = this._data.life.type;
            var life = this._data.life;
            var value1;
            var value2;
            if (life.type == egret3d.ParticleValueType.Const) {
                value1 = value2 = life.max;
            }
            else if (life.type == egret3d.ParticleValueType.RandomConst) {
                value1 = life.max;
                value2 = life.min;
            }
            else if (life.type == egret3d.ParticleValueType.OneBezier) {
                value1 = value2 = life.bezier1.calc(time / life.duration);
            }
            else {
                value1 = life.bezier1.calc(time / life.duration);
                value2 = life.bezier2.calc(time / life.duration);
            }
            return Math.random() * (value1 - value2) + value2;
        };
        /**
        * 销毁
        * @private
        */
        ParticleLifeGenerator.prototype.dispose = function () {
            this._data = null;
            this._node = null;
            this._burstsClone = null;
            this.planes = null;
        };
        return ParticleLifeGenerator;
    }());
    egret3d.ParticleLifeGenerator = ParticleLifeGenerator;
    __reflect(ParticleLifeGenerator.prototype, "egret3d.ParticleLifeGenerator");
})(egret3d || (egret3d = {}));
