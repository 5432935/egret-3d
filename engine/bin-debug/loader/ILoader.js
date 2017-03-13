var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var egret3d;
(function (egret3d) {
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
    var ILoader = (function (_super) {
        __extends(ILoader, _super);
        /**
        * @language zh_CN
        * 构造
        * @version Egret 3.0
        * @platform Web,Native
        */
        function ILoader() {
            var _this = _super.call(this) || this;
            /**
            * @language zh_CN
            * 加载的地址
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.url = "";
            /**
            * @language zh_CN
            * 控制以哪种方式接收加载的数据.
            * 如果未赋值则通过加载文件的后缀名来判断加载的类型以解析.
            * 如果未赋值且加载的类型并非为内置支持的文件类型.将以文本格式进行加载
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this._dataformat = null;
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
            _this.data = null;
            /**
            * @language zh_CN
            * 任务总数
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.taskTotal = 0;
            /**
            * @language zh_CN
            * 当前完成的任务个数
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.taskCurrent = 0;
            /**
            * @language zh_CN
            * 当前进度
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.currentProgress = 0;
            /**
            * @language zh_CN
            * 当前加载资源的名字
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.resourceName = "";
            return _this;
        }
        Object.defineProperty(ILoader.prototype, "dataformat", {
            /**
             * @language zh_CN
             * 控制以哪种方式接收加载的数据.
             * 如果未赋值则通过加载文件的后缀名来判断加载的类型以解析.
             * 如果未赋值且加载的类型并非为内置支持的文件类型.将以文本格式进行加载
             * @returns string
             * @version Egret 3.0
             * @platform Web,Native
             */
            get: function () {
                return this._dataformat;
            },
            /**
             * @language zh_CN
             * 控制以哪种方式接收加载的数据.
             * 如果未赋值则通过加载文件的后缀名来判断加载的类型以解析.
             * 如果未赋值且加载的类型并非为内置支持的文件类型.将以文本格式进行加载
             * @param value
             * @version Egret 3.0
             * @platform Web,Native
             */
            set: function (value) {
                this._dataformat = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 释放所有数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        ILoader.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        ILoader.prototype.processFileFormat = function () {
            var fileFormat = egret3d.StringUtil.getFileFormat(this.url);
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
                    this._dataformat = egret3d.URLLoader.DATAFORMAT_EUM;
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
        };
        return ILoader;
    }(egret3d.EventDispatcher));
    /**
     * @language zh_CN
     * 以二进制方式接收加载的数据
     * @version Egret 3.0
     * @platform Web,Native
     */
    ILoader.DATAFORMAT_BINARY = "binary";
    /**
     * @language zh_CN
     * 以文本的方式接收加载的数据
     * 默认方式
     * @version Egret 3.0
     * @platform Web,Native
     */
    ILoader.DATAFORMAT_TEXT = "text";
    /**
     * @language zh_CN
     * 以音频的方式接收加载的数据
     * @version Egret 3.0
     * @platform Web,Native
     */
    ILoader.DATAFORMAT_SOUND = "sound";
    /**
     * @language zh_CN
     * 以图像的方式接收加载的数据
     * 支持jpg.png.等格式
     * @version Egret 3.0
     * @platform Web,Native
     */
    ILoader.DATAFORMAT_BITMAP = "bitmap";
    /**
     * @language zh_CN
     * 以DDS的方式接收加载的数据
     * @version Egret 3.0
     * @platform Web,Native
     */
    ILoader.DATAFORMAT_DDS = "dds";
    /**
     * @language zh_CN
     * 以TGA的方式接收加载的数据
     * @version Egret 3.0
     * @platform Web,Native
     */
    ILoader.DATAFORMAT_TGA = "tga";
    /**
     * @language zh_CN
     * 以ESM格式接收加载的数据
     * Egret3D独有的格式 模型+蒙皮
     * @version Egret 3.0
     * @platform Web,Native
     */
    ILoader.DATAFORMAT_ESM = "esm";
    /**
     * @language zh_CN
     * 以EAM格式接收加载的数据
     * Egret3D独有的格式 动作文件
     * @version Egret 3.0
     * @platform Web,Native
     */
    ILoader.DATAFORMAT_EAM = "eam";
    /**
   * @language zh_CN
   * 以ERM格式接收加载的数据
   * Egret3D独有的格式 整个场景资源
   * @version Egret 3.0
   * @platform Web,Native
   */
    ILoader.DATAFORMAT_E3DPACK = "e3dpack";
    /**
    * @language zh_CN
    * 以EUM格式接收加载的数据
    * Egret3D独有的格式 导出场景地第二UV信息
    * @version Egret 3.0
    * @platform Web,Native
    */
    ILoader.DATAFORMAT_EUM = "eum";
    /**
     * @language zh_CN
     * 以ECA格式接收加载的数据
     * Egret3D独有的格式 相机动画文件
     * @version Egret 3.0
     * @platform Web,Native
     */
    ILoader.DATAFORMAT_ECA = "eca";
    /**
     * @language zh_CN
     * 以EPA格式接收加载的数据
     * Egret3D独有的格式 属性动画文件
     * @version Egret 3.0
     * @platform Web,Native
     */
    ILoader.DATAFORMAT_EPA = "epa";
    /**
     * @private
     * @language zh_CN
     * 以pvr格式接收加载的数据
     * @version Egret 3.0
     * @platform Web,Native
     */
    ILoader.DATAFORMAT_PVR = "pvr";
    /**
    * @private
    * @language zh_CN
    * 以pvr格式接收加载的数据
    * @version Egret 3.0
    * @platform Web,Native
    */
    ILoader.DATAFORMAT_HDR = "hdr";
    /**
    * @private
    * @language zh_CN
    * 以json格式接收加载的数据
    * @version Egret 3.0
    * @platform Web,Native
    */
    ILoader.DATAFORMAT_JSON = "json";
    /**
    * @private
    * @language zh_CN
    * 以xml格式接收加载的数据
    * @version Egret 3.0
    * @platform Web,Native
    */
    ILoader.DATAFORMAT_XML = "xml";
    egret3d.ILoader = ILoader;
    __reflect(ILoader.prototype, "egret3d.ILoader");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ILoader.js.map