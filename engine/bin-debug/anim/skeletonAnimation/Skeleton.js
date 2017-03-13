var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @class egret3d.Skeleton
    * @classdesc
    * Skeleton 类表示骨架类，其中包含若干个 Joint（骨骼关节） 对象。
    *
    * @version Egret 3.0
    * @platform Web,Native
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Skeleton = (function () {
        /**
        * @language zh_CN
        * 构造函数，创建一套骨骼
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Skeleton() {
            /**
            * @language zh_CN
            * 骨架包含的骨骼
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.joints = [];
        }
        Object.defineProperty(Skeleton.prototype, "jointNum", {
            ///**
            //* @language zh_CN
            //* 克隆新骨架对象
            //* @returns Skeleton 新骨架对象
            //* @version Egret 3.0
            //* @platform Web,Native
            //*/
            //public clone(): Skeleton {
            //    var skeleton: Skeleton = new Skeleton();
            //    for (var i: number = 0; i < this.joints.length; i++) {
            //        skeleton.joints.push(this.joints[i].clone());
            //    }
            //    return skeleton;
            //}
            /**
            * @language zh_CN
            * 骨骼数量
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.joints.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 通过名称查找指定骨骼
        * @param name 骨骼名称
        * @returns 骨骼对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Skeleton.prototype.findJoint = function (name) {
            for (var i = 0; i < this.joints.length; i++) {
                if (this.joints[i].name == name)
                    return this.joints[i];
            }
            return null;
        };
        /**
        * @language zh_CN
        * 通过名称查找骨骼索引编号
        * @param name 骨骼名称
        * @returns number 骨骼索引编号
        * @version Egret 3.0
        * @platform Web,Native
        */
        Skeleton.prototype.findJointIndex = function (name) {
            for (var i = 0; i < this.joints.length; i++) {
                if (this.joints[i].name == name)
                    return i;
            }
            return -1;
        };
        return Skeleton;
    }());
    egret3d.Skeleton = Skeleton;
    __reflect(Skeleton.prototype, "egret3d.Skeleton");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Skeleton.js.map