module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.SkeletonPose
    * @classdesc
    * SkeletonPose 类为单帧骨架动画数据，若干个SkeletonPose组合成SkeletonAnimationClip， 做为骨骼骨架序列数据
    * 
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class SkeletonPose {

        /**
        * @language zh_CN
        * 骨架包含的骨骼
        * @version Egret 3.0
        * @platform Web,Native
        */
        public joints: Array<Joint> = [];

        /**
        * @language zh_CN
        * 骨骼名字列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public boneNameArray: Array<string>;

       /**
        * @language zh_CN
        * 动画pose里的节点引用字典
        * @version Egret 3.0
        * @platform Web,Native
        */
        public jointsDictionary: { [boneName: string]: Joint};

        /**
        * @language zh_CN
        * 当前骨架的帧时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public frameTime: number;

        /**
        * @language zh_CN
        * 帧数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public frame: number;


        //private static _temp_v0: Vector3D = new Vector3D();
        //private static _temp_v1: Vector3D = new Vector3D();
        //private static _temp_v2: Vector3D = new Vector3D();
        //private static _temp_q0: Quaternion = new Quaternion();
        //private static _temp_q1: Quaternion = new Quaternion();
        //private static _temp_q2: Quaternion = new Quaternion();
        private static _temp_jointMatrix: Matrix4_4 = new Matrix4_4();
        private static _temp_matrixDecomposeA: Vector3D[] = [new Vector3D(), new Vector3D(), new Vector3D()];
        //private static _temp_matrixDecomposeB: Vector3D[] = [new Vector3D(), new Vector3D(), new Vector3D()];

        /**
        * @language zh_CN
        * @private
        * 计算当前骨架内所有骨骼的世界矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        public calculateJointWorldMatrix(): void {
            let joints = this.joints;
            let len = joints.length; 
            let i:number =0;
            for (i ; i < len ; ++i) {
                this.calculateAbsoluteMatrix(joints[i], joints);
            }
        }

        //递归函数，用于计算骨骼世界矩阵
        private calculateAbsoluteMatrix(joint: Joint ,joints:Joint[] ): void {
            if (joint.parentIndex >= 0) {
                this.calculateAbsoluteMatrix(joints[joint.parentIndex], joints);
            }
            if (!joint.worldMatrixValid) {
                if (!joint.worldMatrix) joint.worldMatrix = new Matrix4_4();

                joint.localMatrix = joint.localMatrix || new Matrix4_4();
                joint.localMatrix.makeTransform(joint.translation, joint.scale, joint.orientation);
                joint.worldMatrix.copyFrom(joint.localMatrix);

                if (joint.parentIndex >= 0) {
                    joint.worldMatrix.append(joints[joint.parentIndex].worldMatrix);
                }

                joint.worldMatrixValid = true;
            }
        }

        /**
        * @language zh_CN
        * @private
        * 更新GPU所需的骨骼缓存数据
        * @param skeleton 蒙皮骨骼骨架
        * @returns Float32Array 缓存数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public updateGPUData(skeleton: Skeleton, skeletonMatrixData: Float32Array, offset: Vector3D): Float32Array {

            var skeletonJoints = skeleton.joints; 
            var skeletonTotalJoint = skeletonJoints.length;
            var joints = this.joints; 
            var jointLen = joints.length;
            var boneNameArray = this.boneNameArray ;

            for (var i: number = 0; i < skeletonTotalJoint; ++i) {

                for (var j: number = 0; j < jointLen; ++j) {
                    
                    if (skeletonJoints[i].name != boneNameArray[j])
                        continue;
                    
                    Matrix4_4.helpMatrix.copyFrom(skeletonJoints[i].inverseMatrix);

                    Matrix4_4.helpMatrix.append(joints[j].worldMatrix);

                    var test: Vector3D[] = Matrix4_4.helpMatrix.decompose(Orientation3D.QUATERNION);

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
        }

        /**
        * @language zh_CN
        * 通过名称查找指定骨骼
        * @param name 骨骼名称
        * @returns Joint 骨骼对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public findJoint(name: string): Joint {
            var index: number = this.findJointIndex(name);
            if (index >= 0) {
                return this.joints[index];
            }
            return null;
        }

        /**
        * @language zh_CN
        * 通过名称查找骨骼索引编号
        * @param name 骨骼名称
        * @returns number 骨骼索引编号
        * @version Egret 3.0
        * @platform Web,Native
        */
        public findJointIndex(name: string): number {

            if ("" == name)
                return -1;

            for (var i: number = 0; i < this.boneNameArray.length; i++) {
                if (this.boneNameArray[i] == name)
                    return i;
            }

            return -1;
        }

        /**
        * @language zh_CN
        * @private
        * 重置骨骼世界矩阵;
        * @param name 骨骼名称
        * @returns number 骨骼索引编号
        * @version Egret 3.0
        * @platform Web,Native
        */
        public resetWorldMatrix(): void {
            let joins = this.joints; 
            let len = joins.length ;
            for (var i: number = 0; i < len ; i++) {
                joins[i].worldMatrixValid = false;
            }
        }

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getLerpSkeletonPose(frame: number,nextFrame:number, weight: number, clip: SkeletonAnimationClip, skeltonPose: SkeletonPose) {
            let a: SkeletonPose;
            let b: SkeletonPose;
            a = clip.poseArray[frame];
            b = clip.poseArray[nextFrame];
            skeltonPose.mixAnim(a, b, weight, skeltonPose);
        }


    //function stopWorker() {
    //    w.terminate();
    //}

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public mixAnim(a: SkeletonPose, b: SkeletonPose, weight: number, targetPos: SkeletonPose) {
            let aJoint: Joint;
            let bJoint: Joint;
            let tjoins = targetPos.joints; 
            for (var i: number = 0; i < a.joints.length; i++) {
                aJoint = a.joints[i];
                bJoint = b.joints[i];
                
                tjoins[i].translation.lerp(aJoint.translation, bJoint.translation, weight);
                tjoins[i].orientation.lerp(aJoint.orientation, bJoint.orientation, weight);
                tjoins[i].worldMatrixValid = false ;
            }
            targetPos.calculateJointWorldMatrix();
        }

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public copySkeletonPose(source: SkeletonPose, targetPos: SkeletonPose) {
            let tjoints = targetPos.joints; 
            let sourcejoints = source.joints; 
            let len = sourcejoints.length ;
            for (var i: number = 0; i < len; i++) {
                tjoints[i].translation = sourcejoints[i].translation ;
                tjoints[i].orientation = sourcejoints[i].orientation ;
                tjoints[i].scale = sourcejoints[i].scale;
                tjoints[i].worldMatrixValid = false;
            } 
            targetPos.calculateJointWorldMatrix();
        }

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initSkeletonPose(a: SkeletonPose, target: SkeletonPose) {
            target.joints = target.joints || [];
            target.jointsDictionary = target.jointsDictionary || {};
            target.boneNameArray = a.boneNameArray;
            for (var i: number = 0; i < a.joints.length; i++) {
                let joint: Joint = new Joint();
                target.joints.push(joint);
                target.jointsDictionary[a.boneNameArray[i]] = joint;//初始化字典
                joint.parentIndex = a.joints[i].parentIndex;
                joint.index = a.joints[i].index;
                joint.worldMatrix = joint.worldMatrix || new Matrix4_4();
            }
        }
    }
}