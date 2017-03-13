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
    * @private
    */
    var ValueType;
    (function (ValueType) {
        ValueType[ValueType["float"] = 0] = "float";
        ValueType[ValueType["vec2"] = 1] = "vec2";
        ValueType[ValueType["vec3"] = 2] = "vec3";
        ValueType[ValueType["vec4"] = 3] = "vec4";
    })(ValueType = egret3d.ValueType || (egret3d.ValueType = {}));
    /**
    * @private
    */
    var ValueShape = (function () {
        function ValueShape() {
        }
        ValueShape.prototype.calculate = function (num, valueShape) {
            if (valueShape === void 0) { valueShape = null; }
            new Error("asd");
            return null;
        };
        ValueShape.prototype.dispose = function () {
        };
        return ValueShape;
    }());
    egret3d.ValueShape = ValueShape;
    __reflect(ValueShape.prototype, "egret3d.ValueShape");
    /**
    * @private
    */
    var ConstValueShape = (function (_super) {
        __extends(ConstValueShape, _super);
        function ConstValueShape() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.valueType = ValueType.float;
            _this.value = 5;
            return _this;
        }
        ConstValueShape.prototype.calculate = function (num) {
            var values = [];
            for (var i = 0; i < num; i++) {
                values.push(this.value);
            }
            return values;
        };
        return ConstValueShape;
    }(ValueShape));
    egret3d.ConstValueShape = ConstValueShape;
    __reflect(ConstValueShape.prototype, "egret3d.ConstValueShape");
    /**
    * @private
    */
    var ConstRandomValueShape = (function (_super) {
        __extends(ConstRandomValueShape, _super);
        function ConstRandomValueShape() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.valueType = ValueType.float;
            _this.min = 0;
            _this.max = 100;
            return _this;
        }
        ConstRandomValueShape.prototype.calculate = function (num) {
            var values = [];
            for (var i = 0; i < num; i++) {
                values.push(this.min + Math.random() * (this.max - this.min));
            }
            return values;
        };
        return ConstRandomValueShape;
    }(ValueShape));
    egret3d.ConstRandomValueShape = ConstRandomValueShape;
    __reflect(ConstRandomValueShape.prototype, "egret3d.ConstRandomValueShape");
    /**
    * @private
    */
    var Vec2ConstValueShape = (function (_super) {
        __extends(Vec2ConstValueShape, _super);
        function Vec2ConstValueShape() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.valueType = ValueType.vec2;
            _this.minX = 0;
            _this.minY = 0;
            return _this;
        }
        Vec2ConstValueShape.prototype.calculate = function (num) {
            var values = [];
            for (var i = 0; i < num; i++) {
                var p = new egret3d.Point();
                p.x = this.minX;
                p.y = this.minY;
                values.push(p);
            }
            return values;
        };
        return Vec2ConstValueShape;
    }(ValueShape));
    egret3d.Vec2ConstValueShape = Vec2ConstValueShape;
    __reflect(Vec2ConstValueShape.prototype, "egret3d.Vec2ConstValueShape");
    /**
    * @private
    */
    var Vec2ConstRandomValueShape = (function (_super) {
        __extends(Vec2ConstRandomValueShape, _super);
        function Vec2ConstRandomValueShape() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.valueType = ValueType.vec2;
            _this.minX = 0;
            _this.minY = 0;
            _this.maxX = 100;
            _this.maxY = 100;
            return _this;
        }
        Vec2ConstRandomValueShape.prototype.calculate = function (num) {
            var values = [];
            for (var i = 0; i < num; i++) {
                var p = new egret3d.Point();
                p.x = this.minX + Math.random() * (this.maxX - this.minX);
                p.y = this.minY + Math.random() * (this.maxY - this.minY);
                values.push(p);
            }
            return values;
        };
        return Vec2ConstRandomValueShape;
    }(ValueShape));
    egret3d.Vec2ConstRandomValueShape = Vec2ConstRandomValueShape;
    __reflect(Vec2ConstRandomValueShape.prototype, "egret3d.Vec2ConstRandomValueShape");
    /**
    * @private
    */
    var Vec3ConstValueShape = (function (_super) {
        __extends(Vec3ConstValueShape, _super);
        function Vec3ConstValueShape() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.valueType = ValueType.vec3;
            _this.minX = 0;
            _this.minY = 0;
            _this.minZ = 0;
            return _this;
        }
        Vec3ConstValueShape.prototype.calculate = function (num) {
            var values = [];
            for (var i = 0; i < num; i++) {
                var p = new egret3d.Vector3();
                p.x = this.minX;
                p.y = this.minY;
                p.z = this.minZ;
                values.push(p);
            }
            return values;
        };
        return Vec3ConstValueShape;
    }(ValueShape));
    egret3d.Vec3ConstValueShape = Vec3ConstValueShape;
    __reflect(Vec3ConstValueShape.prototype, "egret3d.Vec3ConstValueShape");
    /**
    * @private
    */
    var Vec3ConstRandomValueShape = (function (_super) {
        __extends(Vec3ConstRandomValueShape, _super);
        function Vec3ConstRandomValueShape() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.valueType = ValueType.vec3;
            _this.minX = -50;
            _this.minY = -50;
            _this.minZ = -50;
            _this.maxX = 50;
            _this.maxY = 50;
            _this.maxZ = 50;
            return _this;
        }
        Vec3ConstRandomValueShape.prototype.calculate = function (num) {
            var values = [];
            for (var i = 0; i < num; i++) {
                var p = new egret3d.Vector3();
                p.x = this.minX + Math.random() * (this.maxX - this.minX);
                p.y = this.minY + Math.random() * (this.maxY - this.minY);
                p.z = this.minZ + Math.random() * (this.maxZ - this.minZ);
                values.push(p);
            }
            return values;
        };
        return Vec3ConstRandomValueShape;
    }(ValueShape));
    egret3d.Vec3ConstRandomValueShape = Vec3ConstRandomValueShape;
    __reflect(Vec3ConstRandomValueShape.prototype, "egret3d.Vec3ConstRandomValueShape");
    /**
    * @private
    */
    var CubeVector3DValueShape = (function (_super) {
        __extends(CubeVector3DValueShape, _super);
        function CubeVector3DValueShape() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.valueType = ValueType.vec3;
            _this.width = 100;
            _this.height = 100;
            _this.depth = 100;
            return _this;
        }
        /**
        * @language zh_CN
        * @param num
        * @param parameters [width, height, depth]
        * @returns Vector3[]
        */
        CubeVector3DValueShape.prototype.calculate = function (num) {
            var values = [];
            var val;
            for (var i = 0; i < num; i++) {
                val = new egret3d.Vector3();
                val.x = Math.random() * this.width - (this.width * 0.5);
                val.y = Math.random() * this.height - (this.height * 0.5);
                val.z = Math.random() * this.depth - (this.depth * 0.5);
                values.push(val);
            }
            return values;
        };
        return CubeVector3DValueShape;
    }(ValueShape));
    egret3d.CubeVector3DValueShape = CubeVector3DValueShape;
    __reflect(CubeVector3DValueShape.prototype, "egret3d.CubeVector3DValueShape");
    /**
    * @private
    */
    var PlaneValueShape = (function (_super) {
        __extends(PlaneValueShape, _super);
        function PlaneValueShape() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.valueType = ValueType.vec3;
            _this.width = 100;
            _this.height = 100;
            return _this;
        }
        PlaneValueShape.prototype.calculate = function (num) {
            var values = [];
            var pos;
            for (var i = 0; i < num; i++) {
                pos = new egret3d.Vector3();
                pos.x = Math.random() * this.width - (this.width * 0.5);
                pos.y = 0;
                pos.z = Math.random() * this.height - (this.height * 0.5);
                values.push(pos);
            }
            return values;
        };
        return PlaneValueShape;
    }(ValueShape));
    egret3d.PlaneValueShape = PlaneValueShape;
    __reflect(PlaneValueShape.prototype, "egret3d.PlaneValueShape");
    /**
    * @private
    * 圆锥体
    */
    var ConeValueShape = (function (_super) {
        __extends(ConeValueShape, _super);
        function ConeValueShape() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.valueType = ValueType.vec3;
            _this.radius = 20;
            _this.angle = 20;
            _this.length = 20;
            _this.coneType = egret3d.ParticleConeShapeType.Volume;
            return _this;
        }
        ConeValueShape.prototype.dispose = function () {
            if (this.directions) {
                this.directions.length = 0;
            }
            this.origPoint = null;
            this.directions = null;
        };
        ConeValueShape.prototype.calculate = function (count) {
            if (this.angle > 90) {
                this.angle = 90;
            }
            if (this.radius <= 0) {
                this.radius = 0.01;
            }
            if (this.angle == 90) {
                this.origPoint = new egret3d.Vector3();
            }
            else if (this.angle == 0) {
                this.origPoint = null;
            }
            else {
                this.origPoint = new egret3d.Vector3();
                this.origPoint.z = -this.radius / Math.tan(this.angle * Math.PI / 180);
            }
            var values;
            this.directions = [];
            if (this.coneType == egret3d.ParticleConeShapeType.Volume) {
                if (this.angle == 90) {
                    values = this.calculateBase(count);
                }
                else {
                    values = this.calculateVolume(count);
                }
            }
            else if (this.coneType == egret3d.ParticleConeShapeType.VolumeShell) {
                if (this.angle == 90) {
                    values = this.calculateBaseShell(count);
                }
                else {
                    values = this.calculateVolumeShell(count);
                }
            }
            else if (this.coneType == egret3d.ParticleConeShapeType.Base) {
                values = this.calculateBase(count);
            }
            else if (this.coneType == egret3d.ParticleConeShapeType.BaseShell) {
                values = this.calculateBaseShell(count);
            }
            return values;
        };
        //在底部圆的内部随机一个位置
        ConeValueShape.prototype.calculateBase = function (count) {
            var pos;
            var dir;
            var values = [];
            var tempAngle;
            var targetRadius;
            for (var i = 0; i < count; i++) {
                tempAngle = Math.random() * Math.PI * 2;
                pos = new egret3d.Vector3();
                pos.z = 0;
                targetRadius = Math.random() * this.radius;
                pos.x = Math.sin(tempAngle) * targetRadius;
                pos.y = Math.cos(tempAngle) * targetRadius;
                if (this.origPoint) {
                    dir = pos.subtract(this.origPoint);
                    dir.normalize();
                }
                else {
                    dir = new egret3d.Vector3(0, 0, 1);
                }
                values.push(pos);
                this.directions.push(dir);
            }
            return values;
        };
        //在底部圆的周围随机一个位置
        ConeValueShape.prototype.calculateBaseShell = function (count) {
            var pos;
            var dir;
            var values = [];
            var tempAngle;
            var targetRadius;
            for (var i = 0; i < count; i++) {
                tempAngle = Math.random() * Math.PI * 2;
                pos = new egret3d.Vector3();
                pos.z = 0;
                targetRadius = this.radius;
                pos.x = Math.sin(tempAngle) * targetRadius;
                pos.y = Math.cos(tempAngle) * targetRadius;
                if (this.origPoint) {
                    dir = pos.subtract(this.origPoint);
                    dir.normalize();
                }
                else {
                    dir = new egret3d.Vector3(0, 0, 1);
                }
                values.push(pos);
                this.directions.push(dir);
            }
            return values;
        };
        //在圆锥体内随机一个位置
        ConeValueShape.prototype.calculateVolume = function (count) {
            var pos;
            var dir;
            var values = [];
            var tempAngle;
            var targetRadius;
            for (var i = 0; i < count; i++) {
                tempAngle = Math.random() * Math.PI * 2;
                pos = new egret3d.Vector3();
                pos.z = this.length * Math.random();
                targetRadius = this.radius * Math.random();
                if (this.origPoint) {
                    targetRadius *= (pos.z - this.origPoint.z) / (-this.origPoint.z);
                }
                pos.x = Math.sin(tempAngle) * targetRadius;
                pos.y = Math.cos(tempAngle) * targetRadius;
                if (this.origPoint) {
                    dir = pos.subtract(this.origPoint);
                    dir.normalize();
                }
                else {
                    dir = new egret3d.Vector3(0, 0, 1);
                }
                values.push(pos);
                this.directions.push(dir);
            }
            return values;
        };
        //在圆锥体圆筒壳随机一个位置
        ConeValueShape.prototype.calculateVolumeShell = function (count) {
            var pos;
            var dir;
            var values = [];
            var tempAngle;
            var targetRadius;
            for (var i = 0; i < count; i++) {
                tempAngle = Math.random() * Math.PI * 2;
                pos = new egret3d.Vector3();
                pos.z = this.length * Math.random();
                targetRadius = this.radius;
                if (this.origPoint) {
                    targetRadius *= (pos.z - this.origPoint.z) / (-this.origPoint.z);
                }
                pos.x = Math.sin(tempAngle) * targetRadius;
                pos.y = Math.cos(tempAngle) * targetRadius;
                if (this.origPoint) {
                    dir = pos.subtract(this.origPoint);
                    dir.normalize();
                }
                else {
                    dir = new egret3d.Vector3(0, 0, 1);
                }
                values.push(pos);
                this.directions.push(dir);
            }
            return values;
        };
        //在圆锥体的顶部随机一个位置
        ConeValueShape.prototype.randomPosAtTop = function () {
            var pos = ConeValueShape.randomPosTop;
            var values = [];
            var tempAngle;
            var targetRadius;
            tempAngle = Math.random() * Math.PI * 2;
            pos.z = this.length;
            if (this.origPoint) {
                targetRadius = this.radius * Math.random();
                targetRadius *= (pos.z - this.origPoint.z) / (-this.origPoint.z);
                pos.x = Math.sin(tempAngle) * targetRadius;
                pos.y = Math.cos(tempAngle) * targetRadius;
                pos.decrementBy(this.origPoint);
            }
            else {
                pos.x = pos.y = 0;
            }
        };
        /*
        * @private 获取一个随机方向
        */
        ConeValueShape.prototype.randomDirectionToTop = function (result) {
            this.randomPosAtTop();
            result.copyFrom(ConeValueShape.randomPosTop);
            result.normalize();
        };
        return ConeValueShape;
    }(ValueShape));
    ConeValueShape.randomPosTop = new egret3d.Vector3();
    egret3d.ConeValueShape = ConeValueShape;
    __reflect(ConeValueShape.prototype, "egret3d.ConeValueShape");
    /**
    * @private
    * 线性分布
    */
    var LineValueShape = (function (_super) {
        __extends(LineValueShape, _super);
        function LineValueShape() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.valueType = ValueType.vec3;
            _this.points = [new egret3d.Vector3(), new egret3d.Vector3(100, 0, 0), new egret3d.Vector3(100, 200, 0)];
            return _this;
        }
        LineValueShape.prototype.calculate = function (num) {
            if (this.points.length == 1)
                return this.points;
            var values = [];
            var pos;
            var numLen = 0;
            var segment = 0;
            for (var i = 1; i < this.points.length; i++) {
                numLen += egret3d.Vector3.distance(this.points[i - 1], this.points[i]);
            }
            segment = numLen / num;
            var ntmp = new egret3d.Vector3();
            var sourceD = 0;
            var nD = 0;
            var len = 0;
            for (var i = 1; i < this.points.length; i++) {
                ntmp.x = this.points[i].x - this.points[i - 1].x;
                ntmp.y = this.points[i].y - this.points[i - 1].y;
                ntmp.z = this.points[i].z - this.points[i - 1].z;
                ntmp.normalize();
                ntmp.scaleBy(segment + len);
                sourceD = egret3d.Vector3.distance(this.points[i - 1], this.points[i]);
                nD = egret3d.Vector3.distance(ntmp, this.points[i]);
                if (nD > sourceD) {
                    len += nD;
                }
            }
            return values;
        };
        return LineValueShape;
    }(ValueShape));
    __reflect(LineValueShape.prototype, "LineValueShape");
    /**
    * @private
    * 球内分布
    */
    var BallValueShape = (function (_super) {
        __extends(BallValueShape, _super);
        function BallValueShape() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.valueType = ValueType.vec3;
            _this.r = 10;
            _this.fromShell = false;
            return _this;
        }
        //parameters = [R]
        BallValueShape.prototype.calculate = function (num) {
            var values = [];
            values = this.getPoints1(num, this.r);
            return values;
        };
        BallValueShape.prototype.getPoints1 = function (num, r) {
            var values = [];
            var x;
            var y;
            var z;
            var pos;
            var radio = new egret3d.Vector3(0, 0, 0);
            for (var i = 0; i < num; i++) {
                x = Math.random() * 2 * r - r;
                y = Math.random() * 2 * r - r;
                z = Math.random() * 2 * r - r;
                pos = new egret3d.Vector3(x, y, z);
                //表面发射
                if (this.fromShell) {
                    pos.normalize(this.r);
                }
                if (egret3d.Vector3.distance(radio, pos) > r) {
                    i--;
                }
                else {
                    values.push(pos);
                }
            }
            return values;
        };
        return BallValueShape;
    }(ValueShape));
    egret3d.BallValueShape = BallValueShape;
    __reflect(BallValueShape.prototype, "egret3d.BallValueShape");
    /**
    * @private
    * 半球内分布
    */
    var HemiBallValueShape = (function (_super) {
        __extends(HemiBallValueShape, _super);
        function HemiBallValueShape() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.valueType = ValueType.vec3;
            _this.r = 10;
            _this.fromShell = false;
            return _this;
        }
        //parameters = [R]
        HemiBallValueShape.prototype.calculate = function (num) {
            var values = [];
            values = this.getPoints(num, this.r);
            return values;
        };
        HemiBallValueShape.prototype.getPoints = function (num, r) {
            var values = [];
            var x;
            var y;
            var z;
            var pos;
            var radio = new egret3d.Vector3(0, 0, 0);
            for (var i = 0; i < num; i++) {
                x = Math.random() * 2 * r - r;
                y = Math.random() * 2 * r - r;
                z = Math.abs(Math.random() * 2 * r - r);
                pos = new egret3d.Vector3(x, y, z);
                //表面发射
                if (this.fromShell) {
                    pos.normalize(this.r);
                }
                if (egret3d.Vector3.distance(radio, pos) > r) {
                    i--;
                }
                else {
                    values.push(pos);
                }
            }
            return values;
        };
        return HemiBallValueShape;
    }(ValueShape));
    egret3d.HemiBallValueShape = HemiBallValueShape;
    __reflect(HemiBallValueShape.prototype, "egret3d.HemiBallValueShape");
    /**
    * @private
    * 平面圆
    */
    var CircleValueShape = (function (_super) {
        __extends(CircleValueShape, _super);
        function CircleValueShape() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.valueType = ValueType.vec3;
            return _this;
        }
        CircleValueShape.prototype.calculate = function (num) {
            var parameters = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                parameters[_i - 1] = arguments[_i];
            }
            var values;
            var tmpPar = parameters[0];
            var r = tmpPar[0];
            //var time: number = new Date().getTime();
            values = this.createRandomPoint1(num, r); //createRandomPoint1 比 createRandomPoint2 大部分情况下快了15% - 25%, 少数情况下略高于createRandomPoint2
            //console.log('createRandomPoint1 cost time: ', new Date().getTime() - time);
            //time = new Date().getTime();
            //this.createRandomPoint2(num, r);
            //console.log('createRandomPoint2 cost time: ', new Date().getTime() - time);
            return values;
        };
        //非稳定算法.但是因为没有三角函数和开平方的计算.反而在大部分情况下效率会更高
        CircleValueShape.prototype.createRandomPoint1 = function (num, r) {
            var values = [];
            var d = r * 2;
            for (var i = 0; i < num; i++) {
                var x = Math.random() * d - r;
                var z = Math.random() * d - r;
                if ((x * x + z * z) > (r * r)) {
                    i--;
                }
                else {
                    values.push(new egret3d.Vector3(x, 0, z));
                }
            }
            return values;
        };
        CircleValueShape.prototype.createRandomPoint2 = function (num, r) {
            var values = [];
            var pos;
            var tempR;
            var theta;
            for (var i = 0; i < num; i++) {
                pos = new egret3d.Vector3();
                tempR = Math.sqrt(Math.random()) * r;
                theta = Math.random() * 360;
                pos.x = tempR * Math.sin(theta);
                pos.z = tempR * Math.cos(theta);
                pos.y = 0;
                values.push(pos);
            }
            return values;
        };
        return CircleValueShape;
    }(ValueShape));
    __reflect(CircleValueShape.prototype, "CircleValueShape");
    /**
     * @private
     */
    var Mesh3DValueShape = (function (_super) {
        __extends(Mesh3DValueShape, _super);
        function Mesh3DValueShape() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.valueType = ValueType.vec3;
            _this.normalList = [];
            _this.type = egret3d.ParticleMeshShapeType.Edge;
            _this.scale = 1;
            return _this;
        }
        /**
        * @language zh_CN
        * @param num
        * @param parameters [width, height, depth]
        * @returns Vector3[]
        */
        Mesh3DValueShape.prototype.calculate = function (num) {
            var values = [];
            if (this.type == egret3d.ParticleMeshShapeType.Edge) {
                this.edgePosition(values, num);
            }
            else if (this.type == egret3d.ParticleMeshShapeType.Triangle) {
                this.trianglePosition(values, num);
            }
            else if (this.type == egret3d.ParticleMeshShapeType.Vertex) {
                this.vertexPosition(values, num);
            }
            if (this.scale != 1 && this.scale != 0) {
                var vec;
                for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                    vec = values_1[_i];
                    vec.scaleBy(this.scale);
                }
            }
            return values;
        };
        Mesh3DValueShape.prototype.edgePosition = function (values, num) {
            var val;
            var normal;
            var triangleCount = this.geometry.faceCount;
            var vc1;
            var vc2;
            var random;
            var indexList = [];
            var xyz = [];
            for (var i = 0; i < num; i++) {
                val = new egret3d.Vector3();
                values.push(val);
                indexList.length = 0;
                var index = 3 * Math.floor(triangleCount * Math.random()); //第n个三角形
                this.geometry.getVertexIndices(index, 3, indexList);
                //获取三角形的三个顶点
                xyz.length = 0;
                this.geometry.getVertexForIndex(indexList[0], egret3d.VertexFormat.VF_POSITION, xyz);
                Mesh3DValueShape.vct1.setTo(xyz[0], xyz[1], xyz[2]);
                xyz.length = 0;
                this.geometry.getVertexForIndex(indexList[1], egret3d.VertexFormat.VF_POSITION, xyz);
                Mesh3DValueShape.vct2.setTo(xyz[0], xyz[1], xyz[2]);
                xyz.length = 0;
                this.geometry.getVertexForIndex(indexList[2], egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_NORMAL, xyz);
                Mesh3DValueShape.vct3.setTo(xyz[0], xyz[1], xyz[2]);
                normal = new egret3d.Vector3();
                normal.setTo(xyz[3], xyz[4], xyz[5]);
                this.normalList.push(normal);
                //在三角形上获得一条边
                random = Math.random();
                if (random < 0.333) {
                    vc1 = Mesh3DValueShape.vct1;
                    vc2 = Mesh3DValueShape.vct2;
                }
                else if (random < 0.666) {
                    vc1 = Mesh3DValueShape.vct2;
                    vc2 = Mesh3DValueShape.vct3;
                }
                else {
                    vc1 = Mesh3DValueShape.vct3;
                    vc2 = Mesh3DValueShape.vct1;
                }
                //在这条直线上随机一个位置
                vc1.lerp(vc1, vc2, Math.random());
                val.copyFrom(vc1);
            }
        };
        Mesh3DValueShape.prototype.trianglePosition = function (values, num) {
            var val;
            var normal;
            var triangleCount = this.geometry.faceCount;
            var vc1 = new egret3d.Vector3();
            var vc2 = new egret3d.Vector3();
            var random;
            var xyz = [];
            var indexList = [];
            for (var i = 0; i < num; i++) {
                val = new egret3d.Vector3();
                values.push(val);
                indexList.length = 0;
                var index = 3 * Math.floor(triangleCount * Math.random()); //第n个三角形
                this.geometry.getVertexIndices(index, 3, indexList);
                //获取三角形的三个顶点
                xyz.length = 0;
                this.geometry.getVertexForIndex(indexList[0], egret3d.VertexFormat.VF_POSITION, xyz);
                Mesh3DValueShape.vct1.setTo(xyz[0], xyz[1], xyz[2]);
                xyz.length = 0;
                this.geometry.getVertexForIndex(indexList[1], egret3d.VertexFormat.VF_POSITION, xyz);
                Mesh3DValueShape.vct2.setTo(xyz[0], xyz[1], xyz[2]);
                xyz.length = 0;
                this.geometry.getVertexForIndex(indexList[2], egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_NORMAL, xyz);
                Mesh3DValueShape.vct3.setTo(xyz[0], xyz[1], xyz[2]);
                normal = new egret3d.Vector3();
                normal.setTo(xyz[3], xyz[4], xyz[5]);
                this.normalList.push(normal);
                //在两条边上分别随机一个位置
                vc1.lerp(Mesh3DValueShape.vct1, Mesh3DValueShape.vct2, Math.random());
                vc2.lerp(Mesh3DValueShape.vct2, Mesh3DValueShape.vct3, Math.random());
                //连接两个随机位置的线段，之间随机一个位置
                val.lerp(vc1, vc2, Math.random());
            }
        };
        Mesh3DValueShape.prototype.vertexPosition = function (values, num) {
            var val;
            var normal;
            var triangleCount = this.geometry.faceCount;
            var random;
            var indexList = [];
            var xyz = [];
            for (var i = 0; i < num; i++) {
                val = new egret3d.Vector3();
                values.push(val);
                var index = 3 * Math.floor(triangleCount * Math.random()); //第n个三角形
                indexList.length = 0;
                this.geometry.getVertexIndices(index, 3, indexList);
                //获取三角形的三个顶点
                xyz.length = 0;
                this.geometry.getVertexForIndex(indexList[0], egret3d.VertexFormat.VF_POSITION, xyz);
                Mesh3DValueShape.vct1.setTo(xyz[0], xyz[1], xyz[2]);
                xyz.length = 0;
                this.geometry.getVertexForIndex(indexList[1], egret3d.VertexFormat.VF_POSITION, xyz);
                Mesh3DValueShape.vct2.setTo(xyz[0], xyz[1], xyz[2]);
                xyz.length = 0;
                this.geometry.getVertexForIndex(indexList[2], egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_NORMAL, xyz);
                Mesh3DValueShape.vct3.setTo(xyz[0], xyz[1], xyz[2]);
                normal = new egret3d.Vector3();
                normal.setTo(xyz[3], xyz[4], xyz[5]);
                this.normalList.push(normal);
                //在三角形上获得一个顶点
                random = Math.random();
                if (random < 0.333) {
                    val.copyFrom(Mesh3DValueShape.vct1);
                }
                else if (random < 0.666) {
                    val.copyFrom(Mesh3DValueShape.vct2);
                }
                else {
                    val.copyFrom(Mesh3DValueShape.vct3);
                }
            }
        };
        Mesh3DValueShape.prototype.calcNormal = function (pt0, pt1, pt2) {
            Mesh3DValueShape.crsVector1.setTo(pt1.x - pt0.x, pt1.y - pt0.y, pt1.z - pt0.z);
            Mesh3DValueShape.crsVector2.setTo(pt2.x - pt0.x, pt2.y - pt0.y, pt2.z - pt0.z);
            Mesh3DValueShape.crsVector1.normalize();
            Mesh3DValueShape.crsVector2.normalize();
            this.normal = Mesh3DValueShape.crsVector2.crossProduct(Mesh3DValueShape.crsVector1);
            this.normal.normalize();
            return this.normal;
        };
        return Mesh3DValueShape;
    }(ValueShape));
    Mesh3DValueShape.vct1 = new egret3d.Vector3();
    Mesh3DValueShape.vct2 = new egret3d.Vector3();
    Mesh3DValueShape.vct3 = new egret3d.Vector3();
    Mesh3DValueShape.crsVector1 = new egret3d.Vector3();
    Mesh3DValueShape.crsVector2 = new egret3d.Vector3();
    egret3d.Mesh3DValueShape = Mesh3DValueShape;
    __reflect(Mesh3DValueShape.prototype, "egret3d.Mesh3DValueShape");
    /**
    * @private
    * 贝塞尔曲线, 以Y为平面, parameters = [p0, p1, p2, p3]
    */
    var BezierCurveValueShape = (function (_super) {
        __extends(BezierCurveValueShape, _super);
        function BezierCurveValueShape() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.valueType = ValueType.vec3;
            return _this;
        }
        BezierCurveValueShape.prototype.calculate = function (num) {
            var parameters = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                parameters[_i - 1] = arguments[_i];
            }
            var values = [];
            //var tmpPar = parameters[0];
            var tmpPar = [];
            tmpPar.push(new egret3d.Vector3(0, 0, 0));
            tmpPar.push(new egret3d.Vector3(-200, 1000, 700));
            tmpPar.push(new egret3d.Vector3(200, -50, 300));
            tmpPar.push(new egret3d.Vector3(-300, -220, 500));
            var p0 = tmpPar[0];
            var p1 = tmpPar[1];
            var p2 = tmpPar[2];
            var p3 = tmpPar[3];
            var t;
            var yt;
            var x;
            var y;
            var z;
            for (var i = 0; i < num; i++) {
                t = Math.random();
                yt = 1 - t;
                x = p0.x * yt * yt * yt + 3 * p1.x * yt * yt * t + 3 * p2.x * yt * t * t + p3.x * t * t * t;
                y = p0.y * yt * yt * yt + 3 * p1.y * yt * yt * t + 3 * p2.y * yt * t * t + p3.y * t * t * t;
                z = p0.z * yt * yt * yt + 3 * p1.z * yt * yt * t + 3 * p2.z * yt * t * t + p3.z * t * t * t;
                values.push(new egret3d.Vector3(x, y, z));
            }
            return values;
        };
        return BezierCurveValueShape;
    }(ValueShape));
    __reflect(BezierCurveValueShape.prototype, "BezierCurveValueShape");
    /**
   * @private
   * 外部指定的位置
   */
    var ValueShapeExternal = (function (_super) {
        __extends(ValueShapeExternal, _super);
        function ValueShapeExternal() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.valueType = ValueType.vec3;
            return _this;
        }
        ValueShapeExternal.prototype.calculate = function (num) {
            var parameters = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                parameters[_i - 1] = arguments[_i];
            }
            var values = this.positionList.slice();
            return values;
        };
        return ValueShapeExternal;
    }(ValueShape));
    egret3d.ValueShapeExternal = ValueShapeExternal;
    __reflect(ValueShapeExternal.prototype, "egret3d.ValueShapeExternal");
    /**
    * @private
    */
    var Value = (function () {
        function Value() {
            this.emitter = {};
            //this.emitter[ValueType.constValue] = new ConstValueShape();
            //this.emitter[ValueType.line] = new LineValueShape();
            //this.emitter[ValueType.plane] = new PlaneValueShape();
            //this.emitter[ValueType.cube3D] = new CubeVector3DValueShape();
            //this.emitter[ValueType.sphere] = new BallValueShape();
            //this.emitter[ValueType.sphere_plane] = new BallSurfaceValueShape();
            //this.emitter[ValueType.cylinder] = new CylinderValueShape();
        }
        Value.calculate = function (count, valueShape) {
            return valueShape.calculate(count, valueShape);
        };
        Value.getValues = function (count, valueType, parameters) {
        };
        return Value;
    }());
    Value._instance = new Value();
    egret3d.Value = Value;
    __reflect(Value.prototype, "egret3d.Value");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Value.js.map