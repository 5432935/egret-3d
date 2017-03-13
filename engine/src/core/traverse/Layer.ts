module egret3d {

    /**
    * @class egret3d.Layer
    * @classdesc
    * Object3D 渲染Layer
    * 每个Layer分两个渲染列表，一个是有alpha的对象列表，另一个是没有alpha的对象列表
    * 不同的Layer层级可以使用不同的渲染方式，来达到各组不同的渲染效果.
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Layer {

        /**
        * @language zh_CN
        * 普通对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static TAG_NAME_NORMAL_OBJECT = "normalObject";

        /**
        * @language zh_CN
        * 带alpha的普通对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        //public static TAG_NAME_NORMAL_ALPHA_OBJECT = "normalAlphaObject";

        /**
        * @language zh_CN
        * 带alpha对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static TAG_NAME_ALPHA_OBJECT = "alphaObject";

        /**
        * @language zh_CN
        * 贴花对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        //public static TAG_NAME_DECAL = "decal";

        /**
        * @language zh_CN
        * 特效对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        //public static TAG_NAME_EFFECT = "effect";

        /**
        * @language zh_CN
        * GUI对象 
        * @version Egret 3.0
        * @platform Web,Native
        */
       // public static TAG_NAME_GUI = "gui";

        /**
        * @language zh_CN
        * 渲染类型
        * 渲染顺序按照此列表的顺序
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static layerType: string[] = ["normalObject", "normalAlphaObject", "alphaObject", "decal", "effect", "gui"];

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        //public static layerTypeThan: number[] = [3, 2, 1, 0];

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        //public static layerNumber: number = 5; 

        
    }
} 