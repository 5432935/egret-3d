module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ILoader
    * @classdesc
    * 加载器基类
    * @see egret3d.EventDispatcher
    *
    * @version Egret 3.0
    * @platform Web,Native
    */

    export class ILoader extends EventDispatcher {

        /**
        * @language zh_CN
        * 加载的地址
        * @version Egret 3.0
        * @platform Web,Native
        */
        public url: string = "";

        /**
        * @language zh_CN
        * 加载完成后的数据.
        * 加载完成之后对应的数据类型
        * * json xml text 普通的文件                    ----- string
        * * json 由unity3d插件导出文件                  ----- Object3D
        * * png jpg                                     ----- ImageTexture
        * * dds hdr tga                                 ----- Texture
        * * esm                                         ----- Geometry
        * * eam                                         ----- SkeletonAnimationClip
        * * epa                                         ----- PropertyAnim
        * @version Egret 3.0
        * @platform Web,Native
        */
        public data: any = null;

        /**
        * @language zh_CN
        * 构造
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
        }

        /**
        * @language zh_CN
        * 释放所有数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public dispose() {
            super.dispose();
        }
    }
}