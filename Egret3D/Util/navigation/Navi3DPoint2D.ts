module egret3d
{
    /**
    * @language zh_CN
    * @class egret3d.Navi3DPoint2D
    * @classdesc
    * ��2d�ĵ�
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Navi3DPoint2D {
        /**
        * @language zh_CN
        * ����x
        * @version Egret 3.0
        * @platform Web,Native
        */
        public x: number;

        /**
        * @language zh_CN
        * ����y
        * @version Egret 3.0
        * @platform Web,Native
        */
        public y: number;

        /**
        * @language zh_CN
        * constructor
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
        }

        /**
        * @language zh_CN
        * ���õ����õ�ָ��λ��
        * @param X   x����
        * @param Y   y����
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setTo(X: number, Y: number): void {
            this.x = X;
            this.y = Y;
        }

        /**
        * @language zh_CN
        * �Ƿ��ĳ��λ�õȼ�
        * @param X   x����
        * @param Y   y����
        * @return �Ƿ�ȼ�
        * @version Egret 3.0
        * @platform Web,Native
        */
        public equals(X: number, Y: number): boolean {
            return X == this.x && Y == this.y;
        }

		/**
        * @language zh_CN
        * �Ƿ��ĳ��λ�õȼ�
        * @param pt   ��
        * @return �Ƿ�ȼ�
        * @version Egret 3.0
        * @platform Web,Native
        */
        public equalPoint(pt: Navi3DPoint2D): boolean {
            return this.equals(pt.x, pt.y);
        }

		/**
        * @language zh_CN
        * ��ȡ����
        * @return ����
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get length(): number {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }

        /**
        * @language zh_CN
        * ��¡һ����λ�õ�
        * @return ��¡�ĵ�
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): Navi3DPoint2D {
            var point: Navi3DPoint2D = new Navi3DPoint2D();
            point.setTo(this.x, this.y);
            return point;
        }

        /**
        * @language zh_CN
        * ��׼����������Ϊ1
        * @version Egret 3.0
        * @platform Web,Native
        */
        public normalize(): void {
            var size: number = length;
            if (size == 0)
                return;
            this.setTo(this.x / size, this.y / size);
        }


    }
}