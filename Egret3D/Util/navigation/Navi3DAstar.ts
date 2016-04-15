module egret3d
{
    /**
    * @language zh_CN
    * @class egret3d.Navi3DAstar
    * @classdesc
    * ����Navigation Mesh��Ѱ·��A���㷨
    * @version Egret 3.0
    * @platform Web,Native
    */
	export class Navi3DAstar
    {
        /**
        * @language zh_CN
        * ������
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _openedList: Array<Navi3DTriangle>;

        /**
        * @language zh_CN
        * ������
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _closedList: Array<Navi3DTriangle>;

        /**
        * @language zh_CN
        * �յ�
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _endNode: Navi3DTriangle;

        /**
        * @language zh_CN
        * ���
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _startNode: Navi3DTriangle;

        /**
        * @language zh_CN
        * ���Ǵ�
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _triangleChannel: Array<Navi3DTriangle>;

        /**
        * @language zh_CN
        * Ѱ·������
        * @version Egret 3.0
        * @platform Web,Native
        */
		private _navMesh:Navi3DMesh;

        /**
        * @language zh_CN
        * ����Ѱ·ʱ��id���
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _findIndex: number = 0;

        /**
        * @language zh_CN
        * constructor
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            this._openedList = new Array<Navi3DTriangle>();
            this._closedList = new Array<Navi3DTriangle>();
        }

        /**
        * @language zh_CN
        * ��ʼ��Ѱ·������������յ�
        * param navMesh ������mesh����
        * param startTriangle ��ʼ������
        * param endTriangle ����������
        * @return �Ƿ������ɹ�
        * @version Egret 3.0
        * @platform Web,Native
        */
		public findPath(navMesh:Navi3DMesh, startTriangle:Navi3DTriangle, endTriangle:Navi3DTriangle):boolean
		{
			this._findIndex ++;
            this._navMesh = navMesh;
			
            this._startNode = startTriangle;
            this._endNode = endTriangle;
			
            this._openedList.length = 0;
            this._closedList.length = 0;
			
            if (this._startNode && this._endNode)
			{
                this._startNode.g = 0;
                this._startNode.h = 0;
                this._startNode.f = 0;
				
                return this.search();
			}
			return false;
		}

        /**
        * @language zh_CN
        * ��Ѱ
        * @return �Ƿ������ɹ�
        * @version Egret 3.0
        * @platform Web,Native
        */
        private search(): boolean
		{
            var node: Navi3DTriangle = this._startNode;
            var neibours: Array<Navi3DTriangle> = new Array<Navi3DTriangle>();
            var test: Navi3DTriangle;
            while (node != this._endNode)
			{
				neibours = node.getNeibourTriangles(neibours, Navi3DMaskType.WalkAble, Navi3DMaskType.WalkAble);
				for (test of neibours)
				{
					if(test == node || !test.walkAble)
					{
						continue;
					}
                    var g: number = node.g + Navi3DPoint.calcDistance(test, node) * test.costMultiplier;
                    var h: number = Navi3DPoint.calcDistance(test, this._endNode);
                    var f: number = g + h;
                    if (test.openId == this._findIndex || test.closeId == this._findIndex)
					{
						if(test.f > f)
						{
							test.f = f;
							test.g = g;
							test.h = h;
							test.parent = node;
						}
					}
					else
					{
						test.f = f;
						test.g = g;
						test.h = h;
						test.parent = node;
                        test.openId = this._findIndex;
                        this._openedList.push(test);
					}
				}
                node.closeId = this._findIndex;
                this._closedList.push(node);
                if (this._openedList.length == 0)
				{
//					trace("no path found");
					return false;
				}
                this._openedList.sort(this.sortFun);
                node = <Navi3DTriangle>(this._openedList.shift());
			}
			this.buildPath();
			return true;
        }

        /**
        * @language zh_CN
        * ��������
        * @param a ���ڱȽϵ�a����
        * @param b ���ڱȽϵ�b����
        * @return 0,1,-1
        * @version Egret 3.0
        * @platform Web,Native
        */
        private sortFun(a: Navi3DTriangle, b: Navi3DTriangle): number {
            if (a.f > b.f)
                return 1;
            else if (a.f < b.f)
                return -1;
            return 0;
        }

        /**
        * @language zh_CN
        * ����·���б�
        * @version Egret 3.0
        * @platform Web,Native
        */
		private buildPath():void
		{
			this._triangleChannel = [];
            var node: Navi3DTriangle = this._endNode;
            this._triangleChannel.push(node);
            while (node != this._startNode)
			{
				node = node.parent;
                this._triangleChannel.unshift(node);
			}
		}

        /**
        * @language zh_CN
        * ��ȡ������ݣ����Ǵ���
        * @version Egret 3.0
        * @platform Web,Native
        */
		public get channel():Array<Navi3DTriangle>
		{
            return this._triangleChannel;
		}
		
		
	}
	
	
	
	
	
	
	
}
