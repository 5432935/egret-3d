module egret3d {

    /**
    * @private
    * @language zh_CN
    * @class egret3d.MapLoader
    * @classdesc
    * 注意：当前还能使用 但是之后版本会被弃用 会直接使用 UnitLoader 来替换这个类的功能
    * 加载egret地图类
    * 用于加载和解析egret地图文件的类，加载完毕后，mesh内容已经添加到了container中.
    * 主要封装了esm/eca/png/eam的加载和组装，以及mesh的render method相关信息，和灯光数据的生效.
    * 加载完毕后，会派发事件LoaderEvent3D.LOADER_COMPLETE
    * @see egret3d.UnitLoader
    *
    * @includeExample loader/parser/map/MapLoader.ts
    * @version Egret 3.0
    * @platform Web,Native
    */

    export class MapLoader extends UnitLoader {

        /**
        * @language zh_CN
        * 场景根节点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public scene: Scene3D;
        /**
        * @language zh_CN
        * 加载场景配置文件 .json 或 .xml
        * @param url 默认参数为null  场景文件路径
        * @version Egret 3.0
        * @platform Web,Native
        */
        public constructor(url: string = null) {
            super(url);
            this.container = this.createObject();
        }

        protected createObject(): Object3D {
            this.scene = new Scene3D();
            return this.scene;
        }

        protected onLoaderComplete() {
            super.onLoaderComplete();
        }
    }
}