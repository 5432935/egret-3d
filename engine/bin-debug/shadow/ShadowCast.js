var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * 实时阴影渲染需要提供的数据接口。
    * 基于shadow mapping 的阴影算法,
    * 当前阴影只支持方向光,
    * 默认灯光方向是 Vector3(1, -1, 0), 阴影摄像机为此灯光的子节点,
    * 阴影渲染摄像机的位置为Vector3(-707, 707, 0),
    * 摄像机 near 1 far 3000  width 2048 height 2048 ,
    * 当渲染阴影的物体超出阴影摄像机的范围阴影将不会渲染阴影,
    * 可以进行调节阴影摄像机的 位置 和 其它参数来进行处理,
    * this.directLight 当前渲染阴影的灯光,
    * this.shadowCamera 当前渲染阴影的摄像机
    * @includeExample shadow/Shadow.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var ShadowCast = (function () {
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        function ShadowCast(view) {
            this._boundBox = new egret3d.BoundBox();
            /**
            * @language zh_CN
            * 开启阴影渲染
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.enableShadow = false;
            /**
            * @language zh_CN
            * @private
            * 阴影贴图的宽
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.textureSizeWidth = 1024;
            /**
            * @language zh_CN
            * @private
            * 阴影贴图的高
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.textureSizeHeight = 1024;
            this.shadowCamera = new egret3d.Camera3D(egret3d.CameraType.orthogonal);
            this.shadowRender = new egret3d.MultiRender(egret3d.PassType.shadowPass);
            this.shadowRender.name = egret3d.PassType.shadowPass.toString();
            this.shadowRender.camera = this.shadowCamera;
            this.shadowRender.setRenderToTexture(this.textureSizeWidth, this.textureSizeHeight, egret3d.FrameBufferFormat.UNSIGNED_BYTE_RGBA);
            this.castShadowLight(view.sunLight);
            var v = egret3d.MathUtil.CALCULATION_VECTOR3D;
            v.copyFrom(this.directLight.dir);
            v.negate();
            v.scaleBy(1000);
            this.shadowCamera.globalPosition = v;
            view.renderQuen.addRender(this.shadowRender);
        }
        /**
        * @language zh_CN
        * 设置阴影贴图的宽度和高度
        * @param width 宽度
        * @param height 高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        ShadowCast.prototype.setTextureSize = function (width, height) {
            this.textureSizeWidth = width;
            this.textureSizeHeight = height;
            this.shadowRender.setRenderToTexture(this.textureSizeWidth, this.textureSizeHeight, egret3d.FrameBufferFormat.UNSIGNED_BYTE_RGBA);
        };
        /**
        * @language zh_CN
        * 如需要渲染阴影必须先设置当前阴影灯光，暂支持方向光
        * 灯光中的变换会用于阴影像机的变换
        * 注意:在阴影摄像机视锥中的物体,阴影才会渲染.
        * @param light 阴影灯光
        * @version Egret 3.0
        * @platform Web,Native
        */
        ShadowCast.prototype.castShadowLight = function (light) {
            this.directLight = light;
            this.shadowCamera.updateViewport(0, 0, 2048, 2048);
            this.shadowCamera.near = 1;
            this.shadowCamera.far = 3000;
            light.addChild(this.shadowCamera);
        };
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        ShadowCast.prototype.update = function (entityCollect, time, delay) {
            this.calculateBoundBox(entityCollect);
            //Stage3D.context3DProxy.clearColor(1.0,1.0,1.0,1.0);
            //Stage3D.context3DProxy.clear(Context3DProxy.gl.COLOR_BUFFER_BIT | Context3DProxy.gl.DEPTH_BUFFER_BIT);
            //this.shadowRender.camera = this.shadowCamera;
            //this.shadowRender.draw(time, delay, Stage3D.context3DProxy, entityCollect);
        };
        ShadowCast.prototype.calculateBoundBox = function (entityCollect) {
            this._boundBox.min.copyFrom(new egret3d.Vector3(egret3d.MathUtil.MAX_VALUE, egret3d.MathUtil.MAX_VALUE, egret3d.MathUtil.MAX_VALUE));
            this._boundBox.max.copyFrom(new egret3d.Vector3(-egret3d.MathUtil.MAX_VALUE, -egret3d.MathUtil.MAX_VALUE, -egret3d.MathUtil.MAX_VALUE));
            for (var i = 0; i < entityCollect.specialCastItem[egret3d.SpecialCast.Shadow].length; i++) {
                var item = entityCollect.specialCastItem[egret3d.SpecialCast.Shadow][i];
                var boundBox = item.bound;
                if (this._boundBox.max.x < boundBox.max.x + item.globalX) {
                    this._boundBox.max.x = boundBox.max.x + item.globalX;
                }
                if (this._boundBox.max.y < boundBox.max.y + item.globalY) {
                    this._boundBox.max.y = boundBox.max.y + item.globalY;
                }
                if (this._boundBox.max.z < boundBox.max.z + item.globalZ) {
                    this._boundBox.max.z = boundBox.max.z + item.globalZ;
                }
                if (this._boundBox.min.x > boundBox.min.x + item.globalX) {
                    this._boundBox.min.x = boundBox.min.x + item.globalX;
                }
                if (this._boundBox.min.y > boundBox.min.y + item.globalY) {
                    this._boundBox.min.y = boundBox.min.y + item.globalY;
                }
                if (this._boundBox.min.z > boundBox.min.z + item.globalZ) {
                    this._boundBox.min.z = boundBox.min.z + item.globalZ;
                }
            }
            this._boundBox.fillBox(this._boundBox.min, this._boundBox.max);
            var v = egret3d.MathUtil.CALCULATION_VECTOR3D;
            v.copyFrom(this.directLight.dir);
            v.negate();
            v.scaleBy(this._boundBox.radius);
            v.add(this._boundBox.center, v);
            this.shadowCamera.globalPosition = v;
            this.shadowCamera.updateViewport(0, 0, this._boundBox.radius * 2, this._boundBox.radius * 2);
            this.shadowCamera.far = this._boundBox.radius * 2;
        };
        return ShadowCast;
    }());
    egret3d.ShadowCast = ShadowCast;
    __reflect(ShadowCast.prototype, "egret3d.ShadowCast");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ShadowCast.js.map