module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.UVRollMethod
    * @classdesc
    * 植物模拟自然风吹摇动特效方法
    * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/PlantDistortedMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class PlantDistortedMethod extends MethodBase {

        private _speed: Vector3 = new Vector3();
        private _time: number = 0.0;

        private _windData: Float32Array = new Float32Array(4);

        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
            this.vsShaderList[ShaderPhaseType.local_vertex] = this.vsShaderList[ShaderPhaseType.local_vertex] || [];
            this.vsShaderList[ShaderPhaseType.local_vertex].push("detail_Bending_vs");
        }
        /**
        * @language zh_CN
        * 设置风的方向，Vector3的长度代表其速度
        * @param dirAndStr 风向和风的强度数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set windDirAndSpeed(dirAndStr: Vector3) {
            this._speed = dirAndStr; 
            this._windData[1] = dirAndStr.x;
            this._windData[2] = dirAndStr.y;
            this._windData[3] = dirAndStr.z ;
        }

        public get windDirAndSpeed(): Vector3 {
            return this._speed;
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
        public upload(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, moodeltransform: Matrix4, camera3D: Camera3D) {
            usage["uniformTime"] = context3DProxy.getUniformLocation(usage.program3D, "uniformTime");
        }
        
        /**
        * @private
        * @language zh_CN
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4, camera3D: Camera3D) {
            this._time += delay;
            this._windData[0] = this._time;
            context3DProxy.uniform1fv(usage["uniformTime"], this._windData);
        }


      }
}
