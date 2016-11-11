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
        * 骨骼动画 avatar
        * @version Egret 3.0
        * @platform Web,Native
        */
        public avatar: { [name: string]: Mesh } = {} ;

        /**
        * @language zh_CN
        * 构造对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public constructor() {
            super();
        }


        /**
        * @language zh_CN
        * @private
        * 设置 avatar
        * @param part
        * @param mesh
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setAvatar(part: string, mesh: Mesh) {
            var tmp = this.avatar[part];
            if (tmp) {
                tmp.parent.removeChild(tmp);
            }
            this.avatar[part] = mesh;
            super.addChild(mesh);
        }

        /**
        * @language zh_CN
        * @param child 
        * @returns Object3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addChild(child: Object3D): Object3D {
            if (child instanceof Mesh) {
                this.setAvatar(child.name, <Mesh>child);
            }
            else {
                super.addChild(child);
            }
            return child;
        }


        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number) {
        }

        /**
        * @language zh_CN
        * @private
        * @param other copy对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public copy(other: Role) {
            super.copy(other);
            this.skeletonAnimation = other.skeletonAnimation.clone();
        }

        /**
        * @language zh_CN
        * @private
        * 克隆当前Role
        * @returns Role 克隆后的对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): Role {
            var cloneObject: Role = new Role();
            cloneObject.copy(this);
            return cloneObject;
        }
    }
}