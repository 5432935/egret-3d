module egret3d {
    /**
    * @language zh_CN
    * @class egret3d.MeshData
    * @classdesc
    * ģ������
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MeshData extends SourceDataBase{

        /**
         * @language zh_CN
         * ������������ȫ��Ψһ
         * @version Egret 3.0
         * @platform Web,Native
         */
        public name: string;

        /**
         * @language zh_CN
         * ��Ӧ�Ĳ�����id
         * @version Egret 3.0
         * @platform Web,Native
         */
        public materialID: number = -1;

        /**
         * @language zh_CN
         * ӵ�еĶ������������б�
         * @version Egret 3.0
         * @platform Web,Native
         */
        public skinClips: Array<string>;

        /**
         * @language zh_CN
         * �������id��ȫ��Ψһ
         * @version Egret 3.0
         * @platform Web,Native
         */
        public lightIds: Array<any>;

        /**
         * @language zh_CN
         * �Ƿ����ù����ģʽ
         * @version Egret 3.0
         * @platform Web,Native
         */
        public billboard: boolean = false;

        /**
         * @language zh_CN
         * ����x
         * @version Egret 3.0
         * @platform Web,Native
         */
        public x: number = 0;

        /**
         * @language zh_CN
         * ����y
         * @version Egret 3.0
         * @platform Web,Native
         */
        public y: number = 0;

        /**
         * @language zh_CN
         * ����z
         * @version Egret 3.0
         * @platform Web,Native
         */
        public z: number = 0;

        /**
         * @language zh_CN
         * x����ת
         * @version Egret 3.0
         * @platform Web,Native
         */
        public rx: number = 0;

        /**
         * @language zh_CN
         * y����ת
         * @version Egret 3.0
         * @platform Web,Native
         */
        public ry: number = 0;

        /**
         * @language zh_CN
         * z����ת
         * @version Egret 3.0
         * @platform Web,Native
         */
        public rz: number = 0;

        /**
         * @language zh_CN
         * x������
         * @version Egret 3.0
         * @platform Web,Native
         */
        public sx: number = 1;

        /**
         * @language zh_CN
         * y������
         * @version Egret 3.0
         * @platform Web,Native
         */
        public sy: number = 1;

        /**
         * @language zh_CN
         * z������
         * @version Egret 3.0
         * @platform Web,Native
         */
        public sz: number = 1;

        /**
        * @language zh_CN
        * constructor 
        */
        public constructor() {
            super();
        }
       
    }
}