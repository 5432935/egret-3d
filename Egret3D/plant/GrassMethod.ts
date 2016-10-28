module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.GrassMethod
    * @classdesc
    * 草的飘动
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class GrassMethod extends MethodBase {

        private _start: boolean;

        private _time: number = 0.0;
        private _grass_wave = 0.003;//波浪的振频
        private _grass_x_span = 0.02;//x方向位置加成到时间系数
        private _grass_y_span = 0.02;//y方向位置加成到时间系数
        private _grass_z_span = 0.01;//z方向位置加成到时间系数
        private _grass_wave_big = 0.001;//大波浪缩放系数，使风变成一阵一阵的
        private _grass_range = 5.0;//草的振幅
        private _grass_wave_x = 1.0;//草摇晃x方向的系数
        private _grass_wave_z = 1.0;//草摇晃z方向的系数


        private _grassData: Float32Array = new Float32Array(10);
        private _squeezeData: Float32Array = new Float32Array(6);

        private _data: GrassData;

        /**
        * @private
        * @language zh_CN
        */
        constructor(data:GrassData) {
            super();
            this._data = data;
            this.vsShaderList[ShaderPhaseType.start_vertex] = this.vsShaderList[ShaderPhaseType.start_vertex] || [];
            this.vsShaderList[ShaderPhaseType.start_vertex].push("grass_vs");

            this.fillGrassData();

            this.start();
            
        }

        /**
        * @language zh_CN
        * 更新草动画的参数
        * @param wave 波浪的振幅
        * @param x_span x方向位置加成到时间系数
        * @param y_span y方向位置加成到时间系数
        * @param z_span z方向位置加成到时间系数
        * @param wave_big 大波浪缩放系数，使风变成一阵一阵的
        * @param range 草的最大摇动系数
        * @param wave_x 草摇晃x方向的系数
        * @param wave_z 草摇晃z方向的系数
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public updateGrass(wave:number, x_span:number, y_span:number, z_span:number, wave_big:number, range:number, wave_x:number, wave_z:number): void {
            this._grass_wave = wave;
            this._grass_x_span = x_span;
            this._grass_y_span = y_span;
            this._grass_z_span = z_span;
            this._grass_wave_big = wave_big;
            this._grass_range = range;
            this._grass_wave_x = wave_x;
            this._grass_wave_z = wave_z;

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
            this._grassData[0] = this._grass_wave;
            this._grassData[1] = this._grass_x_span;
            this._grassData[2] = this._grass_y_span;
            this._grassData[3] = this._grass_z_span;
            this._grassData[4] = this._grass_wave_big;
            this._grassData[5] = this._grass_range;
            this._grassData[6] = this._grass_wave_x;
            this._grassData[7] = this._grass_wave_z;
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


        }
        
        /**
        * @private
        * @language zh_CN
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            if (this._start) {
                this._time += delay;
            }
            this._grassData[8] = this._time;
            this._grassData[9] = this._data.billboard ? 1 : 0;
            context3DProxy.uniform1fv(usage["uniform_grass_data"].uniformIndex, this._grassData);
            context3DProxy.uniform1fv(usage["uniform_squeeze_data"].uniformIndex, this._squeezeData);


        }
    }
}
