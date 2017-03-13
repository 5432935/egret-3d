var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @language zh_CN
     * @class egret3d.SubGeometry
     * @classdesc
     * 表示几何形状 子集 不同的子集渲染时使用的材质会不同。
     * 这样就可以用不同的材质来共用相同的geometry buffer
     *
     * @see egret3d.Geometry
     * @version Egret 3.0
     * @platform Web,Native
     */
    var SubGeometry = (function () {
        function SubGeometry() {
            this.useVertexAttributeList = [];
            /**
             * @language zh_CN
             * 顶点索引
             * @version Egret 3.0
             * @platform Web,Native
             */
            this._start = 0;
            /**
            * @language zh_CN
            * 顶点索引数量
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.count = 0;
            /**
            * @language zh_CN
            * 材质ID 对应 IRender.getMaterial(this.matID)
            * @see egret3d.IRender
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.matID = 0;
            /**
            * @language zh_CN
            * @private
            */
            this.preAttList = new Array();
            /**
           * @private
           * @language zh_CN
           * @version Egret 3.0
           * @platform Web,Native
           */
            this.localActive = false;
        }
        Object.defineProperty(SubGeometry.prototype, "start", {
            /**
            * @language zh_CN
            * 顶点索引中的索引
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._start;
            },
            /**
            * @language zh_CN
            * 顶点索引中的索引
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (val) {
                this._start = val;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @private
        * @language zh_CN
        */
        SubGeometry.prototype.upload = function (passUsage, contextPorxy) {
            passUsage.attributeDiry = false;
            var offsetBytes = 0;
            passUsage["attributeList"] = [];
            if (this.geometry.vertexFormat & egret3d.VertexFormat.VF_POSITION) {
                if (passUsage.attribute_position) {
                    if (!passUsage.attribute_position.uniformIndex) {
                        passUsage.attribute_position.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_position.varName);
                    }
                    passUsage.attribute_position.size = egret3d.Geometry.positionSize;
                    passUsage.attribute_position.dataType = egret3d.ContextConfig.FLOAT;
                    passUsage.attribute_position.normalized = false;
                    passUsage.attribute_position.stride = this.geometry.vertexSizeInBytes;
                    passUsage.attribute_position.offsetBytes = offsetBytes;
                    passUsage["attributeList"].push(passUsage.attribute_position);
                    this.useVertexAttributeList[passUsage.attribute_position.uniformIndex] = passUsage.attribute_position.uniformIndex;
                }
                offsetBytes += egret3d.Geometry.positionSize * Float32Array.BYTES_PER_ELEMENT;
            }
            if (this.geometry.vertexFormat & egret3d.VertexFormat.VF_NORMAL) {
                if (passUsage.attribute_normal) {
                    if (!passUsage.attribute_normal.uniformIndex) {
                        passUsage.attribute_normal.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_normal.varName);
                    }
                    passUsage.attribute_normal.size = egret3d.Geometry.normalSize;
                    passUsage.attribute_normal.dataType = egret3d.ContextConfig.FLOAT;
                    passUsage.attribute_normal.normalized = false;
                    passUsage.attribute_normal.stride = this.geometry.vertexSizeInBytes;
                    passUsage.attribute_normal.offsetBytes = offsetBytes;
                    passUsage["attributeList"].push(passUsage.attribute_normal);
                    this.useVertexAttributeList[passUsage.attribute_normal.uniformIndex] = passUsage.attribute_normal.uniformIndex;
                }
                offsetBytes += egret3d.Geometry.normalSize * Float32Array.BYTES_PER_ELEMENT;
            }
            if (this.geometry.vertexFormat & egret3d.VertexFormat.VF_TANGENT) {
                if (passUsage.attribute_tangent) {
                    if (!passUsage.attribute_tangent.uniformIndex) {
                        passUsage.attribute_tangent.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_tangent.varName);
                    }
                    passUsage.attribute_tangent.size = egret3d.Geometry.tangentSize;
                    passUsage.attribute_tangent.dataType = egret3d.ContextConfig.FLOAT;
                    passUsage.attribute_tangent.normalized = false;
                    passUsage.attribute_tangent.stride = this.geometry.vertexSizeInBytes;
                    passUsage.attribute_tangent.offsetBytes = offsetBytes;
                    passUsage["attributeList"].push(passUsage.attribute_tangent);
                    this.useVertexAttributeList[passUsage.attribute_tangent.uniformIndex] = passUsage.attribute_tangent.uniformIndex;
                }
                offsetBytes += egret3d.Geometry.tangentSize * Float32Array.BYTES_PER_ELEMENT;
            }
            if (this.geometry.vertexFormat & egret3d.VertexFormat.VF_COLOR) {
                if (passUsage.attribute_color) {
                    if (!passUsage.attribute_color.uniformIndex) {
                        passUsage.attribute_color.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_color.varName);
                    }
                    passUsage.attribute_color.size = egret3d.Geometry.colorSize;
                    passUsage.attribute_color.dataType = egret3d.ContextConfig.FLOAT;
                    passUsage.attribute_color.normalized = false;
                    passUsage.attribute_color.stride = this.geometry.vertexSizeInBytes;
                    passUsage.attribute_color.offsetBytes = offsetBytes;
                    passUsage["attributeList"].push(passUsage.attribute_color);
                    this.useVertexAttributeList[passUsage.attribute_color.uniformIndex] = passUsage.attribute_color.uniformIndex;
                }
                offsetBytes += egret3d.Geometry.colorSize * Float32Array.BYTES_PER_ELEMENT;
            }
            if (this.geometry.vertexFormat & egret3d.VertexFormat.VF_UV0) {
                if (passUsage.attribute_uv0) {
                    if (!passUsage.attribute_uv0.uniformIndex) {
                        passUsage.attribute_uv0.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_uv0.varName);
                    }
                    passUsage.attribute_uv0.size = egret3d.Geometry.uvSize;
                    passUsage.attribute_uv0.dataType = egret3d.ContextConfig.FLOAT;
                    passUsage.attribute_uv0.normalized = false;
                    passUsage.attribute_uv0.stride = this.geometry.vertexSizeInBytes;
                    passUsage.attribute_uv0.offsetBytes = offsetBytes;
                    passUsage["attributeList"].push(passUsage.attribute_uv0);
                    this.useVertexAttributeList[passUsage.attribute_uv0.uniformIndex] = passUsage.attribute_uv0.uniformIndex;
                }
                offsetBytes += egret3d.Geometry.uvSize * Float32Array.BYTES_PER_ELEMENT;
            }
            if (this.geometry.vertexFormat & egret3d.VertexFormat.VF_UV1) {
                if (passUsage.attribute_uv1) {
                    if (!passUsage.attribute_uv1.uniformIndex) {
                        passUsage.attribute_uv1.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_uv1.varName);
                    }
                    passUsage.attribute_uv1.size = egret3d.Geometry.uv2Size;
                    passUsage.attribute_uv1.dataType = egret3d.ContextConfig.FLOAT;
                    passUsage.attribute_uv1.normalized = false;
                    passUsage.attribute_uv1.stride = this.geometry.vertexSizeInBytes;
                    passUsage.attribute_uv1.offsetBytes = offsetBytes;
                    passUsage["attributeList"].push(passUsage.attribute_uv1);
                    this.useVertexAttributeList[passUsage.attribute_uv1.uniformIndex] = passUsage.attribute_uv1.uniformIndex;
                }
                offsetBytes += egret3d.Geometry.uv2Size * Float32Array.BYTES_PER_ELEMENT;
            }
            if (this.geometry.vertexFormat & egret3d.VertexFormat.VF_SKIN) {
                if (passUsage.attribute_boneIndex) {
                    if (!passUsage.attribute_boneIndex.uniformIndex) {
                        passUsage.attribute_boneIndex.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_boneIndex.varName);
                    }
                    passUsage.attribute_boneIndex.size = egret3d.Geometry.skinSize / 2;
                    passUsage.attribute_boneIndex.dataType = egret3d.ContextConfig.FLOAT;
                    passUsage.attribute_boneIndex.normalized = false;
                    passUsage.attribute_boneIndex.stride = this.geometry.vertexSizeInBytes;
                    passUsage.attribute_boneIndex.offsetBytes = offsetBytes;
                    passUsage["attributeList"].push(passUsage.attribute_boneIndex);
                    this.useVertexAttributeList[passUsage.attribute_boneIndex.uniformIndex] = passUsage.attribute_boneIndex.uniformIndex;
                }
                offsetBytes += egret3d.Geometry.skinSize / 2 * Float32Array.BYTES_PER_ELEMENT;
                if (passUsage.attribute_boneWeight) {
                    if (!passUsage.attribute_boneWeight.uniformIndex) {
                        passUsage.attribute_boneWeight.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_boneWeight.varName);
                    }
                    passUsage.attribute_boneWeight.size = egret3d.Geometry.skinSize / 2;
                    passUsage.attribute_boneWeight.dataType = egret3d.ContextConfig.FLOAT;
                    passUsage.attribute_boneWeight.normalized = false;
                    passUsage.attribute_boneWeight.stride = this.geometry.vertexSizeInBytes;
                    passUsage.attribute_boneWeight.offsetBytes = offsetBytes;
                    passUsage["attributeList"].push(passUsage.attribute_boneWeight);
                    this.useVertexAttributeList[passUsage.attribute_boneWeight.uniformIndex] = passUsage.attribute_boneWeight.uniformIndex;
                }
                offsetBytes += egret3d.Geometry.skinSize / 2 * Float32Array.BYTES_PER_ELEMENT;
            }
            if (this.geometry.vertexFormat & egret3d.VertexFormat.VF_QUAD_POS) {
                if (passUsage.attribute_position) {
                    if (!passUsage.attribute_position.uniformIndex) {
                        passUsage.attribute_position.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_position.varName);
                    }
                    passUsage.attribute_position.size = egret3d.QuadData.posSize;
                    passUsage.attribute_position.dataType = egret3d.ContextConfig.FLOAT;
                    passUsage.attribute_position.normalized = false;
                    passUsage.attribute_position.stride = egret3d.QuadData.vertexBytes;
                    passUsage.attribute_position.offsetBytes = offsetBytes;
                    passUsage["attributeList"].push(passUsage.attribute_position);
                    this.useVertexAttributeList[passUsage.attribute_position.uniformIndex] = passUsage.attribute_position.uniformIndex;
                }
                offsetBytes += egret3d.QuadData.posSize * Float32Array.BYTES_PER_ELEMENT;
            }
            if (this.geometry.vertexFormat & egret3d.VertexFormat.VF_QUAD_ORIGN) {
                if (passUsage.attribute_shapePosition) {
                    if (!passUsage.attribute_shapePosition.uniformIndex) {
                        passUsage.attribute_shapePosition.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_shapePosition.varName);
                    }
                    passUsage.attribute_shapePosition.size = egret3d.QuadData.originalSize;
                    passUsage.attribute_shapePosition.dataType = egret3d.ContextConfig.FLOAT;
                    passUsage.attribute_shapePosition.normalized = false;
                    passUsage.attribute_shapePosition.stride = egret3d.QuadData.vertexBytes;
                    passUsage.attribute_shapePosition.offsetBytes = offsetBytes;
                    passUsage["attributeList"].push(passUsage.attribute_shapePosition);
                    this.useVertexAttributeList[passUsage.attribute_shapePosition.uniformIndex] = passUsage.attribute_shapePosition.uniformIndex;
                }
                offsetBytes += egret3d.QuadData.originalSize * Float32Array.BYTES_PER_ELEMENT;
            }
            if (this.geometry.vertexFormat & egret3d.VertexFormat.VF_QUAD_UVREC) {
                if (passUsage.attribute_uvRec) {
                    if (!passUsage.attribute_uvRec.uniformIndex) {
                        passUsage.attribute_uvRec.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_uvRec.varName);
                    }
                    passUsage.attribute_uvRec.size = egret3d.QuadData.uvRectangleSize;
                    passUsage.attribute_uvRec.dataType = egret3d.ContextConfig.FLOAT;
                    passUsage.attribute_uvRec.normalized = false;
                    passUsage.attribute_uvRec.stride = egret3d.QuadData.vertexBytes;
                    passUsage.attribute_uvRec.offsetBytes = offsetBytes;
                    passUsage["attributeList"].push(passUsage.attribute_uvRec);
                    this.useVertexAttributeList[passUsage.attribute_uvRec.uniformIndex] = passUsage.attribute_uvRec.uniformIndex;
                }
                offsetBytes += egret3d.QuadData.uvRectangleSize * Float32Array.BYTES_PER_ELEMENT;
            }
            if (this.geometry.vertexFormat & egret3d.VertexFormat.VF_QUAD_ROTATION) {
                if (passUsage.attribute_rotate) {
                    if (!passUsage.attribute_rotate.uniformIndex) {
                        passUsage.attribute_rotate.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_rotate.varName);
                    }
                    passUsage.attribute_rotate.size = egret3d.QuadData.rotationSize;
                    passUsage.attribute_rotate.dataType = egret3d.ContextConfig.FLOAT;
                    passUsage.attribute_rotate.normalized = false;
                    passUsage.attribute_rotate.stride = egret3d.QuadData.vertexBytes;
                    passUsage.attribute_rotate.offsetBytes = offsetBytes;
                    passUsage["attributeList"].push(passUsage.attribute_rotate);
                    this.useVertexAttributeList[passUsage.attribute_rotate.uniformIndex] = passUsage.attribute_rotate.uniformIndex;
                }
                offsetBytes += egret3d.QuadData.rotationSize * Float32Array.BYTES_PER_ELEMENT;
            }
            if (this.geometry.vertexFormat & egret3d.VertexFormat.VF_QUAD_MASK) {
                if (passUsage.attribute_maskRectangle) {
                    if (!passUsage.attribute_maskRectangle.uniformIndex) {
                        passUsage.attribute_maskRectangle.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_maskRectangle.varName);
                    }
                    passUsage.attribute_maskRectangle.size = egret3d.QuadData.maskSize;
                    passUsage.attribute_maskRectangle.dataType = egret3d.ContextConfig.FLOAT;
                    passUsage.attribute_maskRectangle.normalized = false;
                    passUsage.attribute_maskRectangle.stride = egret3d.QuadData.vertexBytes;
                    passUsage.attribute_maskRectangle.offsetBytes = offsetBytes;
                    passUsage["attributeList"].push(passUsage.attribute_maskRectangle);
                    this.useVertexAttributeList[passUsage.attribute_maskRectangle.uniformIndex] = passUsage.attribute_maskRectangle.uniformIndex;
                }
                offsetBytes += egret3d.QuadData.maskSize * Float32Array.BYTES_PER_ELEMENT;
            }
            if (this.geometry.vertexFormat & egret3d.VertexFormat.VF_QUAD_COLOR) {
                if (passUsage.attribute_quad_color) {
                    if (!passUsage.attribute_quad_color.uniformIndex) {
                        passUsage.attribute_quad_color.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, passUsage.attribute_quad_color.varName);
                    }
                    passUsage.attribute_quad_color.size = egret3d.QuadData.colorSize;
                    passUsage.attribute_quad_color.dataType = egret3d.ContextConfig.FLOAT;
                    passUsage.attribute_quad_color.normalized = false;
                    passUsage.attribute_quad_color.stride = egret3d.QuadData.vertexBytes;
                    passUsage.attribute_quad_color.offsetBytes = offsetBytes;
                    passUsage["attributeList"].push(passUsage.attribute_quad_color);
                    this.useVertexAttributeList[passUsage.attribute_quad_color.uniformIndex] = passUsage.attribute_quad_color.uniformIndex;
                }
                offsetBytes += egret3d.QuadData.colorSize * Float32Array.BYTES_PER_ELEMENT;
            }
            for (var i = 0; i < this.preAttList.length; ++i) {
                var var0 = this.preAttList[i];
                var attribute = passUsage[var0.name];
                if (attribute) {
                    if (!attribute.uniformIndex) {
                        attribute.uniformIndex = contextPorxy.getShaderAttribLocation(passUsage.program3D, attribute.varName);
                        attribute.size = var0.size;
                        attribute.dataType = egret3d.ContextConfig.FLOAT;
                        attribute.normalized = false;
                        attribute.stride = this.geometry.vertexSizeInBytes;
                        attribute.offsetBytes = offsetBytes;
                        passUsage["attributeList"].push(attribute);
                        this.useVertexAttributeList[attribute.uniformIndex] = attribute.uniformIndex;
                    }
                }
                offsetBytes += var0.size * Float32Array.BYTES_PER_ELEMENT;
            }
        };
        /**
       * @private
       * @language zh_CN
       * @version Egret 3.0
       * @platform Web,Native
       */
        SubGeometry.prototype.activeState = function (time, delay, passUsage, contextProxy) {
            if (passUsage.attributeDiry)
                this.upload(passUsage, contextProxy);
            var active = contextProxy.activeAttribPointer(this.geometry.vertexFormat, passUsage["attributeList"].length);
            // if (active) {
            for (var i = 0; i < passUsage["attributeList"].length; i++) {
                var attribute = passUsage["attributeList"][i];
                if (attribute.uniformIndex >= 0)
                    contextProxy.vertexAttribPointer(attribute.uniformIndex, attribute.size, attribute.dataType, attribute.normalized, attribute.stride, attribute.offsetBytes);
            }
            //}
        };
        return SubGeometry;
    }());
    /**
    * @private
    * @language zh_CN
    * @version Egret 3.0
    * @platform Web,Native
    */
    SubGeometry.use = false;
    egret3d.SubGeometry = SubGeometry;
    __reflect(SubGeometry.prototype, "egret3d.SubGeometry");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=SubGeometry.js.map