module egret3d {
    
    /**
    * @class egret3d.LightmapMethod
    * @classdesc
    * 实现lightmap渲染方法。
    * 在三维软件里实现打好光，然后渲染把场景各表面的光照输出到贴图上。
    * 然后使用模型的第2UV，渲染出Lightmap效果，lightmap贴图需要自己烘焙。
     * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/MultiUVSpriteMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MultiUVSpriteMethod extends MethodBase {


        private _isRandom: boolean = true;
        private _multiData: Float32Array = new Float32Array(4);
        public set row(v: number) {
            this._multiData[0] = v; 
        }
        public get row(): number {
            return this._multiData[0]; 
        }

        public set column(v: number) {
            this._multiData[1] = v;
        }
        public get column(): number {
            return this._multiData[1];
        }

        public set sum(v: number) {
            this._multiData[2] = v;
        }
        public get sum(): number {
            return this._multiData[2];
        }

        /**
        * @language zh_CN
        * 创建一个MultiUVSpriteMethod对象
        * 构造函数
        * @param row 行数
        * @param column 列数
        * @param sum 序列帧的总数
        * @param isRandom 是否随机序列帧
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(row: number, column: number, sum: number, isRandom: boolean = true) {
            super();

            this._multiData[0] = row;
            this._multiData[1] = column;
            this._multiData[2] = sum;
            this._isRandom = isRandom;

            this.fsShaderList[ShaderPhaseType.diffuse_fragment] = this.fsShaderList[ShaderPhaseType.diffuse_fragment] || [];
            this.fsShaderList[ShaderPhaseType.diffuse_fragment].push("MultiUVSprite_fs");
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
            usage["multiUV"] = context3DProxy.getUniformLocation(usage.program3D, "multiUV"); 
            if (this._isRandom)
                this._multiData[3] = Math.floor( Math.random() * this.sum ) ;
        }

        /**
        * @private
        * @language zh_CN
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            context3DProxy.uniform4fv(usage["multiUV"], this._multiData);
        }


    }
}