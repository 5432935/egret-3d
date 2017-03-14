module egret3d {

    /**
    * @private
    * @class egret3d.HUD
    * @classdesc
    * HUD直接渲染在屏幕上的一张贴图</p>
    * 可直接指定2维坐标，贴图的宽度和高度。</p>
    * 其底层渲染也是由4个顶点构成，顶点数据结构有位置信息和uv信息。</p>
    * 其所有的HUD对象的顶点信息数据都是共用的。</p>
    * @version Egret 3.0
    * @platform Web,Native
    */
     export class HUD {

        private static singleQuadData: Float32Array =  new Float32Array([
            -1.0, -1.0, 0.0, 0.0, 1.0,
            1.0, -1.0, 0.0, 1.0, 1.0,
            1.0, 1.0, 0.0, 1.0, 0.0,
            -1.0, 1.0, 0.0, 0.0, 0.0
        ]);

        private static singleQuadIndex: Uint16Array = new Uint16Array([0, 1, 2, 0, 2, 3]);
        private static vertexBytes: number = 20;

        protected _diffuseTexture: ITexture;
        protected _viewPort: Rectangle;
        protected _rectangle: Rectangle = new Rectangle();
        protected _transformMatrix: Matrix4 = new Matrix4();
        protected _change: boolean = false;
        protected _rotation: Vector3 = new Vector3();
        protected _scale: Vector3 = new Vector3(1, 1, 1);
        protected _position: Vector3 = new Vector3();
        protected _transformComponents: Vector3[] = [];

        private _indexBuffer3D: IndexBuffer3D;
        private _vertexBuffer3D: VertexBuffer3D;
        private _changeTexture: boolean = false;
        private _textureStage: boolean = false;
        
        private _vertexFormat: number = VertexFormat.VF_POSITION | VertexFormat.VF_UV0;
        private _uv_scale: Float32Array = new Float32Array(2);

        /**
        * @language zh_CN
        * 名字
        * @version Egret 3.0
        * @platform Web,Native
        */
        public name: string = "";
        /**
        * @language zh_CN
        * 显示双面的开关。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bothside: boolean = false;

        /**
        * @language zh_CN
        * cull模式。 正面可见ContextConfig.BACK 背面可见ContextConfig.FRONT
        * @version Egret 3.0
        * @platform Web,Native
        */
        public cullMode: number = ContextConfig.BACK;


        /**
        * @language zh_CN
        * 是否可见
        * @version Egret 3.0
        * @platform Web,Native
        */
        public visible: boolean = true;

        public vsShader: string = "hud_vs" ; 
        public fsShader: string = "hud_V_fs" ;

        protected _passUsage: PassUsage = new PassUsage();
        protected _attList: Array<GLSL.Attribute> = new Array<GLSL.Attribute>();

        public uniformData: { [key: string]: { uniformIndex: any, type: number, data:number[] } } = {};

        /**
        * @language zh_CN
        * 创建一个HUD对象
        * @param x 屏幕x坐标 默认值 0
        * @param y 屏幕y坐标 默认值 0
        * @param width hud宽度 默认值 100
        * @param height hud高度 默认值 100
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(x: number = 0, y: number = 0, width: number = 100, height: number = 100) {
            this._transformComponents.push(this._position);
            this._transformComponents.push(this._rotation);
            this._transformComponents.push(this._scale);
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this._uv_scale[0] = 1.0;
            this._uv_scale[1] = 1.0;
        }

        /**
        * @language zh_CN
        * 返回HUD的漫反射贴图。
        * @returns ITexture 漫反射贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get diffuseTexture(): ITexture {
            return this._diffuseTexture;
        }

        /**
         * @language zh_CN
         * 设置HUD的漫反射贴图。
         * @param texture ITexture
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set diffuseTexture(texture: ITexture) {
            this._changeTexture = true;
            this._diffuseTexture = texture;
        }

        /**
        * @language zh_CN
        * 设置x坐标
        * @param value x坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set x(value: number) {
            this._change = true;
            this._rectangle.x = value;
        }

        /**
        * @language zh_CN
        * 设置y坐标
        * @param value y坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set y(value: number) {
            this._change = true;
            this._rectangle.y = value;
        }

        /**
        * @language zh_CN
        * 得到x坐标
        * @returns number x坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get x(): number {

            return this._rectangle.x;
        }

        /**
        * @language zh_CN
        * 得到y坐标
        * @returns number y坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get y(): number {
            return this._rectangle.y;
        }

        /**
        * @language zh_CN
        * 设置HUD的宽度
        * @param value HUD宽
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set width(value: number) {
            this._change = true;
            this._rectangle.width = value;
        }

        /**
        * @language zh_CN
        * 设置HUD的高度
        * @param value HUD高
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set height(value: number) {
            this._change = true;
            this._rectangle.height = value;
        }

        /**
        * @language zh_CN
        *  得到HUD的宽度
        * @returns number HUD的宽度宽
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get width(): number {
            return this._rectangle.width;
        }

        /**
        * @language zh_CN
        * 得到HUD的高度
        * @returns number HUD的高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get height(): number {

            return this._rectangle.height;
        }

        /**
        * @language zh_CN
        * 返回x旋转
        * @returns x旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get rotationX(): number {
            return this._rotation.x;
        }

        /**
        * @language zh_CN
        * 返回y旋转
        * @returns y旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get rotationY(): number {
            return this._rotation.y;
        }

        /**
        * @language zh_CN
        * 返回z旋转
        * @returns z旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get rotationZ(): number {
            return this._rotation.z;
        }

        /**
        * @language zh_CN
        * 设置x轴旋转。</p>
        * @param value x轴旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rotationX(value: number) {
            this._change = true;
            if (this._rotation.x == value)
                return;
            this._rotation.x = value;
        }

        /**
        * @language zh_CN
        * 设置y轴旋转。</p>
        * @param value y轴旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rotationY(value: number) {
            this._change = true;
            if (this._rotation.y == value)
                return;
            this._rotation.y = value;
        }

        /**
        * @language zh_CN
        * 设置z轴旋转。</p>
        * @param value z轴旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rotationZ(value: number) {
            this._change = true;
            if (this._rotation.z == value)
                return;

            this._rotation.z = value;
        }

        /**
        * @private
        */
        public set viewPort(viewPort: Rectangle) {
            this._viewPort = viewPort;
        }

        /**
        * @private
        */
        public set uScale(u: number) {
            //this._change = true;
            this._uv_scale[0] = u;

            if (this._uv_scale[0] > 1.0) {
                this._uv_scale[0] = 1.0;
            }
            if (this._uv_scale[0] < 0.0) {
                this._uv_scale[0] = 0.0;
            }
        }

        /**
        * @private
        */
        public set vScale(v: number) {
            //this._change = true;

            this._uv_scale[1] = v;
            if (this._uv_scale[1] > 1.0) {
                this._uv_scale[1] = 1.0;
            }
            if (this._uv_scale[1] < 0.0) {
                this._uv_scale[1] = 0.0;
            }
        }

        /**
        * @private
        */
        public get uScale():number {
            return this._uv_scale[0];
        }

        /**
        * @private
        */
        public get vScale(): number {
            return this._uv_scale[1];
        }

        /**
        * @private
        */
        public get transformMatrix(): Matrix4 {
            if (!this._viewPort) {
                return this._transformMatrix;
            }
            if (this._change) {

                //this._scale.x = this._rectangle.width / this._viewPort.width * 2.0;
                //this._scale.y = this._rectangle.height / this._viewPort.height * 2.0;

                //this._position.x = -(this._viewPort.width - (this._rectangle.x + this._viewPort.x + this._rectangle.width / 2) * 2.0) * (1 / this._viewPort.width);
                //this._position.y = (this._viewPort.height - (this._rectangle.y + this._viewPort.y + this._rectangle.height / 2) * 2.0) * (1 / this._viewPort.height);;
                this._scale.x = this._rectangle.width / this._viewPort.width;
                this._scale.y = this._rectangle.height / this._viewPort.height;

                this._position.x = MathUtil.ScreenToPosition(this._rectangle.x, this._rectangle.width, this._viewPort.width);
                this._position.y = -MathUtil.ScreenToPosition(this._rectangle.y, this._rectangle.height, this._viewPort.height);

                this._transformMatrix.recompose(this._transformComponents);
                this._change = false;
            }
            return this._transformMatrix;
        }

        protected updateTexture(context: Context3DProxy) {
            var sampler2D: GLSL.Sampler2D;
            for (var index in this._passUsage.sampler2DList) {
                sampler2D = this._passUsage.sampler2DList[index];
                sampler2D.uniformIndex = context.getUniformLocation(this._passUsage.program3D, sampler2D.varName);
                sampler2D.texture = this[sampler2D.varName];
            }
            this._changeTexture = false;
        }

        /**
        * @private
        */
        public upload(context: Context3DProxy) {
            let self = this;
            if (!self._vertexBuffer3D) {
                self._vertexBuffer3D = context.creatVertexBuffer(HUD.singleQuadData);
            }

            if (!self._indexBuffer3D) {
                self._indexBuffer3D = context.creatIndexBuffer(HUD.singleQuadIndex);
            }


            self._passUsage.vertexShader.shaderType = ShaderType.VertexShader;
            self._passUsage.fragmentShader.shaderType = ShaderType.FragmentShader;

            self._passUsage.vertexShader.addUseShaderName(self.vsShader);
            self._passUsage.fragmentShader.addUseShaderName(self.fsShader);

            self._passUsage.vertexShader.shader = self._passUsage.vertexShader.getShader(self._passUsage);
            self._passUsage.fragmentShader.shader = self._passUsage.fragmentShader.getShader(self._passUsage);

            //self._passUsage.program3D = ShaderGenerator.createProgram(); ShaderPool.getProgram(self._passUsage.vertexShader.shader.id, self._passUsage.fragmentShader.shader.id);

            for (var property in self._passUsage) {
                if ((<string>property).indexOf("uniform") != -1) {
                    if (self._passUsage[property]) {
                        (<GLSL.Uniform>self._passUsage[property]).uniformIndex = context.getUniformLocation(self._passUsage.program3D, property);
                    }
                }
            }

            for (var uniformName in self.uniformData) {
                let uniform = self.uniformData[uniformName];
                uniform.uniformIndex = context.getUniformLocation(self._passUsage.program3D, uniformName);
            }

            self._attList.length = 0;
            var offset: number = 0;
            if (self._passUsage.attribute_position) {
                if (!self._passUsage.attribute_position.uniformIndex) {
                    self._passUsage.attribute_position.uniformIndex = context.getShaderAttribLocation(self._passUsage.program3D, self._passUsage.attribute_position.varName);
                }

                self._attList.push(self._passUsage.attribute_position);
                self._passUsage.attribute_position.size = Geometry.positionSize;
                self._passUsage.attribute_position.dataType = ContextConfig.FLOAT;
                self._passUsage.attribute_position.normalized = false;
                self._passUsage.attribute_position.stride = HUD.vertexBytes;
                self._passUsage.attribute_position.offset = offset;

                offset += Geometry.positionSize * Float32Array.BYTES_PER_ELEMENT;
            }

            if (self._passUsage.attribute_uv0) {
                if (!self._passUsage.attribute_uv0.uniformIndex) {
                    self._passUsage.attribute_uv0.uniformIndex = context.getShaderAttribLocation(self._passUsage.program3D, self._passUsage.attribute_uv0.varName);
                }

                self._attList.push(self._passUsage.attribute_uv0);

                self._passUsage.attribute_uv0.size = Geometry.uvSize;
                self._passUsage.attribute_uv0.dataType = ContextConfig.FLOAT;
                self._passUsage.attribute_uv0.normalized = false;
                self._passUsage.attribute_uv0.stride = HUD.vertexBytes;
                self._passUsage.attribute_uv0.offset = offset;

                offset += Geometry.uvSize * Float32Array.BYTES_PER_ELEMENT;
            }

            self._passUsage["uv_scale"] = context.getUniformLocation(self._passUsage.program3D, "uv_scale");
        }

        /**
        * @private
        */
        public draw(contextProxy: Context3DProxy, camera: Camera3D = null) {
            let self = this;

            if (!self.visible) {
                return;
            }

            if (!self._passUsage.program3D) {
                self.upload(contextProxy); 
            }

            contextProxy.setProgram(self._passUsage.program3D);
            contextProxy.bindVertexBuffer(self._vertexBuffer3D);
            contextProxy.bindIndexBuffer(self._indexBuffer3D);

            for (var i: number = 0; i < self._attList.length; ++i) {
                var attribute: GLSL.Attribute = self._attList[i];
                if (attribute.uniformIndex >= 0) {
                    contextProxy.vertexAttribPointer(attribute.uniformIndex, attribute.size, attribute.dataType, attribute.normalized, attribute.stride, attribute.offset);
                }
            }

            if (self._changeTexture) {
                self.updateTexture(contextProxy);
            }

            for (var uniformName in self.uniformData) {
                let uniform = self.uniformData[uniformName];
                switch (uniform.type) {
                    case UniformType.uniform1f:
                        contextProxy.uniform1f(uniform.uniformIndex, uniform.data[0]);
                        break;
                    case UniformType.uniform1fv:
                        contextProxy.uniform1fv(uniform.uniformIndex, uniform.data);
                        break;
                    case UniformType.uniform2f:
                        contextProxy.uniform2f(uniform.uniformIndex, uniform.data[0], uniform.data[1] );
                        break;
                    case UniformType.uniform2fv:
                        contextProxy.uniform2fv(uniform.uniformIndex,  uniform.data);
                        break;
                    case UniformType.uniform3f:
                        contextProxy.uniform3f(uniform.uniformIndex, uniform.data[0], uniform.data[1], uniform.data[2]);
                        break;
                    case UniformType.uniform3fv:
                        contextProxy.uniform3fv(uniform.uniformIndex, uniform.data);
                        break;
                    case UniformType.uniform4f:
                        contextProxy.uniform4f(uniform.uniformIndex, uniform.data[0], uniform.data[1], uniform.data[2], uniform.data[3]);
                        break;              
                    case UniformType.uniform4fv:
                        contextProxy.uniform4fv(uniform.uniformIndex, uniform.data);
                        break;
                }
            }

            //texture 2D
            var sampler2D: GLSL.Sampler2D;
            for (var index in self._passUsage.sampler2DList) {
                sampler2D = self._passUsage.sampler2DList[index];
                if (!sampler2D.texture) {
                    continue;
                }
                sampler2D.texture.upload(contextProxy);
                contextProxy.setTexture2DAt(sampler2D.activeTextureIndex, sampler2D.uniformIndex, sampler2D.index, sampler2D.texture.texture2D);

                sampler2D.texture.activeState(contextProxy);
                self._textureStage = false;
            }

            if (self._passUsage.uniform_ViewProjectionMatrix) {
                contextProxy.uniformMatrix4fv(self._passUsage.uniform_ViewProjectionMatrix.uniformIndex, false, self.transformMatrix.rawData);
            }

            if (self._passUsage.uniform_ViewMatrix && camera) {
                contextProxy.uniformMatrix4fv(self._passUsage.uniform_ViewMatrix.uniformIndex, false, camera.viewMatrix.rawData);
            }

            if (self._passUsage.uniform_ProjectionMatrix && camera) {
                contextProxy.uniformMatrix4fv(self._passUsage.uniform_ProjectionMatrix.uniformIndex, false, camera.projectMatrix.rawData);
            }

            if (self._passUsage["uv_scale"] && this._passUsage["uv_scale"] != -1) {
                contextProxy.uniform2f(self._passUsage["uv_scale"], self._uv_scale[0], self._uv_scale[1]);
            }

            contextProxy.setCulling(self.cullMode);

            if (self.bothside) {
                contextProxy.disableCullFace();
            } else
                contextProxy.enableCullFace();

            contextProxy.enableBlend();
            contextProxy.setBlendFactors(ContextConfig.SRC_ALPHA, ContextConfig.ONE_MINUS_SRC_ALPHA);
            contextProxy.drawElement(DrawMode.TRIANGLES, 0, 6);
            contextProxy.clear(ContextConfig.DEPTH_BUFFER_BIT);
        }
    }
}