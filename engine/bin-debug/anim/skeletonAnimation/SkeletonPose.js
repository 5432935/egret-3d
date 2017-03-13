var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @class egret3d.SkeletonPose
    * @classdesc
    * SkeletonPose 类为单帧骨架动画数据，若干个SkeletonPose组合成SkeletonAnimationClip， 做为骨骼骨架序列数据
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    var SkeletonPose = (function () {
        function SkeletonPose() {
            /**
            * @language zh_CN
            * 骨架包含的骨骼
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.joints = [];
        }
        //private static _temp_matrixDecomposeB: Vector3[] = [new Vector3(), new Vector3(), new Vector3()];
        /**
        * @language zh_CN
        * @private
        * 计算当前骨架内所有骨骼的世界矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        SkeletonPose.prototype.calculateJointWorldMatrix = function () {
            var joints = this.joints;
            var len = joints.length;
            var i = 0;
            for (i; i < len; ++i) {
                this.calculateAbsoluteMatrix(joints[i], joints);
            }
        };
        //递归函数，用于计算骨骼世界矩阵
        SkeletonPose.prototype.calculateAbsoluteMatrix = function (joint, joints) {
            if (joint.parentIndex >= 0) {
                this.calculateAbsoluteMatrix(joints[joint.parentIndex], joints);
            }
            if (!joint.worldMatrixValid) {
                if (!joint.worldMatrix)
                    joint.worldMatrix = new egret3d.Matrix4();
                joint.localMatrix = joint.localMatrix || new egret3d.Matrix4();
                joint.localMatrix.makeTransform(joint.translation, joint.scale, joint.orientation);
                joint.worldMatrix.copyFrom(joint.localMatrix);
                if (joint.parentIndex >= 0) {
                    joint.worldMatrix.append(joints[joint.parentIndex].worldMatrix);
                }
                joint.worldMatrixValid = true;
            }
        };
        /**
        * @language zh_CN
        * @private
        * 更新GPU所需的骨骼缓存数据
        * @param skeleton 蒙皮骨骼骨架
        * @returns Float32Array 缓存数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        SkeletonPose.prototype.updateGPUData = function (skeleton, skeletonMatrixData, offset) {
            var skeletonJoints = skeleton.joints;
            var skeletonTotalJoint = skeletonJoints.length;
            var joints = this.joints;
            var jointLen = joints.length;
            var boneNameArray = this.boneNameArray;
            for (var i = 0; i < skeletonTotalJoint; ++i) {
                for (var j = 0; j < jointLen; ++j) {
                    if (skeletonJoints[i].name != boneNameArray[j])
                        continue;
                    egret3d.Matrix4.helpMatrix.copyFrom(skeletonJoints[i].inverseMatrix);
                    egret3d.Matrix4.helpMatrix.append(joints[j].worldMatrix);
                    var test = egret3d.Matrix4.helpMatrix.decompose(egret3d.Orientation3D.QUATERNION);
                    skeletonMatrixData[i * 8 + 0] = test[1].x;
                    skeletonMatrixData[i * 8 + 1] = test[1].y;
                    skeletonMatrixData[i * 8 + 2] = test[1].z;
                    skeletonMatrixData[i * 8 + 3] = test[1].w;
                    skeletonMatrixData[i * 8 + 4] = test[0].x - offset.x;
                    skeletonMatrixData[i * 8 + 5] = test[0].y - offset.y;
                    skeletonMatrixData[i * 8 + 6] = test[0].z - offset.z;
                    skeletonMatrixData[i * 8 + 7] = 1;
                    break;
                }
            }
            return skeletonMatrixData;
        };
        /**
        * @language zh_CN
        * 通过名称查找指定骨骼
        * @param name 骨骼名称
        * @returns Joint 骨骼对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        SkeletonPose.prototype.findJoint = function (name) {
            var index = this.findJointIndex(name);
            if (index >= 0) {
                return this.joints[index];
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
        SkeletonPose.prototype.findJointIndex = function (name) {
            if ("" == name)
                return -1;
            for (var i = 0; i < this.boneNameArray.length; i++) {
                if (this.boneNameArray[i] == name)
                    return i;
            }
            return -1;
        };
        /**
        * @language zh_CN
        * @private
        * 重置骨骼世界矩阵;
        * @param name 骨骼名称
        * @returns number 骨骼索引编号
        * @version Egret 3.0
        * @platform Web,Native
        */
        SkeletonPose.prototype.resetWorldMatrix = function () {
            var joins = this.joints;
            var len = joins.length;
            for (var i = 0; i < len; i++) {
                joins[i].worldMatrixValid = false;
            }
        };
        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        SkeletonPose.prototype.getLerpSkeletonPose = function (frame, nextFrame, weight, clip, skeltonPose) {
            var a;
            var b;
            a = clip.poseArray[frame];
            b = clip.poseArray[nextFrame];
            skeltonPose.mixAnim(a, b, weight, skeltonPose);
        };
        //function stopWorker() {
        //    w.terminate();
        //}
        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        SkeletonPose.prototype.mixAnim = function (a, b, weight, targetPos) {
            var aJoint;
            var bJoint;
            var tjoins = targetPos.joints;
            for (var i = 0; i < a.joints.length; i++) {
                aJoint = a.joints[i];
                bJoint = b.joints[i];
                tjoins[i].translation.lerp(aJoint.translation, bJoint.translation, weight);
                tjoins[i].orientation.lerp(aJoint.orientation, bJoint.orientation, weight);
                tjoins[i].worldMatrixValid = false;
            }
            targetPos.calculateJointWorldMatrix();
        };
        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        SkeletonPose.prototype.copySkeletonPose = function (source, targetPos) {
            var tjoints = targetPos.joints;
            var sourcejoints = source.joints;
            var len = sourcejoints.length;
            for (var i = 0; i < len; i++) {
                tjoints[i].translation = sourcejoints[i].translation;
                tjoints[i].orientation = sourcejoints[i].orientation;
                tjoints[i].scale = sourcejoints[i].scale;
                tjoints[i].worldMatrixValid = false;
            }
            targetPos.calculateJointWorldMatrix();
        };
        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        SkeletonPose.prototype.initSkeletonPose = function (a, target) {
            target.joints = target.joints || [];
            target.jointsDictionary = target.jointsDictionary || {};
            target.boneNameArray = a.boneNameArray;
            for (var i = 0; i < a.joints.length; i++) {
                var joint = new egret3d.Joint();
                target.joints.push(joint);
                target.jointsDictionary[a.boneNameArray[i]] = joint; //初始化字典
                joint.parentIndex = a.joints[i].parentIndex;
                joint.index = a.joints[i].index;
                joint.worldMatrix = joint.worldMatrix || new egret3d.Matrix4();
            }
        };
        return SkeletonPose;
    }());
    //private static _temp_v0: Vector3 = new Vector3();
    //private static _temp_v1: Vector3 = new Vector3();
    //private static _temp_v2: Vector3 = new Vector3();
    //private static _temp_q0: Quaternion = new Quaternion();
    //private static _temp_q1: Quaternion = new Quaternion();
    //private static _temp_q2: Quaternion = new Quaternion();
    SkeletonPose._temp_jointMatrix = new egret3d.Matrix4();
    SkeletonPose._temp_matrixDecomposeA = [new egret3d.Vector3(), new egret3d.Vector3(), new egret3d.Vector3()];
    egret3d.SkeletonPose = SkeletonPose;
    __reflect(SkeletonPose.prototype, "egret3d.SkeletonPose");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=SkeletonPose.js.map