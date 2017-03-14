var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var egret3d;
(function (egret3d) {
    /**
    * @class egret3d.Quad
    * @classdesc
    * gui中基础显示单元</p>
    * 在这个class中，主要完成更新顶点数据，更新贴图。</p>
    * @see egret3d.DisplayObject
    * @includeExample gui/Quad.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var Quad = (function (_super) {
        __extends(Quad, _super);
        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        function Quad() {
            var _this = _super.call(this) || this;
            _this._globalIndex = -1; //记录上一次在全局位置的下标
            _this._boolArray = new egret3d.BooleanArray();
            return _this;
        }
        Object.defineProperty(Quad.prototype, "texture", {
            /**
            * @language zh_CN
            * Quad对象中的Texture
            * @returns Quad对象中的Texture
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._texture;
            },
            /**
            * @language zh_CN
            * Quad对象中的Texture
            * @param value Quad对象中的Texture
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (!value) {
                    this.setTexture(value);
                    return;
                }
                if (value instanceof egret3d.Texture) {
                    this.setTexture(value);
                }
            },
            enumerable: true,
            configurable: true
        });
        Quad.prototype.setTexture = function (value) {
            if (value !== this._texture) {
                this._texture = value;
                this._textureInvalid = true;
            }
        };
        /**
        * @language zh_CN
        * 在渲染之前逻辑更新顶点数据，只有发生数据变化才需要更新顶点
        * @param zIndex 在geometry中下标
        * @param geometry 当前quad所在geometry
        * @param globalIndex 全局下标
        * @version Egret 3.0
        * @platform Web,Native
        */
        Quad.prototype.updateVertices = function (zIndex, geometry, globalIndex) {
            if (!geometry.sharedVertexBuffer || !geometry.sharedVertexBuffer.arrayBuffer)
                return;
            var pos = this.globalPosition;
            var rot = this.globalRotation;
            var sca = this.globalScale;
            if (this._globalIndex != globalIndex) {
                this._globalIndex = globalIndex;
                this._colorInvalid = this._transformInvalid = this._renderTextInvalid = this._textureInvalid = this._visibleInvalid = this._maskRectInvalid = true;
                this._boolArray.clear();
            }
            if (this._visibleInvalid) {
                this._visibleInvalid = false;
                this._boolArray.setBoolean(Quad.FLAG_IS_VISIBLE, this.globalVisible);
            }
            //一个真实的quad，而不是geometry中没有用到的部分
            this._boolArray.setBoolean(Quad.FLAG_VALLID_QUAD, true);
            //
            var index = 0;
            var positionFrom;
            var positionOffset = geometry.vertexAttLength;
            var verticesData = geometry.sharedVertexBuffer.arrayBuffer;
            if (this._transformInvalid) {
                this._transformInvalid = false;
                //________________(x,y)
                positionFrom = zIndex * egret3d.QuadData.quadVertexLen + egret3d.QuadData.originalOffset;
                for (var i = 0; i < 4; i++) {
                    index = positionFrom + i * positionOffset;
                    if (this._renderText) {
                        verticesData[index] = pos.x >> 0;
                        verticesData[index + 1] = -pos.y >> 0;
                    }
                    else {
                        verticesData[index] = pos.x;
                        verticesData[index + 1] = -pos.y;
                    }
                }
                //____________________(width,height)
                positionFrom = zIndex * egret3d.QuadData.quadVertexLen + egret3d.QuadData.posOffest;
                //0
                index = positionFrom + 0 * positionOffset;
                verticesData[index] = 0;
                verticesData[index + 1] = 0;
                //1
                index = positionFrom + 1 * positionOffset;
                verticesData[index] = this.width;
                verticesData[index + 1] = 0;
                //2
                index = positionFrom + 2 * positionOffset;
                verticesData[index] = this.width;
                verticesData[index + 1] = -this.height;
                //3
                index = positionFrom + 3 * positionOffset;
                verticesData[index] = 0;
                verticesData[index + 1] = -this.height;
                //____________________(scale x y)
                positionFrom = zIndex * egret3d.QuadData.quadVertexLen + egret3d.QuadData.uvRectangleOffest;
                for (var i = 0; i < 4; i++) {
                    index = positionFrom + i * positionOffset;
                    verticesData[index + 2] = sca.x;
                    verticesData[index + 3] = sca.y;
                }
                //____________________(rotation xyzw )
                //rotation upload GPU , on GPU caculate;
                var quaternion = egret3d.Quaternion.HELP_0;
                quaternion.fromEulerAngles(this._globalRot.x, this._globalRot.y, this._globalRot.z);
                positionFrom = zIndex * egret3d.QuadData.quadVertexLen + egret3d.QuadData.rotationOffest;
                for (var i = 0; i < 4; i++) {
                    index = positionFrom + i * positionOffset;
                    verticesData[index] = quaternion.x;
                    verticesData[index + 1] = quaternion.y;
                    verticesData[index + 2] = quaternion.z;
                    verticesData[index + 3] = quaternion.w;
                }
            }
            if (this._renderTextInvalid) {
                this._renderTextInvalid = false;
                this._boolArray.setBoolean(Quad.FLAG_IS_TEXTFIELD, this._renderText);
            }
            if (this._textureInvalid) {
                this._textureInvalid = false;
                this._boolArray.setBoolean(Quad.FLAG_HAS_TEXTURE, this._texture != null);
                //____________________gui index
                var texId = 0;
                var uvRec;
                if (this._texture) {
                    uvRec = this._texture.uvRectangle;
                    //use gui index
                    texId = this._texture.guiIndex;
                    positionFrom = zIndex * egret3d.QuadData.quadVertexLen + egret3d.QuadData.uvRectangleOffest;
                    index = positionFrom + 0 * positionOffset;
                    verticesData[index] = uvRec.x;
                    verticesData[index + 1] = uvRec.y;
                    index = positionFrom + 1 * positionOffset;
                    verticesData[index] = uvRec.x + uvRec.width;
                    verticesData[index + 1] = uvRec.y;
                    index = positionFrom + 2 * positionOffset;
                    verticesData[index] = uvRec.x + uvRec.width;
                    verticesData[index + 1] = uvRec.y + uvRec.height;
                    index = positionFrom + 3 * positionOffset;
                    verticesData[index] = uvRec.x;
                    verticesData[index + 1] = uvRec.y + uvRec.height;
                    //____________________texId;
                    positionFrom = zIndex * egret3d.QuadData.quadVertexLen + egret3d.QuadData.originalOffset;
                    for (var i = 0; i < 4; i++) {
                        index = positionFrom + i * positionOffset;
                        verticesData[index + 2] = texId;
                    }
                }
            }
            if (this._maskRectInvalid) {
                this._maskRectInvalid = false;
                //____________________mask x y width height
                var maskRect = this.globalMask;
                this._boolArray.setBoolean(Quad.FLAG_HAS_MASK, maskRect != null);
                var maskX, maskY, maskW, maskH;
                if (maskRect) {
                    maskX = maskRect.x;
                    maskY = maskRect.y;
                    maskW = maskRect.width;
                    maskH = maskRect.height;
                    positionFrom = zIndex * egret3d.QuadData.quadVertexLen + egret3d.QuadData.maskOffset;
                    for (var i = 0; i < 4; i++) {
                        index = positionFrom + i * positionOffset;
                        verticesData[index + 0] = maskX;
                        verticesData[index + 1] = maskY;
                        verticesData[index + 2] = maskW;
                        verticesData[index + 3] = maskH;
                    }
                }
            }
            if (this._colorInvalid) {
                //____________________rgba
                //calc global color
                var clrAlpha = this.globalColor.alpha;
                var tempVector = Quad.TempVector;
                this.globalColor.m44.transformVector(Quad.IdentityVector, tempVector);
                positionFrom = zIndex * egret3d.QuadData.quadVertexLen + egret3d.QuadData.colorOffest;
                for (var i = 0; i < 4; i++) {
                    index = positionFrom + i * positionOffset;
                    verticesData[index] = tempVector.x;
                    verticesData[index + 1] = tempVector.y;
                    verticesData[index + 2] = tempVector.z;
                    verticesData[index + 3] = clrAlpha;
                }
                this._colorInvalid = false;
            }
            //merge boolList
            if (this._boolArray.dirty) {
                var makeRes = this._boolArray.makeResult;
                positionFrom = zIndex * egret3d.QuadData.quadVertexLen + egret3d.QuadData.originalOffset;
                for (var i = 0; i < 4; i++) {
                    index = positionFrom + i * positionOffset;
                    verticesData[index + 3] = makeRes;
                }
            }
        };
        Quad.prototype.onActiveStage = function () {
            _super.prototype.onActiveStage.call(this);
            this._globalIndex = -1;
        };
        /**
        * @private
        * @language zh_CN
        * 在渲染之前清理某个下标位置的顶点数据，标记为null状态
        * @param zIndex 在geometry中下标
        * @param geometry 当前quad所在geometry
        * @version Egret 3.0
        * @platform Web,Native
        */
        Quad.clear = function (zIndex, geometry) {
            if (geometry.sharedVertexBuffer && geometry.sharedVertexBuffer.arrayBuffer) {
                var verticesData = geometry.sharedVertexBuffer.arrayBuffer;
                //null 
                var index;
                var positionFrom = zIndex * egret3d.QuadData.quadVertexLen + egret3d.QuadData.originalOffset;
                for (var i = 0; i < 4; i++) {
                    index = positionFrom + i * geometry.vertexAttLength;
                    verticesData[index + 3] = 0;
                }
            }
        };
        return Quad;
    }(egret3d.DisplayObject));
    Quad.FLAG_VALLID_QUAD = 0;
    Quad.FLAG_IS_VISIBLE = 1;
    Quad.FLAG_HAS_MASK = 2;
    Quad.FLAG_HAS_TEXTURE = 3;
    Quad.FLAG_IS_TEXTFIELD = 4;
    Quad.IdentityVector = new egret3d.Vector3(1, 1, 1, 1);
    Quad.TempVector = new egret3d.Vector3();
    Quad.DefaultUVRect = new egret3d.Rectangle(0, 0, 1, 1);
    egret3d.Quad = Quad;
    __reflect(Quad.prototype, "egret3d.Quad");
})(egret3d || (egret3d = {}));
