var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var egret3d;
(function (egret3d) {
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
    var WireframeLine = (function (_super) {
        __extends(WireframeLine, _super);
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
        function WireframeLine(start, end, startColor, endColor) {
            if (startColor === void 0) { startColor = 0xff00ff00; }
            if (endColor === void 0) { endColor = 0xff0000ff; }
            var _this = _super.call(this) || this;
            _this._startColor = 0xff00ff00;
            _this._endColor = 0xff0000ff;
            _this._vb = new Array();
            _this._ib = new Array();
            _this.material.diffuseColor = 0xffffffff;
            _this.setStartAndEndPosition(start, end);
            _this.setStartAndEndColor(startColor, endColor);
            return _this;
        }
        /**
        * @language zh_CN
        * 设置线段的起点/终点坐标
        * @param start 设置线条的起点
        * @param end 设置线条的终点
        * @version Egret 3.0
        * @platform Web,Native
        */
        WireframeLine.prototype.setStartAndEndPosition = function (start, end) {
            this._start = start;
            this._end = end;
            this.updateLine();
        };
        /**
        * @language zh_CN
        * 设置线段的起点/终点的颜色

        * @startColor 设置线条的起始颜色
        * @endColor 设置终点的颜色
        * @version Egret 3.0
        * @platform Web,Native
        */
        WireframeLine.prototype.setStartAndEndColor = function (startColor, endColor) {
            this._startColor = startColor;
            this._endColor = endColor;
            this.updateLine();
        };
        WireframeLine.prototype.updateLine = function () {
            this._vb.length = 0;
            this._ib.length = 0;
            var a = egret3d.Color.getColor(this._startColor);
            var b = egret3d.Color.getColor(this._endColor);
            this._vb.push(this._start.x, this._start.y, this._start.z, a.x, a.y, a.z, a.w);
            this._vb.push(this._end.x, this._end.y, this._end.z, b.x, b.y, b.z, b.w);
            for (var i = 0; i < this._vb.length / 3; ++i) {
                this._ib.push(i);
            }
            this.geometry.setVerticesForIndex(0, egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_COLOR, this._vb, this._vb.length / 7);
            this.geometry.setVertexIndices(0, this._ib);
        };
        return WireframeLine;
    }(egret3d.Wireframe));
    egret3d.WireframeLine = WireframeLine;
    __reflect(WireframeLine.prototype, "egret3d.WireframeLine");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=WireframeLine.js.map