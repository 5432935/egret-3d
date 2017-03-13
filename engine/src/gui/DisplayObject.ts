module egret3d {
    /**
    * @class egret3d.gui.DisplayObject
    * @classdesc 2D显示对象基础类,封装有坐标/尺寸/旋转/缩放/颜色/是否可见/遮罩信息；</p>
    * GUI中鼠标事件的捕获最底层对象。</p>
    * GUI树形结构的封装对象。
    * @includeExample gui/DisplayObject.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class DisplayObject extends EventDispatcher {
        /**
        * @language zh_CN
        * 该对象的属性标记
        */
        public id: number;
        /**
        * @language zh_CN
        * 该对象的名字
        */
        public name: string;
        /**
        * @private
        * 鼠标检测用的包围盒，不开放使用
        */
        public aabb: Rectangle = new Rectangle();

        /**
        * @language zh_CN
        * 是否响应鼠标检测
        */
        public mouseEnable: boolean = true;

        /**
        * @language zh_CN
        * 孩子节点是否响应鼠标检测
        */
        public mouseChildren: boolean = true;


        protected _renderText: boolean = false;
        private _parent: DisplayObject;
        private _stage: QuadStage;
        private _childs: DisplayObject[] = [];
        private _child3Ds: Object3D[] = [];



        protected _rgbNumber: number = 0xffffff;
        protected _alphaNumber: number = 1.0;
        protected _color: ColorTransform = new ColorTransform();
        protected _pivot: Vector3 = new Vector3();
        protected _pos: Point = new Point();
        protected _rot: Vector3 = new Vector3();
        protected _sca: Vector3 = new Vector3(1.0, 1.0, 100.0, 100.0);

        protected _globalColor: ColorTransform = new ColorTransform();
        protected _globalPos: Point = new Point();
        protected _globalRot: Vector3 = new Vector3();
        protected _globalSca: Vector3 = new Vector3(1.0, 1.0, 100.0, 100.0);

        protected _localMaskRect: Rectangle;
        protected _globalMaskRect: Rectangle;

        protected _orientation = new Quaternion();
        protected _globalOrientation = new Quaternion();

        protected _localVisible: boolean = true;
        protected _globalVisible: boolean = true;

        protected _visibleChange: boolean = true;
        protected _colorChange: boolean = true;
        protected _transformChange: boolean = true;
        protected _maskRectChange: boolean = true;

        protected _transformInvalid: boolean = true;
        protected _renderTextInvalid: boolean = true;
        protected _maskRectInvalid: boolean = true;
        protected _colorInvalid: boolean = true;
        protected _textureInvalid: boolean = true;
        protected _visibleInvalid: boolean = true;


        private static ThisVector: Vector3 = new Vector3();
        private static ThisPos: Vector3 = new Vector3();
        private static TargetPos: Vector3 = new Vector3();
        /**
        * @private
        * 是否父节点为stage对象，不对外开放
        */
        public parentIsStage: boolean = false;

        constructor() {
            super();
        }

        /**
        * @language zh_CN
        * 获取鼠标在该显示对象的相对位置X
        * @returns 鼠标x方向位置
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get mouseX(): number {
            var temp: DisplayObject = this;
            var x: number = Input.mouseX;
            while (temp) {
                x -= temp.x;
                if (temp.parent && !temp.parentIsStage) {
                    temp = temp.parent;
                } else {
                    temp = null;
                }
            }
            return x;
        }

        /**
        * @language zh_CN
        * 获取鼠标在该显示对象的相对位置Y
        * @returns 鼠标Y方向位置
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get mouseY(): number {
            var temp: DisplayObject = this;
            var y: number = Input.mouseY;
            while (temp) {
                y -= temp.y;
                if (temp.parent && !temp.parentIsStage) {
                    temp = temp.parent;
                } else {
                    temp = null;
                }
            }
            return y;
        }


        /**
        * @language zh_CN
        * 获得当前舞台引用
        * @returns 所在舞台对象，有可能为null
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get stage(): QuadStage {
            return this._stage;
        }

        /**
        * @language zh_CN
        * 获得子节点列表的引用
        * @returns DisplayObject的列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get childs(): DisplayObject[] {
            return this._childs;
        }


        /**
        * @language zh_CN
        * 获得父亲节点，有可能为null
        * @returns DisplayObject 2d显示对象引用
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get parent(): DisplayObject {
            return this._parent;
        }




        /**
        * @language zh_CN
        * 设定渲染类型，指定当前quad是否为textfield
        * @param value 渲染类型，true表示为文本
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set renderText(value: boolean) {
            if (value != this._renderText) {
                this._renderTextInvalid = true;
                this._renderText = value;
            }
        }


        /**
        * @language zh_CN
        * 设定宽度
        * @param value 宽度的数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set width(value: number) {
            if (value != this._sca.z) {
                this._sca.z = value;
                this.updateTransformChange(true);
            }
        }


        /**
        * @language zh_CN
        * @returns 获取显示对象宽度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get width(): number {
            return this._sca.z;
        }


        /**
        * @language zh_CN
        * 设定像素高度数据
        * @param value 高度数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set height(value: number) {
            if (value != this._sca.w) {
                this._sca.w = value;
                this.updateTransformChange(true);
            }
        }

        /**
        * @language zh_CN
        * 获得像素高度数据
        * @returns 像素高度数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get height(): number { return this._sca.w }

        /**
        * @language zh_CN
        * 设定注册点x位置
        * @param value 注册点x坐标数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set pivotX(value: number) {
            if (value != this._pivot.x) {
                this._pivot.x = value;
                this.updateTransformChange(true);
            }
        }

        /**
        * @language zh_CN
        * 获得注册点x位置
        * @returns 注册点x坐标数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get pivotX(): number { return this._pivot.x }

        /**
        * @language zh_CN
        * 设定注册点y位置
        * @param value 注册点y坐标数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set pivotY(value: number) {
            if (value != this._pivot.y) {
                this._pivot.y = value;
                this.updateTransformChange(true);
            }
        }

        /**
        * @language zh_CN
        * 获得注册点y位置
        * @returns 注册点y坐标数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get pivotY(): number { return this._pivot.y }

        /**
        * @language zh_CN
        * 设定注册点z位置
        * @param value 注册点z坐标数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set pivotZ(value: number) {
            if (value != this._pivot.z) {
                this._pivot.z = value;
                this.updateTransformChange(true);
            }
        }

         /**
        * @language zh_CN
        * 获得遮罩信息
        * @returns Rectangle 遮罩信息
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get mask(): Rectangle {
            return this._localMaskRect;
        }

        /**
        * @language zh_CN
        * 设定遮罩范围
        * @param value 遮罩范围，数据将被拷贝进来
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set mask(value: Rectangle) {
            if (value == null && this._localMaskRect == null)
                return;
            this._localMaskRect = this._localMaskRect || new Rectangle();
            this._localMaskRect.copyFrom(value);
            this.updateMaskChange(true);
        }

        /**
        * @private
        */
        public get pivotZ(): number { return this._pivot.z }
        

        protected calculateTransform() {
            if (!this._transformChange)
                return;

            if (this._parent != null) {
                var parentOrientation: Quaternion = this._parent.globalOrientation;
                this._globalOrientation.multiply(parentOrientation, this._orientation);
                this._globalOrientation.toEulerAngles(this._globalRot);
                var parentScale: Vector3 = this._parent.globalScale;
                this._globalSca.copyFrom(parentScale.multiply(this._sca));
                DisplayObject.ThisPos.setTo(this._pos.x, this._pos.y, 0, 1);
                parentScale.multiply(DisplayObject.ThisPos);
                parentOrientation.transformVector(DisplayObject.ThisPos, DisplayObject.TargetPos);
                this._pos.x = DisplayObject.ThisPos.x;
                this._pos.y = DisplayObject.ThisPos.y;
                this._globalPos.x = DisplayObject.TargetPos.x;
                this._globalPos.y = DisplayObject.TargetPos.y;
                this._globalPos.incrementBy(this._parent.globalPosition);
            }
            else {
                this._globalOrientation.copyFrom(this._orientation);
                this._globalPos.copyFrom(this._pos);
                this._globalSca.copyFrom(this._sca);
                this._globalRot.copyFrom(this._rot);

            }

            this._transformChange = false;
            this.calculateMask();

            this.onUpdateTransform();
        }


        private calculateMask(): void {
            this.calculateTransform();

            if (!this._maskRectChange)
                return;

            if (this._parent) {
                if (this._localMaskRect) {
                    this._globalMaskRect = this._globalMaskRect || new Rectangle();
                    this._globalMaskRect.x = this._localMaskRect.x * this._globalSca.x + this._globalPos.x;
                    this._globalMaskRect.y = this._localMaskRect.y * this._globalSca.y + this._globalPos.y;
                    this._globalMaskRect.width = this._localMaskRect.width * this._globalSca.x;
                    this._globalMaskRect.height = this._localMaskRect.height * this._globalSca.y;
                    if (this._parent.globalMask)
                        this._globalMaskRect.innerArea(this._parent.globalMask, this._globalMaskRect);
                } else {
                    if (this._parent.globalMask) {
                        this._globalMaskRect = this._globalMaskRect || new Rectangle();
                        this._globalMaskRect.copyFrom(this._parent.globalMask);
                    } else {
                        this._globalMaskRect = null;
                    }
                }
            }
            else {
                if (this._localMaskRect) {
                    this._globalMaskRect = this._globalMaskRect || new Rectangle();
                    this._globalMaskRect.x = this._localMaskRect.x * this._globalSca.x + this._globalPos.x;
                    this._globalMaskRect.y = this._localMaskRect.y * this._globalSca.y + this._globalPos.y;
                    this._globalMaskRect.width = this._localMaskRect.width * this._globalSca.x;
                    this._globalMaskRect.height = this._localMaskRect.height * this._globalSca.y;
                } else {
                    this._globalMaskRect = null;
                }
            }

            this._maskRectChange = false;
        }

        protected onUpdateTransform() {
        }

        /**
        * @language zh_CN
        * 添加孩子节点
        * @param object 被添加的孩子节点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addChild(object: DisplayObject): DisplayObject {
            if (object instanceof DisplayObject )
                return this.doAddChildAt(object, MathUtil.MAX_VALUE);
        }

        private addObject3D(obj: Object3D): Object3D {
            if(obj)
                this._child3Ds.push(obj);
            return obj;
        }

        /**
        * @language zh_CN
        * 添加孩子节点至某个index位置
        * @param object 被添加的孩子节点
        * @param index 指定的层级关系index
        * @returns DisplayObject 如果添加成功，返回当前object对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addChildAt(object: DisplayObject, index: number): DisplayObject {
            return this.doAddChildAt(object, index);
        }

        private doAddChildAt(object: DisplayObject, index: number): DisplayObject {
            if (object == null)
                return null;
            if (object.parent) {
                throw Error("This object is already the other child object.");
            }
            if (this._childs.indexOf(object) >= 0) {
                throw Error("The same child object has been added.");
            }
            if (index < 0) {
                throw Error("Child index can not be small than 0 !");
            }

            if (index >= this._childs.length) {
                this._childs.push(object);
            } else {
                this._childs.splice(index, 0, object);
            }

            object._parent = this;
            this._stage && this._stage.setRenderListInvalid();
            object.activeStage(this._stage);
            return object;
        }

        /**
        * @language zh_CN
        * 移除某个孩子节点
        * @param object 被移除的孩子节点
        * @returns DisplayObject 如果移除成功，返回当前object对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeChild(object: DisplayObject): DisplayObject {
            return this.doRemoveChild(object);
        }

        /**
        * @language zh_CN
        * 移除指定层级的孩子节点
        * @param index 指定的层级
        * @returns DisplayObject 如果移除成功，返回当前object对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeChildAt(index: number): DisplayObject {
            return this.doRemoveChild(this._childs[index]);
        }


        private doRemoveChild(object: DisplayObject): DisplayObject {
            if (object == null)
                return null;
            var index: number = this._childs.indexOf(object);
            if (index == -1)
                throw Error("The display isn't a child of this container!");
            this._childs.splice(index, 1);
            object._parent = null;
            this._stage && this._stage.setRenderListInvalid();
            object.activeStage(null);
            return object;
        }

        /**
        * @language zh_CN
        * 交换孩子节点至指定的层级（未实现）
        * @param object 外部传入的将要交换的节点
        * @param index 指定的层级
        * @version Egret 3.0
        * @platform Web,Native
        */
        public swapChildIndex(object: DisplayObject, index: number) {

        }

        /**
        * @language zh_CN、
        * @private
        * 变更舞台信息，从舞台移除或者添加到舞台后触发（不予开发者使用）
        * @param stage 最新的舞台数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public activeStage(stage: QuadStage): void {
            if (this._stage != stage) {
                this._stage = stage;
                this.updateMaskChange(true);
                this.updateTransformChange(true);
                this.updateColorChange(true);
                this.updateVisibleChange(true);

                for (var i: number = 0, count: number = this._childs.length; i < count; i++) {
                    this._childs[i].activeStage(stage);
                }

                this.onActiveStage();
            }
        }

        protected onActiveStage(): void {

        }

        /**
        * @language zh_CN
        * 获取某个孩子节点的下标
        * @param object 显示对象
        * @returns number 下标数值，-1代表不含有这个显示对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public hasChild(object: DisplayObject): number {
            return this.childs.indexOf(object);
        }

        /**
        * @language zh_CN
        * 根据下标获取孩子节点
        * @param index 下标
        * @returns DisplayObject 孩子节点，有可能为null
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getChildByIndex(index: number): DisplayObject {
            return this.childs[index];
        }

        /**
        * @language zh_CN
        * 根据名字获取孩子节点
        * @param name 孩子节点的名字
        * @returns DisplayObject 孩子节点，有可能为null
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getChildByName(name: string): DisplayObject {
            if (!name)
                return null;

            var child: DisplayObject;
            for (child of this._childs) {
                if (child.name == name)
                    return child;
            }
            return null;
        }

        /**
        * @language zh_CN
        * 在渲染之前逻辑更新，每帧执行一次
        * @param time 当前运行的总时间
        * @param delay 振间隔时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number) {
            this.globalPosition;
            this.globalRotation;
            this.globalScale;

            this.globalColor;
            this.globalVisible;
            this.globalMask;

            this.updateMouseAABB();
        }

        protected updateMouseAABB(): void {
            if (this.mouseEnable) {

                var pos: Point = this.globalPosition;
                var sca: Vector3 = this.globalScale;

                if (this._maskRectInvalid || this._transformInvalid) {
                    //更新mouse aabb
                    this.aabb.x = pos.x;
                    this.aabb.y = pos.y;
                    //inner mask
                    this.aabb.width = this.width * sca.x;
                    this.aabb.height = this.height * sca.y;
                    if (this.globalMask) {
                        this.aabb.innerArea(this.globalMask, this.aabb);
                    }
                } else {
                    //不需要更新
                }

            } else {
                this.aabb.setTo(0, 0, 0, 0);
            }
        }

        protected updateMaskChange(change: boolean) {
            if (this._maskRectChange == change)
                return;
            this._maskRectChange = change;
            this._maskRectInvalid = change;
            for (var i: number = 0; i < this._childs.length; ++i) {
                this._childs[i].updateMaskChange(change);
            }
        }

        /**
        * @language zh_CN
        * 设置缩放/旋转/位移信息状态
        * @param change 是否有更新
        * @version Egret 3.0
        * @platform Web,Native
        */
        protected updateTransformChange(change: boolean) {
            if (this._transformChange == change)
                return;
            this._transformChange = change;
            this._transformInvalid = change;
            for (var i: number = 0; i < this._childs.length; ++i) {
                this._childs[i].updateTransformChange(change);
            }

            this.updateMaskChange(change);
        }


        protected updateVisibleChange(change: boolean): void {
            if (this._visibleChange == change)
                return;
            this._visibleChange = change;
            this._visibleInvalid = change;
            for (var i: number = 0; i < this._childs.length; ++i) {
                this._childs[i].updateVisibleChange(change);
            }
        }

        /**
        * @private
        */
        public get globalVisible(): boolean {
            if (this._visibleChange) {
                if (this._parent) {
                    this._globalVisible = this._localVisible && this._parent.globalVisible;
                } else {
                    this._globalVisible = this._localVisible;
                }
                this._visibleChange = false;
            }
            return this._globalVisible;
        }

        /**
        * @language zh_CN
        * 设置可见信息
        * @param value 是否可见
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set visible(value: boolean) {
            if (this._localVisible != value) {
                this._localVisible = value;
                this.updateVisibleChange(true);
            }
        }

        /**
        * @language zh_CN
        * 获取是否可见
        * @returns boolean 是否可见
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get visible(): boolean {
            return this._localVisible;
        }

        /**
        * @language zh_CN
        * 设置颜色变换信息状态
        * @param change 是否有更新
        * @version Egret 3.0
        * @platform Web,Native
        */
        protected updateColorChange(change: boolean) {
            if (this._colorChange == change)
                return;
            this._colorChange = change;
            this._colorInvalid = change;
            for (var i: number = 0; i < this._childs.length; ++i) {
                this._childs[i].updateColorChange(change);
            }
        }

        /**
        * @private
        */
        public get globalX(): number {
            return this.globalPosition.x;
        }

        /**
        * @private
        * @language zh_CN
        * 返回 object 世界位置 y
        * @returns object 世界位置 y
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalY(): number {
            return this.globalPosition.y;
        }


        /**
        * @language zh_CN
        * 返回 object 世界位置
        * 返回世界坐标系的 全局位置坐标
        * @returns object 世界位置
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalPosition(): Point {
            if (this._transformChange) {
                this.calculateTransform();
            }
            return this._globalPos;
        }

        /**
        * @private
        * @language zh_CN
        * 设置 object 世界位置
        * @version Egret 3.0
        * @platform Web,Native
        */
        //public set globalPosition(pos: Point) {
        //    if (this._parent) {
        //        this._parent.globalOrientation.inverse(this._qut);
        //        var vec: Vector3 = DisplayObject.ThisVector;
        //        vec.setTo(this._parent.globalPosition.x - pos.x, this._parent.globalPosition.x - pos.x, 0, 1);
        //        this._qut.transformVector(vec, vec);
        //        vec.divided(this._parent.globalScale, vec);

        //        this.position.setTo(vec.x, vec.y);
        //    }
        //    else {
        //        this.position = pos;
        //    }
        //}


        /**
        * @private
        * @language zh_CN
        * 返回 object 世界旋转x
        * @returns object 世界旋转x
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalRotationX(): number {
            return this.globalRotation.x;
        }


        /**
        * @private
        * @language zh_CN
        * 返回 object 世界旋转y
        * @returns object 世界旋转y
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalRotationY(): number {
            return this.globalRotation.y;
        }


        /**
        * @private
        * @language zh_CN
        * 返回 object 世界旋转z
        * @returns object 世界旋转z
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalRotationZ(): number {
            return this.globalRotation.z;
        }


        /**
        * @private
        * @language zh_CN
        * 返回 object 世界旋转
        * 返回世界坐标系的 全局旋转信息
        * @returns object 世界旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalRotation(): Vector3 {
            if (this._transformChange) {
                this.calculateTransform();
            }
            return this._globalRot;
        }

        /**
        * @private
        * @language zh_CN
        * 设置 object 世界旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        //public set globalRotation(rot: Vector3) {
        //    this._qut.fromEulerAngles(rot.x, rot.y, rot.z);
        //    this.globalOrientation = this._qut;
        //}

        /**
        * @private
        * @language zh_CN
        * 返回 object 世界缩放
        * 返回世界坐标系的 全局缩放信息
        * @returns object 世界缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalScale(): Vector3 {
            if (this._transformChange) {
                this.calculateTransform();
            }
            return this._globalSca;
        }
        
        /**
        * @private
        * @language zh_CN
        * 获取 object 世界缩放 x
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalScaleX(): number {
            return this.globalScale.x;
        }


        /**
        * @private
        * @language zh_CN
        * 获取 object 世界缩放 y
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalScaleY(): number {
            return this.globalScale.y;
        }

        /**
        * @private
        * @language zh_CN
        * 获取 object 世界缩放 z
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalScaleZ(): number {
            return this.globalScale.z;
        }

        /**
        * @private
        * @language zh_CN
        * 返回 object 世界旋转 四元数
        * 返回世界坐标系的 全局旋转信息，数据类型是 四元素
        * @returns object 世界旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalOrientation(): Quaternion {
            if (this._transformChange) {
                this.calculateTransform();
            }
            return this._globalOrientation;
        }

        /**
        * @private
        */
        public get globalMask(): Rectangle {
            if (this._maskRectChange) {
                this.calculateMask();
            }
            return this._globalMaskRect;
        }

        /**
        * @language zh_CN
        * 返回位移。</p>
        * 获取容器的坐标位置，基于父节点的位置坐标。</p>
        * @returns 位移
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get position(): Point {
            return this._pos;
        }

        /**
        * @language zh_CN
        * 设置位移。</p>
        * 设置基于父节点的位置坐标，当父容器发生变化时，子节点也会变化。</p>
        * @param vec 位移
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set position(vec: Point) {
            this._pos.copyFrom(vec);
            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 返回旋转。</p>
        * 获取容器的旋转信息，基于父节点的旋转信息 欧拉角信息。</p>
        * @returns 旋转 欧拉角信息
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get rotation(): Vector3 {
            return this._rot;
        }

        /**
        * @language zh_CN
        * 设置旋转 。</p>
        * 设置基于父节点的旋转信息 欧拉角信息，当父容器发生变化时，子节点也会变化。</p>
        * @param vec 旋转 欧拉角信息
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rotation(value: Vector3) {
            this._rot.x = value.x;
            this._rot.y = value.y;
            this._rot.z = value.z;

            this._orientation.fromEulerAngles(this._rot.x, this._rot.y, this._rot.z);
            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 设置旋转。</p>
        * 设置旋转 基于四元素 旋转信息，当父容器发生变化时，子节点也会变化。</p>
        * @param value 旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set orientation(value: Quaternion) {
            this._orientation.copyFrom(value);
            this._orientation.toEulerAngles(this._rot);

            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 设置旋转 分量x
        * @param value 分量x
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set orientationX(value: number) {
            if (this._orientation.x == value)
                return;
            this._orientation.x = value;
            this._orientation.toEulerAngles(this._rot);

            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 设置旋转 分量y
        * @param value 分量y
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set orientationY(value: number) {
            if (this._orientation.y == value)
                return;
            this._orientation.y = value;
            this._orientation.toEulerAngles(this._rot);

            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 设置旋转 分量z
        * @param value 分量z
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set orientationZ(value: number) {
            if (this._orientation.z == value)
                return;
            this._orientation.z = value;
            this._orientation.toEulerAngles(this._rot);

            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 设置旋转 分量w
        * @param value 分量w
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set orientationW(value: number) {
            if (this._orientation.w == value)
                return;
            this._orientation.w = value;
            this._orientation.toEulerAngles(this._rot);

            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 返回旋转。</p>
        * 返回 基于四元素的旋转信息。</p>
        * @returns 旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get orientation(): Quaternion {
            return this._orientation;
        }

        /**
        * @language zh_CN
        * 返回缩放。</p>
        * 返回基于父容器的缩放信息。</p>
        * @returns 缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get scale(): Vector3 {
            return this._sca;
        }

        /**
        * @language zh_CN
        * 设置缩放。</p>
        * 设置基于父容器的缩放信息，当父容器发生变化时，子节点也会变化。</p>
        * @param vec 缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set scale(val: Vector3) {
            this._sca = val;
            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 设置x坐标。</p>
        * 设置基于父容器的位置信息，当父容器发生变化时，子节点也会变化，值不变。</p>
        * @param value x坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set x(value: number) {
            if (this._pos.x == value)
                return;

            this._pos.x = value;
            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 设置y坐标。</p>
        * 设置基于父容器的位置信息，当父容器发生变化时，子节点也会变化，值不变。</p>
        * @param value y坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set y(value: number) {
            if (this._pos.y == value)
                return;
            this.updateTransformChange(true);
            this._pos.y = value;
        }

        /**
        * @language zh_CN
        * 设置x轴旋转。</p>
        * 设置基于父容器的旋转信息，当父容器发生变化时，子节点也会变化，值不变。</p>
        * @param value x轴旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rotationX(value: number) {
            if (this._rot.x == value)
                return;
            this._rot.x = value;
            this._orientation.fromEulerAngles(this._rot.x, this._rot.y, this._rot.z);
            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 设置y轴旋转。</p>
        * 设置基于父容器的旋转信息，当父容器发生变化时，子节点也会变化，值不变。</p>
        * @param value y轴旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rotationY(value: number) {
            if (this._rot.y == value)
                return;
            this._rot.y = value;
            this._orientation.fromEulerAngles(this._rot.x, this._rot.y, this._rot.z);
            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 设置z轴旋转。</p>
        * 设置基于父容器的旋转信息，当父容器发生变化时，子节点也会变化，值不变。</p>
        * @param value z轴旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rotationZ(value: number) {
            if (this._rot.z == value)
                return;
            this._rot.z = value;
            this._orientation.fromEulerAngles(this._rot.x, this._rot.y, this._rot.z);
            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 设置x轴缩放。</p>
        * 设置基于父容器的旋转信息，当父容器发生变化时，子节点也会变化，值不变
        * @param value x轴缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set scaleX(value: number) {
            if (this._sca.x == value)
                return;
            this._sca.x = value;
            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 设置y轴缩放
        *  
        * 设置基于父容器的旋转信息，当父容器发生变化时，子节点也会变化，值不变
        * @param value y轴缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set scaleY(value: number) {
            if (this._sca.y == value)
                return;
            this.updateTransformChange(true);
            this._sca.y = value;
        }


        /**
        * @language zh_CN
        * 返回x坐标
        * 返回基于父容器的位置坐标信息值
        * @returns x坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get x(): number {
            return this._pos.x;
        }

        /**
        * @language zh_CN
        * 返回y坐标
        *  
        * 返回基于父容器的位置坐标信息值
        * @returns y坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get y(): number {
            return this._pos.y;
        }


        /**
        * @language zh_CN
        * 返回x旋转
        *  
        * 返回基于父容器的位置旋转信息值
        * @returns x旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get rotationX(): number {
            return this._rot.x;
        }

        /**
        * @language zh_CN
        * 返回y旋转
        *  
        * 返回基于父容器的位置旋转信息值
        * @returns y旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get rotationY(): number {
            return this._rot.y;
        }

        /**
        * @language zh_CN
        * 返回z旋转
        *  
        * 返回基于父容器的位置旋转信息值
        * @returns z旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get rotationZ(): number {
            return this._rot.z;
        }

        /**
        * @language zh_CN
        * 返回x缩放
        * 返回基于父容器的缩放信息值
        * @returns x缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get scaleX(): number {
            return this._sca.x;
        }

        /**
        * @language zh_CN
        * 返回y缩放
        * 返回基于父容器的缩放信息值
        * @returns y缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get scaleY(): number {
            return this._sca.y;
        }



        /**
        * private
        */
        public get globalColor(): ColorTransform {
            if (this._colorChange) {
                this._color.alpha = this._alphaNumber;
                this._color.setColorRGB(this._rgbNumber);

                if (this._parent) {
                    this._globalColor.multiply(this._parent.globalColor);
                } else {
                    this._globalColor.copyFrom(this._color);
                }
                this._colorChange = false;
            }
            return this._color;
        }

        /**
        * @language zh_CN
        * 设置颜色 0xffffff格式
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set color(value: number) {
            if (this._rgbNumber != value) {
                this._rgbNumber = value;
                this.updateColorChange(true);
            }
        }

        /**
        * @language zh_CN
        * 返回颜色值 0xffffff格式
        * @returns color
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get color(): number {
            return this._rgbNumber;
        }


        /**
        * @language zh_CN
        * 设置alpha值[0,1]之间的一个数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set alpha(value: number) {
            this._alphaNumber = value;
            if (this._alphaNumber != value) {
                this._alphaNumber = value;
                this.updateColorChange(true);
            }
        }

        /**
        * @language zh_CN
        * 获得alpha值，[0,1]之间的一个数
        * @returns number alpha
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get alpha(): number {
            return this._alphaNumber;
        }




    }
}