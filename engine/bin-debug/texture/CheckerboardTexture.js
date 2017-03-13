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
    * @class egret3d.CheckerboardTexture
    * @classdesc
    * CheckerboardTexture 类为 棋盘格纹理类</p>
    *
    * 棋盘格纹理为黑白间隔色块组成的一张纹理，主要用于判别模型UV的正确性，若某模型UV值不正确，其纹理表现必定乱序不规整。</p>
    * 使用示例:</p>
    <pre>
    var material: egret3d.TextureMaterial = new egret3d.TextureMaterial(egret3d.CheckerboardTexture.texture );
    var mesh: egret3d.Mesh = new egret3d.Mesh(new egret3d.CubeGeometry(), material);
    </pre>
    *
    * @includeExample texture/CheckerboardTexture.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var CheckerboardTexture = (function (_super) {
        __extends(CheckerboardTexture, _super);
        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        function CheckerboardTexture() {
            var _this = _super.call(this) || this;
            _this.width = 32;
            _this.height = 32;
            _this.uvRectangle = new egret3d.Rectangle(0, 0, 1, 1);
            _this.buildCheckerboard();
            return _this;
            //this.texture2D = new ContextTexture2D();
        }
        /**
        * @language zh_CN
        * 上传贴图数据给GPU
        * @param context3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        CheckerboardTexture.prototype.upload = function (context3D) {
            if (!this.texture2D.textureBuffer) {
                this.texture2D.textureBuffer = this.texture2D.textureBuffer || context3D.creatTexture();
                this.texture2D.border = 0;
                this.texture2D.internalFormat = egret3d.InternalFormat.PixelArray;
                this.texture2D.colorFormat = egret3d.Context3DProxy.gl.RGBA;
                this.texture2D.mimapData = new Array();
                this.texture2D.mimapData.push(new egret3d.MipmapData(this._pixelArray, this.width, this.height));
                this.texture2D.width = this.width;
                this.texture2D.height = this.height;
                this.useMipmap = false;
                this.texture2D.dataFormat = egret3d.Context3DProxy.gl.UNSIGNED_BYTE;
                context3D.upLoadTextureData(0, this);
            }
        };
        CheckerboardTexture.prototype.buildCheckerboard = function () {
            /*
            if (!this._pixelArray) {

                this._pixelArray = new Uint8Array(this.width * this.height * 4);

                //var colors: egret3d.Color[] = [egret3d.Color.white(), egret3d.Color.black()];
                var colors: egret3d.Color[] = [];//[new Color(255,255,255,255),new Color(0,0,0,255)];

                var colorIndex = 0;

                var blockSize: number = 4;

                for (var y: number = 0; y < this.height; y++) {
                    for (var x: number = 0; x < this.width; x++) {

                        if ((x % blockSize) == 0) {
                            colorIndex = (colorIndex + 1) % 2;
                        }

                        if ((y % blockSize) == 0 && x == 0) {
                            var tmp: egret3d.Color = colors[0];
                            colors[0] = colors[1];
                            colors[1] = tmp;
                            colorIndex = 0;
                        }

                        this._pixelArray[(y * (this.width * 4) + x * 4) + 0] = colors[colorIndex].r;
                        this._pixelArray[(y * (this.width * 4) + x * 4) + 1] = colors[colorIndex].g;
                        this._pixelArray[(y * (this.width * 4) + x * 4) + 2] = colors[colorIndex].b;
                        this._pixelArray[(y * (this.width * 4) + x * 4) + 3] = colors[colorIndex].a;
                    }
                }
            }
            */
        };
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        CheckerboardTexture.prototype.uploadForcing = function (context3D) {
        };
        /**
        * @language zh_CN
        * 释放接口
        * @version Egret 3.0
        * @platform Web,Native
        */
        CheckerboardTexture.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this._pixelArray) {
                delete this._pixelArray;
            }
            this._pixelArray = null;
        };
        return CheckerboardTexture;
    }(egret3d.ITexture));
    /**
    * @language zh_CN
    * 公用棋盘格实例对象
    * @version Egret 3.0
    * @platform Web,Native
    */
    CheckerboardTexture.texture = new CheckerboardTexture();
    egret3d.CheckerboardTexture = CheckerboardTexture;
    __reflect(CheckerboardTexture.prototype, "egret3d.CheckerboardTexture");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=CheckerboardTexture.js.map