module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.UVRollMethod
    * @classdesc
    * 边缘光特效方法
    * 利用屏幕空间法线与摄像机方向射线的夹角 进行pow ，越是物体的边缘，效果越强。
    * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/RimlightMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class RimlightMethod extends MethodBase {

        public uniform_rimData: Float32Array = new Float32Array(6);
        constructor() {
            super();

            this.fsShaderList[ShaderPhaseType.multi_end_fragment] = this.fsShaderList[ShaderPhaseType.multi_end_fragment] || [];
            this.fsShaderList[ShaderPhaseType.multi_end_fragment].push("rimlight_fs");

            //0.5, 0.6, 0.7
            this.uniform_rimData[0] = 0.99;
            this.uniform_rimData[1] = 0.0;
            this.uniform_rimData[2] = 0.0;
            this.uniform_rimData[3] = 1.0;
            this.uniform_rimData[4] = 5.0;
            this.uniform_rimData[5] = 1.0;
        }

        /**
        * @language zh_CN
        * 设置边缘光特效的颜色 alpha值为特效的亮度,其他为颜色。
        * @param  val 设置边缘光特效的颜色 alpha值为特效的亮度,其他为颜色。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rimColor(val: number) {
            var color: Vector3 = Color.getColor(val);

            this.uniform_rimData[0] = color.x;
            this.uniform_rimData[1] = color.y;
            this.uniform_rimData[2] = color.z;
            this.uniform_rimData[3] = color.w;
        }

        /**
        * @language zh_CN
        * 获取边缘光特效的颜色。
        * @param  val 获取边缘光特效的颜色。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get rimColor(): number {
            return Color.RGBAToColor(
                this.uniform_rimData[0],
                this.uniform_rimData[1],
                this.uniform_rimData[2],
                this.uniform_rimData[3]
            );
        }

        /**
        * @language zh_CN
        * 设置边缘光特效的pow值,值越大,边缘越窄,值越小,边缘越宽.
        * @param  size 设置边缘光特效的pow值,值越大,边缘越窄,值越小,边缘越宽.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rimPow(size: number) {
            this.uniform_rimData[4] = size;
        }

        /**
        * @language zh_CN
        * 设置边缘光特效的pow值,值越大,边缘越窄,值越小,边缘越宽.
        * @param  size 设置边缘光特效的pow值,值越大,边缘越窄,值越小,边缘越宽.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get rimPow(): number {
            return this.uniform_rimData[4];
        }

        /**
        * @language zh_CN
        * 设置边缘光特效的强度值
        * @param  size 设置边缘光特效的强度值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set strength(val: number) {
            this.uniform_rimData[5] = val;
        }

        /**
        * @language zh_CN
        * 设置边缘光特效的强度值
        * @param  size 设置边缘光特效的强度值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get strength(): number {
            return this.uniform_rimData[5];
        }

        /**
        * @private
        * @language zh_CN
        * @param time
        * @param delay
        * @param usage
        * @param materialData
        * @param geometry
        * @param context3DProxy
        * @param modeltransform 
        * @param modeltransform
        * @param camera3D
        */
        public upload(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4, camera3D: Camera3D) {
            usage["uniform_rimData"] = context3DProxy.getUniformLocation(usage.program3D, "uniform_rimData");
        }

        /**
         * @language zh_CN
         * @private
         */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4, camera3D: Camera3D) {
            context3DProxy.uniform1fv(usage["uniform_rimData"], this.uniform_rimData);
        }

        /**
         * @language zh_CN
         * @private
         */
        public dispose() {
        }
    }
}