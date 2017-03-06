module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ILoader
    * @classdesc
    * 加载器基类,
    * 加载完成后会返回相应的数据对象
    * @see egret3d.EventDispatcher
    *
    * @version Egret 3.0
    * @platform Web,Native
    */

    export class ILoader extends EventDispatcher {

        /**
         * @language zh_CN
         * 以二进制方式接收加载的数据
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DATAFORMAT_BINARY: string = "binary";

        /**
         * @language zh_CN
         * 以文本的方式接收加载的数据
         * 默认方式
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DATAFORMAT_TEXT: string = "text";

        /**
         * @language zh_CN
         * 以音频的方式接收加载的数据
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DATAFORMAT_SOUND: string = "sound";

        /**
         * @language zh_CN
         * 以图像的方式接收加载的数据
         * 支持jpg.png.等格式
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DATAFORMAT_BITMAP: string = "bitmap";

        /**
         * @language zh_CN
         * 以DDS的方式接收加载的数据
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DATAFORMAT_DDS: string = "dds";

        /**
         * @language zh_CN
         * 以TGA的方式接收加载的数据
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DATAFORMAT_TGA: string = "tga";

        /**
         * @language zh_CN
         * 以ESM格式接收加载的数据
         * Egret3D独有的格式 模型+蒙皮
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DATAFORMAT_ESM: string = "esm";

        /**
         * @language zh_CN
         * 以EAM格式接收加载的数据
         * Egret3D独有的格式 动作文件
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DATAFORMAT_EAM: string = "eam";
        /**
       * @language zh_CN
       * 以ERM格式接收加载的数据
       * Egret3D独有的格式 整个场景资源
       * @version Egret 3.0
       * @platform Web,Native
       */
       public static DATAFORMAT_E3DPACK: string = "e3dpack";
        /**
        * @language zh_CN
        * 以EUM格式接收加载的数据
        * Egret3D独有的格式 导出场景地第二UV信息
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static DATAFORMAT_EUM: string = "eum";

        /**
         * @language zh_CN
         * 以ECA格式接收加载的数据
         * Egret3D独有的格式 相机动画文件
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DATAFORMAT_ECA: string = "eca";

        /**
         * @language zh_CN
         * 以EPA格式接收加载的数据
         * Egret3D独有的格式 属性动画文件
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DATAFORMAT_EPA: string = "epa";

        /**
         * @private
         * @language zh_CN
         * 以pvr格式接收加载的数据
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DATAFORMAT_PVR: string = "pvr";

        /**
        * @private
        * @language zh_CN
        * 以pvr格式接收加载的数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static DATAFORMAT_HDR: string = "hdr";

        /**
        * @private
        * @language zh_CN
        * 以json格式接收加载的数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static DATAFORMAT_JSON: string = "json";

        /**
        * @private
        * @language zh_CN
        * 以xml格式接收加载的数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static DATAFORMAT_XML: string = "xml";


        /**
        * @language zh_CN
        * 加载的地址
        * @version Egret 3.0
        * @platform Web,Native
        */
        public url: string = "";

        /**
        * @language zh_CN
        * 控制以哪种方式接收加载的数据.
        * 如果未赋值则通过加载文件的后缀名来判断加载的类型以解析.
        * 如果未赋值且加载的类型并非为内置支持的文件类型.将以文本格式进行加载
        * @version Egret 3.0
        * @platform Web,Native
        */
        protected _dataformat: string = null;

        /**
        * @language zh_CN
        * 加载完成后的数据。</p>
        * 加载完成之后对应的数据类型。</p>
        * *.text|*.txt|*.xml|*.json 文本类型          ----- <string>转换 </p>
        * *MapConfig.json 加载的 由unity3d插件导出文件 ----- <Object3D>  根据导出类型 Scene3D Role EffectGroup </p>
        * *.png|*.jpg                                 ----- <ImageTexture>转换 </p>
        * *.dds|*.hdr|*.tga                           ----- <Texture>转换 </p>
        * *.esm                                       ----- <Geometry>转换 </p>
        * *.eam                                       ----- <SkeletonAnimationClip>转换 </p>
        * *.epa                                       ----- <PropertyAnim>转换 </p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public data: any = null;

        /**
        * @language zh_CN
        * 任务总数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public taskTotal: number = 0;

        /**
        * @language zh_CN
        * 当前完成的任务个数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public taskCurrent: number = 0;

        /**
        * @language zh_CN
        * 当前进度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public currentProgress: number = 0;

        /**
        * @language zh_CN
        * @private
        * 附带参数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public param: any;

        /**
         * @language zh_CN
         * 控制以哪种方式接收加载的数据.
         * 如果未赋值则通过加载文件的后缀名来判断加载的类型以解析.
         * 如果未赋值且加载的类型并非为内置支持的文件类型.将以文本格式进行加载
         * @returns string
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get dataformat(): string {
            return this._dataformat;
        }

        /**
         * @language zh_CN
         * 控制以哪种方式接收加载的数据.
         * 如果未赋值则通过加载文件的后缀名来判断加载的类型以解析.
         * 如果未赋值且加载的类型并非为内置支持的文件类型.将以文本格式进行加载
         * @param value
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set dataformat(value: string) {
            this._dataformat = value;
        }

        /**
        * @language zh_CN
        * 当前加载资源的名字
        * @version Egret 3.0
        * @platform Web,Native
        */
        public resourceName: string = "";

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

        protected processFileFormat() {
            var fileFormat: string = StringUtil.getFileFormat(this.url);
            switch (fileFormat) {
                case "rar":
                    this._dataformat = ILoader.DATAFORMAT_BINARY;
                case "7z":
                    this._dataformat = ILoader.DATAFORMAT_BINARY;
                case "lzma":
                    this._dataformat = ILoader.DATAFORMAT_BINARY;
                    break;
                case "dds":
                    this._dataformat = ILoader.DATAFORMAT_DDS;
                    break;
                case "tga":
                    this._dataformat = ILoader.DATAFORMAT_TGA;
                    break;
                case "bmp":
                    this._dataformat = ILoader.DATAFORMAT_BITMAP;
                    break;
                case "png":
                    this._dataformat = ILoader.DATAFORMAT_BITMAP;
                    break;
                case "jpg":
                    this._dataformat = ILoader.DATAFORMAT_BITMAP;
                    break;
                case "hdr":
                    this._dataformat = ILoader.DATAFORMAT_HDR;
                    break;
                case "glsl":
                    this._dataformat = ILoader.DATAFORMAT_TEXT;
                    break;
                case "pvr":
                    this._dataformat = ILoader.DATAFORMAT_PVR;
                    break;
                case "esm":
                    this._dataformat = ILoader.DATAFORMAT_ESM;
                    break;
                case "eam":
                    this._dataformat = ILoader.DATAFORMAT_EAM;
                    break;
                case "e3dpack":
                    this._dataformat = ILoader.DATAFORMAT_E3DPACK;
                    break;
                case "eum":
                    this._dataformat = URLLoader.DATAFORMAT_EUM;
                    break;
                case "eca":
                    this._dataformat = ILoader.DATAFORMAT_ECA;
                    break;
                case "epa":
                    this._dataformat = ILoader.DATAFORMAT_EPA;
                    break;
                case "json":
                    this._dataformat = ILoader.DATAFORMAT_JSON;
                    break;
                case "xml":
                    this._dataformat = ILoader.DATAFORMAT_XML;
                    break;
            }
        }
    }
}