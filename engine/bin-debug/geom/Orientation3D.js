var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @language zh_CN
     * @class egret3d.Orientation3D
     * @classdesc
     * 定义 Orientation3D 常量。</p>
     * Matrix4.decompose 会分 axisAngle、eulerAngles、quaternion这3种类型进行分解。</p>
     * 比如:</p>
     <pre>
     matrix.decompose(Orientation3D.QUATERNION)
     </pre>
     *
     * @see egret3d.Matrix4
     * @see egret3d.Quaternion
     *
     * @version Egret 3.0
     * @platform Web,Native
     */
    var Orientation3D = (function () {
        function Orientation3D() {
        }
        return Orientation3D;
    }());
    /**
    * @language zh_CN
    * 按轴旋转角度
    * @version Egret 3.0
    * @platform Web,Native
    */
    Orientation3D.AXIS_ANGLE = "axisAngle";
    /**
    * @language zh_CN
    * 按欧拉角旋转角度
    * @version Egret 3.0
    * @platform Web,Native
    */
    Orientation3D.EULER_ANGLES = "eulerAngles";
    /**
    * @language zh_CN
    * 四元数旋转角度
    * @version Egret 3.0
    * @platform Web,Native
    */
    Orientation3D.QUATERNION = "quaternion";
    egret3d.Orientation3D = Orientation3D;
    __reflect(Orientation3D.prototype, "egret3d.Orientation3D");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Orientation3D.js.map