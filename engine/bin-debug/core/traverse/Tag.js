var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @class egret3d.Tag
    * @classdesc
    * Object3D 渲染tag
    * 图形属性标签页的属性，由layer列表组成，共用深度信息
    * 渲染每个tag他们的深度信息是不清理的
    * 渲染顺序会根据 Tag.name来进行渲染
    * 渲染顺序按照
    * @see egret3d.Layer
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Tag = (function () {
        function Tag() {
            /**
            * @language zh_CN
            * 根据类型进行渲染排序
            * @see egret3d.Layer
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.name = "normalObject";
            /*
            * @private
            */
            this.clearDepth = false;
            // /**
            //* @language zh_CN
            //* 没有alpha的对象列表
            //*/
            // public objects: Array<Object3D> = new Array<Object3D>();
            // /**
            //  * @language zh_CN
            //  * layer 列表
            //  */
            // public layers: Array<Layer> = new Array<Layer>();
            // /**
            // * @language zh_CN
            // * 有alpha的对象列表
            // */
            // public alphaObjects: Array<Object3D> = new Array<Object3D>();
        }
        return Tag;
    }());
    egret3d.Tag = Tag;
    __reflect(Tag.prototype, "egret3d.Tag");
})(egret3d || (egret3d = {}));
