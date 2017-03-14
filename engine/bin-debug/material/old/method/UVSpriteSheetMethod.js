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
    * @language zh_CN
    * @class egret3d.UVSpriteSheetMethod
    * @classdesc
    * 用来实现UV精灵动画的渲染方法 。
    * 一整张贴图中用行列来分割帧动画，然后实现每帧播放。
    * row * col 是总帧数， frameNum是只播放的帧数.
    * 使用方法 需要使用 $mesh.material.diffusePass.addMethod( this ) 向材质中添加效果方法
    * @see egret3d.MethodBase
    * @see egret3d.MaterialPass
    * @includeExample material/method/UVSpriteSheetMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var UVSpriteSheetMethod = (function (_super) {
        __extends(UVSpriteSheetMethod, _super);
        /**
        * @language zh_CN
        * 创建一个UV精灵动画的渲染方法对象
        * @param frameNum  帧数量
        * @param row 行数
        * @param column 列数
        * @param numTime 播放总时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        function UVSpriteSheetMethod(frameNum, row, column, numTime) {
            var _this = _super.call(this) || this;
            _this._uvSpriteSheet = new Float32Array(4);
            _this._uvRectangle = new egret3d.Rectangle();
            _this._speed = 0.0;
            _this._time = 0.0;
            _this._numTime = 0.4;
            _this._start = false;
            _this._frameNum = 12;
            _this._row = 4;
            _this._column = 4;
            _this._currentFrame = 0;
            _this.frameList = [];
            _this._change = true;
            _this._delayTime = 0.0;
            _this._isLoop = true;
            _this._currentDelay = 0.0;
            _this.fsShaderList[egret3d.ShaderPhaseType.diffuse_fragment] = _this.fsShaderList[egret3d.ShaderPhaseType.diffuse_fragment] || [];
            _this.fsShaderList[egret3d.ShaderPhaseType.diffuse_fragment].push("uvSpriteSheet_fs");
            _this.frameNum = frameNum;
            _this.row = row;
            _this.column = column;
            _this.numTime = numTime;
            return _this;
        }
        UVSpriteSheetMethod.prototype.caculate = function () {
            this._change = false;
            this._speed = (this._numTime * 1000) / this._frameNum;
            this._uvRectangle.x = 0.0;
            this._uvRectangle.y = 0.0;
            this._uvRectangle.width = 1.0 / this._row;
            this._uvRectangle.height = 1.0 / this._column;
            this.frameList.length = this._frameNum;
            var rowIndex = 0;
            var columnIndex = 0;
            for (var i = 0; i < this._frameNum; i++) {
                rowIndex = i % this._row;
                columnIndex = Math.floor(i / this._column);
                var rec = new egret3d.Rectangle();
                rec.x = rowIndex * this._uvRectangle.width + this._uvRectangle.x;
                rec.y = columnIndex * this._uvRectangle.height + this._uvRectangle.y;
                rec.width = this._uvRectangle.width;
                rec.height = this._uvRectangle.height;
                this.frameList[i] = rec;
            }
        };
        Object.defineProperty(UVSpriteSheetMethod.prototype, "numTime", {
            /**
            * @language zh_CN
            * 获取动画播放总时间
            * @returns number 播放总时间
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._numTime;
            },
            /**
            * @language zh_CN
            * 设置动画播放总时间
            * @param value 播放总时间
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._numTime != value) {
                    this._change = true;
                    this._numTime = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UVSpriteSheetMethod.prototype, "frameNum", {
            /**
            * @language zh_CN
            * 获取动画帧数
            * @returns number  动画帧数
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._frameNum;
            },
            /**
            * @language zh_CN
            * 设置动画帧数
            * @param value 动画帧数
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._frameNum != value) {
                    this._change = true;
                    this._frameNum = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UVSpriteSheetMethod.prototype, "row", {
            /**
            * @language zh_CN
            * 获取动画行数
            * @returns number  动画行数
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._row;
            },
            /**
            * @language zh_CN
            * 设置动画行数
            * @param value 动画行数
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._row != value) {
                    this._change = true;
                    this._row = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UVSpriteSheetMethod.prototype, "column", {
            /**
            * @language zh_CN
            * 获取动画列数
            * @returns number  动画列数
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._column;
            },
            /**
            * @language zh_CN
            * 设置动画列数
            * @param value 动画列数
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._column != value) {
                    this._change = true;
                    this._column = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @language zh_CN
        * 开始播放uv精灵动画
        * @param rest 如果为ture就是重置播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        UVSpriteSheetMethod.prototype.start = function (rest) {
            if (rest === void 0) { rest = false; }
            if (rest) {
                this._time = 0;
                this._currentDelay = 0.0;
                this._currentFrame = 0;
            }
            this._start = true;
        };
        /**
        * @language zh_CN
        * 停止播放uv精灵动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        UVSpriteSheetMethod.prototype.stop = function () {
            this._start = false;
        };
        Object.defineProperty(UVSpriteSheetMethod.prototype, "delayTime", {
            /**
            * @language zh_CN
            * 获取播放延时时间
            * @returns number 时间 秒
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._delayTime / 1000.0;
            },
            /**
            * @language zh_CN
            * 设置播放延时时间
            * @param value 时间 秒
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._delayTime != value) {
                    this._change = true;
                    this._delayTime = value * 1000.0;
                    this._currentDelay = 0.0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UVSpriteSheetMethod.prototype, "isLoop", {
            /**
            * @language zh_CN
            * 获取是否循环播放
            * @returns boolean 是否循环
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._isLoop;
            },
            /**
            * @language zh_CN
            * 设置是否循环播放
            * @param value 是否循环
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                if (this._isLoop != value) {
                    this._change = true;
                    this._isLoop = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UVSpriteSheetMethod.prototype, "currentFrame", {
            /**
            * @language zh_CN
            * 获取当前帧
            * @param value currentFrame
            * @version Egret 3.0
            * @platform Web,Native
            */
            get: function () {
                return this._currentFrame;
            },
            /**
            * @language zh_CN
            * 设置当前帧
            * @param value 0 - frameNum
            * @version Egret 3.0
            * @platform Web,Native
            */
            set: function (value) {
                this._currentFrame = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * @private
        * @language zh_CN
        * @param time
        * @param delay
        * @param usage
        * @param materialData
        * @param geometry
        * @param context3DProxy
        * @param modeltransform
        * @param modeltransform
        * @param camera3D
        */
        UVSpriteSheetMethod.prototype.upload = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            usage["uvSpriteSheet"] = context3DProxy.getUniformLocation(usage.program3D, "uvSpriteSheet");
        };
        /**
        * @private
        */
        UVSpriteSheetMethod.prototype.activeState = function (time, delay, usage, geometry, context3DProxy, modeltransform, camera3D) {
            if (this._change)
                this.caculate();
            if (this._start) {
                this._currentDelay += delay;
                if (this._currentDelay >= this._delayTime) {
                    this._time += delay;
                    if (this._time / this._speed > 1.0) {
                        if (this._currentFrame + 1 >= this._frameNum) {
                            if (this._isLoop) {
                                this._currentFrame = 0;
                            }
                            else {
                                this._start = false;
                            }
                        }
                        else {
                            this._currentFrame++;
                        }
                        this._time = 0;
                    }
                }
            }
            this._currentFrame = this._currentFrame % this._frameNum;
            this._uvSpriteSheet[0] = this.frameList[this._currentFrame].x;
            this._uvSpriteSheet[1] = this.frameList[this._currentFrame].y;
            this._uvSpriteSheet[2] = this.frameList[this._currentFrame].width;
            this._uvSpriteSheet[3] = this.frameList[this._currentFrame].height;
            context3DProxy.uniform1fv(usage["uvSpriteSheet"], this._uvSpriteSheet);
        };
        return UVSpriteSheetMethod;
    }(egret3d.MethodBase));
    egret3d.UVSpriteSheetMethod = UVSpriteSheetMethod;
    __reflect(UVSpriteSheetMethod.prototype, "egret3d.UVSpriteSheetMethod");
})(egret3d || (egret3d = {}));
