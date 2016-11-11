module egret3d {

    /**
    * @private
    * @class egret3d.ControllerBase
    * @classdesc
    * 控制器 基类, 抽象控制器的一些数据
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ControllerBase {
        protected _autoUpdate:boolean = true;
        protected _target: Object3D;
        protected _lookAtObject: Object3D;
        protected _origin: Vector3D = new Vector3D(0.0, 0.0, 0.0);
        protected _speed: number = 300;

        /**
        * @language zh_CN
        * 构造函数
        * @param targetObject 控制的目标
        * @param lookAtObject 观察的目标
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(targetObject: Object3D = null,lookAtObject:Object3D = null) {
            this._target = targetObject;
            this._lookAtObject = lookAtObject;
        }

        /**
        * @language zh_CN
        * 获取当前的目标
        * @returns Object3D 返回当前的目标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get target(): Object3D {
            return this._target;
        }

        /**
        * @language zh_CN
        * 设置当前的目标
        * @param val 当前的目标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set target(val: Object3D) {

            if (this._target == val)
                return;
            this._target = val;
        }

        /**
        * @language zh_CN
        * 设置获取当前的观察目标
        * @returns Object3D 观察目标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get lookAtObject(): Object3D {
            return this._lookAtObject;
        }

        /**
        * @language zh_CN
        * 获取当前的观察目标
        * @param val 观察目标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set lookAtObject(val: Object3D) {
            if (this._lookAtObject == val)
                return;
            this._lookAtObject = val;
        }

        /**
        * @language zh_CN
        * 获取移动速度
        * @returns number 移动速度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get speed(): number {
            return this._speed;
        }

        /**
        * @language zh_CN
        * 设置移动速度
        * @param val 移动速度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set speed(val: number) {
            this._speed = val;
        }

        /**
        * @language zh_CN
        * 数据更新
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(){
        }
    }
}