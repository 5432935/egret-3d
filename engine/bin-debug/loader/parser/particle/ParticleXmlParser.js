var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @private
     * @language zh_CN
     * @class egret3d.ParticleXmlParser
     * @classdesc
     * 用 ParticleXmlParser 解析粒子文件
     */
    var ParticleXmlParser = (function () {
        /**
        * @language zh_CN
        * constructor
        */
        function ParticleXmlParser() {
        }
        /**
         * @language zh_CN
         * @param xml 粒子特效的数据解析
         * @returns ParticleData
         */
        ParticleXmlParser.prototype.parse = function (xml, data) {
            this._particleData = data;
            this.version = this.getNode(xml, "version").textContent;
            //property
            var propertyNode = this.getNode(xml, "property");
            this.parseProperty(propertyNode);
            //emission
            var emissionNode = this.getNode(xml, "emission");
            this.parseEmission(emissionNode);
            //life
            var life = this.getNode(xml, "life");
            this.parseLife(life);
            //shape
            var shape = this.getNode(xml, "shape");
            this.parseShape(shape);
            //rotationBirth
            var rotationBirth = this.getNode(xml, "rotationBirth");
            this.parseRotationBirth(rotationBirth);
            //scaleBirth
            var scaleBirth = this.getNode(xml, "scaleBirth");
            this.parseScaleBirth(scaleBirth);
            //geometry
            var geometry = this.getNode(xml, "geometry");
            this.parseGeometry(geometry);
            //moveSpeed
            var moveSpeed = this.getNode(xml, "moveSpeed");
            this.parseMoveSpeed(moveSpeed);
            //followTarget
            var followTarget = this.getNode(xml, "followTarget");
            this.parseFollowTarget(followTarget);
            //parseBezierNode
            var scaleBezier = this.getNode(xml, "scaleBezier");
            this.parseScaleBeizer(scaleBezier);
            //rotationSpeed
            var rotationSpeed = this.getNode(xml, "rotationSpeed");
            this.parseRotationSpeed(rotationSpeed);
            //colorOffset
            var colorOffset = this.getNode(xml, "colorOffset");
            this.parseColorOffset(colorOffset);
            //material
            var material = this.getNode(xml, "mat");
            //textureSheet
            var textureSheet = this.getNode(xml, "textureSheet");
            this.parseTextureSheet(textureSheet);
        };
        /**
         * @private
         * 解析基础属性
         */
        ParticleXmlParser.prototype.parseProperty = function (node) {
            var property = this._particleData.property;
            property.particleCount = Number(this.getNode(node, "particleCount").textContent);
            property.prewarm = this.getNode(node, "prewarm").textContent == "true";
            property.playOnAwake = this.getNode(node, "playOnAwake").textContent == "true";
            var bounds = this.getNode(node, "bounds");
            property.bounds = this.parseVector3D(bounds, property.bounds);
            //color
            property.colorType = egret3d.ParticleBirthColorType[this.getNode(node, "colorType").textContent];
            var colorConst1 = this.getNode(node, "colorConst1");
            var colorConst2 = this.getNode(node, "colorConst2");
            var gradients1 = this.getNode(node, "colorGradients1");
            var gradients2 = this.getNode(node, "colorGradients2");
            this.parseColorProperty(property, colorConst1, colorConst2, gradients1, gradients2);
            //gravity
            property.gravity = Number(this.getNode(node, "gravity").textContent);
            //transform
            var transform = this.getNode(node, "transform");
            var rotation = this.getNode(transform, "rotation");
            var scale = this.getNode(transform, "scale");
            var position = this.getNode(transform, "position");
            property.rotation = this.parseVector3D(rotation, property.rotation);
            property.scale = this.parseVector3D(scale, property.scale);
            property.position = this.parseVector3D(position, property.position);
            //render
            var render = this.getNode(node, "render");
            var renderMode = this.getNode(render, "renderMode");
            if (renderMode) {
                property.renderMode = egret3d.ParticleRenderModeType[renderMode.textContent];
            }
            var lengthScale = this.getNode(render, "lengthScale");
            if (lengthScale) {
                property.lengthScale = Number(lengthScale.textContent);
            }
            var cameraScale = this.getNode(render, "cameraScale");
            if (cameraScale) {
                property.cameraScale = Number(cameraScale.textContent);
            }
            var speedScale = this.getNode(render, "speedScale");
            if (speedScale) {
                property.speedScale = Number(speedScale.textContent);
            }
            //meshFile
            var meshFile = this.getNode(render, "meshFile");
            if (meshFile && meshFile.textContent != "") {
                property.meshFile = meshFile.textContent;
            }
            //fudge
            var sortingFudge = this.getNode(node, "sortingFudge");
            if (sortingFudge) {
                property.sortingFudge = Number(sortingFudge.textContent);
            }
        };
        /**
         * @private
         * 解析颜色属性
         */
        ParticleXmlParser.prototype.parseColorProperty = function (property, c1, c2, cg1, cg2) {
            if (c1) {
                property.colorConst1 = egret3d.Color.createColor(Number(c1.textContent));
            }
            if (c2) {
                property.colorConst2 = egret3d.Color.createColor(Number(c2.textContent));
            }
            if (cg1) {
                var itemList = this.getNodeList(cg1, "item");
                property.colorGradients1 = this.parseGradientsColor(itemList, property.colorGradients1);
            }
            if (cg2) {
                var itemList = this.getNodeList(cg2, "item");
                property.colorGradients2 = this.parseGradientsColor(itemList, property.colorGradients2);
            }
        };
        /**
         * @private
         * 解析发射器数据
         */
        ParticleXmlParser.prototype.parseEmission = function (node) {
            var emission = this._particleData.emission;
            emission.type = egret3d.ParticleValueType[this.getNode(node, "type").textContent];
            emission.rate = Number(this.getNode(node, "rate").textContent);
            var bursts = this.getNode(node, "bursts");
            var item;
            var nodeName;
            var i = 0;
            var count = 0;
            var pt;
            if (bursts) {
                emission.bursts = [];
                var itemList = this.getNodeList(bursts, "item");
                for (i = 0, count = itemList ? itemList.length : 0; i < count; i++) {
                    item = itemList[i];
                    pt = new egret3d.Point();
                    emission.bursts.push(pt);
                    this.eachAttr(item, function (label, value) {
                        if (label == "time") {
                            pt.x = Number(value);
                        }
                        else if (label == "count") {
                            pt.y = Number(value);
                        }
                    });
                }
            }
            var bezier = this.getNode(node, "bezier");
            if (emission.type == egret3d.ParticleValueType.OneBezier) {
                emission.bezier = this.parseBezierData(bezier);
            }
        };
        /**
         * @private
         * 解析生命周期相关数据
         */
        ParticleXmlParser.prototype.parseLife = function (node) {
            var life = this._particleData.life;
            life.type = egret3d.ParticleValueType[this.getNode(node, "type").textContent];
            life.min = Number(this.getNode(node, "min").textContent);
            life.max = Number(this.getNode(node, "max").textContent);
            life.bezier1 = this.parseBezierData(this.getNode(node, "bezier1"));
            life.bezier2 = this.parseBezierData(this.getNode(node, "bezier2"));
            life.duration = Number(this.getNode(node, "duration").textContent);
            life.delay = Number(this.getNode(node, "delay").textContent);
            life.loop = this.getNode(node, "loop").textContent == "true";
        };
        /**
         * @private
         * 解析发射器的范围类型
         */
        ParticleXmlParser.prototype.parseShape = function (node) {
            if (node == null)
                return;
            var shape = this._particleData.shape;
            shape.type = egret3d.ParticleDataShapeType[this.getNode(node, "type").textContent];
            shape.randomDirection = this.getNode(node, "randomDirection").textContent == "true";
            var emitFromShell = this.getNode(node, "emitFromShell");
            shape.emitFromShell = emitFromShell && emitFromShell.textContent == "true";
            //cube
            var cube = this.getNode(node, "cube");
            this.eachAttr(cube, function (label, value) {
                if (label == "width") {
                    shape.cubeW = Number(value);
                }
                else if (label == "height") {
                    shape.cubeH = Number(value);
                }
                else if (label == "depth") {
                    shape.cubeD = Number(value);
                }
            });
            //sphere
            var sphereRadius = this.getNode(node, "sphereRadius");
            if (sphereRadius) {
                shape.sphereRadius = Number(sphereRadius.textContent);
            }
            //hemiSphereRadius
            var hemiSphereRadius = this.getNode(node, "hemiSphereRadius");
            if (hemiSphereRadius) {
                shape.hemiSphereRadius = Number(hemiSphereRadius.textContent);
            }
            //cone
            var cone = this.getNode(node, "cone");
            this.eachAttr(cone, function (label, value) {
                if (label == "type") {
                    shape.coneType = egret3d.ParticleConeShapeType[value];
                }
                else if (label == "length") {
                    shape.coneLength = Number(value);
                }
                else if (label == "radius") {
                    shape.coneRadius = Number(value);
                }
                else if (label == "angle") {
                    shape.coneAngle = Number(value);
                }
            });
            //meshType
            var meshType = this.getNode(node, "meshType");
            if (meshType) {
                shape.meshType = egret3d.ParticleMeshShapeType[meshType.textContent];
            }
            //meshFile
            var meshFile = this.getNode(node, "meshFile");
            if (meshFile && meshFile.textContent != "") {
                shape.meshFile = meshFile.textContent;
            }
        };
        /**
         * @private
         * 解析粒子出生的旋转信息
         */
        ParticleXmlParser.prototype.parseRotationBirth = function (node) {
            var rotationBirth = this._particleData.rotationBirth;
            rotationBirth.type = egret3d.ParticleValueType[this.getNode(node, "type").textContent];
            rotationBirth.min = Number(this.getNode(node, "min").textContent);
            rotationBirth.max = Number(this.getNode(node, "max").textContent);
            rotationBirth.bezier1 = this.parseBezierData(this.getNode(node, "bezier1"));
            rotationBirth.bezier2 = this.parseBezierData(this.getNode(node, "bezier2"));
        };
        /**
         * @private
         * 解析粒子出生的缩放信息
         */
        ParticleXmlParser.prototype.parseScaleBirth = function (node) {
            var scaleBirth = this._particleData.scaleBirth;
            scaleBirth.type = egret3d.ParticleValueType[this.getNode(node, "type").textContent];
            scaleBirth.min = Number(this.getNode(node, "min").textContent);
            scaleBirth.max = Number(this.getNode(node, "max").textContent);
            scaleBirth.bezier1 = this.parseBezierData(this.getNode(node, "bezier1"));
            scaleBirth.bezier2 = this.parseBezierData(this.getNode(node, "bezier2"));
        };
        /**
         * @private
         * 解析粒子的几何形状
         */
        ParticleXmlParser.prototype.parseGeometry = function (node) {
            var geometry = this._particleData.geometry;
            var plane = this.getNode(node, "plane");
            this.eachAttr(plane, function (label, value) {
                if (label == "width") {
                    geometry.planeW = Number(value);
                }
                else if (label == "height") {
                    geometry.planeH = Number(value);
                }
            });
        };
        /**
         * @private
         * 解析粒子速度相关信息
         */
        ParticleXmlParser.prototype.parseMoveSpeed = function (node) {
            var moveSpeed = this._particleData.moveSpeed;
            moveSpeed.type = egret3d.ParticleValueType[this.getNode(node, "type").textContent];
            moveSpeed.min = Number(this.getNode(node, "min").textContent);
            moveSpeed.max = Number(this.getNode(node, "max").textContent);
            moveSpeed.bezier1 = this.parseBezierData(this.getNode(node, "bezier1"));
            moveSpeed.bezier2 = this.parseBezierData(this.getNode(node, "bezier2"));
            var velocityOverNode = this.getNode(node, "velocityOver");
            if (velocityOverNode) {
                var velocityOver = new egret3d.VelocityOverLifeTimeData();
                velocityOver.type = egret3d.ParticleValueType[this.getNode(velocityOverNode, "type").textContent];
                var min = this.getNode(velocityOverNode, "min");
                var max = this.getNode(velocityOverNode, "max");
                velocityOver.min = this.parseVector3D(min, velocityOver.min);
                velocityOver.max = this.parseVector3D(max, velocityOver.max);
                velocityOver.worldSpace = this.getNode(velocityOverNode, "worldSpace").textContent == "true";
                velocityOver.xBezier1 = this.parseBezierData(this.getNode(velocityOverNode, "xBezier1"));
                velocityOver.yBezier1 = this.parseBezierData(this.getNode(velocityOverNode, "yBezier1"));
                velocityOver.zBezier1 = this.parseBezierData(this.getNode(velocityOverNode, "zBezier1"));
                velocityOver.xBezier2 = this.parseBezierData(this.getNode(velocityOverNode, "xBezier2"));
                velocityOver.yBezier2 = this.parseBezierData(this.getNode(velocityOverNode, "yBezier2"));
                velocityOver.zBezier2 = this.parseBezierData(this.getNode(velocityOverNode, "zBezier2"));
                moveSpeed.velocityOver = velocityOver;
            }
            var velocityForceNode = this.getNode(node, "velocityForce");
            if (velocityForceNode) {
                var velocityForce = new egret3d.VelocityForceLifeTimeData();
                velocityForce.type = egret3d.ParticleValueType[this.getNode(velocityForceNode, "type").textContent];
                var min = this.getNode(velocityForceNode, "min");
                var max = this.getNode(velocityForceNode, "max");
                velocityForce.min = this.parseVector3D(min, velocityForce.min);
                velocityForce.max = this.parseVector3D(max, velocityForce.max);
                velocityForce.worldSpace = this.getNode(velocityForceNode, "worldSpace").textContent == "true";
                velocityForce.xBezier1 = this.parseBezierData(this.getNode(velocityForceNode, "xBezier1"));
                velocityForce.yBezier1 = this.parseBezierData(this.getNode(velocityForceNode, "yBezier1"));
                velocityForce.zBezier1 = this.parseBezierData(this.getNode(velocityForceNode, "zBezier1"));
                velocityForce.xBezier2 = this.parseBezierData(this.getNode(velocityForceNode, "xBezier2"));
                velocityForce.yBezier2 = this.parseBezierData(this.getNode(velocityForceNode, "yBezier2"));
                velocityForce.zBezier2 = this.parseBezierData(this.getNode(velocityForceNode, "zBezier2"));
                moveSpeed.velocityForce = velocityForce;
            }
            var velocityLimitNode = this.getNode(node, "velocityLimit");
            if (velocityLimitNode) {
                var velocityLimit = new egret3d.VelocityLimitLifeTimeData();
                velocityLimit.type = egret3d.ParticleValueType[this.getNode(velocityLimitNode, "type").textContent];
                var min = this.getNode(velocityLimitNode, "min");
                var max = this.getNode(velocityLimitNode, "max");
                var dampen = this.getNode(velocityLimitNode, "dampen");
                velocityLimit.min = Number(min.textContent);
                velocityLimit.max = Number(max.textContent);
                velocityLimit.dampen = dampen ? Number(dampen.textContent) : 0;
                velocityLimit.bezier1 = this.parseBezierData(this.getNode(velocityLimitNode, "bezier1"));
                velocityLimit.bezier2 = this.parseBezierData(this.getNode(velocityLimitNode, "bezier2"));
                moveSpeed.velocityLimit = velocityLimit;
            }
        };
        /**
         * @private
         * 解析全局位置or本地位置类型
         */
        ParticleXmlParser.prototype.parseFollowTarget = function (node) {
            if (node == null)
                return;
            var followTarget = this._particleData.followTarget = new egret3d.ParticleDataFollowTarget();
            followTarget.followRotation = this.getNode(node, "followRotation").textContent == "true";
            followTarget.followScale = this.getNode(node, "followScale").textContent == "true";
        };
        /**
         * @private
         * 解析粒子生命过程中缩放变化信息
         */
        ParticleXmlParser.prototype.parseScaleBeizer = function (node) {
            if (node == null)
                return;
            var scaleBezier = this._particleData.scaleSize = new egret3d.ParticleDataScaleSize();
            scaleBezier.bezier1 = this.parseBezierData(this.getNode(node, "bezier"));
        };
        /**
        * @private
        * 解析粒子旋转角速度
        */
        ParticleXmlParser.prototype.parseRotationSpeed = function (node) {
            if (node == null)
                return;
            var rotationSpeed = this._particleData.rotationSpeed = new egret3d.ParticleDataRotationSpeed();
            rotationSpeed.type = egret3d.ParticleValueType[this.getNode(node, "type").textContent];
            var min = this.getNode(node, "min");
            var max = this.getNode(node, "max");
            rotationSpeed.min = this.parseVector3D(min, rotationSpeed.min);
            rotationSpeed.max = this.parseVector3D(max, rotationSpeed.max);
            rotationSpeed.bezier1 = this.parseBezierData(this.getNode(node, "bezier1"));
            rotationSpeed.bezier2 = this.parseBezierData(this.getNode(node, "bezier2"));
        };
        /**
        * @private
        * 解析粒子生命过程中颜色渐变信息
        */
        ParticleXmlParser.prototype.parseColorOffset = function (node) {
            if (node == null)
                return;
            var colorOffset = this._particleData.colorOffset = new egret3d.ParticleDataColorOffset();
            var itemList = this.getNodeList(node, "item");
            colorOffset.data = this.parseGradientsColor(itemList, colorOffset.data);
        };
        /**
        * @private
        * 解析材质球
        */
        ParticleXmlParser.prototype.parseTextureSheet = function (node) {
            if (node == null)
                return null;
            var textureSheet = this._particleData.textureSheet = new egret3d.ParticleDataTextureSheet();
            textureSheet.frameType = egret3d.ParticleValueType[this.getNode(node, "frameType").textContent];
            textureSheet.tileX = Number(this.getNode(node, "tileX").textContent);
            textureSheet.tileY = Number(this.getNode(node, "tileY").textContent);
            textureSheet.whole = this.getNode(node, "whole").textContent == "true";
            textureSheet.row = Number(this.getNode(node, "row").textContent);
            textureSheet.min = Number(this.getNode(node, "min").textContent);
            textureSheet.max = Number(this.getNode(node, "max").textContent);
            textureSheet.circles = Number(this.getNode(node, "circles").textContent);
            textureSheet.bezier1 = this.parseBezierData(this.getNode(node, "bezier1"));
            textureSheet.bezier2 = this.parseBezierData(this.getNode(node, "bezier2"));
            return textureSheet;
        };
        /**
        * @private
        * 解析渐变数据
        */
        ParticleXmlParser.prototype.parseGradientsColor = function (itemList, dst) {
            dst || (dst = new egret3d.ColorGradients);
            var item;
            var i = 0;
            var count = 0;
            var pt;
            var color;
            var time;
            for (i = 0, count = itemList ? itemList.length : 0; i < count; i++) {
                item = itemList[i];
                this.eachAttr(item, function (label, value) {
                    if (label == "time") {
                        dst.times.push(Number(value));
                    }
                    else if (label == "color") {
                        color = egret3d.Color.createColor(Number(value));
                        dst.colors.push(color);
                    }
                });
            }
            //排序
            var sortTimes = dst.times.slice();
            var sortColors = dst.colors.slice();
            sortTimes.sort(function (a, b) {
                return a - b;
            });
            for (i = 0, count = dst ? dst.times.length : 0; i < count; i++) {
                var index = sortTimes.indexOf(dst.times[i]);
                dst.colors[i] = sortColors[index];
            }
            dst.times = sortTimes;
            return dst;
        };
        /**
        * @private
        * 解析一条贝塞尔曲线数据
        */
        ParticleXmlParser.prototype.parseBezierData = function (node) {
            var bzData = new egret3d.BezierData();
            if (node == null)
                return bzData;
            var posList = this.getNodeList(node, "pos");
            var ctrlList = this.getNodeList(node, "ctrl");
            var item;
            var i = 0;
            var count = 0;
            var pt;
            for (i = 0, count = posList ? posList.length : 0; i < count; i++) {
                item = posList[i];
                pt = new egret3d.Point();
                bzData.posPoints.push(pt);
                this.eachAttr(item, function (label, value) {
                    if (label == "x") {
                        pt.x = Number(value);
                    }
                    else if (label == "y") {
                        pt.y = Number(value);
                    }
                });
            }
            for (i = 0, count = ctrlList ? ctrlList.length : 0; i < count; i++) {
                item = ctrlList[i];
                pt = new egret3d.Point();
                bzData.ctrlPoints.push(pt);
                this.eachAttr(item, function (label, value) {
                    if (label == "x") {
                        pt.x = Number(value);
                    }
                    else if (label == "y") {
                        pt.y = Number(value);
                    }
                });
            }
            return bzData;
        };
        /**
        * @private
        * 解析一个vector3D数据
        */
        ParticleXmlParser.prototype.parseVector3D = function (node, vector) {
            if (vector == null)
                vector = new egret3d.Vector3();
            this.eachAttr(node, function (label, value) {
                if (label == "x") {
                    vector.x = Number(value);
                }
                else if (label == "y") {
                    vector.y = Number(value);
                }
                else if (label == "z") {
                    vector.z = Number(value);
                }
            });
            return vector;
        };
        /**
        * @private
        * 在obj中，获取name的元素，第一个
        */
        ParticleXmlParser.prototype.getNode = function (obj, name) {
            if (obj == null)
                return null;
            var list = obj.getElementsByTagName(name);
            if (list == null || list.length == 0)
                return null;
            return list[0];
        };
        /**
         * @private
         * 在obj中，获取name的元素列表
         */
        ParticleXmlParser.prototype.getNodeList = function (obj, name) {
            if (obj == null)
                return null;
            var list = obj.getElementsByTagName(name);
            if (list == null || list.length == 0)
                return null;
            return list;
        };
        ParticleXmlParser.prototype.eachAttr = function (item, fun) {
            egret3d.XMLParser.eachXmlAttr(item, fun);
        };
        return ParticleXmlParser;
    }());
    egret3d.ParticleXmlParser = ParticleXmlParser;
    __reflect(ParticleXmlParser.prototype, "egret3d.ParticleXmlParser");
})(egret3d || (egret3d = {}));
