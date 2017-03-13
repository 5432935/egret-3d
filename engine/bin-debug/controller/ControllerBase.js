var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @class egret3d.ControllerBase
    * @classdesc
    * 控制器 基类, 抽象控制器的一些数据
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ControllerBase = (function () {
        /**
        * @language zh_CN
        * 构造函数
        * @param targetObject 控制的目标
        * @param lookAtObject 观察的目标
        * @version Egret 3.0
        * @platform Web,Native
        */
        function ControllerBase(targetObject, lookAtObject) {
            if (targetObject === void 0) { targetObject = null; }
            if (lookAtObject === void 0) { lookAtObject = null; }
            this._autoUpdate = true;
            this._origin = new egret3d.Vector3(0.0, 0.0, 0.0);
            this._speed = 300;
            this._target = targetObject;
            this._lookAtObject = lookAtObject;
        }
        Object.defineProperty(ControllerBase.prototype, "target", {
            /**
            * @language zh_CN
            * 获取当前的目标
            * @returns Object3D 返回当前的目标
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._target;
            },
            /**
            * @language zh_CN
            * 设置当前的目标
            * @param val 当前的目标
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (val) {
                if (this._target == val)
                    return;
                this._target = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ControllerBase.prototype, "lookAtObject", {
            /**
            * @language zh_CN
            * 设置获取当前的观察目标
            * @returns Object3D 观察目标
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._lookAtObject;
            },
            /**
            * @language zh_CN
            * 获取当前的观察目标
            * @param val 观察目标
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (val) {
                if (this._lookAtObject == val)
                    return;
                this._lookAtObject = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ControllerBase.prototype, "speed", {
            /**
            * @language zh_CN
            * 获取移动速度
            * @returns number 移动速度
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._speed;
            },
            /**
            * @language zh_CN
            * 设置移动速度
            * @param val 移动速度
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (val) {
                this._speed = val;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 数据更新
        * @version Egret 3.0
        * @platform Web,Native
        */
        ControllerBase.prototype.update = function () {
        };
        return ControllerBase;
    }());
    egret3d.ControllerBase = ControllerBase;
    __reflect(ControllerBase.prototype, "egret3d.ControllerBase");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ControllerBase.js.map