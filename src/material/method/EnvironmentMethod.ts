module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.UVRollMethod
    * @classdesc
    * 继承自 MethodBase,为材质球附加特效的共有基类.
    * 环境映射是一种用来模拟光滑表面对周围环境的反射的技术，常见的如镜子、光亮漆面的金属等等。
    * 这种技术的实现主要通过将一张带有周围环境的贴图附在所需要表现的多边形表面来实现的。目前在实时3D游戏画面渲染中经常使用的有两种环境映射。
    * 球形环境映射是模拟在球体表面产生环境映射的技术，通过对普通贴图的UV坐标进行调整计算来产生在球体表面应产生的扭曲。
    * UV的计算利用球体表面的法线来计算。
    * 计算公式中的Nx和Ny是表面法线的x和y分量，除以2将区间限制在[-0.5,0.5]，+0.5将区间调整至UV坐标应在的[0,1]区间。在这个公式的计算下，当球体正中表面法线正对摄像机的地方，坐标不会有任何扭曲；周围点依次随着Nx和Ny分量的增大而产生扭曲。
    * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/EnvironmentMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class EnvironmentMethod extends MethodBase {

        private texture: ITexture; 
        private reflectValue: number = 0.3;

        /**
        * @private
        * @language zh_CN
        */
        constructor() {
            super();

            this.fsShaderList[ShaderPhaseType.lighting_fragment] = this.fsShaderList[ShaderPhaseType.lighting_fragment] || [];
            this.fsShaderList[ShaderPhaseType.lighting_fragment].push("environmentMapping_fragment");
        }

        /**
         * @public 
         * 设置反射 环境的强弱度,值区间在[0~1]
         * @param value 强弱度
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set reflect(value: number) {
            this.reflectValue = value;
        }

        /**
         * @public
         * 返回环境的强弱度
         * @returns number 环境的强弱度
         */
        public get reflect(): number {
            return this.reflectValue;
        }

        /**
         * @language zh_CN
         * @public
         * 设置环境纹理,一张 cubemap,可配合天空纹理使用增强环境渲染效果
         * @see egret3d.MethodBase
         * @see egret3d.texture.CubeTexture
         * @param texture 
         */
        public set environmentTexture(texture: ITexture) {
            this.texture = texture;
            if (texture) {
                if (this.materialData["environmentMapTex"] != this.texture) {
                    this.materialData["environmentMapTex"] = texture;
                    this.materialData.textureChange = true;
                }
            }
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
        public upload(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            usage["reflectValue"] = context3DProxy.getUniformLocation(usage.program, "reflectValue");
        }
        
        /**
        * @private
        * @language zh_CN
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            context3DProxy.uniform1f(usage["reflectValue"], this.reflectValue);
        }
    }
}
