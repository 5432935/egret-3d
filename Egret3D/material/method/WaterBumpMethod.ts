module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.WaterBumpMethod
    * @classdesc
    * 材质中赋予灯光后，可以添加此方法，灯光和法线的变化而产生水面波光粼粼的效果
    * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/WaterBumpMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class WaterBumpMethod extends MethodBase {

        private _uvData: Float32Array = new Float32Array(8);
        private _horizonColor: Float32Array = new Float32Array(4);
        
        private _time: number = 0.0;
        private _start: boolean = false;

        private _bumpTexture: ITexture; 
        private _colorControlTexture: ITexture; 
        private _distion_intensity: Point = new Point(0.02, 0.02);

        /** 
        * @private
        * @language zh_CN
        */
        constructor() {
            super();

            //##FilterBegin## ##Water##

            this.fsShaderList[ShaderPhaseType.normal_fragment] = this.fsShaderList[ShaderPhaseType.normal_fragment] || [];
            this.fsShaderList[ShaderPhaseType.normal_fragment].push("waterBump_fs");

            this.start();

            this._horizonColor[0] = 217 / 255;
            this._horizonColor[1] = 235 / 255;
            this._horizonColor[2] = 255 / 255;
            this._horizonColor[3] = 255 / 255;


            //---------------
            this._uvData[0] = -0.000005 * 2.5;
            this._uvData[1] = 0.0 * 2.5;
            this._uvData[2] = 0.00001 * 2.5;
            this._uvData[3] = 0.0 * 2.5;
            this._uvData[4] = this._distion_intensity.x;
            this._uvData[5] = this._distion_intensity.y;
            this._uvData[6] = 1.0 ;
            this._uvData[7] = 1.0 ;
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * 开始播放uv动画
        * @param rest 如果为ture就是重置播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public start(rest: boolean = false) {
            //##FilterBegin## ##Water##

            if (rest)
                this._time = 0;
            this._start = true;

            //##FilterEnd##
        }

        /**
        * @language zh_CN 
        * 停止播放uv动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        public stop() {
            //##FilterBegin## ##Water##
            this._start = false;
            //##FilterEnd##
        }

        /**
        * @language zh_CN 
        * 设置UV 速度
        * @param index 0 或 1
        * @param u  
        * @param v 
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setUvSpeed(index: number, u: number, v: number) {
            //##FilterBegin## ##Water##
            switch (index) {
                case 0:
                    this._uvData[0] = u ;
                    this._uvData[1] = v ;
                    break;
                case 1:
                    this._uvData[2] = u;
                    this._uvData[3] = v ;
                    break;
            }
            //##FilterEnd##
        }

        /**
        * @language zh_CN 
        * 设置UV repat次数
        * @param u  
        * @param v 
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setUvScale(first: number, second: number) {
            //##FilterBegin## ##Water##
            //##FilterEnd##
        }

        /**
         * @language zh_CN
         * 设置lightmap贴图
         * @param texture lightmap贴图
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set bumpTexture(texture: ITexture) {
            //##FilterBegin## ##Water##
            this._bumpTexture = texture;
            if (this.materialData["bumpTexture"] != this._bumpTexture) {
                this.materialData["bumpTexture"] = this._bumpTexture;
                this.materialData.textureChange = true;
            }
            //##FilterEnd##
        }

        /**
         * @language zh_CN
         * 设置lightmap贴图
         * @param texture lightmap贴图
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set colorTexture(texture: ITexture) {
            //##FilterBegin## ##Water##
            this._colorControlTexture = texture;
            if (this.materialData["colorControlTexture"] != this._colorControlTexture) {
                this.materialData["colorControlTexture"] = this._colorControlTexture;
                this.materialData.textureChange = true;
            }
            //##FilterEnd##
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
            //##FilterBegin## ##Water##
            usage["waterNormalData"] = context3DProxy.getUniformLocation(usage.program3D, "waterNormalData");
            usage["horizonColor"] = context3DProxy.getUniformLocation(usage.program3D, "horizonColor");
            usage["time"] = context3DProxy.getUniformLocation(usage.program3D, "time");
            //##FilterEnd##
        }

        /**
        * @private
        * @language zh_CN
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            //##FilterBegin## ##Water##
            if (this._start) {
                this._time += delay;
            }
            context3DProxy.uniform4fv(usage["horizonColor"], this._horizonColor);
            context3DProxy.uniform2fv(usage["waterNormalData"], this._uvData);
            context3DProxy.uniform1f(usage["time"], this._time);
            //##FilterEnd##
        }
    }
}
