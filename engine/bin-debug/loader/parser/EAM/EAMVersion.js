var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @private
     * @language zh_CN
     * @class egret3d.EAMVersion
     * @classdesc
     *
     */
    var EAMVersion = (function () {
        function EAMVersion() {
        }
        EAMVersion.findNameIndex = function (nameArray, name) {
            if ("" == name) {
                return -1;
            }
            for (var i = 0; i < nameArray.length; ++i) {
                if (name == nameArray[i]) {
                    return i;
                }
            }
            return -1;
        };
        EAMVersion.parserVersion_1 = function (bytes) {
            var boneCount = bytes.readUnsignedByte();
            var sampling = bytes.readUnsignedByte();
            if (boneCount <= 0)
                return null;
            var skeletonAnimationClip = new egret3d.SkeletonAnimationClip();
            var boneNameArray = skeletonAnimationClip.boneNameArray;
            var parentBoneNameArray = new Array();
            for (var i = 0; i < boneCount; i++) {
                boneNameArray.push(bytes.readUTF());
                parentBoneNameArray.push(bytes.readUTF());
            }
            var frameCount = bytes.readInt();
            var nCount = bytes.readInt();
            var orientation = new egret3d.Quaternion();
            var scale = new egret3d.Vector3();
            var translation = new egret3d.Vector3();
            for (var i = 0; i < nCount; i++) {
                var skeletonPose = new egret3d.SkeletonPose();
                skeletonPose.frame = bytes.readInt() / 60 / 80 * 1000;
                for (var j = 0; j < boneCount; j++) {
                    var jointPose = new egret3d.Joint();
                    //jointPose.name = boneNameArray[j];
                    //jointPose.parent = parentBoneNameArray[j];
                    jointPose.index = j;
                    jointPose.parentIndex = EAMVersion.findNameIndex(boneNameArray, parentBoneNameArray[j]);
                    orientation.fromEulerAngles(bytes.readFloat() * egret3d.MathUtil.RADIANS_TO_DEGREES, bytes.readFloat() * egret3d.MathUtil.RADIANS_TO_DEGREES, bytes.readFloat() * egret3d.MathUtil.RADIANS_TO_DEGREES);
                    scale.x = bytes.readFloat();
                    scale.y = bytes.readFloat();
                    scale.z = bytes.readFloat();
                    translation.x = bytes.readFloat();
                    translation.y = bytes.readFloat();
                    translation.z = bytes.readFloat();
                    jointPose.buildLocalMatrix(scale, orientation, translation);
                    skeletonPose.joints.push(jointPose);
                }
                skeletonPose.calculateJointWorldMatrix();
                skeletonAnimationClip.addSkeletonPose(skeletonPose);
            }
            return skeletonAnimationClip;
        };
        EAMVersion.parserVersion_2 = function (bytes) {
            //读取骨骼数;
            var boneCount = bytes.readUnsignedByte();
            //读取采样率;
            var sampling = bytes.readUnsignedByte();
            if (boneCount <= 0)
                return null;
            var skeletonAnimationClip = new egret3d.SkeletonAnimationClip();
            var boneNameArray = skeletonAnimationClip.boneNameArray;
            var parentBoneNameArray = new Array();
            //读取骨骼名称;
            for (var i = 0; i < boneCount; i++) {
                boneNameArray.push(bytes.readUTF());
                parentBoneNameArray.push(bytes.readUTF());
            }
            //读取帧数;
            var frameCount = bytes.readInt();
            //读取数量;
            var nCount = bytes.readInt();
            //流数据;
            if (boneCount * frameCount >= 10000 && false) {
                skeletonAnimationClip.sampling = sampling;
                skeletonAnimationClip.boneCount = boneCount;
                skeletonAnimationClip.frameDataOffset = bytes.position;
                skeletonAnimationClip.sourceData = bytes;
                skeletonAnimationClip.buildInitialSkeleton(boneNameArray, parentBoneNameArray, nCount);
            }
            else {
                var orientation = new egret3d.Quaternion();
                var scale = new egret3d.Vector3();
                var translation = new egret3d.Vector3();
                var maxFrame = 0;
                for (var i = 0; i < nCount; i++) {
                    var skeletonPose = new egret3d.SkeletonPose();
                    skeletonPose.boneNameArray = boneNameArray;
                    //读取该帧时刻;
                    skeletonPose.frame = bytes.readInt();
                    maxFrame = Math.max(skeletonPose.frameTime, maxFrame);
                    for (var j = 0; j < boneCount; j++) {
                        var jointPose = new egret3d.Joint();
                        jointPose.index = j;
                        jointPose.parentIndex = EAMVersion.findNameIndex(boneNameArray, parentBoneNameArray[j]);
                        //读取旋转四元数分量;
                        orientation.x = bytes.readFloat();
                        orientation.y = bytes.readFloat();
                        orientation.z = bytes.readFloat();
                        orientation.w = bytes.readFloat();
                        //读取缩放分量;
                        scale.x = bytes.readFloat();
                        scale.y = bytes.readFloat();
                        scale.z = bytes.readFloat();
                        //读取平移分量;
                        translation.x = bytes.readFloat();
                        translation.y = bytes.readFloat();
                        translation.z = bytes.readFloat();
                        jointPose.buildLocalMatrix(scale, orientation, translation);
                        skeletonPose.joints.push(jointPose);
                    }
                    skeletonAnimationClip.addSkeletonPose(skeletonPose);
                }
                //这里要检查
                skeletonAnimationClip.totalTime = nCount * skeletonAnimationClip.frameRate;
                skeletonAnimationClip.totalFrame = nCount;
            }
            return skeletonAnimationClip;
        };
        EAMVersion.parserVersion_3 = function (bytes) {
            //读取骨骼数;
            var boneCount = bytes.readUnsignedByte();
            //读取采样率;
            var sampling = bytes.readUnsignedByte();
            //读取帧数;
            var frameRate = bytes.readInt();
            //总帧数;
            var totalFrame = bytes.readInt();
            //读取数量;
            var samplingFrame = bytes.readInt();
            var skeletonAnimationClip = new egret3d.SkeletonAnimationClip();
            var boneNameArray = skeletonAnimationClip.boneNameArray;
            var parentBoneNameArray = new Array();
            //读取骨骼名称;
            for (var i = 0; i < boneCount; i++) {
                boneNameArray.push(bytes.readUTF());
                parentBoneNameArray.push(bytes.readUTF());
            }
            //流数据;
            if (boneCount * samplingFrame >= 10000 && false) {
                skeletonAnimationClip.sampling = sampling;
                skeletonAnimationClip.boneCount = boneCount;
                skeletonAnimationClip.frameDataOffset = bytes.position;
                skeletonAnimationClip.sourceData = bytes;
                skeletonAnimationClip.buildInitialSkeleton(boneNameArray, parentBoneNameArray, samplingFrame);
            }
            else {
                var orientation = new egret3d.Quaternion();
                var scale = new egret3d.Vector3();
                var translation = new egret3d.Vector3();
                var maxFrame = 0;
                for (var i = 0; i < samplingFrame; i++) {
                    var skeletonPose = new egret3d.SkeletonPose();
                    skeletonPose.boneNameArray = boneNameArray;
                    //读取该帧时刻;
                    skeletonPose.frame = bytes.readInt();
                    maxFrame = Math.max(skeletonPose.frameTime, maxFrame);
                    for (var j = 0; j < boneCount; j++) {
                        var jointPose = new egret3d.Joint();
                        jointPose.index = j;
                        jointPose.parentIndex = EAMVersion.findNameIndex(boneNameArray, parentBoneNameArray[j]);
                        //读取旋转四元数分量;
                        orientation.x = bytes.readFloat();
                        orientation.y = bytes.readFloat();
                        orientation.z = bytes.readFloat();
                        orientation.w = bytes.readFloat();
                        //读取缩放分量;
                        scale.x = bytes.readFloat();
                        scale.y = bytes.readFloat();
                        scale.z = bytes.readFloat();
                        //读取平移分量;
                        translation.x = bytes.readFloat();
                        translation.y = bytes.readFloat();
                        translation.z = bytes.readFloat();
                        jointPose.buildLocalMatrix(scale, orientation, translation);
                        skeletonPose.joints.push(jointPose);
                    }
                    skeletonAnimationClip.addSkeletonPose(skeletonPose);
                }
                //这里要检查
                skeletonAnimationClip.totalTime = totalFrame * skeletonAnimationClip.frameRate;
                skeletonAnimationClip.totalFrame = totalFrame;
            }
            return skeletonAnimationClip;
        };
        return EAMVersion;
    }());
    EAMVersion.versionDictionary = {
        1: function (bytes) { return EAMVersion.parserVersion_1(bytes); },
        2: function (bytes) { return EAMVersion.parserVersion_2(bytes); },
        3: function (bytes) { return EAMVersion.parserVersion_3(bytes); },
    };
    egret3d.EAMVersion = EAMVersion;
    __reflect(EAMVersion.prototype, "egret3d.EAMVersion");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=EAMVersion.js.map