module egret3d {
    /**
    * @language zh_CN
    * @class egret3d.MaterialSphereData
    * @classdesc
    * ���������Ч����
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MaterialSphereData extends SourceDataBase{

        /**
         * @language zh_CN
         * diffuse��ͼ��������name��
         * @version Egret 3.0
         * @platform Web,Native
         */
        public diffuseTextureName: string;

        /**
         * @language zh_CN
         * normal��ͼ��������name��
         * @version Egret 3.0
         * @platform Web,Native
         */
        public normalTextureName: string;

        /**
         * @language zh_CN
         * specular��ͼ��������name��
         * @version Egret 3.0
         * @platform Web,Native
         */
        public specularTextureName: string;
        
        /**
         * @language zh_CN
         * diffuse����ɫ��0xffffff��ʽ
         * @version Egret 3.0
         * @platform Web,Native
         */
        public diffuseColor: number;

        /**
         * @language zh_CN
         * ambient����ɫ��0xffffff��ʽ
         * @version Egret 3.0
         * @platform Web,Native
         */
        public ambientColor: number;

        /**
         * @language zh_CN
         * specular����ɫ��0xffffff��ʽ
         * @version Egret 3.0
         * @platform Web,Native
         */
        public specularColor: number;

        /**
         * @language zh_CN
         * ͸����
         * @version Egret 3.0
         * @platform Web,Native
         */
        public alpha: number;

        /**
         * @language zh_CN
         * specular��ǿ�ȼ�
         * @version Egret 3.0
         * @platform Web,Native
         */
        public specularLevel: number;

        /**
         * @language zh_CN
         * ����ϵ��
         * @version Egret 3.0
         * @platform Web,Native
         */
        public gloss: number;

        /**
         * @language zh_CN
         * ambient��ǿ��
         * @version Egret 3.0
         * @platform Web,Native
         */
        public ambientPower: number;

        /**
         * @language zh_CN
         * diffuse��ǿ��
         * @version Egret 3.0
         * @platform Web,Native
         */
        public diffusePower: number;

        /**
         * @language zh_CN
         * normal��ǿ��
         * @version Egret 3.0
         * @platform Web,Native
         */
        public normalPower: number;

        /**
         * @language zh_CN
         * �Ƿ������Ӱ
         * @version Egret 3.0
         * @platform Web,Native
         */
        public castShadow: boolean;

        /**
         * @language zh_CN
         * �Ƿ������Ӱ
         * @version Egret 3.0
         * @platform Web,Native
         */
        public acceptShadow: boolean;

        /**
         * @language zh_CN
         * �Ƿ�ƽ��������ͼ
         * @version Egret 3.0
         * @platform Web,Native
         */
        public smooth: boolean;

        /**
         * @language zh_CN
         * ������ͼ�ı�Ե�Ƿ��ظ�
         * @version Egret 3.0
         * @platform Web,Native
         */
        public repeat: boolean;

        /**
         * @language zh_CN
         * �Ƿ���˫����Ⱦ
         * @version Egret 3.0
         * @platform Web,Native
         */
        public bothside: boolean;

        /**
         * @language zh_CN
         * ����ģʽ�趨
         * @version Egret 3.0
         * @platform Web,Native
         */
        public drawMode: number;

        /**
         * @language zh_CN
         * �޳�ģʽ�趨
         * @version Egret 3.0
         * @platform Web,Native
         */
        public cullMode: number;

        /**
         * @language zh_CN
         * ����ģʽ
         * @version Egret 3.0
         * @platform Web,Native
         */
        public blendMode: number;
        
        /**
         * @language zh_CN
         * alpha����ֵ
         * @version Egret 3.0
         * @platform Web,Native
         */
        public cutAlpha: number = 0.7;

        /**
         * @language zh_CN
         * ������ӵ�е���Ч
         * @version Egret 3.0
         * @platform Web,Native
         */
        public methods: Array<MaterialMethodData>;
       
        /**
         * @language zh_CN
         * ������uv����
         * @version Egret 3.0
         * @platform Web,Native
         */
        public uvRectangle: Rectangle = new Rectangle(0, 0, 1, 1);
        /**
        * @language zh_CN
        * constructor 
        */
        constructor() {
            super();
        }
    }
}