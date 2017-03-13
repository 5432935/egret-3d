var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @language zh_CN
    * @class egret3d.QuadAABB
    * @classdesc
    * 用于四叉树的包围盒抽象
    * @version Egret 3.0
    * @platform Web,Native
    */
    var QuadAABB = (function () {
        /**
        * @language zh_CN
        * constructor
        * @version Egret 3.0
        * @platform Web,Native
        */
        function QuadAABB() {
            /**
            * @language zh_CN
            * 最小x位置
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.minPosX = 0;
            /**
            * @language zh_CN
            * 最小y位置
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.minPosY = 0;
            /**
            * @language zh_CN
            * 最大x位置
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.maxPosX = 0;
            /**
            * @language zh_CN
            * 最大y位置
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.maxPosY = 0;
            /**
            * @language zh_CN
            * 用于记录quad框选批次
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.testID = 0;
            this.points = new Array();
            this.offsetPosition = new egret3d.Vector3(0, 0, 0, 0);
            this.clear();
        }
        /**
        * @language zh_CN
        * 将该包围盒设定到以中心点(cx,cy)，纵横距离(sideY,sidex)的范围内
        * @param cx         中心x
        * @param cy         中心y
        * @param sidex      横向范围
        * @param sidey      纵向范围
        * @version Egret 3.0
        * @platform Web,Native
        */
        QuadAABB.prototype.setAABox = function (cx, cy, sideX, sideY) {
            this.minPosX = cx - sideX / 2 - QuadAABB.TINY;
            this.maxPosX = cx + sideX / 2 + QuadAABB.TINY;
            this.minPosY = cy - sideY / 2 - QuadAABB.TINY;
            this.maxPosY = cy + sideY / 2 + QuadAABB.TINY;
            this.offsetPosition.setTo(0, 0, 0);
        };
        /**
        * @language zh_CN
        * 设置偏移量
        * @param vec        偏移坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        QuadAABB.prototype.setOffset = function (vec) {
            this.maxPosX += vec.x - this.offsetPosition.x;
            this.minPosX += vec.x - this.offsetPosition.x;
            this.minPosY += vec.z - this.offsetPosition.z;
            this.maxPosY += vec.z - this.offsetPosition.z;
            this.offsetPosition.copyFrom(vec);
        };
        /**
        * @language zh_CN
        * 设定包含某个范围
        * @param minX         中心x
        * @param minY         中心y
        * @param maxX      横向范围
        * @param maxY      纵向范围
        * @version Egret 3.0
        * @platform Web,Native
        */
        QuadAABB.prototype.setContainRect = function (minX, minY, maxX, maxY) {
            if (this.minPosX > minX)
                this.minPosX = minX;
            if (this.minPosY > minY)
                this.minPosY = minY;
            if (this.maxPosX < maxX)
                this.maxPosX = maxX;
            if (this.maxPosY < maxY)
                this.maxPosY = maxY;
        };
        /**
        * @language zh_CN
        * 重置包围盒
        * @version Egret 3.0
        * @platform Web,Native
        */
        QuadAABB.prototype.clear = function () {
            var huge = 1000000000;
            this.minPosX = this.minPosY = huge;
            this.maxPosX = this.maxPosY = -huge;
            this.points.length = 0;
            this.testID = 0;
            this.offsetPosition.setTo(0, 0, 0);
        };
        /**
        * @language zh_CN
        * 添加一个点
        * @param pos         点坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        QuadAABB.prototype.addPoint = function (pos) {
            if (this.points.indexOf(pos) == -1) {
                if (pos.x < this.minPosX)
                    this.minPosX = pos.x - QuadAABB.TINY;
                if (pos.x > this.maxPosX)
                    this.maxPosX = pos.x + QuadAABB.TINY;
                if (pos.z < this.minPosY)
                    this.minPosY = pos.z - QuadAABB.TINY;
                if (pos.z > this.maxPosY)
                    this.maxPosY = pos.z + QuadAABB.TINY;
                this.points.push(pos);
            }
        };
        /**
        * @language zh_CN
        * 获得该对象克隆
        * @version Egret 3.0
        * @platform Web,Native
        */
        QuadAABB.prototype.clone = function () {
            var aabb = new QuadAABB();
            aabb.minPosX = this.minPosX;
            aabb.minPosY = this.minPosY;
            aabb.maxPosX = this.maxPosX;
            aabb.maxPosY = this.maxPosY;
            return aabb;
        };
        Object.defineProperty(QuadAABB.prototype, "radius", {
            /**
            * @language zh_CN
            * 获得对角线长
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return Math.sqrt((this.maxPosY - this.minPosY) * (this.maxPosY - this.minPosY) + (this.maxPosX - this.minPosX) * (this.maxPosX - this.minPosX));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(QuadAABB.prototype, "sideX", {
            /**
            * @language zh_CN
            * 获得宽
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.maxPosX - this.minPosX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(QuadAABB.prototype, "sideY", {
            /**
            * @language zh_CN
            * 获得高
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this.maxPosY - this.minPosY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(QuadAABB.prototype, "centreX", {
            /**
            * @language zh_CN
            * 获得中心点x
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return (this.maxPosX - this.minPosX) * 0.5 + this.minPosX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(QuadAABB.prototype, "centreY", {
            /**
            * @language zh_CN
            * 获得中心点y
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return (this.maxPosY - this.minPosY) * 0.5 + this.minPosY;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 与另外一个包围盒碰撞测试
        * @param box        测试的碰撞对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        QuadAABB.prototype.overlapTest = function (box) {
            return ((this.minPosY >= box.maxPosY) ||
                (this.maxPosY <= box.minPosY) ||
                (this.minPosX >= box.maxPosX) ||
                (this.maxPosX <= box.minPosX)) ? false : true;
        };
        /**
        * @language zh_CN
        * 判定某个点在包围盒内
        * @param box        测试的点
        * @version Egret 3.0
        * @platform Web,Native
        */
        QuadAABB.prototype.isPointInside = function (pos) {
            return ((pos.x >= this.minPosX) &&
                (pos.x <= this.maxPosX) &&
                (pos.z >= this.minPosY) &&
                (pos.z <= this.maxPosY));
        };
        /**
        * @language zh_CN
        * 与一条线段碰撞测试
        * @param p1x        线段起点x
        * @param p1y        线段起点y
        * @param p2x        线段终点x
        * @param p2y        线段终点y
        * @version Egret 3.0
        * @platform Web,Native
        */
        QuadAABB.prototype.isIntersectLineSegment = function (p1x, p1y, p2x, p2y) {
            var isIntersect = false;
            // 直线方程p1-p2
            var A1 = p1y - p2y;
            var B1 = p2x - p1x;
            var C1 = p1x * p2y - p2x * p1y;
            // 与AABox
            var LineIntersectY = (-C1 - A1 * this.minPosX) / B1;
            if (LineIntersectY <= this.maxPosY && LineIntersectY >= this.minPosY)
                isIntersect = true;
            LineIntersectY = (-C1 - A1 * this.maxPosX) / B1;
            if (LineIntersectY <= this.maxPosY && LineIntersectY >= this.minPosY)
                isIntersect = true;
            var LineIntersectX = (-C1 - B1 * this.minPosY) / A1;
            if (LineIntersectX <= this.maxPosX && LineIntersectX >= this.minPosX)
                isIntersect = true;
            LineIntersectX = (-C1 - B1 * this.maxPosY) / A1;
            if (LineIntersectX <= this.maxPosX && LineIntersectX >= this.minPosX)
                isIntersect = true;
            return isIntersect;
        };
        return QuadAABB;
    }());
    /**
    * @language zh_CN
    * @private
    * 设定一个微小的值
    * @version Egret 3.0
    * @platform Web,Native
    */
    QuadAABB.TINY = 0.000001;
    egret3d.QuadAABB = QuadAABB;
    __reflect(QuadAABB.prototype, "egret3d.QuadAABB");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=QuadAABB.js.map