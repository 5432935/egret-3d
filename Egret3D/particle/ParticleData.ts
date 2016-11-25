module egret3d {
    /**
    * @language zh_CN
    * @private
    * 粒子数据节点类型，加载自粒子数据配置文件后，创建生成
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum ParticleDataNodeType {
        //以下类型必须有
        Property,
        Emission,
        Life,
        Shape,
        RotationBirth,
        ScaleBirth,
        Geometry,
        MoveSpeed,
        //其他挂接节点
        FollowTarget,
        ScaleSize,
        RotationSpeed,
        ColorOffset,
        TextureSheet,
    }

    /**
    * @language zh_CN
    * 子发射器阶段，枚举出子粒子会在哪个阶段触发创建规则
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum ParticleDataSubEmitterPhase {
        /**
        * @language zh_CN
        * 出生阶段，子粒子会在母粒子的某个单元出生的同时创建，并绑定该粒子单元的位置和旋转信息
        * @version Egret 3.0
        * @platform Web,Native
        */
        BIRTH,

        /**
        * @language zh_CN
        * 碰撞阶段，子粒子会在母粒子的某个单元触发碰撞的同时创建，并绑定该粒子单元的位置和旋转信息（待实现）
        * @version Egret 3.0
        * @platform Web,Native
        */
        COLLISION,

        /**
        * @language zh_CN
        * 死亡阶段，子粒子会在母粒子的某个单元消失的同时创建，并绑定该粒子单元的位置和旋转信息（待实现）
        * @version Egret 3.0
        * @platform Web,Native
        */
        DEATH
    }

    /**
    * @language zh_CN
    * 粒子数据中，大部分的节点数据都需要指定类型。可以有单常量/限定范围取值常量/单贝塞尔曲线/双贝塞尔曲线，一共四种。
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum ParticleValueType {

        /**
        * @language zh_CN
        * 常量形式，粒子单元的属性都使用固定的某个数值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        Const,

        /**
        * @language zh_CN
        * 两个常量之间随机，粒子单元的属性在指定的两个值之间随机取值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        RandomConst,

        /**
        * @language zh_CN
        * 单贝塞尔曲线，粒子单元的属性在按照一个贝塞尔曲线描述的规律下进行取值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        OneBezier,

        /**
        * @language zh_CN
        * 双贝塞尔曲线，粒子单元的属性在贝塞尔曲线a和贝塞尔曲线b之间取完值va和vb之后，于va和vb之间随机取值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        TwoBezier,
    }


    /**
    * @language zh_CN
    * 枚举出粒子的面向相机模式，粒子的每个单元渲染时候用到的相机对准方式。
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum ParticleRenderModeType {

        /**
        * @language zh_CN
        * 公告板形式：粒子的单元会始终面向相机。
        * @version Egret 3.0
        * @platform Web,Native
        */
        Billboard,

        /**
        * @language zh_CN
        * 指向运动方向的公告板：粒子单元在面向相机的同时，根据自身的运动方向旋转Z轴，使其Z轴旋转指向运动方向。
        * @version Egret 3.0
        * @platform Web,Native
        */
        StretchedBillboard,

        /**
        * @language zh_CN
        * 横向公告板：粒子单元会在X轴方向翻转至水平之后，保持Y方向始终面向相机。
        * @version Egret 3.0
        * @platform Web,Native
        */
        HorizontalBillboard,

        /**
        * @language zh_CN
        * 纵向公告板：粒子单元会在X轴方向翻转至竖直之后，保持Y方向始终面向相机。
        * @version Egret 3.0
        * @platform Web,Native
        */
        VerticalBillboard,

        /**
        * @language zh_CN
        * 模型形式，不接受相机的朝向做任何transform的变换，保持自身的modelMatrix变换。
        * @version Egret 3.0
        * @platform Web,Native
        */
        Mesh,
    }


    /**
    * @language zh_CN
    * 枚举出粒子单元，其出生时候的初始颜色数据源的类型。
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum ParticleBirthColorType {

        /**
        * @language zh_CN
        * 常量形式，所有的粒子单元都使用固定的某个数值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        Const,

        /**
        * @language zh_CN
        * 两个颜色之间随机：粒子单元的某个属性值在指定的两个颜色之间随机采样，作为一个常量使用。
        * @version Egret 3.0
        * @platform Web,Native
        */
        RandomConst,

        /**
        * @language zh_CN
        * 单渐变色，使用一个渐变颜色带控制颜色的变化。
        * @version Egret 3.0
        * @platform Web,Native
        */
        OneGradients,

        /**
        * @language zh_CN
        * 双渐变色，使用两个渐变颜色带，分别去除颜色a和颜色b之后，计算一个a到b之间的随机插值作为最终数据。
        * @version Egret 3.0
        * @platform Web,Native
        */
        TwoGradients,
    }


    /**
    * @language zh_CN
    * 发射器形状，控制粒子单元的出生位置区域。通过这个出生位置，可以相应计算出之后的运动方向。
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum ParticleDataShapeType {

        /**
        * @language zh_CN
        * 点状发射器，所有的粒子单元都从一个固定的点作为出生位置。
        * @version Egret 3.0
        * @platform Web,Native
        */
        Point,

        /**
        * @language zh_CN
        * 立方体状发射器，粒子单元会在这个立方体的表面或者体内随机一个位置出生。
        * @version Egret 3.0
        * @platform Web,Native
        */
        Cube,

        /**
        * @language zh_CN
        * 球形发射器，粒子单元会在这个球体的表面或者体内随机一个位置出生。
        * @version Egret 3.0
        * @platform Web,Native
        */
        Sphere,

        /**
        * @language zh_CN
        * 半球形发射器，粒子单元会在这个半球体的表面或者体内随机一个位置出生。
        * @version Egret 3.0
        * @platform Web,Native
        */
        HemiSphere,

        /**
        * @language zh_CN
        * 筒状发射器，粒子单元会在这个筒状集合体的表面或者体内随机一个位置出生。
        * @version Egret 3.0
        * @platform Web,Native
        */
        Cone,

        /**
        * @language zh_CN
        * 从外部模型获得发射范围，粒子单元会以这个模型为基准，从它的三角面随机一个点，或者随机边上面获取一个随机点，或者随机一个顶点的作为位置出生。
        * @version Egret 3.0
        * @platform Web,Native
        */
        Mesh,

        /**
        * @language zh_CN
        * 外部传入的位置作为粒子发射的范围，粒子单元会从传入的点的列表中，随机取一个位置作为位置出生。
        * @version Egret 3.0
        * @platform Web,Native
        */
        External,
    }

    /**
    * @language zh_CN
    * 外置模型发射器类型，当发射器类型为ParticleDataShapeType.Mesh类型时，需要指定具体使用哪种规则采样出生位置。
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum ParticleMeshShapeType {
        /**
        * @language zh_CN
        * 顶点发射，粒子单元从几何体的顶点上随机一个位置出生。
        * @version Egret 3.0
        * @platform Web,Native
        */
        Vertex,

        /**
        * @language zh_CN
        * 从三角面上获得发射位置，粒子单元从几何体的三角面内随机一个位置出生。
        * @version Egret 3.0
        * @platform Web,Native
        */
        Triangle,

        /**
        * @language zh_CN
        * 从三角形的边上获得发射位置，粒子单元从几何体的一条随机边上，随机一个点作为位置出生。
        * @version Egret 3.0
        * @platform Web,Native
        */
        Edge,
    }


    /**
    * @language zh_CN
    * 发射器类型为圆筒发射器类型：ParticleDataShapeType.Cone，此时对应的在圆筒内具体部位
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum ParticleConeShapeType {

        /**
        * @language zh_CN
        * 底部发射，指定为圆筒发射器的底部圆。
        * @version Egret 3.0
        * @platform Web,Native
        */
        Base,

        /**
        * @language zh_CN
        * 底部边缘发射，指定为圆筒发射器的底部圆的边缘。
        * @version Egret 3.0
        * @platform Web,Native
        */
        BaseShell,

        /**
        * @language zh_CN
        * 体内发射，指定为圆筒发射器的体内。
        * @version Egret 3.0
        * @platform Web,Native
        */
        Volume,

        /**
        * @language zh_CN
        * 体内的边缘发射，指定为圆筒发射器的圆筒的边缘曲面。
        * @version Egret 3.0
        * @platform Web,Native
        */
        VolumeShell,
    }






    /**
    * @language zh_CN
    * @class egret3d.ParticleData
    * @classdesc
    * 创建一个粒子，所用到的数据对象，通过UnitLoader加载粒子的配置表，解析之后会自动生成该对象。
    * 或者您可以自己主动创建一个该对象，描述粒子如何生成/变化/消失。
    * @see egret3d.ParticeEmitter
    * @see egret3d.IAnimation
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleData {

        /**
        * @language zh_CN
        * 记录粒子文件的url
        * @version Egret 3.0
        * @platform Web,Native
        */
        public fileUrl: string;

        /**
        * @language zh_CN
        * 记录了粒子文件的名字
        * @version Egret 3.0
        * @platform Web,Native
        */
        public fileName: string;

        /**
        * @language zh_CN
        * 粒子的基础属性部分数据，如颜色/最大数量限制/是否自启动等。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public property: ParticleDataProperty = new ParticleDataProperty();
        /**
        * @language zh_CN
        * 发射速率相关数据，指定了粒子单元出现的规则，例如1秒内发射的个数和在某个时间点爆发的个数等。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public emission: ParticleDataEmission = new ParticleDataEmission();
        /**
        * @language zh_CN
        * 生命周期相关数据，指定了粒子单元的出生时间和存活时间的分布规则。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public life: ParticleDataLife = new ParticleDataLife();
        /**
        * @language zh_CN
        * 发射器相关数据，指定了粒子单元如何获得初始位置和运动方向信息。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public shape: ParticleDataShape = new ParticleDataShape();
        /**
        * @language zh_CN
        * 出生时候的旋转角度数据，指定粒子单元的初始缩放数据，后期会按照一定的规则迭代修改
        * @version Egret 3.0
        * @platform Web,Native
        */
        public rotationBirth: ParticleDataRotationBirth = new ParticleDataRotationBirth();
        /**
        * @language zh_CN
        * 出生时候的缩放数据，指定粒子单元的初始缩放数据，后期会按照一定的规则迭代修改
        * @version Egret 3.0
        * @platform Web,Native
        */
        public scaleBirth: ParticleDataScaleBirth = new ParticleDataScaleBirth();
        /**
        * @language zh_CN
        * 所采用的模型数据，如果粒子的单元为面片，该数据指定了面片的宽度和高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public geometry: ParticleDataGeometry = new ParticleDataGeometry();
        /**
        * @language zh_CN
        * 运动数据，描述了粒子单元在存活期间内的运动规则。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public moveSpeed: ParticleDataMoveSpeed = new ParticleDataMoveSpeed();

        /**
        * @language zh_CN
        * 是否使用局部坐标，如果粒子为全局的粒子，则应该赋予其一个跟随目标，新出生的粒子单元会使用该目标的旋转和位置信息作为出生点。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public followTarget: ParticleDataFollowTarget;
        /**
        * @language zh_CN
        * 生命周期内的缩放数据，描述了粒子单元在存活期间的缩放规则
        * @version Egret 3.0
        * @platform Web,Native
        */
        public scaleSize: ParticleDataScaleSize;

        /**
        * @language zh_CN
        * 生命周期内的旋转变化信息，描述了粒子单元在存活期间的旋转变化规则
        * @version Egret 3.0
        * @platform Web,Native
        */
        public rotationSpeed: ParticleDataRotationSpeed;
        /**
        * @language zh_CN
        * 生命周期内的颜色变化数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public colorOffset: ParticleDataColorOffset;

        /**
        * @language zh_CN
        * uv序列帧数据，描述了粒子单元用到的贴图按照指定的序列帧播放规则进行播放。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public textureSheet: ParticleDataTextureSheet;

        /**
        * @language zh_CN
        * 材质球数据，该粒子使用到的材质对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public materialData: UnitMatSphereData;


        /**
        * @language zh_CN
        * 构造函数，该数据一般由粒子的loader加载完文件后创建；您也可以自己手动编码生成，然后使用
        * @version Egret 3.0
        * @platform Web,Native 
        */
        constructor() {
        }

        /**
        * @language zh_CN
        * 数据内部进行合法矫正（例如你的粒子的delay为负数，该函数会主动修改delay为0）
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public validate(): void {
            this.property.validate();
            this.emission.validate();
            this.life.validate();
            this.shape.validate();
            this.rotationBirth.validate();
            this.scaleBirth.validate();
            this.geometry.validate();
            this.moveSpeed.validate();


            if (this.scaleSize) {
                this.scaleSize.validate();
            }
            if (this.rotationSpeed) {
                this.rotationSpeed.validate();
            }
            if (this.colorOffset) {
                this.colorOffset.validate();
            }
            if (this.followTarget) {
                this.followTarget.validate();
            }
            if (this.textureSheet) {
                this.textureSheet.validate();
            }

        }

    }

    /**
    * @language zh_CN
    * @class egret3d.ParticleDataNode
    * @classdesc
    * 粒子节点的基类，描述粒子属性的节点都继承于此类。
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleDataNode {
        protected _nodeType: number;
        /**
        * @language zh_CN
        * 构造函数，创建一个粒子节点
        * @param node 节点的类型。
        * @version Egret 3.0
        * @platform Web,Native 
        */
        constructor(node: number) {
            this._nodeType = node;
        }

        /*
        *@private
        */
        public get nodeType(): number {
            return this._nodeType;
        }
    }

    /**
    * @language zh_CN
    * @class egret3d.ParticleDataProperty
    * @classdesc
    * 粒子的基础属性，粒子的必备属性
    * @see egret3d.ColorGradients
    * @see egret3d.ParticleRenderModeType
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleDataProperty extends ParticleDataNode {
        /**
        * @language zh_CN
        * 粒子数量，用于限制同一个时间内允许共存的最大粒子单元数量。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public particleCount: number = 10;
        /**
        * @language zh_CN
        * 包围盒数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bounds: Vector3D = new Vector3D(10, 10, 10);
        /**
        * @language zh_CN
        * 初始颜色属性，有常量/随机常量/单贝塞尔曲线/双贝塞尔曲线四种选择
        * @version Egret 3.0
        * @platform Web,Native
        */
        public colorType: number = ParticleBirthColorType.Const;
        /**
        * @language zh_CN
        * 常量颜色（一），初始颜色为单常量的情况下，使用该数据作为最终数据；<p/>
        * 如果初始颜色类型为随机常量，用colorConst1和colorConst2作为样本，随机插值作为最终数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public colorConst1: Color = new Color(255, 255, 255, 255);
        /**
        * @language zh_CN
        * 常量颜色（二），如果初始颜色类型为随机常量，用colorConst1和colorConst2作为样本，随机插值作为最终数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public colorConst2: Color = new Color(255, 255, 255, 255);
        /**
        * @language zh_CN
        * 渐变颜色（一）如果初始颜色类型为单贝塞尔曲线，使用该数据作为取值数据源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public colorGradients1: ColorGradients;
        /**
        * @language zh_CN
        * 渐变颜色（二）如果初始颜色类型为双贝塞尔曲线，使用colorGradients1和colorGradients2，随机插值作为取值数据源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public colorGradients2: ColorGradients;
        /**
        * @language zh_CN
        * 重力，粒子单元受重力的影响自由落体运动。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public gravity: number = 0;
        /**
        * @language zh_CN
        * 是否预热，预热的粒子，在刚开始播放的时候，系统自动分配一个逝去时间，让该粒子看上去已经播放过一阵子，跳过启动播放的开头部分
        * @version Egret 3.0
        * @platform Web,Native
        */
        public prewarm: boolean = false;
        /**
        * @language zh_CN
        * 是否自启动，粒子一旦放入到场景节点中，自动播放该粒子特效
        * @version Egret 3.0
        * @platform Web,Native
        */
        public playOnAwake: boolean = true;
        /**
        * @language zh_CN
        * 旋转信息，粒子模型的旋转数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public rotation: Vector3D = new Vector3D(0, 0, 0, 1);
        /**
        * @language zh_CN
        * 缩放信息，粒子模型的缩放数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public scale: Vector3D = new Vector3D(1, 1, 1, 1);
        /**
        * @language zh_CN
        * 位置信息，粒子模型的位置数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public position: Vector3D = new Vector3D(0, 0, 0, 1);
        /**
        * @language zh_CN
        * 渲染排序参数，修改这个属性会导致粒子渲染的先后顺序，数据越大，越优先渲染
        * @version Egret 3.0
        * @platform Web,Native
        */
        public sortingFudge: number = 0;
        /**
        * @language zh_CN
        * 粒子的每个单元渲染时候用到的相机对准方式，默认为公告板模式，请参照ParticleRenderModeType的其他枚举类型
        * @version Egret 3.0
        * @platform Web,Native
        */
        public renderMode: number = ParticleRenderModeType.Billboard;
        /**
        * @private
        * @language zh_CN
        * cameraScale
        * @version Egret 3.0
        * @platform Web,Native
        */
        public cameraScale: number = 0.0;
         /**
        * @language zh_CN
        * 运动加成缩放，速度越大，当前拉长的系数会越大
        * @version Egret 3.0
        * @platform Web,Native
        */
        public speedScale: number = 0.0;
        /**
        * @language zh_CN
        * 长度缩放，数值越大，粒子被拉长的尺度越大
        * @version Egret 3.0
        * @platform Web,Native
        */
        public lengthScale: number = 1.0;
        /**
        * @language zh_CN
        * 用到的外部模型文件
        * @version Egret 3.0
        * @platform Web,Native
        */
        public meshFile: string;
        /**
        * @language zh_CN
        * 用到的外部模型解析后的数据对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public geometry: Geometry;

        /**
        * @language zh_CN
        * 最后停留在最大生命值的位置
        * @version Egret 3.0
        * @platform Web,Native
        */
        public stayAtEnd: boolean;
        /**
        * @language zh_CN
        * 是否为跟踪目标位置的粒子，跟踪的粒子单元，在出生的时候，会使用其绑定跟踪目标的位置和旋转数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public trackPosition: boolean;

         /**
        * @language zh_CN
        * 构造函数，创建一个ParticleDataProperty
        * @version Egret 3.0
        * @platform Web,Native 
        */
        constructor() {
            super(ParticleDataNodeType.Property);
        }
        /*
        * @private
        */
        public validate(): void {
            if (this.bounds == null) {
                this.bounds = new Vector3D(10, 10, 10);
            }
            if (this.bounds.x < 0) {
                this.bounds.x = 1;
            }
            if (this.bounds.y < 0) {
                this.bounds.y = 1;
            }
            if (this.bounds.z < 0) {
                this.bounds.z = 1;
            }
            if (this.particleCount < 0) {
                this.particleCount = 10;
            }
            if (this.colorConst1 == null) {
                this.colorConst1 = new Color(255, 255, 255, 255);
            }
            if (this.colorConst2 == null) {
                this.colorConst2 = new Color(255, 255, 255, 255);
            }
            if (this.colorType == ParticleBirthColorType.OneGradients || this.colorType == ParticleBirthColorType.TwoGradients) {
                if (this.colorGradients1 == null) {
                    this.colorGradients1 = new ColorGradients();
                }
            }
            if (this.colorType == ParticleBirthColorType.TwoGradients) {
                if (this.colorGradients2 == null) {
                    this.colorGradients2 = new ColorGradients();
                }
            }

            if (this.rotation == null) {
                this.rotation = new Vector3D(0, 0, 0, 1);
            }
            if (this.scale == null) {
                this.scale = new Vector3D(1, 1, 1, 1);
            }
            if (this.position == null) {
                this.rotation = new Vector3D(0, 0, 0, 1);
            }
        }
    }


    /**
    * @language zh_CN
    * @class egret3d.ParticleDataEmission
    * @classdesc
    * 发射速率相关数据，指定了粒子单元出现的规则，例如1秒内发射的个数和在某个时间点爆发的个数等。
    * @see egret3d.ParticleValueType
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleDataEmission extends ParticleDataNode {
        /**
        * @language zh_CN
        * 指定粒子单元按照每秒发射的出来的速度，如果是0，则不会发射粒子
        * 两外，bursts里面也可以设定发射粒子请参照egret3d.ParticleDataEmission.bursts;
        * @version Egret 3.0
        * @platform Web,Native
        */
        public rate: number = 10;
        /**
        * @language zh_CN
        * 指定数据类型，可以有单常量/限定范围取值常量/单贝塞尔曲线/双贝塞尔曲线，四种类型。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public type: number = ParticleValueType.Const;
        /**
        * @language zh_CN
        * 粒子爆发的数据，[(1,10),(2,5)...]代表在1s的时候爆发10个，在2s的时候爆发5个，以此类推
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bursts: Array<Point>;
        /**
        * @language zh_CN
        * 发射速率指定为单贝塞尔曲线时候，用到的贝塞尔曲线数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bezier: BezierData = new BezierData();
         /**
        * @language zh_CN
        * 构造函数，创建一个ParticleDataEmission对象
        * @version Egret 3.0
        * @platform Web,Native 
        */
        constructor() {
            super(ParticleDataNodeType.Emission);
        }

        /*
        * @private
        */
        public validate(): void {
            if (this.rate < 0) {
                this.rate = 0.00001;
            }
            if (this.type == ParticleValueType.OneBezier) {
                if (this.bezier == null) {
                    this.bezier = new BezierData();
                }
                this.bezier.validate();
            }
        }
    }


    /**
    * @language zh_CN
    * @class egret3d.ParticleDataLife
    * @classdesc
    * 粒子生命周期数据，指定粒子单元出生后的存活时间，以及每个粒子单元存活时间各自不同的规则
    * @see egret3d.ParticleValueType
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleDataLife extends ParticleDataNode {
        /**
        * @language zh_CN
        * 指定数据类型，可以有单常量/限定范围取值常量/单贝塞尔曲线/双贝塞尔曲线，四种类型。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public type: number = ParticleValueType.Const;
        /**
        * @language zh_CN
        * 类型为随机常量时，指定的最大值；如果类型为常量时，max和min相等
        * @version Egret 3.0
        * @platform Web,Native
        */
        public max: number = 0;
        /**
        * @language zh_CN
        * 类型为随机常量时，指定的最小值；如果类型为常量时，max和min相等
        * @version Egret 3.0
        * @platform Web,Native
        */
        public min: number = 0;

        /**
        * @language zh_CN
        * 粒子单元指定为单贝塞尔曲线/双贝塞尔曲线用到时，用到的曲线一
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bezier1: BezierData;
        /**
        * @language zh_CN
        * 粒子单元指定双贝塞尔曲线用到时，用到的曲线二
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bezier2: BezierData;
        /**
        * @language zh_CN
        * 发射器存活时间，如果是loop粒子，该参数不一定生效
        * @version Egret 3.0
        * @platform Web,Native
        */
        public duration: number = 5;
        /**
        * @language zh_CN
        * 粒子发射前的等待时间，在0-delay时间内，不会有粒子单元出生
        * @version Egret 3.0
        * @platform Web,Native
        */
        public delay: number = 0;
        /**
        * @language zh_CN
        * 是否循环，循环的粒子会在播放了一段时间之后，自动重复播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public loop: boolean = true;

         /**
        * @language zh_CN
        * 构造函数，创建一个ParticleDataLife
        * @version Egret 3.0
        * @platform Web,Native 
        */
        constructor() {
            super(ParticleDataNodeType.Life);
        }


        /*
        * @private
        */
        public validate(): void {
            if (this.max <= 0) {
                this.max = 0.000001;
            }
            if (this.min <= 0) {
                this.min = 0.000001;
            }
            //life
            if (this.type == ParticleValueType.Const) {
                this.min = this.max;
            }
            if (this.type == ParticleValueType.RandomConst) {

            }
            if (this.type == ParticleValueType.OneBezier || this.type == ParticleValueType.TwoBezier) {
                if (this.bezier1 == null) {
                    this.bezier1 = new BezierData();
                }
                this.bezier1.validate();
            }
            if (this.type == ParticleValueType.TwoBezier) {
                if (this.bezier2 == null) {
                    this.bezier2 = new BezierData();
                }
                this.bezier2.validate();
            }
            //delay
            if (this.delay < 0) {
                this.delay = 0;
            }
            //duration
            if (this.duration < 0) {
                this.duration = 5;
            }

        }
    }

    /**
    * @language zh_CN
    * @class egret3d.ParticleDataShape
    * @classdesc
    * 粒子发射器形状，指定粒子的每个单元出生的范围。
    * 一旦确定了某粒子单元的出生点之后，根据各自不同的发射器形状，便能够获取到他的默认运动方向。
    * @see egret3d.ParticleDataShapeType
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleDataShape extends ParticleDataNode {


        /**
        * @language zh_CN
        * 粒子发射器形状类型，请参照egret3d.ParticleDataShapeType
        * @version Egret 3.0
        * @platform Web,Native
        */
        public type: number = ParticleDataShapeType.Cube;
        /**
        * @language zh_CN
        * 是否随机方向发射，制定为随机发射方向的粒子，会自动获取一个在xyz三轴随机取值方向作为默认运动方向。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public randomDirection: boolean = false;
        /**
        * @language zh_CN
        * 粒子单元是否仅仅在发射器的壳位置发射
        * @version Egret 3.0
        * @platform Web,Native
        */
        public emitFromShell: boolean = false;
        /**
        * @language zh_CN
        * 指定为ParticleDataShapeType.Cube类型时，正方体发射器的宽度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public cubeW: number = 0;
        /**
        * @language zh_CN
        * 指定为ParticleDataShapeType.Cube类型时，正方体发射器的高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public cubeH: number = 0;
        /**
        * @language zh_CN
        * 指定为ParticleDataShapeType.Cube类型时，正方体发射器的深度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public cubeD: number = 0;

        /**
        * @language zh_CN
        * 指定为ParticleDataShapeType.Sphere类型时，球型发射器的半径
        * @version Egret 3.0
        * @platform Web,Native
        */
        public sphereRadius: number = 10;

        /**
        * @language zh_CN
        * 指定为ParticleDataShapeType.HemiSphere类型时，半球型发射器的半径
        * @version Egret 3.0
        * @platform Web,Native
        */
        public hemiSphereRadius: number = 10;

        /**
        * @language zh_CN
        * 指定为ParticleDataShapeType.Cone类型时，具体指定粒子出生的区域，详细请参考egret3d.ParticleConeShapeType
        * @version Egret 3.0
        * @platform Web,Native
        */
        public coneType: number = ParticleConeShapeType.Volume;
        /**
        * @language zh_CN
        * 指定为ParticleDataShapeType.Cone类型时，圆筒的长度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public coneLength: number = 10;
        /**
        * @language zh_CN
        * 指定为ParticleDataShapeType.Cone类型时，圆筒的底部半径
        * @version Egret 3.0
        * @platform Web,Native
        */
        public coneRadius: number = 10;
        /**
        * @language zh_CN
        * 指定为ParticleDataShapeType.Cone类型时，圆筒的角度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public coneAngle: number = 30;

        /**
        * @language zh_CN
        * 指定为ParticleDataShapeType.Mesh类型时，mesh类型发射器的子类型，具体请参照egret3d.ParticleMeshShapeType
        * @version Egret 3.0
        * @platform Web,Native
        */
        public meshType: number = ParticleMeshShapeType.Vertex;
        /**
        * @language zh_CN
        * 粒子用到的模型文件url，指定于粒子文件配置表中
        * @version Egret 3.0
        * @platform Web,Native
        */
        public meshFile: string;
        /**
        * @language zh_CN
        * 从egret3d.ParticleDataShape.meshFile加载到的文件，取值到的Geometry数据，为mesh类型发射器的模型
        * @version Egret 3.0
        * @platform Web,Native
        */
        public geometry: Geometry;

        /**
        * @language zh_CN
        * 指定为ParticleDataShapeType.External类型时，外部指定的发射位置列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public externalPositionList: Vector3D[];

        /**
        * @language zh_CN
        * 构造函数，创建一个ParticleDataShape实例
        * @version Egret 3.0
        * @platform Web,Native 
        */
        constructor() {
            super(ParticleDataNodeType.Shape);
        }


        /*
        * @private
        */
        public validate(): void {
            if (this.type == ParticleDataShapeType.Cube) {
                if (this.cubeW < 0) {
                    this.cubeW = 0;
                }
                if (this.cubeH < 0) {
                    this.cubeH = 0;
                }
                if (this.cubeD < 0) {
                    this.cubeD = 0;
                }
            }
            else if (this.type == ParticleDataShapeType.Sphere) {
                if (this.sphereRadius < 0) {
                    this.sphereRadius = 10;
                }
            }
        }
    }









    /**
    * @language zh_CN
    * @class egret3d.ParticleDataRotationBirth
    * @classdesc
    * 出生时候的旋转角度数据，指定粒子单元的初始缩放数据，后期会按照一定的规则迭代修改
    * @see egret3d.ParticleValueType
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleDataRotationBirth extends ParticleDataNode {
        /**
        * @language zh_CN
        * 指定数据类型，可以有单常量/限定范围取值常量/单贝塞尔曲线/双贝塞尔曲线，四种类型。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public type: number = ParticleValueType.Const;
        /**
        * @language zh_CN
        * 类型为随机常量时，指定的最大值；如果类型为常量时，max和min相等
        * @version Egret 3.0
        * @platform Web,Native
        */
        public max: number = 0;
        /**
        * @language zh_CN
        * 类型为随机常量时，指定的最小值；如果类型为常量时，max和min相等
        * @version Egret 3.0
        * @platform Web,Native
        */
        public min: number = 0;
        /**
        * @language zh_CN
        * 类型为单贝塞尔曲线或者双贝塞尔曲线时，用到的贝塞尔曲线一
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bezier1: BezierData;
        /**
        * @language zh_CN
        * 类型为双贝塞尔曲线时，用到的贝塞尔曲线二
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bezier2: BezierData;

         /**
        * @language zh_CN
        * 构造函数，创建一个ParticleDataRotationBirth对象
        * @version Egret 3.0
        * @platform Web,Native 
        */
        constructor() {
            super(ParticleDataNodeType.RotationBirth);
        }

        /*
        * @private
        */
        public validate(): void {

            if (this.type == ParticleValueType.Const) {
                this.min = this.max;
            }
            if (this.type == ParticleValueType.RandomConst) {

            }
            if (this.type == ParticleValueType.OneBezier || this.type == ParticleValueType.TwoBezier) {
                if (this.bezier1 == null) {
                    this.bezier1 = new BezierData();
                }
                this.bezier1.validate();
            }
            if (this.type == ParticleValueType.TwoBezier) {
                if (this.bezier2 == null) {
                    this.bezier2 = new BezierData();
                }
                this.bezier2.validate();
            }
        }
    }


    /**
    * @language zh_CN
    * @class egret3d.ParticleDataScaleBirth
    * @classdesc
    * 粒子初始缩放值，指定粒子单元出生时候的默认缩放值，以及在每个粒子之间默认缩放值的变化规律
    * @see egret3d.ParticleValueType
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleDataScaleBirth extends ParticleDataNode {
        /**
        * @language zh_CN
        * 指定数据类型，可以有单常量/限定范围取值常量/单贝塞尔曲线/双贝塞尔曲线，四种类型。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public type: number = ParticleValueType.Const;
        /**
        * @language zh_CN
        * 类型为随机常量时，指定的最大值；如果类型为常量时，max和min相等
        * @version Egret 3.0
        * @platform Web,Native
        */
        public max: number = 1;
        /**
        * @language zh_CN
        * 类型为随机常量时，指定的最小值；如果类型为常量时，max和min相等
        * @version Egret 3.0
        * @platform Web,Native
        */
        public min: number = 1;
        /**
        * @language zh_CN
        * 类型为单贝塞尔曲线或者双贝塞尔曲线时，用到的贝塞尔曲线一
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bezier1: BezierData;
        /**
        * @language zh_CN
        * 类型为双贝塞尔曲线时，用到的贝塞尔曲线二
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bezier2: BezierData;

         /**
        * @language zh_CN
        * 构造函数，创建一个ParticleDataScaleBirth对象
        * @version Egret 3.0
        * @platform Web,Native 
        */
        constructor() {
            super(ParticleDataNodeType.ScaleBirth);
        }

        /*
        * @private
        */
        public validate(): void {

            if (this.type == ParticleValueType.Const) {
                this.min = this.max;
            }
            if (this.type == ParticleValueType.RandomConst) {

            }
            if (this.type == ParticleValueType.OneBezier || this.type == ParticleValueType.TwoBezier) {
                if (this.bezier1 == null) {
                    this.bezier1 = new BezierData();
                }
                this.bezier1.validate();
            }
            if (this.type == ParticleValueType.TwoBezier) {
                if (this.bezier2 == null) {
                    this.bezier2 = new BezierData();
                }
                this.bezier2.validate();
            }
        }
    }


    /**
    * @language zh_CN
    * @class egret3d.ParticleDataGeometry
    * @classdesc
    * 粒子模型，指定粒子单元出生时候的宽度和高度，如果粒子单元的模型为外部模型，该值不生效
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleDataGeometry extends ParticleDataNode {
        /**
        * @language zh_CN
        * 指定面片的宽度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public planeW: number = 10;

        /**
        * @language zh_CN
        * 指定面片的高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public planeH: number = 10;

         /**
        * @language zh_CN
        * 构造函数，创建一个ParticleDataGeometry对象
        * @version Egret 3.0
        * @platform Web,Native 
        */
        constructor() {
            super(ParticleDataNodeType.Geometry);
        }

        /*
        * @private
        */
        public validate(): void {
            if (this.planeW < 0) {
                this.planeW = 10;
            }
            if (this.planeH < 0) {
                this.planeH = 10;
            }

        }
    }




    /**
    * @language zh_CN
    * @class egret3d.ParticleDataMoveSpeed
    * @classdesc
    * 粒子移动速度，指定粒子单元在存活期内的移动速度变化规律，粒子的运动会叠加有：
    * 1，默认朝向下的默认速度
    * 2，重力
    * 3，速度叠加
    * 4，速度限制
    * 5，外部推力
    * @see egret3d.ParticleValueType
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleDataMoveSpeed extends ParticleDataNode {
        /**
        * @language zh_CN
        * 指定数据类型，可以有单常量/限定范围取值常量/单贝塞尔曲线/双贝塞尔曲线，四种类型。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public type: number = ParticleValueType.Const;
        /**
        * @language zh_CN
        * 类型为随机常量时，指定的最大值；如果类型为常量时，max和min相等
        * @version Egret 3.0
        * @platform Web,Native
        */
        public max: number = 0;
        /**
        * @language zh_CN
        * 类型为随机常量时，指定的最小值；如果类型为常量时，max和min相等
        * @version Egret 3.0
        * @platform Web,Native
        */
        public min: number = 0;
        /**
        * @language zh_CN
        * 类型为单贝塞尔曲线或者双贝塞尔曲线时，用到的贝塞尔曲线一
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bezier1: BezierData;
        /**
        * @language zh_CN
        * 类型为双贝塞尔曲线时，用到的贝塞尔曲线二
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bezier2: BezierData;

        /**
        * @language zh_CN
        * 粒子单元受叠加速度数据影响，该数据可能没有
        * @version Egret 3.0
        * @platform Web,Native
        */
        public velocityOver: VelocityOverLifeTimeData;
        /**
        * @language zh_CN
        * 粒子单元受速度限制数据影响，该数据可能没有
        * @version Egret 3.0
        * @platform Web,Native
        */
        public velocityLimit: VelocityLimitLifeTimeData;
        /**
        * @language zh_CN
        * 粒子单元受外部推力影响，该数据可能没有
        * @version Egret 3.0
        * @platform Web,Native
        */
        public velocityForce: VelocityForceLifeTimeData;

         /**
        * @language zh_CN
        * 构造函数，创建一个ParticleDataMoveSpeed对象
        * @version Egret 3.0
        * @platform Web,Native 
        */
        constructor() {
            super(ParticleDataNodeType.MoveSpeed);
        }


        /*
        * @private
        */
        public validate(): void {
            if (this.velocityOver) {
                this.velocityOver.validate();
            }
            if (this.velocityLimit) {
                this.velocityLimit.validate();
            }
            if (this.velocityForce) {
                this.velocityForce.validate();
            }
            if (this.type == ParticleValueType.Const) {
                this.min = this.max;
            }
            if (this.type == ParticleValueType.OneBezier || this.type == ParticleValueType.TwoBezier) {
                if (this.bezier1 == null) {
                    this.bezier1 = new BezierData();
                }
                this.bezier1.validate();
            }
            if (this.type == ParticleValueType.TwoBezier) {
                if (this.bezier2 == null) {
                    this.bezier2 = new BezierData();
                }
                this.bezier2.validate();
            }
        }
    }

    /**
    * @language zh_CN
    * @class egret3d.VelocityLimitLifeTimeData
    * @classdesc
    * 粒子限速数据，粒子在存活时间内，运动的时候设定一个速度范围
    * @see egret3d.ParticleValueType
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class VelocityLimitLifeTimeData {
        /**
        * @language zh_CN
        * 指定数据类型，可以有单常量/限定范围取值常量/单贝塞尔曲线/双贝塞尔曲线，四种类型。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public type: number = ParticleValueType.Const;
        /**
        * @language zh_CN
        * 类型为随机常量时，指定的最大值；如果类型为常量时，max和min相等
        * @version Egret 3.0
        * @platform Web,Native
        */
        public max: number = 0;
        /**
        * @language zh_CN
        * 类型为随机常量时，指定的最小值；如果类型为常量时，max和min相等
        * @version Egret 3.0
        * @platform Web,Native
        */
        public min: number = 0;
        /**
        * @language zh_CN
        * 限速抑制值，该值越大，受限制的影响越明显
        * @version Egret 3.0
        * @platform Web,Native
        */
        public dampen: number = 0;
        /**
        * @language zh_CN
        * 类型为单贝塞尔曲线或者双贝塞尔曲线时，用到的贝塞尔曲线一
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bezier1: BezierData = new BezierData();
        /**
        * @language zh_CN
        * 类型为双贝塞尔曲线时，用到的贝塞尔曲线二
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bezier2: BezierData = new BezierData();

        /**
        * @language zh_CN
        * 构造函数，创建一个VelocityLimitLifeTimeData对象
        * @version Egret 3.0
        * @platform Web,Native 
        */
        constructor() {
        }


        /*
        * @private
        */
        public validate(): void {
            if (this.max < 0) {
                this.max = 0;
            }
            if (this.min < 0) {
                this.min = 0;
            }
            this.dampen = this.dampen || 0;

            if (this.type == ParticleValueType.Const) {
                this.min = this.max;
            }

            if (this.type == ParticleValueType.OneBezier || this.type == ParticleValueType.TwoBezier) {
                if (this.bezier1 == null) {
                    this.bezier1 = new BezierData();
                }
                this.bezier1.validate();
            }

            if (this.type == ParticleValueType.TwoBezier) {
                if (this.bezier2 == null) {
                    this.bezier2 = new BezierData();
                }
                this.bezier2.validate();
            }

        }

    }

    /**
    * @language zh_CN
    * @class egret3d.VelocityOverLifeTimeData
    * @classdesc
    * 粒子速度叠加，指定粒子单元的运动受到一个叠加速度影响，该叠加速度可以是世界坐标系方向或者本地坐标系两种类型。
    * @see egret3d.ParticleValueType
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class VelocityOverLifeTimeData {
        /**
        * @language zh_CN
        * 指定数据类型，可以有单常量/限定范围取值常量/单贝塞尔曲线/双贝塞尔曲线，四种类型。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public type: number = ParticleValueType.Const;
        /**
        * @language zh_CN
        * 速度叠加范围上限，xyz分别为坐标系的3个朝向，w无效
        * @version Egret 3.0
        * @platform Web,Native
        */
        public max: Vector3D = new Vector3D();
        /**
        * @language zh_CN
        * 速度叠加范围下限，xyz分别为坐标系的3个朝向，w无效
        * @version Egret 3.0
        * @platform Web,Native
        */
        public min: Vector3D = new Vector3D();
        /**
        * @language zh_CN
        * 指定叠加速度是世界坐标系方向或者本地坐标系：true为世界坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public worldSpace: boolean = false;
        /**
        * @language zh_CN
        * 当数据类型为单贝塞尔曲线或者双贝塞尔曲线时，x轴用到的贝塞尔曲线一
        * @version Egret 3.0
        * @platform Web,Native
        */
        public xBezier1: BezierData = new BezierData();
        /**
        * @language zh_CN
        * 当数据类型为单贝塞尔曲线或者双贝塞尔曲线时，y轴用到的贝塞尔曲线一
        * @version Egret 3.0
        * @platform Web,Native
        */
        public yBezier1: BezierData = new BezierData();
        /**
        * @language zh_CN
        * 当数据类型为单贝塞尔曲线或者双贝塞尔曲线时，z轴用到的贝塞尔曲线一
        * @version Egret 3.0
        * @platform Web,Native
        */
        public zBezier1: BezierData = new BezierData();
        /**
        * @language zh_CN
        * 当数据类型为双贝塞尔曲线时，x轴用到的贝塞尔曲线二
        * @version Egret 3.0
        * @platform Web,Native
        */
        public xBezier2: BezierData = new BezierData();
        /**
        * @language zh_CN
        * 当数据类型为双贝塞尔曲线时，y轴用到的贝塞尔曲线二
        * @version Egret 3.0
        * @platform Web,Native
        */
        public yBezier2: BezierData = new BezierData();
        /**
        * @language zh_CN
        * 当数据类型为双贝塞尔曲线时，z轴用到的贝塞尔曲线二
        * @version Egret 3.0
        * @platform Web,Native
        */
        public zBezier2: BezierData = new BezierData();



        /*
        * @private
        */
        public validate(): void {

            if (this.max == null) {
                this.max = new Vector3D();
            }
            if (this.min == null) {
                this.min = this.max.clone();
            }
            if (this.type == ParticleValueType.OneBezier || this.type == ParticleValueType.TwoBezier) {
                if (this.xBezier1 == null) {
                    this.xBezier1 = new BezierData();
                }
                if (this.yBezier1 == null) {
                    this.yBezier1 = new BezierData();
                }
                if (this.zBezier1 == null) {
                    this.zBezier1 = new BezierData();
                }

                this.xBezier1.validate();
                this.yBezier1.validate();
                this.zBezier1.validate();
            }

            if (this.type == ParticleValueType.TwoBezier) {
                if (this.xBezier2 == null) {
                    this.xBezier2 = new BezierData();
                }
                if (this.yBezier2 == null) {
                    this.yBezier2 = new BezierData();
                }
                if (this.zBezier2 == null) {
                    this.zBezier2 = new BezierData();
                }
                this.xBezier2.validate();
                this.yBezier2.validate();
                this.zBezier2.validate();
            }

        }

       
    }

    /**
    * @language zh_CN
    * @class egret3d.VelocityForceLifeTimeData
    * @classdesc
    * 给予粒子一个作用力，指定粒子单元的运动受到一个外部力影响，该力的作用会持续影响粒子的运动，可以是世界坐标系方向或者本地坐标系两种类型。
    * @see egret3d.ParticleValueType
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class VelocityForceLifeTimeData {
        /**
        * @language zh_CN
        * 指定数据类型，可以有单常量/限定范围取值常量/单贝塞尔曲线/双贝塞尔曲线，四种类型。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public type: number = ParticleValueType.Const;
        /**
        * @language zh_CN
        * 受力范围上限，xyz分别为坐标系的3个朝向，w无效
        * @version Egret 3.0
        * @platform Web,Native
        */
        public max: Vector3D = new Vector3D();
        /**
        * @language zh_CN
        * 受力范围下限，xyz分别为坐标系的3个朝向，w无效
        * @version Egret 3.0
        * @platform Web,Native
        */
        public min: Vector3D = new Vector3D();
        /**
        * @language zh_CN
        * 指定外部力是世界坐标系方向或者本地坐标系：true为世界坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public worldSpace: boolean = false;
        /**
        * @language zh_CN
        * 当数据类型为单贝塞尔曲线或者双贝塞尔曲线时，x轴用到的贝塞尔曲线一
        * @version Egret 3.0
        * @platform Web,Native
        */
        public xBezier1: BezierData = new BezierData();
        /**
        * @language zh_CN
        * 当数据类型为单贝塞尔曲线或者双贝塞尔曲线时，y轴用到的贝塞尔曲线一
        * @version Egret 3.0
        * @platform Web,Native
        */
        public yBezier1: BezierData = new BezierData();
        /**
        * @language zh_CN
        * 当数据类型为单贝塞尔曲线或者双贝塞尔曲线时，z轴用到的贝塞尔曲线一
        * @version Egret 3.0
        * @platform Web,Native
        */
        public zBezier1: BezierData = new BezierData();
        /**
        * @language zh_CN
        * 当数据类型为双贝塞尔曲线时，x轴用到的贝塞尔曲线二
        * @version Egret 3.0
        * @platform Web,Native
        */

        public xBezier2: BezierData = new BezierData();
        /**
        * @language zh_CN
        * 当数据类型为双贝塞尔曲线时，y轴用到的贝塞尔曲线二
        * @version Egret 3.0
        * @platform Web,Native
        */
        public yBezier2: BezierData = new BezierData();
        /**
        * @language zh_CN
        * 当数据类型为双贝塞尔曲线时，z轴用到的贝塞尔曲线二
        * @version Egret 3.0
        * @platform Web,Native
        */
        public zBezier2: BezierData = new BezierData();


        /*
        * @private
        */
        public validate(): void {

            if (this.max == null) {
                this.max = new Vector3D();
            }
            if (this.min == null) {
                this.min = this.max.clone();
            }
            if (this.type == ParticleValueType.OneBezier || this.type == ParticleValueType.TwoBezier) {
                if (this.xBezier1 == null) {
                    this.xBezier1 = new BezierData();
                }
                if (this.yBezier1 == null) {
                    this.yBezier1 = new BezierData();
                }
                if (this.zBezier1 == null) {
                    this.zBezier1 = new BezierData();
                }

                this.xBezier1.validate();
                this.yBezier1.validate();
                this.zBezier1.validate();
            }

            if (this.type == ParticleValueType.TwoBezier) {
                if (this.xBezier2 == null) {
                    this.xBezier2 = new BezierData();
                }
                if (this.yBezier2 == null) {
                    this.yBezier2 = new BezierData();
                }
                if (this.zBezier2 == null) {
                    this.zBezier2 = new BezierData();
                }
                this.xBezier2.validate();
                this.yBezier2.validate();
                this.zBezier2.validate();
            }

        }

       
    }

    /**
    * @language zh_CN
    * @class egret3d.ParticleDataScaleSize
    * @classdesc
    * 粒子缩放贝塞尔曲线，指定粒子单元的在存活期内，其宽度和高度按照这个贝塞尔曲线的指定的规则变化
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleDataScaleSize extends ParticleDataNode {
        /**
        * @language zh_CN
        * 指定数据类型，可以有单常量/限定范围取值常量/单贝塞尔曲线/双贝塞尔曲线，四种类型。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public type: number = ParticleValueType.Const;
        /**
        * @language zh_CN
        * 类型为随机常量时，指定的最大值；如果类型为常量时，max和min相等
        * @version Egret 3.0
        * @platform Web,Native
        */
        public max: number = 1;
        /**
        * @language zh_CN
        * 类型为随机常量时，指定的最小值；如果类型为常量时，max和min相等
        * @version Egret 3.0
        * @platform Web,Native
        */
        public min: number = 1;
        /**
        * @language zh_CN
        * 类型为单贝塞尔曲线或者双贝塞尔曲线时，用到的贝塞尔曲线一
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bezier1: BezierData = new BezierData();
        /**
        * @language zh_CN
        * 类型为双贝塞尔曲线时，用到的贝塞尔曲线二
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bezier2: BezierData = new BezierData();

        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native 
        */
        constructor() {
            super(ParticleDataNodeType.ScaleSize);
        }

        /*
        * @private
        */
        public validate(): void {
            if (this.max <= 0) {
                this.max = 0.000001;
            }
            if (this.min <= 0) {
                this.min = 0.000001;
            }
            //type
            if (this.type == ParticleValueType.Const) {
                this.min = this.max;
            }
            if (this.type == ParticleValueType.RandomConst) {

            }
            if (this.type == ParticleValueType.OneBezier || this.type == ParticleValueType.TwoBezier) {
                if (this.bezier1 == null) {
                    this.bezier1 = new BezierData();
                }
                this.bezier1.validate();
            }
            if (this.type == ParticleValueType.TwoBezier) {
                if (this.bezier2 == null) {
                    this.bezier2 = new BezierData();
                }
                this.bezier2.validate();
            }
        }
    }


    /**
    * @language zh_CN
    * @class egret3d.ParticleDataRotationSpeed
    * @classdesc
    * 粒子角速度，指定粒子单元的在存活期内，按照一定的规则持续旋转
    * @see egret3d.ParticleValueType
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleDataRotationSpeed extends ParticleDataNode {
        /**
        * @language zh_CN
        * 角速度上限，xyz分别为坐标系的3个朝向，w无效
        * @version Egret 3.0
        * @platform Web,Native
        */
        public max: Vector3D = new Vector3D();
        /**
        * @language zh_CN
        * 角速度下限，xyz分别为坐标系的3个朝向，w无效
        * @version Egret 3.0
        * @platform Web,Native
        */
        public min: Vector3D = new Vector3D();
        /**
        * @language zh_CN
        * 指定数据类型，可以有单常量/限定范围取值常量/单贝塞尔曲线/双贝塞尔曲线，四种类型。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public type: number = ParticleValueType.Const;
        /**
        * @language zh_CN
        * 类型为单贝塞尔曲线或者双贝塞尔曲线时，用到的贝塞尔曲线一
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bezier1: BezierData = new BezierData();
        /**
        * @language zh_CN
        * 类型为双贝塞尔曲线时，用到的贝塞尔曲线二
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bezier2: BezierData = new BezierData();
        /**
        * @language zh_CN
        * 是否三轴同时旋转，通常条件下，粒子只有在围绕Z轴做旋转运动
        * @version Egret 3.0
        * @platform Web,Native
        */
        public rot3Axis: boolean = false;

        /**
        * @language zh_CN
        * 构造函数，创建一个ParticleDataRotationSpeed
        * @version Egret 3.0
        * @platform Web,Native 
        */
        constructor() {
            super(ParticleDataNodeType.RotationSpeed);
        }


        /*
        * @private
        */
        public validate(): void {

            if (this.max == null) {
                this.max = new Vector3D();
            }
            if (this.min == null) {
                this.min = this.max.clone();
            }
            if (this.type == ParticleValueType.OneBezier || this.type == ParticleValueType.TwoBezier) {
                if (this.bezier1 == null) {
                    this.bezier1 = new BezierData();
                }
                this.bezier1.validate();
            }

            if (this.type == ParticleValueType.TwoBezier) {
                if (this.bezier2 == null) {
                    this.bezier2 = new BezierData();
                }
                this.bezier2.validate();
            }

        }
    }

    /**
    * @language zh_CN
    * @class egret3d.ParticleDataColorOffset
    * @classdesc
    * 粒子颜色变化渐变数据，指定粒子单元的在存活期内，其颜色变化规则所采用的渐变数据源
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleDataColorOffset extends ParticleDataNode {
        /**
        * @language zh_CN
        * 颜色渐变数据，数据格式为0-1时间范围内，rgba四个通道叠加上对应的颜色。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public data: ColorGradients = new ColorGradients();

         /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native 
        */
        constructor() {
            super(ParticleDataNodeType.ColorOffset);
        }


        /*
        * @private
        */
        public validate(): void {
            if (this.data.colors == null) {
                this.data.colors = [];
            }
            if (this.data.times == null) {
                this.data.times = [];
            }
        }
    }

    /**
    * @language zh_CN
    * @class egret3d.ParticleDataFollowTarget
    * @classdesc
    * 粒子跟随信息，如果绑定有跟随对象，该数据描述了跟随的详细情况，如是否跟随旋转/跟随缩放（位置为默认跟随）
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleDataFollowTarget extends ParticleDataNode {
        /**
        * @language zh_CN
        * 是否跟随目标的旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public followRotation: boolean = true;
        /**
        * @language zh_CN
        * 是否跟随目标的缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public followScale: boolean = true;

        /**
        * @language zh_CN
        * 构造函数，创建一个ParticleDataFollowTarget实例
        * @version Egret 3.0
        * @platform Web,Native 
        */
        constructor() {
            super(ParticleDataNodeType.FollowTarget);
        }


        /*
        * @private
        */
        public validate(): void {

        }

    }


    /**
    * @language zh_CN
    * @class egret3d.ParticleDataTextureSheet
    * @classdesc
    * 粒子材质序列帧数据，指定粒子单元的在存活期内，采样贴图时，按照这个数据所指定的规则，进行uv更新变换。
    * @see egret3d.ParticleValueType
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleDataTextureSheet extends ParticleDataNode {

        /**
        * @language zh_CN
        * tileX 序列帧划分为多少列
        * @version Egret 3.0
        * @platform Web,Native
        */
        public tileX: number = 1;

        /**
        * @language zh_CN
        * tileY 序列帧划分为多少行
        * @version Egret 3.0
        * @platform Web,Native
        */
        public tileY: number = 1;

        /**
        * @language zh_CN
        * whole 范围是否为全部帧
        * @version Egret 3.0
        * @platform Web,Native
        */
        public whole: boolean = true;

        /**
        * @language zh_CN
        * frameType 帧控制类型，可以有单常量/限定范围取值常量/单贝塞尔曲线/双贝塞尔曲线，四种类型。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public frameType: number = ParticleValueType.Const;

        /**
        * @language zh_CN
        * randomRow 是否随机单行，如果为随机单行，则粒子单元会先使用随机取值到一个固定的行号，然后以这个行号作为范围，继续采样序列帧数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public randomRow: boolean = false;

        /**
        * @language zh_CN
        * row 指定锁定第几行播放，指定单行的条件下，uv序列帧只会在这个指定行内取值，采样序列帧数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public row: number = 0;

        /**
        * @language zh_CN
        * 类型为随机常量时，指定的最小值；如果类型为常量时，max和min相等
        * @version Egret 3.0
        * @platform Web,Native
        */
        public min: number = 0;


        /**
        * @language zh_CN
        * 类型为随机常量时，指定的最大值；如果类型为常量时，max和min相等
        * @version Egret 3.0
        * @platform Web,Native
        */
        public max: number = 0;

        /**
        * @language zh_CN
        * circles 循环播放次数，最小值为1。该数值越大，会导致uv序列帧跳动越快
        * @version Egret 3.0
        * @platform Web,Native
        */
        public circles: number = 1;


        /**
        * @language zh_CN
        * 类型为单贝塞尔曲线或者双贝塞尔曲线时，用到的贝塞尔曲线一
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bezier1: BezierData = new BezierData();


        /**
        * @language zh_CN
        * 类型为双贝塞尔曲线时，用到的贝塞尔曲线二
        */
        public bezier2: BezierData = new BezierData();


         /**
        * @language zh_CN
        * 构造函数，创建一个ParticleDataTextureSheet对象
        * @version Egret 3.0
        * @platform Web,Native 
        */
        constructor() {
            super(ParticleDataNodeType.TextureSheet);
        }


        /*
        * @private
        */
        public validate(): void {
            //
            if (this.tileX < 0) {
                this.tileX = 1;
            }
            this.tileX = Math.floor(this.tileX);
            //
            if (this.tileY < 0) {
                this.tileY = 1;
            }
            this.tileY = Math.floor(this.tileY);
            //
            if (this.max < 0) {
                this.max = 0;
            }
            if (this.min > this.max) {
                this.min = this.max;
            }
            //
            if (this.frameType == ParticleValueType.OneBezier || this.frameType == ParticleValueType.TwoBezier) {
                if (this.bezier1 == null) {
                    this.bezier1 = new BezierData();
                }
                this.bezier1.validate();
            }
            //
            if (this.frameType == ParticleValueType.TwoBezier) {
                if (this.bezier2 == null) {
                    this.bezier2 = new BezierData();
                }
                this.bezier2.validate();
            }
            //
            if (this.circles < 1) {
                this.circles = 1;
            }


        }
    }







}