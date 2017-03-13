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
    * @private
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
    * @version Egret 3.0
    * @platform Web,Native
    * @includeExample texture/CheckerboardTexture.ts
    */
    var CheckerboardFloatTexture = (function (_super) {
        __extends(CheckerboardFloatTexture, _super);
        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        function CheckerboardFloatTexture() {
            var _this = _super.call(this) || this;
            _this.width = 32;
            _this.height = 32;
            _this.uvRectangle = new egret3d.Rectangle(0, 0, 1, 1);
            _this.buildCheckerboard();
            _this.texture2D = new egret3d.ContextTexture2D();
            _this.texture2D.border = 0;
            _this.texture2D.internalFormat = egret3d.InternalFormat.PixelArray;
            return _this;
        }
        /**
        * @private
        * @language zh_CN
        * 上传贴图数据给GPU
        * @param context3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        CheckerboardFloatTexture.prototype.upload = function (context3D) {
            if (!this.texture2D.textureBuffer) {
                this.texture2D.textureBuffer = this.texture2D.textureBuffer || context3D.creatTexture();
                this.texture2D.colorFormat = egret3d.Context3DProxy.gl.RGBA;
                this.texture2D.mimapData = new Array();
                this.texture2D.mimapData.push(new egret3d.MipmapData(this._pixelArray, this.width, this.height));
                this.texture2D.width = this.width;
                this.texture2D.height = this.height;
                this.useMipmap = false;
                this.texture2D.dataFormat = egret3d.Context3DProxy.gl.FLOAT;
                context3D.upLoadTextureData(0, this);
            }
        };
        CheckerboardFloatTexture.prototype.buildCheckerboard = function () {
            if (!this._pixelArray) {
                this._pixelArray = new Float32Array(this.width * this.height * 4);
                var colors = [egret3d.Color.white(), egret3d.Color.black()];
                var colorIndex = 0;
                var blockSize = 4;
                for (var y = 0; y < this.height; y++) {
                    for (var x = 0; x < this.width; x++) {
                        if ((x % blockSize) == 0) {
                            colorIndex = (colorIndex + 1) % 2;
                        }
                        if ((y % blockSize) == 0 && x == 0) {
                            var tmp = colors[0];
                            colors[0] = colors[1];
                            colors[1] = tmp;
                            colorIndex = 0;
                        }
                        this._pixelArray[(y * (this.width * 4) + x * 4) + 0] = Math.random(); //olors[colorIndex].r;
                        this._pixelArray[(y * (this.width * 4) + x * 4) + 1] = Math.random(); //olors[colorIndex].g;
                        this._pixelArray[(y * (this.width * 4) + x * 4) + 2] = Math.random(); //olors[colorIndex].b;
                        this._pixelArray[(y * (this.width * 4) + x * 4) + 3] = Math.random(); //colors[colorIndex].a;
                    }
                }
            }
        };
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        CheckerboardFloatTexture.prototype.uploadForcing = function (context3D) {
        };
        return CheckerboardFloatTexture;
    }(egret3d.ITexture));
    /**
    * @language zh_CN
    * 公用棋盘格实例对象
    * @version Egret 3.0
    * @platform Web,Native
    */
    CheckerboardFloatTexture.texture = new egret3d.CheckerboardTexture();
    egret3d.CheckerboardFloatTexture = CheckerboardFloatTexture;
    __reflect(CheckerboardFloatTexture.prototype, "egret3d.CheckerboardFloatTexture");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=CheckerboardFloatTexture.js.map