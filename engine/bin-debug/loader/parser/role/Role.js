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
    * @class egret3d.Role
    * @classdesc
    * 角色对象多个Mesh可能共用这个SkeletonAnimation
    * @see egret3d.Object3D
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Role = (function (_super) {
        __extends(Role, _super);
        /**
        * @language zh_CN
        * 构造对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Role() {
            var _this = _super.call(this) || this;
            /**
            * @language zh_CN
            * 骨骼动画 avatar
            * @version Egret 3.0
            * @platform Web,Native
            */
            _this.avatar = {};
            return _this;
        }
        /**
        * @language zh_CN
        * @private
        * 设置 avatar
        * @param part
        * @param mesh
        * @version Egret 3.0
        * @platform Web,Native
        */
        Role.prototype.setAvatar = function (part, mesh) {
            var tmp = this.avatar[part];
            if (tmp) {
                tmp.parent.removeChild(tmp);
            }
            this.avatar[part] = mesh;
            _super.prototype.addChild.call(this, mesh);
        };
        /**
        * @language zh_CN
        * @private
        * 删除 avatar
        * @param part
        * @version Egret 3.0
        * @platform Web,Native
        */
        Role.prototype.delAvatar = function (part) {
            if (this.avatar[part]) {
                delete this.avatar[part];
            }
        };
        Role.prototype.play = function (anim, speed, reset) {
            this.skeletonAnimation.play(anim, speed, reset);
        };
        /**
        * @language zh_CN
        * @param child
        * @returns Object3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        Role.prototype.addChild = function (child) {
            if (child instanceof egret3d.Mesh) {
                this.setAvatar(child.name, child);
            }
            else {
                _super.prototype.addChild.call(this, child);
            }
            return child;
        };
        /**
        * @language zh_CN
        * 增加一个子对象,并返回当前子对象
        * 在容器中添加子对象，如果有显示接口的，将会放到场景显示树种进行渲染逻辑运算，及渲染
        * @param child 增加的子对象
        * @param index 子对象的下标
        * @returns 子对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Role.prototype.addChildAt = function (child, index) {
            if (child instanceof egret3d.Mesh) {
                this.setAvatar(child.name, child);
            }
            else {
                _super.prototype.addChildAt.call(this, child, index);
            }
            return child;
        };
        /**
        * @language zh_CN
        * 移除child子对象 并返回
        * 移除显示列表中的指定对象，如果为空将会返回
        * @param child 子对象
        * @returns Object3D 如果成功就返回child,否则返回null
        * @version Egret 3.0
        * @platform Web,Native
        */
        Role.prototype.removeChild = function (child) {
            this.delAvatar(child.name);
            return _super.prototype.removeChild.call(this, child);
        };
        /**
        * @language zh_CN
        * 移除下标为index的子对象 并返回
        * @param index 子对象的下标
        * @returns 如果成功就返回child,否则返回null
        * @version Egret 3.0
        * @platform Web,Native
        */
        Role.prototype.removeChildAt = function (index) {
            var object3d = this.getChild(index);
            if (object3d) {
                this.delAvatar(object3d.name);
            }
            return _super.prototype.removeChildAt.call(this, index);
        };
        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        Role.prototype.update = function (time, delay) {
        };
        /**
        * @language zh_CN
        * @private
        * @param other copy对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Role.prototype.copy = function (other) {
            _super.prototype.copy.call(this, other);
            //this.skeletonAnimation = other.skeletonAnimation.clone();
        };
        /**
        * @language zh_CN
        * @private
        * 克隆当前Role
        * @returns Role 克隆后的对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        Role.prototype.clone = function () {
            var cloneRole = new Role();
            var skeletonAnimation = this.skeletonAnimation.clone();
            cloneRole.skeletonAnimation = skeletonAnimation;
            for (var i = 0; i < this.childs.length; i++) {
                if (this.childs[i] instanceof egret3d.Mesh) {
                    var mesh = this.childs[i].clone();
                    mesh.animation = skeletonAnimation;
                    cloneRole.setAvatar(mesh.name, mesh);
                }
            }
            return cloneRole;
        };
        return Role;
    }(egret3d.Object3D));
    egret3d.Role = Role;
    __reflect(Role.prototype, "egret3d.Role");
})(egret3d || (egret3d = {}));
