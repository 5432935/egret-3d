module egret3d {

    /**
    * @language zh_CN
    * @private
    * @class egret3d.RoleLoader
    * @classdesc
    * 加载角色
    * @see egret3d.UnitLoader
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class RoleLoader extends UnitLoader {

        /**
        * @language zh_CN
        * 角色根节点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public role: Role;

        /**
        * @language zh_CN
        * 构造
        * @param url 角色文件路径
        * @version Egret 3.0
        * @platform Web,Native
        */
        public constructor(url: string = null) {
            super(url);
            this.container = this.createObject();
        }

        protected createObject(): Object3D {
            this.role = new Role();
            return this.role;
        }


        //protected onLoaderComplete() {
        //    super.onLoaderComplete();
        //    for (var id in this.skinClipDict) {
        //        this.role.skeletonAnimation = this.skinClipDict[id];
        //        break;
        //    }
        //}
    }
}