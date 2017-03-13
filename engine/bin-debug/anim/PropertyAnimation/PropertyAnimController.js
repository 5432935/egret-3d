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
    * @class egret3d.PropertyAnimController
    * @classdesc
    * 属性动画控制器 管理 多个 PropertyAnim
    * @see egret3d.PropertyAnim
    * @see egret3d.EventDispatcher
    * @see egret3d.IAnimation
    *
    * @includeExample anim/PropertyAnimation/PropertyAnim.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var PropertyAnimController = (function (_super) {
        __extends(PropertyAnimController, _super);
        /**
        * @language zh_CN
        * 构造函数，创建一个属性动画控制器
        * @param target 控制器的目标对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        function PropertyAnimController(target) {
            if (target === void 0) { target = null; }
            var _this = _super.call(this) || this;
            _this._animTime = 0;
            /**
            * @language zh_CN
            * 播放速度
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.speed = 1;
            /**
            * @language zh_CN
            * 一个完整的动画播放时间周期
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.loopTime = 0;
            /**
            * @language zh_CN
            * 当前动画名字
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.currentAnimName = "";
            _this._proAnimDict = {};
            _this._event3D = new egret3d.AnimationEvent3D();
            _this._target = target;
            return _this;
        }
        Object.defineProperty(PropertyAnimController.prototype, "target", {
            /**
            * @language zh_CN
            * 动画时间
            * @param value 动画时间
            * @version Egret 3.0
            * @platform Web,Native
            */
            //public set animTime(value: number) {
            //    this._animTime = value;
            //    if (this.current) {
            //        this.current.timePosition = value;
            //    }
            //}
            /**
            * @language zh_CN
            *  绑定目标
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._target;
            },
            /**
            * @language zh_CN
            *  绑定目标
            * @param tar 目标
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (tar) {
                this._target = tar;
                if (tar) {
                    for (var key in this._proAnimDict) {
                        this._proAnimDict[key].bindObject3D(this._target);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropertyAnimController.prototype, "animTime", {
            /**
            * @language zh_CN
            * 动画时间
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._animTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropertyAnimController.prototype, "propertyAnimController", {
            /**
            * @language zh_CN
            * 只有属性动画对象才有此接口
            * @returns PropertyAnimController 动画控制器
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 是否正在播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        PropertyAnimController.prototype.isPlay = function () {
            return true;
        };
        /**
        * @language zh_CN
        * 播放骨骼动画
        * @param animName 动画名称
        * @param speed 播放速度
        * @param reset 是否重置
        * @param prewarm 是否预热
        * @version Egret 3.0
        * @platform Web,Native
        */
        PropertyAnimController.prototype.play = function (animName, speed, reset, prewarm) {
            if (animName === void 0) { animName = ""; }
            if (speed === void 0) { speed = 1; }
            if (reset === void 0) { reset = true; }
            if (prewarm === void 0) { prewarm = true; }
            this.current = this._proAnimDict[animName];
            if (!this.current) {
                for (var key in this._proAnimDict) {
                    this.current = this._proAnimDict[key];
                    break;
                }
            }
            this.speed = speed;
            if (this.current) {
                this.current.speed = this.speed;
                if (this.target) {
                    this.current.bindObject3D(this.target);
                }
                //this.current.timePosition = this._animTime;
                this.currentAnimName = this.current.name;
                this.current.play(speed, reset);
            }
        };
        /**
        * @language zh_CN
        * 停止骨骼动画播放（停留在第一帧）
        * @version Egret 3.0
        * @platform Web,Native
        */
        PropertyAnimController.prototype.stop = function () {
            if (this.current) {
                this.current.stop();
            }
            this.current = null;
        };
        /**
        * @language zh_CN
        * 更新骨骼动画
        * @param time 总时间
        * @param delay 延迟时间
        * @param geometry 该值无效
        * @version Egret 3.0
        * @platform Web,Native
        */
        PropertyAnimController.prototype.update = function (time, delay, geometry) {
            if (this.current) {
                this.current.update(delay);
            }
        };
        /**
        * @private
        */
        PropertyAnimController.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
        };
        /**
        * @language zh_CN
        * 克隆骨骼动画对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        PropertyAnimController.prototype.clone = function () {
            var pro = new PropertyAnimController();
            for (var key in this._proAnimDict) {
                pro.addPropertyAnim(this._proAnimDict[key].clone());
            }
            return pro;
        };
        Object.defineProperty(PropertyAnimController.prototype, "animStateNames", {
            /**
            * @language zh_CN
            * 动画名列表
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropertyAnimController.prototype, "animStates", {
            /**
            * @language zh_CN
            * 动画状态对象列表
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @private
        */
        PropertyAnimController.prototype.addAnimState = function (animState) {
        };
        /**
        * @private
        */
        PropertyAnimController.prototype.removeAnimState = function (animState) {
        };
        /**
        * @language zh_CN
        * 添加动画属性对象
        * @param proAnim 动画属性对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        PropertyAnimController.prototype.addPropertyAnim = function (proAnim) {
            this._proAnimDict[proAnim.name] = proAnim;
            proAnim.proAnimController = this;
            if (this.target) {
                proAnim.bindObject3D(this.target);
            }
            this.loopTime = Math.max(this.loopTime, proAnim.totalTime);
            if (proAnim.isLoop == false) {
                this.isLoop = proAnim.isLoop;
            }
        };
        /**
        * @language zh_CN
        * 移除动画属性对象
        * @param proAnim 动画对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        PropertyAnimController.prototype.removePropertyAnim = function (proAnim) {
            delete this._proAnimDict[proAnim.name];
        };
        /**
        * @private
        */
        PropertyAnimController.prototype.doEvent = function (event, target) {
            this._event3D.eventType = event;
            this._event3D.target = target;
            this.dispatchEvent(this._event3D);
        };
        return PropertyAnimController;
    }(egret3d.EventDispatcher));
    egret3d.PropertyAnimController = PropertyAnimController;
    __reflect(PropertyAnimController.prototype, "egret3d.PropertyAnimController", ["egret3d.IAnimation"]);
})(egret3d || (egret3d = {}));
//# sourceMappingURL=PropertyAnimController.js.map