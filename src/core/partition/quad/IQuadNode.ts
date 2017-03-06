module egret3d {

    /**
    * @private
    * @language zh_CN
    * @class egret3d.IQuadNode
    * @classdesc
    * �Ĳ�����һ���ڵ�Ľӿ�
    * @version Egret 3.0
    * @platform Web,Native
    */
    export interface IQuadNode {

        /**
        * @language zh_CN
        * ��ʼ����Χ��
        * @version Egret 3.0
        * @platform Web,Native
        */
        initAABB(): void;

        /**
        * @language zh_CN
        * �Ƿ�ýڵ���������
        * @version Egret 3.0
        * @platform Web,Native
        */
        isTriangle: boolean;

        /**
        * @language zh_CN
        * ��Χ������
        * @version Egret 3.0
        * @platform Web,Native
        */
        aabb: QuadAABB;

        /**
        * @language zh_CN
        * ����ȫ�ֵ�quadtree������
        * @version Egret 3.0
        * @platform Web,Native
        */
        calcGlobalQuadAABB(): void;

        /**
        * @language zh_CN
        * ����������ֻ����ͨ��һ�������棬���п��ܴ����������
        * @version Egret 3.0
        * @platform Web,Native
        */
        plane?: Plane3D;

    }
}
