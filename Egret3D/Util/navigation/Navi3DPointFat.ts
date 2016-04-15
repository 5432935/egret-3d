module egret3d
{

    /**
    * @language zh_CN
    * @class egret3d.Navi3DPointFat
    * @classdesc
    * ���������еı��ϣ���ײ���ĵ�
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Navi3DPointFat extends Navi3DPoint {

        /**
        * @language zh_CN
        * �����˵�
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _ownerPoint: Navi3DPoint;

        /**
        * @language zh_CN
        * ������
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _ownerEdge: Navi3DEdge;

        /**
        * @language zh_CN
        * ��˵�ľ���
        * @version Egret 3.0
        * @platform Web,Native
        */
        public radius: number = 0;

        /**
        * @language zh_CN
        * constructor
        * @param    _point   �˵�
        * @param    _edge   ��
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(_point: Navi3DPoint, _edge: Navi3DEdge) {
            super(_point.id, 0, 0, 0);
            this._ownerEdge = _edge;
            this._ownerPoint = _point;
        }

        public get ownerPoint(): Navi3DPoint {
            return this._ownerPoint;
        }


        public get ownerEdge(): Navi3DEdge {
            return this._ownerEdge;
        }

        /**
        * @language zh_CN
        * ���һ����ǰ����ĸ��ƣ�����ʹ��value����λ������
        * @param    value   ����ϵ��
        * @version Egret 3.0
        * @platform Web,Native
        */
        public scalePoint(value: number = 0.7): Navi3DPointFat {
            var point: Navi3DPointFat = new Navi3DPointFat(this._ownerPoint, this._ownerEdge);
            point.copyFrom(this);
            point.decrementBy(this._ownerPoint);
            point.scaleBy(value);
            point.radius = point.length;
            point.incrementBy(this._ownerPoint);
            return point;

        }

    }
}