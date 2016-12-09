module egret3d {
    /**
    * @language zh_CN
    * @class egret3d.GrassMethod
    * @classdesc
    * 草的飘动动画实现部分,不建议单独使用，而是封装在GrassMesh中被动生成。
    * @see egret3d.GrassMesh
    * @includeExample plant/GrassMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class GrassMethod extends MethodBase {

        private _start: boolean;
        private _time: number = 0.0;
        private _windSpeed: number = 200;
        private _windStrength: number = 0.2;
        private _shakeScale: number = 0.1;
        private _windDirection: Vector3D = new Vector3D(1, 0, 0);
        private _windSpace: Vector3D = new Vector3D(400, 0, 300);

        private _windData: Float32Array = new Float32Array(9);
        private _squeezeData: Float32Array = new Float32Array(6);
        private _lightMapData: Float32Array = new Float32Array(5);

        private _data: GrassData;
        private _lightMapTexture: ITexture = CheckerboardTexture.texture;
        private _lightMapRect: Rectangle;
        /**
        * @language zh_CN
        * @构造函数
        * 创建一个GrassMethod对象
        * @param data GrassData 创建该method需要用到的数据源
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(data:GrassData) {
            super();

            this._data = data;
            this.vsShaderList[ShaderPhaseType.start_vertex] = this.vsShaderList[ShaderPhaseType.start_vertex] || [];
            this.vsShaderList[ShaderPhaseType.start_vertex].push("grass_vs");

            this.fsShaderList[ShaderPhaseType.diffuse_fragment] = this.fsShaderList[ShaderPhaseType.diffuse_fragment] || [];
            this.fsShaderList[ShaderPhaseType.diffuse_fragment].push("grass_fs");

            this.fillGrassData();

            this.start();
            
        }

        /**
        * @language zh_CN
        * 设置草用到的灯光图和数据
        * @param lightMap 灯光贴图
        * @param lightMapRect 用于计算UV的数据xy代表偏移，width/height为用于和场景xz的缩放系数
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public setLightMapData(lightMap?: ITexture, lightMapRect?: Rectangle): void {
            this._lightMapRect = lightMapRect;
            this._lightMapTexture = lightMap || CheckerboardTexture.texture;
            this.updateLightMapData();
        }


        private updateLightMapData(): void {
            if (!this._lightMapTexture || this._lightMapTexture == CheckerboardTexture.texture || !this._lightMapRect) {
                this._lightMapData[0] = 0;
            } else {
                this._lightMapData[0] = 1;
                this._lightMapData[1] = this._lightMapRect.x;
                this._lightMapData[2] = this._lightMapRect.y;
                this._lightMapData[3] = this._lightMapRect.width;
                this._lightMapData[4] = this._lightMapRect.height;
            }

            this.materialData["lightMapTexture"] = this._lightMapTexture;
            this.materialData.textureChange = true; 
        }
        /**
        * @language zh_CN
        * 更新风的参数
        * @param direction 单位向量，xz为有效值，表示风的方向
        * @param space 一团风的体积，xz为有效值，每个朝向在单位体积内实现了一个正弦抖动循环
        * @param speed 风的移动速度，代表1秒内，风移动的单位
        * @param windStrength 风的强度，这个值用于加成到草的倾斜上面
        * @param shakeScale 草自身来回摇摆缩放系数，这个值用于加成到草的倾斜上面
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public setWind(direction: Vector3D, space: Vector3D, speed: number = 100.0, windStrength: number = 0.1, shakeScale:number = 1.0): void {
            direction.y = 0;
            this._windDirection.copyFrom(direction);
            this._windDirection.normalize();

            this._windSpace.copyFrom(space);
            this._windStrength = windStrength;
            this._windSpeed = speed;
            this._shakeScale = shakeScale;
            this.fillGrassData();
        }


        /**
        * @language zh_CN
        * 更新草受到挤压的数据
        * @param position 挤压开始的位置
        * @param enable 是否开启挤压
        * @param radius 挤压的半价
        * @param strength 挤压的强度，会修改草倾斜的力度
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public updateSqueezeData(position: Vector3D, enable:boolean, radius: number = 20, strength:number = 1.0): void {
            this._squeezeData[0] = enable ? 1 : 0;
            this._squeezeData[1] = position.x;
            this._squeezeData[2] = position.y;
            this._squeezeData[3] = position.z;
            this._squeezeData[4] = radius;
            this._squeezeData[5] = strength;
        }

        private fillGrassData(): void {
            this._windData[0] = this._windDirection.x;
            this._windData[1] = this._windDirection.z;
            this._windData[2] = this._windSpace.x;
            this._windData[3] = this._windSpace.z;
            this._windData[4] = this._windStrength;
            this._windData[5] = this._windSpeed;
            this._windData[6] = this._shakeScale;
            
        }
       
        /**
        * @language zh_CN
        * 开始播放动画
        * @param rest 如果为ture就是重置播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public start(rest: boolean = false) {
            if (rest)
                this._time = 0;
            this._start = true;

        }
                
        /**
        * @language zh_CN 
        * 停止播放uv动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        public stop() {
            this._start = false;
        }

        /**
        * @private
        * @language zh_CN
        * @param time
        * @param delay
        * @param usage
        * @param geometry
        * @param context3DProxy
        * @param modeltransform 
        * @param camera3D
        */
        public upload(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            usage["uniform_grass_data"].uniformIndex = context3DProxy.getUniformLocation(usage.program3D, "uniform_grass_data");
            usage["uniform_squeeze_data"].uniformIndex = context3DProxy.getUniformLocation(usage.program3D, "uniform_squeeze_data");
            usage["uniform_lightMap_data"].uniformIndex = context3DProxy.getUniformLocation(usage.program3D, "uniform_lightMap_data");
        }
        
        /**
        * @private
        * @language zh_CN
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            if (this._start) {
                this._time += delay;
            }
            this._windData[7] = this._time / 1000.0;
            this._windData[8] = this._data.billboard ? 1 : 0;
            context3DProxy.uniform1fv(usage["uniform_grass_data"].uniformIndex, this._windData);
            context3DProxy.uniform1fv(usage["uniform_squeeze_data"].uniformIndex, this._squeezeData);
            context3DProxy.uniform1fv(usage["uniform_lightMap_data"].uniformIndex, this._lightMapData);


        }
    }
}
