module egret3d {


    /**
    * @language zh_CN
    * @class egret3d.Role
    * @classdesc
    * 角色对象多个Mesh可能共用这个SkeletonAnimation
    * @see egret3d.Object3D
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Role extends Object3D {

        /**
        * @language zh_CN
        * 骨骼动画对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public skeletonAnimation: SkeletonAnimation;


        /**
        * @language zh_CN
        * 构造对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public constructor() {
            super();
        }

    }
}