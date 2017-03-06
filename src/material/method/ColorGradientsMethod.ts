module egret3d {

    /**
    * @class egret3d.ColorGradientsMethod
    * @classdesc
    * 实现颜色渐变叠加
    * @see egret3d.MethodBase
    * @includeExample material/method/ColorGradientsMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ColorGradientsMethod extends MethodBase {
        private _posStart: number = 0;
        private _posEnd: number = 0;
        private _color: Color = new Color();
      
        /**
        * @language zh_CN
        * 创建一个ColorGradientsMethod对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();

            this.fsShaderList[ShaderPhaseType.multi_end_fragment] = this.fsShaderList[ShaderPhaseType.multi_end_fragment] || [];
            this.fsShaderList[ShaderPhaseType.multi_end_fragment].push("colorGradients_fs");

        }

        /**
        * @language zh_CN
        * 设置颜色渐变数据
        * @param posStart number 起始位置，相对小的y值
        * @param posEnd number 结束为止，相对大的y值
        * @param color Color
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setStartData(posStart: number, posEnd: number, color: Color) {
            this._color.copyFrom(color);
            this._posStart = posStart;
            this._posEnd = posEnd;
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
            usage["uniform_colorGradientsSource"] = context3DProxy.getUniformLocation(usage.program3D, "uniform_colorGradientsSource");
        }

        /**
        * @private
        * @language zh_CN
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
          
            this.materialData.colorGradientsSource[0] = this._posStart;
            this.materialData.colorGradientsSource[1] = this._posEnd;
            //color
            this.materialData.colorGradientsSource[2] = this._color.r;
            this.materialData.colorGradientsSource[3] = this._color.g;
            this.materialData.colorGradientsSource[4] = this._color.b;
            this.materialData.colorGradientsSource[5] = this._color.a;

            context3DProxy.uniform1fv(usage["uniform_colorGradientsSource"], this.materialData.colorGradientsSource);
        }

    }
}