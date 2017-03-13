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
    * @class egret3d.CubeTexture
    * @classdesc
    * CubeTexture 类为天空贴图
    *
    * 天空贴图用于Sky类使用，其内部是将6张HTMLImageElement（网页图片元素）封装到CubeTexture对象，CubeTexture为引擎内部使用对象。</p>
    *
    * 示例：</p>
    * 假设html中已有</p>
    <pre>
    <img id="t1" src="image_front.png" />
    <img id="t2" src="image_back.png" />
    <img id="t3" src="image_left.png" />
    <img id="t4" src="image_right.png" />
    <img id="t5" src="image_up.png" />
    <img id="t6" src="image_down.png" />
    </pre>
    使用示例：</p>
    <pre>
    var cubeTexture: CubeTexture = CubeTexture.createCubeTexture(
    <HTMLImageElement>document.getElementById("t1"),
    <HTMLImageElement>document.getElementById("t2"),
    <HTMLImageElement>document.getElementById("t3"),
    <HTMLImageElement>document.getElementById("t4"),
    <HTMLImageElement>document.getElementById("t5"),
    <HTMLImageElement>document.getElementById("t6")
    );
    </pre>
    * @see egret3d.Sky
    * @includeExample texture/CubeTexture.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var CubeTexture = (function (_super) {
        __extends(CubeTexture, _super);
        /**
        * @language zh_CN
        * 构造函数
        * @param image_front 默认参为null 前部HTMLImageElement图片元素
        * @param image_back 默认参为null 背部HTMLImageElement图片元素
        * @param image_left 默认参为null 左部HTMLImageElement图片元素
        * @param image_right 默认参为null 右部HTMLImageElement图片元素
        * @param image_up 默认参为null 顶部HTMLImageElement图片元素
        * @param image_down 默认参为null 底部HTMLImageElement图片元素
        */
        function CubeTexture(image_front, image_back, image_left, image_right, image_up, image_down) {
            if (image_front === void 0) { image_front = null; }
            if (image_back === void 0) { image_back = null; }
            if (image_left === void 0) { image_left = null; }
            if (image_right === void 0) { image_right = null; }
            if (image_up === void 0) { image_up = null; }
            if (image_down === void 0) { image_down = null; }
            var _this = _super.call(this) || this;
            _this.image_front = image_front;
            _this.image_back = image_back;
            _this.image_left = image_left;
            _this.image_right = image_right;
            _this.image_up = image_up;
            _this.image_down = image_down;
            _this.texture3D = new egret3d.ContextTexture3D();
            return _this;
        }
        /**
        * @language zh_CN
        * 创建CubuTexture
        * @param image_front 前部HTMLImageElement图片元素
        * @param image_back 背部HTMLImageElement图片元素
        * @param image_left 左部HTMLImageElement图片元素
        * @param image_right 右部HTMLImageElement图片元素
        * @param image_up 顶部HTMLImageElement图片元素
        * @param image_down 底部HTMLImageElement图片元素
        * @version Egret 3.0
        * @platform Web,Native
        */
        CubeTexture.createCubeTexture = function (image_front, image_back, image_left, image_right, image_up, image_down) {
            var front = new egret3d.ContextTexture2D();
            front.imageData = image_front;
            var back = new egret3d.ContextTexture2D();
            back.imageData = image_back;
            var left = new egret3d.ContextTexture2D();
            left.imageData = image_left;
            var right = new egret3d.ContextTexture2D();
            right.imageData = image_right;
            var up = new egret3d.ContextTexture2D();
            up.imageData = image_up;
            var down = new egret3d.ContextTexture2D();
            down.imageData = image_down;
            var cubeTexture = new CubeTexture(front, back, left, right, up, down);
            return cubeTexture;
        };
        /**
        * @language zh_CN
        * 创建CubuTexture
        * @param image_front 前部ITexture图片元素
        * @param image_back 背部ITexture图片元素
        * @param image_left 左部ITexture图片元素
        * @param image_right 右部ITexture图片元素
        * @param image_up 顶部ITexture图片元素
        * @param image_down 底部ITexture图片元素
        * @version Egret 3.0
        * @platform Web,Native
        */
        CubeTexture.createCubeTextureByImageTexture = function (image_front, image_back, image_left, image_right, image_up, image_down) {
            return new CubeTexture(image_front.texture2D, image_back.texture2D, image_left.texture2D, image_right.texture2D, image_up.texture2D, image_down.texture2D);
        };
        /**
        * @language zh_CN
        * 设置CubuTexture
        * @param cubeTexture 源CubuTexture
        * @param image_front 前部ITexture图片元素
        * @param image_back 背部ITexture图片元素
        * @param image_left 左部ITexture图片元素
        * @param image_right 右部ITexture图片元素
        * @param image_up 顶部ITexture图片元素
        * @param image_down 底部ITexture图片元素
        * @version Egret 3.0
        * @platform Web,Native
        */
        CubeTexture.setCubeTexture = function (cubeTexture, image_front, image_back, image_left, image_right, image_up, image_down) {
            cubeTexture.image_front = image_front.texture2D;
            cubeTexture.image_back = image_back.texture2D;
            cubeTexture.image_left = image_left.texture2D;
            cubeTexture.image_right = image_right.texture2D;
            cubeTexture.image_up = image_up.texture2D;
            cubeTexture.image_down = image_down.texture2D;
        };
        /**
        * @private
        * @language zh_CN
        * 上传贴图数据给GPU
        * 更新上传 cube 贴图纹理到GPU 现存中缓存起来
        * @param context3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        CubeTexture.prototype.upload = function (context3D) {
            if (!this.image_front ||
                !this.image_back ||
                !this.image_left ||
                !this.image_right ||
                !this.image_up ||
                !this.image_down) {
                return;
            }
            if (!this.texture3D.texture) {
                this.texture3D.texture = this.texture3D.texture || context3D.creatTexture();
                this.texture3D.border = 0;
                this.texture3D.image_front = this.image_front;
                this.texture3D.image_back = this.image_back;
                this.texture3D.image_left = this.image_left;
                this.texture3D.image_right = this.image_right;
                this.texture3D.image_up = this.image_up;
                this.texture3D.image_down = this.image_down;
                context3D.uploadCubetexture(this.texture3D);
            }
        };
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        CubeTexture.prototype.uploadForcing = function (context3D) {
        };
        return CubeTexture;
    }(egret3d.ITexture));
    egret3d.CubeTexture = CubeTexture;
    __reflect(CubeTexture.prototype, "egret3d.CubeTexture");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=CubeTexture.js.map