var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @class egret3d.Joint
    * @classdesc
    * Joint 类表示骨骼关节，属于骨架类的组成部分， Joint类属于骨架实现的内部类，无需直接实例化。
    *
    * @version Egret 3.0
    * @platform Web,Native
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Joint = (function () {
        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Joint() {
            /**
            * @language zh_CN
            * 父骨骼名称
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.parent = null;
            /**
            * @language zh_CN
            * 骨骼名称index
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.index = 0;
            this.parentIndex = -1;
            this.scale = new egret3d.Vector3(1, 1, 1);
            this.orientation = new egret3d.Quaternion();
            this.translation = new egret3d.Vector3();
            this.localMatrix; // = new Matrix4();
            this.worldMatrix; //= new Matrix4();
            this.worldMatrixValid = false;
        }
        ///**
        //* @language zh_CN
        //* 克隆新骨骼对象
        //* @returns Joint 新骨骼对象
        //* @version Egret 3.0
        //* @platform Web,Native
        //*/
        //public clone(): Joint {
        //    var joint: Joint = new Joint();
        //    joint.name = this.name;
        //    joint.parent = this.parent;
        //    joint.index = this.index;
        //    joint.parentIndex = this.parentIndex;
        //    joint.scale.copyFrom(this.scale);
        //    joint.orientation.copyFrom(this.orientation);
        //    joint.translation.copyFrom(this.translation);
        //    joint.localMatrix.copyFrom(this.localMatrix);
        //    joint.worldMatrixValid = this.worldMatrixValid;
        //    return joint;
        //}
        /**
        * @language zh_CN
        * 构建骨骼本地矩阵
        * @param scale Vector3 缩放值
        * @param rotation Vector3或者Quaternion，旋转数据
        * @param translation Vector3 位移对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Joint.prototype.buildLocalMatrix = function (scale, rotation, translation) {
            this.scale.copyFrom(scale);
            this.translation.copyFrom(translation);
            if (rotation instanceof egret3d.Vector3) {
                this.orientation.fromEulerAngles(rotation.x, rotation.y, rotation.z);
            }
            else {
                this.orientation.copyFrom(rotation);
            }
            //this.localMatrix.makeTransform(this.translation, this.scale, this.orientation);
            this.worldMatrixValid = false;
        };
        /**
        * @language zh_CN
        * 构建骨骼逆矩阵
        * @param scale Vector3 缩放值
        * @param rotation Vector3或者Quaternion，旋转数据
        * @param translation Vector3 位移对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Joint.prototype.buildInverseMatrix = function (scale, rotation, translation) {
            if (!this.inverseMatrix) {
                this.inverseMatrix = new egret3d.Matrix4();
            }
            if (rotation instanceof egret3d.Vector3) {
                this.inverseMatrix.recompose([translation, rotation, scale]);
            }
            else {
                this.inverseMatrix.makeTransform(translation, scale, rotation);
            }
        };
        /**
         * @language zh_CN
         * 将此骨骼的信息 赋值给目标
         * @param scale Vector3 缩放值
         * @param rotation Vector3或者Quaternion，旋转数据
         * @param translation Vector3 位移对象
         * @version Egret 3.0
         * @platform Web,Native
         */
        Joint.prototype.copyTo = function (node, type) {
            if (type === void 0) { type = egret3d.BindAnimType.all; }
            switch (type) {
                case egret3d.BindAnimType.all:
                    node.localMatrix = this.worldMatrix;
                    break;
            }
        };
        return Joint;
    }());
    egret3d.Joint = Joint;
    __reflect(Joint.prototype, "egret3d.Joint");
})(egret3d || (egret3d = {}));
