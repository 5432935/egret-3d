module egret3d {

    /**
    * @class egret3d.ColorTransformMethod
    * @classdesc
    * 继承自 MethodBase,为材质球附加特效的共有基类.
    * 实现偏色渲染方法。
    * 将最终渲染的argb值按照这个transform进行修正。
    * 也可以用来做颜色的变化特效,实时修改颜色变化,闪烁
    * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/ColorTransformMethod.ts
    * @see egret3d.texture.ColorTransform
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ColorTransformMethod extends MethodBase {
        /**
        * @language zh_CN
        * 创建一个ColorTransformMethod对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();

            this.fsShaderList[ShaderPhaseType.multi_end_fragment] = this.fsShaderList[ShaderPhaseType.multi_end_fragment] || [];
            this.fsShaderList[ShaderPhaseType.multi_end_fragment].push("colorTransform_fs");
        }

        /**
        * @language zh_CN
        * 设置ColorTransform数据
        * @param trasform ColorTransform
        * @see egret3d.texture.ColorTransform
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set colorTransform(trasform: ColorTransform) {
            this.materialData.colorTransform = trasform;
        }

        /**
        * @language zh_CN
        * 返回ColorTransform数据
        * @param trasform ColorTransform
        * @see egret3d.texture.ColorTransform
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get colorTransform(): ColorTransform {
            return this.materialData.colorTransform;
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
            usage["uniform_colorTransformAlpha"] = context3DProxy.getUniformLocation(usage.program3D, "uniform_colorTransformAlpha");
            usage["uniform_colorTransformM44"] = context3DProxy.getUniformLocation(usage.program3D, "uniform_colorTransformM44");
        }

        /**
        * @private
        * @language zh_CN
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            context3DProxy.uniform1f(usage["uniform_colorTransformAlpha"], this.colorTransform.alpha);
            context3DProxy.uniformMatrix4fv(usage["uniform_colorTransformM44"], false, this.colorTransform.m44.rawData);
        }


    }
}