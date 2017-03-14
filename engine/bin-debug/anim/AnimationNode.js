var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @class egret3d.AnimationNode
    * @classdesc
    * 动画效果节点
    * @version Egret 3.0
    * @platform Web,Native
    */
    var AnimationNode = (function () {
        function AnimationNode() {
            /**
            * @language zh_CN
            * 顶点着色器文件名
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.vertex_ShaderName = {};
            /**
            * @language zh_CN
            * 片断着色器文件名
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.fragment_ShaderName = {};
            /**
            * @language zh_CN
            * shader attribute 变量列表
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.attributes = new Array();
        }
        /**
        * @private
        * 构建结束后需要清理掉临时数据
        */
        AnimationNode.prototype.build = function (geometry, count) {
        };
        /**
        * @private
        * 强制更新了时间之后，follow数据需要更新
        */
        AnimationNode.prototype.onAnimTimeChange = function () {
        };
        /**
        * @private
        * 导入需要用到的glsl
        */
        AnimationNode.prototype.importShader = function (isVertex, phase, name) {
            var shader = isVertex ? this.vertex_ShaderName : this.fragment_ShaderName;
            var list = shader[phase] = shader[phase] || [];
            if (list.indexOf(name) == -1) {
                list.push(name);
            }
        };
        /**
        * @private
        */
        AnimationNode.prototype.afterBuild = function () {
        };
        /**
        * @private
        */
        AnimationNode.prototype.initNode = function (data, arg) {
        };
        /**
        * @private
        */
        AnimationNode.prototype.update = function (animTime, delay, geometry) {
        };
        /**
        * @private
        */
        AnimationNode.prototype.activeState = function (time, animTime, delay, animDelay, usage, geometry, context3DProxy) {
        };
        /**
        * @private
        */
        AnimationNode.prototype.upload = function () {
        };
        /**
        * @private
        */
        AnimationNode.prototype.dispose = function () {
        };
        return AnimationNode;
    }());
    egret3d.AnimationNode = AnimationNode;
    __reflect(AnimationNode.prototype, "egret3d.AnimationNode");
})(egret3d || (egret3d = {}));
