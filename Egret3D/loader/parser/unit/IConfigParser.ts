module egret3d {
    /*
    * @private
    */
    export class IConfigParser {

        public static TYPE_SCENE: string = "scene";
        public static TYPE_SKIN_MESH: string = "ShinnedMesh";
        public static TYPE_EFFECT_GROUP: string = "EffectGroup";
        public static TYPE_PARTICLE: string = "ParticleConfig";
        public static TYPE_TEXTUREPACKER: string = "TexturePacker";

        /**
        * @language zh_CN
        * 粒子的版本号
        * @version Egret 3.0
        * @platform Web,Native
        */
        public version: number;

        /**
        * @language zh_CN
        * 文件类型
        * @version Egret 3.0
        * @platform Web,Native
        */
        public type: string;

        /**
        * @language zh_CN
        * 资源列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public taskDict: any = {};

        constructor(type: string) {
            this.type = type;
        }
    }
}