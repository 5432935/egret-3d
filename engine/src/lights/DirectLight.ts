module egret3d {
        
    /**
    * @class egret3d.DirectLight
    * @classdesc
    * 平行灯光</p>
    * 平行光是一种只有方向，强弱度，没有大小范围的灯光，一般情况下，directlight 可以产生阴影;</p>
    * 如果要产生阴影 需要设置 egret3d.ShadowRender.castShadowLight = directLight; 及其他相关模型的设置.</p>
    * 
    * @see egret3d.LightGroup
    * @see egret3d.LightBase
    * @see egret3d.ShadowRender
    * @includeExample lights/DirectLight.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class DirectLight extends LightBase {

        protected static q0: Quaternion = new Quaternion();
        /**
        * @language zh_CN
        * @private
        * 光源数据结构长度
        */
        public static stride: number = 10;

        /**
        * @language zh_CN
        * 创建一个平行光对象
        * @param dir 光线的方向
        * @default Vector3(0, 0, 1)
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(dir: Vector3 = new Vector3(0, 0, 1)) {
            super();
            this._dir.copyFrom(dir);
            this._dir.normalize();

            Quaternion.fromToRotation(Vector3.Z_AXIS, this._dir, DirectLight.q0);
            this.globalOrientation = DirectLight.q0;

            this.lightType = LightType.directlight;
        }

        private _dir: Vector3 = new Vector3(0, 0, 1);
        /**
        * @language zh_CN
        *  
        * 背光颜色
        * 模拟间接光照而开发的背光，而不用去同时打两盏不同方向的组合灯光，可以优化显示效果
        * @param color 背光颜色色值，格式0xffffffff
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set ambient(color: number) {
            this._ambient.w = (color >> 24 & 0xff) / 255;
            this._ambient.x = (color >> 16 & 0xff) / 255;
            this._ambient.y = (color >> 8 & 0xff) / 255;
            this._ambient.z = (color & 0xff) / 255;
            this._change = false;
        }

        /**
        * @language zh_CN
        * 光线的方向
        * @param dir 光线的方向
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set dir(dir: Vector3) {
            this._dir.copyFrom(dir);
            this._dir.normalize();

            Quaternion.fromToRotation(Vector3.Z_AXIS, this._dir, DirectLight.q0);
            this.globalOrientation = DirectLight.q0;
        }

        /**
        * @language zh_CN
        * 光线的方向
        * @returns dir 光线的方向
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get dir(): Vector3 {
            if (this._transformChange) {
                this.modelMatrix;
            }
            return this._dir;
        }

        protected onUpdateTransform() {
            super.onUpdateTransform();

            this.globalOrientation.transformVector(Vector3.Z_AXIS, this._dir);
            this._dir.normalize();
        }

       /**
        * @language zh_CN
        *  
        * 是否产生阴影
        * 模拟间接光照而开发的背光，而不用去同时打两盏不同方向的组合灯光，可以优化显示效果
        * @param color 背光颜色色值
        */
        //public set castShadow(value: boolean) {
            //if (value )
            //    RttManager.getInstance().shadowMapRender.castShadowLight = this; 
        //}

        
        /**
        * @language zh_CN
        * @private
        * 更新灯光数据
        * @param camera 灯光ID
        * @param index 灯光数据
        * @param lightData 灯光数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public updateLightData(camera: Camera3D, index: number, lightData: Float32Array) {
          
            //camera.viewMatrix.mat3TransformVector(this._rot, this.lightViewPos);
            var dir: egret3d.Vector3 = this.dir;
            lightData[index * DirectLight.stride + 0] = dir.x;
            lightData[index * DirectLight.stride + 1] = dir.y;
            lightData[index * DirectLight.stride + 2] = dir.z;
            
            lightData[index * DirectLight.stride + 3] = this._diffuse.x;
            lightData[index * DirectLight.stride + 4] = this._diffuse.y;
            lightData[index * DirectLight.stride + 5] = this._diffuse.z;

            lightData[index * DirectLight.stride + 6] = this._ambient.x;
            lightData[index * DirectLight.stride + 7] = this._ambient.y;
            lightData[index * DirectLight.stride + 8] = this._ambient.z;
            lightData[index * DirectLight.stride + 9] = this._intensity;
            //lightData[index * DirectLight.stride + 10] = this._halfIntensity;
        }
    }
} 