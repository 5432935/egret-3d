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
        * @private
        * 删除 avatar
        * @param part
        * @version Egret 3.0
        * @platform Web,Native
        */
        public delAvatar(part: string) {
            if (this.avatar[part]) {
                delete this.avatar[part];
            }
        }

        public play(anim: string, speed: number, reset: boolean) {
            this.skeletonAnimation.play(anim,speed,reset);
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
        * 增加一个子对象,并返回当前子对象
        * 在容器中添加子对象，如果有显示接口的，将会放到场景显示树种进行渲染逻辑运算，及渲染
        * @param child 增加的子对象
        * @param index 子对象的下标
        * @returns 子对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addChildAt(child: Object3D, index: number): Object3D {
            if (child instanceof Mesh) {
                this.setAvatar(child.name, <Mesh>child);
            }
            else {
                super.addChildAt(child, index);
            }
            return child;
        }


        /**
        * @language zh_CN
        * 移除child子对象 并返回
        * 移除显示列表中的指定对象，如果为空将会返回
        * @param child 子对象
        * @returns Object3D 如果成功就返回child,否则返回null
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeChild(child: Object3D): Object3D {
            this.delAvatar(child.name);
            return super.removeChild(child);
        }

        /**
        * @language zh_CN
        * 移除下标为index的子对象 并返回
        * @param index 子对象的下标
        * @returns 如果成功就返回child,否则返回null
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeChildAt(index: number): Object3D {
            var object3d: Object3D = this.getChild(index);
            if (object3d) {
                this.delAvatar(object3d.name);
            }
            return super.removeChildAt(index);
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
            //this.skeletonAnimation = other.skeletonAnimation.clone();
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
            var cloneRole: Role = new Role();
            var skeletonAnimation = <SkeletonAnimation>this.skeletonAnimation.clone();
            cloneRole.skeletonAnimation = skeletonAnimation;
            for (var i: number = 0; i < this.childs.length; i++) {
                if (this.childs[i] instanceof Mesh) {
                    var mesh = <Mesh>this.childs[i].clone();
                    mesh.animation = skeletonAnimation; 
                    cloneRole.setAvatar(mesh.name,mesh);
                }
            }
            return cloneRole;
        }
    }
}