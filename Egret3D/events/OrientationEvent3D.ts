module egret3d {

    /**
     * @private
     * @language zh_CN
     * 设备的方向(设备横向持有或纵向持有)。
     * @version Egret 3.0
     * @platform Web,Native
     */
    export enum Orientation {
        /**
         * 设备纵向持有0°,即纵向主方向。
         * @version Egret 3.0
         * @platform Web,Native
         */
        Portrait_Primary = 0,
        /**
         * 设备纵向持有180°，即纵向次方向
         * @version Egret 3.0
         * @platform Web,Native
         */
        Portrait_Secondary = 180,
        /**
         * 设备横向持有-90°,即横向主方向。
         * @version Egret 3.0
         * @platform Web,Native
         */
        Landscape_Primary = -90,
        /**
        * 设备横向持有90°,即横向次方向。
        * @version Egret 3.0
        * @platform Web,Native
        */
        Landscape_Secondary = 90,
    }

    /**
    * @language zh_CN
    * @class egret3d.MouseEvent3D
    * @classdesc
    * OrientationEvent3D 是所有引擎中可重力感应事件节点的事件类型标记。
    * 只有Input.addEventListener 才会产生下类事件
    * @see egret3d.Event3D
    * @see egret3d.EventDispatcher
    * @see egret3d.Input
    * @version Egret 3.0
    * @platform Web,Native
    * @includeExample events/OrientationEvent3D.ts
    */
    export class OrientationEvent3D extends Event3D {
        /**
         * @language zh_CN
         * ORIENTATION_CHANGE 常量定义 方向改变事件标识。
         * 可注册对象 : Input类型。
         * 事件响应状态 : 方向改变事件时响应。
         * 响应事件参数 : OrientationEvent3D类型,其中OrientationEvent3D.Orientation的内容即为方向枚举值。
         * @see egret3d.Input
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static ORIENTATION_CHANGE: string = "onOrientationChange";
        /**
         * @language zh_CN
         * DEVICE_MOTION 常量定义 晃动事件标识
         * 可注册对象 : Input类型。
         * 事件响应状态 : 晃动时响应。
         * 响应事件参数 : OrientationEvent3D类型,其提供设备的加速信息，还提供了设备在坐标系中的自转速率。
         * @see egret3d.Input
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DEVICE_MOTION: string = "onDeviceMotion";
        /**
         * @language zh_CN
         * DEVICE_ORIENTATION 常量定义 设备方向事件标识。
         * 可注册对象 : Input类型。
         * 事件响应状态 : 设备方向变化响应。
         * 响应事件参数 : OrientationEvent3D类型,其提供设备的物理方向信息，表示为一系列本地坐标系的旋角。
         * @see egret3d.Input
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static DEVICE_ORIENTATION: string = "onDeviceOrientation";


        private _orientation: Orientation;
        /**
         * @language zh_CN
         * 获取设备的方向枚举值,枚举值为其对应角度
         * @returns {Orientation} 设备的方向枚举值
         * @see egret3d.Orientation
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get orientation(): Orientation {
            var value = <number>window.orientation;
            return <Orientation>value;
        }


        private _acceleration: DeviceAcceleration;
        /**
         * @language zh_CN
         * 获取排除重力影响的加速度
         * @returns {DeviceAcceleration} 加速度,单位是m/s2
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get acceleration(): DeviceAcceleration {
            return this._acceleration;
        }
        /**
         * @language zh_CN
         * 设置排除重力影响的加速度
         * @param deviceAcceleration {DeviceAcceleration} 加速度,单位是m/s2。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set acceleration(deviceAcceleration: DeviceAcceleration) {
            this._acceleration = deviceAcceleration;
        }
        private _accelerationIncludingGravity: DeviceAcceleration;
        /**
        * @language zh_CN
        * 获取受到重力影响的加速度
        * @returns {DeviceAcceleration} 加速度,单位是m/s2
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get accelerationIncludingGravity(): DeviceAcceleration {
            return this._accelerationIncludingGravity;
        }
        /**
        * @language zh_CN
        * 设置受到重力影响的加速度
        * @param deviceAcceleration {DeviceAcceleration} 加速度,单位是m/s2。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set accelerationIncludingGravity(deviceAcceleration: DeviceAcceleration) {
            this._accelerationIncludingGravity = deviceAcceleration;
        }

        private _rotationRate: DeviceRotationRate;

        /**
         * @language zh_CN
         * 获取旋转角度的变化速率
         * @returns {DeviceAcceleration} 旋转速率,单位是deg/s。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get rotationRate(): DeviceRotationRate {
            return this._rotationRate;
        }
        /**
         * @language zh_CN
         * 设置旋转速率
         * @param deviceRotationRate {DeviceRotationRate} 旋转速率,单位是deg/s。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set rotationRate(deviceRotationRate: DeviceRotationRate) {
            this._rotationRate = deviceRotationRate;
        }


        private _absolute: boolean;
        /**
         * @language zh_CN
         * 获取是否是绝对旋转重力方向
         * @returns {boolean}。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get absolute(): boolean {
            return this._absolute;
        }

        /**
         * @language zh_CN
         * 设置是否是绝对旋转重力方向
         * @param value {boolean}。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set absolute(value: boolean) {
            this._absolute = value;
        }


        private _alpha: number;
        /**
         * @language zh_CN
         * 获取Alpha旋转，围绕Z轴旋转，即水平方向旋转
         * @returns {number} 旋转角度。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get alpha(): number {
            return this._alpha;
        }
        /**
         * @language zh_CN
         * 设置Alpha旋转，围绕Z轴旋转，即水平方向旋转
         * @param value {number} 旋转角度。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set alpha(value: number) {
            this._alpha = value;
        }


        private _beta: number;
        /**
         * @language zh_CN
         * 获取Beta旋转，围绕X轴旋转，即前后方向旋转
         * @returns {number} 旋转角度。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get beta(): number {
            return this._beta;
        }
        /**
         * @language zh_CN
         * 设置Beta旋转，围绕X轴旋转，即前后方向旋转
         * @param value {number} 旋转角度。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set beta(value: number) {
            this._beta = value;
        }


        private _gamma: number;
        /**
         * @language zh_CN
         * 获取Gamma旋转，围绕Y轴旋转，即左右方向旋转
         * @returns {number} 旋转角度。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get gamma(): number {
            return this._gamma;
        }
        /**
         * @language zh_CN
         * 设置Gamma旋转，围绕Y轴旋转，即左右方向旋转
         * @param value {number} 旋转角度。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set gamma(value: number) {
            this._gamma = value;
        }
    }
} 