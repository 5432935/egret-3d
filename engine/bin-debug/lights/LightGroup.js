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
   * @class egret3d.DirectLight
   * @classdesc
   *
   * 灯光组。</p>
   * 把需要使用的灯光，放入一个组里面，然后给材质进行渲染。
   * @see egret3d.Object3D
   * @see egret3d.LightBase
   * @see egret3d.PointLight
   * @see egret3d.SpotLight
   * @see egret3d.EventDispatcher
   * @version Egret 3.0
   * @platform Web,Native
   */
    var LightGroup = (function (_super) {
        __extends(LightGroup, _super);
        /**
        * @language zh_CN
        * 创建一个灯光组
        * @version Egret 3.0
        * @platform Web,Native
        */
        function LightGroup() {
            var _this = _super.call(this) || this;
            /**
            * @language zh_CN
            * 灯光个数
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.lightNum = 0;
            _this.event = new egret3d.Event3D();
            _this.directLightList = new Array();
            _this.spotLightList = new Array();
            _this.pointLightList = new Array();
            return _this;
        }
        /**
        * @language zh_CN
        * 为灯光组,添加一个灯光
        * @param light 灯光实例对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        LightGroup.prototype.addLight = function (light) {
            switch (light.lightType) {
                case egret3d.LightType.directlight:
                    this.directLightList.push(light);
                    this.lightNum++;
                    this.event.eventType = LightGroup.EVENT_LIGHT_RESET;
                    this.dispatchEvent(this.event);
                    break;
                case egret3d.LightType.pointlight:
                    this.pointLightList.push(light);
                    this.lightNum++;
                    this.event.eventType = LightGroup.EVENT_LIGHT_RESET;
                    this.dispatchEvent(this.event);
                    break;
                case egret3d.LightType.spotLightlight:
                    this.spotLightList.push(light);
                    this.lightNum++;
                    this.event.eventType = LightGroup.EVENT_LIGHT_RESET;
                    this.dispatchEvent(this.event);
                    break;
            }
        };
        /**
        * @language zh_CN
        * 移除某个灯光
        * @param light 灯光实例对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        LightGroup.prototype.removeLight = function (light) {
            switch (light.lightType) {
                case egret3d.LightType.directlight:
                    var index = this.directLightList.indexOf(light);
                    if (index >= 0 && index < this.directLightList.length) {
                        this.directLightList.splice(index, 1);
                        this.lightNum--;
                        this.event.eventType = LightGroup.EVENT_LIGHT_RESET;
                        this.dispatchEvent(this.event);
                    }
                    break;
                case egret3d.LightType.pointlight:
                    var index = this.pointLightList.indexOf(light);
                    if (index >= 0 && index < this.pointLightList.length) {
                        this.pointLightList.splice(index, 1);
                        this.lightNum--;
                        this.event.eventType = LightGroup.EVENT_LIGHT_RESET;
                        this.dispatchEvent(this.event);
                    }
                    break;
                case egret3d.LightType.spotLightlight:
                    var index = this.spotLightList.indexOf(light);
                    if (index >= 0 && index < this.spotLightList.length) {
                        this.spotLightList.splice(index, 1);
                        this.lightNum--;
                        this.event.eventType = LightGroup.EVENT_LIGHT_RESET;
                        this.dispatchEvent(this.event);
                    }
                    break;
            }
        };
        return LightGroup;
    }(egret3d.EventDispatcher));
    /**
    * @private
    */
    LightGroup.EVENT_LIGHT_RESET = "Event_Light_Reset";
    egret3d.LightGroup = LightGroup;
    __reflect(LightGroup.prototype, "egret3d.LightGroup");
})(egret3d || (egret3d = {}));
