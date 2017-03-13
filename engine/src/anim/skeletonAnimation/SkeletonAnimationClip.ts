module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.SkeletonAnimationClip
    * @classdesc
    * 骨骼动画剪辑
    * 每个骨骼动画的数据
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class SkeletonAnimationClip {

        /**
        * @language zh_CN
        * 每帧的SkeletonPose
        * @version Egret 3.0
        * @platform Web,Native
        */
        public poseArray: Array<SkeletonPose> = [];

        /**
        * @language zh_CN
        * 骨骼名字列表，
        * 可以根据名字列表得到骨骼索引 
        * @version Egret 3.0
        * @platform Web,Native
        */
        public boneNameArray: Array<string> = [];

        /**
        * @language zh_CN
        * 动画名字
        * @version Egret 3.0
        * @platform Web,Native
        */
        public animationName: string = "";

        /**
        * @language zh_CN
        * 是否循环
        * @version Egret 3.0
        * @platform Web,Native
        */
        public isLoop: boolean = false ;


        /**
        * @language zh_CN
        * @private
        * 流数据解析测试;
        * @version Egret 3.0
        * @platform Web,Native
        */
        public sampling: number = 0;

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public boneCount: number = 0;

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public frameDataOffset: number = 0;

        /*
        * @private
        */
        public totalFrame: number = 0;

        /*
        * @private
        */
        public totalTime: number = 0;

        /*
        * @private
        */
        public frameRate: number = 33; // 30 fps

        /*
        * @private
        */
        public loopPose: boolean = false;

        /*
        * @private
        */
        public cycleOffset: number = 0;

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public sourceData: ByteArray = null;

        private _skeletonPose: SkeletonPose = null;
        private _temp_scale: Vector3 = new Vector3();
        private _temp_translation: Vector3 = new Vector3();
        private _temp_orientation: Quaternion = new Quaternion();
        private _cacheAnimationClip: SkeletonAnimationClip = null;

        /**
        * @language zh_CN
        * 获取当前播放帧的Pose数据
        * @returns SkeletonPose 当前播放帧的Pose数据
        * @see egret3d.SkeletonPose
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get currentSkeletonPose(): SkeletonPose {
            return this._skeletonPose;
        }

        ///**
        //* @language zh_CN
        //* 获取缓存的骨骼动画Clip
        //* @returns SkeletonAnimationClip对象;
        //* @version Egret 3.0
        //* @platform Web,Native
        //*/
        //public get cacheAnimationClip(): SkeletonAnimationClip {

        //    if (!this._cacheAnimationClip) {

        //        if (this.sourceData) {
        //            this._cacheAnimationClip = this;
        //        }
        //        else {

        //            this._cacheAnimationClip = new SkeletonAnimationClip();

        //            if (this.poseArray.length < 2) {
        //                this._cacheAnimationClip.poseArray = this.poseArray;
        //            }
        //            else {

        //                var skeletonPoseA: SkeletonPose = this.poseArray[0];

        //                var skeletonPoseB: SkeletonPose = this.poseArray[1];

        //                var nCount: number = Math.round((skeletonPoseB.frameTime - skeletonPoseA.frameTime) / SkeletonAnimation.fps);

        //                if (nCount <= 1) {
        //                    this._cacheAnimationClip.poseArray = this.poseArray;
        //                }
        //                else for (var i: number = 1; i < this.poseArray.length; ++i) {

        //                    skeletonPoseA = this.poseArray[i - 1];

        //                    skeletonPoseB = this.poseArray[i];

        //                    for (var j: number = 0; j < nCount; j++) {

        //                        var skeletonPose: SkeletonPose = new SkeletonPose();

        //                        skeletonPose.boneNameArray = this.boneNameArray;

        //                        skeletonPose.lerp(skeletonPoseA, skeletonPoseB, j / nCount);

        //                        this._cacheAnimationClip.poseArray.push(skeletonPose);
        //                    }
        //                }

        //                this._cacheAnimationClip.poseArray.push(this.poseArray[this.poseArray.length - 1].clone());
        //            }
        //        }
        //    }

        //    return this._cacheAnimationClip;
        //}

        /**
        * @language zh_CN
        * 用骨头名字查找骨头索引
        * @param name 骨头名字
        * @returns number 骨头索引
        * @version Egret 3.0
        * @platform Web,Native
        */
        public findJointIndex(name: string): number {
            if (!this._skeletonPose) {
                if (this.poseArray.length <= 0) {
                    return -1;
                }
                return this.poseArray[0].findJointIndex(name);
            }
            return this._skeletonPose.findJointIndex(name);
        }

        /**
        * @language zh_CN
        * @private
        * 增加Pose
        * @param skeletonPose Pose
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addSkeletonPose(skeletonPose: SkeletonPose): void {
            this.poseArray.push(skeletonPose);
        }

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public buildInitialSkeleton(boneNameArray: string[], parentBoneNameArray: string[], frameCount: number): void {

            if (this._skeletonPose) {
                return;
            }

            this._skeletonPose = new SkeletonPose();
            this._skeletonPose.boneNameArray = boneNameArray;

            for (var j: number = 0; j < this.boneCount; j++) {

                var jointPose: Joint = new Joint();
                //jointPose.name = boneNameArray[j];
                //jointPose.parent = parentBoneNameArray[j];
                //jointPose.parentIndex = this._skeletonPose.findJointIndex(jointPose.parent);

                jointPose.index = j;
                jointPose.parentIndex = EAMVersion.findNameIndex(boneNameArray, parentBoneNameArray[j]);

                this._skeletonPose.joints.push(jointPose);
            }

            //this.sourceData.position = this.frameDataOffset + (40 * this.boneCount + 4) * (this.frameCount - 1);
            //this._timeLength = this.sourceData.readInt() / 60 / 80 * 1000;
        }

        /**
        * @language zh_CN
        * @private
        * 获取骨骼Pose帧
        * @param index 帧索引
        * @returns SkeletonPose 骨骼Pose帧
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getSkeletonPose(index: number): SkeletonPose {
            if (this.poseArray.length > 0 && this.poseArray.length > index) {
               return this.poseArray[index] ; 
            }
            return null;
        }

        private readSkeletonPose(index: number, skeletonPose: SkeletonPose): SkeletonPose {

            this.sourceData.position = this.frameDataOffset + (40 * this.boneCount + 4) * index; //每帧数据需要40 * 骨骼数 + 4字节;

            skeletonPose.frameTime = this.sourceData.readInt() / 60 / 80 * 1000;

            for (var j: number = 0; j < this.boneCount; j++) {

                //读取旋转四元数分量;
                this._temp_orientation.x = this.sourceData.readFloat();
                this._temp_orientation.y = this.sourceData.readFloat();
                this._temp_orientation.z = this.sourceData.readFloat();
                this._temp_orientation.w = this.sourceData.readFloat();

                //读取缩放分量;
                this._temp_scale.x = this.sourceData.readFloat();
                this._temp_scale.y = this.sourceData.readFloat();
                this._temp_scale.z = this.sourceData.readFloat();

                //读取平移分量;
                this._temp_translation.x = this.sourceData.readFloat();
                this._temp_translation.y = this.sourceData.readFloat();
                this._temp_translation.z = this.sourceData.readFloat();

                skeletonPose.joints[j].worldMatrixValid = false;

                skeletonPose.joints[j].buildLocalMatrix(this._temp_scale, this._temp_orientation, this._temp_translation);
            }

            skeletonPose.calculateJointWorldMatrix();

            return skeletonPose;
        }

        /**
        * @language zh_CN
        * 骨骼数量
        * @returns number 骨骼数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get jointNum(): number {
            if (this.poseArray.length > 0) {
                return this.poseArray[0].joints.length;
            }
            return this.boneCount;
        }
    }
}