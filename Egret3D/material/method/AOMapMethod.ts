module egret3d {

    /**
    * @class egret3d.AOMapMethod
    * @classdesc
    * 继承自 MethodBase,为材质球附加特效的共有基类.
    * AO贴图渲染方法,Ambient Occlusion texture 的简称.
    * 使用第三方软件渲染好的3D模型AO贴图进行mapping,模拟自然环境遮挡效果.增强真实感.
    * 推荐3Dmax Ambient Occlusion 渲染到贴图的功能,将模型的 AO 渲染成为一张贴图,赋给模型使用,前提需要保证模型第二UV要保证一致
    * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/AlphaMaskMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class AOMapMethod extends MethodBase {

        private aoPower: number = 1.0; 
        private texture: ITexture;
        /**
        * @language zh_CN
        * 创建AO贴图方法
        * @param texture AO贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(texture: ITexture) {
            super();
            this.fsShaderList[ShaderPhaseType.shadow_fragment] = this.fsShaderList[ShaderPhaseType.shadow_fragment] || [];
            this.fsShaderList[ShaderPhaseType.shadow_fragment].push("AOMap_fs");

            this.lightTexture = texture;
        }

        /**
        * @language zh_CN
        * 设置AO贴图
        * @param texture AO贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set lightTexture(texture: ITexture) {
            this.texture = texture;
            this.materialData.aoTexture = this.texture;
            this.materialData.textureChange = true; 
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
            usage["aoPower"] = context3DProxy.getUniformLocation(usage.program3D, "aoPower"); 
        }
        
        /**
        * @private
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            context3DProxy.uniform1f(usage["aoPower"], this.aoPower);
        }

        /**
        * @language zh_CN
        * @private
        */
        public dispose() {
        }
    }
} 