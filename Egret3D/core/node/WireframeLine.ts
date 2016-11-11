module egret3d {
    /**
    * @language zh_CN
    * @private
    * @class egret3d.Wireframe
    * @classdesc
    * 使用该类实现指定路径画3D线条。
    * 颜色会在起点和终点之间进行平滑插值
    * @see egret3d.Wireframe
    * @includeExample core/node/WireframeLine.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class WireframeLine extends Wireframe{

        private _vb: Array<number> 
        private _ib: Array<number> 

        private _start: Vector3D;
        private _end: Vector3D;
        private _startColor: number = 0xff00ff00;
        private _endColor: number = 0xff0000ff;
        /**
        * @language zh_CN
        * 输入起点和终点，创建一个绘制线段的渲染对象
        * @param start 设置线条的起点
        * @param end 设置线条的终点
        * @startColor 设置起始颜色
        * @endColor 设置终点颜色
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(start: Vector3D, end: Vector3D, startColor: number = 0xff00ff00, endColor: number = 0xff0000ff ) {
            super();
            this._vb = new Array<number>();
            this._ib = new Array<number>();

            this.material.diffuseColor = 0xffffffff;

            this.setStartAndEndPosition(start, end);
            this.setStartAndEndColor(startColor, endColor);
        }

        /**
        * @language zh_CN
        * 设置线段的起点/终点坐标
        * @param start 设置线条的起点
        * @param end 设置线条的终点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setStartAndEndPosition(start: Vector3D, end: Vector3D) {
            this._start = start; 
            this._end = end; 
            this.updateLine();
        }

        /**
        * @language zh_CN
        * 设置线段的起点/终点的颜色

        * @startColor 设置线条的起始颜色
        * @endColor 设置终点的颜色
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setStartAndEndColor(startColor: number, endColor: number) {
            this._startColor = startColor;
            this._endColor = endColor;
            this.updateLine();
        }


        private updateLine() {
            this._vb.length = 0;
            this._ib.length = 0;

            var a = Color.getColor(this._startColor);
            var b = Color.getColor(this._endColor);

            this._vb.push(this._start.x, this._start.y, this._start.z, a.x, a.y, a.z, a.w); 
            this._vb.push(this._end.x, this._end.y, this._end.z, b.x, b.y, b.z, b.w); 

            for (var i: number = 0; i < this._vb.length / 3; ++i) {
                this._ib.push(i);
            }

            this.geometry.setVerticesForIndex(0, VertexFormat.VF_POSITION | VertexFormat.VF_COLOR, this._vb, this._vb.length / 7);
            this.geometry.setVertexIndices(0, this._ib);
        }

    }
}