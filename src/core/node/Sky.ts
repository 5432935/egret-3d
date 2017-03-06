module egret3d {
                    
    /**
    * @class egret3d.Sky
    * @classdesc
    * 天空可由任意几何图形构成天空。
    * 场景中天空。
    * 可以是6面体cube，以6张无缝结合的贴图构成.
    *
    * @see egret3d.CubeTexture
    * @see egret3d.CubeTextureMaterial
    *
    * 示例:
    * @version Egret 3.0
    * @platform Web,Native
    * @includeExample core/node/Sky.ts
    */
    export class Sky extends Mesh  {

        /**
        * @language zh_CN
        * 天空的摄像机
        * 天空模型坐标会跟随此摄像机
        * @version Egret 3.0
        * @platform Web,Native
        */
        public camera: Camera3D;

        /**
        * @language zh_CN
        * 构建一个天空盒子对象
        * @param geometry 天空模型数据
        * @param material 天空材质
        * @param camera 天空渲染相机
        * @default null
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(geometry: Geometry, material: MaterialBase, camera: Camera3D = null) {
            super(geometry, material);
            this.camera = camera;
            if (!this.bound) {
                this.bound = this.buildBoundBox();
            }
        }
                        
        /**
        * @language zh_CN
        * 当前对象数据更新，只有在视锥内的对象才会执行此更新
        * @param camera 当前渲染的摄相机
        * @param time 当前时间
        * @param delay 每帧时间间隔
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number, camera: Camera3D) {
            super.update(time, delay, camera);
            if (this.camera) {
                this.globalPosition = this.camera.globalPosition;
            }
        }

        /**
        * @language zh_CN
        * @private
        * @param other copy对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public copy(other: Sky) {
            super.copy(other);
        }

        /**
        * @language zh_CN
        * 克隆当前Sky
        * @returns Sky 克隆后的对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): Sky {
            var cloneObject: Sky = new Sky(this.geometry, this.material, this.camera);
            cloneObject.copy(this);
            return cloneObject;
        }
    }
} 