var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @class egret3d.Picker
    * @classdesc
    * 射线对场景中的实体对像进行检测。</p>
    * 以摄像机向场景中产生的一条射线对所有场景中的对象进行拾取。</p>
    * 根据性能的需要分为几种拣选类型。</p>
    * 1.包围盒拣选。</p>
    * 2.模型拣选返回模型拣选到的位置。</p>
    * 3.模型拣选返回模型拣选到的UV坐标。</p>
    * PickType通过 Object3D.pickType 进行修改
    * @see egret3d.Ray
    * @see egret3d.PickType
    *
    * @includeExample core/traverse/Picker.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Picker = (function () {
        function Picker() {
        }
        /**
        * @language zh_CN
        * 根据View创建在当前view中光标射线
        * @param view 当前检测view
        * @returns Rya 光标射线
        * @version Egret 3.0
        * @platform Web,Native
        */
        Picker.createRayToView = function (view, ray) {
            if (ray === void 0) { ray = null; }
            if (!ray) {
                ray = Picker.ray;
            }
            if (egret3d.Input.mouseX < view.x || egret3d.Input.mouseX > x + view.width || egret3d.Input.mouseY < view.y || egret3d.Input.mouseY > y + view.height) {
                return null;
            }
            var x = egret3d.Input.mouseX - view.x;
            var y = egret3d.Input.mouseY - view.y;
            ray.CalculateAndTransformRay(view.width, view.height, view.camera3D.modelMatrix, view.camera3D.projectMatrix, x, y);
            return ray;
        };
        /**
        * @language zh_CN
        * 返回鼠标拾取对象得到的所有对象,调用之前到设置被拣选对象的pickType.
        * 会检测对象的所有子节点,然后把检测的对象进行返回
        * @param view 当前检测view
        * @param object 检测的对象
        * @param target 将结果放入到该列表
        * @returns 拾取的object列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        Picker.pickObject3D = function (view, object, target) {
            if (target === void 0) { target = null; }
            target = target || [];
            target.length = 0;
            var ray = Picker.createRayToView(view);
            Picker.pickObject(ray, object, target);
            return target;
        };
        /**
        * @language zh_CN
        * 返回射线检测对象得到的所有对象,调用之前到设置被拣选对象的pickType.
        * 会检测对象的所有子节点,然后把检测的对象进行返回
        * @param ray 当前检测射线
        * @param object 检测的对象
        * @param target 将结果放入到该列表
        * @returns 拾取的object列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        Picker.pickObject = function (ray, object, target) {
            if (target === void 0) { target = null; }
            if (Picker.doPickerObject(ray, object)) {
                target.push(object);
            }
            for (var i = 0; i < object.childs.length; ++i) {
                Picker.pickObject(ray, object.childs[i], target);
            }
            return target;
        };
        /**
        * @language zh_CN
        * 返回射线检测对象是否成功,调用之前到设置被拣选对象的pickType.
        * @param ray 当前检测射线
        * @param object 检测的对象
        * @returns boolean 成功返回true
        * @version Egret 3.0
        * @platform Web,Native
        */
        Picker.doPickerObject = function (ray, object) {
            var renderItem;
            switch (object.pickType) {
                case egret3d.PickType.BoundPick:
                    if (object.bound != null) {
                        var bound = object.currentBound;
                        if (bound) {
                            if (ray.IntersectBound(bound, object.pickResult)) {
                                return true;
                            }
                        }
                    }
                    return false;
                case egret3d.PickType.PositionPick:
                    if (object instanceof egret3d.IRender) {
                        renderItem = object;
                        var uvoffset = 0;
                        if (renderItem.geometry.vertexFormat & egret3d.VertexFormat.VF_POSITION) {
                            uvoffset += egret3d.Geometry.positionSize;
                        }
                        if (renderItem.geometry.vertexFormat & egret3d.VertexFormat.VF_NORMAL) {
                            uvoffset += egret3d.Geometry.normalSize;
                        }
                        if (renderItem.geometry.vertexFormat & egret3d.VertexFormat.VF_TANGENT) {
                            uvoffset += egret3d.Geometry.tangentSize;
                        }
                        if (renderItem.geometry.vertexFormat & egret3d.VertexFormat.VF_COLOR) {
                            uvoffset += egret3d.Geometry.colorSize;
                        }
                        var boundBox = renderItem.bound;
                        var ret = [];
                        if (ray.IntersectSphere(boundBox.center, boundBox.radius, ret, renderItem.modelMatrix)) {
                            if (ray.IntersectMeshEx(renderItem, uvoffset, renderItem.pickResult)) {
                                return true;
                            }
                        }
                    }
                    return false;
                case egret3d.PickType.UVPick:
                    if (object instanceof egret3d.IRender) {
                        renderItem = object;
                        var uvoffset = 0;
                        if (renderItem.geometry.vertexFormat & egret3d.VertexFormat.VF_POSITION) {
                            uvoffset += egret3d.Geometry.positionSize;
                        }
                        if (renderItem.geometry.vertexFormat & egret3d.VertexFormat.VF_NORMAL) {
                            uvoffset += egret3d.Geometry.normalSize;
                        }
                        if (renderItem.geometry.vertexFormat & egret3d.VertexFormat.VF_TANGENT) {
                            uvoffset += egret3d.Geometry.tangentSize;
                        }
                        if (renderItem.geometry.vertexFormat & egret3d.VertexFormat.VF_COLOR) {
                            uvoffset += egret3d.Geometry.colorSize;
                        }
                        var boundBox = renderItem.bound;
                        if (ray.IntersectSphere(boundBox.center, boundBox.radius, ret, boundBox.transform)) {
                            if (ray.IntersectMeshEx(renderItem, uvoffset, renderItem.pickResult)) {
                                return true;
                            }
                        }
                    }
                    return false;
            }
            return false;
        };
        /**
        * @language zh_CN
        * 返回鼠标拾取对象得到的所有对象,调用之前到设置被拣选对象的pickType.
        * @param view 当前检测view
        * @param objects 检测的对象列表
        * @param target 将结果放入到该列表
        * @returns 拾取的object列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        Picker.pickObject3DList = function (view, objects, target) {
            if (target === void 0) { target = null; }
            if (!target) {
                target = new Array();
            }
            target.length = 0;
            var ray = Picker.createRayToView(view);
            for (var i = 0; i < objects.length; ++i) {
                if (Picker.doPickerObject(ray, objects[i])) {
                    target.push(objects[i]);
                }
            }
            return target;
        };
        return Picker;
    }());
    Picker.ray = new egret3d.Ray();
    egret3d.Picker = Picker;
    __reflect(Picker.prototype, "egret3d.Picker");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Picker.js.map