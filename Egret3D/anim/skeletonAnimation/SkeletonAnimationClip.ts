module egret3d {
    export class SkeletonAnimationClip {

        /**
        * @language zh_CN
        * ÿ֡��SkeletonPose
        * @version Egret 3.0
        * @platform Web,Native
        */
        public poseArray: Array<SkeletonPose> = [];

        public animationName: string = "";

        constructor() {
        }

        /**
        * @language zh_CN
        * ʱ�䳤��
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get timeLength(): number {
            if (this.poseArray.length <= 0) {
                return 0;
            }
            return this.poseArray[this.poseArray.length - 1].frameTime;
        }

        /**
        * @language zh_CN
        * ��������
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get jointNum(): number {
            if (this.poseArray.length <= 0) {
                return 0;
            }
            return this.poseArray[0].joints.length;
        }

        /**
        * @language zh_CN
        * ��¡SkeletonAnimationClip����
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): SkeletonAnimationClip {

            var skeletonAnimationClip: SkeletonAnimationClip = new SkeletonAnimationClip();

            skeletonAnimationClip.animationName = this.animationName;

            skeletonAnimationClip.poseArray = this.poseArray;

            return skeletonAnimationClip;
        }
    }
}