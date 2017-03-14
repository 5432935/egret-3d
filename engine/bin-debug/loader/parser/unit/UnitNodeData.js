var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @private
    * @class egret3d.UnitNodeData
    * @classdesc
    * 节点数据
    * @version Egret 3.0
    * @platform Web,Native
    */
    var UnitNodeData = (function () {
        function UnitNodeData() {
            this.type = "";
            this.insID = 0;
            this.parent = 0;
            this.name = "";
            this.staticType = "";
            this.path = "";
            this.fov = 0.0;
            this.clipNear = 0.0;
            this.clipFar = 0.0;
            this.tagName = "";
            /**
             * @language zh_CN
             * 对应的材质球id
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.materialIDs = [];
            /**
             * @language zh_CN
             * 拥有的动画剪辑名的列表
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.skinClips = [];
            /**
             * @language zh_CN
             * 拥有的动画剪辑名的列表
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.propertyAnims = [];
            /**
             * @language zh_CN
             * 是否启用公告板模式
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.billboard = false;
            this.visible = true;
            /**
             * @language zh_CN
             * 坐标x
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.x = 0;
            /**
             * @language zh_CN
             * 坐标y
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.y = 0;
            /**
             * @language zh_CN
             * 坐标z
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.z = 0;
            /**
             * @language zh_CN
             * 旋转x分量
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.rx = 0;
            /**
             * @language zh_CN
             * 旋转y分量
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.ry = 0;
            /**
             * @language zh_CN
             * 旋转z分量
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.rz = 0;
            /**
             * @language zh_CN
             * 旋转w分量
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.rw = 0;
            /**
             * @language zh_CN
             * x轴缩放
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.sx = 1;
            /**
             * @language zh_CN
             * y轴缩放
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.sy = 1;
            /**
             * @language zh_CN
             * z轴缩放
             * @version Egret 3.0
             * @platform Web,Native
             */
            this.sz = 1;
            this.skeletonAnimation = -1;
            this.propertyAnimsId = -1;
            //public texture: string = "";
            //public width: number = 0;
            //public height: number = 0;
            //public depth: number = 0;
            //public segmentsW: number = 0;
            //public segmentsH: number = 0;
            this.geometry = [];
            this.grass = [];
            this.childs = [];
            this.boneBind = {};
            this.lightIds = [];
            this.auto = false;
            this.loop = false;
            this.uv2Id = -1;
        }
        return UnitNodeData;
    }());
    egret3d.UnitNodeData = UnitNodeData;
    __reflect(UnitNodeData.prototype, "egret3d.UnitNodeData");
})(egret3d || (egret3d = {}));
