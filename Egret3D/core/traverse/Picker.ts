module egret3d{

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
    export class Picker {
        protected static ray: Ray = new Ray();

        /**
        * @language zh_CN
        * 根据View创建在当前view中光标射线
        * @param view 当前检测view
        * @returns Rya 光标射线
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static createRayToView(view: View3D, ray: Ray = null): Ray {
            if (!ray) {
                ray = Picker.ray;
            }

            if (Input.mouseX < view.x || Input.mouseX > x + view.width || Input.mouseY < view.y || Input.mouseY > y + view.height) {
                return null;
            }

            var x: number = Input.mouseX - view.x;
            var y: number = Input.mouseY - view.y;
            ray.CalculateAndTransformRay(view.width, view.height, view.camera3D.modelMatrix, view.camera3D.projectMatrix, x, y);

            return ray;
        }

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
        public static pickObject3D(view: View3D, object: Object3D, target: Object3D[] = null): Object3D[] {
            target = target || [];
            target.length = 0;

            var ray: Ray = Picker.createRayToView(view);
            Picker.pickObject(ray, object, target);
            return target;
        }


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
        public static pickObject(ray: Ray, object: Object3D, target: Object3D[] = null): Object3D[]{
            if (Picker.doPickerObject(ray, object)) {
                target.push(object);
            }

            for (var i: number = 0; i < object.childs.length; ++i) {
                Picker.pickObject(ray, object.childs[i], target);
            }

            return target;
        }

        /**
        * @language zh_CN
        * 返回射线检测对象是否成功,调用之前到设置被拣选对象的pickType.
        * @param ray 当前检测射线
        * @param object 检测的对象 
        * @returns boolean 成功返回true
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static doPickerObject(ray: Ray, object: Object3D): boolean {
            var renderItem: IRender;

            switch (object.pickType) {
                case PickType.BoundPick:
                    if (object.bound != null) {
                        var bound: Bound = object.currentBound;
                        if (bound) {
                            if (ray.IntersectBound(bound, object.pickResult)) {
                                return true;
                            }
                        }
                    }
                    return false;
                case PickType.PositionPick:
                    if (object instanceof IRender) {

                        renderItem = <IRender>object;

                        var uvoffset: number = 0;
                        let geometry = renderItem._geometry;
                        if (geometry.vertexFormat & VertexFormat.VF_POSITION) {
                            uvoffset += Geometry.positionSize;
                        }

                        if (geometry.vertexFormat & VertexFormat.VF_NORMAL) {
                            uvoffset += Geometry.normalSize;
                        }

                        if (geometry.vertexFormat & VertexFormat.VF_TANGENT) {
                            uvoffset += Geometry.tangentSize;
                        }

                        if (geometry.vertexFormat & VertexFormat.VF_COLOR) {
                            uvoffset += Geometry.colorSize;
                        }
                        var boundBox: BoundBox = <BoundBox>renderItem.bound;
                        var ret: number[] = [];

                        if (ray.IntersectSphere(boundBox.center, boundBox.radius, ret, renderItem.modelMatrix)) {
                            if (ray.IntersectMeshEx(renderItem, uvoffset, renderItem.pickResult)) {
                                return true;
                            }
                        }
                    }
                    return false;
                case PickType.UVPick:
                    if (object instanceof IRender) {

                        renderItem = <IRender>object;
                        let geometry = renderItem._geometry;
                        var uvoffset: number = 0;

                        if (geometry.vertexFormat & VertexFormat.VF_POSITION) {
                            uvoffset += Geometry.positionSize;
                        }

                        if (geometry.vertexFormat & VertexFormat.VF_NORMAL) {
                            uvoffset += Geometry.normalSize;
                        }

                        if (geometry.vertexFormat & VertexFormat.VF_TANGENT) {
                            uvoffset += Geometry.tangentSize;
                        }

                        if (geometry.vertexFormat & VertexFormat.VF_COLOR) {
                            uvoffset += Geometry.colorSize;
                        }
                        var boundBox: BoundBox = <BoundBox>renderItem.bound;
                        if (ray.IntersectSphere(boundBox.center, boundBox.radius, ret, boundBox.transform)) {
                            if (ray.IntersectMeshEx(renderItem, uvoffset, renderItem.pickResult)) {
                                return true;
                            }
                        }
                    }
                    return false;
            }
            return false;
        }

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
        public static pickObject3DList(view:View3D, objects: IRender[], target:IRender[] = null): IRender[] {
            if (!target) {
                target = new Array<IRender>(); 
            }
            target.length = 0;
            var ray: Ray = Picker.createRayToView(view);
            for (var i: number = 0; i < objects.length; ++i) {
                if (Picker.doPickerObject(ray, objects[i])) {
                    target.push(objects[i]);
                }
            }
            return target;
        }
    }
}