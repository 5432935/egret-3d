module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.Navi3DEdge
    * @classdesc
    * ����Navigation Mesh��Ѱ·�������αߵĶ���
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Navi3DEdge {
        /**
        * @language zh_CN
        * ��¼�ñߵ�ͨ������
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _edgeMask: number = 0;

        /**
        * @language zh_CN
        * �߳�
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _edgeSize: number = 0;

        /**
        * @language zh_CN
        * �˵�A
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _pointA: Navi3DPoint;

        /**
        * @language zh_CN
        * �˵�B
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _pointB: Navi3DPoint;

        /**
        * @language zh_CN
        * �����������б�
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _triangleOwners: Array<Navi3DTriangle>;

        /**
        * @language zh_CN
        * �м�ĵ�
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _centerPoint: Vector3D;

        /**
        * @language zh_CN
        * �˵�A��B�ĳ���ʸ��
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _edgeDirA2B: Vector3D;

        /**
        * @language zh_CN
        * ��¼��Խ�ĵ�
        * @version Egret 3.0
        * @platform Web,Native
        */
        public crossPoint: Vector3D;

        /**
        * @language zh_CN
        * ����A�ķ��ּ���
        * @version Egret 3.0
        * @platform Web,Native
        */
        public fatPointA: Navi3DPointFat;

        /**
        * @language zh_CN
        * ����B�ķ��ּ���
        * @version Egret 3.0
        * @platform Web,Native
        */
        public fatPointB: Navi3DPointFat;

        /**
        * @language zh_CN
        * �����õ�Vector3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        private static CALC_FAT_VECTOR: Vector3D = new Vector3D();

        /**
        * @language zh_CN
        * constructor
        * @param  point0 ����0
        * @param  point1 ����1
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(point0: Navi3DPoint, point1: Navi3DPoint) {
            this._pointA = point0;
            this._pointB = point1;
            if (point0.id >= point1.id) {
                throw new Error("edge point order error!!!");
            }
            this._triangleOwners = new Array<Navi3DTriangle>();
            this._centerPoint = new Vector3D();
            this._edgeMask = Navi3DMaskType.WalkAble;
            Navi3DPoint.CALC_VECTOR3D1.setTo(point0.x - point1.x, point0.y - point1.y, point0.z - point1.z);
            this._edgeSize = Navi3DPoint.CALC_VECTOR3D1.length;

            this._centerPoint.setTo((point0.x + point1.x) / 2, (point0.y + point1.y) / 2, (point0.z + point1.z) / 2);
        }

        public get size(): Number {
            return this._edgeSize;
        }

        public get triangleOwners(): Array<Navi3DTriangle> {
            return this._triangleOwners;
        }

        public get centerPoint(): Vector3D {
            return this._centerPoint;
        }

        /**
        * @language zh_CN
        * ��ʼ�����ּ���
        * @param  radius    ����ķ��ּ��뾶
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initFatPoints(radius: number): void {
            this._edgeDirA2B = this._pointB.subtract(this._pointA);
            this._edgeDirA2B.normalize();

            this.fatPointA = this.fatPointA || new Navi3DPointFat(this._pointA, this);
            this.fatPointB = this.fatPointB || new Navi3DPointFat(this._pointB, this);

            if (this.fatPointA.radius != radius) {
                Navi3DEdge.CALC_FAT_VECTOR.copyFrom(this._edgeDirA2B);
                Navi3DEdge.CALC_FAT_VECTOR.scaleBy(radius);
                Navi3DEdge.CALC_FAT_VECTOR.incrementBy(this._pointA);
                this.fatPointA.copyFrom(Navi3DEdge.CALC_FAT_VECTOR);
                this.fatPointA.radius = radius;
            }

            if (this.fatPointB.radius != radius) {
                Navi3DEdge.CALC_FAT_VECTOR.copyFrom(this._edgeDirA2B);
                Navi3DEdge.CALC_FAT_VECTOR.scaleBy(-radius);
                Navi3DEdge.CALC_FAT_VECTOR.incrementBy(this._pointB);
                this.fatPointB.copyFrom(Navi3DEdge.CALC_FAT_VECTOR);
                this.fatPointB.radius = radius;
            }

        }


        /**
        * @language zh_CN
        * ���ݶ˵��ȡ��Ӧ�ķ��ּ���
        * @param  pt  �˵�
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getFatPoint(pt: Navi3DPoint): Navi3DPointFat {
            if (pt == this._pointA)
                return this.fatPointA;
            return this.fatPointB;
        }

        /**
        * @language zh_CN
        * ����һ���˵��ȡ����һ���˵�ķ��ּ���
        * @param  pt  �˵�
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getAnotherFatPoint(pt: Navi3DPoint): Navi3DPointFat {
            if (pt == this._pointA)
                return this.fatPointB;
            return this.fatPointA;
        }

        /**
        * @language zh_CN
        * ����һ���˵��ȡ����һ���˵�
        * @param  pt  �˵�
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getAnotherPoint(pt: Navi3DPoint): Navi3DPoint {
            if (pt == this._pointA)
                return this._pointB;
            return this._pointA;
        }

        /**
        * @language zh_CN
        * �ж�һ�����Ƿ�ȼ���ĳ���˵�
        * @param  pt ���ж��ĵ�
        * @return �ж�����˵�
        * @version Egret 3.0
        * @platform Web,Native
        */
        public containsPoint(pt: Vector3D): Navi3DPoint {
            if (Navi3DPoint.equalPoint(pt, this._pointA))
                return this._pointA;
            if (Navi3DPoint.equalPoint(pt, this._pointB))
                return this._pointB;
            return null;
        }

        /**
        * @language zh_CN
        * �������������
        * @param  triangle ����������
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addTriangleOwners(triangle: Navi3DTriangle): void {
            if (triangle.edges.indexOf(this) == -1) {
                throw new Error("the edge is not belong triangle!!!");
            }
            if (this._triangleOwners.indexOf(triangle) == -1) {
                this._triangleOwners.push(triangle);
            }
        }

        /**
        * @language zh_CN
        * ��ȡ������һ���ߵĹ����˵�
        * @param  edge ����һ����
        * @return Navi3DPoint ������
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getPublicPoint(edge: Navi3DEdge): Navi3DPoint {
            if (this._pointA == edge._pointA || this._pointA == edge._pointB) {
                return this._pointA;
            }
            else if (this._pointB == edge._pointA || this._pointB == edge._pointB) {
                return this._pointB;
            }
            return null;
        }

        /**
        * @language zh_CN
        * ����һ����񣬻�ȡ��֮�ȼ۵�һ���˵����
        * @param  p ����ĵ�
        * @return Navi3DPoint �ȼ۵Ķ˵�
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getEqualPoint(p: Vector3D): Navi3DPoint {
            if (Navi3DPoint.equalPoint(p, this._pointA))
                return this._pointA;
            if (Navi3DPoint.equalPoint(p, this._pointB))
                return this._pointB;
            return null;
        }

        public get pointA(): Navi3DPoint {
            return this._pointA;
        }

        public get pointB(): Navi3DPoint {
            return this._pointB;
        }

        public get walkAble(): Boolean {
            return (this._edgeMask & Navi3DMaskType.WalkAble) == Navi3DMaskType.WalkAble;
        }

        /**
        * @language zh_CN
        * �����Ƿ�ͨ��
        * @param  value �����Ե�ֵ
        * @return �Ƿ�ͨ��
        * @version Egret 3.0
        * @platform Web,Native
        */
        public testMask(value: number): Boolean {
            return (this._edgeMask & value) == value;
        }

    }
}