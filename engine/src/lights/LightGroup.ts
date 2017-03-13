module egret3d {
   
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
    export class LightGroup extends EventDispatcher {

        /**
        * @language zh_CN  
        * 灯光个数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public lightNum: number = 0;

        /**
        * @language zh_CN  
        * 方向光列表
        * @see egret3d.DirectLight
        * @version Egret 3.0
        * @platform Web,Native
        */
        public directLightList: Array<DirectLight>;

        /**
        * @private
        * @language zh_CN  
        * 聚光灯列表
        * @see egret3d.SpotLight
        * @version Egret 3.0
        * @platform Web,Native
        */
        public spotLightList: Array<SpotLight>;

        /**
        * @language zh_CN  
        * 点光源列表
        * @see egret3d.PointLight
        * @version Egret 3.0
        * @platform Web,Native
        */
        public pointLightList: Array<PointLight>;

        protected event: Event3D = new Event3D();

        /**
        * @private
        */
        public static EVENT_LIGHT_RESET: string = "Event_Light_Reset";

        /**
        * @language zh_CN
        * 创建一个灯光组
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
            this.directLightList = new Array<DirectLight>();
            this.spotLightList = new Array<SpotLight>();
            this.pointLightList = new Array<PointLight>();
        }

        /**
        * @language zh_CN
        * 为灯光组,添加一个灯光
        * @param light 灯光实例对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addLight(light: LightBase) {
            switch (light.lightType){
                case LightType.directlight:
                    this.directLightList.push(<DirectLight>light);
                    this.lightNum++;

                    this.event.eventType = LightGroup.EVENT_LIGHT_RESET;
                    this.dispatchEvent(this.event);
                    break;

                case LightType.pointlight:
                    this.pointLightList.push(<PointLight>light);
                    this.lightNum++;

                    this.event.eventType = LightGroup.EVENT_LIGHT_RESET;
                    this.dispatchEvent(this.event);
                    break;

                case LightType.spotLightlight:
                    this.spotLightList.push(<SpotLight>light);
                    this.lightNum++;

                    this.event.eventType = LightGroup.EVENT_LIGHT_RESET;
                    this.dispatchEvent(this.event);
                    break;
            }

        }
                
        /**
        * @language zh_CN
        * 移除某个灯光
        * @param light 灯光实例对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeLight(light: LightBase) {
            switch (light.lightType) {
                case LightType.directlight:
                    var index: number = this.directLightList.indexOf(<DirectLight>light);
                    if (index >= 0 && index < this.directLightList.length) {
                        this.directLightList.splice(index, 1);
                        this.lightNum--;

                        this.event.eventType = LightGroup.EVENT_LIGHT_RESET;
                        this.dispatchEvent(this.event);
                    }
                    break;
                case LightType.pointlight:
                    var index: number = this.pointLightList.indexOf(<PointLight>light);
                    if (index >= 0 && index < this.pointLightList.length) {
                        this.pointLightList.splice(index, 1);
                        this.lightNum--;

                        this.event.eventType = LightGroup.EVENT_LIGHT_RESET;
                        this.dispatchEvent(this.event);
                    }
                    break;
                case LightType.spotLightlight:
                    var index: number = this.spotLightList.indexOf(<SpotLight>light);
                    if (index >= 0 && index < this.spotLightList.length) {
                        this.spotLightList.splice(index, 1);
                        this.lightNum--;

                        this.event.eventType = LightGroup.EVENT_LIGHT_RESET;
                        this.dispatchEvent(this.event);
                    }
                    break;
            }
        }
    }
} 