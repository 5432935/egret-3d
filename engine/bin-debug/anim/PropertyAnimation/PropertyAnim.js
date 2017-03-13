var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @class egret3d.PropertyAnim
    * @classdesc
    * PropertyAnim 类为曲线动画驱动器，类中保存了各个属性对应的数值曲线数据，通过时间计算某个属性在某时刻的属性数值
    *
    * @includeExample anim/PropertyAnimation/PropertyAnim.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var PropertyAnim = (function () {
        function PropertyAnim() {
            this.frameRate = 16;
            /**
            * @language zh_CN
            * 播放速度
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.speed = 1;
            /**
            * @language zh_CN
            * 是否循环
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.isLoop = true;
            /**
            * @language zh_CN
            * 动画名字
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.name = "";
            this._propertyArray = [];
            this._play = false;
            this._totalTime = 0;
            this._changeFrameTime = 0;
            this._oldFrameIndex = 0;
            this.totalTime = 0;
        }
        /**
        * @language zh_CN
        * 是否存在某个属性的曲线动画
        * @returns boolean 是否存在
        * @version Egret 3.0
        * @platform Web,Native
        */
        PropertyAnim.prototype.IsExist = function (property) {
            for (var i = 0; i < this._propertyArray.length; i++) {
                if (this._propertyArray[i].property == property) {
                    return true;
                }
            }
            return false;
        };
        /**
        * @language zh_CN
        * 添加曲线动画数据
        * @param property 属性名  控制 Object3D对象的属性
        * @param keyFrames 曲线动画帧
        * @returns boolean 是否成功
        * @see egret3d.Object3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        PropertyAnim.prototype.addAnimCurve = function (property, keyFrames) {
            if (this.IsExist(property)) {
                return false;
            }
            if (null == keyFrames || keyFrames.length <= 0) {
                return false;
            }
            var propertyData = new PropertyData();
            propertyData.keyFrames = keyFrames;
            propertyData.property = property;
            propertyData.target = this._target;
            propertyData.isLoop = true;
            propertyData.timePosition = 0;
            propertyData.totalFrame = keyFrames[keyFrames.length - 1].frame;
            propertyData.totalTime = propertyData.totalFrame * this.frameRate;
            this.totalTime = Math.max(this.totalTime, propertyData.totalTime);
            this._propertyArray.push(propertyData);
            this.updateBindData(propertyData);
        };
        /**
        * @language zh_CN
        * 移除曲线动画数据
        * @param property 属性名
        * @returns AnimCurve[] 曲线动画帧
        * @version Egret 3.0
        * @platform Web,Native
        */
        PropertyAnim.prototype.removeAnimCurve = function (property) {
            var propertyData = null;
            for (var i = 0; i < this._propertyArray.length; i++) {
                if (this._propertyArray[i].property == property) {
                    propertyData = this._propertyArray[i];
                    this._propertyArray.splice(i, 1);
                    return propertyData.keyFrames;
                }
            }
        };
        /**
        * @language zh_CN
        * 设置属性是否循环播放
        * @param property 属性名
        * @param isLoop 是否循环播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        PropertyAnim.prototype.setPropertyLoop = function (property, isLoop) {
            var propertyData = null;
            for (var i = 0; i < this._propertyArray.length; i++) {
                if (this._propertyArray[i].property == property) {
                    propertyData = this._propertyArray[i];
                    propertyData.isLoop = isLoop;
                    break;
                }
            }
        };
        /**
        * @language zh_CN
        * 绑定需要驱动的Object3D对象
        * @param target Object3D对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        PropertyAnim.prototype.bindObject3D = function (target) {
            this._target = target;
            for (var i = 0; i < this._propertyArray.length; i++) {
                this.updateBindData(this._propertyArray[i]);
            }
        };
        PropertyAnim.prototype.updateBindData = function (propertyData) {
            if (!this._target) {
                return;
            }
            propertyData.target = this._target;
            var strArray = propertyData.property.split('.');
            for (var i = 0; i < strArray.length - 1; i++) {
                propertyData.target = propertyData.target[strArray[i]];
            }
            propertyData.name = strArray[strArray.length - 1];
        };
        /**
        * @language zh_CN
        * 播放属性动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        PropertyAnim.prototype.play = function (speed, reset) {
            if (this._play && reset) {
                return;
            }
            for (var i = 0; i < this._propertyArray.length; i++) {
                this._propertyArray[i].play(speed, reset);
            }
            this._play = true;
        };
        /**
        * @language zh_CN
        * 停止播放属性动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        PropertyAnim.prototype.stop = function () {
            this._play = false;
        };
        /**
        * @language zh_CN
        * 设置时间位置
        * @version Egret 3.0
        * @platform Web,Native
        */
        //public set timePosition(value: number) {
        //    if (value == this._timePosition) {
        //        return;
        //    }
        //    var delay: number = value - this._timePosition;
        //    this._timePosition = value;
        //    if (this.isLoop) {
        //        if (this.proAnimController) {
        //            if (this.name == this.proAnimController.currentAnimName) {
        //                if (this.speed < 0 && this._timePosition < 0) {
        //                    this.proAnimController.doEvent(AnimationEvent3D.EVENT_PLAY_COMPLETE, this);
        //                }
        //                else if (this.speed > 0 && this._timePosition > this.totalTime) {
        //                    this.proAnimController.doEvent(AnimationEvent3D.EVENT_PLAY_COMPLETE, this);
        //                }
        //            }
        //        }
        //        this._timePosition = value % this._totalTime;
        //        if (this._timePosition < 0) {
        //            this._timePosition += this._totalTime;
        //        }
        //    }
        //    else {
        //        if (this._timePosition < 0) {
        //            this._timePosition = 0;
        //            if (this.proAnimController) {
        //                this.proAnimController.doEvent(AnimationEvent3D.EVENT_PLAY_COMPLETE, this);
        //            }
        //            this.stop();
        //        }
        //        else if (this._timePosition > this._totalTime) {
        //            this._timePosition = this._totalTime;
        //            if (this.proAnimController) {
        //                this.proAnimController.doEvent(AnimationEvent3D.EVENT_PLAY_COMPLETE, this);
        //            }
        //            this.stop();
        //        }
        //    }
        //    if (!this._target) {
        //        return;
        //    }
        //    var propertyData: PropertyData;
        //    var keyFrames: AnimCurve[];
        //    for (var i:number = 0, countI:number = this._propertyArray.length; i < countI; i++) {
        //        propertyData = this._propertyArray[i];
        //        keyFrames = propertyData.keyFrames;
        //        var valueTime = propertyData.timePosition + delay;
        //        if (valueTime == propertyData.timePosition) {
        //            continue;
        //        }
        //        var timeLength: number = keyFrames[keyFrames.length - 1].end.x;
        //        propertyData.timePosition = valueTime;
        //        if (propertyData.isLoop) {
        //            propertyData.timePosition = value % timeLength;
        //            if (propertyData.timePosition < 0) {
        //                propertyData.timePosition += timeLength;
        //            }
        //        }
        //        else {
        //            if (propertyData.timePosition < 0) {
        //                propertyData.timePosition = 0;
        //                continue;
        //            }
        //            else if (propertyData.timePosition > timeLength) {
        //                propertyData.timePosition = timeLength;
        //                continue;
        //            }
        //        }
        //        for (var j:number = 0, countJ:number = keyFrames.length; j < countJ; j++) {
        //            if (keyFrames[j].start.x <= propertyData.timePosition && keyFrames[j].end.x > propertyData.timePosition) {
        //                propertyData.target[propertyData.name] = keyFrames[j].calculateValue(propertyData.timePosition);
        //                break;
        //            }
        //        }
        //    }
        //}
        /**
        * @language zh_CN
        * 获取时间位置
        * @returns number 当前时间
        * @version Egret 3.0
        * @platform Web,Native
        //*/
        //public get timePosition(): number {
        //    return this._timePosition;
        //}
        ///**
        //* @language zh_CN
        //* 获取动画总时间
        //* @returns number 动画总时间
        //* @version Egret 3.0
        //* @platform Web,Native
        //*/
        //public get totalTime(): number {
        //    return this._totalTime;
        //}
        /**
        * @language zh_CN
        * 更新动画数据
        * @param delay 延迟时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        PropertyAnim.prototype.update = function (delay) {
            if (!this._play || !this._target) {
                return;
            }
            for (var i = 0; i < this._propertyArray.length; i++) {
                this._propertyArray[i].update(0, delay);
            }
            //var beginTime: number = this.timePosition;
            //this.timePosition += delay * this.speed;
            //if (this.timePosition < beginTime) {
            //    if (this.proAnimController) {
            //        this.proAnimController.doEvent(AnimationEvent3D.EVENT_PLAY_COMPLETE, this);
            //    }
            //}
        };
        /**
        * @language zh_CN
        * 克隆属性动画对象
        * @returns PropertyAnim 新的属性动画对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        PropertyAnim.prototype.clone = function () {
            var pro = new PropertyAnim();
            pro._propertyArray = this._propertyArray;
            pro._totalTime = this._totalTime;
            pro.isLoop = this.isLoop;
            pro.speed = this.speed;
            pro.name = this.name;
            return pro;
        };
        return PropertyAnim;
    }());
    egret3d.PropertyAnim = PropertyAnim;
    __reflect(PropertyAnim.prototype, "egret3d.PropertyAnim");
    /**
    * @private
    * @language zh_CN
    * @version Egret 3.0
    * @platform Web,Native
    */
    var PropertyData = (function () {
        function PropertyData() {
            this.totalFrame = 0;
            this.totalTime = 0;
            this.frameRate = 16;
            this.time = 0;
            this.offset = 0;
            this._time = 0;
            this._frame = 0;
            //private _nextframe: number = 0;
            this._weight = 0;
            this._frameTime = 0;
            this._speed = 1;
            this._change = false;
        }
        PropertyData.prototype.play = function (speed, reset) {
            this._change = reset;
            this._speed = speed;
            if (reset) {
                this._time = 0;
            }
        };
        PropertyData.prototype.update = function (time, delay) {
            var self = this;
            if (this._change) {
                this._change = false;
                this.offset = self._time;
            }
            self._time = self._time - this.offset;
            self.time = self._time % self.totalTime;
            self._frameTime = self.time / this.frameRate;
            self._frame = Math.floor(self._frameTime);
            self._weight = (self._frameTime - self._frame);
            //self._nextframe = self._frame + 1;
            //if (self._nextframe >= self.totalFrame) {
            //    self._nextframe = 0;
            //}
            if (self.keyFrames[self._frame])
                self.target[self.name] = self.keyFrames[self._frame].value;
            self._time += delay * this._speed;
        };
        return PropertyData;
    }());
    __reflect(PropertyData.prototype, "PropertyData");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=PropertyAnim.js.map